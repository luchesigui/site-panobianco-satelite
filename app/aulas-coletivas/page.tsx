import type { Metadata } from "next";

import ContactCtaSection from "@/components/ContactCtaSection";
import {
	type ClassItem,
	ModalidadesFilterGrid,
} from "@/components/ModalidadesFilterGrid";
import QuizCtaBanner from "@/components/QuizCtaBanner";
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

const faqSchema = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: [
		{
			"@type": "Question",
			name: "Quais aulas coletivas estão disponíveis na Panobianco Satélite?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "A unidade oferece modalidades como Flashback, Pilates, Wolf Fit, GAP, FitDance, Jump, Muay Thai, Jiu Jitsu e Ritmos.",
			},
		},
		{
			"@type": "Question",
			name: "Preciso de experiência prévia para participar?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Não. As aulas são adaptadas para iniciantes e avançados, com orientação constante dos instrutores.",
			},
		},
		{
			"@type": "Question",
			name: "As aulas coletivas ajudam no emagrecimento?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Sim. Modalidades como Jump, FitDance e Wolf Fit elevam o gasto calórico e contribuem para perda de gordura quando combinadas com rotina consistente.",
			},
		},
		{
			"@type": "Question",
			name: "Como escolher a melhor modalidade para meu objetivo?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Você pode começar pela aula que mais combina com seu perfil e contar com a equipe para orientar a melhor combinação conforme seu objetivo.",
			},
		},
	],
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
		categories: ["danca"] as const,
		description:
			"Viaje no tempo e dance ao som dos maiores sucessos de décadas passadas! Uma explosão de energia e nostalgia.",
		benefits: ["Queima calorias", "Melhora coordenação", "Diversão garantida"],
	},
	{
		name: "Pilates",
		slug: "pilates",
		categories: ["mente-corpo"] as const,
		description:
			"Fortaleça seu core, melhore sua postura e aumente sua flexibilidade com esta modalidade de baixo impacto.",
		benefits: ["Fortalece o core", "Melhora postura", "Aumenta flexibilidade"],
	},
	{
		name: "WolfFit",
		slug: "wolf-fit",
		categories: ["cardio", "forca"] as const,
		description:
			"Experimente a intensidade da ginástica carioca! Exercícios funcionais de alta intensidade com muita ginga.",
		benefits: ["Alta intensidade", "Força e resistência", "Coordenação motora"],
	},
	{
		name: "GAP",
		slug: "gap",
		categories: ["forca"] as const,
		description:
			"Conquiste glúteos firmes, abdômen definido e pernas torneadas com exercícios localizados.",
		benefits: ["Tonifica músculos", "Fortalece core", "Resultados visíveis"],
	},
	{
		name: "FitDance",
		slug: "fitdance",
		categories: ["danca", "cardio"] as const,
		description:
			"Dance, divirta-se e queime muitas calorias com coreografias de diversos ritmos musicais.",
		benefits: ["Queima calorias", "Melhora humor", "Coordenação motora"],
	},
	{
		name: "Jump",
		slug: "jump",
		categories: ["cardio"] as const,
		description:
			"Salte para a diversão em mini-trampolins! Alto gasto calórico com baixo impacto nas articulações.",
		benefits: ["Alto gasto calórico", "Baixo impacto", "Melhora equilíbrio"],
	},
	{
		name: "Muay Thai",
		slug: "muay-thai",
		categories: ["forca", "cardio"] as const,
		description:
			"Desenvolva força, agilidade, disciplina e autoconfiança com a arte marcial tailandesa.",
		benefits: ["Autodefesa", "Disciplina", "Condicionamento físico"],
	},
	{
		name: "Jiu Jitsu",
		slug: "jiu-jitsu",
		categories: ["forca"] as const,
		description:
			"Domine a arte suave e desenvolva não apenas o corpo, mas também a mente.",
		benefits: ["Arte marcial eficaz", "Estratégia", "Autoconfiança"],
	},
	{
		name: "Ritmos",
		slug: "ritmos",
		categories: ["danca", "cardio"] as const,
		description:
			"Sinta a batida e deixe o corpo fluir! Uma aula vibrante que mistura diversos estilos musicais para queimar calorias sorrindo.",
		benefits: ["Alta energia", "Expressão corporal", "Alívio de estresse"],
	},
];

export default function AulasColetivas() {
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
			<main className="flex-1">
				{/* Hero */}
				{/* Sem foto de topo: o bloco hexagonal laranja carrega a chamada,
				    com folga para o header fixo de 80px. */}
				<section className="bg-pb-off-white pb-12 pt-20 lg:pb-14 lg:pt-28">
					<div className="container-main">
						<div className="shape-chanfrado bg-pb-orange px-10 py-14 text-white lg:px-14 lg:py-16">
							<h1 className="text-[3.5rem] leading-[0.96] tracking-tight">
								Nossas modalidades
							</h1>
							<p className="mt-6 max-w-3xl text-[1.5rem] leading-tight">
								Encontre a aula ideal para o seu objetivo. Do relaxamento ao
								máximo desempenho, temos a modalidade certa para transformar seu
								corpo.
							</p>
							<div className="mt-8">
								<ScheduleModal />
							</div>
						</div>
					</div>
				</section>

				<QuizCtaBanner
					source="aulas_coletivas_pre_filtro"
					headline="9 modalidades. Qual é a sua?"
					subhead="Em 1 minuto, te indicamos a aula que mais combina com seu objetivo e com o seu ritmo. A recomendação chega organizada no seu e-mail, para você decidir com calma."
					ctaLabel="Descobrir minha aula"
				/>

				<section className="bg-pb-off-white pb-20 pt-10 lg:pb-28 lg:pt-12">
					<ModalidadesFilterGrid
						classes={classes as ClassItem[]}
						categories={CATEGORIES}
					/>
				</section>

				<ContactCtaSection />
			</main>
		</div>
	);
}
