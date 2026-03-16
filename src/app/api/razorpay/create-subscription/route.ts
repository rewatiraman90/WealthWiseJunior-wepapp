import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: Request) {
  try {
    const { planType } = await req.json(); // expected 'monthly' or 'annual'

    let planId = "";
    if (planType === 'monthly') {
      planId = process.env.RAZORPAY_PLAN_MONTHLY_ID!;
    } else if (planType === 'annual') {
      planId = process.env.RAZORPAY_PLAN_ANNUAL_ID!;
    } else {
      return NextResponse.json({ success: false, error: "Invalid plan type." }, { status: 400 });
    }

    if (!planId) {
      return NextResponse.json({ success: false, error: "Plan ID not configured on server." }, { status: 500 });
    }

    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    // Create a subscription
    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      customer_notify: 1, // Let Razorpay handle email notifications
      total_count: 120    // 10 years of billing cycles for recurring
    });

    return NextResponse.json({
      success: true,
      subscription_id: subscription.id,
    });
  } catch (error: any) {
    console.error("Error creating Razorpay subscription:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
