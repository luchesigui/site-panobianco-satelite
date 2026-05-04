import Link from "next/link";

import type { BlogPost } from "@/lib/blog";

type Props = { post: BlogPost };

export default function BlogCard({ post }: Props) {
	const date = new Date(post.publishedAt).toLocaleDateString("pt-BR", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});

	return (
		<Link href={`/blog/${post.slug}`} className="group block h-full">
			<article className="glass-card flex h-full flex-col rounded-2xl p-6 transition-all hover:border-primary-500/50">
				<div className="mb-3">
					<span className="inline-block rounded-full border border-primary-500/20 bg-primary-500/10 px-3 py-1 text-xs font-semibold text-primary-500">
						{post.category}
					</span>
				</div>
				<h2 className="mb-3 line-clamp-2 text-lg font-bold text-white transition-colors group-hover:text-primary-500">
					{post.headline}
				</h2>
				<p className="mb-4 line-clamp-3 flex-1 text-sm text-gray-400">
					{post.description}
				</p>
				<div className="flex items-center gap-2 text-xs text-gray-500">
					<time dateTime={post.publishedAt}>{date}</time>
					<span>·</span>
					<span>{post.readingTimeMinutes} min de leitura</span>
				</div>
			</article>
		</Link>
	);
}
