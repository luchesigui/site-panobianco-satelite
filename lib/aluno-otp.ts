import { createHmac, randomInt, timingSafeEqual } from "node:crypto";

const OTP_TTL_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

interface OtpPayload {
	name: string;
	codeHash: string;
	exp: number;
	attempts: number;
}

export type OtpVerification =
	| { status: "ok"; name: string }
	| { status: "retry"; token: string }
	| { status: "expired" };

function otpSecret(): string {
	// O token EVO já é um segredo server-only obrigatório para o fluxo;
	// reaproveitado como chave HMAC para não exigir nova env var.
	const secret = process.env.EVO_TOKEN;
	if (!secret) throw new Error("EVO_TOKEN not configured");
	return secret;
}

function hmac(data: string): string {
	return createHmac("sha256", otpSecret()).update(data).digest("base64url");
}

function encode(payload: OtpPayload): string {
	const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
	return `${body}.${hmac(body)}`;
}

function decode(token: string): OtpPayload | null {
	const [body, signature] = token.split(".");
	if (!body || !signature) return null;

	const expected = Buffer.from(hmac(body));
	const received = Buffer.from(signature);
	if (
		expected.length !== received.length ||
		!timingSafeEqual(expected, received)
	) {
		return null;
	}

	try {
		return JSON.parse(Buffer.from(body, "base64url").toString());
	} catch {
		return null;
	}
}

export function generateOtpCode(): string {
	return String(randomInt(0, 1_000_000)).padStart(6, "0");
}

export function createOtpToken(name: string, code: string): string {
	const exp = Date.now() + OTP_TTL_MS;
	return encode({ name, codeHash: hmac(`${code}:${exp}`), exp, attempts: 0 });
}

export function verifyOtpToken(token: string, code: string): OtpVerification {
	const payload = decode(token);
	if (
		!payload ||
		payload.exp < Date.now() ||
		payload.attempts >= MAX_ATTEMPTS
	) {
		return { status: "expired" };
	}

	const expected = Buffer.from(hmac(`${code}:${payload.exp}`));
	const received = Buffer.from(payload.codeHash);
	if (
		expected.length === received.length &&
		timingSafeEqual(expected, received)
	) {
		return { status: "ok", name: payload.name };
	}

	return {
		status: "retry",
		token: encode({ ...payload, attempts: payload.attempts + 1 }),
	};
}
