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
			{/* O chanfro de topo come 72px, então o padding superior precisa
			    passar do que sobra para o selo não ser cortado na diagonal. */}
			<article className="card-hex-light flex h-full flex-col px-12 py-16">
				<div className="mb-4">
					<span className="selo-chanfrado inline-block bg-pb-orange px-3 py-1 text-xs text-white">
						{post.category}
					</span>
				</div>
				<h2 className="mb-3 line-clamp-2 text-[3.5rem] leading-none tracking-tight transition-colors group-hover:text-pb-orange-warm">
					{post.headline}
				</h2>
				<p className="mb-6 line-clamp-3 flex-1 text-[1.5rem] leading-tight text-pb-graphite/80">
					{post.description}
				</p>
				<div className="flex items-center gap-2 text-xs text-pb-graphite/60">
					<time dateTime={post.publishedAt}>{date}</time>
					<span>·</span>
					<span>{post.readingTimeMinutes} min de leitura</span>
				</div>
			</article>
		</Link>
	);
}
