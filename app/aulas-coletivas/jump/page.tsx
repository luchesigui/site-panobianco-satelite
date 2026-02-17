import type { Metadata } from "next";
import {
	Activity,
	Flame,
	Shield,
	Target,
	Zap,
} from "lucide-react";
import ModalidadePage from "@/components/ModalidadePage";

const HERO_IMAGE =
	"https://lh3.googleusercontent.com/aida-public/AB6AXuCbpnc3eJfLmn_pAusAyFOYExqLf1pyjxMs78c9TCn8Aoj72-I2_IeYMFbQOPmYNY-xk7WnX5oVkG9EaEQKQ6Xz1KXYA5RS_PrjhuYKn8_oTHOlBmsecT8jXwO4ytnyjyda4j0o_vN8y_X1i9aXbN57QpckUmoKZTQrngHE7Zgjc-_YSrFh67rmvjBcbWhrKwThl82yHi5atoUeMeRIHg-TsA8PgXJ2RyXpiR7Rl3jUX2p8J8D-B0rYOk5a4BC2RXjctgIHkW_hfwg";

const ABOUT_IMAGE =
	"https://lh3.googleusercontent.com/aida-public/AB6AXuDFwH8EIIaI69TGqTXoMwPxDjqZ14j_bv6S8BvI8VVxeMmxgQoULr8Rcc7G8XA9ry564TFrU5TqfIcNHh_H-zUvyhAG1qtLglHcccUa1cbbnhGzfSQnyLQd2nwg2aqdgEtSlQzaJ1tFNv79Rgef6zi92pE8Uwx-otrJsmWQZT6u7RfFtiCpK6nkZEOIJKaqPWB3x6VwfqjWzxE09CW9c3VR7AF2vl8hwGza8ejlmzs9Q4HxJMbKkhKmKk9k7dDsXumVWBu5gQ1ufsI";

export const metadata: Metadata = {
	title:
		"Jump | Aulas Coletivas | Academia Panobianco Jardim Satélite",
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
				imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuALmNnC3GItWneBzAA2cEkLXkFGddgmPFbBIO0JDU3sC19m8b2Su-rEu1gSPwknH1WVH0wQ8We3uBxP0PEcK5yENSIRTlv7aE5x4VHRmwaxp2w_7MTRgv9SS5sgSLxYKP5Hbb7a6JlruM4Zk5mTuQxkokS-ZNq2tkXwxbJuYw1Eq7RqU09bFDmw52b3oAHwHnCDaRyjfe1i9adtU6M5L6WGQUHIVww-rZW0y-6TKCJhCKeFg-WpKDdzUwX51fhVA-2DQUt1d_y-4hs"
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
