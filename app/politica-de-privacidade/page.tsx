import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, FileText, Users, Lock, Eye, Phone, Mail, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Política de Privacidade | Academia Panobianco Jardim Satélite',
  description: 'Conheça nossa política de privacidade e proteção de dados pessoais. Academia Panobianco Jardim Satélite está em conformidade com a LGPD.',
  keywords: 'política de privacidade, LGPD, proteção de dados, academia panobianco, jardim satélite, são josé dos campos',
  robots: 'index, follow',
  openGraph: {
    title: 'Política de Privacidade | Academia Panobianco Jardim Satélite',
    description: 'Conheça nossa política de privacidade e proteção de dados pessoais. Academia Panobianco Jardim Satélite está em conformidade com a LGPD.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function PoliticaPrivacidade() {
  return (
    <div className="bg-primary">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="container-main">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
              <Shield className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-primary mb-6">
              Política de <span className="text-primary-500">Privacidade</span>
            </h1>
            <p className="text-xl text-secondary max-w-3xl mx-auto">
              Na Academia Panobianco Jardim Satélite, valorizamos a sua privacidade e a proteção dos seus dados pessoais.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container-main">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-body text-secondary mb-8">
                Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos as informações que você nos fornece ao utilizar nosso website e nossos serviços. Ao acessar e utilizar nosso website, você concorda com os termos desta Política de Privacidade.
              </p>

              <div className="space-y-12">
                {/* Coleta de Dados */}
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                      <FileText className="w-6 h-6 text-primary-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary">1. Coleta de Dados Pessoais</h2>
                  </div>
                  <p className="text-body text-secondary mb-4">
                    Coletamos informações pessoais que você nos fornece voluntariamente ao se cadastrar em nosso website, agendar aulas experimentais, preencher formulários de contato, contratar planos ou interagir conosco de outras formas. Os tipos de dados pessoais que podemos coletar incluem:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-body text-secondary ml-4">
                    <li><strong>Informações de Identificação:</strong> Nome completo, data de nascimento, CPF</li>
                    <li><strong>Informações de Contato:</strong> Endereço de e-mail, número de telefone, endereço residencial</li>
                    <li><strong>Informações de Pagamento:</strong> Dados de cartão de crédito ou outras informações financeiras (processadas por gateways de pagamento seguros)</li>
                    <li><strong>Informações de Saúde:</strong> Dados relevantes para a prática de atividades físicas, como histórico médico e objetivos de treino</li>
                    <li><strong>Informações de Uso:</strong> Dados sobre como você interage com nosso website</li>
                  </ul>
                </div>

                {/* Uso dos Dados */}
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-primary-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary">2. Uso dos Dados Pessoais</h2>
                  </div>
                  <p className="text-body text-secondary mb-4">
                    Utilizamos os dados pessoais coletados para as seguintes finalidades:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-body text-secondary ml-4">
                    <li><strong>Prestação de Serviços:</strong> Gerenciar sua conta, processar pagamentos, agendar aulas</li>
                    <li><strong>Comunicação:</strong> Responder perguntas, enviar atualizações e newsletters</li>
                    <li><strong>Personalização:</strong> Personalizar sua experiência em nossos serviços</li>
                    <li><strong>Melhoria de Serviços:</strong> Analisar o uso para aprimorar nossos produtos</li>
                    <li><strong>Segurança:</strong> Proteger a segurança dos usuários e prevenir fraudes</li>
                    <li><strong>Marketing:</strong> Enviar comunicações sobre produtos e promoções relevantes</li>
                  </ul>
                </div>

                {/* Compartilhamento de Dados */}
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                      <Lock className="w-6 h-6 text-primary-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary">3. Compartilhamento de Dados Pessoais</h2>
                  </div>
                  <p className="text-body text-secondary mb-4">
                    Não vendemos, alugamos ou trocamos seus dados pessoais com terceiros para fins de marketing. Podemos compartilhar suas informações pessoais com:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-body text-secondary ml-4">
                    <li><strong>Prestadores de Serviços:</strong> Empresas que nos auxiliam na operação do website e processamento de pagamentos</li>
                    <li><strong>Autoridades Legais:</strong> Quando exigido por lei ou ordem judicial</li>
                    <li><strong>Parceiros de Negócios:</strong> Com seu consentimento, para oferecer produtos ou serviços conjuntos</li>
                  </ul>
                </div>

                {/* Cookies */}
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                      <Eye className="w-6 h-6 text-primary-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary">4. Cookies e Tecnologias Semelhantes</h2>
                  </div>
                  <p className="text-body text-secondary">
                    Nosso website utiliza cookies e outras tecnologias de rastreamento para coletar informações sobre sua navegação, personalizar sua experiência e analisar o tráfego do site. Você pode configurar seu navegador para recusar cookies, mas isso pode afetar a funcionalidade de algumas partes do nosso website.
                  </p>
                </div>

                {/* Segurança */}
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                      <Shield className="w-6 h-6 text-primary-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary">5. Segurança dos Dados</h2>
                  </div>
                  <p className="text-body text-secondary">
                    Empregamos medidas de segurança técnicas e organizacionais para proteger seus dados pessoais contra acesso não autorizado, uso indevido, divulgação, alteração ou destruição. No entanto, nenhuma transmissão de dados pela internet ou sistema de armazenamento é 100% segura.
                  </p>
                </div>

                {/* Direitos do Usuário */}
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-primary-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary">6. Seus Direitos</h2>
                  </div>
                  <p className="text-body text-secondary mb-4">
                    De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-body text-secondary ml-4">
                    <li><strong>Acesso:</strong> Solicitar acesso aos seus dados pessoais que mantemos</li>
                    <li><strong>Retificação:</strong> Solicitar a correção de dados incompletos ou inexatos</li>
                    <li><strong>Exclusão:</strong> Solicitar a exclusão de seus dados pessoais</li>
                    <li><strong>Oposição:</strong> Opor-se ao tratamento de seus dados em determinadas circunstâncias</li>
                    <li><strong>Portabilidade:</strong> Solicitar a portabilidade de seus dados</li>
                    <li><strong>Revogação do Consentimento:</strong> Revogar seu consentimento a qualquer momento</li>
                  </ul>
                </div>

                {/* Alterações */}
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-4">7. Alterações a Esta Política de Privacidade</h2>
                  <p className="text-body text-secondary">
                    Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças em nossas práticas de privacidade ou em requisitos legais. A versão mais recente estará sempre disponível em nosso website.
                  </p>
                </div>

                {/* Contato */}
                <div className="bg-secondary rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-primary mb-6">8. Contato</h2>
                  <p className="text-body text-secondary mb-6">
                    Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade, entre em contato conosco:
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-primary-600 mr-3" />
                      <span className="text-body text-secondary">
                        Academia Panobianco Jardim Satélite<br />
                        Av. Cidade Jardim, 391 - Jardim Satélite, São José dos Campos - SP
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-primary-600 mr-3" />
                      <span className="text-body text-secondary">+55 12 99219-2268</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-primary-600 mr-3" />
                      <span className="text-body text-secondary">contato@panobiancosatelite.com.br</span>
                    </div>
                  </div>
                  <p className="text-sm text-secondary mt-6">
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
            <h2 className="text-3xl font-bold text-primary mb-4">
              Tem Dúvidas sobre Nossa Política?
            </h2>
            <p className="text-body text-secondary mb-8 max-w-2xl mx-auto">
              Nossa equipe está sempre disponível para esclarecer qualquer questão sobre privacidade e proteção de dados.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contato"
                className="btn-primary"
              >
                Entre em Contato
              </Link>
              <Link
                href="/termos-de-uso"
                className="btn-secondary"
              >
                Ver Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}