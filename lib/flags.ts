import { createClient } from "@vercel/edge-config";
import { flag } from "@vercel/flags/next";

export const promoOrangeFlag = flag<boolean>({
	key: "promo-orange-ab",
	defaultValue: false,
	description: "A/B test: Orange Anual R$0,99 primeira mensalidade em /planos",
	options: [
		{ value: false, label: "Variante A — preço normal R$119,90" },
		{ value: true, label: "Variante B — promoção R$0,99 primeiro mês" },
	],
	async decide({ cookies, headers }) {
		// Kill switch remoto via Edge Config (só ativo quando EDGE_CONFIG está configurado)
		if (process.env.EDGE_CONFIG) {
			const client = createClient(process.env.EDGE_CONFIG);
			const enabled = await client.get<boolean>("promoOrangeEnabled");
			if (!enabled) return false;
		}

		// Lê bucket injetado pelo middleware como header (primeiro acesso — cookie ainda não chegou)
		const headerBucket = headers.get("x-ab-promo-orange");
		if (headerBucket) return headerBucket === "b";

		// Fallback: cookie sticky para visitas subsequentes
		const cookieBucket = cookies.get("ab-promo-orange")?.value;
		if (cookieBucket) return cookieBucket === "b";

		return false;
	},
});
