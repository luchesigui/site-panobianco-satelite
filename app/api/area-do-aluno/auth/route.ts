import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

import {
	createOtpToken,
	generateOtpCode,
	verifyOtpToken,
} from "@/lib/aluno-otp";
import { CONTACT_EMAIL } from "@/lib/constants";
import { findMemberByEmailOrCpf } from "@/lib/evo";

const NAME_COOKIE = "alunoNome";
const OTP_COOKIE = "alunoOtp";
const NAME_COOKIE_MAX_AGE_SECONDS = 72 * 60 * 60;
const OTP_COOKIE_MAX_AGE_SECONDS = 10 * 60;

const GENERIC_REQUEST_MESSAGE =
	"Se o cadastro existir, você receberá um código no e-mail cadastrado na academia.";

const cookieOptions = {
	path: "/",
	httpOnly: true,
	sameSite: "lax",
	secure: process.env.NODE_ENV === "production",
} as const;

function displayName(name: string): string {
	return name
		.toLowerCase()
		.replace(/\p{L}+/gu, (word) => word[0].toUpperCase() + word.slice(1));
}

async function sendOtpEmail(to: string, code: string): Promise<boolean> {
	const resend = new Resend(process.env.RESEND_API_KEY);
	const result = await resend.emails.send({
		from:
			process.env.NODE_ENV === "production"
				? `Panobianco Satélite <${CONTACT_EMAIL}>`
				: "Panobianco Satélite <onboarding@resend.dev>",
		to: [to],
		subject: `${code} é o seu código de acesso — Panobianco Satélite`,
		html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f97316;">Área do Aluno — Academia Panobianco</h2>
        <p>Use o código abaixo para acessar a Área do Aluno. Ele vale por 10 minutos.</p>
        <p style="font-size: 32px; font-weight: bold; letter-spacing: 8px; background-color: #f9f9f9; padding: 20px; border-radius: 8px; text-align: center;">${code}</p>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
          <p>Se você não solicitou este código, ignore este e-mail.</p>
        </div>
      </div>
    `,
		tags: [{ name: "source", value: "area-do-aluno" }],
	});

	if (result.error) {
		console.error("[aluno-otp] resend error:", result.error);
		return false;
	}
	return true;
}

async function handleRequest(identifier: string): Promise<NextResponse> {
	if (!process.env.RESEND_API_KEY) {
		console.error("[aluno-otp] RESEND_API_KEY not configured");
		return NextResponse.json(
			{ error: "Serviço de e-mail não configurado. Tente mais tarde." },
			{ status: 500 },
		);
	}

	const member = await findMemberByEmailOrCpf(identifier);

	let token: string;
	if (member?.email) {
		const code = generateOtpCode();
		if (process.env.NODE_ENV !== "production") {
			console.log("[aluno-otp] dev code:", code);
		}
		const sent = await sendOtpEmail(member.email, code);
		if (!sent) {
			return NextResponse.json(
				{ error: "Não foi possível enviar o código. Tente novamente." },
				{ status: 500 },
			);
		}
		token = createOtpToken(displayName(member.name), code);
	} else {
		// Cadastro não encontrado: token isca com código impossível de digitar,
		// para que a resposta não revele quem é aluno.
		token = createOtpToken("", `decoy-${generateOtpCode()}`);
	}

	const response = NextResponse.json({
		ok: true,
		message: GENERIC_REQUEST_MESSAGE,
	});
	response.cookies.set(OTP_COOKIE, token, {
		...cookieOptions,
		maxAge: OTP_COOKIE_MAX_AGE_SECONDS,
	});
	return response;
}

function handleVerify(request: NextRequest, code: string): NextResponse {
	const token = request.cookies.get(OTP_COOKIE)?.value;
	if (!token) {
		return NextResponse.json(
			{ error: "Código expirado. Solicite um novo código.", expired: true },
			{ status: 401 },
		);
	}

	const result = verifyOtpToken(token, code);

	if (result.status === "ok" && result.name) {
		const response = NextResponse.json({ name: result.name });
		response.cookies.set(NAME_COOKIE, encodeURIComponent(result.name), {
			...cookieOptions,
			maxAge: NAME_COOKIE_MAX_AGE_SECONDS,
		});
		response.cookies.set(OTP_COOKIE, "", { ...cookieOptions, maxAge: 0 });
		return response;
	}

	if (result.status === "retry") {
		const response = NextResponse.json(
			{ error: "Código inválido. Confira o e-mail e tente novamente." },
			{ status: 401 },
		);
		response.cookies.set(OTP_COOKIE, result.token, {
			...cookieOptions,
			maxAge: OTP_COOKIE_MAX_AGE_SECONDS,
		});
		return response;
	}

	const response = NextResponse.json(
		{ error: "Código expirado. Solicite um novo código.", expired: true },
		{ status: 401 },
	);
	response.cookies.set(OTP_COOKIE, "", { ...cookieOptions, maxAge: 0 });
	return response;
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const action = typeof body.action === "string" ? body.action : "";

		if (action === "request") {
			const identifier =
				typeof body.identifier === "string" ? body.identifier.trim() : "";
			if (!identifier) {
				return NextResponse.json(
					{ error: "Informe o e-mail ou CPF cadastrado." },
					{ status: 400 },
				);
			}
			return await handleRequest(identifier);
		}

		if (action === "verify") {
			const code = typeof body.code === "string" ? body.code.trim() : "";
			if (!/^\d{6}$/.test(code)) {
				return NextResponse.json(
					{ error: "Informe o código de 6 dígitos." },
					{ status: 400 },
				);
			}
			return handleVerify(request, code);
		}

		return NextResponse.json({ error: "Ação inválida." }, { status: 400 });
	} catch {
		return NextResponse.json(
			{ error: "Não foi possível processar o pedido." },
			{ status: 400 },
		);
	}
}

export async function DELETE() {
	const response = NextResponse.json({ ok: true });
	response.cookies.set(NAME_COOKIE, "", { ...cookieOptions, maxAge: 0 });
	response.cookies.set(OTP_COOKIE, "", { ...cookieOptions, maxAge: 0 });
	return response;
}
