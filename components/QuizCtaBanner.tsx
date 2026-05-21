"use client";

import { ArrowRight, Mail, Sparkles, Timer } from "lucide-react";
import Link from "next/link";

import { type QuizCtaSource, trackQuizCtaClicked } from "@/lib/analytics";

type Props = {
	source: QuizCtaSource;
	eyebrow?: string;
	headline?: React.ReactNode;
	subhead?: string;
	ctaLabel?: string;
};

export default function QuizCtaBanner({
	source,
	eyebrow = "Quiz personalizado",
	headline = (
		<>
			Sua jornada começa com a{" "}
			<span className="italic text-primary-500">escolha certa</span>
		</>
	),
	subhead = "Em menos de 1 minuto, te mostramos qual treino, modalidade e plano combinam com seus objetivos. Tudo organizado no seu e-mail.",
	ctaLabel = "Iniciar Quiz Personalizado",
}: Props) {
	return (
		<section className="bg-background-dark py-16">
			<div className="container-main">
				<div className="relative overflow-hidden rounded-3xl border border-primary-500/30 bg-gradient-to-br from-primary-500/20 via-primary-500/5 to-transparent p-8 md:p-12">
					<div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-primary-500/20 blur-[100px]" />
					<div className="pointer-events-none absolute -bottom-24 -left-16 size-64 rounded-full bg-primary-500/10 blur-[120px]" />

					<div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
						<div className="max-w-2xl">
							<span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-primary-500">
								<Sparkles className="size-3" />
								{eyebrow}
							</span>
							<h2 className="text-3xl font-semibold leading-[1.15] tracking-tight md:text-4xl lg:text-5xl">
								{headline}
							</h2>
							<p className="mt-4 text-base text-neutral-300 md:text-lg">
								{subhead}
							</p>

							<div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-neutral-400">
								<span className="inline-flex items-center gap-1.5">
									<Timer className="size-4 text-primary-500" />
									Menos de 1 minuto
								</span>
								<span className="inline-flex items-center gap-1.5">
									<Mail className="size-4 text-primary-500" />
									Recomendação no seu e-mail
								</span>
								<span className="inline-flex items-center gap-1.5">
									<Sparkles className="size-4 text-primary-500" />
									100% gratuito
								</span>
							</div>
						</div>

						<Link
							href="/quiz"
							onClick={() => trackQuizCtaClicked(source)}
							className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary-500 px-10 py-4 text-base font-bold text-white shadow-xl shadow-primary-500/30 transition-all hover:bg-primary-500/90 hover:scale-[1.025] active:scale-95"
						>
							{ctaLabel}
							<ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
