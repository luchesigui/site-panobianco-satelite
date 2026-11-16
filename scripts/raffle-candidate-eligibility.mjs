const TAKE = 50;
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
const positiveInteger = value => Number.isSafeInteger(value) && value > 0;
function dateKey(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}(?:T|$)/.test(value)) throw new Error('Invalid EVO candidate financial date.');
  const key = value.slice(0,10);
  const date = new Date(`${key}T00:00:00Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0,10) !== key) throw new Error('Invalid EVO candidate financial date.');
  return key;
}
/**
 * Check only one candidate, never treating an unavailable lookup as eligibility.
 * @param {{dns?: string, token?: string, branchId?: string | number, memberId: number, fetchImpl?: typeof fetch, sleep?: (ms: number) => Promise<void>, now?: () => Date, maxPages?: number}} options
 */
export async function hasOverdueDebt({dns,token,branchId,memberId,fetchImpl=fetch,sleep=pause,now=()=>new Date(),maxPages=500} = {}) {
  const validCredential = value => typeof value === 'string' && value.trim() && !/[\x00-\x1f\x7f]/.test(value);
  const branch = typeof branchId === 'string' && /^[1-9]\d*$/.test(branchId) ? Number(branchId) : branchId;
  if (!validCredential(dns) || dns.includes(':') || !validCredential(token) || !positiveInteger(branch) || !positiveInteger(memberId) || !positiveInteger(maxPages) || typeof fetchImpl !== 'function' || typeof sleep !== 'function' || typeof now !== 'function') throw new Error('Invalid EVO candidate financial configuration.');
  const instant=now();
  if (!(instant instanceof Date) || !Number.isFinite(instant.getTime())) throw new Error('Invalid EVO candidate financial date.');
  const parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(instant);
  const get=type=>parts.find(p=>p.type===type).value;
  const today=`${get('year')}-${get('month')}-${get('day')}`;
  const yesterday=new Date(`${today}T00:00:00Z`);yesterday.setUTCDate(yesterday.getUTCDate()-1);
  const headers={Authorization:`Basic ${Buffer.from(`${dns}:${token}`).toString('base64')}`,accept:'application/json'};
  const seen=new Set();let expectedTotal;
  for(let index=0;index<maxPages;index++) {
    const url=new URL('https://evo-integracao-api.w12app.com.br/api/v1/receivables');
    url.search=new URLSearchParams({idBranch:String(branch),memberId:String(memberId),accountStatus:'1,4',dueDateEnd:yesterday.toISOString().slice(0,10),take:String(TAKE),skip:String(index*TAKE)}).toString();
    let response;
    for(let attempt=0;attempt<2;attempt++) {
      try {response=await fetchImpl(url.toString(),{headers,cache:'no-store',signal:AbortSignal.timeout(60000)});} catch {throw new Error('EVO candidate financial request failed.');}
      if(response?.status!==429)break;
      if(attempt===1)throw new Error('EVO candidate financial rate limit exhausted.');
      const raw=response.headers?.get?.('retry-after');
      const seconds=raw ? Number(raw) : NaN;
      const delay=Number.isFinite(seconds)?seconds*1000:raw?Date.parse(raw)-Date.now():1500;
      try {await sleep(Number.isFinite(delay)?Math.max(0,Math.min(5000,delay)):1500);} catch {throw new Error('EVO candidate financial rate limit wait failed.');}
    }
    if(!response?.ok)throw new Error('EVO candidate financial request failed.');
    let data;try {data=await response.json();}catch{throw new Error('Invalid EVO candidate financial page.');}
    const rows=Array.isArray(data)?data:data?.lista;
    const total=Array.isArray(data)?null:data?.qtde;
    if(!Array.isArray(rows)||rows.length>TAKE||(total!==null&&(!Number.isSafeInteger(total)||total<0)))throw new Error('Invalid EVO candidate financial page.');
    if(index===0)expectedTotal=total;
    if(total!==expectedTotal)throw new Error('EVO candidate financial total changed.');
    let overdue=false;
    for(const item of rows) {
      if(!item||!positiveInteger(item.idReceivable)||item.idMemberPayer!==memberId||![1,2,3,4].includes(item.status?.id)||!Number.isFinite(item.ammount)||item.ammount<0||(item.ammountPaid!==null&&(!Number.isFinite(item.ammountPaid)||item.ammountPaid<0)))throw new Error('Invalid EVO candidate financial record.');
      const due=dateKey(item.dueDate);
      if(item.cancellationDate!=null)dateKey(item.cancellationDate);
      if(seen.has(item.idReceivable))throw new Error('Duplicate EVO candidate financial record.');
      seen.add(item.idReceivable);
      if([1,4].includes(item.status.id)&&!item.cancellationDate&&due<today&&Math.round(item.ammount*100)>Math.round((item.ammountPaid??0)*100))overdue=true;
    }
    if(expectedTotal!==null&&seen.size>expectedTotal)throw new Error('Invalid EVO candidate financial total.');
    // One confirmed overdue balance suffices to reject; approving requires every page.
    if(overdue)return true;
    if(expectedTotal===null){if(rows.length<TAKE)return false;}
    else {if(seen.size===expectedTotal)return false;if(rows.length<TAKE)throw new Error('Incomplete EVO candidate financial page.');}
  }
  throw new Error('EVO candidate financial page limit exhausted.');
}
