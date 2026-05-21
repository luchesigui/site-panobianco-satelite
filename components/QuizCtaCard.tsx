"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

import { type QuizCtaSource, trackQuizCtaClicked } from "@/lib/analytics";

type Variant = "default" | "compact" | "soft";

type Props = {
	variant?: Variant;
	source: QuizCtaSource;
	headline?: string;
	subhead?: string;
	ctaLabel?: string;
};

const containerByVariant: Record<Variant, string> = {
	default:
		"flex flex-col gap-6 rounded-3xl border border-primary-500/30 bg-gradient-to-br from-primary-500/15 via-primary-500/5 to-transparent p-8 md:flex-row md:items-center md:justify-between md:p-10",
	soft: "glass-card flex flex-col gap-4 rounded-2xl border border-primary-500/20 p-6 sm:flex-row sm:items-center sm:justify-between",
	compact:
		"flex flex-col items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 sm:flex-row sm:items-center sm:justify-between",
};

const headlineClassByVariant: Record<Variant, string> = {
	default: "text-2xl font-semibold leading-tight md:text-3xl",
	soft: "text-lg font-bold leading-tight",
	compact: "text-lg font-bold leading-tight",
};

const subheadClassByVariant: Record<Variant, string> = {
	default: "mt-2 max-w-2xl text-sm text-neutral-300 md:text-base",
	soft: "mt-1 text-sm text-neutral-400",
	compact: "mt-1 text-sm text-neutral-400",
};

const ctaClassByVariant: Record<Variant, string> = {
	default:
		"inline-flex shrink-0 items-center gap-2 rounded-full bg-primary-500 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-primary-500/30 transition-all hover:bg-primary-500/90 hover:scale-[1.02]",
	soft: "inline-flex shrink-0 items-center gap-2 rounded-full bg-primary-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-500/90",
	compact:
		"inline-flex shrink-0 items-center gap-2 rounded-full bg-primary-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-500/90",
};

export default function QuizCtaCard({
	variant = "default",
	source,
	headline = "Não sabe por onde começar?",
	subhead = "Em 60 segundos, te indicamos o plano e o treino ideal pro seu objetivo — direto no seu e-mail.",
	ctaLabel = "Fazer o Quiz Gratuito",
}: Props) {
	return (
		<aside className={containerByVariant[variant]}>
			<div className="flex items-start gap-4">
				<span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-500/15 text-primary-500">
					<Sparkles className="size-5" />
				</span>
				<div>
					<h3 className={headlineClassByVariant[variant]}>{headline}</h3>
					<p className={subheadClassByVariant[variant]}>{subhead}</p>
				</div>
			</div>
			<Link
				href="/quiz"
				onClick={() => trackQuizCtaClicked(source)}
				className={ctaClassByVariant[variant]}
			>
				{ctaLabel}
				<ArrowRight className="size-4" />
			</Link>
		</aside>
	);
}
