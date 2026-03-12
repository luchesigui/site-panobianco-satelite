import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { IndicationProvider } from "@/contexts/IndicationContext";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
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
	return (
		<html lang="pt-BR" className={inter.variable}>
			<head />
			<body>
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
