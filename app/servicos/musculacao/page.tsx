import {
	CheckCircle,
	Dumbbell,
	Shield,
	Target,
	TrendingUp,
	Users,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import QuizCtaCard from "@/components/QuizCtaCard";
import SchedulingLink from "@/components/SchedulingLink";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
	title:
		"Musculação | Academia Panobianco Jardim Satélite - Equipamentos Modernos",
	description:
		"Área de musculação completa com equipamentos modernos e seguros. Professores qualificados para orientar seu treino na Academia Panobianco Jardim Satélite.",
	keywords:
		"musculação, academia, equipamentos modernos, treino força, hipertrofia, jardim satélite, são josé dos campos",
	robots: "index, follow",
	openGraph: {
		title: "Musculação | Academia Panobianco Jardim Satélite",
		description:
			"Área de musculação completa com equipamentos modernos e seguros. Força e definição para o seu corpo.",
		type: "website",
		locale: "pt_BR",
	},
	alternates: {
		canonical: "/servicos/musculacao",
	},
};

const breadcrumbSchema = {
	"@context": "https://schema.org",
	"@type": "BreadcrumbList",
	itemListElement: [
		{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
		{
			"@type": "ListItem",
			position: 2,
			name: "Serviços",
			item: `${SITE_URL}/servicos`,
		},
		{
			"@type": "ListItem",
			position: 3,
			name: "Musculação",
			item: `${SITE_URL}/servicos/musculacao`,
		},
	],
};

const beneficios = [
	{
		icon: TrendingUp,
		title: "Ganho de Massa Muscular",
		description:
			"Essencial para aumentar o metabolismo, queimar mais calorias em repouso e melhorar a composição corporal.",
	},
	{
		icon: Shield,
		title: "Fortalecimento Ósseo",
		description:
			"Ajuda a prevenir a osteoporose e a manter a densidade óssea, especialmente importante com o avanço da idade.",
	},
	{
		icon: Target,
		title: "Redução de Gordura",
		description:
			"O aumento da massa muscular acelera o metabolismo, contribuindo para a perda de gordura de forma mais eficiente.",
	},
	{
		icon: CheckCircle,
		title: "Melhora da Postura",
		description:
			"Fortalece os músculos do core e das costas, corrigindo desequilíbrios e aliviando dores.",
	},
	{
		icon: Dumbbell,
		title: "Força e Resistência",
		description:
			"Melhora a capacidade de realizar tarefas diárias e o desempenho em outras atividades físicas.",
	},
	{
		icon: Shield,
		title: "Prevenção de Lesões",
		description:
			"Músculos fortes e equilibrados protegem as articulações e reduzem o risco de lesões.",
	},
];

const estrutura = [
	{
		icon: Dumbbell,
		title: "Equipamentos Modernos",
		description:
			"Ampla variedade de máquinas de força, pesos livres, halteres, barras e acessórios, todos de marcas renomadas com manutenção regular.",
	},
	{
		icon: Target,
		title: "Espaço Amplo e Climatizado",
		description:
			"Ambiente espaçoso que permite livre circulação e execução dos exercícios sem aglomeração, com climatização adequada.",
	},
	{
		icon: Users,
		title: "Acompanhamento Profissional",
		description:
			"Professores altamente qualificados sempre presentes para orientar, corrigir postura e garantir execução correta e segura.",
	},
];

const personalizacao = [
	"Avaliação completa do seu condicionamento atual",
	"Plano de treino adaptado aos seus objetivos",
	"Acompanhamento e ajustes regulares",
	"Orientação sobre execução correta dos exercícios",
];

export default function Musculacao() {
	return (
		<div className="font-display min-h-screen overflow-x-hidden bg-pb-off-white text-pb-graphite">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
			/>

			{/* Hero */}
			{/* Sem foto de topo: o bloco hexagonal laranja carrega a chamada,
			    com folga para o header fixo de 80px. */}
			<section className="bg-pb-off-white pb-12 pt-20 lg:pb-14 lg:pt-28">
				<div className="container-main">
					<div className="shape-chanfrado bg-pb-orange px-10 py-14 text-white lg:px-14 lg:py-16">
						<h1 className="text-[3.5rem] leading-[0.96] tracking-tight">
							Musculação: força e definição para o seu corpo
						</h1>
						<p className="mt-6 max-w-3xl text-[1.5rem] leading-tight">
							Nossa área de musculação é um espaço amplo e bem equipado, com uma
							vasta gama de aparelhos modernos e seguros, projetados para
							atender a todas as necessidades e grupos musculares.
						</p>
						<div className="mt-8 flex flex-col gap-4 sm:flex-row">
							<SchedulingLink className="botao-chanfrado inline-flex items-center justify-center bg-white px-8 py-4 text-sm uppercase tracking-wide text-pb-orange-warm transition-colors hover:bg-pb-off-white">
								Experimente gratuitamente
							</SchedulingLink>
							<Link
								href="/planos"
								className="botao-chanfrado inline-flex items-center justify-center bg-pb-black px-8 py-4 text-sm uppercase tracking-wide text-white transition-colors hover:bg-pb-grena"
							>
								Conheça nossos planos
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Por que musculação */}
			<section className="bg-pb-grena py-20 lg:py-28">
				<div className="container-main">
					<div className="mb-[7.5rem] text-center">
						<h2 className="text-[3.5rem] leading-none tracking-tight text-white">
							Por que a musculação é essencial?
						</h2>
						<p className="mx-auto mt-6 max-w-2xl text-[1.5rem] leading-tight text-white/80">
							Acreditamos que a musculação é mais do que apenas levantar pesos;
							é uma ciência que, quando aplicada corretamente, pode transformar
							seu corpo e sua vida.
						</p>
					</div>
					<div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(min(540px,100%),1fr))]">
						{beneficios.map((item) => {
							const Icon = item.icon;
							return (
								<div
									key={item.title}
									className="card-hex-orange font-display px-12 py-16 text-white"
								>
									<span className="shape-octagon-regular mb-6 flex size-12 items-center justify-center bg-white/20 text-white">
										<Icon className="size-6" />
									</span>
									<h3 className="mb-6 text-[3.5rem] leading-none tracking-tight">
										{item.title}
									</h3>
									<p className="text-[1.5rem] leading-tight text-white/90">
										{item.description}
									</p>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Nossa Estrutura */}
			<section className="bg-pb-off-white py-20 lg:py-28">
				<div className="container-main">
					<div className="mb-[7.5rem] text-center">
						<h2 className="text-[3.5rem] leading-none tracking-tight text-pb-orange-warm">
							Nossa estrutura de musculação
						</h2>
						<p className="mx-auto mt-6 max-w-2xl text-[1.5rem] leading-tight">
							Nossa área de musculação é projetada para oferecer o máximo de
							conforto, segurança e eficiência em seu treino.
						</p>
					</div>
					<div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(min(540px,100%),1fr))]">
						{estrutura.map((item) => {
							const Icon = item.icon;
							return (
								<div key={item.title} className="card-hex-light px-12 py-16">
									<span className="shape-octagon-regular mb-6 flex size-14 items-center justify-center bg-pb-orange text-white">
										<Icon className="size-7" />
									</span>
									<h3 className="mb-6 text-[3.5rem] leading-none tracking-tight">
										{item.title}
									</h3>
									<p className="text-[1.5rem] leading-tight text-pb-graphite/80">
										{item.description}
									</p>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Treino Personalizado */}
			<section className="bg-pb-off-white pb-12 pt-10 lg:pb-14 lg:pt-12">
				<div className="container-main">
					<div className="flex flex-col lg:flex-row">
						<div className="shape-chanfrado bg-pb-orange px-12 py-12 text-white lg:w-3/5 lg:py-20">
							<h2 className="mb-8 text-[3.5rem] leading-none tracking-tight">
								Seu treino personalizado
							</h2>
							<p className="text-[1.5rem] leading-tight text-white/90">
								Nossos professores trabalham em conjunto com você para elaborar
								um plano de treino de musculação personalizado, levando em
								consideração seus objetivos, nível de condicionamento físico,
								histórico de saúde e preferências.
							</p>
							<ul className="mt-8 space-y-4">
								{personalizacao.map((item) => (
									<li key={item} className="flex items-start gap-4">
										<span className="shape-octagon-regular flex size-8 shrink-0 items-center justify-center bg-white/20 text-white">
											<CheckCircle className="size-4" />
										</span>
										<span>{item}</span>
									</li>
								))}
							</ul>
						</div>
						<div className="shape-chanfrado bg-pb-grena px-12 py-12 text-white lg:w-2/5 lg:py-20">
							<h3 className="mb-8 text-[3.5rem] leading-none tracking-tight">
								Para todos os níveis
							</h3>
							<div className="space-y-6 text-[1.5rem] leading-tight text-white/90">
								<p>
									Seja para iniciantes que precisam aprender os fundamentos, ou
									para avançados que buscam otimizar seus resultados, nosso
									acompanhamento garante que você esteja sempre no caminho
									certo.
								</p>
								<p>
									Objetivos atendidos: ganho de massa muscular, emagrecimento,
									fortalecimento, reabilitação, condicionamento físico geral e
									muito mais.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Quiz CTA */}
			<section className="bg-pb-off-white pb-12 pt-10 lg:pb-14 lg:pt-12">
				<div className="container-main">
					<QuizCtaCard
						variant="compact"
						source="musculacao"
						headline="Musculação é pra você?"
						subhead="Faça o quiz e descubra o treino, o plano e a frequência ideais pro seu objetivo e pra sua rotina."
						ctaLabel="Fazer o quiz"
					/>
				</div>
			</section>

			{/* CTA final */}
			{/* Mesmo módulo do fechamento da home: hexágono completo, cor
			    chapada, tudo empilhado numa coluna. */}
			<section className="pb-20 pt-10 lg:pb-28 lg:pt-12">
				<div className="container-main">
					<div className="shape-chanfrado bg-pb-orange px-10 pb-14 pt-10 text-white md:px-16 md:pb-20 md:pt-14">
						<h2 className="text-[3.5rem] leading-[0.96] tracking-tight">
							Venha transformar seu corpo
						</h2>
						<p className="mt-6 text-[1.5rem] leading-tight">
							Se você busca um lugar onde a musculação é levada a sério, com
							estrutura de ponta, equipamentos modernos e o suporte de
							profissionais dedicados, a Academia Panobianco Jardim Satélite é o
							seu destino.
						</p>
						<div className="mt-8 flex flex-col gap-4 sm:flex-row">
							<SchedulingLink className="botao-chanfrado inline-flex items-center justify-center bg-white px-8 py-4 text-sm uppercase tracking-wide text-pb-orange-warm transition-colors hover:bg-pb-off-white">
								Agendar aula experimental
							</SchedulingLink>
							<Link
								href="/contato"
								className="botao-chanfrado inline-flex items-center justify-center bg-pb-black px-8 py-4 text-sm uppercase tracking-wide text-white transition-colors hover:bg-pb-grena"
							>
								Entre em contato
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
