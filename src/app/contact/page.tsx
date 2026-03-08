"use client";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <div className="legal-page">
      <header className="legal-header">
        <Link href="/" className="back-link">← Back to Home</Link>
        <h1 className="gradient-text">Contact Us</h1>
        <p>We're here to help you and your child on your financial journey.</p>
      </header>
      
      <main className="legal-content premium-glass">
        <div className="contact-grid">
          <div className="contact-card">
            <span className="contact-icon">📧</span>
            <h3>Email Support</h3>
            <p>For technical issues, billing, or general inquiries:</p>
            <a href="mailto:support@wealthwisejunior.in" className="contact-link">support@wealthwisejunior.in</a>
          </div>

          <div className="contact-card">
            <span className="contact-icon">📱</span>
            <h3>Phone Support</h3>
            <p>Available Mon-Fri, 9am - 6pm IST:</p>
            <a href="tel:+919876543210" className="contact-link">+91 98765 43210</a>
          </div>

          <div className="contact-card">
            <span className="contact-icon">🏢</span>
            <h3>Registered Office</h3>
            <p>WealthWise Education Pvt. Ltd.</p>
            <p>123 Startup Hub, Koramangala<br/>Bengaluru, Karnataka 560034</p>
          </div>
        </div>

        <div className="form-section">
          <h2>Send us a Message</h2>
          <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully!"); }}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" required placeholder="Parent or Student Name" />
            </div>
            <div className="form-group">
              <label>Email ID</label>
              <input type="email" required placeholder="your@email.com" />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea required rows={5} placeholder="How can we help?"></textarea>
            </div>
            <button type="submit" className="btn-primary">Send Message</button>
          </form>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .legal-page { display: flex; flex-direction: column; min-height: 100vh; }
        .legal-header { padding: 4rem 2rem 2rem; text-align: center; max-width: 800px; margin: 0 auto; }
        .back-link { display: inline-block; color: var(--primary); text-decoration: none; font-weight: 700; margin-bottom: 2rem; }
        .legal-header h1 { font-size: 2.5rem; font-weight: 900; margin-bottom: 0.5rem; }
        .legal-header p { color: var(--muted); font-size: 1.1rem; }
        .premium-glass { background: rgba(14,22,56,0.6); border: 1px solid rgba(108,99,255,0.2); border-radius: 1.5rem; }
        .legal-content { max-width: 900px; margin: 0 auto 4rem; padding: 3rem; color: var(--foreground); }
        
        .contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 4rem; }
        .contact-card { text-align: center; padding: 2rem; background: rgba(0,0,0,0.3); border-radius: 1rem; border: 1px solid rgba(255,255,255,0.05); }
        .contact-icon { font-size: 2.5rem; margin-bottom: 1rem; display: block; }
        .contact-card h3 { font-size: 1.2rem; margin-bottom: 0.5rem; color: white; }
        .contact-card p { color: var(--muted); font-size: 0.9rem; margin-bottom: 1rem; line-height: 1.5; }
        .contact-link { color: var(--neon-green); text-decoration: none; font-weight: 700; font-family: 'Space Mono', monospace; }
        .contact-link:hover { text-decoration: underline; }

        .form-section h2 { text-align: center; margin-bottom: 2rem; color: white; }
        .contact-form { max-width: 600px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .form-group label { font-size: 0.85rem; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; }
        .form-group input, .form-group textarea { background: rgba(0,0,0,0.3); border: 1px solid var(--border); color: white; padding: 1rem; border-radius: 0.75rem; font-family: inherit; font-size: 1rem; transition: border-color 0.2s; }
        .form-group input:focus, .form-group textarea:focus { outline: none; border-color: var(--primary); }
        .btn-primary { align-self: center; padding: 1rem 3rem; margin-top: 1rem; }
      `}</style>
    </div>
  );
}
