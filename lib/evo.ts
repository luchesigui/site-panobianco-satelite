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
  phone: string;     // whatsapp — só dígitos
  birthdate: string; // YYYY-MM-DD
  gender: "M" | "F";
  goal: string;
  plan: string;
}

export async function createEvoProspect(input: EvoProspectInput): Promise<number | null> {
  const missing = ["EVO_DNS", "EVO_TOKEN", "EVO_BRANCH_ID"].filter((k) => !process.env[k]);
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

const PARTNER_MEMBERSHIP_IDS = { wellhub: 11369, totalpass: 12436 } as const;

export interface PartnerMemberInput {
  name: string;
  lastName: string;
  cpf: string;
  email: string;
  phone: string;
  birthdate: string; // YYYY-MM-DD
  gender: "M" | "F";
  partner: "wellhub" | "totalpass";
  zipCode: string;
  partnerId: string; // Wellhub or TotalPass member ID
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

  const partnerLabel = input.partner === "wellhub" ? "Wellhub" : "TotalPass";
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
  };
  if (input.partner === "wellhub") {
    prospectBody.tokenGympass = partnerId;
  } else {
    prospectBody.additionalFieldName = "ID TotalPass";
    prospectBody.additionalFieldValue = partnerId;
  }

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
    return { success: false, error: "Erro ao criar cadastro. Tente novamente." };
  } else {
    try {
      const d = JSON.parse(prospectRaw);
      idProspect = d.idProspect ?? d.id ?? d.prospectId ?? null;
    } catch {
      return { success: false, error: "Erro ao processar resposta do servidor." };
    }
  }

  if (!idProspect) {
    return { success: false, error: "Erro ao criar cadastro. Tente novamente." };
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
    return { success: false, error: "Cadastro criado, mas erro ao vincular plano. Contate a recepção." };
  }

  try {
    const saleData = JSON.parse(saleRaw);
    const idCliente: number | null = saleData.idCliente ?? null;
    const linkAceiteContrato: string | undefined =
      saleData.clienteContratos?.[0]?.linkAceiteContrato ?? undefined;

    if (!idCliente) {
      console.warn("[evo] idCliente not found in sale response:", saleRaw);
    }

    return { success: true, idCliente: idCliente ?? undefined, linkAceiteContrato };
  } catch {
    console.error("[evo] failed to parse sale response");
    return { success: true };
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
  if (!data.cartCheckoutLink) throw new Error("No cartCheckoutLink in EVO response");
  return data.cartCheckoutLink as string;
}
