const ENDPOINT = "https://evo-integracao-api.w12app.com.br/api/v2/members";
const TAKE = 50;
const TIMEOUT_MS = 60_000;
const MAX_RETRY_MS = 5_000;
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function positiveInteger(value) {
	return typeof value === "number" && Number.isSafeInteger(value) && value > 0;
}

function humanName(value) {
	return typeof value === "string" && /\p{L}/u.test(value) &&
		/^[\p{L}\p{M}\p{Zs}'’.-]+$/u.test(value);
}

function invalidRecord() {
	throw new Error("Invalid EVO member record.");
}

function validateRecord(item) {
	if (!item || typeof item !== "object" || Array.isArray(item) || !positiveInteger(item.idMember)) invalidRecord();
	for (const field of ["firstName", "lastName", "registerName", "registerLastName"]) {
		const value = item[field];
		if (value != null && (typeof value !== "string" || (value.trim() && !humanName(value)))) invalidRecord();
	}
	const firstName = item.firstName || item.registerName;
	const lastName = item.lastName || item.registerLastName;
	if (!humanName(firstName) || (lastName && !humanName(lastName))) invalidRecord();
	for (const field of ["membershipStatus", "notes"]) {
		if (item[field] != null && typeof item[field] !== "string") invalidRecord();
	}
	for (const field of ["gympassId", "tokenGympass", "codeGympass", "codeTotalpass", "personalTrainer", "personalType", "accessBlocked"]) {
		const value = item[field];
		if (value != null && !["string", "number", "boolean"].includes(typeof value)) invalidRecord();
		if (typeof value === "number" && !Number.isFinite(value)) invalidRecord();
	}
}

function excluded(item) {
	return Boolean(
		item.gympassId || item.tokenGympass || item.codeGympass || item.codeTotalpass ||
		item.personalTrainer || item.personalType || item.accessBlocked ||
		item.membershipStatus?.toLowerCase().includes("vip") || item.notes?.toLowerCase().includes("vip") ||
		["Pendente", "Pending", "Aguardando"].includes(item.membershipStatus),
	);
}

function formatMember(item) {
	const firstParts = (item.firstName || item.registerName).trim().split(/\s+/).filter(Boolean);
	const lastParts = (item.lastName || item.registerLastName || "").trim().split(/\s+/).filter(Boolean);
	const title = (value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
	const firstName = title(firstParts[0].toLowerCase());
	const last = lastParts.at(-1) || (firstParts.length > 1 ? firstParts.at(-1) : "");
	const lastName = last ? title(last.toLowerCase()) : "";
	return { idMember: item.idMember, firstName, lastName, displayName: lastName ? `${firstName} ${lastName}` : firstName };
}

function retryDelay(response) {
	const value = response.headers?.get?.("retry-after");
	if (!value) return 1500;
	const seconds = Number(value);
	const delay = Number.isFinite(seconds) ? seconds * 1000 : Date.parse(value) - Date.now();
	return Number.isFinite(delay) ? Math.max(0, Math.min(MAX_RETRY_MS, delay)) : 1500;
}

/** Full financial pagination, without a lookback cutoff that could hide old debts. */
async function fetchOverdueMemberIds({ headers, branch, fetchImpl, sleep, maxPages, now }) {
	const instant = now();
	if (!(instant instanceof Date) || !Number.isFinite(instant.getTime())) throw new Error("Invalid EVO financial date.");
	const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(instant);
	const part = (type) => parts.find((entry) => entry.type === type).value;
	const today = `${part("year")}-${part("month")}-${part("day")}`;
	const yesterday = new Date(`${today}T00:00:00Z`);
	yesterday.setUTCDate(yesterday.getUTCDate() - 1);
	const overdue = new Set();
	const seen = new Set();
	let expectedTotal;
	for (let index = 0; index < maxPages; index++) {
		const url = new URL("https://evo-integracao-api.w12app.com.br/api/v1/receivables");
		url.search = new URLSearchParams({ idBranch: String(branch), accountStatus: "1,4", dueDateEnd: yesterday.toISOString().slice(0, 10), take: String(TAKE), skip: String(index * TAKE) }).toString();
		let response;
		for (let attempt = 0; attempt < 2; attempt++) {
			try {
				response = await fetchImpl(url.toString(), { headers, cache: "no-store", signal: AbortSignal.timeout(TIMEOUT_MS) });
			} catch { throw new Error("EVO financial request failed."); }
			if (response?.status !== 429) break;
			if (attempt === 1) throw new Error("EVO financial rate limit exhausted.");
			try { await sleep(retryDelay(response)); } catch { throw new Error("EVO financial rate limit wait failed."); }
		}
		if (!response?.ok) throw new Error("EVO financial request failed.");
		let data;
		try { data = await response.json(); } catch { throw new Error("Invalid EVO financial page."); }
		const rows = Array.isArray(data) ? data : data?.lista;
		const total = Array.isArray(data) ? null : data?.qtde;
		if (!Array.isArray(rows) || rows.length > TAKE || (total !== null && (!Number.isSafeInteger(total) || total < 0))) throw new Error("Invalid EVO financial page.");
		if (index === 0) expectedTotal = total;
		if (total !== expectedTotal) throw new Error("EVO financial total changed.");
		for (const item of rows) {
			if (!item || !positiveInteger(item.idReceivable) || !Number.isInteger(item.idMemberPayer) || item.idMemberPayer < 0 ||
				!/^\d{4}-\d{2}-\d{2}(?:T|$)/.test(item.dueDate) || !Number.isFinite(Date.parse(item.dueDate)) ||
				![1, 2, 3, 4].includes(item.status?.id) ||
				!Number.isFinite(item.ammount) || item.ammount < 0 || (item.ammountPaid !== null && (!Number.isFinite(item.ammountPaid) || item.ammountPaid < 0)) ||
				(item.cancellationDate != null && (typeof item.cancellationDate !== "string" || !Number.isFinite(Date.parse(item.cancellationDate))))) throw new Error("Invalid EVO financial record.");
			if (seen.has(item.idReceivable)) throw new Error("Duplicate EVO financial record.");
			seen.add(item.idReceivable);
			if (item.idMemberPayer > 0 && [1, 4].includes(item.status.id) && !item.cancellationDate &&
				item.dueDate.slice(0, 10) < today && Math.round(item.ammount * 100) > Math.round((item.ammountPaid ?? 0) * 100)) overdue.add(item.idMemberPayer);
		}
		if (expectedTotal === null) {
			if (rows.length < TAKE) return overdue;
		} else {
			if (seen.size > expectedTotal) throw new Error("Invalid EVO financial total.");
			if (seen.size === expectedTotal) return overdue;
			if (rows.length < TAKE) throw new Error("Incomplete EVO financial page.");
		}
	}
	throw new Error("EVO financial page limit exhausted.");
}

/**
 * Fetch a complete fresh pool or reject. Never log upstream data or errors.
 * @param {{dns?: string, token?: string, branchId?: string | number, fetchImpl?: typeof fetch, sleep?: (ms: number) => Promise<void>, maxPages?: number, now?: () => Date, checkFinances?: boolean}} options
 */
export async function fetchEligibleMembers({
	dns, token, branchId, fetchImpl = fetch, sleep = pause, maxPages = 500, now = () => new Date(), checkFinances = true,
} = {}) {
	const validCredential = (value) => typeof value === "string" && value.trim().length > 0 && !/[\x00-\x1f\x7f]/.test(value);
	const branch = typeof branchId === "string" && /^[1-9]\d*$/.test(branchId) ? Number(branchId) : branchId;
	if (!validCredential(dns) || dns.includes(":") || !validCredential(token) ||
		!positiveInteger(branch) || !positiveInteger(maxPages) ||
		typeof fetchImpl !== "function" || typeof sleep !== "function") {
		throw new Error("Invalid EVO eligibility configuration.");
	}

	const headers = {
		Authorization: `Basic ${Buffer.from(`${dns}:${token}`).toString("base64")}`,
		accept: "application/json",
	};
	const members = [];
	const seen = new Set();
	for (let pageIndex = 0; pageIndex < maxPages; pageIndex++) {
		const url = new URL(ENDPOINT);
		url.search = new URLSearchParams({ idBranch: String(branch), status: "1", take: String(TAKE), skip: String(pageIndex * TAKE) }).toString();
		let response;
		for (let attempt = 0; attempt < 2; attempt++) {
			try {
				response = await fetchImpl(url.toString(), { headers, cache: "no-store", signal: AbortSignal.timeout(TIMEOUT_MS) });
			} catch {
				throw new Error("EVO eligibility request failed.");
			}
			if (response?.status !== 429) break;
			if (attempt === 1) throw new Error("EVO eligibility rate limit exhausted.");
			try {
				await sleep(retryDelay(response));
			} catch {
				throw new Error("EVO eligibility rate limit wait failed.");
			}
		}
		if (!response?.ok) throw new Error("EVO eligibility request failed.");
		let data;
		try {
			data = await response.json();
		} catch {
			throw new Error("Invalid EVO eligibility page.");
		}
		if (!Array.isArray(data) || data.length > TAKE) throw new Error("Invalid EVO eligibility page.");
		for (const item of data) {
			validateRecord(item);
			if (seen.has(item.idMember)) throw new Error("Duplicate EVO member ID.");
			seen.add(item.idMember);
			if (!excluded(item)) members.push(formatMember(item));
		}
		if (data.length < TAKE) {
			if (!checkFinances) return members;
			const overdue = await fetchOverdueMemberIds({ headers, branch, fetchImpl, sleep, maxPages, now });
			return members.filter((member) => !overdue.has(member.idMember));
		}
	}
	throw new Error("EVO eligibility page limit exhausted.");
}
