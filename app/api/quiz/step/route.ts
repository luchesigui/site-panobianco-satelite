import { NextRequest, NextResponse } from "next/server";

import { sql } from "@/lib/db";

// Simple sliding-window rate limiter: max 20 requests per minute per IP.
// Module-level map persists across requests within the same Fluid Compute instance.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  if (entry.count >= 20) return true;
  entry.count++;
  return false;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json({ sessionId: null }, { status: 429 });
  }

  try {
    const { sessionId, stepId, phase, answers, completed = false } =
      await request.json();

    if (!stepId || !phase || typeof answers !== "object") {
      return NextResponse.json({ sessionId: null }, { status: 400 });
    }

    if (!sessionId) {
      const rows = await sql`
        INSERT INTO quiz_sessions (answers, last_step_id, phase, completed)
        VALUES (${JSON.stringify(answers)}::jsonb, ${stepId}, ${phase}, ${completed})
        RETURNING id
      `;
      return NextResponse.json({ sessionId: rows[0].id });
    }

    await sql`
      UPDATE quiz_sessions
      SET
        answers      = ${JSON.stringify(answers)}::jsonb,
        last_step_id = ${stepId},
        phase        = ${phase},
        completed    = ${completed},
        updated_at   = now()
      WHERE id = ${sessionId}::uuid
    `;
    return NextResponse.json({ sessionId });
  } catch (error) {
    console.error("[quiz/step] DB error:", error);
    return NextResponse.json({ sessionId: null }, { status: 200 });
  }
}
