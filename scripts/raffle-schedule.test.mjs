import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveRaffleRun } from './raffle-schedule.mjs';

test('Sunday live period uses Sao Paulo date and only scheduled main can select', () => {
  const base={mode:'live',eventName:'schedule',ref:'refs/heads/main',now:new Date('2026-11-15T14:00:00Z')};
  assert.equal(resolveRaffleRun(base).key,'live-2026-11-15');
  assert.throws(()=>resolveRaffleRun({...base,eventName:'workflow_dispatch'}));
  assert.throws(()=>resolveRaffleRun({...base,ref:'refs/heads/feature'}));
  assert.throws(()=>resolveRaffleRun({...base,now:new Date('2026-11-16T14:00:00Z')}));
  assert.throws(()=>resolveRaffleRun({...base,now:new Date('2026-11-15T02:00:00Z')}));
});

test('manual recovery cannot invent a new or future period and mock is separate', () => {
  const now=new Date('2026-11-16T14:00:00Z');
  assert.deepEqual(resolveRaffleRun({mode:'recover',period:'2026-11-15',now}),{mode:'live',key:'live-2026-11-15',recoverOnly:true});
  assert.throws(()=>resolveRaffleRun({mode:'recover',period:'2026-11-22',now}));
  assert.throws(()=>resolveRaffleRun({mode:'recover',period:'2026-11-16',now}));
  assert.equal(resolveRaffleRun({mode:'mock',runId:'123',now}).key,'mock-123');
  assert.equal(resolveRaffleRun({mode:'preflight',now}).mode,'preflight');
  assert.equal(resolveRaffleRun({mode:'watchdog',eventName:'schedule',ref:'refs/heads/main',now:new Date('2026-11-15T15:30:00Z')}).key,'live-2026-11-15');
});
