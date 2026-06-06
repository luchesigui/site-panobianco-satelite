import { Briefcase } from "lucide-react";
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
		<div className="font-display min-h-screen bg-background-dark text-white antialiased overflow-x-hidden">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(webPageSchema),
				}}
			/>

			{/* Hero */}
			<section className="relative h-[300px] w-full overflow-hidden md:h-[400px]">
				<div
					className="absolute inset-0 bg-cover bg-center"
					style={{
						backgroundImage: `linear-gradient(0deg, rgba(24, 18, 16, 1) 0%, rgba(24, 18, 16, 0.5) 60%, rgba(24, 18, 16, 0.2) 100%), url("${heroBg}")`,
					}}
				/>
				<div className="container-main relative flex h-full flex-col justify-end pb-12">
					<div className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary-500">
						<Briefcase className="size-4" />
						Carreira & Oportunidades
					</div>
					<h1 className="max-w-2xl text-4xl font-semibold leading-[1.1] md:text-6xl">
						Trabalhe <span className="text-primary-500">Conosco</span>
					</h1>
					<p className="mt-4 max-w-xl text-sm text-neutral-300 md:text-base">
						Junte-se à equipe que transforma vidas pelo movimento no Jardim
						Satélite. Envie seu currículo e faça parte da nossa história.
					</p>
				</div>
			</section>

			{/* Content: Copy + Form */}
			<section className="container-main py-16">
				<div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
					{/* Left: Copy / Text */}
					<div className="space-y-6 lg:col-span-5">
						<h2 className="text-3xl font-bold text-white md:text-4xl">
							Faça Parte do <span className="text-primary-500">Nosso Time</span>
						</h2>
						<p className="text-neutral-400 leading-relaxed text-sm md:text-base">
							Na Panobianco, valorizamos dedicação, trabalho em equipe e paixão
							pelo fitness. Se você quer fazer parte de um time que transforma
							vidas pelo movimento, preencha o formulário e envie seu currículo.
						</p>

						{/* Quick values cards */}
						<div className="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-2">
							<div className="rounded-xl border border-white/5 bg-white/5 p-5">
								<h4 className="font-semibold text-primary-500 mb-1">
									Dedicacão
								</h4>
								<p className="text-xs text-neutral-400">
									Comprometimento em entregar o melhor serviço sempre.
								</p>
							</div>
							<div className="rounded-xl border border-white/5 bg-white/5 p-5">
								<h4 className="font-semibold text-primary-500 mb-1">
									Trabalho em Equipe
								</h4>
								<p className="text-xs text-neutral-400">
									União de forças para construir uma comunidade saudável.
								</p>
							</div>
						</div>
					</div>

					{/* Right: Form */}
					<div className="lg:col-span-7">
						<WorkWithUsForm />
					</div>
				</div>
			</section>

			{/* Contact CTA Section */}
			<ContactCtaSection />
		</div>
	);
}
