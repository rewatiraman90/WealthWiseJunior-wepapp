"use client";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

const LEVELS = [
  { level: 1, name: "Explorer",   emoji: "🔭", grade: "Class 5",  age: "Age 10–11", module: "Money Foundations",   color: "#6C63FF",
    points: ["What money is and where it came from", "India's currency, UPI & digital payments", "The 3-Jar method: Spend, Save, Give", "First earning experiment at home"] },
  { level: 2, name: "Saver",      emoji: "🪙", grade: "Class 6",  age: "Age 11–12", module: "Saving & Budgeting",  color: "#F4A535",
    points: ["Building a personal budget that works", "Compound interest — the 8th wonder", "Fixed Deposits & Recurring Deposits", "Goal-based saving challenges"] },
  { level: 3, name: "Planner",    emoji: "📋", grade: "Class 7",  age: "Age 12–13", module: "Banking Basics",      color: "#00E5A0",
    points: ["How banks work and how they make money", "UPI, NEFT, RTGS decoded", "Inflation: the silent savings thief", "Reading a bank statement"] },
  { level: 4, name: "Strategist", emoji: "🎯", grade: "Class 8",  age: "Age 13–14", module: "Income & Careers",    color: "#FF6B6B",
    points: ["Active vs passive income types", "Stock market basics — it's not gambling", "Mutual funds & index funds explained", "GST & income tax introduction"] },
  { level: 5, name: "Analyst",    emoji: "📊", grade: "Class 9",  age: "Age 14–15", module: "Smart Spending",      color: "#9B93FF",
    points: ["CIBIL credit score — building it from 18", "50/30/20 budgeting rule in practice", "Consumer traps & impulse buying science", "Virtual investment portfolio project"] },
  { level: 6, name: "Investor",   emoji: "📈", grade: "Class 10", age: "Age 15–16", module: "Stock Markets",       color: "#F4A535",
    points: ["NSE, BSE, NIFTY 50 & Sensex explained", "Demat account — how to open and use", "Sectoral funds vs diversified funds", "Portfolio diversification strategy"] },
  { level: 7, name: "Architect",  emoji: "🏗️", grade: "Class 11", age: "Age 16–17", module: "Financial Planning", color: "#00E5A0",
    points: ["FIRE — Financial Independence math", "Health, term & life insurance decoded", "NPS, PPF & retirement planning", "Multiple income stream strategies"] },
  { level: 8, name: "Master",     emoji: "🏆", grade: "Class 12", age: "Age 17–18", module: "Wealth Building",    color: "#FFD700",
    points: ["Reading P&L and Balance Sheets", "Real 5-year personal financial plan", "Estate planning & wealth transfer", "Legacy — investing vs giving back"] },
];

const fears = [
  { icon: "💳", heading: "Your child will graduate and immediately fall into a credit card trap", body: "College students in India are being offered credit cards at 42% annual interest. Without knowledge to refuse or manage them, 67% of first-time earners carry a revolving balance within 2 years of their first job.", stat: "₹2.3L avg debt by age 25" },
  { icon: "📉", heading: "They will give their first savings to an MLM, a Ponzi scheme, or a 'guaranteed' ULIP", body: "Every year in India, ₹45,000 Crore is lost to financial scams — mostly by young professionals who never learned how to identify a fraudulent investment promise.", stat: "₹45,000 Cr lost annually" },
  { icon: "🏠", heading: "They'll buy a home before they can afford it — and stay trapped in EMI slavery for 25 years", body: "The average Indian takes a home loan at 28 with ₹40L of debt and no emergency fund. Social pressure is a stronger signal than financial readiness. Only financial literacy breaks this cycle.", stat: "₹1.1L avg EMI at age 30" },
  { icon: "👴", heading: "At 55, they will realize they have almost nothing saved for retirement", body: "India's pension coverage is under 12% of the workforce. The median Indian private-sector employee retires with less than 18 months of living expenses saved. Because compound interest was never taught as a lifestyle.", stat: "88% of workers have no pension" },
  { icon: "🎓", heading: "They will choose a career based entirely on salary — and hate it for 40 years", body: "Without understanding FIRE, income types, or entrepreneurship pathways, most children default to the highest-paying degree visible to their parents — often without genuine aptitude.", stat: "73% of graduates are 'misemployed'" },
  { icon: "💔", heading: "Their marriage will be strained — because they never discussed money with their partner", body: "A 2023 Oxford Economics study found money disagreements are the #1 cause of marital stress in India. Couples with financial literacy report 3x higher financial satisfaction.", stat: "#1 cause of marital stress in India" },
];

const testimonials = [
  { quote: "My son asked me why we don't invest in index funds after his Level 2 Saver lesson. I didn't know what to say. That conversation made me finally open a Zerodha account.", name: "Priya S.", city: "Pune", grade: "Son, Explorer → Saver" },
  { quote: "She used her Activity Lab money to open her first savings account at age 12. She's now 13 and has ₹3,200 she earned and saved herself.", name: "Ramesh K.", city: "Bengaluru", grade: "Daughter, Level 2 Saver" },
  { quote: "My daughter taught me the 24-hour rule. I was about to buy a ₹12,000 impulse purchase. She said 'wait 24 hours.' I didn't buy it. She's 11.", name: "Sunita M.", city: "Jaipur", grade: "Daughter, Level 1 Explorer" },
];

const questions = [
  { q: "Is this extra pressure on my child?", a: "No. Each module is designed as 20–30 minute weekly sessions with stories and games. It's lighter than one maths chapter but stays in memory for life because it connects to real family situations." },
  { q: "My child is already studying too much.", a: "WealthWise Junior is not academic content — it's life literacy. Activities are designed as home experiments, making learning enjoyable rather than adding school burden." },
  { q: "Won't they learn this when they grow up?", a: "This is the most dangerous assumption in Indian parenting. The habits and money relationship formed between ages 10–16 are the ones studies show persist for life. Prevention is infinitely easier than correction." },
  { q: "What if I don't know much about finance myself?", a: "Every lesson is written in plain language. Parents have told us they learn more from their child's explanations than from any finance article. The Home Activities are designed to spark conversations, not require expertise." },
  { q: "How is the scholarship program relevant to me?", a: "If you know a child from an economically weaker background who would benefit but cannot afford the subscription, they can apply for a full free seat at wealthwisejunior.in.net/apply via a 100-word story or income proof." },
];

export default function ParentLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    setHasProfile(!!localStorage.getItem("wwj_profile"));
  }, []);

  return (
    <div className="pp-root">

      {/* ══ UNIFIED NAV (matches home page) ══ */}
      <nav className="pp-nav">
        <div className="pp-nav-inner">
          <div className="pp-logo">
            <img src="/logo.png" alt="WealthWise Jr." style={{ height: "52px", width: "auto" }} />
            <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
              <span className="pp-logo-w">WealthWise</span>
              <span className="pp-logo-jr">Jr.</span>
            </div>
          </div>
          <div className="pp-nav-links">
            <Link href="/" className="pp-nav-link">For Students</Link>
            <Link href="/contact" className="pp-nav-link">Contact</Link>
            <Link href="/apply" className="pp-nav-link pp-nav-scholar">🎓 Scholarship</Link>
            <Link href={hasProfile ? "/campus" : "/onboarding"} className="pp-btn-nav">
              {hasProfile ? "Campus →" : "Start Free →"}
            </Link>
          </div>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section className="pp-hero">
        <div className="pp-hero-bg">
          <div className="pp-blob pp-b1" />
          <div className="pp-blob pp-b2" />
          <div className="pp-grid" />
        </div>
        <div className="pp-hero-content">
          <div className="pp-hero-badge">🇮🇳 Built for Indian School Children · Classes 5 to 12</div>
          <h1 className="pp-hero-h1">
            Your child will spend<br />
            <span className="pp-gold-grad">40 years managing money.</span><br />
            <span className="pp-hero-sub">School will teach them zero about it.</span>
          </h1>
          <p className="pp-hero-body">
            In India, children spend 12+ years learning algebra, history, and biology.
            Not one hour is spent on how to save, invest, avoid debt, or build wealth.
            <br /><br />
            <strong>WealthWise Junior fills that gap — one lesson, one module, one level at a time.
            Explorer through Master. 8 progressive levels across Class 5 to 12.</strong>
          </p>
          <div className="pp-hero-ctas">
            <Link href="/onboarding" className="pp-btn-primary">Start Your Child&apos;s Journey →</Link>
            <Link href="/classes" className="pp-btn-ghost">See the Curriculum</Link>
          </div>
          <p className="pp-hero-note">Free to start · No credit card required · Parent dashboard included</p>
        </div>
        <div className="pp-hero-visual float">
          <div className="pp-card-stack">
            <div className="pp-hc pp-hc1">
              <div className="pp-hc-emoji">🔭</div>
              <div className="pp-hc-label">Money Foundations</div>
              <div className="pp-hc-lvl">Level 1 · Explorer</div>
            </div>
            <div className="pp-hc pp-hc2">
              <div className="pp-hc-emoji">📈</div>
              <div className="pp-hc-label">Stock Markets</div>
              <div className="pp-hc-lvl">Level 6 · Investor</div>
            </div>
            <div className="pp-hc pp-hc3">
              <div className="pp-hc-emoji">🏆</div>
              <div className="pp-hc-label">Wealth Building</div>
              <div className="pp-hc-lvl">Level 8 · Master</div>
            </div>
            <div className="pp-hc-glow" />
          </div>
        </div>
      </section>

      {/* ══ STATS BAR ══ */}
      <div className="pp-stat-bar">
        {[
          { num: "93%", label: "Indian adults lack basic financial literacy", note: "SEBI survey, 2022" },
          { num: "₹0", label: "of 12 years of schooling covers personal finance", note: "National Curriculum Framework" },
          { num: "15–25", label: "Average age of first bad financial decision", note: "CIBIL report, 2023" },
          { num: "₹47L", label: "Lost by starting investments 10 years late", note: "At 12% return, 30yr horizon" },
        ].map((s, i) => (
          <div key={i} className="pp-stat-tile">
            <div className="pp-stat-num">{s.num}</div>
            <div className="pp-stat-label">{s.label}</div>
            <div className="pp-stat-note">{s.note}</div>
          </div>
        ))}
      </div>

      {/* ══ THE HARD TRUTH ══ */}
      <section className="pp-section pp-fear-section">
        <div className="pp-section-inner">
          <div className="pp-tag pp-tag-danger">The Uncomfortable Truth</div>
          <h2 className="pp-section-h2" style={{ color: "#FF6680" }}>
            Six things that <em>will</em> happen to your child<br />if money is never taught at home or school.
          </h2>
          <p className="pp-section-sub">These are documented outcomes in India&apos;s economy — affecting millions of educated, employed adults who were brilliant in school.</p>
          <div className="pp-fear-grid">
            {fears.map((f, i) => (
              <div key={i} className="pp-fear-card premium-glass card-hover">
                <div className="pp-fear-top">
                  <span className="pp-fear-icon">{f.icon}</span>
                  <span className="pp-fear-stat">{f.stat}</span>
                </div>
                <h3 className="pp-fear-heading">{f.heading}</h3>
                <p className="pp-fear-body">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ JOURNEY PATH ══ */}
      <section className="pp-section pp-journey-section">
        <div className="pp-section-inner">
          <div className="pp-tag" style={{ background: "rgba(108,99,255,0.12)", color: "#9B93FF", border: "1px solid rgba(108,99,255,0.3)" }}>
            Your Child&apos;s 8-Level Journey
          </div>
          <h2 className="pp-section-h2 gradient-text">From Explorer to Master —<br />what your child learns year by year</h2>
          <p className="pp-section-sub">Every child starts at Level 1 Explorer. One module unlocks each month. By Level 8 they&apos;re building a real 5-year wealth plan.</p>

          <div className="pp-journey-wrap">
            <div className="pp-journey-line" />
            {LEVELS.map((lv, i) => (
              <div key={lv.level} className={`pp-jstop ${i % 2 === 0 ? "pp-jl" : "pp-jr"}`}>
                <div className="pp-jdot" style={{ background: lv.color, boxShadow: `0 0 0 4px ${lv.color}30` }} />
                <div className="pp-jcard" style={{ "--jc": lv.color } as any}>
                  <div className="pp-jlvl" style={{ color: lv.color }}>Level {lv.level} · {lv.grade} · {lv.age}</div>
                  <div className="pp-jemoji">{lv.emoji}</div>
                  <div className="pp-jname">{lv.name}</div>
                  <div className="pp-jmod">{lv.module}</div>
                  <ul className="pp-jpoints">
                    {lv.points.map((p, j) => <li key={j}><span style={{ color: lv.color }}>→</span> {p}</li>)}
                  </ul>
                  {lv.level === 1 && <div className="pp-jbadge" style={{ background: lv.color }}>Everyone starts here →</div>}
                  {lv.level === 8 && <div className="pp-jbadge" style={{ background: lv.color, color: "#0B1437" }}>🏆 Financial Master</div>}
                </div>
                <div className={`pp-jhline ${i % 2 === 0 ? "pp-jhl-l" : "pp-jhl-r"}`} style={{ background: lv.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section className="pp-section">
        <div className="pp-section-inner">
          <div className="pp-tag" style={{ background: "rgba(0,229,160,0.1)", color: "var(--neon-green)", border: "1px solid rgba(0,229,160,0.25)" }}>How It Works</div>
          <h2 className="pp-section-h2 gradient-text">Simple for children. Profound for life.</h2>
          <div className="pp-how-grid">
            {[
              { step: "01", icon: "📚", title: "Structured Level-by-Level Curriculum", body: "A month-by-month curriculum from Explorer to Master. Video classes, theory notes, and quizzes seamlessly combined." },
              { step: "02", icon: "👨‍🏫", title: "24/7 AI Mentor 'Sir'", body: "Our voice-enabled AI tutor answers questions anytime. Fully moderated, strictly aligned with each level's syllabus." },
              { step: "03", icon: "📱", title: "Parent Dashboard Alerts", body: "Real-time progress visibility — test scores, completed modules, attendance, and AI moderation warnings." },
              { step: "04", icon: "🔓", title: "Monthly Module Unlocks", body: "New modules unlock automatically each month. Students who complete early get excellence challenges — not idle time." },
            ].map((h, i) => (
              <div key={i} className="pp-how-card premium-glass">
                <div className="pp-how-top">
                  <span className="pp-how-step">{h.step}</span>
                  <span style={{ fontSize: "1.8rem" }}>{h.icon}</span>
                </div>
                <h3 className="pp-how-title">{h.title}</h3>
                <p className="pp-how-body">{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ COMPARISON ══ */}
      <section className="pp-section">
        <div className="pp-section-inner">
          <div className="pp-compare-box premium-glass">
            <h2 className="pp-section-h2" style={{ marginBottom: "2.5rem" }}>
              What <span style={{ color: "#FF4466" }}>school teaches</span> vs. what <span className="neon-text">WealthWise teaches</span>
            </h2>
            <div className="pp-compare-grid">
              <div className="pp-compare-col">
                <div className="pp-compare-header" style={{ color: "#FF4466", background: "rgba(255,68,102,0.08)" }}>❌ Traditional Curriculum</div>
                {["Profit & loss (abstract only — never applied)", "History of trade (zero practical use)", "Consumer awareness (single chapter, forgotten)", "Zero on compound interest", "Zero on investments or mutual funds", "Zero on income tax or GST", "Zero on debt management or credit scores", "Zero on bank accounts, FDs, or insurance", "Zero on stock market or NIFTY", "Zero on retirement or financial planning"].map((l, i) => (
                  <div key={i} className="pp-compare-row">{l}</div>
                ))}
              </div>
              <div className="pp-compare-col">
                <div className="pp-compare-header" style={{ color: "var(--neon-green)", background: "rgba(0,229,160,0.08)" }}>✅ WealthWise Junior</div>
                {["Compound interest with real ₹ examples from Class 6", "Why inflation silently destroys savings", "50/30/20 budget in practice — from Class 7", "NIFTY 50, mutual funds, index investing (Class 8+)", "GST and income tax — how they actually work", "Debt: when it builds vs. destroys wealth", "CIBIL score — building it from age 18", "FIRE planning — retire early mathematics", "Reading a real P&L and Balance Sheet", "A real 5-year personal financial plan at Level 8"].map((l, i) => (
                  <div key={i} className="pp-compare-row pp-compare-good">{l}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="pp-section">
        <div className="pp-section-inner">
          <h2 className="pp-section-h2 gradient-text" style={{ textAlign: "center", marginBottom: "0.5rem" }}>What parents are saying</h2>
          <p className="pp-section-sub" style={{ textAlign: "center", marginBottom: "2.5rem" }}>From families across India who started early</p>
          <div className="pp-testi-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="pp-testi-card premium-glass card-hover">
                <div style={{ color: "#F4A535", fontSize: "0.9rem", letterSpacing: "0.1em", marginBottom: "1rem" }}>★★★★★</div>
                <p className="pp-testi-quote">&ldquo;{t.quote}&rdquo;</p>
                <div className="pp-testi-author">
                  <div className="pp-testi-avatar">{t.name[0]}</div>
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

      {/* ══ SCHOLARSHIP CALLOUT ══ */}
      <section className="pp-section">
        <div className="pp-section-inner">
          <div className="pp-scholar-box premium-glass">
            <div className="pp-scholar-left">
              <div className="pp-tag" style={{ background: "rgba(0,229,160,0.1)", color: "var(--neon-green)", border: "1px solid rgba(0,229,160,0.3)" }}>🎓 Scholarship Program</div>
              <h3 className="pp-scholar-h3">Know a child who can&apos;t afford it?</h3>
              <p className="pp-scholar-body">
                We reserve seats for students from economically weaker backgrounds.
                Any student can apply with a 100-word story or income proof and receive <strong>completely free, full access</strong> to all 8 levels.
              </p>
            </div>
            <Link href="/apply" className="pp-btn-primary pp-scholar-btn">Apply for Free Seat →</Link>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="pp-section pp-faq-section">
        <div className="pp-section-inner">
          <h2 className="pp-section-h2 gradient-text" style={{ textAlign: "center", marginBottom: "0.5rem" }}>Common parent questions</h2>
          <p className="pp-section-sub" style={{ textAlign: "center", marginBottom: "2.5rem", maxWidth: "100%" }}>Answered honestly</p>
          <div className="pp-faq-list">
            {questions.map((item, i) => (
              <div key={i} className={`pp-faq-item premium-glass ${openFaq === i ? "pp-faq-open" : ""}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="pp-faq-q">
                  <span>{item.q}</span>
                  <span className="pp-faq-arrow">{openFaq === i ? "↑" : "↓"}</span>
                </div>
                {openFaq === i && <p className="pp-faq-a">{item.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section className="pp-cta">
        <div className="pp-cta-glow" />
        <h2 className="pp-cta-title">
          The best time to teach a child about money<br />
          <span className="gradient-text">was yesterday.</span>
        </h2>
        <p className="pp-cta-sub">The second best time is right now — before the first salary, the first loan offer, the first &ldquo;guaranteed returns&rdquo; call.</p>
        <Link href="/onboarding" className="btn-neon pulse" style={{ fontSize: "1.1rem", padding: "1.1rem 3rem" }}>
          Start Absolutely Free →
        </Link>
        <p className="pp-cta-note">Level 1 Explorer · Free Module 1 · No credit card required</p>
      </section>

      <Footer />

      <style jsx>{`
        .pp-root { padding-bottom: 0; background: transparent; font-family: 'Plus Jakarta Sans', sans-serif; }

        /* NAV */
        .pp-nav { position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,0.97); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid rgba(108,99,255,0.08); box-shadow: 0 1px 0 rgba(0,0,0,0.04); }
        .pp-nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 2rem; height: 68px; display: flex; justify-content: space-between; align-items: center; }
        .pp-logo { display: flex; align-items: center; gap: 8px; font-weight: 900; font-size: 1.3rem; letter-spacing: -0.03em; text-decoration: none; }
        .pp-logo-w { color: #0B1437; }
        .pp-logo-jr { color: #6C63FF; }
        .pp-nav-links { display: flex; align-items: center; gap: 0.25rem; }
        .pp-nav-link { font-family: 'Plus Jakarta Sans', sans-serif; color: #6B7280; text-decoration: none; font-weight: 600; font-size: 0.875rem; padding: 0.45rem 0.85rem; border-radius: 0.6rem; transition: color 0.18s, background 0.18s; }
        .pp-nav-link:hover { color: #1a1a2e; background: rgba(108,99,255,0.07); }
        .pp-nav-scholar { color: #6C63FF !important; font-weight: 700; }
        .pp-btn-nav { font-family: 'Plus Jakarta Sans', sans-serif; background: linear-gradient(135deg, #0B1437 0%, #1a2b6e 100%); color: white; padding: 0.58rem 1.35rem; border-radius: 2rem; font-size: 0.875rem; font-weight: 800; line-height: 1; text-decoration: none; transition: all 0.2s; box-shadow: 0 2px 10px rgba(11,20,55,0.22); margin-left: 0.75rem; white-space: nowrap; }
        .pp-btn-nav:hover { background: linear-gradient(135deg, #6C63FF 0%, #8b5cf6 100%); transform: translateY(-1px); box-shadow: 0 4px 18px rgba(108,99,255,0.38); }

        /* HERO */
        .pp-hero { position: relative; min-height: 90vh; background: #0B1437; overflow: hidden; display: flex; align-items: center; padding: 6rem 7vw 4rem; gap: 4rem; justify-content: center; flex-wrap: wrap; max-width: 100%; }
        .pp-hero-bg { position: absolute; inset: 0; pointer-events: none; }
        .pp-blob { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.2; }
        .pp-b1 { width: 500px; height: 500px; background: radial-gradient(circle, #6C63FF, transparent); top: -100px; left: -100px; }
        .pp-b2 { width: 400px; height: 400px; background: radial-gradient(circle, #F4A535, transparent); bottom: -80px; right: -60px; }
        .pp-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(108,99,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.05) 1px, transparent 1px); background-size: 60px 60px; }
        .pp-hero-content { position: relative; z-index: 1; max-width: 580px; }
        .pp-hero-badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.45rem 1.2rem; border-radius: 2rem; background: rgba(108,99,255,0.12); border: 1px solid rgba(108,99,255,0.3); font-size: 0.78rem; font-weight: 700; color: #9B93FF; margin-bottom: 1.5rem; }
        .pp-hero-h1 { font-size: clamp(2.2rem, 4vw, 3.8rem); line-height: 1.1; margin-bottom: 1.5rem; color: white; letter-spacing: -0.02em; }
        .pp-gold-grad { background: linear-gradient(135deg, #F4A535, #FF6B35); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .pp-hero-sub { display: block; font-size: 0.65em; color: rgba(255,255,255,0.5); font-weight: 600; margin-top: 0.5rem; }
        .pp-hero-body { font-size: 1rem; color: rgba(255,255,255,0.62); line-height: 1.8; margin-bottom: 2.5rem; }
        .pp-hero-body strong { color: rgba(255,255,255,0.88); }
        .pp-hero-ctas { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.2rem; }
        .pp-hero-note { font-size: 0.8rem; color: rgba(255,255,255,0.35); font-weight: 600; }
        .pp-btn-primary { background: linear-gradient(135deg, #F4A535, #E8961E); color: #0B1437; padding: 0.9rem 2.2rem; border-radius: 2rem; font-weight: 900; font-size: 1rem; text-decoration: none; transition: all 0.25s; font-family: 'Plus Jakarta Sans', sans-serif; display: inline-block; }
        .pp-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 12px 35px rgba(244,165,53,0.4); }
        .pp-btn-ghost { border: 1.5px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.75); padding: 0.9rem 2rem; border-radius: 2rem; font-weight: 700; font-size: 1rem; text-decoration: none; transition: all 0.25s; font-family: 'Plus Jakarta Sans', sans-serif; }
        .pp-btn-ghost:hover { border-color: rgba(255,255,255,0.45); color: white; }

        /* HERO VISUAL */
        .pp-hero-visual { display: flex; justify-content: center; align-items: center; position: relative; z-index: 1; }
        .pp-card-stack { position: relative; width: 300px; height: 360px; }
        .pp-hc { position: absolute; padding: 1.4rem 1.6rem; border-radius: 1.5rem; width: 210px; display: flex; flex-direction: column; gap: 0.4rem; background: rgba(14,22,56,0.9); backdrop-filter: blur(20px); border: 1px solid; }
        .pp-hc1 { top: 0; left: 50px; transform: rotate(-6deg); border-color: rgba(108,99,255,0.4); }
        .pp-hc2 { top: 110px; left: 0; transform: rotate(3deg); border-color: rgba(0,229,160,0.35); z-index: 2; }
        .pp-hc3 { top: 200px; left: 80px; transform: rotate(-3deg); border-color: rgba(244,165,53,0.35); z-index: 1; }
        .pp-hc-emoji { font-size: 1.8rem; }
        .pp-hc-label { font-weight: 800; font-size: 0.95rem; color: white; }
        .pp-hc-lvl { font-size: 0.7rem; font-weight: 700; color: rgba(255,255,255,0.45); }
        .pp-hc-glow { position: absolute; inset: -30%; background: radial-gradient(circle, rgba(108,99,255,0.12), transparent 70%); pointer-events: none; }

        /* STAT BAR */
        .pp-stat-bar { display: grid; grid-template-columns: repeat(4,1fr); gap: 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); background: rgba(14,22,56,0.5); backdrop-filter: blur(12px); }
        .pp-stat-tile { padding: 2rem 2.5rem; border-right: 1px solid var(--border); }
        .pp-stat-tile:last-child { border-right: none; }
        .pp-stat-num { font-size: 2.8rem; font-weight: 900; line-height: 1; margin-bottom: 0.4rem; background: linear-gradient(135deg, #F4A535, #FF6B35); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .pp-stat-label { font-size: 0.9rem; font-weight: 700; color: var(--foreground); line-height: 1.4; margin-bottom: 0.3rem; }
        .pp-stat-note { font-size: 0.7rem; color: var(--muted); font-weight: 600; }

        /* SECTIONS */
        .pp-section { padding: 6rem 0; }
        .pp-section-inner { max-width: 1300px; margin: 0 auto; padding: 0 7vw; }
        .pp-tag { display: inline-block; padding: 0.35rem 1rem; border-radius: 2rem; font-size: 0.72rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 1.2rem; }
        .pp-tag-danger { background: rgba(255,68,102,0.12); color: #FF6680; border: 1px solid rgba(255,68,102,0.25); }
        .pp-section-h2 { font-size: clamp(1.8rem, 3vw, 2.8rem); margin-bottom: 1rem; line-height: 1.2; color: var(--foreground); }
        .pp-section-sub { font-size: 1rem; color: var(--muted); font-weight: 500; max-width: 680px; margin-bottom: 3rem; line-height: 1.7; }

        /* FEAR */
        .pp-fear-section { background: rgba(255,68,102,0.03); border-top: 1px solid rgba(255,68,102,0.08); border-bottom: 1px solid rgba(255,68,102,0.08); }
        .pp-fear-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
        .pp-fear-card { padding: 2rem; border-radius: 1.75rem; display: flex; flex-direction: column; gap: 0.8rem; }
        .pp-fear-top { display: flex; justify-content: space-between; align-items: flex-start; }
        .pp-fear-icon { font-size: 2rem; }
        .pp-fear-stat { font-size: 0.7rem; font-weight: 900; padding: 0.25rem 0.7rem; border-radius: 2rem; background: rgba(255,68,102,0.12); color: #FF6680; border: 1px solid rgba(255,68,102,0.25); white-space: nowrap; }
        .pp-fear-heading { font-size: 1.02rem; font-weight: 800; color: var(--foreground); line-height: 1.35; }
        .pp-fear-body { font-size: 0.87rem; color: var(--muted); line-height: 1.7; font-weight: 500; }

        /* JOURNEY PATH */
        .pp-journey-section { background: rgba(108,99,255,0.03); border-top: 1px solid rgba(108,99,255,0.1); border-bottom: 1px solid rgba(108,99,255,0.1); }
        .pp-journey-wrap { position: relative; max-width: 900px; margin: 0 auto; padding: 1.5rem 0 2rem; }
        .pp-journey-line { position: absolute; left: 50%; top: 0; bottom: 0; width: 3px; background: linear-gradient(to bottom, #6C63FF, #FFD700); transform: translateX(-50%); border-radius: 2px; }
        .pp-jstop { display: flex; align-items: center; position: relative; min-height: 160px; }
        .pp-jstop.pp-jl { justify-content: flex-start; }
        .pp-jstop.pp-jr { justify-content: flex-end; }
        .pp-jdot { position: absolute; left: 50%; transform: translateX(-50%); width: 18px; height: 18px; border-radius: 50%; border: 3px solid var(--background); z-index: 3; flex-shrink: 0; }
        .pp-jcard { width: 44%; background: rgba(14,22,56,0.7); border: 1px solid var(--border); border-radius: 1.25rem; padding: 1.35rem 1.6rem; transition: all 0.3s; z-index: 2; position: relative; }
        .pp-jl .pp-jcard { transform: perspective(700px) rotateY(4deg); }
        .pp-jr .pp-jcard { transform: perspective(700px) rotateY(-4deg); }
        .pp-jcard:hover { border-color: var(--jc, #6C63FF); box-shadow: 0 16px 48px rgba(108,99,255,0.2); transform: perspective(700px) rotateY(0deg) translateY(-5px) !important; }
        .pp-jhline { position: absolute; top: 50%; height: 2px; width: 6%; opacity: 0.4; }
        .pp-jhl-l { left: 44%; }
        .pp-jhl-r { right: 44%; }
        .pp-jlvl { font-size: 0.62rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.35rem; }
        .pp-jemoji { font-size: 1.8rem; line-height: 1; margin-bottom: 0.35rem; }
        .pp-jname { font-size: 1.05rem; font-weight: 900; color: var(--foreground); margin-bottom: 0.2rem; }
        .pp-jmod { font-size: 0.8rem; font-weight: 700; color: rgba(155,147,255,0.9); margin-bottom: 0.6rem; }
        .pp-jpoints { list-style: none; display: flex; flex-direction: column; gap: 0.28rem; }
        .pp-jpoints li { font-size: 0.75rem; color: var(--muted); font-weight: 500; display: flex; gap: 0.4rem; line-height: 1.35; }
        .pp-jbadge { margin-top: 0.75rem; display: inline-block; font-size: 0.65rem; font-weight: 900; color: white; padding: 0.2rem 0.7rem; border-radius: 2rem; }

        /* HOW IT WORKS */
        .pp-how-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1.5rem; }
        .pp-how-card { padding: 2rem; border-radius: 1.75rem; }
        .pp-how-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .pp-how-step { font-size: 0.65rem; font-weight: 900; color: var(--primary-glow); letter-spacing: 0.15em; font-family: 'Space Mono', monospace; }
        .pp-how-title { font-size: 0.98rem; font-weight: 800; color: var(--foreground); margin-bottom: 0.8rem; }
        .pp-how-body { font-size: 0.85rem; color: var(--muted); line-height: 1.7; font-weight: 500; }

        /* COMPARE */
        .pp-compare-box { padding: 3.5rem; border-radius: 2.5rem; }
        .pp-compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
        .pp-compare-col { display: flex; flex-direction: column; gap: 0; }
        .pp-compare-header { font-size: 0.85rem; font-weight: 900; padding: 0.7rem 1rem; border-radius: 0.75rem 0.75rem 0 0; margin-bottom: 0; }
        .pp-compare-row { padding: 0.75rem 1rem; font-size: 0.85rem; font-weight: 500; color: var(--muted); border-bottom: 1px solid var(--border); }
        .pp-compare-good { color: var(--foreground); }

        /* TESTIMONIALS */
        .pp-testi-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
        .pp-testi-card { padding: 2rem; border-radius: 1.75rem; display: flex; flex-direction: column; gap: 1rem; }
        .pp-testi-quote { font-size: 0.95rem; color: var(--foreground); font-weight: 500; line-height: 1.7; flex: 1; font-style: italic; }
        .pp-testi-author { display: flex; align-items: center; gap: 0.75rem; }
        .pp-testi-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #6C63FF, #00E5A0); display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1rem; color: white; flex-shrink: 0; }

        /* SCHOLARSHIP BOX */
        .pp-scholar-box { padding: 2.5rem; border-radius: 2rem; display: flex; justify-content: space-between; align-items: center; gap: 2rem; flex-wrap: wrap; border-color: rgba(0,229,160,0.2) !important; }
        .pp-scholar-left { flex: 1; min-width: 280px; }
        .pp-scholar-h3 { font-size: 1.4rem; font-weight: 900; color: var(--foreground); margin: 0.5rem 0; }
        .pp-scholar-body { color: var(--muted); font-size: 0.9rem; line-height: 1.7; }
        .pp-scholar-body strong { color: var(--neon-green); }
        .pp-scholar-btn { white-space: nowrap; }

        /* FAQ */
        .pp-faq-section { max-width: 900px; margin: 0 auto; }
        .pp-faq-list { display: flex; flex-direction: column; gap: 1rem; }
        .pp-faq-item { padding: 1.4rem 1.8rem; border-radius: 1.25rem; cursor: pointer; transition: all 0.25s; }
        .pp-faq-item:hover { border-color: rgba(108,99,255,0.4) !important; }
        .pp-faq-item.pp-faq-open { border-color: rgba(108,99,255,0.5) !important; background: rgba(108,99,255,0.06) !important; }
        .pp-faq-q { display: flex; justify-content: space-between; align-items: center; font-weight: 700; font-size: 0.97rem; color: var(--foreground); gap: 1rem; }
        .pp-faq-arrow { color: var(--primary-glow); font-size: 1.1rem; flex-shrink: 0; }
        .pp-faq-a { margin-top: 1rem; font-size: 0.9rem; color: var(--muted); line-height: 1.8; font-weight: 500; }

        /* FINAL CTA */
        .pp-cta { position: relative; text-align: center; padding: 8rem 2rem; overflow: hidden; border-top: 1px solid var(--border); }
        .pp-cta-glow { position: absolute; inset: 0; background: radial-gradient(ellipse at center, rgba(108,99,255,0.15) 0%, transparent 70%); pointer-events: none; }
        .pp-cta-title { font-size: clamp(2rem,4vw,3.5rem); line-height: 1.2; margin-bottom: 1.2rem; position: relative; z-index: 1; color: var(--foreground); }
        .pp-cta-sub { font-size: 1.05rem; color: var(--muted); max-width: 600px; margin: 0 auto 2.5rem; line-height: 1.7; position: relative; z-index: 1; font-weight: 500; }
        .pp-cta-note { margin-top: 1.5rem; font-size: 0.8rem; color: var(--muted); font-weight: 600; position: relative; z-index: 1; }

        @media(max-width:1100px) {
          .pp-fear-grid { grid-template-columns: 1fr 1fr; }
          .pp-how-grid { grid-template-columns: 1fr 1fr; }
          .pp-stat-bar { grid-template-columns: 1fr 1fr; }
        }
        @media(max-width:768px) {
          .pp-hero { grid-template-columns: 1fr; padding: 4rem 1.5rem 3rem; min-height: auto; gap: 2rem; }
          .pp-hero-visual { display: none; }
          .pp-fear-grid, .pp-how-grid, .pp-testi-grid, .pp-compare-grid { grid-template-columns: 1fr; }
          .pp-stat-bar { grid-template-columns: 1fr 1fr; }
          .pp-stat-tile { border-right: none; border-bottom: 1px solid var(--border); }
          .pp-journey-line { display: none; }
          .pp-jstop { justify-content: center !important; min-height: auto; margin-bottom: 1rem; }
          .pp-jdot { display: none; }
          .pp-jcard { width: 90%; transform: none !important; }
          .pp-jhline { display: none; }
          .pp-compare-box { padding: 1.5rem; }
          .pp-nav-links .pp-nav-link { display: none; }
          .pp-scholar-box { flex-direction: column; }
        }
      `}</style>
    </div>
  );
}
