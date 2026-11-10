import { randomInt } from 'node:crypto';

export async function runRafflePeriod({ store, key, mode, loadMembers, renderEmail, send, randomIndex = randomInt, now = () => new Date(), recoverOnly = false }) {
  if (!['mock', 'live'].includes(mode) || !/^(mock|live)-[a-z0-9-]{1,70}$/.test(key) || !key.startsWith(`${mode}-`)) throw new Error('Invalid raffle period.');
  let record = await store.read(key);
  if (!record) {
    if (recoverOnly) throw new Error('No saved result for recovery.');
    const members = await loadMembers();
    if (!Array.isArray(members) || !members.length) throw new Error('Empty eligible participant pool.');
    record = await store.create(key, { schema: 1, key, mode, status: 'claimed', claimedAt: now().toISOString() });
    const index = randomIndex(members.length);
    if (!Number.isInteger(index) || index < 0 || index >= members.length) throw new Error('Invalid random selection.');
    const member = members[index];
    const winner = { id: member.idMember, name: member.displayName };
    record = await store.update(key, { ...record.data, status: 'selected', winner, members, selectedAt: now().toISOString() }, record.revision);
  }
  if (record.data.schema !== 1 || record.data.key !== key || record.data.mode !== mode || !['claimed', 'selected', 'rendered', 'sending', 'sent'].includes(record.data.status)) throw new Error('Saved state mismatch.');
  if (record.data.status === 'sending') {
    const elapsed = now().getTime() - new Date(record.data.sendingAt).getTime();
    if (!Number.isFinite(elapsed) || elapsed < 0 || elapsed >= 23 * 60 * 60 * 1000) throw new Error('Email state uncertain beyond safe idempotency window. Inspect inbox; do not resend automatically.');
  }
  if (record.data.status === 'sent') return { status: 'already_sent' };
  if (record.data.status === 'claimed') throw new Error('Ambiguous claimed period; manual investigation required. Do not redraw.');
  if (record.data.status === 'selected') {
    const payload = await renderEmail(record.data);
    record = await store.update(key, { ...record.data, status: 'rendered', payload }, record.revision);
  }
  record = await store.update(key, { ...record.data, status: 'sending', sendingAt: record.data.sendingAt || now().toISOString() }, record.revision);
  const receipt = await send(record.data.payload, key);
  await store.update(key, { ...record.data, status: 'sent', receipt, sentAt: now().toISOString() }, record.revision);
  return { status: 'sent', receipt };
}
