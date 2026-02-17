import { Activity, Flame, Music, Smile, Users } from "lucide-react";
import type { Metadata } from "next";

import ModalidadePage from "@/components/ModalidadePage";

const HERO_IMAGE =
	"https://lh3.googleusercontent.com/aida-public/AB6AXuDbb78hyYoMVzOh64FWUTAiuXcyc6K_9Npwfvx45-G8G-rgdMcS4Ffv3njUpSDPHsXlg0K6SGtLxX0u9dxwZKvzfqoriTpuwYKFwYclD2DScwXVEHnE2ds7J1tGJ6vdBkU76FJv2wuL4sR0kOeoKTq-SlcNDelbGBu-9pDb0NI9wPXwbjx1Djf9Ko-UE2c0glmHWLxzdPzY2wEM-7mdQoXplzgq6HxxQFAoJl_Uhl3t65Rj304CqkU9AqVojv2JqS7CW2tsmRVtydo";

const ABOUT_IMAGE =
	"https://lh3.googleusercontent.com/aida-public/AB6AXuBUgN-SDMgFnmmOBV2YOlkO6mBABpb6Ojhbd-wLtvL1KsmXQQnzkbwvPT6bxz26s0_0LiNGBl3EUjdFN14v1wA687tGyOMN33iqnWZiiB36QI7Gx5VtOFgeitwDBlcqYfje7S1OuhRzFTtzesKrzc2VzZ0_-sjrqUlgzmp6QpND12-lD2N7h_VWj3kGeP6tMxmtSULls3T9mwozahzl1_ri5tC1MEdkl7ENu1vfo7d2Bprf-06xlUZ6OUc-qbsT9NPXVAG5a_aXO7E";

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
