import { NextRequest, NextResponse } from "next/server";

import { sql } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { sessionId, stepId, phase, answers, completed = false } =
      await request.json();

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
