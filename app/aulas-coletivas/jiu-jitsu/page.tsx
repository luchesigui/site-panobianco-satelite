import { Brain, Shield, Target, Users, Zap } from "lucide-react";
import type { Metadata } from "next";

import ModalidadePage from "@/components/ModalidadePage";

const HERO_IMAGE = "/images/aulas-coletivas/jiu-jitsu/jiu-jitsu.jpg";

const ABOUT_IMAGE = "/images/aulas-coletivas/jiu-jitsu/jiu-jitsu-small.jpg";

export const metadata: Metadata = {
	title: "Jiu Jitsu | Aulas Coletivas | Academia Panobianco Jardim Satélite",
	description:
		"Desenvolva disciplina, autodefesa e condicionamento físico de elite. A Arte Suave para transformar seu corpo e sua mente.",
};

export default function JiuJitsuPage() {
	return (
		<ModalidadePage>
			<ModalidadePage.Hero
				badge="Modalidade Premium"
				title="JIU"
				titleHighlight="JITSU"
				description='Desenvolva disciplina, autodefesa e condicionamento físico de elite na Panobianco Satélite. A "Arte Suave" para transformar seu corpo e sua mente através da técnica.'
				accentGradient="from-primary-500 to-orange-700"
				icon={Target}
				heroImageSrc={HERO_IMAGE}
				stats={[
					{ value: "60 min", label: "Duração" },
					{ value: "500-1000", label: "Kcal p/ Aula" },
				]}
			/>
			<ModalidadePage.About
				title="O que é"
				titleHighlight="Jiu Jitsu?"
				paragraphs={[
					'O Jiu Jitsu, conhecido como a "Arte Suave", é um sistema de combate focado no domínio do adversário através de alavancas, torções e pressões, levando a luta para o solo.',
					"Na Panobianco Satélite, ensinamos que a técnica supera a força bruta. É uma modalidade que permite que um praticante menor e mais fraco se defenda e vença um oponente maior, utilizando os princípios da física e do equilíbrio.",
					"Também oferecemos uma aula de Jiu Jitsu exclusiva para crianças, onde os pequenos aprendem disciplina, respeito e autodefesa em um ambiente seguro e divertido.",
				]}
				featureCard={{
					title: "Diferenciais",
					items: ["Autodefesa Real", "Foco Mental"],
				}}
				accentClass="bg-primary-500"
				imageSrc={ABOUT_IMAGE}
				statCard={{ value: "60 min", label: "Duração" }}
			/>
			<ModalidadePage.Benefits
				title="Benefícios do Jiu Jitsu"
				subtitle="Muito além do tatame, o Jiu Jitsu transforma seu estilo de vida e sua saúde."
				benefits={[
					{
						title: "Condicionamento",
						description:
							"Melhore sua resistência cardiovascular e ganhe definition muscular de forma dinâmica.",
						icon: Zap,
					},
					{
						title: "Redução de Stress",
						description:
							"Descarregue as tensões do dia a dia e encontre equilíbrio através do foco absoluto no treino.",
						icon: Brain,
					},
					{
						title: "Autoconfiança",
						description:
							"Sinta-se mais seguro e confiante ao aprender técnicas reais de defesa pessoal.",
						icon: Shield,
					},
					{
						title: "Comunidade",
						description:
							"Faça parte de uma irmandade. O Jiu Jitsu promove amizades para a vida inteira.",
						icon: Users,
					},
				]}
				accentClass="bg-primary-500"
			/>
			<ModalidadePage.Classes
				name="Jiu Jitsu"
				description="O Jiu Jitsu na Panobianco Jardim Satélite é ministrado por professores graduados, em um ambiente de respeito e evolução contínua."
				accentClass="bg-primary-500"
			/>
			<ModalidadePage.ContactCta />
		</ModalidadePage>
	);
}
