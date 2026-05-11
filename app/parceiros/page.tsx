"use client";

import { useState } from "react";

function formatPhone(value: string): string {
	const digits = value.replace(/\D/g, "").slice(0, 11);
	if (digits.length <= 2) return digits ? `(${digits}` : "";
	if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
	if (digits.length <= 10)
		return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
	return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function formatCep(value: string): string {
	const digits = value.replace(/\D/g, "").slice(0, 8);
	if (digits.length <= 5) return digits;
	return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

function formatCpf(value: string): string {
	const digits = value.replace(/\D/g, "").slice(0, 11);
	if (digits.length <= 3) return digits;
	if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
	if (digits.length <= 9)
		return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
	return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

type Partner = "wellhub" | "totalpass";

const INPUT_CLASS =
	"w-full rounded-lg border border-white/15 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none disabled:opacity-50";

const LABEL_CLASS = "block text-xs font-medium text-white/60 mb-1";

export default function ParceirosPage() {
	const [partner, setPartner] = useState<Partner>("wellhub");
	const [form, setForm] = useState({
		name: "",
		lastName: "",
		cpf: "",
		email: "",
		phone: "",
		birthdate: "",
		gender: "" as "M" | "F" | "",
		zipCode: "",
		partnerId: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [successData, setSuccessData] = useState<{
		idCliente?: number;
		linkAceiteContrato?: string;
	} | null>(null);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		let next = value;
		if (name === "phone") next = formatPhone(value);
		if (name === "cpf") next = formatCpf(value);
		if (name === "zipCode") next = formatCep(value);
		setForm((prev) => ({ ...prev, [name]: next }));
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!form.gender) return;
		setIsSubmitting(true);
		setErrorMessage(null);

		try {
			const res = await fetch("/api/parceiros", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...form, partner }),
			});
			const data = await res.json();
			if (res.ok) {
				setSuccessData({
					idCliente: data.idCliente,
					linkAceiteContrato: data.linkAceiteContrato,
				});
			} else {
				setErrorMessage(data.error ?? "Erro ao realizar cadastro. Tente novamente.");
			}
		} catch {
			setErrorMessage("Erro de conexão. Tente novamente.");
		} finally {
			setIsSubmitting(false);
		}
	}

	if (successData) {
		return (
			<main className="min-h-screen bg-[#120a08] px-4 py-16 text-white">
				<div className="mx-auto max-w-lg text-center">
					<div className="mb-6 inline-flex size-16 items-center justify-center rounded-full bg-green-500/20 text-green-400">
						<svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
						</svg>
					</div>
					<h1 className="text-2xl font-bold">Pré-cadastro concluído!</h1>
					<p className="mt-3 text-white/70">
						Esse é o seu ID Panobianco. Se estiver na recepção, mostre para uma
						de nossas recepcionistas.
					</p>
					{successData.idCliente && (
						<div className="mt-6 rounded-lg border border-white/10 bg-white/5 px-8 py-6">
							<p className="text-xs font-medium uppercase tracking-widest text-white/40">
								Seu ID
							</p>
							<p className="mt-1 text-5xl font-bold tracking-tight text-primary-500">
								{successData.idCliente}
							</p>
						</div>
					)}
					<div className="mt-6 rounded-lg border border-yellow-400/20 bg-yellow-500/10 px-5 py-4 text-left">
						<p className="text-sm font-semibold text-yellow-300">
							Verifique seu e-mail — PAR-Q
						</p>
						<p className="mt-1 text-sm text-white/60">
							Você deve ter recebido um e-mail com o questionário PAR-Q. É
							importante que você preencha esse rápido questionário antes de
							começar a treinar.
						</p>
					</div>
					{successData.linkAceiteContrato && (
						<div className="mt-6">
							<p className="text-sm text-white/60">
								Para finalizar, assine seu contrato virtualmente.
							</p>
							<a
								href={successData.linkAceiteContrato}
								target="_blank"
								rel="noopener noreferrer"
								className="mt-3 inline-flex h-12 items-center justify-center rounded-full bg-primary-500 px-8 text-sm font-bold text-white transition-colors hover:bg-primary-500/90"
							>
								Assinar contrato
							</a>
						</div>
					)}
				</div>
			</main>
		);
	}

	return (
		<main className="min-h-screen bg-[#120a08] px-4 py-16 text-white">
			<div className="mx-auto max-w-lg">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold">Cadastro de Parceiros</h1>
					<p className="mt-2 text-sm text-white/60">
						Alunos do Wellhub e TotalPass, realizem o cadastro abaixo para
						acessar a academia.
					</p>
				</div>

				{/* Partner selector */}
				<div className="mb-6 flex rounded-xl border border-white/10 bg-white/5 p-1">
					{(["wellhub", "totalpass"] as Partner[]).map((p) => (
						<button
							key={p}
							type="button"
							onClick={() => setPartner(p)}
							className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-colors ${
								partner === p
									? "bg-primary-500 text-white"
									: "text-white/50 hover:text-white"
							}`}
						>
							{p === "wellhub" ? "Wellhub" : "TotalPass"}
						</button>
					))}
				</div>

				{/* Form */}
				<form
					onSubmit={handleSubmit}
					className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-4"
				>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div>
							<label className={LABEL_CLASS} htmlFor="name">
								Nome
							</label>
							<input
								id="name"
								name="name"
								type="text"
								required
								value={form.name}
								onChange={handleChange}
								disabled={isSubmitting}
								placeholder="João"
								className={INPUT_CLASS}
							/>
						</div>
						<div>
							<label className={LABEL_CLASS} htmlFor="lastName">
								Sobrenome
							</label>
							<input
								id="lastName"
								name="lastName"
								type="text"
								required
								value={form.lastName}
								onChange={handleChange}
								disabled={isSubmitting}
								placeholder="Silva"
								className={INPUT_CLASS}
							/>
						</div>
					</div>

					<div>
						<label className={LABEL_CLASS} htmlFor="cpf">
							CPF
						</label>
						<input
							id="cpf"
							name="cpf"
							type="text"
							required
							value={form.cpf}
							onChange={handleChange}
							disabled={isSubmitting}
							placeholder="000.000.000-00"
							inputMode="numeric"
							className={INPUT_CLASS}
						/>
					</div>

					<div>
						<label className={LABEL_CLASS} htmlFor="email">
							E-mail
						</label>
						<input
							id="email"
							name="email"
							type="email"
							required
							value={form.email}
							onChange={handleChange}
							disabled={isSubmitting}
							placeholder="joao@email.com"
							className={INPUT_CLASS}
						/>
					</div>

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div>
							<label className={LABEL_CLASS} htmlFor="phone">
								Celular
							</label>
							<input
								id="phone"
								name="phone"
								type="tel"
								required
								value={form.phone}
								onChange={handleChange}
								disabled={isSubmitting}
								placeholder="(12) 99999-9999"
								className={INPUT_CLASS}
							/>
						</div>
						<div>
							<label className={LABEL_CLASS} htmlFor="birthdate">
								Data de nascimento
							</label>
							<input
								id="birthdate"
								name="birthdate"
								type="date"
								required
								value={form.birthdate}
								onChange={handleChange}
								disabled={isSubmitting}
								className={INPUT_CLASS}
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div>
							<label className={LABEL_CLASS} htmlFor="zipCode">
								CEP
							</label>
							<input
								id="zipCode"
								name="zipCode"
								type="text"
								required
								value={form.zipCode}
								onChange={handleChange}
								disabled={isSubmitting}
								placeholder="00000-000"
								inputMode="numeric"
								className={INPUT_CLASS}
							/>
						</div>
						<div>
							<label className={LABEL_CLASS} htmlFor="partnerId">
								{partner === "wellhub" ? "ID Wellhub" : "ID TotalPass"}
							</label>
							<input
								id="partnerId"
								name="partnerId"
								type="text"
								required
								value={form.partnerId}
								onChange={handleChange}
								disabled={isSubmitting}
								placeholder={
									partner === "wellhub" ? "ID do app Wellhub" : "ID do app TotalPass"
								}
								className={INPUT_CLASS}
							/>
						</div>
					</div>

					<div>
						<span className={LABEL_CLASS}>Sexo</span>
						<div className="flex gap-3 mt-1">
							{(["M", "F"] as const).map((g) => (
								<label
									key={g}
									className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg border py-2.5 text-sm font-medium transition-colors ${
										form.gender === g
											? "border-primary-500 bg-primary-500/20 text-white"
											: "border-white/15 bg-black/20 text-white/50 hover:text-white"
									} ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
								>
									<input
										type="radio"
										name="gender"
										value={g}
										checked={form.gender === g}
										onChange={() =>
											setForm((prev) => ({ ...prev, gender: g }))
										}
										disabled={isSubmitting}
										className="sr-only"
									/>
									{g === "M" ? "Masculino" : "Feminino"}
								</label>
							))}
						</div>
					</div>

					<button
						type="submit"
						disabled={isSubmitting || !form.gender}
						className="mt-2 w-full rounded-full bg-primary-500 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-500/90 disabled:opacity-60"
					>
						{isSubmitting ? "Cadastrando..." : "Realizar Cadastro"}
					</button>

					{errorMessage && (
						<p className="rounded-lg border border-red-400/40 bg-red-500/15 px-4 py-3 text-sm text-red-200">
							{errorMessage}
						</p>
					)}
				</form>
			</div>
		</main>
	);
}
