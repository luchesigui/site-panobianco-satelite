import Link from 'next/link'
import { Dumbbell, Target, Shield, TrendingUp, Users, CheckCircle } from 'lucide-react'

export default function Musculacao() {
  return (
    <div className="bg-neutral-background">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container-main">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-neutral-text-primary mb-6">
              <span className="text-primary-500">Musculação</span><br />
              Força e Definição para o Seu Corpo
            </h1>
            <p className="text-xl text-neutral-text-secondary mb-8 max-w-3xl mx-auto">
              Nossa área de musculação é um espaço amplo e bem equipado, com uma vasta gama de aparelhos modernos e seguros, projetados para atender a todas as necessidades e grupos musculares.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://agendamento.panobiancosatelite.com.br/" className="btn-primary" target="_blank" rel="noopener noreferrer">
                Experimente Gratuitamente
              </Link>
              <Link href="/planos" className="btn-secondary">
                Conheça Nossos Planos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Musculação */}
      <section className="py-16">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-display text-neutral-text-primary mb-4">
              Por Que a Musculação é Essencial?
            </h2>
            <p className="text-body text-neutral-text-secondary max-w-2xl mx-auto">
              Acreditamos que a musculação é mais do que apenas levantar pesos; é uma ciência que, quando aplicada corretamente, pode transformar seu corpo e sua vida.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="card hover:border-primary-500 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Ganho de Massa Muscular
              </h3>
              <p className="text-body text-neutral-text-secondary">
                Essencial para aumentar o metabolismo, queimar mais calorias em repouso e melhorar a composição corporal.
              </p>
            </div>

            <div className="card hover:border-primary-500 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Fortalecimento Ósseo
              </h3>
              <p className="text-body text-neutral-text-secondary">
                Ajuda a prevenir a osteoporose e a manter a densidade óssea, especialmente importante com o avanço da idade.
              </p>
            </div>

            <div className="card hover:border-primary-500 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Redução de Gordura
              </h3>
              <p className="text-body text-neutral-text-secondary">
                O aumento da massa muscular acelera o metabolismo, contribuindo para a perda de gordura de forma mais eficiente.
              </p>
            </div>

            <div className="card hover:border-primary-500 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Melhora da Postura
              </h3>
              <p className="text-body text-neutral-text-secondary">
                Fortalece os músculos do core e das costas, corrigindo desequilíbrios e aliviando dores.
              </p>
            </div>

            <div className="card hover:border-primary-500 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Força e Resistência
              </h3>
              <p className="text-body text-neutral-text-secondary">
                Melhora a capacidade de realizar tarefas diárias e o desempenho em outras atividades físicas.
              </p>
            </div>

            <div className="card hover:border-primary-500 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Prevenção de Lesões
              </h3>
              <p className="text-body text-neutral-text-secondary">
                Músculos fortes e equilibrados protegem as articulações e reduzem o risco de lesões.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Nossa Estrutura */}
      <section className="py-16 bg-neutral-surface">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-display text-neutral-text-primary mb-4">
              Nossa Estrutura de Musculação
            </h2>
            <p className="text-body text-neutral-text-secondary max-w-2xl mx-auto">
              Nossa área de musculação é projetada para oferecer o máximo de conforto, segurança e eficiência em seu treino.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-500 rounded-lg mx-auto mb-4">
                <Dumbbell className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Equipamentos Modernos
              </h3>
              <p className="text-body text-neutral-text-secondary">
                Ampla variedade de máquinas de força, pesos livres, halteres, barras e acessórios, todos de marcas renomadas com manutenção regular.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-500 rounded-lg mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Espaço Amplo e Climatizado
              </h3>
              <p className="text-body text-neutral-text-secondary">
                Ambiente espaçoso que permite livre circulação e execução dos exercícios sem aglomeração, com climatização adequada.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-500 rounded-lg mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Acompanhamento Profissional
              </h3>
              <p className="text-body text-neutral-text-secondary">
                Professores altamente qualificados sempre presentes para orientar, corrigir postura e garantir execução correta e segura.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Treino Personalizado */}
      <section className="py-16">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-display text-neutral-text-primary mb-4">
              Seu Treino Personalizado
            </h2>
            <p className="text-body text-neutral-text-secondary max-w-2xl mx-auto">
              Entendemos que cada corpo é único e responde de forma diferente aos estímulos. Por isso, trabalhamos em conjunto com você para elaborar um plano personalizado.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-heading text-neutral-text-primary mb-4">
                Personalização Completa
              </h3>
              <p className="text-body text-neutral-text-secondary mb-6">
                Nossos professores trabalham em conjunto com você para elaborar um plano de treino de musculação personalizado, levando em consideração seus objetivos, nível de condicionamento físico, histórico de saúde e preferências.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary-500 mt-0.5" />
                  <span className="text-body text-neutral-text-secondary">Avaliação completa do seu condicionamento atual</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary-500 mt-0.5" />
                  <span className="text-body text-neutral-text-secondary">Plano de treino adaptado aos seus objetivos</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary-500 mt-0.5" />
                  <span className="text-body text-neutral-text-secondary">Acompanhamento e ajustes regulares</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary-500 mt-0.5" />
                  <span className="text-body text-neutral-text-secondary">Orientação sobre execução correta dos exercícios</span>
                </li>
              </ul>
            </div>
            <div className="bg-neutral-surface rounded-lg p-8">
              <h4 className="text-heading text-neutral-text-primary mb-4">
                Para Todos os Níveis
              </h4>
              <p className="text-body text-neutral-text-secondary mb-4">
                Seja para iniciantes que precisam aprender os fundamentos, ou para avançados que buscam otimizar seus resultados, nosso acompanhamento garante que você esteja sempre no caminho certo.
              </p>
              <p className="text-body text-neutral-text-secondary">
                <strong>Objetivos atendidos:</strong> Ganho de massa muscular, emagrecimento, fortalecimento, reabilitação, condicionamento físico geral e muito mais.
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
              Venha Transformar Seu Corpo!
            </h2>
            <p className="text-body text-neutral-text-secondary mb-8 max-w-2xl mx-auto">
              Se você busca um lugar onde a musculação é levada a sério, com estrutura de ponta, equipamentos modernos e o suporte de profissionais dedicados, a Academia Panobianco Jardim Satélite é o seu destino.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://agendamento.panobiancosatelite.com.br/" className="btn-primary" target="_blank" rel="noopener noreferrer">
                Agende Sua Aula Experimental Gratuita
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