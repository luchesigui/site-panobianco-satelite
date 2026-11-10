export function formatInternalRaffleResult({ winner, winnerId }) {
  return [
    "Resultado interno do sorteio semanal",
    "",
    `Aluno: ${winner}`,
    `ID do aluno: ${winnerId}`,
    "Status: pendente de contato",
    "",
  ].join("\n");
}
