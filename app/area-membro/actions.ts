"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { authenticateEvoMember } from "@/lib/evo";
import { signSession } from "@/lib/session";

export async function loginAction(
	_prevState: unknown,
	formData: FormData,
): Promise<{ success: boolean; error?: string }> {
	const email = formData.get("email")?.toString().trim();
	const password = formData.get("password")?.toString();

	if (!email || !password) {
		return { success: false, error: "Por favor, preencha todos os campos." };
	}

	let success = false;
	try {
		const authResult = await authenticateEvoMember(email, password);

		if (
			!authResult ||
			!authResult.successAuthenticate ||
			!authResult.idMember
		) {
			return {
				success: false,
				error:
					"E-mail ou senha incorretos. Verifique seus dados do perfil EVO.",
			};
		}

		const token = signSession(authResult.idMember, authResult.name || "Aluno");

		cookies().set("evo_session", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			path: "/",
			maxAge: 60 * 60 * 24 * 7, // 7 dias
		});

		success = true;
	} catch (err) {
		console.error("Login Server Action error:", err);
		return {
			success: false,
			error: "Ocorreu um erro no servidor. Tente novamente mais tarde.",
		};
	}

	if (success) {
		redirect("/area-membro");
	}

	return { success: false, error: "Ocorreu um erro inesperado." };
}

export async function logoutAction() {
	cookies().delete("evo_session");
	redirect("/area-membro/login");
}
