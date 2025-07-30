import { Clock, Facebook, Instagram, MapPin } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-theme">
      <div className="container-main py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Informações da Academia */}
          <div>
            <div className="flex items-center mb-4">
              <Logo
                className="h-8 w-auto"
                width={120}
                height={32}
                showLink={false}
              />
            </div>
            <p className="text-body text-secondary mb-4">
              Sua academia completa no Jardim Satélite. Musculação, aulas
              coletivas e treino personalizado.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/panobiancosjcsatelite"
                className="text-secondary hover:text-primary-500 transition-colors"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/panobiancosjcsatelitesp"
                className="text-secondary hover:text-primary-500 transition-colors"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-heading font-bold text-primary mb-4">
              Links Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/sobre-nos"
                  className="text-body text-secondary hover:text-primary-500 transition-colors"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos"
                  className="text-body text-secondary hover:text-primary-500 transition-colors"
                >
                  Serviços
                </Link>
              </li>
              <li>
                <Link
                  href="/aulas-coletivas"
                  className="text-body text-secondary hover:text-primary-500 transition-colors"
                >
                  Aulas Coletivas
                </Link>
              </li>
              <li>
                <Link
                  href="/planos"
                  className="text-body text-secondary hover:text-primary-500 transition-colors"
                >
                  Planos
                </Link>
              </li>
              <li>
                <Link
                  href="https://agendamento.panobiancosatelite.com.br/"
                  className="text-body text-secondary hover:text-primary-500 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Aula Experimental
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-heading font-bold text-primary mb-4">
              Contato
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-500 mt-0.5" />
                <div>
                  <p className="text-body text-secondary">
                    Av. Cidade Jardim, 391
                    <br />
                    Jardim Satélite
                    <br />
                    São José dos Campos - SP
                    <br />
                    12231-675
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Horário de Funcionamento */}
          <div>
            <h3 className="text-heading font-bold text-primary mb-4">
              Horário de Funcionamento
            </h3>
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-primary-500 mt-0.5" />
                <div>
                  <p className="text-body text-secondary">
                    <strong>Segunda a Sexta:</strong>
                    <br />
                    05h00 às 23h00
                  </p>
                  <p className="text-body text-secondary mt-2">
                    <strong>Sábado:</strong>
                    <br />
                    08h00 às 18h00
                  </p>
                  <p className="text-body text-secondary mt-2">
                    <strong>Domingo:</strong>
                    <br />
                    09h00 às 13h00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-theme mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-subtext text-secondary">
              © {new Date().getFullYear()} Academia Panobianco Jardim Satélite.
              Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/politica-de-privacidade"
                className="text-subtext text-secondary hover:text-primary-500 transition-colors"
              >
                Política de Privacidade
              </Link>
              <Link
                href="/termos-de-uso"
                className="text-subtext text-secondary hover:text-primary-500 transition-colors"
              >
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
