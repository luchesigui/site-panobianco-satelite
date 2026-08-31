"use client";

import Link from "next/link";

import { trackWhatsappClicked } from "@/lib/analytics";
import { WHATSAPP_AULA_EXPERIMENTAL, WHATSAPP_URL } from "@/lib/constants";

export default function ContactCtaSection() {
	return (
		<section className="pb-20 pt-6 lg:pb-28 lg:pt-8">
			<div className="container-main">
				{/* Mesmo módulo do banner do quiz: hexágono completo, cor chapada,
				    tudo empilhado numa coluna. */}
				<div className="shape-chanfrado relative bg-pb-orange px-10 pb-14 pt-10 text-white md:px-16 md:pb-20 md:pt-14">
					<div className="relative">
						<h2 className="font-display text-[3.5rem] leading-[0.96] tracking-tight text-white">
							Um passo de cada vez, até não parar mais.
						</h2>
						<p className="mt-6 text-[1.5rem] leading-tight text-white">
							A primeira aula é por nossa conta, sem compromisso e sem
							burocracia na recepção. Venha conhecer a unidade Jardim Satélite,
							fazer um treino do seu jeito e sentir se o clima combina com a sua
							rotina. Se combinar, a gente continua daqui.
						</p>

						<div className="mt-8 flex flex-col gap-4 sm:flex-row">
							<Link
								href={WHATSAPP_AULA_EXPERIMENTAL}
								target="_blank"
								rel="noopener noreferrer"
								onClick={() =>
									trackWhatsappClicked("cta_section_aula", "aula_experimental")
								}
								className="botao-chanfrado inline-flex items-center justify-center bg-white px-8 py-4 text-sm uppercase tracking-wide text-pb-orange-warm transition-colors hover:bg-pb-off-white"
							>
								Solicitar Aula Grátis
							</Link>
							<Link
								href={WHATSAPP_URL}
								target="_blank"
								rel="noopener noreferrer"
								onClick={() =>
									trackWhatsappClicked("cta_section_whatsapp", "support")
								}
								className="botao-chanfrado inline-flex items-center justify-center bg-pb-black px-8 py-4 text-sm uppercase tracking-wide text-white transition-colors hover:bg-pb-grena"
							>
								Falar no WhatsApp
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
