import { Check, CreditCard, MapPin, Star } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import ContactCtaSection from "@/components/ContactCtaSection";
import PlanCTAButton from "@/components/PlanCTAButton";
import QuizCtaBanner from "@/components/QuizCtaBanner";
import SchedulingLink from "@/components/SchedulingLink";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
	title: "Panobianco Jardim Satélite | Feitos de força e vontade",
	description:
		"Musculação, aulas coletivas e treino personalizado no Jardim Satélite, em São José dos Campos. Um passo de cada vez, até não parar mais.",
	keywords:
		"academia, musculação, aulas coletivas, treino personalizado, são josé dos campos, jardim satélite, academia panobianco, fitness, personal trainer, avaliação física",
	robots: "index, follow",
	openGraph: {
		title: "Panobianco Jardim Satélite | Feitos de força e vontade",
		description:
			"Estrutura, aulas coletivas e planos sem burocracia na unidade Jardim Satélite.",
		type: "website",
		locale: "pt_BR",
		siteName: "Panobianco Jardim Satélite",
	},
	twitter: {
		card: "summary_large_image",
		title: "Panobianco Jardim Satélite | Feitos de força e vontade",
		description:
			"O treino que você procura, aqui tem. Unidade Jardim Satélite, São José dos Campos.",
	},
	alternates: {
		canonical: "/",
	},
};

const heroImage = "/images/fachada.webp";

const features = [
	"Maquinário de ponta. Você puxa, ele responde.",
	"Time qualificado de olho no seu movimento.",
	"Climatização em todas as áreas: calor só da sessão.",
];

const modalities = [
	{
		name: "Musculação",
		description:
			"Força e hipertrofia com acompanhamento profissional. Um passo de cada vez, até não parar mais.",
		href: "/servicos/musculacao",
		image: "/images/modalidades/musculacao.webp",
	},
	{
		name: "Aulas Coletivas",
		description:
			"FitDance, Yoga, Pilates e mais. A melhor série para maratonar é a sua.",
		href: "/aulas-coletivas",
		image: "/images/modalidades/aulas-coletivas.webp",
	},
	{
		name: "Treino Personalizado",
		description:
			"Um olho no espelho, outro no resultado. Atenção total no seu objetivo.",
		href: "/servicos/treino-personalizado",
		image: "/images/modalidades/treino-personalizado.webp",
	},
];

const whyUs = [
	{
		title: "Planos sem letra miúda",
		description:
			"Opções que cabem no seu bolso e na sua rotina. Dropa o peso, não a vontade.",
		icon: Check,
	},
	{
		title: "Aqui do lado",
		description:
			"No coração do Jardim Satélite, com acesso fácil e estacionamento amplo.",
		icon: MapPin,
	},
	{
		title: "Wellhub na recepção",
		description:
			"Aceitamos o principal benefício corporativo para você treinar onde quiser.",
		icon: CreditCard,
	},
];

const testimonials = [
	{
		quote:
			"Linda academia, aparelhos modernos, local limpo e tem até elevador! Participei da aula fitDance com o professor Ed, um excelente profissional, além de dançar muitíssimo bem, é educado e atencioso!",
		author: "Angela",
	},
	{
		quote:
			"O que eu mais gostei logo de cara foi a atenção dos professores, eles são muito atenciosos, simpáticos e tem muita paciência com a gente. Sempre estimulando a gente a treinar e treinar da forma correta e com treinos personalizados pra gente. Não ficar amarrado em um plano também é excelente.",
		author: "Vanessa",
	},
	{
		quote:
			"A academia Panobianco do Satélite, é top demais! Estrutura impecável, com três pavimentos super bem organizados, elevador, banheiros com chuveiros e até shampoo disponível, um cuidado que faz toda a diferença!",
		author: "Liliane",
	},
];

const localBusinessReviewsSchema = {
	"@context": "https://schema.org",
	"@type": "LocalBusiness",
	"@id": `${SITE_URL}#organization`,
	review: [
		{
			"@type": "Review",
			author: { "@type": "Person", name: "Angela" },
			reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
			reviewBody:
				"Linda academia, aparelhos modernos, local limpo e tem até elevador. Participei da aula FitDance com o professor Ed, excelente profissional, educado e atencioso.",
		},
		{
			"@type": "Review",
			author: { "@type": "Person", name: "Vanessa" },
			reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
			reviewBody:
				"O que eu mais gostei foi a atenção dos professores. Sempre estimulando a treinar da forma correta e com treinos personalizados.",
		},
		{
			"@type": "Review",
			author: { "@type": "Person", name: "Liliane" },
			reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
			reviewBody:
				"Estrutura impecável, com três pavimentos bem organizados, elevador e banheiros com chuveiros.",
		},
	],
};

const avatarUrls = [
	"https://lh3.googleusercontent.com/a-/ALV-UjWh4mRXj1Qy76S7Z635sDJI_rFLKCQ-llKXXUZwDN0sE_afjUrK=w72-h72-p-rp-mo-br100",
	"https://lh3.googleusercontent.com/a-/ALV-UjX69vMqtUkLPKp8WBV-fBIwXwTtEGCIRNYgki4Q7s4uu4Ceneb_uw=w72-h72-p-rp-mo-br100",
	"https://lh3.googleusercontent.com/a-/ALV-UjXzmGDXAj6KBOJpLFXhHVDzT8y6jQA9GwiokrSg5I14azjyNqZ6Uw=w72-h72-p-rp-mo-br100",
];

// Seção de planos espelhada do site da rede
// (panobiancoacademia.com.br/experiencia-panobianco).
// `terms` está na ordem de leitura da grade de duas colunas do rodapé do card.
const homePlans = [
	{
		key: "orange" as const,
		name: "Orange",
		price: "R$ 119,90",
		href: "/checkout/orange",
		surface: "bg-pb-orange",
		benefits: [
			"Musculação e Cardio",
			"Aulas coletivas",
			"Panobianco App",
			"Até 5 convidados por mês",
			"Avaliação gratuita",
			"Até 4 acessos mensais a outras unidades (Exceto unidades Select e CT)",
		],
		terms: [
			"Fidelidade de 12 meses",
			"Sem taxa de adesão",
			"Taxa de cancelamento",
			"Pagamento ANUAL por crédito recorrente",
		],
	},
	{
		key: "platinum" as const,
		name: "Platinum",
		price: "R$ 139,90",
		href: "/checkout/platinum",
		surface: "bg-pb-grena",
		benefits: [
			"Musculação e Cardio",
			"Aulas coletivas",
			"Panobianco App",
			"Até 5 convidados por mês",
			"Avaliação gratuita",
			"Acesso ilimitado a todas unidades Panobianco (Exceto unidades Select e CT)",
			"Até 4 acessos mensais a outras unidades CT",
		],
		terms: [
			"Sem fidelidade",
			"Sem taxa de adesão",
			"Sem taxa de cancelamento",
			"Pagamento MENSAL por crédito recorrente",
		],
	},
];

const whyUsImage = "/images/panobianco-jardim-satelite.webp";

const mapImage = "/images/av-cidade-jardim-391.webp";

export default function Home() {
	const webPageSchema = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		name: "Panobianco Jardim Satélite | Feitos de força e vontade",
		description:
			"Musculação, aulas coletivas e treino personalizado no Jardim Satélite, em São José dos Campos.",
		url: SITE_URL,
	};

	return (
		<div className="font-display bg-pb-off-white text-pb-graphite overflow-x-hidden">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(webPageSchema),
				}}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(localBusinessReviewsSchema),
				}}
			/>
			{/* Hero */}
			{/* Foto limpa, sem véu: todo o conteúdo vive dentro do módulo
			    hexagonal laranja, encostado à direita. */}
			<section className="relative flex min-h-screen items-center overflow-hidden pt-20">
				<div className="absolute inset-0 z-0">
					<Image
						src={heroImage}
						alt="Academia moderna Panobianco"
						fill
						className="object-cover"
						priority
						unoptimized
						sizes="100vw"
					/>
				</div>
				<div className="container-main relative z-10 flex w-full justify-end">
					<div className="shape-chanfrado mt-20 w-full max-w-2xl bg-pb-orange px-10 py-14 text-white lg:px-14 lg:py-16">
						<h1 className="mb-6 text-[3.5rem] leading-[0.96] tracking-tight">
							O treino que você procura, aqui tem.
						</h1>
						<p className="text-[1.5rem] leading-tight">
							Feitos de força e vontade. Estrutura, equipamento e gente que
							acompanha, um passo de cada vez, até não parar mais.
						</p>
						<div className="mt-8 flex flex-col gap-4 sm:flex-row">
							<SchedulingLink className="botao-chanfrado inline-flex items-center justify-center bg-white px-8 py-4 text-sm uppercase tracking-wide text-pb-orange-warm transition-colors hover:bg-pb-off-white">
								Agendar aula experimental
							</SchedulingLink>
							<Link
								href="/#planos"
								className="botao-chanfrado inline-flex items-center justify-center bg-pb-black px-8 py-4 text-sm uppercase tracking-wide text-white transition-colors hover:bg-pb-grena"
							>
								Ver Planos
							</Link>
						</div>
						<div className="mt-10 flex items-center gap-6">
							{/* O clip-path corta bordas, então a separação entre os
							    avatares sobrepostos vem de um octógono laranja por baixo. */}
							<div className="flex -space-x-2">
								{avatarUrls.map((url) => (
									<span
										key={url}
										className="shape-octagon-regular size-11 shrink-0 bg-pb-orange p-[3px]"
									>
										<Image
											src={url}
											alt="Avatar de aluno satisfeito da Panobianco"
											width={40}
											height={40}
											className="shape-octagon-regular size-full object-cover"
										/>
									</span>
								))}
							</div>
							<div>
								<div className="flex gap-0.5 text-white" title="4.9 estrelas">
									{[1, 2, 3, 4, 5].map((n) => (
										<Star
											key={`hero-star-${n}`}
											className="size-4 fill-current"
										/>
									))}
								</div>
								<p className="text-xs">
									+2000 alunos satisfeitos no Jardim Satélite
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features */}
			<section className="bg-pb-grena py-20 lg:py-28">
				<div className="container-main">
					<h2 className="font-display mb-[7.5rem] text-center text-[3.5rem] leading-none text-white">
						Aqui, o básico é bem feito.
					</h2>
					<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
						{features.map((feature) => (
							<div
								key={feature}
								className="card-hex-orange font-display px-12 py-16 text-[32px] leading-tight"
							>
								{feature}
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Modalities */}
			<section
				className="bg-pb-off-white pb-12 pt-20 lg:pb-14 lg:pt-28"
				id="servicos"
			>
				<div className="container-main">
					<div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(min(440px,100%),1fr))]">
						{modalities.map((mod) => (
							<Link
								key={mod.name}
								href={mod.href}
								className="group flex flex-col"
							>
								{/* Nível 1: foto com crop hexagonal completo (4 pontas). */}
								<div className="shape-chanfrado relative aspect-[4/5]">
									<Image
										src={mod.image}
										alt={mod.name}
										fill
										className="object-cover transition-transform duration-500 group-hover:scale-110"
										sizes="(max-width: 768px) 100vw, 33vw"
									/>
								</div>
								{/* Nível 2: bloco hexagonal laranja com o texto. Com as 4
								    pontas chanfradas, o padding vertical precisa passar do
								    chanfro nas duas bordas para o texto não ser cortado
								    pelas diagonais. */}
								<div className="shape-chanfrado flex-grow bg-pb-orange px-12 py-12 text-white lg:py-20">
									<h2 className="mb-6 text-[3.5rem] leading-none tracking-tight">
										{mod.name}
									</h2>
									<p className="mb-8 text-[1.5rem] leading-tight text-white/90">
										{mod.description}
									</p>
									{/* Visualmente um botão, mas mantém-se <span>: o card
									    inteiro já é o link, e aninhar interativos é inválido. */}
									<span className="botao-chanfrado inline-flex items-center bg-white px-6 py-3 text-sm uppercase tracking-wide text-pb-orange-warm transition-colors group-hover:bg-pb-off-white">
										Ver Horários
									</span>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Why Us */}
			<section
				className="bg-pb-off-white pb-12 pt-10 lg:pb-14 lg:pt-12"
				id="sobre"
			>
				<div className="container-main">
					{/* Mesma construção dos cards de modalidade, deitada: um nível de
					    foto e um nível de texto, ambos com o hexágono completo. */}
					<div className="flex flex-col lg:flex-row">
						{/* Nível 1: foto com crop hexagonal completo. */}
						<div className="shape-chanfrado relative min-h-[420px] lg:order-2 lg:w-1/2">
							<Image
								src={whyUsImage}
								alt="Interior da unidade Panobianco Jardim Satélite"
								fill
								className="object-cover"
								sizes="(max-width: 992px) 100vw, 50vw"
							/>
						</div>
						{/* Nível 2: bloco hexagonal laranja com o texto. O padding
						    vertical precisa passar do chanfro nas duas bordas. */}
						<div className="shape-chanfrado bg-pb-orange px-12 py-12 text-white lg:order-1 lg:w-1/2 lg:py-20">
							<h2 className="mb-8 text-[3.5rem] leading-none tracking-tight">
								Por que treinar na Panobianco Jardim Satélite
							</h2>
							<ul className="space-y-6">
								{whyUs.map((item) => {
									const Icon = item.icon;
									return (
										<li key={item.title} className="flex items-start gap-4">
											<span className="shape-octagon-regular flex size-10 shrink-0 items-center justify-center bg-white/20 text-white">
												<Icon className="size-5" />
											</span>
											<div>
												<h4 className="text-[1.5rem] leading-tight tracking-tight text-white">
													{item.title}
												</h4>
												<p className="text-white">{item.description}</p>
											</div>
										</li>
									);
								})}
							</ul>
							<Link
								href="/#localizacao"
								className="botao-chanfrado mt-10 inline-flex items-center justify-center bg-white px-8 py-4 text-sm uppercase tracking-wide text-pb-orange-warm transition-colors hover:bg-pb-off-white"
							>
								Conhecer a Unidade
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Quiz CTA Banner */}
			<QuizCtaBanner source="home_pos_modalidades" />

			{/* Location & Hours */}
			<section
				className="bg-pb-off-white pb-20 pt-10 lg:pb-28 lg:pt-12"
				id="localizacao"
			>
				<div className="container-main">
					{/* Mesma construção da seção "Por que treinar": dois níveis
					    hexagonais colados, mapa à esquerda e horários à direita. */}
					<div className="flex flex-col lg:flex-row">
						{/* Nível 1: mapa com crop hexagonal completo. */}
						<div className="shape-chanfrado group relative min-h-[420px] lg:w-1/2">
							<Image
								src={mapImage}
								alt="Localização Panobianco Jardim Satélite"
								fill
								sizes="(max-width: 992px) 100vw, 50vw"
								className="object-cover opacity-80 grayscale transition-all duration-700 group-hover:opacity-100 group-hover:grayscale-0"
							/>
							<div className="absolute inset-0 bg-primary-500/10 mix-blend-multiply" />
							<div className="botao-chanfrado absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 bg-primary-500 p-4 text-white">
								<MapPin className="size-6" />
								<div className="text-xs leading-none">
									ENCONTRE-NOS AQUI
									<br />
									<span className="text-[10px] opacity-80">
										Jardim Satélite, SJC
									</span>
								</div>
							</div>
						</div>
						{/* Nível 2: bloco hexagonal laranja com os horários. */}
						<div className="shape-chanfrado bg-pb-orange px-12 py-12 text-white lg:w-1/2 lg:py-20">
							<h3 className="mb-8 text-[3.5rem] leading-none tracking-tight">
								Horários de Funcionamento
							</h3>
							<div className="space-y-4">
								<div className="flex items-center justify-between border-b border-white/30 pb-4 text-[1.5rem]">
									<span>Segunda a Sexta</span>
									<span>06:00 - 23:00</span>
								</div>
								<div className="flex items-center justify-between border-b border-white/30 pb-4 text-[1.5rem]">
									<span>Sábado</span>
									<span>08:00 - 18:00</span>
								</div>
								<div className="flex items-center justify-between border-b border-white/30 pb-4 text-[1.5rem]">
									<span>Domingos e Feriados</span>
									<span>09:00 - 14:00</span>
								</div>
							</div>
							<div className="mt-10 flex items-center gap-4">
								<span className="shape-octagon-regular flex size-10 shrink-0 items-center justify-center bg-white/20 text-white">
									<MapPin className="size-5" />
								</span>
								<div>
									<p>Av. Cidade Jardim, 391 - Jardim Satélite</p>
									<p className="text-sm">São José dos Campos - SP, 12231-675</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section className="overflow-hidden bg-pb-grena py-20 lg:py-28">
				<div className="container-main">
					<h2 className="font-display mb-[7.5rem] text-center text-[3.5rem] leading-none text-white">
						Quem treina conta melhor
					</h2>
					<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
						{testimonials.map((t) => (
							<div
								key={t.author}
								className="card-hex-orange font-display flex flex-col justify-between px-12 py-16"
							>
								<div>
									<div className="mb-4 flex text-white">
										{[1, 2, 3, 4, 5].map((n) => (
											<Star
												key={`testimonial-star-${t.author}-${n}`}
												className="size-5 fill-current"
											/>
										))}
									</div>
									<p className="mb-8 text-[1.5rem] leading-tight">
										&quot;{t.quote}&quot;
									</p>
								</div>
								<p className="text-[1.5rem]">{t.author}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Planos */}
			{/* Full-bleed em três faixas coladas: chamada em creme, Orange em
			    laranja e Platinum em grená. Sem chanfro nem container. */}
			<section
				id="planos"
				className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-[4fr_3fr_3fr]"
			>
				<div className="flex flex-col justify-center bg-pb-off-white px-10 py-20 lg:px-16 lg:py-28">
					<h2 className="text-[3.5rem] leading-[0.98] tracking-tight text-pb-orange">
						Escolha seu plano e comece a treinar.
					</h2>
					<p className="mt-10 max-w-xs text-sm leading-snug text-pb-black">
						*Verifique a disponibilidade dos planos na unidade de sua
						preferência.
					</p>
				</div>

				{homePlans.map((plan) => (
					<div
						key={plan.key}
						className={`flex flex-col px-10 py-20 text-white lg:px-12 lg:py-28 ${plan.surface}`}
					>
						<h3 className="text-[3.5rem] uppercase leading-[0.98] tracking-tight">
							Plano
							<br />
							{plan.name}
						</h3>

						<ul className="mt-12 space-y-4">
							{plan.benefits.map((benefit) => (
								<li
									key={benefit}
									className="flex items-start gap-3 text-sm leading-snug"
								>
									<Check className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} />
									<span>{benefit}</span>
								</li>
							))}
						</ul>

						<p className="mt-auto pt-16 leading-none">
							<span className="text-[3rem]">{plan.price}</span>
							<span className="text-sm">/MÊS</span>
						</p>

						<PlanCTAButton
							plan={plan.key}
							href={plan.href}
							destination="checkout"
							className="mt-6 flex items-center justify-center rounded-md bg-white px-8 py-4 text-lg text-pb-orange transition-colors hover:bg-pb-off-white"
						>
							Contratar agora
						</PlanCTAButton>

						<div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-2 border-t border-white/40 pt-6 text-xs leading-snug">
							{plan.terms.map((term) => (
								<span key={term}>{term}</span>
							))}
						</div>
					</div>
				))}
			</section>

			{/* Wellhub */}
			{/* Faixa preta chanfrada. O chanfro de 40px é local: a barra é baixa
			    demais para os 72px do padrão e alta demais para os 24px do menor. */}
			<section className="bg-pb-off-white pb-6 pt-20 lg:pb-8 lg:pt-28">
				<div className="container-main">
					<div
						className="shape-chanfrado flex flex-col items-center justify-center gap-10 bg-pb-black px-10 py-12 text-white md:flex-row md:gap-16 md:px-16"
						style={{ "--tamanho-chanfro": "40px" } as React.CSSProperties}
					>
						<Image
							src="/wellhub-logo.png"
							alt="Wellhub"
							width={377}
							height={69}
							className="h-auto w-56 shrink-0"
						/>
						<p className="max-w-xl leading-snug">
							A rede Panobianco é parceira Wellhub no segmento corporativo,
							seguindo normalmente com o acesso dos seus alunos inscritos em
							nossos tradicionais Planos Gold e Platinum.
						</p>
					</div>
				</div>
			</section>

			<ContactCtaSection />
		</div>
	);
}
