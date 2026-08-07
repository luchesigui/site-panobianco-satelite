import type { Metadata } from "next";
import { cookies } from "next/headers";

import AlunoLoginForm from "./AlunoLoginForm";
import AlunoLogoutButton from "./AlunoLogoutButton";

export const metadata: Metadata = {
	title: "Área do Aluno",
	description: "Área do aluno da Academia Panobianco Jardim Satélite.",
	robots: { index: false, follow: false },
};

export default function AreaDoAlunoPage() {
	const rawName = cookies().get("alunoNome")?.value;
	let alunoNome: string | null = null;
	if (rawName) {
		try {
			alunoNome = decodeURIComponent(rawName);
		} catch {
			alunoNome = null;
		}
	}

	return (
		<div className="font-display min-h-screen bg-background-dark text-white antialiased overflow-x-hidden">
			<section className="relative border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent">
				<div className="container-main py-12 md:py-16">
					<h1 className="text-4xl font-semibold leading-tight md:text-5xl">
						Área do <span className="text-primary-500">Aluno</span>
					</h1>
					<p className="mt-4 max-w-2xl text-sm text-white/65 md:text-base">
						Acesso exclusivo para alunos da Academia Panobianco Jardim Satélite.
					</p>
				</div>
			</section>

			<section className="container-main py-12">
				{alunoNome ? (
					<article className="mx-auto max-w-md rounded-xl border border-white/10 bg-white/5 p-6 text-center">
						<p className="text-sm text-white/65">Bem-vindo(a),</p>
						<p className="mt-2 text-3xl font-semibold text-primary-500">
							{alunoNome}
						</p>
						<div className="mt-8">
							<AlunoLogoutButton />
						</div>
					</article>
				) : (
					<AlunoLoginForm />
				)}
			</section>
		</div>
	);
}
