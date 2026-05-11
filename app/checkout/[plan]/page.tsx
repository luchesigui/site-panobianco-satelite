import { notFound, redirect } from "next/navigation";

import { SITE_URL } from "@/lib/constants";
import { createCheckoutLink } from "@/lib/evo";

export const dynamic = "force-dynamic";

const VALID_PLANS = ["orange", "platinum"] as const;
type PlanParam = (typeof VALID_PLANS)[number];

export default async function CheckoutPage({
  params,
  searchParams,
}: {
  params: { plan: string };
  searchParams: { idProspect?: string };
}) {
  const plan = params.plan as PlanParam;

  if (!VALID_PLANS.includes(plan)) {
    notFound();
  }

  const idProspect = searchParams.idProspect ? Number(searchParams.idProspect) : undefined;

  let url: string;
  try {
    url = await createCheckoutLink(plan, idProspect);
  } catch (err) {
    console.error(`[checkout/${plan}]`, err);
    url = `${SITE_URL}/planos`;
  }

  redirect(url);
}
