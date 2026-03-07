"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

interface MonthModule {
    month: string;
    topic: string;
    type: "Theory" | "Quest";
    isUnlocked: boolean;
    status: "locked" | "current" | "passed" | "failed";
    score?: number;
}

export default function GradeBookDetail({ params }: { params: any }) {
    const grade = 8; // Simplified for MVP

    const [modules, setModules] = useState<MonthModule[]>([
        { month: "April", topic: "The Compound Interest: 8th Wonder", type: "Theory", isUnlocked: true, status: "passed", score: 85 },
        { month: "May", topic: "Inflation: The Hidden Thief", type: "Theory", isUnlocked: true, status: "current" },
        { month: "June", topic: "Summer Quest: Expense Audit", type: "Quest", isUnlocked: false, status: "locked" },
        { month: "July", topic: "Budgeting 50/30/20 Rule", type: "Theory", isUnlocked: false, status: "locked" },
    ]);

    const [wealth, setWealth] = useState(850);
    const EXAM_FEE = 1000;

    return (
        <div className="book-detail-container">
            <header className="book-header">
                <Link href="/library" className="back-link">← Return to Library</Link>
                <div className="header-main">
                    <div className="title-group">
                        <span className="grade-ref">Class {grade} Syllabus</span>
                        <h1 className="gradient-text">The Strategist</h1>
                    </div>
                    <div className="wallet-card premium-glass">
                        <span className="wallet-label">Virtual Wallet</span>
                        <span className="wallet-val">₹{wealth}</span>
                        <p className="status-note">
                            {wealth < EXAM_FEE ? `Need ₹${EXAM_FEE - wealth} more for Final Exam fee` : "Exam fee collected! ✅"}
                        </p>
                    </div>
                </div>
            </header>

            <div className="syllabus-grid">
                <section className="timeline premium-glass">
                    <h2>Academic Roadmap (March - Feb)</h2>
                    <div className="module-list">
                        {modules.map((mod, idx) => (
                            <div key={mod.month} className={`module-item ${mod.status}`}>
                                <div className="module-visual">
                                    <div className="status-icon">
                                        {mod.status === 'passed' ? '✅' : mod.status === 'locked' ? '🔒' : '📍'}
                                    </div>
                                    {idx < modules.length - 1 && <div className="connector"></div>}
                                </div>
                                <div className="module-content">
                                    <div className="mod-info">
                                        <span className="month-tag">{mod.month}</span>
                                        <h3>{mod.topic}</h3>
                                        {mod.score && <span className="score-badge">Mastery: {mod.score}%</span>}
                                    </div>
                                    {mod.status === 'current' ? (
                                        <button className="btn-primary">Start Module</button>
                                    ) : mod.status === 'locked' ? (
                                        <span className="lock-text">Master {modules[idx - 1]?.month} to unlock</span>
                                    ) : (
                                        <button className="btn-outline">Review Material</button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <aside className="exam-card premium-glass">
                    <div className="exam-header">
                        <span className="icon">🎓</span>
                        <h2>March Final Exam</h2>
                    </div>
                    <p className="exam-desc">Comprehensive certification covering all 12 modules. Requires 70% to graduate to Class 9.</p>
                    <div className="fee-requirement">
                        <div className="fee-row">
                            <span>Required Fee:</span>
                            <span className="bold">₹{EXAM_FEE}</span>
                        </div>
                        <div className="fee-row">
                            <span>Your Balance:</span>
                            <span className={`bold ${wealth < EXAM_FEE ? 'red' : 'green'}`}>₹{wealth}</span>
                        </div>
                    </div>
                    <button className="btn-secondary w-full" disabled={wealth < EXAM_FEE}>
                        {wealth < EXAM_FEE ? "Insufficient Funds" : "Register for Exam"}
                    </button>
                </aside>
            </div>

            <style jsx>{`
        .book-detail-container { display: flex; flex-direction: column; gap: 3rem; }
        .back-link { color: var(--primary); font-weight: 700; text-decoration: none; margin-bottom: 1rem; display: block; }
        .header-main { display: flex; justify-content: space-between; align-items: flex-start; }
        .grade-ref { font-weight: 800; color: #64748b; text-transform: uppercase; font-size: 0.8rem; }
        h1 { font-size: 3rem; font-weight: 900; }
        
        .wallet-card { padding: 1.5rem; border-radius: 1.5rem; text-align: right; }
        .wallet-label { display: block; font-size: 0.75rem; font-weight: 800; color: #64748b; }
        .wallet-val { font-size: 2rem; font-weight: 900; color: var(--secondary); }
        .status-note { font-size: 0.75rem; font-weight: 600; color: #475569; }

        .syllabus-grid { display: grid; grid-template-columns: 1fr 320px; gap: 2rem; }
        .timeline { padding: 2.5rem; border-radius: 2.5rem; }
        h2 { font-size: 1.5rem; font-weight: 800; margin-bottom: 2.5rem; }

        .module-list { display: flex; flex-direction: column; gap: 0; }
        .module-item { display: flex; gap: 2rem; min-height: 120px; }
        
        .module-visual { display: flex; flex-direction: column; align-items: center; width: 40px; }
        .status-icon { 
          width: 40px; height: 40px; border-radius: 50%; 
          display: flex; align-items: center; justify-content: center; 
          background: #f1f5f9; z-index: 2; 
        }
        .connector { width: 2px; flex: 1; background: #e2e8f0; margin: 5px 0; }
        .passed .status-icon { background: #dcfce7; }
        .passed .connector { background: var(--secondary); }
        .current .status-icon { background: var(--primary-glow); border: 2px solid var(--primary); }

        .module-content { flex: 1; display: flex; justify-content: space-between; align-items: center; padding-bottom: 2rem; }
        .mod-info h3 { font-size: 1.25rem; font-weight: 800; margin-top: 0.25rem; }
        .month-tag { font-size: 0.75rem; font-weight: 800; color: var(--primary); text-transform: uppercase; }
        .score-badge { font-size: 0.8rem; font-weight: 700; color: var(--secondary); }
        
        .locked .module-content { opacity: 0.5; }
        .lock-text { font-size: 0.8rem; font-weight: 700; color: #94a3b8; }

        .exam-card { padding: 2.5rem; border-radius: 2rem; align-self: flex-start; }
        .exam-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
        .exam-header .icon { font-size: 2rem; }
        .exam-desc { font-size: 0.9rem; color: #64748b; line-height: 1.5; margin-bottom: 2rem; }
        .fee-requirement { background: #f8fafc; padding: 1.5rem; border-radius: 1rem; margin-bottom: 2rem; }
        .fee-row { display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.9rem; }
        .bold { font-weight: 800; }
        .red { color: #ef4444; }
        .green { color: var(--secondary); }
        .w-full { width: 100%; height: 3.5rem; }

        @media (max-width: 1024px) { .syllabus-grid { grid-template-columns: 1fr; } }
      `}</style>
        </div>
    );
}
