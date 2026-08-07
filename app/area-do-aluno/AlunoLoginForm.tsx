"use client";

import { KeyRound, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const inputClassName =
	"w-full rounded-lg border border-white/15 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none";

const buttonClassName =
	"inline-flex h-12 w-full items-center justify-center rounded-full bg-primary-500 px-6 text-sm font-bold text-white transition-colors hover:bg-primary-500/90 disabled:opacity-70";

export default function AlunoLoginForm() {
	const { refresh } = useRouter();
	const [step, setStep] = useState<"identifier" | "code">("identifier");
	const [identifier, setIdentifier] = useState("");
	const [code, setCode] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");
	const [info, setInfo] = useState("");

	const handleRequestCode = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError("");
		setInfo("");

		try {
			const response = await fetch("/api/area-do-aluno/auth", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ action: "request", identifier }),
			});

			const data = await response.json().catch(() => ({}));

			if (response.ok) {
				setStep("code");
				setCode("");
				setInfo(
					typeof data.message === "string"
						? data.message
						: "Se o cadastro existir, você receberá um código por e-mail.",
				);
				return;
			}

			setError(
				typeof data.error === "string"
					? data.error
					: "Não foi possível enviar o código. Tente novamente.",
			);
		} catch {
			setError("Erro de conexão. Tente novamente.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleVerifyCode = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError("");

		try {
			const response = await fetch("/api/area-do-aluno/auth", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ action: "verify", code }),
			});

			const data = await response.json().catch(() => ({}));

			if (response.ok) {
				refresh();
				return;
			}

			if (data.expired) {
				setStep("identifier");
				setCode("");
				setInfo("");
			}

			setError(
				typeof data.error === "string"
					? data.error
					: "Código inválido. Tente novamente.",
			);
		} catch {
			setError("Erro de conexão. Tente novamente.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleBack = () => {
		setStep("identifier");
		setCode("");
		setError("");
		setInfo("");
	};

	return (
		<article className="mx-auto max-w-md rounded-xl border border-white/10 bg-white/5 p-6">
			<h2 className="text-2xl font-semibold">Acesso do aluno</h2>

			{step === "identifier" ? (
				<>
					<p className="mt-2 text-sm text-white/65">
						Informe o e-mail ou CPF cadastrado na academia. Você receberá um
						código de acesso por e-mail.
					</p>
					<form onSubmit={handleRequestCode} className="mt-6 space-y-4">
						<div>
							<label htmlFor="aluno-identifier" className="sr-only">
								E-mail ou CPF
							</label>
							<input
								id="aluno-identifier"
								name="identifier"
								type="text"
								autoComplete="email"
								required
								value={identifier}
								onChange={(e) => setIdentifier(e.target.value)}
								className={inputClassName}
								placeholder="E-mail ou CPF"
								disabled={isSubmitting}
							/>
						</div>
						<button
							type="submit"
							className={buttonClassName}
							disabled={isSubmitting}
						>
							<Send className="mr-2 size-4" />
							{isSubmitting ? "Enviando..." : "Enviar código"}
						</button>
					</form>
				</>
			) : (
				<>
					<p className="mt-2 text-sm text-white/65">
						Digite o código de 6 dígitos enviado para o e-mail cadastrado. Ele
						vale por 10 minutos.
					</p>
					<form onSubmit={handleVerifyCode} className="mt-6 space-y-4">
						<div>
							<label htmlFor="aluno-code" className="sr-only">
								Código de acesso
							</label>
							<input
								id="aluno-code"
								name="code"
								type="text"
								inputMode="numeric"
								autoComplete="one-time-code"
								pattern="\d{6}"
								maxLength={6}
								required
								value={code}
								onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
								className={`${inputClassName} text-center text-lg tracking-[0.5em]`}
								placeholder="000000"
								disabled={isSubmitting}
							/>
						</div>
						<button
							type="submit"
							className={buttonClassName}
							disabled={isSubmitting}
						>
							<KeyRound className="mr-2 size-4" />
							{isSubmitting ? "Confirmando..." : "Confirmar código"}
						</button>
						<button
							type="button"
							onClick={handleBack}
							disabled={isSubmitting}
							className="w-full text-center text-sm text-white/60 underline-offset-4 hover:text-white hover:underline disabled:opacity-70"
						>
							Usar outro e-mail ou reenviar código
						</button>
					</form>
				</>
			)}

			{info && !error && (
				<p className="mt-4 rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/75">
					{info}
				</p>
			)}
			{error && (
				<p className="mt-4 rounded-lg border border-red-400/40 bg-red-500/15 px-4 py-3 text-sm text-red-200">
					{error}
				</p>
			)}
		</article>
	);
}
