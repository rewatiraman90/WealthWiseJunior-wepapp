"use client";

import { useState } from 'react';

export default function IndependenceChecklist() {
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Individual PAN Card', cat: 'Legal', completed: false, tip: 'Essential for all bank accounts and tax filings.' },
        { id: 2, text: 'Aadhaar Mobile Link', cat: 'Legal', completed: false, tip: 'Needed for instant Paperless e-KYC.' },
        { id: 3, text: 'Individual Savings Account', cat: 'Banking', completed: false, tip: 'Move away from Junior/Joint accounts.' },
        { id: 4, text: 'Demat Account (Zerodha/Groww)', cat: 'Investment', completed: false, tip: 'Required to start an Index Fund SIP.' },
        { id: 5, text: 'Individual UPI ID', cat: 'Digital', completed: false, tip: 'Primary tool for receiving freelance payments.' },
        { id: 6, text: 'LinkedIn Profile Audit', cat: 'Digital', completed: false, tip: 'Personal branding for the future.' },
    ]);

    const toggleTask = (id: number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const progress = Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100);

    return (
        <div className="checklist-card premium-glass">
            <div className="card-header">
                <div className="header-info">
                    <h3>Level 18: Financial Adulting</h3>
                    <p>Your "Paper Identity" is the gateway to freedom.</p>
                </div>
                <div className="progress-circle">
                    <span className="percent">{progress}%</span>
                    <svg viewBox="0 0 36 36" className="circular-chart">
                        <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="circle" style={{ strokeDasharray: `${progress}, 100` }} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                </div>
            </div>

            <div className="task-list">
                {tasks.map(task => (
                    <div key={task.id} className={`task-item ${task.completed ? 'done' : ''}`} onClick={() => toggleTask(task.id)}>
                        <div className="checkbox">
                            {task.completed && <span>✓</span>}
                        </div>
                        <div className="task-content">
                            <div className="task-meta">
                                <span className="cat">{task.cat}</span>
                                <span className="task-name">{task.text}</span>
                            </div>
                            <p className="tip">{task.tip}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="outcome-banner">
                <p>"A 20-year-old with a Demat account and a skill is more powerful than a 25-year-old with just a degree."</p>
            </div>

            <style jsx>{`
        .checklist-card { padding: 2rem; border-radius: 2rem; background: #1e1b4b; color: white; border: 1px solid rgba(255,255,255,0.1); }
        .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        h3 { font-size: 1.5rem; font-weight: 800; color: #fbbf24; margin-bottom: 0.2rem; }
        p { color: #94a3b8; font-size: 0.9rem; }
        .progress-circle { position: relative; width: 60px; height: 60px; }
        .percent { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-weight: 800; font-size: 0.8rem; color: #fbbf24; }
        .circular-chart { display: block; margin: 0 auto; max-width: 100%; max-height: 100%; }
        .circle-bg { fill: none; stroke: rgba(255,255,255,0.1); stroke-width: 3.8; }
        .circle { fill: none; stroke: #fbbf24; stroke-width: 3.8; stroke-linecap: round; transition: stroke-dasharray 0.3s ease; }
        .task-list { display: flex; flex-direction: column; gap: 1rem; }
        .task-item { display: flex; gap: 1rem; padding: 1rem; background: rgba(255,255,255,0.05); border-radius: 1rem; cursor: pointer; transition: all 0.2s; border: 1px solid transparent; }
        .task-item:hover { background: rgba(255,255,255,0.1); border-color: rgba(251,191,36,0.2); }
        .task-item.done { opacity: 0.6; border-color: transparent; }
        .checkbox { width: 24px; height: 24px; border: 2px solid #fbbf24; border-radius: 0.5rem; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-weight: 900; color: #fbbf24; }
        .task-content { flex-grow: 1; }
        .task-meta { display: flex; align-items: center; gap: 0.8rem; margin-bottom: 0.3rem; }
        .cat { font-size: 0.65rem; font-weight: 900; text-transform: uppercase; background: rgba(251,191,36,0.1); color: #fbbf24; padding: 0.1rem 0.4rem; border-radius: 0.3rem; }
        .task-name { font-weight: 700; font-size: 1rem; }
        .tip { font-size: 0.75rem; color: #64748b; line-height: 1.4; }
        .outcome-banner { margin-top: 2rem; padding: 1rem; background: linear-gradient(90deg, #fbbf2422, transparent); border-left: 4px solid #fbbf24; }
        .outcome-banner p { font-style: italic; color: #d1d5db; font-size: 0.85rem; }
      `}</style>
        </div>
    );
}
