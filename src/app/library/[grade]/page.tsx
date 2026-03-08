"use client";
import SubscriberLock from "@/components/SubscriberLock";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { syllabusData, SyllabusModule, LessonStep, UnitTestQuestion } from "@/data/curriculum";

export default function GradeBookDetail() {
    const params = useParams();
    const grade = parseInt(params.grade as string, 10);
    const syllabus = syllabusData[grade];

    const [activeModule, setActiveModule] = useState<SyllabusModule | null>(null);
    const [stepIdx, setStepIdx] = useState(0);
    const [inTest, setInTest] = useState(false);
    const [testAnswers, setTestAnswers] = useState<Record<number, number>>({});
    const [testSubmitted, setTestSubmitted] = useState(false);

    if (!syllabus) {
        return (
            <div style={{ padding: "4rem", textAlign: "center" }}>
                <Link href="/library" style={{ color: "var(--primary)", fontWeight: 700 }}>← Return to Library</Link>
                <h1 style={{ marginTop: "2rem" }}>Grade {grade} book not found.</h1>
            </div>
        );
    }

    const openModule = (mod: SyllabusModule) => {
        if (mod.status === "locked") return;
        setActiveModule(mod);
        setStepIdx(0);
        setInTest(false);
        setTestAnswers({});
        setTestSubmitted(false);
    };

    const closeModal = () => setActiveModule(null);
    const currentStep: LessonStep | undefined = activeModule?.steps[stepIdx];
    const questions: UnitTestQuestion[] = activeModule?.unitTest || [];

    const score = testSubmitted
        ? questions.filter((q, i) => testAnswers[i] === q.correct).length
        : 0;

    const handleAnswer = (qi: number, ai: number) => {
        if (testSubmitted) return;
        setTestAnswers(prev => ({ ...prev, [qi]: ai }));
    };

    const submitTest = () => setTestSubmitted(true);

    const md = (text: string) =>
        text
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/g, "<em>$1</em>");

    return (
        <SubscriberLock title={`${syllabus.bookTitle} Access`} featureName={`Class ${grade} Curriculum`}>
            <div className="page-wrap">
                {/* ── MODAL ── */}
                {activeModule && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <div className="lesson-modal" onClick={e => e.stopPropagation()}>
                            <button className="close-btn" onClick={closeModal}>×</button>

                            {/* Header bar */}
                            <div className="modal-topbar">
                                <span className="modal-tag">Class {grade} · {activeModule.month}</span>
                                <div className="modal-tabs">
                                    <button className={`tab-btn ${!inTest ? "active" : ""}`} onClick={() => setInTest(false)}>📖 Lesson</button>
                                    {questions.length > 0 && (
                                        <button className={`tab-btn ${inTest ? "active" : ""}`} onClick={() => { setInTest(true); setTestSubmitted(false); setTestAnswers({}); }}>📝 Unit Test</button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* ── LESSON TAB ── */}
                        {!inTest && currentStep && (
                            <>
                                {/* Progress dots */}
                                <div className="modal-progress">
                                    {activeModule.steps.map((_, i) => (
                                        <button key={i} className={`progress-dot ${i <= stepIdx ? "active" : ""}`} onClick={() => setStepIdx(i)} />
                                    ))}
                                </div>

                                <h2 className="step-title">{currentStep.title}</h2>

                                {/* Story card */}
                                {currentStep.story && (
                                    <div className="story-card">
                                        <span className="story-label">📚 Story</span>
                                        <p>{currentStep.story}</p>
                                    </div>
                                )}

                                {/* Image */}
                                {currentStep.image && (
                                    <div className="step-img-wrap">
                                        <img src={currentStep.image} alt={currentStep.title} />
                                    </div>
                                )}

                                {/* Body */}
                                <div className="step-body">
                                    {currentStep.body.split("\n").map((para, i) =>
                                        para.trim()
                                            ? <p key={i} dangerouslySetInnerHTML={{ __html: md(para) }} />
                                            : <hr key={i} className="para-sep" />
                                    )}
                                </div>

                                {currentStep.funFact && (
                                    <div className="fun-fact-box">
                                        <span className="badge-label">💡 Did You Know?</span>
                                        <p dangerouslySetInnerHTML={{ __html: md(currentStep.funFact) }} />
                                    </div>
                                )}

                                {currentStep.activity && (
                                    <div className="activity-box">
                                        <span className="badge-label">🏠 Home Activity</span>
                                        <p>{currentStep.activity}</p>
                                    </div>
                                )}

                                {/* Footer nav */}
                                <div className="modal-footer">
                                    <div className="pro-tip-bar">
                                        <strong>🎯 Pro-Tip:</strong> {activeModule.proTip}
                                    </div>
                                    <div className="modal-nav">
                                        <button className="btn-outline" onClick={() => setStepIdx(i => i - 1)} disabled={stepIdx === 0}>← Prev</button>
                                        <span className="step-counter">{stepIdx + 1} / {activeModule.steps.length}</span>
                                        {stepIdx < activeModule.steps.length - 1
                                            ? <button className="btn-primary" onClick={() => setStepIdx(i => i + 1)}>Next →</button>
                                            : questions.length > 0
                                                ? <button className="btn-primary" onClick={() => { setInTest(true); setTestSubmitted(false); setTestAnswers({}); }}>Take Unit Test 📝</button>
                                                : <button className="btn-primary" onClick={closeModal}>Finish ✅</button>
                                        }
                                    </div>
                                </div>
                            </>
                        )}

                        {/* ── UNIT TEST TAB ── */}
                        {inTest && (
                            <div className="test-container">
                                <h2 className="step-title">Monthly Unit Test — {activeModule.month}</h2>
                                <p className="test-subtitle">{questions.length} Questions · Score 4/5 to pass</p>

                                {questions.map((q, qi) => {
                                    const answered = testAnswers[qi] !== undefined;
                                    const isCorrect = testSubmitted && testAnswers[qi] === q.correct;
                                    const isWrong = testSubmitted && answered && testAnswers[qi] !== q.correct;
                                    return (
                                        <div key={qi} className={`question-card ${testSubmitted ? (isCorrect ? "correct" : isWrong ? "wrong" : "unanswered") : ""}`}>
                                            <p className="question-text"><strong>Q{qi + 1}.</strong> {q.q}</p>
                                            <div className="options-grid">
                                                {q.options.map((opt, ai) => {
                                                    const picked = testAnswers[qi] === ai;
                                                    const showCorrect = testSubmitted && ai === q.correct;
                                                    return (
                                                        <button
                                                            key={ai}
                                                            className={`option-btn ${picked ? "picked" : ""} ${showCorrect ? "correct-opt" : ""} ${testSubmitted && picked && ai !== q.correct ? "wrong-opt" : ""}`}
                                                            onClick={() => handleAnswer(qi, ai)}
                                                        >
                                                            {opt}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                            {testSubmitted && (
                                                <div className="explanation-box">
                                                    <strong>💡 Explanation:</strong> {q.explanation}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}

                                {!testSubmitted ? (
                                    <button
                                        className="btn-primary submit-btn"
                                        onClick={submitTest}
                                        disabled={Object.keys(testAnswers).length < questions.length}
                                    >
                                        Submit Answers ({Object.keys(testAnswers).length}/{questions.length} answered)
                                    </button>
                                ) : (
                                    <div className={`test-result ${score >= 4 ? "pass" : "fail"}`}>
                                        <span className="result-emoji">{score >= 4 ? "🏆" : "💡"}</span>
                                        <h3>{score >= 4 ? "Excellent! You Passed!" : "Keep Learning!"}</h3>
                                        <p>Score: {score}/{questions.length} · {Math.round((score / questions.length) * 100)}%</p>
                                        {score < 4 && <p>Review the lesson and try again. Every attempt builds understanding!</p>}
                                        <button className="btn-outline" onClick={closeModal}>Close</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

            {/* ── PAGE HEADER ── */}
            <Link href="/library" className="back-link">← Return to Library</Link>
            <div className="page-header">
                <div>
                    <span className="grade-ref">Class {grade} — {syllabus.subtitle}</span>
                    <h1 className="gradient-text">{syllabus.bookTitle}</h1>
                    {syllabus.complexityNote && <p className="complexity-note">{syllabus.complexityNote}</p>}
                </div>
                <div className="month-count-badge">
                    <span className="big-num">{syllabus.modules.length}</span>
                    <span className="small-text">Monthly<br />Modules</span>
                </div>
            </div>

            {/* ── MODULE LIST ── */}
            <div className="syllabus-grid">
                <section className="timeline premium-glass">
                    <h2>Annual Roadmap — March to February</h2>
                    <div className="module-list">
                        {syllabus.modules.map((mod, idx) => (
                            <div key={mod.month} className={`module-row ${mod.status}`}>
                                <div className="module-col-left">
                                    <div className="status-dot">
                                        {mod.status === "passed" ? "✅" : mod.status === "current" ? "📍" : "🔒"}
                                    </div>
                                    {idx < syllabus.modules.length - 1 && <div className="connector" />}
                                </div>
                                <div className="module-col-right">
                                    <div className="module-meta">
                                        <span className="month-badge">{mod.month}</span>
                                        <span className={`type-pill ${mod.type === "Summer Activity" ? "summer" : mod.type === "Unit Test" ? "test-pill" : "theory"}`}>
                                            {mod.type === "Summer Activity" ? "☀️ Summer" : mod.type === "Unit Test" ? "📝 Annual Test" : mod.type}
                                        </span>
                                        {mod.unitTest && mod.unitTest.length > 0 && (
                                            <span className="has-test-badge">✏️ Has Unit Test</span>
                                        )}
                                    </div>
                                    <h3 className="module-topic">{mod.topic}</h3>
                                    {mod.score && <div className="score-bar"><div className="score-fill" style={{ width: `${mod.score}%` }} /><span>{mod.score}%</span></div>}
                                    <p className="step-preview">{mod.steps.length} steps{mod.unitTest ? ` · ${mod.unitTest.length} test questions` : ""}</p>
                                    {mod.status !== "locked"
                                        ? <button className="btn-primary mod-btn" onClick={() => openModule(mod)}>{mod.status === "passed" ? "Review ↩" : "Start →"}</button>
                                        : <span className="lock-txt">🔒 Complete previous module</span>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <aside className="side-panel">
                    <div className="stat-card premium-glass">
                        <h3>📊 Progress Overview</h3>
                        <div className="stat-row"><span>Total Months</span><strong>{syllabus.modules.length}</strong></div>
                        <div className="stat-row"><span>With Unit Tests</span><strong>{syllabus.modules.filter(m => m.unitTest?.length).length}</strong></div>
                        <div className="stat-row"><span>Summer Activities</span><strong>{syllabus.modules.filter(m => m.type === "Summer Activity").length}</strong></div>
                        <div className="stat-row"><span>Passed</span><strong className="green">{syllabus.modules.filter(m => m.status === "passed").length}</strong></div>
                        <div className="stat-row"><span>In Progress</span><strong className="blue">{syllabus.modules.filter(m => m.status === "current").length}</strong></div>
                    </div>
                    <div className="tip-card premium-glass">
                        <h3>💡 Monthly Tips</h3>
                        <ul>
                            {syllabus.modules.filter(m => m.status !== "locked").map(m => (
                                <li key={m.month}><strong>{m.month}:</strong> {m.proTip}</li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </div>
        </div>

            <style jsx>{`
        .page-wrap{display:flex;flex-direction:column;gap:2rem;}
        .back-link{color:var(--primary);font-weight:700;text-decoration:none;font-size:0.9rem;}
        .page-header{display:flex;justify-content:space-between;align-items:flex-start;gap:2rem;}
        .grade-ref{font-size:0.75rem;font-weight:900;color:#64748b;text-transform:uppercase;letter-spacing:.08em;display:block;margin-bottom:.4rem;}
        h1{font-size:2.8rem;font-weight:900;}
        .complexity-note{font-size:.85rem;color:#64748b;font-style:italic;margin-top:.4rem;}
        .month-count-badge{display:flex;flex-direction:column;align-items:center;background:linear-gradient(135deg,var(--primary),var(--secondary));border-radius:1.5rem;padding:1.2rem 1.8rem;color:white;flex-shrink:0;}
        .big-num{font-size:3rem;font-weight:900;line-height:1;}
        .small-text{font-size:.7rem;font-weight:700;text-align:center;opacity:.8;margin-top:.3rem;}

        .syllabus-grid{display:grid;grid-template-columns:1fr 300px;gap:2rem;align-items:start;}
        .timeline{padding:2rem;border-radius:2rem;}
        .timeline h2{font-size:1.3rem;font-weight:800;margin-bottom:2rem;}
        .module-list{display:flex;flex-direction:column;}

        .module-row{display:flex;gap:1.5rem;min-height:130px;}
        .module-col-left{display:flex;flex-direction:column;align-items:center;width:36px;flex-shrink:0;}
        .status-dot{width:36px;height:36px;border-radius:50%;background:#f1f5f9;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;z-index:2;}
        .connector{width:2px;flex:1;background:#e2e8f0;margin:4px 0;}
        .passed .status-dot{background:#dcfce7;}
        .passed .connector{background:var(--secondary);}
        .current .status-dot{background:#eef2ff;border:2px solid var(--primary);}
        .locked{opacity:.6;}

        .module-col-right{flex:1;padding-bottom:1.5rem;}
        .module-meta{display:flex;align-items:center;gap:.5rem;margin-bottom:.4rem;flex-wrap:wrap;}
        .month-badge{font-size:.7rem;font-weight:900;color:var(--primary);text-transform:uppercase;letter-spacing:.06em;}
        .type-pill{font-size:.6rem;font-weight:900;padding:.2rem .5rem;border-radius:.4rem;text-transform:uppercase;}
        .type-pill.theory{background:#eef2ff;color:var(--primary);}
        .type-pill.summer{background:#fef3c7;color:#92400e;}
        .type-pill.test-pill{background:#fce7f3;color:#be185d;}
        .has-test-badge{font-size:.6rem;font-weight:800;padding:.2rem .5rem;border-radius:.4rem;background:#f0fdf4;color:#15803d;}
        .module-topic{font-size:1rem;font-weight:800;color:#1e293b;margin-bottom:.3rem;line-height:1.3;}
        .score-bar{display:flex;align-items:center;gap:.5rem;margin:.3rem 0;}
        .score-bar > div{height:6px;background:linear-gradient(90deg,var(--primary),var(--secondary));border-radius:3px;}
        .score-bar span{font-size:.7rem;font-weight:700;color:var(--secondary);}
        .step-preview{font-size:.72rem;color:#94a3b8;font-weight:600;margin:.2rem 0 .6rem;}
        .mod-btn{padding:.5rem 1.2rem;font-size:.85rem;}
        .lock-txt{font-size:.75rem;font-weight:700;color:#94a3b8;}

        .side-panel{display:flex;flex-direction:column;gap:1rem;}
        .stat-card,.tip-card{padding:1.5rem;border-radius:1.5rem;}
        .stat-card h3,.tip-card h3{font-size:.95rem;font-weight:800;margin-bottom:1rem;}
        .stat-row{display:flex;justify-content:space-between;font-size:.82rem;padding:.3rem 0;border-bottom:1px solid #f1f5f9;font-weight:600;color:#475569;}
        .stat-row strong{color:#1e293b;}
        .stat-row .green{color:#22c55e;}
        .stat-row .blue{color:var(--primary);}
        .tip-card ul{list-style:none;padding:0;display:flex;flex-direction:column;gap:.6rem;}
        .tip-card li{font-size:.75rem;color:#475569;line-height:1.4;}

        /* Modal */
        .modal-overlay{position:fixed;inset:0;background:rgba(15,23,42,.88);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;z-index:1000;padding:1rem;}
        .lesson-modal{background:rgb(10,15,44);background:linear-gradient(160deg,#0D1535 0%,#0A0F2C 100%);border:1px solid rgba(108,99,255,0.3);width:100%;max-width:840px;max-height:90vh;border-radius:2.5rem;padding:2.5rem;position:relative;overflow-y:auto;box-shadow:0 40px 100px rgba(0,0,0,0.8),0 0 80px rgba(108,99,255,0.15);scrollbar-width:thin;scrollbar-color:rgba(108,99,255,0.4) transparent;}
        .close-btn{position:absolute;top:1.5rem;right:1.5rem;background:#f1f5f9;border:none;width:44px;height:44px;border-radius:50%;font-size:1.5rem;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#1e293b;}
        .modal-topbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;padding-right:3rem;}
        .modal-tag{font-size:.72rem;font-weight:900;color:var(--primary);text-transform:uppercase;letter-spacing:.1em;}
        .modal-tabs{display:flex;gap:.5rem;}
        .tab-btn{padding:.4rem 1rem;border-radius:2rem;border:1.5px solid #e2e8f0;background:white;font-size:.8rem;font-weight:700;cursor:pointer;color:#64748b;transition:all .2s;}
        .tab-btn.active{background:var(--primary);color:white;border-color:var(--primary);}
        .modal-progress{display:flex;gap:.4rem;margin-bottom:1.5rem;}
        .progress-dot{flex:1;height:5px;background:#e2e8f0;border-radius:3px;border:none;cursor:pointer;transition:background .2s;}
        .progress-dot.active{background:var(--primary);}
        .step-title{font-size:1.8rem;font-weight:900;color:#1e293b;margin-bottom:1.5rem;line-height:1.25;}

        .story-card{background:linear-gradient(135deg,#fffbeb,#fef3c7);border:1.5px solid #fde68a;border-radius:1.25rem;padding:1.25rem 1.5rem;margin-bottom:1.5rem;}
        .story-label{font-size:.7rem;font-weight:900;color:#92400e;text-transform:uppercase;letter-spacing:.06em;display:block;margin-bottom:.5rem;}
        .story-card p{font-size:.9rem;color:#78350f;font-weight:500;line-height:1.7;margin:0;font-style:italic;}

        .step-img-wrap{border-radius:1.5rem;overflow:hidden;margin-bottom:1.5rem;border:1px solid #e2e8f0;}
        .step-img-wrap img{width:100%;height:280px;object-fit:cover;display:block;}
        .step-body{color:#334155;line-height:1.8;margin-bottom:1.5rem;}
        .step-body p{margin-bottom:.75rem;font-size:.97rem;}
        .para-sep{border:none;border-top:1px solid #f1f5f9;margin:.75rem 0;}
        .fun-fact-box{background:linear-gradient(135deg,#f0fdf4,#dcfce7);border:1.5px solid #86efac;border-radius:1.25rem;padding:1.25rem 1.5rem;margin-bottom:1.25rem;}
        .activity-box{background:linear-gradient(135deg,#f0f9ff,#e0f2fe);border:1.5px dashed #38bdf8;border-radius:1.25rem;padding:1.25rem 1.5rem;margin-bottom:1.25rem;}
        .badge-label{font-size:.7rem;font-weight:900;text-transform:uppercase;letter-spacing:.06em;display:block;margin-bottom:.5rem;}
        .fun-fact-box .badge-label{color:#15803d;}
        .activity-box .badge-label{color:#0369a1;}
        .fun-fact-box p,.activity-box p{font-size:.88rem;font-weight:600;line-height:1.5;margin:0;}
        .fun-fact-box p{color:#166534;}
        .activity-box p{color:#0284c7;}
        .pro-tip-bar{background:#f8fafc;padding:1rem 1.25rem;border-radius:1rem;font-size:.83rem;color:#475569;border-left:3px solid var(--primary);margin-bottom:1.25rem;}
        .modal-nav{display:flex;align-items:center;justify-content:space-between;gap:1rem;}
        .step-counter{font-size:.82rem;font-weight:700;color:#94a3b8;}

        /* Unit Test */
        .test-container{display:flex;flex-direction:column;gap:1.5rem;}
        .test-subtitle{font-size:.85rem;color:#64748b;font-weight:600;margin-top:-.5rem;}
        .question-card{background:#f8fafc;border-radius:1.25rem;padding:1.5rem;border:1.5px solid #e2e8f0;}
        .question-card.correct{border-color:#86efac;background:#f0fdf4;}
        .question-card.wrong{border-color:#fca5a5;background:#fff5f5;}
        .question-text{font-size:.95rem;font-weight:700;color:#1e293b;margin-bottom:1rem;}
        .options-grid{display:grid;grid-template-columns:1fr 1fr;gap:.6rem;margin-bottom:1rem;}
        .option-btn{padding:.7rem 1rem;border-radius:.75rem;border:1.5px solid #e2e8f0;background:white;font-size:.82rem;font-weight:600;cursor:pointer;text-align:left;color:#334155;transition:all .15s;}
        .option-btn:hover:not(:disabled){background:#eef2ff;border-color:var(--primary);}
        .option-btn.picked{background:#eef2ff;border-color:var(--primary);color:var(--primary);}
        .option-btn.correct-opt{background:#dcfce7!important;border-color:#22c55e!important;color:#15803d!important;}
        .option-btn.wrong-opt{background:#fee2e2!important;border-color:#ef4444!important;color:#b91c1c!important;}
        .explanation-box{background:#f1f5f9;border-radius:.75rem;padding:.75rem 1rem;font-size:.8rem;color:#475569;font-weight:500;}
        .submit-btn{width:100%;padding:1rem;font-size:1rem;margin-top:.5rem;}
        .test-result{text-align:center;padding:2rem;border-radius:1.5rem;margin-top:1rem;}
        .test-result.pass{background:linear-gradient(135deg,#f0fdf4,#dcfce7);border:1.5px solid #86efac;}
        .test-result.fail{background:linear-gradient(135deg,#fffbeb,#fef3c7);border:1.5px solid #fde68a;}
        .result-emoji{font-size:3rem;display:block;margin-bottom:1rem;}
        .test-result h3{font-size:1.5rem;font-weight:900;margin-bottom:.5rem;}
        .test-result p{color:#475569;font-size:.9rem;font-weight:600;margin-bottom:.5rem;}
        .modal-footer{margin-top:1.5rem;}

        @media(max-width:900px){.syllabus-grid{grid-template-columns:1fr;}.options-grid{grid-template-columns:1fr;}.page-header{flex-direction:column;}}
      `}</style>
        </SubscriberLock>
    );
}
