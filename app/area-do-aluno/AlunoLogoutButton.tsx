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
			className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-bold text-white/80 transition-colors hover:border-white/30 hover:text-white disabled:opacity-70"
		>
			<LogOut className="mr-2 size-4" />
			{isSubmitting ? "Saindo..." : "Sair"}
		</button>
	);
}
