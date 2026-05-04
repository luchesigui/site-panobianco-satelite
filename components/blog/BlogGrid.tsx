"use client";

import { useState } from "react";

import type { BlogPost } from "@/lib/blog";
import BlogCard from "@/components/blog/BlogCard";

const PAGE_SIZE = 9;

export default function BlogGrid({ posts }: { posts: BlogPost[] }) {
	const [visible, setVisible] = useState(PAGE_SIZE);

	const hasMore = visible < posts.length;

	return (
		<div>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{posts.slice(0, visible).map((post) => (
					<BlogCard key={post.slug} post={post} />
				))}
			</div>

			{hasMore && (
				<div className="mt-12 text-center">
					<button
						type="button"
						onClick={() => setVisible((v) => v + PAGE_SIZE)}
						className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm font-bold text-white transition-all hover:border-primary-500/50 hover:bg-primary-500/10 hover:text-primary-500"
					>
						Leia mais
					</button>
					<p className="mt-3 text-xs text-white/30">
						{Math.min(visible, posts.length)} de {posts.length} artigos
					</p>
				</div>
			)}
		</div>
	);
}
