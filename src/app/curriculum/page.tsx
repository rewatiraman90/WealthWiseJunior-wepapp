"use client";
import { useState } from "react";
import Link from "next/link";
import { useProfile } from "@/hooks/useProfile";
import { syllabusData } from "@/data/curriculum";
import { videoSchedule } from "@/data/videoClasses";

const LEVEL_NAMES: Record<number, string> = {
  5: "Explorer", 6: "Saver", 7: "Planner", 8: "Strategist",
  9: "Analyst", 10: "Investor", 11: "Architect", 12: "Master",
};
const LEVEL_COLORS: Record<number, string> = {
  5: "rgba(108,99,255,0.9)", 6: "rgba(0,229,160,0.9)", 7: "rgba(255,107,53,0.9)",
  8: "rgba(255,209,102,0.9)", 9: "rgba(99,179,237,0.9)", 10: "rgba(159,122,234,0.9)",
  11: "rgba(252,129,74,0.9)", 12: "rgba(72,187,120,0.9)",
};

function getUnlockedModules(joinedDate: string | undefined, isSubscriber: boolean, isAdmin: boolean): Set<number> {
  if (isAdmin) return new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  if (!isSubscriber) return new Set([1]);
  const start = joinedDate ? new Date(joinedDate) : new Date();
  const now = new Date();
  const unlocked = new Set<number>();
  for (let mod = 1; mod <= 10; mod++) {
    if (mod === 1) { unlocked.add(1); continue; }
    const totalMonths = start.getMonth() + (mod - 1);
    const y = start.getFullYear() + Math.floor(totalMonths / 12);
    const m = totalMonths % 12;
    if (now >= new Date(y, m, 1)) unlocked.add(mod);
  }
  return unlocked;
}

function getUnlockDate(modNum: number, joinedDate: string): string {
  const start = new Date(joinedDate);
  const totalMonths = start.getMonth() + (modNum - 1);
  const y = start.getFullYear() + Math.floor(totalMonths / 12);
  const m = totalMonths % 12;
  return new Date(y, m, 1).toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}

export default function CurriculumPage() {
  const { profile, isLoading } = useProfile();
  const [openLevel, setOpenLevel]   = useState<number | null>(5);
  const [openModule, setOpenModule] = useState<string | null>("5-1");

  if (isLoading) return <div className="cur-loading">Loading curriculum…</div>;

  const userGrade    = parseInt(profile?.grade ?? "5", 10);
  const isSubscriber = profile?.isSubscriber ?? false;
  const isAdmin      = profile?.isAdmin ?? false;
  const unlocked     = getUnlockedModules(profile?.joinedDate, isSubscriber, isAdmin);

  const totalModules = Object.values(syllabusData).reduce((s, v) => s + v.modules.length, 0);
  const totalLessons = Object.values(videoSchedule).reduce((s, v) => s + v.length, 0);

  return (
    <div className="cur-wrap">

      {/* ── HERO ── */}
      <div className="cur-hero premium-glass">
        <div className="cur-hero-left">
          <span className="cur-eyebrow">Full Learning Roadmap</span>
          <h1 className="gradient-text cur-title">WealthWise Jr. Curriculum</h1>
          <p className="cur-subtitle">
            8 Levels · {totalModules} Modules · {totalLessons} Live Lessons · Class 5 through Class 12
          </p>
          {!isSubscriber && (
            <Link href="/onboarding?upgrade=true" className="cur-upgrade-btn">
              ⭐ Subscribe to unlock your full path →
            </Link>
          )}
        </div>
        <div className="cur-stats">
          <div className="cur-stat"><span className="cur-stat-val">8</span><span className="cur-stat-lbl">Levels</span></div>
          <div className="cur-stat"><span className="cur-stat-val">{totalModules}</span><span className="cur-stat-lbl">Modules</span></div>
          <div className="cur-stat"><span className="cur-stat-val">{totalLessons}</span><span className="cur-stat-lbl">Lessons</span></div>
        </div>
      </div>

      {/* ── ALL LEVELS ── */}
      <div className="cur-levels">
        {[5, 6, 7, 8, 9, 10, 11, 12].map(grade => {
          const syllabus   = syllabusData[grade];
          const classes    = videoSchedule[grade] ?? [];
          const levelName  = LEVEL_NAMES[grade];
          const color      = LEVEL_COLORS[grade];
          const isMyLevel  = grade === userGrade;
          const isLevelOpen = openLevel === grade;

          if (!syllabus) return null;

          return (
            <div key={grade} className={`cur-level premium-glass ${isMyLevel ? "my-level" : ""} ${isLevelOpen ? "level-open" : ""}`}>

              {/* Level header */}
              <button className="cur-level-header" onClick={() => setOpenLevel(isLevelOpen ? null : grade)}>
                <div className="cur-level-left">
                  <span className="cur-level-badge" style={{ background: color, color: "#050816" }}>
                    Level {grade - 4}
                  </span>
                  <div className="cur-level-info">
                    <span className="cur-level-name">
                      {levelName}
                      {isMyLevel && <span className="cur-you-tag">← You are here</span>}
                    </span>
                    <span className="cur-level-meta">
                      Class {grade} · {syllabus.modules.length} modules · {classes.length} video lessons
                    </span>
                  </div>
                </div>
                <span className="cur-chevron">{isLevelOpen ? "▲" : "▼"}</span>
              </button>

              {/* Modules */}
              {isLevelOpen && (
                <div className="cur-modules">
                  {syllabus.modules.map((mod, idx) => {
                    const modNum    = idx + 1;
                    const modKey    = `${grade}-${modNum}`;
                    const isModOpen = openModule === modKey;
                    const modClasses = classes.filter(c => c.month === modNum);
                    const isMyGradeModule = isMyLevel;
                    const isUnlocked = isAdmin || (isMyGradeModule && unlocked.has(modNum));

                    return (
                      <div key={modKey} className={`cur-module ${isUnlocked ? "mod-unlocked" : "mod-locked"} ${isModOpen ? "mod-open" : ""}`}>

                        <button className="cur-mod-header" onClick={() => setOpenModule(isModOpen ? null : modKey)}>
                          <div className="cur-mod-left">
                            <span className={`cur-mod-num ${isUnlocked ? "num-unlocked" : "num-locked"}`}
                              style={isUnlocked ? { background: color, color: "#050816" } : {}}>
                              {isUnlocked ? `M${modNum}` : "🔒"}
                            </span>
                            <div className="cur-mod-info">
                              <span className="cur-mod-topic">{mod.topic}</span>
                              <span className="cur-mod-meta">
                                {mod.month} · {modClasses.length || "—"} lessons
                                {!isSubscriber && isMyGradeModule && modNum > 1 && (
                                  <span className="cur-sub-tag"> · Subscribe to unlock</span>
                                )}
                                {isSubscriber && isMyGradeModule && !isUnlocked && profile?.joinedDate && (
                                  <span className="cur-lock-date"> · Unlocks {getUnlockDate(modNum, profile.joinedDate)}</span>
                                )}
                                {!isMyGradeModule && (
                                  <span className="cur-future-tag"> · Future level</span>
                                )}
                              </span>
                            </div>
                          </div>
                          <span className="cur-chevron">{isModOpen ? "▲" : "▼"}</span>
                        </button>

                        {isModOpen && (
                          <div className="cur-lessons">
                            {modClasses.length > 0 ? (
                              modClasses.map((cls, li) => {
                                const canWatch = isAdmin || (isMyGradeModule && isUnlocked && (isSubscriber || modNum === 1));
                                return (
                                  <div key={cls.id} className={`cur-lesson ${canWatch ? "lesson-open" : "lesson-locked"}`}>
                                    <div className="cur-lesson-left">
                                      <span className="cur-lesson-num">{li + 1}</span>
                                      <div className="cur-lesson-info">
                                        <span className="cur-lesson-topic">{cls.topic}</span>
                                        <span className="cur-lesson-meta">W{cls.week} · {cls.day} · {cls.durationMin} min</span>
                                      </div>
                                    </div>
                                    {canWatch ? (
                                      <Link href={`/classes/${cls.id}`} className="cur-lesson-btn">Watch →</Link>
                                    ) : (
                                      <span className="cur-lesson-lock">
                                        {!isSubscriber && isMyGradeModule ? "⭐ Subscribe" : "🔒 Locked"}
                                      </span>
                                    )}
                                  </div>
                                );
                              })
                            ) : isAdmin ? (
                              mod.steps.map((step, li) => (
                                <div key={li} className="cur-lesson lesson-open">
                                  <div className="cur-lesson-left">
                                    <span className="cur-lesson-num">{li + 1}</span>
                                    <div className="cur-lesson-info">
                                      <span className="cur-lesson-topic">{step.title}</span>
                                      <span className="cur-lesson-meta">📝 Curriculum content · Video coming soon</span>
                                    </div>
                                  </div>
                                  <span className="cur-lesson-draft">Draft</span>
                                </div>
                              ))
                            ) : (
                              <div className="cur-coming-soon">
                                🎬 Video lessons for this module are being added — check back soon!
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .cur-wrap { display: flex; flex-direction: column; gap: 1.25rem; padding-bottom: 3rem; }
        .cur-loading { display: flex; align-items: center; justify-content: center; min-height: 60vh; color: var(--muted); font-weight: 700; }

        /* Hero */
        .cur-hero { padding: 2rem 2.5rem; border-radius: 1.5rem; display: flex; align-items: flex-start; justify-content: space-between; gap: 2rem; flex-wrap: wrap; }
        .cur-eyebrow { font-size: 0.7rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.12em; color: var(--neon-green); }
        .cur-title { font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 900; margin: 0.4rem 0 0.5rem; }
        .cur-subtitle { font-size: 0.88rem; color: var(--muted); font-weight: 600; }
        .cur-upgrade-btn { display: inline-block; margin-top: 1.25rem; padding: 0.65rem 1.5rem; background: linear-gradient(135deg, #FFD166, #FF8C42); color: #050816; border-radius: 2rem; font-weight: 900; font-size: 0.85rem; text-decoration: none; }
        .cur-stats { display: flex; gap: 1rem; flex-shrink: 0; }
        .cur-stat { display: flex; flex-direction: column; align-items: center; padding: 1rem 1.25rem; background: rgba(108,99,255,0.08); border: 1px solid rgba(108,99,255,0.2); border-radius: 1rem; min-width: 70px; }
        .cur-stat-val { font-size: 1.8rem; font-weight: 900; color: var(--foreground); line-height: 1; }
        .cur-stat-lbl { font-size: 0.65rem; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 0.07em; margin-top: 0.3rem; }

        /* Levels */
        .cur-levels { display: flex; flex-direction: column; gap: 0.75rem; }
        .cur-level { border-radius: 1.25rem; overflow: hidden; transition: box-shadow 0.2s; }
        .my-level { border-color: rgba(108,99,255,0.5) !important; box-shadow: 0 0 0 1px rgba(108,99,255,0.3); }
        .level-open { box-shadow: 0 4px 30px rgba(0,0,0,0.3); }

        .cur-level-header { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 1.1rem 1.5rem; background: transparent; border: none; color: var(--foreground); cursor: pointer; font-family: inherit; gap: 1rem; text-align: left; }
        .cur-level-left { display: flex; align-items: center; gap: 1rem; flex: 1; min-width: 0; }
        .cur-level-badge { font-size: 0.72rem; font-weight: 900; padding: 0.3rem 0.85rem; border-radius: 2rem; white-space: nowrap; flex-shrink: 0; }
        .cur-level-info { display: flex; flex-direction: column; gap: 0.2rem; min-width: 0; }
        .cur-level-name { font-weight: 900; font-size: 1rem; color: var(--foreground); display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
        .cur-you-tag { font-size: 0.68rem; font-weight: 700; color: var(--neon-green); background: rgba(0,229,160,0.1); border: 1px solid rgba(0,229,160,0.3); padding: 0.15rem 0.6rem; border-radius: 2rem; }
        .cur-level-meta { font-size: 0.75rem; color: var(--muted); font-weight: 600; }

        /* Modules */
        .cur-modules { border-top: 1px solid rgba(255,255,255,0.07); display: flex; flex-direction: column; gap: 0; }
        .cur-module { border-bottom: 1px solid rgba(255,255,255,0.05); }
        .cur-module:last-child { border-bottom: none; }
        .mod-locked { opacity: 0.7; }

        .cur-mod-header { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 0.9rem 1.5rem; background: transparent; border: none; color: var(--foreground); cursor: pointer; font-family: inherit; gap: 1rem; text-align: left; }
        .cur-mod-header:hover { background: rgba(255,255,255,0.02); }
        .cur-mod-left { display: flex; align-items: center; gap: 0.9rem; flex: 1; min-width: 0; }
        .cur-mod-num { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.68rem; font-weight: 900; flex-shrink: 0; }
        .num-unlocked { background: var(--primary); color: #050816; }
        .num-locked { background: rgba(255,255,255,0.06); color: var(--muted); border: 1px solid rgba(255,255,255,0.1); }
        .cur-mod-info { display: flex; flex-direction: column; gap: 0.15rem; min-width: 0; }
        .cur-mod-topic { font-weight: 700; font-size: 0.9rem; color: var(--foreground); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cur-mod-meta { font-size: 0.7rem; color: var(--muted); font-weight: 600; }
        .cur-sub-tag { color: #FFD166; font-weight: 700; }
        .cur-lock-date { color: rgba(108,99,255,0.8); font-weight: 700; }
        .cur-future-tag { color: var(--muted); font-weight: 600; opacity: 0.7; }
        .cur-chevron { color: var(--muted); font-size: 0.8rem; flex-shrink: 0; }

        /* Lessons */
        .cur-lessons { border-top: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column; background: rgba(0,0,0,0.15); }
        .cur-lesson { display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1.75rem; gap: 1rem; border-bottom: 1px solid rgba(255,255,255,0.03); }
        .cur-lesson:last-child { border-bottom: none; }
        .lesson-open { background: rgba(108,99,255,0.04); }
        .cur-lesson-left { display: flex; align-items: center; gap: 0.85rem; flex: 1; min-width: 0; }
        .cur-lesson-num { width: 22px; height: 22px; border-radius: 50%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: 900; color: var(--muted); flex-shrink: 0; }
        .lesson-open .cur-lesson-num { background: rgba(108,99,255,0.15); border-color: rgba(108,99,255,0.35); color: var(--primary-glow); }
        .cur-lesson-info { display: flex; flex-direction: column; gap: 0.1rem; min-width: 0; }
        .cur-lesson-topic { font-size: 0.85rem; font-weight: 700; color: var(--foreground); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .lesson-locked .cur-lesson-topic { color: var(--muted); }
        .cur-lesson-meta { font-size: 0.65rem; color: var(--muted); font-weight: 600; }
        .cur-lesson-btn { padding: 0.3rem 0.85rem; background: linear-gradient(135deg, var(--primary), #8b5cf6); color: white; border-radius: 2rem; font-size: 0.72rem; font-weight: 800; text-decoration: none; white-space: nowrap; flex-shrink: 0; }
        .cur-lesson-lock { font-size: 0.7rem; font-weight: 700; color: var(--muted); white-space: nowrap; flex-shrink: 0; padding: 0.3rem 0.7rem; border-radius: 2rem; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); }
        .cur-coming-soon { padding: 1.25rem 1.75rem; font-size: 0.82rem; color: var(--muted); font-weight: 600; font-style: italic; }
        .cur-lesson-draft { font-size: 0.68rem; font-weight: 700; color: #FFD166; padding: 0.25rem 0.6rem; border-radius: 2rem; background: rgba(255,209,102,0.1); border: 1px solid rgba(255,209,102,0.25); white-space: nowrap; flex-shrink: 0; }
      `}</style>
    </div>
  );
}
