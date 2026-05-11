import {
	ArrowRight,
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

const heroBg = "/images/fachada.png";

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
		<div className="font-display min-h-screen bg-background-dark text-white antialiased overflow-x-hidden">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(webPageSchema),
				}}
			/>
			{/* Hero */}
			<section className="relative h-[300px] w-full overflow-hidden md:h-[400px]">
				<div
					className="absolute inset-0 bg-cover bg-center"
					style={{
						backgroundImage: `linear-gradient(0deg, rgba(24, 18, 16, 1) 0%, rgba(24, 18, 16, 0.5) 60%, rgba(24, 18, 16, 0.2) 100%), url("${heroBg}")`,
					}}
				/>
				<div className="container-main relative flex h-full flex-col justify-end pb-12">
					<div className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary-500">
						<MapPin className="size-4" />
						São José dos Campos, SP
					</div>
					<h1 className="max-w-2xl text-4xl font-semibold leading-[1.1] md:text-6xl">
						Venha nos visitar no{" "}
						<span className="text-primary-500">Jardim Satélite</span>
					</h1>
				</div>
			</section>

			{/* Content Grid: Cards + Form */}
			<section className="container-main py-12">
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
					{/* Left: Address, Hours, Contact */}
					<div className="space-y-6 lg:col-span-1">
						<div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-8">
							<div className="flex size-12 items-center justify-center rounded-full bg-primary-500/10 text-primary-500">
								<MapPin className="size-6" />
							</div>
							<div>
								<h3 className="mb-2 text-xl font-bold">Nosso Endereço</h3>
								<p className="leading-relaxed text-neutral-400">
									Av. Cidade Jardim, 391 - Jardim Satélite
									<br />
									São José dos Campos - SP, 12231-675
								</p>
							</div>
							<a
								href={GOOGLE_MAPS_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="group mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 font-bold text-white transition-all hover:bg-white/10"
							>
								<ArrowRight className="size-5 text-primary-500 transition-transform group-hover:scale-110" />
								Ver no Google Maps
							</a>
						</div>

						<div className="rounded-xl border border-white/10 bg-white/5 p-8">
							<div className="mb-6 flex items-center gap-3">
								<div className="flex size-10 items-center justify-center rounded-full bg-primary-500/10 text-primary-500">
									<Clock className="size-5" />
								</div>
								<h3 className="text-xl font-bold">Funcionamento</h3>
							</div>
							<div className="space-y-4">
								<div className="flex items-center justify-between border-b border-white/5 pb-3">
									<span className="text-neutral-400">Segunda à Sexta</span>
									<span className="font-bold">06:00 - 23:00</span>
								</div>
								<div className="flex items-center justify-between border-b border-white/5 pb-3">
									<span className="text-neutral-400">Sábado</span>
									<span className="font-bold">08:00 - 18:00</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-neutral-400">Domingo</span>
									<span className="font-bold text-primary-500">
										09:00 - 14:00
									</span>
								</div>
							</div>
						</div>

						<div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-8">
							<div className="mb-2 flex items-center gap-3">
								<div className="flex size-10 items-center justify-center rounded-full bg-primary-500/10 text-primary-500">
									<Phone className="size-5" />
								</div>
								<h3 className="text-xl font-bold">Contato</h3>
							</div>
							<div className="flex flex-col gap-3">
								<a
									href={`tel:+${WHATSAPP_PHONE}`}
									className="group flex items-center gap-3 text-neutral-300 transition-colors hover:text-primary-500"
								>
									<span className="flex size-8 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-primary-500/20">
										<Phone className="size-4" />
									</span>
									{PHONE_DISPLAY}
								</a>
								<a
									href={WHATSAPP_URL}
									target="_blank"
									rel="noopener noreferrer"
									className="group flex items-center gap-3 text-neutral-300 transition-colors hover:text-green-500"
								>
									<span className="flex size-8 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-green-500/20">
										<MessageCircle className="size-4" />
									</span>
									WhatsApp Oficial
								</a>
								<div className="flex gap-2 pt-2">
									<a
										href={INSTAGRAM_URL}
										target="_blank"
										rel="noopener noreferrer"
										className="flex size-10 items-center justify-center rounded-full bg-white/5 text-white/80 transition-colors hover:bg-primary-500 hover:text-white"
										aria-label="Instagram"
									>
										<Instagram className="size-5" />
									</a>
									<a
										href={FACEBOOK_URL}
										target="_blank"
										rel="noopener noreferrer"
										className="flex size-10 items-center justify-center rounded-full bg-white/5 text-white/80 transition-colors hover:bg-primary-500 hover:text-white"
										aria-label="Facebook"
									>
										<Facebook className="size-5" />
									</a>
								</div>
							</div>
						</div>
					</div>

					{/* Right: Map + Form */}
					<div className="lg:col-span-2 flex flex-col gap-8">
						<div className="group relative h-[420px] w-full overflow-hidden rounded-xl border border-white/10 lg:h-auto lg:min-h-0 lg:flex-1">
							<Image
								src={mapImage}
								alt="Localização Panobianco Jardim Satélite"
								fill
								sizes="(max-width: 1024px) 100vw, 66vw"
								className="object-cover object-center grayscale brightness-50 contrast-125 transition-all duration-700 group-hover:brightness-75"
							/>
							<div className="absolute inset-0 flex items-center justify-center">
								<div className="relative">
									<div className="absolute inset-0 size-16 animate-ping rounded-full bg-primary-500/40" />
									<div className="relative flex size-10 items-center justify-center rounded-full border-4 border-white/10 bg-primary-500 shadow-2xl shadow-primary-500/50">
										<MapPin className="size-5 text-white" />
									</div>
									<div className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-primary-500/50 bg-white/10 px-3 py-1 text-xs font-bold">
										Panobianco Satélite
									</div>
								</div>
							</div>
						</div>

						<ContactForm />
					</div>
				</div>
			</section>

			<ContactCtaSection />
		</div>
	);
}
