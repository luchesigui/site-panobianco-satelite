import { Activity, Flame, Heart, Users, Zap } from "lucide-react";
import type { Metadata } from "next";

import ModalidadePage from "@/components/ModalidadePage";

const HERO_IMAGE =
	"https://lh3.googleusercontent.com/aida-public/AB6AXuA7XYOIjta5JwuA8ybd29dBtmsMH9L_tbYqXjWYjiBqYHraFXV8f6j5BZfbGNa7AnLJK-c4v47c7Zao_6DjzbivGDCnQMjUwaTyBhvf1caw4yy39rQiN14_DLXy5XGaYn4hQ-2XCeXhSsmuYyjlMQWybd3TVXedYMQvFABExRkV0IFK9BL4zEkZcF4uPR5KCXNunEHrELQDx-nfxrClmEfZtdi4RaQmowQjTPLcZTcyvYE2Zpew7UhDyIkIU3wDA9FBuW3sGFMiboo";

const ABOUT_IMAGE =
	"https://lh3.googleusercontent.com/aida-public/AB6AXuCnu7QL3vwxJrQNPP4E_d6bEyO1j_frlQKaSpSXQ5ExbS5OwC2ZFJ5U7SwvO9Z2fIBEKloMigXT1aXTmLAMjdDI9pc2iIrNxNr9FK3GqJ53bk8nyIAa1zBmyJfmDq7HkhjV7boVGiF3PblF-2JGmdF2IPVyefsvp2a5-62P1cBFBq0dmHYHCmYf3IXi8KE-3Fl3LJtle2vXFjheyDXEl4EiU8cX-7QFkcasRExYS9iGG-5rYxKj9aiO3eA6Qi6kIQlooDGd4qWvYZo";

const CARIOCA_IMAGES = [
	"https://lh3.googleusercontent.com/aida-public/AB6AXuBQ_6jK0HMeZHlJn9_1Ai-hqh5WUXRFZlkrskEGopbzv7-PZ1YyoswoUWDaQLzPVOXsnzR9rZLrhDiVVwpxmdWvlF1bHufZ41ImIb0mMueMiKs-x_sXTDnl1EoLJ6XUMEPuTVw7V6BugkKcGAJwfShh-bBtQFzpYAFPVcbH8ttVcM31PKiJmCRO1wR74UJNsXrwbu3uHC0KHIZ8VT_IwOC73WutzdoGEY9p3GIv3sJqe5vyIsMjtkjDBwBwMekXdUWiSSjNd6Q_oGo",
	"https://lh3.googleusercontent.com/aida-public/AB6AXuATwzRBqDbeO8LZccFGnykG9c2cfTOIcaRvY6t32fCNiWWqdmNb9C4upX9n1hO7RCOBBXa0QI1R6llRqTjvMadWE2GXnuYWNzQYTFzwK-tohsGnjOWfkM7fiDsXplaq7x7mGy2H-chSyOIBmBd6EEdtGumbVcI4eOfBuDmWVhETYbRhVCRjZYm2JYmM5HxmeOyrTNujsLsGxzNVSqIImPN4ygBLcZhHtREmeinmiLy1U6uKu2_9298SzuHT-4UETYfawCYgjoNMJ4Y",
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
