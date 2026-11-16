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
function harness(responses, financialResponses = [page({ qtde: 0, lista: [] })]) {
	const calls = [];
	const financialCalls = [];
	const waits = [];
	return {
		calls, waits, financialCalls,
		options: {
			...config,
			now: () => new Date("2026-11-16T02:30:00Z"),
			fetchImpl: async (url, options) => {
				const financial = new URL(url).pathname === "/api/v1/receivables";
				(financial ? financialCalls : calls).push({ url, options });
				const response = (financial ? financialResponses : responses).shift();
				if (response instanceof Error) throw response;
				assert.ok(response, "Unexpected fixture request");
				return response;
			},
			sleep: async (ms) => { waits.push(ms); },
		},
	};
}

const receivable = (idMemberPayer, extra = {}) => ({
	idReceivable: idMemberPayer, idMemberPayer, dueDate: "2026-11-14T00:00:00",
	status: { id: 4 }, ammount: 100, ammountPaid: 0, cancellationDate: null, ...extra,
});

test("excludes active members with overdue unpaid balances, including partial payments", async () => {
	const records = [receivable(1), receivable(2, { ammountPaid: 10 }),
		receivable(3, { dueDate: "2026-11-15T00:00:00" }),
		receivable(4, { dueDate: "2026-11-16T00:00:00" }),
		receivable(5, { ammountPaid: 100, status: { id: 2 } }),
		receivable(6, { status: { id: 3 }, cancellationDate: "2026-11-10T00:00:00" }),
		receivable(7, { dueDate: "2020-01-01T00:00:00", status: { id: 1 } })];
	const h = harness([page(Array.from({ length: 8 }, (_, i) => member(i + 1)))], [page({ qtde: records.length, lista: records })]);
	assert.deepEqual((await fetchEligibleMembers(h.options)).map(x => x.idMember), [3, 4, 5, 6, 8]);
	assert.equal(h.financialCalls.length, 1);
	const params = new URL(h.financialCalls[0].url).searchParams;
	assert.equal(params.get("idBranch"), "1");
	assert.equal(params.get("accountStatus"), "1,4");
	assert.equal(params.get("dueDateEnd"), "2026-11-14");
	assert.equal(params.has("dueDateStart"), false, "must not overlook old debts");
});

test("candidate loading does not query finances before selection", async () => {
	const h = harness([page([member(1),member(2)])]);
	assert.equal((await fetchEligibleMembers({...h.options, checkFinances:false})).length,2);
	assert.equal(h.financialCalls.length,0);
});

test("live EVO null ammountPaid means no payment and excludes overdue balance", async () => {
	const h = harness([page([member(1), member(2)])], [page([receivable(1, { ammountPaid: null })])]);
	assert.deepEqual((await fetchEligibleMembers(h.options)).map(x => x.idMember), [2]);
});

test("accepts the live EVO array contract and paginates to a short page", async () => {
	const full = Array.from({ length: 50 }, (_, i) => receivable(i + 1));
	const h = harness([page([member(51), member(52)])], [page(full), page([receivable(51)])]);
	assert.deepEqual((await fetchEligibleMembers(h.options)).map(x => x.idMember), [52]);
	assert.equal(h.financialCalls.length, 2);
});

test("financial pagination is complete, authenticated and uncached", async () => {
	const full = Array.from({ length: 50 }, (_, i) => receivable(i + 1));
	const h = harness([page([member(51), member(52)])], [page({ qtde: 51, lista: full }), page({ qtde: 51, lista: [receivable(51)] })]);
	assert.deepEqual((await fetchEligibleMembers(h.options)).map(x => x.idMember), [52]);
	assert.equal(h.financialCalls.length, 2);
	for (const [i, call] of h.financialCalls.entries()) {
		assert.equal(new URL(call.url).searchParams.get("skip"), String(i * 50));
		assert.equal(call.options.cache, "no-store");
		assert.ok(call.options.signal instanceof AbortSignal);
		assert.equal(call.options.headers.Authorization, h.calls[0].options.headers.Authorization);
	}
});

test("financial errors, malformed and incomplete responses abort the entire pool", async () => {
	for (const response of [page({}, 503), new Error("PRIVATE_NETWORK"), page(null), page({ qtde: 1, lista: [] }),
		page({ qtde: 0, lista: [receivable(1)] }), page({ qtde: 1, lista: [receivable(1, { ammountPaid: "invalid" })] }),
		page({ qtde: 2, lista: [receivable(1), receivable(1)] }), page({ qtde: 1, lista: [receivable(1, { dueDate: "PRIVATE" })] })]) {
		await assert.rejects(fetchEligibleMembers(harness([page([member(1)])], [response]).options), /financial/i);
	}
	const full = Array.from({ length: 50 }, (_, i) => receivable(i + 1));
	for (const second of [page({}, 500), page({ qtde: 52, lista: [receivable(51)] }), page({ qtde: 51, lista: [] })]) {
		await assert.rejects(fetchEligibleMembers(harness([page([member(1)])], [page({ qtde: 51, lista: full }), second]).options), /financial/i);
	}
	const h = harness([page([member(1)])], [page({ qtde: 51, lista: full })]);
	await assert.rejects(fetchEligibleMembers({ ...h.options, maxPages: 1 }), /financial page limit/i);
});

test("financial rate limits retry once with bounded waits and then fail closed", async () => {
	const h = harness([page([member(1)])], [page(null, 429, "999999"), page({ qtde: 0, lista: [] })]);
	assert.equal((await fetchEligibleMembers(h.options)).length, 1);
	assert.deepEqual(h.waits, [5000]);
	assert.equal(h.financialCalls.length, 2);
	await assert.rejects(fetchEligibleMembers(harness([page([member(1)])], [page(null, 429), page(null, 429)]).options), /financial rate limit/);
});

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
