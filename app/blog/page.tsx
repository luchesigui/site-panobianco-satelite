import type { Metadata } from "next";

import ContactCtaSection from "@/components/ContactCtaSection";
import BlogGrid from "@/components/blog/BlogGrid";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
	title: {
		absolute:
			"Blog de Saúde e Exercícios em São José dos Campos | Panobianco Jardim Satélite",
	},
	description:
		"Dicas de exercícios, saúde na terceira idade, emagrecimento, musculação e bem-estar para quem treina em São José dos Campos.",
	alternates: { canonical: "/blog" },
	openGraph: {
		type: "website",
		locale: "pt_BR",
		siteName: "Academia Panobianco Jardim Satélite",
		title: "Blog | Panobianco Jardim Satélite",
		description:
			"Dicas de exercícios, saúde e bem-estar para São José dos Campos.",
		url: `${SITE_URL}/blog`,
	},
};

const webPageSchema = {
	"@context": "https://schema.org",
	"@type": "WebPage",
	name: "Blog | Academia Panobianco Jardim Satélite",
	description:
		"Dicas de exercícios, saúde na terceira idade, emagrecimento e bem-estar em São José dos Campos.",
	url: `${SITE_URL}/blog`,
	isPartOf: { "@id": `${SITE_URL}#website` },
};

export default function BlogPage() {
	const posts = getAllPosts();

	return (
		<div className="font-display min-h-screen overflow-x-hidden bg-background-dark text-white">
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: trusted static JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
			/>

			<div className="px-4 py-10 lg:px-10">
				{/* Hero */}
				<div className="container-main mb-12 max-w-2xl space-y-4">
					<span className="inline-block w-fit rounded-full border border-primary-500/20 bg-primary-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-primary-500">
						Blog
					</span>
					<h1 className="text-5xl font-semibold leading-none tracking-tight md:text-6xl">
						SAÚDE & BEM-ESTAR
					</h1>
					<p className="text-lg font-normal leading-relaxed text-white/60">
						Dicas e informações sobre exercícios, saúde na terceira
						idade, emagrecimento e qualidade de vida em São José dos
						Campos.
					</p>
				</div>

				{/* Posts — flat grid, 9 por vez */}
				<div className="container-main">
					<BlogGrid posts={posts} />
				</div>
			</div>

			<ContactCtaSection />
		</div>
	);
}
