import type { Metadata } from 'next'
import Link from 'next/link'
import { User, Target, Zap, Shield, CheckCircle, Users, Clock, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Treino Personalizado | Academia Panobianco Jardim Satélite - Personal Trainer',
  description: 'Treino personalizado com acompanhamento individualizado. Personal trainer qualificado para resultados rápidos e eficazes na Academia Panobianco.',
  keywords: 'treino personalizado, personal trainer, acompanhamento individual, resultados rápidos, academia jardim satélite, são josé dos campos',
  robots: 'index, follow',
  openGraph: {
    title: 'Treino Personalizado | Academia Panobianco Jardim Satélite',
    description: 'Acompanhamento individualizado com personal trainer qualificado. Resultados sob medida para você.',
    type: 'website',
    locale: 'pt_BR',
  },
  alternates: {
    canonical: '/servicos/treino-personalizado',
  },
}

export default function TreinoPersonalizado() {
  return (
    <div className="bg-neutral-background">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container-main">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-neutral-text-primary mb-6">
              <span className="text-primary-500">Treino Personalizado</span><br />
              Resultados Sob Medida para Você
            </h1>
            <p className="text-xl text-neutral-text-secondary mb-8 max-w-3xl mx-auto">
              Se você busca um acompanhamento ainda mais individualizado e focado em resultados rápidos e eficazes, nosso serviço de treino personalizado é a solução ideal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://agendamento.panobiancosatelite.com.br/" className="btn-primary" target="_blank" rel="noopener noreferrer">
                Agende sua Consultoria
              </Link>
              <Link href="/contato" className="btn-secondary">
                Saiba Mais
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Personal Training */}
      <section className="py-16">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-display text-neutral-text-primary mb-4">
              Por Que Escolher o Treino Personalizado?
            </h2>
            <p className="text-body text-neutral-text-secondary max-w-2xl mx-auto">
              O treino personalizado vai muito além de um simples acompanhamento na academia. Ele oferece uma série de vantagens que podem acelerar seus resultados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="card hover:border-primary-500 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Foco nos Seus Objetivos
              </h3>
              <p className="text-body text-neutral-text-secondary">
                Seja emagrecimento, ganho de massa muscular, melhora da performance esportiva, reabilitação ou condicionamento geral, seu treino será 100% focado no que você realmente busca.
              </p>
            </div>

            <div className="card hover:border-primary-500 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Segurança e Correção
              </h3>
              <p className="text-body text-neutral-text-secondary">
                Um personal trainer experiente garante a execução correta de cada exercício, minimizando o risco de lesões e maximizando a eficácia do movimento.
              </p>
            </div>

            <div className="card hover:border-primary-500 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Motivação e Consistência
              </h3>
              <p className="text-body text-neutral-text-secondary">
                A presença de um profissional que te incentiva, te desafia e te mantém responsável é um poderoso fator motivacional para superar a preguiça e manter a disciplina.
              </p>
            </div>

            <div className="card hover:border-primary-500 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Variedade e Dinamismo
              </h3>
              <p className="text-body text-neutral-text-secondary">
                Seu personal trainer irá constantemente inovar seu treino, introduzindo novos exercícios, técnicas e equipamentos, evitando a monotonia.
              </p>
            </div>

            <div className="card hover:border-primary-500 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Otimização do Tempo
              </h3>
              <p className="text-body text-neutral-text-secondary">
                Com um plano de treino eficiente e focado, você aproveita ao máximo cada minuto na academia, alcançando mais resultados em menos tempo.
              </p>
            </div>

            <div className="card hover:border-primary-500 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Adaptação Contínua
              </h3>
              <p className="text-body text-neutral-text-secondary">
                Seu programa de treino será ajustado conforme sua evolução, suas necessidades e até mesmo seu humor no dia, garantindo que você esteja sempre no caminho certo.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Nossa Equipe */}
      <section className="py-16 bg-neutral-surface">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-display text-neutral-text-primary mb-4">
              Nossos Personal Trainers
            </h2>
            <p className="text-body text-neutral-text-secondary max-w-2xl mx-auto">
              Nossa equipe de personal trainers é composta por profissionais altamente qualificados, certificados e com vasta experiência em diversas áreas do condicionamento físico.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-heading text-neutral-text-primary mb-4">
                Profissionais Dedicados
              </h3>
              <p className="text-body text-neutral-text-secondary mb-6">
                Eles são apaixonados por ajudar pessoas a transformarem suas vidas e estão comprometidos em oferecer o melhor suporte e orientação. Ao escolher um de nossos personal trainers, você terá um parceiro dedicado à sua saúde e ao seu bem-estar.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary-500 mt-0.5" />
                  <span className="text-body text-neutral-text-secondary">Certificações reconhecidas nacionalmente</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary-500 mt-0.5" />
                  <span className="text-body text-neutral-text-secondary">Experiência em diversas modalidades</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary-500 mt-0.5" />
                  <span className="text-body text-neutral-text-secondary">Especialização em diferentes objetivos</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary-500 mt-0.5" />
                  <span className="text-body text-neutral-text-secondary">Atualização constante em novas técnicas</span>
                </li>
              </ul>
            </div>
            <div className="bg-neutral-background rounded-lg p-8">
              <h4 className="text-heading text-neutral-text-primary mb-4">
                Áreas de Especialização
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-body text-neutral-text-secondary">Emagrecimento e queima de gordura</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-body text-neutral-text-secondary">Ganho de massa muscular</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-body text-neutral-text-secondary">Performance esportiva</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-body text-neutral-text-secondary">Reabilitação e fisioterapia</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-body text-neutral-text-secondary">Condicionamento físico geral</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-body text-neutral-text-secondary">Treinamento funcional</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-16">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-display text-neutral-text-primary mb-4">
              Como Funciona?
            </h2>
            <p className="text-body text-neutral-text-secondary max-w-2xl mx-auto">
              Nosso processo é simples e eficiente, projetado para garantir que você alcance seus objetivos da forma mais segura e eficaz possível.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-500 rounded-full mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Avaliação Inicial
              </h3>
              <p className="text-body text-neutral-text-secondary">
                Seu personal trainer realizará uma avaliação completa para entender seu histórico de saúde, nível de condicionamento físico, objetivos e preferências.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-500 rounded-full mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Planejamento Personalizado
              </h3>
              <p className="text-body text-neutral-text-secondary">
                Com base na avaliação, será desenvolvido um programa de treino exclusivo, detalhando os exercícios, séries, repetições e a frequência ideal.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-500 rounded-full mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Sessões de Treino
              </h3>
              <p className="text-body text-neutral-text-secondary">
                Durante as sessões, seu personal trainer irá te guiar em cada exercício, corrigindo a postura, motivando e garantindo que você execute o treino de forma segura e eficaz.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-500 rounded-full mx-auto mb-4">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Acompanhamento e Ajustes
              </h3>
              <p className="text-body text-neutral-text-secondary">
                Seu progresso será monitorado de perto, e o plano de treino será ajustado regularmente para garantir que você continue a evoluir e a alcançar novos patamares.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-neutral-surface">
        <div className="container-main">
          <div className="text-center">
            <h2 className="text-display text-neutral-text-primary mb-6">
              Invista em Você e Seus Resultados!
            </h2>
            <p className="text-body text-neutral-text-secondary mb-8 max-w-2xl mx-auto">
              O treino personalizado na Academia Panobianco Jardim Satélite é um investimento na sua saúde, no seu bem-estar e na sua qualidade de vida. Se você está pronto para acelerar seus resultados, treinar com segurança e ter um acompanhamento de excelência, entre em contato conosco.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://agendamento.panobiancosatelite.com.br/" className="btn-primary" target="_blank" rel="noopener noreferrer">
                Agende Sua Consultoria Personalizada
              </Link>
              <Link href="/planos" className="btn-secondary">
                Conheça Nossos Planos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}