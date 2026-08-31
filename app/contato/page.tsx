import {
	Clock,
	Facebook,
	Instagram,
	MapPin,
	MessageCircle,
	Phone,
} from "lucide-react";
import Image from "next/image";

import ContactCtaSection from "@/components/ContactCtaSection";
import ContactForm from "@/components/ContactForm";
import {
	FACEBOOK_URL,
	GOOGLE_MAPS_URL,
	INSTAGRAM_URL,
	PHONE_DISPLAY,
	SITE_URL,
	WHATSAPP_PHONE,
	WHATSAPP_URL,
} from "@/lib/constants";

const heroBg = "/images/fachada.webp";

const mapImage = "/images/av-cidade-jardim-391.webp";

export default function Contato() {
	const webPageSchema = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		name: "Contato | Academia Panobianco Jardim Satélite",
		description:
			"Entre em contato com a Panobianco Jardim Satélite. Endereço, horários, telefone, WhatsApp e formulário de contato.",
		url: `${SITE_URL}/contato`,
	};

	return (
		<div className="font-display min-h-screen overflow-x-hidden bg-pb-off-white text-pb-graphite antialiased">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(webPageSchema),
				}}
			/>

			{/* Hero */}
			{/* Mesma construção da home: foto limpa e o conteúdo dentro do
			    módulo hexagonal laranja encostado à direita. */}
			<section className="relative flex min-h-[85vh] items-center overflow-hidden pt-20">
				<div
					className="absolute inset-0 bg-cover bg-center"
					style={{ backgroundImage: `url("${heroBg}")` }}
				/>
				<div className="container-main relative z-10 flex w-full justify-end">
					<div className="shape-chanfrado mt-20 w-full max-w-2xl bg-pb-orange px-10 py-14 text-white lg:px-14 lg:py-16">
						<h1 className="text-[3.5rem] leading-[0.96] tracking-tight">
							Venha nos visitar no Jardim Satélite
						</h1>
						<p className="mt-6 text-[1.5rem] leading-tight">
							Av. Cidade Jardim, 391, em São José dos Campos. Chega sem
							compromisso: a gente te mostra a unidade e você sente se o clima
							combina com a sua rotina.
						</p>
					</div>
				</div>
			</section>

			{/* Endereço, horários, contato e formulário */}
			<section className="bg-pb-off-white pb-6 pt-20 lg:pb-8 lg:pt-28">
				<div className="container-main">
					<div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_3fr]">
						{/* Coluna esquerda: endereço, horários e contato */}
						<div className="space-y-8">
							<div className="card-hex-light flex flex-col px-12 py-16">
								<span className="shape-octagon-regular mb-6 flex size-12 items-center justify-center bg-pb-orange text-white">
									<MapPin className="size-6" />
								</span>
								<h2 className="mb-6 text-[3.5rem] leading-none tracking-tight">
									Nosso endereço
								</h2>
								<p className="text-[1.5rem] leading-tight text-pb-graphite/80">
									Av. Cidade Jardim, 391 - Jardim Satélite
									<br />
									São José dos Campos - SP, 12231-675
								</p>
								<a
									href={GOOGLE_MAPS_URL}
									target="_blank"
									rel="noopener noreferrer"
									className="botao-chanfrado mt-8 inline-flex items-center justify-center self-start bg-pb-orange px-6 py-3 text-sm uppercase tracking-wide text-white transition-colors hover:bg-pb-orange-warm"
								>
									Ver no Google Maps
								</a>
							</div>

							<div className="card-hex-light px-12 py-16">
								<span className="shape-octagon-regular mb-6 flex size-12 items-center justify-center bg-pb-orange text-white">
									<Clock className="size-6" />
								</span>
								<h2 className="mb-6 text-[3.5rem] leading-none tracking-tight">
									Funcionamento
								</h2>
								<div className="space-y-4">
									<div className="flex items-center justify-between border-b border-pb-graphite/15 pb-3">
										<span className="text-pb-graphite/80">Segunda à Sexta</span>
										<span>06:00 - 23:00</span>
									</div>
									<div className="flex items-center justify-between border-b border-pb-graphite/15 pb-3">
										<span className="text-pb-graphite/80">Sábado</span>
										<span>08:00 - 18:00</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-pb-graphite/80">Domingos e Feriados</span>
										<span>09:00 - 13:00</span>
									</div>
								</div>
							</div>

							<div className="card-hex-light px-12 py-16">
								<span className="shape-octagon-regular mb-6 flex size-12 items-center justify-center bg-pb-orange text-white">
									<Phone className="size-6" />
								</span>
								<h2 className="mb-6 text-[3.5rem] leading-none tracking-tight">
									Contato
								</h2>
								<div className="flex flex-col gap-4">
									<a
										href={`tel:+${WHATSAPP_PHONE}`}
										className="flex items-center gap-3 transition-colors hover:text-pb-orange-warm"
									>
										<span className="shape-octagon-regular flex size-8 items-center justify-center bg-pb-orange text-white">
											<Phone className="size-4" />
										</span>
										{PHONE_DISPLAY}
									</a>
									<a
										href={WHATSAPP_URL}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-3 transition-colors hover:text-pb-orange-warm"
									>
										<span className="shape-octagon-regular flex size-8 items-center justify-center bg-pb-orange text-white">
											<MessageCircle className="size-4" />
										</span>
										WhatsApp oficial
									</a>
									<div className="flex gap-3 pt-2">
										<a
											href={INSTAGRAM_URL}
											target="_blank"
											rel="noopener noreferrer"
											className="shape-octagon-regular flex size-10 items-center justify-center bg-pb-orange text-white transition-colors hover:bg-pb-orange-warm"
											aria-label="Instagram"
										>
											<Instagram className="size-5" />
										</a>
										<a
											href={FACEBOOK_URL}
											target="_blank"
											rel="noopener noreferrer"
											className="shape-octagon-regular flex size-10 items-center justify-center bg-pb-orange text-white transition-colors hover:bg-pb-orange-warm"
											aria-label="Facebook"
										>
											<Facebook className="size-5" />
										</a>
									</div>
								</div>
							</div>
						</div>

						{/* Coluna direita: mapa e formulário */}
						<div className="flex flex-col gap-8">
							<div className="shape-chanfrado group relative h-[420px] w-full lg:h-auto lg:min-h-0 lg:flex-1">
								<Image
									src={mapImage}
									alt="Localização Panobianco Jardim Satélite"
									fill
									sizes="(max-width: 1024px) 100vw, 66vw"
									className="object-cover object-center opacity-80 grayscale transition-all duration-700 group-hover:opacity-100 group-hover:grayscale-0"
								/>
								<div className="botao-chanfrado absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 bg-pb-orange p-4 text-white">
									<MapPin className="size-6" />
									<div className="text-xs leading-none">
										ENCONTRE-NOS AQUI
										<br />
										<span className="text-[10px] opacity-80">
											Jardim Satélite, SJC
										</span>
									</div>
								</div>
							</div>

							<ContactForm />
						</div>
					</div>
				</div>
			</section>

			<ContactCtaSection />
		</div>
	);
}
