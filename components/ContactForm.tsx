"use client";

import { Send } from "lucide-react";
import { useState } from "react";

import { trackContactFormSubmitted } from "@/lib/analytics";

// Campos sem raio nem chanfro: o brandbook não usa cantos arredondados e o
// clip-path cortaria a borda e o anel de foco.
const INPUT_CLASS =
	"w-full border border-pb-graphite/25 bg-white px-4 py-3 text-pb-graphite placeholder:text-pb-graphite/50 focus:border-pb-orange focus:outline-none disabled:opacity-60";

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
		const nextValue = name === "telefone" ? formatPhone(value) : value;
		setFormData((prev) => ({ ...prev, [name]: nextValue }));
	};

	return (
		<article className="card-hex-light px-12 py-16">
			<h2 className="text-[3.5rem] leading-none tracking-tight">
				Envie sua mensagem
			</h2>
			<p className="mt-2 text-[1.5rem] leading-tight text-pb-graphite/80">
				Preencha os dados e nossa equipe retorna o mais rápido possível.
			</p>

			<form onSubmit={handleSubmit} className="mt-8 space-y-4">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<input
						type="text"
						id="nome"
						name="nome"
						required
						value={formData.nome}
						onChange={updateFormField}
						className={INPUT_CLASS}
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
						className={INPUT_CLASS}
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
						className={INPUT_CLASS}
						placeholder="(12) 99999-9999"
						disabled={isSubmitting}
					/>
					<input
						type="text"
						id="assunto"
						name="assunto"
						value={formData.assunto}
						onChange={updateFormField}
						className={INPUT_CLASS}
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
					className={`${INPUT_CLASS} resize-none`}
					placeholder="Mensagem"
					disabled={isSubmitting}
				/>
				<button
					type="submit"
					className="botao-chanfrado inline-flex items-center justify-center bg-pb-orange px-8 py-4 text-sm uppercase tracking-wide text-white transition-colors hover:bg-pb-orange-warm disabled:opacity-70"
					disabled={isSubmitting}
				>
					<Send className="mr-2 size-4" />
					{isSubmitting ? "Enviando..." : "Enviar mensagem"}
				</button>
				{submitMessage && (
					<p
						className={`border px-4 py-3 text-sm ${
							submitMessage.includes("sucesso")
								? "border-green-700/40 bg-green-700/10 text-green-800"
								: "border-pb-orange-warm/40 bg-pb-orange-warm/10 text-pb-orange-warm"
						}`}
					>
						{submitMessage}
					</p>
				)}
			</form>
		</article>
	);
}
