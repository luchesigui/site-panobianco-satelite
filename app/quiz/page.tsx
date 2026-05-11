import type { Metadata } from "next";

import QuizClient from "./QuizClient";

export const metadata: Metadata = {
  title: "Quiz | Descubra o Plano Ideal para Você",
  description:
    "Responda algumas perguntas e descubra qual plano da Panobianco Jardim Satélite é ideal para o seu objetivo. Emagrecer, ganhar massa, energia ou saúde — temos o plano certo pra você.",
  alternates: { canonical: "/quiz" },
  robots: "noindex",
};

export default function QuizPage() {
  return <QuizClient />;
}
