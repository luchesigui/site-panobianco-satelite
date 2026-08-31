"use client";

import Image from "next/image";
import Link from "next/link";

import { useTheme } from "../contexts/ThemeContext";

/**
 * Variantes aprovadas da assinatura horizontal (símbolo "soquinho" +
 * PANOBIANCO). O manual 2026 permite a marca em negativo, positivo e no
 * laranja protagonista — nunca em outra cor, com contorno, sombra ou
 * gradiente.
 */
export type LogoVariant = "auto" | "light-on-dark" | "dark-on-light" | "orange";

const LOGO_SRC: Record<Exclude<LogoVariant, "auto">, string> = {
	"light-on-dark": "/logo-white.svg",
	"dark-on-light": "/logo-black.svg",
	orange: "/logo-orange.svg",
};

interface LogoProps {
	className?: string;
	width?: number;
	height?: number;
	showLink?: boolean;
	/** Fundo sobre o qual a marca é aplicada. `auto` segue o tema do site. */
	variant?: LogoVariant;
	priority?: boolean;
}

export default function Logo({
	className = "",
	width = 146,
	height = 27,
	showLink = true,
	variant = "auto",
	priority = true,
}: LogoProps) {
	const { theme } = useTheme();

	const resolvedVariant =
		variant === "auto"
			? theme === "light"
				? "dark-on-light"
				: "light-on-dark"
			: variant;

	const logoImage = (
		<Image
			src={LOGO_SRC[resolvedVariant]}
			alt="Panobianco"
			width={width}
			height={height}
			className={className}
			priority={priority}
		/>
	);

	// Área de arejamento regulamentar: nenhum elemento invade a faixa
	// equivalente a 1/4 da altura da marca em torno dela.
	const clearSpace = { padding: `${Math.round(height / 4)}px 0` };

	if (showLink) {
		return (
			<Link href="/" className="flex items-center" style={clearSpace}>
				{logoImage}
			</Link>
		);
	}

	return (
		<span className="flex items-center" style={clearSpace}>
			{logoImage}
		</span>
	);
}
