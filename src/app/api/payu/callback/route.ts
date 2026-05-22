import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { sendSubscriptionConfirmEmail } from '@/lib/email';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function POST(req: Request) {
  let data: Record<string, string> = {};

  try {
    const formData = await req.formData();
    formData.forEach((value, key) => { data[key] = value as string; });

    const { hash, status, firstname, email, amount, txnid, productinfo, udf1: userId, key } = data;

    // Idempotency: skip if this transaction was already processed
    const { data: existing } = await supabaseAdmin
      .from('payment_logs')
      .select('id')
      .eq('txnid', txnid)
      .single();

    if (existing) {
      return NextResponse.redirect(`${SITE_URL}/campus`, { status: 303 });
    }

    // Hash verification
    const salt = process.env.PAYU_MERCHANT_SALT!;
    const hashString = `${salt}|${status}|||||||||${userId}|${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
    const generatedHash = crypto.createHash('sha512').update(hashString).digest('hex');

    if (generatedHash !== hash) {
      console.error('PayU hash mismatch — possible tampered callback. txnid:', txnid);
      return NextResponse.redirect(`${SITE_URL}/onboarding?payment=failed`, { status: 303 });
    }

    // Log transaction regardless of status for audit trail
    await supabaseAdmin.from('payment_logs').insert({
      txnid,
      user_id: userId || null,
      email: email || null,
      amount: parseFloat(amount) || 0,
      status,
      productinfo: productinfo || null,
      raw_payload: data,
    }).then(({ error: logErr }) => { if (logErr) console.error('payment_logs insert failed:', logErr); });

    if (status === 'success' && userId) {
      const { error: updateError } = await supabaseAdmin
        .from('profiles')
        .update({ is_subscriber: true })
        .eq('id', userId);

      if (updateError) {
        console.error('Supabase subscriber update failed:', updateError);
        // Retry once after brief delay
        await new Promise(r => setTimeout(r, 800));
        await supabaseAdmin
          .from('profiles')
          .update({ is_subscriber: true })
          .eq('id', userId);
      }

      // Send confirmation email (non-blocking — don't let email failure break the flow)
      const plan = productinfo?.toLowerCase().includes('annual') ? 'annual' : 'monthly';
      sendSubscriptionConfirmEmail(email, firstname, plan, parseFloat(amount)).catch((e) =>
        console.error('Subscription email failed:', e)
      );

      return NextResponse.redirect(`${SITE_URL}/campus?payment=success`, { status: 303 });
    }

    return NextResponse.redirect(`${SITE_URL}/onboarding?payment=failed`, { status: 303 });

  } catch (error: any) {
    console.error('PayU Callback Error:', error);
    return NextResponse.redirect(`${SITE_URL}/onboarding?payment=error`, { status: 303 });
  }
}
