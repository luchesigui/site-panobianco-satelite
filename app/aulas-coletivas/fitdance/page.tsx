import type { Metadata } from "next";
import {
	Activity,
	Flame,
	Music,
	Smile,
	Users,
} from "lucide-react";
import ModalidadePage from "@/components/ModalidadePage";

const HERO_IMAGE =
	"https://lh3.googleusercontent.com/aida-public/AB6AXuDvY7d9og05JHMluqLNNVGstUOc-lde3RQBYc7ei5XnNAwX5gyGo3ZEznqss3RMph1Q8kqJrkDbKOlIuWE-Lhybi0q5vl04PwIUduWSc36IXLba8Z7nYDleT8-n1-cCPJmsmC08MfOIVeDHOukP2S-QBPKCny_t0v9O04AiucXISr5fWaND1byggiP2AZCh9FZQIuVJk_GFqNnWTfnHAUBtDgtUvqXrBZK79AUitRNKFaBQy7IEL7Dob0XKHiXP-xFiW4C4eg-LXfI";

const ABOUT_IMAGES = [
	"https://lh3.googleusercontent.com/aida-public/AB6AXuBs9kSpMi5MjVw6cMZNEiGSMcCDClbWE0kGkTOIORwKZEmAzpYNERHefZtqRnZQdart5ftunyqpCcEwb1uP63ziOBhnpxlH5oSaM3i55ACXvzKByR3VS3XDw5-lc8FInfe2nJjH9tk7fGrqZ_eGTbsChSC9ixNU6LBG1pQmvSai207GS9pATIq8WTNNpyu5mXJ22Wvto0hQrMLLv0pgN6uHOYex0cLEXYEgHvra5aB92BTZx3rTaBxobK5CcL-kXIgB7K1OaX9fw1I",
	"https://lh3.googleusercontent.com/aida-public/AB6AXuBXD8cjAQRNDF8hlm87PDHXZfW0encr23Hi4p0Vr05lO03du_grs-1mHbWEUFlKBZ9ZtG-k9FveIbhkx-FMtUEps2l-inFDN61pH60pzFmnOLQ54RBRkpIPKEV0eK6Cl3kGk9VBRrfR6o9OpSjfdHNUx7pF3hRAITXvNGJhFm1nCxpc2D0rG2jWpXH5Z_xGdvw5T6UQ2ZCrer1Ba7p9hsi3f621xqKJvOdRU4mEOJ9vlcOGKFlkctRC5UD4CczJSDcv1C3r2M1apWg",
];

export const metadata: Metadata = {
	title:
		"FitDance | Aulas Coletivas | Academia Panobianco Jardim Satélite",
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
