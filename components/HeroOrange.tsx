"use client";

import { useEffect, useState } from "react";
import PlanCTAButton from "./PlanCTAButton";

interface HeroOrangeProps {
	CDN: string;
	CTA_HREF: string;
}

export default function HeroOrange({ CDN, CTA_HREF }: HeroOrangeProps) {
	const [bgLoaded, setBgLoaded] = useState(false);

	useEffect(() => {
		// Preload the background image asynchronously in the browser
		const img = new Image();
		img.src = `/_next/image?url=${encodeURIComponent(`${CDN}/69dd4cd32718b6cd476e4b1e_Header_Background-plano-orange.avif`)}&w=1080&q=65`;
		img.onload = () => setBgLoaded(true);
	}, [CDN]);

	return (
		<section className="pt-20 pb-28 px-4 md:py-10 flex flex-col items-center justify-center relative isolate min-h-[75vh] md:min-h-[95vh]">
			{/* biome-ignore lint/performance/noImgElement: manually optimized raw img tag for background asynchronously fading in */}
			<img
				src={`/_next/image?url=${encodeURIComponent(`${CDN}/69dd4cd32718b6cd476e4b1e_Header_Background-plano-orange.avif`)}&w=1920&q=65`}
				srcSet={`/_next/image?url=${encodeURIComponent(`${CDN}/69dd4cd32718b6cd476e4b1e_Header_Background-plano-orange.avif`)}&w=640&q=65 640w, /_next/image?url=${encodeURIComponent(`${CDN}/69dd4cd32718b6cd476e4b1e_Header_Background-plano-orange.avif`)}&w=1080&q=65 1080w, /_next/image?url=${encodeURIComponent(`${CDN}/69dd4cd32718b6cd476e4b1e_Header_Background-plano-orange.avif`)}&w=1920&q=65 1920w`}
				sizes="100vw"
				alt="Fundo Plano Orange"
				className="absolute inset-0 w-full h-full object-cover -z-10 transition-opacity duration-700 ease-in-out"
				style={{ opacity: bgLoaded ? 1 : 0 }}
				loading="lazy"
			/>
			{!bgLoaded && (
				// Flat dark background during loading phase to prevent FOUC / flash of white
				<div className="absolute inset-0 bg-[#2a2f31] -z-20 w-full h-full" />
			)}
			<noscript>
				{/* biome-ignore lint/performance/noImgElement: SEO and JS-disabled browsers fallback */}
				<img
					src={`${CDN}/69dd4cd32718b6cd476e4b1e_Header_Background-plano-orange.avif`}
					alt="Fundo Plano Orange"
					className="absolute inset-0 w-full h-full object-cover -z-10"
				/>
			</noscript>

			{/* Price tag — center of background photo (desktop only) */}
			<div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none z-10">
				{/* biome-ignore lint/performance/noImgElement: manually optimized raw img tag for small width matching */}
				<img
					src={`/_next/image?url=${encodeURIComponent(`${CDN}/69dd4dc4ff04549510bc520a_selo-oferta.avif`)}&w=256&q=60`}
					alt="R$ 0,99 no primeiro mês"
					width="180"
					height="200"
					loading="lazy"
				/>
			</div>

			{/* Price tag — bottom center hanging over next section (mobile only) */}
			<div
				className="md:hidden absolute pointer-events-none z-10"
				style={{ bottom: -280, left: "5%" }}
			>
				{/* biome-ignore lint/performance/noImgElement: manually optimized raw img tag for small mobile width matching */}
				<img
					src={`/_next/image?url=${encodeURIComponent(`${CDN}/69dd4dc4ff04549510bc520a_selo-oferta.avif`)}&w=128&q=60`}
					alt="R$ 0,99 no primeiro mês"
					width="140"
					height="160"
					loading="lazy"
				/>
			</div>

			{/* "PRIMEIRA VEZ PANOBIANCO" sticker — bottom-left on desktop */}
			<div className="hidden md:block absolute bottom-[7rem] left-[10%] scale-150 pointer-events-none">
				{/* biome-ignore lint/performance/noImgElement: manually optimized raw img tag for small width matching */}
				<img
					src={`/_next/image?url=${encodeURIComponent(`${CDN}/69dd4dc45e2e9365f0ad294f_sticker-3%202.avif`)}&w=256&q=60`}
					alt="Primeira vez Panobianco"
					width="150"
					height="150"
					loading="lazy"
				/>
			</div>

			{/* Text box — right side */}
			<div className="relative z-10 flex justify-start md:justify-end w-[95%] max-w-[1200px]">
				<div className="w-full md:w-[40%] flex flex-col items-center md:items-start text-center md:text-left min-h-[460px] sm:min-h-[400px] md:min-h-[380px]">
					<h1
						className="font-bebas"
						style={{
							color: "#fff",
							fontSize: "clamp(36px, 4.5vw, 70px)",
							lineHeight: "90%",
							margin: 0,
							padding: 0,
							fontSizeAdjust: "cap-height from-font",
						}}
					>
						Faça parte da academia que mais cresce no Brasil.
					</h1>

					<p
						className="font-montserrat"
						style={{
							color: "#fff",
							fontSize: 20,
							lineHeight: "120%",
							maxWidth: 350,
							marginTop: 16,
							marginBottom: 0,
							fontSizeAdjust: "from-font",
						}}
					>
						Contrate seu plano durante o mês de maio e garanta oferta
						exclusiva.
					</p>

					<PlanCTAButton
						plan="orange"
						href={CTA_HREF}
						destination="checkout"
						className="font-montserrat inline-flex items-center justify-center rounded-[10px] bg-white text-[#ff6101] px-[30px] py-[15px] text-[16px] font-bold uppercase mt-[25px] mb-[24px] transition-all duration-200 hover:bg-[#f15927] hover:text-white hover:scale-[1.025] hover:shadow-[0_0_30px_0_#ff6101]"
					>
						Ativar desconto agora
					</PlanCTAButton>

					<p
						className="font-roboto"
						style={{
							color: "rgba(255,255,255,0.85)",
							fontSize: 11,
							lineHeight: "150%",
							maxWidth: 400,
							margin: 0,
							fontSizeAdjust: "from-font",
						}}
					>
						Oferta válida até 31/05/2026,{" "}
						<strong>exclusivamente para o Plano Orange Anual</strong>, sujeito
						à disponibilidade da unidade escolhida. Para matrículas realizadas
						no balcão ou outros canais, o valor promocional será de R$ 9,90 no
						primeiro mês do Plano Orange Anual recorrente. A partir da segunda
						mensalidade, o valor será de R$ 119,90/mês.
					</p>
				</div>
			</div>
		</section>
	);
}
