import type { Metadata } from 'next'
import Link from 'next/link'
import { Music, Clock, Users, Target, Heart, Zap, Smile } from 'lucide-react'

export const metadata: Metadata = {
  title: 'FitDance | Aulas Coletivas | Academia Panobianco Jardim Satélite',
  description: 'Dance, divirta-se e queime muitas calorias com o FitDance! Coreografias de diversos ritmos musicais em um treino aeróbico contagiante.',
}

export default function FitDancePage() {
  return (
    <div className="bg-primary">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-red-600 to-red-800">
        <div className="container-main">
          <div className="text-center text-white">
            <div className="flex justify-center mb-6">
              <div className="flex items-center justify-center w-20 h-20 bg-white/20 rounded-full">
                <Music className="h-10 w-10" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              FitDance
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Dance, divirta-se e queime muitas calorias com coreografias de diversos ritmos musicais!
            </p>
          </div>
        </div>
      </section>

      {/* What is FitDance */}
      <section className="py-16">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div>
                <h2 className="text-display text-primary mb-6">
                  O Que é FitDance?
                </h2>
                <p className="text-body text-secondary mb-6">
                  FitDance é um programa de dança que mistura movimentos coreografados de diferentes estilos musicais, como funk, pop, axé, sertanejo, hip hop e muito mais. O objetivo é promover o condicionamento físico de forma divertida e acessível, sem a necessidade de ter experiência prévia em dança.
                </p>
                <p className="text-body text-secondary">
                  As aulas são dinâmicas, com músicas atuais e coreografias que podem ser facilmente acompanhadas por todos, independentemente do nível de coordenação. O importante é se soltar e aproveitar a música!
                </p>
              </div>
              
              <div className="card">
                <h3 className="text-heading text-primary mb-4">
                  Estilos Musicais
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-body text-secondary">Funk</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-body text-secondary">Pop</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-body text-secondary">Axé</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-body text-secondary">Sertanejo</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-body text-secondary">Hip Hop</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-body text-secondary">E muito mais!</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-heading text-primary mb-4">
                Características da Aula
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-red-500" />
                  <span className="text-body text-secondary">Duração: 50 minutos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-red-500" />
                  <span className="text-body text-secondary">Para todos os níveis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Music className="h-5 w-5 text-red-500" />
                  <span className="text-body text-secondary">Foco: Cardio e diversão</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span className="text-body text-secondary">Alto gasto calórico</span>
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
              Benefícios do FitDance
            </h2>
            <p className="text-body text-secondary">
              Descubra como a dança pode transformar seu treino
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-red-500 rounded-full">
                  <Zap className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-primary mb-3">
                Queima Calórica Elevada
              </h3>
              <p className="text-body text-secondary">
                O FitDance é um treino aeróbico de alta intensidade que promove um gasto calórico significativo, auxiliando no emagrecimento e na manutenção do peso.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-red-500 rounded-full">
                  <Heart className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-primary mb-3">
                Condicionamento Cardiovascular
              </h3>
              <p className="text-body text-secondary">
                A prática regular fortalece o coração e os pulmões, aumentando a resistência e a capacidade aeróbica.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-red-500 rounded-full">
                  <Target className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-primary mb-3">
                Coordenação Motora
              </h3>
              <p className="text-body text-secondary">
                As coreografias ajudam a aprimorar a coordenação, o equilíbrio e a agilidade de forma natural e divertida.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-red-500 rounded-full">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-primary mb-3">
                Tonificação Muscular
              </h3>
              <p className="text-body text-secondary">
                Embora seja focado no cárdio, o FitDance trabalha diversos grupos musculares, contribuindo para a tonificação do corpo.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-red-500 rounded-full">
                  <Smile className="h-6 w-6 text-white" />
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
                <div className="flex items-center justify-center w-12 h-12 bg-red-500 rounded-full">
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
                Nossas Aulas de FitDance
              </h3>
              <p className="text-body text-secondary mb-4">
                Na Academia Panobianco Jardim Satélite, nossas aulas de FitDance são conduzidas por instrutores certificados e apaixonados, que trazem toda a energia e o carisma necessários para fazer você se soltar e aproveitar cada minuto.
              </p>
              <p className="text-body text-secondary mb-6">
                A trilha sonora é cuidadosamente selecionada para te manter motivado, e as coreografias são pensadas para serem fáceis de seguir, mas desafiadoras o suficiente para garantir um treino eficaz.
              </p>
              <div className="bg-primary rounded-lg p-4">
                <p className="text-subtext text-secondary text-center">
                  <strong>Horários:</strong> Consulte nossa grade de horários na recepção
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-heading text-primary mb-6">
                Para Todos os Níveis
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3"></div>
                  <p className="text-body text-secondary">
                    <strong>Sem experiência necessária:</strong> Coreografias adaptáveis para iniciantes
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3"></div>
                  <p className="text-body text-secondary">
                    <strong>Todas as idades:</strong> Modalidade inclusiva para diferentes faixas etárias
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3"></div>
                  <p className="text-body text-secondary">
                    <strong>Ritmo próprio:</strong> Cada um dança no seu ritmo e intensidade
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3"></div>
                  <p className="text-body text-secondary">
                    <strong>Diversão garantida:</strong> O foco é se divertir enquanto se exercita
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Music Styles */}
      <section className="py-16 bg-secondary">
        <div className="container-main">
          <div className="text-center">
            <h2 className="text-display text-primary mb-6">
              Variedade Musical
            </h2>
            <p className="text-body text-secondary mb-12 max-w-3xl mx-auto">
              No FitDance, a música é a protagonista! Trabalhamos com uma variedade incrível de ritmos para que você nunca se canse e sempre encontre algo que combine com seu estilo.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {['Funk', 'Pop', 'Axé', 'Sertanejo', 'Hip Hop', 'Reggaeton'].map((style) => (
                <div key={style} className="card text-center">
                  <div className="flex justify-center mb-3">
                    <div className="flex items-center justify-center w-12 h-12 bg-red-500 rounded-full">
                      <Music className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-heading text-primary">{style}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-red-600 to-red-800">
        <div className="container-main">
          <div className="text-center text-white">
            <h2 className="text-display mb-6">
              Venha Dançar Conosco!
            </h2>
            <p className="text-body mb-8 max-w-2xl mx-auto">
              Se você está procurando uma forma divertida e eficaz de se exercitar, o FitDance da Academia Panobianco Jardim Satélite é a sua melhor opção. Venha experimentar a alegria de dançar enquanto cuida da sua saúde e bem-estar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://agendamento.panobiancosatelite.com.br/" className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors" target="_blank" rel="noopener noreferrer">
                Agendar Aula Experimental
              </Link>
              <Link href="/aulas-coletivas" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors">
                Ver Outras Aulas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}