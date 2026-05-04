import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type BlogPost = {
	slug: string;
	title: string;
	headline: string;
	description: string;
	publishedAt: string;
	updatedAt: string;
	category: string;
	theme: string;
	keywords: string[];
	readingTimeMinutes: number;
	featuredImageSrc: string;
	featuredImageAlt: string;
	relatedSlugs: string[];
};

export type BlogPostWithContent = BlogPost & { contentHtml: string };

const contentDir = path.join(process.cwd(), "content/blog");

export function getAllPosts(): BlogPost[] {
	const posts: BlogPost[] = [];

	const themes = fs
		.readdirSync(contentDir)
		.filter((name) =>
			fs.statSync(path.join(contentDir, name)).isDirectory(),
		);

	for (const theme of themes) {
		const themeDir = path.join(contentDir, theme);
		const files = fs
			.readdirSync(themeDir)
			.filter((f) => f.endsWith(".md"));

		for (const file of files) {
			const slug = file.replace(/\.md$/, "");
			const filePath = path.join(themeDir, file);
			const fileContents = fs.readFileSync(filePath, "utf8");
			const { data } = matter(fileContents);

			posts.push({
				slug,
				title: data.title ?? "",
				headline: data.headline ?? "",
				description: data.description ?? "",
				publishedAt: data.publishedAt ?? "",
				updatedAt: data.updatedAt ?? "",
				category: data.category ?? "",
				theme: data.theme ?? "",
				keywords: data.keywords ?? [],
				readingTimeMinutes: data.readingTimeMinutes ?? 5,
				featuredImageSrc: data.featuredImageSrc ?? "",
				featuredImageAlt: data.featuredImageAlt ?? "",
				relatedSlugs: data.relatedSlugs ?? [],
			});
		}
	}

	return posts.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export async function getPostBySlug(
	slug: string,
): Promise<BlogPostWithContent | null> {
	const themes = fs
		.readdirSync(contentDir)
		.filter((name) =>
			fs.statSync(path.join(contentDir, name)).isDirectory(),
		);

	for (const theme of themes) {
		const filePath = path.join(contentDir, theme, `${slug}.md`);
		if (!fs.existsSync(filePath)) continue;

		const fileContents = fs.readFileSync(filePath, "utf8");
		const { data, content } = matter(fileContents);

		const processedContent = await remark().use(html).process(content);
		const contentHtml = processedContent.toString();

		return {
			slug,
			title: data.title ?? "",
			headline: data.headline ?? "",
			description: data.description ?? "",
			publishedAt: data.publishedAt ?? "",
			updatedAt: data.updatedAt ?? "",
			category: data.category ?? "",
			theme: data.theme ?? "",
			keywords: data.keywords ?? [],
			readingTimeMinutes: data.readingTimeMinutes ?? 5,
			featuredImageSrc: data.featuredImageSrc ?? "",
			featuredImageAlt: data.featuredImageAlt ?? "",
			relatedSlugs: data.relatedSlugs ?? [],
			contentHtml,
		};
	}

	return null;
}
