"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

import { WHATSAPP_AULA_EXPERIMENTAL } from "@/lib/constants";

interface IndicationContextType {
	indication: string | null;
	getSchedulingUrl: (baseUrl?: string) => string;
}

const IndicationContext = createContext<IndicationContextType | undefined>(
	undefined,
);

interface IndicationProviderProps {
	children: ReactNode;
}

export function IndicationProvider({ children }: IndicationProviderProps) {
	const [indication, setIndication] = useState<string | null>(null);

	useEffect(() => {
		// Capturar o parâmetro de indicação da URL quando o componente montar
		if (typeof window !== "undefined") {
			const urlParams = new URLSearchParams(window.location.search);
			const indicationParam = urlParams.get("indicacao");
			if (indicationParam) {
				setIndication(indicationParam);
				// Armazenar no sessionStorage para persistir durante a sessão
				sessionStorage.setItem("indication", indicationParam);
			} else {
				// Verificar se existe no sessionStorage
				const storedIndication = sessionStorage.getItem("indication");
				if (storedIndication) {
					setIndication(storedIndication);
				}
			}
		}
	}, []);

	const getSchedulingUrl = (baseUrl: string = WHATSAPP_AULA_EXPERIMENTAL) => {
		if (!indication) {
			return baseUrl;
		}
		// Append indicacao to WhatsApp (or other) URL
		const separator = baseUrl.includes("?") ? "&" : "?";
		return `${baseUrl}${separator}indicacao=${encodeURIComponent(indication)}`;
	};

	return (
		<IndicationContext.Provider value={{ indication, getSchedulingUrl }}>
			{children}
		</IndicationContext.Provider>
	);
}

export function useIndication() {
	const context = useContext(IndicationContext);
	if (context === undefined) {
		throw new Error("useIndication must be used within an IndicationProvider");
	}
	return context;
}
