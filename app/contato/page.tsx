"use client";

import { Clock, Facebook, Instagram, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage(
          "Mensagem enviada com sucesso! Entraremos em contato em breve."
        );
        setFormData({
          nome: "",
          email: "",
          telefone: "",
          assunto: "",
          mensagem: "",
        });
      } else {
        setSubmitMessage(
          data.error || "Erro ao enviar mensagem. Tente novamente."
        );
      }
    } catch (error) {
      setSubmitMessage("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="bg-neutral-background">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-neutral-surface">
        <div className="container-main">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-neutral-text-primary mb-6">
              Entre em <span className="text-primary-500">Contato</span>
            </h1>
            <p className="text-xl text-neutral-text-secondary max-w-3xl mx-auto">
              Estamos sempre prontos para te atender! Tire suas dúvidas, agende
              sua aula experimental ou saiba mais sobre nossos planos.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-display text-neutral-text-primary mb-6">
                Envie sua Mensagem
              </h2>
              <p className="text-body text-neutral-text-secondary mb-8">
                Preencha o formulário abaixo e retornaremos em até 24 horas
                úteis. Sua primeira aula experimental é gratuita!
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="nome"
                    className="block text-body text-neutral-text-primary mb-2"
                  >
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
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-body text-neutral-text-primary mb-2"
                  >
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
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label
                    htmlFor="telefone"
                    className="block text-body text-neutral-text-primary mb-2"
                  >
                    Telefone (com DDD)
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="(12) 99999-9999"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label
                    htmlFor="assunto"
                    className="block text-body text-neutral-text-primary mb-2"
                  >
                    Assunto
                  </label>
                  <input
                    type="text"
                    id="assunto"
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Sobre o que você gostaria de falar?"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label
                    htmlFor="mensagem"
                    className="block text-body text-neutral-text-primary mb-2"
                  >
                    Sua Mensagem *
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    required
                    rows={5}
                    value={formData.mensagem}
                    onChange={handleChange}
                    className="input-field resize-none"
                    placeholder="Conte-nos como podemos te ajudar..."
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full"
                  disabled={isSubmitting}
                >
                  <Send className="h-5 w-5 mr-2" />
                  {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                </button>

                {submitMessage && (
                  <div
                    className={`p-4 rounded-lg ${
                      submitMessage.includes("sucesso")
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-red-100 text-red-800 border border-red-200"
                    }`}
                  >
                    {submitMessage}
                  </div>
                )}
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-display text-neutral-text-primary mb-6">
                  Nossos Canais de Atendimento
                </h2>

                <div className="space-y-6">
                  {/* Phone */}
                  <div className="card">
                    <div className="flex items-start space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg">
                        <Phone className="h-6 w-6 text-neutral-text-primary" />
                      </div>
                      <div>
                        <h3 className="text-heading text-neutral-text-primary mb-2">
                          Telefone/WhatsApp
                        </h3>
                        <p className="text-body text-neutral-text-secondary mb-2">
                          Para um atendimento rápido e direto
                        </p>
                        <a
                          href="https://wa.me/5512992192268"
                          className="text-primary-500 hover:text-orange-600 transition-colors font-semibold"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          (12) 99219-2268
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="card">
                    <h3 className="text-heading text-neutral-text-primary mb-4">
                      Redes Sociais
                    </h3>
                    <p className="text-body text-neutral-text-secondary mb-4">
                      Siga-nos para ficar por dentro das novidades e dicas de
                      treino!
                    </p>
                    <div className="flex space-x-4">
                      <a
                        href="https://instagram.com/panobiancosjcsatelite"
                        className="flex items-center space-x-2 text-neutral-text-secondary hover:text-primary-500 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Instagram className="h-5 w-5" />
                        <span>Instagram</span>
                      </a>
                      <a
                        href="https://facebook.com/panobiancosjcsatelitesp"
                        className="flex items-center space-x-2 text-neutral-text-secondary hover:text-primary-500 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Facebook className="h-5 w-5" />
                        <span>Facebook</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Schedule */}
      <section className="py-16 bg-neutral-surface">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Location */}
            <div>
              <h2 className="text-display text-neutral-text-primary mb-6">
                Nossa Localização
              </h2>
              <div className="card">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg">
                    <MapPin className="h-6 w-6 text-neutral-text-primary" />
                  </div>
                  <div>
                    <h3 className="text-heading text-neutral-text-primary mb-2">
                      Academia Panobianco Jardim Satélite
                    </h3>
                    <p className="text-body text-neutral-text-secondary">
                      Av. Cidade Jardim, 391
                      <br />
                      Jardim Satélite
                      <br />
                      São José dos Campos - SP
                      <br />
                      CEP: 12231-675
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div>
              <h2 className="text-display text-neutral-text-primary mb-6">
                Horário de Funcionamento
              </h2>
              <div className="card">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg">
                    <Clock className="h-6 w-6 text-neutral-text-primary" />
                  </div>
                  <div className="space-y-4 flex-1">
                    <div className="flex justify-between items-center pb-2 border-b border-neutral-border">
                      <span className="text-body text-neutral-text-primary font-semibold">
                        Segunda a Sexta
                      </span>
                      <span className="text-body text-neutral-text-secondary">
                        05h00 às 23h00
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-neutral-border">
                      <span className="text-body text-neutral-text-primary font-semibold">
                        Sábado
                      </span>
                      <span className="text-body text-neutral-text-secondary">
                        08h00 às 18h00
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-body text-neutral-text-primary font-semibold">
                        Domingo
                      </span>
                      <span className="text-body text-neutral-text-secondary">
                        09h00 às 13h00
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-background rounded-lg p-4">
                  <p className="text-subtext text-neutral-text-secondary text-center">
                    <strong>Dica:</strong> Para evitar horários de pico, venha
                    preferencialmente entre 9h-16h ou após 21h!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ/Quick Info */}
      <section className="py-16">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-display text-neutral-text-primary mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-body text-neutral-text-secondary">
              Algumas dúvidas comuns sobre nossa academia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Como agendar minha aula experimental?
              </h3>
              <p className="text-body text-neutral-text-secondary">
                Você pode agendar através do formulário nesta página, pelo
                WhatsApp (12) 99219-2268 ou diretamente na recepção da academia.
              </p>
            </div>

            <div className="card">
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Preciso levar alguma coisa na primeira visita?
              </h3>
              <p className="text-body text-neutral-text-secondary">
                Apenas roupas confortáveis para exercício, tênis e uma garrafa
                de água. Temos vestiários completos com chuveiros.
              </p>
            </div>

            <div className="card">
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Vocês aceitam Gympass/TotalPass?
              </h3>
              <p className="text-body text-neutral-text-secondary">
                Sim! Aceitamos Gympass a partir do plano Basic e TotalPass a
                partir do TP1+. Entre em contato para mais informações sobre
                parcerias corporativas.
              </p>
            </div>

            <div className="card">
              <h3 className="text-heading text-neutral-text-primary mb-3">
                Tem estacionamento?
              </h3>
              <p className="text-body text-neutral-text-secondary">
                Nossa localização oferece fácil acesso e opções de
                estacionamento nas proximidades, além de transporte público.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
