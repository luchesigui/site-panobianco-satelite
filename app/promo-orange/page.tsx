import { Check, Dumbbell, Music2, Users, Zap } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import PlanCTAButton from "@/components/PlanCTAButton";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
	title: "Promoção Orange | Panobianco Jardim Satélite",
	description:
		"Primeira mensalidade por R$ 0,99. Orange Anual com acesso completo à academia. Válido até 31/05.",
	alternates: { canonical: "/promo-orange" },
	robots: "noindex, nofollow",
};

const CDN = "https://cdn.prod.website-files.com/67ec66139f8f56d61a1cd4c9";
const CTA_HREF = "/checkout/orange";

const col1Benefits = [
	"5 convidados por mês",
	"4 acessos às unidades Panobianco",
	"Sem taxa de matrícula",
];
const col2Benefits = [
	"Aplicativo Panobianco",
	"Avaliação gratuita",
	"Aulas coletivas",
];
const requirements = [
	"Fidelidade 12 meses",
	"Pagamento recorrente mensal",
	"Exclusivo para matrículas online",
];

const activities = [
	{
		label: "Aulas coletivas",
		src: "/images/modalidades/aulas-coletivas.webp",
		icon: <Users size={24} />,
	},
	{
		label: "Cardio",
		src: "/images/servicos.webp",
		icon: <Zap size={24} />,
	},
	{
		label: "Musculação",
		src: "/images/modalidades/musculacao.webp",
		icon: <Dumbbell size={24} />,
	},
	{
		label: "FitDance",
		src: "/images/aulas-coletivas/fitdance/fitdance.webp",
		icon: <Music2 size={24} />,
	},
];

const galleryRow1 = [
	{ src: "/images/fachada.webp", alt: "Fachada Panobianco Jardim Satélite" },
	{ src: "/images/servicos.webp", alt: "Área de serviços" },
	{ src: "/images/sala-aulas.png", alt: "Sala de aulas coletivas" },
];
const galleryRow2 = [
	{ src: "/images/cardio.png", alt: "Área de cardio" },
	{ src: "/images/musculacao-2.png", alt: "Sala de musculação" },
	{ src: "/images/vestiario.png", alt: "Vestiário" },
];

const offerSchema = {
	"@context": "https://schema.org",
	"@type": "Offer",
	name: "Orange Anual — Primeira mensalidade R$ 0,99",
	price: 0.99,
	priceCurrency: "BRL",
	url: `${SITE_URL}/promo-orange`,
	availability: "https://schema.org/InStock",
	validThrough: "2026-05-31",
};

export default function PromoOrange() {
	return (
		<div style={{ backgroundColor: "#2a2f31" }} className="overflow-x-hidden">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }}
			/>

			{/* ── Hero ── */}
			<section className="pt-20 pb-28 px-4 md:py-10 flex flex-col items-center justify-center relative min-h-[75vh] md:min-h-[95vh]">
				<Image
					src={`${CDN}/69dd4cd32718b6cd476e4b1e_Header_Background-plano-orange.avif`}
					alt="Fundo Plano Orange"
					fill
					priority
					unoptimized
					className="absolute inset-0 object-cover -z-10"
					sizes="100vw"
				/>
				{/* Price tag — center of background photo (desktop only) */}
				<div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none z-10">
					<Image
						src={`${CDN}/69dd4dc4ff04549510bc520a_selo-oferta.avif`}
						alt="R$ 0,99 no primeiro mês"
						width={180}
						height={200}
						quality={75}
					/>
				</div>

				{/* Price tag — top center hanging over next section (mobile only) */}
				<div
					className="md:hidden absolute pointer-events-none z-10"
					style={{ top: 0, left: "5%" }}
				>
					<Image
						src={`${CDN}/69dd4dc4ff04549510bc520a_selo-oferta.avif`}
						alt="R$ 0,99 no primeiro mês"
						width={140}
						height={160}
						quality={75}
					/>
				</div>

				{/* "PRIMEIRA VEZ PANOBIANCO" sticker — bottom-left on desktop */}
				<div className="hidden md:block absolute bottom-[7rem] left-[10%] scale-150 pointer-events-none">
					<Image
						src={`${CDN}/69dd4dc45e2e9365f0ad294f_sticker-3%202.avif`}
						alt="Primeira vez Panobianco"
						width={150}
						height={150}
						quality={75}
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

			{/* ── Plan Card Section ── */}
			<section
				id="plano-orange"
				className="bg-white flex flex-col items-center justify-center pb-16 md:pb-28 relative"
			>
				<div className="flex flex-col md:flex-row items-center justify-between w-[95%] max-w-[1200px] gap-8 md:gap-0">
					{/* Left: gym image */}
					<div className="w-full md:w-[55%] md:max-w-[55%]">
						<Image
							src={`${CDN}/69dd37fcb95326a6f6a42a65_img-1-plano-orange.avif`}
							alt="Plano Orange Anual Panobianco"
							width={700}
							height={800}
							className="w-full h-auto block"
							sizes="(max-width: 768px) 95vw, (max-width: 1200px) 55vw, 660px"
							priority
							quality={75}
						/>
					</div>

					{/* Right: plan card */}
					<div
						className="w-full md:w-[40%] bg-white rounded-[20px] p-6 md:p-8 relative z-[2]"
						style={{
							boxShadow: "0 0 40px rgba(0,0,0,0.15)",
						}}
					>
						{/* Plan name */}
						<h2 className="font-bebas text-[50px] md:text-[70px] leading-[85%] margin-0 text-[#2a2f31]">
							Orange Anual
						</h2>

						{/* Price block */}
						<div
							style={{
								borderTop: "1px solid rgba(0,0,0,0.25)",
								borderBottom: "1px solid rgba(0,0,0,0.25)",
								width: "100%",
								marginTop: 10,
								paddingTop: 30,
								paddingBottom: 20,
							}}
						>
							<div className="flex flex-row items-center gap-[10px] text-[#ff6101]">
								<span className="font-bebas text-[60px] xs:text-[75px] sm:text-[90px] leading-[80%] tracking-[-3px] font-bold text-[#ff6101]">
									R$ 0,99
								</span>
								<span className="text-[16px] xs:text-[20px] sm:text-[24px] max-w-[140px] xs:max-w-[120px] sm:max-w-[100px] leading-[100%] xs:leading-[90%] sm:leading-[80%] sm:mt-[15px] text-[#2a2f31] font-semibold">
									NA PRIMEIRA MENSALIDADE
								</span>
							</div>
							<p
								className="font-roboto"
								style={{
									color: "#ff6101",
									fontStyle: "italic",
									fontSize: 14,
									fontWeight: 300,
									margin: "8px 0 0",
								}}
							>
								*R$ 119,90 a partir da segunda mensalidade
							</p>
						</div>

						{/* CTA */}
						<PlanCTAButton
							plan="orange"
							href={CTA_HREF}
							destination="checkout"
							className="font-montserrat flex w-full items-center justify-center rounded-[200px] bg-[#ff6101] text-white h-[50px] text-[18px] font-medium uppercase mt-[20px] transition-all duration-200 hover:scale-[1.025] hover:shadow-[0_0_15px_rgba(255,97,1,0.4)]"
						>
							Matricule-se agora
						</PlanCTAButton>

						{/* Quiz discreto */}
						<p
							className="font-roboto mt-3 text-center text-xs"
							style={{ color: "rgba(255,255,255,0.6)" }}
						>
							Ainda em dúvida?{" "}
							<Link
								href="/quiz"
								className="underline transition-colors hover:text-[#ff6101]"
								style={{ color: "#ff6101" }}
							>
								Faça o quiz e descubra se o Orange Anual é pra você
							</Link>
						</p>

						{/* Benefits: 2 columns */}
						<div className="flex flex-row gap-4 sm:gap-5 mt-5 justify-between w-full">
							{/* Col 1 */}
							<div className="flex flex-col gap-3">
								{col1Benefits.map((item) => (
									<div
										key={item}
										className="font-roboto flex items-start gap-1.5 max-w-[135px] sm:max-w-[160px] text-[13px] sm:text-[14px] font-light text-[#2a2f31]"
									>
										<Check
											size={16}
											color="#ff6101"
											className="flex-shrink-0 mt-0.5"
										/>
										{item}
									</div>
								))}
							</div>
							{/* Col 2 */}
							<div className="flex flex-col gap-3">
								{col2Benefits.map((item) => (
									<div
										key={item}
										className="font-roboto flex items-start gap-1.5 max-w-[135px] sm:max-w-[160px] text-[13px] sm:text-[14px] font-light text-[#2a2f31]"
									>
										<Check
											size={16}
											color="#ff6101"
											className="flex-shrink-0 mt-0.5"
										/>
										{item}
									</div>
								))}
							</div>
						</div>

						{/* Requirements */}
						<ul
							className="font-roboto"
							style={{
								color: "#a7a7a7",
								fontSize: 12,
								marginTop: 32,
								paddingLeft: 16,
								lineHeight: "160%",
							}}
						>
							{requirements.map((req) => (
								<li key={req}>{req}</li>
							))}
						</ul>
					</div>
				</div>
			</section>

			{/* ── Activities Section ── */}
			<section
				style={{
					backgroundImage: `linear-gradient(180deg, transparent 85%, #2a2f31), url(${CDN}/68fa562f6851979a6b2c2854_BG_PATERN.svg), radial-gradient(circle farthest-corner at 50% 100%, #ff6101, #2a2f31 72%)`,
					backgroundPosition: "0 0, 50% 100%, 0 0",
					backgroundRepeat: "repeat, no-repeat, repeat",
					backgroundSize: "auto, cover, auto",
					paddingTop: 100,
					paddingBottom: 100,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<div style={{ width: "95%", maxWidth: 1200 }}>
					<h2
						className="font-bebas"
						style={{
							color: "#fff",
							textAlign: "center",
							fontSize: "clamp(40px, 5vw, 72px)",
							lineHeight: "85%",
							marginTop: 0,
							marginBottom: 60,
						}}
					>
						O treino que você procura,{" "}
						<span style={{ color: "#ff6101" }}>aqui tem!</span>
					</h2>

					<div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full">
						{activities.map(({ label, src, icon }) => (
							<div
								key={label}
								className="w-full aspect-[3/4] rounded-[20px] md:rounded-[30px] relative overflow-hidden"
							>
								<Image
									src={src}
									alt={label}
									fill
									className="object-cover"
									sizes="(max-width: 768px) 50vw, 25vw"
									quality={75}
								/>
								{/* Dark gradient overlay */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
								{/* Label at bottom */}
								<div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 text-white flex flex-col gap-2">
									{icon}
									<span className="font-semibold text-[15px] xs:text-[18px] md:text-2xl leading-tight">
										{label}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── Decorative SVG Curve ── */}
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={`${CDN}/69dd2248d3b853b2e0acfa9f_BG-curva-1-ambiente.svg`}
				alt=""
				aria-hidden="true"
				style={{
					width: "100%",
					maxWidth: "none",
					marginBottom: -3,
					display: "block",
				}}
			/>

			{/* ── Gallery Section ── */}
			<section className="bg-white py-10 md:py-20 flex flex-col justify-start items-center">
				<div style={{ width: "95%", maxWidth: 1200 }}>
					{/* Heading row */}
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							width: "100%",
							marginBottom: 60,
							flexWrap: "wrap",
							gap: 20,
						}}
					>
						<h2
							className="font-bebas"
							style={{
								color: "#2a2f31",
								fontSize: "clamp(36px, 4vw, 56px)",
								lineHeight: "90%",
								maxWidth: 480,
								margin: 0,
							}}
						>
							Treine com qualidade em{" "}
							<strong style={{ color: "#ff6101" }}>um ambiente completo</strong>
						</h2>
						<a
							href="#plano-orange"
							className="font-montserrat"
							style={{
								backgroundColor: "#ff6101",
								color: "#fff",
								borderRadius: 10,
								padding: "10px 25px",
								fontSize: 16,
								textTransform: "uppercase",
								textDecoration: "none",
								display: "flex",
								alignItems: "center",
								gap: 20,
								transition: "all .2s ease-in-out",
								flexShrink: 0,
								fontWeight: 600,
							}}
						>
							Matricule-se agora
						</a>
					</div>

					{/* Responsive Grid replacing Row 1 and Row 2 */}
					<div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full">
						{[...galleryRow1, ...galleryRow2].map(({ src, alt }) => (
							<div
								key={src + alt}
								className="relative h-[140px] sm:h-[180px] md:h-[220px] rounded-lg overflow-hidden"
							>
								<Image
									src={src}
									alt={alt}
									fill
									className="object-cover"
									sizes="(max-width: 768px) 50vw, 33vw"
									loading="lazy"
									quality={75}
								/>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
