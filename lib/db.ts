import { neon } from "@neondatabase/serverless";

export const sql = neon(
	process.env.DATABASE_URL ||
		"postgres://placeholder:placeholder@localhost:5432/placeholder",
);

