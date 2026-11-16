// Explicit local acceptance probe: real EVO reads, in-memory state, no real draw/email.
import nextEnv from '@next/env';
import { fetchEligibleMembers } from './raffle-eligibility.mjs';
import { hasOverdueDebt } from './raffle-candidate-eligibility.mjs';
import { runRafflePeriod } from './raffle-production.mjs';

nextEnv.loadEnvConfig(process.cwd());
const memberId = Number(process.argv[2]);
if (!Number.isSafeInteger(memberId) || memberId <= 0) throw new Error('Provide the reported member ID.');
let memberRequests=0, financialRequests=0;
const config = { dns:process.env.EVO_DNS,token:process.env.EVO_TOKEN,branchId:process.env.EVO_BRANCH_ID,
  fetchImpl:async(url,options)=>{
    if(new URL(url).pathname.endsWith('/receivables')) financialRequests++; else memberRequests++;
    await new Promise(resolve=>setTimeout(resolve,2200));
    return fetch(url,options);
  },
};
const pool = await fetchEligibleMembers({...config,checkFinances:false});
const reported = pool.find(m=>m.idMember===memberId);
if(!reported) throw new Error('Reported member not in current active candidate pool.');
let saved=null, revision=0, simulatedSends=0;
const store={
 read:async()=>structuredClone(saved),
 create:async(key,data)=>{if(saved)throw new Error('Conflict');return saved={data:structuredClone(data),revision:String(++revision)};},
 update:async(key,data,expected)=>{if(saved?.revision!==expected)throw new Error('Conflict');return saved={data:structuredClone(data),revision:String(++revision)};},
};
const checked=[];
await runRafflePeriod({store,key:'live-local-candidate-acceptance',mode:'live',
 loadMembers:async()=>[reported,...pool.filter(m=>m.idMember!==memberId)],
 randomIndex:()=>0,
 isCandidateEligible:async member=>{
   checked.push(member.idMember);
   return !(await hasOverdueDebt({...config,memberId:member.idMember}));
 },
 renderEmail:async record=>{
   if(record.winner.id===memberId || !record.rejectedIds.includes(memberId)) throw new Error('Reported debtor was not rejected.');
   return {fixture:true};
 },
 send:async payload=>{if(payload.fixture!==true)throw new Error('Unsafe fixture');simulatedSends++;return 'in-memory-no-provider';},
});
const result={accepted:true,reportedCandidateTriedFirst:checked[0]===memberId,reportedCandidateRejected:saved.data.rejectedIds.includes(memberId),differentCandidateApproved:saved.data.winner.id!==memberId,approvedCandidateChecked:checked.at(-1)===saved.data.winner.id,checks:checked.length,memberRequests,financialRequests,simulatedSends,realDrawRecorded:false,realEmailSent:false};
if(!Object.entries(result).filter(([key])=>['reportedCandidateTriedFirst','reportedCandidateRejected','differentCandidateApproved','approvedCandidateChecked'].includes(key)).every(([,value])=>value))throw new Error('Acceptance failed.');
console.log(JSON.stringify(result));
