"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { useProfile } from "@/hooks/useProfile";
import SubscriberLock from "@/components/SubscriberLock";
import {
  videoSchedule,
  MONTHS,
  VideoClass,
  getCurrentWeekInfo,
} from "@/data/videoClasses";
import AiTeacherFloat from "@/components/AiTeacherFloat";

const GRADES = [5, 6, 7, 8, 9, 10, 11, 12];
const WEEKS = [1, 2, 3, 4];
const DAYS: ("Mon" | "Wed" | "Fri")[] = ["Mon", "Wed", "Fri"];
const DAY_LABELS = { Mon: "Monday", Wed: "Wednesday", Fri: "Friday" };
const DAY_TYPE = { Mon: "📖 Concept", Wed: "🔬 Deep Dive", Fri: "🎯 Practice" };

// Colors per day
const DAY_COLORS = {
  Mon: { glow: "#9B93FF", bg: "rgba(108,99,255,0.10)", border: "rgba(108,99,255,0.30)" },
  Wed: { glow: "#00E5A0", bg: "rgba(0,229,160,0.08)", border: "rgba(0,229,160,0.28)" },
  Fri: { glow: "#FF8C5A", bg: "rgba(255,107,53,0.10)", border: "rgba(255,107,53,0.28)" },
};

// Real-date current month index (March 2026 = 1, April = 2, ...)
function getCurrentMonthIndex(): number {
  const m = new Date().getMonth(); // 0=Jan … 11=Dec
  // Academic year: March(2)=1 … December(11)=10
  const idx = m - 1; // March(2)-1=1
  return idx >= 1 && idx <= 10 ? idx : 1;
}

function getYTThumb(id: string) {
  return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
}

function getSessionStatus(
  cls: VideoClass,
  attended: Set<string>
): "done" | "live" | "upcoming" {
  if (attended.has(cls.id)) return "done";
  const { month: cm, week: cw } = getCurrentWeekInfo();
  const now = new Date();
  const dayMap: Record<string, number> = { Mon: 1, Wed: 3, Fri: 5 };
  if (cls.month === cm && cls.week === cw && dayMap[cls.day] === now.getDay())
    return "live";
  if (cls.month < cm || (cls.month === cm && cls.week < cw)) return "done";
  return "upcoming";
}

export default function ClassesPage() {
  const { profile } = useProfile();
  const isSubscriber = profile?.isSubscriber ?? false;

  const [grade, setGrade] = useState(5);
  const [expandedMonth, setExpandedMonth] = useState<number>(getCurrentMonthIndex());
  const [attended] = useState<Set<string>>(new Set(["g5-m1-w1-mon"]));

  const currentMonthIdx = getCurrentMonthIndex();

  const allSessions = useMemo(() => videoSchedule[grade] || [], [grade]);
  const attendedCount = allSessions.filter((s) => attended.has(s.id)).length;
  const totalSessions = allSessions.length;
  const attendancePct = totalSessions > 0 ? Math.round((attendedCount / totalSessions) * 100) : 0;

  // Group sessions: month → week → day
  const grouped = useMemo(() => {
    const map: Record<number, Record<number, Record<string, VideoClass>>> = {};
    for (const s of allSessions) {
      if (!map[s.month]) map[s.month] = {};
      if (!map[s.month][s.week]) map[s.month][s.week] = {};
      map[s.month][s.week][s.day] = s;
    }
    return map;
  }, [allSessions]);

  function toggleMonth(m: number) {
    setExpandedMonth((prev) => (prev === m ? -1 : m));
  }

  function getMonthStatus(m: number): "past" | "current" | "upcoming" {
    if (m < currentMonthIdx) return "past";
    if (m === currentMonthIdx) return "current";
    return "upcoming";
  }

  return (
    <div className="cp-root">
      {/* ── HEADER ── */}
      <div className="cp-hero">
        <div>
          <p className="cp-eyebrow">📅 My Classes</p>
          <h1 className="gradient-text">Learning Dashboard</h1>
          <p className="cp-sub">
            Videos · Chapters · Study Material — All in one place
          </p>
        </div>
        <div className="cp-stats">
          <div className="cstat premium-glass">
            <span className="cstat-num">{attendedCount}</span>
            <span className="cstat-lbl">Attended</span>
          </div>
          <div className="cstat premium-glass">
            <span className="cstat-num">{totalSessions - attendedCount}</span>
            <span className="cstat-lbl">Remaining</span>
          </div>
          <div className="cstat premium-glass">
            <span className="cstat-num" style={{ color: "var(--neon-green)" }}>
              {attendancePct}%
            </span>
            <span className="cstat-lbl">Attendance</span>
          </div>
        </div>
      </div>

      {/* ── ATTENDANCE BAR ── */}
      <div className="att-bar premium-glass">
        <div className="att-info">
          <span className="att-label">Semester Attendance</span>
          <span className="att-pct gradient-text">
            {attendedCount} / {totalSessions}
          </span>
        </div>
        <div className="att-track">
          <div className="att-fill" style={{ width: `${attendancePct}%` }} />
        </div>
        {attendancePct < 75 && (
          <p className="att-warn">
            ⚠️ Attendance below 75% — catch up to stay on track!
          </p>
        )}
      </div>

      {/* ── GRADE TABS ── */}
      <div className="grade-tabs">
        {GRADES.map((g) => (
          <button
            key={g}
            className={`grade-tab ${grade === g ? "active" : ""}`}
            onClick={() => setGrade(g)}
          >
            Class {g}
          </button>
        ))}
      </div>

      {/* ── MONTH ACCORDIONS ── */}
      <div className="months-list">
        {MONTHS.map((monthName, i) => {
          const mIdx = i + 1; // 1-based
          const status = getMonthStatus(mIdx);
          const isOpen = expandedMonth === mIdx;
          const monthSessions = grouped[mIdx] || {};
          const monthDone = Object.values(monthSessions)
            .flatMap((w) => Object.values(w))
            .filter((s) => attended.has(s.id)).length;
          const monthTotal = Object.values(monthSessions).flatMap((w) =>
            Object.values(w)
          ).length;

          return (
            <div
              key={mIdx}
              className={`month-card ${status} ${isOpen ? "open" : ""}`}
            >
              {/* Month Header (clickable) */}
              <button
                className="month-header"
                onClick={() => toggleMonth(mIdx)}
                aria-expanded={isOpen}
              >
                <div className="mh-left">
                  <span className="month-dot" />
                  <div>
                    <span className="month-name">{monthName}</span>
                    {status === "current" && (
                      <span className="month-badge current-badge">
                        ● Current
                      </span>
                    )}
                    {status === "past" && (
                      <span className="month-badge past-badge">Completed</span>
                    )}
                    {status === "upcoming" && (
                      <span className="month-badge upcoming-badge">
                        Upcoming
                      </span>
                    )}
                  </div>
                </div>
                <div className="mh-right">
                  {monthTotal > 0 && (
                    <span className="month-prog">
                      {monthDone}/{monthTotal} classes
                    </span>
                  )}
                  <span className="chevron">{isOpen ? "▲" : "▼"}</span>
                </div>
              </button>

              {/* Month Body */}
              {isOpen && (
                <div className="month-body">
                  {!isSubscriber ? (
                    <div style={{ padding: "1rem", textAlign: "center" }}>
                      <SubscriberLock
                        title="Month Content Access"
                        featureName={`${monthName} Curriculum`}
                      >
                         <div />
                      </SubscriberLock>
                    </div>
                  ) : (
                    WEEKS.map((w) => {
                      const week = monthSessions[w];
                      if (!week) return null;
                      return (
                        <div key={w} className="week-block">
                          <p className="week-label">Week {w}</p>
                          <div className="mwf-grid">
                          {DAYS.map((day) => {
                            const cls = week[day];
                            const col = DAY_COLORS[day];
                            if (!cls) return null;
                            const st = getSessionStatus(cls, attended);
                            const hasVideo = !!cls.youtubeId;
                            return (
                              <div
                                key={day}
                                className="session-card"
                                style={{
                                  background: col.bg,
                                  borderColor: col.border,
                                }}
                              >
                                {/* Day tag + status */}
                                <div className="sc-top">
                                  <span
                                    className="day-tag"
                                    style={{ color: col.glow }}
                                  >
                                    {DAY_TYPE[day]}
                                  </span>
                                  <span className="day-label" style={{ color: col.glow }}>
                                    {DAY_LABELS[day]}
                                  </span>
                                  {st === "done" && (
                                    <span className="st-badge done">
                                      ✅ Done
                                    </span>
                                  )}
                                  {st === "live" && (
                                    <span className="st-badge live">
                                      🔴 Live
                                    </span>
                                  )}
                                  {st === "upcoming" && (
                                    <span className="st-badge upcoming">
                                      📅 Upcoming
                                    </span>
                                  )}
                                </div>

                                {/* Video thumbnail OR theory banner */}
                                {hasVideo ? (
                                  <div className="thumb-wrap">
                                    <img
                                      src={getYTThumb(cls.youtubeId)}
                                      alt={cls.topic}
                                      className="yt-thumb"
                                      onError={(e) => {
                                        (
                                          e.target as HTMLImageElement
                                        ).src = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='180'><rect fill='%23141b35'/><text x='160' y='95' text-anchor='middle' fill='%236C63FF' font-size='48'>▶</text></svg>`;
                                      }}
                                    />
                                    <div className="thumb-overlay">
                                      <span className="play-btn">▶</span>
                                      <span className="dur-tag">
                                        {cls.durationMin} min
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="theory-banner">
                                    <span className="theory-icon">📖</span>
                                    <span className="theory-tag">
                                      Reading Material
                                    </span>
                                  </div>
                                )}

                                {/* Content */}
                                <div className="sc-body">
                                  <p className="sc-channel">{cls.channel}</p>
                                  <h3 className="sc-topic">{cls.topic}</h3>
                                  <p className="sc-desc">{cls.description}</p>

                                  {/* Always show theory note */}
                                  <div className="theory-note">
                                    <span className="tn-label">
                                      📚 Study Notes
                                    </span>
                                    <p className="tn-text">
                                      {cls.description}
                                    </p>
                                  </div>

                                  <div className="sc-footer">
                                    <span className="assess-tag">
                                      📝 3-Q Assessment
                                    </span>
                                    {st !== "upcoming" ? (
                                      <Link
                                        href={`/classes/${cls.id}`}
                                        className={`sc-btn ${st === "done" ? "sc-btn-done" : ""}`}
                                      >
                                        {hasVideo
                                          ? st === "done"
                                            ? "Review Again"
                                            : "Watch & Attend →"
                                          : st === "done"
                                          ? "Review Notes"
                                          : "Read & Attend →"}
                                      </Link>
                                    ) : (
                                      <span className="sc-locked">
                                        🔒 Not yet
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        /* ROOT */
        .cp-root {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding-bottom: 3rem;
        }

        /* HERO */
        .cp-hero {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .cp-eyebrow {
          font-size: 0.78rem;
          font-weight: 900;
          color: var(--primary-glow);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.4rem;
        }
        .cp-sub {
          font-size: 0.9rem;
          color: var(--muted);
          font-weight: 600;
          margin-top: 0.3rem;
        }
        .cp-stats {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .cstat {
          padding: 0.9rem 1.4rem;
          border-radius: 1.25rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 90px;
        }
        .cstat-num {
          font-size: 1.6rem;
          font-weight: 900;
          color: var(--foreground);
        }
        .cstat-lbl {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-top: 0.2rem;
        }

        /* ATTENDANCE */
        .att-bar {
          padding: 1.25rem 1.75rem;
          border-radius: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
        }
        .att-info {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .att-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--muted);
        }
        .att-pct {
          font-size: 1.1rem;
          font-weight: 900;
        }
        .att-track {
          height: 8px;
          background: rgba(108, 99, 255, 0.12);
          border-radius: 4px;
          overflow: hidden;
        }
        .att-fill {
          height: 100%;
          background: linear-gradient(
            90deg,
            var(--primary),
            var(--neon-green)
          );
          border-radius: 4px;
          transition: width 0.5s;
        }
        .att-warn {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--neon-orange);
        }

        /* GRADE TABS */
        .grade-tabs {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
        }
        .grade-tab {
          padding: 0.4rem 0.9rem;
          border-radius: 2rem;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--muted);
          font-size: 0.78rem;
          font-weight: 700;
          font-family: "Space Grotesk", sans-serif;
          cursor: pointer;
          transition: all 0.2s;
        }
        .grade-tab.active {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
          box-shadow: 0 0 16px rgba(108, 99, 255, 0.4);
        }

        /* MONTHS LIST */
        .months-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        /* MONTH CARD */
        .month-card {
          border-radius: 1.25rem;
          border: 1px solid var(--border);
          background: rgba(14, 22, 56, 0.45);
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .month-card.current {
          border-color: rgba(108, 99, 255, 0.45);
          box-shadow: 0 0 24px rgba(108, 99, 255, 0.08);
        }
        .month-card.past {
          border-color: rgba(0, 229, 160, 0.25);
        }
        .month-card.upcoming {
          opacity: 0.7;
        }

        /* MONTH HEADER */
        .month-header {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.5rem;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          gap: 1rem;
        }
        .mh-left {
          display: flex;
          align-items: center;
          gap: 0.9rem;
        }
        .month-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--primary);
          flex-shrink: 0;
        }
        .month-card.current .month-dot {
          background: var(--neon-green);
          box-shadow: 0 0 8px rgba(0, 229, 160, 0.6);
        }
        .month-card.past .month-dot {
          background: rgba(0, 229, 160, 0.5);
        }
        .month-card.upcoming .month-dot {
          background: rgba(108, 99, 255, 0.3);
        }
        .month-name {
          font-size: 1rem;
          font-weight: 800;
          color: var(--foreground);
          margin-right: 0.6rem;
        }
        .month-badge {
          font-size: 0.65rem;
          font-weight: 900;
          padding: 0.15rem 0.55rem;
          border-radius: 2rem;
          display: inline-block;
          vertical-align: middle;
        }
        .current-badge {
          background: rgba(108, 99, 255, 0.2);
          color: var(--primary-glow);
          border: 1px solid rgba(108, 99, 255, 0.4);
          animation: pulse-soft 2s infinite;
        }
        .past-badge {
          background: rgba(0, 229, 160, 0.12);
          color: var(--neon-green);
          border: 1px solid rgba(0, 229, 160, 0.3);
        }
        .upcoming-badge {
          background: rgba(255, 255, 255, 0.05);
          color: var(--muted);
          border: 1px solid var(--border);
        }
        @keyframes pulse-soft {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
        .mh-right {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-shrink: 0;
        }
        .month-prog {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--muted);
        }
        .chevron {
          font-size: 0.65rem;
          color: var(--muted);
          transition: transform 0.2s;
        }
        .month-card.open .chevron {
          color: var(--primary-glow);
        }

        /* MONTH BODY */
        .month-body {
          padding: 0 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          border-top: 1px solid rgba(108, 99, 255, 0.12);
          padding-top: 1.25rem;
        }

        /* WEEK */
        .week-block {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .week-label {
          font-size: 0.72rem;
          font-weight: 900;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .mwf-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        /* SESSION CARD */
        .session-card {
          border-radius: 1.25rem;
          border: 1px solid;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .session-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        }
        .sc-top {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem 0.5rem;
          flex-wrap: wrap;
        }
        .day-tag {
          font-size: 0.62rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .day-label {
          font-size: 0.72rem;
          font-weight: 800;
          margin-left: auto;
        }
        .st-badge {
          font-size: 0.6rem;
          font-weight: 900;
          padding: 0.2rem 0.55rem;
          border-radius: 2rem;
        }
        .st-badge.done {
          background: rgba(0, 229, 160, 0.15);
          color: var(--neon-green);
          border: 1px solid rgba(0, 229, 160, 0.35);
        }
        .st-badge.live {
          background: rgba(255, 68, 102, 0.15);
          color: #ff4466;
          border: 1px solid rgba(255, 68, 102, 0.35);
          animation: pulse-glow 2s infinite;
        }
        .st-badge.upcoming {
          background: rgba(108, 99, 255, 0.12);
          color: var(--primary-glow);
          border: 1px solid rgba(108, 99, 255, 0.28);
        }

        /* THUMBNAIL */
        .thumb-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
        }
        .yt-thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .thumb-overlay {
          position: absolute;
          inset: 0;
          background: rgba(5, 8, 22, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .session-card:hover .thumb-overlay {
          opacity: 1;
        }
        .play-btn {
          font-size: 2.2rem;
          color: white;
        }
        .dur-tag {
          font-size: 0.72rem;
          font-weight: 900;
          color: white;
          background: rgba(0, 0, 0, 0.65);
          padding: 0.2rem 0.5rem;
          border-radius: 0.35rem;
        }

        /* THEORY BANNER (no-video fallback) */
        .theory-banner {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.9rem 1rem;
          background: rgba(108, 99, 255, 0.07);
          border-bottom: 1px solid rgba(108, 99, 255, 0.15);
        }
        .theory-icon {
          font-size: 1.4rem;
        }
        .theory-tag {
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--primary-glow);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* BODY */
        .sc-body {
          padding: 0.9rem 1rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          flex: 1;
        }
        .sc-channel {
          font-size: 0.6rem;
          font-weight: 900;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.07em;
        }
        .sc-topic {
          font-size: 0.95rem;
          font-weight: 900;
          color: var(--foreground);
          line-height: 1.3;
        }
        .sc-desc {
          font-size: 0.75rem;
          color: var(--muted);
          font-weight: 500;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* THEORY NOTE */
        .theory-note {
          margin-top: 0.5rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 0.75rem;
          padding: 0.65rem 0.85rem;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .tn-label {
          font-size: 0.6rem;
          font-weight: 900;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.07em;
          display: block;
          margin-bottom: 0.3rem;
        }
        .tn-text {
          font-size: 0.72rem;
          color: rgba(200, 210, 240, 0.75);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* FOOTER */
        .sc-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.75rem;
          padding-top: 0.65rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }
        .assess-tag {
          font-size: 0.6rem;
          font-weight: 800;
          color: var(--muted);
        }
        .sc-btn {
          font-size: 0.72rem;
          font-weight: 800;
          padding: 0.35rem 0.9rem;
          border-radius: 2rem;
          background: linear-gradient(135deg, var(--primary), #8b5cf6);
          color: white;
          text-decoration: none;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .sc-btn:hover {
          transform: scale(1.05);
        }
        .sc-btn-done {
          background: rgba(0, 229, 160, 0.12) !important;
          color: var(--neon-green) !important;
          border: 1px solid rgba(0, 229, 160, 0.3);
        }
        .sc-locked {
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--muted);
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .mwf-grid {
            grid-template-columns: 1fr;
          }
          .cp-hero {
            flex-direction: column;
          }
        }
      `}</style>

      {/* ── FLOATING AI TEACHER ── */}
      <AiTeacherFloat
        grade={grade}
        topic={
          // Pass the currently expanded month's first topic for context
          (() => {
            const ms = allSessions.filter(s => s.month === expandedMonth);
            return ms[0]?.topic ?? "Financial Education";
          })()
        }
        context={`${MONTHS[expandedMonth - 1] || "Current"} classes`}
      />
    </div>
  );
}
