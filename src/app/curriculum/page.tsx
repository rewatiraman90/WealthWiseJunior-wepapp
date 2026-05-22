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

function getUnlockedModules(joinedDate: string | undefined, isSubscriber: boolean, isAdmin: boolean): Set<number> {
  if (isAdmin) return new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
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

function getUnlockDate(modNum: number, joinedDate: string): string {
  const start = new Date(joinedDate);
  const totalMonths = start.getMonth() + (modNum - 1);
  const y = start.getFullYear() + Math.floor(totalMonths / 12);
  const m = totalMonths % 12;
  return new Date(y, m, 1).toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

export default function CurriculumPage() {
  const { profile, isLoading } = useProfile();
  const [openModule, setOpenModule] = useState<number | null>(1);

  if (isLoading) {
    return <div className="cur-loading">Loading your learning path…</div>;
  }

  const grade       = parseInt(profile?.grade ?? "5", 10);
  const isSubscriber = profile?.isSubscriber ?? false;
  const isAdmin      = profile?.isAdmin ?? false;
  const levelName    = LEVEL_NAMES[grade] ?? "Explorer";
  const syllabus     = syllabusData[grade];
  const classes      = videoSchedule[grade] ?? [];
  const unlocked     = getUnlockedModules(profile?.joinedDate, isSubscriber, isAdmin);
  const totalLessons = classes.length;
  const completedLessons = 0; // future: pull from attendance

  if (!syllabus) {
    return <div className="cur-loading">Curriculum not found for your grade.</div>;
  }

  return (
    <div className="cur-wrap">
      {/* Header */}
      <div className="cur-hero premium-glass">
        <div className="cur-hero-left">
          <span className="cur-eyebrow">Your Learning Path</span>
          <h1 className="gradient-text cur-title">
            Level {grade - 4} — {levelName}
          </h1>
          <p className="cur-subtitle">
            {syllabus.modules.length} Modules · {totalLessons} Lessons · Financial Intelligence from Class {grade}
          </p>
          {!isSubscriber && (
            <Link href="/onboarding?upgrade=true" className="cur-upgrade-btn">
              ⭐ Subscribe to unlock all modules →
            </Link>
          )}
        </div>
        <div className="cur-stats">
          <div className="cur-stat">
            <span className="cur-stat-val">{syllabus.modules.length}</span>
            <span className="cur-stat-lbl">Modules</span>
          </div>
          <div className="cur-stat">
            <span className="cur-stat-val">{totalLessons}</span>
            <span className="cur-stat-lbl">Lessons</span>
          </div>
          <div className="cur-stat">
            <span className="cur-stat-val">{unlocked.size}</span>
            <span className="cur-stat-lbl">Unlocked</span>
          </div>
        </div>
      </div>

      {/* Module list */}
      <div className="cur-modules">
        {syllabus.modules.map((mod, idx) => {
          const modNum      = idx + 1;
          const isUnlocked  = unlocked.has(modNum);
          const isOpen      = openModule === modNum;
          const modClasses  = classes.filter(c => c.month === modNum);

          return (
            <div
              key={modNum}
              className={`cur-module premium-glass ${isUnlocked ? "mod-unlocked" : "mod-locked"} ${isOpen ? "mod-open" : ""}`}
            >
              {/* Module header — always clickable to expand/collapse */}
              <button
                className="cur-mod-header"
                onClick={() => setOpenModule(isOpen ? null : modNum)}
              >
                <div className="cur-mod-left">
                  <span className={`cur-mod-num ${isUnlocked ? "num-unlocked" : "num-locked"}`}>
                    {isUnlocked ? `M${modNum}` : "🔒"}
                  </span>
                  <div className="cur-mod-info">
                    <span className="cur-mod-topic">{mod.topic}</span>
                    <span className="cur-mod-meta">
                      {mod.month} · {modClasses.length} lessons
                      {!isSubscriber && modNum > 1 && (
                        <span className="cur-sub-tag"> · Subscribe to unlock</span>
                      )}
                      {isSubscriber && !isUnlocked && profile?.joinedDate && (
                        <span className="cur-lock-date"> · Unlocks {getUnlockDate(modNum, profile.joinedDate)}</span>
                      )}
                    </span>
                  </div>
                </div>
                <span className="cur-chevron">{isOpen ? "▲" : "▼"}</span>
              </button>

              {/* Lesson list — visible when open */}
              {isOpen && (
                <div className="cur-lessons">
                  {modClasses.map((cls, lessonIdx) => {
                    const canOpen = isUnlocked && (isSubscriber || isAdmin || modNum === 1);

                    return (
                      <div key={cls.id} className={`cur-lesson ${canOpen ? "lesson-open" : "lesson-locked"}`}>
                        <div className="cur-lesson-left">
                          <span className="cur-lesson-num">{lessonIdx + 1}</span>
                          <div className="cur-lesson-info">
                            <span className="cur-lesson-topic">{cls.topic}</span>
                            <span className="cur-lesson-meta">Week {cls.week} · {cls.day} · {cls.durationMin} min</span>
                          </div>
                        </div>
                        {canOpen ? (
                          <Link href={`/classes/${cls.id}`} className="cur-lesson-btn">
                            Watch →
                          </Link>
                        ) : (
                          <span className="cur-lesson-lock">
                            {!isSubscriber ? "⭐ Subscribe" : "🔒 Locked"}
                          </span>
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
        .cur-loading { display: flex; align-items: center; justify-content: center; min-height: 60vh; color: var(--muted); font-weight: 700; font-size: 1.1rem; }

        .cur-hero { padding: 2rem 2.5rem; border-radius: 1.5rem; display: flex; align-items: flex-start; justify-content: space-between; gap: 2rem; flex-wrap: wrap; }
        .cur-eyebrow { font-size: 0.7rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.12em; color: var(--neon-green); }
        .cur-title { font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 900; margin: 0.4rem 0 0.5rem; }
        .cur-subtitle { font-size: 0.88rem; color: var(--muted); font-weight: 600; }
        .cur-upgrade-btn { display: inline-block; margin-top: 1.25rem; padding: 0.65rem 1.5rem; background: linear-gradient(135deg, #FFD166, #FF8C42); color: #050816; border-radius: 2rem; font-weight: 900; font-size: 0.85rem; text-decoration: none; }
        .cur-stats { display: flex; gap: 1.5rem; flex-shrink: 0; }
        .cur-stat { display: flex; flex-direction: column; align-items: center; padding: 1rem 1.25rem; background: rgba(108,99,255,0.08); border: 1px solid rgba(108,99,255,0.2); border-radius: 1rem; min-width: 70px; }
        .cur-stat-val { font-size: 1.8rem; font-weight: 900; color: var(--foreground); line-height: 1; }
        .cur-stat-lbl { font-size: 0.65rem; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 0.07em; margin-top: 0.3rem; }

        .cur-modules { display: flex; flex-direction: column; gap: 0.75rem; }

        .cur-module { border-radius: 1.25rem; overflow: hidden; transition: box-shadow 0.2s; }
        .mod-unlocked { border-color: rgba(108,99,255,0.35) !important; }
        .mod-locked { opacity: 0.75; }
        .mod-open { box-shadow: 0 4px 30px rgba(108,99,255,0.15); }

        .cur-mod-header { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 1.1rem 1.5rem; background: transparent; border: none; color: var(--foreground); cursor: pointer; font-family: inherit; gap: 1rem; text-align: left; }
        .cur-mod-left { display: flex; align-items: center; gap: 1rem; flex: 1; min-width: 0; }
        .cur-mod-num { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.72rem; font-weight: 900; flex-shrink: 0; }
        .num-unlocked { background: linear-gradient(135deg, var(--primary), var(--neon-green)); color: #050816; }
        .num-locked { background: rgba(255,255,255,0.06); color: var(--muted); border: 1px solid rgba(255,255,255,0.1); }
        .cur-mod-info { display: flex; flex-direction: column; gap: 0.2rem; min-width: 0; }
        .cur-mod-topic { font-weight: 800; font-size: 0.95rem; color: var(--foreground); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cur-mod-meta { font-size: 0.72rem; color: var(--muted); font-weight: 600; }
        .cur-sub-tag { color: #FFD166; font-weight: 700; }
        .cur-lock-date { color: rgba(108,99,255,0.8); font-weight: 700; }
        .cur-chevron { color: var(--muted); font-size: 0.85rem; flex-shrink: 0; }

        .cur-lessons { border-top: 1px solid rgba(255,255,255,0.07); display: flex; flex-direction: column; }
        .cur-lesson { display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1.5rem; gap: 1rem; border-bottom: 1px solid rgba(255,255,255,0.04); }
        .cur-lesson:last-child { border-bottom: none; }
        .lesson-open { background: rgba(108,99,255,0.04); }
        .lesson-locked { background: transparent; }
        .cur-lesson-left { display: flex; align-items: center; gap: 0.9rem; flex: 1; min-width: 0; }
        .cur-lesson-num { width: 24px; height: 24px; border-radius: 50%; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 0.68rem; font-weight: 900; color: var(--muted); flex-shrink: 0; }
        .lesson-open .cur-lesson-num { background: rgba(108,99,255,0.15); border-color: rgba(108,99,255,0.3); color: var(--primary-glow); }
        .cur-lesson-info { display: flex; flex-direction: column; gap: 0.15rem; min-width: 0; }
        .cur-lesson-topic { font-size: 0.88rem; font-weight: 700; color: var(--foreground); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .lesson-locked .cur-lesson-topic { color: var(--muted); }
        .cur-lesson-meta { font-size: 0.68rem; color: var(--muted); font-weight: 600; }
        .cur-lesson-btn { padding: 0.35rem 0.9rem; background: linear-gradient(135deg, var(--primary), #8b5cf6); color: white; border-radius: 2rem; font-size: 0.75rem; font-weight: 800; text-decoration: none; white-space: nowrap; flex-shrink: 0; }
        .cur-lesson-lock { font-size: 0.72rem; font-weight: 700; color: var(--muted); white-space: nowrap; flex-shrink: 0; padding: 0.35rem 0.75rem; border-radius: 2rem; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); }
      `}</style>
    </div>
  );
}
