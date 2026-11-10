import assert from "node:assert/strict";
import test from "node:test";

import { formatInternalRaffleResult } from "./sorteio-result.mjs";

test("formatInternalRaffleResult records the internal contact status", () => {
  const result = formatInternalRaffleResult({ winner: "Pessoa Teste", winnerId: "123" });

  assert.match(result, /Aluno: Pessoa Teste/);
  assert.match(result, /ID do aluno: 123/);
  assert.match(result, /Status: pendente de contato/);
});
