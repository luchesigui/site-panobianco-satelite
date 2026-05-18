import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
	matcher: ["/planos", "/planos/"],
};

export async function middleware(request: NextRequest) {
	const existingBucket = request.cookies.get("ab-promo-orange")?.value;
	const isNewVisitor = !existingBucket;
	const bucket = existingBucket ?? (Math.random() < 0.5 ? "b" : "a");

	// Injeta o bucket como request header para o Server Component ler no mesmo ciclo de request.
	// Cookies de resposta só ficam disponíveis na próxima requisição; o header passa imediatamente.
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set("x-ab-promo-orange", bucket);

	const response = NextResponse.next({
		request: { headers: requestHeaders },
	});

	// Cookie sticky de 30 dias — garante que o usuário veja sempre a mesma variante
	if (isNewVisitor) {
		response.cookies.set("ab-promo-orange", bucket, {
			httpOnly: true,
			sameSite: "strict",
			path: "/",
			maxAge: 60 * 60 * 24 * 30,
		});
	}

	return response;
}
