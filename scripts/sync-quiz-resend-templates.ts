/**
 * Creates or updates published Resend templates from lib/emailTemplates.ts.
 *
 * Uses the same REST API as the Resend MCP (`create-template`, `publish-template`).
 *
 * Auth: set RESEND_API_KEY, or add it to .env.local (loaded automatically if unset).
 *
 *   npm run resend:sync-quiz-templates
 *
 * Template variables:
 * - {{{FIRST_NAME}}} — reserved by Resend (do not declare in `variables`)
 * - {{{CTA_HREF}}} — declared as CTA_HREF (required when sending)
 */

import fs from "node:fs";
import path from "node:path";

import {
  buildResendQuizTemplateHtml,
  quizResendTemplateSubject,
  TEMPLATES,
  type TemplateKey,
} from "../lib/emailTemplates";
import { quizResendTemplateAlias } from "../lib/resendQuizTemplateAliases";

const API = "https://api.resend.com";

function loadEnvLocal(): void {
  if (process.env.RESEND_API_KEY) return;
  try {
    const fp = path.join(process.cwd(), ".env.local");
    if (!fs.existsSync(fp)) return;
    const text = fs.readFileSync(fp, "utf8");
    for (const line of text.split("\n")) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const eq = t.indexOf("=");
      if (eq === -1) continue;
      const k = t.slice(0, eq).trim();
      let v = t.slice(eq + 1).trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      if (k === "RESEND_API_KEY") {
        process.env.RESEND_API_KEY = v;
        break;
      }
    }
  } catch {
    /* ignore */
  }
}

async function resendJson<T>(
  apiKey: string,
  method: string,
  pathname: string,
  body?: Record<string, unknown>,
): Promise<{ ok: boolean; status: number; json: T }> {
  const res = await fetch(`${API}${pathname}`, {
    method,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = (await res.json()) as T;
  return { ok: res.ok, status: res.status, json };
}

interface TemplateListRow {
  id: string;
  name: string;
  alias?: string | null;
}

interface ListTemplatesResponse {
  object?: string;
  data?: TemplateListRow[];
  has_more?: boolean;
}

async function listAllTemplates(apiKey: string): Promise<TemplateListRow[]> {
  const all: TemplateListRow[] = [];
  let after: string | undefined;
  for (;;) {
    const q = new URLSearchParams({ limit: "50" });
    if (after) q.set("after", after);
    const { ok, json } = await resendJson<ListTemplatesResponse>(
      apiKey,
      "GET",
      `/templates?${q.toString()}`,
    );
    if (!ok) {
      throw new Error(`list templates failed: ${JSON.stringify(json)}`);
    }
    const chunk = json.data ?? [];
    all.push(...chunk);
    if (!json.has_more || chunk.length === 0) break;
    after = chunk[chunk.length - 1].id;
    await new Promise((r) => setTimeout(r, 550));
  }
  return all;
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function main(): Promise<void> {
  loadEnvLocal();
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Missing RESEND_API_KEY (env or .env.local).");
    process.exit(1);
  }

  const keys = Object.keys(TEMPLATES) as TemplateKey[];
  console.log(`Syncing ${keys.length} quiz templates to Resend…`);

  const existing = await listAllTemplates(apiKey);
  const byAlias = new Map<string, TemplateListRow>();
  for (const row of existing) {
    if (row.alias) byAlias.set(row.alias, row);
  }

  for (const key of keys) {
    const alias = quizResendTemplateAlias(key);
    const html = buildResendQuizTemplateHtml(key);
    const subject = quizResendTemplateSubject(key);
    const name = `Quiz Satélite · ${key}`;
    const variables = [{ key: "CTA_HREF", type: "string" as const }];

    const payload = {
      name,
      alias,
      html,
      subject,
      variables,
    };

    const row = byAlias.get(alias);
    let id = row?.id;

    if (id) {
      const patch = await resendJson<{ id?: string; message?: string }>(
        apiKey,
        "PATCH",
        `/templates/${encodeURIComponent(id)}`,
        { name, html, subject, variables },
      );
      if (!patch.ok) {
        console.error(`PATCH ${alias}:`, patch.status, patch.json);
        continue;
      }
      console.log(`updated draft ${alias} (${id})`);
    } else {
      const created = await resendJson<{ id?: string; message?: string }>(
        apiKey,
        "POST",
        "/templates",
        payload,
      );
      if (!created.ok) {
        console.error(`POST ${alias}:`, created.status, created.json);
        continue;
      }
      id = created.json.id;
      if (!id) {
        console.error(`POST ${alias}: no id in`, created.json);
        continue;
      }
      console.log(`created ${alias} (${id})`);
    }

    await sleep(550);

    const publishId = id;
    if (!publishId) continue;

    const pub = await resendJson<{ id?: string; message?: string }>(
      apiKey,
      "POST",
      `/templates/${encodeURIComponent(publishId)}/publish`,
    );
    if (!pub.ok) {
      console.error(`publish ${alias}:`, pub.status, pub.json);
      continue;
    }
    console.log(`published ${alias}`);
    await sleep(550);
  }

  console.log("Done. Aliases:", keys.map(quizResendTemplateAlias).join(", "));
  console.log(
    "Send-time payload example: { FIRST_NAME, CTA_HREF } (plus template id or alias quiz-satelite-<key>).",
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
