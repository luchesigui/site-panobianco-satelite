import {
	AlertCircle,
	Calendar,
	CheckCircle2,
	Coins,
	FileText,
	LogOut,
	Mail,
	MapPin,
	User,
} from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getEvoMemberProfile } from "@/lib/evo";
import { verifySession } from "@/lib/session";
import { logoutAction } from "./actions";

export const metadata = {
	title: "Área do Aluno | Panobianco Jardim Satélite",
	description: "Consulte seu status de matrícula, dados cadastrais e FitCoins.",
};

function maskDocument(doc?: string): string {
	if (!doc) return "Não cadastrado";
	const clean = doc.replace(/\D/g, "");
	if (clean.length === 11) {
		return `${clean.substring(0, 3)}.***.***-${clean.substring(9)}`;
	}
	return doc;
}

function formatDate(dateStr?: string): string {
	if (!dateStr) return "Não informada";
	try {
		// Garante que ignore fuso horário no parse para evitar problemas de fuso
		const date = new Date(dateStr);
		if (Number.isNaN(date.getTime())) return dateStr;
		return date.toLocaleDateString("pt-BR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			timeZone: "UTC",
		});
	} catch {
		return dateStr;
	}
}

export default async function MemberDashboardPage() {
	const cookieStore = cookies();
	const token = cookieStore.get("evo_session")?.value;
	const session = token ? verifySession(token) : null;

	if (!session) {
		redirect("/area-membro/login");
	}

	const profile = await getEvoMemberProfile(session.idMember);

	if (!profile) {
		return (
			<div className="container-main py-16 text-center text-white bg-background-dark">
				<div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl">
					<AlertCircle className="mx-auto h-12 w-12 text-red-500" />
					<h2 className="mt-4 text-2xl font-bold font-bebas tracking-wide">
						Erro ao Carregar Perfil
					</h2>
					<p className="mt-2 text-sm text-gray-400">
						Não conseguimos recuperar suas informações da API do EVO neste
						momento. Por favor, tente novamente mais tarde.
					</p>
					<form action={logoutAction} className="mt-6">
						<button
							type="submit"
							className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary-500/20 transition-all hover:bg-primary-500/90"
						>
							<LogOut className="h-4 w-4" />
							Fazer Logout
						</button>
					</form>
				</div>
			</div>
		);
	}

	const isBlocked = profile.accessBlocked;

	return (
		<div className="bg-background-dark text-white min-h-screen py-12">
			<div className="container-main max-w-5xl space-y-8">
				{/* Top Header Card */}
				<div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl shadow-xl">
					<div className="flex items-center gap-4">
						<div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-500/10 text-primary-500 border border-primary-500/20 shadow-inner">
							{profile.photo ? (
								// biome-ignore lint/performance/noImgElement: dynamic profile photo from external EVO API
								<img
									src={profile.photo}
									alt={profile.firstName}
									className="h-full w-full rounded-full object-cover"
								/>
							) : (
								<User className="h-8 w-8" />
							)}
						</div>
						<div>
							<h1 className="text-2xl font-bold tracking-tight">
								Olá,{" "}
								<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-orange-400">
									{profile.firstName} {profile.lastName}
								</span>
								!
							</h1>
							<p className="text-sm text-gray-400">
								Bem-vindo à sua Área do Aluno.
							</p>
						</div>
					</div>

					<div className="flex items-center gap-4">
						{/* Status Badge */}
						<div
							className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider ${
								isBlocked
									? "bg-red-500/10 text-red-500 border border-red-500/20"
									: "bg-green-500/10 text-green-500 border border-green-500/20"
							}`}
						>
							{isBlocked ? (
								<>
									<AlertCircle className="h-4 w-4" />
									Acesso Bloqueado
								</>
							) : (
								<>
									<CheckCircle2 className="h-4 w-4" />
									Acesso Liberado
								</>
							)}
						</div>

						{/* Logout Button */}
						<form action={logoutAction}>
							<button
								type="submit"
								className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 px-4 py-2 text-sm font-semibold transition-colors text-gray-300 hover:text-white"
							>
								<LogOut className="h-4 w-4" />
								Sair
							</button>
						</form>
					</div>
				</div>

				{/* Blocked alert reason */}
				{isBlocked && profile.blockedReason && (
					<div className="flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-400">
						<AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
						<div>
							<h3 className="font-bold">Motivo do bloqueio:</h3>
							<p className="mt-1 text-red-300/90">{profile.blockedReason}</p>
						</div>
					</div>
				)}

				{/* Dashboard Grid */}
				<div className="grid gap-6 md:grid-cols-3">
					{/* Card 1: Informações de Unidade / Cadastro */}
					<div className="md:col-span-2 rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl shadow-lg space-y-6">
						<h2 className="font-bebas text-2xl tracking-wider border-b border-white/10 pb-3 text-gray-300">
							Dados Cadastrais
						</h2>

						<div className="grid gap-6 sm:grid-cols-2">
							<div className="flex items-center gap-3">
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-primary-500">
									<MapPin className="h-5 w-5" />
								</div>
								<div>
									<p className="text-xs text-gray-500 uppercase font-semibold">
										Unidade
									</p>
									<p className="text-sm font-medium">
										{profile.branchName || "Panobianco Jardim Satélite"}
									</p>
								</div>
							</div>

							<div className="flex items-center gap-3">
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-primary-500">
									<Mail className="h-5 w-5" />
								</div>
								<div className="min-w-0">
									<p className="text-xs text-gray-500 uppercase font-semibold">
										E-mail
									</p>
									<p className="text-sm font-medium truncate">
										{profile.email}
									</p>
								</div>
							</div>

							<div className="flex items-center gap-3">
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-primary-500">
									<FileText className="h-5 w-5" />
								</div>
								<div>
									<p className="text-xs text-gray-500 uppercase font-semibold">
										Documento
									</p>
									<p className="text-sm font-medium">
										{maskDocument(profile.document)}
									</p>
								</div>
							</div>

							<div className="flex items-center gap-3">
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-primary-500">
									<Calendar className="h-5 w-5" />
								</div>
								<div>
									<p className="text-xs text-gray-500 uppercase font-semibold">
										Aniversário
									</p>
									<p className="text-sm font-medium">
										{formatDate(profile.birthDate)}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Card 2: Status do Plano e FitCoins */}
					<div className="rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl shadow-lg flex flex-col justify-between gap-6">
						<div>
							<h2 className="font-bebas text-2xl tracking-wider border-b border-white/10 pb-3 text-gray-300">
								Plano e Prêmios
							</h2>

							<div className="mt-6 space-y-4">
								<div>
									<p className="text-xs text-gray-500 uppercase font-semibold">
										Tipo do Plano
									</p>
									<p className="text-lg font-bold text-white mt-1">
										{profile.membershipStatus || "Plano Panobianco"}
									</p>
								</div>

								<div>
									<p className="text-xs text-gray-500 uppercase font-semibold">
										Matriculado em
									</p>
									<p className="text-sm text-gray-300 mt-0.5">
										{formatDate(profile.registerDate)}
									</p>
								</div>
							</div>
						</div>

						{/* FitCoins Counter */}
						<div className="rounded-xl border border-primary-500/20 bg-primary-500/5 p-4 flex items-center justify-between shadow-inner">
							<div className="flex items-center gap-3">
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500/10 text-primary-500 border border-primary-500/20">
									<Coins className="h-5 w-5 animate-pulse" />
								</div>
								<div>
									<h4 className="text-sm font-bold text-white">
										Seus FitCoins
									</h4>
									<p className="text-xs text-gray-400">
										Troque por prêmios na unidade
									</p>
								</div>
							</div>
							<div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-orange-400">
								{profile.totalFitCoins ?? 0}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
