import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: Request) {
  try {
    const { razorpay_subscription_id, razorpay_payment_id, razorpay_signature, userId } = await req.json();

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(razorpay_payment_id + "|" + razorpay_subscription_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 });
    }

    // If userId exists, conditionally update the Supabase profile on the backend 
    // to ensure the user gets access even if the client closes unexpectedly after payment
    if (userId) {
      const { error } = await supabase
        .from('profiles')
        .update({ is_subscriber: true })
        .eq('id', userId);
      
      if (error) {
        console.error("Error updating profile gracefully in backend:", error);
      }
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
