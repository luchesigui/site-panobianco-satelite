import {
	CONTACT_EMAIL,
	PHONE_DISPLAY,
	SITE_URL,
	WHATSAPP_URL,
} from "@/lib/constants";
import { getAllPosts } from "@/lib/blog";

export function GET() {
	const topPostsByCategory = Object.entries(
		getAllPosts()
			.slice(0, 20)
			.reduce<Record<string, string[]>>((acc, post) => {
				const category = post.category || "Geral";
				acc[category] = acc[category] ?? [];
				acc[category].push(`${post.headline} - ${SITE_URL}/blog/${post.slug}`);
				return acc;
			}, {}),
	);

	const blogSectionLines =
		topPostsByCategory.length > 0
			? topPostsByCategory.flatMap(([category, posts]) => [
					`### ${category}`,
					...posts.map((entry) => `- ${entry}`),
					"",
				])
			: ["- Nenhum post disponível no momento.", ""];

	const body = [
		"# Academia Panobianco Jardim Satélite",
		"",
		"Academia em São José dos Campos (Jardim Satélite) com foco em musculação, aulas coletivas, treino personalizado e qualidade de vida.",
		"",
		"## Links",
		`- Início: ${SITE_URL}/`,
		`- Serviços: ${SITE_URL}/servicos`,
		`- Aulas Coletivas: ${SITE_URL}/aulas-coletivas`,
		`- Planos: ${SITE_URL}/planos`,
		`- Contato: ${SITE_URL}/contato`,
		`- Sobre nós: ${SITE_URL}/sobre-nos`,
		"",
		"## Modalidades e Serviços",
		"- Musculação: estrutura com equipamentos modernos para força, hipertrofia e emagrecimento.",
		"- Treino Personalizado: acompanhamento individual para metas específicas com orientação técnica constante.",
		"- Pilates: foco em mobilidade, postura, flexibilidade e fortalecimento de core.",
		"- Muay Thai e Jiu Jitsu: artes marciais para condicionamento, disciplina e autodefesa.",
		"- Jump, FitDance e Ritmos: aulas de alto gasto calórico com dinâmica em grupo.",
		"- GAP, Flashback e Wolf Fit: variedade de estímulos para condicionamento e motivação.",
		"",
		"## Planos",
		"| Plano | Valor mensal | Observações |",
		"|---|---:|---|",
		"| Orange Anual | R$ 119,90 | Fidelidade de 12 meses |",
		"| Platinum Recorrente | R$ 139,90 | Sem fidelidade, débito automático |",
		"| Avulso | R$ 159,90 | Pagamento mês a mês |",
		"",
		"## Horários de Funcionamento",
		"- Segunda a sexta: 06:00 às 23:00",
		"- Sábado: 08:00 às 18:00",
		"- Domingo e feriados: 09:00 às 14:00",
		"",
		"## Localização",
		"- Endereço: Av. Cidade Jardim, 391 - Jardim Satélite, São José dos Campos - SP, 12231-675",
		"- Referências de bairro: próximo a vias principais do Jardim Satélite, com acesso facilitado para Bosque dos Eucaliptos, Vale Sul e região sul de SJC.",
		"",
		"## Contato",
		`- E-mail: ${CONTACT_EMAIL}`,
		`- Telefone: ${PHONE_DISPLAY}`,
		`- WhatsApp: ${WHATSAPP_URL}`,
		"",
		"## Blog (20 posts em destaque por categoria)",
		...blogSectionLines,
	].join("\n");

	return new Response(body, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, max-age=3600",
		},
	});
}
