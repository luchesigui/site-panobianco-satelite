import Link from "next/link";

import ContactCtaSection from "@/components/ContactCtaSection";

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
		<div className="font-display min-h-screen overflow-x-hidden bg-background-dark text-white">
			<div className="px-4 py-10 lg:px-10">
				<div className="container-main max-w-3xl">
					{/* Breadcrumb */}
					<nav
						className="mb-8 flex items-center gap-2 text-sm text-white/40"
						aria-label="Breadcrumb"
					>
						<Link
							href="/"
							className="transition-colors hover:text-primary-500"
						>
							Início
						</Link>
						<span aria-hidden="true">/</span>
						<Link
							href="/blog"
							className="transition-colors hover:text-primary-500"
						>
							Blog
						</Link>
						<span aria-hidden="true">/</span>
						<span className="truncate text-white/25">{headline}</span>
					</nav>

					{/* Category badge */}
					<span className="mb-4 inline-block rounded-full border border-primary-500/20 bg-primary-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-primary-500">
						{category}
					</span>

					{/* Title */}
					<h1 className="mb-6 text-4xl font-black leading-none tracking-tight md:text-5xl">
						{headline}
					</h1>

					{/* Meta */}
					<div className="mb-12 flex flex-wrap items-center gap-3 text-sm text-white/40">
						<span>Panobianco Jardim Satélite</span>
						<span>·</span>
						<time dateTime={publishedAt}>{date}</time>
						<span>·</span>
						<span>{readingTimeMinutes} min de leitura</span>
					</div>

					{/* Article body */}
					<div
						className="prose-blog"
						// biome-ignore lint/security/noDangerouslySetInnerHtml: trusted static markdown content
						dangerouslySetInnerHTML={{ __html: contentHtml }}
					/>
				</div>
			</div>

			<ContactCtaSection />
		</div>
	);
}
