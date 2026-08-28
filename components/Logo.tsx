"use client";

import Image from "next/image";
import Link from "next/link";

import { useTheme } from "../contexts/ThemeContext";

interface LogoProps {
	className?: string;
	width?: number;
	height?: number;
	showLink?: boolean;
}

export default function Logo({
	className = "h-10 md:h-11 w-auto",
	width = 168,
	height = 44,
	showLink = true,
}: LogoProps) {
	const { theme } = useTheme();

	// Use white SVG for dark surfaces / dark theme, black SVG for light theme
	const logoSrc = theme === "light" ? "/logo-black.svg" : "/logo-white.svg";

	const logoImage = (
		<Image
			src={logoSrc}
			alt="Academia Panobianco"
			width={width}
			height={height}
			className={className}
			priority
		/>
	);

	if (showLink) {
		return (
			<Link href="/" className="flex items-center">
				{logoImage}
			</Link>
		);
	}

	return logoImage;
}
