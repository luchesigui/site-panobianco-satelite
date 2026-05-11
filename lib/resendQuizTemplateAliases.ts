import type { TemplateKey } from "./emailTemplates";

/** Alias on Resend — matches `scripts/sync-quiz-resend-templates.ts`. */
export function quizResendTemplateAlias(key: TemplateKey): string {
  return `quiz-satelite-${key}`;
}
