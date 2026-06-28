import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { verifySession } from "@/lib/session";
import LoginForm from "./LoginForm";

export const metadata = {
	title: "Área do Aluno | Entrar",
	description:
		"Acesse sua Área do Aluno da Panobianco Jardim Satélite com suas credenciais do EVO.",
};

export default async function LoginPage() {
	const cookieStore = cookies();
	const token = cookieStore.get("evo_session")?.value;
	const session = token ? verifySession(token) : null;

	if (session) {
		redirect("/area-membro");
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-background-dark py-16 px-4 sm:px-6 lg:px-8">
			<div className="w-full max-w-md space-y-8 rounded-2xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl shadow-2xl">
				<LoginForm />
			</div>
		</div>
	);
}
