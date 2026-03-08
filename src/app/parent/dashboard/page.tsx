"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { mockLeaderboard } from "@/data/user";
import { useJarContext } from "@/components/JarContext";

// ─── MOCK DATA ───────────────────────────────────────────────────────────────

const CHILD = {
  name: "Aarav Sharma",
  grade: 7,
  school: "Delhi Public School, Bangalore",
  city: "Bangalore",
  avatar: "🧒",
  xp: 2450,
  xpMax: 3000,
  streak: 21,
  rank: 4, // overall
  cityRank: 2,
  cityTotal: 847,
  joinDate: "March 2025",
};

const ATTENDANCE = {
  total: 120,
  attended: 47,
  missed: 73,
  pct: 39,
  monthly: [
    { month: "Mar", pct: 100, attended: 12, total: 12 },
    { month: "Apr", pct: 83, attended: 10, total: 12 },
    { month: "May", pct: 67, attended: 8, total: 12 },
    { month: "Jun", pct: 58, attended: 7, total: 12 },
    { month: "Jul", pct: 25, attended: 3, total: 12 },
    { month: "Aug", pct: 0, attended: 0, total: 12 },
  ],
};

const SYLLABUS = {
  total: 10,
  completed: 4,
  inProgress: 1,
  locked: 5,
  modules: [
    { month: "March", topic: "What is Money?", status: "passed", score: 95 },
    { month: "April", topic: "Saving & The 3-Jar System", status: "passed", score: 88 },
    { month: "May", topic: "Compound Interest", status: "passed", score: 72 },
    { month: "June", topic: "Budgeting: 50/30/20 Rule", status: "passed", score: 84 },
    { month: "July", topic: "Banks & Digital Payments", status: "current", score: null },
    { month: "August", topic: "Investing Basics", status: "locked", score: null },
    { month: "September", topic: "Stock Market Intro", status: "locked", score: null },
    { month: "October", topic: "Mutual Funds & SIP", status: "locked", score: null },
    { month: "November", topic: "Tax & GST", status: "locked", score: null },
    { month: "December", topic: "Annual Portfolio Review", status: "locked", score: null },
  ],
};

const TEST_SCORES = [95, 88, 72, 84];
const AVG_SCORE = Math.round(TEST_SCORES.reduce((a, b) => a + b, 0) / TEST_SCORES.length);

const EARNINGS = {
  total: 1250,
  thisMonth: 350,
  jars: {
    give: 400, // 4 weeks of ₹100
    spend: 800, // 4 weeks of ₹200
    invest: 1200, // 4 weeks of (₹200 + ₹100 parent match)
    weeksLogged: 4
  },
  activities: [
    { month: "Mar", amount: 180, activity: "Lemonade Stand experiment" },
    { month: "Apr", amount: 220, activity: "Pocket money saved & invested" },
    { month: "May", amount: 150, activity: "Summer activity — selling crafts" },
    { month: "Jun", amount: 350, activity: "Small home business — car wash" },
    { month: "Jul", amount: 350, activity: "Tutoring younger students" },
  ],
};

const SPENDING = {
  total: 640,
  breakdown: [
    { category: "Savings (Jar 2)", amount: 380, pct: 59, color: "#00E5A0" },
    { category: "Essentials & School", amount: 140, pct: 22, color: "#6C63FF" },
    { category: "Fun & Entertainment", amount: 80, pct: 13, color: "#FFD166" },
    { category: "Giving/Charity", amount: 40, pct: 6, color: "#FF8C5A" },
  ],
};

const HOME_ACTIVITIES = [
  { date: "Mar 15", title: "Price Comparison Challenge", status: "done", note: "Compared 3 shops for groceries. Saved ₹45." },
  { date: "Apr 3", title: "First Bank Account Tour", status: "done", note: "Visited SBI branch together. Opened a kids account." },
  { date: "May 20", title: "Summer Earning Experiment", status: "done", note: "Ran a lemonade stand for 1 week. Earned ₹180." },
  { date: "Jun 10", title: "Interview a Shopkeeper", status: "done", note: "Spoke to the kirana store owner about profit/loss." },
  { date: "Jul 1", title: "Build a 3-Month Budget", status: "in-progress", note: "Started planning pocket money allocation." },
  { date: "Aug 1", title: "Track 1 Month of Spending", status: "upcoming", note: "" },
];

const AI_WARNINGS: Array<{ date: string; type: "warning" | "info" | "praise"; message: string }> = [
  {
    date: "2026-03-08",
    type: "warning",
    message: "⚠️ Aarav used inappropriate language once while chatting with Sir (AI Teacher). A gentle reminder was given. No further incidents.",
  },
  {
    date: "2026-02-22",
    type: "info",
    message: "📊 Aarav spent 45+ minutes on the Compound Interest topic and scored 72% — below class average of 81%. Consider reviewing this together.",
  },
  {
    date: "2026-02-10",
    type: "praise",
    message: "🌟 Excellent! Aarav completed the Saving module with 88% and attempted all bonus questions. Strong financial literacy habits forming.",
  },
  {
    date: "2026-01-15",
    type: "info",
    message: "📅 Attendance dropped to 58% in May. Aarav missed 5 of 12 scheduled classes. Consistent attendance boosts learning significantly.",
  },
];

const CITY_STUDENTS = [...mockLeaderboard].sort((a, b) => b.xp - a.xp);
const MY_CITY_RANK = CITY_STUDENTS.findIndex(s => s.name === "Arjun Mehta") + 1; // closest mock

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function ParentDashboard() {
  const [tab, setTab] = useState<"overview" | "syllabus" | "money" | "activity" | "alerts">("overview");
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const { weeklyEarning, parentMatch, updateWeeklyEarning, updateParentMatch } = useJarContext();
  const [isEditingJars, setIsEditingJars] = useState(false);
  const [editEarning, setEditEarning] = useState(weeklyEarning);
  const [editMatch, setEditMatch] = useState(parentMatch);

  // Derive dynamic jar values: Give = 20%, Spend = 40%, Invest = 40% + match
  const giveWeekly = Math.round(weeklyEarning * 0.2);
  const spendWeekly = Math.round(weeklyEarning * 0.4);
  const investWeekly = Math.round(weeklyEarning * 0.4);
  
  // Total after 4 weeks (mock value of EARNINGS.jars.weeksLogged = 4)
  const totalGive = giveWeekly * 4;
  const totalSpend = spendWeekly * 4;
  const totalInvest = (investWeekly + parentMatch) * 4;

  const handleSaveJars = () => {
    updateWeeklyEarning(editEarning);
    updateParentMatch(editMatch);
    setIsEditingJars(false);
  };

  const avgScore = AVG_SCORE;
  const completedModules = SYLLABUS.modules.filter(m => m.status === "passed").length;
  const totalModules = SYLLABUS.total;

  return (
    <div className="pd-root">
      {/* ── TOP HEADER ── */}
      <div className="pd-header">
        <div className="pd-child-info">
          <div className="child-avatar">{CHILD.avatar}</div>
          <div>
            <div className="child-name">{CHILD.name}</div>
            <div className="child-meta">Class {CHILD.grade} · {CHILD.school} · {CHILD.city}</div>
            <div className="child-meta" style={{ marginTop: 2, color: "var(--primary-glow)" }}>
              Member since {CHILD.joinDate} · 🔥 {CHILD.streak} Day Streak
            </div>
          </div>
        </div>
        <div className="pd-rank-badges">
          <div className="rank-badge-card premium-glass">
            <div className="rb-num gradient-text">#{CHILD.cityRank}</div>
            <div className="rb-label">in {CHILD.city}</div>
            <div className="rb-sub">out of {CHILD.cityTotal} students</div>
          </div>
          <div className="rank-badge-card premium-glass">
            <div className="rb-num" style={{ color: "var(--neon-green)" }}>#{CHILD.rank}</div>
            <div className="rb-label">Overall Rank</div>
            <div className="rb-sub">National</div>
          </div>
        </div>
      </div>

      {/* ── QUICK STATS ROW ── */}
      <div className="qs-row">
        <div className="qs-card premium-glass">
          <div className="qs-icon">📅</div>
          <div className="qs-val">{ATTENDANCE.pct}%</div>
          <div className="qs-label">Attendance</div>
          <div className="qs-sub">{ATTENDANCE.attended}/{ATTENDANCE.total} classes</div>
          <div className="qs-bar"><div className="qs-fill" style={{ width: `${ATTENDANCE.pct}%`, background: ATTENDANCE.pct >= 75 ? "var(--neon-green)" : "#FF8C5A" }} /></div>
        </div>
        <div className="qs-card premium-glass">
          <div className="qs-icon">📚</div>
          <div className="qs-val">{completedModules}/{totalModules}</div>
          <div className="qs-label">Modules Done</div>
          <div className="qs-sub">{Math.round((completedModules / totalModules) * 100)}% of syllabus</div>
          <div className="qs-bar"><div className="qs-fill" style={{ width: `${(completedModules / totalModules) * 100}%`, background: "var(--primary-glow)" }} /></div>
        </div>
        <div className="qs-card premium-glass">
          <div className="qs-icon">🏆</div>
          <div className="qs-val">{avgScore}%</div>
          <div className="qs-label">Avg Test Score</div>
          <div className="qs-sub">{TEST_SCORES.length} tests taken</div>
          <div className="qs-bar"><div className="qs-fill" style={{ width: `${avgScore}%`, background: avgScore >= 80 ? "var(--neon-green)" : "#FFD166" }} /></div>
        </div>
        <div className="qs-card premium-glass">
          <div className="qs-icon">💰</div>
          <div className="qs-val">₹{EARNINGS.total}</div>
          <div className="qs-label">Total Earned</div>
          <div className="qs-sub">This academic year</div>
        </div>
        <div className="qs-card premium-glass">
          <div className="qs-icon">⚡</div>
          <div className="qs-val">{CHILD.xp.toLocaleString()}</div>
          <div className="qs-label">XP Points</div>
          <div className="qs-sub">{CHILD.xpMax - CHILD.xp} to next level</div>
          <div className="qs-bar"><div className="qs-fill" style={{ width: `${(CHILD.xp / CHILD.xpMax) * 100}%`, background: "linear-gradient(90deg,#6C63FF,#8b5cf6)" }} /></div>
        </div>
      </div>

      {/* ── TABS ── */}
      <div className="pd-tabs">
        {([
          { key: "overview", label: "📊 Overview" },
          { key: "syllabus", label: "📖 Syllabus" },
          { key: "money", label: "💸 Money Journey" },
          { key: "activity", label: "🏠 Activities" },
          { key: "alerts", label: `🔔 Sir's Alerts ${AI_WARNINGS.some(w => w.type === "warning") ? "⚠️" : ""}` },
        ] as const).map(t => (
          <button
            key={t.key}
            className={`pd-tab ${tab === t.key ? "active" : ""}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW TAB ── */}
      {tab === "overview" && (
        <div className="tab-content">
          <div className="two-col">
            {/* Attendance Monthly */}
            <div className="panel premium-glass">
              <h3 className="panel-title">📅 Monthly Attendance</h3>
              <div className="attend-bars">
                {ATTENDANCE.monthly.map(m => (
                  <div key={m.month} className="abar-col">
                    <div className="abar-pct">{m.pct}%</div>
                    <div className="abar-wrap">
                      <div
                        className="abar-fill"
                        style={{
                          height: `${m.pct}%`,
                          background: m.pct >= 75 ? "var(--neon-green)" : m.pct >= 50 ? "#FFD166" : "#FF6680",
                        }}
                      />
                    </div>
                    <div className="abar-month">{m.month}</div>
                    <div className="abar-count">{m.attended}/{m.total}</div>
                  </div>
                ))}
              </div>
              {ATTENDANCE.pct < 75 && (
                <div className="warn-pill">⚠️ Attendance below 75% — affects learning significantly</div>
              )}
            </div>

            {/* City Leaderboard */}
            <div className="panel premium-glass">
              <h3 className="panel-title">🏙️ {CHILD.city} Leaderboard</h3>
              <div className="city-rank-header">
                <span className="city-rank-big gradient-text">#{CHILD.cityRank}</span>
                <span className="city-rank-sub">Your child's rank among {CHILD.cityTotal} students in {CHILD.city}</span>
              </div>
              <div className="lb-list">
                {CITY_STUDENTS.slice(0, 6).map((s, i) => (
                  <div key={i} className={`lb-row ${i === 1 ? "lb-mine" : ""}`}>
                    <span className={`lb-rank ${i === 0 ? "gold" : i === 1 ? "silver" : i === 2 ? "bronze" : ""}`}>#{i + 1}</span>
                    <span className="lb-name">{i === 1 ? `${CHILD.name} 👈` : s.name}</span>
                    <span className="lb-xp">{i === 1 ? CHILD.xp.toLocaleString() : s.xp.toLocaleString()} XP</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Test Scores */}
          <div className="panel premium-glass">
            <h3 className="panel-title">📝 Test Scores by Module</h3>
            <div className="scores-row">
              {SYLLABUS.modules.filter(m => m.status === "passed").map((m, i) => (
                <div key={i} className="score-card">
                  <div
                    className="score-circle"
                    style={{
                      background: `conic-gradient(${m.score! >= 80 ? "var(--neon-green)" : m.score! >= 60 ? "#FFD166" : "#FF6680"} ${m.score!}%, rgba(108,99,255,0.1) 0%)`,
                    }}
                  >
                    <div className="score-inner">{m.score}%</div>
                  </div>
                  <div className="score-topic">{m.topic.slice(0, 20)}{m.topic.length > 20 ? "…" : ""}</div>
                  <div className="score-month">{m.month}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── SYLLABUS TAB ── */}
      {tab === "syllabus" && (
        <div className="tab-content">
          <div className="panel premium-glass">
            <h3 className="panel-title">📚 Full Year Syllabus — Class {CHILD.grade}</h3>
            <div className="syl-progress-header">
              <div className="syl-pct gradient-text">{completedModules}/{totalModules} modules complete</div>
              <div className="syl-bar-wrap"><div className="syl-bar-fill" style={{ width: `${(completedModules / totalModules) * 100}%` }} /></div>
            </div>
            <div className="syl-table">
              <div className="syl-thead">
                <span>Month</span><span>Topic</span><span>Status</span><span>Score</span>
              </div>
              {SYLLABUS.modules.map((m, i) => (
                <div key={i} className={`syl-row ${m.status === "current" ? "syl-current" : m.status === "locked" ? "syl-locked" : ""}`}>
                  <span className="syl-month">{m.month}</span>
                  <span className="syl-topic">{m.topic}</span>
                  <span className={`syl-status syl-${m.status}`}>
                    {m.status === "passed" ? "✅ Passed" : m.status === "current" ? "🔵 In Progress" : "🔒 Locked"}
                  </span>
                  <span className="syl-score">
                    {m.score !== null ? (
                      <span style={{ color: m.score >= 80 ? "var(--neon-green)" : m.score >= 60 ? "#FFD166" : "#FF6680", fontWeight: 900 }}>
                        {m.score}%
                      </span>
                    ) : "—"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── MONEY JOURNEY TAB ── */}
      {tab === "money" && (
        <div className="tab-content">
          <div className="two-col">
            {/* Earnings */}
            <div className="panel premium-glass">
              <h3 className="panel-title">💰 Earnings History</h3>
              <div className="money-total">
                <span className="money-big gradient-text">₹{EARNINGS.total}</span>
                <span className="money-sub">Total earned this year</span>
              </div>
              <div className="earn-list">
                {EARNINGS.activities.map((e, i) => (
                  <div key={i} className="earn-row">
                    <div className="earn-month">{e.month}</div>
                    <div className="earn-info">
                      <div className="earn-activity">{e.activity}</div>
                      <div className="earn-bar-wrap">
                        <div className="earn-bar" style={{ width: `${(e.amount / 400) * 100}%` }} />
                      </div>
                    </div>
                    <div className="earn-amount">₹{e.amount}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* DYNAMIC 3-JAR BALANCE WIDGET */}
            <div className="panel premium-glass" style={{ gridColumn: 'span 2', border: '1px solid var(--neon-green)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h3 className="panel-title" style={{ color: 'var(--neon-green)', margin: 0 }}>🏦 The 3-Jar Wealth System Balances</h3>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span className="jar-weeks-badge">4 Weeks Logged</span>
                  <button 
                    className="btn-outline" 
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', borderColor: 'var(--neon-green)', color: 'var(--neon-green)' }}
                    onClick={() => {
                      setEditEarning(weeklyEarning);
                      setEditMatch(parentMatch);
                      setIsEditingJars(!isEditingJars);
                    }}
                  >
                    {isEditingJars ? "Cancel" : "⚙️ Edit Amounts"}
                  </button>
                </div>
              </div>
              <p className="panel-sub">Tracking Aarav's ₹{weeklyEarning}/week home job earnings + your ₹{parentMatch} Investing Match.</p>
              
              {isEditingJars && (
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '1rem', marginBottom: '1.5rem', border: '1px solid var(--border)' }}>
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--foreground)' }}>Customize Weekly Amounts</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'flex-end' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.5rem', fontWeight: 700 }}>Child's Weekly Earning (₹)</label>
                      <input 
                        type="number" 
                        value={editEarning} 
                        onChange={(e) => setEditEarning(Number(e.target.value))}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.75rem', background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'white' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.5rem', fontWeight: 700 }}>Parent's Investing Match (₹)</label>
                      <input 
                        type="number" 
                        value={editMatch} 
                        onChange={(e) => setEditMatch(Number(e.target.value))}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.75rem', background: 'var(--card-bg)', border: '1px solid var(--neon-green)', color: 'white' }}
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <button className="btn-neon" onClick={handleSaveJars} style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem' }}>Save & Update Jars</button>
                  </div>
                </div>
              )}

              <div className="jar-grid">
                <div className="jar-card">
                  <div className="jar-icon">🤲</div>
                  <div className="jar-name">The Giving Jar</div>
                  <div className="jar-balance">₹{totalGive}</div>
                  <div className="jar-formula">₹{giveWeekly} / week (20%)</div>
                </div>
                <div className="jar-card">
                  <div className="jar-icon">🛍️</div>
                  <div className="jar-name">The Spending Jar</div>
                  <div className="jar-balance">₹{totalSpend}</div>
                  <div className="jar-formula">₹{spendWeekly} / week (40%)</div>
                </div>
                <div className="jar-card jar-invest">
                  <div className="jar-icon">📈</div>
                  <div className="jar-name">The Investing Jar</div>
                  <div className="jar-balance" style={{ color: 'var(--neon-green)' }}>₹{totalInvest}</div>
                  <div className="jar-formula">₹{investWeekly} (40%) + <strong style={{color:'var(--neon-green)'}}>₹{parentMatch} Match</strong></div>
                </div>
              </div>
            </div>

            {/* Spending breakdown */}
            <div className="panel premium-glass">
              <h3 className="panel-title">📊 How Aarav Spends Money</h3>
              <div className="money-total">
                <span className="money-big" style={{ color: "var(--neon-orange)" }}>₹{SPENDING.total}</span>
                <span className="money-sub">Total tracked spending</span>
              </div>
              <div className="spend-chart">
                {/* Simple donut-like visualization */}
                <div className="spend-donut">
                  {SPENDING.breakdown.map((s, i) => (
                    <div key={i} className="spend-segment" style={{ background: s.color, flex: s.pct }} title={s.category} />
                  ))}
                </div>
              </div>
              <div className="spend-legend">
                {SPENDING.breakdown.map((s, i) => (
                  <div key={i} className="spend-row">
                    <span className="spend-dot" style={{ background: s.color }} />
                    <span className="spend-cat">{s.category}</span>
                    <span className="spend-pct">{s.pct}%</span>
                    <span className="spend-amt">₹{s.amount}</span>
                  </div>
                ))}
              </div>
              <div className="good-saver-pill">
                🌟 Aarav saves 59% of earnings — excellent habit!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── ACTIVITIES TAB ── */}
      {tab === "activity" && (
        <div className="tab-content">
          <div className="panel premium-glass">
            <h3 className="panel-title">🏠 Home Activities — Parent & Child Together</h3>
            <p className="panel-sub">These are the real-world activities assigned from the WealthWise curriculum, designed to be done with you.</p>
            <div className="act-list">
              {HOME_ACTIVITIES.map((a, i) => (
                <div key={i} className={`act-row act-${a.status}`}>
                  <div className="act-icon">
                    {a.status === "done" ? "✅" : a.status === "in-progress" ? "🔵" : "⏳"}
                  </div>
                  <div className="act-info">
                    <div className="act-title">{a.title}</div>
                    {a.note && <div className="act-note">{a.note}</div>}
                  </div>
                  <div className="act-meta">
                    <div className="act-date">{a.date}</div>
                    <div className={`act-status-pill act-pill-${a.status}`}>
                      {a.status === "done" ? "Done" : a.status === "in-progress" ? "Active" : "Upcoming"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── ALERTS TAB ── */}
      {tab === "alerts" && (
        <div className="tab-content">
          <div className="panel premium-glass">
            <h3 className="panel-title">🔔 Sir's Alerts & Notifications</h3>
            <p className="panel-sub">Updates from the AI Teacher (Sir) about Aarav's behavior, progress, and areas of concern.</p>
            <div className="alert-list">
              {AI_WARNINGS.map((w, i) => (
                <div key={i} className={`alert-card alert-${w.type}`}>
                  <div className="alert-header">
                    <span className={`alert-badge alert-badge-${w.type}`}>
                      {w.type === "warning" ? "⚠️ Warning" : w.type === "praise" ? "🌟 Praise" : "ℹ️ Info"}
                    </span>
                    <span className="alert-date">{new Date(w.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>
                  <p className="alert-msg">{w.message}</p>
                </div>
              ))}
            </div>
            {AI_WARNINGS.filter(w => w.type === "warning").length === 0 && (
              <div className="no-warn">✅ No behavioral warnings this month. Keep it up!</div>
            )}
          </div>
        </div>
      )}

      {/* STYLES */}
      <style jsx>{`
        .pd-root { display: flex; flex-direction: column; gap: 1.5rem; }

        /* HEADER */
        .pd-header { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
        .pd-child-info { display: flex; align-items: center; gap: 1.1rem; }
        .child-avatar { width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg,var(--primary),#8b5cf6); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; flex-shrink: 0; box-shadow: 0 0 20px rgba(108,99,255,.35); }
        .child-name { font-size: 1.4rem; font-weight: 900; color: var(--foreground); }
        .child-meta { font-size: .78rem; color: var(--muted); font-weight: 600; margin-top: 2px; }
        .pd-rank-badges { display: flex; gap: .85rem; }
        .rank-badge-card { padding: .85rem 1.35rem; border-radius: 1.1rem; display: flex; flex-direction: column; align-items: center; gap: .15rem; min-width: 100px; }
        .rb-num { font-size: 1.8rem; font-weight: 900; line-height: 1; }
        .rb-label { font-size: .72rem; font-weight: 800; color: var(--foreground); }
        .rb-sub { font-size: .6rem; color: var(--muted); font-weight: 600; }

        /* QUICK STATS */
        .qs-row { display: grid; grid-template-columns: repeat(5,1fr); gap: .85rem; }
        .qs-card { padding: 1.1rem 1.2rem; border-radius: 1.1rem; display: flex; flex-direction: column; gap: .2rem; }
        .qs-icon { font-size: 1.2rem; margin-bottom: .2rem; }
        .qs-val { font-size: 1.5rem; font-weight: 900; color: var(--foreground); line-height: 1; }
        .qs-label { font-size: .68rem; font-weight: 900; color: var(--muted); text-transform: uppercase; letter-spacing: .06em; }
        .qs-sub { font-size: .68rem; color: var(--muted); font-weight: 600; }
        .qs-bar { height: 4px; background: rgba(108,99,255,.1); border-radius: 2px; margin-top: .5rem; overflow: hidden; }
        .qs-fill { height: 100%; border-radius: 2px; transition: width .5s; }

        /* TABS */
        .pd-tabs { display: flex; gap: .5rem; flex-wrap: wrap; }
        .pd-tab { padding: .55rem 1.1rem; border-radius: 2rem; border: 1px solid var(--border); background: transparent; color: var(--muted); font-size: .78rem; font-weight: 800; cursor: pointer; font-family: 'Space Grotesk',sans-serif; transition: all .15s; }
        .pd-tab.active { background: var(--primary); color: white; border-color: var(--primary); box-shadow: 0 0 12px rgba(108,99,255,.35); }
        .pd-tab:hover:not(.active) { border-color: rgba(108,99,255,.4); color: var(--foreground); }

        /* CONTENT */
        .tab-content { display: flex; flex-direction: column; gap: 1.25rem; }
        .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        .panel { padding: 1.5rem; border-radius: 1.5rem; }
        .panel-title { font-size: 1rem; font-weight: 900; color: var(--foreground); margin-bottom: .35rem; }
        .panel-sub { font-size: .78rem; color: var(--muted); font-weight: 600; margin-bottom: 1.25rem; }

        /* ATTENDANCE BARS */
        .attend-bars { display: flex; gap: .75rem; align-items: flex-end; height: 150px; margin: 1rem 0; }
        .abar-col { display: flex; flex-direction: column; align-items: center; gap: .25rem; flex: 1; height: 100%; }
        .abar-pct { font-size: .65rem; font-weight: 800; color: var(--muted); }
        .abar-wrap { flex: 1; width: 100%; background: rgba(108,99,255,.08); border-radius: .4rem .4rem 0 0; display: flex; align-items: flex-end; overflow: hidden; }
        .abar-fill { width: 100%; border-radius: .4rem .4rem 0 0; transition: height .5s; }
        .abar-month { font-size: .7rem; font-weight: 900; color: var(--foreground); }
        .abar-count { font-size: .62rem; color: var(--muted); font-weight: 600; }
        .warn-pill { background: rgba(255,140,90,.1); border: 1px solid rgba(255,140,90,.3); padding: .5rem .85rem; border-radius: .75rem; font-size: .75rem; color: var(--neon-orange); font-weight: 700; margin-top: .75rem; }
        .good-saver-pill { background: rgba(0,229,160,.08); border: 1px solid rgba(0,229,160,.25); padding: .5rem .85rem; border-radius: .75rem; font-size: .75rem; color: var(--neon-green); font-weight: 700; margin-top: .85rem; }

        /* CITY LEADERBOARD */
        .city-rank-header { display: flex; align-items: baseline; gap: .75rem; margin: .75rem 0 1rem; }
        .city-rank-big { font-size: 2.5rem; font-weight: 900; line-height: 1; }
        .city-rank-sub { font-size: .78rem; color: var(--muted); font-weight: 600; }
        .lb-list { display: flex; flex-direction: column; gap: .45rem; }
        .lb-row { display: flex; align-items: center; gap: .75rem; padding: .55rem .8rem; border-radius: .75rem; background: rgba(108,99,255,.04); border: 1px solid transparent; }
        .lb-mine { background: rgba(108,99,255,.1); border-color: rgba(108,99,255,.25); }
        .lb-rank { font-size: .78rem; font-weight: 900; width: 28px; text-align: center; color: var(--muted); }
        .lb-rank.gold { color: #FFD700; }
        .lb-rank.silver { color: #C0C0C0; }
        .lb-rank.bronze { color: #CD7F32; }
        .lb-name { flex: 1; font-size: .82rem; font-weight: 700; color: var(--foreground); }
        .lb-xp { font-size: .75rem; font-weight: 900; color: var(--primary-glow); }

        /* TEST SCORES */
        .scores-row { display: flex; gap: 1.5rem; flex-wrap: wrap; margin-top: 1rem; }
        .score-card { display: flex; flex-direction: column; align-items: center; gap: .5rem; }
        .score-circle { width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .score-inner { width: 60px; height: 60px; border-radius: 50%; background: var(--card-bg); display: flex; align-items: center; justify-content: center; font-size: .9rem; font-weight: 900; color: var(--foreground); }
        .score-topic { font-size: .72rem; font-weight: 700; color: var(--foreground); text-align: center; max-width: 80px; }
        .score-month { font-size: .65rem; color: var(--muted); font-weight: 600; }

        /* SYLLABUS */
        .syl-progress-header { display: flex; flex-direction: column; gap: .5rem; margin-bottom: 1.25rem; }
        .syl-pct { font-size: 1.2rem; font-weight: 900; }
        .syl-bar-wrap { height: 6px; background: rgba(108,99,255,.1); border-radius: 3px; overflow: hidden; }
        .syl-bar-fill { height: 100%; background: linear-gradient(90deg,var(--primary),#8b5cf6); border-radius: 3px; transition: width .5s; }
        .syl-table { display: flex; flex-direction: column; gap: .4rem; }
        .syl-thead { display: grid; grid-template-columns: 100px 1fr 130px 70px; gap: .5rem; padding: .4rem .85rem; font-size: .65rem; font-weight: 900; color: var(--muted); text-transform: uppercase; letter-spacing: .07em; }
        .syl-row { display: grid; grid-template-columns: 100px 1fr 130px 70px; gap: .5rem; padding: .65rem .85rem; border-radius: .75rem; background: rgba(108,99,255,.04); border: 1px solid transparent; align-items: center; transition: all .15s; }
        .syl-row:hover { border-color: rgba(108,99,255,.2); }
        .syl-current { background: rgba(108,99,255,.1) !important; border-color: rgba(108,99,255,.3) !important; }
        .syl-locked { opacity: .45; }
        .syl-month { font-size: .78rem; font-weight: 700; color: var(--muted); }
        .syl-topic { font-size: .82rem; font-weight: 700; color: var(--foreground); }
        .syl-status { font-size: .72rem; font-weight: 800; }
        .syl-score { font-size: .82rem; font-weight: 800; }
        .syl-passed { color: var(--neon-green); }
        .syl-current2 { color: var(--primary-glow); }

        /* MONEY */
        .money-total { display: flex; flex-direction: column; gap: .2rem; margin-bottom: 1rem; }
        .money-big { font-size: 2rem; font-weight: 900; line-height: 1; }
        .money-sub { font-size: .72rem; color: var(--muted); font-weight: 600; }
        .earn-list { display: flex; flex-direction: column; gap: .65rem; }
        .earn-row { display: flex; align-items: center; gap: .75rem; }
        .earn-month { font-size: .7rem; font-weight: 900; color: var(--muted); width: 28px; text-align: right; flex-shrink: 0; }
        .earn-info { flex: 1; }
        .earn-activity { font-size: .75rem; font-weight: 700; color: var(--foreground); margin-bottom: .2rem; }
        .earn-bar-wrap { height: 6px; background: rgba(0,229,160,.1); border-radius: 3px; overflow: hidden; }
        .earn-bar { height: 100%; background: var(--neon-green); border-radius: 3px; }
        .earn-amount { font-size: .82rem; font-weight: 900; color: var(--neon-green); width: 44px; text-align: right; flex-shrink: 0; }
        .spend-chart { margin: .85rem 0; }
        .spend-donut { display: flex; height: 20px; border-radius: 1rem; overflow: hidden; gap: 2px; }
        .spend-segment { border-radius: 3px; }
        .spend-legend { display: flex; flex-direction: column; gap: .55rem; }
        .spend-row { display: flex; align-items: center; gap: .6rem; }
        .spend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .spend-cat { flex: 1; font-size: .78rem; font-weight: 700; color: var(--foreground); }
        .spend-pct { font-size: .72rem; font-weight: 900; color: var(--muted); }
        .spend-amt { font-size: .78rem; font-weight: 900; color: var(--foreground); width: 48px; text-align: right; }

        /* JARS */
        .jar-weeks-badge { background: rgba(0,229,160,0.15); color: var(--neon-green); padding: 0.3rem 0.8rem; border-radius: 1rem; font-size: 0.75rem; font-weight: 800; border: 1px solid rgba(0,229,160,0.3); }
        .jar-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1rem; }
        .jar-card { background: rgba(0,0,0,0.2); border: 1px solid var(--border); border-radius: 1.25rem; padding: 1.5rem; display: flex; flex-direction: column; align-items: center; text-align: center; }
        .jar-invest { border-color: rgba(0,229,160,0.4); background: linear-gradient(180deg, rgba(0,229,160,0.05) 0%, rgba(0,0,0,0) 100%); }
        .jar-icon { font-size: 2.5rem; margin-bottom: 0.5rem; }
        .jar-name { font-size: 0.85rem; font-weight: 800; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
        .jar-balance { font-size: 2rem; font-weight: 900; color: var(--foreground); margin-bottom: 0.25rem; }
        .jar-formula { font-size: 0.75rem; color: var(--muted); font-weight: 600; }

        /* ACTIVITIES */
        .act-list { display: flex; flex-direction: column; gap: .75rem; }
        .act-row { display: flex; align-items: flex-start; gap: .85rem; padding: .9rem 1.1rem; border-radius: 1rem; border: 1px solid var(--border); background: rgba(108,99,255,.04); }
        .act-done { border-color: rgba(0,229,160,.2); }
        .act-in-progress { border-color: rgba(108,99,255,.25); background: rgba(108,99,255,.07); }
        .act-upcoming { opacity: .6; }
        .act-icon { font-size: 1.3rem; flex-shrink: 0; margin-top: .1rem; }
        .act-info { flex: 1; }
        .act-title { font-size: .88rem; font-weight: 800; color: var(--foreground); }
        .act-note { font-size: .75rem; color: var(--muted); font-weight: 600; margin-top: .25rem; line-height: 1.5; }
        .act-meta { display: flex; flex-direction: column; align-items: flex-end; gap: .35rem; flex-shrink: 0; }
        .act-date { font-size: .68rem; color: var(--muted); font-weight: 700; }
        .act-status-pill { font-size: .62rem; font-weight: 900; padding: .2rem .6rem; border-radius: 2rem; }
        .act-pill-done { background: rgba(0,229,160,.12); color: var(--neon-green); }
        .act-pill-in-progress { background: rgba(108,99,255,.15); color: var(--primary-glow); }
        .act-pill-upcoming { background: rgba(108,99,255,.07); color: var(--muted); }

        /* ALERTS */
        .alert-list { display: flex; flex-direction: column; gap: .85rem; }
        .alert-card { padding: 1.1rem 1.25rem; border-radius: 1.1rem; border: 1px solid; }
        .alert-warning { background: rgba(255,68,102,.06); border-color: rgba(255,68,102,.25); }
        .alert-praise { background: rgba(0,229,160,.06); border-color: rgba(0,229,160,.22); }
        .alert-info { background: rgba(108,99,255,.06); border-color: rgba(108,99,255,.2); }
        .alert-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: .65rem; }
        .alert-badge { font-size: .68rem; font-weight: 900; padding: .25rem .7rem; border-radius: 2rem; }
        .alert-badge-warning { background: rgba(255,68,102,.15); color: #FF6680; }
        .alert-badge-praise { background: rgba(0,229,160,.15); color: var(--neon-green); }
        .alert-badge-info { background: rgba(108,99,255,.15); color: var(--primary-glow); }
        .alert-date { font-size: .68rem; color: var(--muted); font-weight: 700; }
        .alert-msg { font-size: .82rem; color: var(--foreground); font-weight: 600; line-height: 1.65; }
        .no-warn { background: rgba(0,229,160,.08); border: 1px solid rgba(0,229,160,.2); padding: 1rem 1.25rem; border-radius: 1rem; font-size: .82rem; color: var(--neon-green); font-weight: 700; }

        /* RESPONSIVE */
        @media (max-width: 1100px) { .qs-row { grid-template-columns: repeat(3,1fr); } }
        @media (max-width: 900px) {
          .two-col { grid-template-columns: 1fr; }
          .qs-row { grid-template-columns: repeat(2,1fr); }
          .pd-header { flex-direction: column; align-items: flex-start; }
          .syl-thead, .syl-row { grid-template-columns: 80px 1fr 100px 60px; }
        }
        @media (max-width: 600px) {
          .qs-row { grid-template-columns: 1fr 1fr; }
          .pd-tabs { gap: .35rem; }
          .pd-tab { font-size: .72rem; padding: .45rem .8rem; }
        }
      `}</style>
    </div>
  );
}
