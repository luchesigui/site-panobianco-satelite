import type { Metadata } from "next";
import {
	Accessibility,
	Brain,
	Dumbbell,
	Flower2,
	Leaf,
} from "lucide-react";
import ModalidadePage from "@/components/ModalidadePage";

const HERO_IMAGE =
	"https://lh3.googleusercontent.com/aida-public/AB6AXuDzATy2FVAPiFy2N8au0XzLheq4tA83avnl79tJvKPb2w7FDWJegC0dC9oqGp_t6wuZD2BegZ_edjAW0EdqyKNK8EafRZuDSUIDC6P8X1svJ_liwTjNHPDzuwP22VrSv2xnhi2Wi7VjZ-VSy-HDyKrXOF7gLk-WvLhQ5Gp9nCmbILxB0R8pabIHbeFV0Q_UDm_k8bYRV8kc9-o89GpPASj1aapEldyNRKViYnuhaYf6MeHL7SSXvK6uGLXIGAG8ZLUaxpJgVGoPzMo";

const ABOUT_IMAGE =
	"https://lh3.googleusercontent.com/aida-public/AB6AXuC1yOOgOIlMGpqfL0Z5INamj2NWTSgOsCl66Lh_RuJ4woVDnBKjMG3OxGSlit8fwm1vycNBYH_5VuGmxFBC04qhMUOgdXODOLF-KE4n6PqHEJ0aVwUrzaJFA_c0fcdExAaWO74S2Rh1Pn29U2iM3BnVyvrB418-cbAcXOS_ZAz8Ry7D9unh1esjSodk-motyzopUZwF33dbbFPHF0wP6SGiBCrxFnVSgOgTyKCPVikAv-r8Btx7izviilHXR5AEqygZxKKPkGBF3u4";

export const metadata: Metadata = {
	title:
		"Pilates | Aulas Coletivas | Academia Panobianco Jardim Satélite",
	description:
		"Equilíbrio entre corpo e mente. Fortalecimento, flexibilidade e consciência corporal com instrutores certificados.",
};

export default function PilatesPage() {
	return (
		<ModalidadePage>
			<ModalidadePage.Hero
				badge="Bem-estar Premium"
				title="PILATES"
				description="Equilíbrio entre corpo e mente no ambiente mais completo da região. Fortalecimento, flexibilidade e consciência corporal com tecnologia de ponta e instrutores certificados."
				accentGradient="from-primary-500 to-orange-700"
				icon={Flower2}
				heroImageSrc={HERO_IMAGE}
				stats={[
					{ value: "45 min", label: "Duração" },
					{ value: "150-300", label: "Kcal p/ Aula" },
				]}
			/>
			<ModalidadePage.About
				title="O que é o"
				titleHighlight="Pilates na Panobianco?"
				paragraphs={[
					"O método Pilates é um sistema completo de condicionamento físico e mental que foca no fortalecimento do core, melhora da postura e aumento da flexibilidade.",
					"Na Panobianco Satélite, utilizamos a Contrologia para integrar corpo e mente, proporcionando resultados duradouros e bem-estar integral através de exercícios fluidos e controlados.",
				]}
				featureCard={{
					title: "Diferenciais",
					items: [
						"Equipamentos Modernos",
						"Instrutores Especializados",
						"Atendimento Personalizado",
						"Ambiente Climatizado",
					],
				}}
				accentClass="bg-primary-500"
				imageSrc={ABOUT_IMAGE}
				statCard={{ value: "45 min", label: "Duração" }}
			/>
			<ModalidadePage.Benefits
				title="Benefícios do Pilates"
				subtitle="Transformação"
				benefits={[
					{
						title: "Correção Postural",
						description:
							"Alinhamento da coluna e fortalecimento dos músculos estabilizadores para o dia a dia.",
						icon: Accessibility,
					},
					{
						title: "Core & Tonificação",
						description:
							"Fortalecimento abdominal profundo e definição muscular sem impacto excessivo.",
						icon: Dumbbell,
					},
					{
						title: "Flexibilidade",
						description:
							"Aumento da amplitude de movimento e alívio de tensões e dores musculares.",
						icon: Leaf,
					},
					{
						title: "Saúde Mental",
						description:
							"Redução do estresse e ansiedade através do controle da respiração e foco.",
						icon: Brain,
					},
				]}
				accentClass="bg-primary-500"
			/>
			<ModalidadePage.Classes
				name="Pilates"
				description="Na Panobianco Jardim Satélite, o Pilates é ministrado por profissionais qualificados em um ambiente tranquilo e equipado."
				accentClass="bg-primary-500"
			/>
			<ModalidadePage.ContactCta />
		</ModalidadePage>
	);
}
