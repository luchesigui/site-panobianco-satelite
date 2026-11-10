import test from 'node:test';
import assert from 'node:assert/strict';
import * as guard from './sorteio-cdp.mjs';

test('capture guard aborts before drawing when no frame arrives', async () => {
  assert.equal(typeof guard.requireCaptureFrame, 'function');
  let triggered = false;
  await assert.rejects(async () => {
    await guard.requireCaptureFrame(() => 0, 30);
    triggered = true;
  }, /Nenhum frame.*antes do sorteio/);
  assert.equal(triggered, false);
});

test('capture guard permits drawing only after a frame arrives', async () => {
  assert.equal(typeof guard.requireCaptureFrame, 'function');
  let frames = 0;
  const timer = setTimeout(() => { frames = 1; }, 10);
  try { await guard.requireCaptureFrame(() => frames, 500); }
  finally { clearTimeout(timer); }
});
