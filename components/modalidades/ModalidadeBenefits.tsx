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
};

export default function ModalidadeBenefits({
	title,
	subtitle,
	benefits,
}: ModalidadeBenefitsProps) {
	return (
		// Mesma faixa da seção "Aqui, o básico é bem feito." da home:
		// superfície grená com os cards laranja em degradê por cima.
		<section className="bg-pb-grena py-20 lg:py-28">
			<div className="container-main">
				<div className="mb-[7.5rem] text-center">
					<h2 className="font-display text-[3.5rem] leading-none text-white">
						{title}
					</h2>
					{subtitle && (
						<p className="mx-auto mt-6 max-w-2xl text-[1.5rem] leading-tight text-white/80">
							{subtitle}
						</p>
					)}
				</div>
				<div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(min(520px,100%),1fr))]">
					{benefits.map((b) => {
						const Icon = b.icon;
						return (
							<div
								key={b.title}
								className="card-hex-orange font-display px-12 py-16 text-white"
							>
								<span className="shape-octagon-regular mb-6 flex size-12 items-center justify-center bg-white/20 text-white">
									<Icon className="size-6" />
								</span>
								<h3 className="mb-6 text-[3.5rem] leading-none tracking-tight">
									{b.title}
								</h3>
								<p className="text-[1.5rem] leading-tight text-white/90">
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
