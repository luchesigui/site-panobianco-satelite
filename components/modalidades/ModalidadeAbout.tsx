import { Check } from "lucide-react";
import Image from "next/image";

export type ModalidadeAboutProps = {
	title: string;
	titleHighlight?: string;
	paragraphs: string[];
	featureCard?: {
		title: string;
		items: string[];
	};
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
	imageSrc,
	imageAlt,
	statCard,
	imagePosition = "right",
	checklist,
}: ModalidadeAboutProps) {
	const images = imageSrc
		? Array.isArray(imageSrc)
			? imageSrc
			: [imageSrc]
		: [];
	const hasImage = images.length > 0;

	return (
		// Mesma construção da seção "Por que treinar" da home: dois níveis
		// hexagonais colados, foto de um lado e bloco laranja do outro.
		<section className="overflow-hidden bg-pb-off-white py-20 lg:py-28">
			<div className="container-main">
				<div className="flex flex-col lg:flex-row">
					{hasImage && (
						<div
							className={`relative min-h-[420px] lg:w-1/2 ${
								imagePosition === "left" ? "lg:order-1" : "lg:order-2"
							}`}
						>
							{images.length === 1 ? (
								<div className="shape-chanfrado relative size-full min-h-[420px]">
									<Image
										src={images[0]}
										alt={imageAlt ?? ""}
										fill
										sizes="(max-width: 992px) 100vw, 50vw"
										className="object-cover"
									/>
								</div>
							) : (
								<div className="grid size-full grid-cols-2 gap-4">
									{images.map((src) => (
										<div
											key={src}
											className="shape-chanfrado relative min-h-[420px]"
										>
											<Image
												src={src}
												alt={imageAlt ?? ""}
												fill
												sizes="(max-width: 992px) 50vw, 25vw"
												className="object-cover"
											/>
										</div>
									))}
								</div>
							)}
						</div>
					)}

					<div
						className={`shape-chanfrado bg-pb-orange px-12 py-12 text-white lg:py-20 ${
							hasImage
								? `lg:w-1/2 ${imagePosition === "left" ? "lg:order-2" : "lg:order-1"}`
								: "w-full"
						}`}
					>
						<h2 className="mb-8 text-[3.5rem] leading-none tracking-tight">
							{title}
							{titleHighlight && <> {titleHighlight}</>}
						</h2>

						<div className="space-y-6 text-[1.5rem] leading-tight text-white/90">
							{paragraphs.map((p) => (
								<p key={p.slice(0, 50)}>{p}</p>
							))}
						</div>

						{checklist && (
							<ul className="mt-8 space-y-4">
								{checklist.map((item) => (
									<li key={item} className="flex items-start gap-4">
										<span className="shape-octagon-regular flex size-8 shrink-0 items-center justify-center bg-white/20 text-white">
											<Check className="size-4" />
										</span>
										<span>{item}</span>
									</li>
								))}
							</ul>
						)}

						{featureCard && (
							<div className="mt-10">
								<h3 className="mb-4 text-[1.5rem] leading-tight tracking-tight">
									{featureCard.title}
								</h3>
								<ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
									{featureCard.items.map((item) => (
										<li key={item} className="flex items-center gap-3">
											<span className="shape-octagon-regular size-2 shrink-0 bg-white" />
											{item}
										</li>
									))}
								</ul>
							</div>
						)}

						{statCard && (
							<p className="mt-10 leading-none">
								<span className="text-[3rem]">{statCard.value}</span>{" "}
								<span className="text-xs uppercase tracking-widest text-white/80">
									{statCard.label}
								</span>
							</p>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
