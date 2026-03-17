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

    const merchantKey = process.env.PAYU_MERCHANT_KEY!;
    const merchantSalt = process.env.PAYU_MERCHANT_SALT!;
    
    // Generate a unique transaction ID
    const txnid = `WWJ_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    
    // Amount Mapping (matching your existing plan details)
    const amount = planType === 'annual' ? "2868.00" : "299.00";
    const productinfo = planType === 'annual' ? "WealthWise Jr. Annual Subscription" : "WealthWise Jr. Monthly Subscription";
    const udf1 = user.id; // Store userId for callback identification

    // SI Details (Standing Instructions)
    const siDetailsObj = {
      billingCycle: planType === 'annual' ? 'Yearly' : 'Monthly',
      billingInterval: 1,
      paymentDefaultLimit: 1,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 10)).toISOString().split('T')[0], 
      amount: amount,
      recurrence: 'forever'
    };

    const si_details = JSON.stringify(siDetailsObj);

    // Hash Logic: key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||si_details|SALT
    const hashString = `${merchantKey}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|${udf1}||||||||||${si_details}|${merchantSalt}`;
    
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
        surl: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/payu/callback`,
        furl: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/onboarding?payment=failed`,
        action: process.env.PAYU_BASE_URL || 'https://test.payu.in/_payment'
      }
    });
  } catch (error: any) {
    console.error("PayU Create Hash Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
