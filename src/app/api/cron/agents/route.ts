import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { runEngineerAgent } from "@/agents/engineer";
import { runSupportAgent } from "@/agents/support";
import { runAccountingAgent } from "@/agents/accounting";
import { runMarketingAgent } from "@/agents/marketing";
import { sendWelcomeEmail } from "@/lib/email";

export const maxDuration = 60;

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Vercel calls this with CRON_SECRET in Authorization header
function isAuthorized(req: Request): boolean {
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${process.env.CRON_SECRET}`;
}

async function saveLog(result: any) {
  await supabaseAdmin.from("agent_logs").insert(result);
}

async function alertCEO(agent: string, summary: string, highPriorityCount: number) {
  if (!process.env.ADMIN_EMAIL || highPriorityCount === 0) return;
  await sendWelcomeEmail(
    process.env.ADMIN_EMAIL,
    "CEO Alert",
    `🤖 ${agent} Agent found ${highPriorityCount} HIGH priority issue(s):\n\n${summary}\n\nReview at: ${process.env.NEXT_PUBLIC_SITE_URL}/admin`
  );
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const agent = searchParams.get("agent") || "engineer";

  try {
    let result: any;

    if (agent === "engineer") result = await runEngineerAgent();
    else if (agent === "support") result = await runSupportAgent();
    else if (agent === "accounting") result = await runAccountingAgent();
    else if (agent === "marketing") result = await runMarketingAgent();
    else return NextResponse.json({ error: "Unknown agent" }, { status: 400 });

    await saveLog(result);

    // Alert CEO if high priority issues found
    const highCount = result.proposed_actions?.filter((a: any) => a.priority === "high").length || 0;
    await alertCEO(agent, result.summary, highCount);

    return NextResponse.json({ ok: true, agent, findings: result.findings?.length });
  } catch (err: any) {
    console.error(`Cron agent ${agent} failed:`, err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
