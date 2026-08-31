import type { Metadata } from "next";

import ContactCtaSection from "@/components/ContactCtaSection";
import WorkWithUsForm from "@/components/WorkWithUsForm";
import { SITE_URL } from "@/lib/constants";

const heroBg = "/images/fachada.webp";

export const metadata: Metadata = {
	title: "Trabalhe Conosco",
	description:
		"Envie seu currículo para a Academia Panobianco Jardim Satélite e faça parte do nosso time de profissionais apaixonados por fitness e bem-estar.",
};

export default function TrabalheConosco() {
	const webPageSchema = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		name: "Trabalhe Conosco | Academia Panobianco Jardim Satélite",
		description:
			"Envie seu currículo para a Academia Panobianco Jardim Satélite e faça parte do nosso time. Valorizamos dedicação, trabalho em equipe e paixão por fitness.",
		url: `${SITE_URL}/trabalhe-conosco`,
	};

	return (
		<div className="font-display min-h-screen overflow-x-hidden bg-pb-off-white text-pb-graphite antialiased">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(webPageSchema),
				}}
			/>

			{/* Hero */}
			{/* Mesma construção da home: foto limpa e o conteúdo dentro do
			    módulo hexagonal laranja encostado à direita. */}
			<section className="relative flex min-h-[85vh] items-center overflow-hidden pt-20">
				<div
					className="absolute inset-0 bg-cover bg-center"
					style={{ backgroundImage: `url("${heroBg}")` }}
				/>
				<div className="container-main relative z-10 flex w-full justify-end">
					<div className="shape-chanfrado mt-20 w-full max-w-2xl bg-pb-orange px-10 py-14 text-white lg:px-14 lg:py-16">
						<h1 className="text-[3.5rem] leading-[0.96] tracking-tight">
							Trabalhe conosco
						</h1>
						<p className="mt-6 text-[1.5rem] leading-tight">
							Junte-se à equipe que transforma vidas pelo movimento no Jardim
							Satélite. Envie seu currículo e faça parte da nossa história.
						</p>
					</div>
				</div>
			</section>

			{/* Copy e formulário */}
			<section className="bg-pb-off-white pb-6 pt-20 lg:pb-8 lg:pt-28">
				<div className="container-main">
					<div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
						<div className="lg:col-span-5">
							<div className="shape-chanfrado bg-pb-grena px-12 py-12 text-white lg:py-20">
								<h2 className="mb-6 text-[3.5rem] leading-none tracking-tight">
									Faça parte do nosso time
								</h2>
								<p className="text-[1.5rem] leading-tight text-white/90">
									Na Panobianco, valorizamos dedicação, trabalho em equipe e
									paixão pelo fitness. Se você quer fazer parte de um time que
									transforma vidas pelo movimento, preencha o formulário e envie
									seu currículo.
								</p>
								<div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
									<div>
										<h3 className="mb-2 text-[1.5rem] leading-tight tracking-tight">
											Dedicação
										</h3>
										<p className="leading-snug text-white/90">
											Comprometimento em entregar o melhor serviço sempre.
										</p>
									</div>
									<div>
										<h3 className="mb-2 text-[1.5rem] leading-tight tracking-tight">
											Trabalho em equipe
										</h3>
										<p className="leading-snug text-white/90">
											União de forças para construir uma comunidade saudável.
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className="lg:col-span-7">
							<WorkWithUsForm />
						</div>
					</div>
				</div>
			</section>

			{/* Contact CTA Section */}
			<ContactCtaSection />
		</div>
	);
}
