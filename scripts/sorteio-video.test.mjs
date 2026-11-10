import assert from "node:assert/strict";
import test from "node:test";

import { assertRaffleVideo } from "./sorteio-video.mjs";

const validProbe = {
  streams: [{ codec_name: "h264", width: 1080, height: 1920, avg_frame_rate: "30/1" }],
  format: { duration: "12.333333" },
};

test("assertRaffleVideo accepts a verified vertical raffle video without requiring a 15 second trim", () => {
  assert.doesNotThrow(() => assertRaffleVideo(validProbe));
});

test("assertRaffleVideo rejects videos shorter than the completed draw sequence", () => {
  assert.throws(
    () => assertRaffleVideo({ ...validProbe, format: { duration: "7.900000" } }),
    /duração mínima/,
  );
});

test("assertRaffleVideo rejects a non-vertical export", () => {
  assert.throws(
    () => assertRaffleVideo({ ...validProbe, streams: [{ ...validProbe.streams[0], height: 1350 }] }),
    /1080x1920/,
  );
});
