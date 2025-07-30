import { Check, Star, X, Zap } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Planos e Adesão | Academia Panobianco Jardim Satélite - Mensalidades e Preços",
  description:
    "Conheça os planos da Academia Panobianco Jardim Satélite. Opções flexíveis de mensalidade que se adaptam ao seu estilo de vida e orçamento em São José dos Campos.",
  keywords:
    "planos academia, mensalidade academia, preços academia panobianco, adesão academia jardim satélite, são josé dos campos",
  robots: "index, follow",
  openGraph: {
    title: "Planos e Adesão | Academia Panobianco Jardim Satélite",
    description:
      "Encontre o plano perfeito para você. Opções flexíveis que se adaptam ao seu estilo de vida e orçamento.",
    type: "website",
    locale: "pt_BR",
  },
  alternates: {
    canonical: "/planos",
  },
};

export default function Planos() {
  return (
    <div className="bg-primary">
      {/* Hero Section */}
      <section className="py-16 lg:py-20">
        <div className="container-main">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-primary mb-6">
              Planos e <span className="text-primary-500">Adesão</span>
            </h1>
            <p className="text-xl text-secondary mb-8 max-w-3xl mx-auto">
              Encontre o plano perfeito para você. Oferecemos opções flexíveis
              que se adaptam ao seu estilo de vida e orçamento.
            </p>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-8">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {/* Plano Platinum (Recorrente) */}
            <div className="card hover:border-primary-500 transition-colors border-primary-500">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <span className="bg-primary-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  MELHOR OFERTA
                </span>
              </div>
              <h3 className="text-heading text-primary mb-3">
                Plano Platinum (recorrente)
              </h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-primary-500">
                  R$ 129,90
                </span>
                <span className="text-secondary">/mês</span>
              </div>
              <p className="text-body text-secondary mb-6">
                Débito automático, sem taxas e sem fidelidade.
              </p>

              <h4 className="text-heading text-primary mb-4">Inclui:</h4>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start text-sm text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                  Área de cardio tecnológica com esteiras e escada com YouTube e
                  Netflix
                </li>
                <li className="flex items-start text-sm text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                  Musculação com equipamentos de ponta e biodinâmica exclusivas
                </li>
                <li className="flex items-start text-sm text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                  Acesso a todas as aulas coletivas, incluindo pilates, muai
                  thai, jiu-jítsu e muito mais
                </li>
                <li className="flex items-start text-sm text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                  Trazer 5 convidados por mês
                </li>
                <li className="flex items-start text-sm text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                  Avaliação física gratuita
                </li>
                <li className="flex items-start text-sm text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                  Acesso a todas as unidades da rede
                </li>
                <li className="flex items-start text-sm text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                  Sem anuidade, nem taxa de cancelamento
                </li>
                <li className="flex items-start text-sm text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                  Panobianco APP
                </li>
              </ul>
              <Link
                href="https://panobiancosatelite.com.br/checkout"
                className="btn-primary w-full text-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                Assinar Agora
              </Link>
            </div>

            {/* Plano Avulso */}
            <div className="card hover:border-primary-500 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-heading text-primary mb-3">Plano Avulso</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-primary-500">
                  R$ 149,90
                </span>
                <span className="text-secondary">/mês</span>
              </div>
              <p className="text-body text-secondary mb-6">
                Você paga só o mês que usar, por pix, débito ou dinheiro direto
                na recepção.
              </p>

              <h4 className="text-heading text-primary mb-4">Benefícios:</h4>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start text-sm text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                  Tudo que está incluso no plano recorrente
                </li>
                <li className="flex items-start text-sm text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                  Maior controle dos seus pagamentos mensais
                </li>
                <li className="flex items-start text-sm text-red-500">
                  <X className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  Menos praticidade, pois precisa renovar mês a mês
                </li>
              </ul>
              <Link
                href="https://api.whatsapp.com/send/?phone=5512992192268&text=Olá! Eu vi do site e gostaria de me matricular no plano avulso."
                className="btn-primary w-full text-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar no WhatsApp
              </Link>
            </div>
          </div>

          {/* Gympass Card */}
          <div className="card text-center max-w-2xl mx-auto">
            <h3 className="text-heading text-primary mb-4">
              Usuário Gympass ou TotalPass?
            </h3>
            <p className="text-body text-secondary mb-6">
              O Gympass é aceito a partir do plano Basic e o TotalPass, a partir
              do TP1+. Entre em contato conosco para verificar as condições e
              começar a treinar hoje mesmo!
            </p>
            <Link href="/contato" className="btn-primary">
              Entre em contato conosco
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
