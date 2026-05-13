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

  // Rank within city
  const { data: cityProfiles } = await supabaseAdmin
    .from("profiles")
    .select("id, xp")
    .ilike("city", `%${profile.city}%`);

  const sortedCity = (cityProfiles || []).sort((a, b) => (b.xp || 0) - (a.xp || 0));
  const cityRank = sortedCity.findIndex((p) => p.id === user.id) + 1;
  const cityTotal = sortedCity.length;

  // Overall rank
  const { data: allProfiles } = await supabaseAdmin
    .from("profiles")
    .select("id, xp");
  const sortedAll = (allProfiles || []).sort((a, b) => (b.xp || 0) - (a.xp || 0));
  const overallRank = sortedAll.findIndex((p) => p.id === user.id) + 1;

  return NextResponse.json({
    profile: {
      id: profile.id,
      name: profile.name,
      grade: profile.grade,
      school: profile.school,
      city: profile.city,
      rollNumber: profile.roll_number,
      avatarUrl: profile.avatar_url,
      xp: profile.xp || 0,
      streak: profile.streak || 0,
      isSubscriber: profile.is_subscriber,
      joinedAt: profile.created_at,
    },
    ranks: {
      cityRank: cityRank || null,
      cityTotal,
      overallRank: overallRank || null,
    },
  });
}
