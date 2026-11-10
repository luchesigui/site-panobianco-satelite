import test from 'node:test';
import assert from 'node:assert/strict';
import { buildRaffleEmail, sendRaffleEmail } from './raffle-email.mjs';

test('test email contains guide, fictional winner and MP4 attachment', () => {
  const payload = buildRaffleEmail({
    winner: { name: 'Pessoa Ficticia', id: 123 }, video: Buffer.from('fixture'),
    from: 'Sorteio <sorteio@example.com>', to: 'recipient@example.com', mode: 'mock',
  });
  assert.match(payload.subject, /TESTE/);
  assert.match(payload.text, /fictício/);
  assert.match(payload.text, /Pessoa Ficticia/);
  assert.match(payload.text, /123/);
  assert.match(payload.text, /1\..*stories/);
  assert.match(payload.text, /2\..*destaques/);
  assert.match(payload.text, /3\..*grupo/);
  assert.equal(payload.attachments[0].filename, 'sorteio-semanal-reels.mp4');
  assert.equal(Buffer.from(payload.attachments[0].content, 'base64').toString(), 'fixture');
  assert.deepEqual(payload.to, ['recipient@example.com']);
});

test('rejects unsafe or incomplete email inputs before sending', () => {
  const valid = { winner: { name: 'Pessoa Ficticia', id: 123 }, video: Buffer.from('fixture'), from: 'sender@example.com', to: 'recipient@example.com', mode: 'mock' };
  for (const invalid of [{ mode: 'unknown' }, { winner: null }, { video: Buffer.alloc(0) }, { video: Buffer.alloc(18 * 1024 * 1024 + 1) }, { to: 'bad\r\nBcc:other@example.com' }, { from: '' }]) {
    assert.throws(() => buildRaffleEmail({ ...valid, ...invalid }));
  }
});

test('send returns a provider receipt with explicit idempotency and no retries', async () => {
  let calls = 0;
  const id = await sendRaffleEmail({ apiKey: 'fixture-key', payload: { text: 'fixture' }, idempotencyKey: 'mock-2026-11-15', fetchImpl: async (url, options) => {
    calls++;
    assert.equal(url, 'https://api.resend.com/emails');
    assert.equal(options.headers['Idempotency-Key'], 'mock-2026-11-15');
    assert.equal(options.headers.Authorization, 'Bearer fixture-key');
    assert.equal(options.method, 'POST');
    return new Response(JSON.stringify({ id: 'fixture-message' }), { status: 200 });
  } });
  assert.equal(id, 'fixture-message');
  assert.equal(calls, 1);
});
