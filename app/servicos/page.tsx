import Link from 'next/link'
import { Dumbbell, User, FileCheck, Users } from 'lucide-react'

export default function Servicos() {
  return (
    <div className="bg-neutral-background">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container-main">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-neutral-text-primary mb-6">
              Nossos <span className="text-primary-500">Serviços</span>
            </h1>
            <p className="text-xl text-neutral-text-secondary mb-8 max-w-3xl mx-auto">
              Oferecemos uma gama completa de serviços e modalidades para atender a todas as suas necessidades de saúde e bem-estar.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-display text-neutral-text-primary mb-4">
              Nossos Principais Serviços
            </h2>
            <p className="text-body text-neutral-text-secondary max-w-2xl mx-auto">
              Nosso objetivo é proporcionar uma experiência de treino diversificada e eficaz, com o suporte de profissionais qualificados e uma estrutura de ponta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Musculação */}
            <div className="card hover:border-primary-500 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Musculação
              </h3>
              <p className="text-body text-neutral-text-secondary mb-4">
                A musculação é a base para o desenvolvimento de força, resistência e definição muscular. Em nossa academia, você encontrará uma área de musculação ampla e equipada com aparelhos modernos e seguros, que atendem a todos os grupos musculares.
              </p>
              <p className="text-body text-neutral-text-secondary mb-6">
                Nossos professores estão sempre à disposição para orientar na execução correta dos exercícios e montar um plano de treino personalizado, focado em seus objetivos individuais. Seja para ganho de massa, emagrecimento ou condicionamento físico geral, a musculação é essencial para um corpo forte e saudável.
              </p>
              <Link href="/servicos/musculacao" className="btn-primary">
                Saiba mais sobre Musculação
              </Link>
            </div>

            {/* Treino Personalizado */}
            <div className="card hover:border-primary-500 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4">
                <User className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Treino Personalizado
              </h3>
              <p className="text-body text-neutral-text-secondary mb-4">
                Para quem busca resultados mais rápidos e um acompanhamento exclusivo, o treino personalizado é a escolha ideal. Nossos personal trainers são especialistas em diversas áreas do fitness e desenvolverão um programa de treino sob medida para você.
              </p>
              <p className="text-body text-neutral-text-secondary mb-6">
                Com atenção individualizada, você terá a motivação e a orientação necessárias para superar desafios e otimizar seus resultados. Invista em você e acelere sua jornada fitness com o treino personalizado.
              </p>
              <Link href="/servicos/treino-personalizado" className="btn-primary">
                Saiba mais sobre Treino Personalizado
              </Link>
            </div>

            {/* Aulas Coletivas */}
            <div className="card hover:border-primary-500 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Aulas Coletivas
              </h3>
              <p className="text-body text-neutral-text-secondary mb-4">
                As aulas coletivas são uma excelente opção para quem busca se exercitar de forma dinâmica, divertida e em grupo. Oferecemos uma variedade de modalidades que promovem o condicionamento físico, a coordenação motora e o bem-estar mental.
              </p>
              <p className="text-body text-neutral-text-secondary mb-6">
                Nossos instrutores são energéticos e criam um ambiente motivador, onde você pode interagir com outros alunos e desfrutar de cada momento do treino. De alta intensidade a atividades mais relaxantes, temos a aula coletiva perfeita para você.
              </p>
              <Link href="/aulas-coletivas" className="btn-primary">
                Explore nossas Aulas Coletivas
              </Link>
            </div>

            {/* Avaliação Física */}
            <div className="card hover:border-primary-500 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4">
                <FileCheck className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Avaliação Física
              </h3>
              <p className="text-body text-neutral-text-secondary mb-4">
                Antes de iniciar qualquer programa de treino, a avaliação física é fundamental para identificar seu nível de condicionamento atual, suas necessidades e seus objetivos. Nossos profissionais realizam uma análise completa.
              </p>
              <p className="text-body text-neutral-text-secondary mb-6">
                A avaliação inclui medições corporais, testes de força e flexibilidade, e uma conversa detalhada sobre seu histórico de saúde. Com base nesses dados, é possível criar um plano de treino seguro e eficaz, que maximize seus resultados e minimize o risco de lesões.
              </p>
              <Link href="/contato" className="btn-primary">
                Agende sua Avaliação
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-display text-neutral-text-primary mb-4">
              Planos e Adesão
            </h2>
            <p className="text-body text-neutral-text-secondary max-w-2xl mx-auto">
              Oferecemos diversas opções de planos de adesão, flexíveis e adaptados às suas necessidades.
            </p>
          </div>

          <div className="card text-center max-w-2xl mx-auto">
            <h3 className="text-heading text-neutral-text-primary mb-4">
              Flexibilidade para o Seu Bolso
            </h3>
            <p className="text-body text-neutral-text-secondary mb-6">
              Seja mensal, trimestral ou anual, temos a modalidade ideal para você iniciar sua jornada fitness. Além disso, aceitamos Gympass e outros convênios, facilitando seu acesso à nossa estrutura e serviços de alta qualidade.
            </p>
            <Link href="/planos" className="btn-primary">
              Conheça Nossos Planos
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container-main">
          <div className="card text-center">
            <h2 className="text-display text-neutral-text-primary mb-4">
              Pronto para Começar?
            </h2>
            <p className="text-body text-neutral-text-secondary mb-6 max-w-2xl mx-auto">
              Na Academia Panobianco Jardim Satélite, estamos comprometidos em oferecer a você o melhor em fitness e bem-estar. Venha nos visitar e descubra a modalidade que mais te inspira!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/aula-experimental" className="btn-primary">
                Aula Experimental Gratuita
              </Link>
              <Link href="/contato" className="btn-secondary">
                Entre em Contato
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}