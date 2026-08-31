import { Award, Dumbbell, Heart, Target, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import QuizCtaCard from "@/components/QuizCtaCard";
import SchedulingLink from "@/components/SchedulingLink";

export const metadata: Metadata = {
	title: "Sobre Nós | Academia Panobianco Jardim Satélite",
	description:
		"Conheça a história, missão e valores da Academia Panobianco Jardim Satélite. Uma equipe dedicada ao seu bem-estar em São José dos Campos.",
};

const valores = [
	{
		icon: Award,
		title: "Excelência",
		description:
			"Buscamos sempre aprimorar nossos serviços, equipamentos e conhecimento.",
	},
	{
		icon: Heart,
		title: "Paixão",
		description:
			"Pelo que fazemos nos impulsiona a ir além, inovar e contagiar nossos alunos.",
	},
	{
		icon: Target,
		title: "Integridade",
		description:
			"Agimos com transparência, ética e respeito em todas as relações.",
	},
	{
		icon: Users,
		title: "Comunidade",
		description:
			"É o coração da nossa academia, promovendo apoio mútuo e amizade.",
	},
	{
		icon: Dumbbell,
		title: "Inovação",
		description:
			"Nos mantém em constante evolução, buscando as melhores práticas.",
	},
];

const equipe = [
	{
		title: "Professores Qualificados",
		paragraphs: [
			"Nossos professores são profissionais altamente qualificados, com vasta experiência e um profundo conhecimento em diversas modalidades. Eles estão sempre atualizados com as últimas tendências do fitness e são verdadeiros mentores, prontos para orientar, motivar e corrigir sua postura.",
			"Mais do que instrutores, são profissionais que garantem que você treine com segurança e eficiência, maximizando seus resultados.",
		],
	},
	{
		title: "Equipe de Suporte",
		paragraphs: [
			"Nossa equipe de recepção e suporte está sempre a postos para te atender com um sorriso, tirar suas dúvidas e garantir que sua experiência na academia seja sempre a melhor possível.",
			"Somos uma família, e convidamos você a fazer parte dela. Cada membro da nossa equipe está comprometido com o seu sucesso e bem-estar.",
		],
	},
];

const diferenciais = [
	{
		title: "Estrutura Moderna e Completa",
		description:
			"Contamos com três andares de puro espaço e equipamentos de última geração, cuidadosamente selecionados para oferecer o melhor em musculação, cárdio e aulas coletivas.",
	},
	{
		title: "Variedade de Aulas",
		description:
			"De musculação a aulas coletivas como Pilates, FitDance, Jump, Muay Thai, Jiu Jítsu e muito mais, nossa grade de horários é diversificada para atender a todos os gostos e objetivos.",
	},
	{
		title: "Ambiente Acolhedor",
		description:
			"Mais do que uma academia, somos um ponto de encontro. Promovemos um ambiente amigável e motivador, onde você se sentirá parte de uma comunidade saudável.",
	},
	{
		title: "Localização Privilegiada",
		description:
			"Situada no coração do Jardim Satélite, nossa academia é de fácil acesso, com opções de estacionamento e transporte público nas proximidades.",
	},
	{
		title: "Flexibilidade de Planos",
		description:
			"Oferecemos diversas opções de planos, incluindo a aceitação de Wellhub, para que você encontre a modalidade de adesão que melhor se adapta às suas necessidades.",
	},
	{
		title: "Professores Atenciosos",
		description:
			"Nossa equipe de instrutores é o nosso maior orgulho. Com expertise e paixão, eles oferecem um acompanhamento personalizado e motivador.",
	},
];

export default function SobreNos() {
	return (
		<div className="font-display min-h-screen overflow-x-hidden bg-pb-off-white text-pb-graphite">
			{/* Hero */}
			{/* Sem foto de topo: o bloco hexagonal laranja carrega a chamada,
			    com folga para o header fixo de 80px. */}
			<section className="bg-pb-off-white pb-12 pt-20 lg:pb-14 lg:pt-28">
				<div className="container-main">
					<div className="shape-chanfrado bg-pb-orange px-10 py-14 text-white lg:px-14 lg:py-16">
						<h1 className="text-[3.5rem] leading-[0.96] tracking-tight">
							Sobre nossa história
						</h1>
						<p className="mt-6 max-w-3xl text-[1.5rem] leading-tight">
							Conheça a Academia Panobianco Jardim Satélite e descubra como
							transformamos vidas através do movimento, saúde e bem-estar.
						</p>
					</div>
				</div>
			</section>

			{/* História e Missão */}
			<section className="bg-pb-off-white pb-20 pt-10 lg:pb-28 lg:pt-12">
				<div className="container-main">
					<div className="flex flex-col lg:flex-row">
						<div className="shape-chanfrado bg-pb-orange px-12 py-12 text-white lg:w-2/3 lg:py-20">
							<h2 className="mb-8 text-[3.5rem] leading-none tracking-tight">
								Nossa história e missão
							</h2>
							<div className="space-y-6 text-[1.5rem] leading-tight text-white/90">
								<p>
									A Academia Panobianco Jardim Satélite nasceu de uma visão
									clara: transformar vidas através do movimento, da saúde e do
									bem-estar. Desde a nossa fundação, em São José dos Campos,
									dedicamo-nos a criar um espaço onde cada indivíduo se sinta
									motivado a superar seus limites e a alcançar seus objetivos de
									forma sustentável.
								</p>
								<p>
									Nossa missão vai além de oferecer equipamentos de ponta; é
									sobre construir uma comunidade, inspirar hábitos saudáveis e
									proporcionar um ambiente acolhedor onde todos se sintam em
									casa. Acreditamos que a atividade física é uma ferramenta
									poderosa para o desenvolvimento pessoal, e estamos
									comprometidos em ser o catalisador dessa transformação na vida
									de nossos alunos.
								</p>
							</div>
						</div>
						<div className="shape-chanfrado bg-pb-grena px-12 py-12 text-white lg:w-1/3 lg:py-20">
							<span className="shape-octagon-regular mb-6 flex size-16 items-center justify-center bg-pb-orange text-white">
								<Heart className="size-8" />
							</span>
							<h3 className="mb-4 text-[3.5rem] leading-none tracking-tight">
								Nossa missão
							</h3>
							<p className="text-[1.5rem] leading-tight text-white/90">
								Transformar vidas através do movimento, construindo uma
								comunidade saudável e inspirando hábitos que perduram para toda
								a vida.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Valores e Filosofia */}
			<section className="bg-pb-grena py-20 lg:py-28">
				<div className="container-main">
					<div className="mb-[7.5rem] text-center">
						<h2 className="text-[3.5rem] leading-none tracking-tight text-white">
							Nossos valores e filosofia
						</h2>
						<p className="mx-auto mt-6 max-w-2xl text-[1.5rem] leading-tight text-white/80">
							Somos guiados por valores que permeiam todas as nossas ações e
							interações, criando um ambiente de excelência e respeito.
						</p>
					</div>
					<div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(min(410px,100%),1fr))]">
						{valores.map((valor) => {
							const Icon = valor.icon;
							return (
								<div
									key={valor.title}
									className="card-hex-orange font-display px-12 py-16 text-white"
								>
									<span className="shape-octagon-regular mb-6 flex size-12 items-center justify-center bg-white/20 text-white">
										<Icon className="size-6" />
									</span>
									<h3 className="mb-6 text-[3.5rem] leading-none tracking-tight">
										{valor.title}
									</h3>
									<p className="text-[1.5rem] leading-tight text-white/90">
										{valor.description}
									</p>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Filosofia Centrada no Aluno */}
			<section className="bg-pb-off-white py-20 lg:py-28">
				<div className="container-main">
					<div className="mx-auto max-w-4xl text-center">
						<h2 className="mb-8 text-[3.5rem] leading-none tracking-tight text-pb-orange-warm">
							Filosofia centrada no aluno
						</h2>
						<div className="space-y-6 text-[1.5rem] leading-tight">
							<p>
								Nossa filosofia é centrada no aluno. Entendemos que cada pessoa
								é única, com suas próprias metas, desafios e ritmos. Por isso,
								oferecemos um atendimento personalizado, planos de treino
								adaptados e uma variedade de aulas que se encaixam em diferentes
								perfis.
							</p>
							<p>
								Queremos que você se sinta à vontade para explorar novas
								modalidades, experimentar novos desafios e, acima de tudo,
								desfrutar do processo de cuidar de si mesmo.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Nossa Equipe */}
			<section className="bg-pb-off-white pb-20 pt-10 lg:pb-28 lg:pt-12">
				<div className="container-main">
					<div className="mb-[7.5rem] text-center">
						<h2 className="text-[3.5rem] leading-none tracking-tight text-pb-orange-warm">
							Conheça nossa equipe
						</h2>
						<p className="mx-auto mt-6 max-w-2xl text-[1.5rem] leading-tight">
							Por trás de cada treino, cada aula e cada sorriso, há uma equipe
							dedicada e apaixonada por saúde e bem-estar.
						</p>
					</div>
					<div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(min(410px,100%),1fr))]">
						{equipe.map((bloco) => (
							<div key={bloco.title} className="card-hex-light px-12 py-16">
								<h3 className="mb-6 text-[3.5rem] leading-none tracking-tight">
									{bloco.title}
								</h3>
								<div className="space-y-4 text-[1.5rem] leading-tight text-pb-graphite/80">
									{bloco.paragraphs.map((p) => (
										<p key={p.slice(0, 40)}>{p}</p>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Nossos Diferenciais */}
			<section className="bg-pb-grena py-20 lg:py-28">
				<div className="container-main">
					<div className="mb-[7.5rem] text-center">
						<h2 className="text-[3.5rem] leading-none tracking-tight text-white">
							Nossos diferenciais
						</h2>
						<p className="mx-auto mt-6 max-w-2xl text-[1.5rem] leading-tight text-white/80">
							O que torna a Academia Panobianco Jardim Satélite a escolha ideal
							para você?
						</p>
					</div>
					<div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(min(410px,100%),1fr))]">
						{diferenciais.map((item) => (
							<div
								key={item.title}
								className="card-hex-orange font-display px-12 py-16 text-white"
							>
								<h3 className="mb-6 text-[3.5rem] leading-none tracking-tight">
									{item.title}
								</h3>
								<p className="text-[1.5rem] leading-tight text-white/90">
									{item.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Quiz CTA */}
			<section className="bg-pb-off-white pb-6 pt-20 lg:pb-8 lg:pt-28">
				<div className="container-main">
					<QuizCtaCard
						variant="default"
						source="sobre_nos"
						headline="Pronto pra descobrir seu lugar aqui?"
						subhead="Em 1 minuto, te ajudamos a montar seu caminho na Panobianco, sob medida pro seu objetivo e pra sua rotina."
						ctaLabel="Descobrir meu caminho"
					/>
				</div>
			</section>

			{/* CTA final */}
			{/* Mesmo módulo do fechamento da home: hexágono completo, cor
			    chapada, tudo empilhado numa coluna. */}
			<section className="pb-20 pt-6 lg:pb-28 lg:pt-8">
				<div className="container-main">
					<div className="shape-chanfrado bg-pb-orange px-10 pb-14 pt-10 text-white md:px-16 md:pb-20 md:pt-14">
						<h2 className="text-[3.5rem] leading-[0.96] tracking-tight">
							Venha fazer parte da nossa família
						</h2>
						<p className="mt-6 text-[1.5rem] leading-tight">
							Venha nos visitar e descubra por que a Academia Panobianco Jardim
							Satélite é o lugar perfeito para você transformar seu corpo, sua
							mente e sua vida.
						</p>
						<div className="mt-8 flex flex-col gap-4 sm:flex-row">
							<SchedulingLink className="botao-chanfrado inline-flex items-center justify-center bg-white px-8 py-4 text-sm uppercase tracking-wide text-pb-orange-warm transition-colors hover:bg-pb-off-white">
								Agendar aula experimental
							</SchedulingLink>
							<Link
								href="/contato"
								className="botao-chanfrado inline-flex items-center justify-center bg-pb-black px-8 py-4 text-sm uppercase tracking-wide text-white transition-colors hover:bg-pb-grena"
							>
								Entre em contato
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
