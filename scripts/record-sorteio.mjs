import { mkdir, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";

const baseUrl = "http://mac-mini:3005/sorteio?capture=1&format=feed";
const outputDir = path.resolve("artifacts/sorteio");
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const framesDir = path.join(outputDir, `frames-${stamp}`);
const videoPath = path.join(outputDir, `sorteio-feed-${stamp}.mp4`);
const metaPath = path.join(outputDir, `sorteio-feed-${stamp}.json`);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function chromeTarget() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const targets = await fetch("http://127.0.0.1:9223/json").then((r) => r.json());
      const target = targets.find((item) => item.type === "page" && item.url.includes("/sorteio"));
      if (target) return target;
    } catch {}
    await sleep(250);
  }
  throw new Error("Chrome CDP não disponibilizou a página do sorteio.");
}

function createCdp(wsUrl, onFrame) {
  const ws = new WebSocket(wsUrl);
  const pending = new Map();
  let messageId = 0;
  ws.addEventListener("message", async (event) => {
    const message = JSON.parse(event.data);
    if (message.method === "Page.screencastFrame") {
      await onFrame(message.params);
      ws.send(JSON.stringify({ id: ++messageId, method: "Page.screencastFrameAck", params: { sessionId: message.params.sessionId } }));
      return;
    }
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
    }
  });
  const ready = new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve, { once: true });
    ws.addEventListener("error", reject, { once: true });
  });
  return {
    ready,
    send(method, params = {}) {
      const id = ++messageId;
      ws.send(JSON.stringify({ id, method, params }));
      return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
    },
    close() { ws.close(); },
  };
}

async function status(cdp) {
  const result = await cdp.send("Runtime.evaluate", {
    expression: "document.querySelector('[data-testid=draw-status]')?.dataset.status || 'missing'",
    returnByValue: true,
  });
  return result.result.value;
}

async function waitFor(cdp, accepted, timeoutMs) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const current = await status(cdp);
    if (accepted.includes(current)) return current;
    await sleep(100);
  }
  throw new Error(`Tempo esgotado aguardando estado: ${accepted.join(', ')}`);
}

await mkdir(framesDir, { recursive: true });
const target = await chromeTarget();
const frames = [];
const cdp = createCdp(target.webSocketDebuggerUrl, async ({ data, metadata }) => {
  const index = String(frames.length).padStart(5, "0");
  const file = path.join(framesDir, `${index}.jpg`);
  await writeFile(file, Buffer.from(data, "base64"));
  frames.push({ file, timestamp: metadata.timestamp ?? Date.now() / 1000 });
});

try {
  await cdp.ready;
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  // Start a fresh page state so this recording performs exactly one new live draw.
  await cdp.send("Page.navigate", { url: baseUrl });
  await sleep(500);
  const initialStatus = await waitFor(cdp, ["ready", "error"], 120_000);
  if (initialStatus !== "ready") throw new Error("O sorteio não ficou pronto para gravação.");

  await cdp.send("Page.startScreencast", {
    format: "jpeg",
    quality: 95,
    maxWidth: 1080,
    maxHeight: 1350,
    everyNthFrame: 1,
  });

  // Shorter lead-in so the draw begins half a second sooner.
  await sleep(1500);
  const click = await cdp.send("Runtime.evaluate", {
    expression: `(() => {
      const button = document.querySelector('[data-testid=draw-button]');
      if (!button || button.disabled) return {ok:false, reason:'botão indisponível'};
      button.click();
      return {ok:true};
    })()`,
    returnByValue: true,
  });
  if (!click.result.value?.ok) throw new Error(click.result.value?.reason || "Não foi possível iniciar o sorteio.");

  const completed = await waitFor(cdp, ["completed", "error"], 30_000);
  if (completed !== "completed") throw new Error("O sorteio retornou erro durante a gravação.");
  // Capture a full, animated winner state instead of extending one frozen frame.
  await sleep(10000);
  const winner = await cdp.send("Runtime.evaluate", {
    expression: "document.querySelector('[data-testid=winner-name]')?.textContent?.trim() || null",
    returnByValue: true,
  });

  await cdp.send("Page.stopScreencast");
  if (frames.length < 20) throw new Error(`Foram recebidos poucos frames: ${frames.length}`);

  const lines = [
    `file '${frames[0].file.replace(/'/g, "'\\''")}'`,
    "duration 2.000000",
  ];
  for (let i = 0; i < frames.length; i += 1) {
    const duration = Math.max(1 / 60, Math.min(0.25, (frames[i + 1]?.timestamp ?? frames[i].timestamp + 0.1) - frames[i].timestamp));
    lines.push(`file '${frames[i].file.replace(/'/g, "'\\''")}'`);
    lines.push(`duration ${duration.toFixed(6)}`);
  }
  lines.push(`file '${frames.at(-1).file.replace(/'/g, "'\\''")}'`);
  // Repeat only one frame interval to close the concat stream, not as a frozen hold.
  lines.push("duration 0.033333");
  lines.push(`file '${frames.at(-1).file.replace(/'/g, "'\\''")}'`);
  const concatPath = path.join(framesDir, "frames.txt");
  await writeFile(concatPath, `${lines.join("\n")}\n`);
  execFileSync("ffmpeg", ["-y", "-f", "concat", "-safe", "0", "-i", concatPath, "-vf", "fps=30,scale=1080:1350:flags=lanczos,format=yuv420p", "-c:v", "libx264", "-crf", "18", "-preset", "medium", "-movflags", "+faststart", videoPath], { stdio: "inherit" });

  const metadata = { videoPath, frames: frames.length, winner: winner.result.value, sourceUrl: baseUrl, width: 1080, height: 1350, captureFps: 30 };
  await writeFile(metaPath, `${JSON.stringify(metadata, null, 2)}\n`);
  console.log(JSON.stringify(metadata));
} finally {
  try { await cdp.send("Page.stopScreencast"); } catch {}
  cdp.close();
}
