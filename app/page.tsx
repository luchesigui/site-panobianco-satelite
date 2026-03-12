import {
	ArrowRight,
	Check,
	CreditCard,
	Dumbbell,
	MapPin,
	ShieldCheck,
	Snowflake,
	Star,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import ContactCtaSection from "@/components/ContactCtaSection";
import SchedulingLink from "@/components/SchedulingLink";

export const metadata: Metadata = {
	title: "Panobianco Jardim Satélite | Sua Melhor Versão Começa Aqui",
	description:
		"Nova landing page da Panobianco Jardim Satélite com serviços, aulas coletivas, planos e localização da unidade.",
	keywords:
		"academia, musculação, aulas coletivas, treino personalizado, são josé dos campos, jardim satélite, academia panobianco, fitness, personal trainer, avaliação física",
	robots: "index, follow",
	openGraph: {
		title: "Panobianco Jardim Satélite | Landing Page",
		description:
			"Infraestrutura premium, aulas coletivas e planos flexíveis na unidade Jardim Satélite.",
		type: "website",
		locale: "pt_BR",
		siteName: "Panobianco Jardim Satélite",
	},
	twitter: {
		card: "summary_large_image",
		title: "Panobianco Jardim Satélite",
		description: "Conheça a nova landing page da unidade Jardim Satélite.",
	},
	alternates: {
		canonical: "/",
	},
};

const heroImage = "/images/fachada.png";

const features = [
	{
		title: "Equipamentos Modernos",
		description:
			"Maquinário de última linha das melhores marcas mundiais para seu desempenho máximo.",
		icon: Dumbbell,
	},
	{
		title: "Profissionais Certificados",
		description:
			"Time de especialistas prontos para guiar sua jornada com segurança e resultados reais.",
		icon: ShieldCheck,
	},
	{
		title: "Ambiente Climatizado",
		description:
			"Conforto térmico em todas as áreas para você treinar no seu ritmo em qualquer estação.",
		icon: Snowflake,
	},
];

const modalities = [
	{
		name: "Musculação",
		description:
			"Treinos de força e hipertrofia com acompanhamento profissional qualificado.",
		href: "/servicos/musculacao",
		image: "/images/modalidades/musculacao.png",
	},
	{
		name: "Aulas Coletivas",
		description:
			"FitDance, Yoga, Pilates e muito mais para queimar calorias com diversão.",
		href: "/aulas-coletivas",
		image: "/images/modalidades/aulas-coletivas.png",
	},
	{
		name: "Treino Personalizado",
		description:
			"Atenção total focada nos seus objetivos individuais e performance.",
		href: "/servicos/treino-personalizado",
		image: "/images/modalidades/treino-personalizado.png",
	},
];

const whyUs = [
	{
		title: "Planos Flexíveis",
		description:
			"Opções que se adaptam ao seu bolso e rotina, sem burocracia excessiva.",
		icon: Check,
	},
	{
		title: "Localização Privilegiada",
		description:
			"No coração do Jardim Satélite, fácil acesso e estacionamento amplo.",
		icon: MapPin,
	},
	{
		title: "Parceiros Gympass",
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
		featured: false,
	},
	{
		quote:
			"O que eu mais gostei logo de cara foi a atenção dos professores, eles são muito atenciosos, simpáticos e tem muita paciência com a gente. Sempre estimulando a gente a treinar e treinar da forma correta e com treinos personalizados pra gente. Não ficar amarrado em um plano também é excelente.",
		author: "Vanessa",
		featured: true,
	},
	{
		quote:
			"A academia Panobianco do Satélite, é top demais! Estrutura impecável, com três pavimentos super bem organizados, elevador, banheiros com chuveiros e até shampoo disponível, um cuidado que faz toda a diferença!",
		author: "Liliane",
		featured: false,
	},
];

const avatarUrls = [
	"https://lh3.googleusercontent.com/a-/ALV-UjWh4mRXj1Qy76S7Z635sDJI_rFLKCQ-llKXXUZwDN0sE_afjUrK=w72-h72-p-rp-mo-br100",
	"https://lh3.googleusercontent.com/a-/ALV-UjX69vMqtUkLPKp8WBV-fBIwXwTtEGCIRNYgki4Q7s4uu4Ceneb_uw=w72-h72-p-rp-mo-br100",
	"https://lh3.googleusercontent.com/a-/ALV-UjXzmGDXAj6KBOJpLFXhHVDzT8y6jQA9GwiokrSg5I14azjyNqZ6Uw=w72-h72-p-rp-mo-br100",
];

const whyUsImage = "/images/panobianco-jardim-satelite.webp";

const mapImage =
	"https://lh3.googleusercontent.com/aida-public/AB6AXuAkx_hnH45N70uVuzeOUB9m5kdYGwy94NxsBZdFRxbT1qzRTtKcoR0MYC9csc53tbqizczIFJ4Lsmx9T55LmLqxq52xSeNzxOnW6MeZJNQ-xPX8Sk_4W5bEjpN8Iw8L4uxgYxqmWGvHZ9O_pbGl2y5qBRP064PZdOS8412JW1WvTOrYPv2F5e4VxpnzChQRlWuWia-NAmsOEfsMoXfhZoc5GCbhi5O79kxbpbFKYKbzFORAyVnuxFneVmK-dgOLZixGnmihbIEqaU8";

export default function Home() {
	return (
		<div className="font-display bg-background-dark text-white overflow-x-hidden">
			{/* Hero */}
			<section className="relative flex min-h-screen items-center overflow-hidden pt-20">
				<div className="absolute inset-0 z-0">
					<Image
						src={heroImage}
						alt="Academia moderna Panobianco"
						fill
						className="object-cover"
						priority
						sizes="100vw"
					/>
					<div className="absolute inset-0 hero-gradient" />
				</div>
				<div className="container-main relative z-10 w-full">
					<div className="max-w-3xl">
						<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary-500">
							<span className="relative flex size-2">
								<span className="absolute inline-flex size-full animate-ping rounded-full bg-primary-500 opacity-75" />
								<span className="relative inline-flex size-2 rounded-full bg-primary-500" />
							</span>
							Matrículas Abertas - Unidade Jardim Satélite
						</div>
						<h1 className="mb-6 text-5xl font-black leading-[1.1] tracking-tight md:text-7xl">
							Pronto para sua <br />
							<span className="italic text-primary-500">melhor versão?</span>
						</h1>
						<p className="mb-10 max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl">
							A unidade Jardim Satélite oferece infraestrutura premium,
							equipamentos de última geração e os melhores especialistas para
							você transformar seu corpo e mente.
						</p>
						<div className="flex flex-col gap-4 sm:flex-row">
							<SchedulingLink className="inline-flex items-center justify-center rounded-full bg-primary-500 px-10 py-4 text-lg font-bold text-white shadow-xl shadow-primary-500/30 transition-transform hover:bg-primary-500/90 active:scale-95">
								Começar Agora
							</SchedulingLink>
							<Link
								href="/#planos"
								className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-10 py-4 text-lg font-bold text-white backdrop-blur-md transition-all hover:bg-white/20"
							>
								Ver Planos
							</Link>
						</div>
						<div className="mt-12 flex items-center gap-6">
							<div className="flex -space-x-3">
								{avatarUrls.map((url) => (
									<Image
										key={url}
										src={url}
										alt="Avatar de aluno satisfeito da Panobianco"
										width={40}
										height={40}
										className="size-10 rounded-full border-2 border-background-dark object-cover"
									/>
								))}
							</div>
							<div>
								<div
									className="flex gap-0.5 text-primary-500"
									title="4.9 estrelas"
								>
									{[1, 2, 3, 4, 5].map((n) => (
										<Star
											key={`hero-star-${n}`}
											className="size-4 fill-current"
										/>
									))}
								</div>
								<p className="text-xs font-medium text-gray-400">
									+2000 alunos satisfeitos no Jardim Satélite
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features */}
			<section className="bg-background-dark py-24">
				<div className="container-main">
					<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
						{features.map((item) => {
							const Icon = item.icon;
							return (
								<div
									key={item.title}
									className="glass-card group flex flex-col items-start gap-4 rounded-2xl p-8 transition-all hover:border-primary-500/50"
								>
									<div className="flex size-14 items-center justify-center rounded-xl bg-primary-500/10 transition-colors group-hover:bg-primary-500">
										<Icon className="size-8 text-primary-500 transition-colors group-hover:text-white" />
									</div>
									<div>
										<h3 className="mb-2 text-xl font-bold">{item.title}</h3>
										<p className="text-gray-400">{item.description}</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Modalities */}
			<section className="bg-background-dark py-24" id="servicos">
				<div className="container-main">
					<div className="mb-16 text-center">
						<h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-primary-500">
							O que oferecemos
						</h2>
						<h3 className="mb-6 text-4xl font-black md:text-5xl">
							Nossas Modalidades
						</h3>
						<p className="mx-auto max-w-2xl text-gray-400">
							Diversas opções de treino para você nunca cair na rotina e
							alcançar seus objetivos específicos.
						</p>
					</div>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
						{modalities.map((mod) => (
							<Link
								key={mod.name}
								href={mod.href}
								className="group relative aspect-[4/5] overflow-hidden rounded-2xl"
							>
								<Image
									src={mod.image}
									alt={mod.name}
									fill
									className="object-cover transition-transform duration-500 group-hover:scale-110"
									sizes="(max-width: 768px) 100vw, 33vw"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-90" />
								<div className="absolute bottom-0 left-0 w-full p-8">
									<h4 className="mb-2 text-2xl font-bold">{mod.name}</h4>
									<p className="mb-4 text-sm text-gray-300">
										{mod.description}
									</p>
									<span className="flex items-center gap-2 font-bold text-primary-500">
										Ver Horários
										<ArrowRight className="size-4" />
									</span>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Why Us */}
			<section
				className="border-t border-white/5 bg-background-dark py-24"
				id="sobre"
			>
				<div className="container-main">
					<div className="flex flex-col items-center gap-16 lg:flex-row">
						<div className="lg:w-1/2">
							<h2 className="mb-8 text-4xl font-black leading-tight md:text-5xl">
								Por que escolher a Panobianco{" "}
								<span className="italic text-primary-500">
									Jardim Satélite?
								</span>
							</h2>
							<ul className="space-y-6">
								{whyUs.map((item) => {
									const Icon = item.icon;
									return (
										<li key={item.title} className="flex items-start gap-4">
											<span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-500/10 p-2 text-primary-500">
												<Icon className="size-5" />
											</span>
											<div>
												<h4 className="text-lg font-bold">{item.title}</h4>
												<p className="text-gray-400">{item.description}</p>
											</div>
										</li>
									);
								})}
							</ul>
							<div className="mt-10">
								<Link
									href="/#localizacao"
									className="inline-flex items-center justify-center rounded-full bg-primary-500 px-8 py-3 font-bold text-white transition-colors hover:bg-primary-500/90"
								>
									Conhecer a Unidade
								</Link>
							</div>
						</div>
						<div className="relative lg:w-1/2">
							<div className="absolute -left-10 -top-10 size-40 rounded-full bg-primary-500/20 blur-3xl" />
							<Image
								src={whyUsImage}
								alt="Interior da Academia"
								width={600}
								height={400}
								className="relative z-10 rounded-3xl shadow-2xl"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section className="overflow-hidden bg-background-dark py-24">
				<div className="container-main">
					<div className="mb-16 text-center">
						<h3 className="text-4xl font-black uppercase tracking-tighter">
							O que nossos{" "}
							<span className="text-primary-500">Alunos Dizem</span>
						</h3>
					</div>
					<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
						{testimonials.map((t) => (
							<div
								key={t.author}
								className={`flex flex-col justify-between rounded-3xl p-8 ${
									t.featured
										? "scale-105 border border-primary-500/20 bg-primary-500/5 shadow-2xl"
										: "glass-card"
								}`}
							>
								<div>
									<div className="mb-4 flex text-primary-500">
										{[1, 2, 3, 4, 5].map((n) => (
											<Star
												key={`testimonial-star-${t.author}-${n}`}
												className="size-5 fill-current"
											/>
										))}
									</div>
									<p
										className={`mb-8 italic ${
											t.featured
												? "font-medium leading-relaxed text-gray-100"
												: "text-gray-300"
										}`}
									>
										&quot;{t.quote}&quot;
									</p>
								</div>
								<div className="flex items-center gap-4">
									<div>
										<p
											className={`font-bold ${t.featured ? "text-white" : ""}`}
										>
											{t.author}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Location & Hours */}
			<section className="bg-background-dark py-24" id="localizacao">
				<div className="container-main">
					<div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
						<div className="group h-[400px] overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
							<div className="relative flex h-full w-full items-center justify-center bg-zinc-800">
								<Image
									src={mapImage}
									alt="Localização Panobianco Jardim Satélite"
									fill
									className="object-cover grayscale opacity-50 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100"
								/>
								<div className="absolute inset-0 bg-primary-500/10 mix-blend-multiply" />
								<div className="absolute z-20 flex items-center gap-3 rounded-2xl bg-primary-500 p-4 shadow-xl text-white">
									<MapPin className="size-6" />
									<div className="text-xs font-bold leading-none">
										ENCONTRE-NOS AQUI
										<br />
										<span className="text-[10px] font-normal opacity-80">
											Jardim Satélite, SJC
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="p-8">
							<h3 className="mb-6 text-3xl font-black">
								Horários de{" "}
								<span className="text-primary-500">Funcionamento</span>
							</h3>
							<div className="space-y-4">
								<div className="flex items-center justify-between border-b border-white/10 pb-4">
									<span className="font-medium">Segunda a Sexta</span>
									<span className="font-bold text-primary-500">
										06:00 - 23:00
									</span>
								</div>
								<div className="flex items-center justify-between border-b border-white/10 pb-4">
									<span className="font-medium">Sábado</span>
									<span className="font-bold text-primary-500">
										08:00 - 18:00
									</span>
								</div>
								<div className="flex items-center justify-between border-b border-white/10 pb-4">
									<span className="font-medium">Domingos e Feriados</span>
									<span className="font-bold text-primary-500">
										09:00 - 14:00
									</span>
								</div>
							</div>
							<div className="mt-8 flex items-center gap-4">
								<MapPin className="size-10 text-primary-500" />
								<div>
									<p className="font-bold">
										Av. Cidade Jardim, 391 - Jardim Satélite
									</p>
									<p className="text-sm text-gray-400">
										São José dos Campos - SP, 12231-675
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Planos anchor section - minimal for nav target */}
			<section id="planos" className="scroll-mt-24 bg-background-dark py-12">
				<div className="container-main text-center">
					<h2 className="mb-4 text-4xl font-black md:text-5xl">
						Planos que cabem no seu bolso
					</h2>
					<p className="mx-auto max-w-2xl text-gray-400">
						Orange Anual, Platinum Recorrente e avulso. Escolha o que combina
						com você.
					</p>
					<Link
						href="/planos"
						className="mt-6 inline-flex items-center justify-center rounded-full bg-primary-500 px-8 py-3 font-bold text-white transition-colors hover:bg-primary-500/90"
					>
						Ver todos os planos
					</Link>
				</div>
			</section>

			<ContactCtaSection />
		</div>
	);
}
