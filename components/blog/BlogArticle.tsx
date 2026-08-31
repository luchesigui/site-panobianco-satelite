import Link from "next/link";

import ContactCtaSection from "@/components/ContactCtaSection";
import QuizCtaCard from "@/components/QuizCtaCard";
import styles from "./BlogArticle.module.css";

type Props = {
	headline: string;
	category: string;
	publishedAt: string;
	readingTimeMinutes: number;
	contentHtml: string;
};

export default function BlogArticle({
	headline,
	category,
	publishedAt,
	readingTimeMinutes,
	contentHtml,
}: Props) {
	const date = new Date(publishedAt).toLocaleDateString("pt-BR", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});

	return (
		<div className="font-display min-h-screen overflow-x-hidden bg-pb-off-white text-pb-graphite">
			<div className="pb-20 pt-10 lg:pb-28 lg:pt-12">
				<div className="container-main max-w-3xl">
					{/* Breadcrumb */}
					<nav
						className="mb-8 flex items-center gap-2 text-sm text-pb-graphite/70"
						aria-label="Breadcrumb"
					>
						<Link
							href="/"
							className="transition-colors hover:text-pb-orange-warm"
						>
							Início
						</Link>
						<span aria-hidden="true">/</span>
						<Link
							href="/blog"
							className="transition-colors hover:text-pb-orange-warm"
						>
							Blog
						</Link>
						<span aria-hidden="true">/</span>
						<span className="truncate text-pb-graphite/50">{headline}</span>
					</nav>

					{/* Category badge */}
					<span className="selo-chanfrado mb-4 inline-block bg-pb-orange px-3 py-1 text-[10px] uppercase tracking-[0.1em] text-white">
						{category}
					</span>

					{/* Title */}
					<h1 className="mb-6 text-[3.5rem] leading-[0.96] tracking-tight text-pb-black">
						{headline}
					</h1>

					{/* Meta */}
					<div className="mb-12 flex flex-wrap items-center gap-3 text-sm text-pb-graphite/70">
						<span>Panobianco Jardim Satélite</span>
						<span>·</span>
						<time dateTime={publishedAt}>{date}</time>
						<span>·</span>
						<span>{readingTimeMinutes} min de leitura</span>
					</div>

					{/* Article body */}
					<div
						className={styles.proseBlog}
						// biome-ignore lint/security/noDangerouslySetInnerHtml: trusted static markdown content
						dangerouslySetInnerHTML={{ __html: contentHtml }}
					/>

					{/* Quiz CTA — pós artigo */}
					<div className="mt-12">
						<QuizCtaCard
							variant="soft"
							source="blog_article"
							headline="Quer um plano personalizado pra atingir esse objetivo?"
							subhead="Em 60s, te indicamos qual plano e treino combinam com o que você acabou de ler."
							ctaLabel="Fazer o quiz"
						/>
					</div>
				</div>
			</div>

			<ContactCtaSection />
		</div>
	);
}
