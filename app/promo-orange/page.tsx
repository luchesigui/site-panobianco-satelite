import { Bebas_Neue, Montserrat, Roboto } from "next/font/google";
import { Check, Dumbbell, Music2, Users, Zap } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

import PlanCTAButton from "@/components/PlanCTAButton";
import { SITE_URL } from "@/lib/constants";

const bebasNeue = Bebas_Neue({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
});
const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	display: "swap",
});
const roboto = Roboto({
	subsets: ["latin"],
	weight: ["300", "400"],
	display: "swap",
});

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
			<section
				style={{
					backgroundImage: `url(${CDN}/69dd4cd32718b6cd476e4b1e_Header_Background-plano-orange.avif)`,
					backgroundPosition: "50%",
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					minHeight: "95vh",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					position: "relative",
					paddingTop: 40,
					paddingBottom: 40,
				}}
			>
				{/* Price tag — center of background photo */}
				<div
					style={{
						position: "absolute",
						left: "50%",
						top: 0,
						transform: "translateX(-50%)",
						pointerEvents: "none",
					}}
				>
					<Image
						src={`${CDN}/69dd4dc4ff04549510bc520a_selo-oferta.avif`}
						alt="R$ 0,99 no primeiro mês"
						width={180}
						height={200}
						unoptimized
					/>
				</div>

				{/* "PRIMEIRA VEZ PANOBIANCO" sticker — bottom-left */}
				<div
					style={{
						position: "absolute",
						bottom: "7rem",
						left: "10%",
						transform: "scale(1.5)",
						pointerEvents: "none",
					}}
				>
					<Image
						src={`${CDN}/69dd4dc45e2e9365f0ad294f_sticker-3%202.avif`}
						alt="Primeira vez Panobianco"
						width={150}
						height={150}
						unoptimized
					/>
				</div>

				{/* Text box — right side */}
				<div
					style={{
						display: "flex",
						justifyContent: "flex-end",
						width: "95%",
						maxWidth: 1200,
					}}
				>
					<div
						style={{
							width: "40%",
							minWidth: 320,
							display: "flex",
							flexDirection: "column",
							alignItems: "flex-start",
						}}
					>
						<h1
							className={bebasNeue.className}
							style={{
								color: "#fff",
								fontSize: "clamp(36px, 4.5vw, 70px)",
								lineHeight: "90%",
								margin: 0,
								padding: 0,
							}}
						>
							Faça parte da academia que mais cresce no Brasil.
						</h1>

						<p
							className={montserrat.className}
							style={{
								color: "#fff",
								fontSize: 20,
								lineHeight: "120%",
								maxWidth: 350,
								marginTop: 16,
								marginBottom: 0,
							}}
						>
							Contrate seu plano durante o mês de maio e garanta oferta
							exclusiva.
						</p>

						<PlanCTAButton
							plan="orange"
							href={CTA_HREF}
							destination="checkout"
							className={`${montserrat.className} inline-flex items-center justify-center rounded-[10px] bg-white text-[#ff6101] px-[30px] py-[15px] text-[16px] font-bold uppercase mt-[25px] mb-[24px] transition-all duration-200 hover:bg-[#f15927] hover:text-white hover:scale-[1.025] hover:shadow-[0_0_30px_0_#ff6101]`}
						>
							Ativar desconto agora
						</PlanCTAButton>

						<p
							className={roboto.className}
							style={{
								color: "rgba(255,255,255,0.85)",
								fontSize: 11,
								lineHeight: "150%",
								maxWidth: 400,
								margin: 0,
							}}
						>
							Oferta válida até 31/05/2026,{" "}
							<strong>exclusivamente para o Plano Orange Anual</strong>, sujeito
							à disponibilidade da unidade escolhida. Para matrículas
							realizadas no balcão ou outros canais, o valor promocional será
							de R$ 9,90 no primeiro mês do Plano Orange Anual recorrente. A
							partir da segunda mensalidade, o valor será de R$ 119,90/mês.
						</p>
					</div>
				</div>
			</section>

			{/* ── Plan Card Section ── */}
			<section
				id="plano-orange"
				style={{
					backgroundColor: "#fff",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					paddingBottom: 110,
					position: "relative",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						flexWrap: "wrap",
						justifyContent: "space-between",
						alignItems: "center",
						width: "95%",
						maxWidth: 1200,
					}}
				>
					{/* Left: gym image */}
					<div style={{ flex: "0 0 55%", maxWidth: "55%" }}>
						<Image
							src={`${CDN}/69dd37fcb95326a6f6a42a65_img-1-plano-orange.avif`}
							alt="Plano Orange Anual Panobianco"
							width={700}
							height={800}
							style={{ width: "100%", height: "auto", display: "block" }}
							priority
							unoptimized
						/>
					</div>

					{/* Right: plan card */}
					<div
						style={{
							flex: "0 0 40%",
							backgroundColor: "#fff",
							borderRadius: 20,
							padding: 32,
							boxShadow: "0 0 40px rgba(0,0,0,0.15)",
							position: "relative",
							zIndex: 2,
						}}
					>
						{/* Plan name */}
						<h2
							className={bebasNeue.className}
							style={{
								fontSize: 70,
								lineHeight: "85%",
								margin: 0,
								color: "#2a2f31",
							}}
						>
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
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									alignItems: "center",
									gap: 10,
									color: "#ff6101",
								}}
							>
								<span
									className={bebasNeue.className}
									style={{
										fontSize: 90,
										lineHeight: "80%",
										letterSpacing: -3,
										fontWeight: 700,
										color: "#ff6101",
									}}
								>
									R$ 0,99
								</span>
								<span
									className={montserrat.className}
									style={{
										fontSize: 24,
										maxWidth: 100,
										lineHeight: "80%",
										marginTop: 15,
										color: "#2a2f31",
										fontWeight: 600,
									}}
								>
									NA PRIMEIRA MENSALIDADE
								</span>
							</div>
							<p
								className={roboto.className}
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
							className={`${montserrat.className} flex w-full items-center justify-center rounded-[200px] bg-[#ff6101] text-white h-[50px] text-[18px] font-medium uppercase mt-[20px] transition-all duration-200 hover:scale-[1.025] hover:shadow-[0_0_15px_rgba(255,97,1,0.4)]`}
						>
							Matricule-se agora
						</PlanCTAButton>

						{/* Benefits: 2 columns */}
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								gap: 20,
								marginTop: 20,
							}}
						>
							{/* Col 1 */}
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									gap: 12,
								}}
							>
								{col1Benefits.map((item) => (
									<div
										key={item}
										className={roboto.className}
										style={{
											display: "flex",
											alignItems: "flex-start",
											gap: 6,
											maxWidth: 160,
											fontSize: 14,
											fontWeight: 300,
											color: "#2a2f31",
										}}
									>
										<Check
											size={16}
											color="#ff6101"
											style={{ flexShrink: 0, marginTop: 2 }}
										/>
										{item}
									</div>
								))}
							</div>
							{/* Col 2 */}
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									gap: 12,
								}}
							>
								{col2Benefits.map((item) => (
									<div
										key={item}
										className={roboto.className}
										style={{
											display: "flex",
											alignItems: "flex-start",
											gap: 6,
											maxWidth: 160,
											fontSize: 14,
											fontWeight: 300,
											color: "#2a2f31",
										}}
									>
										<Check
											size={16}
											color="#ff6101"
											style={{ flexShrink: 0, marginTop: 2 }}
										/>
										{item}
									</div>
								))}
							</div>
						</div>

						{/* Requirements */}
						<ul
							className={roboto.className}
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
						className={bebasNeue.className}
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

					<div
						style={{
							display: "flex",
							flexWrap: "wrap",
							justifyContent: "space-between",
							width: "100%",
							gap: 12,
						}}
					>
						{activities.map(({ label, src, icon }) => (
							<div
								key={label}
								style={{
									borderRadius: 30,
									width: "calc(25% - 9px)",
									minWidth: 140,
									position: "relative",
									overflow: "hidden",
									aspectRatio: "3/4",
								}}
							>
								<Image
									src={src}
									alt={label}
									fill
									style={{ objectFit: "cover" }}
									sizes="(max-width: 768px) 50vw, 25vw"
								/>
								{/* Dark gradient overlay */}
								<div
									style={{
										position: "absolute",
										inset: 0,
										background:
											"linear-gradient(to top, rgba(0,0,0,0.7) 30%, transparent 70%)",
									}}
								/>
								{/* Label at bottom */}
								<div
									className={montserrat.className}
									style={{
										position: "absolute",
										bottom: 24,
										left: 24,
										right: 24,
										color: "#fff",
										fontSize: 24,
										display: "flex",
										flexDirection: "column",
										gap: 8,
									}}
								>
									{icon}
									<span style={{ fontWeight: 600, lineHeight: "120%" }}>
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
				style={{ width: "100%", maxWidth: "none", marginBottom: -3, display: "block" }}
			/>

			{/* ── Gallery Section ── */}
			<section
				style={{
					backgroundColor: "#fff",
					paddingTop: 40,
					paddingBottom: 100,
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-start",
					alignItems: "center",
				}}
			>
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
							className={bebasNeue.className}
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
							className={montserrat.className}
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

					{/* Row 1 */}
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							width: "100%",
							gap: 6,
						}}
					>
						{galleryRow1.map(({ src, alt }) => (
							<div
								key={src + alt}
								style={{
									flex: 1,
									height: 220,
									borderRadius: 8,
									overflow: "hidden",
									position: "relative",
								}}
							>
								<Image
									src={src}
									alt={alt}
									fill
									style={{ objectFit: "cover" }}
									sizes="33vw"
									loading="lazy"
								/>
							</div>
						))}
					</div>

					{/* Row 2 */}
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							width: "100%",
							gap: 6,
							marginTop: 6,
						}}
					>
						{galleryRow2.map(({ src, alt }) => (
							<div
								key={src + alt}
								style={{
									flex: 1,
									height: 220,
									borderRadius: 8,
									overflow: "hidden",
									position: "relative",
								}}
							>
								<Image
									src={src}
									alt={alt}
									fill
									style={{ objectFit: "cover" }}
									sizes="33vw"
									loading="lazy"
								/>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
