"use client";
import { useState } from "react";
import Link from "next/link";
import { videoSchedule, MONTHS, getWeekSessions, VideoClass } from "@/data/videoClasses";

const GRADES = [5, 6, 7, 8, 9, 10, 11, 12];
const DAYS: ('Mon' | 'Wed' | 'Fri')[] = ['Mon', 'Wed', 'Fri'];
const DAY_LABELS = { Mon: 'Monday', Wed: 'Wednesday', Fri: 'Friday' };
const DAY_COLORS = {
    Mon: { card: 'rgba(108,99,255,0.12)', border: 'rgba(108,99,255,0.35)', badge: 'rgba(108,99,255,0.2)', text: '#9B93FF' },
    Wed: { card: 'rgba(0,229,160,0.08)', border: 'rgba(0,229,160,0.3)', badge: 'rgba(0,229,160,0.15)', text: '#00E5A0' },
    Fri: { card: 'rgba(255,107,53,0.10)', border: 'rgba(255,107,53,0.3)', badge: 'rgba(255,107,53,0.15)', text: '#FF8C5A' },
};

function getYTThumb(id: string) { return `https://img.youtube.com/vi/${id}/mqdefault.jpg`; }

function getClassStatus(cls: VideoClass, attended: Set<string>): 'done' | 'today' | 'upcoming' {
    if (attended.has(cls.id)) return 'done';
    const now = new Date();
    const today = now.getDay(); // 0=Sun,1=Mon...
    const dayMap: Record<string, number> = { Mon: 1, Wed: 3, Fri: 5 };
    const clsDay = dayMap[cls.day];
    const diffFromMonday = clsDay - 1; // how many days after monday
    if (cls.month === 1 && cls.week === 1 && today === clsDay) return 'today';
    return 'upcoming';
}

export default function ClassesPage() {
    const [grade, setGrade] = useState(5);
    const [month, setMonth] = useState(1);
    const [week, setWeek] = useState(1);
    // Simulated attendance (would use localStorage in real app)
    const [attended] = useState<Set<string>>(new Set(['g5-m1-w1-mon']));

    const sessions = getWeekSessions(grade, month, week);
    const allSessions = videoSchedule[grade] || [];
    const attendedCount = allSessions.filter(s => attended.has(s.id)).length;
    const totalSessions = allSessions.length;

    const weekLabel = `Week ${week} — ${MONTHS[month - 1]} 2026`;

    function prevWeek() {
        if (week > 1) setWeek(w => w - 1);
        else if (month > 1) { setMonth(m => m - 1); setWeek(4); }
    }
    function nextWeek() {
        if (week < 4) setWeek(w => w + 1);
        else if (month < 10) { setMonth(m => m + 1); setWeek(1); }
    }

    return (
        <div className="classes-page">
            {/* HEAD */}
            <div className="cp-hero">
                <div>
                    <p className="cp-eyebrow">🎥 Live Video Classes</p>
                    <h1 className="gradient-text">Weekly Class Schedule</h1>
                    <p className="cp-sub">Monday · Wednesday · Friday — Watch, Learn, Get Attendance ✅</p>
                </div>
                <div className="cp-stats">
                    <div className="cstat premium-glass">
                        <span className="cstat-num">{attendedCount}</span>
                        <span className="cstat-lbl">Classes Attended</span>
                    </div>
                    <div className="cstat premium-glass">
                        <span className="cstat-num">{totalSessions - attendedCount}</span>
                        <span className="cstat-lbl">Remaining</span>
                    </div>
                    <div className="cstat premium-glass">
                        <span className="cstat-num" style={{ color: 'var(--neon-green)' }}>{Math.round(attendedCount / totalSessions * 100)}%</span>
                        <span className="cstat-lbl">Attendance Rate</span>
                    </div>
                </div>
            </div>

            {/* ATTENDANCE BAR */}
            <div className="att-bar premium-glass">
                <div className="att-info">
                    <span className="att-label">Semester Attendance</span>
                    <span className="att-pct gradient-text">{attendedCount} / {totalSessions}</span>
                </div>
                <div className="att-track">
                    <div className="att-fill" style={{ width: `${attendedCount / totalSessions * 100}%` }} />
                </div>
                {attendedCount / totalSessions < 0.75 && (
                    <p className="att-warn">⚠️ Attendance below 75% affects your semester score. Catch up now!</p>
                )}
            </div>

            {/* CONTROLS */}
            <div className="controls-row">
                <div className="grade-tabs">
                    {GRADES.map(g => (
                        <button key={g} className={`grade-tab ${grade === g ? 'active' : ''}`} onClick={() => setGrade(g)}>
                            Class {g}
                        </button>
                    ))}
                </div>
                <div className="week-nav">
                    <button className="btn-outline" onClick={prevWeek} disabled={month === 1 && week === 1}>← Prev</button>
                    <span className="week-label">{weekLabel}</span>
                    <button className="btn-outline" onClick={nextWeek} disabled={month === 10 && week === 4}>Next →</button>
                </div>
            </div>

            {/* MONTH STRIP */}
            <div className="month-strip">
                {MONTHS.map((mn, i) => (
                    <button key={i} className={`month-btn ${month === i + 1 ? 'active' : ''}`} onClick={() => { setMonth(i + 1); setWeek(1); }}>
                        {mn.slice(0, 3)}
                    </button>
                ))}
            </div>

            {/* MWF CARDS */}
            <div className="mwf-grid">
                {DAYS.map(day => {
                    const cls = sessions.find(s => s.day === day);
                    const col = DAY_COLORS[day];
                    const status = cls ? getClassStatus(cls, attended) : 'upcoming';
                    return (
                        <div key={day} className="day-col">
                            <div className="day-header" style={{ color: col.text }}>
                                <span className="day-name">{DAY_LABELS[day]}</span>
                                <span className="day-tag" style={{ background: col.badge, color: col.text }}>
                                    {day === 'Mon' ? '📖 Concept' : day === 'Wed' ? '🔬 Deep Dive' : '🎯 Practice'}
                                </span>
                            </div>

                            {cls ? (
                                <div className="class-card" style={{ background: col.card, borderColor: col.border }}>
                                    {/* Thumbnail */}
                                    <div className="yt-thumb-wrap">
                                        <img src={getYTThumb(cls.youtubeId)} alt={cls.topic} className="yt-thumb" onError={e => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect fill="%23141b35"/><text x="160" y="95" text-anchor="middle" fill="%236C63FF" font-size="48">▶</text></svg>'; }} />
                                        <div className="yt-overlay">
                                            <span className="yt-play">▶</span>
                                            <span className="yt-dur">{cls.durationMin} min</span>
                                        </div>
                                        {status === 'done' && <div className="status-badge done">✅ Attended</div>}
                                        {status === 'today' && <div className="status-badge today">🔴 Live Today</div>}
                                        {status === 'upcoming' && <div className="status-badge upcoming">📅 Upcoming</div>}
                                    </div>

                                    <div className="cc-body">
                                        <p className="cc-channel">{cls.channel}</p>
                                        <h3 className="cc-topic">{cls.topic}</h3>
                                        <p className="cc-desc">{cls.description}</p>

                                        <div className="cc-footer">
                                            <span className="cc-assess">📝 3-Q Assessment</span>
                                            {status !== 'upcoming' ? (
                                                <Link href={`/classes/${cls.id}`} className={`cc-btn ${status === 'done' ? 'cc-btn-done' : ''}`}>
                                                    {status === 'done' ? 'Review Again' : 'Watch & Attend →'}
                                                </Link>
                                            ) : (
                                                <span className="cc-locked">🔒 Not yet</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="class-card empty-card">
                                    <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '2rem' }}>No class this week</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* COMING NEXT */}
            <div className="coming-next premium-glass">
                <p className="cn-label">📅 Coming Next Week</p>
                <div className="cn-row">
                    {(getWeekSessions(grade, month, week < 4 ? week + 1 : week) || []).slice(0, 3).map(s => (
                        <div key={s.id} className="cn-pill">
                            <span className="cn-day">{s.day}</span>
                            <span className="cn-topic">{s.topic}</span>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .classes-page { display:flex; flex-direction:column; gap:1.75rem; padding-bottom:2rem; }
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
        .att-track { height:8px; background:rgba(108,99,255,0.12); border-radius:4px; overflow:hidden; }
        .att-fill { height:100%; background:linear-gradient(90deg,var(--primary),var(--neon-green)); border-radius:4px; transition:width .5s; }
        .att-warn { font-size:.75rem; font-weight:700; color:var(--neon-orange); }
        .controls-row { display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; }
        .grade-tabs { display:flex; gap:.4rem; flex-wrap:wrap; }
        .grade-tab { padding:.4rem .9rem; border-radius:2rem; border:1px solid var(--border); background:transparent; color:var(--muted); font-size:.78rem; font-weight:700; font-family:'Space Grotesk',sans-serif; cursor:pointer; transition:all .2s; }
        .grade-tab.active { background:var(--primary); color:white; border-color:var(--primary); box-shadow:0 0 16px rgba(108,99,255,.4); }
        .week-nav { display:flex; align-items:center; gap:.75rem; }
        .week-label { font-size:.85rem; font-weight:800; color:var(--foreground); white-space:nowrap; min-width:180px; text-align:center; }
        .month-strip { display:flex; gap:.4rem; flex-wrap:wrap; }
        .month-btn { padding:.35rem .8rem; border-radius:2rem; border:1px solid var(--border); background:transparent; color:var(--muted); font-size:.72rem; font-weight:700; font-family:'Space Grotesk',sans-serif; cursor:pointer; transition:all .2s; }
        .month-btn.active { background:rgba(0,229,160,.15); color:var(--neon-green); border-color:rgba(0,229,160,.35); }
        .mwf-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem; }
        .day-col { display:flex; flex-direction:column; gap:.9rem; }
        .day-header { display:flex; justify-content:space-between; align-items:center; }
        .day-name { font-size:.95rem; font-weight:900; }
        .day-tag { font-size:.65rem; font-weight:900; padding:.2rem .6rem; border-radius:2rem; }
        .class-card { border-radius:1.5rem; border:1px solid; overflow:hidden; transition:all .3s; }
        .class-card:hover { transform:translateY(-4px); }
        .empty-card { border-color:var(--border) !important; background:rgba(14,22,56,.3) !important; }
        .yt-thumb-wrap { position:relative; width:100%; aspect-ratio:16/9; overflow:hidden; }
        .yt-thumb { width:100%; height:100%; object-fit:cover; }
        .yt-overlay { position:absolute; inset:0; background:rgba(5,8,22,.4); display:flex; align-items:center; justify-content:center; gap:.5rem; opacity:0; transition:opacity .2s; }
        .class-card:hover .yt-overlay { opacity:1; }
        .yt-play { font-size:2.5rem; color:white; }
        .yt-dur { font-size:.75rem; font-weight:900; color:white; background:rgba(0,0,0,.6); padding:.2rem .5rem; border-radius:.4rem; }
        .status-badge { position:absolute; top:.6rem; right:.6rem; font-size:.65rem; font-weight:900; padding:.25rem .65rem; border-radius:2rem; }
        .status-badge.done { background:rgba(0,229,160,.2); color:var(--neon-green); border:1px solid rgba(0,229,160,.4); }
        .status-badge.today { background:rgba(255,68,102,.2); color:#FF4466; border:1px solid rgba(255,68,102,.4); animation:pulse-glow 2s infinite; }
        .status-badge.upcoming { background:rgba(108,99,255,.15); color:var(--primary-glow); border:1px solid rgba(108,99,255,.3); }
        .cc-body { padding:1rem 1.25rem 1.25rem; display:flex; flex-direction:column; gap:.5rem; }
        .cc-channel { font-size:.65rem; font-weight:900; color:var(--muted); text-transform:uppercase; letter-spacing:.08em; }
        .cc-topic { font-size:1rem; font-weight:900; color:var(--foreground); line-height:1.3; }
        .cc-desc { font-size:.78rem; color:var(--muted); font-weight:500; line-height:1.5; }
        .cc-footer { display:flex; justify-content:space-between; align-items:center; margin-top:.5rem; padding-top:.75rem; border-top:1px solid rgba(255,255,255,.06); }
        .cc-assess { font-size:.65rem; font-weight:800; color:var(--muted); }
        .cc-btn { font-size:.78rem; font-weight:800; padding:.4rem 1rem; border-radius:2rem; background:linear-gradient(135deg,var(--primary),#8B5CF6); color:white; text-decoration:none; transition:all .2s; }
        .cc-btn:hover { transform:scale(1.05); }
        .cc-btn-done { background:rgba(0,229,160,.15) !important; color:var(--neon-green) !important; border:1px solid rgba(0,229,160,.3); }
        .cc-locked { font-size:.75rem; font-weight:800; color:var(--muted); }
        .coming-next { padding:1.25rem 1.75rem; border-radius:1.25rem; display:flex; align-items:center; gap:1.5rem; flex-wrap:wrap; }
        .cn-label { font-size:.75rem; font-weight:900; color:var(--muted); text-transform:uppercase; letter-spacing:.08em; white-space:nowrap; }
        .cn-row { display:flex; gap:.75rem; flex-wrap:wrap; flex:1; }
        .cn-pill { display:flex; align-items:center; gap:.5rem; padding:.4rem 1rem; border-radius:2rem; background:rgba(108,99,255,.08); border:1px solid rgba(108,99,255,.2); }
        .cn-day { font-size:.65rem; font-weight:900; color:var(--primary-glow); }
        .cn-topic { font-size:.8rem; font-weight:700; color:var(--foreground); }
        @media(max-width:900px) { .mwf-grid { grid-template-columns:1fr; } .controls-row { flex-direction:column; align-items:flex-start; } }
      `}</style>
        </div>
    );
}
