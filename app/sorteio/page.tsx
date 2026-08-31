"use client";

import confetti from "canvas-confetti";
import { PartyPopper, Trophy } from "lucide-react";
import { useSearchParams } from "next/navigation";
import {
	Suspense,
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";

import Logo from "@/components/Logo";

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
	const isReelsCaptureMode = searchParams.get("format") === "reels";
	// This is intentionally available only in the opt-in capture route so a
	// previously verified draw can be re-recorded in another social format.
	const captureWinnerName = isCaptureMode
		? searchParams.get("winner")?.trim() || null
		: null;
	const useMockCaptureData = isCaptureMode && searchParams.get("mock") === "1";

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
			if (
				data.success &&
				Array.isArray(data.members) &&
				data.members.length > 0
			) {
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
		if (useMockCaptureData && captureWinnerName) {
			const mockMembers = Array.from({ length: 10 }, (_, index) => ({
				idMember: 0,
				firstName: "Participante",
				lastName: String(index + 1).padStart(2, "0"),
				displayName: `Participante ${String(index + 1).padStart(2, "0")}`,
			}));
			const winnerNameParts = captureWinnerName.split(/\s+/);
			setMembers([
				...mockMembers,
				{
					idMember: 0,
					firstName: winnerNameParts[0],
					lastName: winnerNameParts.slice(1).join(" "),
					displayName: captureWinnerName,
				},
			]);
			setLoading(false);
			return;
		}
		fetchMembersList();
	}, [captureWinnerName, useMockCaptureData]);

	useLayoutEffect(() => {
		document.body.classList.toggle("sorteio-capture-mode", isCaptureMode);
		document.body.classList.toggle(
			"sorteio-feed-capture-mode",
			isCaptureMode && isFeedCaptureMode,
		);
		document.body.classList.toggle(
			"sorteio-reels-capture-mode",
			isCaptureMode && isReelsCaptureMode,
		);

		return () => {
			document.body.classList.remove("sorteio-capture-mode");
			document.body.classList.remove("sorteio-feed-capture-mode");
			document.body.classList.remove("sorteio-reels-capture-mode");
		};
	}, [isCaptureMode, isFeedCaptureMode, isReelsCaptureMode]);

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
			colors: ["#ff6100", "#ffffff", "#cc3300"],
		});
		fire(0.2, {
			spread: 60,
			colors: ["#ff6100", "#cc3300", "#ffffff"],
		});
		fire(0.35, {
			spread: 100,
			decay: 0.91,
			scalar: 0.8,
			colors: ["#cc3300", "#ff6100", "#ffffff"],
		});
		fire(0.1, {
			spread: 120,
			startVelocity: 25,
			decay: 0.92,
			colors: ["#ffffff", "#ff6100"],
		});
		fire(0.1, {
			spread: 120,
			startVelocity: 45,
			colors: ["#cc3300", "#ff6100"],
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

		// A normal page visit remains random. The capture-only route may replay a
		// winner from an already recorded draw so the same result can be exported
		// at another aspect ratio without triggering a new live draw.
		const selectedWinnerIndex = captureWinnerName
			? activeMembers.findIndex(
					(member) =>
						member.displayName.localeCompare(captureWinnerName, "pt-BR", {
							sensitivity: "base",
						}) === 0,
				)
			: Math.floor(Math.random() * activeMembers.length);
		if (selectedWinnerIndex < 0) {
			setError("O vencedor solicitado não está disponível para a regravação.");
			setStatus("idle");
			return;
		}
		const selectedWinner = activeMembers[selectedWinnerIndex];

		let delay = 35; // initial fast delay (ms)
		const duration = 6500; // longer fast run before the reveal
		const startTime = Date.now();

		const step = () => {
			const elapsed = Date.now() - startTime;
			const progress = Math.min(elapsed / duration, 1);

			// Keep names moving fast for most of the draw, then slow near the reveal.
			const easeProgress = progress ** 4;
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

	// Enquanto roda, a caixa mostra o aluno da vez. Parada, ela não finge ser
	// um nome: faz o convite, ou diz o que está acontecendo.
	const currentDisplay = members.length > 0 ? members[currentIndex] : null;

	const idleHeadline = loading
		? "Carregando"
		: error
			? "Não foi possível carregar"
			: "Hora de testar a sorte";

	const idleSubhead = loading
		? "Buscando a lista de alunos ativos da unidade."
		: error
			? error
			: "Todo aluno ativo do Jardim Satélite já está concorrendo.";

	// A cor da arena é o indicador de estado: o clip-path do hexágono corta
	// bordas e rings, então a sinalização precisa vir do fundo.
	const arenaSurface =
		status === "suspense"
			? "bg-pb-orange-warm animate-pulse"
			: status === "winner"
				? "bg-pb-grena"
				: "bg-pb-orange";

	return (
		<div className="sorteio-page font-display relative flex min-h-screen flex-col justify-between overflow-hidden bg-pb-off-white px-4 py-6 text-pb-graphite sm:px-6 sm:py-8">
			<output
				data-testid="draw-status"
				data-status={drawStatus}
				aria-live="polite"
				className="sr-only"
			>
				{drawStatus}
			</output>

			<div className="container-main relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col justify-between py-2">
				{/* Título — o tamanho é sobrescrito pelo CSS de captura. */}
				<div className="text-left">
					<h1
						className="tracking-tight text-pb-orange-warm"
						style={{
							fontSize: "9rem",
							lineHeight: "0.9",
							marginTop: "0.25rem",
							marginBottom: "-1rem",
						}}
					>
						Sorteio semanal
					</h1>
				</div>

				{/* Arena do sorteio */}
				<div className="my-auto py-6">
					<div
						className={`shape-chanfrado px-10 py-12 text-white transition-colors duration-500 sm:px-14 sm:py-16 ${arenaSurface}`}
					>
						{/* Vencedor */}
						{status === "winner" && winner && (
							<div className="animate-in fade-in zoom-in space-y-8 text-center duration-500">
								<span className="shape-octagon-regular mx-auto grid size-24 place-items-center bg-white/20 text-white">
									<Trophy className="block size-12" />
								</span>

								<div className="space-y-4">
									<p className="text-sm uppercase tracking-widest text-white/80">
										Parabéns ao vencedor
									</p>
									<h2
										data-testid="winner-name"
										className="text-[3.5rem] leading-none tracking-tight sm:text-[5rem]"
									>
										{winner.firstName} {winner.lastName}
									</h2>
									{winner.idMember > 0 && (
										<div className="pt-2">
											<span
												data-testid="winner-id"
												className="selo-chanfrado inline-block bg-pb-black px-6 py-2 text-lg text-white"
											>
												ID Aluno: #{winner.idMember}
											</span>
										</div>
									)}
								</div>
							</div>
						)}

						{/* Ocioso e sorteando */}
						{(status === "idle" || status === "spinning") && (
							<div className="space-y-10 text-center">
								{/* Rolagem dos nomes */}
								<div className="shape-chanfrado-menor bg-pb-black px-8 py-10 sm:px-12">
									<div className="flex min-h-[140px] flex-col items-center justify-center space-y-4">
										{status === "spinning" && currentDisplay ? (
											<>
												<div className="scale-105 blur-[0.3px] transition-all duration-75">
													<h2 className="text-[2.5rem] leading-none tracking-tight sm:text-[3.5rem]">
														{currentDisplay.firstName} {currentDisplay.lastName}
													</h2>
												</div>
												<span className="selo-chanfrado inline-block bg-white/15 px-4 py-1 text-lg sm:text-xl">
													ID: #{currentDisplay.idMember}
												</span>
											</>
										) : (
											<>
												<h2 className="text-[2.5rem] leading-none tracking-tight sm:text-[3.5rem]">
													{idleHeadline}
												</h2>
												<p className="max-w-md text-[1.5rem] leading-tight text-white/80">
													{idleSubhead}
												</p>
											</>
										)}
									</div>
								</div>

								{/* Gatilho — o CSS de captura o esconde sem removê-lo. */}
								<div className="sorteio-action pt-2">
									<button
										data-testid="draw-button"
										type="button"
										onClick={startRaffle}
										disabled={!isDrawReady}
										className="botao-chanfrado inline-flex items-center justify-center gap-3 bg-white px-10 py-5 text-sm uppercase tracking-wide text-pb-orange-warm transition-colors hover:bg-pb-off-white disabled:pointer-events-none disabled:opacity-50"
									>
										<PartyPopper className="size-5" />
										Sortear aluno
									</button>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Assinatura */}
				<div className="flex items-center justify-center pt-2">
					<Logo
						variant="dark-on-light"
						showLink={false}
						width={519}
						height={96}
						className="h-20 w-auto sm:h-24"
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
