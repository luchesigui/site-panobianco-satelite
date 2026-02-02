import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lançamentos | Academia Panobianco Jardim Satélite",
  description:
    "Gerencie os lançamentos financeiros da Academia Panobianco Jardim Satélite.",
  robots: "noindex, nofollow",
};

export default function LancamentosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
