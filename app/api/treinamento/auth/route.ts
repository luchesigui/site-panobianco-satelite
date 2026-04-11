import { type NextRequest, NextResponse } from "next/server";

const COOKIE_MAX_AGE_SECONDS = 72 * 60 * 60;

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const login = typeof body.login === "string" ? body.login.trim() : "";
		const senha = typeof body.senha === "string" ? body.senha : "";

		if (!login || !senha) {
			return NextResponse.json(
				{ error: "Login e senha são obrigatórios." },
				{ status: 400 },
			);
		}

		const loginOk = login.toLowerCase() === "panobianco";
		const senhaOk = senha === "satelite2026";

		if (!loginOk || !senhaOk) {
			return NextResponse.json(
				{ error: "Login ou senha incorretos." },
				{ status: 401 },
			);
		}

		const response = NextResponse.json({ ok: true });
		response.cookies.set("isAuthorized", "1", {
			path: "/",
			maxAge: COOKIE_MAX_AGE_SECONDS,
			httpOnly: true,
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
		});
		return response;
	} catch {
		return NextResponse.json(
			{ error: "Não foi possível processar o pedido." },
			{ status: 400 },
		);
	}
}
