import Link from "next/link";
import SchedulingLink from "@/components/SchedulingLink";

export type ModalidadeFinalCtaProps = {
	title: string;
	description: string;
	accentGradient: string;
	showWhatsApp?: boolean;
};

export default function ModalidadeFinalCta({
	title,
	description,
	accentGradient,
	showWhatsApp = true,
}: ModalidadeFinalCtaProps) {
	return (
		<section className={`py-24 bg-gradient-to-br ${accentGradient}`}>
			<div className="container-main">
				<div className="max-w-3xl text-center">
					<h2 className="mb-6 text-5xl font-black italic tracking-tight text-white">
						{title}
					</h2>
					<p className="mb-12 text-xl leading-relaxed text-white/80">{description}</p>
					<div className="flex flex-col justify-center gap-4 sm:flex-row">
						<SchedulingLink className="inline-flex items-center justify-center rounded-full bg-white px-12 py-5 text-xl font-bold text-gray-900 shadow-2xl transition-all hover:scale-105 hover:bg-white/95">
							Agendar Aula Experimental
						</SchedulingLink>
						{showWhatsApp && (
							<Link
								href="https://wa.me/5512992192268"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center justify-center gap-3 rounded-full border border-white/30 bg-white/20 px-10 py-5 text-xl font-bold text-white transition-all hover:bg-white/30"
							>
								Falar no WhatsApp
							</Link>
						)}
						<Link
							href="/aulas-coletivas"
							className="inline-flex items-center justify-center rounded-full border-2 border-white px-10 py-5 text-xl font-bold text-white transition-colors hover:bg-white hover:text-gray-900"
						>
							Ver Outras Aulas
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
