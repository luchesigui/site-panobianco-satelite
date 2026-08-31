"use client";

import { Upload } from "lucide-react";
import { useState } from "react";

import { trackWorkWithUsFormSubmitted } from "@/lib/analytics";

function formatPhone(value: string): string {
	const digits = value.replace(/\D/g, "").slice(0, 11);
	if (digits.length <= 2) return digits ? `(${digits}` : "";
	if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
	if (digits.length <= 10)
		return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
	return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

// Campos sem raio nem chanfro: o brandbook não usa cantos arredondados e o
// clip-path cortaria a borda e o anel de foco.
const INPUT_CLASS =
	"w-full border border-pb-graphite/25 bg-white px-4 py-3 text-pb-graphite placeholder:text-pb-graphite/50 focus:border-pb-orange focus:outline-none disabled:opacity-60";

export default function WorkWithUsForm() {
	const [formData, setFormData] = useState({
		nome: "",
		email: "",
		telefone: "",
		area: "",
	});
	const [curriculo, setCurriculo] = useState<File | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitMessage, setSubmitMessage] = useState("");

	const updateFormField = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const nextValue = name === "telefone" ? formatPhone(value) : value;
		setFormData((prev) => ({ ...prev, [name]: nextValue }));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		if (file) {
			const ext = file.name.split(".").pop()?.toLowerCase();
			const isAllowedExt = ext && ["pdf", "doc", "docx"].includes(ext);
			const isAllowedMime = [
				"application/pdf",
				"application/msword",
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			].includes(file.type);

			if (!isAllowedExt && !isAllowedMime) {
				setSubmitMessage(
					"Formato de arquivo inválido. Apenas PDF, DOC ou DOCX são aceitos.",
				);
				setCurriculo(null);
				e.target.value = ""; // Reset input value
				return;
			}

			if (file.size > 5 * 1024 * 1024) {
				setSubmitMessage("O tamanho do currículo não pode exceder 5MB.");
				setCurriculo(null);
				e.target.value = ""; // Reset input value
				return;
			}

			// Clear file-related error messages if everything is correct
			if (
				submitMessage.includes("arquivo") ||
				submitMessage.includes("tamanho") ||
				submitMessage.includes("currículo")
			) {
				setSubmitMessage("");
			}
		}
		setCurriculo(file);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (
			!formData.nome ||
			!formData.email ||
			!formData.telefone ||
			!formData.area ||
			!curriculo
		) {
			setSubmitMessage(
				"Por favor, preencha todos os campos e anexe seu currículo.",
			);
			return;
		}

		setIsSubmitting(true);
		setSubmitMessage("");

		try {
			const dataToSend = new FormData();
			dataToSend.append("nome", formData.nome);
			dataToSend.append("email", formData.email);
			dataToSend.append("telefone", formData.telefone);
			dataToSend.append("area", formData.area);
			dataToSend.append("curriculo", curriculo);

			const response = await fetch("/api/work-with-us/", {
				method: "POST",
				body: dataToSend,
			});

			const data = await response.json();
			if (response.ok) {
				trackWorkWithUsFormSubmitted(true);
				setSubmitMessage(
					"Currículo enviado com sucesso! Agradecemos o seu interesse em fazer parte da nossa equipe.",
				);
				setFormData({
					nome: "",
					email: "",
					telefone: "",
					area: "",
				});
				setCurriculo(null);
				const fileInput = document.getElementById(
					"curriculo",
				) as HTMLInputElement;
				if (fileInput) {
					fileInput.value = "";
				}
			} else {
				trackWorkWithUsFormSubmitted(false);
				setSubmitMessage(
					data.error || "Erro ao enviar currículo. Tente novamente.",
				);
			}
		} catch {
			trackWorkWithUsFormSubmitted(false);
			setSubmitMessage("Erro ao enviar currículo. Tente novamente.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<article className="card-hex-light px-12 py-16">
			<h2 className="text-[3.5rem] leading-none tracking-tight">
				Envie seu currículo
			</h2>
			<p className="mt-2 text-[1.5rem] leading-tight text-pb-graphite/80">
				Preencha seus dados e anexe seu currículo nos formatos PDF, DOC ou DOCX
				de no máximo 5MB.
			</p>

			<form onSubmit={handleSubmit} className="mt-8 space-y-4">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="nome"
							className="text-xs uppercase tracking-wider text-pb-graphite/70"
						>
							Nome Completo <span className="text-pb-orange-warm">*</span>
						</label>
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
					</div>
					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="email"
							className="text-xs uppercase tracking-wider text-pb-graphite/70"
						>
							E-mail <span className="text-pb-orange-warm">*</span>
						</label>
						<input
							type="email"
							id="email"
							name="email"
							required
							value={formData.email}
							onChange={updateFormField}
							className={INPUT_CLASS}
							placeholder="seu.email@exemplo.com"
							disabled={isSubmitting}
						/>
					</div>
				</div>

				{/* Telefone */}
				<div className="flex flex-col gap-1.5">
					<label
						htmlFor="telefone"
						className="text-xs uppercase tracking-wider text-pb-graphite/70"
					>
						Telefone / WhatsApp <span className="text-pb-orange-warm">*</span>
					</label>
					<input
						type="tel"
						id="telefone"
						name="telefone"
						required
						value={formData.telefone}
						onChange={updateFormField}
						className={INPUT_CLASS}
						placeholder="(12) 99999-9999"
						disabled={isSubmitting}
					/>
				</div>

				{/* Área de Interesse */}
				{/* Grupo de rádios: o rótulo do conjunto é a <legend> do
				    <fieldset>, não um <label> solto sem controle associado. */}
				<fieldset className="flex flex-col gap-3">
					<legend className="mb-3 text-xs uppercase tracking-wider text-pb-graphite/70">
						Área de Interesse <span className="text-pb-orange-warm">*</span>
					</legend>
					<div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
						{["Instrutor", "Estágio", "Recepção", "Limpeza"].map((area) => (
							<label
								key={area}
								className={`flex cursor-pointer items-center gap-2 border px-3 py-2.5 text-sm transition-colors ${
									formData.area === area
										? "border-pb-orange bg-pb-orange text-white"
										: "border-pb-graphite/25 bg-white text-pb-graphite hover:border-pb-orange"
								}`}
							>
								<input
									type="radio"
									name="area"
									value={area}
									checked={formData.area === area}
									onChange={updateFormField}
									disabled={isSubmitting}
									className="sr-only"
								/>
								<span
									className={`flex size-3.5 flex-shrink-0 items-center justify-center border-2 ${
										formData.area === area
											? "border-white bg-white"
											: "border-pb-graphite/40"
									}`}
								>
									{formData.area === area && (
										<span className="size-1.5 bg-pb-orange" />
									)}
								</span>
								{area}
							</label>
						))}
					</div>
				</fieldset>

				{/* Currículo */}
				<div className="flex flex-col gap-1.5">
					<label
						htmlFor="curriculo"
						className="text-xs uppercase tracking-wider text-pb-graphite/70"
					>
						Currículo (PDF, DOC, DOCX - Máx 5MB){" "}
						<span className="text-pb-orange-warm">*</span>
					</label>
					<input
						type="file"
						id="curriculo"
						name="curriculo"
						required
						accept=".pdf,.doc,.docx"
						onChange={handleFileChange}
						className={`${INPUT_CLASS} file:mr-4 file:cursor-pointer file:border-0 file:bg-pb-orange file:px-3 file:py-1.5 file:text-xs file:uppercase file:tracking-wide file:text-white`}
						disabled={isSubmitting}
					/>
				</div>

				<button
					type="submit"
					className="botao-chanfrado inline-flex items-center justify-center bg-pb-orange px-8 py-4 text-sm uppercase tracking-wide text-white transition-colors hover:bg-pb-orange-warm disabled:opacity-70"
					disabled={isSubmitting}
				>
					<Upload className="mr-2 size-4" />
					{isSubmitting ? "Enviando..." : "Enviar currículo"}
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
