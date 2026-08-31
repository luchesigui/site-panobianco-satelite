import {
	Activity,
	Clock,
	Dumbbell,
	Sparkles,
	Target,
	Users,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import ContactCtaSection from "@/components/ContactCtaSection";
import QuizCtaCard from "@/components/QuizCtaCard";
import SchedulingLink from "@/components/SchedulingLink";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
	title:
		"Serviços | Academia Panobianco Jardim Satélite - Musculação, Personal e Aulas Coletivas",
	description:
		"Conheça todos os serviços da Panobianco: equipamentos de última geração, treino personalizado, aulas coletivas, avaliação física e vestiários completos.",
	keywords:
		"serviços academia, musculação, treino personalizado, aulas coletivas, academia jardim satélite, são josé dos campos",
	robots: "index, follow",
	openGraph: {
		title: "Serviços | Academia Panobianco Jardim Satélite",
		description:
			"Equipamentos de última geração, treino personalizado, aulas coletivas e muito mais.",
		type: "website",
		locale: "pt_BR",
	},
	alternates: {
		canonical: "/servicos",
	},
};

const heroBg = "/images/servicos.webp";

const services = [
	{
		title: "Equipamentos Modernos",
		description:
			"Máquinas importadas e ergonômicas para máxima eficiência e segurança no seu treino, otimizando cada repetição.",
		icon: Dumbbell,
		href: "/servicos/musculacao",
	},
	{
		title: "Treino Personalizado",
		description:
			"Profissionais qualificados para montar sua ficha de acordo com seus objetivos específicos, do emagrecimento à hipertrofia.",
		icon: Target,
		href: "/servicos/treino-personalizado",
	},
	{
		title: "Aulas Coletivas",
		description:
			"FitDance, Ritmos, Funcional e muito mais em um ambiente contagiante e motivador que faz você esquecer do esforço.",
		icon: Users,
		href: "/aulas-coletivas",
	},
	{
		title: "Avaliação Física",
		description:
			"Avaliações periódicas de composição corporal e evolução para acompanhar seus resultados e ajustar seu treino.",
		icon: Activity,
	},
	{
		title: "Vestiários Completos",
		description:
			"Conforto e praticidade com chuveiros aquecidos, secadores e armários seguros para o seu pós-treino premium.",
		icon: Sparkles,
	},
	{
		title: "Horário Estendido",
		description:
			"Flexibilidade total para você treinar quando quiser, desde as primeiras horas da manhã até tarde da noite.",
		icon: Clock,
	},
];

const webPageSchema = {
	"@context": "https://schema.org",
	"@type": "WebPage",
	name: "Serviços | Academia Panobianco Jardim Satélite",
	description:
		"Conheça todos os serviços da Panobianco: equipamentos de última geração, treino personalizado, aulas coletivas, avaliação física e vestiários completos.",
	url: `${SITE_URL}/servicos`,
};

const faqSchema = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: [
		{
			"@type": "Question",
			name: "Quais serviços a Panobianco Satélite oferece?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Oferecemos musculação com equipamentos modernos, treino personalizado, aulas coletivas, avaliação física e vestiários completos.",
			},
		},
		{
			"@type": "Question",
			name: "Como funciona o treino personalizado?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Um profissional avalia seus objetivos e condicionamento para montar um treino individual, com ajustes frequentes para acelerar sua evolução com segurança.",
			},
		},
		{
			"@type": "Question",
			name: "A academia oferece avaliação física?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Sim. A avaliação física acompanha composição corporal e evolução para orientar melhor os ajustes de treino.",
			},
		},
		{
			"@type": "Question",
			name: "Posso combinar musculação com aulas coletivas?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Sim. A combinação de musculação e aulas coletivas melhora condicionamento, acelera resultados e torna a rotina mais dinâmica.",
			},
		},
	],
};

export default function Servicos() {
	return (
		<div className="font-display min-h-screen overflow-x-hidden bg-pb-off-white text-pb-graphite">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(webPageSchema),
				}}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(faqSchema),
				}}
			/>

			{/* Hero */}
			{/* Mesma construção da home: foto limpa e o conteúdo dentro do
			    módulo hexagonal laranja encostado à direita. */}
			<section className="relative flex min-h-screen items-center overflow-hidden pt-20">
				<div className="absolute inset-0 z-0">
					<Image
						src={heroBg}
						alt="Ambiente moderno da academia Panobianco com equipamentos e iluminação"
						fill
						sizes="100vw"
						className="object-cover"
						priority
					/>
				</div>
				<div className="container-main relative z-10 flex w-full justify-start">
					<div className="shape-chanfrado mt-20 w-full max-w-2xl bg-pb-orange px-10 py-14 text-white lg:px-14 lg:py-16">
						<h1 className="mb-6 text-[3.5rem] leading-[0.96] tracking-tight">
							Nossos serviços
						</h1>
						<p className="text-[1.5rem] leading-tight">
							Estrutura, equipamento e gente que acompanha. Descubra por que a
							Panobianco é a escolha certa para quem busca resultado de verdade.
						</p>
						<div className="mt-8 flex flex-col gap-4 sm:flex-row">
							<SchedulingLink className="botao-chanfrado inline-flex items-center justify-center bg-white px-8 py-4 text-sm uppercase tracking-wide text-pb-orange-warm transition-colors hover:bg-pb-off-white">
								Agende uma visita
							</SchedulingLink>
						</div>
					</div>
				</div>
			</section>

			{/* Services Grid */}
			<section className="bg-pb-off-white pb-12 pt-20 lg:pb-14 lg:pt-28">
				<div className="container-main">
					<div className="mb-16 text-center">
						<h2 className="text-[3.5rem] leading-none tracking-tight text-pb-orange-warm">
							O que oferecemos para você
						</h2>
						<p className="mx-auto mt-6 max-w-2xl text-[1.5rem] leading-tight text-pb-graphite/80">
							Estrutura de ponta, acompanhamento profissional e diversas opções para você atingir seus objetivos com conforto e segurança.
						</p>
					</div>

					<div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(min(350px,100%),1fr))]">
						{services.map((service) => {
							const Icon = service.icon;
							const cardContent = (
								<>
									<div>
										<span className="shape-octagon-regular mb-6 flex size-14 items-center justify-center bg-pb-orange text-white">
											<Icon className="size-7" />
										</span>
										<h3 className="mb-4 text-2xl lg:text-[2rem] leading-tight font-medium tracking-tight text-pb-graphite transition-colors group-hover:text-pb-orange-warm">
											{service.title}
										</h3>
										<p className="text-base lg:text-lg leading-relaxed text-pb-graphite/80">
											{service.description}
										</p>
									</div>
									{"href" in service && service.href ? (
										<div className="mt-8">
											<span className="botao-chanfrado inline-flex items-center bg-pb-orange px-6 py-3 text-sm uppercase tracking-wide text-white transition-colors group-hover:bg-pb-orange-warm">
												Saiba mais
											</span>
										</div>
									) : null}
								</>
							);

							return "href" in service && service.href ? (
								<Link
									key={service.title}
									href={service.href}
									className="card-hex-light group flex flex-col justify-between px-10 py-12 lg:px-12 lg:py-16 transition-all duration-300 hover:shadow-lg"
								>
									{cardContent}
								</Link>
							) : (
								<div
									key={service.title}
									className="card-hex-light flex flex-col justify-between px-10 py-12 lg:px-12 lg:py-16"
								>
									{cardContent}
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Quiz CTA */}
			<section className="bg-pb-off-white pb-6 pt-10 lg:pb-8 lg:pt-12">
				<div className="container-main">
					<QuizCtaCard
						variant="default"
						source="servicos_hub"
						headline="Não sabe qual treino combina com você?"
						subhead="Em 1 minuto, te indicamos o serviço ideal pro seu objetivo, com a recomendação personalizada chegando no seu e-mail."
						ctaLabel="Descobrir em 1 minuto"
					/>
				</div>
			</section>

			<ContactCtaSection />
		</div>
	);
}
