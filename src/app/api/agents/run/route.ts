import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getAuthenticatedUser } from "@/lib/serverAuth";
import { runEngineerAgent } from "@/agents/engineer";
import { runSupportAgent } from "@/agents/support";
import { runAccountingAgent } from "@/agents/accounting";
import { runMarketingAgent } from "@/agents/marketing";
import type { AgentName } from "@/agents/types";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const user = await getAuthenticatedUser(req);
  if (!user?.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const { agent } = await req.json() as { agent: AgentName };

  const runners: Record<AgentName, () => Promise<unknown>> = {
    engineer: runEngineerAgent,
    support: runSupportAgent,
    accounting: runAccountingAgent,
    marketing: runMarketingAgent,
  };

  if (!runners[agent]) return NextResponse.json({ error: "Unknown agent" }, { status: 400 });

  const result = await runners[agent]();

  const { data, error } = await supabaseAdmin
    .from("agent_logs")
    .insert(result)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, log: data });
}
