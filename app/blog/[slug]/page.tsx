import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogArticle from "@/components/blog/BlogArticle";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { SITE_URL } from "@/lib/constants";

type Props = { params: { slug: string } };

export function generateStaticParams() {
	return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const post = await getPostBySlug(params.slug);
	if (!post) return {};

	return {
		title: { absolute: post.title },
		description: post.description,
		keywords: post.keywords.join(", "),
		authors: [{ name: "Academia Panobianco Jardim Satélite" }],
		robots: "index, follow",
		alternates: { canonical: `/blog/${post.slug}` },
		openGraph: {
			type: "article",
			locale: "pt_BR",
			siteName: "Academia Panobianco Jardim Satélite",
			title: post.headline,
			description: post.description,
			publishedTime: post.publishedAt,
			modifiedTime: post.updatedAt,
			url: `${SITE_URL}/blog/${post.slug}`,
			...(post.featuredImageSrc && {
				images: [
					{
						url: `${SITE_URL}${post.featuredImageSrc}`,
						alt: post.featuredImageAlt,
					},
				],
			}),
		},
		twitter: {
			card: "summary_large_image",
			title: post.headline,
			description: post.description,
		},
	};
}

export default async function BlogPostPage({ params }: Props) {
	const post = await getPostBySlug(params.slug);
	if (!post) notFound();

	const blogPostingSchema = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.headline,
		description: post.description,
		datePublished: post.publishedAt,
		dateModified: post.updatedAt,
		url: `${SITE_URL}/blog/${post.slug}`,
		inLanguage: "pt-BR",
		author: {
			"@type": "Organization",
			"@id": `${SITE_URL}#organization`,
			name: "Academia Panobianco Jardim Satélite",
		},
		publisher: { "@id": `${SITE_URL}#organization` },
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `${SITE_URL}/blog/${post.slug}`,
		},
		...(post.featuredImageSrc && {
			image: `${SITE_URL}${post.featuredImageSrc}`,
		}),
	};

	const breadcrumbSchema = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: "Início",
				item: SITE_URL,
			},
			{
				"@type": "ListItem",
				position: 2,
				name: "Blog",
				item: `${SITE_URL}/blog`,
			},
			{
				"@type": "ListItem",
				position: 3,
				name: post.headline,
				item: `${SITE_URL}/blog/${post.slug}`,
			},
		],
	};

	const howToSchema =
		post.howto && post.howto.steps?.length
			? {
					"@context": "https://schema.org",
					"@type": "HowTo",
					name: post.howto.name,
					description: post.description,
					inLanguage: "pt-BR",
					totalTime: `PT${post.readingTimeMinutes}M`,
					step: post.howto.steps.map((step, index) => ({
						"@type": "HowToStep",
						position: index + 1,
						name: step.name,
						text: step.text,
					})),
				}
			: null;

	return (
		<>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: trusted static JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(blogPostingSchema),
				}}
			/>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: trusted static JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(breadcrumbSchema),
				}}
			/>
			{howToSchema && (
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: trusted static JSON-LD
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(howToSchema),
					}}
				/>
			)}
			<BlogArticle
				headline={post.headline}
				category={post.category}
				publishedAt={post.publishedAt}
				readingTimeMinutes={post.readingTimeMinutes}
				contentHtml={post.contentHtml}
			/>
		</>
	);
}
