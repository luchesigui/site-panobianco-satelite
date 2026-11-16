import { NextResponse } from 'next/server';
import { getActiveMembers } from '@/lib/evo';
import { selectEligibleCandidate } from '@/scripts/raffle-selection.mjs';
import { hasOverdueDebt } from '@/scripts/raffle-candidate-eligibility.mjs';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const members = await getActiveMembers();
    const selection = await selectEligibleCandidate({
      members,
      isCandidateEligible: async (member: { idMember: number }) => !(await hasOverdueDebt({
        dns:process.env.EVO_DNS,token:process.env.EVO_TOKEN,branchId:process.env.EVO_BRANCH_ID,memberId:member.idMember,
      })),
    });
    return NextResponse.json({success:true,winner:selection.member},{headers:{'Cache-Control':'private, no-store'}});
  } catch {
    return NextResponse.json({success:false,error:'Não foi possível validar um participante sem débitos vencidos. Tente novamente mais tarde.'},{status:503,headers:{'Cache-Control':'private, no-store'}});
  }
}
