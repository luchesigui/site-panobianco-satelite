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
			<section className="bg-background-dark py-8">
				<div className="container-main">
					<div className="mx-auto max-w-4xl">
						<QuizCtaCard
							variant="compact"
							source={source}
							headline="Essa modalidade combina com você?"
							subhead="Faça o quiz e receba uma recomendação personalizada pro seu objetivo — sem compromisso."
							ctaLabel="Descobrir"
						/>
					</div>
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
	accentClass: string;
	highlights?: string[];
};

function ModalidadePageRoot({ children }: ModalidadePageRootProps) {
	return (
		<div className="font-display min-h-screen overflow-x-hidden bg-background-dark text-white">
			{children}
		</div>
	);
}

function ModalidadeClasses({
	name,
	title = "Nossas Aulas",
	description,
	accentClass,
	highlights = [
		"Instrutores certificados e apaixonados",
		"Aulas dinâmicas e motivadoras",
		"Ambiente acolhedor na unidade Jardim Satélite",
	],
}: ModalidadeClassesProps) {
	return (
		<section className="py-16">
			<div className="container-main">
				<div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
					<div className="glass-card rounded-2xl p-8">
						<h3 className="mb-4 text-xl font-bold text-white">
							{title} de {name}
						</h3>
						{description && (
							<>
								<p className="mb-4 leading-relaxed text-neutral-400">
									{description}
								</p>
								<p className="mb-6 leading-relaxed text-neutral-400">
									A trilha sonora e as coreografias são pensadas para manter
									você motivado. Consulte a grade de horários na recepção ou
									entre em contato.
								</p>
							</>
						)}
						<div className="rounded-xl bg-primary-500/20 p-4">
							<p className="text-center text-sm text-neutral-300">
								<strong>Horários:</strong> Consulte nossa grade na recepção ou
								entre em contato
							</p>
						</div>
					</div>
					<div>
						<h3 className="mb-6 text-xl font-bold text-white">
							Para todos os níveis
						</h3>
						<ul className="space-y-4">
							{highlights.map((item) => (
								<li
									key={item}
									className="flex items-start gap-3 text-neutral-400"
								>
									<div
										className={`mt-1.5 size-2 shrink-0 rounded-full ${accentClass}`}
									/>
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
