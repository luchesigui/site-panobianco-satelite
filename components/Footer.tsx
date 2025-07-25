import Link from 'next/link'
import { MapPin, Clock, Instagram, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-neutral-surface border-t border-neutral-border">
      <div className="container-main py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Informações da Academia */}
          <div>
            <h3 className="text-heading font-bold text-primary-500 mb-4">
              Academia Panobianco
            </h3>
            <p className="text-body text-neutral-text-secondary mb-4">
              Sua academia completa no Jardim Satélite. Musculação, aulas coletivas e treino personalizado.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-neutral-text-secondary hover:text-primary-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-neutral-text-secondary hover:text-primary-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-heading font-bold text-neutral-text-primary mb-4">
              Links Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre-nos" className="text-body text-neutral-text-secondary hover:text-primary-500 transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/servicos" className="text-body text-neutral-text-secondary hover:text-primary-500 transition-colors">
                  Serviços
                </Link>
              </li>
              <li>
                <Link href="/aulas-coletivas" className="text-body text-neutral-text-secondary hover:text-primary-500 transition-colors">
                  Aulas Coletivas
                </Link>
              </li>
              <li>
                <Link href="/planos" className="text-body text-neutral-text-secondary hover:text-primary-500 transition-colors">
                  Planos
                </Link>
              </li>
              <li>
                <Link href="/aula-experimental" className="text-body text-neutral-text-secondary hover:text-primary-500 transition-colors">
                  Aula Experimental
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-heading font-bold text-neutral-text-primary mb-4">
              Contato
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-500 mt-0.5" />
                <div>
                  <p className="text-body text-neutral-text-secondary">
                    Av. Cidade Jardim, 391<br />
                    Jardim Satélite<br />
                    São José dos Campos - SP<br />
                    12231-675
                  </p>
                </div>
              </li>

            </ul>
          </div>

          {/* Horário de Funcionamento */}
          <div>
            <h3 className="text-heading font-bold text-neutral-text-primary mb-4">
              Horário de Funcionamento
            </h3>
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-primary-500 mt-0.5" />
                <div>
                  <p className="text-body text-neutral-text-secondary">
                    <strong>Segunda a Sexta:</strong><br />
                    05h00 às 23h00
                  </p>
                  <p className="text-body text-neutral-text-secondary mt-2">
                    <strong>Sábado:</strong><br />
                    08h00 às 18h00
                  </p>
                  <p className="text-body text-neutral-text-secondary mt-2">
                    <strong>Domingo:</strong><br />
                    09h00 às 13h00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-neutral-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-subtext text-neutral-text-secondary">
              © 2024 Academia Panobianco Jardim Satélite. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/politica-de-privacidade" className="text-subtext text-neutral-text-secondary hover:text-primary-500 transition-colors">
                Política de Privacidade
              </Link>
              <Link href="/termos-de-uso" className="text-subtext text-neutral-text-secondary hover:text-primary-500 transition-colors">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 