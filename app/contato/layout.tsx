import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contato | Academia Panobianco Jardim Satélite - Fale Conosco',
  description: 'Entre em contato com a Academia Panobianco Jardim Satélite. Av. Cidade Jardim, 391, São José dos Campos. Telefone: (12) 99219-2268.',
  keywords: 'contato academia panobianco, endereço academia jardim satélite, telefone academia são josé dos campos, horário funcionamento',
  robots: 'index, follow',
  openGraph: {
    title: 'Contato | Academia Panobianco Jardim Satélite',
    description: 'Entre em contato conosco! Av. Cidade Jardim, 391, Jardim Satélite, São José dos Campos.',
    type: 'website',
    locale: 'pt_BR',
  },
  alternates: {
    canonical: '/contato',
  },
}

export default function ContatoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}