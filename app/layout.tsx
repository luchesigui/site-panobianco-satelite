import type { Metadata } from "next";
import { Inter } from "next/font/google";

import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { IndicationProvider } from "@/contexts/IndicationContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./globals.css";

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
	const gtmScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-54RZX6VV');`;

	return (
		<html lang="pt-BR" className={inter.variable}>
			<head>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: GTM requires inline script in head */}
				<script dangerouslySetInnerHTML={{ __html: gtmScript }} />
			</head>
			<body>
				<noscript>
					<iframe
						src="https://www.googletagmanager.com/ns.html?id=GTM-54RZX6VV"
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
