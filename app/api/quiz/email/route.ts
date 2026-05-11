import { createHash } from "node:crypto";

import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

import { CONTACT_EMAIL } from "@/lib/constants";
import {
  buildEmailHtml,
  selectCtaHref,
  selectTemplate,
  TEMPLATES,
} from "@/lib/emailTemplates";

/** Stable key for Resend idempotency — same inputs ⇒ duplicate POSTs return the original send (no double emails). */
function quizEmailIdempotencyKey(input: {
  firstName: string;
  email: string;
  plan: string;
  goal: string;
  loseWeightWhy?: string;
  muscleWhy?: string;
  energyMissing?: string;
  healthMotivation?: string;
}): string {
  const canonical = JSON.stringify({
    firstName: input.firstName.trim().toLowerCase(),
    email: input.email.trim().toLowerCase(),
    plan: input.plan,
    goal: input.goal,
    loseWeightWhy: input.loseWeightWhy ?? "",
    muscleWhy: input.muscleWhy ?? "",
    energyMissing: input.energyMissing ?? "",
    healthMotivation: input.healthMotivation ?? "",
  });
  const suffix = createHash("sha256").update(canonical).digest("hex").slice(0, 40);
  return `quiz-result-email/${suffix}`;
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    firstName,
    email,
    plan,
    goal,
    loseWeightWhy,
    muscleWhy,
    energyMissing,
    healthMotivation,
  } = body as {
    firstName: string;
    email: string;
    plan: string;
    goal: string;
    loseWeightWhy?: string;
    muscleWhy?: string;
    energyMissing?: string;
    healthMotivation?: string;
  };

  if (!firstName || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("[quiz/email] RESEND_API_KEY not configured");
    return NextResponse.json({ ok: true });
  }

  try {
    const key = selectTemplate(goal, plan, loseWeightWhy, muscleWhy, energyMissing, healthMotivation);
    const tpl = TEMPLATES[key];
    const subject = tpl.subject.replace("{Nome}", firstName);
    const ctaHref = selectCtaHref(plan);
    const tag = tpl.tag.replace("{Nome}", firstName);
    const html = buildEmailHtml({ firstName, ...tpl, tag, ctaHref });

    const idempotencyKey = quizEmailIdempotencyKey({
      firstName,
      email,
      plan,
      goal,
      loseWeightWhy,
      muscleWhy,
      energyMissing,
      healthMotivation,
    });

    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send(
      {
        from:
          process.env.NODE_ENV === "production"
            ? `Panobianco Satélite <${CONTACT_EMAIL}>`
            : "Panobianco Satélite <onboarding@resend.dev>",
        to: [email],
        subject,
        html,
        tags: [
          { name: "source", value: "quiz" },
          { name: "template", value: key.replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 256) },
        ],
      },
      { idempotencyKey },
    );

    if (result.error) {
      console.error("[quiz/email] Resend error:", result.error);
    } else {
      console.log(`[quiz/email] sent template=${key} to=${email} id=${result.data?.id}`);
    }
  } catch (err) {
    console.error("[quiz/email] unexpected error:", err);
  }

  return NextResponse.json({ ok: true });
}
