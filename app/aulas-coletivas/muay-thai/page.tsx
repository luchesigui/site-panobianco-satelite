import { Brain, Flame, Shield, Target, Zap } from "lucide-react";
import type { Metadata } from "next";

import ModalidadePage from "@/components/ModalidadePage";

const HERO_IMAGE = "/images/aulas-coletivas/muay-thai/muay-thai.jpg";

const ABOUT_IMAGE = "/images/aulas-coletivas/muay-thai/muay-thai-small.jpg";

export const metadata: Metadata = {
	title: "Muay Thai | Aulas Coletivas | Academia Panobianco Jardim Satélite",
	description:
		"Domine técnicas milenares, queime até 1.000 calorias por aula e fortaleça corpo e mente na unidade mais premium da Panobianco.",
};

export default function MuayThaiPage() {
	return (
		<ModalidadePage>
			<ModalidadePage.Hero
				badge="Artes Marciais"
				title="Muay"
				titleHighlight="Thai"
				description="Domine técnicas milenares, queime até 1.000 calorias por aula e fortaleça corpo e mente na unidade mais premium da Panobianco."
				accentGradient="from-primary-500 to-orange-700"
				icon={Target}
				heroImageSrc={HERO_IMAGE}
				stats={[
					{ value: "60 min", label: "Duração" },
					{ value: "600-800", label: "Kcal p/ Aula" },
				]}
			/>
			<ModalidadePage.About
				title="O Que é Muay Thai?"
				imageSrc={ABOUT_IMAGE}
				paragraphs={[
					'O Muay Thai é uma arte marcial tailandesa milenar, reconhecida mundialmente pela sua eficácia e disciplina. Chamada de "A Arte das Oito Armas", ela utiliza combinadamente os punhos, cotovelos, joelhos e canelas, criando um sistema de combate completo e dinâmico.',
					"Na Panobianco Satélite, nossas aulas são projetadas para transformar não apenas o seu físico, mas sua postura mental. Focamos na técnica refinada, no condicionamento físico de elite e na construção de um espírito inabalável.",
				]}
				accentClass="bg-primary-500"
				statCard={{ value: "60 min", label: "Duração" }}
			/>
			<ModalidadePage.Benefits
				title="Benefícios do Muay Thai"
				subtitle="Mais que um esporte, um estilo de vida que proporciona benefícios reais para o seu dia a dia."
				benefits={[
					{
						title: "Queima Calórica",
						description:
							"Elimine gordura corporal com treinos de alta intensidade que aceleram o metabolismo por horas.",
						icon: Flame,
					},
					{
						title: "Defesa Pessoal",
						description:
							"Aprenda técnicas reais de autodefesa enquanto desenvolve agilidade e reflexos rápidos.",
						icon: Shield,
					},
					{
						title: "Alívio de Estresse",
						description:
							"Libere a tensão do dia a dia focando no presente através do impacto e da concentração.",
						icon: Brain,
					},
					{
						title: "Resistência",
						description:
							"Fortaleça a musculatura de todo o corpo e melhore drasticamente sua capacidade cardiovascular.",
						icon: Zap,
					},
				]}
				accentClass="bg-primary-500"
			/>
			<ModalidadePage.Classes
				name="Muay Thai"
				description="O Muay Thai na Panobianco Jardim Satélite é ministrado por instrutores experientes, em um ambiente seguro e motivador."
				accentClass="bg-primary-500"
			/>
			<ModalidadePage.ContactCta />
		</ModalidadePage>
	);
}
