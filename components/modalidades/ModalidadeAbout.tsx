import { CheckCircle } from "lucide-react";
import Image from "next/image";

export type ModalidadeAboutProps = {
	title: string;
	titleHighlight?: string;
	paragraphs: string[];
	featureCard?: {
		title: string;
		items: string[];
	};
	accentClass: string;
	imageSrc?: string | string[];
	imageAlt?: string;
	statCard?: { value: string; label: string };
	imagePosition?: "left" | "right";
	checklist?: string[];
};

export default function ModalidadeAbout({
	title,
	titleHighlight,
	paragraphs,
	featureCard,
	accentClass,
	imageSrc,
	imageAlt,
	statCard,
	imagePosition = "right",
	checklist,
}: ModalidadeAboutProps) {
	const isImageArray = Array.isArray(imageSrc);

	return (
		<section className="py-24 bg-background-dark overflow-hidden">
			<div className="container-main">
				<div
					className={`grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center ${imagePosition === "left" ? "lg:direction-rtl" : ""}`}
				>
					<div
						className={`space-y-6 ${imagePosition === "left" ? "lg:order-2" : "lg:order-1"}`}
					>
						<h2 className="text-4xl font-black mb-8 leading-tight text-white md:text-5xl">
							{title}
							{titleHighlight && (
								<>
									{" "}
									<span className="text-primary-500">{titleHighlight}</span>
								</>
							)}
						</h2>
						{imagePosition === "right" && (
							<div className="h-1.5 w-20 rounded-full bg-primary-500 mb-8" />
						)}
						<div className="space-y-6 text-white/70 text-lg leading-relaxed">
							{paragraphs.map((p) => (
								<p key={p.slice(0, 50)}>{p}</p>
							))}
						</div>

						{checklist && (
							<ul className="space-y-3 mt-8">
								{checklist.map((item) => (
									<li key={item} className="flex items-center gap-3">
										<CheckCircle
											className="size-6 shrink-0 text-primary-500"
											aria-hidden
										/>
										<span className="text-white/90 font-medium">{item}</span>
									</li>
								))}
							</ul>
						)}

						{imageSrc && featureCard && (
							<ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
								{featureCard.items.map((item) => (
									<li
										key={item}
										className="flex items-center gap-3 font-medium text-white/90"
									>
										<span
											className={`size-2 shrink-0 rounded-full ${accentClass}`}
										/>
										{item}
									</li>
								))}
							</ul>
						)}
					</div>

					<div
						className={`relative ${imagePosition === "left" ? "lg:order-1" : "lg:order-2"}`}
					>
						{imageSrc && !isImageArray && (
							<>
								<div className="aspect-square overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
									<Image
										src={imageSrc as string}
										alt={imageAlt ?? ""}
										width={600}
										height={600}
										className="h-full w-full object-cover"
									/>
								</div>
								{statCard && (
									<div className="absolute -bottom-6 -left-6 bg-background-dark border border-white/10 p-6 rounded-xl shadow-2xl hidden md:block">
										<p className="text-primary-500 text-3xl font-black">
											{statCard.value}
										</p>
										<p className="text-xs font-bold uppercase tracking-widest text-white/50">
											{statCard.label}
										</p>
									</div>
								)}
							</>
						)}

						{!imageSrc && statCard && (
							<>
								<div
									className={`aspect-square rounded-3xl border border-white/10 shadow-2xl ${accentClass} opacity-30`}
									aria-hidden
								/>
								<div className="absolute -bottom-6 -left-6 bg-background-dark border border-white/10 p-6 rounded-xl shadow-2xl hidden md:block">
									<p className="text-primary-500 text-3xl font-black">
										{statCard.value}
									</p>
									<p className="text-xs font-bold uppercase tracking-widest text-white/50">
										{statCard.label}
									</p>
								</div>
							</>
						)}

						{isImageArray && (
							<div className="grid grid-cols-2 gap-4">
								{(imageSrc as string[]).map((src, idx) => (
									<div
										key={src}
										className={`aspect-[3/4] rounded-xl overflow-hidden ${idx === 0 ? "mt-8" : ""}`}
									>
										<Image
											src={src}
											alt={imageAlt ?? ""}
											width={400}
											height={600}
											className="h-full w-full object-cover"
										/>
									</div>
								))}
							</div>
						)}

						{!imageSrc && featureCard && (
							<div className="glass-card rounded-2xl p-8">
								<h3 className="mb-4 text-xl font-bold text-white">
									{featureCard.title}
								</h3>
								<ul className="space-y-3">
									{featureCard.items.map((item) => (
										<li
											key={item}
											className="flex items-center gap-3 text-gray-400"
										>
											<div className={`size-2 rounded-full ${accentClass}`} />
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
