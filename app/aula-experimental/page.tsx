'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { format, getDay, isValid, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { Calendar, Clock, Users, CheckCircle, User, Phone, MessageSquare } from 'lucide-react'

export default function AulaExperimental() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    data_preferencial: '',
    hora_preferencial: '',
    modalidade_interesse: '',
    mensagem: ''
  })

  const isRestrictedDay = (dateValue: string) => {
    if (!dateValue) {
      return false;
    }

    const parsedDate = parseISO(dateValue);

    if (!isValid(parsedDate)) {
      return false;
    }

    const weekDay = getDay(parsedDate);
    return weekDay === 1 || weekDay === 2;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isRestrictedDay(formData.data_preferencial)) {
      alert('Os agendamentos estão indisponíveis às segundas e terças-feiras. Por favor, selecione outra data ou procure a recepção.');
      return;
    }

    // Here you would handle form submission
    console.log('Form submitted:', formData)
    // For now, just show an alert
    alert('Aula experimental agendada com sucesso! Entraremos em contato para confirmar.')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const disabledDays = useMemo(() => [{ daysOfWeek: [1, 2] }], [])

  const selectedDate = formData.data_preferencial ? parseISO(formData.data_preferencial) : undefined

  const handleDateSelect = (date?: Date) => {
    if (!date) {
      setFormData(prev => ({
        ...prev,
        data_preferencial: ''
      }))
      return
    }

    if (isRestrictedDay(format(date, 'yyyy-MM-dd'))) {
      return
    }

    setFormData(prev => ({
      ...prev,
      data_preferencial: format(date, 'yyyy-MM-dd')
    }))
  }

  return (
    <div className="bg-primary">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="container-main">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-primary mb-6">
              Aula <span className="text-primary-500">Experimental</span>
            </h1>
            <p className="text-xl text-secondary max-w-3xl mx-auto mb-8">
              Quer vivenciar a experiência Panobianco Jardim Satélite antes de se comprometer? Agende agora mesmo sua aula experimental gratuita!
            </p>
            <div className="bg-primary-500 text-white px-6 py-3 rounded-lg inline-block font-semibold">
              🎉 100% GRATUITA - SEM COMPROMISSO
            </div>
          </div>
        </div>
      </section>

      {/* Why Schedule Section */}
      <section className="py-16">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-display text-primary mb-4">
              Por Que Agendar Sua Aula Experimental?
            </h2>
            <p className="text-body text-secondary max-w-2xl mx-auto">
              É a oportunidade perfeita para conhecer nossa estrutura, sentir a energia do nosso ambiente e experimentar a qualidade das nossas aulas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4 mx-auto">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-heading text-primary mb-3">
                Conheça Nossa Estrutura
              </h3>
              <p className="text-body text-secondary">
                Explore nossos três andares com equipamentos modernos e áreas dedicadas à musculação, cárdio e aulas coletivas.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4 mx-auto">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-heading text-primary mb-3">
                Experimente Nossas Aulas
              </h3>
              <p className="text-body text-secondary">
                Participe de uma aula coletiva ou faça um treino na musculação com acompanhamento profissional.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4 mx-auto">
                <User className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-heading text-primary mb-3">
                Ambiente Acolhedor
              </h3>
              <p className="text-body text-secondary">
                Sinta a energia da nossa comunidade. Nossos alunos e equipe são acolhedores e motivadores.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4 mx-auto">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-heading text-primary mb-3">
                Tire Suas Dúvidas
              </h3>
              <p className="text-body text-secondary">
                Converse sobre seus objetivos e conheça os planos disponíveis sem qualquer pressão.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-16 bg-secondary">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <div>
              <h2 className="text-display text-primary mb-6">
                Agendar Aula Experimental
              </h2>
              <p className="text-body text-secondary mb-8">
                Preencha o formulário abaixo e nossa equipe entrará em contato para confirmar o agendamento e tirar qualquer dúvida.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="nome" className="block text-body text-primary mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    required
                    value={formData.nome}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-body text-primary mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="seu@email.com"
                  />
                </div>

                  <div>
                    <label htmlFor="telefone" className="block text-body text-primary mb-2">
                      Telefone (com DDD) *
                    </label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      required
                      value={formData.telefone}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="(12) 99999-9999"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="data_preferencial" className="block text-body text-primary mb-2">
                        Data Preferencial
                      </label>
                      <div className="card p-4">
                        <DayPicker
                          mode="single"
                          locale={ptBR}
                          selected={selectedDate}
                          onSelect={handleDateSelect}
                          disabled={disabledDays}
                          fromDate={new Date()}
                          weekStartsOn={1}
                          showOutsideDays
                        />
                        <input type="hidden" name="data_preferencial" value={formData.data_preferencial} />
                        <p className="text-subtext text-secondary mt-3">
                          {selectedDate
                            ? `Data selecionada: ${format(selectedDate, 'dd/MM/yyyy')}`
                            : 'Selecione uma data disponível (quarta a domingo).'}
                        </p>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="hora_preferencial" className="block text-body text-primary mb-2">
                        Hora Preferencial
                      </label>
                      <input
                        type="time"
                        id="hora_preferencial"
                        name="hora_preferencial"
                        value={formData.hora_preferencial}
                        onChange={handleChange}
                        className="input-field"
                      />
                    </div>
                  </div>

                <div>
                  <label htmlFor="modalidade_interesse" className="block text-body text-primary mb-2">
                    Modalidade de Interesse (opcional)
                  </label>
                  <select
                    id="modalidade_interesse"
                    name="modalidade_interesse"
                    value={formData.modalidade_interesse}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Selecione uma modalidade</option>
                    <option value="musculacao">Musculação</option>
                    <option value="aulas_coletivas">Aulas Coletivas</option>
                    <option value="treino_personalizado">Treino Personalizado</option>
                    <option value="flashback">Flashback</option>
                    <option value="pilates">Pilates</option>
                    <option value="wolffit">WolfFit</option>
                    <option value="gap">GAP</option>
                    <option value="fitdance">FitDance</option>
                    <option value="jump">Jump</option>
                    <option value="muaythai">Muay Thai</option>
                    <option value="jiujitsu">Jiu Jítsu</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="mensagem" className="block text-body text-primary mb-2">
                    Mensagem (opcional)
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    rows={3}
                    value={formData.mensagem}
                    onChange={handleChange}
                    className="input-field resize-none"
                    placeholder="Conte-nos sobre seus objetivos ou dúvidas..."
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  <Calendar className="h-5 w-5 mr-2" />
                  Agendar Aula Experimental
                </button>

                <p className="text-subtext text-secondary text-center">
                  Ao agendar, você concorda com nossos{' '}
                  <Link href="/termos-de-uso" className="text-primary-500 hover:text-orange-600 transition-colors">
                    termos de uso
                  </Link>{' '}
                  e{' '}
                  <Link href="/politica-de-privacidade" className="text-primary-500 hover:text-orange-600 transition-colors">
                    política de privacidade
                  </Link>
                  .
                </p>
              </form>
            </div>

            {/* What to Expect */}
            <div className="space-y-8">
              <div>
                <h2 className="text-display text-primary mb-6">
                  O Que Esperar da Sua Visita
                </h2>
                
                <div className="space-y-6">
                  <div className="card">
                    <div className="flex items-start space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary-500 rounded-full text-white font-bold text-sm">
                        1
                      </div>
                      <div>
                        <h3 className="text-heading text-primary mb-2">
                          Recepção Calorosa
                        </h3>
                        <p className="text-body text-secondary">
                          Você será recebido por nossa equipe, que fará um breve cadastro e apresentará as instalações da academia.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="flex items-start space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary-500 rounded-full text-white font-bold text-sm">
                        2
                      </div>
                      <div>
                        <h3 className="text-heading text-primary mb-2">
                          Orientação Profissional
                        </h3>
                        <p className="text-body text-secondary">
                          Um dos nossos professores estará disponível para te orientar no treino ou na aula escolhida, garantindo segurança e aproveitamento máximo.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="flex items-start space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary-500 rounded-full text-white font-bold text-sm">
                        3
                      </div>
                      <div>
                        <h3 className="text-heading text-primary mb-2">
                          Experiência Completa
                        </h3>
                        <p className="text-body text-secondary">
                          Você poderá usar nossos vestiários, experimentar equipamentos e sentir o ambiente motivador da nossa comunidade.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-primary-500">
                <h3 className="text-heading text-primary mb-4">
                  💡 Dicas para Sua Primeira Visita
                </h3>
                <ul className="space-y-2 text-body text-primary">
                  <li>• Vista roupas confortáveis para exercício</li>
                  <li>• Traga tênis adequado para atividade física</li>
                  <li>• Leve uma garrafa de água</li>
                  <li>• Chegue com 10 minutos de antecedência</li>
                  <li>• Traga documento de identidade</li>
                </ul>
              </div>

              <div className="card">
                <h3 className="text-heading text-primary mb-4">
                  Outras Formas de Agendar
                </h3>
                <div className="space-y-3">
                  <a 
                    href="tel:+5512992192268" 
                    className="flex items-center space-x-3 text-secondary hover:text-primary-500 transition-colors"
                  >
                    <Phone className="h-5 w-5" />
                    <span>(12) 99219-2268 - WhatsApp</span>
                  </a>
                  <div className="flex items-center space-x-3 text-secondary">
                    <Clock className="h-5 w-5" />
                    <span>Diretamente na recepção</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Reminder */}
      <section className="py-16">
        <div className="container-main">
          <div className="text-center">
            <h2 className="text-display text-primary mb-6">
              Sem Compromisso, Apenas Benefícios
            </h2>
            <p className="text-body text-secondary mb-8 max-w-2xl mx-auto">
              A aula experimental é totalmente gratuita e sem qualquer obrigação de matrícula. Queremos que você tenha certeza de que a Panobianco Jardim Satélite é o lugar certo para você.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card text-center">
                <div className="text-2xl mb-4">🆓</div>
                <h3 className="text-heading text-primary mb-2">
                  100% Gratuita
                </h3>
                <p className="text-body text-secondary">
                  Sem taxas, sem pegadinhas. Completamente gratuita.
                </p>
              </div>

              <div className="card text-center">
                <div className="text-2xl mb-4">❌</div>
                <h3 className="text-heading text-primary mb-2">
                  Sem Compromisso
                </h3>
                <p className="text-body text-secondary">
                  Nenhuma obrigação de se matricular após a experiência.
                </p>
              </div>

              <div className="card text-center">
                <div className="text-2xl mb-4">✅</div>
                <h3 className="text-heading text-primary mb-2">
                  Experiência Completa
                </h3>
                <p className="text-body text-secondary">
                  Acesso total às instalações e acompanhamento profissional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 