export async function requireCaptureFrame(frameCount, timeoutMs = 5000) {
  const deadline = Date.now() + timeoutMs;
  while (frameCount() === 0) {
    if (Date.now() >= deadline) {
      throw new Error("Nenhum frame recebido antes do sorteio. Sorteio não iniciado.");
    }
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
}

export function chooseCaptureTarget(targets) {
  const pages = targets.filter(
    (item) => item.type === "page" && item.webSocketDebuggerUrl,
  );
  const rafflePage = pages.find((item) => item.url.includes("/sorteio"));
  if (rafflePage) return rafflePage;

  const fallbackPage = pages.find(
    (item) => item.url === "about:blank" || item.url.startsWith("http"),
  );
  if (fallbackPage) return fallbackPage;

  throw new Error("Chrome CDP não disponibilizou uma página disponível para captura.");
}
