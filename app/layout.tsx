import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "@/contexts/ThemeContext";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Academia Panobianco Jardim Satélite | Musculação, Aulas Coletivas e Treino Personalizado em São José dos Campos",
    template: "%s | Academia Panobianco Jardim Satélite"
  },
  description:
    "Academia Panobianco Jardim Satélite oferece musculação, aulas coletivas, treino personalizado e avaliação física. Localizada na Av. Cidade Jardim, 391, Jardim Satélite, São José dos Campos.",
  keywords:
    "academia, musculação, aulas coletivas, treino personalizado, são josé dos campos, jardim satélite, academia panobianco, fitness, personal trainer",
  authors: [{ name: "Academia Panobianco Jardim Satélite" }],
  creator: "Academia Panobianco Jardim Satélite",
  publisher: "Academia Panobianco Jardim Satélite",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Academia Panobianco Jardim Satélite",
    title: "Academia Panobianco Jardim Satélite | Musculação e Aulas Coletivas",
    description: "Academia completa em São José dos Campos com musculação, aulas coletivas e treino personalizado.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Academia Panobianco Jardim Satélite | Musculação e Aulas Coletivas",
    description: "Academia completa em São José dos Campos com musculação, aulas coletivas e treino personalizado.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
