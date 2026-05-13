import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendEnrollmentEmail } from "@/lib/email";

export const maxDuration = 60;

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function isAuthorized(req: Request): boolean {
  return req.headers.get("authorization") === `Bearer ${process.env.CRON_SECRET}`;
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch free users (not subscribers) who joined more than 2 days ago
  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();

  const { data: freeUsers, error } = await supabaseAdmin
    .from("profiles")
    .select("id, name, grade, city, email_address")
    .eq("is_subscriber", false)
    .lt("created_at", twoDaysAgo)
    .limit(50);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!freeUsers?.length) return NextResponse.json({ ok: true, sent: 0, message: "No eligible users" });

  // Check who was already emailed this week to avoid spam
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const { data: recentlySent } = await supabaseAdmin
    .from("enrollment_emails")
    .select("user_id")
    .gte("sent_at", weekAgo);

  const recentIds = new Set(recentlySent?.map(r => r.user_id) || []);
  const eligible = freeUsers.filter(u => !recentIds.has(u.id) && u.email_address);

  let sent = 0;
  const logs = [];

  for (const user of eligible) {
    try {
      await sendEnrollmentEmail(user.email_address, user.name, user.grade, user.city);
      await supabaseAdmin.from("enrollment_emails").insert({
        user_id: user.id,
        email: user.email_address,
        sent_at: new Date().toISOString(),
      });
      sent++;
      logs.push({ user: user.name, status: "sent" });
    } catch (e: any) {
      logs.push({ user: user.name, status: "failed", error: e.message });
    }
  }

  return NextResponse.json({ ok: true, sent, skipped: eligible.length - sent, logs });
}
