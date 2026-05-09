"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Lock, Trophy, BookOpen } from "lucide-react";
import { WHATSAPP_PHONE } from "@/lib/constants";
import {
  trackQuizStarted,
  trackQuizGoalSelected,
  trackQuizPlanSelected,
  trackQuizLeadCaptured,
  trackQuizWhatsappClicked,
  trackQuizEbookViewed,
  trackQuizEbookCaptured,
  trackQuizStepCompleted,
} from "@/lib/analytics";

// ─── TYPES ────────────────────────────────────────────────────────────────────

type Phase = "perfil" | "objetivo" | "decisao";
type Answers = Record<string, string>;

interface Option {
  label: string;
  value: string;
  emoji: string;
  sublabel?: string;
}

type Step =
  | {
      id: string;
      type: "text_input";
      phase: Phase;
      fieldKey: string;
      question: string;
      placeholder: string;
      inputType?: string;
      inputMode?: string;
      mask?: "date";
      buttonLabel: string;
      next?: (answers: Answers) => string;
    }
  | {
      id: string;
      type: "single_choice";
      phase: Phase;
      fieldKey: string;
      question?: string;
      questionTemplate?: (answers: Answers) => string;
      options: Option[];
      next?: (answers: Answers) => string;
    }
  | {
      id: string;
      type: "capture";
      phase: Phase;
      fieldKey: string;
      next?: (answers: Answers) => string;
    }
  | {
      id: string;
      type: "terminal";
      phase: Phase;
      fieldKey: null;
    };

// ─── STEP DEFINITIONS ─────────────────────────────────────────────────────────

const STEPS: Step[] = [
  // ── PERFIL ──────────────────────────────────────────────────────────────────
  {
    id: "firstName",
    type: "text_input",
    phase: "perfil",
    question: "Antes de começar, qual é o seu nome?",
    placeholder: "Digite seu primeiro nome",
    fieldKey: "firstName",
    inputType: "text",
    buttonLabel: "Vamos lá →",
  },
  {
    id: "sex",
    type: "single_choice",
    phase: "perfil",
    questionTemplate: (d) => `Prazer, ${d.firstName}! Qual é o seu sexo?`,
    options: [
      { label: "Masculino", value: "M", emoji: "♂️" },
      { label: "Feminino", value: "F", emoji: "♀️" },
    ],
    fieldKey: "sex",
  },
  {
    id: "birthdate",
    type: "text_input",
    phase: "perfil",
    question: "Qual é a sua data de nascimento?",
    placeholder: "DD/MM/AAAA",
    fieldKey: "birthdate",
    inputType: "text",
    inputMode: "numeric",
    mask: "date",
    buttonLabel: "Continuar →",
  },
  {
    id: "currentActivity",
    type: "single_choice",
    phase: "perfil",
    question: "Como está sua rotina de atividade física hoje?",
    options: [
      { label: "Sedentário(a), sem nenhuma atividade", value: "sedentary", emoji: "😴" },
      { label: "Faço algo leve às vezes", value: "light", emoji: "🚶" },
      { label: "Treinei antes, mas parei", value: "paused", emoji: "⏸️" },
      { label: "Treino regularmente", value: "active", emoji: "🏃" },
    ],
    fieldKey: "currentActivity",
  },

  // ── OBJETIVO ────────────────────────────────────────────────────────────────
  {
    id: "goal",
    type: "single_choice",
    phase: "objetivo",
    question: "Qual é o seu principal objetivo agora?",
    options: [
      { label: "Emagrecer e perder gordura", value: "lose_weight", emoji: "⚖️" },
      { label: "Ganhar massa e definição", value: "gain_muscle", emoji: "💪" },
      { label: "Ter mais disposição e energia", value: "energy", emoji: "⚡" },
      { label: "Saúde, bem-estar e qualidade de vida", value: "health", emoji: "❤️" },
    ],
    fieldKey: "goal",
    next: (d) => `spin_${d.goal}_1`,
  },

  // ── SPIN: EMAGRECER ──────────────────────────────────────────────────────────
  {
    id: "spin_lose_weight_1",
    type: "single_choice",
    phase: "objetivo",
    question: "Quantos quilos você gostaria de perder?",
    options: [
      { label: "Até 5 kg", value: "up5", emoji: "🎯" },
      { label: "Entre 5 e 10 kg", value: "5to10", emoji: "📉" },
      { label: "Entre 10 e 20 kg", value: "10to20", emoji: "🔥" },
      { label: "Mais de 20 kg", value: "over20", emoji: "💥" },
    ],
    fieldKey: "loseWeightGoal",
    next: () => "spin_lose_weight_2",
  },
  {
    id: "spin_lose_weight_2",
    type: "single_choice",
    phase: "objetivo",
    questionTemplate: (d) => {
      const map: Record<string, string> = {
        up5: "5 kg",
        "5to10": "até 10 kg",
        "10to20": "até 20 kg",
        over20: "mais de 20 kg",
      };
      return `Por que perder ${map[d.loseWeightGoal] ?? "esse peso"} é importante pra você?`;
    },
    options: [
      { label: "Quero me sentir bem no espelho", value: "mirror", emoji: "🪞" },
      { label: "Saúde — médico ou exames alertaram", value: "health_alert", emoji: "🩺" },
      { label: "Quero ter mais energia e disposição", value: "energy", emoji: "⚡" },
      { label: "Evento ou data importante se aproximando", value: "event", emoji: "📅" },
    ],
    fieldKey: "loseWeightWhy",
    next: () => "spin_lose_weight_3",
  },
  {
    id: "spin_lose_weight_3",
    type: "single_choice",
    phase: "objetivo",
    question: "Você já tentou emagrecer antes e não conseguiu manter o resultado?",
    options: [
      { label: "Sim, várias vezes", value: "many", emoji: "😔" },
      { label: "Sim, uma ou duas vezes", value: "few", emoji: "😕" },
      { label: "Tentei pouco, nunca me comprometi de verdade", value: "barely", emoji: "🤷" },
      { label: "Não, é minha primeira tentativa séria", value: "first", emoji: "🌱" },
    ],
    fieldKey: "loseWeightAttempt",
    next: () => "spin_lose_weight_4",
  },
  {
    id: "spin_lose_weight_4",
    type: "single_choice",
    phase: "objetivo",
    questionTemplate: (d) =>
      ["many", "few"].includes(d.loseWeightAttempt)
        ? "O que faltou nas tentativas anteriores?"
        : "O que te impede de dar o primeiro passo agora?",
    options: [
      { label: "Faltou acompanhamento e orientação", value: "guidance", emoji: "🧭" },
      { label: "Não tinha ambiente e estrutura adequados", value: "structure", emoji: "🏋️" },
      { label: "Perdi a motivação sozinho(a)", value: "motivation", emoji: "😞" },
      { label: "Comecei mas não vi resultado rápido", value: "no_result", emoji: "⏳" },
    ],
    fieldKey: "loseWeightBlock",
    next: () => "barrier",
  },

  // ── SPIN: GANHAR MASSA ────────────────────────────────────────────────────────
  {
    id: "spin_gain_muscle_1",
    type: "single_choice",
    phase: "objetivo",
    question: "Qual é o seu nível de definição atual?",
    options: [
      { label: "Pouca ou nenhuma musculatura visível", value: "low", emoji: "🪶" },
      { label: "Tenho base, mas quero muito mais", value: "some", emoji: "💪" },
      { label: "Estou razoável, quero refinar", value: "ok", emoji: "🔧" },
      { label: "Treino há um tempo, estou estagnado(a)", value: "plateau", emoji: "📊" },
    ],
    fieldKey: "muscleLevel",
    next: () => "spin_gain_muscle_2",
  },
  {
    id: "spin_gain_muscle_2",
    type: "single_choice",
    phase: "objetivo",
    question: "Por que ter um corpo mais definido é importante pra você?",
    options: [
      { label: "Autoestima e confiança no dia a dia", value: "confidence", emoji: "🪞" },
      { label: "Saúde — quero mais força e resistência", value: "strength", emoji: "🦾" },
      { label: "Atratividade e vida social", value: "social", emoji: "✨" },
      { label: "Superação pessoal — é uma meta minha", value: "personal", emoji: "🏆" },
    ],
    fieldKey: "muscleWhy",
    next: () => "spin_gain_muscle_3",
  },
  {
    id: "spin_gain_muscle_3",
    type: "single_choice",
    phase: "objetivo",
    question: "Quando você se olha no espelho hoje, como se sente em relação ao seu corpo?",
    options: [
      { label: "Insatisfeito(a) — está longe do que quero", value: "unsatisfied", emoji: "😞" },
      { label: "Neutro — não me incomoda, mas quero melhorar", value: "neutral", emoji: "😐" },
      { label: "Razoável — só quero dar o próximo nível", value: "ok", emoji: "🙂" },
    ],
    fieldKey: "mirrorFeel",
    next: () => "spin_gain_muscle_4",
  },
  {
    id: "spin_gain_muscle_4",
    type: "single_choice",
    phase: "objetivo",
    question: "O que mais te travou de chegar lá até agora?",
    options: [
      { label: "Falta de treino estruturado com progressão", value: "no_structure", emoji: "📋" },
      { label: "Treinei, mas sem orientação profissional", value: "no_guidance", emoji: "🧭" },
      { label: "Dificuldade de manter a consistência", value: "consistency", emoji: "📅" },
      { label: "Não sabia por onde começar", value: "lost", emoji: "🤔" },
    ],
    fieldKey: "muscleBlock",
    next: () => "barrier",
  },

  // ── SPIN: ENERGIA ─────────────────────────────────────────────────────────────
  {
    id: "spin_energy_1",
    type: "single_choice",
    phase: "objetivo",
    question: "Como você descreveria sua disposição no dia a dia hoje?",
    options: [
      { label: "Cansado(a) quase o tempo todo", value: "always_tired", emoji: "😴" },
      { label: "Começo bem, mas perco o gás rápido", value: "fades", emoji: "🔋" },
      { label: "Só me sinto bem nos fins de semana", value: "weekends", emoji: "📅" },
      { label: "Irregular — depende muito do dia", value: "irregular", emoji: "📊" },
    ],
    fieldKey: "energyLevel",
    next: () => "spin_energy_2",
  },
  {
    id: "spin_energy_2",
    type: "single_choice",
    phase: "objetivo",
    question: "O que você deixou de fazer, ou evita fazer, por falta de disposição?",
    options: [
      { label: "Trabalhar e me concentrar como antes", value: "work", emoji: "💼" },
      { label: "Curtir minha família / vida social", value: "social", emoji: "👨‍👩‍👧" },
      { label: "Praticar hobbies que gostava", value: "hobbies", emoji: "🎯" },
      { label: "Me sentir bem e confiante", value: "self", emoji: "🪞" },
    ],
    fieldKey: "energyMissing",
    next: () => "spin_energy_3",
  },
  {
    id: "spin_energy_3",
    type: "single_choice",
    phase: "objetivo",
    question: "Há quanto tempo você se sente assim?",
    options: [
      { label: "Faz alguns meses", value: "months", emoji: "📅" },
      { label: "Há mais de um ano", value: "year", emoji: "🗓️" },
      { label: "Faz vários anos — virou meu normal", value: "years", emoji: "⌛" },
      { label: "Sempre fui assim, mas quero mudar", value: "always", emoji: "🌱" },
    ],
    fieldKey: "energyDuration",
    next: () => "spin_energy_4",
  },
  {
    id: "spin_energy_4",
    type: "single_choice",
    phase: "objetivo",
    questionTemplate: (d) =>
      ["years", "always"].includes(d.energyDuration)
        ? "Você já tentou mudar isso antes? O que aconteceu?"
        : "O que faltou pra você não ter resolvido isso ainda?",
    options: [
      { label: "Tentei, mas parei por falta de rotina", value: "no_routine", emoji: "🔄" },
      { label: "Não sabia o que realmente funcionaria pra mim", value: "no_direction", emoji: "🤔" },
      { label: "Faltou ambiente e pessoas que me incentivassem", value: "no_support", emoji: "👥" },
      { label: "Só estou começando a levar isso a sério agora", value: "just_now", emoji: "🌅" },
    ],
    fieldKey: "energyBlock",
    next: () => "barrier",
  },

  // ── SPIN: SAÚDE ───────────────────────────────────────────────────────────────
  {
    id: "spin_health_1",
    type: "single_choice",
    phase: "objetivo",
    question: "O que motivou você a pensar em saúde e bem-estar agora?",
    options: [
      { label: "Médico ou exame me deu um alerta", value: "doctor", emoji: "🩺" },
      { label: "Percebi que meu corpo mudou e não gostei", value: "body_change", emoji: "🪞" },
      { label: "Quero envelhecer bem e com qualidade de vida", value: "longevity", emoji: "🌿" },
      { label: "Estresse e ansiedade estão me afetando", value: "stress", emoji: "🧠" },
    ],
    fieldKey: "healthMotivation",
    next: () => "spin_health_2",
  },
  {
    id: "spin_health_2",
    type: "single_choice",
    phase: "objetivo",
    questionTemplate: (d) => {
      if (d.healthMotivation === "doctor") return "Qual foi o alerta? (Pode ser vago, só pra entendermos melhor)";
      if (d.healthMotivation === "stress") return "Como o estresse está impactando sua vida hoje?";
      return "Como você se sente em relação à sua saúde hoje, honestamente?";
    },
    options: [
      { label: "Preocupado(a) — está piorando", value: "worried", emoji: "😟" },
      { label: "Em alerta — preciso agir antes que piore", value: "alert", emoji: "⚠️" },
      { label: "Estável, mas longe do que poderia ser", value: "stable", emoji: "📊" },
      { label: "Quero sair do zero e criar um hábito", value: "zero", emoji: "🌱" },
    ],
    fieldKey: "healthStatus",
    next: () => "spin_health_3",
  },
  {
    id: "spin_health_3",
    type: "single_choice",
    phase: "objetivo",
    question: "Se daqui a 2 anos nada mudar, como você imagina que vai se sentir?",
    options: [
      { label: "Muito pior — é inevitável se não agir", value: "much_worse", emoji: "😣" },
      { label: "Igual — e isso já é ruim demais", value: "same_bad", emoji: "😔" },
      { label: "Talvez pior, mas não pensei nisso ainda", value: "maybe_worse", emoji: "😕" },
      { label: "Quero que seja diferente — por isso estou aqui", value: "hopeful", emoji: "🌟" },
    ],
    fieldKey: "healthFuture",
    next: () => "spin_health_4",
  },
  {
    id: "spin_health_4",
    type: "single_choice",
    phase: "objetivo",
    question: "O que faltou pra você ter criado esse hábito antes?",
    options: [
      { label: "Não tinha o ambiente certo pra me comprometer", value: "no_env", emoji: "🏋️" },
      { label: "Comecei várias vezes, mas não mantive", value: "no_consistency", emoji: "🔄" },
      { label: "Falta de tempo era minha desculpa", value: "time", emoji: "⏰" },
      { label: "Nunca tornei isso uma prioridade real", value: "priority", emoji: "📌" },
    ],
    fieldKey: "healthBlock",
    next: () => "barrier",
  },

  // ── BARREIRA ─────────────────────────────────────────────────────────────────
  {
    id: "barrier",
    type: "single_choice",
    phase: "decisao",
    question: "O que você sente que falta pra começar de verdade?",
    options: [
      { label: "Um ambiente que me mantenha comprometido(a)", value: "environment", emoji: "🏋️" },
      { label: "Orientação — não sei o que fazer pra ter resultado", value: "guidance", emoji: "🧭" },
      { label: "O empurrão final — já sei que preciso, mas tô adiando", value: "push", emoji: "🚀" },
      { label: "Encontrar um lugar onde eu me sinta bem e motivado(a)", value: "vibe", emoji: "✨" },
    ],
    fieldKey: "barrier",
    next: () => "plans",
  },

  // ── PLANOS ────────────────────────────────────────────────────────────────────
  {
    id: "plans",
    type: "single_choice",
    phase: "decisao",
    question: "Qual dessas opções melhor condiz com seu momento atual?",
    options: [
      {
        label: "Orange — R$ 119,90/mês · contrato anual",
        value: "orange",
        emoji: "🟠",
        sublabel: "Mais econômico, menor custo mensal",
      },
      {
        label: "Platinum Recorrente — R$ 139,90/mês",
        value: "platinum_rec",
        emoji: "🥇",
        sublabel: "Mensal automático · cancele quando quiser",
      },
      {
        label: "Platinum Mensal — R$ 159,90/mês",
        value: "platinum_month",
        emoji: "📆",
        sublabel: "Sem cartão · renova na recepção",
      },
      {
        label: "Os planos estão além do meu orçamento agora",
        value: "too_expensive",
        emoji: "💬",
        sublabel: "Tudo bem — temos uma alternativa pra você",
      },
    ],
    fieldKey: "plan",
    next: (d) => (d.plan === "too_expensive" ? "ebook_screen" : "capture"),
  },

  // ── CAPTURA ───────────────────────────────────────────────────────────────────
  {
    id: "capture",
    type: "capture",
    phase: "decisao",
    fieldKey: "contact",
    next: () => "success_screen",
  },

  // ── TERMINAIS ─────────────────────────────────────────────────────────────────
  { id: "success_screen", type: "terminal", phase: "decisao", fieldKey: null },
  { id: "ebook_screen", type: "terminal", phase: "decisao", fieldKey: null },
];

const STEP_INDEX = Object.fromEntries(STEPS.map((s, i) => [s.id, i]));

// ─── COPY ─────────────────────────────────────────────────────────────────────

const RESULT_COPY: Record<string, { headline: string; sub: string }> = {
  lose_weight: {
    headline: "Você está a um passo de transformar seu corpo",
    sub: "Com acompanhamento profissional e o ambiente certo, emagrecer de forma consistente é totalmente possível. A Panobianco Satélite tem a estrutura e a equipe pra te levar lá.",
  },
  gain_muscle: {
    headline: "Sua melhor versão está esperando por você",
    sub: "Ganhar massa e definição exige método, não sorte. Nossa equipe monta o treino ideal pro seu perfil desde o primeiro dia.",
  },
  energy: {
    headline: "Sua disposição vai mudar em semanas, não meses",
    sub: "Atividade física regular é o remédio mais eficaz pra energia e bem-estar — e a gente torna esse hábito fácil de manter.",
  },
  health: {
    headline: "Invista em você — é o melhor retorno que existe",
    sub: "Saúde não é um destino, é uma rotina. A Panobianco Satélite está aqui pra tornar essa rotina consistente e prazerosa.",
  },
};

const PLAN_LABELS: Record<string, string> = {
  orange: "Orange Anual",
  platinum_rec: "Platinum Recorrente",
  platinum_month: "Platinum Mensal",
};

const PHASES: { key: Phase; label: string }[] = [
  { key: "perfil", label: "Seu Perfil" },
  { key: "objetivo", label: "Seus Objetivos" },
  { key: "decisao", label: "Seu Plano" },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const applyDateMask = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 8);
  if (d.length <= 2) return d;
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`;
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
};

const applyPhoneMask = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function QuizClient() {
  const [history, setHistory] = useState<string[]>(["firstName"]);
  const [answers, setAnswers] = useState<Answers>({});
  const [textInput, setTextInput] = useState("");
  const [visible, setVisible] = useState(true);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [screen, setScreen] = useState<"success" | "ebook" | null>(null);

  const currentId = history[history.length - 1];
  const step = STEPS[STEP_INDEX[currentId]];

  useEffect(() => {
    if (step?.type === "text_input") {
      setTextInput(answers[step.fieldKey] ?? "");
    } else {
      setTextInput("");
    }
  }, [currentId]); // eslint-disable-line react-hooks/exhaustive-deps

  const transition = (fn: () => void, dir: "forward" | "back" = "forward") => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setVisible(false);
    setTimeout(() => {
      fn();
      setVisible(true);
      setAnimating(false);
    }, 280);
  };

  const resolveNext = (currentStep: Step, updatedAnswers: Answers): string | null => {
    if (currentStep.type !== "terminal" && currentStep.next) {
      return currentStep.next(updatedAnswers);
    }
    const idx = STEP_INDEX[currentStep.id];
    return STEPS[idx + 1]?.id ?? null;
  };

  const advance = (fieldKey: string, value: string) => {
    if (animating) return;
    const updatedAnswers = { ...answers, [fieldKey]: value };
    const nextId = resolveNext(step, updatedAnswers);

    // Tracking — fires before state transitions
    trackQuizStepCompleted(step.id, step.phase);
    if (fieldKey === "firstName") trackQuizStarted();
    if (fieldKey === "goal") trackQuizGoalSelected(value);
    if (fieldKey === "plan") {
      const planLabels: Record<string, string> = {
        orange: "Orange Anual",
        platinum_rec: "Platinum Recorrente",
        platinum_month: "Platinum Mensal",
      };
      trackQuizPlanSelected(value, planLabels[value] ?? value);
    }

    if (nextId === "success_screen") {
      setAnswers(updatedAnswers);
      setScreen("success");
      return;
    }
    if (nextId === "ebook_screen") {
      setAnswers(updatedAnswers);
      setScreen("ebook");
      return;
    }

    transition(() => {
      setAnswers(updatedAnswers);
      setTextInput("");
      if (nextId) setHistory((h) => [...h, nextId]);
    }, "forward");
  };

  const goBack = () => {
    if (history.length <= 1 || animating) return;
    transition(() => {
      setHistory((h) => h.slice(0, -1));
    }, "back");
  };

  const handleCaptureSubmit = (contact: { email: string; whatsapp: string }) => {
    trackQuizLeadCaptured(answers.plan ?? "");
    setAnswers((p) => ({ ...p, ...contact }));
    setScreen("success");
  };

  const getQuestion = (): string => {
    if (step.type === "single_choice" && step.questionTemplate) {
      return step.questionTemplate(answers);
    }
    if (step.type === "text_input" || step.type === "single_choice") {
      return step.question ?? "";
    }
    return "";
  };

  const resultData = RESULT_COPY[answers.goal] ?? RESULT_COPY.health;

  if (screen === "success") {
    return <ScreenSuccess answers={answers} resultData={resultData} />;
  }
  if (screen === "ebook") {
    return <ScreenEbook answers={answers} />;
  }

  const phaseIndex = PHASES.findIndex((p) => p.key === (step?.phase ?? "decisao"));
  const progress = Math.min(98, Math.round((history.length / 14) * 100));

  const slideStyle: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible
      ? "translateY(0px)"
      : direction === "forward"
        ? "translateY(12px)"
        : "translateY(-12px)",
    transition: "opacity 0.25s ease, transform 0.25s ease",
  };

  return (
    <div className="relative min-h-screen bg-background-dark text-white overflow-x-hidden pb-24">
      {/* Decorative background */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-full -translate-x-1/2 bg-gradient-to-b from-primary-500/10 to-transparent" />
      <div className="pointer-events-none absolute -right-24 top-24 size-72 rounded-full bg-primary-500/8 blur-[120px]" />

      <div className="relative mx-auto flex max-w-xl flex-col items-center px-4 pt-10">
        {/* Phase indicators */}
        <div className="mb-4 flex items-center gap-6">
          {PHASES.map((phase, i) => (
            <div key={phase.key} className="flex flex-col items-center gap-1.5">
              <div
                className="rounded-full transition-all duration-300"
                style={{
                  width: "8px",
                  height: "8px",
                  background:
                    i < phaseIndex
                      ? "rgba(255,94,41,0.45)"
                      : i === phaseIndex
                        ? "#ff5e29"
                        : "rgba(255,255,255,0.12)",
                  boxShadow: i === phaseIndex ? "0 0 8px rgba(255,94,41,0.55)" : "none",
                  transform: i === phaseIndex ? "scale(1.4)" : "scale(1)",
                }}
              />
              <span
                className="text-[9px] font-bold uppercase tracking-wider transition-colors duration-300"
                style={{
                  color: i === phaseIndex ? "#ff5e29" : "rgba(255,255,255,0.22)",
                  whiteSpace: "nowrap",
                }}
              >
                {phase.label}
              </span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mb-8 h-0.5 w-full overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary-500 to-orange-400 shadow-[0_0_8px_rgba(255,94,41,0.4)]"
            style={{ width: `${progress}%`, transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)" }}
          />
        </div>

        {/* Quiz card */}
        <div
          className="w-full rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
          style={slideStyle}
        >
          {/* Back button */}
          {history.length > 1 && (
            <button
              onClick={goBack}
              className="mb-6 flex items-center gap-2 text-white/30 transition-colors hover:text-white/60"
            >
              <ArrowLeft className="size-4" />
              <span className="text-xs font-medium">Voltar</span>
            </button>
          )}

          {step.type === "capture" && (
            <CaptureBlock
              answers={answers}
              onSubmit={handleCaptureSubmit}
            />
          )}

          {(step.type === "single_choice" || step.type === "text_input") && (
            <>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-primary-500/70">
                Pergunta {history.length}
              </p>
              <h2 className="mb-6 text-xl font-bold leading-snug text-white md:text-2xl">
                {getQuestion()}
              </h2>

              {step.type === "single_choice" && (
                <div className="flex flex-col gap-3">
                  {step.options.map((opt) => (
                    <OptionButton
                      key={opt.value}
                      opt={opt}
                      selected={answers[step.fieldKey] === opt.value}
                      onSelect={() => advance(step.fieldKey, opt.value)}
                    />
                  ))}
                </div>
              )}

              {step.type === "text_input" && (
                <TextInputBlock
                  value={textInput}
                  onChange={(v) =>
                    setTextInput(step.mask === "date" ? applyDateMask(v) : v)
                  }
                  placeholder={step.placeholder}
                  inputType={step.inputType}
                  inputMode={step.inputMode}
                  buttonLabel={step.buttonLabel}
                  onNext={() =>
                    textInput.trim() && advance(step.fieldKey, textInput.trim())
                  }
                  disabled={!textInput.trim()}
                />
              )}
            </>
          )}
        </div>

        {/* Footer note */}
        <p className="mt-8 flex items-center gap-2 text-xs text-white/20">
          <Lock className="size-3" />
          Seus dados são privados e nunca serão compartilhados
        </p>
      </div>
    </div>
  );
}

// ─── OPTION BUTTON ────────────────────────────────────────────────────────────

function OptionButton({
  opt,
  onSelect,
  selected,
}: {
  opt: Option;
  onSelect: () => void;
  selected: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={[
        "group flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all duration-200",
        selected
          ? "border-primary-500 bg-primary-500/15"
          : hovered
            ? "border-primary-500/40 bg-primary-500/8"
            : "border-white/10 bg-white/5 hover:border-primary-500/40 hover:bg-primary-500/8",
      ].join(" ")}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-lg">
        {opt.emoji}
      </span>
      <span className="flex-1">
        <span className="block text-sm font-medium leading-snug text-white/90">
          {opt.label}
        </span>
        {opt.sublabel && (
          <span className="mt-0.5 block text-[11px] text-white/35">{opt.sublabel}</span>
        )}
      </span>
      {selected && (
        <span className="shrink-0 text-sm font-bold text-primary-500">✓</span>
      )}
    </button>
  );
}

// ─── TEXT INPUT BLOCK ─────────────────────────────────────────────────────────

function TextInputBlock({
  value,
  onChange,
  placeholder,
  inputType,
  inputMode,
  buttonLabel,
  onNext,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  inputType?: string;
  inputMode?: string;
  buttonLabel: string;
  onNext: () => void;
  disabled: boolean;
}) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const t = setTimeout(() => ref.current?.focus(), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <input
        ref={ref}
        type={inputType ?? "text"}
        inputMode={inputMode as React.HTMLAttributes<HTMLInputElement>["inputMode"]}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onKeyDown={(e) => e.key === "Enter" && onNext()}
        className="w-full rounded-lg border border-white/15 bg-black/20 px-4 py-3 text-base text-white placeholder:text-white/35 focus:border-primary-500 focus:outline-none transition-colors"
      />
      <button
        onClick={onNext}
        disabled={disabled}
        className="flex w-full items-center justify-center rounded-full bg-primary-500 py-4 font-bold text-white shadow-[0_4px_20px_rgba(255,94,41,0.3)] transition-all hover:bg-primary-500/90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {buttonLabel}
      </button>
    </div>
  );
}

// ─── CAPTURE BLOCK ────────────────────────────────────────────────────────────

function CaptureBlock({
  answers,
  onSubmit,
}: {
  answers: Answers;
  onSubmit: (contact: { email: string; whatsapp: string }) => void;
}) {
  const [email, setEmail] = useState(answers.email ?? "");
  const [whatsapp, setWhatsapp] = useState(answers.whatsapp ?? "");

  const valid = email.includes("@") && whatsapp.replace(/\D/g, "").length >= 10;

  return (
    <div className="flex flex-col gap-5">
      <div className="text-center">
        <div className="mb-4 text-5xl">🎯</div>
        <h2 className="mb-2 text-2xl font-black leading-snug text-white">
          Quase lá, {answers.firstName}!
        </h2>
        <p className="text-sm leading-relaxed text-white/50">
          Informe seus dados para receber seu resultado e uma{" "}
          <strong className="text-white/80">oferta exclusiva</strong> para começar essa semana.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu e-mail"
          className="w-full rounded-lg border border-white/15 bg-black/20 px-4 py-3 text-base text-white placeholder:text-white/35 focus:border-primary-500 focus:outline-none transition-colors"
        />
        <input
          type="tel"
          inputMode="numeric"
          value={whatsapp}
          onChange={(e) => setWhatsapp(applyPhoneMask(e.target.value))}
          placeholder="WhatsApp com DDD"
          className="w-full rounded-lg border border-white/15 bg-black/20 px-4 py-3 text-base text-white placeholder:text-white/35 focus:border-primary-500 focus:outline-none transition-colors"
        />
      </div>

      <button
        onClick={() => valid && onSubmit({ email, whatsapp })}
        disabled={!valid}
        className="flex w-full items-center justify-center rounded-full bg-primary-500 py-4 font-bold text-white shadow-[0_4px_20px_rgba(255,94,41,0.3)] transition-all hover:bg-primary-500/90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Quero meu resultado →
      </button>

      <p className="text-center text-[11px] text-white/20">
        Sem spam. Usaremos apenas para enviar seu resultado.
      </p>
    </div>
  );
}

// ─── SUCCESS SCREEN ───────────────────────────────────────────────────────────

function ScreenSuccess({
  answers,
  resultData,
}: {
  answers: Answers;
  resultData: { headline: string; sub: string };
}) {
  const planLabel = PLAN_LABELS[answers.plan] ?? "escolhido";
  const waLink = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    `Olá! Fiz o quiz e quero o plano ${planLabel}.`,
  )}`;

  return (
    <div className="relative min-h-screen bg-background-dark text-white overflow-x-hidden pb-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-full -translate-x-1/2 bg-gradient-to-b from-primary-500/10 to-transparent" />

      <div className="relative mx-auto flex max-w-xl flex-col items-center px-4 pt-16">
        <div className="w-full rounded-xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
          <Trophy className="mx-auto mb-5 size-14 text-primary-500" />

          <h2 className="mb-3 text-2xl font-black leading-snug text-white md:text-3xl">
            {resultData.headline}
          </h2>
          <p className="mb-8 leading-relaxed text-white/55">{resultData.sub}</p>

          {/* Plan confirmation */}
          <div className="mb-8 rounded-xl border border-primary-500/20 bg-primary-500/8 p-5 text-left">
            <p className="text-sm leading-relaxed text-white/75">
              <strong className="text-white">{answers.firstName}</strong>, você escolheu o plano{" "}
              <strong className="text-primary-500">{planLabel}</strong>. Nossa equipe vai entrar em
              contato pelo WhatsApp{" "}
              <strong className="text-white">{answers.whatsapp}</strong> para fechar tudo com você.
              🎉
            </p>
          </div>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackQuizWhatsappClicked(answers.plan ?? "")}
            className="flex w-full items-center justify-center rounded-full bg-primary-500 py-4 font-bold text-white shadow-[0_4px_20px_rgba(255,94,41,0.3)] transition-all hover:bg-primary-500/90 active:scale-95"
          >
            Falar com a equipe agora →
          </a>
        </div>

        <p className="mt-10 text-[10px] uppercase tracking-widest text-white/15">
          Panobianco Jd. Satélite · São José dos Campos
        </p>
      </div>
    </div>
  );
}

// ─── EBOOK SCREEN ─────────────────────────────────────────────────────────────

function ScreenEbook({ answers }: { answers: Answers }) {
  const [email, setEmail] = useState(answers.email ?? "");
  const [done, setDone] = useState(false);

  useEffect(() => {
    trackQuizEbookViewed();
  }, []);

  if (done) {
    return (
      <div className="relative min-h-screen bg-background-dark text-white overflow-x-hidden pb-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-full -translate-x-1/2 bg-gradient-to-b from-primary-500/10 to-transparent" />
        <div className="relative mx-auto flex max-w-xl flex-col items-center px-4 pt-16">
          <div className="w-full rounded-xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
            <div className="mb-5 text-5xl">📬</div>
            <h2 className="mb-3 text-2xl font-black text-white">
              Obrigado, {answers.firstName}!
            </h2>
            <p className="leading-relaxed text-white/55">
              Recebemos seu contato. Nossa equipe vai entrar em contato pelo e-mail{" "}
              <strong className="text-primary-500">{email}</strong> em breve com todos os detalhes.
              🧡
            </p>
            <p className="mt-10 text-[10px] uppercase tracking-widest text-white/15">
              Panobianco Jd. Satélite · São José dos Campos
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background-dark text-white overflow-x-hidden pb-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-full -translate-x-1/2 bg-gradient-to-b from-primary-500/10 to-transparent" />

      <div className="relative mx-auto flex max-w-xl flex-col items-center px-4 pt-16">
        <div className="w-full rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <div className="mb-5 text-center text-5xl">🤗</div>
          <h2 className="mb-3 text-center text-2xl font-black text-white">
            A gente entende, {answers.firstName}.
          </h2>
          <p className="mb-4 leading-relaxed text-white/55">
            Sabemos que o momento financeiro nem sempre permite. E tudo bem — o que importa é que a
            preocupação com a sua saúde já está aqui.
          </p>
          <p className="mb-6 leading-relaxed text-white/55">
            Pensando nisso, criamos um{" "}
            <strong className="text-white">e-book completo</strong> com tudo que você precisa pra
            começar a se movimentar em casa — pra sair do lugar agora, do seu jeito.
          </p>

          {/* Ebook card */}
          <div className="mb-6 rounded-xl border border-primary-500/18 bg-primary-500/7 p-6 text-center">
            <p className="mb-2 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary-500/60">
              <BookOpen className="size-3" />
              E-book exclusivo
            </p>
            <p className="mb-3 text-lg font-black leading-snug text-white">
              Comece Agora: Treino em Casa + Alimentação Saudável
            </p>
            <p className="text-3xl font-black text-primary-500">R$ 19,90</p>
            <p className="mt-1 text-[11px] text-white/25">pagamento único · entregue por e-mail</p>
          </div>

          <p className="mb-3 text-center text-sm text-white/40">
            Deixe seu e-mail que nossa equipe entra em contato.
          </p>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu e-mail"
            className="mb-3 w-full rounded-lg border border-white/15 bg-black/20 px-4 py-3 text-base text-white placeholder:text-white/35 focus:border-primary-500 focus:outline-none transition-colors"
          />

          <button
            onClick={() => {
              if (email.includes("@")) {
                trackQuizEbookCaptured();
                setDone(true);
              }
            }}
            disabled={!email.includes("@")}
            className="flex w-full items-center justify-center rounded-full bg-primary-500 py-4 font-bold text-white shadow-[0_4px_20px_rgba(255,94,41,0.3)] transition-all hover:bg-primary-500/90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Quero o e-book por R$ 19,90 →
          </button>

          <p className="mt-4 text-center text-xs text-white/18">
            E quando as coisas melhorarem, a gente vai estar aqui esperando por você. 🧡
          </p>
        </div>
      </div>
    </div>
  );
}
