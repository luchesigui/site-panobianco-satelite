import { writeFile } from "node:fs/promises";

const url = "http://mac-mini:3005/sorteio?capture=1&format=feed";
const output = "/Users/guilhermeluchesi/Desktop/preview-sorteio-feed-v6.png";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const targets = await fetch("http://127.0.0.1:9223/json").then((response) => response.json());
const target = targets.find((item) => item.type === "page");
if (!target) throw new Error("Nenhuma aba disponível no Chrome de captura.");

const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});
let nextId = 0;
const requests = new Map();
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  const request = requests.get(message.id);
  if (!request) return;
  requests.delete(message.id);
  message.error ? request.reject(new Error(message.error.message)) : request.resolve(message.result);
});
function send(method, params = {}) {
  const id = ++nextId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => requests.set(id, { resolve, reject }));
}

try {
  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 1080, height: 1350, deviceScaleFactor: 1, mobile: false });
  await send("Page.navigate", { url });
  await sleep(5000);
  const screenshot = await send("Page.captureScreenshot", { format: "png", fromSurface: true, captureBeyondViewport: false });
  await writeFile(output, Buffer.from(screenshot.data, "base64"));
  console.log(output);
} finally {
  socket.close();
}
