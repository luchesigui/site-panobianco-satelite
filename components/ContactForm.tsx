"use client";

import { Send } from "lucide-react";
import { useState } from "react";

import { trackContactFormSubmitted } from "@/lib/analytics";

function formatPhone(value: string): string {
	const digits = value.replace(/\D/g, "").slice(0, 11);
	if (digits.length <= 2) return digits ? `(${digits}` : "";
	if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
	if (digits.length <= 10)
		return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
	return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export default function ContactForm() {
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
				trackContactFormSubmitted(true);
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
				trackContactFormSubmitted(false);
				setSubmitMessage(
					data.error || "Erro ao enviar mensagem. Tente novamente.",
				);
			}
		} catch {
			trackContactFormSubmitted(false);
			setSubmitMessage("Erro ao enviar mensagem. Tente novamente.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const updateFormField = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		const nextValue =
			name === "telefone" ? formatPhone(value) : value;
		setFormData((prev) => ({ ...prev, [name]: nextValue }));
	};

	return (
		<article className="rounded-xl border border-white/10 bg-white/5 p-6">
			<h2 className="text-2xl font-semibold">Envie sua Mensagem</h2>
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
						onChange={updateFormField}
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
						onChange={updateFormField}
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
						onChange={updateFormField}
						className="w-full rounded-lg border border-white/15 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none"
						placeholder="(12) 99999-9999"
						disabled={isSubmitting}
					/>
					<input
						type="text"
						id="assunto"
						name="assunto"
						value={formData.assunto}
						onChange={updateFormField}
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
					onChange={updateFormField}
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
	);
}
