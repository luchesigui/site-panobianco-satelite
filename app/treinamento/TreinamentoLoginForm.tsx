"use client";

import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const inputClassName =
	"w-full rounded-lg border border-white/15 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none";

export default function TreinamentoLoginForm() {
	const router = useRouter();
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
				router.refresh();
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
		<article className="mx-auto max-w-md rounded-xl border border-white/10 bg-white/5 p-6">
			<h2 className="text-2xl font-black">Acesso ao treinamento</h2>
			<p className="mt-2 text-sm text-white/65">
				Informe o login e a senha fornecidos pela equipe.
			</p>

			<form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
					className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary-500 px-6 text-sm font-bold text-white transition-colors hover:bg-primary-500/90 disabled:opacity-70"
					disabled={isSubmitting}
				>
					<LogIn className="mr-2 size-4" />
					{isSubmitting ? "Entrando..." : "Entrar"}
				</button>
				{message && (
					<p className="rounded-lg border border-red-400/40 bg-red-500/15 px-4 py-3 text-sm text-red-200">
						{message}
					</p>
				)}
			</form>
		</article>
	);
}
