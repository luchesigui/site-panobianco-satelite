"use client";

import { KeyRound, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const inputClassName =
	"w-full border border-pb-graphite/25 bg-white px-4 py-3 text-pb-graphite placeholder:text-pb-graphite/50 focus:border-pb-orange focus:outline-none disabled:opacity-60";

const buttonClassName =
	"botao-chanfrado inline-flex w-full items-center justify-center bg-pb-orange px-8 py-4 text-sm uppercase tracking-wide text-white transition-colors hover:bg-pb-orange-warm disabled:opacity-70";

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
		<article className="card-hex-light mx-auto max-w-md px-12 py-16">
			<h2 className="text-[3.5rem] leading-none tracking-tight">
				Acesso do aluno
			</h2>

			{step === "identifier" ? (
				<>
					<p className="mt-2 text-[1.5rem] leading-tight text-pb-graphite/80">
						Informe o e-mail ou CPF cadastrado na academia. Você receberá um
						código de acesso por e-mail.
					</p>
					<form onSubmit={handleRequestCode} className="mt-8 space-y-4">
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
					<p className="mt-2 leading-snug text-pb-graphite/80">
						Digite o código de 6 dígitos enviado para o e-mail cadastrado. Ele
						vale por 10 minutos.
					</p>
					<form onSubmit={handleVerifyCode} className="mt-8 space-y-4">
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
							className="w-full text-center text-sm text-pb-graphite/70 underline-offset-4 hover:text-pb-orange-warm hover:underline disabled:opacity-70"
						>
							Usar outro e-mail ou reenviar código
						</button>
					</form>
				</>
			)}

			{info && !error && (
				<p className="mt-4 border border-pb-graphite/25 bg-white px-4 py-3 text-sm text-pb-graphite/80">
					{info}
				</p>
			)}
			{error && (
				<p className="mt-4 border border-pb-orange-warm/40 bg-pb-orange-warm/10 px-4 py-3 text-sm text-pb-orange-warm">
					{error}
				</p>
			)}
		</article>
	);
}
