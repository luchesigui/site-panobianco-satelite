import type { Metadata } from 'next'
import Link from 'next/link'
import { Heart, Target, Users, Award, MapPin, Dumbbell } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sobre Nós | Academia Panobianco Jardim Satélite',
  description: 'Conheça a história, missão e valores da Academia Panobianco Jardim Satélite. Uma equipe dedicada ao seu bem-estar em São José dos Campos.',
}

export default function SobreNos() {
  return (
    <div className="bg-primary">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container-main">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-primary mb-6">
              Sobre <span className="text-primary-500">Nossa História</span>
            </h1>
            <p className="text-xl text-secondary max-w-3xl mx-auto">
              Conheça a Academia Panobianco Jardim Satélite e descubra como transformamos vidas através do movimento, saúde e bem-estar.
            </p>
          </div>
        </div>
      </section>

      {/* História e Missão */}
      <section className="py-16 bg-secondary">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-display text-primary mb-6">
                Nossa História e Missão
              </h2>
              <p className="text-body text-secondary mb-6">
                A Academia Panobianco Jardim Satélite nasceu de uma visão clara: transformar vidas através do movimento, da saúde e do bem-estar. Desde a nossa fundação, em São José dos Campos, dedicamo-nos a criar um espaço onde cada indivíduo se sinta motivado a superar seus limites e a alcançar seus objetivos de forma sustentável.
              </p>
              <p className="text-body text-secondary mb-6">
                Nossa missão vai além de oferecer equipamentos de ponta; é sobre construir uma comunidade, inspirar hábitos saudáveis e proporcionar um ambiente acolhedor onde todos se sintam em casa. Acreditamos que a atividade física é uma ferramenta poderosa para o desenvolvimento pessoal, e estamos comprometidos em ser o catalisador dessa transformação na vida de nossos alunos.
              </p>
            </div>
            <div className="card">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-500 rounded-full mb-6 mx-auto">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-heading text-primary text-center mb-4">
                Nossa Missão
              </h3>
              <p className="text-body text-secondary text-center">
                Transformar vidas através do movimento, construindo uma comunidade saudável e inspirando hábitos que perduram para toda a vida.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores e Filosofia */}
      <section className="py-16">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-display text-primary mb-4">
              Nossos Valores e Filosofia
            </h2>
            <p className="text-body text-secondary max-w-2xl mx-auto">
              Somos guiados por valores que permeiam todas as nossas ações e interações, criando um ambiente de excelência e respeito.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="card text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4 mx-auto">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-heading text-primary mb-3">
                Excelência
              </h3>
              <p className="text-body text-secondary">
                Buscamos sempre aprimorar nossos serviços, equipamentos e conhecimento.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4 mx-auto">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-heading text-primary mb-3">
                Paixão
              </h3>
              <p className="text-body text-secondary">
                Pelo que fazemos nos impulsiona a ir além, inovar e contagiar nossos alunos.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4 mx-auto">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-heading text-primary mb-3">
                Integridade
              </h3>
              <p className="text-body text-secondary">
                Agimos com transparência, ética e respeito em todas as relações.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4 mx-auto">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-heading text-primary mb-3">
                Comunidade
              </h3>
              <p className="text-body text-secondary">
                É o coração da nossa academia, promovendo apoio mútuo e amizade.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4 mx-auto">
                <Dumbbell className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-heading text-primary mb-3">
                Inovação
              </h3>
              <p className="text-body text-secondary">
                Nos mantém em constante evolução, buscando as melhores práticas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filosofia Centrada no Aluno */}
      <section className="py-16 bg-secondary">
        <div className="container-main">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-display text-primary mb-6">
              Filosofia Centrada no Aluno
            </h2>
            <p className="text-body text-secondary mb-8">
              Nossa filosofia é centrada no aluno. Entendemos que cada pessoa é única, com suas próprias metas, desafios e ritmos. Por isso, oferecemos um atendimento personalizado, planos de treino adaptados e uma variedade de aulas que se encaixam em diferentes perfis.
            </p>
            <p className="text-body text-secondary mb-8">
              Queremos que você se sinta à vontade para explorar novas modalidades, experimentar novos desafios e, acima de tudo, desfrutar do processo de cuidar de si mesmo.
            </p>
          </div>
        </div>
      </section>

      {/* Nossa Equipe */}
      <section className="py-16">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-display text-primary mb-4">
              Conheça Nossa Equipe
            </h2>
            <p className="text-body text-secondary max-w-2xl mx-auto">
              Por trás de cada treino, cada aula e cada sorriso, há uma equipe dedicada e apaixonada por saúde e bem-estar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-heading text-primary mb-4">
                Professores Qualificados
              </h3>
              <p className="text-body text-secondary mb-4">
                Nossos professores são profissionais altamente qualificados, com vasta experiência e um profundo conhecimento em diversas modalidades. Eles estão sempre atualizados com as últimas tendências do fitness e são verdadeiros mentores, prontos para orientar, motivar e corrigir sua postura.
              </p>
              <p className="text-body text-secondary">
                Mais do que instrutores, são profissionais que garantem que você treine com segurança e eficiência, maximizando seus resultados.
              </p>
            </div>

            <div className="card">
              <h3 className="text-heading text-primary mb-4">
                Equipe de Suporte
              </h3>
              <p className="text-body text-secondary mb-4">
                Nossa equipe de recepção e suporte está sempre a postos para te atender com um sorriso, tirar suas dúvidas e garantir que sua experiência na academia seja sempre a melhor possível.
              </p>
              <p className="text-body text-secondary">
                Somos uma família, e convidamos você a fazer parte dela. Cada membro da nossa equipe está comprometido com o seu sucesso e bem-estar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Diferenciais */}
      <section className="py-16 bg-secondary">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-display text-primary mb-4">
              Nossos Diferenciais
            </h2>
            <p className="text-body text-secondary max-w-2xl mx-auto">
              O que torna a Academia Panobianco Jardim Satélite a escolha ideal para você?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card">
              <h3 className="text-heading text-primary mb-3">
                Estrutura Moderna e Completa
              </h3>
              <p className="text-body text-secondary">
                Contamos com três andares de puro espaço e equipamentos de última geração, cuidadosamente selecionados para oferecer o melhor em musculação, cárdio e aulas coletivas.
              </p>
            </div>

            <div className="card">
              <h3 className="text-heading text-primary mb-3">
                Variedade de Aulas
              </h3>
              <p className="text-body text-secondary">
                De musculação a aulas coletivas como Pilates, FitDance, Jump, Muay Thai, Jiu Jítsu e muito mais, nossa grade de horários é diversificada para atender a todos os gostos e objetivos.
              </p>
            </div>

            <div className="card">
              <h3 className="text-heading text-primary mb-3">
                Ambiente Acolhedor
              </h3>
              <p className="text-body text-secondary">
                Mais do que uma academia, somos um ponto de encontro. Promovemos um ambiente amigável e motivador, onde você se sentirá parte de uma comunidade saudável.
              </p>
            </div>

            <div className="card">
              <h3 className="text-heading text-primary mb-3">
                Localização Privilegiada
              </h3>
              <p className="text-body text-secondary">
                Situada no coração do Jardim Satélite, nossa academia é de fácil acesso, com opções de estacionamento e transporte público nas proximidades.
              </p>
            </div>

            <div className="card">
              <h3 className="text-heading text-primary mb-3">
                Flexibilidade de Planos
              </h3>
              <p className="text-body text-secondary">
                Oferecemos diversas opções de planos, incluindo a aceitação de Gympass, para que você encontre a modalidade de adesão que melhor se adapta às suas necessidades.
              </p>
            </div>

            <div className="card">
              <h3 className="text-heading text-primary mb-3">
                Professores Atenciosos
              </h3>
              <p className="text-body text-secondary">
                Nossa equipe de instrutores é o nosso maior orgulho. Com expertise e paixão, eles oferecem um acompanhamento personalizado e motivador.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container-main">
          <div className="text-center">
            <h2 className="text-display text-primary mb-6">
              Venha Fazer Parte da Nossa Família
            </h2>
            <p className="text-body text-secondary mb-8 max-w-2xl mx-auto">
              Venha nos visitar e descubra por que a Academia Panobianco Jardim Satélite é o lugar perfeito para você transformar seu corpo, sua mente e sua vida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://agendamento.panobiancosatelite.com.br/" className="btn-primary" target="_blank" rel="noopener noreferrer">
                Agendar Aula Experimental
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