import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText, Scale, Shield, AlertTriangle, Phone, Mail, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Termos de Uso | Academia Panobianco Jardim Satélite',
  description: 'Conheça os termos e condições de uso do website e serviços da Academia Panobianco Jardim Satélite em São José dos Campos.',
  keywords: 'termos de uso, condições de uso, academia panobianco, jardim satélite, são josé dos campos, regulamento',
  robots: 'index, follow',
  openGraph: {
    title: 'Termos de Uso | Academia Panobianco Jardim Satélite',
    description: 'Conheça os termos e condições de uso do website e serviços da Academia Panobianco Jardim Satélite em São José dos Campos.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function TermosDeUso() {
  return (
    <div className="bg-neutral-background">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-neutral-surface">
        <div className="container-main">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
              <Scale className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-neutral-text-primary mb-6">
              Termos de <span className="text-primary-500">Uso</span>
            </h1>
            <p className="text-xl text-neutral-text-secondary max-w-3xl mx-auto">
              Bem-vindo ao website da Academia Panobianco Jardim Satélite. Conheça nossos termos e condições de uso.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container-main">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-body text-neutral-text-secondary mb-8">
                Ao acessar e utilizar este website, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Por favor, leia-os atentamente. Se você não concordar com qualquer parte destes termos, não utilize nosso website.
              </p>

              <div className="space-y-12">
                {/* Aceitação dos Termos */}
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                      <FileText className="w-6 h-6 text-primary-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-neutral-text-primary">1. Aceitação dos Termos</h2>
                  </div>
                  <p className="text-body text-neutral-text-secondary">
                    Estes Termos regem o seu acesso e uso do website da Academia Panobianco Jardim Satélite. Ao acessar ou usar o Website, você concorda em estar vinculado a estes Termos e a todas as políticas e diretrizes incorporadas por referência. Se você não concordar com todos estes Termos, não use o Website.
                  </p>
                </div>

                {/* Alterações nos Termos */}
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                      <AlertTriangle className="w-6 h-6 text-primary-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-neutral-text-primary">2. Alterações nos Termos</h2>
                  </div>
                  <p className="text-body text-neutral-text-secondary">
                    A Academia Panobianco Jardim Satélite reserva-se o direito de modificar ou substituir estes Termos a qualquer momento. Se uma revisão for material, faremos esforços razoáveis para fornecer um aviso com pelo menos 30 dias de antecedência. Ao continuar a acessar ou usar nosso Website após essas revisões entrarem em vigor, você concorda em ficar vinculado aos termos revisados.
                  </p>
                </div>

                {/* Uso do Website */}
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                      <Shield className="w-6 h-6 text-primary-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-neutral-text-primary">3. Uso do Website</h2>
                  </div>
                  <p className="text-body text-neutral-text-secondary mb-4">
                    Você concorda em usar o Website apenas para fins lícitos e de maneira que não infrinja os direitos de terceiros. Comportamento proibido inclui:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-body text-neutral-text-secondary ml-4">
                    <li>Assediar ou causar angústia a qualquer outra pessoa</li>
                    <li>Transmitir conteúdo obsceno ou ofensivo</li>
                    <li>Interromper o fluxo normal de diálogo dentro do Website</li>
                    <li>Tentar acessar áreas restritas do sistema</li>
                    <li>Utilizar o site para atividades ilegais ou não autorizadas</li>
                  </ul>
                </div>

                {/* Propriedade Intelectual */}
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                      <Scale className="w-6 h-6 text-primary-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-neutral-text-primary">4. Propriedade Intelectual</h2>
                  </div>
                  <p className="text-body text-neutral-text-secondary mb-4">
                    Todo o conteúdo presente neste Website é propriedade da Academia Panobianco Jardim Satélite ou de seus fornecedores de conteúdo e é protegido pelas leis de direitos autorais. Isso inclui:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-body text-neutral-text-secondary ml-4">
                    <li>Textos, gráficos, logotipos e ícones</li>
                    <li>Imagens, vídeos e clipes de áudio</li>
                    <li>Downloads digitais e compilações de dados</li>
                    <li>Software e código do website</li>
                  </ul>
                  <p className="text-body text-neutral-text-secondary mt-4">
                    Você não pode reproduzir, duplicar, copiar, vender, revender ou explorar para qualquer finalidade comercial qualquer parte do Website sem o consentimento expresso por escrito da Academia Panobianco Jardim Satélite.
                  </p>
                </div>

                {/* Links para Outros Websites */}
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                      <FileText className="w-6 h-6 text-primary-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-neutral-text-primary">5. Links para Outros Websites</h2>
                  </div>
                  <p className="text-body text-neutral-text-secondary">
                    Nosso Website pode conter links para websites ou serviços de terceiros que não são de propriedade ou controlados pela Academia Panobianco Jardim Satélite. Não temos controle e não assumimos responsabilidade pelo conteúdo, políticas de privacidade ou práticas de quaisquer websites de terceiros. A Academia Panobianco Jardim Satélite não será responsável por qualquer dano causado pelo uso de websites de terceiros.
                  </p>
                </div>

                {/* Isenção de Garantias */}
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                      <AlertTriangle className="w-6 h-6 text-primary-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-neutral-text-primary">6. Isenção de Garantias</h2>
                  </div>
                  <p className="text-body text-neutral-text-secondary">
                    O Website é fornecido "como está" e "conforme disponível", sem quaisquer garantias de qualquer tipo, expressas ou implícitas. A Academia Panobianco Jardim Satélite não garante que o Website será ininterrupto, seguro ou livre de erros, que os defeitos serão corrigidos ou que o Website está livre de vírus ou outros componentes nocivos.
                  </p>
                </div>

                {/* Limitação de Responsabilidade */}
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                      <Shield className="w-6 h-6 text-primary-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-neutral-text-primary">7. Limitação de Responsabilidade</h2>
                  </div>
                  <p className="text-body text-neutral-text-secondary mb-4">
                    Em nenhuma circunstância a Academia Panobianco Jardim Satélite será responsável por quaisquer danos resultantes de:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-body text-neutral-text-secondary ml-4">
                    <li>Seu acesso ou uso ou incapacidade de acessar ou usar o Website</li>
                    <li>Qualquer conduta ou conteúdo de terceiros no Website</li>
                    <li>Qualquer conteúdo obtido do Website</li>
                    <li>Acesso não autorizado, uso ou alteração de suas transmissões ou conteúdo</li>
                  </ul>
                </div>

                {/* Indenização */}
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                      <Scale className="w-6 h-6 text-primary-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-neutral-text-primary">8. Indenização</h2>
                  </div>
                  <p className="text-body text-neutral-text-secondary mb-4">
                    Você concorda em defender, indenizar e isentar a Academia Panobianco Jardim Satélite de todas e quaisquer reivindicações, danos e despesas resultantes de:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-body text-neutral-text-secondary ml-4">
                    <li>Seu uso e acesso ao Website</li>
                    <li>Uma violação destes Termos</li>
                    <li>Conteúdo postado no Website por você</li>
                  </ul>
                </div>

                {/* Lei Aplicável */}
                <div>
                  <h2 className="text-2xl font-bold text-neutral-text-primary mb-4">9. Lei Aplicável</h2>
                  <p className="text-body text-neutral-text-secondary">
                    Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, sem considerar suas disposições sobre conflitos de leis. Qualquer disputa será resolvida nos tribunais competentes de São José dos Campos, SP.
                  </p>
                </div>

                {/* Contato */}
                <div className="bg-neutral-surface rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-neutral-text-primary mb-6">10. Contato</h2>
                  <p className="text-body text-neutral-text-secondary mb-6">
                    Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco:
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-primary-600 mr-3" />
                      <span className="text-body text-neutral-text-secondary">
                        Academia Panobianco Jardim Satélite<br />
                        Av. Cidade Jardim, 391 - Jardim Satélite, São José dos Campos - SP
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-primary-600 mr-3" />
                      <span className="text-body text-neutral-text-secondary">+55 12 99219-2268</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-primary-600 mr-3" />
                      <span className="text-body text-neutral-text-secondary">contato@panobiancosatelite.com.br</span>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-text-secondary mt-6">
                    Última atualização: 1º de janeiro de 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-50">
        <div className="container-main">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-neutral-text-primary mb-4">
              Pronto para Começar sua Jornada?
            </h2>
            <p className="text-body text-neutral-text-secondary mb-8 max-w-2xl mx-auto">
              Agora que você conhece nossos termos, que tal agendar uma aula experimental e conhecer nossa academia?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/aula-experimental"
                className="btn-primary"
              >
                Agendar Aula Experimental
              </Link>
              <Link
                href="/politica-de-privacidade"
                className="btn-secondary"
              >
                Ver Política de Privacidade
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}