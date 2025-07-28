import type { Metadata } from 'next'
import Link from 'next/link'
import { Flower2, Clock, Users, Target, Heart, Shield, Brain } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pilates | Aulas Coletivas | Academia Panobianco Jardim Satélite',
  description: 'Fortaleça seu core, melhore sua postura e aumente sua flexibilidade com o Pilates. Modalidade de baixo impacto ideal para todas as idades.',
}

export default function PilatesPage() {
  return (
    <div className="bg-neutral-background">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="container-main">
          <div className="text-center text-white">
            <div className="flex justify-center mb-6">
              <div className="flex items-center justify-center w-20 h-20 bg-white/20 rounded-full">
                <Flower2 className="h-10 w-10" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Pilates
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Fortaleça seu core, melhore sua postura e aumente sua flexibilidade com esta modalidade de baixo impacto.
            </p>
          </div>
        </div>
      </section>

      {/* What is Pilates */}
      <section className="py-16">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-display text-neutral-text-primary mb-6">
                O Que é Pilates?
              </h2>
              <p className="text-body text-neutral-text-secondary mb-6">
                Pilates é um método de exercício físico e alongamento que utiliza o peso do próprio corpo e equipamentos específicos para fortalecer os músculos, melhorar a flexibilidade, a coordenação e o equilíbrio. Criado por Joseph Pilates, o método se baseia em seis princípios fundamentais: centralização, concentração, controle, fluidez, precisão e respiração.
              </p>
              <p className="text-body text-neutral-text-secondary">
                O Pilates é conhecido por ser uma atividade de baixo impacto, ideal para reabilitação, prevenção de lesões e para pessoas de todas as idades e níveis de condicionamento físico.
              </p>
            </div>
            <div className="card">
              <h3 className="text-heading text-neutral-text-primary mb-4">
                Princípios do Pilates
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-body text-neutral-text-secondary">Centralização</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-body text-neutral-text-secondary">Concentração</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-body text-neutral-text-secondary">Controle</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-body text-neutral-text-secondary">Fluidez</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-body text-neutral-text-secondary">Precisão</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-body text-neutral-text-secondary">Respiração</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-neutral-surface">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-display text-neutral-text-primary mb-4">
              Benefícios do Pilates
            </h2>
            <p className="text-body text-neutral-text-secondary">
              Descubra como o Pilates pode transformar seu corpo e sua mente
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full">
                  <Target className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Fortalecimento do Core
              </h3>
              <p className="text-body text-neutral-text-secondary">
                O Pilates foca no fortalecimento dos músculos abdominais e lombares, que são o centro de força do corpo, essenciais para a postura e a estabilidade.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Melhora da Postura
              </h3>
              <p className="text-body text-neutral-text-secondary">
                Ao fortalecer os músculos do core e alongar a coluna, o Pilates ajuda a corrigir desvios posturais e a aliviar dores nas costas.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full">
                  <Flower2 className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Aumento da Flexibilidade
              </h3>
              <p className="text-body text-neutral-text-secondary">
                Os exercícios de alongamento e mobilidade articular contribuem para o aumento da flexibilidade e da amplitude de movimento.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full">
                  <Brain className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Consciência Corporal
              </h3>
              <p className="text-body text-neutral-text-secondary">
                A prática exige concentração e controle dos movimentos, desenvolvendo uma maior percepção do corpo e de suas sensações.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full">
                  <Heart className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Alívio do Estresse
              </h3>
              <p className="text-body text-neutral-text-secondary">
                A respiração controlada e a concentração nos movimentos ajudam a acalmar a mente e a reduzir o estresse e a ansiedade.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full">
                  <Shield className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Prevenção de Lesões
              </h3>
              <p className="text-body text-neutral-text-secondary">
                O Pilates é amplamente utilizado na prevenção e recuperação de lesões, pois fortalece os músculos de forma equilibrada e sem impacto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Classes */}
      <section className="py-16">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-heading text-neutral-text-primary mb-6">
                Para Quem é Indicado?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-3"></div>
                  <p className="text-body text-neutral-text-secondary">
                    <strong>Pessoas com dores nas costas:</strong> Fortalece e alonga a musculatura da coluna
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-3"></div>
                  <p className="text-body text-neutral-text-secondary">
                    <strong>Reabilitação:</strong> Ideal para recuperação de lesões e cirurgias
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-3"></div>
                  <p className="text-body text-neutral-text-secondary">
                    <strong>Terceira idade:</strong> Exercícios seguros e de baixo impacto
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-3"></div>
                  <p className="text-body text-neutral-text-secondary">
                    <strong>Atletas:</strong> Melhora performance e previne lesões
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-3"></div>
                  <p className="text-body text-neutral-text-secondary">
                    <strong>Gestantes:</strong> Fortalece o core e prepara para o parto
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-heading text-neutral-text-primary mb-4">
                Nossas Aulas de Pilates
              </h3>
              <p className="text-body text-neutral-text-secondary mb-4">
                Na Academia Panobianco Jardim Satélite, nossas aulas de Pilates são conduzidas por instrutores qualificados e experientes, que garantem a execução correta dos exercícios e a adaptação para as necessidades individuais de cada aluno.
              </p>
              <p className="text-body text-neutral-text-secondary mb-6">
                Oferecemos aulas em grupo e, se desejar, também podemos organizar sessões personalizadas para um acompanhamento ainda mais individualizado.
              </p>
              <div className="bg-neutral-background rounded-lg p-4">
                <p className="text-subtext text-neutral-text-secondary text-center">
                  <strong>Horários:</strong> Consulte nossa grade de horários na recepção
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="container-main">
          <div className="text-center text-white">
            <h2 className="text-display mb-6">
              Venha Sentir a Diferença!
            </h2>
            <p className="text-body mb-8 max-w-2xl mx-auto">
              Se você busca uma prática que promove o bem-estar integral, fortalece o corpo e acalma a mente, o Pilates da Academia Panobianco Jardim Satélite é a sua melhor opção. Venha experimentar os benefícios dessa modalidade e descubra uma nova forma de se conectar consigo mesmo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://agendamento.panobiancosatelite.com.br/" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors" target="_blank" rel="noopener noreferrer">
                Agendar Aula Experimental
              </Link>
              <Link href="/aulas-coletivas" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Ver Outras Aulas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}