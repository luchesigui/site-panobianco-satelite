"use client";

import { ArrowRight, Calendar, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export default function ScheduleModal() {
	const [isOpen, setIsOpen] = useState(false);
	const backdropRef = useRef<HTMLButtonElement>(null);

	const open = useCallback(() => setIsOpen(true), []);
	const close = useCallback(() => setIsOpen(false), []);

	useEffect(() => {
		if (!isOpen) return;
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") close();
		};
		document.addEventListener("keydown", handleEscape);
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "";
		};
	}, [isOpen, close]);

	return (
		<>
			<button
				type="button"
				onClick={open}
				className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 font-bold text-white transition-all hover:bg-white/10"
			>
				<Calendar className="size-5" />
				Ver Grade de Horários
				<ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
			</button>
			{isOpen && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center p-4"
					role="dialog"
					aria-modal="true"
					aria-label="Grade de horários"
					onClick={(e) => {
						if (e.target === backdropRef.current) close();
					}}
					onKeyDown={(e) => {
						if (e.key === "Escape") close();
					}}
				>
					<button
						ref={backdropRef}
						type="button"
						onClick={close}
						className="absolute inset-0 bg-black/80"
						aria-label="Fechar modal"
					/>
					<div className="relative w-fit max-w-[100vw] rounded-xl bg-white/5 shadow-2xl">
						<button
							type="button"
							onClick={close}
							className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
							aria-label="Fechar modal"
						>
							<X className="size-5" />
						</button>
						<Image
							src="/images/horarios.png"
							alt="Grade de horários - Panobianco Jardim Satélite"
							width={900}
							height={600}
							className="max-h-[90vh] max-w-[100vw] h-auto w-auto rounded-xl object-contain"
							unoptimized
						/>
					</div>
				</div>
			)}
		</>
	);
}
