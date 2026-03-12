import { Activity, Flame, Music, Smile, Users } from "lucide-react";
import type { Metadata } from "next";

import ModalidadePage from "@/components/ModalidadePage";

const HERO_IMAGE = "/images/aulas-coletivas/fitdance/fitdance.png";

const ABOUT_IMAGES = [
	"/images/aulas-coletivas/fitdance/fitdance-small-1.jpg",
	"/images/aulas-coletivas/fitdance/fitdance-small-2.jpg",
];

export const metadata: Metadata = {
	title: "FitDance | Aulas Coletivas | Academia Panobianco Jardim Satélite",
	description:
		"Mova-se, divirta-se e transforme o seu treino em uma verdadeira festa. Coreografias contagiantes com alto gasto calórico.",
};

export default function FitDancePage() {
	return (
		<ModalidadePage>
			<ModalidadePage.Hero
				badge="Aulas Coletivas"
				title="FIT"
				titleHighlight="DANCE"
				description="Mova-se, divirta-se e transforme o seu treino em uma verdadeira festa. A modalidade que une coreografias contagiantes com alto gasto calórico."
				accentGradient="from-primary-500 to-orange-700"
				icon={Music}
				heroImageSrc={HERO_IMAGE}
				stats={[
					{ value: "45 min", label: "Duração" },
					{ value: "350-500", label: "Kcal p/ Aula" },
				]}
			/>
			<ModalidadePage.About
				title="O que é o"
				titleHighlight="FitDance?"
				paragraphs={[
					"O FitDance é mais que uma aula de dança, é um estilo de vida. Através de uma metodologia inclusiva, transformamos o exercício em um momento de pura alegria e descontração.",
					"Utilizando as músicas mais tocadas do momento, nossas coreografias são desenvolvidas para que todos possam acompanhar, independente do nível de experiência. É a escolha perfeita para quem quer queimar calorias de forma lúdica e dinâmica.",
				]}
				featureCard={{
					title: "Diferenciais",
					items: [
						"Coreografias fáceis e divertidas",
						"Ambiente acolhedor e energético",
						"Instrutores certificados pela marca",
					],
				}}
				accentClass="bg-primary-500"
				imageSrc={ABOUT_IMAGES}
				statCard={{ value: "45 min", label: "Duração" }}
			/>
			<ModalidadePage.Benefits
				title="Benefícios do FitDance"
				subtitle="Descubra como dançar pode transformar não apenas o seu corpo, mas também a sua mente e seu humor."
				benefits={[
					{
						title: "Gasto Calórico",
						description:
							"Queime até 600 calorias por aula de forma intensa e divertida.",
						icon: Flame,
					},
					{
						title: "Bem-EStar Mental",
						description:
							"Libere endorfina, reduza o estresse e melhore sua autoestima instantaneamente.",
						icon: Smile,
					},
					{
						title: "Coordenação",
						description:
							"Melhore seu ritmo, consciência corporal e coordenação motora a cada aula.",
						icon: Activity,
					},
					{
						title: "Socialização",
						description:
							"Faça novos amigos e conecte-se com pessoas em uma comunidade vibrante.",
						icon: Users,
					},
				]}
				accentClass="bg-primary-500"
			/>
			<ModalidadePage.Classes
				name="FitDance"
				description="Na Panobianco Jardim Satélite, nossas aulas de FitDance são conduzidas por instrutores certificados que trazem toda a energia para você se soltar."
				accentClass="bg-primary-500"
			/>
			<ModalidadePage.ContactCta />
		</ModalidadePage>
	);
}
