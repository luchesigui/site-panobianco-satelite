import type { ReactNode } from "react";

import ContactCtaSection from "@/components/ContactCtaSection";
import ModalidadeAbout from "@/components/modalidades/ModalidadeAbout";
import ModalidadeBenefits from "@/components/modalidades/ModalidadeBenefits";
import ModalidadeHero from "@/components/modalidades/ModalidadeHero";
import QuizCtaCard from "@/components/QuizCtaCard";

type ModalidadeContactCtaProps = {
	modalidade?: string;
};

function ModalidadeContactCta({ modalidade }: ModalidadeContactCtaProps = {}) {
	const source = (
		modalidade ? `modalidade_${modalidade}` : "modalidade_generic"
	) as `modalidade_${string}`;
	return (
		<>
			{/* Padding inferior curto: o ContactCtaSection já entra com o topo
			    apertado, como na home. */}
			<section className="bg-pb-off-white pb-6 pt-20 lg:pb-8 lg:pt-28">
				<div className="container-main">
					<QuizCtaCard
						variant="compact"
						source={source}
						headline="Essa modalidade combina com você?"
						subhead="Faça o quiz e receba uma recomendação personalizada pro seu objetivo, sem compromisso."
						ctaLabel="Descobrir"
					/>
				</div>
			</section>
			<ContactCtaSection />
		</>
	);
}

type ModalidadePageRootProps = {
	children: ReactNode;
};

type ModalidadeClassesProps = {
	name: string;
	title?: string;
	description?: string;
	highlights?: string[];
};

function ModalidadePageRoot({ children }: ModalidadePageRootProps) {
	return (
		<div className="font-display min-h-screen overflow-x-hidden bg-pb-off-white text-pb-graphite">
			{children}
		</div>
	);
}

function ModalidadeClasses({
	name,
	title = "Nossas Aulas",
	description,
	highlights = [
		"Instrutores certificados e apaixonados",
		"Aulas dinâmicas e motivadoras",
		"Ambiente acolhedor na unidade Jardim Satélite",
	],
}: ModalidadeClassesProps) {
	return (
		<section className="bg-pb-off-white py-20 lg:py-28">
			<div className="container-main">
				<div className="flex flex-col lg:flex-row">
					<div className="shape-chanfrado bg-pb-orange px-12 py-12 text-white lg:w-1/2 lg:py-20">
						<h2 className="mb-8 text-[3.5rem] leading-none tracking-tight">
							{title} de {name}
						</h2>
						{description && (
							<div className="space-y-6 text-[1.5rem] leading-tight text-white/90">
								<p>{description}</p>
								<p>
									Consulte a grade de horários na recepção ou fale com a gente
									pelo WhatsApp.
								</p>
							</div>
						)}
					</div>
					<div className="shape-chanfrado bg-pb-grena px-12 py-12 text-white lg:w-1/2 lg:py-20">
						<h3 className="mb-8 text-[3.5rem] leading-none tracking-tight">
							Para todos os níveis
						</h3>
						<ul className="space-y-4 text-[1.5rem] leading-tight">
							{highlights.map((item) => (
								<li key={item} className="flex items-start gap-4">
									<span className="shape-octagon-regular mt-2 size-3 shrink-0 bg-pb-orange" />
									<span>{item}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}

type ModalidadePageCompound = typeof ModalidadePageRoot & {
	Hero: typeof ModalidadeHero;
	About: typeof ModalidadeAbout;
	Benefits: typeof ModalidadeBenefits;
	Classes: typeof ModalidadeClasses;
	ContactCta: typeof ModalidadeContactCta;
};

const ModalidadePage = Object.assign(ModalidadePageRoot, {
	Hero: ModalidadeHero,
	About: ModalidadeAbout,
	Benefits: ModalidadeBenefits,
	Classes: ModalidadeClasses,
	ContactCta: ModalidadeContactCta,
}) as ModalidadePageCompound;

export default ModalidadePage;
