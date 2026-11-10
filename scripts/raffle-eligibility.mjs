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

/** Fetch a complete fresh pool or reject. Never log upstream data or errors. */
export async function fetchEligibleMembers({
	dns, token, branchId, fetchImpl = fetch, sleep = pause, maxPages = 500,
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
		if (data.length < TAKE) return members;
	}
	throw new Error("EVO eligibility page limit exhausted.");
}
