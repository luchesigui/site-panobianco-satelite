function localDate(now) {
  const parts = new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
  const get = type => parts.find(part=>part.type===type).value;
  return `${get('year')}-${get('month')}-${get('day')}`;
}
function sunday(date) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date || '') && new Date(`${date}T12:00:00Z`).toISOString().slice(0,10) === date && new Date(`${date}T12:00:00Z`).getUTCDay() === 0;
}
export function resolveRaffleRun({mode,eventName,ref,period,runId,now=new Date()}) {
  const today = localDate(now);
  if (mode === 'preflight') return {mode:'preflight'};
  if (mode === 'mock') {
    if (!/^\d{1,30}$/.test(runId || '')) throw new Error('Invalid mock run ID.');
    return {mode:'mock',key:`mock-${runId}`,recoverOnly:false};
  }
  if (mode === 'recover') {
    if (!sunday(period) || period > today) throw new Error('Recovery requires a past or current Sunday period.');
    return {mode:'live',key:`live-${period}`,recoverOnly:true};
  }
  if (['live','watchdog'].includes(mode) && eventName === 'schedule' && ref === 'refs/heads/main' && sunday(today)) {
    return {mode,key:`live-${today}`,recoverOnly:false};
  }
  throw new Error('Live raffle is restricted to the authorized Sunday schedule on main.');
}
