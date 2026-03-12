"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import Logo from "@/components/Logo";
import { WHATSAPP_AULA_EXPERIMENTAL } from "@/lib/constants";

const navigation = [
	{ name: "Início", href: "/" },
	{ name: "Serviços", href: "/servicos" },
	{ name: "Aulas Coletivas", href: "/aulas-coletivas" },
	{ name: "Planos", href: "/planos" },
	{ name: "Contato", href: "/contato" },
];

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-white/10 bg-background-dark backdrop-blur-md">
			<div className="container-main flex h-full items-center justify-between">
				<Logo className="h-12 w-auto" width={150} height={48} />

				<nav className="hidden items-center gap-8 md:flex">
					{navigation.map((item) => (
						<Link
							key={item.name}
							href={item.href}
							className="text-sm font-medium text-white transition-colors hover:text-primary-500"
						>
							{item.name}
						</Link>
					))}
				</nav>

				<div className="flex items-center gap-4">
					<Link
						href={WHATSAPP_AULA_EXPERIMENTAL}
						className="hidden items-center justify-center rounded-full bg-primary-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary-500/20 transition-all hover:bg-primary-500/90 md:inline-flex"
						target="_blank"
						rel="noopener noreferrer"
					>
						Agendar Aula Experimental
					</Link>
				</div>

				<button
					type="button"
					className="rounded-md p-2 text-white transition-colors hover:text-primary-500 md:hidden"
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
				<div className="border-t border-white/10 bg-background-dark md:hidden">
					<div className="container-main space-y-1 py-4">
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className="block rounded-md px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/5 hover:text-primary-500"
								onClick={() => setMobileMenuOpen(false)}
							>
								{item.name}
							</Link>
						))}
						<Link
							href={WHATSAPP_AULA_EXPERIMENTAL}
							className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-primary-500 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-500/90"
							onClick={() => setMobileMenuOpen(false)}
							target="_blank"
							rel="noopener noreferrer"
						>
							Agendar Aula Experimental
						</Link>
					</div>
				</div>
			)}
		</header>
	);
}
