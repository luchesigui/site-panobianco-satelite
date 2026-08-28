import { Facebook, Instagram, Mail, MessageSquare, Phone } from "lucide-react";
import Link from "next/link";

import Logo from "@/components/Logo";
import {
	CONTACT_EMAIL,
	FACEBOOK_URL,
	INSTAGRAM_URL,
	PHONE_DISPLAY,
	WHATSAPP_PHONE,
	WHATSAPP_URL,
} from "@/lib/constants";

export default function Footer() {
	return (
		<footer className="pb-dark-surface border-t border-white/10 py-16 text-white">
			<div className="container-main">
				<div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4">
					<div className="md:col-span-2">
						<div className="mb-6">
							<Logo className="h-10 md:h-11 w-auto" width={168} height={44} />
						</div>
						<p className="mb-6 max-w-sm text-neutral-300">
							Feitos de força e vontade. Um espaço para viver o movimento com
							acolhimento, comunidade e prazer.
						</p>
						<div className="flex gap-4">
							<a
								href={INSTAGRAM_URL}
								className="glass-card flex size-10 items-center justify-center rounded-full transition-colors hover:bg-primary-500"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Instagram"
							>
								<Instagram className="size-5" />
							</a>
							<a
								href={FACEBOOK_URL}
								className="glass-card flex size-10 items-center justify-center rounded-full transition-colors hover:bg-primary-500"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Facebook"
							>
								<Facebook className="size-5" />
							</a>
						</div>
					</div>

					<div>
						<h4 className="mb-6 text-xs font-extrabold uppercase tracking-[0.1em] text-primary-500">
							Links Rápidos
						</h4>
						<ul className="space-y-4 text-sm text-neutral-400">
							<li>
								<Link
									href="/quiz"
									className="inline-flex items-center gap-2 transition-colors hover:text-primary-500"
								>
									Faça o Quiz
									<span className="rounded-full bg-primary-500/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary-500">
										Novo
									</span>
								</Link>
							</li>
							<li>
								<Link
									href="/blog"
									className="transition-colors hover:text-primary-500"
								>
									Blog
								</Link>
							</li>
							<li>
								<Link
									href="/aulas-coletivas"
									className="transition-colors hover:text-primary-500"
								>
									Aulas Coletivas
								</Link>
							</li>
							<li>
								<Link
									href="/planos"
									className="transition-colors hover:text-primary-500"
								>
									Planos para Empresas
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="transition-colors hover:text-primary-500"
								>
									Seja um Franqueado
								</Link>
							</li>
							<li>
								<Link
									href="/trabalhe-conosco"
									className="transition-colors hover:text-primary-500"
								>
									Trabalhe Conosco
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="mb-6 text-xs font-extrabold uppercase tracking-[0.1em] text-primary-500">
							Contato
						</h4>
						<ul className="space-y-4 text-sm text-neutral-400">
							<li className="flex items-center gap-2">
								<Phone className="size-4 shrink-0" />
								<a
									href={`tel:+${WHATSAPP_PHONE}`}
									className="transition-colors hover:text-primary-500"
								>
									{PHONE_DISPLAY}
								</a>
							</li>
							<li className="flex items-center gap-2">
								<Mail className="size-4 shrink-0" />
								<span
									dangerouslySetInnerHTML={{ __html: "<!--email_off-->" }}
								/>
								<a
									href={`mailto:${CONTACT_EMAIL}`}
									className="transition-colors hover:text-primary-500"
								>
									{CONTACT_EMAIL}
								</a>
								<span
									dangerouslySetInnerHTML={{ __html: "<!--/email_off-->" }}
								/>
							</li>
							<li className="flex items-center gap-2">
								<MessageSquare className="size-4 shrink-0" />
								<a
									href={WHATSAPP_URL}
									className="transition-colors hover:text-primary-500"
								>
									WhatsApp: {PHONE_DISPLAY}
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="border-t border-white/5 pt-12">
					<p className="text-xs text-neutral-500" suppressHydrationWarning>
						© {new Date().getFullYear()} Panobianco Jardim Satélite. Todos os
						direitos reservados.
					</p>
				</div>
			</div>
		</footer>
	);
}
