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
		<article className="rounded-xl border border-white/10 bg-white/5 p-6">
			<h2 className="text-2xl font-semibold">Envie seu Currículo</h2>
			<p className="mt-2 text-sm text-white/65">
				Preencha seus dados e anexe seu currículo nos formatos PDF, DOC ou DOCX
				de no máximo 5MB.
			</p>

			<form onSubmit={handleSubmit} className="mt-6 space-y-4">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="nome"
							className="text-xs font-bold uppercase tracking-wider text-white/60"
						>
							Nome Completo <span className="text-primary-500">*</span>
						</label>
						<input
							type="text"
							id="nome"
							name="nome"
							required
							value={formData.nome}
							onChange={updateFormField}
							className="w-full rounded-lg border border-white/15 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none disabled:opacity-50"
							placeholder="Nome completo"
							disabled={isSubmitting}
						/>
					</div>
					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="email"
							className="text-xs font-bold uppercase tracking-wider text-white/60"
						>
							E-mail <span className="text-primary-500">*</span>
						</label>
						<input
							type="email"
							id="email"
							name="email"
							required
							value={formData.email}
							onChange={updateFormField}
							className="w-full rounded-lg border border-white/15 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none disabled:opacity-50"
							placeholder="seu.email@exemplo.com"
							disabled={isSubmitting}
						/>
					</div>
				</div>

				{/* Telefone */}
				<div className="flex flex-col gap-1.5">
					<label
						htmlFor="telefone"
						className="text-xs font-bold uppercase tracking-wider text-white/60"
					>
						Telefone / WhatsApp <span className="text-primary-500">*</span>
					</label>
					<input
						type="tel"
						id="telefone"
						name="telefone"
						required
						value={formData.telefone}
						onChange={updateFormField}
						className="w-full rounded-lg border border-white/15 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none disabled:opacity-50"
						placeholder="(12) 99999-9999"
						disabled={isSubmitting}
					/>
				</div>

				{/* Área de Interesse */}
				<div className="flex flex-col gap-3">
					<label className="text-xs font-bold uppercase tracking-wider text-white/60">
						Área de Interesse <span className="text-primary-500">*</span>
					</label>
					<div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
						{["Instrutor", "Estágio", "Recepção", "Limpeza"].map((area) => (
							<label
								key={area}
								className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-colors ${
									formData.area === area
										? "border-primary-500 bg-primary-500/15 text-primary-500"
										: "border-white/15 bg-black/20 text-white/70 hover:border-white/30"
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
									className={`size-3.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
										formData.area === area
											? "border-primary-500 bg-primary-500"
											: "border-white/30"
									}`}
								>
									{formData.area === area && (
										<span className="size-1.5 rounded-full bg-white" />
									)}
								</span>
								{area}
							</label>
						))}
					</div>
				</div>

				{/* Currículo */}
				<div className="flex flex-col gap-1.5">
					<label
						htmlFor="curriculo"
						className="text-xs font-bold uppercase tracking-wider text-white/60"
					>
						Currículo (PDF, DOC, DOCX - Máx 5MB){" "}
						<span className="text-primary-500">*</span>
					</label>
					<input
						type="file"
						id="curriculo"
						name="curriculo"
						required
						accept=".pdf,.doc,.docx"
						onChange={handleFileChange}
						className="w-full rounded-lg border border-white/15 bg-black/20 px-4 py-2.5 text-sm text-white file:mr-4 file:rounded-md file:border-0 file:bg-white/10 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white file:transition-colors hover:file:bg-white/20 file:cursor-pointer disabled:opacity-50"
						disabled={isSubmitting}
					/>
				</div>

				<button
					type="submit"
					className="inline-flex h-12 items-center justify-center rounded-full bg-primary-500 px-6 text-sm font-bold text-white transition-colors hover:bg-primary-500/90 disabled:opacity-70"
					disabled={isSubmitting}
				>
					<Upload className="mr-2 size-4" />
					{isSubmitting ? "Enviando..." : "Enviar Currículo"}
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
