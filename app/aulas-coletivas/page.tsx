import type { Metadata } from "next";

import ContactCtaSection from "@/components/ContactCtaSection";
import {
	type ClassItem,
	ModalidadesFilterGrid,
} from "@/components/ModalidadesFilterGrid";
import ScheduleModal from "@/components/ScheduleModal";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
	title: "Aulas Coletivas | Panobianco Jardim Satélite",
	description:
		"Conheça as modalidades da unidade Jardim Satélite: Flashback, Pilates, WolfFit, GAP, FitDance, Jump, Muay Thai, Jiu Jitsu e Ritmos.",
	alternates: { canonical: "/aulas-coletivas" },
};

const webPageSchema = {
	"@context": "https://schema.org",
	"@type": "WebPage",
	name: "Aulas Coletivas | Panobianco Jardim Satélite",
	description:
		"Conheça as modalidades da unidade Jardim Satélite: Flashback, Pilates, WolfFit, GAP, FitDance, Jump, Muay Thai, Jiu Jitsu e Ritmos.",
	url: `${SITE_URL}/aulas-coletivas`,
};

const CATEGORIES = [
	{ id: "todos", label: "Todos" },
	{ id: "forca", label: "Força" },
	{ id: "cardio", label: "Cardio" },
	{ id: "mente-corpo", label: "Mente & Corpo" },
	{ id: "danca", label: "Dança" },
] as const;
const classes = [
	{
		name: "Flashback",
		slug: "flashback",
		icon: "music",
		categories: ["danca"] as const,
		description:
			"Viaje no tempo e dance ao som dos maiores sucessos de décadas passadas! Uma explosão de energia e nostalgia.",
		benefits: ["Queima calorias", "Melhora coordenação", "Diversão garantida"],
		color: "bg-purple-600/20 text-purple-500",
	},
	{
		name: "Pilates",
		slug: "pilates",
		icon: "flower2",
		categories: ["mente-corpo"] as const,
		description:
			"Fortaleça seu core, melhore sua postura e aumente sua flexibilidade com esta modalidade de baixo impacto.",
		benefits: ["Fortalece o core", "Melhora postura", "Aumenta flexibilidade"],
		color: "bg-blue-600/20 text-blue-500",
	},
	{
		name: "WolfFit",
		slug: "wolf-fit",
		icon: "zap",
		categories: ["cardio", "forca"] as const,
		description:
			"Experimente a intensidade da ginástica carioca! Exercícios funcionais de alta intensidade com muita ginga.",
		benefits: ["Alta intensidade", "Força e resistência", "Coordenação motora"],
		color: "bg-orange-600/20 text-orange-500",
	},
	{
		name: "GAP",
		slug: "gap",
		icon: "target",
		categories: ["forca"] as const,
		description:
			"Conquiste glúteos firmes, abdômen definido e pernas torneadas com exercícios localizados.",
		benefits: ["Tonifica músculos", "Fortalece core", "Resultados visíveis"],
		color: "bg-pink-600/20 text-pink-500",
	},
	{
		name: "FitDance",
		slug: "fitdance",
		icon: "music",
		categories: ["danca", "cardio"] as const,
		description:
			"Dance, divirta-se e queime muitas calorias com coreografias de diversos ritmos musicais.",
		benefits: ["Queima calorias", "Melhora humor", "Coordenação motora"],
		color: "bg-red-600/20 text-red-500",
	},
	{
		name: "Jump",
		slug: "jump",
		icon: "activity",
		categories: ["cardio"] as const,
		description:
			"Salte para a diversão em mini-trampolins! Alto gasto calórico com baixo impacto nas articulações.",
		benefits: ["Alto gasto calórico", "Baixo impacto", "Melhora equilíbrio"],
		color: "bg-green-600/20 text-green-500",
	},
	{
		name: "Muay Thai",
		slug: "muay-thai",
		icon: "shield",
		categories: ["forca", "cardio"] as const,
		description:
			"Desenvolva força, agilidade, disciplina e autoconfiança com a arte marcial tailandesa.",
		benefits: ["Autodefesa", "Disciplina", "Condicionamento físico"],
		color: "bg-yellow-600/20 text-yellow-500",
	},
	{
		name: "Jiu Jitsu",
		slug: "jiu-jitsu",
		icon: "shield",
		categories: ["forca"] as const,
		description:
			"Domine a arte suave e desenvolva não apenas o corpo, mas também a mente.",
		benefits: ["Arte marcial eficaz", "Estratégia", "Autoconfiança"],
		color: "bg-indigo-600/20 text-indigo-500",
	},
	{
		name: "Ritmos",
		slug: "ritmos",
		icon: "music",
		categories: ["danca", "cardio"] as const,
		description:
			"Sinta a batida e deixe o corpo fluir! Uma aula vibrante que mistura diversos estilos musicais para queimar calorias sorrindo.",
		benefits: ["Alta energia", "Expressão corporal", "Alívio de estresse"],
		color: "bg-orange-600/20 text-primary-500",
	},
];

export default function AulasColetivas() {
	return (
		<div className="font-display min-h-screen bg-background-dark text-white overflow-x-hidden">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(webPageSchema),
				}}
			/>
			<main className="flex-1 px-4 py-10 lg:px-10">
				{/* Hero */}
				<div className="container-main mb-12 flex flex-wrap items-end justify-between gap-6">
					<div className="max-w-2xl space-y-4">
						<span className="mb-4 inline-block w-fit rounded-full border border-primary-500/20 bg-primary-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-primary-500">
							Performance e Saúde
						</span>
						<h1 className="text-5xl font-black leading-none tracking-tight md:text-6xl">
							NOSSAS MODALIDADES
						</h1>
						<p className="text-lg font-normal leading-relaxed text-white/60">
							Encontre a aula ideal para o seu objetivo. Do relaxamento ao
							máximo desempenho, temos a modalidade certa para transformar seu
							corpo.
						</p>
					</div>
					<ScheduleModal />
				</div>

				<ModalidadesFilterGrid
					classes={classes as ClassItem[]}
					categories={CATEGORIES}
				/>
				<ContactCtaSection />
			</main>
		</div>
	);
}
