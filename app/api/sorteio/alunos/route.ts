import { type NextRequest, NextResponse } from "next/server";

import { getActiveMembers } from "@/lib/evo";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
	try {
		const refresh = request.nextUrl.searchParams.get("refresh") === "true";
		const members = await getActiveMembers(refresh);
		return NextResponse.json(
			{
				success: true,
				total: members.length,
				members,
			},
			{
				headers: {
					"Cache-Control":
						"private, no-store",
				},
			},
		);
	} catch (error) {
		console.error("[api/sorteio/alunos] error:", error);
		return NextResponse.json(
			{
				success: false,
				error: "Erro ao buscar lista de alunos ativos no EVO",
				total: 0,
				members: [],
			},
			{ status: 500 },
		);
	}
}
