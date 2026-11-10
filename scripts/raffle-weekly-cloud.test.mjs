import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const script=fileURLToPath(new URL('./raffle-weekly-cloud.mjs',import.meta.url));
test('weekly entrypoint check never draws or sends, and manual live mode is refused',()=>{
  assert.match(execFileSync(process.execPath,[script,'--check'],{encoding:'utf8'}),/No draw or email/);
  assert.throws(()=>execFileSync(process.execPath,[script],{env:{...process.env,RAFFLE_MODE:'live',GITHUB_EVENT_NAME:'workflow_dispatch',GITHUB_REF:'refs/heads/main'},stdio:'pipe'}));
});
