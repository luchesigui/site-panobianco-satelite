import test from "node:test";
import assert from "node:assert/strict";
import { fetchEligibleMembers } from "./raffle-eligibility.mjs";

const config = { dns: "fixture-dns", token: "fixture-token", branchId: "1" };
const member = (idMember, extra = {}) => ({ idMember, firstName: "ANA MARIA", lastName: "DE SOUZA", ...extra });
const page = (data, status = 200, retryAfter = null) => ({
	ok: status >= 200 && status < 300,
	status,
	headers: new Headers(retryAfter === null ? {} : { "retry-after": retryAfter }),
	json: async () => data,
});
function harness(responses) {
	const calls = [];
	const waits = [];
	return {
		calls, waits,
		options: {
			...config,
			fetchImpl: async (url, options) => {
				calls.push({ url, options });
				const response = responses.shift();
				if (response instanceof Error) throw response;
				assert.ok(response, "Unexpected fixture request");
				return response;
			},
			sleep: async (ms) => { waits.push(ms); },
		},
	};
}

 test("paginates 50 then short page with authenticated, uncached, timed requests", async () => {
	const h = harness([page(Array.from({ length: 50 }, (_, i) => member(i + 1))), page([member(51)])]);
	const result = await fetchEligibleMembers(h.options);
	assert.equal(result.length, 51);
	assert.equal(h.calls.length, 2);
	for (const [i, call] of h.calls.entries()) {
		const url = new URL(call.url);
		assert.equal(url.origin + url.pathname, "https://evo-integracao-api.w12app.com.br/api/v2/members");
		assert.deepEqual(Object.fromEntries(url.searchParams), { idBranch: "1", status: "1", take: "50", skip: String(i * 50) });
		assert.equal(call.options.headers.Authorization, `Basic ${Buffer.from("fixture-dns:fixture-token").toString("base64")}`);
		assert.equal(call.options.cache, "no-store");
		assert.ok(call.options.signal instanceof AbortSignal);
	}
	assert.deepEqual(result[0], { idMember: 1, firstName: "Ana", lastName: "Souza", displayName: "Ana Souza" });
});

test("second-page HTTP and network failures reject instead of returning a partial pool", async () => {
	for (const failure of [page({ secret: "PRIVATE_BODY" }, 503), new Error("PRIVATE_NETWORK")]) {
		const h = harness([page(Array.from({ length: 50 }, (_, i) => member(i + 1))), failure]);
		await assert.rejects(fetchEligibleMembers(h.options), /request failed/i);
		assert.equal(h.calls.length, 2);
	}
});

test("429 retries once per page with bounded waits, including enormous Retry-After", async () => {
	const h = harness([page(null, 429, "999999999"), page([member(1)])]);
	assert.equal((await fetchEligibleMembers(h.options)).length, 1);
	assert.equal(h.calls.length, 2);
	assert.equal(h.waits.length, 1);
	assert.ok(h.waits[0] >= 0 && h.waits[0] <= 5000);
	assert.equal(h.calls[0].url, h.calls[1].url);
	const exhausted = harness([page(null, 429), page(null, 429)]);
	await assert.rejects(fetchEligibleMembers(exhausted.options), /rate limit/i);
	assert.equal(exhausted.calls.length, 2);
	assert.equal(exhausted.waits.length, 1);
});

test("rate-limit retry budget resets on each page", async () => {
	const h = harness([page(null, 429), page(Array.from({ length: 50 }, (_, i) => member(i + 1))), page(null, 429), page([])]);
	assert.equal((await fetchEligibleMembers(h.options)).length, 50);
	assert.equal(h.calls.length, 4);
});

test("duplicate IDs fail within and across pages, including excluded records", async () => {
	for (const responses of [
		[page([member(1), member(1, { accessBlocked: true })])],
		[page(Array.from({ length: 50 }, (_, i) => member(i + 1))), page([member(1)])],
	]) await assert.rejects(fetchEligibleMembers(harness(responses).options), /duplicate/i);
});

test("matches EVO exclusions without excluding inactive-looking false flags", async () => {
	const exclusions = [
		{ gympassId: "fixture" }, { tokenGympass: "fixture" }, { codeGympass: "fixture" },
		{ codeTotalpass: "fixture" }, { personalTrainer: true }, { personalType: 1 },
		{ membershipStatus: "Plano ViP" }, { notes: "beneficio vIp" }, { accessBlocked: true },
		{ membershipStatus: "Pendente" }, { membershipStatus: "Pending" }, { membershipStatus: "Aguardando" },
	];
	const records = exclusions.map((flags, i) => member(i + 1, flags));
	records.push(member(100, { gympassId: null, personalTrainer: false, personalType: 0, accessBlocked: false, membershipStatus: "Ativo", notes: "" }));
	assert.deepEqual((await fetchEligibleMembers(harness([page(records)]).options)).map((item) => item.idMember), [100]);
});

test("formats first and last names with register-name and single-name fallbacks", async () => {
	const h = harness([page([
		member(1, { firstName: "  JOÃO   PEDRO  ", lastName: " DA SILVA " }),
		member(2, { firstName: "", lastName: null, registerName: "MARIA DOS SANTOS" }),
		member(3, { firstName: "ÉRICA", lastName: "" }),
		member(4, { firstName: null, lastName: "", registerName: "LIA", registerLastName: "DE LIMA" }),
	])]);
	assert.deepEqual((await fetchEligibleMembers(h.options)).map((item) => item.displayName), ["João Silva", "Maria Santos", "Érica", "Lia Lima"]);
});

test("returns only minimal fields, never confidential input properties", async () => {
	const result = await fetchEligibleMembers(harness([page([member(1, { email: "fixture@example.invalid", document: "PRIVATE", address: "PRIVATE", nested: { secret: "PRIVATE" } })])]).options);
	assert.deepEqual(Object.keys(result[0]).sort(), ["displayName", "firstName", "idMember", "lastName"]);
	assert.ok(!JSON.stringify(result).includes("PRIVATE"));
});

test("rejects malformed pages and JSON rather than accepting an incomplete pool", async () => {
	for (const data of [null, {}, { items: [] }, "PRIVATE_BODY", Array.from({ length: 51 }, (_, i) => member(i + 1))]) {
		await assert.rejects(fetchEligibleMembers(harness([page(data)]).options), /page/i);
	}
	await assert.rejects(fetchEligibleMembers(harness([{ ...page(null), json: async () => { throw new Error("PRIVATE_JSON"); } }]).options), /page/i);
});

test("rejects malformed relevant records including excluded records", async () => {
	const invalid = [null, [], {}, member(0), member(-1), member(1.5), member("1"), member(Number.MAX_SAFE_INTEGER + 1),
		member(1, { firstName: "", lastName: "" }), member(1, { firstName: "123" }), member(1, { firstName: {} }),
		member(1, { lastName: 42 }), member(1, { membershipStatus: {} }), member(1, { notes: [] }),
		member(1, { gympassId: {} }), member(1, { accessBlocked: {} }), member(1, { registerName: [] }),
		member(0, { accessBlocked: true })];
	for (const record of invalid) await assert.rejects(fetchEligibleMembers(harness([page([record])]).options), /record/i);
});

test("max-page exhaustion fails closed and short final page succeeds", async () => {
	const full = Array.from({ length: 50 }, (_, i) => member(i + 1));
	const h = harness([page(full)]);
	await assert.rejects(fetchEligibleMembers({ ...h.options, maxPages: 1 }), /page limit/i);
	assert.equal(h.calls.length, 1);
	assert.deepEqual(await fetchEligibleMembers({ ...harness([page([])]).options, maxPages: 1 }), []);
});

test("invalid configuration is rejected before any request", async () => {
	for (const override of [
		{ dns: "" }, { dns: "bad:dns" }, { token: " " }, { token: 123 }, { dns: "bad\nvalue" },
		{ branchId: 0 }, { branchId: "1&status=0" }, { branchId: 1.5 }, { branchId: Number.MAX_SAFE_INTEGER + 1 },
		{ maxPages: 0 }, { maxPages: 1.5 }, { fetchImpl: null }, { sleep: null },
	]) {
		const h = harness([]);
		await assert.rejects(fetchEligibleMembers({ ...h.options, ...override }), /configuration/i);
		assert.equal(h.calls.length, 0);
	}
	await assert.rejects(fetchEligibleMembers(), /configuration/i);
});

test("errors never expose response bodies, credentials, raw exceptions, or record values", async () => {
	const sensitive = "PRIVATE_BODY fixture-token fixture-dns PRIVATE_PERSON";
	for (const response of [page(sensitive, 500), new Error(sensitive), { ...page(null), json: async () => { throw new Error(sensitive); } }, page([member(0, { firstName: sensitive })])]) {
		await assert.rejects(fetchEligibleMembers(harness([response]).options), (error) => {
			const serialized = `${error.stack} ${JSON.stringify(error)}`;
			return !["PRIVATE_BODY", "fixture-token", "fixture-dns", "PRIVATE_PERSON"].some((value) => serialized.includes(value));
		});
	}
});

test("does not reuse a previous successful pool on a later failure", async () => {
	assert.equal((await fetchEligibleMembers(harness([page([member(1)])]).options)).length, 1);
	await assert.rejects(fetchEligibleMembers(harness([page(null, 500)]).options));
});
