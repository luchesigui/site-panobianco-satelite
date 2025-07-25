import Link from 'next/link'
import { Dumbbell, Users, User, FileCheck, Calendar, MapPin, Clock, Star } from 'lucide-react'

export default function Home() {
  return (
    <div className="bg-neutral-background">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container-main">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-neutral-text-primary mb-6">
              Academia Panobianco <br />
              <span className="text-primary-500">Jardim Satélite</span>
            </h1>
            <p className="text-xl text-neutral-text-secondary mb-8 max-w-3xl mx-auto">
              Sua nova jornada de saúde e bem-estar começa aqui. Musculação, aulas coletivas, treino personalizado e muito mais em São José dos Campos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/aula-experimental" className="btn-primary">
                Agende sua Aula Experimental
              </Link>
              <Link href="/planos" className="btn-secondary">
                Conheça Nossos Planos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-display text-neutral-text-primary mb-4">
              Nossos Pilares de Excelência
            </h2>
            <p className="text-body text-neutral-text-secondary max-w-2xl mx-auto">
              Oferecemos uma experiência completa com serviços pensados para todos os níveis e objetivos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Musculação */}
            <div className="card hover:border-primary-500 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4">
                <Dumbbell className="h-6 w-6 text-neutral-text-primary" />
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Musculação
              </h3>
              <p className="text-body text-neutral-text-secondary mb-4">
                Área ampla com equipamentos modernos e acompanhamento de professores qualificados para seu treino personalizado.
              </p>
              <Link href="/servicos/musculacao" className="text-primary-500 hover:text-green-400 transition-colors">
                Saiba mais →
              </Link>
            </div>

            {/* Aulas Coletivas */}
            <div className="card hover:border-primary-500 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4">
                <Users className="h-6 w-6 text-neutral-text-primary" />
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Aulas Coletivas
              </h3>
              <p className="text-body text-neutral-text-secondary mb-4">
                Flashback, Pilates, WolfFit, GAP, FitDance, Jump, Muay Thai e Jiu Jítsu. Energia e diversão em grupo.
              </p>
              <Link href="/aulas-coletivas" className="text-primary-500 hover:text-green-400 transition-colors">
                Explore nossas aulas →
              </Link>
            </div>

            {/* Treino Personalizado */}
            <div className="card hover:border-primary-500 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4">
                <User className="h-6 w-6 text-neutral-text-primary" />
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Treino Personalizado
              </h3>
              <p className="text-body text-neutral-text-secondary mb-4">
                Acompanhamento individualizado com personal trainers qualificados para resultados rápidos e eficazes.
              </p>
              <Link href="/servicos/treino-personalizado" className="text-primary-500 hover:text-green-400 transition-colors">
                Saiba mais →
              </Link>
            </div>

            {/* Avaliação Física */}
            <div className="card hover:border-primary-500 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4">
                <FileCheck className="h-6 w-6 text-neutral-text-primary" />
              </div>
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Avaliação Física
              </h3>
              <p className="text-body text-neutral-text-secondary mb-4">
                Análise completa do seu condicionamento atual para traçar um plano de treino seguro e eficaz.
              </p>
              <Link href="/servicos" className="text-primary-500 hover:text-green-400 transition-colors">
                Saiba mais →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-neutral-surface">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-display text-neutral-text-primary mb-6">
                Bem-vindo à Academia Panobianco Jardim Satélite
              </h2>
              <p className="text-body text-neutral-text-secondary mb-6">
                Localizada estrategicamente na Av. Cidade Jardim, 391, no coração do Jardim Satélite, nossa academia foi cuidadosamente projetada para oferecer uma experiência completa e transformadora, independentemente do seu nível de condicionamento físico.
              </p>
              <p className="text-body text-neutral-text-secondary mb-6">
                Nossa filosofia vai além do treino físico; buscamos promover um estilo de vida equilibrado, onde o movimento, a disciplina e o cuidado com o corpo e a mente se unem para gerar resultados duradouros.
              </p>
              <Link href="/sobre-nos" className="btn-primary">
                Conheça Nossa História
              </Link>
            </div>
            <div className="bg-neutral-background rounded-lg p-8">
              <h3 className="text-heading text-neutral-text-primary mb-4">
                Por que escolher a Panobianco?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <span className="text-body text-neutral-text-secondary">Estrutura moderna com equipamentos de última geração</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <span className="text-body text-neutral-text-secondary">Professores atenciosos e qualificados</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <span className="text-body text-neutral-text-secondary">Ambiente acolhedor e motivador</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <span className="text-body text-neutral-text-secondary">Localização privilegiada no Jardim Satélite</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <span className="text-body text-neutral-text-secondary">Planos flexíveis e aceitamos Gympass</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-display text-neutral-text-primary mb-4">
              O que nossos alunos dizem
            </h2>
            <p className="text-body text-neutral-text-secondary">
              Depoimentos reais de quem já faz parte da família Panobianco
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-primary-500 fill-current" />
                ))}
              </div>
              <p className="text-body text-neutral-text-secondary mb-4">
                "A Panobianco Jardim Satélite superou minhas expectativas! A estrutura é impecável, os professores são muito atenciosos e as aulas coletivas são demais. Sinto-me muito mais motivada e com resultados visíveis."
              </p>
              <div className="text-subtext text-neutral-text-primary font-semibold">
                — Maria S., Aluna de Musculação e Zumba
              </div>
            </div>

            <div className="card">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-primary-500 fill-current" />
                ))}
              </div>
              <p className="text-body text-neutral-text-secondary mb-4">
                "Ambiente excelente para treinar. Os equipamentos são novos e sempre tem alguém da equipe para ajudar. Recomendo a todos que buscam uma academia de qualidade em São José dos Campos."
              </p>
              <div className="text-subtext text-neutral-text-primary font-semibold">
                — João P., Aluno de Musculação
              </div>
            </div>

            <div className="card">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-primary-500 fill-current" />
                ))}
              </div>
              <p className="text-body text-neutral-text-secondary mb-4">
                "Adoro as aulas de Spinning! A energia é incrível e os instrutores são muito bons. É o meu momento de desestressar e cuidar da saúde."
              </p>
              <div className="text-subtext text-neutral-text-primary font-semibold">
                — Ana L., Aluna de Spinning
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Schedule Section */}
      <section className="py-16 bg-neutral-surface">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Location */}
            <div>
              <h2 className="text-display text-neutral-text-primary mb-6">
                Nossa Localização
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary-500 mt-1" />
                  <div>
                    <p className="text-body text-neutral-text-primary font-semibold">
                      Academia Panobianco São José dos Campos - Jd. Satélite
                    </p>
                    <p className="text-body text-neutral-text-secondary">
                      Av. Cidade Jardim, 391 - Jardim Satélite<br />
                      São José dos Campos - SP, 12231-675
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8 bg-neutral-background rounded-lg p-4">
                <p className="text-subtext text-neutral-text-secondary text-center">
                  [Google Maps seria incorporado aqui]
                </p>
              </div>
            </div>

            {/* Schedule */}
            <div>
              <h2 className="text-display text-neutral-text-primary mb-6">
                Horário de Funcionamento
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-primary-500 mt-1" />
                  <div className="space-y-3">
                    <div>
                      <p className="text-body text-neutral-text-primary font-semibold">
                        Segunda a Sexta
                      </p>
                      <p className="text-body text-neutral-text-secondary">
                        05h00 às 23h00
                      </p>
                    </div>
                    <div>
                      <p className="text-body text-neutral-text-primary font-semibold">
                        Sábado
                      </p>
                      <p className="text-body text-neutral-text-secondary">
                        08h00 às 18h00
                      </p>
                    </div>
                    <div>
                      <p className="text-body text-neutral-text-primary font-semibold">
                        Domingo
                      </p>
                      <p className="text-body text-neutral-text-secondary">
                        09h00 às 13h00
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container-main">
          <div className="text-center">
            <h2 className="text-display text-neutral-text-primary mb-6">
              Pronto para transformar sua vida?
            </h2>
            <p className="text-body text-neutral-text-secondary mb-8 max-w-2xl mx-auto">
              Agende sua aula experimental gratuita e descubra por que a Academia Panobianco Jardim Satélite é o lugar perfeito para você alcançar seus objetivos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/aula-experimental" className="btn-primary">
                <Calendar className="h-5 w-5 mr-2" />
                Agendar Aula Experimental
              </Link>
              <Link href="/planos" className="btn-secondary">
                Conheça Nossos Planos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 