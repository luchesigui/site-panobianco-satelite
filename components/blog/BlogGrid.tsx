"use client";

import { useState } from "react";

import BlogCard from "@/components/blog/BlogCard";
import type { BlogPost } from "@/lib/blog";

const PAGE_SIZE = 9;

export default function BlogGrid({ posts }: { posts: BlogPost[] }) {
	const [visible, setVisible] = useState(PAGE_SIZE);

	const hasMore = visible < posts.length;

	return (
		<div>
			<div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(min(500px,100%),1fr))]">
				{posts.slice(0, visible).map((post) => (
					<BlogCard key={post.slug} post={post} />
				))}
			</div>

			{hasMore && (
				<div className="mt-12 text-center">
					<button
						type="button"
						onClick={() => setVisible((v) => v + PAGE_SIZE)}
						className="botao-chanfrado inline-flex items-center justify-center bg-pb-orange px-8 py-4 text-sm uppercase tracking-wide text-white transition-colors hover:bg-pb-orange-warm"
					>
						Leia mais
					</button>
					<p className="mt-3 text-xs text-pb-graphite/60">
						{Math.min(visible, posts.length)} de {posts.length} artigos
					</p>
				</div>
			)}
		</div>
	);
}
