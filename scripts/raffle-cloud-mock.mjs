import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { startCaptureBrowser } from './sorteio-headless.mjs';
import { assertRaffleVideo } from './sorteio-video.mjs';
import { buildRaffleEmail, sendRaffleEmail } from './raffle-email.mjs';
const exec = promisify(execFile);
const root = fileURLToPath(new URL('../', import.meta.url));

async function main() {
  if (process.env.RAFFLE_MODE && process.env.RAFFLE_MODE !== 'mock') throw new Error('This acceptance runner cannot perform live draws.');
  if (process.argv.includes('--check')) {
    console.log('Mock acceptance entrypoint ready. No draw or email.');
    return;
  }
  for (const key of ['RESEND_API_KEY', 'RAFFLE_EMAIL_FROM', 'RAFFLE_EMAIL_TO', 'RAFFLE_RUN_KEY']) {
    if (!process.env[key]) throw new Error(`Missing configuration: ${key}`);
  }
  const dir = await mkdtemp(path.join(tmpdir(), 'raffle-cloud-mock-'));
  let browser;
  let recordedPath;
  try {
    browser = await startCaptureBrowser(path.join(dir, 'browser'));
    const receipt = await executeMockAcceptance({
      record: async () => {
        const { stdout } = await exec(process.execPath, ['scripts/record-sorteio.mjs'], {
          cwd: root, timeout: 180_000, maxBuffer: 2 * 1024 * 1024,
          env: { ...process.env, CAPTURE_FORMAT: 'reels', CAPTURE_MOCK: '1', CAPTURE_WINNER: 'Pessoa Ficticia', CAPTURE_OUTPUT_DIR: dir, CAPTURE_CDP_ORIGIN: browser.origin },
        });
        const line = stdout.trim().split('\n').findLast(line => line.startsWith('{'));
        const metadata = JSON.parse(line);
        recordedPath = path.resolve(metadata.videoPath);
        if (path.dirname(recordedPath) !== dir) throw new Error('Unexpected video path.');
        return readFile(recordedPath);
      },
      verify: async () => {
        const { stdout } = await exec('ffprobe', ['-v', 'error', '-show_entries', 'format=duration,size:stream=codec_name,width,height,avg_frame_rate', '-of', 'json', recordedPath]);
        const probe = JSON.parse(stdout);
        assertRaffleVideo(probe);
        console.log(JSON.stringify({ verified: true, width: 1080, height: 1920, duration: probe.format.duration, bytes: probe.format.size }));
      },
      send: async (data) => sendRaffleEmail({ apiKey: process.env.RESEND_API_KEY, idempotencyKey: process.env.RAFFLE_RUN_KEY, payload: buildRaffleEmail({ ...data, from: process.env.RAFFLE_EMAIL_FROM, to: process.env.RAFFLE_EMAIL_TO }) }),
    });
    console.log(JSON.stringify({ mode: 'mock', receipt, message: 'Provider accepted email; inbox receipt still requires verification.' }));
  } finally {
    await browser?.close();
    await rm(dir, { recursive: true, force: true });
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().catch(error => {
    if (/^MAIL_HTTP_\d{3}$/.test(error?.code || '')) {
      console.error(JSON.stringify({ code: error.code, reason: /^[A-Z_]+$/.test(error.safeReason || '') ? error.safeReason : 'PROVIDER_REJECTION' }));
    }
    console.error('Cloud acceptance failed. No live draw was performed. Inspect configuration, rendering or email provider.');
    process.exitCode = 1;
  });
}

export async function executeMockAcceptance({ record, verify, send }) {
  const video = await record();
  await verify(video);
  return send({ winner: { name: 'Pessoa Ficticia', id: 123 }, video, mode: 'mock' });
}
