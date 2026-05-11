import { type NextRequest, NextResponse } from "next/server";

import { createPartnerMember } from "@/lib/evo";

export async function POST(req: NextRequest) {
	const body = await req.json().catch(() => null);
	if (!body) {
		return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
	}

	const {
		name,
		lastName,
		cpf,
		email,
		phone,
		birthdate,
		gender,
		partner,
		zipCode,
		partnerId,
	} = body;

	if (
		!name ||
		!lastName ||
		!cpf ||
		!email ||
		!phone ||
		!birthdate ||
		!gender ||
		!partner ||
		!zipCode ||
		!partnerId
	) {
		return NextResponse.json(
			{ error: "Todos os campos são obrigatórios." },
			{ status: 400 },
		);
	}

	if (partner !== "wellhub" && partner !== "totalpass") {
		return NextResponse.json({ error: "Parceiro inválido." }, { status: 400 });
	}

	const result = await createPartnerMember({
		name,
		lastName,
		cpf,
		email,
		phone,
		birthdate,
		gender,
		partner,
		zipCode,
		partnerId,
	});

	if (!result.success) {
		return NextResponse.json(
			{ error: result.error ?? "Erro ao realizar cadastro." },
			{ status: 500 },
		);
	}

	return NextResponse.json({
		success: true,
		idCliente: result.idCliente,
		linkAceiteContrato: result.linkAceiteContrato,
	});
}
