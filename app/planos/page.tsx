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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
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
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Plano Platinum (recorrente)
              </h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-primary-500">R$ 129,90</span>
                <span className="text-neutral-text-secondary">/mês</span>
              </div>
              <p className="text-body text-neutral-text-secondary mb-6">
                Débito automático, sem taxas e sem fidelidade.
              </p>
              
              <h4 className="text-heading text-neutral-text-primary mb-4">Inclui:</h4>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start text-sm text-neutral-text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                  Área de cardio tecnológica com esteiras e escada com YouTube e Netflix
                </li>
                <li className="flex items-start text-sm text-neutral-text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                  Musculação com equipamentos de ponta e biodinâmica exclusivas
                </li>
                <li className="flex items-start text-sm text-neutral-text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                  Acesso a todas as aulas coletivas, incluindo pilates, muai thai, jiu-jítsu e muito mais
                </li>
                <li className="flex items-start text-sm text-neutral-text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                  Trazer 5 convidados por mês
                </li>
                <li className="flex items-start text-sm text-neutral-text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                  Avaliação física gratuita
                </li>
                <li className="flex items-start text-sm text-neutral-text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                  Acesso a todas as unidades da rede
                </li>
                <li className="flex items-start text-sm text-neutral-text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                  Sem anuidade, nem taxa de cancelamento
                </li>
                <li className="flex items-start text-sm text-neutral-text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                  Panobianco APP
                </li>
              </ul>
              <Link href="/contato" className="btn-primary w-full text-center">
                Saiba Mais
              </Link>
            </div>

            {/* Plano Avulso */}
            <div className="card hover:border-primary-500 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Plano Avulso
              </h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-primary-500">R$ 149,90</span>
                <span className="text-neutral-text-secondary">/mês</span>
              </div>
              <p className="text-body text-neutral-text-secondary mb-6">
                Você paga só o mês que usar, por pix, débito ou dinheiro direto na recepção.
              </p>
              
              <h4 className="text-heading text-neutral-text-primary mb-4">Inclui:</h4>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start text-sm text-neutral-text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                  Área de cardio tecnológica com esteiras e escada com YouTube e Netflix
                </li>
                <li className="flex items-start text-sm text-neutral-text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                  Musculação com equipamentos de ponta e biodinâmica exclusivas
                </li>
                <li className="flex items-start text-sm text-neutral-text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                  Acesso a todas as aulas coletivas, incluindo pilates, muai thai, jiu-jítsu e muito mais
                </li>
                <li className="flex items-start text-sm text-neutral-text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                  Trazer 5 convidados por mês
                </li>
                <li className="flex items-start text-sm text-neutral-text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                  Avaliação física gratuita
                </li>
                <li className="flex items-start text-sm text-neutral-text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                  Acesso a todas as unidades da rede
                </li>
                <li className="flex items-start text-sm text-neutral-text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                  Sem anuidade, nem taxa de cancelamento
                </li>
                <li className="flex items-start text-sm text-neutral-text-secondary">
                  <Check className="h-4 w-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                  Panobianco APP
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
              Aceitamos Gympass e TotalPass
            </h2>
            <p className="text-body text-neutral-text-secondary max-w-2xl mx-auto">
              Facilitamos ainda mais o seu acesso aos nossos serviços através de parcerias com convênios corporativos.
            </p>
          </div>

          <div className="card text-center max-w-2xl mx-auto">
            <h3 className="text-heading text-neutral-text-primary mb-4">
              Usuário Gympass ou TotalPass?
            </h3>
            <p className="text-body text-neutral-text-secondary mb-6">
              O Gympass é aceito a partir do plano Basic e o TotalPass, a partir do TP1+. Entre em contato conosco para verificar as condições e começar a treinar hoje mesmo!
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container-main">
          <div className="card text-center">
            <h2 className="text-display text-neutral-text-primary mb-4">
              Pronto para começar?
            </h2>
            <p className="text-body text-neutral-text-secondary mb-6 max-w-2xl mx-auto">
              Tem dúvidas sobre qual plano é ideal para você? Nossa equipe está pronta para te ajudar!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contato" className="btn-primary">
                Fale Conosco Agora!
              </Link>
              <Link href="https://agendamento.panobiancosatelite.com.br/" className="btn-secondary">
                Aula Experimental Gratuita
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}