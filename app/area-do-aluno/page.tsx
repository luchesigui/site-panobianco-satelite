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
		<div className="font-display min-h-screen overflow-x-hidden bg-pb-off-white text-pb-graphite antialiased">
			{/* Sem foto de topo: o bloco hexagonal laranja carrega a chamada,
			    com folga para o header fixo de 80px. */}
			<section className="bg-pb-off-white pb-12 pt-20 lg:pb-14 lg:pt-28">
				<div className="container-main">
					<div className="shape-chanfrado bg-pb-orange px-10 py-14 text-white lg:px-14 lg:py-16">
						<h1 className="text-[3.5rem] leading-[0.96] tracking-tight">
							Área do aluno
						</h1>
						<p className="mt-6 max-w-2xl text-[1.5rem] leading-tight">
							Acesso exclusivo para alunos da Academia Panobianco Jardim
							Satélite.
						</p>
					</div>
				</div>
			</section>

			<section className="container-main pb-20 pt-10 lg:pb-28 lg:pt-12">
				{alunoNome ? (
					<article className="card-hex-light mx-auto max-w-md px-12 py-16 text-center">
						<p className="text-pb-graphite/80">Bem-vindo(a),</p>
						<p className="mt-2 text-[3.5rem] leading-none tracking-tight text-pb-orange-warm">
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
