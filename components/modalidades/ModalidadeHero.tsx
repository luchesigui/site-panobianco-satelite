import Image from "next/image";
import Link from "next/link";

import SchedulingLink from "@/components/SchedulingLink";

export type ModalidadeHeroProps = {
	title: string;
	titleHighlight?: string;
	subtitle?: string;
	description: string;
	heroImageSrc: string;
	stats?: { value: string; label: string }[];
};

export default function ModalidadeHero({
	title,
	titleHighlight,
	subtitle,
	description,
	heroImageSrc,
	stats,
}: ModalidadeHeroProps) {
	return (
		// Mesma construção da home: foto limpa, sem véu, e todo o conteúdo
		// dentro do módulo hexagonal laranja encostado à direita.
		<section className="relative flex min-h-screen items-center overflow-hidden pt-20">
			<div className="absolute inset-0 z-0">
				<Image
					src={heroImageSrc}
					alt=""
					fill
					className="object-cover object-center"
					priority
					sizes="100vw"
				/>
			</div>

			<div className="container-main relative z-10 flex w-full justify-end">
				<div className="shape-chanfrado mt-20 w-full max-w-2xl bg-pb-orange px-10 py-14 text-white lg:px-14 lg:py-16">
					<h1 className="mb-6 text-[3.5rem] leading-[0.96] tracking-tight">
						{title}
						{titleHighlight != null && <> {titleHighlight}</>}
					</h1>
					{subtitle && (
						<p className="mb-2 text-[1.5rem] leading-tight">{subtitle}</p>
					)}
					<p className="text-[1.5rem] leading-tight">{description}</p>
					<div className="mt-8 flex flex-col gap-4 sm:flex-row">
						<SchedulingLink className="botao-chanfrado inline-flex items-center justify-center bg-white px-8 py-4 text-sm uppercase tracking-wide text-pb-orange-warm transition-colors hover:bg-pb-off-white">
							Agendar aula experimental
						</SchedulingLink>
						<Link
							href="/aulas-coletivas"
							className="botao-chanfrado inline-flex items-center justify-center bg-pb-black px-8 py-4 text-sm uppercase tracking-wide text-white transition-colors hover:bg-pb-grena"
						>
							Ver outras aulas
						</Link>
					</div>
					{stats && stats.length > 0 && (
						<div className="mt-10 flex flex-wrap items-center gap-10">
							{stats.map((s) => (
								<div key={s.label} className="flex flex-col">
									<span className="text-[1.5rem] leading-none">{s.value}</span>
									<span className="mt-1 text-xs uppercase tracking-widest text-white/80">
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
