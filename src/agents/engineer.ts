import { execSync } from "child_process";
import { readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";
import { think } from "./brain";
import type { ProposedAction, AgentLog } from "./types";

const PROJECT_ROOT = process.cwd();

const SYSTEM_PROMPT = `You are the Engineer Agent for WealthWise Junior — a financial literacy platform for Indian school students.
Your job is to monitor the codebase, detect issues, and propose concrete fixes for the CEO to approve.

Always respond in this exact JSON format:
{
  "summary": "one paragraph summary of findings",
  "findings": ["finding 1", "finding 2", ...],
  "proposed_actions": [
    {
      "id": "action_1",
      "title": "Short title",
      "description": "What you will do and why",
      "priority": "high|medium|low",
      "type": "code_fix|alert|report",
      "payload": { "file": "...", "change": "..." }
    }
  ]
}
Only include real issues. Do not make up problems. Be concise and practical.`;

function runTypeCheck(): string {
  try {
    execSync("npx tsc --noEmit 2>&1", { cwd: PROJECT_ROOT });
    return "TypeScript: No errors found.";
  } catch (e: any) {
    return `TypeScript errors:\n${e.stdout?.toString() || e.message}`;
  }
}

function runLint(): string {
  try {
    execSync("npx next lint 2>&1", { cwd: PROJECT_ROOT, timeout: 30000 });
    return "ESLint: No issues found.";
  } catch (e: any) {
    const out = e.stdout?.toString() || e.message || "";
    return `ESLint findings:\n${out.slice(0, 2000)}`;
  }
}

function scanApiRoutes(): string {
  const apiDir = join(PROJECT_ROOT, "src/app/api");
  const issues: string[] = [];

  function walk(dir: string) {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) { walk(full); continue; }
      if (!full.endsWith("route.ts")) continue;
      const content = readFileSync(full, "utf8");
      const rel = full.replace(PROJECT_ROOT, "");
      if (!content.includes("getAuthenticatedUser") && !content.includes("service_role"))
        issues.push(`${rel} — no auth check detected`);
      if (!content.includes("try") && !content.includes("catch"))
        issues.push(`${rel} — no try/catch error handling`);
    }
  }

  walk(apiDir);
  return issues.length
    ? `API security scan:\n${issues.join("\n")}`
    : "API scan: All routes have basic auth/error handling.";
}

function checkEnvVars(): string {
  const required = [
    "GEMINI_API_KEY",
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "PAYU_MERCHANT_KEY",
    "PAYU_MERCHANT_SALT",
    "NEXT_PUBLIC_SENTRY_DSN",
    "RESEND_API_KEY",
    "NEXT_PUBLIC_SITE_URL",
  ];
  const missing = required.filter((v) => !process.env[v]);
  return missing.length
    ? `Missing env vars: ${missing.join(", ")}`
    : "Environment: All required variables are set.";
}

export async function runEngineerAgent(): Promise<Omit<AgentLog, "id" | "created_at">> {
  const typeCheck = runTypeCheck();
  const lint = runLint();
  const apiScan = scanApiRoutes();
  const envCheck = checkEnvVars();

  const report = `
=== ENGINEER AGENT DAILY SCAN ===
Date: ${new Date().toISOString()}

[1] TYPE CHECK
${typeCheck}

[2] LINT
${lint}

[3] API SECURITY SCAN
${apiScan}

[4] ENVIRONMENT VARIABLES
${envCheck}
`;

  const raw = await think(SYSTEM_PROMPT, report);

  let parsed: { summary: string; findings: string[]; proposed_actions: ProposedAction[] };
  try {
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    parsed = JSON.parse(jsonMatch?.[0] || raw);
  } catch {
    parsed = {
      summary: "Agent ran but could not parse structured output.",
      findings: [raw.slice(0, 500)],
      proposed_actions: [],
    };
  }

  return {
    agent: "engineer",
    summary: parsed.summary,
    findings: parsed.findings || [],
    proposed_actions: parsed.proposed_actions || [],
    status: "pending",
  };
}
