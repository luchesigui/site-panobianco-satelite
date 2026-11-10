import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { executeMockAcceptance } from './raffle-cloud-mock.mjs';

test('CLI refuses live mode and check mode does not send email', () => {
  const script = fileURLToPath(new URL('./raffle-cloud-mock.mjs', import.meta.url));
  assert.match(execFileSync(process.execPath, [script, '--check'], { encoding: 'utf8' }), /No draw or email/);
  assert.throws(() => execFileSync(process.execPath, [script], { env: { ...process.env, RAFFLE_MODE: 'live' }, stdio: 'pipe' }));
});

test('verification failure prevents email delivery', async () => {
  let sent = false;
  await assert.rejects(executeMockAcceptance({ record: async () => Buffer.from('invalid'), verify: async () => { throw new Error('invalid video'); }, send: async () => { sent = true; } }));
  assert.equal(sent, false);
});

test('mock acceptance verifies recording before sending the guide and attachment', async () => {
  const events = [];
  const id = await executeMockAcceptance({
    record: async () => { events.push('record'); return Buffer.from('video'); },
    verify: async () => { events.push('verify'); },
    send: async ({ winner, video, mode }) => { events.push('send'); assert.equal(mode, 'mock'); assert.equal(winner.name, 'Pessoa Ficticia'); assert.ok(video.length); return 'fixture-receipt'; },
  });
  assert.equal(id, 'fixture-receipt');
  assert.deepEqual(events, ['record', 'verify', 'send']);
});
