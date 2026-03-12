import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import SchedulingLink from "@/components/SchedulingLink";

export type ModalidadeHeroProps = {
	badge?: string;
	title: string;
	titleHighlight?: string;
	subtitle?: string;
	description: string;
	accentGradient: string;
	icon?: LucideIcon;
	heroImageSrc?: string;
	stats?: { value: string; label: string }[];
};

export default function ModalidadeHero({
	badge,
	title,
	titleHighlight,
	subtitle,
	description,
	accentGradient,
	icon: Icon,
	heroImageSrc,
	stats,
}: ModalidadeHeroProps) {
	return (
		<section className="relative flex min-h-[85vh] items-end overflow-hidden pt-32 pb-20">
			{heroImageSrc && (
				<>
					<div className="absolute inset-0 z-0">
						<Image
							src={heroImageSrc}
							alt=""
							fill
							className="object-cover object-center"
							priority
							sizes="(max-width: 1280px) 100vw, 1280px"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent" />
					</div>
				</>
			)}
			{!heroImageSrc && (
				<div className={`absolute inset-0 z-0 bg-gradient-to-br ${accentGradient}`} />
			)}

			<div className="container-main relative z-10 w-full">
				<div className="max-w-2xl">
					{!heroImageSrc && Icon && (
						<div className="mb-6 flex justify-center">
							<div className="flex size-20 items-center justify-center rounded-full bg-white/20">
								<Icon className="size-10 text-white" />
							</div>
						</div>
					)}
					{badge && (
						<span className="mb-6 inline-block rounded-full border border-primary-500/30 bg-primary-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-500">
							{badge}
						</span>
					)}
					<h1 className="mb-6 text-6xl font-black uppercase leading-tight tracking-tighter text-white md:text-8xl">
						{title}
						{titleHighlight != null && (
							<>
								{" "}
								<span className="italic text-primary-500">{titleHighlight}</span>
							</>
						)}
					</h1>
					{subtitle && (
						<p className="mb-2 text-lg text-white/90">{subtitle}</p>
					)}
					<p className="mb-8 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
						{description}
					</p>
					<div className="flex flex-col gap-4 sm:flex-row">
						<SchedulingLink className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-500 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-primary-500/20 transition-all hover:bg-primary-500/90">
							Agendar Aula Experimental
						</SchedulingLink>
						<a
							href="/aulas-coletivas"
							className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
						>
							Ver Outras Aulas
						</a>
					</div>
					{stats && stats.length > 0 && (
						<div className="mt-10 flex flex-wrap items-center gap-6">
							{stats.map((s) => (
								<div key={s.label} className="flex flex-col">
									<span className="text-2xl font-black text-white md:text-3xl">
										{s.value}
									</span>
									<span className="text-xs font-bold uppercase tracking-widest text-primary-500">
										{s.label}
									</span>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
