"use client";

import { usePathname } from "next/navigation";

import FloatingWhatsApp from "./FloatingWhatsApp";
import Footer from "./Footer";
import Header from "./Header";

export default function LayoutWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const isMemberArea = pathname?.startsWith("/area-membro");

	if (isMemberArea) {
		return <main className="min-h-screen bg-background-dark">{children}</main>;
	}

	return (
		<>
			<Header />
			<main className="min-h-screen pt-20">{children}</main>
			<Footer />
			<FloatingWhatsApp />
		</>
	);
}
