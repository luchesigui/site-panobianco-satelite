import {
	Check,
	ChevronDown,
	Clock,
	MapPin,
	MessageCircle,
	X,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import AbTestImpression from "@/components/AbTestImpression";
import ContactCtaSection from "@/components/ContactCtaSection";
import PlanCTAButton from "@/components/PlanCTAButton";
import QuizCtaCard from "@/components/QuizCtaCard";
import {
	PHONE_DISPLAY,
	PLANS,
	SITE_URL,
	WHATSAPP_AVULSO,
} from "@/lib/constants";
import { promoOrangeFlag } from "@/lib/flags";

export const metadata: Metadata = {
	title: "Planos | Panobianco Jardim Satélite",
	description:
		"Orange Anual, Platinum Recorrente e Avulso na unidade Jardim Satélite. Dropa o peso, não a vontade — escolha o plano que cabe na sua rotina.",
	alternates: { canonical: "/planos" },
};

const webPageSchema = {
	"@context": "https://schema.org",
	"@type": "WebPage",
	name: "Planos | Panobianco Jardim Satélite",
	description:
		"Orange Anual, Platinum Recorrente e Avulso na unidade Jardim Satélite. Escolha o plano que cabe na sua rotina.",
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
			name: "Aceita Wellhub/Gympass?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Sim! Aceitamos Wellhub (antigo Gympass). Entre em contato ou venha nos visitar para saber quais planos estão disponíveis para a sua categoria. Se for o seu caso, preencha o pré-cadastro em panobiancosatelite.com.br/parceiros.",
			},
		},
	],
};

const plansSchema = {
	"@context": "https://schema.org",
	"@type": "Service",
	name: "Planos Academia Panobianco Jardim Satélite",
	serviceType: "Plano de Academia",
	provider: { "@id": `${SITE_URL}#organization` },
	url: `${SITE_URL}/planos`,
	offers: [
		{
			"@type": "Offer",
			name: PLANS.orange.label,
			price: PLANS.orange.price,
			priceCurrency: "BRL",
			url: `${SITE_URL}/checkout/orange`,
			availability: "https://schema.org/InStock",
		},
		{
			"@type": "Offer",
			name: PLANS.platinum.label,
			price: PLANS.platinum.price,
			priceCurrency: "BRL",
			url: `${SITE_URL}/checkout/platinum`,
			availability: "https://schema.org/InStock",
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
	"Sem taxa de adesão ou anuidade",
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

export default async function Planos() {
	const isPromoB = await promoOrangeFlag();

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
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(plansSchema),
				}}
			/>
			<main>
				{/* Hero */}
				{/* Sem foto de topo: o bloco hexagonal laranja carrega a chamada,
				    com folga para o header fixo de 80px. */}
				<section className="bg-pb-off-white pb-12 pt-20 lg:pb-14 lg:pt-28">
					<div className="container-main">
						<div className="shape-chanfrado bg-pb-orange px-10 py-14 text-white lg:px-14 lg:py-16">
							<h1 className="text-[3.5rem] leading-[0.96] tracking-tight">
								Escolha o plano que cabe na sua rotina
							</h1>
							<p className="mt-6 max-w-3xl text-[1.5rem] leading-tight">
								Feitos de força e vontade. Sem letra miúda, sem surpresa na
								recepção, só o treino que você veio fazer.
							</p>
						</div>
					</div>
				</section>

				{/* Grade de planos */}
				{/* Full-bleed em três faixas coladas no padrão visual da home: Orange em
				    laranja, Platinum em grená e Avulso em preto. */}
				<section
					id="planos-grade"
					className="grid grid-cols-1 lg:grid-cols-3"
				>
					{/* Orange Anual — A/B test: variante B exibe promoção R$0,99 primeiro mês */}
					<div className="flex flex-col bg-pb-orange px-10 py-16 text-white lg:px-12 lg:py-24">
						<div className="flex items-start justify-between gap-4">
							<h2 className="text-[3.5rem] uppercase leading-[0.98] tracking-tight">
								Plano
								<br />
								Orange Anual
							</h2>
							{isPromoB && (
								<span className="rounded bg-pb-black px-3 py-1 text-xs uppercase tracking-wider text-white">
									Promoção
								</span>
							)}
						</div>

						<p className="mt-4 text-sm leading-snug text-white/90">
							Plano com fidelidade de 12 meses.
						</p>

						<ul className="mt-10 space-y-4">
							{orangeBenefits.map((item) => (
								<li
									key={item}
									className="flex items-start gap-3 text-sm leading-snug"
								>
									<Check className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} />
									<span>{item}</span>
								</li>
							))}
							<li className="flex items-start gap-3 text-sm leading-snug text-white/70">
								<X className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} />
								<span>{orangeExclude}</span>
							</li>
						</ul>

						<div className="mt-auto pt-16 leading-none">
							{isPromoB ? (
								<div>
									<p className="leading-none">
										<span className="text-[3rem] font-bold">R$ 0,99</span>
										<span className="text-sm uppercase">/1ª mensalidade</span>
									</p>
									<p className="mt-2 text-xs text-white/90">
										R$ 119,90/mês a partir da 2ª mensalidade
									</p>
									<span className="mt-2 inline-block rounded bg-pb-black px-2.5 py-1 text-[11px] uppercase tracking-wider text-white">
										Válido até 30/06/2026
									</span>
								</div>
							) : (
								<p className="leading-none">
									<span className="text-[3rem] font-bold">R$ 119,90</span>
									<span className="text-sm">/MÊS</span>
								</p>
							)}
						</div>

						<PlanCTAButton
							plan="orange"
							href="/checkout/orange"
							destination="checkout"
							className="mt-6 flex items-center justify-center rounded-md bg-white px-8 py-4 text-lg font-medium text-pb-orange transition-colors hover:bg-pb-off-white"
						>
							Contratar agora
						</PlanCTAButton>

						<div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-2 border-t border-white/40 pt-6 text-xs leading-snug">
							<span>Fidelidade de 12 meses</span>
							<span>Sem taxa de adesão</span>
							<span>Sem taxa de anuidade</span>
							<span>Pagamento por crédito recorrente</span>
							<span className="col-span-2 text-white/80 text-[11px] mt-1">
								*Válido para quem não teve contrato promocional nos últimos 12 meses. Em caso de cancelamento antes de 1 ano, multa rescisória de 20% do saldo restante.
							</span>
						</div>
					</div>

					{/* Platinum Recorrente — mais vantajoso */}
					<div className="flex flex-col bg-pb-grena px-10 py-16 text-white lg:px-12 lg:py-24">
						<div className="flex items-start justify-between gap-4">
							<h2 className="text-[3.5rem] uppercase leading-[0.98] tracking-tight">
								Plano
								<br />
								Platinum
							</h2>
							<span className="rounded bg-pb-orange px-3 py-1 text-xs uppercase tracking-wider text-white">
								Mais vantajoso
							</span>
						</div>

						<p className="mt-4 text-sm leading-snug text-white/90">
							Débito automático, sem taxas e sem fidelidade.
						</p>

						<ul className="mt-10 space-y-4">
							{platinumBenefits.map((item) => (
								<li
									key={item}
									className="flex items-start gap-3 text-sm leading-snug"
								>
									<Check className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} />
									<span>{item}</span>
								</li>
							))}
						</ul>

						<div className="mt-auto pt-16 leading-none">
							<p className="leading-none">
								<span className="text-[3rem] font-bold">R$ 139,90</span>
								<span className="text-sm">/MÊS</span>
							</p>
						</div>

						<PlanCTAButton
							plan="platinum"
							href="/checkout/platinum"
							destination="checkout"
							className="mt-6 flex items-center justify-center rounded-md bg-white px-8 py-4 text-lg font-medium text-pb-grena transition-colors hover:bg-pb-off-white"
						>
							Contratar agora
						</PlanCTAButton>

						<div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-2 border-t border-white/40 pt-6 text-xs leading-snug">
							<span>Sem fidelidade</span>
							<span>Sem taxa de adesão</span>
							<span>Sem taxa de anuidade</span>
							<span>Sem taxa de cancelamento</span>
							<span className="col-span-2 text-white/80 text-[11px] mt-1">
								*Acesso livre e ilimitado a todas as unidades da rede Panobianco.
							</span>
						</div>
					</div>

					{/* Plano Avulso */}
					<div className="flex flex-col bg-pb-black px-10 py-16 text-white lg:px-12 lg:py-24">
						<h2 className="text-[3.5rem] uppercase leading-[0.98] tracking-tight">
							Plano
							<br />
							Avulso
						</h2>

						<p className="mt-4 text-sm leading-snug text-white/90">
							Você paga só o mês que usar, por pix, débito ou dinheiro direto na recepção.
						</p>

						<ul className="mt-10 space-y-4">
							{avulsoBenefits.map((item) => (
								<li
									key={item}
									className="flex items-start gap-3 text-sm leading-snug"
								>
									<Check className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} />
									<span>{item}</span>
								</li>
							))}
							<li className="flex items-start gap-3 text-sm leading-snug text-white/70">
								<X className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} />
								<span>{avulsoExclude}</span>
							</li>
						</ul>

						<div className="mt-auto pt-16 leading-none">
							<p className="leading-none">
								<span className="text-[3rem] font-bold">R$ 159,90</span>
								<span className="text-sm">/MÊS</span>
							</p>
						</div>

						<PlanCTAButton
							plan="avulso"
							href={WHATSAPP_AVULSO}
							destination="whatsapp"
							className="mt-6 flex items-center justify-center rounded-md bg-white px-8 py-4 text-lg font-medium text-pb-black transition-colors hover:bg-pb-off-white"
						>
							Falar no WhatsApp
						</PlanCTAButton>

						<div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-2 border-t border-white/40 pt-6 text-xs leading-snug">
							<span>Sem contrato</span>
							<span>Sem fidelidade</span>
							<span>Pagamento mensal avulso</span>
							<span>Pix, débito ou dinheiro</span>
							<span className="col-span-2 text-white/80 text-[11px] mt-1">
								*Renovação presencial mensal diretamente na recepção da academia.
							</span>
						</div>
					</div>
				</section>

				{/* Quiz CTA — pós-grade (resgate de indecisão) */}
				<section className="bg-pb-off-white pb-12 pt-10 lg:pb-14 lg:pt-12">
					<div className="container-main">
						<QuizCtaCard
							variant="default"
							source="planos_pos_grid"
							headline="Ainda na dúvida?"
							subhead="Em 60 segundos, te ajudamos a escolher o plano certo, sem compromisso, com a recomendação personalizada chegando no seu e-mail."
							ctaLabel="Fazer o quiz"
						/>
					</div>
				</section>

				{/* Horários, localização e dúvidas */}
				<section className="bg-pb-off-white pb-12 pt-10 lg:pb-14 lg:pt-12">
					<div className="container-main">
						<div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(min(380px,100%),1fr))]">
							<div className="card-hex-light px-12 py-16">
								<span className="shape-octagon-regular mb-6 flex size-12 items-center justify-center bg-pb-orange text-white">
									<Clock className="size-6" />
								</span>
								<h2 className="mb-6 text-[3.5rem] leading-none tracking-tight">
									Horários
								</h2>
								<div className="space-y-1 text-pb-graphite/80">
									<p>Seg a Sex: 06h às 23h</p>
									<p>Sáb: 08h às 18h</p>
									<p>Dom e Feriados: 09h às 13h</p>
								</div>
							</div>
							<div className="card-hex-light px-12 py-16">
								<span className="shape-octagon-regular mb-6 flex size-12 items-center justify-center bg-pb-orange text-white">
									<MapPin className="size-6" />
								</span>
								<h2 className="mb-6 text-[3.5rem] leading-none tracking-tight">
									Localização
								</h2>
								<div className="space-y-1 text-pb-graphite/80">
									<p>Av. Cidade Jardim, 391 - Jardim Satélite</p>
									<p>São José dos Campos - SP, 12231-675</p>
								</div>
							</div>
							<div className="card-hex-light px-12 py-16">
								<span className="shape-octagon-regular mb-6 flex size-12 items-center justify-center bg-pb-orange text-white">
									<MessageCircle className="size-6" />
								</span>
								<h2 className="mb-6 text-[3.5rem] leading-none tracking-tight">
									Dúvidas?
								</h2>
								<div className="space-y-1 text-pb-graphite/80">
									<p>Fale com nossa equipe</p>
									<p>pelo WhatsApp oficial</p>
									<p>{PHONE_DISPLAY}</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* FAQ */}
				{/* Fecha curto: o ContactCtaSection já entra com o topo apertado. */}
				<section className="bg-pb-off-white pb-6 pt-10 lg:pb-8 lg:pt-12">
					<div className="container-main">
						<h2 className="mb-[7.5rem] text-center text-[3.5rem] leading-none tracking-tight text-pb-orange-warm">
							Dúvidas frequentes
						</h2>
						<div className="mx-auto max-w-4xl space-y-4">
							<details className="shape-chanfrado-menor group bg-white">
								<summary className="flex cursor-pointer items-center justify-between gap-4 px-8 py-6 text-[1.5rem] leading-tight">
									<span>
										Posso cancelar o Plano Platinum a qualquer momento?
									</span>
									<ChevronDown className="size-5 shrink-0 transition-transform group-open:rotate-180" />
								</summary>
								<div className="px-8 pb-8 leading-relaxed text-pb-graphite/80">
									Sim! O Plano Platinum não possui fidelidade. Você pode
									solicitar o cancelamento diretamente na recepção com 30 dias
									de antecedência do próximo vencimento.
								</div>
							</details>
							<details className="shape-chanfrado-menor group bg-white">
								<summary className="flex cursor-pointer items-center justify-between gap-4 px-8 py-6 text-[1.5rem] leading-tight">
									<span>
										Quais são as unidades inclusas no plano recorrente?
									</span>
									<ChevronDown className="size-5 shrink-0 transition-transform group-open:rotate-180" />
								</summary>
								<div className="px-8 pb-8 leading-relaxed text-pb-graphite/80">
									Com o plano Platinum, você tem acesso livre a todas as
									unidades da rede Panobianco. Basta apresentar seu CPF em
									qualquer recepção.
								</div>
							</details>
							<details className="shape-chanfrado-menor group bg-white">
								<summary className="flex cursor-pointer items-center justify-between gap-4 px-8 py-6 text-[1.5rem] leading-tight">
									<span>Aceita Wellhub/Gympass?</span>
									<ChevronDown className="size-5 shrink-0 transition-transform group-open:rotate-180" />
								</summary>
								<div className="px-8 pb-8 leading-relaxed text-pb-graphite/80">
									Sim! Aceitamos Wellhub (antigo Gympass). Entre em contato ou
									venha nos visitar para saber quais planos estão disponíveis
									para a sua categoria. Se for o seu caso,{" "}
									<Link
										href="/parceiros"
										className="text-pb-orange-warm underline"
									>
										preencha o pré-cadastro aqui
									</Link>
									.
								</div>
							</details>
						</div>
					</div>
				</section>

				<AbTestImpression
					experiment="promo-orange"
					variant={isPromoB ? "b" : "a"}
				/>
			</main>

			<ContactCtaSection />
		</div>
	);
}
