import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/constants";

const now = new Date();

const staticRoutes: MetadataRoute.Sitemap = [
	{ url: SITE_URL, lastModified: now, changeFrequency: "monthly", priority: 1 },
	{
		url: `${SITE_URL}/servicos`,
		lastModified: now,
		changeFrequency: "monthly",
		priority: 0.9,
	},
	{
		url: `${SITE_URL}/servicos/musculacao`,
		lastModified: now,
		changeFrequency: "monthly",
		priority: 0.8,
	},
	{
		url: `${SITE_URL}/servicos/treino-personalizado`,
		lastModified: now,
		changeFrequency: "monthly",
		priority: 0.8,
	},
	{
		url: `${SITE_URL}/aulas-coletivas`,
		lastModified: now,
		changeFrequency: "monthly",
		priority: 0.9,
	},
	{
		url: `${SITE_URL}/aulas-coletivas/gap`,
		lastModified: now,
		changeFrequency: "monthly",
		priority: 0.7,
	},
	{
		url: `${SITE_URL}/aulas-coletivas/flashback`,
		lastModified: now,
		changeFrequency: "monthly",
		priority: 0.7,
	},
	{
		url: `${SITE_URL}/aulas-coletivas/jump`,
		lastModified: now,
		changeFrequency: "monthly",
		priority: 0.7,
	},
	{
		url: `${SITE_URL}/aulas-coletivas/jiu-jitsu`,
		lastModified: now,
		changeFrequency: "monthly",
		priority: 0.7,
	},
	{
		url: `${SITE_URL}/aulas-coletivas/muay-thai`,
		lastModified: now,
		changeFrequency: "monthly",
		priority: 0.7,
	},
	{
		url: `${SITE_URL}/aulas-coletivas/pilates`,
		lastModified: now,
		changeFrequency: "monthly",
		priority: 0.7,
	},
	{
		url: `${SITE_URL}/aulas-coletivas/ritmos`,
		lastModified: now,
		changeFrequency: "monthly",
		priority: 0.7,
	},
	{
		url: `${SITE_URL}/aulas-coletivas/wolf-fit`,
		lastModified: now,
		changeFrequency: "monthly",
		priority: 0.7,
	},
	{
		url: `${SITE_URL}/aulas-coletivas/fitdance`,
		lastModified: now,
		changeFrequency: "monthly",
		priority: 0.7,
	},
	{
		url: `${SITE_URL}/planos`,
		lastModified: now,
		changeFrequency: "monthly",
		priority: 0.9,
	},
	{
		url: `${SITE_URL}/contato`,
		lastModified: now,
		changeFrequency: "monthly",
		priority: 0.8,
	},
	{
		url: `${SITE_URL}/sobre-nos`,
		lastModified: now,
		changeFrequency: "yearly",
		priority: 0.6,
	},
];

export default function sitemap(): MetadataRoute.Sitemap {
	return staticRoutes;
}
