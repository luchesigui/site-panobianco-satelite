import crypto from "node:crypto";

export interface SessionData {
	idMember: number;
	name: string;
}

export function signSession(idMember: number, name: string): string {
	const data = JSON.stringify({ idMember, name });
	const signature = crypto
		.createHmac("sha256", process.env.EVO_TOKEN || "secret-key")
		.update(data)
		.digest("hex");
	return `${Buffer.from(data).toString("base64")}.${signature}`;
}

export function verifySession(sessionStr: string): SessionData | null {
	if (!sessionStr) return null;
	const parts = sessionStr.split(".");
	if (parts.length !== 2) return null;

	const dataStr = Buffer.from(parts[0], "base64").toString("utf8");
	const signature = parts[1];

	const expectedSignature = crypto
		.createHmac("sha256", process.env.EVO_TOKEN || "secret-key")
		.update(dataStr)
		.digest("hex");

	if (signature !== expectedSignature) return null;

	try {
		return JSON.parse(dataStr) as SessionData;
	} catch {
		return null;
	}
}
