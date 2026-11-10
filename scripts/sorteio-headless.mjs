import { spawn } from 'node:child_process';
import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';

// An isolated headless browser does not depend on macOS window visibility.
export async function startCaptureBrowser(profileDir) {
  await mkdir(profileDir, { recursive: true, mode: 0o700 });
  const binary = process.env.CAPTURE_CHROME_BINARY || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const child = spawn(binary, [
    '--headless=new', '--remote-debugging-address=127.0.0.1',
    '--remote-debugging-port=0', `--user-data-dir=${profileDir}`,
    '--disable-background-timer-throttling', '--disable-renderer-backgrounding',
    '--disable-backgrounding-occluded-windows', '--no-first-run',
    '--no-default-browser-check', 'about:blank',
  ], { stdio: 'ignore' });
  let launchError;
  let exited = false;
  const exit = new Promise(resolve => {
    child.once('error', error => { launchError = error; exited = true; resolve(); });
    child.once('exit', () => { exited = true; resolve(); });
  });
  const close = async () => {
    if (exited) return;
    child.kill('SIGTERM');
    const force = setTimeout(() => child.kill('SIGKILL'), 5000);
    try { await exit; } finally { clearTimeout(force); }
  };
  try {
    const deadline = Date.now() + 20000;
    while (Date.now() < deadline) {
      if (launchError) throw launchError;
      if (exited) throw new Error('Chrome dedicado encerrou antes da captura.');
      try {
        const port = (await readFile(path.join(profileDir, 'DevToolsActivePort'), 'utf8')).split('\n')[0];
        if (!/^\d+$/.test(port)) throw new Error('Porta CDP inválida.');
        const origin = `http://127.0.0.1:${port}`;
        const response = await fetch(`${origin}/json/version`, { signal: AbortSignal.timeout(2000) });
        if (response.ok) return { origin, close };
      } catch {}
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    throw new Error('Chrome dedicado não disponibilizou CDP em 20 segundos.');
  } catch (error) {
    await close();
    throw error;
  }
}
