import {
	Check,
	ChevronDown,
	Clock,
	Crown,
	MapPin,
	MessageCircle,
	Star,
	X,
	Zap,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import ContactCtaSection from "@/components/ContactCtaSection";
import {
	CHECKOUT_URL,
	PHONE_DISPLAY,
	SITE_URL,
	WHATSAPP_AVULSO,
} from "@/lib/constants";

export const metadata: Metadata = {
	title: "Planos | Panobianco Jardim Satélite",
	description:
		"Compare os planos da unidade Jardim Satélite: Orange Anual, Platinum Recorrente e Avulso. Escolha o ideal para sua evolução.",
	alternates: { canonical: "/planos" },
};

const webPageSchema = {
	"@context": "https://schema.org",
	"@type": "WebPage",
	name: "Planos | Panobianco Jardim Satélite",
	description:
		"Compare os planos da unidade Jardim Satélite: Orange Anual, Platinum Recorrente e Avulso. Escolha o ideal para sua evolução.",
	url: `${SITE_URL}/planos`,
};

const faqSchema = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: [
		{
			"@type": "Question",
			name: "Posso cancelar o Plano Platinum a qualquer momento?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Sim! O Plano Platinum não possui fidelidade. Você pode solicitar o cancelamento diretamente na recepção com 30 dias de antecedência do próximo vencimento.",
			},
		},
		{
			"@type": "Question",
			name: "Quais são as unidades inclusas no plano recorrente?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Com o plano Platinum, você tem acesso livre a todas as unidades da rede Panobianco. Basta apresentar seu CPF em qualquer recepção.",
			},
		},
		{
			"@type": "Question",
			name: "Aceita Wellhub/Gympass e TotalPass?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Sim! Aceitamos Wellhub (antigo Gympass) e TotalPass. Entre em contato ou venha nos visitar para saber quais planos estão disponíveis para a sua categoria.",
			},
		},
	],
};

const orangeBenefits = [
	"Área de cardio tecnológica com esteiras e escada com YouTube e Netflix",
	"Musculação com equipamentos de ponta e biodinâmica exclusivas",
	"Acesso a todas as aulas coletivas, incluindo pilates, muay thai, jiu-jitsu e muito mais",
	"Trazer 5 convidados por mês",
	"Avaliação física gratuita",
	"4 acessos em outras unidades da rede",
	"Sem adesão, anuidade, ou taxa de cancelamento",
	"Panobianco APP",
];
const orangeExclude = "Fidelidade de 12 meses";

const platinumBenefits = [
	...orangeBenefits.slice(0, 5),
	"Acesso a todas as unidades da rede",
	"Sem adesão, anuidade, ou taxa de cancelamento",
	"Panobianco APP",
];

const avulsoBenefits = [
	"Tudo que está incluso no plano recorrente",
	"Maior controle dos seus pagamentos mensais",
];
const avulsoExclude = "Menos praticidade, pois precisa renovar mês a mês";

export default function Planos() {
	return (
		<div className="font-display min-h-screen bg-background-dark text-white overflow-x-hidden">
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
			<main className="relative overflow-hidden pb-24 pt-16">
				{/* Decorative background */}
				<div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-full -translate-x-1/2 bg-gradient-to-b from-primary-500/10 to-transparent" />
				<div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-primary-500/10 blur-[120px]" />
				<div className="pointer-events-none absolute -left-24 top-1/2 size-72 rounded-full bg-primary-500/5 blur-[100px]" />

				<div className="container-main relative">
					{/* Hero */}
					<div className="mx-auto mb-16 max-w-3xl text-center">
						<span className="mb-4 inline-block rounded-full bg-primary-500/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary-500">
							Unidade Jardim Satélite
						</span>
						<h1 className="mb-6 text-4xl font-black leading-[1.1] tracking-tight md:text-6xl">
							Escolha o plano ideal para sua{" "}
							<span className="italic text-primary-500">evolução</span>
						</h1>
						<p className="text-lg text-stone-400">
							Treine na melhor infraestrutura de São José dos Campos com
							equipamentos de última geração e ambiente climatizado.
						</p>
					</div>

					{/* Pricing Grid */}
					<div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-6 md:grid-cols-3">
						{/* Orange Anual */}
						<article className="group flex flex-col rounded-xl border border-white/5 bg-white/5 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 dark:bg-[#1e1411]">
							<div className="mb-8">
								<div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary-500/20 text-primary-500">
									<Crown className="size-5" />
								</div>
								<h3 className="mb-2 text-2xl font-bold">Orange Anual</h3>
								<p className="text-sm font-medium text-stone-400">
									Plano com fidelidade de 12 meses.
								</p>
							</div>
							<div className="mb-8 flex items-baseline gap-1">
								<span className="text-sm font-medium text-stone-400">R$</span>
								<span className="text-5xl font-black text-primary-500">
									119,90
								</span>
								<span className="text-sm font-medium text-stone-400">/mês</span>
							</div>
							<div className="mb-4 text-sm font-bold uppercase tracking-wider">
								Inclui:
							</div>
							<ul className="mb-10 flex-grow space-y-3">
								{orangeBenefits.map((item) => (
									<li key={item} className="flex items-start gap-3 text-sm">
										<Check className="size-5 shrink-0 text-primary-500" />
										<span>{item}</span>
									</li>
								))}
								<li className="flex items-start gap-3 text-sm text-primary-500">
									<X className="size-5 shrink-0" />
									<span>{orangeExclude}</span>
								</li>
							</ul>
							<p className="mb-4 text-center text-[10px] font-bold uppercase tracking-widest text-stone-500">
								Válido para quem não teve contrato promocional nos últimos 12
								meses.
							</p>
							<Link
								href={CHECKOUT_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="mt-auto flex w-full items-center justify-center rounded-full bg-primary-500 py-4 font-bold text-white shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-all hover:bg-primary-500/90"
							>
								Assinar Agora
							</Link>
						</article>

						{/* Platinum Recorrente - MAIS VANTAJOSO */}
						<article className="group relative flex flex-col rounded-xl border border-white/5 bg-white/5 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 dark:bg-[#1e1411]">
							<div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-primary-500 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-lg">
								MAIS VANTAJOSO
							</div>
							<div className="mb-8 mt-2">
								<div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary-500/20 text-primary-500">
									<Star className="size-5" />
								</div>
								<h3 className="mb-2 text-2xl font-bold">
									Plano Platinum (recorrente)
								</h3>
								<p className="text-sm text-stone-400">
									Débito automático, sem taxas e sem fidelidade.
								</p>
							</div>
							<div className="mb-8 flex items-baseline gap-1">
								<span className="text-sm font-medium text-stone-400">R$</span>
								<span className="text-5xl font-black text-primary-500">
									139,90
								</span>
								<span className="text-sm font-medium text-stone-400">/mês</span>
							</div>
							<div className="mb-4 text-sm font-bold uppercase tracking-wider">
								Inclui:
							</div>
							<ul className="mb-10 flex-grow space-y-3">
								{platinumBenefits.map((item) => (
									<li key={item} className="flex items-start gap-3 text-sm">
										<Check className="size-5 shrink-0 text-primary-500" />
										<span>{item}</span>
									</li>
								))}
							</ul>
							<Link
								href={CHECKOUT_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="mt-auto flex w-full items-center justify-center rounded-full bg-primary-500 py-4 font-bold text-white shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-all hover:bg-primary-500/90"
							>
								Assinar Agora
							</Link>
						</article>

						{/* Plano Avulso */}
						<article className="group flex flex-col rounded-xl border border-white/5 bg-white/5 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 dark:bg-[#1e1411]">
							<div className="mb-8">
								<div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary-500/20 text-primary-500">
									<Zap className="size-5" />
								</div>
								<h3 className="mb-2 text-2xl font-bold">Plano Avulso</h3>
								<p className="text-sm text-stone-400">
									Você paga só o mês que usar, por pix, débito ou dinheiro
									direto na recepção.
								</p>
							</div>
							<div className="mb-8 flex items-baseline gap-1">
								<span className="text-sm font-medium text-stone-400">R$</span>
								<span className="text-5xl font-black text-primary-500">
									159,90
								</span>
								<span className="text-sm font-medium text-stone-400">/mês</span>
							</div>
							<div className="mb-4 text-sm font-bold uppercase tracking-wider">
								Benefícios:
							</div>
							<ul className="mb-10 flex-grow space-y-3">
								{avulsoBenefits.map((item) => (
									<li key={item} className="flex items-start gap-3 text-sm">
										<Check className="size-5 shrink-0 text-primary-500" />
										<span>{item}</span>
									</li>
								))}
								<li className="flex items-start gap-3 text-sm text-primary-500">
									<X className="size-5 shrink-0" />
									<span>{avulsoExclude}</span>
								</li>
							</ul>
							<a
								href={WHATSAPP_AVULSO}
								target="_blank"
								rel="noopener noreferrer"
								className="mt-auto flex w-full items-center justify-center rounded-full bg-primary-500 py-4 font-bold text-white shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-all hover:bg-primary-500/90"
							>
								Falar no WhatsApp
							</a>
						</article>
					</div>

					{/* Info cards: Horários, Localização, Dúvidas */}
					<div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
						<div className="flex flex-col items-center rounded-[2rem] border border-white/5 bg-white/5 p-8 text-center">
							<div className="mb-6 flex size-12 items-center justify-center rounded-full bg-primary-500/20 text-primary-500">
								<Clock className="size-6" />
							</div>
							<h4 className="mb-4 text-xl font-bold">Horários</h4>
							<div className="space-y-1 text-sm text-stone-400">
								<p>Seg a Sex: 06h às 23h</p>
								<p>Sáb: 08h às 18h</p>
								<p>Dom: 09h às 14h</p>
							</div>
						</div>
						<div className="flex flex-col items-center rounded-[2rem] border border-white/5 bg-white/5 p-8 text-center">
							<div className="mb-6 flex size-12 items-center justify-center rounded-full bg-primary-500/20 text-primary-500">
								<MapPin className="size-6" />
							</div>
							<h4 className="mb-4 text-xl font-bold">Localização</h4>
							<div className="space-y-1 text-sm text-stone-400">
								<p>Av. Cidade Jardim, 391 - Jardim Satélite</p>
								<p>São José dos Campos - SP, 12231-675</p>
							</div>
						</div>
						<div className="flex flex-col items-center rounded-[2rem] border border-white/5 bg-white/5 p-8 text-center">
							<div className="mb-6 flex size-12 items-center justify-center rounded-full bg-primary-500/20 text-primary-500">
								<MessageCircle className="size-6" />
							</div>
							<h4 className="mb-4 text-xl font-bold">Dúvidas?</h4>
							<div className="space-y-1 text-sm text-stone-400">
								<p>Fale com nossa equipe</p>
								<p>pelo WhatsApp oficial</p>
								<p>{PHONE_DISPLAY}</p>
							</div>
						</div>
					</div>

					{/* FAQ */}
					<div className="mx-auto mt-24 max-w-4xl border-t border-white/10 pt-16">
						<h2 className="mb-8 text-center text-2xl font-bold">
							Dúvidas Frequentes
						</h2>
						<div className="space-y-4">
							<details className="group overflow-hidden rounded-lg border border-white/10 bg-white/5">
								<summary className="flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-white/5">
									<span className="font-medium">
										Posso cancelar o Plano Platinum a qualquer momento?
									</span>
									<ChevronDown className="size-5 shrink-0 transition-transform group-open:rotate-180" />
								</summary>
								<div className="border-t border-white/10 px-5 pb-5 pt-4 text-sm leading-relaxed text-stone-400">
									Sim! O Plano Platinum não possui fidelidade. Você pode
									solicitar o cancelamento diretamente na recepção com 30 dias
									de antecedência do próximo vencimento.
								</div>
							</details>
							<details className="group overflow-hidden rounded-lg border border-white/10 bg-white/5">
								<summary className="flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-white/5">
									<span className="font-medium">
										Quais são as unidades inclusas no plano recorrente?
									</span>
									<ChevronDown className="size-5 shrink-0 transition-transform group-open:rotate-180" />
								</summary>
								<div className="border-t border-white/10 px-5 pb-5 pt-4 text-sm leading-relaxed text-stone-400">
									Com o plano Platinum, você tem acesso livre a todas as
									unidades da rede Panobianco. Basta apresentar seu CPF em
									qualquer recepção.
								</div>
							</details>
							<details className="group overflow-hidden rounded-lg border border-white/10 bg-white/5">
								<summary className="flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-white/5">
									<span className="font-medium">
										Aceita Wellhub/Gympass e TotalPass?
									</span>
									<ChevronDown className="size-5 shrink-0 transition-transform group-open:rotate-180" />
								</summary>
								<div className="border-t border-white/10 px-5 pb-5 pt-4 text-sm leading-relaxed text-stone-400">
									Sim! Aceitamos Wellhub (antigo Gympass) e TotalPass. Entre em
									contato ou venha nos visitar para saber quais planos estão
									disponíveis para a sua categoria.
								</div>
							</details>
						</div>
					</div>
				</div>
			</main>

			<ContactCtaSection />
		</div>
	);
}
