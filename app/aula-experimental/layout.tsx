import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aula Experimental | Academia Panobianco Jardim Satélite - Agende Grátis',
  description: 'Agende sua aula experimental grátis na Academia Panobianco Jardim Satélite. Conheça nossa estrutura, professores e modalidades sem compromisso.',
  keywords: 'aula experimental, aula grátis, academia panobianco, jardim satélite, são josé dos campos, teste grátis academia',
  robots: 'index, follow',
  openGraph: {
    title: 'Aula Experimental | Academia Panobianco Jardim Satélite',
    description: 'Agende sua aula experimental grátis! Conheça nossa estrutura e modalidades sem compromisso.',
    type: 'website',
    locale: 'pt_BR',
  },
  alternates: {
    canonical: '/aula-experimental',
  },
}

export default function AulaExperimentalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}