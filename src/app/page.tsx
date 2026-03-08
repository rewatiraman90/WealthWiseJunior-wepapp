"use client";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

export default function StudentLandingPage() {
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    setHasProfile(!!localStorage.getItem('wwj_profile'));
  }, []);

  return (
    <div className="landing-page">
      {/* ══ HEADER ══ */}
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem 2rem', alignItems: 'center' }}>
        <div className="logo" style={{ fontWeight: 900, fontSize: "1.4rem", letterSpacing: "-0.03em" }}>
          <span className="gradient-text">WealthWise</span> <span style={{ color: "var(--neon-green)" }}>Jr.</span>
        </div>
        <Link href={hasProfile ? "/campus" : "/onboarding"} className="btn-outline" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>
          {hasProfile ? "Go to Campus" : "Student Login"}
        </Link>
      </header>

      {/* ══ HERO ══ */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="live-dot" /> <span>Real-world skills you won't learn in school</span>
          </div>
          <h1 className="hero-title">
            Master Money.<br />
            <span className="gradient-text">Build Your Empire.</span>
          </h1>
          <p className="hero-sub">
            School teaches you how to work for money. WealthWise Junior teaches you how to make money work for you. Discover the cheat codes to wealth, earn real rewards, and unlock your Freedom GPS.
          </p>
          <div className="hero-actions">
            <Link href="/onboarding" className="btn-neon pulse" style={{ fontSize: "1.1rem", padding: "1rem 2.5rem" }}>
              Subscribe Now →
            </Link>
            <Link href="/parent" className="btn-outline">
              For Parents
            </Link>
          </div>
          <div className="hero-stats">
            <div className="h-stat">
              <span className="hs-val">12,000+</span>
              <span className="hs-lbl">Students Earning XP</span>
            </div>
            <div className="h-stat">
              <span className="hs-val">Class 5-12</span>
              <span className="hs-lbl">Tailored Curriculum</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="device-mockup premium-glass">
            <div className="mockup-header">
              <div className="dots">
                <span className="dot r" /><span className="dot y" /><span className="dot g" />
              </div>
              <span className="mockup-title">WealthWise Jr. Campus</span>
            </div>
            <div className="mockup-body">
              <div className="mk-card mk-1">
                <span className="mk-icon">💎</span>
                <div className="mk-info">
                  <span className="mk-title">+500 WealthPoints</span>
                  <span className="mk-sub">You completed: Compound Interest</span>
                </div>
              </div>
              <div className="mk-card mk-2">
                <span className="mk-icon">🏆</span>
                <div className="mk-info">
                  <span className="mk-title">Rank #4 Secured!</span>
                  <span className="mk-sub">Bengaluru City Leaderboard</span>
                </div>
              </div>
              <div className="mk-profile">
                <div className="mk-avatar">A</div>
                <div className="mk-info">
                  <span className="mk-title">Aaryan K. <span className="blue-tick">✓</span></span>
                  <span className="mk-sub">Monthly Subscriber</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-glow" />
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section className="features-section">
        <h2 className="section-title text-center">
          Why add WealthWise to your life?
        </h2>
        <p className="section-subtitle text-center">
          It's not just another class. It's a game where you level up in real life.
        </p>

        <div className="features-grid">
          <div className="feat-card premium-glass">
            <div className="fc-icon">💰</div>
            <h3 className="fc-title">Earn as you learn</h3>
            <p className="fc-desc">
              Complete Home Activities and Summer Projects to earn Virtual ₹ and XP. Build a streak, climb the city leaderboard, and prove you're the smartest investor in your school.
            </p>
          </div>
          <div className="feat-card premium-glass">
            <div className="fc-icon">🎓</div>
            <h3 className="fc-title">Meet "Sir" — Your AI Mentor</h3>
            <p className="fc-desc">
              Got a doubt at 11 PM? "Sir" is our voice-enabled AI teacher. He's available 24/7 to explain complex money concepts simply, just like a personal tutor.
            </p>
            <div className="fc-tag">Voice Enabled 🎙️</div>
          </div>
          <div className="feat-card premium-glass">
            <div className="fc-icon">🛡️</div>
            <h3 className="fc-title">Get the Blue Tick ✓</h3>
            <p className="fc-desc">
              Become a Monthly Subscriber to unlock your official Roll Number and the prestigious Blue Tick profile badge, proving you are a committed wealth builder.
            </p>
          </div>
        </div>
      </section>

      {/* ══ AI TEACHER SHOWCASE ══ */}
      <section className="ai-section">
        <div className="ai-content">
          <h2 className="section-title">
            Never stay stuck.<br />
            <span className="gradient-text">Ask Sir.</span>
          </h2>
          <p className="ai-desc">
            Unlike schools where you might be afraid to ask questions, WealthWise Junior gives you an AI teacher who never judges. 
            Talk to "Sir" about inflation, taxes, or even how to ask your parents for pocket money. He's smart, patient, and speaks your language.
          </p>
          <ul className="ai-features">
            <li><span className="aif-icon">🗣️</span> Voice conversations driven by Google Gemini</li>
            <li><span className="aif-icon">📚</span> Knows your exact Class syllabus and progress</li>
            <li><span className="aif-icon">🛡️</span> Safe, moderated environment built for students</li>
          </ul>
          <Link href="/onboarding" className="btn-outline">
            Meet Sir →
          </Link>
        </div>
        <div className="ai-visual">
          <div className="ai-chat-mockup premium-glass">
            <div className="chat-bubble student">
              Hey Sir, how does Compound Interest actually work?
            </div>
            <div className="chat-bubble teacher">
              <span className="t-name">Sir 🎓</span>
              Imagine a snowball rolling down a hill. As it rolls, it picks up more snow, getting bigger and faster! That's compound interest...
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="cta-section">
        <div className="cta-box premium-glass">
          <h2 className="cta-title">Ready to build your empire?</h2>
          <p className="cta-desc">
            Join thousands of Indian students building real wealth. Subscribe today to unlock the full curriculum, the AI Mentor, and the City Leaderboards.
          </p>
          <div className="cta-actions">
            <Link href="/onboarding" className="btn-neon pulse">
              Subscribe Now
            </Link>
            <span className="cta-or">or</span>
            <Link href="/parent" className="btn-text">
              Show this to your parents
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .landing-page { padding-bottom: 2rem; overflow-x: hidden; }

        /* ── HERO ── */
        .hero-section {
          min-height: 90vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          padding: 4rem 6vw;
          max-width: 1400px;
          margin: 0 auto;
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 0.6rem;
          padding: 0.5rem 1rem; border-radius: 2rem;
          background: rgba(108,99,255,0.1); border: 1px solid rgba(108,99,255,0.25);
          font-size: 0.8rem; font-weight: 700; color: var(--primary-glow);
          margin-bottom: 1.5rem;
        }
        .live-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--neon-green);
          box-shadow: 0 0 8px rgba(0,229,160,0.8);
          animation: pulse 2s infinite;
        }
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }
        
        .hero-title {
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 900; line-height: 1.1; margin-bottom: 1.5rem;
          color: var(--foreground);
        }
        .hero-sub {
          font-size: 1.1rem; color: var(--muted);
          line-height: 1.7; margin-bottom: 2.5rem; max-width: 540px;
        }
        .hero-actions {
          display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 3rem;
        }
        .hero-stats {
          display: flex; gap: 3rem;
        }
        .h-stat { display: flex; flex-direction: column; gap: 0.3rem; }
        .hs-val { font-size: 1.5rem; font-weight: 900; color: var(--foreground); }
        .hs-lbl { font-size: 0.8rem; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; }

        .hero-visual {
          position: relative;
          display: flex; justify-content: center; align-items: center;
        }
        .hero-glow {
          position: absolute; width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(108,99,255,0.2), transparent 70%);
          z-index: -1; top: 50%; left: 50%; transform: translate(-50%, -50%);
        }
        .device-mockup {
          width: 100%; max-width: 400px;
          border-radius: 1.5rem; border: 1px solid rgba(108,99,255,0.3);
          background: rgba(10,15,44,0.8); backdrop-filter: blur(20px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 40px rgba(108,99,255,0.1);
          overflow: hidden;
        }
        .mockup-header {
          padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex; align-items: center; gap: 1rem;
        }
        .dots { display: flex; gap: 0.4rem; }
        .dot { width: 10px; height: 10px; border-radius: 50%; }
        .dot.r { background: #FF5A5A; }
        .dot.y { background: #FFBD2E; }
        .dot.g { background: #28CA42; }
        .mockup-title { font-size: 0.8rem; font-family: monospace; color: var(--muted); margin: 0 auto; opacity: 0.7; }
        .mockup-body {
          padding: 2rem; display: flex; flex-direction: column; gap: 1rem;
        }
        .mk-card {
          padding: 1rem; border-radius: 1rem; background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          display: flex; align-items: center; gap: 1rem;
        }
        .mk-1 { border-color: rgba(0,229,160,0.2); }
        .mk-2 { border-color: rgba(255,209,102,0.2); }
        .mk-icon { font-size: 1.5rem; }
        .mk-info { display: flex; flex-direction: column; gap: 0.2rem; }
        .mk-title { font-size: 0.9rem; font-weight: 700; color: var(--foreground); display: flex; align-items: center; gap: 0.4rem; }
        .mk-sub { font-size: 0.7rem; color: var(--muted); }
        .blue-tick { width: 14px; height: 14px; background: #1DA1F2; border-radius: 50%; color: white; display: flex; justify-content: center; align-items: center; font-size: 0.5rem; font-weight: 900; }
        .mk-profile {
          margin-top: 1rem; padding-top: 1rem; border-top: 1px dashed rgba(255,255,255,0.1);
          display: flex; align-items: center; gap: 1rem;
        }
        .mk-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--neon-green)); display: flex; justify-content: center; align-items: center; font-weight: 900; color: white; border: 2px solid var(--primary); }

        /* ── GLOBAL HELPERS ── */
        .text-center { text-align: center; }
        .section-title { font-size: clamp(2rem, 4vw, 3rem); font-weight: 900; color: var(--foreground); margin-bottom: 1rem; }
        .section-subtitle { font-size: 1.1rem; color: var(--muted); max-width: 600px; margin: 0 auto 4rem; line-height: 1.6; }

        /* ── FEATURES ── */
        .features-section { padding: 6rem 6vw; max-width: 1400px; margin: 0 auto; }
        .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .feat-card {
          padding: 2.5rem; border-radius: 1.5rem;
          display: flex; flex-direction: column; gap: 1rem;
          transition: transform 0.3s;
        }
        .feat-card:hover { transform: translateY(-5px); }
        .fc-icon { font-size: 2.5rem; margin-bottom: 0.5rem; }
        .fc-title { font-size: 1.25rem; font-weight: 800; color: var(--foreground); }
        .fc-desc { font-size: 0.95rem; color: var(--muted); line-height: 1.7; flex: 1; }
        .fc-tag {
          align-self: flex-start; padding: 0.3rem 0.8rem; border-radius: 2rem;
          background: rgba(108,99,255,0.1); color: var(--primary-glow); border: 1px solid rgba(108,99,255,0.3);
          font-size: 0.75rem; font-weight: 700; margin-top: 1rem;
        }

        /* ── AI TEACHER ── */
        .ai-section {
          padding: 6rem 6vw; max-width: 1400px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;
        }
        .ai-desc { font-size: 1.05rem; color: var(--muted); line-height: 1.7; margin-bottom: 2rem; }
        .ai-features { list-style: none; display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2.5rem; }
        .ai-features li { display: flex; align-items: center; gap: 1rem; font-size: 0.95rem; color: var(--foreground); font-weight: 600; }
        .aif-icon { flex-shrink: 0; background: rgba(255,255,255,0.05); width: 32px; height: 32px; border-radius: 50%; display: flex; justify-content: center; align-items: center; }
        
        .ai-visual { display: flex; justify-content: center; }
        .ai-chat-mockup {
          width: 100%; max-width: 450px; padding: 2rem;
          border-radius: 1.5rem; display: flex; flex-direction: column; gap: 1.5rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .chat-bubble { padding: 1rem 1.25rem; border-radius: 1.25rem; font-size: 0.9rem; line-height: 1.5; font-weight: 500; }
        .student { background: rgba(255,255,255,0.05); color: var(--foreground); border-bottom-right-radius: 4px; border: 1px solid rgba(255,255,255,0.08); align-self: flex-end; max-width: 80%; }
        .teacher { background: rgba(108,99,255,0.1); color: #E2E8F0; border-top-left-radius: 4px; border: 1px solid rgba(108,99,255,0.25); align-self: flex-start; max-width: 90%; }
        .t-name { display: block; font-size: 0.75rem; font-weight: 800; color: var(--primary-glow); margin-bottom: 0.4rem; text-transform: uppercase; letter-spacing: 0.05em; }

        /* ── CTA ── */
        .cta-section { padding: 6rem 6vw; max-width: 1000px; margin: 0 auto; text-align: center; }
        .cta-box {
          padding: 4rem 2rem; border-radius: 2rem;
          background: linear-gradient(135deg, rgba(14,22,56,0.8), rgba(10,15,44,0.9));
          border: 1px solid rgba(108,99,255,0.3);
          box-shadow: 0 20px 50px rgba(0,0,0,0.5), inset 0 0 40px rgba(108,99,255,0.05);
        }
        .cta-title { font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 900; margin-bottom: 1rem; color: var(--foreground); }
        .cta-desc { font-size: 1.1rem; color: var(--muted); margin-bottom: 2.5rem; }
        .cta-actions { display: flex; align-items: center; justify-content: center; gap: 1.5rem; flex-wrap: wrap; }
        .cta-or { font-size: 0.9rem; font-weight: 600; color: var(--muted); }
        .btn-text { color: var(--muted); font-weight: 600; text-decoration: underline; text-underline-offset: 4px; font-size: 0.9rem; transition: color 0.2s; }
        .btn-text:hover { color: var(--primary-glow); }

        @media(max-width: 1024px) {
          .hero-section { grid-template-columns: 1fr; text-align: center; padding: 4rem 5vw; }
          .hero-sub { margin: 0 auto 2.5rem; }
          .hero-actions { justify-content: center; }
          .hero-stats { justify-content: center; }
          .ai-section { grid-template-columns: 1fr; text-align: center; }
          .ai-features li { justify-content: center; }
        }
        @media(max-width: 768px) {
          .features-grid { grid-template-columns: 1fr; }
          .hero-stats { flex-direction: column; gap: 1.5rem; }
          .cta-actions { flex-direction: column; gap: 1rem; }
        }
      `}</style>
    </div>
  );
}
