import type { Metadata } from 'next'
import Link from 'next/link'
import { Activity, Clock, Users, Target, Heart, Zap, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Jump | Aulas Coletivas | Academia Panobianco Jardim Satélite',
  description: 'Salte para a diversão em mini-trampolins! Alto gasto calórico com baixo impacto nas articulações na aula de Jump.',
}

export default function JumpPage() {
  return (
    <div className="bg-neutral-background">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-green-600 to-green-800">
        <div className="container-main">
          <div className="text-center text-white">
            <div className="flex justify-center mb-6">
              <div className="flex items-center justify-center w-20 h-20 bg-white/20 rounded-full">
                <Activity className="h-10 w-10" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Jump
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Salte para a diversão e para um corpo mais forte com a aula de Jump em mini-trampolins!
            </p>
          </div>
        </div>
      </section>

      {/* What is Jump */}
      <section className="py-16">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-display text-neutral-text-primary mb-6">
                O Que é Jump?
              </h2>
              <p className="text-body text-neutral-text-secondary mb-6">
                Jump é uma aula de ginástica aeróbica realizada em mini-trampolins individuais. Os movimentos são coreografados e combinam saltos, corridas estacionárias e outros exercícios que utilizam a instabilidade do trampolim para intensificar o trabalho muscular e cardiovascular.
              </p>
              <p className="text-body text-neutral-text-secondary">
                É uma atividade de alto impacto energético, mas de baixo impacto articular, o que a torna segura e eficaz para pessoas de diferentes idades e níveis de condicionamento físico. Prepare-se para pular, suar e se energizar!
              </p>
            </div>
            <div className="card">
              <h3 className="text-heading text-neutral-text-primary mb-4">
                Características da Aula
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-green-500" />
                  <span className="text-body text-neutral-text-secondary">Duração: 45-60 minutos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Activity className="h-5 w-5 text-green-500" />
                  <span className="text-body text-neutral-text-secondary">Mini-trampolins individuais</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span className="text-body text-neutral-text-secondary">Baixo impacto articular</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="h-5 w-5 text-green-500" />
                  <span className="text-body text-neutral-text-secondary">Alto gasto energético</span>
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
              Benefícios do Jump
            </h2>
            <p className="text-body text-neutral-text-secondary">
              Descubra como o Jump pode transformar seu condicionamento físico
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full">
                  <Zap className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Queima Calórica Elevada
              </h3>
              <p className="text-body text-neutral-text-secondary">
                O Jump é uma das modalidades que mais queimam calorias, sendo excelente para o emagrecimento e a manutenção do peso.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full">
                  <Heart className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Condicionamento Cardiovascular
              </h3>
              <p className="text-body text-neutral-text-secondary">
                Fortalece o coração e os pulmões, aumentando a resistência e a capacidade aeróbica de forma eficaz.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full">
                  <Target className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Fortalecimento Muscular
              </h3>
              <p className="text-body text-neutral-text-secondary">
                Trabalha intensamente os músculos das pernas (quadríceps, isquiotibiais, panturrilhas) e glúteos, além de fortalecer o core.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full">
                  <Shield className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Baixo Impacto Articular
              </h3>
              <p className="text-body text-neutral-text-secondary">
                A superfície elástica do trampolim absorve o impacto, protegendo as articulações dos joelhos, tornozelos e coluna.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full">
                  <Activity className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Equilíbrio e Coordenação
              </h3>
              <p className="text-body text-neutral-text-secondary">
                A instabilidade do trampolim desafia o equilíbrio e a coordenação motora, aprimorando essas habilidades.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full">
                  <Heart className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Bem-estar Mental
              </h3>
              <p className="text-body text-neutral-text-secondary">
                A atividade lúdica e a liberação de endorfinas contribuem para a redução do estresse e a melhora do humor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Benefits */}
      <section className="py-16">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-heading text-neutral-text-primary mb-6">
                Benefícios Únicos do Jump
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-3"></div>
                  <p className="text-body text-neutral-text-secondary">
                    <strong>Drenagem Linfática:</strong> Os saltos estimulam o sistema linfático, auxiliando na eliminação de toxinas e na redução da celulite
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-3"></div>
                  <p className="text-body text-neutral-text-secondary">
                    <strong>Melhora da Densidade Óssea:</strong> O impacto controlado ajuda a fortalecer os ossos
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-3"></div>
                  <p className="text-body text-neutral-text-secondary">
                    <strong>Diversão Garantida:</strong> A sensação de "voar" torna o exercício prazeroso e motivante
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-3"></div>
                  <p className="text-body text-neutral-text-secondary">
                    <strong>Segurança:</strong> Menor risco de lesões comparado a outras atividades de alto impacto
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-heading text-neutral-text-primary mb-4">
                Nossas Aulas de Jump
              </h3>
              <p className="text-body text-neutral-text-secondary mb-4">
                Na Academia Panobianco Jardim Satélite, nossas aulas de Jump são uma experiência imersiva. Nossos instrutores são especialistas em criar playlists envolventes e em conduzir treinos desafiadores e divertidos.
              </p>
              <p className="text-body text-neutral-text-secondary mb-6">
                Com mini-trampolins modernos e seguros, você terá todo o suporte para pular com segurança e eficiência. A trilha sonora é cuidadosamente selecionada para te manter no ritmo e motivado.
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

      {/* Safety Section */}
      <section className="py-16 bg-neutral-surface">
        <div className="container-main">
          <div className="text-center">
            <h2 className="text-display text-neutral-text-primary mb-6">
              Segurança e Adaptação
            </h2>
            <p className="text-body text-neutral-text-secondary mb-12 max-w-3xl mx-auto">
              O Jump é uma modalidade segura quando praticada corretamente. Nossos instrutores oferecem orientações detalhadas e adaptações para garantir que todos possam participar com segurança.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-heading text-neutral-text-primary mb-3">Equipamentos Seguros</h3>
                <p className="text-body text-neutral-text-secondary">
                  Mini-trampolins de qualidade com manutenção regular
                </p>
              </div>
              <div className="card text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-heading text-neutral-text-primary mb-3">Orientação Profissional</h3>
                <p className="text-body text-neutral-text-secondary">
                  Instrutores qualificados para orientar e corrigir movimentos
                </p>
              </div>
              <div className="card text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-heading text-neutral-text-primary mb-3">Progressão Gradual</h3>
                <p className="text-body text-neutral-text-secondary">
                  Movimentos adaptados para diferentes níveis de experiência
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-green-600 to-green-800">
        <div className="container-main">
          <div className="text-center text-white">
            <h2 className="text-display mb-6">
              Venha Pular Conosco!
            </h2>
            <p className="text-body mb-8 max-w-2xl mx-auto">
              Se você busca um treino divertido, eficaz e cheio de energia, o Jump da Academia Panobianco Jardim Satélite é a sua próxima parada. Venha sentir a adrenalina, queimar calorias e pular rumo a uma vida mais saudável e ativa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://agendamento.panobiancosatelite.com.br/" className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Agendar Aula Experimental
              </Link>
              <Link href="/aulas-coletivas" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
                Ver Outras Aulas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}