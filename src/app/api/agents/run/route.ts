import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getAuthenticatedUser } from "@/lib/serverAuth";
import { runEngineerAgent } from "@/agents/engineer";
import { runSupportAgent } from "@/agents/support";
import { runAccountingAgent } from "@/agents/accounting";
import { runMarketingAgent } from "@/agents/marketing";
import type { AgentName } from "@/agents/types";

// Extend timeout to 60s for Gemini API calls
export const maxDuration = 60;

// Per-user sliding window: max 5 agent runs per hour
const RATE_LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000;
const userTimestamps = new Map<string, number[]>();

function isRateLimited(userId: string): { limited: boolean; remaining: number; resetInMs: number } {
  const now = Date.now();
  const timestamps = (userTimestamps.get(userId) ?? []).filter(t => now - t < WINDOW_MS);
  const remaining = Math.max(0, RATE_LIMIT - timestamps.length);
  const resetInMs = timestamps.length > 0 ? WINDOW_MS - (now - timestamps[0]) : 0;
  if (timestamps.length >= RATE_LIMIT) return { limited: true, remaining: 0, resetInMs };
  timestamps.push(now);
  userTimestamps.set(userId, timestamps);
  return { limited: false, remaining: remaining - 1, resetInMs };
}

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user?.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    const { limited, remaining, resetInMs } = isRateLimited(user.id);
    if (limited) {
      const resetInMins = Math.ceil(resetInMs / 60000);
      return NextResponse.json(
        { error: `Rate limit exceeded. You can run at most ${RATE_LIMIT} agents per hour. Try again in ${resetInMins} min.` },
        { status: 429, headers: { "Retry-After": String(Math.ceil(resetInMs / 1000)) } }
      );
    }

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

    return NextResponse.json({ ok: true, log: data, remaining });
  } catch (err: any) {
    console.error("Agent run error:", err);
    return NextResponse.json({ error: err.message || "Agent failed" }, { status: 500 });
  }
}
