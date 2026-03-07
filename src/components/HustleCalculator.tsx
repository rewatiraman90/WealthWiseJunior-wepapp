"use client";

import { useState, useEffect } from 'react';

export default function HustleCalculator() {
    const [studyHours, setStudyHours] = useState(8);
    const [hustleHours, setHustleHours] = useState(2);
    const [userProfile, setUserProfile] = useState<any>(null);

    useEffect(() => {
        const saved = localStorage.getItem('wwj_profile');
        if (saved) setUserProfile(JSON.parse(saved));
    }, []);

    const isClass12 = userProfile?.grade === "12" || userProfile?.grade === 12;

    if (!isClass12) return null;

    const calculateRisk = () => {
        if (hustleHours === 0) return { label: 'Extremely High', color: '#ef4444', text: '100% dependent on exam success. No backup plan.' };
        if (hustleHours < 2) return { label: 'High', color: '#f59e0b', text: 'Low margin for error if exam attempt fails.' };
        return { label: 'Balanced', color: '#10b981', text: 'Building a ₹50k/mo skill while studying. Secure future.' };
    };

    const risk = calculateRisk();

    return (
        <div className="calculator-card premium-glass">
            <div className="calc-header">
                <div className="icon">⚖️</div>
                <h3>Govt. Aspirant's Survival Math</h3>
            </div>

            <p className="description">Balance your primary goal with a freedom-fund side-hustle.</p>

            <div className="sliders">
                <div className="slider-group">
                    <div className="label-row">
                        <span>Primary Study / Prep</span>
                        <span className="val">{studyHours} hrs</span>
                    </div>
                    <input
                        type="range" min="4" max="14" value={studyHours}
                        onChange={(e) => setStudyHours(parseInt(e.target.value))}
                    />
                </div>

                <div className="slider-group">
                    <div className="label-row">
                        <span>Skill Building / Hustle</span>
                        <span className="val">{hustleHours} hrs</span>
                    </div>
                    <input
                        type="range" min="0" max="4" value={hustleHours}
                        onChange={(e) => setHustleHours(parseInt(e.target.value))}
                    />
                </div>
            </div>

            <div className="risk-indicator" style={{ borderLeft: `6px solid ${risk.color}` }}>
                <div className="risk-header">
                    <span className="label">Career Gap Anxiety Risk:</span>
                    <span className="status" style={{ color: risk.color }}>{risk.label}</span>
                </div>
                <p className="risk-text">{risk.text}</p>
            </div>

            <div className="pro-tip">
                <span className="badge">Pro Tip</span>
                <p>Learn a "Compound Skill" like SEO, UI/UX, or Video Editing. It earns money even if the government exam attempt fails.</p>
            </div>

            <style jsx>{`
        .calculator-card { padding: 2rem; border-radius: 2rem; background: white; border: 1px solid var(--border); }
        .calc-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem; }
        .calc-header .icon { font-size: 1.5rem; }
        h3 { font-size: 1.25rem; font-weight: 800; }
        .description { color: #64748b; font-size: 0.875rem; margin-bottom: 2rem; }
        .sliders { display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 2rem; }
        .slider-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .label-row { display: flex; justify-content: space-between; font-weight: 700; font-size: 0.9rem; }
        .val { color: var(--primary); }
        input[type="range"] { width: 100%; accent-color: var(--primary); }
        .risk-indicator { background: #f8fafc; padding: 1.2rem; border-radius: 1rem; margin-bottom: 1.5rem; }
        .risk-header { display: flex; justify-content: space-between; font-weight: 800; font-size: 0.8rem; margin-bottom: 0.5rem; text-transform: uppercase; }
        .risk-text { font-size: 0.95rem; color: #1e293b; font-weight: 600; }
        .pro-tip { display: flex; align-items: flex-start; gap: 1rem; background: #fffbeb; padding: 1rem; border-radius: 1rem; border: 1px solid #fde68a; }
        .badge { background: #f59e0b; color: white; font-size: 0.65rem; font-weight: 900; padding: 0.2rem 0.5rem; border-radius: 0.4rem; text-transform: uppercase; margin-top: 0.2rem; }
        .pro-tip p { font-size: 0.8rem; color: #92400e; font-weight: 600; line-height: 1.4; }
      `}</style>
        </div>
    );
}
