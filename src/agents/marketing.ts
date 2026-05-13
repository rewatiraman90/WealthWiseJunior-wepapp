import { createClient } from "@supabase/supabase-js";
import { think } from "./brain";
import type { ProposedAction, AgentLog } from "./types";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const SYSTEM_PROMPT = `You are the Marketing Agent for WealthWise Junior — India's first gamified financial literacy platform for school students (Class 5-12).
Pricing: ₹299/month or ₹2,868/year.
Target audience: Indian parents of school children aged 10-18, teachers, school administrators.
Brand voice: Inspiring, educational, relatable, India-focused. Use Indian examples (UPI, NSE, SIP, NSC).

Your job is to analyse growth metrics and create ready-to-publish marketing content for the CEO to approve.

Always respond in this exact JSON format:
{
  "summary": "marketing summary paragraph",
  "findings": ["finding 1", "finding 2", ...],
  "proposed_actions": [
    {
      "id": "instagram_post",
      "title": "Instagram Post",
      "description": "HOW TO POST: Open Instagram app → tap + → New Post → paste caption below → add relevant image → share. Best time: 7-9 PM IST.",
      "priority": "high",
      "type": "content",
      "payload": {
        "platform": "instagram",
        "content": "Full Instagram caption with emojis and hashtags ready to copy-paste"
      }
    },
    {
      "id": "linkedin_post",
      "title": "LinkedIn Post",
      "description": "HOW TO POST: Open LinkedIn → tap Post → paste content below → post. Best time: Tuesday-Thursday 8-10 AM IST.",
      "priority": "high",
      "type": "content",
      "payload": {
        "platform": "linkedin",
        "content": "Full LinkedIn post for parents, professional tone, ready to copy-paste"
      }
    },
    {
      "id": "whatsapp_message",
      "title": "WhatsApp School Group Message",
      "description": "HOW TO SEND: Open WhatsApp → go to parent/school group → paste message below → send.",
      "priority": "medium",
      "type": "content",
      "payload": {
        "platform": "whatsapp",
        "content": "Short punchy WhatsApp message for parent school groups, ready to copy-paste"
      }
    }
  ]
}`;

export async function runMarketingAgent(): Promise<Omit<AgentLog, "id" | "created_at">> {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const { data: totalUsers } = await supabaseAdmin
    .from("profiles")
    .select("id", { count: "exact" });

  const { data: subscribers } = await supabaseAdmin
    .from("profiles")
    .select("id", { count: "exact" })
    .eq("is_subscriber", true);

  const { data: newThisMonth } = await supabaseAdmin
    .from("profiles")
    .select("id", { count: "exact" })
    .gte("created_at", monthStart);

  const { data: cityBreakdown } = await supabaseAdmin
    .from("profiles")
    .select("city")
    .limit(500);

  const cityCounts: Record<string, number> = {};
  cityBreakdown?.forEach((p) => {
    const c = p.city?.trim() || "Unknown";
    cityCounts[c] = (cityCounts[c] || 0) + 1;
  });
  const topCities = Object.entries(cityCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([city, count]) => `${city}: ${count}`)
    .join(", ");

  const conversionRate = totalUsers?.length
    ? Math.round(((subscribers?.length || 0) / totalUsers.length) * 100)
    : 0;

  const report = `
=== MARKETING AGENT WEEKLY SCAN ===
Date: ${now.toISOString()}
Month: ${now.toLocaleString("en-IN", { month: "long", year: "numeric" })}

[1] GROWTH METRICS
Total registered users: ${totalUsers?.length || 0}
Paying subscribers: ${subscribers?.length || 0}
Conversion rate: ${conversionRate}%
New signups this month: ${newThisMonth?.length || 0}

[2] TOP CITIES
${topCities || "Data not available"}

[3] CONTENT NEEDED
- Weekly social media posts (Instagram, LinkedIn, WhatsApp status)
- Parent-focused content explaining the value of financial literacy
- Student success story format
- Upcoming Indian financial event hooks (Budget, tax season, exam results)

Please generate:
1. One Instagram caption with hashtags
2. One LinkedIn post for parents
3. One WhatsApp message for school groups
4. One growth recommendation based on the metrics above
`;

  const raw = await think(SYSTEM_PROMPT, report);

  let parsed: { summary: string; findings: string[]; proposed_actions: ProposedAction[] };
  try {
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    parsed = JSON.parse(jsonMatch?.[0] || raw);
  } catch {
    parsed = {
      summary: "Marketing agent ran. Content drafts need manual review.",
      findings: [`Total users: ${totalUsers?.length || 0}`, `Subscribers: ${subscribers?.length || 0}`, `Conversion: ${conversionRate}%`],
      proposed_actions: [],
    };
  }

  return {
    agent: "marketing",
    summary: parsed.summary,
    findings: parsed.findings || [],
    proposed_actions: parsed.proposed_actions || [],
    status: "pending",
  };
}
