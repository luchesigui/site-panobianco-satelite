import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Academia Panobianco Jardim Satélite | Musculação, Aulas Coletivas e Treino Personalizado em São José dos Campos",
  description:
    "Academia Panobianco Jardim Satélite oferece musculação, aulas coletivas, treino personalizado e avaliação física. Localizada na Av. Cidade Jardim, 391, Jardim Satélite, São José dos Campos.",
  keywords:
    "academia, musculação, aulas coletivas, treino personalizado, são josé dos campos, jardim satélite",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
