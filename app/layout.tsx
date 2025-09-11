import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { IndicationProvider } from "@/contexts/IndicationContext";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default:
      "Academia Panobianco Jardim Satélite | Musculação, Aulas Coletivas e Treino Personalizado em São José dos Campos",
    template: "%s | Academia Panobianco Jardim Satélite",
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
    description:
      "Academia completa em São José dos Campos com musculação, aulas coletivas e treino personalizado.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Academia Panobianco Jardim Satélite | Musculação e Aulas Coletivas",
    description:
      "Academia completa em São José dos Campos com musculação, aulas coletivas e treino personalizado.",
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
        <Script
          id="gtag-external"
          src="https://www.googletagmanager.com/gtag/js?id=AW-17525035038"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-17525035038');",
          }}
        />
        <Script src="https://cdn.overtracking.com/t/tYnpTLPMjGZY80maV/" defer />
        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1426944168536689');
fbq('track', 'PageView');`,
          }}
        />
        {/* End Meta Pixel Code */}
      </head>
      <body>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1426944168536689&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <ThemeProvider>
          <IndicationProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </IndicationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
