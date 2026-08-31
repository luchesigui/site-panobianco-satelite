"use client";

import { Calendar, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { trackScheduleModalOpened } from "@/lib/analytics";

export default function ScheduleModal() {
	const [isOpen, setIsOpen] = useState(false);
	const backdropRef = useRef<HTMLButtonElement>(null);

	const open = useCallback(() => {
		trackScheduleModalOpened();
		setIsOpen(true);
	}, []);
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
				className="botao-chanfrado inline-flex items-center gap-2 bg-white px-8 py-4 text-sm uppercase tracking-wide text-pb-orange-warm transition-colors hover:bg-pb-off-white"
			>
				<Calendar className="size-4" />
				Ver grade de horários
			</button>
			{/* O gatilho vive dentro de um bloco `.shape-chanfrado`, que aplica
			    clip-path e overflow:hidden — e ambos recortam descendentes
			    `position: fixed`. Sem o portal, o overlay ficava preso dentro
			    do hexágono. */}
			{isOpen &&
				createPortal(
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
						<div className="relative w-fit max-w-[100vw] bg-pb-black">
							<button
								type="button"
								onClick={close}
								className="shape-octagon-regular absolute right-4 top-4 z-10 flex size-10 items-center justify-center bg-pb-orange text-white transition-colors hover:bg-pb-orange-warm"
								aria-label="Fechar modal"
							>
								<X className="size-5" />
							</button>
							<Image
								src="/images/horarios.webp?v=20260803"
								alt="Grade de horários - Panobianco Jardim Satélite"
								width={900}
								height={600}
								sizes="(max-width: 100vw) 100vw, 900px"
								className="max-h-[90vh] max-w-[100vw] h-auto w-auto object-contain"
							/>
						</div>
					</div>,
					document.body,
				)}
		</>
	);
}
