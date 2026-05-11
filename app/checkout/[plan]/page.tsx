import { notFound, redirect } from "next/navigation";

import { SITE_URL } from "@/lib/constants";
import { createCheckoutLink } from "@/lib/evo";

export const dynamic = "force-dynamic";

const VALID_PLANS = ["orange", "platinum"] as const;
type PlanParam = (typeof VALID_PLANS)[number];

export default async function CheckoutPage({
  params,
}: {
  params: { plan: string };
}) {
  const plan = params.plan as PlanParam;

  if (!VALID_PLANS.includes(plan)) {
    notFound();
  }

  let url: string;
  try {
    url = await createCheckoutLink(plan);
  } catch (err) {
    console.error(`[checkout/${plan}]`, err);
    url = `${SITE_URL}/planos`;
  }

  redirect(url);
}
