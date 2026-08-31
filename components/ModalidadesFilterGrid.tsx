"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type CategoryId = "todos" | "forca" | "cardio" | "mente-corpo" | "danca";

export type ClassItem = {
	name: string;
	slug: string;
	categories: readonly string[];
	description: string;
	benefits: string[];
};

type CategoryOption = { id: CategoryId; label: string };

type Props = {
	classes: ClassItem[];
	categories: readonly CategoryOption[];
};

function filterByCategory(
	classes: ClassItem[],
	categoryId: CategoryId,
): ClassItem[] {
	if (categoryId === "todos") return [...classes];
	return classes.filter((c) =>
		(c.categories as readonly string[]).includes(categoryId),
	);
}

export function ModalidadesFilterGrid({ classes, categories }: Props) {
	const [selectedCategory, setSelectedCategory] = useState<CategoryId>("todos");

	const filteredClasses = useMemo(
		() => filterByCategory(classes, selectedCategory),
		[classes, selectedCategory],
	);

	return (
		<>
			{/* Filtros de categoria */}
			<div className="container-main flex gap-3 overflow-x-auto pb-10 scrollbar-hide">
				{categories.map((cat) => {
					const isActive = selectedCategory === cat.id;
					return (
						<button
							key={cat.id}
							type="button"
							onClick={() => setSelectedCategory(cat.id)}
							className={`botao-chanfrado-nav flex h-11 shrink-0 items-center justify-center px-6 text-sm uppercase tracking-wide transition-colors ${
								isActive
									? "bg-pb-orange text-white"
									: "bg-white text-pb-graphite hover:bg-pb-orange hover:text-white"
							}`}
						>
							{cat.label}
						</button>
					);
				})}
			</div>

			{/* Grade animada */}
			<section
				className="container-main grid gap-8 grid-cols-[repeat(auto-fit,minmax(min(350px,100%),1fr))]"
				id="grade"
			>
				{/* O chanfro de topo come 72px: o padding superior precisa passar
				    do que sobra para o título não ser cortado. */}
				{filteredClasses.map((classItem, index) => (
					<Link
						key={`${classItem.slug}-${classItem.name}`}
						href={`/aulas-coletivas/${classItem.slug}`}
						className="card-hex-light group flex animate-modalidade-in flex-col px-12 py-16 opacity-0"
						style={{ animationDelay: `${index * 50}ms` }}
					>
						<h3 className="mb-6 text-[3.5rem] leading-none tracking-tight">
							{classItem.name}
						</h3>
						<p className="text-[1.5rem] leading-tight text-pb-graphite/80">
							{classItem.description}
						</p>
						<ul className="mt-4 flex flex-col gap-2 text-sm text-pb-graphite/70">
							{classItem.benefits.map((benefit) => (
								<li key={benefit} className="flex items-center gap-3">
									<span className="size-1.5 shrink-0 bg-pb-orange" />
									{benefit}
								</li>
							))}
						</ul>
						<span className="botao-chanfrado mt-8 inline-flex items-center self-start bg-pb-orange px-6 py-3 text-sm uppercase tracking-wide text-white transition-colors group-hover:bg-pb-orange-warm">
							Saiba mais
						</span>
					</Link>
				))}
			</section>
		</>
	);
}
