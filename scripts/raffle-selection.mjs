import { randomInt } from 'node:crypto';

export async function selectEligibleCandidate({ members, isCandidateEligible, randomIndex = randomInt }) {
  const ids = new Set();
  if (!Array.isArray(members) || !members.length || typeof isCandidateEligible !== 'function') throw new Error('Invalid participant validation configuration.');
  for (const member of members) {
    if (!Number.isSafeInteger(member?.idMember) || member.idMember <= 0 || ids.has(member.idMember)) throw new Error('Invalid participant pool.');
    ids.add(member.idMember);
  }
  const remaining = [...members];
  const rejectedIds = [];
  while (remaining.length) {
    const index = randomIndex(remaining.length);
    if (!Number.isInteger(index) || index < 0 || index >= remaining.length) throw new Error('Invalid random selection.');
    const member = remaining[index];
    const eligible = await isCandidateEligible(member);
    if (typeof eligible !== 'boolean') throw new Error('Invalid candidate validation result.');
    if (eligible) return { member, members: remaining, rejectedIds };
    rejectedIds.push(member.idMember);
    remaining.splice(index, 1);
  }
  throw new Error('No eligible candidate without overdue debt.');
}
