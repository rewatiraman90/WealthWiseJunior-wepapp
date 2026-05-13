import { createClient } from "@supabase/supabase-js";
import { think } from "./brain";
import type { ProposedAction, AgentLog } from "./types";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const SYSTEM_PROMPT = `You are the Accounting Agent for WealthWise Junior — a financial literacy platform for Indian school students.
Pricing: ₹299/month, ₹2,868/year.
Your job is to analyse revenue data, flag anomalies, and prepare financial summaries for the CEO.

Always respond in this exact JSON format:
{
  "summary": "financial summary paragraph",
  "findings": ["finding 1", "finding 2", ...],
  "proposed_actions": [
    {
      "id": "action_1",
      "title": "Short title",
      "description": "What you recommend and why",
      "priority": "high|medium|low",
      "type": "report|alert",
      "payload": {}
    }
  ]
}`;

export async function runAccountingAgent(): Promise<Omit<AgentLog, "id" | "created_at">> {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString();

  const { data: totalSubscribers } = await supabaseAdmin
    .from("profiles")
    .select("id", { count: "exact" })
    .eq("is_subscriber", true);

  const { data: newThisMonth } = await supabaseAdmin
    .from("profiles")
    .select("id", { count: "exact" })
    .eq("is_subscriber", true)
    .gte("created_at", monthStart);

  const { data: newLastMonth } = await supabaseAdmin
    .from("profiles")
    .select("id", { count: "exact" })
    .eq("is_subscriber", true)
    .gte("created_at", lastMonthStart)
    .lt("created_at", monthStart);

  const { data: recentPayments } = await supabaseAdmin
    .from("payment_logs")
    .select("amount, status, productinfo, created_at")
    .eq("status", "success")
    .gte("created_at", monthStart)
    .order("created_at", { ascending: false })
    .limit(50);

  const { data: failedPayments } = await supabaseAdmin
    .from("payment_logs")
    .select("email, amount, created_at")
    .neq("status", "success")
    .gte("created_at", monthStart);

  const totalRevenue = recentPayments?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0;
  const estimatedMRR = (totalSubscribers?.length || 0) * 299;

  const report = `
=== ACCOUNTING AGENT WEEKLY REPORT ===
Date: ${now.toISOString()}

[1] SUBSCRIBERS
Total active subscribers: ${totalSubscribers?.length || 0}
New this month: ${newThisMonth?.length || 0}
New last month: ${newLastMonth?.length || 0}

[2] REVENUE THIS MONTH
Total collected: ₹${totalRevenue.toLocaleString("en-IN")}
Successful transactions: ${recentPayments?.length || 0}
Failed/cancelled transactions: ${failedPayments?.length || 0}

[3] ESTIMATED MRR
Based on ${totalSubscribers?.length || 0} subscribers × ₹299 = ₹${estimatedMRR.toLocaleString("en-IN")}/month

[4] RECENT TRANSACTIONS
${recentPayments?.slice(0, 5).map((p) => `- ₹${p.amount} (${p.productinfo}) on ${new Date(p.created_at).toLocaleDateString("en-IN")}`).join("\n") || "No transactions this month yet."}

[5] FAILED PAYMENTS
${failedPayments?.length ? `${failedPayments.length} failed payment(s) this month. May need follow-up.` : "No failed payments this month."}
`;

  const raw = await think(SYSTEM_PROMPT, report);

  let parsed: { summary: string; findings: string[]; proposed_actions: ProposedAction[] };
  try {
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    parsed = JSON.parse(jsonMatch?.[0] || raw);
  } catch {
    parsed = {
      summary: `MRR: ₹${estimatedMRR.toLocaleString("en-IN")} | Subscribers: ${totalSubscribers?.length || 0} | Revenue this month: ₹${totalRevenue.toLocaleString("en-IN")}`,
      findings: [`${newThisMonth?.length || 0} new subscribers this month`],
      proposed_actions: [],
    };
  }

  return {
    agent: "accounting",
    summary: parsed.summary,
    findings: parsed.findings || [],
    proposed_actions: parsed.proposed_actions || [],
    status: "pending",
  };
}
