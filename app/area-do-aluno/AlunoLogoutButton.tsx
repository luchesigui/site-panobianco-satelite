"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AlunoLogoutButton() {
	const { refresh } = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleLogout = async () => {
		setIsSubmitting(true);
		try {
			await fetch("/api/area-do-aluno/auth", { method: "DELETE" });
			refresh();
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<button
			type="button"
			onClick={handleLogout}
			disabled={isSubmitting}
			className="botao-chanfrado inline-flex items-center justify-center bg-pb-orange px-8 py-4 text-sm uppercase tracking-wide text-white transition-colors hover:bg-pb-orange-warm disabled:opacity-70"
		>
			<LogOut className="mr-2 size-4" />
			{isSubmitting ? "Saindo..." : "Sair"}
		</button>
	);
}
