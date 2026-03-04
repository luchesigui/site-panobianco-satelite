"use client";

import {
	ArrowRight,
	Clock,
	Facebook,
	Instagram,
	MapPin,
	MessageCircle,
	Phone,
	Send,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import ContactCtaSection from "@/components/ContactCtaSection";
import {
	FACEBOOK_URL,
	GOOGLE_MAPS_URL,
	INSTAGRAM_URL,
	PHONE_DISPLAY,
	WHATSAPP_PHONE,
	WHATSAPP_URL,
} from "@/lib/constants";

const heroBg = "/images/fachada.png";

const mapImage = "/images/av-cidade-jardim-391.webp";

export default function Contato() {
	const [formData, setFormData] = useState({
		nome: "",
		email: "",
		telefone: "",
		assunto: "",
		mensagem: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitMessage, setSubmitMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitMessage("");

		try {
			const response = await fetch("/api/contact/", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			const data = await response.json();
			if (response.ok) {
				setSubmitMessage(
					"Mensagem enviada com sucesso! Entraremos em contato em breve.",
				);
				setFormData({
					nome: "",
					email: "",
					telefone: "",
					assunto: "",
					mensagem: "",
				});
			} else {
				setSubmitMessage(
					data.error || "Erro ao enviar mensagem. Tente novamente.",
				);
			}
		} catch {
			setSubmitMessage("Erro ao enviar mensagem. Tente novamente.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	return (
		<div className="font-display min-h-screen bg-background-dark text-white antialiased overflow-x-hidden">
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
					<h1 className="max-w-2xl text-4xl font-black leading-[1.1] md:text-6xl">
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
								<p className="leading-relaxed text-gray-400">
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
									<span className="text-gray-400">Segunda à Sexta</span>
									<span className="font-bold">06:00 - 23:00</span>
								</div>
								<div className="flex items-center justify-between border-b border-white/5 pb-3">
									<span className="text-gray-400">Sábado</span>
									<span className="font-bold">08:00 - 18:00</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-gray-400">Domingo</span>
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
									className="group flex items-center gap-3 text-gray-300 transition-colors hover:text-primary-500"
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
									className="group flex items-center gap-3 text-gray-300 transition-colors hover:text-green-500"
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

						<article className="rounded-xl border border-white/10 bg-white/5 p-6">
							<h2 className="text-2xl font-black">Envie sua Mensagem</h2>
							<p className="mt-2 text-sm text-white/65">
								Preencha os dados e nossa equipe retorna o mais rápido possível.
							</p>

							<form onSubmit={handleSubmit} className="mt-6 space-y-4">
								<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
									<input
										type="text"
										id="nome"
										name="nome"
										required
										value={formData.nome}
										onChange={handleChange}
										className="w-full rounded-lg border border-white/15 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none"
										placeholder="Nome completo"
										disabled={isSubmitting}
									/>
									<input
										type="email"
										id="email"
										name="email"
										required
										value={formData.email}
										onChange={handleChange}
										className="w-full rounded-lg border border-white/15 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none"
										placeholder="E-mail"
										disabled={isSubmitting}
									/>
								</div>
								<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
									<input
										type="tel"
										id="telefone"
										name="telefone"
										value={formData.telefone}
										onChange={handleChange}
										className="w-full rounded-lg border border-white/15 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none"
										placeholder="Telefone"
										disabled={isSubmitting}
									/>
									<input
										type="text"
										id="assunto"
										name="assunto"
										value={formData.assunto}
										onChange={handleChange}
										className="w-full rounded-lg border border-white/15 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none"
										placeholder="Assunto"
										disabled={isSubmitting}
									/>
								</div>
								<textarea
									id="mensagem"
									name="mensagem"
									required
									rows={6}
									value={formData.mensagem}
									onChange={handleChange}
									className="w-full resize-none rounded-lg border border-white/15 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none"
									placeholder="Mensagem"
									disabled={isSubmitting}
								/>
								<button
									type="submit"
									className="inline-flex h-12 items-center justify-center rounded-full bg-primary-500 px-6 text-sm font-bold text-white transition-colors hover:bg-primary-500/90 disabled:opacity-70"
									disabled={isSubmitting}
								>
									<Send className="mr-2 size-4" />
									{isSubmitting ? "Enviando..." : "Enviar Mensagem"}
								</button>
								{submitMessage && (
									<p
										className={`rounded-lg border px-4 py-3 text-sm ${
											submitMessage.includes("sucesso")
												? "border-green-400/40 bg-green-500/15 text-green-200"
												: "border-red-400/40 bg-red-500/15 text-red-200"
										}`}
									>
										{submitMessage}
									</p>
								)}
							</form>
						</article>
					</div>
				</div>
			</section>

			<ContactCtaSection />
		</div>
	);
}
