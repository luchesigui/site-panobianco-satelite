"use client";

import {
  ArrowDownCircle,
  ArrowUpCircle,
  Filter,
  MinusCircle,
  Search,
} from "lucide-react";
import { useState, useMemo } from "react";

// Tipos
interface Lancamento {
  id: number;
  descricao: string;
  valor: number;
  tipo: "entrada" | "saida";
  categoria: string;
  data: string;
  foraDaConta: boolean;
}

// Dados de exemplo
const lancamentosIniciais: Lancamento[] = [
  {
    id: 1,
    descricao: "Mensalidade - João Silva",
    valor: 139.9,
    tipo: "entrada",
    categoria: "Mensalidade",
    data: "2026-02-01",
    foraDaConta: false,
  },
  {
    id: 2,
    descricao: "Energia Elétrica",
    valor: 1250.0,
    tipo: "saida",
    categoria: "Despesas Fixas",
    data: "2026-02-01",
    foraDaConta: false,
  },
  {
    id: 3,
    descricao: "Transferência entre contas",
    valor: 5000.0,
    tipo: "saida",
    categoria: "Transferência",
    data: "2026-02-02",
    foraDaConta: true,
  },
  {
    id: 4,
    descricao: "Mensalidade - Maria Santos",
    valor: 119.9,
    tipo: "entrada",
    categoria: "Mensalidade",
    data: "2026-02-02",
    foraDaConta: false,
  },
  {
    id: 5,
    descricao: "Estorno - Duplicidade pagamento",
    valor: 139.9,
    tipo: "saida",
    categoria: "Estorno",
    data: "2026-02-03",
    foraDaConta: true,
  },
  {
    id: 6,
    descricao: "Manutenção Equipamentos",
    valor: 850.0,
    tipo: "saida",
    categoria: "Manutenção",
    data: "2026-02-03",
    foraDaConta: false,
  },
  {
    id: 7,
    descricao: "Empréstimo sócio",
    valor: 10000.0,
    tipo: "entrada",
    categoria: "Empréstimo",
    data: "2026-02-04",
    foraDaConta: true,
  },
  {
    id: 8,
    descricao: "Treino Personalizado - Carlos",
    valor: 250.0,
    tipo: "entrada",
    categoria: "Serviços",
    data: "2026-02-04",
    foraDaConta: false,
  },
  {
    id: 9,
    descricao: "Salários Funcionários",
    valor: 15000.0,
    tipo: "saida",
    categoria: "Folha de Pagamento",
    data: "2026-02-05",
    foraDaConta: false,
  },
  {
    id: 10,
    descricao: "Devolução caução",
    valor: 200.0,
    tipo: "saida",
    categoria: "Devolução",
    data: "2026-02-05",
    foraDaConta: true,
  },
  {
    id: 11,
    descricao: "Mensalidade - Pedro Oliveira",
    valor: 159.9,
    tipo: "entrada",
    categoria: "Mensalidade",
    data: "2026-02-06",
    foraDaConta: false,
  },
  {
    id: 12,
    descricao: "Aporte de capital",
    valor: 20000.0,
    tipo: "entrada",
    categoria: "Aporte",
    data: "2026-02-06",
    foraDaConta: true,
  },
];

// Formatar valor em reais
const formatarValor = (valor: number) => {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

// Formatar data
const formatarData = (dataString: string) => {
  const data = new Date(dataString + "T00:00:00");
  return data.toLocaleDateString("pt-BR");
};

export default function Lancamentos() {
  const [lancamentos, setLancamentos] =
    useState<Lancamento[]>(lancamentosIniciais);
  const [filtroForaDaConta, setFiltroForaDaConta] = useState<
    "todos" | "fora" | "dentro"
  >("todos");
  const [busca, setBusca] = useState("");
  const [filtroTipo, setFiltroTipo] = useState<"todos" | "entrada" | "saida">(
    "todos"
  );

  // Filtrar lançamentos
  const lancamentosFiltrados = useMemo(() => {
    return lancamentos.filter((lancamento) => {
      // Filtro por "fora da conta"
      if (filtroForaDaConta === "fora" && !lancamento.foraDaConta) return false;
      if (filtroForaDaConta === "dentro" && lancamento.foraDaConta) return false;

      // Filtro por tipo
      if (filtroTipo !== "todos" && lancamento.tipo !== filtroTipo) return false;

      // Filtro por busca
      if (
        busca &&
        !lancamento.descricao.toLowerCase().includes(busca.toLowerCase()) &&
        !lancamento.categoria.toLowerCase().includes(busca.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [lancamentos, filtroForaDaConta, filtroTipo, busca]);

  // Calcular totais (apenas lançamentos que entram na conta)
  const totais = useMemo(() => {
    const lancamentosNaConta = lancamentos.filter((l) => !l.foraDaConta);
    const entradas = lancamentosNaConta
      .filter((l) => l.tipo === "entrada")
      .reduce((acc, l) => acc + l.valor, 0);
    const saidas = lancamentosNaConta
      .filter((l) => l.tipo === "saida")
      .reduce((acc, l) => acc + l.valor, 0);
    return {
      entradas,
      saidas,
      saldo: entradas - saidas,
    };
  }, [lancamentos]);

  // Totais fora da conta
  const totaisForaDaConta = useMemo(() => {
    const lancamentosForaDaConta = lancamentos.filter((l) => l.foraDaConta);
    const entradas = lancamentosForaDaConta
      .filter((l) => l.tipo === "entrada")
      .reduce((acc, l) => acc + l.valor, 0);
    const saidas = lancamentosForaDaConta
      .filter((l) => l.tipo === "saida")
      .reduce((acc, l) => acc + l.valor, 0);
    return {
      entradas,
      saidas,
      total: entradas - saidas,
    };
  }, [lancamentos]);

  // Alternar status "fora da conta"
  const toggleForaDaConta = (id: number) => {
    setLancamentos((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, foraDaConta: !l.foraDaConta } : l
      )
    );
  };

  return (
    <div className="bg-primary min-h-screen">
      {/* Header Section */}
      <section className="py-12 lg:py-16">
        <div className="container-main">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
              <span className="text-primary-500">Lançamentos</span> Financeiros
            </h1>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Gerencie os lançamentos financeiros e filtre por lançamentos que
              não entram na conta.
            </p>
          </div>
        </div>
      </section>

      {/* Resumo Cards */}
      <section className="pb-8">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Entradas */}
            <div className="card">
              <div className="flex items-center gap-3 mb-2">
                <ArrowUpCircle className="h-6 w-6 text-green-500" />
                <span className="text-sm font-medium text-secondary">
                  Entradas (na conta)
                </span>
              </div>
              <p className="text-2xl font-bold text-green-500">
                {formatarValor(totais.entradas)}
              </p>
            </div>

            {/* Saídas */}
            <div className="card">
              <div className="flex items-center gap-3 mb-2">
                <ArrowDownCircle className="h-6 w-6 text-red-500" />
                <span className="text-sm font-medium text-secondary">
                  Saídas (na conta)
                </span>
              </div>
              <p className="text-2xl font-bold text-red-500">
                {formatarValor(totais.saidas)}
              </p>
            </div>

            {/* Saldo */}
            <div className="card">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`h-6 w-6 rounded-full flex items-center justify-center ${
                    totais.saldo >= 0 ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  <span className="text-white text-xs font-bold">$</span>
                </div>
                <span className="text-sm font-medium text-secondary">
                  Saldo (na conta)
                </span>
              </div>
              <p
                className={`text-2xl font-bold ${
                  totais.saldo >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {formatarValor(totais.saldo)}
              </p>
            </div>

            {/* Fora da Conta */}
            <div className="card border-yellow-500 dark:border-yellow-500">
              <div className="flex items-center gap-3 mb-2">
                <MinusCircle className="h-6 w-6 text-yellow-500" />
                <span className="text-sm font-medium text-secondary">
                  Fora da Conta
                </span>
              </div>
              <p className="text-2xl font-bold text-yellow-500">
                {formatarValor(totaisForaDaConta.total)}
              </p>
              <p className="text-xs text-muted mt-1">
                {lancamentos.filter((l) => l.foraDaConta).length} lançamento(s)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section className="pb-8">
        <div className="container-main">
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-primary-500" />
              <h2 className="text-lg font-semibold text-primary">Filtros</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Busca */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted" />
                <input
                  type="text"
                  placeholder="Buscar por descrição ou categoria..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="input-field pl-10"
                />
              </div>

              {/* Filtro por Tipo */}
              <select
                value={filtroTipo}
                onChange={(e) =>
                  setFiltroTipo(e.target.value as "todos" | "entrada" | "saida")
                }
                className="input-field"
              >
                <option value="todos">Todos os tipos</option>
                <option value="entrada">Apenas Entradas</option>
                <option value="saida">Apenas Saídas</option>
              </select>

              {/* Filtro Fora da Conta */}
              <select
                value={filtroForaDaConta}
                onChange={(e) =>
                  setFiltroForaDaConta(
                    e.target.value as "todos" | "fora" | "dentro"
                  )
                }
                className="input-field"
              >
                <option value="todos">Todos os lançamentos</option>
                <option value="fora">Apenas fora da conta</option>
                <option value="dentro">Apenas que entram na conta</option>
              </select>
            </div>

            {/* Informação sobre o filtro */}
            {filtroForaDaConta === "fora" && (
              <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                  <strong>Filtro ativo:</strong> Mostrando apenas lançamentos
                  que <strong>não entram na conta</strong> (transferências,
                  estornos, empréstimos, etc.)
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lista de Lançamentos */}
      <section className="pb-16">
        <div className="container-main">
          <div className="card overflow-hidden p-0">
            {/* Header da tabela */}
            <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 bg-secondary border-b border-theme">
              <div className="col-span-1 text-sm font-semibold text-secondary">
                Data
              </div>
              <div className="col-span-4 text-sm font-semibold text-secondary">
                Descrição
              </div>
              <div className="col-span-2 text-sm font-semibold text-secondary">
                Categoria
              </div>
              <div className="col-span-2 text-sm font-semibold text-secondary text-right">
                Valor
              </div>
              <div className="col-span-2 text-sm font-semibold text-secondary text-center">
                Status
              </div>
              <div className="col-span-1 text-sm font-semibold text-secondary text-center">
                Ação
              </div>
            </div>

            {/* Linhas */}
            {lancamentosFiltrados.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-secondary">
                  Nenhum lançamento encontrado com os filtros selecionados.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-light-border dark:divide-dark-border">
                {lancamentosFiltrados.map((lancamento) => (
                  <div
                    key={lancamento.id}
                    className={`p-4 hover:bg-secondary transition-colors ${
                      lancamento.foraDaConta ? "opacity-60" : ""
                    }`}
                  >
                    {/* Mobile Layout */}
                    <div className="md:hidden space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-primary">
                            {lancamento.descricao}
                          </p>
                          <p className="text-sm text-muted">
                            {lancamento.categoria}
                          </p>
                        </div>
                        <div
                          className={`text-lg font-bold ${
                            lancamento.tipo === "entrada"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {lancamento.tipo === "entrada" ? "+" : "-"}
                          {formatarValor(lancamento.valor)}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted">
                          {formatarData(lancamento.data)}
                        </span>
                        <div className="flex items-center gap-2">
                          {lancamento.foraDaConta && (
                            <span className="px-2 py-1 text-xs font-medium bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 rounded">
                              Fora da conta
                            </span>
                          )}
                          <button
                            onClick={() => toggleForaDaConta(lancamento.id)}
                            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                              lancamento.foraDaConta
                                ? "bg-green-500/20 text-green-600 dark:text-green-400 hover:bg-green-500/30"
                                : "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/30"
                            }`}
                          >
                            {lancamento.foraDaConta
                              ? "Incluir na conta"
                              : "Tirar da conta"}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden md:grid md:grid-cols-12 gap-4 items-center">
                      <div className="col-span-1 text-sm text-muted">
                        {formatarData(lancamento.data)}
                      </div>
                      <div className="col-span-4">
                        <p className="font-medium text-primary">
                          {lancamento.descricao}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <span className="px-2 py-1 text-xs font-medium bg-primary-500/10 text-primary-500 rounded">
                          {lancamento.categoria}
                        </span>
                      </div>
                      <div
                        className={`col-span-2 text-right font-bold ${
                          lancamento.tipo === "entrada"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {lancamento.tipo === "entrada" ? "+" : "-"}
                        {formatarValor(lancamento.valor)}
                      </div>
                      <div className="col-span-2 text-center">
                        {lancamento.foraDaConta ? (
                          <span className="px-2 py-1 text-xs font-medium bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 rounded">
                            Fora da conta
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-medium bg-green-500/20 text-green-600 dark:text-green-400 rounded">
                            Na conta
                          </span>
                        )}
                      </div>
                      <div className="col-span-1 text-center">
                        <button
                          onClick={() => toggleForaDaConta(lancamento.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            lancamento.foraDaConta
                              ? "hover:bg-green-500/20 text-green-500"
                              : "hover:bg-yellow-500/20 text-yellow-500"
                          }`}
                          title={
                            lancamento.foraDaConta
                              ? "Incluir na conta"
                              : "Tirar da conta"
                          }
                        >
                          <MinusCircle className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Rodapé com totais dos filtrados */}
            <div className="p-4 bg-secondary border-t border-theme">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <p className="text-sm text-secondary">
                  Mostrando{" "}
                  <strong className="text-primary">
                    {lancamentosFiltrados.length}
                  </strong>{" "}
                  de <strong className="text-primary">{lancamentos.length}</strong>{" "}
                  lançamento(s)
                </p>
                <div className="flex gap-4 text-sm">
                  <span className="text-green-500 font-medium">
                    Entradas:{" "}
                    {formatarValor(
                      lancamentosFiltrados
                        .filter((l) => l.tipo === "entrada")
                        .reduce((acc, l) => acc + l.valor, 0)
                    )}
                  </span>
                  <span className="text-red-500 font-medium">
                    Saídas:{" "}
                    {formatarValor(
                      lancamentosFiltrados
                        .filter((l) => l.tipo === "saida")
                        .reduce((acc, l) => acc + l.valor, 0)
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="pb-16">
        <div className="container-main">
          <div className="card bg-primary-500/5 border-primary-500/20">
            <h3 className="text-lg font-semibold text-primary mb-3">
              O que são lançamentos fora da conta?
            </h3>
            <p className="text-secondary text-sm mb-4">
              Lançamentos marcados como &quot;fora da conta&quot; são
              movimentações financeiras que não devem ser consideradas no cálculo
              do saldo operacional. Exemplos incluem:
            </p>
            <ul className="list-disc list-inside text-secondary text-sm space-y-1">
              <li>Transferências entre contas da mesma empresa</li>
              <li>Estornos e devoluções</li>
              <li>Empréstimos de sócios</li>
              <li>Aportes de capital</li>
              <li>Devoluções de caução</li>
              <li>Movimentações que não afetam o resultado operacional</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
