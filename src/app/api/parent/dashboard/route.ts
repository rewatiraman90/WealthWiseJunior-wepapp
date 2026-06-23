import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getAuthenticatedUser } from "@/lib/serverAuth";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  const user = await getAuthenticatedUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile, error } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  // City rankings — fetch name and school for display
  const { data: cityProfiles } = await supabaseAdmin
    .from("profiles")
    .select("id, name, school, xp_total")
    .ilike("city", `%${profile.city}%`);

  const sortedCity = (cityProfiles || []).sort((a, b) => (b.xp_total || 0) - (a.xp_total || 0));
  const cityRank = sortedCity.findIndex((p) => p.id === user.id) + 1;
  const cityTotal = sortedCity.length;

  const cityTopStudents = sortedCity.slice(0, 5).map((p, i) => ({
    rank: i + 1,
    name: p.id === user.id ? "You ✨" : (p.name || "Student"),
    school: p.school || "School",
    xp: p.xp_total || 0,
    isMe: p.id === user.id,
  }));

  // Overall rank
  const { data: allProfiles } = await supabaseAdmin
    .from("profiles")
    .select("id, xp_total");
  const sortedAll = (allProfiles || []).sort((a, b) => (b.xp_total || 0) - (a.xp_total || 0));
  const overallRank = sortedAll.findIndex((p) => p.id === user.id) + 1;

  // Real attendance from class_attendance table
  const { data: attendance } = await supabaseAdmin
    .from("class_attendance")
    .select("class_id, grade, module, week, day, xp_earned, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10);

  return NextResponse.json({
    profile: {
      id: profile.id,
      name: profile.name,
      grade: profile.grade,
      school: profile.school,
      city: profile.city,
      rollNumber: profile.roll_number,
      avatarUrl: profile.avatar_url,
      xp: profile.xp_total || 0,
      streak: profile.current_streak || 0,
      attendedCount: profile.attended_count || 0,
      isSubscriber: profile.is_subscriber,
      joinedAt: profile.created_at,
    },
    ranks: {
      cityRank: cityRank || null,
      cityTotal,
      overallRank: overallRank || null,
    },
    cityTopStudents,
    recentAttendance: attendance || [],
  });
}
