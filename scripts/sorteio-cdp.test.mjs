import assert from "node:assert/strict";
import test from "node:test";

import { chooseCaptureTarget } from "./sorteio-cdp.mjs";

test("chooseCaptureTarget prefers an existing raffle page", () => {
  const blank = { type: "page", url: "about:blank", webSocketDebuggerUrl: "ws://blank" };
  const raffle = { type: "page", url: "http://127.0.0.1:3005/sorteio", webSocketDebuggerUrl: "ws://raffle" };

  assert.equal(chooseCaptureTarget([blank, raffle]), raffle);
});

test("chooseCaptureTarget falls back to a blank page when no raffle tab exists", () => {
  const blank = { type: "page", url: "about:blank", webSocketDebuggerUrl: "ws://blank" };

  assert.equal(chooseCaptureTarget([blank]), blank);
});

test("chooseCaptureTarget rejects a CDP response without an attachable page", () => {
  assert.throws(
    () => chooseCaptureTarget([{ type: "service_worker", url: "http://127.0.0.1:3005" }]),
    /página disponível/,
  );
});
