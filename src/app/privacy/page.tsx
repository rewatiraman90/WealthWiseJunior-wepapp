"use client";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="legal-page">
      <header className="legal-header">
        <Link href="/" className="back-link">← Back to Home</Link>
        <h1 className="gradient-text">Privacy Policy</h1>
        <p>Last Updated: March 2026</p>
      </header>
      
      <main className="legal-content premium-glass">
        <h2>1. Information We Collect</h2>
        <p>We collect information you provide directly to us when you create an account, such as your name, email address, child's age, and school information.</p>
        
        <h2>2. How We Use Information</h2>
        <p>We use the information we collect to provide, maintain, and improve our educational services, and to process your transactions.</p>
        
        <h2>3. Data Security</h2>
        <p>We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.</p>

        <h2>4. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at support@wealthwisejunior.in.</p>

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
