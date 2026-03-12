import { Activity, Flame, Music, Smile, Users } from "lucide-react";
import type { Metadata } from "next";

import ModalidadePage from "@/components/ModalidadePage";

const HERO_IMAGE = "/images/aulas-coletivas/ritmos/ritmos.jpg";

const ABOUT_IMAGE = "/images/aulas-coletivas/ritmos/ritmos-small.jpg";

export const metadata: Metadata = {
	title: "Ritmos | Aulas Coletivas | Academia Panobianco Jardim Satélite",
	description:
		"Aumente sua energia, queime calorias e divirta-se ao som dos melhores ritmos musicais em uma aula contagiante e cheia de vida.",
};

export default function RitmosPage() {
	return (
		<ModalidadePage>
			<ModalidadePage.Hero
				title="RITMOS"
				description="Aumente sua energia, queime calorias e divirta-se ao som dos melhores ritmos musicais em uma aula contagiante e cheia de vida."
				accentGradient="from-primary-500 to-orange-700"
				icon={Music}
				heroImageSrc={HERO_IMAGE}
				stats={[
					{ value: "45 min", label: "Duração" },
					{ value: "350-550", label: "Kcal p/ Aula" },
				]}
			/>
			<ModalidadePage.About
				title="Sobre a"
				titleHighlight="Modalidade"
				paragraphs={[
					"O Ritmos é uma aula de fitness baseada em dança, combinando diversos estilos musicais — do Reggaeton ao Pop — para criar um treino dinâmico e extremamente divertido.",
					"Focada no movimento constante, a modalidade melhora a saúde cardiovascular, eleva o humor e proporciona um alto gasto calórico, tudo isso enquanto você aprende novas coreografias de forma intuitiva, sem precisar ser um dançarino profissional.",
				]}
				accentClass="bg-primary-500"
				imageSrc={ABOUT_IMAGE}
				statCard={{ value: "45 min", label: "Duração" }}
			/>
			<ModalidadePage.Benefits
				title="Benefícios do Ritmos"
				benefits={[
					{
						title: "Queima Calórica",
						description:
							"Até 600 calorias por aula em um treino intenso e aeróbico.",
						icon: Flame,
					},
					{
						title: "Alívio de Estresse",
						description:
							"Liberação de endorfina e dopamina para melhorar seu dia.",
						icon: Smile,
					},
					{
						title: "Coordenação",
						description:
							"Melhora o ritmo, equilíbrio e a consciência do seu corpo.",
						icon: Activity,
					},
					{
						title: "Socialização",
						description: "Aulas em grupo dinâmicas para fazer novos amigos.",
						icon: Users,
					},
				]}
				accentClass="bg-primary-500"
			/>
			<ModalidadePage.Classes
				name="Ritmos"
				description="As aulas de Ritmos na Panobianco Jardim Satélite são conduzidas por instrutores que trazem animação e variedade musical."
				accentClass="bg-primary-500"
			/>
			<ModalidadePage.ContactCta />
		</ModalidadePage>
	);
}
