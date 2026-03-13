import {
	CONTACT_EMAIL,
	PHONE_DISPLAY,
	SITE_URL,
	WHATSAPP_URL,
} from "@/lib/constants";

export function GET() {
	const body = [
		"# Academia Panobianco Jardim Satélite",
		"",
		"Academia em São José dos Campos (Jardim Satélite) com musculação, aulas coletivas, treino personalizado e avaliação física. Av. Cidade Jardim, 391.",
		"",
		"## Links",
		`- Início: ${SITE_URL}/`,
		`- Serviços: ${SITE_URL}/servicos`,
		`- Aulas Coletivas: ${SITE_URL}/aulas-coletivas`,
		`- Planos: ${SITE_URL}/planos`,
		`- Contato: ${SITE_URL}/contato`,
		`- Sobre nós: ${SITE_URL}/sobre-nos`,
		"",
		"## Contato",
		`- E-mail: ${CONTACT_EMAIL}`,
		`- Telefone: ${PHONE_DISPLAY}`,
		`- WhatsApp: ${WHATSAPP_URL}`,
	].join("\n");

	return new Response(body, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, max-age=3600",
		},
	});
}
