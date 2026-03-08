"use client";
import Link from "next/link";
import { useProfile } from "@/hooks/useProfile";

const wings = [
  {
    id: "theory",
    icon: "📹",
    title: "Video Classes",
    desc: "100+ Hours of financial concepts",
    badge: "Next: Magic of Compounding",
    badgeType: "",
    href: "/classes",
    btnLabel: "Enter Wing →",
    glow: "rgba(108,99,255,0.25)",
    borderCol: "rgba(108,99,255,0.4)",
    gradient: "linear-gradient(135deg,rgba(108,99,255,0.15),rgba(108,99,255,0.03))"
  },
  {
    id: "lab",
    icon: "🧪",
    title: "Activity Lab",
    desc: "Complete Home Activities to earn XP and real-world skills.",
    badge: "🔴 1 Pending: Price-Point Hunt",
    badgeType: "urgent",
    href: "/lab",
    btnLabel: "Go to Lab →",
    glow: "rgba(0,229,160,0.25)",
    borderCol: "rgba(0,229,160,0.4)",
    gradient: "linear-gradient(135deg,rgba(0,229,160,0.12),rgba(0,229,160,0.02))"
  },
  {
    id: "market",
    icon: "📈",
    title: "Market Simulator",
    desc: "Practice trading with real NSE/BSE data in a risk-free environment.",
    badge: "🔒 Unlocks at Level 15",
    badgeType: "locked",
    href: "#",
    btnLabel: "Locked",
    locked: true,
    glow: "rgba(108,99,255,0.1)",
    borderCol: "rgba(108,99,255,0.15)",
    gradient: "linear-gradient(135deg,rgba(14,22,56,0.5),rgba(14,22,56,0.2))"
  },
  {
    id: "gps",
    icon: "🧭",
    title: "Freedom Roadmap",
    desc: "Your life GPS. Build skills and assets, not just degrees.",
    badge: "New: Level 18 Milestones",
    badgeType: "",
    href: "/gps",
    btnLabel: "View My GPS →",
    glow: "rgba(255,107,53,0.2)",
    borderCol: "rgba(255,107,53,0.35)",
    gradient: "linear-gradient(135deg,rgba(255,107,53,0.10),rgba(255,107,53,0.02))"
  },
  {
    id: "leaderboard",
    icon: "🏆",
    title: "City Leaderboard",
    desc: "See how you rank against students in your city and school.",
    badge: "🏙️ Bengaluru Rankings Updated",
    badgeType: "",
    href: "/leaderboard",
    btnLabel: "View Rankings →",
    glow: "rgba(255,209,102,0.2)",
    borderCol: "rgba(255,209,102,0.3)",
    gradient: "linear-gradient(135deg,rgba(255,209,102,0.10),rgba(255,209,102,0.02))"
  },
  {
    id: "parent",
    icon: "👪",
    title: "For Parents",
    desc: "Why financial literacy is the subject no school teaches — and why it matters.",
    badge: "See the full story →",
    badgeType: "parent",
    href: "/parent",
    btnLabel: "Parent Portal →",
    glow: "rgba(0,229,160,0.15)",
    borderCol: "rgba(0,229,160,0.3)",
    gradient: "linear-gradient(135deg,rgba(0,229,160,0.08),rgba(0,229,160,0.01))"
  }
];

export default function CampusDashboard() {
  const { profile } = useProfile();
  const isSubscriber = profile?.isSubscriber ?? false;

  // For Free Explorers, force-lock the premium wings
  const dashboardWings = wings.map(w => {
    // Only For Parents and Leaderboard are always unlocked
    if (!isSubscriber && w.id !== 'parent' && w.id !== 'leaderboard') {
      return { 
        ...w, 
        locked: true, 
        href: "/onboarding", 
        btnLabel: "Subscribe to Unlock 🔒",
        badge: "⭐ Subscriber Only",
        badgeType: "locked"
      };
    }
    return w;
  });

  return (
    <div className="campus-wrap">
      {/* ── HERO ── */}
      <div className="campus-hero">
        <div>
          <p className="campus-eyebrow">
            {new Date().getHours() < 12 ? 'Good Morning' : new Date().getHours() < 18 ? 'Good Afternoon' : 'Good Evening'}, {profile?.name?.split(' ')[0] || 'Student'} 👋
          </p>
          <h1 className="gradient-text campus-h1">MoneyMind Campus</h1>
          <p className="campus-subtitle">Class {profile?.grade || '8'} · Module 1 · Financial Intelligence Academy</p>
        </div>
        <div className="campus-kpis">
          <div className="kpi-pill premium-glass">
            <span className="kpi-icon">🔥</span>
            <div className="kpi-body">
              <span className="kpi-val">0</span>
              <span className="kpi-lbl">Day Streak</span>
            </div>
          </div>
          <div className="kpi-pill premium-glass">
            <span className="kpi-icon">🏆</span>
            <div className="kpi-body">
              <span className="kpi-val">Unranked</span>
              <span className="kpi-lbl">Class Rank</span>
            </div>
          </div>
          <div className="kpi-pill premium-glass">
            <span className="kpi-icon">💎</span>
            <div className="kpi-body">
              <span className="kpi-val">0</span>
              <span className="kpi-lbl">WealthPoints</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── PROGRESS BAR ── */}
      <div className="progress-strip premium-glass">
        <div className="ps-label">
          <span className="ps-title">Annual Syllabus Progress</span>
          <span className="ps-pct gradient-text">0%</span>
        </div>
        <div className="ps-track">
          <div className="ps-fill" style={{ width: "0%" }} />
          <div className="ps-dot" style={{ left: "0%" }} />
        </div>
        <div className="ps-meta">
          <span>Module 1 – Start</span>
          <span className="ps-curr">📍 Module 1 (In Progress)</span>
          <span>Module 2 🔒</span>
        </div>
      </div>

      {/* ── WING GRID ── */}
      <div className="wings-grid">
        {dashboardWings.map(w => (
          <div
            key={w.id}
            className={`wing-card ${w.locked ? "locked" : ""}`}
            style={{
              background: w.gradient,
              borderColor: w.locked ? "rgba(108,99,255,0.1)" : w.borderCol,
              boxShadow: `0 4px 40px ${w.glow}`,
            }}
          >
            <div className="wc-top">
              <div className="wc-icon">{w.icon}</div>
              <div className={`wc-badge ${w.badgeType}`}>{w.badge}</div>
            </div>
            <div className="wc-body">
              <h2 className="wc-title">{w.title}</h2>
              <p className="wc-desc">{w.desc}</p>
            </div>
            {!w.locked
              ? <Link href={w.href} className="btn-primary wc-btn">{w.btnLabel}</Link>
              : (
                w.href === '/onboarding' 
                ? <Link href={w.href} className="btn-outline wc-btn" style={{ background: 'rgba(255,209,102,0.1)', color: '#FFD166', borderColor: 'rgba(255,209,102,0.3)' }}>{w.btnLabel}</Link>
                : <button className="btn-outline wc-btn" disabled style={{ opacity: 0.4, cursor: "not-allowed" }}>{w.btnLabel}</button>
              )
            }
          </div>
        ))}
      </div>

      {/* ── BOTTOM FOOTER ── */}
      <div className="campus-footer">
        <div className="goal-card premium-glass">
          <div className="goal-top">
            <span className="goal-label">🎯 Current Goal</span>
            <span className="goal-name">New Bicycle</span>
          </div>
          <div className="goal-bar-wrap">
            <div className="goal-bar-track"><div className="goal-bar-fill" style={{ width: "75%" }} /></div>
            <span className="goal-pct">75% saved</span>
          </div>
          <span className="goal-note">₹875 more to go</span>
        </div>
        <div className="next-lesson premium-glass">
          <span className="nl-tag">📖 Up Next</span>
          <h3 className="nl-title">Inflation — The Invisible Tax</h3>
          <p className="ca-sub">Watch the next guided session from the syllabus.</p>
          <Link href="/classes" className="btn-primary" style={{ fontSize: "0.85rem", padding: "0.6rem 1.4rem" }}>Start Lesson →</Link>
        </div>
        <div className="leaderboard-preview premium-glass">
          <span className="nl-tag">🏆 Top Students — Your City</span>
          {[
            { rank: 1, name: "Priya S.", school: "DPS, Bhopal", pts: 18340 },
            { rank: 2, name: "Rohit K.", school: "KV, Bhopal", pts: 15200 },
            { rank: 3, name: "Sneha M.", school: "Amity, Bhopal", pts: 14700 },
            { rank: 4, name: "You ✨", school: "Your School", pts: 12450, isMe: true },
          ].map(s => (
            <div key={s.rank} className={`lb-row ${s.isMe ? "lb-me" : ""}`}>
              <span className="lb-rank">{s.rank}</span>
              <div className="lb-info">
                <span className="lb-name">{s.name}</span>
                <span className="lb-school">{s.school}</span>
              </div>
              <span className="lb-pts">{s.pts.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .campus-wrap { display: flex; flex-direction: column; gap: 2rem; padding-bottom: 2rem; }

        .campus-hero { display: flex; justify-content: space-between; align-items: flex-start; gap: 2rem; flex-wrap: wrap; }
        .campus-eyebrow { font-size: 0.85rem; font-weight: 700; color: var(--muted); margin-bottom: 0.4rem; }
        .campus-h1 { font-size: clamp(2rem, 4vw, 3rem); margin-bottom: 0.4rem; }
        .campus-subtitle { font-size: 0.9rem; font-weight: 600; color: var(--muted); }

        .campus-kpis { display: flex; gap: 0.75rem; flex-wrap: wrap; }
        .kpi-pill { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1.25rem; border-radius: 1.25rem; }
        .kpi-icon { font-size: 1.5rem; }
        .kpi-body { display: flex; flex-direction: column; }
        .kpi-val { font-size: 1.15rem; font-weight: 900; color: var(--foreground); }
        .kpi-lbl { font-size: 0.65rem; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; }

        .progress-strip { padding: 1.5rem 2rem; border-radius: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; }
        .ps-label { display: flex; justify-content: space-between; align-items: baseline; }
        .ps-title { font-size: 0.85rem; font-weight: 700; color: var(--muted); }
        .ps-pct { font-size: 1.5rem; font-weight: 900; }
        .ps-track { height: 8px; background: rgba(108,99,255,0.15); border-radius: 4px; position: relative; }
        .ps-fill { position: absolute; left: 0; top: 0; height: 100%; width: 64%; background: linear-gradient(90deg,var(--primary),var(--neon-green)); border-radius: 4px; box-shadow: 0 0 12px rgba(0,229,160,0.4); }
        .ps-dot { position: absolute; top: 50%; transform: translate(-50%,-50%); width: 14px; height: 14px; background: white; border-radius: 50%; border: 2px solid var(--neon-green); box-shadow: 0 0 10px rgba(0,229,160,0.6); }
        .ps-meta { display: flex; justify-content: space-between; font-size: 0.72rem; font-weight: 600; color: var(--muted); }
        .ps-curr { color: var(--primary-glow); }

        .wings-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
        .wing-card { border-radius: 1.75rem; border: 1px solid; padding: 2rem; display: flex; flex-direction: column; gap: 1.25rem; transition: all 0.3s; position: relative; overflow: hidden; }
        .wing-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg,rgba(255,255,255,0.03),transparent); pointer-events: none; }
        .wing-card:not(.locked):hover { transform: translateY(-6px); }
        .wing-card.locked { filter: grayscale(0.3); }

        .wc-top { display: flex; justify-content: space-between; align-items: flex-start; }
        .wc-icon { font-size: 2.5rem; }
        .wc-badge { font-size: 0.65rem; font-weight: 900; padding: 0.25rem 0.7rem; border-radius: 2rem; background: rgba(108,99,255,0.12); color: var(--primary-glow); border: 1px solid rgba(108,99,255,0.25); max-width: 160px; text-align: right; line-height: 1.4; }
        .wc-badge.urgent { background: rgba(255,68,102,0.12); color: #FF6680; border-color: rgba(255,68,102,0.25); }
        .wc-badge.locked { background: rgba(148,163,184,0.08); color: var(--muted); border-color: rgba(148,163,184,0.15); }
        .wc-badge.parent { background: rgba(0,229,160,0.10); color: var(--neon-green); border-color: rgba(0,229,160,0.25); }
        .wc-body { flex: 1; }
        .wc-title { font-size: 1.2rem; font-weight: 900; color: var(--foreground); margin-bottom: 0.5rem; }
        .wc-desc { font-size: 0.85rem; color: var(--muted); font-weight: 500; line-height: 1.6; }
        .wc-btn { display: block; text-align: center; text-decoration: none; font-size: 0.85rem; padding: 0.65rem 1.25rem; }

        .campus-footer { display: grid; grid-template-columns: 1fr 1.5fr 1.5fr; gap: 1.5rem; }
        .goal-card, .next-lesson, .leaderboard-preview { padding: 1.5rem; border-radius: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; }
        .goal-top { display: flex; flex-direction: column; gap: 0.2rem; }
        .goal-label { font-size: 0.7rem; font-weight: 900; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; }
        .goal-name { font-size: 1.25rem; font-weight: 900; color: var(--foreground); }
        .goal-bar-wrap { display: flex; align-items: center; gap: 0.75rem; }
        .goal-bar-track { flex: 1; height: 8px; background: rgba(108,99,255,0.15); border-radius: 4px; overflow: hidden; }
        .goal-bar-fill { height: 100%; background: linear-gradient(90deg,var(--primary),var(--neon-green)); border-radius: 4px; }
        .goal-pct { font-size: 0.8rem; font-weight: 800; color: var(--neon-green); white-space: nowrap; }
        .goal-note { font-size: 0.78rem; color: var(--muted); font-weight: 600; }

        .nl-tag { font-size: 0.68rem; font-weight: 900; color: var(--primary-glow); text-transform: uppercase; letter-spacing: 0.08em; }
        .nl-title { font-size: 1.05rem; font-weight: 900; color: var(--foreground); line-height: 1.3; }
        .nl-meta { font-size: 0.78rem; color: var(--muted); font-weight: 600; }

        .lb-row { display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 0; border-bottom: 1px solid var(--border); }
        .lb-row:last-child { border-bottom: none; }
        .lb-me { background: rgba(108,99,255,0.08); border-radius: 0.5rem; padding: 0.5rem 0.6rem; margin: 0 -0.6rem; }
        .lb-rank { width: 24px; height: 24px; border-radius: 50%; background: rgba(108,99,255,0.15); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 900; color: var(--primary-glow); flex-shrink: 0; }
        .lb-info { flex: 1; }
        .lb-name { font-size: 0.85rem; font-weight: 700; color: var(--foreground); display: block; }
        .lb-school { font-size: 0.7rem; color: var(--muted); font-weight: 600; }
        .lb-pts { font-size: 0.78rem; font-weight: 800; color: var(--neon-green); }

        @media(max-width: 1200px) { .wings-grid { grid-template-columns: 1fr 1fr; } }
        @media(max-width: 900px) { .wings-grid, .campus-footer { grid-template-columns: 1fr; } .campus-hero { flex-direction: column; } }
      `}</style>
    </div>
  );
}
