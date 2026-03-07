"use client";

import Link from 'next/link';
import HustleCalculator from '@/components/HustleCalculator';
import IndependenceChecklist from '@/components/IndependenceChecklist';
import { useState, useEffect } from 'react';

export default function CareerGPS() {
    const [userProfile, setUserProfile] = useState<any>(null);

    useEffect(() => {
        const saved = localStorage.getItem('wwj_profile');
        if (saved) setUserProfile(JSON.parse(saved));
    }, []);

    const milestones = [
        {
            ageRange: [10, 13],
            age: "10-13",
            title: "Content & Skills",
            icon: "🎥",
            actions: ["Start a YouTube Channel (Hobby-based)", "Learn Canva & Basic Video Editing", "Write a personal blog"],
            mindset: "Transition from Consumer to Creator.",
            potential: "Builds high-demand digital marketing and storytelling skills early.",
            suggestion: "Use your parent's ID to set up channels legally."
        },
        {
            ageRange: [14, 17],
            age: "14-17",
            title: "Micro-Freelancing",
            icon: "💻",
            actions: ["Data Entry & Social Media Management", "Basic Web Development / SEO", "Observe NIFTY 50 Market Charts"],
            mindset: "Skills are more stable than exams.",
            potential: "Early exposure to gig economy; potential to earn ₹5k-10k/mo.",
            suggestion: "Focus on NIFTY/Crypto knowledge only; no trading until 18."
        },
        {
            ageRange: [18, 22],
            age: "18-22",
            title: "Financial Independence",
            icon: "🏆",
            actions: ["Open Individual Bank Account", "Start SIP in Index Funds (₹100+)", "High-ticket Freelancing / Tutoring"],
            mindset: "Pave your own path to freedom.",
            potential: "Total financial sovereignty and wealth compounding starts here.",
            suggestion: "Get your PAN card on your 18th birthday."
        }
    ];

    const isUnlocked = (ageRange: number[]) => {
        if (!userProfile) return ageRange[0] === 10; // Default unlock first for anonymous
        const age = parseInt(userProfile.age);
        return age >= ageRange[0];
    };

    const isCurrent = (ageRange: number[]) => {
        if (!userProfile) return false;
        const age = parseInt(userProfile.age);
        return age >= ageRange[0] && age <= ageRange[1];
    };

    return (
        <div className="campus-container">
            <header className="campus-hero">
                <div className="campus-info">
                    <Link href="/" className="back-link">← Back to Campus</Link>
                    <h1 className="gradient-text">Freedom Roadmap</h1>
                    <p className="subtitle">Your GPS for Financial Independence (10-22 yrs)</p>
                </div>
            </header>

            <div className="gps-grid">
                <section className="milestones-timeline">
                    <div className="section-header">
                        <h2>The Wealth-Creator Path</h2>
                        <p>Ignore the "Degree-Only" trap. Build actual skills.</p>
                    </div>

                    <div className="timeline">
                        {milestones.map((m, idx) => {
                            const unlocked = isUnlocked(m.ageRange);
                            const current = isCurrent(m.ageRange);

                            return (
                                <div key={idx} className={`milestone-card premium-glass ${unlocked ? 'unlocked' : 'locked'} ${current ? 'current' : ''}`}>
                                    {!unlocked && <div className="lock-overlay">🔒 Locked until Age {m.ageRange[0]}</div>}
                                    <div className="milestone-age">{m.age} Years</div>
                                    <div className="milestone-header">
                                        <span className="milestone-icon">{m.icon}</span>
                                        <h3>{m.title}</h3>
                                    </div>
                                    <div className="milestone-mindset">
                                        <strong>Mindset:</strong> {m.mindset}
                                    </div>
                                    <ul className="milestone-actions">
                                        {m.actions.map((action, i) => (
                                            <li key={i}>{action}</li>
                                        ))}
                                    </ul>

                                    {unlocked && (
                                        <div className="milestone-extra">
                                            <div className="extra-item">
                                                <span className="label">Potential:</span>
                                                <p>{m.potential}</p>
                                            </div>
                                            <div className="extra-item suggestion">
                                                <span className="label">Mentor Suggestion:</span>
                                                <p>{m.suggestion}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>

                <aside className="gps-sidebar">
                    <div className="affirmations-card premium-glass">
                        <div className="hw-header">
                            <span className="icon">✨</span>
                            <h3>Daily Affirmations</h3>
                        </div>
                        <div className="affirmation-list">
                            <p>"I am a student by day and an entrepreneur by night."</p>
                            <p>"A degree is a piece of paper; my skills are my currency."</p>
                            <p>"I will not trade 40 years of my life for a 9-to-7 job I hate."</p>
                        </div>
                    </div>
                    <HustleCalculator />
                    <div className="health-wealth-card premium-glass">
                        <div className="hw-header">
                            <span className="icon">🧘</span>
                            <h3>Health is Foundation</h3>
                        </div>
                        <p>You can't compound money if your health is crashing. Use the 'Wealthy Student' daily routine.</p>
                        <div className="ratio-stat">
                            <span className="label">Optimal Sleep</span>
                            <span className="value">7.5 Hours</span>
                        </div>
                    </div>
                    <IndependenceChecklist />
                </aside>
            </div>

            <style jsx>{`
        .campus-container { display: flex; flex-direction: column; gap: 2rem; }
        .campus-hero { display: flex; justify-content: space-between; align-items: flex-end; }
        .back-link { color: var(--primary); text-decoration: none; font-weight: 700; margin-bottom: 0.5rem; display: block; }
        h1 { font-size: 2.5rem; font-weight: 900; }
        .subtitle { color: #64748b; font-weight: 600; }
        
        .gps-grid { display: grid; grid-template-columns: 1fr 400px; gap: 2rem; }
        
        .milestones-timeline { padding-right: 1rem; }
        .section-header { margin-bottom: 2.5rem; }
        .section-header h2 { font-size: 1.8rem; font-weight: 800; margin-bottom: 0.3rem; }
        .section-header p { color: #64748b; font-weight: 600; }

        .timeline { display: flex; flex-direction: column; gap: 2rem; position: relative; }
        .timeline::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: var(--border); border-radius: 2px; }
        
        .milestone-card { 
          position: relative; 
          padding: 2rem; 
          margin-left: 2rem; 
          border-radius: 1.5rem; 
          border: 1px solid var(--border);
          transition: transform 0.3s;
          overflow: hidden;
        }
        .milestone-card.locked { filter: grayscale(1) opacity(0.5); }
        .milestone-card.current { border-color: var(--primary); box-shadow: 0 0 20px rgba(129, 140, 248, 0.2); }
        .milestone-card.current::before { content: 'CURRENT LEVEL'; position: absolute; right: 1rem; top: 1rem; font-size: 0.65rem; font-weight: 900; color: var(--primary); background: #eef2ff; padding: 0.2rem 0.5rem; border-radius: 0.4rem; }

        .lock-overlay { position: absolute; inset: 0; background: rgba(255,255,255,0.4); display: flex; align-items: center; justify-content: center; z-index: 10; font-weight: 800; color: #1e293b; }

        .milestone-card:hover:not(.locked) { transform: translateX(10px); background: #f8fafc; }
        .milestone-card::after { 
          content: ''; 
          position: absolute; 
          left: -2.3rem; 
          top: 2rem; 
          width: 1rem; 
          height: 4px; 
          background: var(--primary); 
        }

        .milestone-age { 
          background: var(--primary); 
          color: white; 
          display: inline-block; 
          padding: 0.3rem 0.8rem; 
          border-radius: 2rem; 
          font-weight: 800; 
          font-size: 0.75rem; 
          margin-bottom: 1rem; 
        }
        .milestone-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
        .milestone-icon { font-size: 1.5rem; }
        .milestone-header h3 { font-size: 1.4rem; font-weight: 800; }
        .milestone-mindset { background: #f1f5f9; padding: 0.8rem 1rem; border-radius: 0.75rem; margin-bottom: 1.5rem; font-size: 0.9rem; color: #334155; }
        .milestone-actions { display: flex; flex-direction: column; gap: 0.6rem; list-style: none; }
        .milestone-actions li { position: relative; padding-left: 1.5rem; font-weight: 600; color: #1e293b; font-size: 0.95rem; }
        .milestone-actions li::before { content: '→'; position: absolute; left: 0; color: var(--primary); font-weight: 900; }

        .milestone-extra { margin-top: 2rem; display: flex; flex-direction: column; gap: 1rem; border-top: 1px solid #e2e8f0; padding-top: 1.5rem; }
        .extra-item .label { font-size: 0.75rem; font-weight: 900; text-transform: uppercase; color: var(--primary); display: block; margin-bottom: 0.2rem; }
        .extra-item p { font-size: 0.85rem; color: #475569; font-weight: 600; line-height: 1.5; }
        .suggestion { background: #fdf4ff; padding: 1rem; border-radius: 1rem; border: 1px dashed #d946ef; }
        .suggestion .label { color: #d946ef; }
        .suggestion p { color: #701a75; }

        .gps-sidebar { display: flex; flex-direction: column; gap: 2rem; }
        
        .affirmations-card { padding: 1.5rem; background: linear-gradient(135deg, #fdf4ff, #fae8ff); border: 1px solid #f5d0fe; border-radius: 1.5rem; }
        .affirmation-list { display: flex; flex-direction: column; gap: 1rem; }
        .affirmation-list p { font-style: italic; color: #701a75; font-weight: 700; font-size: 0.9rem; line-height: 1.4; border-left: 3px solid #d946ef; padding-left: 0.8rem; }

        .health-wealth-card { padding: 1.5rem; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 1.5rem; }
        .hw-header { display: flex; align-items: center; gap: 0.8rem; margin-bottom: 0.8rem; }
        .hw-header h3 { font-size: 1rem; font-weight: 800; color: #065f46; }
        .health-wealth-card p { font-size: 0.85rem; color: #065f46; font-weight: 500; line-height: 1.4; margin-bottom: 1.2rem; }
        .ratio-stat { display: flex; justify-content: space-between; background: white; padding: 0.8rem; border-radius: 0.75rem; font-weight: 800; font-size: 0.85rem; color: #065f46; }
        
        @media (max-width: 1200px) { .gps-grid { grid-template-columns: 1fr; } .timeline::before { left: 0; } }
      `}</style>
        </div>
    );
}
