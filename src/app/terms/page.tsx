"use client";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="legal-page">
      <header className="legal-header">
        <Link href="/" className="back-link">← Back to Home</Link>
        <h1 className="gradient-text">Terms & Conditions</h1>
        <p>Last Updated: March 2026</p>
      </header>
      
      <main className="legal-content premium-glass">
        <h2>1. Introduction</h2>
        <p>Welcome to WealthWise Junior. By accessing or using our platform, you agree to be bound by these Terms and Conditions.</p>
        
        <h2>2. Use of Platform</h2>
        <p>Our educational content is provided for informational purposes only. It does not constitute professional financial advice.</p>
        
        <h2>3. Subscription and Payments</h2>
        <p>We use third-party payment gateways for processing subscriptions. By initiating a payment, you agree to their respective terms of service.</p>

        <h2>4. User Conduct</h2>
        <p>Any abuse of the AI Teacher functionality or harassment within the community features will result in immediate suspension of your account.</p>

        <p><em>This is a placeholder for demonstration purposes. A full legal text should be inserted before live production.</em></p>
      </main>

      <Footer />

      <style jsx>{`
        .legal-page {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .legal-header {
          padding: 4rem 2rem 2rem;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }
        .back-link {
          display: inline-block;
          color: var(--primary);
          text-decoration: none;
          font-weight: 700;
          margin-bottom: 2rem;
        }
        .legal-header h1 {
          font-size: 2.5rem;
          font-weight: 900;
          margin-bottom: 0.5rem;
        }
        .legal-header p {
          color: var(--muted);
          font-family: 'Space Mono', monospace;
          font-size: 0.85rem;
        }
        .premium-glass {
          background: rgba(14,22,56,0.6);
          border: 1px solid rgba(108,99,255,0.2);
          border-radius: 1.5rem;
        }
        .legal-content {
          max-width: 800px;
          margin: 0 auto 4rem;
          padding: 3rem;
          color: var(--foreground);
          line-height: 1.7;
        }
        .legal-content h2 {
          font-size: 1.5rem;
          color: white;
          margin: 2rem 0 1rem;
        }
        .legal-content h2:first-child {
          margin-top: 0;
        }
        .legal-content p {
          margin-bottom: 1rem;
          color: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
