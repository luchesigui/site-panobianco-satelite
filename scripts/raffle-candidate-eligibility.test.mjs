import test from 'node:test';
import assert from 'node:assert/strict';
import { hasOverdueDebt } from './raffle-candidate-eligibility.mjs';
const record=(extra={})=>({idReceivable:1,idMemberPayer:101,dueDate:'2026-11-14T00:00:00',status:{id:4},ammount:100,ammountPaid:null,cancellationDate:null,...extra});
const response=(data,status=200)=>({ok:status===200,status,headers:new Headers({'retry-after':'0'}),json:async()=>data});
function harness(responses){const calls=[];return {calls,options:{dns:'fixture',token:'fixture-token',branchId:'1',memberId:101,now:()=>new Date('2026-11-16T02:30:00Z'),sleep:async()=>{},fetchImpl:async(url,options)=>{calls.push({url,options});const next=responses.shift();if(next instanceof Error)throw next;assert.ok(next);return next;}}};}
test('checks only requested member, branch and overdue dates, accepting live null paid',async()=>{
 const h=harness([response([record()])]);
 assert.equal(await hasOverdueDebt(h.options),true);
 const url=new URL(h.calls[0].url);
 assert.equal(url.pathname,'/api/v1/receivables');
 assert.deepEqual(Object.fromEntries(url.searchParams),{idBranch:'1',memberId:'101',accountStatus:'1,4',dueDateEnd:'2026-11-14',take:'50',skip:'0'});
 assert.equal(h.calls[0].options.cache,'no-store');assert.ok(h.calls[0].options.signal instanceof AbortSignal);
});
test('partial overdue balances exclude but paid, cancelled, future and due-today do not',async()=>{
 assert.equal(await hasOverdueDebt(harness([response([record({ammountPaid:10})])]).options),true);
 for(const extra of [{status:{id:2}},{status:{id:3}},{ammountPaid:100},{cancellationDate:'2026-11-10T00:00:00'},{dueDate:'2026-11-15T00:00:00'},{dueDate:'2026-11-16T00:00:00'},{ammount:0}]) assert.equal(await hasOverdueDebt(harness([response([record(extra)])]).options),false);
});
test('fully paginates before declaring eligible, supports envelope and arrays',async()=>{
 const full=Array.from({length:50},(_,i)=>record({idReceivable:i+1,ammountPaid:100}));
 for(const envelope of [false,true]){
 const h=harness([response(envelope?{qtde:51,lista:full}:full),response(envelope?{qtde:51,lista:[record({idReceivable:51})]}:[record({idReceivable:51})])]);
 assert.equal(await hasOverdueDebt(h.options),true);assert.equal(h.calls.length,2);assert.equal(new URL(h.calls[1].url).searchParams.get('skip'),'50');
 }
});
test('rejects failures, wrong member filter, malformed pages and changing totals',async()=>{
 for(const data of [null,{},[record({idMemberPayer:2})],[record({dueDate:'2026-02-31'})],[record({ammountPaid:'0'})],[record({status:{id:0}})],{qtde:1,lista:[]}]) await assert.rejects(hasOverdueDebt(harness([response(data)]).options));
 for(const data of [response({},503),new Error('PRIVATE_NETWORK')]) await assert.rejects(hasOverdueDebt(harness([data]).options),/request failed/);
 const h=harness([response(null,429),response([])]);assert.equal(await hasOverdueDebt(h.options),false);assert.equal(h.calls.length,2);
 await assert.rejects(hasOverdueDebt(harness([response(null,429),response(null,429)]).options),/rate limit/);
});
test('rejects unsafe config before network and sanitized errors never leak upstream values',async()=>{
 for(const extra of [{memberId:0},{memberId:'101'},{branchId:'1&other=2'},{token:''},{now:null},{maxPages:0}]){const h=harness([]);await assert.rejects(hasOverdueDebt({...h.options,...extra}));assert.equal(h.calls.length,0);}
 const h=harness([new Error('PRIVATE_NETWORK fixture-token')]);await assert.rejects(hasOverdueDebt(h.options),e=>!e.stack.includes('PRIVATE_NETWORK')&&!e.stack.includes('fixture-token'));
});
