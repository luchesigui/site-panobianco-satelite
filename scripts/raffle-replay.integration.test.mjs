import test from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { startCaptureBrowser } from './sorteio-headless.mjs';
const exec = promisify(execFile);

test('real capture replays a saved ID without a new selection or member API', { skip: process.env.RAFFLE_INTEGRATION !== '1', timeout:180_000 }, async () => {
  const dir = await mkdtemp(path.join(tmpdir(),'raffle-replay-integration-'));
  let browser;
  try {
    const file = path.join(dir,'replay.json');
    await writeFile(file,JSON.stringify({ winner:{id:2,name:'Pessoa Ficticia'}, members:[1,2].map(idMember=>({idMember,firstName:'Pessoa',lastName:'Ficticia',displayName:'Pessoa Ficticia'})) }));
    browser = await startCaptureBrowser(path.join(dir,'browser'));
    const { stdout } = await exec(process.execPath,['scripts/record-sorteio.mjs'],{cwd:new URL('../',import.meta.url),timeout:150_000,maxBuffer:2*1024*1024,env:{...process.env,CAPTURE_CDP_ORIGIN:browser.origin,CAPTURE_FORMAT:'reels',CAPTURE_MOCK:'1',CAPTURE_WINNER:'Pessoa Ficticia',CAPTURE_REPLAY_FILE:file,CAPTURE_OUTPUT_DIR:dir}});
    const metadata=JSON.parse(stdout.trim().split('\n').findLast(line=>line.startsWith('{')));
    assert.equal(metadata.winnerId,'2');
    assert.equal(metadata.width,1080); assert.equal(metadata.height,1920);
  } finally { await browser?.close(); await rm(dir,{recursive:true,force:true}); }
});
