import { sendGTMEvent } from "@/components/GTM";

// ─── Quiz ──────────────────────────────────────────────────────────────────────

export const trackQuizStarted = () =>
  sendGTMEvent({ event: "quiz_started" });

export const trackQuizGoalSelected = (goal: string) =>
  sendGTMEvent({ event: "quiz_goal_selected", goal });

export const trackQuizPlanSelected = (plan: string, plan_label: string) =>
  sendGTMEvent({ event: "quiz_plan_selected", plan, plan_label });

/** Dispara quando email+WhatsApp são capturados. Sem PII no dataLayer. */
export const trackQuizLeadCaptured = (plan: string) =>
  sendGTMEvent({ event: "quiz_lead_captured", plan });

export const trackQuizWhatsappClicked = (plan: string) =>
  sendGTMEvent({ event: "quiz_whatsapp_clicked", plan });

export const trackQuizEbookViewed = () =>
  sendGTMEvent({ event: "quiz_ebook_viewed" });

export const trackQuizEbookCaptured = () =>
  sendGTMEvent({ event: "quiz_ebook_captured" });

export const trackQuizStepCompleted = (step_id: string, phase: string) =>
  sendGTMEvent({ event: "quiz_step_completed", step_id, phase });

// ─── WhatsApp ──────────────────────────────────────────────────────────────────

export type WhatsappSource =
  | "header_cta"
  | "cta_section_aula"
  | "cta_section_whatsapp"
  | "floating_button"
  | "plan_avulso";

export const trackWhatsappClicked = (source: WhatsappSource, type: string) =>
  sendGTMEvent({ event: "whatsapp_clicked", source, type });

// ─── Planos ────────────────────────────────────────────────────────────────────

export const trackPlanCtaClicked = (
  plan: string,
  destination: "checkout" | "whatsapp",
) => sendGTMEvent({ event: "plan_cta_clicked", plan, destination });

// ─── Formulário ────────────────────────────────────────────────────────────────

export const trackContactFormSubmitted = (success: boolean) =>
  sendGTMEvent({ event: "contact_form_submitted", success });

// ─── Modal ─────────────────────────────────────────────────────────────────────

export const trackScheduleModalOpened = () =>
  sendGTMEvent({ event: "schedule_modal_opened" });
