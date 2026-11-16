import test from 'node:test';
import assert from 'node:assert/strict';
import { selectEligibleCandidate } from './raffle-selection.mjs';
const members = [{idMember:101,displayName:'Candidato Fixture'}, {idMember:2,displayName:'Pessoa Ficticia'}];
test('rejects first indebted candidate and selects the next without repeats',async()=>{
 const checked=[]; const sizes=[];
 const result=await selectEligibleCandidate({members,randomIndex:n=>{sizes.push(n);return 0;},isCandidateEligible:async m=>{checked.push(m.idMember);return m.idMember!==101;}});
 assert.deepEqual(checked,[101,2]); assert.deepEqual(sizes,[2,1]);
 assert.equal(result.member.idMember,2); assert.deepEqual(result.rejectedIds,[101]);
 assert.deepEqual(result.members.map(m=>m.idMember),[2]); assert.equal(members.length,2);
});
test('financial error stops selection rather than trying another candidate',async()=>{
 let checked=0;
 await assert.rejects(selectEligibleCandidate({members,randomIndex:()=>0,isCandidateEligible:async()=>{checked++;throw new Error('EVO unavailable');}}),/EVO unavailable/);
 assert.equal(checked,1);
});
test('all indebted candidates terminates without a winner',async()=>{
 let checks=0;
 await assert.rejects(selectEligibleCandidate({members,randomIndex:()=>0,isCandidateEligible:async()=>{checks++;return false;}}),/No eligible/);
 assert.equal(checks,2);
});
test('requires explicit boolean validation and unique valid IDs',async()=>{
 for(const value of [undefined,null,{},1,'yes']) await assert.rejects(selectEligibleCandidate({members,randomIndex:()=>0,isCandidateEligible:async()=>value}),/validation/);
 await assert.rejects(selectEligibleCandidate({members:[members[0],members[0]],isCandidateEligible:async()=>true}),/participant/);
});
