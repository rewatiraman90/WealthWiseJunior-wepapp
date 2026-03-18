import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getAuthenticatedUser } from '@/lib/serverAuth';

export async function POST(req: Request) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { planType, firstname, email } = await req.json();

    const merchantKey = process.env.PAYU_MERCHANT_KEY;
    const merchantSalt = process.env.PAYU_MERCHANT_SALT;

    if (!merchantKey || !merchantSalt) {
      return NextResponse.json({ 
        success: false, 
        error: "Server Configuration Error: PAYU_MERCHANT_KEY or PAYU_MERCHANT_SALT is missing." 
      }, { status: 500 });
    }
    
    // Generate a unique transaction ID
    const txnid = `WWJ_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    
    // Amount Mapping (matching your existing plan details)
    const amount = planType === 'annual' ? "2868.00" : "299.00";
    const productinfo = planType === 'annual' ? "WealthWise Jr. Annual Subscription" : "WealthWise Jr. Monthly Subscription";
    const udf1 = user.id; // Store userId for callback identification

    // SI Details (Standing Instructions)
    const siDetailsObj = {
      billingCycle: planType === 'annual' ? 'YEARLY' : 'MONTHLY',
      billingInterval: 1,
      paymentDefaultLimit: 1,
      paymentStartDate: new Date().toISOString().split('T')[0],
      paymentEndDate: new Date(new Date().setFullYear(new Date().getFullYear() + 10)).toISOString().split('T')[0], 
      billingAmount: amount,
      recurrence: '0', // 0 often represents until cancelled in PayU
      EnableSI: 1
    };

    const si_details = JSON.stringify(siDetailsObj);

    // Hash Logic: key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT
    // NOTE: si_details is passed as a form field but is NOT included in the hash.
    const hashString = `${merchantKey}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|${udf1}||||||||||${merchantSalt}`;
    
    const hash = crypto.createHash('sha512').update(hashString).digest('hex');

    return NextResponse.json({
      success: true,
      data: {
        key: merchantKey,
        txnid,
        amount,
        productinfo,
        firstname,
        email,
        udf1,
        hash,
        si_details,
        si: '1',
        phone: '9999999999',
        surl: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/payu/callback`,
        furl: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/onboarding?payment=failed`,
        action: process.env.PAYU_BASE_URL?.trim() || 'https://test.payu.in/_payment'
      }
    });
  } catch (error: any) {
    console.error("PayU Create Hash Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
