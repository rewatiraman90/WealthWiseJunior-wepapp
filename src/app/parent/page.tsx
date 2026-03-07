"use client";

import { useState } from "react";
import Link from 'next/link';
import { gradeActivities } from "@/data/activities";

interface ActivitySubmission {
  id: string;
  child: string;
  grade: number;
  syllabusLink: string;
  activityTitle: string;
  submission: string;
  rupees: number;
  xp: number;
  status: 'pending' | 'verified';
}

export default function PrincipalDashboard() {
  const [activities, setActivities] = useState<ActivitySubmission[]>([
    {
      id: "c8-may-inf-1",
      child: "Aaryan",
      grade: 8,
      syllabusLink: "Class 8 - May (Inflation)",
      activityTitle: "The Price-Point Hunt",
      submission: "Spoke to Mom. In 2015, Amul milk was ₹32/L. Today it is ₹58/L. That's almost 80% increase in 11 years! Inflation is real.",
      rupees: 100,
      xp: 250,
      status: 'pending'
    },
    {
      id: "c5-apr-bar-1",
      child: "Diya",
      grade: 5,
      syllabusLink: "Class 5 - April (Barter)",
      activityTitle: "The Barter Swap",
      submission: "I tried to swap my old doll for my brother's video game. He said no until I offered my dessert too. Barter is tough!",
      rupees: 50,
      xp: 100,
      status: 'pending'
    }
  ]);

  const verifyActivity = (id: string) => {
    setActivities(activities.map(a => a.id === id ? { ...a, status: 'verified' } : a));
  };

  return (
    <div className="campus-container">
      <header className="campus-hero">
        <div className="campus-info">
          <Link href="/" className="back-link">← Back to Campus</Link>
          <h1 className="gradient-text">Principal Dashboard</h1>
          <p className="subtitle">WealthWise Junior Management Wing</p>
        </div>
        <div className="bank-status premium-glass">
          <span className="label">Access Level</span>
          <span className="status-active">Super Principal</span>
        </div>
      </header>

      <div className="dashboard-grid">
        <section className="verification-queue premium-glass">
          <div className="section-header">
            <h2>Syllabus Activity Verification</h2>
            <span className="count-badge">{activities.filter(a => a.status === 'pending').length} Action Required</span>
          </div>

          <div className="activity-list">
            {activities.length > 0 ? activities.map(act => (
              <div key={act.id} className={`activity-card ${act.status}`}>
                <div className="act-header">
                  <span className="syllabus-tag">{act.syllabusLink}</span>
                  <span className="child-name">{act.child}</span>
                </div>
                <h3>{act.activityTitle}</h3>
                <div className="submission-content">
                  <h4>Student Submission:</h4>
                  <p>"{act.submission}"</p>
                </div>
                <div className="reward-info">
                  <div className="reward-box">
                    <span className="label">Wealth ₹:</span>
                    <span className="val green">₹{act.rupees}</span>
                  </div>
                  <div className="reward-box">
                    <span className="label">XP Points:</span>
                    <span className="val blue">+{act.xp} XP</span>
                  </div>
                </div>
                <div className="act-actions">
                  {act.status === 'pending' ? (
                    <>
                      <button className="btn-primary" onClick={() => verifyActivity(act.id)}>Verify & Credit Wallet</button>
                      <button className="btn-outline">Ask for Revision</button>
                    </>
                  ) : (
                    <div className="verified-status">✅ Reward Credited & Chapter Completed</div>
                  )}
                </div>
              </div>
            )) : (
              <p className="empty-state">All student activities are verified. Great job, Principal!</p>
            )}
          </div>
        </section>

        <aside className="principal-sidebar">
          <div className="wealth-audit premium-glass">
            <h3>Wealth Audit</h3>
            <div className="audit-item">
              <span className="child">Aaryan (Class 8)</span>
              <div className="audit-bar">
                <div className="fill" style={{ width: '85%' }}></div>
              </div>
              <span className="audit-note">₹850 / ₹1000 for Exam</span>
            </div>
            <div className="audit-item">
              <span className="child">Diya (Class 5)</span>
              <div className="audit-bar">
                <div className="fill" style={{ width: '45%' }}></div>
              </div>
              <span className="audit-note">₹90 / ₹200 for Exam</span>
            </div>
          </div>

          <div className="reward-settings premium-glass">
            <h3>Reward Management</h3>
            <p className="help-text">Define what your child earns for completing grade levels.</p>
            <div className="setting-item">
              <label>Current Reward for Class 8</label>
              <input type="text" defaultValue="Family Dinner at Favorite Pizza Place" />
            </div>
            <button className="btn-secondary w-full">Update Syllabus Rewards</button>
          </div>
        </aside>
      </div>

      <style jsx>{`
        .campus-container { display: flex; flex-direction: column; gap: 2rem; }
        .campus-hero { display: flex; justify-content: space-between; align-items: flex-end; }
        .back-link { color: var(--primary); text-decoration: none; font-weight: 700; margin-bottom: 0.5rem; display: block; }
        h1 { font-size: 2.5rem; font-weight: 900; }
        .subtitle { color: #64748b; font-weight: 600; }
        .bank-status { padding: 0.5rem 1.2rem; border-radius: 2rem; display: flex; align-items: center; gap: 0.6rem; font-size: 0.875rem; }
        .status-active { color: var(--secondary); font-weight: 700; }
        .dashboard-grid { display: grid; grid-template-columns: 1fr 350px; gap: 2rem; }
        .verification-queue, .reward-settings, .wealth-audit { padding: 2rem; border-radius: 2rem; }
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        h2 { font-size: 1.5rem; font-weight: 800; }
        .count-badge { background: #fee2e2; color: #ef4444; padding: 0.4rem 0.8rem; border-radius: 2rem; font-weight: 700; font-size: 0.8rem; }
        .activity-list { display: flex; flex-direction: column; gap: 1.5rem; }
        .activity-card { padding: 2rem; border-radius: 1.5rem; border: 1px solid var(--border); transition: all 0.3s; background: white; }
        .activity-card.pending { border-left: 6px solid var(--accent); }
        .activity-card.verified { opacity: 0.7; background: #f8fafc; }
        .act-header { display: flex; justify-content: space-between; margin-bottom: 1rem; }
        .syllabus-tag { color: var(--primary); font-weight: 700; font-size: 0.8rem; text-transform: uppercase; }
        .child-name { font-weight: 700; color: #1e293b; }
        .activity-card h3 { font-size: 1.25rem; font-weight: 800; margin-bottom: 1rem; }
        .submission-content { background: #f1f5f9; padding: 1.2rem; border-radius: 1rem; margin-bottom: 1.5rem; }
        .submission-content h4 { font-size: 0.75rem; color: #64748b; text-transform: uppercase; margin-bottom: 0.5rem; font-weight: 800; }
        .submission-content p { color: #1e293b; line-height: 1.5; font-style: italic; }
        .reward-info { margin-bottom: 1.5rem; display: flex; gap: 1.5rem; }
        .reward-box { display: flex; flex-direction: column; font-weight: 700; }
        .reward-box .label { color: #64748b; font-size: 0.7rem; text-transform: uppercase; }
        .reward-box .val { font-size: 1.1rem; }
        .reward-box .green { color: var(--secondary); }
        .reward-box .blue { color: var(--primary); }
        .act-actions { display: flex; gap: 1rem; }
        .verified-status { color: var(--secondary); font-weight: 800; font-size: 1.1rem; }
        .reward-settings h3, .wealth-audit h3 { font-size: 1rem; font-weight: 800; margin-bottom: 1.5rem; text-transform: uppercase; color: #64748b; }
        .help-text { font-size: 0.85rem; color: #64748b; margin-bottom: 1.5rem; }
        .setting-item { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }
        .setting-item label { font-size: 0.75rem; font-weight: 700; }
        .setting-item input { padding: 0.75rem; border-radius: 0.75rem; border: 1px solid var(--border); outline: none; }
        .wealth-audit { margin-bottom: 2rem; background: #fff; border: 1px solid var(--border); }
        .audit-item { margin-bottom: 1.5rem; }
        .audit-item .child { display: block; font-weight: 700; font-size: 0.9rem; margin-bottom: 0.4rem; }
        .audit-bar { height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden; margin-bottom: 0.4rem; }
        .audit-bar .fill { height: 100%; background: var(--secondary-glow); border-right: 2px solid var(--secondary); transition: width 0.5s; }
        .audit-note { font-size: 0.75rem; font-weight: 600; color: #64748b; }
        .w-full { width: 100%; }
        @media (max-width: 1280px) { .dashboard-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
