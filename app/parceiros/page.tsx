"use client";

import { Check } from "lucide-react";
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

type Partner = "wellhub";

// Campos sem raio nem chanfro: o brandbook não usa cantos arredondados e o
// clip-path cortaria a borda e o anel de foco.
const INPUT_CLASS =
	"w-full border border-pb-graphite/25 bg-white px-4 py-3 text-pb-graphite placeholder:text-pb-graphite/50 focus:border-pb-orange focus:outline-none disabled:opacity-60";

const LABEL_CLASS =
	"mb-1 block text-xs uppercase tracking-wider text-pb-graphite/70";

export default function ParceirosPage() {
	const partner: Partner = "wellhub";
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
				setErrorMessage(
					data.error ?? "Erro ao realizar cadastro. Tente novamente.",
				);
			}
		} catch {
			setErrorMessage("Erro de conexão. Tente novamente.");
		} finally {
			setIsSubmitting(false);
		}
	}

	if (successData) {
		return (
			<main className="font-display min-h-screen bg-pb-off-white px-4 pb-20 pt-20 text-pb-graphite lg:pb-28 lg:pt-28">
				<div className="mx-auto max-w-lg text-center">
					<div className="shape-octagon-regular mx-auto mb-6 inline-flex size-16 items-center justify-center bg-pb-orange text-white">
						<Check className="size-8" aria-hidden />
					</div>
					<h1 className="text-[3.5rem] leading-none tracking-tight text-pb-orange-warm">
						Pré-cadastro concluído
					</h1>
					<p className="mt-6 text-[1.5rem] leading-tight">
						Esse é o seu ID Panobianco. Se estiver na recepção, mostre para uma
						de nossas recepcionistas.
					</p>
					{successData.idCliente && (
						<div className="shape-chanfrado-menor mt-8 bg-pb-orange px-8 py-8 text-white">
							<p className="text-xs uppercase tracking-widest text-white/80">
								Seu ID
							</p>
							<p className="mt-1 text-[3.5rem] leading-none tracking-tight">
								{successData.idCliente}
							</p>
						</div>
					)}
					<div className="mt-6 border-l-4 border-pb-orange bg-white px-5 py-4 text-left">
						<p className="text-[1.5rem] leading-tight tracking-tight text-pb-orange-warm">
							Verifique seu e-mail: PAR-Q
						</p>
						<p className="mt-2 leading-snug text-pb-graphite/80">
							Você deve ter recebido um e-mail com o questionário PAR-Q. É
							importante que você preencha esse rápido questionário antes de
							começar a treinar.
						</p>
					</div>
					{successData.linkAceiteContrato && (
						<div className="mt-6">
							<p className="leading-snug text-pb-graphite/80">
								Para finalizar, assine seu contrato virtualmente.
							</p>
							<a
								href={successData.linkAceiteContrato}
								target="_blank"
								rel="noopener noreferrer"
								className="botao-chanfrado mt-4 inline-flex items-center justify-center bg-pb-orange px-8 py-4 text-sm uppercase tracking-wide text-white transition-colors hover:bg-pb-orange-warm"
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
		<main className="font-display min-h-screen bg-pb-off-white px-4 pb-20 pt-20 text-pb-graphite lg:pb-28 lg:pt-28">
			<div className="mx-auto max-w-lg">
				<div className="mb-8 text-center">
					<h1 className="text-[3.5rem] leading-none tracking-tight text-pb-orange-warm">
						Cadastro de parceiros
					</h1>
					<p className="mt-6 text-[1.5rem] leading-tight">
						Alunos do Wellhub, realizem o cadastro abaixo para acessar a
						academia.
					</p>
				</div>

				{/* Form */}
				<form
					onSubmit={handleSubmit}
					className="card-hex-light space-y-4 px-12 py-16"
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
								ID Wellhub
							</label>
							<input
								id="partnerId"
								name="partnerId"
								type="text"
								required
								value={form.partnerId}
								onChange={handleChange}
								disabled={isSubmitting}
								placeholder="ID do app Wellhub"
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
									className={`flex flex-1 cursor-pointer items-center justify-center border py-2.5 text-sm transition-colors ${
										form.gender === g
											? "border-pb-orange bg-pb-orange text-white"
											: "border-pb-graphite/25 bg-white text-pb-graphite hover:border-pb-orange"
									} ${isSubmitting ? "cursor-not-allowed opacity-50" : ""}`}
								>
									<input
										type="radio"
										name="gender"
										value={g}
										checked={form.gender === g}
										onChange={() => setForm((prev) => ({ ...prev, gender: g }))}
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
						className="botao-chanfrado mt-2 w-full bg-pb-orange py-4 text-sm uppercase tracking-wide text-white transition-colors hover:bg-pb-orange-warm disabled:opacity-60"
					>
						{isSubmitting ? "Cadastrando..." : "Realizar cadastro"}
					</button>

					{errorMessage && (
						<p className="border border-pb-orange-warm/40 bg-pb-orange-warm/10 px-4 py-3 text-sm text-pb-orange-warm">
							{errorMessage}
						</p>
					)}
				</form>
			</div>
		</main>
	);
}
