import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, classId, grade, module, score, passed, answersSubmitted } = body;

  if (!userId || !classId || score === undefined || passed === undefined) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { error } = await supabase.from("assessment_scores").insert({
    user_id: userId,
    class_id: classId,
    grade,
    module,
    score,
    total_questions: 3,
    passed,
    answers_submitted: answersSubmitted,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  const classId = req.nextUrl.searchParams.get("classId");

  if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });

  let query = supabase
    .from("assessment_scores")
    .select("class_id, score, passed, answers_submitted, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (classId) query = query.eq("class_id", classId);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ scores: data });
}
