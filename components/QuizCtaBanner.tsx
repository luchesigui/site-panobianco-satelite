"use client";

import Link from "next/link";

import { type QuizCtaSource, trackQuizCtaClicked } from "@/lib/analytics";

type Props = {
	source: QuizCtaSource;
	headline?: React.ReactNode;
	subhead?: string;
	ctaLabel?: string;
};

export default function QuizCtaBanner({
	source,
	headline = "Você se encontra, a gente acompanha",
	subhead = "Em menos de 1 minuto, e sem custo nenhum, te mostramos qual treino, qual modalidade e qual plano combinam com o seu objetivo e a sua rotina. A recomendação chega organizada no seu e-mail, para você decidir com calma.",
	ctaLabel = "Iniciar Quiz Personalizado",
}: Props) {
	return (
		<section className="pb-10 pt-6 lg:pb-12 lg:pt-8">
			<div className="container-main">
				{/* Módulo chanfrado em laranja escuro chapado. */}
				<div className="shape-chanfrado relative bg-pb-orange-warm px-10 pb-14 pt-10 text-white md:px-16 md:pb-20 md:pt-14">
					<div className="relative">
						<h2 className="text-[3.5rem] leading-[0.96] tracking-tight text-white">
							{headline}
						</h2>
						<p className="mt-6 text-[1.5rem] leading-tight text-white">
							{subhead}
						</p>

						<Link
							href="/quiz"
							onClick={() => trackQuizCtaClicked(source)}
							className="botao-chanfrado mt-8 inline-flex items-center justify-center bg-white px-8 py-4 text-sm uppercase tracking-wide text-pb-orange-warm transition-colors hover:bg-pb-off-white"
						>
							{ctaLabel}
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
