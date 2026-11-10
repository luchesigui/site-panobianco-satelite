import test from 'node:test';
import assert from 'node:assert/strict';
import { keepScheduleActive } from './raffle-keepalive.mjs';

test('only stale public source receives an empty same-tree, non-forced keepalive commit',async()=>{
  for(const date of ['2026-11-09T14:00:00Z','2026-10-01T14:00:00Z']){
    const calls=[]; let head='parent'; let reads=0;
    const github={rest:{git:{getRef:async()=>{reads++;return {data:{object:{sha:head}}};},getCommit:async()=>({data:{tree:{sha:'same-tree'},committer:{date}}}),createCommit:async data=>{calls.push(data);return {data:{sha:'empty-child'}};},updateRef:async data=>{calls.push(data);head=data.sha;}}}};
    const result=await keepScheduleActive({github,owner:'fixture',repo:'fixture',now:new Date('2026-11-10T14:00:00Z')});
    if(date.startsWith('2026-11'))assert.equal(calls.length,0);
    else {assert.equal(calls[0].tree,'same-tree');assert.deepEqual(calls[0].parents,['parent']);assert.equal(calls[1].force,false);assert.equal(calls[1].ref,'heads/main');assert.equal(result,'keepalive_committed');assert.equal(reads,2);}
  }
});
