"use client";

import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const inputClassName =
	"w-full border border-pb-graphite/25 bg-white px-4 py-3 text-pb-graphite placeholder:text-pb-graphite/50 focus:border-pb-orange focus:outline-none disabled:opacity-60";

export default function TreinamentoLoginForm() {
	const { refresh } = useRouter();
	const [login, setLogin] = useState("");
	const [senha, setSenha] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [message, setMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setMessage("");

		try {
			const response = await fetch("/api/treinamento/auth", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ login, senha }),
			});

			const data = await response.json().catch(() => ({}));

			if (response.ok) {
				refresh();
				return;
			}

			setMessage(
				typeof data.error === "string"
					? data.error
					: "Não foi possível entrar. Tente novamente.",
			);
		} catch {
			setMessage("Erro de conexão. Tente novamente.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<article className="card-hex-light mx-auto max-w-md px-12 py-16">
			<h2 className="text-[3.5rem] leading-none tracking-tight">
				Acesso ao treinamento
			</h2>
			<p className="mt-2 text-[1.5rem] leading-tight text-pb-graphite/80">
				Informe o login e a senha fornecidos pela equipe.
			</p>

			<form onSubmit={handleSubmit} className="mt-8 space-y-4">
				<div>
					<label htmlFor="treinamento-login" className="sr-only">
						Login
					</label>
					<input
						id="treinamento-login"
						name="login"
						type="text"
						autoComplete="username"
						required
						value={login}
						onChange={(e) => setLogin(e.target.value)}
						className={inputClassName}
						placeholder="Login"
						disabled={isSubmitting}
					/>
				</div>
				<div>
					<label htmlFor="treinamento-senha" className="sr-only">
						Senha
					</label>
					<input
						id="treinamento-senha"
						name="senha"
						type="password"
						autoComplete="current-password"
						required
						value={senha}
						onChange={(e) => setSenha(e.target.value)}
						className={inputClassName}
						placeholder="Senha"
						disabled={isSubmitting}
					/>
				</div>
				<button
					type="submit"
					className="botao-chanfrado inline-flex w-full items-center justify-center bg-pb-orange px-8 py-4 text-sm uppercase tracking-wide text-white transition-colors hover:bg-pb-orange-warm disabled:opacity-70"
					disabled={isSubmitting}
				>
					<LogIn className="mr-2 size-4" />
					{isSubmitting ? "Entrando..." : "Entrar"}
				</button>
				{message && (
					<p className="border border-pb-orange-warm/40 bg-pb-orange-warm/10 px-4 py-3 text-sm text-pb-orange-warm">
						{message}
					</p>
				)}
			</form>
		</article>
	);
}
