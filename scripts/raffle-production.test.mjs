import test from 'node:test';
import assert from 'node:assert/strict';
import { runRafflePeriod } from './raffle-production.mjs';

const members = [{ idMember: 1, firstName: 'Pessoa', lastName: 'Ficticia', displayName: 'Pessoa Ficticia' }, { idMember: 2, firstName: 'Outra', lastName: 'Pessoa', displayName: 'Outra Pessoa' }];
function memoryStore() {
  let saved = null; let version = 0;
  return {
    async read() { return structuredClone(saved); },
    async create(key, data) { if (saved) throw new Error('conflict'); saved = { data: structuredClone(data), revision: String(++version) }; return structuredClone(saved); },
    async update(key, data, revision) { if (saved?.revision !== revision) throw new Error('conflict'); saved = { data: structuredClone(data), revision: String(++version) }; return structuredClone(saved); },
  };
}
function options(store, extra = {}) {
  return { store, key: 'mock-fixture', mode: 'mock', loadMembers: async () => members, randomIndex: () => 1,
    renderEmail: async ({ winner }) => ({ text: winner.name, attachments: [{ content: 'Zml4dHVyZQ==' }] }),
    send: async () => 'fixture-receipt', now: () => new Date('2026-11-15T14:00:00Z'), ...extra };
}

test('eligibility failure before selection does not claim the period', async () => {
  const store = memoryStore();
  await assert.rejects(runRafflePeriod(options(store, { loadMembers: async () => { throw new Error('API unavailable'); } })));
  assert.equal(await store.read(), null);
});

test('unknown or stale sending state fails closed without email or draw', async () => {
  for (const status of ['unexpected', 'sending']) {
    const store = memoryStore();
    await store.create('mock-fixture', { schema: 1, key: 'mock-fixture', mode: 'mock', status, sendingAt: '2026-11-14T14:00:00Z', payload: {} });
    let sent = false;
    await assert.rejects(runRafflePeriod(options(store, { send: async () => { sent = true; }, loadMembers: async () => { throw new Error('must not load'); } })));
    assert.equal(sent, false);
  }
});

test('render failure resumes saved winner without loading or selecting again', async () => {
  const store = memoryStore();
  await assert.rejects(runRafflePeriod(options(store, { renderEmail: async () => { throw new Error('export failed'); } })));
  assert.equal((await store.read()).data.status, 'selected');
  assert.equal((await runRafflePeriod(options(store, { recoverOnly: true, loadMembers: async () => { throw new Error('must not reload'); }, randomIndex: () => { throw new Error('must not redraw'); } }))).status, 'sent');
});

test('uncertain email failure reuses byte-identical saved payload and idempotency key', async () => {
  const store = memoryStore(); let previous;
  await assert.rejects(runRafflePeriod(options(store, { send: async (payload, key) => { previous = { payload, key }; throw new Error('network timeout'); } })));
  assert.equal((await store.read()).data.status, 'sending');
  await runRafflePeriod(options(store, { recoverOnly: true, renderEmail: async () => { throw new Error('must not render'); }, send: async (payload, key) => { assert.deepEqual({ payload, key }, previous); return 'fixture-receipt'; } }));
});

test('ambiguous claimed state and missing recovery do not trigger a draw', async () => {
  const store = memoryStore();
  await assert.rejects(runRafflePeriod(options(store, { recoverOnly: true })));
  assert.equal(await store.read(), null);
  await store.create('mock-fixture', { schema: 1, key: 'mock-fixture', mode: 'mock', status: 'claimed' });
  await assert.rejects(runRafflePeriod(options(store)), /Ambiguous/);
});

test('concurrent period attempts commit and send one winner only', async () => {
  const store = memoryStore(); let selections = 0; let sends = 0;
  const config = options(store, { randomIndex: () => { selections++; return 0; }, send: async () => { sends++; return 'fixture-receipt'; } });
  const results = await Promise.allSettled([runRafflePeriod(config), runRafflePeriod(config)]);
  assert.equal(results.filter(x => x.status === 'fulfilled').length, 1);
  assert.equal(selections, 1); assert.equal(sends, 1);
});

test('persists selection before rendering and skips an already sent period', async () => {
  const store = memoryStore(); let renders = 0; let selections = 0; let sends = 0;
  const config = options(store, { randomIndex: () => { selections++; return 1; }, renderEmail: async ({ winner }) => {
    assert.equal((await store.read()).data.status, 'selected'); renders++; return { text: winner.name };
  }, send: async () => { assert.equal((await store.read()).data.status, 'sending'); sends++; return 'fixture-receipt'; } });
  assert.equal((await runRafflePeriod(config)).status, 'sent');
  assert.equal((await runRafflePeriod(config)).status, 'already_sent');
  assert.equal(selections, 1); assert.equal(renders, 1); assert.equal(sends, 1);
  assert.equal((await store.read()).data.winner.id, 2);
});
