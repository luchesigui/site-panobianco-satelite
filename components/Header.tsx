"use client";

import { Menu, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import Logo from "@/components/Logo";
import { trackQuizCtaClicked, trackWhatsappClicked } from "@/lib/analytics";
import { WHATSAPP_AULA_EXPERIMENTAL } from "@/lib/constants";

const navigation = [
	{ name: "Início", href: "/" },
	{ name: "Serviços", href: "/servicos" },
	{ name: "Aulas Coletivas", href: "/aulas-coletivas" },
	{ name: "Planos", href: "/planos" },
	{ name: "Blog", href: "/blog" },
	{ name: "Contato", href: "/contato" },
];

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-white/10 bg-pb-black/95 backdrop-blur-md">
			<div className="container-main flex h-full items-center justify-between">
				<Logo width={146} height={27} variant="light-on-dark" />

				<nav className="hidden items-center gap-8 md:flex">
					{navigation.map((item) => (
						<Link
							key={item.name}
							href={item.href}
							className="text-xs uppercase tracking-[0.08em] text-white transition-colors hover:text-pb-orange"
						>
							{item.name}
						</Link>
					))}
				</nav>

				<div className="flex items-center gap-4">
					<Link
						href={WHATSAPP_AULA_EXPERIMENTAL}
						className="botao-chanfrado-nav hidden items-center justify-center bg-pb-orange px-5 py-2.5 text-xs uppercase tracking-[0.08em] text-white transition-colors hover:bg-pb-orange-warm md:inline-flex"
						target="_blank"
						rel="noopener noreferrer"
						onClick={() =>
							trackWhatsappClicked("header_cta", "aula_experimental")
						}
					>
						Agendar aula experimental
					</Link>
				</div>

				<button
					type="button"
					className="p-2 text-white transition-colors hover:text-pb-orange md:hidden"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
				>
					{mobileMenuOpen ? (
						<X className="size-6" />
					) : (
						<Menu className="size-6" />
					)}
				</button>
			</div>

			{mobileMenuOpen && (
				<div className="border-t border-white/10 bg-pb-black md:hidden">
					<div className="container-main space-y-1 py-4">
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className="block px-4 py-2 text-xs uppercase tracking-[0.08em] text-white transition-colors hover:bg-white/5 hover:text-pb-orange"
								onClick={() => setMobileMenuOpen(false)}
							>
								{item.name}
							</Link>
						))}
						<Link
							href="/quiz"
							className="botao-chanfrado-nav mt-3 inline-flex w-full items-center justify-center gap-2 bg-pb-orange/20 px-5 py-3 text-xs uppercase tracking-[0.08em] text-white transition-colors hover:bg-pb-orange/25"
							onClick={() => {
								setMobileMenuOpen(false);
								trackQuizCtaClicked("header_mobile");
							}}
						>
							<Sparkles className="size-4" />
							Fazer o quiz (60s)
						</Link>
						<Link
							href={WHATSAPP_AULA_EXPERIMENTAL}
							className="botao-chanfrado mt-2 inline-flex w-full items-center justify-center bg-pb-orange px-5 py-3 text-xs uppercase tracking-[0.08em] text-white transition-colors hover:bg-pb-orange-warm"
							onClick={() => {
								setMobileMenuOpen(false);
								trackWhatsappClicked("header_cta", "aula_experimental");
							}}
							target="_blank"
							rel="noopener noreferrer"
						>
							Agendar aula experimental
						</Link>
					</div>
				</div>
			)}
		</header>
	);
}
