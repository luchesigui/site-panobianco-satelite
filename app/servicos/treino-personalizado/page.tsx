import {
	CheckCircle,
	Clock,
	Shield,
	Target,
	TrendingUp,
	Users,
	Zap,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import QuizCtaCard from "@/components/QuizCtaCard";
import { SITE_URL, WHATSAPP_PERSONAL } from "@/lib/constants";

export const metadata: Metadata = {
	title:
		"Treino Personalizado | Academia Panobianco Jardim Satélite - Personal Trainer",
	description:
		"Treino personalizado com acompanhamento individualizado. Personal trainer qualificado para resultados rápidos e eficazes na Academia Panobianco.",
	keywords:
		"treino personalizado, personal trainer, acompanhamento individual, resultados rápidos, academia jardim satélite, são josé dos campos",
	robots: "index, follow",
	openGraph: {
		title: "Treino Personalizado | Academia Panobianco Jardim Satélite",
		description:
			"Acompanhamento individualizado com personal trainer qualificado. Resultados sob medida para você.",
		type: "website",
		locale: "pt_BR",
	},
	alternates: {
		canonical: "/servicos/treino-personalizado",
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
			name: "Treino Personalizado",
			item: `${SITE_URL}/servicos/treino-personalizado`,
		},
	],
};

const vantagens = [
	{
		icon: Target,
		title: "Foco nos Seus Objetivos",
		description:
			"Seja emagrecimento, ganho de massa muscular, melhora da performance esportiva, reabilitação ou condicionamento geral, seu treino será 100% focado no que você realmente busca.",
	},
	{
		icon: Shield,
		title: "Segurança e Correção",
		description:
			"Um personal trainer experiente garante a execução correta de cada exercício, minimizando o risco de lesões e maximizando a eficácia do movimento.",
	},
	{
		icon: Zap,
		title: "Motivação e Consistência",
		description:
			"A presença de um profissional que te incentiva, te desafia e te mantém responsável é um poderoso fator motivacional para superar a preguiça e manter a disciplina.",
	},
	{
		icon: Users,
		title: "Variedade e Dinamismo",
		description:
			"Seu personal trainer irá constantemente inovar seu treino, introduzindo novos exercícios, técnicas e equipamentos, evitando a monotonia.",
	},
	{
		icon: Clock,
		title: "Otimização do Tempo",
		description:
			"Com um plano de treino eficiente e focado, você aproveita ao máximo cada minuto na academia, alcançando mais resultados em menos tempo.",
	},
	{
		icon: TrendingUp,
		title: "Adaptação Contínua",
		description:
			"Seu programa de treino será ajustado conforme sua evolução, suas necessidades e até mesmo seu humor no dia, garantindo que você esteja sempre no caminho certo.",
	},
];

const credenciais = [
	"Certificações reconhecidas nacionalmente",
	"Experiência em diversas modalidades",
	"Especialização em diferentes objetivos",
	"Atualização constante em novas técnicas",
];

const especializacoes = [
	"Emagrecimento e queima de gordura",
	"Ganho de massa muscular",
	"Performance esportiva",
	"Reabilitação e fisioterapia",
	"Condicionamento físico geral",
	"Treinamento funcional",
];

const etapas = [
	{
		numero: "1",
		title: "Avaliação Inicial",
		description:
			"Seu personal trainer realizará uma avaliação completa para entender seu histórico de saúde, nível de condicionamento físico, objetivos e preferências.",
	},
	{
		numero: "2",
		title: "Planejamento Personalizado",
		description:
			"Com base na avaliação, será desenvolvido um programa de treino exclusivo, detalhando os exercícios, séries, repetições e a frequência ideal.",
	},
	{
		numero: "3",
		title: "Sessões de Treino",
		description:
			"Durante as sessões, seu personal trainer irá te guiar em cada exercício, corrigindo a postura, motivando e garantindo que você execute o treino de forma segura e eficaz.",
	},
	{
		numero: "4",
		title: "Acompanhamento e Ajustes",
		description:
			"Seu progresso será monitorado de perto, e o plano de treino será ajustado regularmente para garantir que você continue a evoluir e a alcançar novos patamares.",
	},
];

export default function TreinoPersonalizado() {
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
							Treino personalizado: resultados sob medida para você
						</h1>
						<p className="mt-6 max-w-3xl text-[1.5rem] leading-tight">
							Se você busca um acompanhamento ainda mais individualizado e
							focado em resultados rápidos e eficazes, nosso serviço de treino
							personalizado é a solução ideal.
						</p>
						<div className="mt-8 flex flex-col gap-4 sm:flex-row">
							<Link
								href={WHATSAPP_PERSONAL}
								className="botao-chanfrado inline-flex items-center justify-center bg-white px-8 py-4 text-sm uppercase tracking-wide text-pb-orange-warm transition-colors hover:bg-pb-off-white"
								target="_blank"
								rel="noopener noreferrer"
							>
								Agende sua consultoria
							</Link>
							<Link
								href="/contato"
								className="botao-chanfrado inline-flex items-center justify-center bg-pb-black px-8 py-4 text-sm uppercase tracking-wide text-white transition-colors hover:bg-pb-grena"
							>
								Saiba mais
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Por que treino personalizado */}
			<section className="bg-pb-grena py-20 lg:py-28">
				<div className="container-main">
					<div className="mb-[7.5rem] text-center">
						<h2 className="text-[3.5rem] leading-none tracking-tight text-white">
							Por que escolher o treino personalizado?
						</h2>
						<p className="mx-auto mt-6 max-w-2xl text-[1.5rem] leading-tight text-white/80">
							O treino personalizado vai muito além de um simples acompanhamento
							na academia. Ele oferece uma série de vantagens que podem acelerar
							seus resultados.
						</p>
					</div>
					<div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(min(540px,100%),1fr))]">
						{vantagens.map((item) => {
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

			{/* Nossos Personal Trainers */}
			<section className="bg-pb-off-white pb-12 pt-20 lg:pb-14 lg:pt-28">
				<div className="container-main">
					<div className="flex flex-col lg:flex-row">
						<div className="shape-chanfrado bg-pb-orange px-12 py-12 text-white lg:w-3/5 lg:py-20">
							<h2 className="mb-8 text-[3.5rem] leading-none tracking-tight">
								Nossos personal trainers
							</h2>
							<p className="text-[1.5rem] leading-tight text-white/90">
								Eles são apaixonados por ajudar pessoas a transformarem suas
								vidas e estão comprometidos em oferecer o melhor suporte e
								orientação. Ao escolher um de nossos personal trainers, você
								terá um parceiro dedicado à sua saúde e ao seu bem-estar.
							</p>
							<ul className="mt-8 space-y-4">
								{credenciais.map((item) => (
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
								Áreas de especialização
							</h3>
							<ul className="space-y-4 text-[1.5rem] leading-tight">
								{especializacoes.map((item) => (
									<li key={item} className="flex items-start gap-4">
										<span className="shape-octagon-regular mt-2 size-3 shrink-0 bg-pb-orange" />
										<span>{item}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* Como Funciona */}
			<section className="bg-pb-off-white pb-12 pt-10 lg:pb-14 lg:pt-12">
				<div className="container-main">
					<div className="mb-[7.5rem] text-center">
						<h2 className="text-[3.5rem] leading-none tracking-tight text-pb-orange-warm">
							Como funciona?
						</h2>
						<p className="mx-auto mt-6 max-w-2xl text-[1.5rem] leading-tight">
							Nosso processo é simples e eficiente, projetado para garantir que
							você alcance seus objetivos da forma mais segura e eficaz
							possível.
						</p>
					</div>
					<div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(min(540px,100%),1fr))]">
						{etapas.map((etapa) => (
							<div key={etapa.numero} className="card-hex-light px-12 py-16">
								<span className="shape-octagon-regular mb-6 flex size-14 items-center justify-center bg-pb-orange text-[1.5rem] leading-none text-white">
									{etapa.numero}
								</span>
								<h3 className="mb-6 text-[3.5rem] leading-none tracking-tight">
									{etapa.title}
								</h3>
								<p className="text-[1.5rem] leading-tight text-pb-graphite/80">
									{etapa.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Quiz CTA */}
			<section className="bg-pb-off-white pb-12 pt-10 lg:pb-14 lg:pt-12">
				<div className="container-main">
					<QuizCtaCard
						variant="compact"
						source="personal"
						headline="Vale a pena ter um personal?"
						subhead="Em 60 segundos te ajudamos a entender se um treino personalizado faz sentido pro seu momento e pra sua rotina."
						ctaLabel="Descobrir agora"
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
							Invista em você e nos seus resultados
						</h2>
						<p className="mt-6 text-[1.5rem] leading-tight">
							O treino personalizado na Academia Panobianco Jardim Satélite é um
							investimento na sua saúde, no seu bem-estar e na sua qualidade de
							vida. Se você está pronto para acelerar seus resultados, treinar
							com segurança e ter um acompanhamento de excelência, entre em
							contato conosco.
						</p>
						<div className="mt-8 flex flex-col gap-4 sm:flex-row">
							<Link
								href={WHATSAPP_PERSONAL}
								className="botao-chanfrado inline-flex items-center justify-center bg-white px-8 py-4 text-sm uppercase tracking-wide text-pb-orange-warm transition-colors hover:bg-pb-off-white"
								target="_blank"
								rel="noopener noreferrer"
							>
								Agende sua consultoria
							</Link>
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
		</div>
	);
}
