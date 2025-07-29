import type { Metadata } from 'next'
import Link from 'next/link'
import { Zap, Clock, Users, Target, Heart, Activity, Flame } from 'lucide-react'

export const metadata: Metadata = {
  title: 'WolfFit (Ginástica Carioca) | Aulas Coletivas | Academia Panobianco Jardim Satélite',
  description: 'Experimente a intensidade e a ginga da ginástica carioca com o WolfFit! Exercícios funcionais de alta intensidade com a energia do Rio de Janeiro.',
}

export default function WolfFitPage() {
  return (
    <div className="bg-neutral-background">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-orange-600 to-orange-800">
        <div className="container-main">
          <div className="text-center text-white">
            <div className="flex justify-center mb-6">
              <div className="flex items-center justify-center w-20 h-20 bg-white/20 rounded-full">
                <Zap className="h-10 w-10" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              WolfFit
            </h1>
            <p className="text-lg mb-2 text-orange-200">Ginástica Carioca</p>
            <p className="text-xl max-w-3xl mx-auto">
              Experimente a intensidade e a ginga da ginástica carioca! Exercícios funcionais de alta intensidade com movimentos inspirados na cultura do Rio de Janeiro.
            </p>
          </div>
        </div>
      </section>

      {/* What is WolfFit */}
      <section className="py-16">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-display text-neutral-text-primary mb-6">
                O Que é WolfFit?
              </h2>
              <p className="text-body text-neutral-text-secondary mb-6">
                WolfFit é uma modalidade de ginástica funcional que incorpora elementos da cultura carioca, como movimentos de dança, capoeira e exercícios ao ar livre, em um treino dinâmico e desafiador. É um programa de alta intensidade que visa melhorar a força, resistência, agilidade, coordenação e flexibilidade, utilizando o peso do próprio corpo e, por vezes, acessórios simples.
              </p>
              <p className="text-body text-neutral-text-secondary">
                Cada aula é uma experiência única, que te conecta com a energia vibrante do Rio de Janeiro. Prepare-se para suar, se divertir e sentir a energia contagiante dessa modalidade!
              </p>
            </div>
            <div className="card">
              <h3 className="text-heading text-neutral-text-primary mb-4">
                Características da Aula
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-orange-500" />
                  <span className="text-body text-neutral-text-secondary">Duração: 50 minutos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Flame className="h-5 w-5 text-orange-500" />
                  <span className="text-body text-neutral-text-secondary">Intensidade: Alta</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-orange-500" />
                  <span className="text-body text-neutral-text-secondary">Adaptável a todos os níveis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="h-5 w-5 text-orange-500" />
                  <span className="text-body text-neutral-text-secondary">Foco: Funcional e cardio</span>
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
              Benefícios do WolfFit
            </h2>
            <p className="text-body text-neutral-text-secondary">
              Descubra como esta modalidade pode transformar seu condicionamento físico
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-500 rounded-full">
                  <Activity className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Condicionamento Físico Total
              </h3>
              <p className="text-body text-neutral-text-secondary">
                O WolfFit trabalha o corpo de forma integrada, melhorando a capacidade cardiovascular, a força muscular e a resistência.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-500 rounded-full">
                  <Flame className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Queima Calórica Elevada
              </h3>
              <p className="text-body text-neutral-text-secondary">
                A alta intensidade dos exercícios promove uma queima calórica significativa, contribuindo para o emagrecimento e a definição muscular.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-500 rounded-full">
                  <Zap className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Agilidade e Coordenação
              </h3>
              <p className="text-body text-neutral-text-secondary">
                Os movimentos dinâmicos e variados aprimoram a agilidade, a coordenação motora e o equilíbrio.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-500 rounded-full">
                  <Target className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Fortalecimento do Core
              </h3>
              <p className="text-body text-neutral-text-secondary">
                Muitos exercícios focam no fortalecimento do core, essencial para a postura, prevenção de lesões e desempenho em outras atividades físicas.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-500 rounded-full">
                  <Heart className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Redução do Estresse
              </h3>
              <p className="text-body text-neutral-text-secondary">
                A intensidade do treino e a música ajudam a liberar endorfinas, promovendo uma sensação de bem-estar e aliviando o estresse.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-500 rounded-full">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Diversão e Motivação
              </h3>
              <p className="text-body text-neutral-text-secondary">
                O ambiente de grupo e a energia do instrutor tornam a aula um momento de lazer e uma oportunidade de fazer novas amizades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Classes */}
      <section className="py-16">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="card">
              <h3 className="text-heading text-neutral-text-primary mb-4">
                Nossas Aulas de WolfFit
              </h3>
              <p className="text-body text-neutral-text-secondary mb-4">
                Na Academia Panobianco Jardim Satélite, nossas aulas de WolfFit são conduzidas por instrutores certificados e apaixonados, que trazem toda a energia e o carisma necessários para fazer você se soltar e aproveitar cada minuto.
              </p>
              <p className="text-body text-neutral-text-secondary mb-6">
                A trilha sonora é cuidadosamente selecionada para te manter motivado, e os exercícios são pensados para serem desafiadores e eficazes, sempre respeitando os limites individuais.
              </p>
              <div className="bg-neutral-background rounded-lg p-4">
                <p className="text-subtext text-neutral-text-secondary text-center">
                  <strong>Horários:</strong> Consulte nossa grade de horários na recepção
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-heading text-neutral-text-primary mb-6">
                Elementos da Cultura Carioca
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-3"></div>
                  <p className="text-body text-neutral-text-secondary">
                    <strong>Movimentos de Dança:</strong> Incorpora ritmos e gingados típicos do Rio
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-3"></div>
                  <p className="text-body text-neutral-text-secondary">
                    <strong>Capoeira:</strong> Elementos da arte marcial brasileira
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-3"></div>
                  <p className="text-body text-neutral-text-secondary">
                    <strong>Exercícios Funcionais:</strong> Movimentos naturais e práticos
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-3"></div>
                  <p className="text-body text-neutral-text-secondary">
                    <strong>Energia Carioca:</strong> Vibração e alegria do Rio de Janeiro
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Adaptability */}
      <section className="py-16 bg-neutral-surface">
        <div className="container-main">
          <div className="text-center">
            <h2 className="text-display text-neutral-text-primary mb-6">
              Adaptável a Todos os Níveis
            </h2>
            <p className="text-body text-neutral-text-secondary mb-12 max-w-3xl mx-auto">
              Embora intenso, o WolfFit pode ser adaptado a diferentes níveis de condicionamento físico, tornando-o acessível a todos. Nossos instrutores oferecem modificações para garantir que cada pessoa possa participar de forma segura e eficaz.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card text-center">
                <h3 className="text-heading text-neutral-text-primary mb-3">Iniciantes</h3>
                <p className="text-body text-neutral-text-secondary">
                  Movimentos adaptados e ritmo gradual para quem está começando
                </p>
              </div>
              <div className="card text-center">
                <h3 className="text-heading text-neutral-text-primary mb-3">Intermediários</h3>
                <p className="text-body text-neutral-text-secondary">
                  Intensidade moderada com desafios progressivos
                </p>
              </div>
              <div className="card text-center">
                <h3 className="text-heading text-neutral-text-primary mb-3">Avançados</h3>
                <p className="text-body text-neutral-text-secondary">
                  Máxima intensidade e movimentos complexos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-orange-600 to-orange-800">
        <div className="container-main">
          <div className="text-center text-white">
            <h2 className="text-display mb-6">
              Venha Sentir a Energia do Rio!
            </h2>
            <p className="text-body mb-8 max-w-2xl mx-auto">
              Se você está procurando uma forma divertida e eficaz de se exercitar, o WolfFit da Academia Panobianco Jardim Satélite é a sua melhor opção. Venha experimentar a alegria de treinar enquanto cuida da sua saúde e bem-estar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://agendamento.panobiancosatelite.com.br/" className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors" target="_blank" rel="noopener noreferrer">
                Agendar Aula Experimental
              </Link>
              <Link href="/aulas-coletivas" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors">
                Ver Outras Aulas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}