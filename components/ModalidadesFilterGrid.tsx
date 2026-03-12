"use client";

import {
	Activity,
	ArrowRight,
	Flower2,
	Music,
	Shield,
	Target,
	Zap,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

type CategoryId = "todos" | "forca" | "cardio" | "mente-corpo" | "danca";

const ICON_MAP = {
	activity: Activity,
	flower2: Flower2,
	music: Music,
	shield: Shield,
	target: Target,
	zap: Zap,
} as const;

export type ClassItem = {
	name: string;
	slug: string;
	icon: keyof typeof ICON_MAP;
	categories: readonly string[];
	description: string;
	benefits: string[];
	color: string;
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
	const [selectedCategory, setSelectedCategory] =
		useState<CategoryId>("todos");

	const filteredClasses = useMemo(
		() => filterByCategory(classes, selectedCategory),
		[classes, selectedCategory],
	);

	return (
		<>
			{/* Category pills */}
			<div className="container-main flex gap-3 overflow-x-auto pb-8 scrollbar-hide">
				{categories.map((cat) => {
					const isActive = selectedCategory === cat.id;
					return (
						<button
							key={cat.id}
							type="button"
							onClick={() => setSelectedCategory(cat.id)}
							className={`flex h-10 shrink-0 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-all duration-300 ${
								isActive
									? "bg-primary-500 font-bold text-white shadow-lg shadow-primary-500/25"
									: "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white/90"
							}`}
						>
							{cat.label}
						</button>
					);
				})}
			</div>

			{/* Grid with animated cards */}
			<section
				className="container-main grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
				id="grade"
			>
				{filteredClasses.map((classItem, index) => {
					const IconComponent = ICON_MAP[classItem.icon];
					return (
						<Link
							key={`${classItem.slug}-${classItem.name}`}
							href={`/aulas-coletivas/${classItem.slug}`}
							className="group flex flex-col overflow-hidden rounded-xl border border-white/5 bg-white/5 opacity-0 transition-all hover:border-white/20 hover:bg-white/10 animate-modalidade-in"
							style={{ animationDelay: `${index * 50}ms` }}
						>
							<div className="flex flex-col gap-4 p-6">
								<div className="flex items-start justify-between">
									<div
										className={`flex size-10 items-center justify-center rounded-lg ${classItem.color}`}
									>
										<IconComponent className="size-5" />
									</div>
									<ArrowRight className="size-5 text-primary-500" />
								</div>
								<div className="flex flex-col gap-2">
									<h3 className="text-2xl font-bold text-white">
										{classItem.name}
									</h3>
									<p className="text-sm leading-relaxed text-white/60">
										{classItem.description}
									</p>
									<ul className="mt-2 flex flex-col gap-1 text-xs text-white/40">
										{classItem.benefits.map((benefit) => (
											<li key={benefit} className="flex items-center gap-2">
												<div className="size-1 rounded-full bg-primary-500" />
												{benefit}
											</li>
										))}
									</ul>
								</div>
								<span className="mt-2 w-full rounded-full border border-white/5 bg-white/10 py-3 text-center text-sm font-bold text-white transition-colors group-hover:bg-primary-500">
									Saiba mais
								</span>
							</div>
						</Link>
					);
				})}
			</section>
		</>
	);
}
