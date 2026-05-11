import { createHash } from "node:crypto";

import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

import { CONTACT_EMAIL } from "@/lib/constants";
import {
  buildEmailHtml,
  selectCtaContent,
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
    firstName: rawFirstName,
    email,
    whatsapp,
    plan,
    goal,
    loseWeightWhy,
    muscleWhy,
    energyMissing,
    healthMotivation,
  } = body as {
    firstName: string;
    email: string;
    whatsapp?: string;
    plan: string;
    goal: string;
    loseWeightWhy?: string;
    muscleWhy?: string;
    energyMissing?: string;
    healthMotivation?: string;
  };

  const firstName = rawFirstName?.trim().split(/\s+/)[0] || "";

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
    const { ctaLabel, ctaNote } = selectCtaContent(key, plan);
    const html = buildEmailHtml({ firstName, ...tpl, tag, ctaHref, ctaLabel, ctaNote });

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
    
    // 1. Send email to the user
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
      console.error("[quiz/email] Resend error (user):", result.error);
    } else {
      console.log(`[quiz/email] sent template=${key} to=${email} id=${result.data?.id}`);
    }

    // 2. Notify admin (Gui Henrique)
    try {
      const isEbook = plan === "too_expensive";
      
      const goalLabels: Record<string, string> = {
        lose_weight: "Emagrecer e perder gordura",
        gain_muscle: "Ganhar massa e definição",
        energy: "Ter mais disposição e energia",
        health: "Saúde, bem-estar e qualidade de vida",
      };

      const planLabels: Record<string, string> = {
        orange: "Orange Anual (R$ 119,90)",
        platinum_rec: "Platinum Recorrente (R$ 139,90)",
        platinum_month: "Platinum Mensal (R$ 159,90)",
        too_expensive: "E-book (Planos caros)",
      };

      const goalLabel = goalLabels[goal] || goal;
      const planLabel = planLabels[plan] || plan;

      await resend.emails.send({
        from: `Panobianco Quiz <${CONTACT_EMAIL}>`,
        to: ["gui.olhenrique@gmail.com"],
        subject: isEbook ? `🎯 Lead EBOOK: ${firstName}` : `🎯 Novo Lead Quiz: ${firstName}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; color: #333;">
            <h2 style="color: #ff5e29;">${isEbook ? "Novo Lead de Ebook" : "Novo Lead do Quiz"}</h2>
            <p>Um novo usuário completou o quiz no site.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p><strong>Nome:</strong> ${firstName}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>WhatsApp:</strong> ${whatsapp || "Não informado"}</p>
            <p><strong>Objetivo:</strong> ${goalLabel}</p>
            <p><strong>Plano Escolhido:</strong> ${planLabel}</p>
            ${isEbook ? '<p style="background: #fff4f0; padding: 10px; border-radius: 5px; border-left: 4px solid #ff5e29;"><strong>Nota:</strong> Este usuário achou os planos caros e foi para o fluxo do e-book.</p>' : ""}
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #999;">Enviado automaticamente pelo sistema de Quiz.</p>
          </div>
        `,
      });
    } catch (adminErr) {
      console.error("[quiz/email] failed to notify admin:", adminErr);
    }
  } catch (err) {
    console.error("[quiz/email] unexpected error:", err);
  }

  return NextResponse.json({ ok: true });
}
