import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { GitRaffleStore } from './raffle-git-store.mjs';

const git = (dir, ...args) => execFileSync('git', ['-C', dir, ...args], { encoding: 'utf8', stdio: ['pipe','pipe','pipe'] }).trim();
async function fixture() {
  const root = await mkdtemp(path.join(tmpdir(), 'raffle-store-test-'));
  const origin = path.join(root, 'origin.git');
  execFileSync('git', ['init','--bare','--initial-branch=main',origin], { stdio: 'pipe' });
  const dir = path.join(root, 'clone');
  execFileSync('git', ['clone',origin,dir], { stdio: 'pipe' });
  git(dir, 'config','user.name','Raffle fixture'); git(dir,'config','user.email','fixture@example.com');
  await writeFile(path.join(dir,'README.md'),'Private raffle-state fixture.');
  git(dir,'add','README.md'); git(dir,'commit','-m','initialize'); git(dir,'push','origin','main'); git(dir,'fetch','origin');
  return { root, dir, origin };
}

test('private Git checkpoint survives a fresh clone and rejects stale writes', async () => {
  const f = await fixture();
  try {
    const store = new GitRaffleStore(f.dir);
    assert.equal(await store.read('mock-fixture'), null);
    const first = await store.create('mock-fixture', { status:'claimed' });
    await assert.rejects(store.create('mock-fixture', { status:'claimed' }));
    const selected = await store.update('mock-fixture', { status:'selected', winner:{name:'Pessoa Ficticia',id:123} }, first.revision);
    await assert.rejects(store.update('mock-fixture', { status:'sent' }, first.revision));
    const second = path.join(f.root,'second'); execFileSync('git',['clone',f.origin,second],{stdio:'pipe'});
    const recovered = await new GitRaffleStore(second).read('mock-fixture');
    assert.equal(recovered.revision, selected.revision);
    assert.deepEqual(recovered.data, selected.data);
    await assert.rejects(store.read('../unsafe'));
  } finally { await rm(f.root,{recursive:true,force:true}); }
});
