import { FileText, Globe, Lock, Mail, Shield, Trash2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title:
		"Política de Privacidade - Postiz | Academia Panobianco Jardim Satélite",
	description:
		"Política de Privacidade do aplicativo Postiz para agendamento de postagens no Facebook, Instagram e Google Meu Negócio.",
	robots: {
		index: false,
		follow: false,
		nocache: true,
		googleBot: {
			index: false,
			follow: false,
			noimageindex: true,
		},
	},
};

export default function PostizPrivacyPolicy() {
	return (
		<div className="bg-primary min-h-screen">
			{/* Hero Section */}
			<section className="py-16 lg:py-20 border-b border-primary/10">
				<div className="container-main">
					<div className="max-w-3xl mx-auto text-center">
						<div className="inline-flex items-center justify-center p-3 bg-primary-500/10 text-primary-500 rounded-2xl mb-6">
							<Shield className="h-10 w-10" />
						</div>
						<h1 className="text-3xl lg:text-5xl font-bold text-primary mb-4">
							Política de Privacidade
						</h1>
						<p className="text-xl text-primary-500 font-semibold mb-2">
							Aplicativo Postiz
						</p>
						<p className="text-sm text-secondary">
							Última atualização: 3 de junho de 2026
						</p>
					</div>
				</div>
			</section>

			{/* Content Section */}
			<section className="py-16">
				<div className="container-main">
					<div className="max-w-3xl mx-auto">
						{/* Alerta de Privacidade */}
						<div className="card mb-12 border-l-4 border-primary-500 bg-secondary/30 flex items-start gap-4">
							<Lock className="h-6 w-6 text-primary-500 shrink-0 mt-1" />
							<div>
								<h3 className="font-semibold text-primary mb-1">
									Compromisso com a Segurança
								</h3>
								<p className="text-body text-secondary text-sm">
									Esta Política de Privacidade descreve como o aplicativo{" "}
									<strong>Postiz</strong>, mantido pela Academia Panobianco
									Jardim Satélite, lida com seus dados de autenticação e
									conteúdo ao utilizar nossas ferramentas de integração e
									agendamento.
								</p>
							</div>
						</div>

						{/* Document Body */}
						<div className="space-y-12">
							{/* Section 1 */}
							<div className="scroll-mt-20">
								<h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
									<span className="text-primary-500 text-lg">1.</span>{" "}
									Introdução e Escopo
								</h2>
								<p className="text-body text-secondary leading-relaxed mb-4">
									O <strong>Postiz</strong> é uma ferramenta desenvolvida para
									facilitar a gestão de redes sociais, permitindo aos usuários
									agendar e publicar conteúdos diretamente em suas páginas e
									perfis do <strong>Facebook</strong>,{" "}
									<strong>Instagram</strong> e{" "}
									<strong>Google Meu Negócio (Google Business Profile)</strong>.
								</p>
								<p className="text-body text-secondary leading-relaxed">
									Ao utilizar o Postiz, você concorda com os termos descritos
									nesta política. Recomendamos a leitura atenta deste documento
									para compreender como suas informações são tratadas.
								</p>
							</div>

							{/* Section 2 */}
							<div className="scroll-mt-20">
								<h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
									<span className="text-primary-500 text-lg">2.</span> Dados
									Coletados e Integração com APIs
								</h2>
								<p className="text-body text-secondary leading-relaxed mb-4">
									Para viabilizar o agendamento e a publicação automática de
									conteúdos nas suas contas, o Postiz conecta-se às APIs
									oficiais das respectivas plataformas por meio do protocolo
									OAuth. Durante este processo, coletamos e utilizamos os
									seguintes dados:
								</p>
								<ul className="list-disc pl-6 space-y-3 text-secondary text-body mb-4">
									<li>
										<strong className="text-primary">
											Tokens de Acesso (API Tokens):
										</strong>{" "}
										Credenciais de segurança geradas pelas plataformas parceiras
										para autorizar o Postiz a enviar publicações em seu nome.
									</li>
									<li>
										<strong className="text-primary">
											Dados de Perfil Básico:
										</strong>{" "}
										Nome de usuário, identificador da conta (ID) e foto de
										perfil associada às páginas do Facebook, contas
										profissionais do Instagram ou locais do Google Meu Negócio
										conectadas.
									</li>
									<li>
										<strong className="text-primary">
											Conteúdo de Mídia e Texto:
										</strong>{" "}
										Textos, imagens, links e vídeos enviados voluntariamente por
										você ao agendar uma postagem.
									</li>
								</ul>
								<p className="text-body text-secondary leading-relaxed">
									O Postiz coleta apenas os dados estritamente necessários para
									prestar o serviço de automação de postagens por você
									solicitado.
								</p>
							</div>

							{/* Section 3 */}
							<div className="scroll-mt-20">
								<h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
									<span className="text-primary-500 text-lg">3.</span>{" "}
									Finalidade e Uso dos Dados
								</h2>
								<p className="text-body text-secondary leading-relaxed mb-4">
									As informações coletadas são utilizadas unicamente para:
								</p>
								<ul className="list-disc pl-6 space-y-3 text-secondary text-body">
									<li>
										Autenticar suas contas de redes sociais de forma segura.
									</li>
									<li>
										Processar, gerenciar e transmitir as postagens agendadas
										para publicação nas redes no dia e horário configurados.
									</li>
									<li>
										Fornecer um histórico interno das publicações realizadas e
										agendadas através da plataforma Postiz.
									</li>
								</ul>
								<p className="text-body text-secondary leading-relaxed mt-4">
									<strong>Importante:</strong> Nós não vendemos, alugamos,
									transferimos ou compartilhamos suas credenciais, dados
									pessoais ou conteúdo agendado com terceiros para fins
									publicitários ou comerciais.
								</p>
							</div>

							{/* Section 4 */}
							<div className="scroll-mt-20">
								<h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
									<span className="text-primary-500 text-lg">4.</span> Serviços
									de Terceiros e APIs Governamentais das Redes
								</h2>
								<p className="text-body text-secondary leading-relaxed mb-4">
									O Postiz interage diretamente com APIs oficiais fornecidas
									pelo <strong>Meta (Facebook e Instagram)</strong> e{" "}
									<strong>Google</strong>. O uso e o armazenamento de
									informações recebidas dessas APIs obedecem às políticas de
									privacidade de cada respectiva plataforma:
								</p>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
									<div className="card bg-secondary/20 p-5 rounded-xl border border-primary/5">
										<div className="flex items-center gap-3 mb-3">
											<div className="p-2 bg-primary-500/10 text-primary-500 rounded-lg">
												<Globe className="h-5 w-5" />
											</div>
											<h3 className="font-semibold text-primary text-sm">
												Serviços da Meta
											</h3>
										</div>
										<p className="text-xs text-secondary mb-3 leading-relaxed">
											As interações com Facebook e Instagram são regidas pelos
											Termos de Serviço da Meta e sua Política de Privacidade.
										</p>
										<a
											href="https://www.facebook.com/about/privacy/"
											target="_blank"
											rel="noopener noreferrer"
											className="text-xs text-primary-500 font-semibold hover:underline"
										>
											Ler Política da Meta &rarr;
										</a>
									</div>

									<div className="card bg-secondary/20 p-5 rounded-xl border border-primary/5">
										<div className="flex items-center gap-3 mb-3">
											<div className="p-2 bg-primary-500/10 text-primary-500 rounded-lg">
												<Globe className="h-5 w-5" />
											</div>
											<h3 className="font-semibold text-primary text-sm">
												Serviços do Google
											</h3>
										</div>
										<p className="text-xs text-secondary mb-3 leading-relaxed">
											As interações com o Google Meu Negócio são regidas pelos
											Termos de Serviço e pela Política de Privacidade do
											Google.
										</p>
										<a
											href="https://policies.google.com/privacy"
											target="_blank"
											rel="noopener noreferrer"
											className="text-xs text-primary-500 font-semibold hover:underline"
										>
											Ler Política do Google &rarr;
										</a>
									</div>
								</div>
							</div>

							{/* Section 5 */}
							<div className="scroll-mt-20">
								<h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
									<span className="text-primary-500 text-lg">5.</span> Segurança
									e Retenção dos Dados
								</h2>
								<p className="text-body text-secondary leading-relaxed mb-4">
									Adotamos medidas técnicas, administrativas e físicas para
									proteger seus dados de acessos não autorizados ou divulgação
									imprópria.
								</p>
								<ul className="list-disc pl-6 space-y-3 text-secondary text-body">
									<li>
										Os tokens de acesso OAuth são armazenados com criptografia
										de ponta em nossos servidores.
									</li>
									<li>
										Os arquivos de mídia enviados para agendamento são mantidos
										apenas pelo período necessário para a publicação, sendo
										removidos periodicamente após a finalização do processo de
										envio.
									</li>
								</ul>
							</div>

							{/* Section 6 */}
							<div className="scroll-mt-20">
								<h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
									<span className="text-primary-500 text-lg">6.</span> Controle
									do Usuário e Revogação de Permissões
								</h2>
								<p className="text-body text-secondary leading-relaxed mb-4">
									Você tem controle total sobre os dados fornecidos ao Postiz.
									Você pode revogar as permissões concedidas de duas formas:
								</p>
								<div className="space-y-4">
									<div className="flex gap-4 items-start">
										<div className="p-2 bg-primary-500/10 text-primary-500 rounded-lg shrink-0 mt-1">
											<Trash2 className="h-5 w-5" />
										</div>
										<div>
											<h4 className="font-semibold text-primary text-sm mb-1">
												Revogação pelas Configurações da Rede
											</h4>
											<p className="text-xs text-secondary leading-relaxed">
												Você pode remover a permissão de acesso do aplicativo
												Postiz diretamente nas configurações de segurança do
												Meta (Facebook/Instagram) ou na página de aplicativos de
												terceiros vinculados à sua Conta Google.
											</p>
										</div>
									</div>
									<div className="flex gap-4 items-start">
										<div className="p-2 bg-primary-500/10 text-primary-500 rounded-lg shrink-0 mt-1">
											<FileText className="h-5 w-5" />
										</div>
										<div>
											<h4 className="font-semibold text-primary text-sm mb-1">
												Solicitação de Exclusão Completa
											</h4>
											<p className="text-xs text-secondary leading-relaxed">
												Você pode solicitar a exclusão definitiva dos seus dados
												e histórico de publicações do Postiz a qualquer momento
												enviando uma solicitação para o e-mail de suporte.
											</p>
										</div>
									</div>
								</div>
							</div>

							{/* Section 7 */}
							<div className="scroll-mt-20">
								<h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
									<span className="text-primary-500 text-lg">7.</span>{" "}
									Alterações nesta Política
								</h2>
								<p className="text-body text-secondary leading-relaxed">
									Reservamos-nos o direito de atualizar esta Política de
									Privacidade periodicamente para refletir mudanças em nosso
									aplicativo ou requisitos regulatórios. Notificaremos os
									usuários sobre mudanças significativas atualizando a data no
									topo desta página.
								</p>
							</div>

							{/* Section 8 */}
							<div className="scroll-mt-20 border-t border-primary/10 pt-8">
								<h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
									<span className="text-primary-500 text-lg">8.</span> Fale
									Conosco
								</h2>
								<p className="text-body text-secondary leading-relaxed mb-6">
									Se você tiver alguma dúvida, preocupação ou quiser solicitar a
									exclusão de seus dados pessoais em relação a esta Política de
									Privacidade ou ao uso do Postiz, entre em contato conosco:
								</p>
								<div className="card bg-secondary/10 flex items-center gap-4 p-4 border border-primary/5 max-w-md">
									<Mail className="h-6 w-6 text-primary-500" />
									<div>
										<p className="text-xs text-secondary uppercase tracking-wider font-semibold">
											E-mail de Suporte
										</p>
										<a
											href="mailto:contato@panobiancosatellite.com.br"
											className="text-primary font-bold hover:text-primary-500 transition-colors"
										>
											contato@panobiancosatellite.com.br
										</a>
									</div>
								</div>
							</div>
						</div>

						{/* Bottom Back Link */}
						<div className="mt-16 text-center border-t border-primary/10 pt-8">
							<Link href="/" className="btn-secondary">
								Voltar para a Página Inicial
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
