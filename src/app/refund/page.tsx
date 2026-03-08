"use client";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function RefundPage() {
  return (
    <div className="legal-page">
      <header className="legal-header">
        <Link href="/" className="back-link">← Back to Home</Link>
        <h1 className="gradient-text">Refund & Cancellation</h1>
        <p>Last Updated: March 2026</p>
      </header>
      
      <main className="legal-content premium-glass">
        <h2>1. Subscription Cancellations</h2>
        <p>You can cancel your subscription at any time through your parent dashboard. Cancellations will take effect at the end of the current billing cycle.</p>
        
        <h2>2. Refund Eligibility</h2>
        <p>We offer a 7-day money-back guarantee for new subscribers. If you are not satisfied within the first 7 days of your initial purchase, contact support for a full refund.</p>
        
        <h2>3. Pro-rated Refunds</h2>
        <p>After the initial 7-day period, we do not offer pro-rated refunds for unused portions of your subscription term, unless required by law.</p>

        <h2>4. Live Class Cancellations</h2>
        <p>For any standalone live workshops or events, cancellations made 48 hours prior to the event will receive a full refund. No-shows are not eligible for refunds.</p>

        <p><em>This is a placeholder for demonstration purposes. A full legal text should be inserted before live production.</em></p>
      </main>

      <Footer />

      <style jsx>{`
        .legal-page { display: flex; flex-direction: column; min-height: 100vh; }
        .legal-header { padding: 4rem 2rem 2rem; text-align: center; max-width: 800px; margin: 0 auto; }
        .back-link { display: inline-block; color: var(--primary); text-decoration: none; font-weight: 700; margin-bottom: 2rem; }
        .legal-header h1 { font-size: 2.5rem; font-weight: 900; margin-bottom: 0.5rem; }
        .legal-header p { color: var(--muted); font-family: 'Space Mono', monospace; font-size: 0.85rem; }
        .premium-glass { background: rgba(14,22,56,0.6); border: 1px solid rgba(108,99,255,0.2); border-radius: 1.5rem; }
        .legal-content { max-width: 800px; margin: 0 auto 4rem; padding: 3rem; color: var(--foreground); line-height: 1.7; }
        .legal-content h2 { font-size: 1.5rem; color: white; margin: 2rem 0 1rem; }
        .legal-content h2:first-child { margin-top: 0; }
        .legal-content p { margin-bottom: 1rem; color: #cbd5e1; }
      `}</style>
    </div>
  );
}
