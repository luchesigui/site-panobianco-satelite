import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Clock, Users, Target, Heart, Brain, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Jiu Jítsu | Aulas Coletivas | Academia Panobianco Jardim Satélite',
  description: 'Domine a arte suave do Jiu Jítsu. Desenvolva não apenas o corpo, mas também a mente com esta arte marcial estratégica.',
}

export default function JiuJitsuPage() {
  return (
    <div className="bg-neutral-background">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-indigo-600 to-indigo-800">
        <div className="container-main">
          <div className="text-center text-white">
            <div className="flex justify-center mb-6">
              <div className="flex items-center justify-center w-20 h-20 bg-white/20 rounded-full">
                <Shield className="h-10 w-10" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Jiu Jítsu
            </h1>
            <p className="text-lg mb-2 text-indigo-200">A Arte Suave</p>
            <p className="text-xl max-w-3xl mx-auto">
              Domine a arte suave do Jiu Jítsu e desenvolva não apenas o corpo, mas também a mente.
            </p>
          </div>
        </div>
      </section>

      {/* What is Jiu Jitsu */}
      <section className="py-16">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-display text-neutral-text-primary mb-6">
                O Que é Jiu Jítsu?
              </h2>
              <p className="text-body text-neutral-text-secondary mb-6">
                Jiu Jítsu Brasileiro é uma arte marcial, esporte de combate e sistema de autodefesa que se concentra na luta de chão e técnicas de submissão. Desenvolvido a partir do judô e do jiu-jítsu japonês, o BJJ (Brazilian Jiu Jitsu) promove o conceito de que uma pessoa menor e mais fraca pode se defender com sucesso contra um agressor maior e mais forte usando alavancagem e técnicas adequadas.
              </p>
              <p className="text-body text-neutral-text-secondary">
                É uma modalidade que exige estratégia, paciência e muita técnica. O Jiu Jítsu é conhecido como "a arte suave" porque utiliza a força do oponente contra ele mesmo, priorizando a técnica sobre a força bruta.
              </p>
            </div>
            <div className="card">
              <h3 className="text-heading text-neutral-text-primary mb-4">
                Princípios Fundamentais
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-body text-neutral-text-secondary">Alavancagem sobre força</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-body text-neutral-text-secondary">Técnica sobre velocidade</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-body text-neutral-text-secondary">Estratégia sobre agressividade</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-body text-neutral-text-secondary">Paciência sobre pressa</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Class Characteristics */}
      <section className="py-16">
        <div className="container-main">
          <div className="max-w-4xl mx-auto">
            <div className="card">
              <h3 className="text-heading text-neutral-text-primary mb-4">
                Características da Aula
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-indigo-500" />
                  <span className="text-body text-neutral-text-secondary">Duração: 50 minutos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-indigo-500" />
                  <span className="text-body text-neutral-text-secondary">Para todos os níveis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-indigo-500" />
                  <span className="text-body text-neutral-text-secondary">Foco: Arte marcial e autodefesa</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Brain className="h-5 w-5 text-indigo-500" />
                  <span className="text-body text-neutral-text-secondary">Estratégia e técnica</span>
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
              Benefícios do Jiu Jítsu
            </h2>
            <p className="text-body text-neutral-text-secondary">
              Descubra como esta arte marcial pode transformar sua vida
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-500 rounded-full">
                  <Shield className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Autodefesa Eficaz
              </h3>
              <p className="text-body text-neutral-text-secondary">
                Aprenda técnicas de defesa pessoal que podem ser aplicadas em diversas situações, independentemente do tamanho ou força do oponente.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-500 rounded-full">
                  <Target className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Condicionamento Físico
              </h3>
              <p className="text-body text-neutral-text-secondary">
                O Jiu Jítsu trabalha o corpo de forma integral, melhorando a força, a resistência cardiovascular, a flexibilidade e a coordenação motora.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-500 rounded-full">
                  <Brain className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Desenvolvimento Mental
              </h3>
              <p className="text-body text-neutral-text-secondary">
                A prática exige raciocínio estratégico, disciplina, paciência, foco e resiliência, contribuindo para o desenvolvimento mental e emocional.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-500 rounded-full">
                  <Heart className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Alívio do Estresse
              </h3>
              <p className="text-body text-neutral-text-secondary">
                A intensidade do treino e a concentração necessária para as técnicas são excelentes para liberar tensões e aliviar o estresse.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-500 rounded-full">
                  <Zap className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Aumento da Autoconfiança
              </h3>
              <p className="text-body text-neutral-text-secondary">
                O domínio das técnicas e a superação de desafios na luta aumentam significativamente a autoconfiança e a autoestima.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-500 rounded-full">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Socialização
              </h3>
              <p className="text-body text-neutral-text-secondary">
                O ambiente de treino é propício para fazer novas amizades e construir uma comunidade forte e unida.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-16">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-heading text-neutral-text-primary mb-6">
                Jornada de Aprendizado
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-3"></div>
                  <p className="text-body text-neutral-text-secondary">
                    <strong>Fundamentos:</strong> Posições básicas, quedas e movimentos essenciais
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-3"></div>
                  <p className="text-body text-neutral-text-secondary">
                    <strong>Posições:</strong> Guarda, montada, lado, costas e suas variações
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-3"></div>
                  <p className="text-body text-neutral-text-secondary">
                    <strong>Transições:</strong> Movimentos entre posições e criação de oportunidades
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-3"></div>
                  <p className="text-body text-neutral-text-secondary">
                    <strong>Finalizações:</strong> Estrangulamentos, chaves de braço e perna
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-3"></div>
                  <p className="text-body text-neutral-text-secondary">
                    <strong>Estratégia:</strong> Desenvolvimento do jogo pessoal e timing
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-heading text-neutral-text-primary mb-4">
                Nossas Aulas de Jiu Jítsu
              </h3>
              <p className="text-body text-neutral-text-secondary mb-4">
                Na Academia Panobianco Jardim Satélite, nossas aulas de Jiu Jítsu são conduzidas por mestres e instrutores experientes e renomados, que garantem um ambiente seguro, respeitoso e desafiador para todos os níveis, desde iniciantes que nunca pisaram em um tatame até atletas experientes.
              </p>
              <p className="text-body text-neutral-text-secondary mb-6">
                Você aprenderá os fundamentos, as posições, as transições e as finalizações, desenvolvendo suas habilidades de forma progressiva em um ambiente que valoriza a tradição e os valores da arte marcial.
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

      {/* Belt System */}
      <section className="py-16 bg-neutral-surface">
        <div className="container-main">
          <div className="text-center">
            <h2 className="text-display text-neutral-text-primary mb-6">
              Sistema de Graduação
            </h2>
            <p className="text-body text-neutral-text-secondary mb-12 max-w-3xl mx-auto">
              O Jiu Jítsu possui um sistema de graduação que reconhece o progresso técnico e o tempo de dedicação. Cada faixa representa não apenas habilidade técnica, mas também valores como respeito, disciplina e perseverança.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { name: 'Branca', color: 'bg-gray-300 text-gray-800' },
                { name: 'Azul', color: 'bg-blue-500 text-white' },
                { name: 'Roxa', color: 'bg-purple-500 text-white' },
                { name: 'Marrom', color: 'bg-yellow-800 text-white' },
                { name: 'Preta', color: 'bg-gray-900 text-white' }
              ].map((belt) => (
                <div key={belt.name} className="card text-center">
                  <div className={`h-8 w-full ${belt.color} rounded-lg mb-3 flex items-center justify-center font-semibold`}>
                    {belt.name}
                  </div>
                  <p className="text-subtext text-neutral-text-secondary">
                    Faixa {belt.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16">
        <div className="container-main">
          <div className="text-center">
            <h2 className="text-display text-neutral-text-primary mb-6">
              Mais que uma Arte Marcial
            </h2>
            <p className="text-body text-neutral-text-secondary mb-12 max-w-3xl mx-auto">
              O Jiu Jítsu é uma filosofia de vida que ensina humildade, respeito e perseverança. No tatame, você aprende que sempre há algo novo para descobrir e que a jornada de aprendizado nunca termina.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center justify-center w-16 h-16 bg-indigo-500 rounded-full">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-heading text-neutral-text-primary mb-3">Humildade</h3>
                <p className="text-body text-neutral-text-secondary">
                  O tatame ensina que sempre há alguém melhor e sempre há algo novo para aprender
                </p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center justify-center w-16 h-16 bg-indigo-500 rounded-full">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-heading text-neutral-text-primary mb-3">Respeito</h3>
                <p className="text-body text-neutral-text-secondary">
                  Respeito pelos mestres, parceiros de treino e pela arte marcial
                </p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center justify-center w-16 h-16 bg-indigo-500 rounded-full">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-heading text-neutral-text-primary mb-3">Perseverança</h3>
                <p className="text-body text-neutral-text-secondary">
                  A evolução no Jiu Jítsu exige dedicação constante e superação de desafios
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 to-indigo-800">
        <div className="container-main">
          <div className="text-center text-white">
            <h2 className="text-display mb-6">
              Venha para o Tatame!
            </h2>
            <p className="text-body mb-8 max-w-2xl mx-auto">
              Se você busca uma arte marcial que vai além do físico, que desafia sua mente e te ensina a superar limites, o Jiu Jítsu da Academia Panobianco Jardim Satélite é a sua escolha. Venha aprender a arte suave, fortalecer seu corpo e sua mente, e fazer parte de uma comunidade que valoriza a disciplina, o respeito e a evolução constante.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://agendamento.panobiancosatelite.com.br/" className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors" target="_blank" rel="noopener noreferrer">
                Agendar Aula Experimental
              </Link>
              <Link href="/aulas-coletivas" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors">
                Ver Outras Aulas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}