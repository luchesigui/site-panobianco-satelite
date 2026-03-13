import type { Metadata } from "next";
import { Inter } from "next/font/google";

import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import { GTMHead, GTM_ID } from "@/components/GTM";
import Header from "@/components/Header";
import { IndicationProvider } from "@/contexts/IndicationContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import {
	CONTACT_EMAIL,
	FACEBOOK_URL,
	INSTAGRAM_URL,
	SITE_URL,
	WHATSAPP_PHONE,
	YOUTUBE_URL,
} from "@/lib/constants";
import "./globals.css";

const organizationSchema = {
	"@context": "https://schema.org",
	"@type": "Organization",
	"@id": `${SITE_URL}#organization`,
	name: "Academia Panobianco Jardim Satélite",
	url: SITE_URL,
	logo: `${SITE_URL}/logo.webp`,
	sameAs: [INSTAGRAM_URL, FACEBOOK_URL, YOUTUBE_URL],
	contactPoint: {
		"@type": "ContactPoint",
		telephone: `+${WHATSAPP_PHONE}`,
		contactType: "customer service",
		email: CONTACT_EMAIL,
		areaServed: "BR",
		availableLanguage: "Portuguese",
	},
};

const websiteSchema = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	url: SITE_URL,
	name: "Academia Panobianco Jardim Satélite",
	publisher: { "@id": `${SITE_URL}#organization` },
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default:
      "Academia Panobianco Jardim Satélite | Musculação, Aulas Coletivas e Treino Personalizado em São José dos Campos",
    template: "%s | Academia Panobianco Jardim Satélite",
  },
  description:
    "Academia Panobianco Jardim Satélite oferece musculação, aulas coletivas, treino personalizado e avaliação física. Localizada na Av. Cidade Jardim, 391 - Jardim Satélite, São José dos Campos - SP, 12231-675.",
  keywords:
    "academia, musculação, aulas coletivas, treino personalizado, são josé dos campos, jardim satélite, academia panobianco, fitness, personal trainer",
  authors: [{ name: "Academia Panobianco Jardim Satélite" }],
  creator: "Academia Panobianco Jardim Satélite",
  publisher: "Academia Panobianco Jardim Satélite",
  robots: "index, follow",
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

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body>
        <GTMHead />
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <ThemeProvider>
          <IndicationProvider>
            <Header />
            <main className="min-h-screen pt-20">{children}</main>
            <Footer />
            <FloatingWhatsApp />
          </IndicationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
