import type { Metadata } from "next";
import { Bebas_Neue, Montserrat, Roboto } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";

import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import { GTM_ID } from "@/components/GTM";
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
	"@type": "LocalBusiness",
	"@id": `${SITE_URL}#organization`,
	name: "Panobianco Jardim Satélite",
	alternateName: "Academia Panobianco Jardim Satélite",
	slogan: "Feitos de força e vontade.",
	description:
		"Um espaço para viver o movimento com acolhimento, comunidade e prazer. Musculação, aulas coletivas e treino personalizado na unidade Jardim Satélite, em São José dos Campos.",
	url: SITE_URL,
	logo: `${SITE_URL}/logo.webp`,
	priceRange: "$$",
	aggregateRating: {
		"@type": "AggregateRating",
		ratingValue: 4.9,
		reviewCount: 200,
		bestRating: 5,
		worstRating: 1,
	},
	openingHoursSpecification: [
		{
			"@type": "OpeningHoursSpecification",
			dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
			opens: "06:00",
			closes: "23:00",
		},
		{
			"@type": "OpeningHoursSpecification",
			dayOfWeek: "Saturday",
			opens: "08:00",
			closes: "18:00",
		},
		{
			"@type": "OpeningHoursSpecification",
			dayOfWeek: ["Sunday", "PublicHolidays"],
			opens: "09:00",
			closes: "13:00",
		},
	],
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
	name: "Panobianco Jardim Satélite",
	description: "Feitos de força e vontade.",
	publisher: { "@id": `${SITE_URL}#organization` },
};

// Hierarquia tipográfica oficial: Forma DJR Micro (Light / Regular / Bold).
const brandFont = localFont({
	src: [
		{
			path: "../public/fonts/FormaDJRMicro-Light.ttf",
			weight: "300",
			style: "normal",
		},
		{
			path: "../public/fonts/FormaDJRMicro-Regular.ttf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../public/fonts/FormaDJRMicro-Bold.ttf",
			weight: "700",
			style: "normal",
		},
	],
	variable: "--font-brand",
	display: "swap",
});

// Famílias legadas: consumidas exclusivamente por /promo-orange e HeroOrange.
// Não usar em superfícies novas — a marca 2026 é monotipográfica.
const bebasNeue = Bebas_Neue({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
	variable: "--font-bebas-neue",
});

const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	display: "swap",
	variable: "--font-montserrat",
});

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["300", "400"],
	display: "swap",
	variable: "--font-roboto",
});

export const metadata: Metadata = {
	title: {
		default: "Panobianco Jardim Satélite | Feitos de força e vontade",
		template: "%s | Panobianco Jardim Satélite",
	},
	description:
		"Estrutura moderna, equipamentos de ponta e ambiente acolhedor, no seu ritmo e do seu jeito. Fazemos do seu treino a melhor hora da rotina na unidade Jardim Satélite em São José dos Campos.",
	keywords:
		"academia, musculação, aulas coletivas, treino personalizado, são josé dos campos, jardim satélite, academia panobianco, fitness, feitos de força e vontade",
	authors: [{ name: "Panobianco Jardim Satélite" }],
	creator: "Panobianco Jardim Satélite",
	publisher: "Panobianco Jardim Satélite",
	robots: "index, follow",
	openGraph: {
		type: "website",
		locale: "pt_BR",
		siteName: "Panobianco Jardim Satélite",
		title: "Panobianco Jardim Satélite | Feitos de força e vontade",
		description:
			"Estrutura moderna, equipamentos de ponta e ambiente acolhedor, no seu ritmo e do seu jeito. Unidade Jardim Satélite.",
	},
	twitter: {
		card: "summary_large_image",
		title: "Panobianco Jardim Satélite | Feitos de força e vontade",
		description:
			"Estrutura moderna, equipamentos de ponta e ambiente acolhedor, no seu ritmo e do seu jeito. Unidade Jardim Satélite.",
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
		<html
			lang="pt-BR"
			className={`${brandFont.variable} ${bebasNeue.variable} ${montserrat.variable} ${roboto.variable}`}
		>
			<head>
				<link rel="preconnect" href="https://cdn.prod.website-files.com" />
				<link rel="dns-prefetch" href="https://cdn.prod.website-files.com" />
				<link rel="preconnect" href="https://www.googletagmanager.com" />
				<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
				<Script
					id="gtm-script"
					strategy="lazyOnload"
					dangerouslySetInnerHTML={{
						__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
					}}
				/>
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
