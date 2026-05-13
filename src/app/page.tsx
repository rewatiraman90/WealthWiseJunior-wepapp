"use client";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useState, useEffect, useRef } from "react";

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

const FEATURES = [
  { icon: "🎓", title: "CBSE-Aligned Curriculum", desc: "Financial concepts mapped to Class 5–12, taught through India-relevant examples like EMIs, NSE, and UPI." },
  { icon: "🤖", title: "AI Teacher — Sir", desc: "Ask any money question, any time. Our AI teacher answers in plain language, 24/7, with no judgment." },
  { icon: "🏆", title: "Gamified Rewards", desc: "Earn WealthPoints, XP, and a verified blue-tick Roll Number as you complete lessons and activities." },
  { icon: "🧭", title: "Freedom GPS", desc: "A personalised roadmap helping students build skills and assets, not just degrees." },
  { icon: "🧪", title: "Activity Lab", desc: "Real-world home activities: 3-Jar Method, Price-Point Hunt, Budget Challenges and more." },
  { icon: "👪", title: "Parent Dashboard", desc: "Full visibility into what your child is learning, their streak, and their progress across modules." },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma", role: "Mother, Class 9 student",
    city: "Bengaluru", avatar: "PS",
    text: "My daughter now asks before every purchase, 'which jar does this come from?' That's priceless. WealthWise Junior actually changed her habits."
  },
  {
    name: "Rohit Mehra", role: "Father, Class 7 student",
    city: "Pune", avatar: "RM",
    text: "Within a month my son understood what a mutual fund is. His school hasn't taught him that. This is the most practical education money can buy."
  },
  {
    name: "Sunita Krishnan", role: "Mother, Class 11 student",
    city: "Hyderabad", avatar: "SK",
    text: "The AI teacher feature is brilliant — my daughter was embarrassed to ask her teacher about debt. She asks Sir everything. Game-changer."
  },
];

const TRUST_BADGES = [
  { icon: "🔒", label: "SSL Secured" },
  { icon: "🛡️", label: "Data Private" },
  { icon: "📚", label: "CBSE Aligned" },
  { icon: "✅", label: "Safe for Kids" },
  { icon: "🏦", label: "NCFE Concepts" },
];

const LEVELS = [
  { level: 1, name: "Explorer",   emoji: "🔭", grade: "Class 5",  age: "Age 10–11", module: "Money Foundations",     color: "#6C63FF" },
  { level: 2, name: "Saver",      emoji: "🪙", grade: "Class 6",  age: "Age 11–12", module: "Saving & Budgeting",    color: "#F4A535" },
  { level: 3, name: "Planner",    emoji: "📋", grade: "Class 7",  age: "Age 12–13", module: "Banking Basics",        color: "#00E5A0" },
  { level: 4, name: "Strategist", emoji: "🎯", grade: "Class 8",  age: "Age 13–14", module: "Income & Careers",      color: "#FF6B6B" },
  { level: 5, name: "Analyst",    emoji: "📊", grade: "Class 9",  age: "Age 14–15", module: "Smart Spending",        color: "#6C63FF" },
  { level: 6, name: "Investor",   emoji: "📈", grade: "Class 10", age: "Age 15–16", module: "Stock Markets",         color: "#F4A535" },
  { level: 7, name: "Architect",  emoji: "🏗️", grade: "Class 11", age: "Age 16–17", module: "Financial Planning",    color: "#00E5A0" },
  { level: 8, name: "Master",     emoji: "🏆", grade: "Class 12", age: "Age 17–18", module: "Wealth Building",       color: "#FFD700" },
];

export default function StudentLandingPage() {
  const [hasProfile, setHasProfile] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasProfile(!!localStorage.getItem("wwj_profile"));
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const students = useCountUp(12000, 2200, statsVisible);
  const lessons = useCountUp(450, 2200, statsVisible);
  const cities = useCountUp(28, 1800, statsVisible);

  return (
    <div className="lp-root">

      {/* ══ NAV ══ */}
      <nav className="lp-nav">
        <div className="lp-nav-inner">
          <div className="lp-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/logo.png" alt="WealthWise Jr." style={{ height: '60px', width: 'auto' }} />
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
              <span className="lp-logo-w">WealthWise</span>
              <span className="lp-logo-jr">Jr.</span>
            </div>
          </div>
          <div className="lp-nav-links">
            <Link href="/parent" className="lp-nav-link">For Parents</Link>
            <Link href="/contact" className="lp-nav-link">Contact</Link>
            <Link href={hasProfile ? "/campus" : "/onboarding"} className="lp-btn-nav">
              {hasProfile ? "Go to Campus →" : "Start Learning →"}
            </Link>
          </div>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section className="lp-hero">
        <div className="lp-hero-bg">
          <div className="lp-hero-blob blob1" />
          <div className="lp-hero-blob blob2" />
          <div className="lp-hero-grid" />
        </div>
        <div className="lp-hero-content">
          <div className="lp-hero-tag">
            <span className="lp-tag-dot" />
            The financial education school forgot to teach
          </div>
          <h1 className="lp-hero-h1">
            Master Money.<br />
            <span className="lp-hero-grad">Build Your Empire.</span>
          </h1>
          <p className="lp-hero-p">
            India's smartest financial curriculum for Class 5–12. Interactive, gamified, and 
            built around real money decisions your child faces every day.
          </p>
          <div className="lp-hero-actions">
            <Link href="/onboarding" className="lp-btn-primary">
              Subscribe Now →
            </Link>
            <Link href="/parent" className="lp-btn-ghost">
              For Parents ↗
            </Link>
          </div>
          <div className="lp-trust-row">
            {TRUST_BADGES.map(b => (
              <div key={b.label} className="lp-trust-pill">
                <span>{b.icon}</span> {b.label}
              </div>
            ))}
          </div>
        </div>
        <div className="lp-hero-card">
          <div className="lp-card-header">
            <div className="lp-card-logo" style={{ display: 'flex', alignItems: 'center' }}><img src="/logo.png" alt="WealthWise Jr." style={{ height: '24px', width: 'auto' }} /></div>
            <span className="lp-card-badge">📅 Module 1</span>
          </div>
          <div className="lp-card-lesson">
            <div className="lp-lesson-tag">🔴 LIVE NOW</div>
            <div className="lp-lesson-title">The Magic of Compounding</div>
            <div className="lp-lesson-sub">Level 4 · Strategist — Module 4</div>
          </div>
          <div className="lp-card-stats">
            <div className="lp-cs"><span className="lp-cs-val" style={{ color: "#F4A535" }}>+250</span><span className="lp-cs-lbl">XP Earned</span></div>
            <div className="lp-cs"><span className="lp-cs-val" style={{ color: "#00E5A0" }}>🔥 12</span><span className="lp-cs-lbl">Day Streak</span></div>
            <div className="lp-cs"><span className="lp-cs-val">🎯 L4</span><span className="lp-cs-lbl">Strategist</span></div>
          </div>
          <div className="lp-card-bar-wrap">
            <span className="lp-card-bar-lbl">Semester Progress</span>
            <div className="lp-card-bar-track">
              <div className="lp-card-bar-fill" style={{ width: "42%" }} />
            </div>
            <span className="lp-card-bar-pct">42%</span>
          </div>
        </div>
      </section>

      {/* ══ ANIMATED STATS ══ */}
      <section className="lp-stats-strip" ref={statsRef}>
        <div className="lp-stat-item">
          <span className="lp-stat-val">{statsVisible ? students.toLocaleString("en-IN") : "0"}+</span>
          <span className="lp-stat-lbl">Students Enrolled</span>
        </div>
        <div className="lp-stat-divider" />
        <div className="lp-stat-item">
          <span className="lp-stat-val">{statsVisible ? lessons : "0"}+</span>
          <span className="lp-stat-lbl">Lessons Available</span>
        </div>
        <div className="lp-stat-divider" />
        <div className="lp-stat-item">
          <span className="lp-stat-val">{statsVisible ? cities : "0"}</span>
          <span className="lp-stat-lbl">Cities Across India</span>
        </div>
        <div className="lp-stat-divider" />
        <div className="lp-stat-item">
          <span className="lp-stat-val">8 Levels</span>
          <span className="lp-stat-lbl">Explorer → Master</span>
        </div>
      </section>

      {/* ══ JOURNEY PATH ══ */}
      <section className="lp-section lp-journey-section">
        <div className="lp-section-inner">
          <div className="lp-section-tag">✦ The Learning Path</div>
          <h2 className="lp-section-h2">From Explorer to Master —<br />your 8-level financial journey</h2>
          <p className="lp-section-sub">Everyone starts at Level 1. One new module unlocks each month. By Level 8 you&apos;re building real wealth plans.</p>

          <div className="lp-journey-wrap">
            <div className="lp-journey-line" />
            {LEVELS.map((lv, i) => (
              <div key={lv.level} className={`lp-jstop ${i % 2 === 0 ? "lp-jl" : "lp-jr"}`}>
                <div className="lp-jdot" style={{ background: lv.color, boxShadow: `0 0 0 4px ${lv.color}22` }} />
                <div className="lp-jcard" style={{ "--jc": lv.color } as any}>
                  <div className="lp-jlvl" style={{ color: lv.color }}>Level {lv.level}</div>
                  <div className="lp-jemoji">{lv.emoji}</div>
                  <div className="lp-jname">{lv.name}</div>
                  <div className="lp-jmod">{lv.module}</div>
                  <div className="lp-jgrade">{lv.grade} · {lv.age}</div>
                  {lv.level === 1 && <div className="lp-jstart-badge">Start Here →</div>}
                  {lv.level === 8 && <div className="lp-jend-badge">🏆 Graduate</div>}
                </div>
                <div className={`lp-jhline ${i % 2 === 0 ? "lp-jhl-left" : "lp-jhl-right"}`} style={{ background: lv.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section className="lp-section">
        <div className="lp-section-inner">
          <div className="lp-section-tag">✦ What You Get</div>
          <h2 className="lp-section-h2">Everything school forgot to teach</h2>
          <p className="lp-section-sub">A complete financial education system, not just a course. Built for Indian students, mapped to their grade and real life.</p>
          <div className="lp-features-grid">
            {FEATURES.map(f => (
              <div key={f.title} className="lp-feature-card">
                <span className="lp-feature-icon">{f.icon}</span>
                <h3 className="lp-feature-title">{f.title}</h3>
                <p className="lp-feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="lp-section lp-section-alt">
        <div className="lp-section-inner">
          <div className="lp-section-tag">✦ Parent Reviews</div>
          <h2 className="lp-section-h2">What parents are saying</h2>
          <div className="lp-testi-grid">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="lp-testi-card">
                <div className="lp-testi-stars">★★★★★</div>
                <p className="lp-testi-text">"{t.text}"</p>
                <div className="lp-testi-author">
                  <div className="lp-testi-avatar">{t.avatar}</div>
                  <div>
                    <div className="lp-testi-name">{t.name}</div>
                    <div className="lp-testi-meta">{t.role} · {t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section className="lp-section">
        <div className="lp-section-inner lp-hiw">
          <div className="lp-section-tag">✦ Simple Start</div>
          <h2 className="lp-section-h2">Up and running in 3 minutes</h2>
          <div className="lp-steps">
            {[
              { n: "01", title: "Sign in with Google", desc: "No forms, no passwords. One tap and your child is in." },
              { n: "02", title: "Choose Your Level", desc: "Pick Explorer through Master. The curriculum builds progressively with every level." },
              { n: "03", title: "Start Learning & Earning", desc: "Attend live classes, complete activities, earn WealthPoints." },
            ].map(s => (
              <div key={s.n} className="lp-step">
                <div className="lp-step-num">{s.n}</div>
                <h3 className="lp-step-title">{s.title}</h3>
                <p className="lp-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ══ */}
      <section className="lp-cta">
        <div className="lp-cta-inner">
          <div className="lp-cta-tag">🔥 Limited Launch Pricing</div>
          <h2 className="lp-cta-h2">Give your child the education money can't buy — but can teach.</h2>
          <p className="lp-cta-sub">Join 12,000+ students already building their financial future. Cancel any time.</p>
          <Link href="/onboarding" className="lp-btn-primary lp-btn-xl">
            Subscribe Now →
          </Link>
          <p className="lp-cta-note">Secure checkout · Cancel anytime · Parent dashboard included</p>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .lp-root { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--lp-offwhite); color: var(--lp-text); min-height: 100vh; }

        /* NAV */
        .lp-nav { position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,0.97); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid rgba(108,99,255,0.08); box-shadow: 0 1px 0 rgba(0,0,0,0.04); }
        .lp-nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 2rem; height: 68px; display: flex; justify-content: space-between; align-items: center; }
        .lp-logo { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 900; font-size: 1.35rem; letter-spacing: -0.03em; }
        .lp-logo-w { color: var(--lp-navy); }
        .lp-logo-jr { color: var(--primary); margin-left: 1px; }
        .lp-nav-links { display: flex; align-items: center; gap: 0.25rem; }
        .lp-nav-link { font-family: 'Plus Jakarta Sans', sans-serif; color: var(--lp-muted); text-decoration: none; font-weight: 600; font-size: 0.875rem; letter-spacing: -0.01em; padding: 0.45rem 0.85rem; border-radius: 0.6rem; transition: color 0.18s, background 0.18s; }
        .lp-nav-link:hover { color: var(--lp-text); background: rgba(108,99,255,0.07); }
        .lp-btn-nav { font-family: 'Plus Jakarta Sans', sans-serif; background: linear-gradient(135deg, var(--lp-navy) 0%, #1a2b6e 100%); color: white; padding: 0.58rem 1.35rem; border-radius: 2rem; font-size: 0.875rem; font-weight: 800; letter-spacing: -0.01em; line-height: 1; text-decoration: none; transition: all 0.2s; box-shadow: 0 2px 10px rgba(11,20,55,0.22); margin-left: 0.75rem; white-space: nowrap; }
        .lp-btn-nav:hover { background: linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%); transform: translateY(-1px); box-shadow: 0 4px 18px rgba(108,99,255,0.38); }

        /* HERO */
        .lp-hero { position: relative; min-height: 90vh; background: var(--lp-navy); overflow: hidden; display: flex; align-items: center; padding: 6rem 2rem 4rem; gap: 4rem; justify-content: center; flex-wrap: wrap; }
        .lp-hero-bg { position: absolute; inset: 0; pointer-events: none; }
        .lp-hero-blob { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.25; }
        .blob1 { width: 500px; height: 500px; background: radial-gradient(circle, #6C63FF, transparent); top: -100px; left: -100px; }
        .blob2 { width: 400px; height: 400px; background: radial-gradient(circle, #F4A535, transparent); bottom: -80px; right: -60px; }
        .lp-hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(108,99,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.06) 1px, transparent 1px); background-size: 60px 60px; }

        .lp-hero-content { position: relative; z-index: 1; max-width: 560px; }
        .lp-hero-tag { display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(244,165,53,0.15); border: 1px solid rgba(244,165,53,0.35); color: var(--gold-light); font-size: 0.78rem; font-weight: 700; padding: 0.4rem 1rem; border-radius: 2rem; margin-bottom: 1.5rem; letter-spacing: 0.03em; }
        .lp-tag-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--gold); animation: pulse-dot 1.5s infinite; flex-shrink: 0; }
        @keyframes pulse-dot { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        .lp-hero-h1 { font-size: clamp(2.6rem, 5vw, 4rem); font-weight: 900; line-height: 1.1; color: white; margin-bottom: 1.25rem; letter-spacing: -0.02em; }
        .lp-hero-grad { background: linear-gradient(135deg, var(--gold), #FF6B35); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .lp-hero-p { color: rgba(255,255,255,0.65); font-size: 1.05rem; line-height: 1.7; font-weight: 500; margin-bottom: 2rem; }
        .lp-hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem; }
        .lp-btn-primary { background: linear-gradient(135deg, var(--gold), #E8961E); color: var(--lp-navy); padding: 0.9rem 2.2rem; border-radius: 2rem; font-weight: 900; font-size: 1rem; text-decoration: none; transition: all 0.25s; font-family: 'Plus Jakarta Sans', sans-serif; display: inline-block; }
        .lp-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 12px 35px rgba(244,165,53,0.4); }
        .lp-btn-xl { font-size: 1.1rem; padding: 1.1rem 3rem; }
        .lp-btn-ghost { border: 1.5px solid rgba(255,255,255,0.25); color: rgba(255,255,255,0.8); padding: 0.9rem 2rem; border-radius: 2rem; font-weight: 700; font-size: 1rem; text-decoration: none; transition: all 0.25s; }
        .lp-btn-ghost:hover { border-color: rgba(255,255,255,0.5); color: white; }
        .lp-trust-row { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .lp-trust-pill { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.6); font-size: 0.72rem; font-weight: 700; padding: 0.3rem 0.75rem; border-radius: 2rem; display: flex; align-items: center; gap: 0.3rem; }

        /* HERO CARD */
        .lp-hero-card { position: relative; z-index: 1; background: rgba(14,22,56,0.85); border: 1px solid rgba(108,99,255,0.3); border-radius: 1.5rem; padding: 1.75rem; width: 340px; backdrop-filter: blur(20px); box-shadow: 0 30px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(108,99,255,0.1); flex-shrink: 0; }
        .lp-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; }
        .lp-card-logo { font-weight: 900; font-size: 1.1rem; color: white; letter-spacing: -0.02em; }
        .lp-card-logo span { color: var(--gold); }
        .lp-card-badge { background: rgba(108,99,255,0.2); color: #9B93FF; font-size: 0.72rem; font-weight: 800; padding: 0.25rem 0.6rem; border-radius: 1rem; border: 1px solid rgba(108,99,255,0.3); }
        .lp-card-lesson { background: rgba(108,99,255,0.1); border: 1px solid rgba(108,99,255,0.2); border-radius: 1rem; padding: 1.2rem; margin-bottom: 1.25rem; }
        .lp-lesson-tag { font-size: 0.65rem; font-weight: 900; color: #FF6680; letter-spacing: 0.1em; margin-bottom: 0.4rem; }
        .lp-lesson-title { font-size: 1rem; font-weight: 800; color: white; margin-bottom: 0.3rem; }
        .lp-lesson-sub { font-size: 0.75rem; color: rgba(255,255,255,0.5); font-weight: 600; }
        .lp-card-stats { display: flex; gap: 0.75rem; margin-bottom: 1.25rem; }
        .lp-cs { display: flex; flex-direction: column; flex: 1; background: rgba(0,0,0,0.25); border-radius: 0.75rem; padding: 0.6rem 0.75rem; }
        .lp-cs-val { font-size: 0.95rem; font-weight: 900; color: white; }
        .lp-cs-lbl { font-size: 0.6rem; font-weight: 700; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.06em; margin-top: 0.2rem; }
        .lp-card-bar-wrap { display: flex; flex-direction: column; gap: 0.5rem; }
        .lp-card-bar-lbl { font-size: 0.7rem; font-weight: 700; color: rgba(255,255,255,0.5); display: flex; justify-content: space-between; }
        .lp-card-bar-pct { font-size: 0.7rem; font-weight: 700; color: var(--neon-green); text-align: right; }
        .lp-card-bar-track { height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden; }
        .lp-card-bar-fill { height: 100%; background: linear-gradient(90deg, var(--primary), var(--neon-green)); border-radius: 3px; }

        /* STATS */
        .lp-stats-strip { background: white; border-top: 1px solid rgba(108,99,255,0.08); border-bottom: 1px solid rgba(108,99,255,0.08); padding: 2.5rem 2rem; display: flex; justify-content: center; align-items: center; gap: 0; flex-wrap: wrap; }
        .lp-stat-item { display: flex; flex-direction: column; align-items: center; padding: 0.75rem 3rem; }
        .lp-stat-val { font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 900; color: var(--lp-navy); letter-spacing: -0.02em; font-family: 'Plus Jakarta Sans', sans-serif; }
        .lp-stat-lbl { font-size: 0.78rem; font-weight: 700; color: var(--lp-muted); text-transform: uppercase; letter-spacing: 0.06em; margin-top: 0.25rem; }
        .lp-stat-divider { width: 1px; height: 50px; background: rgba(108,99,255,0.15); }

        /* SECTIONS */
        .lp-section { padding: 6rem 2rem; }
        .lp-section-alt { background: white; }
        .lp-section-inner { max-width: 1100px; margin: 0 auto; }
        .lp-section-tag { font-size: 0.78rem; font-weight: 900; color: var(--primary); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1rem; }
        .lp-section-h2 { font-size: clamp(1.8rem, 3.5vw, 2.6rem); font-weight: 900; color: var(--lp-navy); margin-bottom: 1rem; letter-spacing: -0.02em; }
        .lp-section-sub { color: var(--lp-muted); font-size: 1rem; font-weight: 500; max-width: 560px; line-height: 1.7; margin-bottom: 3rem; }

        /* JOURNEY PATH */
        .lp-journey-section { background: white; }
        .lp-journey-wrap { position: relative; max-width: 820px; margin: 0 auto; padding: 1rem 0 2rem; }
        .lp-journey-line { position: absolute; left: 50%; top: 0; bottom: 0; width: 3px; background: linear-gradient(to bottom, #6C63FF, #00E5A0); transform: translateX(-50%); border-radius: 2px; }
        .lp-jstop { display: flex; align-items: center; position: relative; min-height: 130px; }
        .lp-jstop.lp-jl { justify-content: flex-start; }
        .lp-jstop.lp-jr { justify-content: flex-end; }
        .lp-jdot { position: absolute; left: 50%; transform: translateX(-50%); width: 18px; height: 18px; border-radius: 50%; border: 3px solid white; z-index: 3; flex-shrink: 0; }
        .lp-jcard { width: 43%; background: white; border: 1.5px solid var(--lp-border); border-radius: 1.25rem; padding: 1.25rem 1.5rem; transition: all 0.3s; cursor: default; position: relative; z-index: 2; }
        .lp-jl .lp-jcard { transform: perspective(700px) rotateY(4deg); }
        .lp-jr .lp-jcard { transform: perspective(700px) rotateY(-4deg); }
        .lp-jcard:hover { border-color: var(--jc, #6C63FF); box-shadow: 0 16px 48px rgba(108,99,255,0.12); transform: perspective(700px) rotateY(0deg) translateY(-5px) !important; }
        .lp-jhline { position: absolute; top: 50%; height: 2px; width: 7%; opacity: 0.35; }
        .lp-jhl-left { left: 43%; }
        .lp-jhl-right { right: 43%; }
        .lp-jlvl { font-size: 0.62rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.35rem; }
        .lp-jemoji { font-size: 1.8rem; line-height: 1; margin-bottom: 0.35rem; }
        .lp-jname { font-size: 1.05rem; font-weight: 900; color: var(--lp-navy); margin-bottom: 0.2rem; }
        .lp-jmod { font-size: 0.8rem; font-weight: 700; color: #6C63FF; margin-bottom: 0.2rem; }
        .lp-jgrade { font-size: 0.7rem; color: var(--lp-muted); font-weight: 600; }
        .lp-jstart-badge { margin-top: 0.6rem; display: inline-block; font-size: 0.65rem; font-weight: 900; background: #6C63FF; color: white; padding: 0.2rem 0.6rem; border-radius: 2rem; }
        .lp-jend-badge { margin-top: 0.6rem; display: inline-block; font-size: 0.65rem; font-weight: 900; background: #FFD700; color: #0B1437; padding: 0.2rem 0.6rem; border-radius: 2rem; }
        @media(max-width: 768px) {
          .lp-journey-line { display: none; }
          .lp-jstop { justify-content: center !important; min-height: auto; margin-bottom: 1rem; }
          .lp-jdot { display: none; }
          .lp-jcard { width: 90%; transform: none !important; }
          .lp-jhline { display: none; }
        }

        /* FEATURES */
        .lp-features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .lp-feature-card { background: white; border: 1px solid var(--lp-border); border-radius: 1.25rem; padding: 2rem; transition: all 0.25s; }
        .lp-feature-card:hover { transform: translateY(-4px); box-shadow: 0 20px 50px rgba(108,99,255,0.1); border-color: rgba(108,99,255,0.25); }
        .lp-feature-icon { font-size: 2.2rem; margin-bottom: 1rem; display: block; }
        .lp-feature-title { font-size: 1rem; font-weight: 800; color: var(--lp-navy); margin-bottom: 0.5rem; }
        .lp-feature-desc { font-size: 0.88rem; color: var(--lp-muted); line-height: 1.65; font-weight: 500; }

        /* TESTIMONIALS */
        .lp-testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .lp-testi-card { background: var(--lp-offwhite); border: 1px solid var(--lp-border); border-radius: 1.25rem; padding: 2rem; display: flex; flex-direction: column; gap: 1rem; }
        .lp-testi-stars { color: var(--gold); font-size: 0.9rem; letter-spacing: 0.1em; }
        .lp-testi-text { color: var(--lp-text); font-size: 0.93rem; line-height: 1.7; font-weight: 500; flex: 1; }
        .lp-testi-author { display: flex; align-items: center; gap: 0.75rem; }
        .lp-testi-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--gold)); display: flex; align-items: center; justify-content: center; font-size: 0.78rem; font-weight: 900; color: white; flex-shrink: 0; }
        .lp-testi-name { font-size: 0.88rem; font-weight: 800; color: var(--lp-navy); }
        .lp-testi-meta { font-size: 0.75rem; color: var(--lp-muted); font-weight: 600; }

        /* HOW IT WORKS */
        .lp-hiw { text-align: center; }
        .lp-hiw .lp-section-sub { margin: 0 auto 3rem; }
        .lp-steps { display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap; }
        .lp-step { max-width: 280px; padding: 2rem; background: white; border: 1px solid var(--lp-border); border-radius: 1.25rem; text-align: left; position: relative; }
        .lp-step-num { font-size: 2.5rem; font-weight: 900; color: rgba(108,99,255,0.12); font-family: 'Space Mono', monospace; margin-bottom: 1rem; }
        .lp-step-title { font-size: 1rem; font-weight: 800; color: var(--lp-navy); margin-bottom: 0.5rem; }
        .lp-step-desc { font-size: 0.88rem; color: var(--lp-muted); line-height: 1.65; font-weight: 500; }

        /* CTA */
        .lp-cta { background: var(--lp-navy); padding: 6rem 2rem; text-align: center; position: relative; overflow: hidden; }
        .lp-cta::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at center, rgba(244,165,53,0.12), transparent 70%); }
        .lp-cta-inner { position: relative; z-index: 1; max-width: 720px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 1.25rem; }
        .lp-cta-tag { font-size: 0.75rem; font-weight: 900; color: var(--gold); text-transform: uppercase; letter-spacing: 0.12em; background: rgba(244,165,53,0.12); border: 1px solid rgba(244,165,53,0.3); padding: 0.35rem 1rem; border-radius: 2rem; }
        .lp-cta-h2 { font-size: clamp(1.6rem, 3.5vw, 2.4rem); font-weight: 900; color: white; letter-spacing: -0.02em; line-height: 1.2; }
        .lp-cta-sub { color: rgba(255,255,255,0.55); font-size: 1rem; font-weight: 500; }
        .lp-cta-note { color: rgba(255,255,255,0.35); font-size: 0.8rem; font-weight: 600; }

        @media(max-width: 1100px) { .lp-features-grid, .lp-testi-grid { grid-template-columns: 1fr 1fr; } }
        @media(max-width: 768px) { .lp-features-grid, .lp-testi-grid { grid-template-columns: 1fr; } .lp-hero { padding: 5rem 1.5rem 3rem; } .lp-hero-card { width: 100%; max-width: 380px; } .lp-stat-item { padding: 0.75rem 1.5rem; } .lp-stat-divider { display: none; } .lp-steps { flex-direction: column; align-items: center; } .lp-nav-links .lp-nav-link { display: none; } }
      `}</style>
    </div>
  );
}
