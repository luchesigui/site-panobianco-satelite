import { Facebook, Instagram, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
	CONTACT_EMAIL,
	FACEBOOK_URL,
	GOOGLE_MAPS_URL,
	INSTAGRAM_URL,
	PHONE_DISPLAY,
	WHATSAPP_AULA_EXPERIMENTAL,
	WHATSAPP_PHONE,
	WHATSAPP_URL,
	YOUTUBE_URL,
} from "@/lib/constants";

// Seta que acompanha cada link, como no rodapé da rede.
function ExternalArrow() {
	return (
		<span aria-hidden="true" className="ml-1 inline-block">
			↗
		</span>
	);
}

const linkColumns = [
	[
		{ label: "Sobre nós", href: "/sobre-nos" },
		{ label: "Aulas coletivas", href: "/aulas-coletivas" },
		{ label: "Serviços", href: "/servicos" },
		{ label: "Blog", href: "/blog" },
	],
	[
		{ label: "Planos", href: "/planos" },
		{ label: "Wellhub e parceiros", href: "/parceiros" },
		{ label: "Faça o quiz", href: "/quiz" },
		{ label: "Trabalhe conosco", href: "/trabalhe-conosco" },
	],
	[
		{ label: "Contato", href: "/contato" },
		{ label: "Área do aluno", href: "/area-do-aluno" },
		{ label: `WhatsApp: ${PHONE_DISPLAY}`, href: WHATSAPP_URL },
		{ label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
	],
];

const socials = [
	{ label: "Instagram", href: INSTAGRAM_URL, Icon: Instagram },
	{ label: "Facebook", href: FACEBOOK_URL, Icon: Facebook },
	{ label: "YouTube", href: YOUTUBE_URL, Icon: Youtube },
];

export default function Footer() {
	return (
		<footer className="overflow-hidden bg-pb-orange-warm text-white">
			<div className="container-main pt-20">
				{/* Chamadas de destaque */}
				<div className="flex flex-wrap gap-x-10 gap-y-3 text-[1.5rem] leading-tight">
					<Link
						href={GOOGLE_MAPS_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="transition-opacity hover:opacity-70"
					>
						Como chegar na unidade Jardim Satélite
						<ExternalArrow />
					</Link>
					<Link
						href={WHATSAPP_AULA_EXPERIMENTAL}
						target="_blank"
						rel="noopener noreferrer"
						className="transition-opacity hover:opacity-70"
					>
						Agendar aula experimental
						<ExternalArrow />
					</Link>
				</div>

				{/* Colunas de links + redes sociais */}
				<div className="mt-14 flex flex-col gap-10 lg:flex-row lg:justify-between">
					<div className="grid grid-cols-1 gap-x-12 gap-y-4 sm:grid-cols-3">
						{linkColumns.map((column) => (
							<ul key={column[0].label} className="space-y-4 text-sm">
								{column.map((item) => (
									<li key={item.label}>
										<Link
											href={item.href}
											className="transition-opacity hover:opacity-70"
										>
											{item.label}
											<ExternalArrow />
										</Link>
									</li>
								))}
							</ul>
						))}
					</div>

					<div className="flex items-start gap-5">
						{socials.map(({ label, href, Icon }) => (
							<a
								key={label}
								href={href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={label}
								className="transition-opacity hover:opacity-70"
							>
								<Icon className="size-5" />
							</a>
						))}
					</div>
				</div>

				{/* Assinatura legal */}
				<div className="mt-20 text-center text-xs leading-relaxed">
					<p suppressHydrationWarning>
						© {new Date().getFullYear()} Todos os direitos reservados.
					</p>
					<p>
						Panobianco Jardim Satélite · Av. Cidade Jardim, 391, São José dos
						Campos - SP, 12231-675 ·{" "}
						<a
							href={`tel:+${WHATSAPP_PHONE}`}
							className="transition-opacity hover:opacity-70"
						>
							{PHONE_DISPLAY}
						</a>
					</p>
				</div>
			</div>

			{/* Assinatura gráfica: o logotipo ocupa a largura inteira e é cortado
			    na base, como no rodapé da rede. */}
			<div className="mt-12 h-[15vw] min-h-[72px] overflow-hidden">
				<Image
					src="/logo-wordmark.svg"
					alt=""
					aria-hidden="true"
					width={657}
					height={129}
					className="w-full"
					unoptimized
				/>
			</div>
		</footer>
	);
}
