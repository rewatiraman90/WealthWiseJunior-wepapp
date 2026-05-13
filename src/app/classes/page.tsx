"use client";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useProfile } from "@/hooks/useProfile";
import SubscriberLock from "@/components/SubscriberLock";
import { videoSchedule, VideoClass } from "@/data/videoClasses";
import AiTeacherFloat from "@/components/AiTeacherFloat";

const LEVEL_MAP: Record<number, { name: string; level: number; emoji: string }> = {
  5:  { name: "Explorer",   level: 1, emoji: "🔭" },
  6:  { name: "Saver",      level: 2, emoji: "🪙" },
  7:  { name: "Planner",    level: 3, emoji: "📋" },
  8:  { name: "Strategist", level: 4, emoji: "🎯" },
  9:  { name: "Analyst",    level: 5, emoji: "📊" },
  10: { name: "Investor",   level: 6, emoji: "📈" },
  11: { name: "Architect",  level: 7, emoji: "🏗️" },
  12: { name: "Master",     level: 8, emoji: "🏆" },
};

const MODULE_NAMES = [
  "Money Foundations",
  "Saving & Budgeting",
  "Banking Basics",
  "Income & Careers",
  "Smart Spending",
  "Investing Intro",
  "Stock Markets",
  "Financial Planning",
  "Business & Enterprise",
  "Wealth Building",
];

const WEEKS = [1, 2, 3, 4];
const DAYS: ("Mon" | "Wed" | "Fri")[] = ["Mon", "Wed", "Fri"];
const DAY_LABELS = { Mon: "Monday", Wed: "Wednesday", Fri: "Friday" };
const DAY_TYPE = { Mon: "📖 Concept", Wed: "🔬 Deep Dive", Fri: "🎯 Practice" };

const DAY_COLORS = {
  Mon: { glow: "#9B93FF", bg: "rgba(108,99,255,0.10)", border: "rgba(108,99,255,0.30)" },
  Wed: { glow: "#00E5A0", bg: "rgba(0,229,160,0.08)", border: "rgba(0,229,160,0.28)" },
  Fri: { glow: "#FF8C5A", bg: "rgba(255,107,53,0.10)", border: "rgba(255,107,53,0.28)" },
};

const STORAGE_KEY = "ww_attended_classes";

function loadAttended(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try { return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")); }
  catch { return new Set(); }
}

function getUnlockedModules(joinedDate: string | undefined, isSubscriber: boolean, isAdmin?: boolean): Set<number> {
  if (isAdmin) return new Set([1,2,3,4,5,6,7,8,9,10]);
  if (!isSubscriber) return new Set([1]);
  const start = joinedDate ? new Date(joinedDate) : new Date();
  const now = new Date();
  const unlocked = new Set<number>();
  for (let mod = 1; mod <= 10; mod++) {
    if (mod === 1) { unlocked.add(1); continue; }
    const totalMonths = start.getMonth() + (mod - 1);
    const unlockYear = start.getFullYear() + Math.floor(totalMonths / 12);
    const unlockMonth = totalMonths % 12;
    if (now >= new Date(unlockYear, unlockMonth, 1)) unlocked.add(mod);
  }
  return unlocked;
}

function getNextUnlockDate(completedMod: number, joinedDate: string): string {
  const start = new Date(joinedDate);
  const totalMonths = start.getMonth() + completedMod;
  const unlockYear = start.getFullYear() + Math.floor(totalMonths / 12);
  const unlockMonth = totalMonths % 12;
  return new Date(unlockYear, unlockMonth, 1).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });
}

function isModuleComplete(modNum: number, grade: number, attended: Set<string>): boolean {
  const sessions = (videoSchedule[grade] || []).filter(s => s.month === modNum);
  return sessions.length > 0 && sessions.every(s => attended.has(s.id));
}

export default function ClassesPage() {
  const { profile, isLoading } = useProfile();
  const [attended, setAttended] = useState<Set<string>>(new Set());
  const [expandedModule, setExpandedModule] = useState<number>(1);

  useEffect(() => {
    setAttended(loadAttended());
  }, []);

  const grade = parseInt(profile?.grade || "5");
  const levelInfo = LEVEL_MAP[grade] || LEVEL_MAP[5];
  const isSubscriber = profile?.isSubscriber ?? false;
  const isAdmin = profile?.isAdmin ?? false;
  const joinedDate = (profile as any)?.joinedDate || (profile as any)?.created_at;

  const allSessions = useMemo(() => videoSchedule[grade] || [], [grade]);
  const unlockedModules = useMemo(
    () => getUnlockedModules(joinedDate, isSubscriber, isAdmin),
    [joinedDate, isSubscriber, isAdmin]
  );

  const attendedCount = allSessions.filter(s => attended.has(s.id)).length;
  const totalSessions = allSessions.length;
  const attendancePct = totalSessions > 0 ? Math.round((attendedCount / totalSessions) * 100) : 0;
  const completedModulesCount = Array.from({ length: 10 }, (_, i) => i + 1)
    .filter(m => isModuleComplete(m, grade, attended)).length;

  const grouped = useMemo(() => {
    const map: Record<number, Record<number, Record<string, VideoClass>>> = {};
    for (const s of allSessions) {
      if (!map[s.month]) map[s.month] = {};
      if (!map[s.month][s.week]) map[s.month][s.week] = {};
      map[s.month][s.week][s.day] = s;
    }
    return map;
  }, [allSessions]);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "4rem", color: "var(--muted)" }}>
        Loading your learning path...
      </div>
    );
  }

  const highestUnlocked = Math.max(...Array.from(unlockedModules), 1);

  return (
    <div className="cp-root">
      {/* ── HEADER ── */}
      <div className="cp-hero">
        <div>
          <p className="cp-eyebrow">{levelInfo.emoji} My Learning Path</p>
          <h1 className="gradient-text">{levelInfo.name} — Level {levelInfo.level}</h1>
          <p className="cp-sub">10 Modules · 40 Weeks · 120 Sessions of Financial Mastery</p>
        </div>
        <div className="cp-stats">
          <div className="cstat premium-glass">
            <span className="cstat-num">{completedModulesCount}</span>
            <span className="cstat-lbl">Modules Done</span>
          </div>
          <div className="cstat premium-glass">
            <span className="cstat-num">{attendedCount}</span>
            <span className="cstat-lbl">Attended</span>
          </div>
          <div className="cstat premium-glass">
            <span className="cstat-num" style={{ color: "var(--neon-green)" }}>
              {attendancePct}%
            </span>
            <span className="cstat-lbl">Progress</span>
          </div>
        </div>
      </div>

      {/* ── PROGRESS BAR ── */}
      <div className="att-bar premium-glass">
        <div className="att-info">
          <span className="att-label">Overall Progress</span>
          <span className="att-pct gradient-text">{attendedCount} / {totalSessions} sessions</span>
        </div>
        <div className="att-track">
          <div className="att-fill" style={{ width: `${attendancePct}%` }} />
        </div>
        {attendancePct < 75 && attendedCount > 0 && (
          <p className="att-warn">⚠️ Attendance below 75% — catch up to stay on track!</p>
        )}
      </div>

      {/* ── MODULE LIST ── */}
      <div className="months-list">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((modNum) => {
          const isUnlocked = unlockedModules.has(modNum);
          const isPreview = !isSubscriber && modNum === 2;
          const isLocked = !isUnlocked && !isPreview;
          const isComplete = isModuleComplete(modNum, grade, attended);
          const isEarlyDone = isComplete && !unlockedModules.has(modNum + 1) && modNum < 10;
          const isOpen = expandedModule === modNum;
          const moduleSessions = grouped[modNum] || {};
          const modDone = Object.values(moduleSessions)
            .flatMap(w => Object.values(w))
            .filter(s => attended.has(s.id)).length;
          const modTotal = Object.values(moduleSessions).flatMap(w => Object.values(w)).length;

          let cardClass = "upcoming";
          if (!isLocked) {
            if (isComplete) cardClass = "past";
            else if (modNum === highestUnlocked) cardClass = "current";
            else cardClass = "past";
          }

          return (
            <div
              key={modNum}
              className={`month-card ${cardClass} ${isOpen ? "open" : ""} ${isLocked ? "mod-locked" : ""}`}
            >
              <button
                className="month-header"
                onClick={() => !isLocked && setExpandedModule(prev => prev === modNum ? -1 : modNum)}
                aria-expanded={isOpen}
                disabled={isLocked}
                style={{ cursor: isLocked ? "not-allowed" : "pointer" }}
              >
                <div className="mh-left">
                  <span className="module-num-badge">
                    {isLocked ? "🔒" : isComplete ? "✅" : modNum}
                  </span>
                  <div>
                    <span className="month-name">
                      Module {modNum} <span className="mod-name-sep">—</span> {MODULE_NAMES[modNum - 1]}
                    </span>
                    <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.2rem" }}>
                      {cardClass === "current" && (
                        <span className="month-badge current-badge">● Active</span>
                      )}
                      {isComplete && (
                        <span className="month-badge past-badge">Completed</span>
                      )}
                      {isPreview && !isSubscriber && (
                        <span className="month-badge preview-badge">Preview</span>
                      )}
                      {isLocked && (
                        <span className="month-badge upcoming-badge">Locked</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mh-right">
                  {modTotal > 0 && isUnlocked && (
                    <span className="month-prog">{modDone}/{modTotal} sessions</span>
                  )}
                  {!isLocked && (
                    <span className="chevron">{isOpen ? "▲" : "▼"}</span>
                  )}
                </div>
              </button>

              {isOpen && !isLocked && (
                <div className="month-body">
                  {/* Early completion professional message */}
                  {isEarlyDone && (
                    <div className="early-done-banner">
                      <div className="ed-icon">🌟</div>
                      <div>
                        <p className="ed-title">Outstanding! Module Completed Ahead of Schedule</p>
                        <p className="ed-body">
                          Your next module unlocks on{" "}
                          <strong>{getNextUnlockDate(modNum, joinedDate || new Date().toISOString())}</strong>.
                          {" "}Use this time to review your assessments, aim for full marks, and strive for
                          excellence in each activity. True mastery comes from repetition — not just completion.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Module 2 preview for non-subscribers */}
                  {isPreview && !isSubscriber ? (
                    <div style={{ padding: "1rem" }}>
                      <SubscriberLock title="Module 2 — Saving & Budgeting" featureName="Full Module Access">
                        <div />
                      </SubscriberLock>
                    </div>
                  ) : (
                    WEEKS.map(w => {
                      const week = moduleSessions[w];
                      if (!week) return null;
                      return (
                        <div key={w} className="week-block">
                          <p className="week-label">Week {w}</p>
                          <div className="mwf-grid">
                            {DAYS.map(day => {
                              const cls = week[day];
                              const col = DAY_COLORS[day];
                              if (!cls) return null;
                              const isDone = attended.has(cls.id);
                              const hasVideo = !!cls.youtubeId;
                              return (
                                <div
                                  key={day}
                                  className="session-card"
                                  style={{ background: col.bg, borderColor: col.border }}
                                >
                                  <div className="sc-top">
                                    <span className="day-tag" style={{ color: col.glow }}>
                                      {DAY_TYPE[day]}
                                    </span>
                                    <span className="day-label" style={{ color: col.glow }}>
                                      {DAY_LABELS[day]}
                                    </span>
                                    {isDone ? (
                                      <span className="st-badge done">✅ Done</span>
                                    ) : (
                                      <span className="st-badge upcoming">📅 Available</span>
                                    )}
                                  </div>

                                  {hasVideo ? (
                                    <div className="thumb-wrap">
                                      <img
                                        src={`https://img.youtube.com/vi/${cls.youtubeId}/mqdefault.jpg`}
                                        alt={cls.topic}
                                        className="yt-thumb"
                                        onError={e => {
                                          (e.target as HTMLImageElement).src = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='180'><rect fill='%23141b35'/><text x='160' y='95' text-anchor='middle' fill='%236C63FF' font-size='48'>▶</text></svg>`;
                                        }}
                                      />
                                      <div className="thumb-overlay">
                                        <span className="play-btn">▶</span>
                                        <span className="dur-tag">{cls.durationMin} min</span>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="theory-banner">
                                      <span className="theory-icon">📖</span>
                                      <span className="theory-tag">Reading Material</span>
                                    </div>
                                  )}

                                  <div className="sc-body">
                                    <p className="sc-channel">{cls.channel}</p>
                                    <h3 className="sc-topic">{cls.topic}</h3>
                                    <p className="sc-desc">{cls.description}</p>
                                    <div className="theory-note">
                                      <span className="tn-label">📚 Study Notes</span>
                                      <p className="tn-text">{cls.description}</p>
                                    </div>
                                    <div className="sc-footer">
                                      <span className="assess-tag">📝 3-Q Assessment</span>
                                      <Link
                                        href={`/classes/${cls.id}`}
                                        className={`sc-btn ${isDone ? "sc-btn-done" : ""}`}
                                      >
                                        {hasVideo
                                          ? isDone ? "Review Again" : "Watch & Attend →"
                                          : isDone ? "Review Notes" : "Read & Attend →"}
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .cp-root { display:flex; flex-direction:column; gap:1.5rem; padding-bottom:3rem; }

        .cp-hero { display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem; }
        .cp-eyebrow { font-size:.78rem; font-weight:900; color:var(--primary-glow); text-transform:uppercase; letter-spacing:.1em; margin-bottom:.4rem; }
        .cp-sub { font-size:.9rem; color:var(--muted); font-weight:600; margin-top:.3rem; }
        .cp-stats { display:flex; gap:.75rem; flex-wrap:wrap; }
        .cstat { padding:.9rem 1.4rem; border-radius:1.25rem; display:flex; flex-direction:column; align-items:center; min-width:90px; }
        .cstat-num { font-size:1.6rem; font-weight:900; color:var(--foreground); }
        .cstat-lbl { font-size:.65rem; font-weight:700; color:var(--muted); text-transform:uppercase; letter-spacing:.06em; margin-top:.2rem; }

        .att-bar { padding:1.25rem 1.75rem; border-radius:1.25rem; display:flex; flex-direction:column; gap:.7rem; }
        .att-info { display:flex; justify-content:space-between; align-items:baseline; }
        .att-label { font-size:.8rem; font-weight:700; color:var(--muted); }
        .att-pct { font-size:1.1rem; font-weight:900; }
        .att-track { height:8px; background:rgba(108,99,255,.12); border-radius:4px; overflow:hidden; }
        .att-fill { height:100%; background:linear-gradient(90deg,var(--primary),var(--neon-green)); border-radius:4px; transition:width .5s; }
        .att-warn { font-size:.75rem; font-weight:700; color:var(--neon-orange); }

        .months-list { display:flex; flex-direction:column; gap:.75rem; }

        .month-card { border-radius:1.25rem; border:1px solid var(--border); background:rgba(14,22,56,.45); overflow:hidden; transition:border-color .2s; }
        .month-card.current { border-color:rgba(108,99,255,.45); box-shadow:0 0 24px rgba(108,99,255,.08); }
        .month-card.past { border-color:rgba(0,229,160,.25); }
        .month-card.upcoming { opacity:.6; }
        .month-card.mod-locked { opacity:.5; }

        .month-header { width:100%; display:flex; align-items:center; justify-content:space-between; padding:1rem 1.5rem; background:transparent; border:none; text-align:left; gap:1rem; }
        .mh-left { display:flex; align-items:center; gap:.9rem; }
        .module-num-badge { width:36px; height:36px; border-radius:50%; background:rgba(108,99,255,.15); border:1px solid rgba(108,99,255,.3); display:flex; align-items:center; justify-content:center; font-size:.85rem; font-weight:900; color:var(--primary-glow); flex-shrink:0; }
        .month-card.past .module-num-badge { background:rgba(0,229,160,.12); border-color:rgba(0,229,160,.3); color:var(--neon-green); }
        .month-card.current .module-num-badge { background:rgba(108,99,255,.25); border-color:rgba(108,99,255,.5); box-shadow:0 0 12px rgba(108,99,255,.3); }
        .month-name { font-size:1rem; font-weight:800; color:var(--foreground); }
        .mod-name-sep { color:var(--muted); font-weight:400; }
        .month-badge { font-size:.62rem; font-weight:900; padding:.15rem .55rem; border-radius:2rem; display:inline-block; }
        .current-badge { background:rgba(108,99,255,.2); color:var(--primary-glow); border:1px solid rgba(108,99,255,.4); animation:pulse-soft 2s infinite; }
        .past-badge { background:rgba(0,229,160,.12); color:var(--neon-green); border:1px solid rgba(0,229,160,.3); }
        .preview-badge { background:rgba(255,209,102,.12); color:#FFD166; border:1px solid rgba(255,209,102,.3); }
        .upcoming-badge { background:rgba(255,255,255,.05); color:var(--muted); border:1px solid var(--border); }
        @keyframes pulse-soft { 0%,100%{opacity:1} 50%{opacity:.6} }

        .mh-right { display:flex; align-items:center; gap:1rem; flex-shrink:0; }
        .month-prog { font-size:.72rem; font-weight:700; color:var(--muted); }
        .chevron { font-size:.65rem; color:var(--muted); transition:transform .2s; }
        .month-card.open .chevron { color:var(--primary-glow); }

        .month-body { padding:0 1.5rem 1.5rem; display:flex; flex-direction:column; gap:1.5rem; border-top:1px solid rgba(108,99,255,.12); padding-top:1.25rem; }

        .early-done-banner { display:flex; gap:1rem; align-items:flex-start; padding:1rem 1.25rem; border-radius:1rem; background:linear-gradient(135deg,rgba(108,99,255,.08),rgba(0,229,160,.06)); border:1px solid rgba(108,99,255,.25); }
        .ed-icon { font-size:1.5rem; flex-shrink:0; margin-top:.1rem; }
        .ed-title { font-size:.88rem; font-weight:900; color:var(--foreground); margin-bottom:.35rem; }
        .ed-body { font-size:.8rem; color:var(--muted); line-height:1.65; font-weight:500; }
        .ed-body strong { color:var(--primary-glow); }

        .week-block { display:flex; flex-direction:column; gap:.75rem; }
        .week-label { font-size:.72rem; font-weight:900; color:var(--muted); text-transform:uppercase; letter-spacing:.1em; }
        .mwf-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; }

        .session-card { border-radius:1.25rem; border:1px solid; overflow:hidden; display:flex; flex-direction:column; transition:transform .25s,box-shadow .25s; }
        .session-card:hover { transform:translateY(-3px); box-shadow:0 8px 30px rgba(0,0,0,.3); }
        .sc-top { display:flex; align-items:center; gap:.5rem; padding:.75rem 1rem .5rem; flex-wrap:wrap; }
        .day-tag { font-size:.62rem; font-weight:900; text-transform:uppercase; letter-spacing:.06em; }
        .day-label { font-size:.72rem; font-weight:800; margin-left:auto; }
        .st-badge { font-size:.6rem; font-weight:900; padding:.2rem .55rem; border-radius:2rem; }
        .st-badge.done { background:rgba(0,229,160,.15); color:var(--neon-green); border:1px solid rgba(0,229,160,.35); }
        .st-badge.upcoming { background:rgba(108,99,255,.12); color:var(--primary-glow); border:1px solid rgba(108,99,255,.28); }

        .thumb-wrap { position:relative; width:100%; aspect-ratio:16/9; overflow:hidden; }
        .yt-thumb { width:100%; height:100%; object-fit:cover; display:block; }
        .thumb-overlay { position:absolute; inset:0; background:rgba(5,8,22,.45); display:flex; align-items:center; justify-content:center; gap:.5rem; opacity:0; transition:opacity .2s; }
        .session-card:hover .thumb-overlay { opacity:1; }
        .play-btn { font-size:2.2rem; color:white; }
        .dur-tag { font-size:.72rem; font-weight:900; color:white; background:rgba(0,0,0,.65); padding:.2rem .5rem; border-radius:.35rem; }

        .theory-banner { display:flex; align-items:center; gap:.6rem; padding:.9rem 1rem; background:rgba(108,99,255,.07); border-bottom:1px solid rgba(108,99,255,.15); }
        .theory-icon { font-size:1.4rem; }
        .theory-tag { font-size:.72rem; font-weight:800; color:var(--primary-glow); text-transform:uppercase; letter-spacing:.05em; }

        .sc-body { padding:.9rem 1rem 1rem; display:flex; flex-direction:column; gap:.4rem; flex:1; }
        .sc-channel { font-size:.6rem; font-weight:900; color:var(--muted); text-transform:uppercase; letter-spacing:.07em; }
        .sc-topic { font-size:.95rem; font-weight:900; color:var(--foreground); line-height:1.3; }
        .sc-desc { font-size:.75rem; color:var(--muted); font-weight:500; line-height:1.5; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        .theory-note { margin-top:.5rem; background:rgba(255,255,255,.03); border-radius:.75rem; padding:.65rem .85rem; border:1px solid rgba(255,255,255,.06); }
        .tn-label { font-size:.6rem; font-weight:900; color:var(--muted); text-transform:uppercase; letter-spacing:.07em; display:block; margin-bottom:.3rem; }
        .tn-text { font-size:.72rem; color:rgba(200,210,240,.75); line-height:1.5; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }

        .sc-footer { display:flex; justify-content:space-between; align-items:center; margin-top:.75rem; padding-top:.65rem; border-top:1px solid rgba(255,255,255,.06); }
        .assess-tag { font-size:.6rem; font-weight:800; color:var(--muted); }
        .sc-btn { font-size:.72rem; font-weight:800; padding:.35rem .9rem; border-radius:2rem; background:linear-gradient(135deg,var(--primary),#8b5cf6); color:white; text-decoration:none; transition:all .2s; white-space:nowrap; }
        .sc-btn:hover { transform:scale(1.05); }
        .sc-btn-done { background:rgba(0,229,160,.12) !important; color:var(--neon-green) !important; border:1px solid rgba(0,229,160,.3); }

        @media(max-width:900px) { .mwf-grid { grid-template-columns:1fr; } .cp-hero { flex-direction:column; } }
      `}</style>

      <AiTeacherFloat
        grade={grade}
        topic={(() => {
          const ms = allSessions.filter(s => s.month === expandedModule);
          return ms[0]?.topic ?? "Financial Education";
        })()}
        context={`Module ${expandedModule} — ${MODULE_NAMES[expandedModule - 1] || "Financial Mastery"}`}
      />
    </div>
  );
}
