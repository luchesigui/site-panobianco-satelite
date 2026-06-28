"use client";

import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { loginAction } from "../actions";

const initialState = {
	success: false,
	error: "",
};

function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			disabled={pending}
			className="group relative flex w-full justify-center rounded-xl bg-primary-500 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary-500/20 transition-all hover:bg-primary-500/90 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-background-dark disabled:opacity-70 disabled:cursor-not-allowed"
		>
			{pending ? (
				<Loader2 className="mr-2 h-5 w-5 animate-spin" />
			) : (
				<span className="flex items-center justify-center">
					Entrar
					<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
				</span>
			)}
		</button>
	);
}

export default function LoginForm() {
	const [state, formAction] = useFormState(loginAction, initialState);
	const [showPassword, setShowPassword] = useState(false);

	return (
		<form action={formAction} className="space-y-6">
			<div className="text-center">
				<h1 className="font-bebas text-4xl tracking-wider text-white">
					ÁREA DO ALUNO
				</h1>
				<p className="mt-2 text-sm text-gray-400">
					Acesse usando o e-mail e senha do seu perfil EVO.
				</p>
			</div>

			{state?.error && (
				<div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400 transition-all">
					{state.error}
				</div>
			)}

			<div className="space-y-4">
				<div>
					<label
						htmlFor="email"
						className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2"
					>
						E-mail
					</label>
					<div className="relative">
						<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
							<Mail className="h-5 w-5 text-gray-500" />
						</div>
						<input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							required
							placeholder="seu-email@exemplo.com"
							className="block w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-3 text-sm text-white placeholder-gray-500 transition-all focus:border-primary-500 focus:bg-white/10 focus:ring-1 focus:ring-primary-500 outline-none"
						/>
					</div>
				</div>

				<div>
					<label
						htmlFor="password"
						className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2"
					>
						Senha
					</label>
					<div className="relative">
						<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
							<Lock className="h-5 w-5 text-gray-500" />
						</div>
						<input
							id="password"
							name="password"
							type={showPassword ? "text" : "password"}
							autoComplete="current-password"
							required
							placeholder="Sua senha do EVO"
							className="block w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-10 text-sm text-white placeholder-gray-500 transition-all focus:border-primary-500 focus:bg-white/10 focus:ring-1 focus:ring-primary-500 outline-none"
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-300"
							aria-label={showPassword ? "Ocultar senha" : "Exibir senha"}
						>
							{showPassword ? (
								<EyeOff className="h-5 w-5" />
							) : (
								<Eye className="h-5 w-5" />
							)}
						</button>
					</div>
				</div>
			</div>

			<SubmitButton />
		</form>
	);
}
