const EVO_BASE = "https://evo-integracao-api.w12app.com.br";

function evoAuthHeader(): string {
	return `Basic ${Buffer.from(`${process.env.EVO_DNS}:${process.env.EVO_TOKEN}`).toString("base64")}`;
}

const GOAL_LABELS: Record<string, string> = {
	lose_weight: "Emagrecer e perder gordura",
	gain_muscle: "Ganhar massa e definição",
	energy: "Ter mais disposição e energia",
	health: "Saúde, bem-estar e qualidade de vida",
};

const PLAN_LABELS: Record<string, string> = {
	orange: "Orange Anual (R$ 119,90)",
	platinum_rec: "Platinum Recorrente (R$ 139,90)",
	platinum_month: "Platinum Mensal (R$ 159,90)",
	too_expensive: "Achou caro (fluxo ebook)",
};

export interface EvoProspectInput {
	firstName: string;
	email: string;
	phone: string; // whatsapp — só dígitos
	birthdate: string; // YYYY-MM-DD
	gender: "M" | "F";
	goal: string;
	plan: string;
	healthMotivation?: string;
}

function getInterests(goal: string, healthMotivation?: string): number[] {
	if (goal === "lose_weight") return [104];
	if (goal === "gain_muscle") return [103];
	if (goal === "health") {
		if (healthMotivation === "stress") return [101];
		if (healthMotivation === "doctor") return [105];
		return [102];
	}
	return [];
}

export async function createEvoProspect(
	input: EvoProspectInput,
): Promise<number | null> {
	const missing = ["EVO_DNS", "EVO_TOKEN", "EVO_BRANCH_ID"].filter(
		(k) => !process.env[k],
	);
	if (missing.length > 0) {
		console.error("[evo] missing env vars:", missing);
		return null;
	}

	const goalLabel = GOAL_LABELS[input.goal] ?? input.goal;
	const planLabel = PLAN_LABELS[input.plan] ?? input.plan;

	const body = {
		name: input.firstName,
		lastName: "",
		email: input.email,
		cellphone: input.phone.replace(/\D/g, ""),
		birthday: `${input.birthdate}T00:00:00`,
		gender: input.gender,
		idBranch: Number(process.env.EVO_BRANCH_ID),
		notes: `Lead do quiz online. Objetivo: ${goalLabel}. Plano: ${planLabel}.`,
		temperature: 3,
		interests: getInterests(input.goal, input.healthMotivation),
	};

	const res = await fetch(`${EVO_BASE}/api/v1/prospects`, {
		method: "POST",
		headers: {
			Authorization: evoAuthHeader(),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		body: JSON.stringify(body),
	});

	const raw = await res.text();
	console.log("[evo] prospect", res.status, raw);

	if (res.status === 409) {
		try {
			const c = JSON.parse(raw);
			return (c.idProspect ?? c.id ?? c.prospectId ?? null) as number | null;
		} catch {
			return null;
		}
	}

	if (!res.ok) {
		console.error("[evo] prospect creation failed:", res.status, raw);
		return null;
	}

	try {
		const d = JSON.parse(raw);
		return (d.idProspect ?? d.id ?? d.prospectId ?? null) as number | null;
	} catch {
		return null;
	}
}

const PARTNER_MEMBERSHIP_IDS = { wellhub: 11369 } as const;

export interface PartnerMemberInput {
	name: string;
	lastName: string;
	cpf: string;
	email: string;
	phone: string;
	birthdate: string; // YYYY-MM-DD
	gender: "M" | "F";
	partner: "wellhub";
	zipCode: string;
	partnerId: string; // Wellhub member ID
}

export interface PartnerMemberResult {
	success: boolean;
	error?: string;
	idCliente?: number;
	linkAceiteContrato?: string;
}

export async function createPartnerMember(
	input: PartnerMemberInput,
): Promise<PartnerMemberResult> {
	const missing = ["EVO_DNS", "EVO_TOKEN", "EVO_BRANCH_ID"].filter(
		(k) => !process.env[k],
	);
	if (missing.length > 0) {
		console.error("[evo] missing env vars:", missing);
		return { success: false, error: "Erro de configuração do servidor." };
	}

	const idBranch = Number(process.env.EVO_BRANCH_ID);

	const partnerLabel = "Wellhub";
	const partnerId = input.partnerId.trim();
	const prospectBody: Record<string, unknown> = {
		name: input.name,
		lastName: input.lastName,
		email: input.email,
		cellphone: input.phone.replace(/\D/g, ""),
		birthday: `${input.birthdate}T00:00:00`,
		gender: input.gender,
		cpf: input.cpf.replace(/\D/g, ""),
		zipCode: input.zipCode.replace(/\D/g, ""),
		idBranch,
		temperature: 3,
		notes: `Cadastro via site — parceiro: ${partnerLabel}. ID ${partnerLabel}: ${partnerId}.`,
		tokenGympass: partnerId,
	};

	const prospectRes = await fetch(`${EVO_BASE}/api/v1/prospects`, {
		method: "POST",
		headers: {
			Authorization: evoAuthHeader(),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		body: JSON.stringify(prospectBody),
	});

	const prospectRaw = await prospectRes.text();
	console.log("[evo] partner prospect", prospectRes.status, prospectRaw);

	let idProspect: number | null = null;
	if (prospectRes.status === 409) {
		try {
			const c = JSON.parse(prospectRaw);
			idProspect = c.idProspect ?? c.id ?? c.prospectId ?? null;
		} catch {
			return { success: false, error: "CPF já cadastrado no sistema." };
		}
	} else if (!prospectRes.ok) {
		console.error("[evo] prospect failed:", prospectRes.status, prospectRaw);
		return {
			success: false,
			error: "Erro ao criar cadastro. Tente novamente.",
		};
	} else {
		try {
			const d = JSON.parse(prospectRaw);
			idProspect = d.idProspect ?? d.id ?? d.prospectId ?? null;
		} catch {
			return {
				success: false,
				error: "Erro ao processar resposta do servidor.",
			};
		}
	}

	if (!idProspect) {
		return {
			success: false,
			error: "Erro ao criar cadastro. Tente novamente.",
		};
	}

	const saleBody = {
		idBranch,
		idMembership: PARTNER_MEMBERSHIP_IDS[input.partner],
		membershipValue: 0,
		idProspect,
		payment: 6,
		totalInstallments: 1,
	};

	const saleRes = await fetch(`${EVO_BASE}/api/v2/sales`, {
		method: "POST",
		headers: {
			Authorization: evoAuthHeader(),
			"Content-Type": "application/json",
			accept: "application/json",
			culture: "pt-BR",
		},
		body: JSON.stringify(saleBody),
	});

	const saleRaw = await saleRes.text();
	console.log("[evo] partner sale", saleRes.status, saleRaw);

	if (!saleRes.ok) {
		console.error("[evo] sale failed:", saleRes.status, saleRaw);
		return {
			success: false,
			error: "Cadastro criado, mas erro ao vincular plano. Contate a recepção.",
		};
	}

	try {
		const saleData = JSON.parse(saleRaw);
		const idCliente: number | null = saleData.idCliente ?? null;
		const linkAceiteContrato: string | undefined =
			saleData.clienteContratos?.[0]?.linkAceiteContrato ?? undefined;

		if (!idCliente) {
			console.warn("[evo] idCliente not found in sale response:", saleRaw);
		}

		return {
			success: true,
			idCliente: idCliente ?? undefined,
			linkAceiteContrato,
		};
	} catch {
		console.error("[evo] failed to parse sale response");
		return { success: true };
	}
}

export interface EvoMemberLookup {
	idMember: number;
	name: string;
	email?: string;
}

export async function findMemberByEmailOrCpf(
	identifier: string,
): Promise<EvoMemberLookup | null> {
	const missing = ["EVO_DNS", "EVO_TOKEN"].filter((k) => !process.env[k]);
	if (missing.length > 0) {
		console.error("[evo] missing env vars:", missing);
		return null;
	}

	const digits = identifier.replace(/\D/g, "");
	const isCpf = !identifier.includes("@") && digits.length === 11;
	const params = new URLSearchParams(
		isCpf ? { document: digits } : { email: identifier },
	);
	if (process.env.EVO_BRANCH_ID) {
		params.set("idBranch", process.env.EVO_BRANCH_ID);
	}

	const res = await fetch(`${EVO_BASE}/api/v2/members?${params}`, {
		headers: {
			Authorization: evoAuthHeader(),
			accept: "application/json",
		},
	});

	const raw = await res.text();
	console.log("[evo] member lookup", res.status);

	if (!res.ok) return null;

	try {
		const list = JSON.parse(raw);
		const member = Array.isArray(list) ? list[0] : null;
		if (!member?.idMember) return null;

		const email = (member.contacts ?? []).find(
			(c: { contactType?: string }) => c.contactType === "E-mail",
		)?.description;
		const name = [member.firstName, member.lastName].filter(Boolean).join(" ");

		return {
			idMember: member.idMember,
			name: name || member.registerName || "",
			email: typeof email === "string" ? email : undefined,
		};
	} catch {
		console.error("[evo] failed to parse member lookup response");
		return null;
	}
}

export async function createCheckoutLink(
	plan: "orange" | "platinum",
	idProspect?: number | null,
): Promise<string> {
	const membershipIds = {
		orange: Number(process.env.EVO_MEMBERSHIP_ID_ORANGE),
		platinum: Number(process.env.EVO_MEMBERSHIP_ID_PLATINUM),
	};

	const cartBody: Record<string, unknown> = {
		idBranch: Number(process.env.EVO_BRANCH_ID),
		idMember: null,
		items: [{ idMembership: membershipIds[plan] }],
	};
	if (idProspect) cartBody.idProspect = idProspect;

	const res = await fetch(`${EVO_BASE}/api/v1/carts`, {
		method: "POST",
		headers: {
			Authorization: evoAuthHeader(),
			"Content-Type": "application/json",
		},
		body: JSON.stringify(cartBody),
	});

	if (!res.ok) throw new Error(`EVO API error: ${res.status}`);
	const data = await res.json();
	if (!data.cartCheckoutLink)
		throw new Error("No cartCheckoutLink in EVO response");
	return data.cartCheckoutLink as string;
}

export interface EvoActiveMember {
	idMember: number;
	firstName: string;
	lastName: string;
	displayName: string;
}

function toTitleCase(str: string): string {
	return str
		.toLowerCase()
		.split(/\s+/)
		.filter(Boolean)
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
		.join(" ");
}

export function formatFirstAndLastName(firstName?: string, lastName?: string) {
	const cleanFirst = (firstName || "").trim();
	const cleanLast = (lastName || "").trim();

	const firstParts = cleanFirst.split(/\s+/).filter(Boolean);
	const lastParts = cleanLast.split(/\s+/).filter(Boolean);

	const first = firstParts[0] ? toTitleCase(firstParts[0]) : "Aluno";
	const last =
		lastParts.length > 0
			? toTitleCase(lastParts[lastParts.length - 1])
			: firstParts.length > 1
				? toTitleCase(firstParts[firstParts.length - 1])
				: "";

	return {
		first,
		last,
		displayName: last ? `${first} ${last}` : first,
	};
}

let activeMembersCache: {
	data: EvoActiveMember[];
	timestamp: number;
} | null = null;
const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour

export async function getActiveMembers(
	forceRefresh = false,
): Promise<EvoActiveMember[]> {
	const now = Date.now();
	if (
		!forceRefresh &&
		activeMembersCache &&
		now - activeMembersCache.timestamp < CACHE_DURATION_MS
	) {
		console.log(
			`[evo] Returning ${activeMembersCache.data.length} cached active members (age: ${Math.round((now - activeMembersCache.timestamp) / 1000)}s)`,
		);
		return activeMembersCache.data;
	}

	const missing = ["EVO_DNS", "EVO_TOKEN", "EVO_BRANCH_ID"].filter(
		(k) => !process.env[k],
	);
	if (missing.length > 0) {
		console.error("[evo] missing env vars:", missing);
		return activeMembersCache?.data || [];
	}

	const idBranch = process.env.EVO_BRANCH_ID;
	const take = 50;
	let skip = 0;
	const allMembers: EvoActiveMember[] = [];

	while (true) {
		try {
			const res = await fetch(
				`${EVO_BASE}/api/v2/members?idBranch=${idBranch}&status=1&take=${take}&skip=${skip}`,
				{
					headers: {
						Authorization: evoAuthHeader(),
						accept: "application/json",
					},
					cache: "no-store",
				},
			);

			if (res.status === 429) {
				console.warn(`[evo] Rate limited (429) at skip ${skip}, backing off...`);
				await new Promise((r) => setTimeout(r, 1500));
				continue;
			}

			if (!res.ok) {
				console.error("[evo] getActiveMembers failed status:", res.status);
				break;
			}

			const data = await res.json();
			if (!Array.isArray(data) || data.length === 0) break;

			for (const item of data) {
				if (!item.idMember) continue;

				// Exclude Gympass / Wellhub
				const isWellhub = Boolean(
					item.gympassId || item.tokenGympass || item.codeGympass,
				);
				// Exclude Totalpass
				const isTotalpass = Boolean(item.codeTotalpass);
				// Exclude Personal
				const isPersonal = Boolean(item.personalTrainer || item.personalType);
				// Exclude VIP
				const isVIP = Boolean(
					item.membershipStatus?.toLowerCase().includes("vip") ||
						item.notes?.toLowerCase().includes("vip"),
				);
				// Exclude blocked or pending
				const isBlockedOrPending = Boolean(
					item.accessBlocked ||
						item.membershipStatus === "Pendente" ||
						item.membershipStatus === "Pending" ||
						item.membershipStatus === "Aguardando",
				);

				if (isWellhub || isTotalpass || isPersonal || isVIP || isBlockedOrPending) {
					continue;
				}

				const formatted = formatFirstAndLastName(
					item.firstName || item.registerName,
					item.lastName || item.registerLastName,
				);

				allMembers.push({
					idMember: item.idMember,
					firstName: formatted.first,
					lastName: formatted.last,
					displayName: formatted.displayName,
				});
			}

			if (data.length < take) break;
			skip += take;
			await new Promise((r) => setTimeout(r, 50));
		} catch (err) {
			console.error("[evo] error fetching active members:", err);
			break;
		}
	}

	if (allMembers.length > 0) {
		activeMembersCache = {
			data: allMembers,
			timestamp: now,
		};
	}

	return allMembers.length > 0
		? allMembers
		: activeMembersCache?.data || [];
}



