import { useRef } from "react";

export function useQuizSession() {
  const sessionIdRef = useRef<string | null>(null);

  const persistStep = (
    stepId: string,
    phase: string,
    answers: Record<string, string>,
    completed = false,
  ) => {
    fetch("/api/quiz/step", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: sessionIdRef.current ?? undefined,
        stepId,
        phase,
        answers,
        completed,
      }),
    })
      .then((res) => res.json())
      .then((data: { sessionId: string | null }) => {
        if (data.sessionId && !sessionIdRef.current) {
          sessionIdRef.current = data.sessionId;
        }
      })
      .catch(() => undefined);
  };

  return { persistStep };
}
