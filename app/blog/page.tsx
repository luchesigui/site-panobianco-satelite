import type { Metadata } from "next";

import BlogGrid from "@/components/blog/BlogGrid";
import ContactCtaSection from "@/components/ContactCtaSection";
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
		<div className="font-display min-h-screen overflow-x-hidden bg-pb-off-white text-pb-graphite">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
			/>

			{/* Hero */}
			{/* Sem foto de topo: o bloco hexagonal laranja carrega a chamada,
			    com folga para o header fixo de 80px. */}
			<section className="bg-pb-off-white pb-12 pt-20 lg:pb-14 lg:pt-28">
				<div className="container-main">
					<div className="shape-chanfrado bg-pb-orange px-10 py-14 text-white lg:px-14 lg:py-16">
						<h1 className="text-[3.5rem] leading-[0.96] tracking-tight">
							Saúde e bem-estar
						</h1>
						<p className="mt-6 max-w-3xl text-[1.5rem] leading-tight">
							Dicas e informações sobre exercícios, saúde na terceira idade,
							emagrecimento e qualidade de vida em São José dos Campos.
						</p>
					</div>
				</div>
			</section>

			{/* Posts — grade plana, 9 por vez */}
			<section className="bg-pb-off-white pb-20 pt-10 lg:pb-28 lg:pt-12">
				<div className="container-main">
					<BlogGrid posts={posts} />
				</div>
			</section>

			<ContactCtaSection />
		</div>
	);
}
