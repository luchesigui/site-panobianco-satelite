import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Clock, Users, Target, Heart, Zap, Brain } from 'lucide-react'
import SchedulingLink from '@/components/SchedulingLink'

export const metadata: Metadata = {
  title: 'Muay Thai | Aulas Coletivas | Academia Panobianco Jardim Satélite',
  description: 'Desenvolva força, agilidade, disciplina e autoconfiança com o Muay Thai. A arte marcial tailandesa para condicionamento físico e mental.',
}

export default function MuayThaiPage() {
  return (
    <div className="bg-primary">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-yellow-600 to-yellow-800">
        <div className="container-main">
          <div className="text-center text-white">
            <div className="flex justify-center mb-6">
              <div className="flex items-center justify-center w-20 h-20 bg-white/20 rounded-full">
                <Shield className="h-10 w-10" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Muay Thai
            </h1>
            <p className="text-lg mb-2 text-yellow-200">A Arte das Oito Armas</p>
            <p className="text-xl max-w-3xl mx-auto">
              Desenvolva força, agilidade, disciplina e autoconfiança com a arte marcial tailandesa.
            </p>
          </div>
        </div>
      </section>

      {/* What is Muay Thai */}
      <section className="py-16">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div>
                <h2 className="text-display text-primary mb-6">
                  O Que é Muay Thai?
                </h2>
                <p className="text-body text-secondary mb-6">
                  Muay Thai é uma arte marcial e esporte de combate originário da Tailândia. É uma disciplina que utiliza o corpo como um todo, empregando punhos, cotovelos, joelhos e canelas em seus golpes. Conhecida como a "Arte das Oito Armas", o Muay Thai é uma das artes marciais mais eficazes e completas do mundo.
                </p>
                <p className="text-body text-secondary">
                  Além do aspecto físico, o Muay Thai também enfatiza a disciplina, o respeito, a concentração e o autocontrole. É um treino intenso que melhora a resistência cardiovascular, a força muscular, a flexibilidade e a coordenação motora.
                </p>
              </div>
              
              <div className="card">
                <h3 className="text-heading text-primary mb-4">
                  As Oito Armas
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-body text-secondary">Punhos (2 armas)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-body text-secondary">Cotovelos (2 armas)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-body text-secondary">Joelhos (2 armas)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-body text-secondary">Canelas (2 armas)</span>
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
                  <Clock className="h-5 w-5 text-yellow-500" />
                  <span className="text-body text-secondary">Duração: 30 minutos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-yellow-500" />
                  <span className="text-body text-secondary">Para todos os níveis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-yellow-500" />
                  <span className="text-body text-secondary">Foco: Arte marcial e autodefesa</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <span className="text-body text-secondary">Alta intensidade</span>
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
              Benefícios do Muay Thai
            </h2>
            <p className="text-body text-secondary">
              Descubra como esta arte marcial pode transformar seu corpo e sua mente
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-yellow-500 rounded-full">
                  <Target className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-primary mb-3">
                Condicionamento Físico Total
              </h3>
              <p className="text-body text-secondary">
                O Muay Thai é um treino de corpo inteiro que melhora a capacidade cardiovascular, a força, a resistência e a flexibilidade.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-yellow-500 rounded-full">
                  <Zap className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-primary mb-3">
                Queima Calórica Elevada
              </h3>
              <p className="text-body text-secondary">
                A intensidade dos treinos promove um alto gasto calórico, auxiliando no emagrecimento e na definição muscular.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-yellow-500 rounded-full">
                  <Shield className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-primary mb-3">
                Autodefesa
              </h3>
              <p className="text-body text-secondary">
                Aprenda técnicas de autodefesa eficazes que aumentam a segurança e a confiança em situações de risco.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-yellow-500 rounded-full">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-primary mb-3">
                Força e Potência
              </h3>
              <p className="text-body text-secondary">
                Os golpes e movimentos fortalecem os músculos de todo o corpo, especialmente pernas, abdômen e braços.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-yellow-500 rounded-full">
                  <Brain className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-primary mb-3">
                Disciplina e Foco
              </h3>
              <p className="text-body text-secondary">
                A prática do Muay Thai exige e desenvolve disciplina, concentração e respeito, valores fundamentais da arte marcial.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-yellow-500 rounded-full">
                  <Heart className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-primary mb-3">
                Alívio do Estresse
              </h3>
              <p className="text-body text-secondary">
                A liberação de energia durante o treino é uma excelente forma de combater o estresse e a ansiedade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Training Structure */}
      <section className="py-16">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-heading text-primary mb-6">
                Estrutura do Treino
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-3"></div>
                  <p className="text-body text-secondary">
                    <strong>Aquecimento:</strong> Preparação física e mental para o treino
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-3"></div>
                  <p className="text-body text-secondary">
                    <strong>Técnicas Básicas:</strong> Aprendizado dos golpes fundamentais
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-3"></div>
                  <p className="text-body text-secondary">
                    <strong>Treino em Paos:</strong> Prática dos golpes com parceiro
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-3"></div>
                  <p className="text-body text-secondary">
                    <strong>Condicionamento:</strong> Fortalecimento específico para a modalidade
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-3"></div>
                  <p className="text-body text-secondary">
                    <strong>Alongamento:</strong> Relaxamento e flexibilidade
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-heading text-primary mb-4">
                Nossas Aulas de Muay Thai
              </h3>
              <p className="text-body text-secondary mb-4">
                Na Academia Panobianco Jardim Satélite, nossas aulas de Muay Thai são conduzidas por instrutores experientes e qualificados, que garantem um ambiente seguro e desafiador para todos os níveis, desde iniciantes até praticantes avançados.
              </p>
              <p className="text-body text-secondary mb-6">
                Você aprenderá as técnicas fundamentais, aprimorará sua forma e desenvolverá suas habilidades em um ambiente de respeito e camaradagem, seguindo os valores tradicionais desta arte marcial milenar.
              </p>
              <div className="bg-primary rounded-lg p-4">
                <p className="text-subtext text-secondary text-center">
                  <strong>Horários:</strong> Consulte nossa grade de horários na recepção
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 bg-secondary">
        <div className="container-main">
          <div className="text-center">
            <h2 className="text-display text-primary mb-6">
              Filosofia e Valores
            </h2>
            <p className="text-body text-secondary mb-12 max-w-3xl mx-auto">
              O Muay Thai vai além do combate físico. É uma arte que cultiva valores importantes como respeito, disciplina, perseverança e humildade. Em nossas aulas, esses princípios são transmitidos junto com as técnicas.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-yellow-500 rounded-full">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-heading text-primary mb-3">Respeito</h3>
                <p className="text-body text-secondary">
                  Pelos mestres, colegas e pela arte marcial
                </p>
              </div>
              <div className="card text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-yellow-500 rounded-full">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-heading text-primary mb-3">Disciplina</h3>
                <p className="text-body text-secondary">
                  Constância e dedicação no treinamento
                </p>
              </div>
              <div className="card text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-yellow-500 rounded-full">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-heading text-primary mb-3">Perseverança</h3>
                <p className="text-body text-secondary">
                  Superação de desafios e limites pessoais
                </p>
              </div>
              <div className="card text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-yellow-500 rounded-full">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-heading text-primary mb-3">Humildade</h3>
                <p className="text-body text-secondary">
                  Aprendizado contínuo e reconhecimento dos limites
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-yellow-600 to-yellow-800">
        <div className="container-main">
          <div className="text-center text-white">
            <h2 className="text-display mb-6">
              Venha Lutar Conosco!
            </h2>
            <p className="text-body mb-8 max-w-2xl mx-auto">
              Se você busca um treino que vai além do físico, que desafia seus limites e te ensina uma poderosa arte marcial, o Muay Thai da Academia Panobianco Jardim Satélite é a sua escolha. Venha descobrir o guerreiro em você, fortalecer seu corpo e sua mente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SchedulingLink className="bg-white text-yellow-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Agendar Aula Experimental
              </SchedulingLink>
              <Link href="/aulas-coletivas" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-yellow-600 transition-colors">
                Ver Outras Aulas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}