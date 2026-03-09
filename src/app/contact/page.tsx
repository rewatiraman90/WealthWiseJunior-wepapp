"use client";
import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabaseClient";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", type: "general", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: insertError } = await supabase.from("feedback").insert([{
      name: form.name,
      email: form.email,
      subject: form.subject,
      type: form.type,
      message: form.message,
      status: "unread",
    }]);

    setLoading(false);
    if (insertError) {
      setError("Something went wrong. Please try again.");
    } else {
      setSuccess(true);
      setForm({ name: "", email: "", subject: "", type: "general", message: "" });
    }
  };

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

          {success ? (
            <div className="success-box">
              <span style={{ fontSize: "3rem" }}>✅</span>
              <h3>Message Received!</h3>
              <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
              <button className="btn-outline" onClick={() => setSuccess(false)} style={{ marginTop: "1rem", padding: "0.6rem 1.5rem" }}>
                Send Another
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text" required placeholder="Parent or Student Name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Email ID</label>
                  <input
                    type="email" required placeholder="your@email.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text" required placeholder="e.g. Login Issue, Billing Query"
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Type</label>
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                    <option value="general">General Inquiry</option>
                    <option value="feedback">Feedback</option>
                    <option value="complaint">Complaint</option>
                    <option value="technical">Technical Issue</option>
                    <option value="billing">Billing / Subscription</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  required rows={5} placeholder="How can we help? Please describe in detail..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                />
              </div>
              {error && <p className="error-msg">⚠️ {error}</p>}
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Sending..." : "Send Message →"}
              </button>
            </form>
          )}
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
        .contact-form { max-width: 700px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.25rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .form-group label { font-size: 0.8rem; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; }
        .form-group input, .form-group textarea, .form-group select { background: rgba(0,0,0,0.3); border: 1px solid var(--border); color: white; padding: 1rem; border-radius: 0.75rem; font-family: inherit; font-size: 1rem; transition: border-color 0.2s; }
        .form-group select option { background: #0e1638; }
        .form-group input:focus, .form-group textarea:focus, .form-group select:focus { outline: none; border-color: var(--primary); }
        .btn-primary { align-self: center; padding: 1rem 3rem; margin-top: 0.5rem; }
        .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
        .error-msg { color: #FF6680; font-size: 0.85rem; font-weight: 700; text-align: center; }

        .success-box { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; padding: 3rem; text-align: center; }
        .success-box h3 { font-size: 1.5rem; font-weight: 900; color: var(--neon-green); }
        .success-box p { color: var(--muted); font-size: 1rem; }

        @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
