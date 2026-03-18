"use client";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

const stats = [
  { num: "93%", label: "Indian adults lack basic financial literacy", note: "SEBI survey, 2022" },
  { num: "₹0", label: "of 12+ years of schooling covers personal finance", note: "National Curriculum Framework" },
  { num: "15–25", label: "Average age when Indians take their first bad financial decision", note: "CIBIL report, 2023" },
  { num: "₹47L", label: "Lost per person by starting investments 10 years late", note: "At 12% return, 30yr horizon" },
];

const fears = [
  {
    icon: "💳",
    heading: "Your child will graduate and immediately fall into a credit card trap",
    body: "College students in India are being offered credit cards at 42% annual interest. Without the knowledge to refuse or manage them, 67% of first-time earners carry a revolving balance within 2 years of their first job.",
    stat: "₹2.3L avg debt by age 25"
  },
  {
    icon: "📉",
    heading: "They will give their first savings to an MLM, a Ponzi scheme, or a 'guaranteed' ULIP",
    body: "Every year in India, ₹45,000 Crore is lost to financial scams — mostly by young professionals who never learned how to identify a fraudulent investment promise. The vocabulary to recognize scams only comes from early education.",
    stat: "₹45,000 Cr lost annually in India"
  },
  {
    icon: "🏠",
    heading: "They'll buy a home before they can afford it — and stay trapped in EMI slavery for 25 years",
    body: "The average Indian takes a home loan at 28 with ₹40L of debt and no emergency fund. Social pressure ('log kya kahenge') is a stronger signal than financial readiness. Only financial literacy breaks this cycle.",
    stat: "₹1.1L avg EMI at age 30"
  },
  {
    icon: "👴",
    heading: "At 55, they will realize they have almost nothing saved for retirement",
    body: "India's pension coverage is under 12% of the workforce. The median Indian private-sector employee retires with less than 18 months of living expenses saved. Why? Because compound interest was never explained as a lifestyle principle.",
    stat: "88% of workers have no pension"
  },
  {
    icon: "🎓",
    heading: "They will choose a career based entirely on salary — and hate it for 40 years",
    body: "Without understanding FIRE, income types (active vs passive), or entrepreneurship pathways, most children default to the highest-paying degree visible to their parents — engineering or medicine — often without genuine aptitude or interest.",
    stat: "73% of Indian graduates are 'misemployed'"
  },
  {
    icon: "💔",
    heading: "Their marriage will be strained — because they never discussed money with their partner",
    body: "A 2023 Oxford Economics study in India found money disagreements are the #1 cause of marital stress. Couples who have financial literacy conversations before marriage report 3x higher financial satisfaction. This literacy starts at age 10.",
    stat: "#1 cause of marital stress in India"
  },
];

const syllabus = [
  { grade: "5–6", age: "Age 10–12", icon: "🌱", title: "Money Foundations", points: ["What money actually is and where it came from", "Why some children always have money and others don't", "The 3-Jar system: Spend, Save, Give", "UPI and digital payment safety", "Their very first earning experiment"] },
  { grade: "7–8", age: "Age 12–14", icon: "📐", title: "The Math of Money", points: ["Compound interest formula — the tool school ignores", "Why inflation makes savings accounts dangerous", "How to build a budget that doesn't feel like prison", "Bank products decoded: FD, RD, savings accounts", "Starting a portfolio before Class 10"] },
  { grade: "9–10", age: "Age 14–16", icon: "📊", title: "Market Intelligence", points: ["How the stock market actually works (not gambling)", "Mutual funds vs. index funds — which wins over 20 years", "GST, Income Tax — how India's tax system works", "How credit scores determine their financial future", "Building a virtual investment portfolio"] },
  { grade: "11–12", age: "Age 16–18", icon: "🚀", title: "Wealth Architecture", points: ["FIRE — Financial Independence, Retire Early mathematics", "Reading a company's P&L and Balance Sheet", "Debt: when it creates wealth vs. destroys it", "Asset allocation across life stages", "Their first real 5-year financial plan"] },
];

const testimonials = [
  { quote: "My son asked me why we don't invest in index funds after his Class 7 lesson. I didn't know what to say. That conversation made me finally open a Zerodha account.", name: "Priya S.", city: "Pune", grade: "Son, Class 7" },
  { quote: "She used her Summer Activity earning experiment money to open her first savings account at age 12. She's now 13 and has ₹3,200 she earned and saved herself.", name: "Ramesh K.", city: "Bengaluru", grade: "Daughter, Class 6" },
  { quote: "My daughter taught me the 24-hour rule. I was about to buy a ₹12,000 appliance impulse purchase. She said 'wait 24 hours.' I didn't buy it. She's 11.", name: "Sunita M.", city: "Jaipur", grade: "Daughter, Class 5" },
];

const questions = [
  { q: "Is this extra pressure on my child?", a: "No. Each module is designed as 20-30 minute monthly sessions with stories and games. It's lighter than one maths chapter but stays in memory for life because it connects to real family situations." },
  { q: "My child is already studying too much.", a: "WealthWise Junior is not academic content — it's life literacy. The June and July modules are specifically designed as summer earning experiments, making learning enjoyable during holidays rather than adding school burden." },
  { q: "Won't they learn this when they grow up?", a: "This is the most dangerous assumption in Indian parenting. The habits, risk tolerance, and money relationship formed between ages 10-16 are the ones studies show persist for life. Adults trying to unlearn bad money habits face an uphill battle. Prevention is infinitely easier than correction." },
  { q: "What if I don't know much about finance myself?", a: "Every lesson is written in plain language. Parents have told us they learn more from their child's explanations than from any finance article. The Home Activities are designed to spark conversations, not require parental expertise." },
];

export default function ParentLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [count, setCount] = useState({ s1: 0, s2: 0, s3: 0, s4: 0 });
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    setHasProfile(!!localStorage.getItem('wwj_profile'));
    const targets = [93, 0, 47, 47];
    const interval = setInterval(() => {
      setCount(prev => ({
        s1: Math.min(prev.s1 + 3, targets[0]),
        s2: prev.s2,
        s3: Math.min(prev.s3 + 2, targets[2]),
        s4: Math.min(prev.s4 + 2, targets[3]),
      }));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="parent-page">
      {/* ══ HEADER ══ */}
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem 2rem', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo.png" alt="WealthWise Jr." style={{ height: '40px', width: 'auto' }} />
        </div>
        <Link href={hasProfile ? "/campus" : "/onboarding"} className="btn-outline" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>
          {hasProfile ? "Go to Campus" : "Student Login"}
        </Link>
      </header>

      {/* ══ HERO ══ */}
      <section className="hero-section">
        <div className="hero-inner">
          <div className="hero-badge">
            <span>🇮🇳 Made for Indian School Children</span>
          </div>
          <h1 className="hero-title">
            Your child will spend<br />
            <span className="gradient-text">40 years managing money.</span><br />
            <span className="hero-sub-title">School will teach them zero about it.</span>
          </h1>
          <p className="hero-body">
            In India, children spend 12+ years learning algebra, history, and biology.
            Not one hour is spent on how to save, invest, avoid debt, or build wealth.
            <br /><br />
            <strong>WealthWise Junior fills that gap — one story, one lesson, one unit test per month.</strong>
            Class 5 to Class 12. Progressively deeper every year.
          </p>
          <div className="hero-ctas">
            <Link href="/onboarding" className="btn-neon">Start Your Child's Journey →</Link>
            <Link href="/classes" className="btn-outline">See the Curriculum</Link>
          </div>
          <p className="hero-note">Free to start · No credit card required · Parent dashboard included</p>
        </div>
        <div className="hero-visual float">
          <div className="hero-card-stack">
            <div className="hcs-card hcs-c1 premium-glass">
              <span className="hcs-emoji">💰</span>
              <span className="hcs-label">Compound Interest</span>
              <span className="hcs-grade">Class 6 · April</span>
            </div>
            <div className="hcs-card hcs-c2 premium-glass">
              <span className="hcs-emoji">📊</span>
              <span className="hcs-label">Stock Market Basics</span>
              <span className="hcs-grade">Class 9 · March</span>
            </div>
            <div className="hcs-card hcs-c3 premium-glass">
              <span className="hcs-emoji">🏆</span>
              <span className="hcs-label">FIRE Planning</span>
              <span className="hcs-grade">Class 12 · April</span>
            </div>
            <div className="hcs-glow" />
          </div>
        </div>
      </section>

      {/* ══ STAT BAR ══ */}
      <div className="stat-bar">
        {stats.map((s, i) => (
          <div key={i} className="stat-tile">
            <div className="stat-num gradient-text-gold">{s.num}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-note">{s.note}</div>
          </div>
        ))}
      </div>

      {/* ══ THE HARD TRUTH ══ */}
      <section className="section fear-section">
        <div className="section-tag danger-badge">The Uncomfortable Truth</div>
        <h2 className="section-title gradient-text-danger">
          Six things that <em>will</em> happen to your child<br />
          if money is never taught at home or school.
        </h2>
        <p className="section-sub">These are not opinions. These are documented outcomes in India's economy — affecting millions of educated, employed adults who were brilliant in school.</p>
        <div className="fear-grid">
          {fears.map((f, i) => (
            <div key={i} className="fear-card premium-glass card-hover">
              <div className="fear-top">
                <span className="fear-icon">{f.icon}</span>
                <span className="fear-stat">{f.stat}</span>
              </div>
              <h3 className="fear-heading">{f.heading}</h3>
              <p className="fear-body">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ WHAT WE TEACH ══ */}
      <section className="section syllabus-section">
        <div className="section-tag" style={{ background: 'rgba(108,99,255,0.12)', color: 'var(--primary-glow)', border: '1px solid rgba(108,99,255,0.3)' }}>The Curriculum</div>
        <h2 className="section-title gradient-text">What your child learns — year by year</h2>
        <p className="section-sub">Complexity grows with each class. Class 5 learns through stories and games. Class 12 builds a real 5-year financial plan.</p>
        <div className="syllabus-grid-wrap">
          {syllabus.map((s, i) => (
            <div key={i} className={`syllabus-card premium-glass card-hover`}>
              <div className="slc-header">
                <span className="slc-icon">{s.icon}</span>
                <div>
                  <div className="slc-grade">Class {s.grade}</div>
                  <div className="slc-age">{s.age}</div>
                </div>
              </div>
              <h3 className="slc-title">{s.title}</h3>
              <ul className="slc-list">
                {s.points.map((p, j) => (
                  <li key={j}><span className="slc-dot">→</span>{p}</li>
                ))}
              </ul>
              <Link href="/classes" className="btn-outline slc-btn">View Lessons →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section className="section how-section">
        <div className="section-tag" style={{ background: 'rgba(0,229,160,0.1)', color: 'var(--neon-green)', border: '1px solid rgba(0,229,160,0.25)' }}>How It Works</div>
        <h2 className="section-title gradient-text">Simple for children. Profound for life.</h2>
        <div className="how-grid">
          {[
            { step: "01", icon: "📚", title: "Unified Learning Library", body: "A structured, month-by-month curriculum. We combine animated video classes, theory notes, and quizzes directly into one seamless Class 5–12 roadmap." },
            { step: "02", icon: "👨‍🏫", title: "24/7 AI Mentor 'Sir'", body: "Our unique voice-enabled AI tutor 'Sir' answers questions anytime. Fully moderated for appropriate language and strictly aligned with the syllabus." },
            { step: "03", icon: "📱", title: "Parent Dashboard Alerts", body: "Access real-time progress on your dashboard. You receive immediate alerts on test scores, completed milestones, and AI moderation warnings if inappropriate language is used." },
            { step: "04", icon: "🔓", title: "Premium Subscriber Access", body: "Get full access to all classes, unit tests, the Activity Lab, and the City Leaderboards with the verified blue-tick Roll Number badge." },
          ].map((h, i) => (
            <div key={i} className="how-card premium-glass">
              <div className="how-top">
                <span className="how-step">{h.step}</span>
                <span className="how-icon">{h.icon}</span>
              </div>
              <h3 className="how-title">{h.title}</h3>
              <p className="how-body">{h.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ COMPARISON ══ */}
      <section className="section compare-section">
        <div className="compare-box premium-glass">
          <h2 className="section-title" style={{ marginBottom: '2.5rem' }}>
            What <span style={{ color: 'var(--danger)' }}>school teaches</span> vs.<br />
            What <span className="neon-text">WealthWise teaches</span>
          </h2>
          <div className="compare-grid">
            <div className="compare-col col-bad">
              <div className="compare-header">❌ Traditional Curriculum</div>
              {["How to calculate profit and loss (abstract only)", "History of trade (never applied)", "Consumer awareness (in a single chapter)", "Zero on compound interest", "Zero on investments", "Zero on taxes", "Zero on debt management", "Zero on bank accounts and FDs", "Zero on stock market", "Zero on financial planning"].map((l, i) => (
                <div key={i} className="compare-row">{l}</div>
              ))}
            </div>
            <div className="compare-col col-good">
              <div className="compare-header" style={{ color: 'var(--neon-green)' }}>✅ WealthWise Junior</div>
              {["Compound interest formula with real examples", "Why inflation steals your savings silently", "Budget building: 50/30/20 rule in practice", "NIFTY 50, mutual funds, and index investing", "GST and income tax — how they actually work", "Debt: when it builds vs. destroys wealth", "CIBIL score: building it from age 18", "FIRE planning — mathematical retirement freedom", "Real P&L and Balance Sheet reading", "A real 5-year personal financial plan at Class 12"].map((l, i) => (
                <div key={i} className="compare-row compare-row-good">{l}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="section">
        <h2 className="section-title gradient-text" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>What parents are saying</h2>
        <p className="section-sub" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>From families across India who started early</p>
        <div className="testimonial-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card premium-glass card-hover">
              <div className="t-stars">★★★★★</div>
              <p className="t-quote">"{t.quote}"</p>
              <div className="t-author">
                <div className="t-avatar">{t.name[0]}</div>
                <div>
                  <div className="t-name">{t.name}</div>
                  <div className="t-detail">{t.city} · {t.grade}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="section faq-section">
        <h2 className="section-title gradient-text" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Common parent questions</h2>
        <p className="section-sub" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>Answered honestly</p>
        <div className="faq-list">
          {questions.map((item, i) => (
            <div key={i} className={`faq-item premium-glass ${openFaq === i ? "faq-open" : ""}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div className="faq-q">
                <span>{item.q}</span>
                <span className="faq-arrow">{openFaq === i ? "↑" : "↓"}</span>
              </div>
              {openFaq === i && <p className="faq-a">{item.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section className="final-cta">
        <div className="final-glow" />
        <h2 className="final-title">
          The best time to teach a child about money<br />
          <span className="gradient-text">was yesterday.</span>
        </h2>
        <p className="final-sub">The second best time is right now — before the first salary, the first loan offer, the first "guaranteed returns" call.</p>
        <Link href="/onboarding" className="btn-neon pulse" style={{ fontSize: '1.1rem', padding: '1.1rem 3rem' }}>
          Start Absolutely Free →
        </Link>
        <p className="final-note">Classes 5 through 12 · All Indian curriculum · Regular monthly lessons + Unit tests</p>
      </section>

      <Footer />

      <style jsx>{`
        .parent-page { padding-bottom: 0; background: transparent; }

        /* HERO */
        .hero-section { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; min-height: 90vh; padding: 5rem 7vw 4rem; max-width: 1400px; margin: 0 auto; }
        .hero-badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1.2rem; border-radius: 2rem; background: rgba(108,99,255,0.12); border: 1px solid rgba(108,99,255,0.3); font-size: 0.8rem; font-weight: 700; color: var(--primary-glow); margin-bottom: 1.5rem; }
        .hero-title { font-size: clamp(2.2rem, 4vw, 3.8rem); line-height: 1.1; margin-bottom: 1.5rem; color: var(--foreground); }
        .hero-sub-title { display: block; font-size: 0.7em; color: var(--muted); font-weight: 600; margin-top: 0.5rem; }
        .hero-body { font-size: 1.05rem; color: var(--muted); line-height: 1.8; margin-bottom: 2.5rem; max-width: 540px; }
        .hero-body strong { color: var(--foreground); }
        .hero-ctas { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; margin-bottom: 1.2rem; }
        .hero-note { font-size: 0.8rem; color: var(--muted); font-weight: 600; }
        .hero-visual { display: flex; justify-content: center; align-items: center; position: relative; }
        .hero-card-stack { position: relative; width: 320px; height: 380px; }
        .hcs-card { position: absolute; display: flex; flex-direction: column; gap: 0.4rem; padding: 1.4rem 1.6rem; border-radius: 1.5rem; width: 220px; }
        .hcs-c1 { top: 0; left: 60px; transform: rotate(-6deg); border-color: rgba(108,99,255,0.4) !important; }
        .hcs-c2 { top: 120px; left: 0; transform: rotate(3deg); border-color: rgba(0,229,160,0.35) !important; z-index: 2; }
        .hcs-c3 { top: 200px; left: 90px; transform: rotate(-3deg); border-color: rgba(255,107,53,0.35) !important; z-index: 1; }
        .hcs-emoji { font-size: 2rem; }
        .hcs-label { font-weight: 800; font-size: 1rem; color: var(--foreground); }
        .hcs-grade { font-size: 0.72rem; font-weight: 700; color: var(--muted); }
        .hcs-glow { position: absolute; inset: -30%; background: radial-gradient(circle, rgba(108,99,255,0.15), transparent 70%); pointer-events: none; }

        /* STAT BAR */
        .stat-bar { display: grid; grid-template-columns: repeat(4,1fr); gap: 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); background: rgba(14,22,56,0.5); backdrop-filter: blur(12px); }
        .stat-tile { padding: 2rem 2.5rem; border-right: 1px solid var(--border); }
        .stat-tile:last-child { border-right: none; }
        .stat-num { font-size: 2.8rem; font-weight: 900; line-height: 1; margin-bottom: 0.4rem; }
        .stat-label { font-size: 0.9rem; font-weight: 700; color: var(--foreground); line-height: 1.4; margin-bottom: 0.3rem; }
        .stat-note { font-size: 0.7rem; color: var(--muted); font-weight: 600; }

        /* SECTIONS */
        .section { padding: 6rem 7vw; max-width: 1400px; margin: 0 auto; }
        .section-tag { display: inline-block; padding: 0.35rem 1rem; border-radius: 2rem; font-size: 0.72rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 1.2rem; }
        .section-title { font-size: clamp(1.8rem, 3vw, 2.8rem); margin-bottom: 1rem; line-height: 1.2; }
        .section-sub { font-size: 1rem; color: var(--muted); font-weight: 500; max-width: 700px; margin-bottom: 3rem; line-height: 1.7; }

        /* FEAR */
        .fear-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
        .fear-card { padding: 2rem; border-radius: 1.75rem; display: flex; flex-direction: column; gap: 0.8rem; }
        .fear-top { display: flex; justify-content: space-between; align-items: flex-start; }
        .fear-icon { font-size: 2rem; }
        .fear-stat { font-size: 0.7rem; font-weight: 900; padding: 0.25rem 0.7rem; border-radius: 2rem; background: rgba(255,68,102,0.12); color: #FF6680; border: 1px solid rgba(255,68,102,0.25); white-space: nowrap; }
        .fear-heading { font-size: 1.05rem; font-weight: 800; color: var(--foreground); line-height: 1.35; }
        .fear-body { font-size: 0.87rem; color: var(--muted); line-height: 1.7; font-weight: 500; }

        /* SYLLABUS */
        .syllabus-grid-wrap { display: grid; grid-template-columns: repeat(4,1fr); gap: 1.5rem; }
        .syllabus-card { padding: 1.8rem; border-radius: 1.75rem; display: flex; flex-direction: column; gap: 0.8rem; }
        .slc-header { display: flex; align-items: center; gap: 1rem; padding-bottom: 0.8rem; border-bottom: 1px solid var(--border); }
        .slc-icon { font-size: 2rem; }
        .slc-grade { font-size: 1.1rem; font-weight: 900; color: var(--foreground); }
        .slc-age { font-size: 0.75rem; color: var(--muted); font-weight: 700; }
        .slc-title { font-size: 1rem; font-weight: 800; color: var(--primary-glow); }
        .slc-list { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; flex: 1; }
        .slc-list li { font-size: 0.82rem; color: var(--muted); font-weight: 500; display: flex; gap: 0.5rem; line-height: 1.4; }
        .slc-dot { color: var(--neon-green); font-weight: 900; flex-shrink: 0; }
        .slc-btn { margin-top: 0.5rem; display: block; text-align: center; font-size: 0.8rem; }

        /* HOW IT WORKS */
        .how-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1.5rem; }
        .how-card { padding: 2rem; border-radius: 1.75rem; }
        .how-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .how-step { font-size: 0.65rem; font-weight: 900; color: var(--primary-glow); letter-spacing: 0.15em; font-family: 'Space Mono', monospace; }
        .how-icon { font-size: 1.8rem; }
        .how-title { font-size: 1rem; font-weight: 800; color: var(--foreground); margin-bottom: 0.8rem; }
        .how-body { font-size: 0.85rem; color: var(--muted); line-height: 1.7; font-weight: 500; }

        /* COMPARE */
        .compare-section { padding: 6rem 7vw; max-width: 1400px; margin: 0 auto; }
        .compare-box { padding: 3.5rem; border-radius: 2.5rem; }
        .compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
        .compare-col { display: flex; flex-direction: column; gap: 0; }
        .compare-header { font-size: 0.85rem; font-weight: 900; padding: 0.7rem 1rem; border-radius: 0.75rem 0.75rem 0 0; background: rgba(255,68,102,0.08); color: #FF4466; margin-bottom: 0; }
        .compare-row { padding: 0.75rem 1rem; font-size: 0.85rem; font-weight: 500; color: var(--muted); border-bottom: 1px solid var(--border); }
        .compare-row-good { color: var(--foreground); }

        /* TESTIMONIALS */
        .testimonial-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
        .testimonial-card { padding: 2rem; border-radius: 1.75rem; }
        .t-stars { color: var(--accent2); font-size: 1rem; margin-bottom: 1rem; letter-spacing: 0.1em; }
        .t-quote { font-size: 0.95rem; color: var(--foreground); font-weight: 500; line-height: 1.7; margin-bottom: 1.5rem; font-style: italic; }
        .t-author { display: flex; align-items: center; gap: 0.75rem; }
        .t-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg,var(--primary),var(--neon-green)); display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1rem; color: white; flex-shrink: 0; }
        .t-name { font-size: 0.9rem; font-weight: 800; color: var(--foreground); }
        .t-detail { font-size: 0.75rem; color: var(--muted); font-weight: 600; }

        /* FAQ */
        .faq-section { max-width: 800px; }
        .faq-list { display: flex; flex-direction: column; gap: 1rem; }
        .faq-item { padding: 1.4rem 1.8rem; border-radius: 1.25rem; cursor: pointer; transition: all 0.25s; }
        .faq-item:hover { border-color: rgba(108,99,255,0.4) !important; }
        .faq-item.faq-open { border-color: rgba(108,99,255,0.5) !important; background: rgba(108,99,255,0.06) !important; }
        .faq-q { display: flex; justify-content: space-between; align-items: center; font-weight: 700; font-size: 0.97rem; color: var(--foreground); }
        .faq-arrow { color: var(--primary-glow); font-size: 1.1rem; flex-shrink: 0; margin-left: 1rem; }
        .faq-a { margin-top: 1rem; font-size: 0.9rem; color: var(--muted); line-height: 1.8; font-weight: 500; }

        /* FINAL CTA */
        .final-cta { position: relative; text-align: center; padding: 8rem 2rem; overflow: hidden; border-top: 1px solid var(--border); }
        .final-glow { position: absolute; inset: 0; background: radial-gradient(ellipse at center, rgba(108,99,255,0.15) 0%, transparent 70%); pointer-events: none; }
        .final-title { font-size: clamp(2rem,4vw,3.5rem); line-height: 1.2; margin-bottom: 1.2rem; position: relative; z-index: 1; }
        .final-sub { font-size: 1.05rem; color: var(--muted); max-width: 600px; margin: 0 auto 2.5rem; line-height: 1.7; position: relative; z-index: 1; font-weight: 500; }
        .final-note { margin-top: 1.5rem; font-size: 0.8rem; color: var(--muted); font-weight: 600; position: relative; z-index: 1; }

        @media(max-width: 1100px) {
          .fear-grid { grid-template-columns: 1fr 1fr; }
          .syllabus-grid-wrap { grid-template-columns: 1fr 1fr; }
          .how-grid { grid-template-columns: 1fr 1fr; }
          .stat-bar { grid-template-columns: 1fr 1fr; }
        }
        @media(max-width: 768px) {
          .hero-section { grid-template-columns: 1fr; padding: 3rem 1.5rem; min-height: auto; }
          .hero-visual { display: none; }
          .fear-grid, .syllabus-grid-wrap, .how-grid, .testimonial-grid, .compare-grid { grid-template-columns: 1fr; }
          .stat-bar { grid-template-columns: 1fr 1fr; }
          .stat-tile { border-right: none; border-bottom: 1px solid var(--border); }
          .section, .compare-section { padding: 4rem 1.5rem; }
          .compare-box { padding: 2rem; }
          .final-cta { padding: 5rem 1.5rem; }
        }
      `}</style>
    </div>
  );
}
