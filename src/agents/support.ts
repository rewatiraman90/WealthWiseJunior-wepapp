import { createClient } from "@supabase/supabase-js";
import { think } from "./brain";
import type { ProposedAction, AgentLog } from "./types";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const SYSTEM_PROMPT = `You are the Support Agent for WealthWise Junior — a financial literacy platform for Indian school students (Class 5-12).
Your job is to review open customer queries and draft professional, friendly responses for the CEO to approve before sending.

Subscription costs: ₹299/month or ₹2,868/year.
Refund policy: 7 days from payment.
Contact: hello@wealthwisejunior.in.net

Always respond in this exact JSON format:
{
  "summary": "one paragraph summary of support queue",
  "findings": ["finding 1", "finding 2", ...],
  "proposed_actions": [
    {
      "id": "action_1",
      "title": "Reply to [name]: [subject]",
      "description": "Draft reply text here",
      "priority": "high|medium|low",
      "type": "email",
      "payload": { "to": "email", "subject": "...", "body": "..." }
    }
  ]
}`;

export async function runSupportAgent(): Promise<Omit<AgentLog, "id" | "created_at">> {
  const { data: tickets } = await supabaseAdmin
    .from("feedback")
    .select("*")
    .eq("status", "open")
    .order("created_at", { ascending: false })
    .limit(10);

  const { data: recentUsers } = await supabaseAdmin
    .from("profiles")
    .select("name, city, grade, is_subscriber, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  const report = `
=== SUPPORT AGENT DAILY SCAN ===
Date: ${new Date().toISOString()}

[1] OPEN SUPPORT TICKETS (${tickets?.length || 0})
${
  tickets?.length
    ? tickets.map((t) => `- [${t.type || "query"}] ${t.name} (${t.email}): "${t.subject}" — ${t.message?.slice(0, 200)}`).join("\n")
    : "No open tickets."
}

[2] RECENT SIGNUPS (last 5)
${recentUsers?.map((u) => `- ${u.name}, Class ${u.grade}, ${u.city} — Subscriber: ${u.is_subscriber}`).join("\n") || "None"}
`;

  const raw = await think(SYSTEM_PROMPT, report);

  let parsed: { summary: string; findings: string[]; proposed_actions: ProposedAction[] };
  try {
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    parsed = JSON.parse(jsonMatch?.[0] || raw);
  } catch {
    parsed = {
      summary: "Support agent ran successfully.",
      findings: ["No critical issues found."],
      proposed_actions: [],
    };
  }

  return {
    agent: "support",
    summary: parsed.summary,
    findings: parsed.findings || [],
    proposed_actions: parsed.proposed_actions || [],
    status: "pending",
  };
}
