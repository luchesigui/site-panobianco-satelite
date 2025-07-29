import type { Metadata } from 'next'
import Link from 'next/link'
import { Target, Clock, Users, Flame, Heart, Shield, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'GAP (Glúteos, Abdômen e Pernas) | Aulas Coletivas | Academia Panobianco Jardim Satélite',
  description: 'Conquiste glúteos firmes, abdômen definido e pernas torneadas com a aula de GAP. Exercícios localizados para resultados visíveis.',
}

export default function GAPPage() {
  return (
    <div className="bg-neutral-background">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-pink-600 to-pink-800">
        <div className="container-main">
          <div className="text-center text-white">
            <div className="flex justify-center mb-6">
              <div className="flex items-center justify-center w-20 h-20 bg-white/20 rounded-full">
                <Target className="h-10 w-10" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              GAP
            </h1>
            <p className="text-lg mb-2 text-pink-200">Glúteos, Abdômen e Pernas</p>
            <p className="text-xl max-w-3xl mx-auto">
              Conquiste glúteos firmes, abdômen definido e pernas torneadas com exercícios localizados e eficazes.
            </p>
          </div>
        </div>
      </section>

      {/* What is GAP */}
      <section className="py-16">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div>
                <h2 className="text-display text-neutral-text-primary mb-6">
                  O Que é GAP?
                </h2>
                <p className="text-body text-neutral-text-secondary mb-6">
                  GAP é a sigla para Glúteos, Abdômen e Pernas, e é uma aula de ginástica localizada que se concentra no fortalecimento e tonificação desses três grupos musculares. A aula é composta por uma série de exercícios específicos, que podem utilizar o peso do próprio corpo, caneleiras, halteres leves ou elásticos, para trabalhar intensamente cada região.
                </p>
                <p className="text-body text-neutral-text-secondary">
                  É uma modalidade eficaz para quem busca melhorar a estética corporal, aumentar a força e a resistência muscular localizada. Com a prática regular, é possível observar uma melhora significativa na firmeza e no contorno das regiões trabalhadas.
                </p>
              </div>
              
              <div className="card">
                <h3 className="text-heading text-neutral-text-primary mb-4">
                  Regiões Trabalhadas
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-pink-500 rounded-full">
                      <span className="text-white font-bold text-sm">G</span>
                    </div>
                    <div>
                      <span className="text-body text-neutral-text-primary font-semibold">Glúteos</span>
                      <p className="text-subtext text-neutral-text-secondary">Glúteo máximo, médio e mínimo</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-pink-500 rounded-full">
                      <span className="text-white font-bold text-sm">A</span>
                    </div>
                    <div>
                      <span className="text-body text-neutral-text-primary font-semibold">Abdômen</span>
                      <p className="text-subtext text-neutral-text-secondary">Reto abdominal, oblíquos e transverso</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-pink-500 rounded-full">
                      <span className="text-white font-bold text-sm">P</span>
                    </div>
                    <div>
                      <span className="text-body text-neutral-text-primary font-semibold">Pernas</span>
                      <p className="text-subtext text-neutral-text-secondary">Quadríceps, isquiotibiais e panturrilhas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-heading text-neutral-text-primary mb-4">
                Características da Aula
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-pink-500" />
                  <span className="text-body text-neutral-text-secondary">Duração: 30 minutos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-pink-500" />
                  <span className="text-body text-neutral-text-secondary">Para todos os níveis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="h-5 w-5 text-pink-500" />
                  <span className="text-body text-neutral-text-secondary">Foco: Glúteos, abdômen e pernas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Flame className="h-5 w-5 text-pink-500" />
                  <span className="text-body text-neutral-text-secondary">Exercícios localizados</span>
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
              Benefícios do GAP
            </h2>
            <p className="text-body text-neutral-text-secondary">
              Descubra como esta modalidade pode esculpir seu corpo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-pink-500 rounded-full">
                  <Target className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Tonificação Muscular
              </h3>
              <p className="text-body text-neutral-text-secondary">
                Fortalece e define os músculos dos glúteos, abdômen e pernas, contribuindo para um corpo mais esculpido.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-pink-500 rounded-full">
                  <Flame className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Queima Calórica
              </h3>
              <p className="text-body text-neutral-text-secondary">
                Embora seja uma aula localizada, o GAP promove um bom gasto calórico, auxiliando no emagrecimento e na redução de gordura corporal.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-pink-500 rounded-full">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Melhora da Postura
              </h3>
              <p className="text-body text-neutral-text-secondary">
                O fortalecimento do abdômen e dos músculos do core contribui para uma melhor postura e alívio de dores nas costas.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-pink-500 rounded-full">
                  <Zap className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Aumento da Força
              </h3>
              <p className="text-body text-neutral-text-secondary">
                Melhora a capacidade de realizar atividades diárias e o desempenho em outras modalidades esportivas.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-pink-500 rounded-full">
                  <Shield className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Prevenção de Lesões
              </h3>
              <p className="text-body text-neutral-text-secondary">
                Músculos fortes e equilibrados protegem as articulações e reduzem o risco de lesões.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-pink-500 rounded-full">
                  <Heart className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Resultados Visíveis
              </h3>
              <p className="text-body text-neutral-text-secondary">
                Com a prática regular, é possível observar uma melhora significativa na firmeza e no contorno das regiões trabalhadas.
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
                Equipamentos Utilizados
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-3"></div>
                  <p className="text-body text-neutral-text-secondary">
                    <strong>Peso Corporal:</strong> Exercícios usando apenas o próprio peso
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-3"></div>
                  <p className="text-body text-neutral-text-secondary">
                    <strong>Caneleiras:</strong> Para intensificar os exercícios de pernas
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-3"></div>
                  <p className="text-body text-neutral-text-secondary">
                    <strong>Halteres Leves:</strong> Para trabalhar braços e core simultaneamente
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-3"></div>
                  <p className="text-body text-neutral-text-secondary">
                    <strong>Elásticos:</strong> Para exercícios de resistência e fortalecimento
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-3"></div>
                  <p className="text-body text-neutral-text-secondary">
                    <strong>Colchonetes:</strong> Para exercícios de solo e alongamentos
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-heading text-neutral-text-primary mb-4">
                Nossas Aulas de GAP
              </h3>
              <p className="text-body text-neutral-text-secondary mb-4">
                Na Academia Panobianco Jardim Satélite, nossas aulas de GAP são conduzidas por instrutores experientes e motivadores, que garantem a execução correta dos exercícios e a intensidade necessária para alcançar seus objetivos.
              </p>
              <p className="text-body text-neutral-text-secondary mb-6">
                A aula é dinâmica e desafiadora, com variações que atendem a diferentes níveis de condicionamento físico. Prepare-se para sentir a queima e ver a transformação!
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

      {/* Target Audience */}
      <section className="py-16 bg-neutral-surface">
        <div className="container-main">
          <div className="text-center">
            <h2 className="text-display text-neutral-text-primary mb-6">
              Para Quem é Indicado?
            </h2>
            <p className="text-body text-neutral-text-secondary mb-12 max-w-3xl mx-auto">
              O GAP é uma modalidade versátil que atende diferentes perfis e objetivos. Nossos instrutores adaptam os exercícios para garantir que todos possam participar e se beneficiar.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-pink-500 rounded-full">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-heading text-neutral-text-primary mb-3">Iniciantes</h3>
                <p className="text-body text-neutral-text-secondary">
                  Movimentos básicos e progressão gradual
                </p>
              </div>
              <div className="card text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-pink-500 rounded-full">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-heading text-neutral-text-primary mb-3">Mulheres</h3>
                <p className="text-body text-neutral-text-secondary">
                  Foco nas áreas mais desejadas pelo público feminino
                </p>
              </div>
              <div className="card text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-pink-500 rounded-full">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-heading text-neutral-text-primary mb-3">Atletas</h3>
                <p className="text-body text-neutral-text-secondary">
                  Fortalecimento complementar para melhor performance
                </p>
              </div>
              <div className="card text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-pink-500 rounded-full">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-heading text-neutral-text-primary mb-3">Pós-parto</h3>
                <p className="text-body text-neutral-text-secondary">
                  Fortalecimento seguro após liberação médica
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-pink-600 to-pink-800">
        <div className="container-main">
          <div className="text-center text-white">
            <h2 className="text-display mb-6">
              Venha Esculpir Seu Corpo!
            </h2>
            <p className="text-body mb-8 max-w-2xl mx-auto">
              Se você busca um treino focado e eficaz para glúteos, abdômen e pernas, a aula de GAP da Academia Panobianco Jardim Satélite é a sua melhor opção. Venha sentir a queima, ver a transformação e conquistar o corpo que você sempre desejou.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                              <Link href="https://agendamento.panobiancosatelite.com.br/" className="bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors" target="_blank" rel="noopener noreferrer">
                  Agendar Aula Experimental
                </Link>
              <Link href="/aulas-coletivas" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition-colors">
                Ver Outras Aulas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}