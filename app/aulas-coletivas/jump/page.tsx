import { Activity, Flame, Shield, Target, Zap } from "lucide-react";
import type { Metadata } from "next";

import ModalidadePage from "@/components/ModalidadePage";

const HERO_IMAGE = "/images/aulas-coletivas/jump/jump.jpg";

const ABOUT_IMAGE = "/images/aulas-coletivas/jump/jump-small-1.jpg";

export const metadata: Metadata = {
	title: "Jump | Aulas Coletivas | Academia Panobianco Jardim Satélite",
	description:
		"Aumente sua energia e queime até 600 calorias em uma aula super dinâmica sobre o mini-trampolim.",
};

export default function JumpPage() {
	return (
		<ModalidadePage>
			<ModalidadePage.Hero
				badge="Alta Intensidade"
				title="JUMP"
				description="Aumente sua energia e queime até 600 calorias em uma aula super dinâmica sobre o mini-trampolim. O treino perfeito para quem busca diversão, ritmo e resultados rápidos."
				accentGradient="from-primary-500 to-orange-700"
				icon={Activity}
				heroImageSrc={HERO_IMAGE}
				stats={[
					{ value: "45 min", label: "Duração" },
					{ value: "400-600", label: "Kcal p/ Aula" },
				]}
			/>
			<ModalidadePage.About
				title="Uma explosão de"
				titleHighlight="ritmo e movimento"
				paragraphs={[
					"O Jump é uma aula de ginástica aeróbica realizada sobre um mini-trampolim. Através de coreografias motivantes e simples, você trabalha o corpo todo.",
					"A aula é estruturada para elevar sua frequência cardíaca de forma segura, alternando picos de esforço com momentos de recuperação ativa, garantindo uma queima calórica massiva enquanto você se diverte ao som dos melhores hits.",
				]}
				accentClass="bg-primary-500"
				imageSrc={ABOUT_IMAGE}
				statCard={{ value: "45 min", label: "Duração" }}
			/>
			<ModalidadePage.Benefits
				title="Benefícios do Jump"
				benefits={[
					{
						title: "Queima Intensa",
						description:
							"Acelera drasticamente o metabolismo, auxiliando no emagrecimento rápido.",
						icon: Flame,
					},
					{
						title: "Baixo Impacto",
						description:
							"A lona do trampolim absorve até 80% do impacto, protegendo suas articulações.",
						icon: Shield,
					},
					{
						title: "Tonificação",
						description:
							"Foco intenso em membros inferiores (pernas e glúteos) e fortalecimento do core.",
						icon: Target,
					},
					{
						title: "Drenagem Linfática",
						description:
							"O movimento de saltar estimula o sistema linfático, reduzindo a celulite e inchaço.",
						icon: Zap,
					},
				]}
				accentClass="bg-primary-500"
			/>
			<ModalidadePage.About
				title="Segurança e"
				titleHighlight="Adaptação"
				paragraphs={[
					"Nossos professores adaptam a intensidade dos movimentos para que você possa evoluir no seu ritmo.",
					"Utilizamos mini-trampolins profissionais com lonas de alta resistência para total segurança durante os saltos.",
				]}
				checklist={[
					"Iniciantes são bem-vindos",
					"Equipamento Premium",
					"Postura Correta",
				]}
				accentClass="bg-primary-500"
				imageSrc="/images/aulas-coletivas/jump/jump-small-2.jpg"
				imagePosition="left"
			/>
			<ModalidadePage.Classes
				name="Jump"
				description="As aulas de Jump na Panobianco Jardim Satélite são realizadas com mini-trampolins de qualidade e instrutores que garantem sua segurança e evolução."
				accentClass="bg-primary-500"
			/>
			<ModalidadePage.ContactCta />
		</ModalidadePage>
	);
}
