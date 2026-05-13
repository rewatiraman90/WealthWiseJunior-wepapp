import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/serverAuth";
import { sendWelcomeEmail } from "@/lib/email";

export async function POST(req: Request) {
  const user = await getAuthenticatedUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, rollNumber } = await req.json();
  if (!name || !rollNumber) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  try {
    await sendWelcomeEmail(user.email!, name, rollNumber);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Welcome email error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
