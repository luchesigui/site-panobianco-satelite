import type { LucideIcon } from "lucide-react";

export type BenefitItem = {
	title: string;
	description: string;
	icon: LucideIcon;
};

export type ModalidadeBenefitsProps = {
	title: string;
	subtitle?: string;
	benefits: BenefitItem[];
	accentClass: string;
};

export default function ModalidadeBenefits({
	title,
	subtitle,
	benefits,
	accentClass,
}: ModalidadeBenefitsProps) {
	return (
		<section className="border-y border-white/5 bg-white/[0.02] py-24">
			<div className="container-main">
				<div className="mb-16 text-center">
					<h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
						{title}
					</h2>
					{subtitle && (
						<p className="mx-auto mt-4 max-w-xl text-white/60">{subtitle}</p>
					)}
				</div>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
					{benefits.map((b) => {
						const Icon = b.icon;
						return (
							<div
								key={b.title}
								className="glass-card group rounded-2xl p-8 transition-all hover:border-primary-500/50"
							>
								<div className="mb-6 flex size-14 items-center justify-center rounded-full bg-primary-500/10 transition-colors group-hover:bg-primary-500">
									<Icon className="size-7 text-primary-500 transition-colors group-hover:text-white" />
								</div>
								<h3 className="mb-3 text-xl font-bold text-white">{b.title}</h3>
								<p className="text-sm leading-relaxed text-white/60">
									{b.description}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
