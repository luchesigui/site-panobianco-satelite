import Link from 'next/link'
import { Check, Star, Zap, Shield } from 'lucide-react'

export default function Planos() {
  return (
    <div className="bg-neutral-background">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container-main">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-neutral-text-primary mb-6">
              Planos e <span className="text-primary-500">Adesão</span>
            </h1>
            <p className="text-xl text-neutral-text-secondary mb-8 max-w-3xl mx-auto">
              Encontre o plano perfeito para você. Oferecemos opções flexíveis que se adaptam ao seu estilo de vida e orçamento.
            </p>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-16">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Plano Mensal */}
            <div className="card hover:border-primary-500 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Plano Mensal
              </h3>
              <p className="text-body text-neutral-text-secondary mb-4">
                Ideal para quem busca flexibilidade e não quer se comprometer a longo prazo.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm text-neutral-text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2" />
                  Acesso total à academia
                </li>
                <li className="flex items-center text-sm text-neutral-text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2" />
                  Todas as aulas coletivas
                </li>
                <li className="flex items-center text-sm text-neutral-text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2" />
                  Flexibilidade de cancelamento
                </li>
              </ul>
              <Link href="/contato" className="btn-primary w-full text-center">
                Saiba Mais
              </Link>
            </div>

            {/* Plano Trimestral */}
            <div className="card hover:border-primary-500 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Plano Trimestral
              </h3>
              <p className="text-body text-neutral-text-secondary mb-4">
                Excelente custo-benefício com compromisso de três meses para resultados consistentes.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm text-neutral-text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2" />
                  Desconto progressivo
                </li>
                <li className="flex items-center text-sm text-neutral-text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2" />
                  Acesso total e aulas coletivas
                </li>
                <li className="flex items-center text-sm text-neutral-text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2" />
                  Incentivo à regularidade
                </li>
              </ul>
              <Link href="/contato" className="btn-primary w-full text-center">
                Saiba Mais
              </Link>
            </div>

            {/* Plano Semestral */}
            <div className="card hover:border-primary-500 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Plano Semestral
              </h3>
              <p className="text-body text-neutral-text-secondary mb-4">
                Para quem tem visão de longo prazo e busca maximizar os benefícios do treino contínuo.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm text-neutral-text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2" />
                  Maior economia por mês
                </li>
                <li className="flex items-center text-sm text-neutral-text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2" />
                  Acesso ilimitado
                </li>
                <li className="flex items-center text-sm text-neutral-text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2" />
                  Resultados duradouros
                </li>
              </ul>
              <Link href="/contato" className="btn-primary w-full text-center">
                Saiba Mais
              </Link>
            </div>

            {/* Plano Anual */}
            <div className="card hover:border-primary-500 transition-colors border-primary-500">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <span className="bg-primary-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  MELHOR OFERTA
                </span>
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Plano Anual
              </h3>
              <p className="text-body text-neutral-text-secondary mb-4">
                A opção mais completa e econômica para quem leva a sério a saúde e bem-estar.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm text-neutral-text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2" />
                  Maior desconto
                </li>
                <li className="flex items-center text-sm text-neutral-text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2" />
                  Melhor custo-benefício
                </li>
                <li className="flex items-center text-sm text-neutral-text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2" />
                  Transformação de longo prazo
                </li>
              </ul>
              <Link href="/contato" className="btn-primary w-full text-center">
                Saiba Mais
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Gympass Section */}
      <section className="py-16">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-display text-neutral-text-primary mb-4">
              Aceitamos Gympass e Outros Convênios
            </h2>
            <p className="text-body text-neutral-text-secondary max-w-2xl mx-auto">
              Facilitamos ainda mais o seu acesso aos nossos serviços através de parcerias com convênios corporativos.
            </p>
          </div>

          <div className="card text-center max-w-2xl mx-auto">
            <h3 className="text-heading text-neutral-text-primary mb-4">
              Usuário Gympass?
            </h3>
            <p className="text-body text-neutral-text-secondary mb-6">
              Se você é usuário Gympass (a partir do plano Basic) ou possui algum outro convênio, entre em contato conosco para verificar as condições e começar a treinar hoje mesmo!
            </p>
            <Link href="/contato" className="btn-primary">
              Verificar Convênio
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container-main">
          <div className="card text-center">
            <h2 className="text-display text-neutral-text-primary mb-4">
              Solicite um Orçamento Personalizado
            </h2>
            <p className="text-body text-neutral-text-secondary mb-6 max-w-2xl mx-auto">
              Tem dúvidas sobre qual plano é ideal para você? Precisa de um plano corporativo ou familiar? Nossa equipe está pronta para te ajudar!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contato" className="btn-primary">
                Fale Conosco Agora!
              </Link>
              <Link href="/aula-experimental" className="btn-secondary">
                Aula Experimental Gratuita
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}