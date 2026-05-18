"use client";

import { useEffect } from "react";

import { trackAbTestImpression } from "@/lib/analytics";

interface Props {
	experiment: string;
	variant: "a" | "b";
}

export default function AbTestImpression({ experiment, variant }: Props) {
	useEffect(() => {
		trackAbTestImpression(experiment, variant);
	}, [experiment, variant]);

	return null;
}
