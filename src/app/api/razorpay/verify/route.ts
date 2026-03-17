import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

// Use the service role key here to bypass RLS and do trusted server-side writes
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { razorpay_subscription_id, razorpay_payment_id, razorpay_signature } = await req.json();

    // Step 1: Verify Razorpay signature cryptographically
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(razorpay_payment_id + "|" + razorpay_subscription_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 });
    }

    // Step 2: Authenticate the calling user from their JWT token (not from the body)
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // Step 3: Safely update the authenticated user's profile
    const { error } = await supabaseAdmin
      .from('profiles')
      .update({ is_subscriber: true })
      .eq('id', user.id);

    if (error) {
      console.error("Error updating profile in backend:", error);
      return NextResponse.json({ success: false, error: "Failed to update profile" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Subscription verified successfully" });
  } catch (error: any) {
    console.error("Error verifying Razorpay subscription:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
