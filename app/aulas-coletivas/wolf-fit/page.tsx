import { Activity, Flame, Heart, Users, Zap } from "lucide-react";
import type { Metadata } from "next";

import ModalidadePage from "@/components/ModalidadePage";

const HERO_IMAGE = "/images/aulas-coletivas/wolffit/wolffit.jpg";

const ABOUT_IMAGE = "/images/aulas-coletivas/wolffit/wolffit-small.jpg";

const CARIOCA_IMAGES = [
	"/images/aulas-coletivas/wolffit/carioca-1.png",
	"/images/aulas-coletivas/wolffit/carioca-2.png",
];

export const metadata: Metadata = {
	title: "Wolf Fit | Aulas Coletivas | Academia Panobianco Jardim Satélite",
	description:
		"Treino funcional de alta intensidade que combina força, cardio e agilidade. Experimente a energia do Wolf Fit.",
};

export default function WolfFitPage() {
	return (
		<ModalidadePage>
			<ModalidadePage.Hero
				badge="Alta Performance"
				title="WOLF"
				titleHighlight="FIT"
				description="O treino funcional de alta intensidade que combina força, cardio e agilidade para transformar seu corpo e mente. Experimente a energia do Wolf Fit."
				accentGradient="from-primary-500 to-orange-700"
				icon={Activity}
				heroImageSrc={HERO_IMAGE}
				stats={[
					{ value: "30 min", label: "Duração" },
					{ value: "300-500", label: "Kcal p/ Aula" },
				]}
			/>
			<ModalidadePage.About
				title="O Que é"
				titleHighlight="Wolf Fit?"
				paragraphs={[
					"O Wolf Fit é uma modalidade exclusiva de treinamento funcional de alta intensidade (HIIT). Combinando exercícios dinâmicos, movimentos naturais do corpo e equipamentos específicos, as aulas são projetadas para queimar calorias, aumentar a resistência e fortalecer toda a musculatura em um ambiente motivador e coletivo.",
					"Cada sessão é um novo desafio, focado em resultados reais e na superação dos seus limites. Se você busca intensidade, comunidade e uma transformação visível, o Wolf Fit é o seu lugar.",
				]}
				accentClass="bg-primary-500"
				imageSrc={ABOUT_IMAGE}
				statCard={{ value: "30 min", label: "Duração" }}
			/>
			<ModalidadePage.Benefits
				title="Benefícios do Wolf Fit"
				subtitle="Desenvolva todas as suas capacidades físicas em uma única modalidade."
				benefits={[
					{
						title: "Queima Calórica",
						description:
							"Alta demanda metabólica que mantém seu corpo queimando gordura mesmo após o treino.",
						icon: Flame,
					},
					{
						title: "Força Funcional",
						description:
							"Fortalecimento muscular global focado na qualidade de movimento e estabilidade.",
						icon: Zap,
					},
					{
						title: "Condicionamento",
						description:
							"Melhora significativa da capacidade cardiovascular e resistência muscular.",
						icon: Heart,
					},
					{
						title: "Comunidade",
						description:
							"Treinos em grupo que geram motivação mútua e uma energia contagiante.",
						icon: Users,
					},
				]}
				accentClass="bg-primary-500"
			/>
			<ModalidadePage.About
				title="Elementos da"
				titleHighlight="Cultura Carioca"
				paragraphs={[
					"Inspirado na energia vibrante e no estilo de vida dinâmico do Rio de Janeiro, o Wolf Fit traz o espírito das praias e das montanhas para dentro da academia.",
					"Não é apenas sobre repetições; é sobre movimento, fluidez e a intensidade que o carioca coloca em tudo o que faz. A cada treino, você sente a vibração de uma aula que pulsa com ritmo e paixão.",
				]}
				checklist={[
					"Energia ao ar livre transportada para o indoor",
					"Foco em movimentos naturais e multiarticulares",
					"Ritmo intenso e motivador",
				]}
				accentClass="bg-primary-500"
				imageSrc={CARIOCA_IMAGES}
				imagePosition="left"
			/>
			<ModalidadePage.Classes
				name="Wolf Fit"
				description="O Wolf Fit na Panobianco Satélite traz a ginga e a energia carioca para São José dos Campos."
				accentClass="bg-primary-500"
			/>
			<ModalidadePage.ContactCta />
		</ModalidadePage>
	);
}
