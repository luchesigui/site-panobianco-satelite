"use client";

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

// Mesmo módulo do banner do quiz da home: hexágono completo em laranja
// escuro chapado, tudo empilhado numa coluna, sem ícone e sem pill.
// `soft` é a exceção: vive dentro da coluna estreita do artigo do blog,
// então usa o chanfro menor e a escala reduzida para não estourar.
const containerByVariant: Record<Variant, string> = {
	default:
		"shape-chanfrado bg-pb-orange-warm px-10 pb-14 pt-10 text-white md:px-16 md:pb-20 md:pt-14",
	compact:
		"shape-chanfrado bg-pb-orange-warm px-10 pb-14 pt-10 text-white md:px-16 md:pb-20 md:pt-14",
	soft: "shape-chanfrado-menor bg-pb-orange-warm px-8 py-8 text-white",
};

const headlineClassByVariant: Record<Variant, string> = {
	default: "text-[3.5rem] leading-[0.96] tracking-tight",
	compact: "text-[3.5rem] leading-[0.96] tracking-tight",
	soft: "text-[1.5rem] leading-tight tracking-tight",
};

const subheadClassByVariant: Record<Variant, string> = {
	default: "mt-6 text-[1.5rem] leading-tight",
	compact: "mt-6 text-[1.5rem] leading-tight",
	soft: "mt-3 leading-snug",
};

const ctaClassByVariant: Record<Variant, string> = {
	default:
		"botao-chanfrado mt-8 inline-flex items-center justify-center bg-white px-8 py-4 text-sm uppercase tracking-wide text-pb-orange-warm transition-colors hover:bg-pb-off-white",
	compact:
		"botao-chanfrado mt-8 inline-flex items-center justify-center bg-white px-8 py-4 text-sm uppercase tracking-wide text-pb-orange-warm transition-colors hover:bg-pb-off-white",
	soft: "botao-chanfrado mt-6 inline-flex items-center justify-center bg-white px-6 py-3 text-sm uppercase tracking-wide text-pb-orange-warm transition-colors hover:bg-pb-off-white",
};

export default function QuizCtaCard({
	variant = "default",
	source,
	headline = "Não sabe por onde começar?",
	subhead = "Em 60 segundos, te indicamos o plano e o treino ideal pro seu objetivo, direto no seu e-mail.",
	ctaLabel = "Fazer o quiz gratuito",
}: Props) {
	return (
		<aside className={containerByVariant[variant]}>
			<h3 className={headlineClassByVariant[variant]}>{headline}</h3>
			<p className={subheadClassByVariant[variant]}>{subhead}</p>
			<Link
				href="/quiz"
				onClick={() => trackQuizCtaClicked(source)}
				className={ctaClassByVariant[variant]}
			>
				{ctaLabel}
			</Link>
		</aside>
	);
}
