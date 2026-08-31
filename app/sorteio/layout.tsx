import type { Metadata } from "next";

// A página é uma ferramenta interna de gravação, fora do menu e sem link
// no site. O `metadata` precisa morar aqui porque a página é um client
// component e não pode exportá-lo.
export const metadata: Metadata = {
	title: "Sorteio",
	description: "Sorteio semanal entre os alunos ativos da unidade.",
	robots: { index: false, follow: false },
};

export default function SorteioLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
