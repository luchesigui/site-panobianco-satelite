import {
	Activity,
	ArrowRight,
	Bath,
	Clock,
	Dumbbell,
	User,
	Users,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import ContactCtaSection from "@/components/ContactCtaSection";
import SchedulingLink from "@/components/SchedulingLink";

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

const heroBg =
	"https://lh3.googleusercontent.com/aida-public/AB6AXuD6j1Igrr46kOIL_Mp_ZrPPILbdU5gcwWL0sz2sTgs2zMpwWr5TkOL0Z2WBfc2rxe3UZxoQ95GfFiYgdyUPYQubEZEBVUNyXPH6asUt6uKrS4J6eqs2Z6296jiMNW3BLA1NVeltlMGOe37mkW4TgEKHnbsUOIkSH7pBJAtXUkQXv_RkyyF2WMY-h01_A0obQSGHP_1HQbu0cAKxAzz-qiInK2a0q0XJJGaA1u8CbEn2rn-tmKyu43yE96Ompp5OQOVyblW_QfKYnxg";

const services = [
	{
		title: "Equipamentos de Última Geração",
		description:
			"Máquinas importadas e ergonômicas para máxima eficiência e segurança no seu treino, otimizando cada repetição.",
		icon: Dumbbell,
	},
	{
		title: "Treino Personalizado",
		description:
			"Profissionais qualificados para montar sua ficha de acordo com seus objetivos específicos, do emagrecimento à hipertrofia.",
		icon: User,
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
		icon: Bath,
	},
	{
		title: "Horário Estendido",
		description:
			"Flexibilidade total para você treinar quando quiser, desde as primeiras horas da manhã até tarde da noite.",
		icon: Clock,
	},
];

export default function Servicos() {
	return (
		<div className="font-display min-h-screen bg-background-dark text-white overflow-x-hidden">
			{/* Hero */}
			<section className="relative w-full overflow-hidden py-20">
				<div className="absolute inset-0 z-0">
					<Image
						src={heroBg}
						alt="Ambiente moderno da academia Panobianco com equipamentos e iluminação"
						fill
						className="object-cover opacity-30 scale-105"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent" />
				</div>
				<div className="container-main relative z-10 mx-auto max-w-[960px] space-y-8 text-center">
					<div className="mb-4 inline-block rounded-full border border-primary-500/30 bg-primary-500/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary-500">
						Infraestrutura Premium
					</div>
					<h1 className="text-5xl font-black leading-tight tracking-tight text-white md:text-7xl">
						Nossos Serviços
					</h1>
					<p className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-slate-300 md:text-xl">
						Descubra por que a Panobianco é a escolha certa para quem busca
						resultados reais com a melhor infraestrutura da região.
					</p>
					<div className="flex flex-col items-center justify-center gap-4 pt-6 sm:flex-row">
						<SchedulingLink className="w-full rounded-full bg-primary-500 px-10 py-5 text-lg font-black text-white shadow-lg shadow-primary-500/20 transition-all hover:bg-primary-500/90 sm:w-auto">
							Agende uma visita
						</SchedulingLink>
						<Link
							href="/contato"
							className="w-full rounded-full border border-white/10 bg-white/5 px-10 py-5 text-lg font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 sm:w-auto"
						>
							Ver Unidades
						</Link>
					</div>
				</div>
			</section>

			{/* Services Grid */}
			<section className="container-main py-16">
				<div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
					<div className="space-y-2">
						<h2 className="text-3xl font-black text-white">
							O que oferecemos para você
						</h2>
						<div className="h-1.5 w-20 rounded-full bg-primary-500" />
					</div>
					<p className="hidden font-medium text-slate-400 md:block">
						Foco total no seu bem-estar e saúde.
					</p>
				</div>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{services.map((service) => {
						const Icon = service.icon;
						const cardContent = (
							<>
								<div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-white/5 transition-colors group-hover:bg-primary-500">
									<Icon className="size-10 text-primary-500 transition-colors group-hover:text-white" />
								</div>
								<h3 className="mb-3 text-xl font-bold text-white">
									{service.title}
								</h3>
								<p className="leading-relaxed text-slate-400">
									{service.description}
								</p>
								{service.href && (
									<span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary-500">
										Saiba mais
										<ArrowRight className="size-4" />
									</span>
								)}
							</>
						);
						return "href" in service && service.href ? (
							<Link
								key={service.title}
								href={service.href}
								className="glass-card group rounded-xl p-8 transition-all hover:border-primary-500 hover:-translate-y-1"
							>
								{cardContent}
							</Link>
						) : (
							<div
								key={service.title}
								className="glass-card group rounded-xl p-8 transition-all"
							>
								{cardContent}
							</div>
						);
					})}
				</div>
			</section>

			<ContactCtaSection />
		</div>
	);
}
