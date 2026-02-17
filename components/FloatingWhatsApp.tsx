"use client";

import { MessageCircle } from "lucide-react";

import { WHATSAPP_URL } from "@/lib/constants";

export default function FloatingWhatsApp() {
	return (
		<a
			href={WHATSAPP_URL}
			target="_blank"
			rel="noopener noreferrer"
			className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-primary-500 text-white shadow-2xl transition-transform hover:scale-110 md:hidden"
			aria-label="Abrir WhatsApp"
		>
			<MessageCircle className="size-7" />
		</a>
	);
}
