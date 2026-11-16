import { randomInt } from 'node:crypto';
import { selectEligibleCandidate } from './raffle-selection.mjs';

export async function runRafflePeriod({ store, key, mode, loadMembers, renderEmail, send, randomIndex = randomInt, now = () => new Date(), recoverOnly = false, isCandidateEligible, replacementOf }) {
  if (!['mock', 'live'].includes(mode) || !/^(mock|live)-[a-z0-9-]{1,70}$/.test(key) || !key.startsWith(`${mode}-`)) throw new Error('Invalid raffle period.');
  let record = await store.read(key);
  if (!record) {
    if (recoverOnly) throw new Error('No saved result for recovery.');
    if (mode === 'live' && typeof isCandidateEligible !== 'function') throw new Error('Live draw requires financial validation.');
    let original;
    if (replacementOf) {
      if (mode !== 'live' || !/^live-\d{4}-\d{2}-\d{2}$/.test(replacementOf) || key !== `${replacementOf}-replacement`) throw new Error('Invalid replacement target.');
      original = await store.read(replacementOf);
      if (original?.data.schema !== 1 || original.data.key !== replacementOf || original.data.mode !== 'live' || original.data.status !== 'sent' || !Number.isSafeInteger(original.data.winner?.id) || original.data.winner.id <= 0) throw new Error('Replacement requires a completed original draw.');
      const originalEligible = await isCandidateEligible({ idMember:original.data.winner.id });
      if (originalEligible !== false) throw new Error('Replacement requires confirmed overdue debt on original winner.');
    }
    const loaded = await loadMembers();
    const members = original ? loaded.filter(member => member.idMember !== original.data.winner.id) : loaded;
    if (!Array.isArray(members) || !members.length) throw new Error('Empty eligible participant pool.');
    record = await store.create(key, { schema: 1, key, mode, status: 'claimed', claimedAt: now().toISOString() });
    const selection = await selectEligibleCandidate({ members, randomIndex, isCandidateEligible: isCandidateEligible || (async () => true) });
    const { member, rejectedIds } = selection;
    const winner = { id: member.idMember, name: member.displayName };
    record = await store.update(key, { ...record.data, status: 'selected', winner, members: selection.members, rejectedIds, ...(replacementOf ? {replacementOf,originalRevision:original.revision} : {}), selectedAt: now().toISOString() }, record.revision);
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
