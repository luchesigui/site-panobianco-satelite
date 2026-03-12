import { Activity, Flame, Music, Smile, Users } from "lucide-react";
import type { Metadata } from "next";

import ModalidadePage from "@/components/ModalidadePage";

const HERO_IMAGE = "/images/aulas-coletivas/flashback/flashback.webp";

export const metadata: Metadata = {
	title: "Flashback | Aulas Coletivas | Academia Panobianco Jardim Satélite",
	description:
		"Reviva os melhores ritmos das décadas passadas. Queime calorias, melhore a coordenação e divirta-se na aula de Flashback.",
};

export default function FlashbackPage() {
	return (
		<ModalidadePage>
			<ModalidadePage.Hero
				title="FLASHBACK"
				badge="Aula Coletiva"
				description="Reviva os melhores ritmos das décadas passadas enquanto transforma seu corpo com energia, nostalgia e muita diversão."
				accentGradient="from-primary-500 to-orange-700"
				icon={Music}
				heroImageSrc={HERO_IMAGE}
				stats={[
					{ value: "45 min", label: "Duração" },
					{ value: "250-400", label: "Kcal p/ Aula" },
				]}
			/>
			<ModalidadePage.About
				title="O Que é o Flashback?"
				imageSrc="/images/aulas-coletivas/flashback/flashback-small.jpg"
				paragraphs={[
					"O Flashback é uma modalidade de aula coletiva que combina movimentos aeróbicos coreografados ao som dos maiores sucessos das décadas de 70, 80 e 90.",
					"É a fusão perfeita entre dança, nostalgia e exercício físico de alta intensidade emocional, projetada para queimar calorias enquanto você se diverte com clássicos inesquecíveis de artistas que marcaram gerações. Prepare-se para suar a camisa com um sorriso no rosto.",
				]}
				accentClass="bg-primary-500"
				statCard={{ value: "45 Minutos", label: "Duração" }}
			/>
			<ModalidadePage.Benefits
				title="Benefícios do Flashback"
				subtitle="Transforme seu condicionamento físico através da alegria e do movimento rítmico."
				benefits={[
					{
						title: "Queima Calórica",
						description:
							"Alta queima de calorias em uma única sessão através de movimentos aeróbicos constantes.",
						icon: Flame,
					},
					{
						title: "Bem-estar Mental",
						description:
							"Liberação de endorfina e redução do estresse ao som de músicas que trazem boas memórias.",
						icon: Smile,
					},
					{
						title: "Coordenação",
						description:
							"Melhora significativa da coordenação motora e agilidade através de coreografias rítmicas.",
						icon: Activity,
					},
					{
						title: "Socialização",
						description:
							"Um ambiente acolhedor e divertido para fazer novas amizades e compartilhar energia positiva.",
						icon: Users,
					},
				]}
				accentClass="bg-primary-500"
			/>
			<ModalidadePage.Classes
				name="Flashback"
				description="Na Panobianco Jardim Satélite, nossas aulas de Flashback são conduzidas por instrutores certificados que trazem toda a energia e o carisma para você se soltar e aproveitar cada minuto."
				accentClass="bg-primary-500"
			/>
			<ModalidadePage.ContactCta />
		</ModalidadePage>
	);
}
