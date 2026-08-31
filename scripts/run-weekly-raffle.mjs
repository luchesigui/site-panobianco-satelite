import { execFile, spawn } from "node:child_process";
import { constants } from "node:fs";
import { access, mkdir, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	"..",
);
const desktopVideo = path.join(
	process.env.HOME,
	"Desktop",
	"sorteio-semanal-reels-15s.mp4",
);
const captureFormat = "reels";
const preferredOrigin = process.env.CAPTURE_ORIGIN || "http://127.0.0.1:3005";
const cdpVersionUrl = "http://127.0.0.1:9223/json/version";
const isCheckOnly = process.argv.includes("--check");

function run(command, args, options = {}) {
	return new Promise((resolve, reject) => {
		execFile(
			command,
			args,
			{ cwd: projectDir, maxBuffer: 4 * 1024 * 1024, ...options },
			(error, stdout, stderr) => {
				if (error) {
					reject(
						new Error(
							`${command} ${args.join(" ")} falhou: ${stderr.trim() || error.message}`,
						),
					);
					return;
				}
				resolve({ stdout, stderr });
			},
		);
	});
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitFor(url, timeoutMs, label) {
	const startedAt = Date.now();
	let lastError = null;
	while (Date.now() - startedAt < timeoutMs) {
		try {
			const response = await fetch(url);
			if (response.ok) return response;
			lastError = new Error(`HTTP ${response.status}`);
		} catch (error) {
			lastError = error;
		}
		await sleep(1000);
	}
	throw new Error(
		`${label} não ficou disponível: ${lastError?.message || "tempo esgotado"}`,
	);
}

async function ensureChromeCdp() {
	try {
		await waitFor(cdpVersionUrl, 1000, "Chrome CDP");
		return;
	} catch {}

	const profileDir = "/tmp/panobianco-sorteio-cdp";
	await mkdir(profileDir, { recursive: true });
	await run("open", [
		"-na",
		"Google Chrome",
		"--args",
		"--remote-debugging-port=9223",
		`--user-data-dir=${profileDir}`,
		"--no-first-run",
		"--no-default-browser-check",
		"about:blank",
	]);
	await waitFor(cdpVersionUrl, 30_000, "Chrome CDP");
}

async function ensureCaptureOrigin() {
	try {
		await waitFor(
			`${preferredOrigin}/sorteio?capture=1&format=${captureFormat}`,
			5_000,
			"Página do sorteio",
		);
		return preferredOrigin;
	} catch {}

	const devServer = spawn("npm", ["run", "dev", "--", "-p", "3005"], {
		cwd: projectDir,
		detached: true,
		stdio: "ignore",
	});
	devServer.unref();
	const localOrigin = "http://127.0.0.1:3005";
	await waitFor(
		`${localOrigin}/sorteio?capture=1&format=${captureFormat}`,
		90_000,
		"Servidor local do sorteio",
	);
	return localOrigin;
}

async function assertPrerequisites() {
	for (const file of [
		"scripts/record-sorteio.mjs",
		"scripts/capture-sorteio-layout.mjs",
	]) {
		await access(path.join(projectDir, file), constants.R_OK);
	}
	await run("node", ["--check", "scripts/record-sorteio.mjs"]);
	await run("node", ["--check", "scripts/capture-sorteio-layout.mjs"]);
	await run("npm", ["--version"]);
	await run("ffmpeg", ["-version"]);
	await run("ffprobe", ["-version"]);
	await run("sips", ["--help"]);
}

function parseRecordingMetadata(output) {
	const lines = output
		.split("\n")
		.map((line) => line.trim())
		.filter(Boolean);
	const jsonLine = [...lines]
		.reverse()
		.find((line) => line.startsWith("{") && line.endsWith("}"));
	if (!jsonLine)
		throw new Error("O gravador não retornou os metadados do sorteio.");
	const metadata = JSON.parse(jsonLine);
	if (!metadata.videoPath || !metadata.winner || !metadata.winnerId) {
		throw new Error(
			"Metadados do sorteio incompletos. O resultado foi gravado, mas não será repetido.",
		);
	}
	return metadata;
}

async function verifyAndTrim(videoPath) {
	await unlink(desktopVideo).catch((error) => {
		if (error.code !== "ENOENT") throw error;
	});
	await run("ffmpeg", [
		"-y",
		"-loglevel",
		"error",
		"-i",
		videoPath,
		"-t",
		"15",
		"-c:v",
		"libx264",
		"-preset",
		"medium",
		"-crf",
		"18",
		"-pix_fmt",
		"yuv420p",
		"-movflags",
		"+faststart",
		"-an",
		desktopVideo,
	]);
	const { stdout } = await run("ffprobe", [
		"-v",
		"error",
		"-show_entries",
		"format=duration",
		"-show_entries",
		"stream=codec_name,width,height,avg_frame_rate",
		"-of",
		"json",
		desktopVideo,
	]);
	const probe = JSON.parse(stdout);
	const video = probe.streams?.[0];
	if (
		video?.codec_name !== "h264" ||
		video.width !== 1080 ||
		video.height !== 1920 ||
		video.avg_frame_rate !== "30/1" ||
		probe.format?.duration !== "15.000000"
	) {
		throw new Error(
			"O vídeo exportado não passou na validação H.264, 1080x1920, 30 fps e 15 segundos.",
		);
	}
}

function caption() {
	return "Sorteio da semana concluído 🧡\n\nMais uma semana de treino, constância e uma surpresa para quem faz parte da Panobianco Jardim Satélite.\n\nParabéns ao vencedor! Que essa conquista seja mais um motivo para seguir em movimento.\n\nAinda não treina com a gente em São José dos Campos? Agende sua aula experimental gratuita pelo link na bio.";
}

try {
	await assertPrerequisites();
	if (isCheckOnly) {
		console.log(
			"Runner semanal validado: scripts, Node, FFmpeg e FFprobe disponíveis. Nenhum sorteio foi realizado.",
		);
		process.exit(0);
	}

	await ensureChromeCdp();
	const captureOrigin = await ensureCaptureOrigin();
	const preview = await run("node", ["scripts/capture-sorteio-layout.mjs"], {
		env: { ...process.env, CAPTURE_ORIGIN: captureOrigin, CAPTURE_FORMAT: captureFormat },
	});
	const previewPath = preview.stdout.trim();
	const { stdout: dimensions } = await run("sips", [
		"-g",
		"pixelWidth",
		"-g",
		"pixelHeight",
		previewPath,
	]);
	if (
		!dimensions.includes("pixelWidth: 1080") ||
		!dimensions.includes("pixelHeight: 1920")
	) {
		throw new Error(
			"A prévia do sorteio não está em 1080x1920. Nenhum clique foi realizado.",
		);
	}

	const recording = await run("node", ["scripts/record-sorteio.mjs"], {
		env: { ...process.env, CAPTURE_ORIGIN: captureOrigin, CAPTURE_FORMAT: captureFormat },
	});
	const metadata = parseRecordingMetadata(recording.stdout);
	await verifyAndTrim(metadata.videoPath);

	console.log(
		`Sorteio semanal concluído.\n\nArquivo final: ${desktopVideo}\n\nVencedor: ${metadata.winner}\nID: ${metadata.winnerId}\n\nLegenda:\n${caption()}`,
	);
} catch (error) {
	console.error(`Sorteio semanal não concluído: ${error.message}`);
	process.exitCode = 1;
}
