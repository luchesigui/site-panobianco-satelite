import {
  Activity,
  Flower2,
  Heart,
  Music,
  Shield,
  Target,
  Users,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aulas Coletivas | Academia Panobianco Jardim Satélite - Flashback, Pilates, WolfFit",
  description:
    "Descubra nossas aulas coletivas: Flashback, Pilates, WolfFit, GAP, FitDance, Jump, Muay Thai e Jiu Jítsu. Energia e diversão em grupo na Academia Panobianco Jardim Satélite.",
  keywords: "aulas coletivas, flashback, pilates, wolffit, gap, fitdance, jump, muay thai, jiu jitsu, academia jardim satélite, são josé dos campos",
  robots: 'index, follow',
  openGraph: {
    title: "Aulas Coletivas | Academia Panobianco Jardim Satélite",
    description: "Descubra nossas aulas coletivas: Flashback, Pilates, WolfFit, GAP, FitDance, Jump, Muay Thai e Jiu Jítsu.",
    type: 'website',
    locale: 'pt_BR',
  },
  alternates: {
    canonical: '/aulas-coletivas',
  },
};

const classes = [
  {
    name: "Flashback",
    slug: "flashback",
    icon: Music,
    description:
      "Viaje no tempo e dance ao som dos maiores sucessos de décadas passadas! Uma explosão de energia e nostalgia.",
    benefits: ["Queima calorias", "Melhora coordenação", "Diversão garantida"],
    color: "bg-purple-500",
  },
  {
    name: "Pilates",
    slug: "pilates",
    icon: Flower2,
    description:
      "Fortaleça seu core, melhore sua postura e aumente sua flexibilidade com esta modalidade de baixo impacto.",
    benefits: ["Fortalece o core", "Melhora postura", "Aumenta flexibilidade"],
    color: "bg-blue-500",
  },
  {
    name: "WolfFit",
    slug: "wolf-fit",
    icon: Zap,
    description:
      "Experimente a intensidade da ginástica carioca! Exercícios funcionais de alta intensidade com muita ginga.",
    benefits: ["Alta intensidade", "Força e resistência", "Coordenação motora"],
    color: "bg-orange-500",
  },
  {
    name: "GAP",
    slug: "gap",
    icon: Target,
    description:
      "Conquiste glúteos firmes, abdômen definido e pernas torneadas com exercícios localizados.",
    benefits: ["Tonifica músculos", "Fortalece core", "Resultados visíveis"],
    color: "bg-pink-500",
  },
  {
    name: "FitDance",
    slug: "fitdance",
    icon: Music,
    description:
      "Dance, divirta-se e queime muitas calorias com coreografias de diversos ritmos musicais.",
    benefits: ["Queima calorias", "Melhora humor", "Coordenação motora"],
    color: "bg-red-500",
  },
  {
    name: "Jump",
    slug: "jump",
    icon: Activity,
    description:
      "Salte para a diversão em mini-trampolins! Alto gasto calórico com baixo impacto nas articulações.",
    benefits: ["Alto gasto calórico", "Baixo impacto", "Melhora equilíbrio"],
    color: "bg-green-500",
  },
  {
    name: "Muay Thai",
    slug: "muay-thai",
    icon: Shield,
    description:
      "Desenvolva força, agilidade, disciplina e autoconfiança com a arte marcial tailandesa.",
    benefits: ["Autodefesa", "Disciplina", "Condicionamento físico"],
    color: "bg-yellow-500",
  },
  {
    name: "Jiu Jítsu",
    slug: "jiu-jitsu",
    icon: Shield,
    description:
      "Domine a arte suave e desenvolva não apenas o corpo, mas também a mente.",
    benefits: ["Arte marcial eficaz", "Estratégia", "Autoconfiança"],
    color: "bg-indigo-500",
  },
];

export default function AulasColetivas() {
  return (
    <div className="bg-neutral-background">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-neutral-surface">
        <div className="container-main">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-neutral-text-primary mb-6">
              Aulas <span className="text-primary-500">Coletivas</span>
            </h1>
            <p className="text-xl text-neutral-text-secondary max-w-3xl mx-auto">
              Se exercitar pode ser uma experiência divertida, motivadora e
              social. Descubra nossa variedade de aulas coletivas!
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="container-main">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-display text-neutral-text-primary mb-6">
              Energia e Diversão em Grupo
            </h2>
            <p className="text-body text-neutral-text-secondary mb-8">
              Na Academia Panobianco Jardim Satélite, acreditamos que se
              exercitar pode ser uma experiência divertida, motivadora e social.
              Nossas aulas coletivas são projetadas para oferecer uma variedade
              de opções que atendem a diferentes gostos, níveis de
              condicionamento e objetivos.
            </p>
            <p className="text-body text-neutral-text-secondary">
              Com instrutores energéticos e ambientes dinâmicos, você encontrará
              a modalidade perfeita para se desafiar, queimar calorias e se
              conectar com uma comunidade vibrante.
            </p>
          </div>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="py-16 bg-neutral-surface">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-display text-neutral-text-primary mb-4">
              Nossa Grade de Aulas
            </h2>
            <p className="text-body text-neutral-text-secondary">
              Explore todas as modalidades disponíveis e encontre a sua favorita
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {classes.map((classItem) => {
              const IconComponent = classItem.icon;
              return (
                <Link
                  key={classItem.slug}
                  href={`/aulas-coletivas/${classItem.slug}`}
                  className="card hover:border-primary-500 transition-colors group cursor-pointer block"
                >
                  <div
                    className={`flex items-center justify-center w-12 h-12 ${classItem.color} rounded-lg mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-heading text-neutral-text-primary mb-3">
                    {classItem.name}
                  </h3>
                  <p className="text-body text-neutral-text-secondary mb-4">
                    {classItem.description}
                  </p>
                  <div className="mb-4">
                    <ul className="space-y-1">
                      {classItem.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                          <span className="text-subtext text-neutral-text-secondary">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span className="text-primary-500 group-hover:text-orange-600 transition-colors font-semibold">
                    Saiba mais →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-display text-neutral-text-primary mb-6">
                Benefícios das Aulas Coletivas
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary-500 rounded-full mt-1">
                    <Users className="h-4 w-4 text-neutral-text-primary" />
                  </div>
                  <div>
                    <h3 className="text-heading text-neutral-text-primary mb-2">
                      Motivação
                    </h3>
                    <p className="text-body text-neutral-text-secondary">
                      O ambiente de grupo e a energia do instrutor são grandes
                      motivadores para manter a consistência.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary-500 rounded-full mt-1">
                    <Heart className="h-4 w-4 text-neutral-text-primary" />
                  </div>
                  <div>
                    <h3 className="text-heading text-neutral-text-primary mb-2">
                      Diversão
                    </h3>
                    <p className="text-body text-neutral-text-secondary">
                      Exercitar-se em grupo torna o treino mais prazeroso e
                      menos monótono.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary-500 rounded-full mt-1">
                    <Target className="h-4 w-4 text-neutral-text-primary" />
                  </div>
                  <div>
                    <h3 className="text-heading text-neutral-text-primary mb-2">
                      Resultados
                    </h3>
                    <p className="text-body text-neutral-text-secondary">
                      Queime calorias, melhore o condicionamento e alcance seus
                      objetivos de forma eficaz.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary-500 rounded-full mt-1">
                    <Activity className="h-4 w-4 text-neutral-text-primary" />
                  </div>
                  <div>
                    <h3 className="text-heading text-neutral-text-primary mb-2">
                      Variedade
                    </h3>
                    <p className="text-body text-neutral-text-secondary">
                      Experimente diferentes modalidades e mantenha seu treino
                      sempre interessante.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-heading text-neutral-text-primary mb-4">
                Para Todos os Níveis
              </h3>
              <p className="text-body text-neutral-text-secondary mb-4">
                Nossas aulas coletivas são pensadas para acolher pessoas de
                todos os níveis de condicionamento físico. Nossos instrutores
                oferecem modificações e adaptações para garantir que todos
                possam participar e se beneficiar.
              </p>
              <p className="text-body text-neutral-text-secondary mb-6">
                Seja você um iniciante ou alguém mais experiente, encontrará
                desafios adequados ao seu nível e objetivos pessoais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Teaser */}
      <section className="py-16 bg-neutral-surface" id="horarios">
        <div className="container-main">
          <div className="text-center">
            <h2 className="text-display text-neutral-text-primary mb-6">
              Horários Flexíveis
            </h2>
            <p className="text-body text-neutral-text-secondary mb-8 max-w-2xl mx-auto">
              Oferecemos diversos horários ao longo da semana para que você
              possa encaixar as aulas na sua rotina. Confira nossa grade
              completa e encontre o melhor horário para você.
            </p>
            <div className="bg-neutral-background rounded-lg p-6 max-w-lg mx-auto">
              <img
                src="/images/horarios.png"
                alt="Horários"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container-main">
          <div className="text-center">
            <h2 className="text-display text-neutral-text-primary mb-6">
              Pronto para Suar a Camisa?
            </h2>
            <p className="text-body text-neutral-text-secondary mb-8 max-w-2xl mx-auto">
              Venha experimentar nossas aulas coletivas e sinta a energia
              contagiante da Academia Panobianco Jardim Satélite. Sua primeira
              aula é gratuita!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://agendamento.panobiancosatelite.com.br/"
                className="btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Experimentar Aula Gratuita
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
