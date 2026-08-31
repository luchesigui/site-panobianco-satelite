"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

import { trackWhatsappClicked } from "@/lib/analytics";
import { WHATSAPP_URL } from "@/lib/constants";

export default function FloatingWhatsApp() {
	const pathname = usePathname();

	// Hide floating WhatsApp button on Sorteio page for clean recording layout
	if (pathname === "/sorteio") {
		return null;
	}

	return (
		<a
			href={WHATSAPP_URL}
			target="_blank"
			rel="noopener noreferrer"
			onClick={() => trackWhatsappClicked("floating_button", "support")}
			className="floating-whatsapp-btn shape-octagon-regular fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center bg-pb-orange text-white transition-colors hover:bg-pb-orange-warm md:hidden"
			aria-label="Abrir WhatsApp"
		>
			<MessageCircle className="size-7" />
		</a>
	);
}
