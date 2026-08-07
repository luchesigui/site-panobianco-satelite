"use client";

import confetti from "canvas-confetti";
import { PartyPopper, Sparkles, Trophy } from "lucide-react";
import { useSearchParams } from "next/navigation";
import {
	Suspense,
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";

interface Member {
	idMember: number;
	firstName: string;
	lastName: string;
	displayName: string;
}

function SorteioContent() {
	const searchParams = useSearchParams();
	const isCaptureMode = searchParams.get("capture") === "1";
	const isFeedCaptureMode = searchParams.get("format") === "feed";
	const [members, setMembers] = useState<Member[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// State machine: "idle" | "spinning" | "suspense" | "winner"
	const [status, setStatus] = useState<
		"idle" | "spinning" | "suspense" | "winner"
	>("idle");

	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [winner, setWinner] = useState<Member | null>(null);

	const isDrawReady =
		!loading && !error && members.length > 0 && status === "idle";
	const drawStatus = loading
		? "loading"
		: error
			? "error"
			: status === "spinning"
				? "drawing"
				: status === "winner" && winner
					? "completed"
					: isDrawReady
						? "ready"
						: "loading";

	const spinIntervalRef = useRef<NodeJS.Timeout | null>(null);
	const audioCtxRef = useRef<AudioContext | null>(null);

	// Fetch active members from Evo API (returns members array)
	const fetchMembersList = async (): Promise<Member[]> => {
		setLoading(true);
		setError(null);
		try {
			const res = await fetch("/api/sorteio/alunos");
			const data = await res.json();
			if (data.success && Array.isArray(data.members) && data.members.length > 0) {
				setMembers(data.members);
				return data.members;
			}
			setError(data.error || "Nenhum aluno ativo encontrado.");
			return [];
		} catch (err) {
			console.error("Erro ao carregar alunos:", err);
			setError("Falha ao conectar com o servidor do EVO.");
			return [];
		} finally {
			setLoading(false);
		}
	};

	// Pre-fetch active members silently from Evo API on mount
	useEffect(() => {
		fetchMembersList();
	}, []);

	useLayoutEffect(() => {
		document.body.classList.toggle("sorteio-capture-mode", isCaptureMode);
		document.body.classList.toggle(
			"sorteio-feed-capture-mode",
			isCaptureMode && isFeedCaptureMode,
		);

		return () => {
			document.body.classList.remove("sorteio-capture-mode");
			document.body.classList.remove("sorteio-feed-capture-mode");
		};
	}, [isCaptureMode, isFeedCaptureMode]);

	// Web Audio synthetic tick for slot animation
	const playTickSound = useCallback(() => {
		try {
			if (!audioCtxRef.current) {
				const AudioCtx =
					window.AudioContext ||
					(window as unknown as { webkitAudioContext: typeof AudioContext })
						.webkitAudioContext;
				audioCtxRef.current = new AudioCtx();
			}
			const ctx = audioCtxRef.current;
			if (ctx.state === "suspended") {
				ctx.resume();
			}
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();
			osc.type = "sine";
			osc.frequency.setValueAtTime(440, ctx.currentTime);
			osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.03);
			gain.gain.setValueAtTime(0.08, ctx.currentTime);
			gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
			osc.connect(gain);
			gain.connect(ctx.destination);
			osc.start();
			osc.stop(ctx.currentTime + 0.03);
		} catch {
			// Ignore audio play errors
		}
	}, []);

	// Fanfare victory sound synthesis
	const playVictorySound = useCallback(() => {
		try {
			if (!audioCtxRef.current) return;
			const ctx = audioCtxRef.current;
			const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
			notes.forEach((freq, index) => {
				const osc = ctx.createOscillator();
				const gain = ctx.createGain();
				osc.type = "triangle";
				osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.12);
				gain.gain.setValueAtTime(0.15, ctx.currentTime + index * 0.12);
				gain.gain.exponentialRampToValueAtTime(
					0.001,
					ctx.currentTime + index * 0.12 + 0.4,
				);
				osc.connect(gain);
				gain.connect(ctx.destination);
				osc.start(ctx.currentTime + index * 0.12);
				osc.stop(ctx.currentTime + index * 0.12 + 0.4);
			});
		} catch {
			// Ignore audio play errors
		}
	}, []);

	// Confetti trigger
	const triggerConfetti = useCallback(() => {
		playVictorySound();
		const count = 200;
		const defaults = {
			origin: { y: 0.7 },
			zIndex: 9999,
		};

		function fire(particleRatio: number, opts: confetti.Options) {
			confetti({
				...defaults,
				...opts,
				particleCount: Math.floor(count * particleRatio),
			});
		}

		fire(0.25, {
			spread: 26,
			startVelocity: 55,
			colors: ["#ff5e29", "#ffffff", "#ffd700"],
		});
		fire(0.2, {
			spread: 60,
			colors: ["#ff5e29", "#ff9e29", "#ffffff"],
		});
		fire(0.35, {
			spread: 100,
			decay: 0.91,
			scalar: 0.8,
			colors: ["#ffd700", "#ff5e29", "#ffffff"],
		});
		fire(0.1, {
			spread: 120,
			startVelocity: 25,
			decay: 0.92,
			colors: ["#ffffff", "#ff5e29"],
		});
		fire(0.1, {
			spread: 120,
			startVelocity: 45,
			colors: ["#ffd700", "#ff5e29"],
		});
	}, [playVictorySound]);

	// Start raffle
	const startRaffle = async () => {
		if (loading || status === "spinning" || status === "suspense") return;

		setStatus("spinning");
		setWinner(null);

		let activeMembers = members;
		if (activeMembers.length === 0) {
			activeMembers = await fetchMembersList();
		}

		if (activeMembers.length === 0) {
			setStatus("idle");
			return;
		}

		// Select final winner randomly ahead of time
		const selectedWinnerIndex = Math.floor(Math.random() * activeMembers.length);
		const selectedWinner = activeMembers[selectedWinnerIndex];

		let delay = 35; // initial fast delay (ms)
		const duration = 6500; // longer fast run before the reveal
		const startTime = Date.now();

		const step = () => {
			const elapsed = Date.now() - startTime;
			const progress = Math.min(elapsed / duration, 1);

			// Keep names moving fast for most of the draw, then slow near the reveal.
			const easeProgress = Math.pow(progress, 4);
			delay = 35 + easeProgress * 380; // delay goes from 35ms to 415ms

			setCurrentIndex((prev) => (prev + 1) % activeMembers.length);
			playTickSound();

			if (progress < 1) {
				spinIntervalRef.current = setTimeout(step, delay);
			} else {
				// Land on exact selected winner and reveal immediately
				setCurrentIndex(selectedWinnerIndex);
				setWinner(selectedWinner);
				setStatus("winner");
				triggerConfetti();
			}
		};

		step();
	};

	const currentDisplay =
		status !== "idle" && members.length > 0
			? members[currentIndex]
			: {
					firstName: "Sorteio de",
					lastName: "alunos ativos",
					idMember: 0,
					displayName: "Sorteio de alunos ativos",
				};

	return (
		<div className="sorteio-page relative min-h-screen bg-background-dark text-white overflow-hidden flex flex-col justify-between py-6 sm:py-8 px-4 sm:px-6">
			<output
				data-testid="draw-status"
				data-status={drawStatus}
				aria-live="polite"
				className="sr-only"
			>
				{drawStatus}
			</output>
			{/* Background ambient lighting */}
			<div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[140px] pointer-events-none" />
			<div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

			<div className="container-main relative z-10 max-w-3xl w-full mx-auto flex-1 flex flex-col justify-between py-2">
				{/* Top Section - Title Aligned Left with Custom Size */}
				<div className="text-left">
					<h1
						className="font-sf-compact font-black tracking-tight uppercase text-white"
						style={{
							fontSize: "9rem",
							lineHeight: "0.9",
							marginTop: "0.25rem",
							marginBottom: "-1rem",
						}}
					>
						SORTEIO <span className="text-primary-500">SEMANAL</span>
					</h1>
				</div>

				{/* Center Section - Main Raffle Arena */}
				<div className="my-auto py-6">
					<div className="relative rounded-3xl border border-white/15 bg-slate-950/70 p-5 sm:p-7 backdrop-blur-2xl shadow-2xl overflow-hidden">
						{/* Glowing frame indicator */}
						<div
							className={`absolute inset-0 rounded-3xl pointer-events-none transition-all duration-500 ${
								status === "spinning"
									? "ring-2 ring-primary-500/80 shadow-[inset_0_0_40px_rgba(255,94,41,0.2)]"
									: status === "suspense"
										? "ring-4 ring-amber-400/90 animate-pulse shadow-[inset_0_0_60px_rgba(251,191,36,0.3)]"
										: status === "winner"
											? "ring-2 ring-emerald-500/80 shadow-[inset_0_0_50px_rgba(16,185,129,0.2)]"
											: ""
							}`}
						/>

						{/* Winner Modal Banner (Post-Suspense) */}
						{status === "winner" && winner && (
							<div className="space-y-6 text-center animate-in fade-in zoom-in duration-500 py-4">
								<div className="inline-flex items-center justify-center p-4 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.3)]">
									<Trophy className="size-14 animate-bounce" />
								</div>

								<div className="space-y-3">
									<p className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
										🏆 Parabéns ao Vencedor(a)! 🏆
									</p>
									<h2
										data-testid="winner-name"
										className="text-4xl sm:text-6xl font-black tracking-tight text-white drop-shadow-md"
									>
										{winner.firstName} {winner.lastName}
									</h2>
									<div className="pt-2">
										<span className="inline-block rounded-full bg-primary-500/20 border border-primary-500/40 px-6 py-2 text-lg font-bold text-primary-400">
											ID Aluno: #{winner.idMember}
										</span>
									</div>
								</div>
							</div>
						)}

						{/* Idle & Spinning states */}
						{(status === "idle" || status === "spinning") && (
							<div className="space-y-8 text-center py-4">
								{/* Slot Machine Display */}
								<div className="relative rounded-2xl bg-black/80 border border-white/10 p-8 sm:p-12 shadow-inner overflow-hidden">
									<div className="space-y-3 min-h-[140px] flex flex-col justify-center items-center">
										<div
											className={`transition-all duration-75 ${
												status === "spinning" ? "scale-105 blur-[0.3px]" : ""
											}`}
										>
											<h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
												{currentDisplay.firstName} {currentDisplay.lastName}
											</h2>
										</div>

										<div className="pt-2">
											<span className="inline-block rounded-lg bg-white/5 border border-white/10 px-4 py-1 font-mono text-lg sm:text-xl text-primary-400 font-bold">
												ID: #{currentDisplay.idMember || "------"}
											</span>
										</div>
									</div>
								</div>

								{/* Action Button */}
								<div className="pt-2 sorteio-action">
									<button
										data-testid="draw-button"
										type="button"
										onClick={startRaffle}
										disabled={!isDrawReady}
										className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-primary-500 to-amber-500 hover:from-primary-500/90 hover:to-amber-500/90 px-10 py-5 text-xl font-extrabold text-white shadow-[0_0_30px_rgba(255,94,41,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
									>
										<PartyPopper className="size-6 transition-transform group-hover:rotate-12" />
										Sortear Aluno
									</button>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Bottom Section - Logo Assinatura Horizontal */}
				<div className="flex justify-center items-center pt-2">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src="/logo-assinatura-horizontal.png"
						alt="Panobianco Academia"
						className="h-20 sm:h-24 w-auto object-contain drop-shadow-lg"
					/>
				</div>
			</div>
		</div>
	);
}

export default function SorteioPage() {
	return (
		<Suspense fallback={null}>
			<SorteioContent />
		</Suspense>
	);
}
