"use client";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useState, useEffect, useRef } from "react";

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t: number | null = null;
    const step = (ts: number) => {
      if (!t) t = ts;
      const p = Math.min((ts - t) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

const LEVELS = [
  { level: 1, name: "Explorer",   emoji: "🔭", grade: "Class 5",  age: "Age 10–11", module: "Money Foundations",  color: "#6C63FF" },
  { level: 2, name: "Saver",      emoji: "🪙", grade: "Class 6",  age: "Age 11–12", module: "Saving & Budgeting", color: "#F4A535" },
  { level: 3, name: "Planner",    emoji: "📋", grade: "Class 7",  age: "Age 12–13", module: "Banking Basics",     color: "#00E5A0" },
  { level: 4, name: "Strategist", emoji: "🎯", grade: "Class 8",  age: "Age 13–14", module: "Income & Careers",   color: "#FF6B6B" },
  { level: 5, name: "Analyst",    emoji: "📊", grade: "Class 9",  age: "Age 14–15", module: "Smart Spending",     color: "#9B93FF" },
  { level: 6, name: "Investor",   emoji: "📈", grade: "Class 10", age: "Age 15–16", module: "Stock Markets",      color: "#F4A535" },
  { level: 7, name: "Architect",  emoji: "🏗️", grade: "Class 11", age: "Age 16–17", module: "Financial Planning", color: "#00E5A0" },
  { level: 8, name: "Master",     emoji: "🏆", grade: "Class 12", age: "Age 17–18", module: "Wealth Building",    color: "#FFD700" },
];

const FEATURES = [
  { icon: "🤖", title: "AI Teacher — Sir", desc: "Ask any money question, any time. Sir answers in plain language, 24/7, with no judgment." },
  { icon: "🏆", title: "WealthPoints & XP", desc: "Earn points for every class you attend. Climb the city leaderboard. Get a verified Roll Number badge." },
  { icon: "🧭", title: "Freedom GPS", desc: "A personalised roadmap helping you build skills and assets — not just degrees." },
  { icon: "🧪", title: "Activity Lab", desc: "Real home experiments: 3-Jar Method, Price-Point Hunt, Budget Challenges and more." },
  { icon: "📊", title: "Progress Dashboard", desc: "Track every module, attendance, and assessment score. See exactly how far you've come." },
  { icon: "🎓", title: "Scholarship Program", desc: "Can't afford it? Apply with a 100-word story or income proof. Free seats available." },
];

export default function StudentLandingPage() {
  const [hasProfile, setHasProfile] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasProfile(!!localStorage.getItem("wwj_profile"));
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const students = useCountUp(12000, 2200, statsVisible);
  const lessons  = useCountUp(450,   2200, statsVisible);
  const cities   = useCountUp(28,    1800, statsVisible);

  return (
    <div className="sl-root">

      {/* ── NAV ── */}
      <nav className="sl-nav">
        <div className="sl-nav-inner">
          <Link href="/" className="sl-logo">
            <img src="/logo.png" alt="WWJ" style={{ height: 48, width: "auto" }} />
            <div><span className="sl-lw">WealthWise</span><span className="sl-ljr"> Jr.</span></div>
          </Link>
          <div className="sl-nav-links">
            <Link href="/parent" className="sl-nav-link">For Parents</Link>
            <Link href="/apply"  className="sl-nav-link">🎓 Scholarship</Link>
            <Link href="/contact" className="sl-nav-link">Contact</Link>
            <Link href={hasProfile ? "/campus" : "/onboarding"} className="sl-btn-nav">
              {hasProfile ? "Go to Campus →" : "Start Free →"}
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="sl-hero">
        <div className="sl-hero-bg">
          <div className="sl-blob sl-b1" />
          <div className="sl-blob sl-b2" />
          <div className="sl-grid-bg" />
        </div>
        <div className="sl-hero-content">
          <div className="sl-hero-tag">
            <span className="sl-tag-pulse" />
            The financial education school forgot to teach
          </div>
          <h1 className="sl-h1">
            Master Money.<br />
            <span className="sl-h1-grad">Build Your Empire.</span>
          </h1>
          <p className="sl-hero-p">
            India's smartest financial curriculum for Class 5–12. 8 progressive levels.
            Gamified, interactive, and built around real money decisions you face every day.
          </p>
          <div className="sl-hero-actions">
            <Link href="/onboarding" className="sl-btn-primary">
              {hasProfile ? "Go to Campus →" : "Start Free — Level 1 Explorer →"}
            </Link>
            <Link href="/parent" className="sl-btn-ghost">For Parents ↗</Link>
          </div>
          <div className="sl-trust-row">
            {["🔒 SSL Secured", "🛡️ Data Private", "📚 CBSE Aligned", "✅ Safe for Kids"].map(b => (
              <div key={b} className="sl-trust-pill">{b}</div>
            ))}
          </div>
        </div>
        <div className="sl-hero-card">
          <div className="sl-card-header">
            <img src="/logo.png" alt="" style={{ height: 22 }} />
            <span className="sl-card-badge">📅 Module 1</span>
          </div>
          <div className="sl-card-lesson">
            <div className="sl-lesson-live">🔴 LIVE NOW</div>
            <div className="sl-lesson-title">The Magic of Compounding</div>
            <div className="sl-lesson-sub">Level 4 · Strategist — Monday</div>
          </div>
          <div className="sl-card-stats">
            <div className="sl-cs"><span style={{ color: "#F4A535", fontWeight: 900, fontSize: "0.95rem" }}>+250</span><span className="sl-csl">XP Earned</span></div>
            <div className="sl-cs"><span style={{ color: "#00E5A0", fontWeight: 900, fontSize: "0.95rem" }}>🔥 12</span><span className="sl-csl">Day Streak</span></div>
            <div className="sl-cs"><span style={{ fontWeight: 900, fontSize: "0.95rem", color: "white" }}>🎯 L4</span><span className="sl-csl">Strategist</span></div>
          </div>
          <div className="sl-card-bar-wrap">
            <span className="sl-cbl">Module Progress</span>
            <div className="sl-bar-track"><div className="sl-bar-fill" style={{ width: "42%" }} /></div>
            <span className="sl-cbp">42%</span>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="sl-stats" ref={statsRef}>
        <div className="sl-stat-item">
          <span className="sl-stat-val">{statsVisible ? students.toLocaleString("en-IN") : "0"}+</span>
          <span className="sl-stat-lbl">Students Enrolled</span>
        </div>
        <div className="sl-stat-div" />
        <div className="sl-stat-item">
          <span className="sl-stat-val">{statsVisible ? lessons : "0"}+</span>
          <span className="sl-stat-lbl">Lessons Available</span>
        </div>
        <div className="sl-stat-div" />
        <div className="sl-stat-item">
          <span className="sl-stat-val">{statsVisible ? cities : "0"}</span>
          <span className="sl-stat-lbl">Cities Across India</span>
        </div>
        <div className="sl-stat-div" />
        <div className="sl-stat-item">
          <span className="sl-stat-val">8 Levels</span>
          <span className="sl-stat-lbl">Explorer → Master</span>
        </div>
      </section>

      {/* ── JOURNEY PATH ── */}
      <section className="sl-section">
        <div className="sl-section-inner">
          <div className="sl-section-tag">✦ Your Learning Path</div>
          <h2 className="sl-section-h2">From Explorer to Master —<br />your 8-level financial journey</h2>
          <p className="sl-section-sub">Everyone starts at Level 1. One module unlocks each month. Graduate as a financial Master by Class 12.</p>

          <div className="sl-journey-wrap">
            <div className="sl-journey-line" />
            {LEVELS.map((lv, i) => (
              <div key={lv.level} className={`sl-jstop ${i % 2 === 0 ? "sl-jl" : "sl-jr"}`}>
                <div className="sl-jdot" style={{ background: lv.color, boxShadow: `0 0 0 4px ${lv.color}22` }} />
                <div className="sl-jcard" style={{ "--jc": lv.color } as any}>
                  <div className="sl-jlvl" style={{ color: lv.color }}>Level {lv.level}</div>
                  <div className="sl-jemoji">{lv.emoji}</div>
                  <div className="sl-jname">{lv.name}</div>
                  <div className="sl-jmod">{lv.module}</div>
                  <div className="sl-jgrade">{lv.grade} · {lv.age}</div>
                  {lv.level === 1 && <div className="sl-jbadge" style={{ background: lv.color }}>Start Here →</div>}
                  {lv.level === 8 && <div className="sl-jbadge" style={{ background: lv.color, color: "#0B1437" }}>🏆 Graduate</div>}
                </div>
                <div className={`sl-jhline ${i % 2 === 0 ? "sl-jhl-l" : "sl-jhl-r"}`} style={{ background: lv.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="sl-section sl-section-alt">
        <div className="sl-section-inner">
          <div className="sl-section-tag">✦ What You Get</div>
          <h2 className="sl-section-h2">Everything school forgot to teach</h2>
          <p className="sl-section-sub">A complete financial education system built for Indian students and mapped to real life.</p>
          <div className="sl-features-grid">
            {FEATURES.map(f => (
              <div key={f.title} className="sl-feat-card">
                <span className="sl-feat-icon">{f.icon}</span>
                <h3 className="sl-feat-title">{f.title}</h3>
                <p className="sl-feat-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="sl-section">
        <div className="sl-section-inner sl-hiw">
          <div className="sl-section-tag">✦ Simple Start</div>
          <h2 className="sl-section-h2">Up and running in 3 minutes</h2>
          <div className="sl-steps">
            {[
              { n: "01", title: "Sign in with Google", desc: "No forms, no passwords. One tap and you're in." },
              { n: "02", title: "Choose Your Level",   desc: "Pick Explorer through Master. The curriculum builds progressively with every level." },
              { n: "03", title: "Learn & Earn",        desc: "Attend classes, complete activities, earn WealthPoints and XP." },
            ].map(s => (
              <div key={s.n} className="sl-step">
                <div className="sl-step-num">{s.n}</div>
                <h3 className="sl-step-title">{s.title}</h3>
                <p className="sl-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCHOLARSHIP CALLOUT ── */}
      <section className="sl-section sl-section-alt">
        <div className="sl-section-inner">
          <div className="sl-scholar-box">
            <div>
              <div className="sl-section-tag" style={{ marginBottom: "0.6rem" }}>🎓 Can&apos;t Afford It?</div>
              <h3 className="sl-scholar-h">Apply for a Free Scholarship Seat</h3>
              <p className="sl-scholar-p">Write 100 words about why you want to learn about money, or submit income proof. We review within 3 days.</p>
            </div>
            <Link href="/apply" className="sl-btn-primary" style={{ whiteSpace: "nowrap" }}>Apply Free →</Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="sl-cta">
        <div className="sl-cta-glow" />
        <div className="sl-cta-tag">🔥 Free Module 1 — No Credit Card</div>
        <h2 className="sl-cta-h">Give yourself the education<br />money can&apos;t buy — but can teach.</h2>
        <Link href="/onboarding" className="sl-btn-primary sl-btn-xl">
          {hasProfile ? "Continue at Campus →" : "Start as Explorer — Free →"}
        </Link>
        <p className="sl-cta-note">Secure · Cancel anytime · Parent dashboard included</p>
      </section>

      <Footer />

      <style jsx>{`
        .sl-root { font-family: 'Plus Jakarta Sans', sans-serif; background: #F8F9FC; color: #1a1a2e; min-height: 100vh; }

        /* NAV */
        .sl-nav { position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,0.97); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(108,99,255,0.08); box-shadow: 0 1px 0 rgba(0,0,0,0.04); }
        .sl-nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 2rem; height: 68px; display: flex; justify-content: space-between; align-items: center; }
        .sl-logo { display: flex; align-items: center; gap: 8px; text-decoration: none; font-weight: 900; font-size: 1.3rem; letter-spacing: -0.03em; }
        .sl-lw { color: #0B1437; } .sl-ljr { color: #6C63FF; }
        .sl-nav-links { display: flex; align-items: center; gap: 0.25rem; }
        .sl-nav-link { font-family: 'Plus Jakarta Sans', sans-serif; color: #6B7280; text-decoration: none; font-weight: 600; font-size: 0.875rem; padding: 0.45rem 0.85rem; border-radius: 0.6rem; transition: all 0.18s; }
        .sl-nav-link:hover { color: #1a1a2e; background: rgba(108,99,255,0.07); }
        .sl-btn-nav { font-family: 'Plus Jakarta Sans', sans-serif; background: linear-gradient(135deg,#0B1437,#1a2b6e); color: white; padding: 0.58rem 1.35rem; border-radius: 2rem; font-size: 0.875rem; font-weight: 800; text-decoration: none; transition: all 0.2s; box-shadow: 0 2px 10px rgba(11,20,55,0.22); margin-left: 0.75rem; white-space: nowrap; }
        .sl-btn-nav:hover { background: linear-gradient(135deg,#6C63FF,#8b5cf6); transform: translateY(-1px); }

        /* HERO */
        .sl-hero { position: relative; min-height: 90vh; background: #0B1437; overflow: hidden; display: flex; align-items: center; padding: 6rem 7vw 4rem; gap: 4rem; justify-content: center; flex-wrap: wrap; }
        .sl-hero-bg { position: absolute; inset: 0; pointer-events: none; }
        .sl-blob { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.22; }
        .sl-b1 { width: 500px; height: 500px; background: radial-gradient(circle,#6C63FF,transparent); top: -100px; left: -100px; }
        .sl-b2 { width: 400px; height: 400px; background: radial-gradient(circle,#F4A535,transparent); bottom: -80px; right: -60px; }
        .sl-grid-bg { position: absolute; inset: 0; background-image: linear-gradient(rgba(108,99,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(108,99,255,0.06) 1px,transparent 1px); background-size: 60px 60px; }
        .sl-hero-content { position: relative; z-index: 1; max-width: 560px; }
        .sl-hero-tag { display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(244,165,53,0.15); border: 1px solid rgba(244,165,53,0.35); color: #FFD166; font-size: 0.78rem; font-weight: 700; padding: 0.4rem 1rem; border-radius: 2rem; margin-bottom: 1.5rem; }
        .sl-tag-pulse { width: 7px; height: 7px; border-radius: 50%; background: #F4A535; animation: pulse-d 1.5s infinite; flex-shrink: 0; }
        @keyframes pulse-d { 0%,100%{opacity:1}50%{opacity:0.4} }
        .sl-h1 { font-size: clamp(2.6rem,5vw,4rem); font-weight: 900; line-height: 1.1; color: white; margin-bottom: 1.25rem; letter-spacing: -0.02em; }
        .sl-h1-grad { background: linear-gradient(135deg,#F4A535,#FF6B35); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .sl-hero-p { color: rgba(255,255,255,0.62); font-size: 1rem; line-height: 1.75; font-weight: 500; margin-bottom: 2rem; }
        .sl-hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem; }
        .sl-btn-primary { background: linear-gradient(135deg,#F4A535,#E8961E); color: #0B1437; padding: 0.9rem 2.2rem; border-radius: 2rem; font-weight: 900; font-size: 1rem; text-decoration: none; transition: all 0.25s; font-family: 'Plus Jakarta Sans',sans-serif; display: inline-block; }
        .sl-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 12px 35px rgba(244,165,53,0.4); }
        .sl-btn-ghost { border: 1.5px solid rgba(255,255,255,0.22); color: rgba(255,255,255,0.75); padding: 0.9rem 2rem; border-radius: 2rem; font-weight: 700; font-size: 1rem; text-decoration: none; transition: all 0.25s; }
        .sl-btn-ghost:hover { border-color: rgba(255,255,255,0.5); color: white; }
        .sl-trust-row { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .sl-trust-pill { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.55); font-size: 0.72rem; font-weight: 700; padding: 0.3rem 0.75rem; border-radius: 2rem; }

        /* HERO CARD */
        .sl-hero-card { position: relative; z-index: 1; background: rgba(14,22,56,0.9); border: 1px solid rgba(108,99,255,0.3); border-radius: 1.5rem; padding: 1.75rem; width: 320px; backdrop-filter: blur(20px); box-shadow: 0 30px 80px rgba(0,0,0,0.4); flex-shrink: 0; }
        .sl-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; }
        .sl-card-badge { background: rgba(108,99,255,0.2); color: #9B93FF; font-size: 0.72rem; font-weight: 800; padding: 0.25rem 0.6rem; border-radius: 1rem; border: 1px solid rgba(108,99,255,0.3); }
        .sl-card-lesson { background: rgba(108,99,255,0.1); border: 1px solid rgba(108,99,255,0.2); border-radius: 1rem; padding: 1.2rem; margin-bottom: 1.25rem; }
        .sl-lesson-live { font-size: 0.65rem; font-weight: 900; color: #FF6680; letter-spacing: 0.1em; margin-bottom: 0.4rem; }
        .sl-lesson-title { font-size: 1rem; font-weight: 800; color: white; margin-bottom: 0.3rem; }
        .sl-lesson-sub { font-size: 0.75rem; color: rgba(255,255,255,0.45); font-weight: 600; }
        .sl-card-stats { display: flex; gap: 0.75rem; margin-bottom: 1.25rem; }
        .sl-cs { display: flex; flex-direction: column; flex: 1; background: rgba(0,0,0,0.25); border-radius: 0.75rem; padding: 0.6rem 0.75rem; }
        .sl-csl { font-size: 0.6rem; font-weight: 700; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.06em; margin-top: 0.2rem; }
        .sl-card-bar-wrap { display: flex; flex-direction: column; gap: 0.5rem; }
        .sl-cbl { font-size: 0.7rem; font-weight: 700; color: rgba(255,255,255,0.45); }
        .sl-cbp { font-size: 0.7rem; font-weight: 700; color: #00E5A0; text-align: right; }
        .sl-bar-track { height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden; }
        .sl-bar-fill { height: 100%; background: linear-gradient(90deg,#6C63FF,#00E5A0); border-radius: 3px; }

        /* STATS */
        .sl-stats { background: white; border-top: 1px solid rgba(108,99,255,0.08); border-bottom: 1px solid rgba(108,99,255,0.08); padding: 2.5rem 2rem; display: flex; justify-content: center; align-items: center; gap: 0; flex-wrap: wrap; }
        .sl-stat-item { display: flex; flex-direction: column; align-items: center; padding: 0.75rem 3rem; }
        .sl-stat-val { font-size: clamp(1.8rem,3vw,2.5rem); font-weight: 900; color: #0B1437; letter-spacing: -0.02em; }
        .sl-stat-lbl { font-size: 0.78rem; font-weight: 700; color: #6B7280; text-transform: uppercase; letter-spacing: 0.06em; margin-top: 0.25rem; }
        .sl-stat-div { width: 1px; height: 50px; background: rgba(108,99,255,0.15); }

        /* SECTIONS */
        .sl-section { padding: 6rem 2rem; }
        .sl-section-alt { background: white; }
        .sl-section-inner { max-width: 1100px; margin: 0 auto; }
        .sl-section-tag { font-size: 0.78rem; font-weight: 900; color: #6C63FF; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1rem; }
        .sl-section-h2 { font-size: clamp(1.8rem,3.5vw,2.6rem); font-weight: 900; color: #0B1437; margin-bottom: 1rem; letter-spacing: -0.02em; }
        .sl-section-sub { color: #6B7280; font-size: 1rem; font-weight: 500; max-width: 560px; line-height: 1.7; margin-bottom: 3rem; }

        /* JOURNEY PATH */
        .sl-journey-wrap { position: relative; max-width: 820px; margin: 0 auto; padding: 1rem 0 2rem; }
        .sl-journey-line { position: absolute; left: 50%; top: 0; bottom: 0; width: 3px; background: linear-gradient(to bottom,#6C63FF,#FFD700); transform: translateX(-50%); border-radius: 2px; }
        .sl-jstop { display: flex; align-items: center; position: relative; min-height: 130px; }
        .sl-jstop.sl-jl { justify-content: flex-start; }
        .sl-jstop.sl-jr { justify-content: flex-end; }
        .sl-jdot { position: absolute; left: 50%; transform: translateX(-50%); width: 18px; height: 18px; border-radius: 50%; border: 3px solid #F8F9FC; z-index: 3; }
        .sl-jcard { width: 43%; background: white; border: 1.5px solid rgba(108,99,255,0.1); border-radius: 1.25rem; padding: 1.25rem 1.5rem; transition: all 0.3s; z-index: 2; }
        .sl-jl .sl-jcard { transform: perspective(700px) rotateY(4deg); }
        .sl-jr .sl-jcard { transform: perspective(700px) rotateY(-4deg); }
        .sl-jcard:hover { border-color: var(--jc,#6C63FF); box-shadow: 0 16px 48px rgba(108,99,255,0.1); transform: perspective(700px) rotateY(0) translateY(-5px) !important; }
        .sl-jhline { position: absolute; top: 50%; height: 2px; width: 7%; opacity: 0.3; }
        .sl-jhl-l { left: 43%; }
        .sl-jhl-r { right: 43%; }
        .sl-jlvl { font-size: 0.62rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.3rem; }
        .sl-jemoji { font-size: 1.8rem; line-height: 1; margin-bottom: 0.3rem; }
        .sl-jname { font-size: 1.05rem; font-weight: 900; color: #0B1437; margin-bottom: 0.2rem; }
        .sl-jmod { font-size: 0.8rem; font-weight: 700; color: #6C63FF; margin-bottom: 0.2rem; }
        .sl-jgrade { font-size: 0.7rem; color: #6B7280; font-weight: 600; }
        .sl-jbadge { margin-top: 0.6rem; display: inline-block; font-size: 0.65rem; font-weight: 900; color: white; padding: 0.2rem 0.6rem; border-radius: 2rem; }

        /* FEATURES */
        .sl-features-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
        .sl-feat-card { background: #F8F9FC; border: 1px solid rgba(108,99,255,0.1); border-radius: 1.25rem; padding: 2rem; transition: all 0.25s; }
        .sl-feat-card:hover { transform: translateY(-4px); box-shadow: 0 20px 50px rgba(108,99,255,0.1); border-color: rgba(108,99,255,0.25); }
        .sl-feat-icon { font-size: 2.2rem; margin-bottom: 1rem; display: block; }
        .sl-feat-title { font-size: 1rem; font-weight: 800; color: #0B1437; margin-bottom: 0.5rem; }
        .sl-feat-desc { font-size: 0.88rem; color: #6B7280; line-height: 1.65; font-weight: 500; }

        /* HOW IT WORKS */
        .sl-hiw { text-align: center; }
        .sl-steps { display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap; }
        .sl-step { max-width: 280px; padding: 2rem; background: white; border: 1px solid rgba(108,99,255,0.1); border-radius: 1.25rem; text-align: left; }
        .sl-step-num { font-size: 2.5rem; font-weight: 900; color: rgba(108,99,255,0.12); font-family: 'Space Mono',monospace; margin-bottom: 1rem; }
        .sl-step-title { font-size: 1rem; font-weight: 800; color: #0B1437; margin-bottom: 0.5rem; }
        .sl-step-desc { font-size: 0.88rem; color: #6B7280; line-height: 1.65; }

        /* SCHOLARSHIP */
        .sl-scholar-box { background: linear-gradient(135deg,rgba(108,99,255,0.06),rgba(0,229,160,0.04)); border: 1px solid rgba(108,99,255,0.2); border-radius: 1.75rem; padding: 2.5rem; display: flex; justify-content: space-between; align-items: center; gap: 2rem; flex-wrap: wrap; }
        .sl-scholar-h { font-size: 1.4rem; font-weight: 900; color: #0B1437; margin: 0.4rem 0 0.5rem; }
        .sl-scholar-p { font-size: 0.9rem; color: #6B7280; line-height: 1.6; max-width: 480px; }

        /* CTA */
        .sl-cta { background: #0B1437; padding: 6rem 2rem; text-align: center; position: relative; overflow: hidden; }
        .sl-cta::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at center,rgba(244,165,53,0.1),transparent 70%); }
        .sl-cta-glow { position: absolute; inset: 0; background: radial-gradient(ellipse at center,rgba(108,99,255,0.1),transparent 70%); }
        .sl-cta-tag { position: relative; z-index: 1; font-size: 0.75rem; font-weight: 900; color: #F4A535; text-transform: uppercase; letter-spacing: 0.12em; background: rgba(244,165,53,0.12); border: 1px solid rgba(244,165,53,0.3); padding: 0.35rem 1rem; border-radius: 2rem; display: inline-block; margin-bottom: 1.5rem; }
        .sl-cta-h { position: relative; z-index: 1; font-size: clamp(1.6rem,3.5vw,2.4rem); font-weight: 900; color: white; letter-spacing: -0.02em; line-height: 1.2; margin-bottom: 2rem; }
        .sl-btn-xl { font-size: 1.1rem !important; padding: 1.1rem 3rem !important; position: relative; z-index: 1; }
        .sl-cta-note { position: relative; z-index: 1; margin-top: 1.5rem; font-size: 0.8rem; color: rgba(255,255,255,0.3); font-weight: 600; }

        @media(max-width:1100px) { .sl-features-grid { grid-template-columns: 1fr 1fr; } }
        @media(max-width:768px) {
          .sl-features-grid { grid-template-columns: 1fr; }
          .sl-hero { padding: 5rem 1.5rem 3rem; }
          .sl-hero-card { width: 100%; max-width: 380px; }
          .sl-stat-item { padding: 0.75rem 1.5rem; }
          .sl-stat-div { display: none; }
          .sl-steps { flex-direction: column; align-items: center; }
          .sl-nav-links .sl-nav-link { display: none; }
          .sl-journey-line { display: none; }
          .sl-jstop { justify-content: center !important; min-height: auto; margin-bottom: 1rem; }
          .sl-jdot { display: none; }
          .sl-jcard { width: 90%; transform: none !important; }
          .sl-jhline { display: none; }
          .sl-scholar-box { flex-direction: column; }
        }
      `}</style>
    </div>
  );
}
