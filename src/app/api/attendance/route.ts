import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const XP_PER_CLASS = 30;
const XP_MODULE_BONUS = 100;
const SESSIONS_PER_MODULE = 12; // 3 days × 4 weeks

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, classId, grade, module, week, day } = body;

  if (!userId || !classId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Idempotent — skip if already recorded
  const { data: existing } = await supabase
    .from("class_attendance")
    .select("id")
    .eq("user_id", userId)
    .eq("class_id", classId)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ alreadyRecorded: true });
  }

  // Insert attendance row
  const { error: insertError } = await supabase
    .from("class_attendance")
    .insert({ user_id: userId, class_id: classId, grade, module, week, day, xp_earned: XP_PER_CLASS });

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  // Fetch current profile stats
  const { data: profile } = await supabase
    .from("profiles")
    .select("xp_total, current_streak, longest_streak, last_attended_date, attended_count")
    .eq("id", userId)
    .maybeSingle();

  // Streak calculation
  const today = new Date().toISOString().split("T")[0];
  let newStreak = 1;
  if (profile?.last_attended_date) {
    const last = new Date(profile.last_attended_date);
    const now = new Date(today);
    const diffDays = Math.floor((now.getTime() - last.getTime()) / 86400000);
    if (diffDays === 0) newStreak = profile.current_streak || 1;       // same day
    else if (diffDays === 1) newStreak = (profile.current_streak || 0) + 1; // consecutive
    // else streak resets to 1
  }

  const newLongest = Math.max(newStreak, profile?.longest_streak || 0);

  // Check if this attendance completes the module → bonus XP
  const { count: moduleCount } = await supabase
    .from("class_attendance")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("module", module)
    .eq("grade", grade);

  const moduleBonus = (moduleCount ?? 0) >= SESSIONS_PER_MODULE ? XP_MODULE_BONUS : 0;

  const newXP = (profile?.xp_total || 0) + XP_PER_CLASS + moduleBonus;
  const newCount = (profile?.attended_count || 0) + 1;

  // Update profile
  await supabase
    .from("profiles")
    .update({
      xp_total: newXP,
      current_streak: newStreak,
      longest_streak: newLongest,
      last_attended_date: today,
      attended_count: newCount,
    })
    .eq("id", userId);

  return NextResponse.json({
    xpEarned: XP_PER_CLASS + moduleBonus,
    moduleBonus: moduleBonus > 0,
    streak: newStreak,
    totalXP: newXP,
    attendedCount: newCount,
  });
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });

  const { data } = await supabase
    .from("class_attendance")
    .select("class_id")
    .eq("user_id", userId);

  return NextResponse.json({ attended: data?.map((r) => r.class_id) ?? [] });
}
