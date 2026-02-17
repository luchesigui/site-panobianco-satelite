import type { Metadata } from "next";
import {
	Accessibility,
	Flame,
	Heart,
	Target,
	Zap,
} from "lucide-react";
import ModalidadePage from "@/components/ModalidadePage";

const HERO_IMAGE =
	"https://lh3.googleusercontent.com/aida-public/AB6AXuB0hrL_dWZnYXD6I7VgxMuT2xlCIllmWd7r8afBfdo_5bNbjYljwGM4lRBywQrDn2ZHdQwyDRuVDmnsA4iOdRccjo-AMNJMMZzTrNwv5dMrMEWyQAuYZ1XUpGLj4zS-KKPIfcJ66p7D1qho46JVX-eWWrF7GG6tUn5QGInCn1hbG_krdaWbO-CVALYjYMYsY-7tREsaWHf4SQFZE8edAPDd7e4TYj-2a109_BLDIGFui58eitkiVYoXizWoJArb9b-PiH2TbG-zoJQ";

const ABOUT_IMAGE =
	"https://lh3.googleusercontent.com/aida-public/AB6AXuBb3vaVdYZ30sWb24w-dElipunlju4Kej8hjzDOIyBhoTj_zxNdj4pHqxtTMgUrSQB48IPuZFJdhuSFN2P9xNuvFKjcKWd0APxeIkhBDtCaY8PgWUGLl8bEm23_cOTZ6YwUhJ-PBU76KjJBkaRm_YMniCmAX_im83DjAKtxZxP4_gZdC8ayhuctqqtHIzDkbob69TS9LyotG_5y4wqvGcm9_6Nh0tDBfwsG48LmqkTspAaJi6-38CWToq5VptpuJdh2tSeCJ6BJm-E";

export const metadata: Metadata = {
	title:
		"GAP (Glúteos, Abdômen e Pernas) | Aulas Coletivas | Academia Panobianco Jardim Satélite",
	description:
		"Glúteos, Abdômen e Pernas. O treino focado que você precisa para definir e fortalecer os membros inferiores e o core.",
};

export default function GAPPage() {
	return (
		<ModalidadePage>
			<ModalidadePage.Hero
				badge="Aulas Coletivas"
				title="GAP"
				description="Glúteos, Abdômen e Pernas. O treino focado que você precisa para definir e fortalecer os membros inferiores e o core."
				accentGradient="from-primary-500 to-orange-700"
				icon={Target}
				heroImageSrc={HERO_IMAGE}
				stats={[
					{ value: "30 min", label: "Duração" },
					{ value: "200-300", label: "Kcal p/ Aula" },
				]}
			/>
			<ModalidadePage.About
				title="O Que é"
				titleHighlight="GAP?"
				paragraphs={[
					"O GAP é uma aula coletiva de alta intensidade que combina exercícios específicos para glúteos, abdômen e pernas. É uma das modalidades mais procuradas por quem busca resultados rápidos e localizados.",
					"Com duração média de 45 a 60 minutos, as sessões utilizam caneleiras, halteres e o peso do próprio corpo para esculpir a silhueta, aumentar a resistência muscular e queimar calorias de forma eficiente.",
				]}
				accentClass="bg-primary-500"
				imageSrc={ABOUT_IMAGE}
				statCard={{ value: "30 min", label: "Duração" }}
			/>
			<ModalidadePage.Benefits
				title="Benefícios do GAP"
				subtitle="Mais do que estética, um treino que transforma sua funcionalidade e saúde diária."
				benefits={[
					{
						title: "Definição Muscular",
						description:
							"Foco intenso na tonificação dos membros inferiores, eliminando a flacidez e esculpindo as pernas.",
						icon: Zap,
					},
					{
						title: "Melhora Postural",
						description:
							"O fortalecimento do core (abdômen e lombar) garante uma postura mais ereta e elegante no dia a dia.",
						icon: Accessibility,
					},
					{
						title: "Alto Gasto Calórico",
						description:
							"A intensidade da aula eleva a frequência cardíaca, favorecendo a queima de gordura durante e após o treino.",
						icon: Flame,
					},
					{
						title: "Resistência Física",
						description:
							"Aumenta sua capacidade cardiovascular e muscular, dando mais disposição para as atividades cotidianas.",
						icon: Heart,
					},
				]}
				accentClass="bg-primary-500"
			/>
			<ModalidadePage.Classes
				name="GAP"
				description="As aulas de GAP na Panobianco Jardim Satélite são conduzidas por instrutores que garantem execução correta e evolução segura."
				accentClass="bg-primary-500"
			/>
			<ModalidadePage.ContactCta />
		</ModalidadePage>
	);
}
