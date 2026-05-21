import { Resend } from "resend";

const getResend = () => new Resend(process.env.RESEND_API_KEY || "re_placeholder");
const FROM = process.env.RESEND_FROM_EMAIL || "WealthWise Junior <onboarding@resend.dev>";

export async function sendWelcomeEmail(to: string, name: string, rollNumber: string) {
  return getResend().emails.send({
    from: FROM,
    to,
    subject: `Welcome to WealthWise Junior, ${name}! 🎓`,
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0E1638; color: #fff; padding: 40px 32px; border-radius: 16px;">
        <h1 style="color: #6C63FF; font-size: 28px; margin-bottom: 8px;">Welcome aboard, ${name}!</h1>
        <p style="color: #a0aec0; font-size: 16px; line-height: 1.6;">
          You've just joined <strong style="color: #fff;">12,000+ students</strong> building real money skills across India.
        </p>
        <div style="background: rgba(108,99,255,0.15); border: 1px solid rgba(108,99,255,0.3); border-radius: 12px; padding: 20px; margin: 24px 0;">
          <p style="margin: 0; font-size: 14px; color: #a0aec0;">Your Roll Number</p>
          <p style="margin: 4px 0 0; font-size: 22px; font-weight: 900; color: #6C63FF; letter-spacing: 2px;">${rollNumber}</p>
        </div>
        <p style="color: #a0aec0; font-size: 15px; line-height: 1.6;">
          Here's what to do next:<br/>
          1. Visit your <strong style="color: #fff;">Campus</strong> to start your first lesson<br/>
          2. Ask <strong style="color: #fff;">Sir</strong> (AI Teacher) your first money question<br/>
          3. Complete your <strong style="color: #fff;">3-Jar activity</strong> in the Lab
        </p>
        <a href="https://www.wwjcampus.in.net/campus" style="display: inline-block; background: #6C63FF; color: white; padding: 14px 28px; border-radius: 50px; font-weight: 700; text-decoration: none; margin-top: 16px;">
          Go to Campus →
        </a>
        <p style="color: #4a5568; font-size: 13px; margin-top: 32px;">
          Questions? Reply to this email or visit <a href="https://www.wwjcampus.in.net/contact" style="color: #6C63FF;">wwjcampus.in.net/contact</a>
        </p>
      </div>
    `,
  });
}

export async function sendEnrollmentEmail(to: string, name: string, grade: string, city: string) {
  return getResend().emails.send({
    from: FROM,
    to,
    subject: `${name}, your free WealthWise Junior access is waiting 🎓`,
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0E1638; color: #fff; padding: 40px 32px; border-radius: 16px;">
        <h1 style="color: #6C63FF; font-size: 26px; margin-bottom: 8px;">Hi ${name}! 👋</h1>
        <p style="color: #a0aec0; font-size: 16px; line-height: 1.7;">
          You created your WealthWise Junior account but haven't unlocked full access yet.
        </p>
        <p style="color: #a0aec0; font-size: 15px; line-height: 1.7;">
          Students in <strong style="color:#fff;">Class ${grade}</strong> from <strong style="color:#fff;">${city}</strong> are already learning:
        </p>
        <ul style="color: #a0aec0; font-size: 15px; line-height: 2; padding-left: 1.2rem;">
          <li>How to grow money using SIP & compound interest</li>
          <li>How India's stock market (NSE/BSE) actually works</li>
          <li>How to budget with the 3-Jar method</li>
          <li>How to build a Freedom Roadmap for their future</li>
        </ul>
        <div style="background: rgba(108,99,255,0.12); border: 1px solid rgba(108,99,255,0.3); border-radius: 12px; padding: 20px; margin: 24px 0; text-align: center;">
          <p style="margin: 0 0 4px; font-size: 13px; color: #a0aec0;">Full access — everything unlocked</p>
          <p style="margin: 0; font-size: 28px; font-weight: 900; color: #6C63FF;">₹299 <span style="font-size: 14px; font-weight: 400; color: #a0aec0;">/ month</span></p>
          <p style="margin: 4px 0 0; font-size: 13px; color: #00E5A0;">or ₹2,868/year — save 20%</p>
        </div>
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}/onboarding?upgrade=true" style="display: block; text-align: center; background: #6C63FF; color: white; padding: 16px 28px; border-radius: 50px; font-weight: 900; text-decoration: none; font-size: 16px; margin-top: 8px;">
          Unlock Full Access →
        </a>
        <p style="color: #4a5568; font-size: 13px; margin-top: 32px; text-align: center;">
          Questions? Reply to this email or visit <a href="${process.env.NEXT_PUBLIC_SITE_URL}/contact" style="color: #6C63FF;">our contact page</a>
        </p>
      </div>
    `,
  });
}

export async function sendSubscriptionConfirmEmail(
  to: string,
  name: string,
  plan: "monthly" | "annual",
  amount: number
) {
  const planLabel = plan === "annual" ? "Annual Plan" : "Monthly Plan";
  const nextDate = new Date();
  plan === "annual" ? nextDate.setFullYear(nextDate.getFullYear() + 1) : nextDate.setMonth(nextDate.getMonth() + 1);
  const nextRenewal = nextDate.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  return getResend().emails.send({
    from: FROM,
    to,
    subject: `Payment confirmed — ${planLabel} activated ✅`,
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0E1638; color: #fff; padding: 40px 32px; border-radius: 16px;">
        <h1 style="color: #00E5A0; font-size: 26px; margin-bottom: 8px;">Payment Confirmed ✅</h1>
        <p style="color: #a0aec0; font-size: 16px;">Hi ${name}, your subscription is now active.</p>
        <div style="background: rgba(0,229,160,0.08); border: 1px solid rgba(0,229,160,0.25); border-radius: 12px; padding: 20px; margin: 24px 0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="color: #a0aec0; padding: 6px 0; font-size: 14px;">Plan</td><td style="color: #fff; font-weight: 700; text-align: right;">${planLabel}</td></tr>
            <tr><td style="color: #a0aec0; padding: 6px 0; font-size: 14px;">Amount Paid</td><td style="color: #00E5A0; font-weight: 900; text-align: right;">₹${amount}</td></tr>
            <tr><td style="color: #a0aec0; padding: 6px 0; font-size: 14px;">Next Renewal</td><td style="color: #fff; font-weight: 700; text-align: right;">${nextRenewal}</td></tr>
          </table>
        </div>
        <p style="color: #a0aec0; font-size: 15px;">You now have full access to all video classes, the AI Teacher, and the Parent Dashboard.</p>
        <a href="https://www.wwjcampus.in.net/campus" style="display: inline-block; background: #6C63FF; color: white; padding: 14px 28px; border-radius: 50px; font-weight: 700; text-decoration: none; margin-top: 8px;">
          Start Learning →
        </a>
        <p style="color: #4a5568; font-size: 13px; margin-top: 32px;">
          Need help? <a href="https://www.wwjcampus.in.net/contact" style="color: #6C63FF;">Contact support</a>
        </p>
      </div>
    `,
  });
}
