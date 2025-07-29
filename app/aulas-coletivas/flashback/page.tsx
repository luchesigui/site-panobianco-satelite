import type { Metadata } from 'next'
import Link from 'next/link'
import { Music, Clock, Users, Target, Heart, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Flashback | Aulas Coletivas | Academia Panobianco Jardim Satélite',
  description: 'Viaje no tempo e dance ao som dos maiores sucessos de décadas passadas! Queime calorias, melhore a coordenação e divirta-se muito na aula de Flashback.',
}

export default function FlashbackPage() {
  return (
    <div className="bg-primary">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-purple-600 to-purple-800">
        <div className="container-main">
          <div className="text-center text-white">
            <div className="flex justify-center mb-6">
              <div className="flex items-center justify-center w-20 h-20 bg-white/20 rounded-full">
                <Music className="h-10 w-10" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Flashback
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Viaje no tempo e dance ao som dos maiores sucessos de décadas passadas! Uma explosão de energia e nostalgia.
            </p>
          </div>
        </div>
      </section>

      {/* What is Flashback */}
      <section className="py-16">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-display text-primary mb-6">
                O Que é Flashback?
              </h2>
              <p className="text-body text-secondary mb-6">
                Flashback é uma aula de dança com tema retrô, que combina movimentos coreografados com hits que marcaram época, desde os anos 60 até os 90 e 2000. É uma aula dinâmica e empolgante, onde você segue coreografias simples e divertidas ao som de músicas vibrantes, como pop, disco, rock, e muito mais.
              </p>
              <p className="text-body text-secondary">
                Não é preciso ter experiência em dança ou ser um dançarino profissional; o importante é se mover e se divertir! Prepare-se para uma viagem nostálgica que fará você esquecer que está se exercitando.
              </p>
            </div>
            <div className="card">
              <h3 className="text-heading text-primary mb-4">
                Características da Aula
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-purple-500" />
                  <span className="text-body text-secondary">Duração: 30 minutos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-purple-500" />
                  <span className="text-body text-secondary">Para todos os níveis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="h-5 w-5 text-purple-500" />
                  <span className="text-body text-secondary">Foco: Cardio e diversão</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Music className="h-5 w-5 text-purple-500" />
                  <span className="text-body text-secondary">Sucessos dos anos 60-2000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-secondary">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-display text-primary mb-4">
              Benefícios do Flashback
            </h2>
            <p className="text-body text-secondary">
              Descubra como esta aula pode transformar seu treino em diversão
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-500 rounded-full">
                  <Zap className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-primary mb-3">
                Queima Calórica Elevada
              </h3>
              <p className="text-body text-secondary">
                Uma aula de Flashback pode queimar centenas de calorias, contribuindo significativamente para o emagrecimento e a manutenção do peso.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-500 rounded-full">
                  <Heart className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-primary mb-3">
                Melhora do Condicionamento
              </h3>
              <p className="text-body text-secondary">
                A variação de intensidade dos movimentos fortalece o coração e melhora a resistência cardiovascular.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-500 rounded-full">
                  <Target className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-primary mb-3">
                Coordenação Motora
              </h3>
              <p className="text-body text-secondary">
                As coreografias ajudam a aprimorar a coordenação, o equilíbrio e a agilidade de forma divertida.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-500 rounded-full">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-primary mb-3">
                Tonificação Muscular
              </h3>
              <p className="text-body text-secondary">
                Embora seja focada no cárdio, o Flashback trabalha diversos grupos musculares, contribuindo para a tonificação do corpo.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-500 rounded-full">
                  <Heart className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-primary mb-3">
                Alívio do Estresse
              </h3>
              <p className="text-body text-secondary">
                A dança e a música são excelentes para liberar tensões, melhorar o humor e reduzir o estresse.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-500 rounded-full">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-primary mb-3">
                Socialização
              </h3>
              <p className="text-body text-secondary">
                O ambiente de grupo e a energia contagiante tornam a aula um momento de lazer e uma oportunidade de fazer novas amizades.
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
              <h3 className="text-heading text-primary mb-4">
                Nossas Aulas de Flashback
              </h3>
              <p className="text-body text-secondary mb-4">
                Na Academia Panobianco Jardim Satélite, nossas aulas de Flashback são conduzidas por instrutores certificados e apaixonados, que trazem toda a energia e o carisma necessários para fazer você se soltar e aproveitar cada minuto.
              </p>
              <p className="text-body text-secondary mb-6">
                A trilha sonora é cuidadosamente selecionada para te manter motivado, e as coreografias são pensadas para serem fáceis de seguir, mas desafiadoras o suficiente para garantir um treino eficaz.
              </p>
              <div className="bg-primary rounded-lg p-4">
                <p className="text-subtext text-secondary text-center">
                  <strong>Horários:</strong> Consulte nossa grade de horários na recepção ou entre em contato conosco
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-heading text-primary mb-6">
                Acessível a Todos
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-3"></div>
                  <p className="text-body text-secondary">
                    <strong>Iniciantes:</strong> As coreografias são simples e fáceis de acompanhar
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-3"></div>
                  <p className="text-body text-secondary">
                    <strong>Todas as idades:</strong> Adaptável para diferentes faixas etárias
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-3"></div>
                  <p className="text-body text-secondary">
                    <strong>Baixo impacto:</strong> Opções de modificação para quem tem limitações
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-3"></div>
                  <p className="text-body text-secondary">
                    <strong>Diversão garantida:</strong> O importante é se mover e se divertir!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-purple-600 to-purple-800">
        <div className="container-main">
          <div className="text-center text-white">
            <h2 className="text-display mb-6">
              Venha Dançar Conosco!
            </h2>
            <p className="text-body mb-8 max-w-2xl mx-auto">
              Se você está procurando uma forma divertida e eficaz de se exercitar, o Flashback da Academia Panobianco Jardim Satélite é a sua melhor opção. Venha experimentar a alegria de dançar enquanto cuida da sua saúde e bem-estar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://agendamento.panobiancosatelite.com.br/" className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors" target="_blank" rel="noopener noreferrer">
                Agendar Aula Experimental
              </Link>
              <Link href="/aulas-coletivas" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
                Ver Outras Aulas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}