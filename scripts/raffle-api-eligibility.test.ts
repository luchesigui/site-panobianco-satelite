import test from 'node:test';
import assert from 'node:assert/strict';
import { getActiveMembers } from '../lib/evo';
import { POST as selectCandidate } from '../app/api/sorteio/selecionar/route';
import { GET } from '../app/api/sorteio/alunos/route';
import { NextRequest } from 'next/server';

test('site uses fresh financial eligibility and never serves a cached or incomplete pool', async () => {
  const originalFetch = globalThis.fetch;
  const keys = ['EVO_DNS', 'EVO_TOKEN', 'EVO_BRANCH_ID'];
  const originalEnv = keys.map(key => process.env[key]);
  let financialCalls = 0;
  let failed = false;
  process.env.EVO_DNS = 'fixture'; process.env.EVO_TOKEN = 'fixture'; process.env.EVO_BRANCH_ID = '1';
  globalThis.fetch = async (url) => {
    if (String(url).includes('/receivables')) {
      financialCalls++;
      if (failed) return Response.json({}, { status: 503 });
      if(new URL(String(url)).searchParams.get('memberId')==='2') return Response.json([]);
      return Response.json({ qtde: 1, lista: [{ idReceivable: 1, idMemberPayer: 1, dueDate: '2020-01-01T00:00:00', status: { id: 4 }, ammount: 100, ammountPaid: 0, cancellationDate: null }] });
    }
    return Response.json([{ idMember: 1, firstName: 'Ana', lastName: 'Silva' }, { idMember: 2, firstName: 'Bia', lastName: 'Souza' }]);
  };
  try {
    assert.deepEqual((await getActiveMembers()).map(x => x.idMember), [1,2]);
    assert.deepEqual((await getActiveMembers()).map(x => x.idMember), [1,2]);
    assert.equal(financialCalls, 0, 'loading candidates must not load financial history');
    const selection = await selectCandidate();
    assert.equal(selection.status,200);
    assert.equal((await selection.json()).winner.idMember,2);
    assert.ok(financialCalls>=1);
    assert.equal(selection.headers.get('cache-control'),'private, no-store');
    const response = await GET(new NextRequest('http://localhost/api/sorteio/alunos'));
    assert.equal(response.headers.get('cache-control'), 'private, no-store');
    assert.equal(response.status, 200);
    failed = true;
    const unavailable=await selectCandidate();
    assert.equal(unavailable.status,503);
    assert.equal((await unavailable.json()).winner,undefined);
  } finally {
    globalThis.fetch = originalFetch;
    keys.forEach((key, i) => { if (originalEnv[i] === undefined) delete process.env[key]; else process.env[key] = originalEnv[i]; });
  }
});
