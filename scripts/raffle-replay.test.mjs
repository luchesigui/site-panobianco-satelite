import test from 'node:test';
import assert from 'node:assert/strict';
import { validateReplay } from './raffle-replay.mjs';

test('replay is tied to the saved member ID even when names repeat', () => {
  const replay = { winner: { id: 2, name: 'Pessoa Ficticia' }, members: [1,2].map(idMember => ({ idMember, firstName:'Pessoa',lastName:'Ficticia',displayName:'Pessoa Ficticia' })) };
  assert.equal(validateReplay(replay).winner.id, 2);
  assert.throws(() => validateReplay({ ...replay, winner:{ id:3,name:'Pessoa Ficticia' } }));
  assert.throws(() => validateReplay({ ...replay, members:[] }));
  assert.throws(() => validateReplay({ ...replay, members:[replay.members[0],replay.members[0]] }));
});
