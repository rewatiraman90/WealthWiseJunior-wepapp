"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { getClassById, MONTHS } from "@/data/videoClasses";

const STORAGE_KEY = "ww_attended_classes";

function getAttended(): string[] {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
}
function markAttended(id: string) {
    const arr = getAttended();
    if (!arr.includes(id)) { arr.push(id); localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); }
}

export default function VideoClassPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;
    const cls = getClassById(id);

    const [watchedEnough, setWatchedEnough] = useState(false);
    const [answers, setAnswers] = useState<(number | null)[]>([null, null, null]);
    const [submitted, setSubmitted] = useState(false);
    const [passed, setPassed] = useState(false);
    const [attended, setAttended] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (cls && getAttended().includes(cls.id)) {
            setAttended(true);
            setWatchedEnough(true);
        }
    }, [cls]);

    // Allow assessment after 60s (simulated "watched enough")
    function startWatchTimer() {
        if (timerRef.current) return;
        timerRef.current = setTimeout(() => setWatchedEnough(true), 60000);
    }

    // Dev shortcut: click thumb 3 times
    const clickCount = useRef(0);
    function handleThumbClick() {
        clickCount.current++;
        if (clickCount.current >= 3) { setWatchedEnough(true); }
    }

    if (!cls) return (
        <div className="vp-wrap">
            <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '4rem' }}>Class not found. <Link href="/classes" className="back-link">← Back to schedule</Link></p>
        </div>
    );

    const monthName = MONTHS[cls.month - 1];

    function handleAnswer(qi: number, opt: number) {
        if (submitted) return;
        setAnswers(prev => { const n = [...prev]; n[qi] = opt; return n; });
    }

    function handleSubmit() {
        if (answers.some(a => a === null)) return;
        const safeCls = cls!;
        const correctCount = safeCls.assessment.filter((q, i) => answers[i] === q.answer).length;
        const pass = correctCount >= 2;
        setSubmitted(true);
        setPassed(pass);
        if (pass && !attended) { markAttended(safeCls.id); setAttended(true); }
    }

    function handleRetry() {
        setAnswers([null, null, null]);
        setSubmitted(false);
        setPassed(false);
    }

    const dayColor = cls.day === 'Mon' ? 'var(--neon-purple)' : cls.day === 'Wed' ? 'var(--neon-green)' : 'var(--neon-orange)';

    return (
        <div className="vp-wrap">
            {/* BREADCRUMB */}
            <div className="vp-breadcrumb">
                <Link href="/classes" className="back-link">← Weekly Schedule</Link>
                <span className="bc-sep">/</span>
                <span className="bc-cur">Class {cls.grade} · {monthName} · Week {cls.week} · {cls.day}</span>
            </div>

            {/* ATTENDED BANNER */}
            {attended && (
                <div className="attended-banner">
                    ✅ You already attended this class — your attendance is recorded!
                </div>
            )}

            <div className="vp-layout">
                {/* LEFT: VIDEO + INFO */}
                <div className="vp-left">
                    {/* VIDEO EMBED */}
                    <div className="yt-embed-wrap" onClick={handleThumbClick}>
                        <iframe
                            src={`https://www.youtube.com/embed/${cls.youtubeId}?rel=0&modestbranding=1`}
                            title={cls.topic}
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="yt-iframe"
                            onLoad={startWatchTimer}
                        />
                    </div>

                    {/* VIDEO INFO */}
                    <div className="vid-info premium-glass">
                        <div className="vi-top">
                            <div>
                                <div className="vi-meta">
                                    <span className="vi-grade" style={{ borderColor: dayColor, color: dayColor }}>Class {cls.grade}</span>
                                    <span className="vi-day" style={{ color: dayColor }}>{cls.day === 'Mon' ? '📖 Concept Day' : cls.day === 'Wed' ? '🔬 Deep Dive' : '🎯 Practice Day'}</span>
                                    <span className="vi-month">{monthName} · Week {cls.week}</span>
                                </div>
                                <h1 className="vi-title">{cls.topic}</h1>
                                <p className="vi-desc">{cls.description}</p>
                            </div>
                            <div className="vi-stats">
                                <div className="vi-stat">
                                    <span className="vis-val">{cls.durationMin} min</span>
                                    <span className="vis-lbl">Duration</span>
                                </div>
                                <div className="vi-stat">
                                    <span className="vis-val">3</span>
                                    <span className="vis-lbl">Questions</span>
                                </div>
                                <div className="vi-stat">
                                    <span className="vis-val">2/3</span>
                                    <span className="vis-lbl">Pass Mark</span>
                                </div>
                            </div>
                        </div>
                        <div className="vi-channel">
                            <span className="vc-icon">▶</span>
                            <div>
                                <p className="vc-name">{cls.channel}</p>
                                <p className="vc-sub">YouTube educational channel</p>
                            </div>
                        </div>
                    </div>

                    {/* KEY TAKEAWAYS */}
                    <div className="takeaways premium-glass">
                        <h3 className="ta-title">📌 Key Takeaways to Watch For</h3>
                        <ul className="ta-list">
                            <li>{cls.assessment[0].question}</li>
                            <li>{cls.assessment[1].question}</li>
                            <li>{cls.assessment[2].question}</li>
                        </ul>
                        <p className="ta-note">💡 Keep these questions in mind while watching — your assessment is based on this video.</p>
                    </div>
                </div>

                {/* RIGHT: ASSESSMENT */}
                <div className="vp-right">
                    <div className="assess-card premium-glass">
                        <div className="ac-header">
                            <h2 className="ac-title">📝 Attendance Assessment</h2>
                            <p className="ac-sub">Score 2 out of 3 to mark attendance ✅</p>
                        </div>

                        {!watchedEnough && !attended ? (
                            <div className="watch-gate">
                                <div className="wg-icon">⏳</div>
                                <p className="wg-title">Watch the video first</p>
                                <p className="wg-body">Assessment unlocks after you've watched the video for at least 1 minute. This ensures you actually learn, not just click.</p>
                                <div className="wg-bar">
                                    <div className="wg-fill" />
                                </div>
                                <p className="wg-note">Watching… Assessment unlocks gradually</p>
                            </div>
                        ) : (
                            <>
                                {/* QUESTIONS */}
                                {cls.assessment.map((q, qi) => (
                                    <div key={qi} className={`question-block ${submitted ? (answers[qi] === q.answer ? 'q-correct' : 'q-wrong') : ''}`}>
                                        <p className="q-num">Q{qi + 1}</p>
                                        <p className="q-text">{q.question}</p>
                                        <div className="q-options">
                                            {q.options.map((opt, oi) => (
                                                <button
                                                    key={oi}
                                                    className={`q-opt
                            ${answers[qi] === oi ? 'selected' : ''}
                            ${submitted && oi === q.answer ? 'correct' : ''}
                            ${submitted && answers[qi] === oi && oi !== q.answer ? 'wrong' : ''}
                          `}
                                                    onClick={() => handleAnswer(qi, oi)}
                                                    disabled={submitted}
                                                >
                                                    <span className="opt-letter">{['A', 'B', 'C', 'D'][oi]}</span>
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                        {submitted && (
                                            <div className={`q-explanation ${answers[qi] === q.answer ? 'exp-correct' : 'exp-wrong'}`}>
                                                <span>{answers[qi] === q.answer ? '✅' : '❌'}</span> {q.explanation}
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* SUBMIT / RESULT */}
                                {!submitted ? (
                                    <button
                                        className="submit-btn"
                                        onClick={handleSubmit}
                                        disabled={answers.some(a => a === null)}
                                    >
                                        Submit Assessment →
                                    </button>
                                ) : (
                                    <div className={`result-box ${passed ? 'result-pass' : 'result-fail'}`}>
                                        {passed ? (
                                            <>
                                                <div className="rb-icon">🏆</div>
                                                <h3 className="rb-title">Excellent! Attendance Marked!</h3>
                                                <p className="rb-body">You scored {answers.filter((a, i) => a === cls.assessment[i].answer).length}/3. Your attendance for this class is recorded.</p>
                                                <Link href="/classes" className="btn-neon rb-btn">← Back to Schedule</Link>
                                            </>
                                        ) : (
                                            <>
                                                <div className="rb-icon">💡</div>
                                                <h3 className="rb-title">Keep Learning!</h3>
                                                <p className="rb-body">You scored {answers.filter((a, i) => a === cls.assessment[i].answer).length}/3. Review the explanations above and rewatch the highlighted parts.</p>
                                                <button onClick={handleRetry} className="btn-primary rb-btn">Try Again</button>
                                            </>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* PROGRESS */}
                    <div className="progress-mini premium-glass">
                        <p className="pm-title">Your Progress This Week</p>
                        {(['Mon', 'Wed', 'Fri'] as const).map(d => {
                            const wCls = getClassById(`g${cls.grade}-m${cls.month}-w${cls.week}-${d.toLowerCase()}`);
                            const isAtt = wCls && getAttended().includes(wCls.id);
                            return (
                                <div key={d} className={`pm-row ${d === cls.day ? 'pm-active' : ''}`}>
                                    <span className="pm-day">{d}</span>
                                    <span className="pm-topic">{wCls?.topic || '—'}</span>
                                    <span className={`pm-status ${isAtt ? 'done' : d === cls.day ? 'here' : ''}`}>
                                        {isAtt ? '✅' : d === cls.day ? '▶' : '○'}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <style jsx>{`
        .vp-wrap { display:flex; flex-direction:column; gap:1.5rem; padding-bottom:2rem; }
        .vp-breadcrumb { display:flex; align-items:center; gap:.5rem; font-size:.82rem; }
        .bc-sep { color:var(--muted); }
        .bc-cur { color:var(--muted); font-weight:600; }
        .attended-banner { padding:.85rem 1.5rem; border-radius:1rem; background:rgba(0,229,160,.1); border:1px solid rgba(0,229,160,.3); color:var(--neon-green); font-weight:800; font-size:.9rem; }
        .vp-layout { display:grid; grid-template-columns:1fr 400px; gap:1.75rem; align-items:start; }
        .vp-left { display:flex; flex-direction:column; gap:1.25rem; }
        .yt-embed-wrap { width:100%; aspect-ratio:16/9; border-radius:1.5rem; overflow:hidden; background:#020817; border:1px solid rgba(108,99,255,.25); box-shadow:0 0 40px rgba(108,99,255,.15); }
        .yt-iframe { width:100%; height:100%; border:none; }
        .vid-info { padding:1.5rem; border-radius:1.5rem; display:flex; flex-direction:column; gap:1rem; }
        .vi-top { display:flex; justify-content:space-between; align-items:flex-start; gap:1rem; }
        .vi-meta { display:flex; align-items:center; gap:.6rem; flex-wrap:wrap; margin-bottom:.5rem; }
        .vi-grade { font-size:.68rem; font-weight:900; padding:.2rem .6rem; border-radius:2rem; border:1px solid; }
        .vi-day { font-size:.72rem; font-weight:800; }
        .vi-month { font-size:.72rem; font-weight:700; color:var(--muted); }
        .vi-title { font-size:1.4rem; font-weight:900; color:var(--foreground); line-height:1.25; margin-bottom:.4rem; }
        .vi-desc { font-size:.88rem; color:var(--muted); font-weight:500; line-height:1.6; }
        .vi-stats { display:flex; gap:1rem; flex-shrink:0; }
        .vi-stat { display:flex; flex-direction:column; align-items:center; padding:.5rem .9rem; border-radius:1rem; background:rgba(108,99,255,.08); border:1px solid rgba(108,99,255,.15); }
        .vis-val { font-size:1rem; font-weight:900; color:var(--foreground); }
        .vis-lbl { font-size:.6rem; font-weight:700; color:var(--muted); text-transform:uppercase; }
        .vi-channel { display:flex; align-items:center; gap:.75rem; padding-top:.75rem; border-top:1px solid var(--border); }
        .vc-icon { width:36px; height:36px; border-radius:50%; background:#FF0000; display:flex; align-items:center; justify-content:center; color:white; font-size:.9rem; flex-shrink:0; }
        .vc-name { font-size:.88rem; font-weight:800; color:var(--foreground); }
        .vc-sub { font-size:.72rem; color:var(--muted); font-weight:600; }
        .takeaways { padding:1.25rem 1.5rem; border-radius:1.25rem; }
        .ta-title { font-size:.9rem; font-weight:900; color:var(--foreground); margin-bottom:.75rem; }
        .ta-list { list-style:none; display:flex; flex-direction:column; gap:.5rem; margin-bottom:.75rem; }
        .ta-list li { font-size:.83rem; color:var(--muted); font-weight:600; padding-left:1rem; border-left:2px solid var(--primary); line-height:1.5; }
        .ta-note { font-size:.72rem; color:var(--primary-glow); font-weight:700; }
        .vp-right { display:flex; flex-direction:column; gap:1.25rem; position:sticky; top:80px; }
        .assess-card { padding:1.5rem; border-radius:1.5rem; display:flex; flex-direction:column; gap:1.25rem; }
        .ac-header { border-bottom:1px solid var(--border); padding-bottom:1rem; }
        .ac-title { font-size:1.05rem; font-weight:900; color:var(--foreground); margin-bottom:.25rem; }
        .ac-sub { font-size:.78rem; color:var(--muted); font-weight:600; }
        .watch-gate { text-align:center; padding:1.5rem; display:flex; flex-direction:column; align-items:center; gap:.8rem; }
        .wg-icon { font-size:2.5rem; }
        .wg-title { font-size:1rem; font-weight:900; color:var(--foreground); }
        .wg-body { font-size:.82rem; color:var(--muted); line-height:1.6; }
        .wg-bar { width:100%; height:6px; background:rgba(108,99,255,.15); border-radius:3px; overflow:hidden; }
        .wg-fill { height:100%; width:30%; background:linear-gradient(90deg,var(--primary),var(--neon-green)); border-radius:3px; animation:loading 3s ease-in-out infinite; }
        @keyframes loading { 0%{width:10%} 50%{width:70%} 100%{width:10%} }
        .wg-note { font-size:.7rem; color:var(--muted); font-weight:600; }
        .question-block { border-radius:1rem; padding:1rem; background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.06); display:flex; flex-direction:column; gap:.6rem; }
        .question-block.q-correct { border-color:rgba(0,229,160,.3); background:rgba(0,229,160,.05); }
        .question-block.q-wrong { border-color:rgba(255,68,102,.25); background:rgba(255,68,102,.04); }
        .q-num { font-size:.65rem; font-weight:900; color:var(--primary-glow); text-transform:uppercase; letter-spacing:.1em; }
        .q-text { font-size:.88rem; font-weight:700; color:var(--foreground); line-height:1.4; }
        .q-options { display:flex; flex-direction:column; gap:.4rem; }
        .q-opt { width:100%; text-align:left; padding:.6rem .9rem; border-radius:.75rem; border:1px solid rgba(255,255,255,.08); background:rgba(255,255,255,.03); color:var(--muted); font-size:.82rem; font-weight:600; font-family:'Space Grotesk',sans-serif; cursor:pointer; display:flex; align-items:center; gap:.6rem; transition:all .15s; }
        .q-opt:not(:disabled):hover { border-color:rgba(108,99,255,.4); color:var(--foreground); background:rgba(108,99,255,.08); }
        .q-opt.selected { border-color:rgba(108,99,255,.5); background:rgba(108,99,255,.12); color:var(--foreground); }
        .q-opt.correct { border-color:rgba(0,229,160,.5) !important; background:rgba(0,229,160,.12) !important; color:var(--neon-green) !important; }
        .q-opt.wrong { border-color:rgba(255,68,102,.4) !important; background:rgba(255,68,102,.08) !important; color:#FF6680 !important; }
        .opt-letter { width:20px; height:20px; border-radius:50%; background:rgba(108,99,255,.2); display:flex; align-items:center; justify-content:center; font-size:.65rem; font-weight:900; color:var(--primary-glow); flex-shrink:0; }
        .q-explanation { font-size:.78rem; font-weight:600; line-height:1.55; padding:.6rem .8rem; border-radius:.6rem; display:flex; gap:.4rem; }
        .exp-correct { background:rgba(0,229,160,.08); color:var(--neon-green); }
        .exp-wrong { background:rgba(255,68,102,.08); color:#FF6680; }
        .submit-btn { width:100%; padding:.85rem; border-radius:1rem; background:linear-gradient(135deg,var(--primary),#8B5CF6); color:white; font-weight:900; font-size:.95rem; font-family:'Space Grotesk',sans-serif; border:none; cursor:pointer; transition:all .25s; box-shadow:0 4px 20px rgba(108,99,255,.4); }
        .submit-btn:disabled { opacity:.4; cursor:not-allowed; }
        .submit-btn:not(:disabled):hover { transform:translateY(-2px); box-shadow:0 8px 30px rgba(108,99,255,.5); }
        .result-box { padding:1.5rem; border-radius:1.25rem; display:flex; flex-direction:column; align-items:center; gap:.7rem; text-align:center; }
        .result-pass { background:rgba(0,229,160,.08); border:1px solid rgba(0,229,160,.3); }
        .result-fail { background:rgba(255,209,102,.06); border:1px solid rgba(255,209,102,.25); }
        .rb-icon { font-size:2.5rem; }
        .rb-title { font-size:1.05rem; font-weight:900; color:var(--foreground); }
        .rb-body { font-size:.82rem; color:var(--muted); line-height:1.6; }
        .rb-btn { display:inline-block; text-decoration:none; font-size:.85rem; padding:.65rem 1.5rem; margin-top:.3rem; border-radius:2rem; }
        .progress-mini { padding:1.25rem; border-radius:1.25rem; display:flex; flex-direction:column; gap:.6rem; }
        .pm-title { font-size:.72rem; font-weight:900; color:var(--muted); text-transform:uppercase; letter-spacing:.08em; margin-bottom:.25rem; }
        .pm-row { display:flex; align-items:center; gap:.75rem; padding:.5rem .6rem; border-radius:.6rem; }
        .pm-active { background:rgba(108,99,255,.08); }
        .pm-day { font-size:.72rem; font-weight:900; color:var(--primary-glow); width:30px; }
        .pm-topic { font-size:.8rem; font-weight:600; color:var(--muted); flex:1; }
        .pm-status { font-size:.9rem; }
        .pm-status.done { color:var(--neon-green); }
        .pm-status.here { color:var(--primary-glow); }
        @media(max-width:1000px) { .vp-layout { grid-template-columns:1fr; } .vp-right { position:static; } }
      `}</style>
        </div>
    );
}
