"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navigation = [
  { name: "Início", href: "/" },
  { name: "Sobre Nós", href: "/sobre-nos" },
  { name: "Serviços", href: "/servicos" },
  { name: "Aulas Coletivas", href: "/aulas-coletivas" },
  { name: "Planos", href: "/planos" },
  { name: "Contato", href: "/contato" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-neutral-surface border-b border-neutral-border">
      <div className="container-main">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-heading font-bold text-primary-500">
              Academia Panobianco
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-body text-neutral-text-primary hover:text-primary-500 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <Link href="/aula-experimental" className="btn-primary">
              Aula Experimental
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-neutral-text-primary hover:text-primary-500"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-border">
            <div className="space-y-1 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 text-body text-neutral-text-primary hover:text-primary-500 hover:bg-neutral-background rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-4 py-2">
                <Link
                  href="/aula-experimental"
                  className="btn-primary w-full text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Aula Experimental
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
