"use client";
import Link from "next/link";
import Footer from "@/components/Footer";
import CampusLoginFloat from "@/components/CampusLoginFloat";
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
  { level: 1, name: "Explorer",   emoji: "🔭", grade: "Class 5",  age: "Age 10–11", module: "Money Foundations",   color: "#6C63FF" },
  { level: 2, name: "Saver",      emoji: "🪙", grade: "Class 6",  age: "Age 11–12", module: "Saving & Budgeting",  color: "#F4A535" },
  { level: 3, name: "Planner",    emoji: "📋", grade: "Class 7",  age: "Age 12–13", module: "Banking Basics",      color: "#00E5A0" },
  { level: 4, name: "Strategist", emoji: "🎯", grade: "Class 8",  age: "Age 13–14", module: "Income & Careers",    color: "#FF6B6B" },
  { level: 5, name: "Analyst",    emoji: "📊", grade: "Class 9",  age: "Age 14–15", module: "Smart Spending",      color: "#9B93FF" },
  { level: 6, name: "Investor",   emoji: "📈", grade: "Class 10", age: "Age 15–16", module: "Stock Markets",       color: "#F4A535" },
  { level: 7, name: "Architect",  emoji: "🏗️", grade: "Class 11", age: "Age 16–17", module: "Financial Planning",  color: "#00E5A0" },
  { level: 8, name: "Master",     emoji: "🏆", grade: "Class 12", age: "Age 17–18", module: "Wealth Building",     color: "#FFD700" },
];

const FEATURES = [
  { icon: "🤖", title: "AI Teacher — Sir", desc: "Ask any money question, any time. Sir answers in plain language, 24/7, with no judgment." },
  { icon: "🏆", title: "WealthPoints & XP", desc: "Earn points for every class. Climb the city leaderboard. Get a verified Roll Number badge." },
  { icon: "🧭", title: "Freedom GPS", desc: "A personalised roadmap helping you build skills and assets — not just degrees." },
  { icon: "🧪", title: "Activity Lab", desc: "Real home experiments: 3-Jar Method, Price-Point Hunt, Budget Challenges and more." },
  { icon: "📊", title: "Progress Dashboard", desc: "Track every module, attendance, and score. See exactly how far you've come." },
  { icon: "🎓", title: "Scholarship Program", desc: "Can't afford it? Apply with a 100-word story or income proof. Free seats available." },
];

const FEARS = [
  { icon: "💳", heading: "Your child will fall into a credit card trap", body: "College students are being offered cards at 42% annual interest. Without knowledge to refuse, 67% of first-time earners carry a revolving balance within 2 years of their first job.", stat: "₹2.3L avg debt by 25" },
  { icon: "📉", heading: "They'll give savings to an MLM or Ponzi scheme", body: "Every year in India, ₹45,000 Crore is lost to financial scams — mostly by young professionals who never learned to identify a fraudulent investment promise.", stat: "₹45,000 Cr lost annually" },
  { icon: "🏠", heading: "They'll be trapped in EMI slavery for 25 years", body: "The average Indian takes a home loan at 28 with ₹40L of debt and no emergency fund. Social pressure is a stronger signal than financial readiness.", stat: "₹1.1L avg EMI at 30" },
  { icon: "👴", heading: "At 55, they'll have almost nothing saved", body: "India's pension coverage is under 12% of the workforce. The median private-sector employee retires with less than 18 months of living expenses saved.", stat: "88% of workers have no pension" },
  { icon: "🎓", heading: "They'll choose a career based entirely on salary", body: "Without understanding FIRE, income types, or entrepreneurship pathways, most children default to the highest-paying degree visible to their parents.", stat: "73% of graduates are 'misemployed'" },
  { icon: "💔", heading: "Their marriage will be strained over money", body: "Money disagreements are the #1 cause of marital stress in India. Couples with financial literacy report 3× higher financial satisfaction.", stat: "#1 cause of marital stress" },
];

const TESTIMONIALS = [
  { quote: "My son asked me why we don't invest in index funds after his Level 2 lesson. That conversation made me finally open a Zerodha account.", name: "Priya S.", city: "Pune", grade: "Son, Explorer → Saver" },
  { quote: "She used her Activity Lab money to open her first savings account at age 12. She's now 13 and has ₹3,200 she earned and saved herself.", name: "Ramesh K.", city: "Bengaluru", grade: "Daughter, Level 2 Saver" },
  { quote: "My daughter taught me the 24-hour rule. I was about to make a ₹12,000 impulse purchase. She said 'wait 24 hours.' I didn't buy it. She's 11.", name: "Sunita M.", city: "Jaipur", grade: "Daughter, Level 1 Explorer" },
];

const FAQS = [
  { q: "Is this extra pressure on my child?", a: "No. Each module is 20–30 minute weekly sessions with stories and games. It's lighter than one maths chapter but stays in memory for life because it connects to real family situations." },
  { q: "My child is already studying too much.", a: "WealthWise Junior is not academic content — it's life literacy. Activities are designed as home experiments, making learning enjoyable rather than adding school burden." },
  { q: "Won't they learn this when they grow up?", a: "The habits and money relationship formed between ages 10–16 persist for life. Prevention is infinitely easier than correction at 30 with an EMI and no savings." },
  { q: "What if I don't know much about finance myself?", a: "Every lesson is in plain language. Parents tell us they learn more from their child's explanations than from any finance article. Home Activities spark conversations, not require expertise." },
  { q: "How do students join?", a: "Sign in with Google, pick your class level (Explorer through Master), and start Module 1 free. No credit card, no forms." },
  { q: "How does the scholarship program work?", a: "Any student can apply with a 100-word story about why they want to learn about money, or submit income proof. We review within 3 days and grant full free access to all 8 levels." },
];

export default function HomePage() {
  const [hasProfile, setHasProfile] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const students = useCountUp(12000, 2200, statsVisible);
  const lessons  = useCountUp(450,   2200, statsVisible);
  const cities   = useCountUp(28,    1800, statsVisible);

  useEffect(() => {
    setHasProfile(!!localStorage.getItem("wwj_profile"));
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="hp-root">

      {/* ── NAV ── */}
      <nav className="hp-nav">
        <div className="hp-nav-inner">
          <Link href="/" className="hp-logo">
            <img src="/logo.png" alt="WWJ" style={{ height: 48, width: "auto" }} />
            <div><span className="hp-lw">WealthWise</span><span className="hp-ljr"> Jr.</span></div>
          </Link>
          <div className="hp-nav-links">
            <a href="#students" className="hp-nav-link">For Students</a>
            <a href="#parents"  className="hp-nav-link">For Parents</a>
            <Link href="/apply"   className="hp-nav-link hp-nav-scholar">🎓 Scholarship</Link>
            <Link href="/contact" className="hp-nav-link">Contact</Link>
            <Link href={hasProfile ? "/campus" : "/onboarding"} className="hp-btn-nav">
              {hasProfile ? "Go to Campus →" : "Start Free →"}
            </Link>
          </div>
          {/* mobile campus btn */}
          <Link href={hasProfile ? "/campus" : "/onboarding"} className="hp-btn-nav hp-btn-nav-mobile">
            {hasProfile ? "Campus →" : "Start →"}
          </Link>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section className="hp-hero" id="home">
        <div className="hp-hero-bg">
          <div className="hp-blob hp-b1" />
          <div className="hp-blob hp-b2" />
          <div className="hp-blob hp-b3" />
          <div className="hp-grid-bg" />
        </div>
        <div className="hp-hero-content">
          <div className="hp-hero-tag">
            <span className="hp-tag-pulse" />
            The financial education school forgot to teach
          </div>
          <h1 className="hp-h1">
            Master Money.<br />
            <span className="hp-h1-grad">Build Your Empire.</span>
          </h1>
          <p className="hp-hero-p">
            India&apos;s only structured financial curriculum for Class 5–12.
            8 progressive levels. Gamified, AI-powered, and built around real money decisions.
          </p>
          <div className="hp-hero-actions">
            <a href="#students" className="hp-btn-gold">I&apos;m a Student →</a>
            <a href="#parents"  className="hp-btn-ghost">I&apos;m a Parent ↗</a>
          </div>
          <div className="hp-trust-row">
            {["🔒 SSL Secured", "🛡️ Data Private", "📚 CBSE Aligned", "✅ Safe for Kids"].map(b => (
              <div key={b} className="hp-trust-pill">{b}</div>
            ))}
          </div>
        </div>
        <div className="hp-hero-card">
          <div className="hp-card-header">
            <img src="/logo.png" alt="" style={{ height: 22 }} />
            <span className="hp-card-badge">📅 Module 1</span>
          </div>
          <div className="hp-card-lesson">
            <div className="hp-lesson-live">🔴 LIVE NOW</div>
            <div className="hp-lesson-title">The Magic of Compounding</div>
            <div className="hp-lesson-sub">Level 4 · Strategist — Monday</div>
          </div>
          <div className="hp-card-stats">
            <div className="hp-cs"><span style={{ color: "#F4A535", fontWeight: 900, fontSize: "0.95rem" }}>+250</span><span className="hp-csl">XP Earned</span></div>
            <div className="hp-cs"><span style={{ color: "#00E5A0", fontWeight: 900, fontSize: "0.95rem" }}>🔥 12</span><span className="hp-csl">Day Streak</span></div>
            <div className="hp-cs"><span style={{ fontWeight: 900, fontSize: "0.95rem", color: "white" }}>🎯 L4</span><span className="hp-csl">Strategist</span></div>
          </div>
          <div className="hp-card-bar-wrap">
            <span className="hp-cbl">Module Progress</span>
            <div className="hp-bar-track"><div className="hp-bar-fill" style={{ width: "42%" }} /></div>
            <span className="hp-cbp">42%</span>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="hp-stats" ref={statsRef}>
        <div className="hp-stat-item">
          <span className="hp-stat-val">{statsVisible ? students.toLocaleString("en-IN") : "0"}+</span>
          <span className="hp-stat-lbl">Students Enrolled</span>
        </div>
        <div className="hp-stat-div" />
        <div className="hp-stat-item">
          <span className="hp-stat-val">{statsVisible ? lessons : "0"}+</span>
          <span className="hp-stat-lbl">Lessons Available</span>
        </div>
        <div className="hp-stat-div" />
        <div className="hp-stat-item">
          <span className="hp-stat-val">{statsVisible ? cities : "0"}</span>
          <span className="hp-stat-lbl">Cities Across India</span>
        </div>
        <div className="hp-stat-div" />
        <div className="hp-stat-item">
          <span className="hp-stat-val">8 Levels</span>
          <span className="hp-stat-lbl">Explorer → Master</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FOR STUDENTS
      ══════════════════════════════════════════════ */}
      <section className="hp-section hp-section-students" id="students">
        <div className="hp-section-inner">
          <div className="hp-audience-pill hp-pill-student">✦ For Students</div>
          <h2 className="hp-section-h2">From Explorer to Master —<br />your 8-level financial journey</h2>
          <p className="hp-section-sub">Everyone starts at Level 1. One module unlocks each month. Graduate as a financial Master by Class 12.</p>

          <div className="hp-journey-wrap">
            <div className="hp-journey-line" />
            {LEVELS.map((lv, i) => (
              <div key={lv.level} className={`hp-jstop ${i % 2 === 0 ? "hp-jl" : "hp-jr"}`}>
                <div className="hp-jdot" style={{ background: lv.color, boxShadow: `0 0 0 6px ${lv.color}22` }} />
                <div className="hp-jcard" style={{ "--jc": lv.color } as React.CSSProperties}>
                  <div className="hp-jlvl" style={{ color: lv.color }}>Level {lv.level}</div>
                  <div className="hp-jemoji">{lv.emoji}</div>
                  <div className="hp-jname">{lv.name}</div>
                  <div className="hp-jmod">{lv.module}</div>
                  <div className="hp-jgrade">{lv.grade} · {lv.age}</div>
                  {lv.level === 1 && <div className="hp-jbadge" style={{ background: lv.color }}>Start Here →</div>}
                  {lv.level === 8 && <div className="hp-jbadge" style={{ background: lv.color, color: "#0B1437" }}>🏆 Graduate</div>}
                </div>
                <div className={`hp-jhline ${i % 2 === 0 ? "hp-jhl-l" : "hp-jhl-r"}`} style={{ background: lv.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="hp-section hp-section-white">
        <div className="hp-section-inner">
          <div className="hp-section-tag">✦ What You Get</div>
          <h2 className="hp-section-h2">Everything school forgot to teach</h2>
          <p className="hp-section-sub">A complete financial education system built for Indian students and mapped to real life.</p>
          <div className="hp-features-grid">
            {FEATURES.map(f => (
              <div key={f.title} className="hp-feat-card">
                <span className="hp-feat-icon">{f.icon}</span>
                <h3 className="hp-feat-title">{f.title}</h3>
                <p className="hp-feat-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — STUDENT */}
      <section className="hp-section">
        <div className="hp-section-inner hp-hiw">
          <div className="hp-section-tag">✦ Simple Start</div>
          <h2 className="hp-section-h2">Up and running in 3 minutes</h2>
          <div className="hp-steps">
            {[
              { n: "01", title: "Sign in with Google", desc: "No forms, no passwords. One tap and you're in." },
              { n: "02", title: "Choose Your Level",   desc: "Pick Explorer through Master. The curriculum builds progressively with every level." },
              { n: "03", title: "Learn & Earn",        desc: "Attend classes, complete activities, earn WealthPoints and XP." },
            ].map(s => (
              <div key={s.n} className="hp-step">
                <div className="hp-step-num">{s.n}</div>
                <h3 className="hp-step-title">{s.title}</h3>
                <p className="hp-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="hp-cta-inline">
            <Link href="/onboarding" className="hp-btn-gold">
              {hasProfile ? "Continue at Campus →" : "Start Free — Level 1 Explorer →"}
            </Link>
            <p className="hp-cta-inline-note">Free to start · No credit card</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FOR PARENTS
      ══════════════════════════════════════════════ */}
      <section className="hp-section hp-section-parents" id="parents">
        <div className="hp-section-inner">
          <div className="hp-audience-pill hp-pill-parent">✦ For Parents</div>
          <h2 className="hp-section-h2 hp-h2-danger">
            Six things that <em>will</em> happen to your child<br />if money is never taught at home or school.
          </h2>
          <p className="hp-section-sub">
            These are documented outcomes in India&apos;s economy — affecting millions of educated, employed adults who were brilliant in school.
          </p>

          {/* SHOCK STATS */}
          <div className="hp-shock-bar">
            {[
              { num: "93%", label: "Indian adults lack basic financial literacy", note: "SEBI survey, 2022" },
              { num: "₹0", label: "of 12 school years covers personal finance", note: "National Curriculum Framework" },
              { num: "15–25", label: "Average age of first bad financial decision", note: "CIBIL report, 2023" },
              { num: "₹47L", label: "Lost by starting investments 10 years late", note: "At 12% return, 30yr horizon" },
            ].map((s, i) => (
              <div key={i} className="hp-shock-tile">
                <div className="hp-shock-num">{s.num}</div>
                <div className="hp-shock-label">{s.label}</div>
                <div className="hp-shock-note">{s.note}</div>
              </div>
            ))}
          </div>

          <div className="hp-fear-grid">
            {FEARS.map((f, i) => (
              <div key={i} className="hp-fear-card">
                <div className="hp-fear-top">
                  <span className="hp-fear-icon">{f.icon}</span>
                  <span className="hp-fear-stat">{f.stat}</span>
                </div>
                <h3 className="hp-fear-heading">{f.heading}</h3>
                <p className="hp-fear-body">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="hp-section hp-section-white">
        <div className="hp-section-inner">
          <div className="hp-section-tag" style={{ color: "#6C63FF" }}>✦ The Gap</div>
          <h2 className="hp-section-h2" style={{ marginBottom: "2.5rem" }}>
            What <span style={{ color: "#FF4466" }}>school teaches</span> vs. what <span style={{ color: "#00E5A0" }}>WealthWise teaches</span>
          </h2>
          <div className="hp-compare-wrap premium-glass">
            <div className="hp-compare-grid">
              <div className="hp-compare-col">
                <div className="hp-compare-header" style={{ color: "#FF4466", background: "rgba(255,68,102,0.08)" }}>❌ Traditional Curriculum</div>
                {["Profit & loss (abstract only — never applied)", "History of trade (zero practical use)", "Consumer awareness (single chapter, forgotten)", "Zero on compound interest", "Zero on investments or mutual funds", "Zero on income tax or GST", "Zero on debt management or credit scores", "Zero on bank accounts, FDs, or insurance", "Zero on stock market or NIFTY", "Zero on retirement or financial planning"].map((l, i) => (
                  <div key={i} className="hp-compare-row">{l}</div>
                ))}
              </div>
              <div className="hp-compare-col">
                <div className="hp-compare-header" style={{ color: "#00E5A0", background: "rgba(0,229,160,0.08)" }}>✅ WealthWise Junior</div>
                {["Compound interest with real ₹ examples from Class 6", "Why inflation silently destroys savings", "50/30/20 budget in practice — from Class 7", "NIFTY 50, mutual funds, index investing (Class 8+)", "GST and income tax — how they actually work", "Debt: when it builds vs. destroys wealth", "CIBIL score — building it from age 18", "FIRE planning — retire early mathematics", "Reading a real P&L and Balance Sheet", "A real 5-year personal financial plan at Level 8"].map((l, i) => (
                  <div key={i} className="hp-compare-row hp-compare-good">{l}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — PARENT */}
      <section className="hp-section">
        <div className="hp-section-inner">
          <div className="hp-section-tag">✦ How It Works</div>
          <h2 className="hp-section-h2">Simple for children. Profound for life.</h2>
          <div className="hp-how-grid">
            {[
              { step: "01", icon: "📚", title: "Structured Level-by-Level Curriculum", body: "A month-by-month curriculum from Explorer to Master. Video classes, theory notes, and quizzes seamlessly combined." },
              { step: "02", icon: "👨‍🏫", title: "24/7 AI Mentor 'Sir'", body: "Our voice-enabled AI tutor answers questions anytime. Fully moderated, strictly aligned with each level's syllabus." },
              { step: "03", icon: "📱", title: "Parent Dashboard Alerts", body: "Real-time progress visibility — test scores, completed modules, attendance, and AI moderation warnings." },
              { step: "04", icon: "🔓", title: "Monthly Module Unlocks", body: "New modules unlock automatically each month. Students who complete early get excellence challenges — not idle time." },
            ].map((h, i) => (
              <div key={i} className="hp-how-card premium-glass">
                <div className="hp-how-top">
                  <span className="hp-how-step">{h.step}</span>
                  <span style={{ fontSize: "1.8rem" }}>{h.icon}</span>
                </div>
                <h3 className="hp-how-title">{h.title}</h3>
                <p className="hp-how-body">{h.body}</p>
              </div>
            ))}
          </div>
          <div className="hp-cta-inline">
            <Link href="/onboarding" className="hp-btn-gold">Start Your Child&apos;s Journey →</Link>
            <p className="hp-cta-inline-note">Free to start · No credit card required · Parent dashboard included</p>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="hp-section hp-section-white">
        <div className="hp-section-inner">
          <h2 className="hp-section-h2 hp-center">What families are saying</h2>
          <p className="hp-section-sub hp-center">From students and parents across India who started early</p>
          <div className="hp-testi-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="hp-testi-card premium-glass card-hover">
                <div style={{ color: "#F4A535", fontSize: "0.9rem", letterSpacing: "0.1em", marginBottom: "1rem" }}>★★★★★</div>
                <p className="hp-testi-quote">&ldquo;{t.quote}&rdquo;</p>
                <div className="hp-testi-author">
                  <div className="hp-testi-avatar">{t.name[0]}</div>
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "var(--foreground)" }}>{t.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--muted)", fontWeight: 600 }}>{t.city} · {t.grade}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCHOLARSHIP ── */}
      <section className="hp-section">
        <div className="hp-section-inner">
          <div className="hp-scholar-box premium-glass">
            <div className="hp-scholar-left">
              <div className="hp-section-tag" style={{ marginBottom: "0.6rem" }}>🎓 Scholarship Program</div>
              <h3 className="hp-scholar-h">Know a child who can&apos;t afford it?</h3>
              <p className="hp-scholar-p">We reserve seats for students from economically weaker backgrounds. Any student can apply with a 100-word story or income proof and receive <strong>completely free, full access</strong> to all 8 levels.</p>
            </div>
            <Link href="/apply" className="hp-btn-gold hp-scholar-btn">Apply for Free Seat →</Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="hp-section hp-section-white">
        <div className="hp-section-inner hp-faq-inner">
          <h2 className="hp-section-h2 hp-center">Common questions</h2>
          <p className="hp-section-sub hp-center">Answered honestly</p>
          <div className="hp-faq-list">
            {FAQS.map((item, i) => (
              <div key={i} className={`hp-faq-item premium-glass ${openFaq === i ? "hp-faq-open" : ""}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="hp-faq-q">
                  <span>{item.q}</span>
                  <span className="hp-faq-arrow">{openFaq === i ? "↑" : "↓"}</span>
                </div>
                {openFaq === i && <p className="hp-faq-a">{item.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="hp-cta">
        <div className="hp-cta-glow" />
        <div className="hp-cta-tag">🔥 Free Module 1 — No Credit Card</div>
        <h2 className="hp-cta-h">
          Give your child the education<br />
          <span className="hp-cta-grad">money can&apos;t buy — but can teach.</span>
        </h2>
        <Link href="/onboarding" className="hp-btn-gold hp-btn-xl">
          {hasProfile ? "Continue at Campus →" : "Start Free — Level 1 Explorer →"}
        </Link>
        <p className="hp-cta-note">Secure · Cancel anytime · Parent dashboard included</p>
      </section>

      <Footer />
      <CampusLoginFloat />

      <style jsx>{`
        .hp-root { font-family: 'Plus Jakarta Sans', sans-serif; background: #F8F9FC; color: #1a1a2e; min-height: 100vh; }

        /* ── NAV ── */
        .hp-nav { position: sticky; top: 0; z-index: 200; background: rgba(255,255,255,0.97); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid rgba(108,99,255,0.08); box-shadow: 0 1px 0 rgba(0,0,0,0.04); }
        .hp-nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 2rem; height: 68px; display: flex; justify-content: space-between; align-items: center; }
        .hp-logo { display: flex; align-items: center; gap: 8px; text-decoration: none; font-weight: 900; font-size: 1.3rem; letter-spacing: -0.03em; }
        .hp-lw { color: #0B1437; } .hp-ljr { color: #6C63FF; }
        .hp-nav-links { display: flex; align-items: center; gap: 0.25rem; }
        .hp-nav-link { font-family: 'Plus Jakarta Sans', sans-serif; color: #6B7280; text-decoration: none; font-weight: 600; font-size: 0.875rem; padding: 0.45rem 0.85rem; border-radius: 0.6rem; transition: all 0.18s; }
        .hp-nav-link:hover { color: #1a1a2e; background: rgba(108,99,255,0.07); }
        .hp-nav-scholar { color: #6C63FF !important; font-weight: 700; }
        .hp-btn-nav { font-family: 'Plus Jakarta Sans', sans-serif; background: linear-gradient(135deg,#0B1437,#1a2b6e); color: white; padding: 0.58rem 1.35rem; border-radius: 2rem; font-size: 0.875rem; font-weight: 800; text-decoration: none; transition: all 0.2s; box-shadow: 0 2px 10px rgba(11,20,55,0.22); margin-left: 0.75rem; white-space: nowrap; }
        .hp-btn-nav:hover { background: linear-gradient(135deg,#6C63FF,#8b5cf6); transform: translateY(-1px); }
        .hp-btn-nav-mobile { display: none; }

        /* ── HERO ── */
        .hp-hero { position: relative; min-height: 92vh; background: #0B1437; overflow: hidden; display: flex; align-items: center; padding: 6rem 7vw 4rem; gap: 4rem; justify-content: center; flex-wrap: wrap; }
        .hp-hero-bg { position: absolute; inset: 0; pointer-events: none; }
        .hp-blob { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.2; }
        .hp-b1 { width: 500px; height: 500px; background: radial-gradient(circle,#6C63FF,transparent); top: -100px; left: -100px; }
        .hp-b2 { width: 400px; height: 400px; background: radial-gradient(circle,#F4A535,transparent); bottom: -80px; right: -60px; }
        .hp-b3 { width: 300px; height: 300px; background: radial-gradient(circle,#00E5A0,transparent); top: 35%; right: 18%; opacity: 0.1; }
        .hp-grid-bg { position: absolute; inset: 0; background-image: linear-gradient(rgba(108,99,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(108,99,255,0.06) 1px,transparent 1px); background-size: 60px 60px; }

        .hp-hero-content { position: relative; z-index: 1; max-width: 560px; }
        .hp-hero-tag { display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(244,165,53,0.15); border: 1px solid rgba(244,165,53,0.35); color: #FFD166; font-size: 0.78rem; font-weight: 700; padding: 0.4rem 1rem; border-radius: 2rem; margin-bottom: 1.5rem; }
        .hp-tag-pulse { width: 7px; height: 7px; border-radius: 50%; background: #F4A535; animation: hp-pulse 1.5s infinite; flex-shrink: 0; }
        @keyframes hp-pulse { 0%,100%{opacity:1}50%{opacity:0.35} }
        .hp-h1 { font-size: clamp(2.6rem,5vw,4rem); font-weight: 900; line-height: 1.1; color: white; margin-bottom: 1.25rem; letter-spacing: -0.02em; }
        .hp-h1-grad { background: linear-gradient(135deg,#F4A535,#FF6B35); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hp-hero-p { color: rgba(255,255,255,0.62); font-size: 1rem; line-height: 1.75; font-weight: 500; margin-bottom: 2rem; }
        .hp-hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem; }
        .hp-btn-gold { background: linear-gradient(135deg,#F4A535,#E8961E); color: #0B1437; padding: 0.9rem 2.2rem; border-radius: 2rem; font-weight: 900; font-size: 1rem; text-decoration: none; transition: all 0.25s; font-family: 'Plus Jakarta Sans',sans-serif; display: inline-block; }
        .hp-btn-gold:hover { transform: translateY(-3px); box-shadow: 0 12px 35px rgba(244,165,53,0.45); }
        .hp-btn-ghost { border: 1.5px solid rgba(255,255,255,0.22); color: rgba(255,255,255,0.75); padding: 0.9rem 2rem; border-radius: 2rem; font-weight: 700; font-size: 1rem; text-decoration: none; transition: all 0.25s; }
        .hp-btn-ghost:hover { border-color: rgba(255,255,255,0.5); color: white; }
        .hp-trust-row { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .hp-trust-pill { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.55); font-size: 0.72rem; font-weight: 700; padding: 0.3rem 0.75rem; border-radius: 2rem; }

        /* hero card */
        .hp-hero-card { position: relative; z-index: 1; background: rgba(14,22,56,0.9); border: 1px solid rgba(108,99,255,0.3); border-radius: 1.5rem; padding: 1.75rem; width: 320px; backdrop-filter: blur(20px); box-shadow: 0 30px 80px rgba(0,0,0,0.4); flex-shrink: 0; }
        .hp-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; }
        .hp-card-badge { background: rgba(108,99,255,0.2); color: #9B93FF; font-size: 0.72rem; font-weight: 800; padding: 0.25rem 0.6rem; border-radius: 1rem; border: 1px solid rgba(108,99,255,0.3); }
        .hp-card-lesson { background: rgba(108,99,255,0.1); border: 1px solid rgba(108,99,255,0.2); border-radius: 1rem; padding: 1.2rem; margin-bottom: 1.25rem; }
        .hp-lesson-live { font-size: 0.65rem; font-weight: 900; color: #FF6680; letter-spacing: 0.1em; margin-bottom: 0.4rem; }
        .hp-lesson-title { font-size: 1rem; font-weight: 800; color: white; margin-bottom: 0.3rem; }
        .hp-lesson-sub { font-size: 0.75rem; color: rgba(255,255,255,0.45); font-weight: 600; }
        .hp-card-stats { display: flex; gap: 0.75rem; margin-bottom: 1.25rem; }
        .hp-cs { display: flex; flex-direction: column; flex: 1; background: rgba(0,0,0,0.25); border-radius: 0.75rem; padding: 0.6rem 0.75rem; }
        .hp-csl { font-size: 0.6rem; font-weight: 700; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.06em; margin-top: 0.2rem; }
        .hp-card-bar-wrap { display: flex; flex-direction: column; gap: 0.5rem; }
        .hp-cbl { font-size: 0.7rem; font-weight: 700; color: rgba(255,255,255,0.45); }
        .hp-cbp { font-size: 0.7rem; font-weight: 700; color: #00E5A0; text-align: right; }
        .hp-bar-track { height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden; }
        .hp-bar-fill { height: 100%; background: linear-gradient(90deg,#6C63FF,#00E5A0); border-radius: 3px; }

        /* ── STATS ── */
        .hp-stats { background: white; border-top: 1px solid rgba(108,99,255,0.08); border-bottom: 1px solid rgba(108,99,255,0.08); padding: 2.5rem 2rem; display: flex; justify-content: center; align-items: center; gap: 0; flex-wrap: wrap; }
        .hp-stat-item { display: flex; flex-direction: column; align-items: center; padding: 0.75rem 3rem; }
        .hp-stat-val { font-size: clamp(1.8rem,3vw,2.5rem); font-weight: 900; color: #0B1437; letter-spacing: -0.02em; }
        .hp-stat-lbl { font-size: 0.78rem; font-weight: 700; color: #6B7280; text-transform: uppercase; letter-spacing: 0.06em; margin-top: 0.25rem; }
        .hp-stat-div { width: 1px; height: 50px; background: rgba(108,99,255,0.15); }

        /* ── SECTIONS ── */
        .hp-section { padding: 6rem 2rem; }
        .hp-section-white { background: white; }
        .hp-section-inner { max-width: 1100px; margin: 0 auto; }
        .hp-section-tag { font-size: 0.78rem; font-weight: 900; color: #6C63FF; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1rem; }
        .hp-section-h2 { font-size: clamp(1.8rem,3.5vw,2.6rem); font-weight: 900; color: #0B1437; margin-bottom: 1rem; letter-spacing: -0.02em; line-height: 1.2; }
        .hp-section-sub { color: #6B7280; font-size: 1rem; font-weight: 500; max-width: 560px; line-height: 1.7; margin-bottom: 3rem; }
        .hp-center { text-align: center; }
        .hp-section-sub.hp-center { margin: 0 auto 2.5rem; }

        /* audience pills */
        .hp-audience-pill { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.45rem 1.3rem; border-radius: 2rem; font-size: 0.78rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1.2rem; }
        .hp-pill-student { background: rgba(108,99,255,0.1); border: 1px solid rgba(108,99,255,0.3); color: #6C63FF; }
        .hp-pill-parent  { background: rgba(255,68,102,0.1); border: 1px solid rgba(255,68,102,0.28); color: #FF6680; }

        /* student section bg */
        .hp-section-students { background: linear-gradient(180deg,#F0EFFF 0%,#F8F9FC 100%); border-top: 1px solid rgba(108,99,255,0.1); }

        /* parent section bg */
        .hp-section-parents { background: linear-gradient(180deg,rgba(255,68,102,0.04) 0%,#F8F9FC 100%); border-top: 2px solid rgba(255,68,102,0.12); padding-top: 7rem; }
        .hp-h2-danger { color: #CC2244; }
        .hp-h2-danger em { font-style: italic; }

        /* shock bar */
        .hp-shock-bar { display: grid; grid-template-columns: repeat(4,1fr); gap: 0; border: 1px solid rgba(255,68,102,0.15); border-radius: 1.5rem; overflow: hidden; margin-bottom: 3rem; }
        .hp-shock-tile { padding: 1.75rem 1.5rem; border-right: 1px solid rgba(255,68,102,0.1); background: rgba(255,68,102,0.03); }
        .hp-shock-tile:last-child { border-right: none; }
        .hp-shock-num { font-size: 2.4rem; font-weight: 900; line-height: 1; margin-bottom: 0.4rem; background: linear-gradient(135deg,#F4A535,#FF6B35); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hp-shock-label { font-size: 0.88rem; font-weight: 700; color: #0B1437; line-height: 1.4; margin-bottom: 0.3rem; }
        .hp-shock-note { font-size: 0.7rem; color: #6B7280; font-weight: 600; }

        /* ── JOURNEY ── */
        .hp-journey-wrap { position: relative; max-width: 840px; margin: 0 auto; padding: 1rem 0 2rem; }
        .hp-journey-line { position: absolute; left: 50%; top: 0; bottom: 0; width: 3px; background: linear-gradient(to bottom,#6C63FF,#FFD700); transform: translateX(-50%); border-radius: 2px; }
        .hp-jstop { display: flex; align-items: center; position: relative; min-height: 130px; }
        .hp-jl { justify-content: flex-start; }
        .hp-jr { justify-content: flex-end; }
        .hp-jdot { position: absolute; left: 50%; transform: translateX(-50%); width: 18px; height: 18px; border-radius: 50%; border: 3px solid #F0EFFF; z-index: 3; }
        .hp-jcard { width: 43%; background: white; border: 1.5px solid rgba(108,99,255,0.1); border-radius: 1.25rem; padding: 1.25rem 1.5rem; transition: all 0.3s; z-index: 2; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
        .hp-jl .hp-jcard { transform: perspective(700px) rotateY(4deg); }
        .hp-jr .hp-jcard { transform: perspective(700px) rotateY(-4deg); }
        .hp-jcard:hover { border-color: var(--jc,#6C63FF); box-shadow: 0 16px 48px rgba(108,99,255,0.12); transform: perspective(700px) rotateY(0) translateY(-5px) !important; }
        .hp-jhline { position: absolute; top: 50%; height: 2px; width: 7%; opacity: 0.3; }
        .hp-jhl-l { left: 43%; }
        .hp-jhl-r { right: 43%; }
        .hp-jlvl { font-size: 0.62rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.3rem; }
        .hp-jemoji { font-size: 1.8rem; line-height: 1; margin-bottom: 0.3rem; }
        .hp-jname { font-size: 1.05rem; font-weight: 900; color: #0B1437; margin-bottom: 0.2rem; }
        .hp-jmod { font-size: 0.8rem; font-weight: 700; color: #6C63FF; margin-bottom: 0.2rem; }
        .hp-jgrade { font-size: 0.7rem; color: #6B7280; font-weight: 600; }
        .hp-jbadge { margin-top: 0.6rem; display: inline-block; font-size: 0.65rem; font-weight: 900; color: white; padding: 0.2rem 0.6rem; border-radius: 2rem; }

        /* ── FEATURES ── */
        .hp-features-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
        .hp-feat-card { background: #F8F9FC; border: 1px solid rgba(108,99,255,0.1); border-radius: 1.25rem; padding: 2rem; transition: all 0.25s; }
        .hp-feat-card:hover { transform: translateY(-4px); box-shadow: 0 20px 50px rgba(108,99,255,0.1); border-color: rgba(108,99,255,0.25); }
        .hp-feat-icon { font-size: 2.2rem; margin-bottom: 1rem; display: block; }
        .hp-feat-title { font-size: 1rem; font-weight: 800; color: #0B1437; margin-bottom: 0.5rem; }
        .hp-feat-desc { font-size: 0.88rem; color: #6B7280; line-height: 1.65; font-weight: 500; }

        /* ── HOW IT WORKS — student ── */
        .hp-hiw { text-align: center; }
        .hp-steps { display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap; margin-bottom: 0; }
        .hp-step { max-width: 280px; padding: 2rem; background: white; border: 1px solid rgba(108,99,255,0.1); border-radius: 1.25rem; text-align: left; }
        .hp-step-num { font-size: 2.5rem; font-weight: 900; color: rgba(108,99,255,0.12); font-family: 'Space Mono',monospace; margin-bottom: 1rem; }
        .hp-step-title { font-size: 1rem; font-weight: 800; color: #0B1437; margin-bottom: 0.5rem; }
        .hp-step-desc { font-size: 0.88rem; color: #6B7280; line-height: 1.65; }
        .hp-cta-inline { text-align: center; margin-top: 2.5rem; }
        .hp-cta-inline-note { margin-top: 0.75rem; font-size: 0.8rem; color: #6B7280; font-weight: 600; }

        /* ── FEAR CARDS ── */
        .hp-fear-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
        .hp-fear-card { background: white; border: 1px solid rgba(255,68,102,0.12); border-radius: 1.75rem; padding: 2rem; display: flex; flex-direction: column; gap: 0.8rem; transition: all 0.25s; }
        .hp-fear-card:hover { transform: translateY(-4px); box-shadow: 0 20px 50px rgba(255,68,102,0.1); border-color: rgba(255,68,102,0.28); }
        .hp-fear-top { display: flex; justify-content: space-between; align-items: flex-start; }
        .hp-fear-icon { font-size: 2rem; }
        .hp-fear-stat { font-size: 0.7rem; font-weight: 900; padding: 0.25rem 0.7rem; border-radius: 2rem; background: rgba(255,68,102,0.12); color: #FF6680; border: 1px solid rgba(255,68,102,0.25); white-space: nowrap; }
        .hp-fear-heading { font-size: 1rem; font-weight: 800; color: #0B1437; line-height: 1.35; }
        .hp-fear-body { font-size: 0.87rem; color: #6B7280; line-height: 1.7; font-weight: 500; }

        /* ── COMPARISON ── */
        .hp-compare-wrap { padding: 3rem; border-radius: 2rem; }
        .hp-compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
        .hp-compare-col { display: flex; flex-direction: column; }
        .hp-compare-header { font-size: 0.85rem; font-weight: 900; padding: 0.7rem 1rem; border-radius: 0.75rem 0.75rem 0 0; }
        .hp-compare-row { padding: 0.72rem 1rem; font-size: 0.84rem; font-weight: 500; color: #6B7280; border-bottom: 1px solid rgba(108,99,255,0.07); }
        .hp-compare-good { color: #0B1437; }

        /* ── HOW IT WORKS — parent ── */
        .hp-how-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1.5rem; }
        .hp-how-card { padding: 2rem; border-radius: 1.75rem; }
        .hp-how-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .hp-how-step { font-size: 0.65rem; font-weight: 900; color: var(--primary-glow,#6C63FF); letter-spacing: 0.15em; font-family: 'Space Mono',monospace; }
        .hp-how-title { font-size: 0.98rem; font-weight: 800; color: var(--foreground,#0B1437); margin-bottom: 0.8rem; }
        .hp-how-body { font-size: 0.85rem; color: var(--muted,#6B7280); line-height: 1.7; font-weight: 500; }

        /* ── TESTIMONIALS ── */
        .hp-testi-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
        .hp-testi-card { padding: 2rem; border-radius: 1.75rem; display: flex; flex-direction: column; gap: 1rem; }
        .hp-testi-quote { font-size: 0.95rem; color: var(--foreground,#0B1437); font-weight: 500; line-height: 1.7; flex: 1; font-style: italic; }
        .hp-testi-author { display: flex; align-items: center; gap: 0.75rem; }
        .hp-testi-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg,#6C63FF,#00E5A0); display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1rem; color: white; flex-shrink: 0; }

        /* ── SCHOLARSHIP ── */
        .hp-scholar-box { padding: 2.5rem; border-radius: 2rem; display: flex; justify-content: space-between; align-items: center; gap: 2rem; flex-wrap: wrap; border-color: rgba(0,229,160,0.2) !important; }
        .hp-scholar-left { flex: 1; min-width: 280px; }
        .hp-scholar-h { font-size: 1.4rem; font-weight: 900; color: var(--foreground,#0B1437); margin: 0.5rem 0; }
        .hp-scholar-p { color: var(--muted,#6B7280); font-size: 0.9rem; line-height: 1.7; }
        .hp-scholar-p strong { color: #00E5A0; }
        .hp-scholar-btn { white-space: nowrap; }

        /* ── FAQ ── */
        .hp-faq-inner { max-width: 860px; }
        .hp-faq-list { display: flex; flex-direction: column; gap: 1rem; margin-top: 0.5rem; }
        .hp-faq-item { padding: 1.4rem 1.8rem; border-radius: 1.25rem; cursor: pointer; transition: all 0.25s; }
        .hp-faq-item:hover { border-color: rgba(108,99,255,0.4) !important; }
        .hp-faq-item.hp-faq-open { border-color: rgba(108,99,255,0.5) !important; background: rgba(108,99,255,0.05) !important; }
        .hp-faq-q { display: flex; justify-content: space-between; align-items: center; font-weight: 700; font-size: 0.97rem; color: #0B1437; gap: 1rem; }
        .hp-faq-arrow { color: #6C63FF; font-size: 1.1rem; flex-shrink: 0; }
        .hp-faq-a { margin-top: 1rem; font-size: 0.9rem; color: #6B7280; line-height: 1.8; font-weight: 500; }

        /* ── FINAL CTA ── */
        .hp-cta { background: #0B1437; padding: 7rem 2rem; text-align: center; position: relative; overflow: hidden; }
        .hp-cta::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at center,rgba(244,165,53,0.1),transparent 70%); }
        .hp-cta-glow { position: absolute; inset: 0; background: radial-gradient(ellipse at center,rgba(108,99,255,0.12),transparent 70%); }
        .hp-cta-tag { position: relative; z-index: 1; font-size: 0.75rem; font-weight: 900; color: #F4A535; text-transform: uppercase; letter-spacing: 0.12em; background: rgba(244,165,53,0.12); border: 1px solid rgba(244,165,53,0.3); padding: 0.35rem 1rem; border-radius: 2rem; display: inline-block; margin-bottom: 1.5rem; }
        .hp-cta-h { position: relative; z-index: 1; font-size: clamp(1.8rem,3.5vw,2.8rem); font-weight: 900; color: white; letter-spacing: -0.02em; line-height: 1.25; margin-bottom: 2rem; }
        .hp-cta-grad { background: linear-gradient(135deg,#F4A535,#FF6B35); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hp-btn-xl { font-size: 1.1rem !important; padding: 1.1rem 3rem !important; position: relative; z-index: 1; }
        .hp-cta-note { position: relative; z-index: 1; margin-top: 1.5rem; font-size: 0.8rem; color: rgba(255,255,255,0.3); font-weight: 600; }

        /* ── RESPONSIVE ── */
        @media(max-width:1100px) {
          .hp-features-grid { grid-template-columns: 1fr 1fr; }
          .hp-how-grid { grid-template-columns: 1fr 1fr; }
          .hp-fear-grid { grid-template-columns: 1fr 1fr; }
          .hp-shock-bar { grid-template-columns: 1fr 1fr; }
        }
        @media(max-width:768px) {
          .hp-nav-links { display: none; }
          .hp-btn-nav-mobile { display: flex; }
          .hp-hero { padding: 5rem 1.5rem 3rem; min-height: auto; gap: 2rem; }
          .hp-hero-card { width: 100%; max-width: 380px; }
          .hp-stat-item { padding: 0.75rem 1.5rem; }
          .hp-stat-div { display: none; }
          .hp-features-grid,.hp-how-grid,.hp-fear-grid,.hp-testi-grid,.hp-compare-grid { grid-template-columns: 1fr; }
          .hp-shock-bar { grid-template-columns: 1fr 1fr; border-radius: 1rem; }
          .hp-shock-tile { border-right: none; border-bottom: 1px solid rgba(255,68,102,0.1); }
          .hp-journey-line { display: none; }
          .hp-jstop { justify-content: center !important; min-height: auto; margin-bottom: 1rem; }
          .hp-jdot { display: none; }
          .hp-jcard { width: 90%; transform: none !important; }
          .hp-jhline { display: none; }
          .hp-steps { flex-direction: column; align-items: center; }
          .hp-scholar-box { flex-direction: column; }
          .hp-compare-wrap { padding: 1.5rem; }
          .hp-compare-grid { gap: 1.5rem; }
        }
      `}</style>
    </div>
  );
}
