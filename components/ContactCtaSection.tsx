"use client";

import Link from "next/link";

import { WHATSAPP_AULA_EXPERIMENTAL, WHATSAPP_URL } from "@/lib/constants";

export default function ContactCtaSection() {

	return (
		<section className="bg-background-dark py-16">
			<div className="container-main">
				<div className="rounded-2xl bg-gradient-to-r from-primary-500 to-primary-500/90 p-8 shadow-xl shadow-primary-500/20 md:p-12">
					<div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
						<div>
							<h2 className="font-display text-3xl font-black uppercase italic text-white">
								Pronto para começar?
							</h2>
							<p className="mt-2 max-w-2xl text-base text-white/90">
								Visite nossa unidade hoje mesmo e faça uma aula experimental
								gratuita.
							</p>
						</div>

						<div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
							<Link
								href={WHATSAPP_AULA_EXPERIMENTAL}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-primary-500 transition-colors hover:bg-white/95"
							>
								Solicitar Aula Grátis
							</Link>
							<Link
								href={WHATSAPP_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex h-12 items-center justify-center rounded-full border border-white/30 bg-black/15 px-6 text-sm font-bold text-white transition-colors hover:bg-black/25"
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
