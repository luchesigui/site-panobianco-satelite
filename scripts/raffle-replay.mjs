export function validateReplay(value) {
  const ids = new Set();
  if (!Array.isArray(value?.members) || !value.members.length) throw new Error('Invalid saved participant snapshot.');
  for (const member of value.members) {
    if (!Number.isSafeInteger(member.idMember) || member.idMember < 1 || ids.has(member.idMember) || ![member.firstName,member.displayName].every(v => typeof v === 'string' && v.trim())) throw new Error('Invalid saved participant snapshot.');
    ids.add(member.idMember);
  }
  const winner = value.members.find(member => member.idMember === value.winner?.id);
  if (!winner || winner.displayName !== value.winner.name) throw new Error('Saved winner does not match participant snapshot.');
  return value;
}
