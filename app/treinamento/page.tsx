import type { Metadata } from "next";
import { cookies } from "next/headers";

import TreinamentoLoginForm from "./TreinamentoLoginForm";

export const metadata: Metadata = {
	title: "Treinamento",
	description:
		"Vídeos de treinamento interno da equipe Academia Panobianco Jardim Satélite.",
	robots: { index: false, follow: false },
};

const VIDEOS = [
	{
		title: "Como cadastrar uma oportunidade",
		id: "IPGoLj_MKdc",
	},
	{
		title: "Fluxo básico de atendimento",
		id: "w4Ds9BkyjHg",
	},
	{
		title: "Atendimentos em Atenção",
		id: "UCBD5dSXTb0",
	},
	{
		title: "Follow Up",
		id: "l5Xn2UYxdFY",
	},
	{
		title: "Enviando mensagem para lead recém criado",
		id: "8Xef5MXseog",
	},
	{
		title: "Documentação de Erro",
		id: "BJcLSupCkzY",
	},
] as const;

const IFRAME_ALLOW =
	"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

export default function TreinamentoPage() {
	const authorized = cookies().get("isAuthorized")?.value === "1";

	return (
		<div className="font-display min-h-screen overflow-x-hidden bg-pb-off-white text-pb-graphite antialiased">
			{/* Sem foto de topo: o bloco hexagonal laranja carrega a chamada,
			    com folga para o header fixo de 80px. */}
			<section className="bg-pb-off-white pb-12 pt-20 lg:pb-14 lg:pt-28">
				<div className="container-main">
					<div className="shape-chanfrado bg-pb-orange px-10 py-14 text-white lg:px-14 lg:py-16">
						<h1 className="text-[3.5rem] leading-[0.96] tracking-tight">
							Treinamento em vídeo
						</h1>
						<p className="mt-6 max-w-2xl text-[1.5rem] leading-tight">
							Materiais de apoio para o time. Esta área é restrita.
						</p>
					</div>
				</div>
			</section>

			<section className="container-main pb-20 pt-10 lg:pb-28 lg:pt-12">
				{authorized ? (
					<div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-8">
						{VIDEOS.map((video) => (
							<div key={video.id} className="flex min-w-0 flex-col gap-4">
								<h2 className="text-[1.5rem] leading-tight tracking-tight">
									{video.title}
								</h2>
								<div className="shape-chanfrado-menor relative aspect-video w-full bg-pb-black">
									<iframe
										title={video.title}
										src={`https://www.youtube.com/embed/${video.id}`}
										allow={IFRAME_ALLOW}
										allowFullScreen
										referrerPolicy="strict-origin-when-cross-origin"
										loading="lazy"
										className="absolute inset-0 h-full w-full"
									/>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8">
						<div className="min-w-0 lg:col-start-2">
							<TreinamentoLoginForm />
						</div>
					</div>
				)}
			</section>
		</div>
	);
}
