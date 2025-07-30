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
  className = "h-10 w-auto",
  width = 120,
  height = 40,
  showLink = true,
}: LogoProps) {
  const { theme } = useTheme();

  // Use logo-dark.png for light theme, logo.png for dark theme
  const logoSrc = theme === "light" ? "/logo-dark.png" : "/logo.png";

  const logoImage = (
    <Image
      src={logoSrc}
      alt="Academia Panobianco"
      width={width}
      height={height}
      className={className}
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
