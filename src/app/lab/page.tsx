"use client";

import { useState } from "react";
import Link from 'next/link';
import { gradeActivities, Activity } from "@/data/activities";

export default function ActivityLab() {
  const [selectedGrade, setSelectedGrade] = useState(8); // Default for demo
  const [activeQuest, setActiveQuest] = useState<Activity | null>(gradeActivities.find(a => a.grade === 8) || null);
  const [submission, setSubmission] = useState("");
  const [status, setStatus] = useState("pending");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitted");
  };

  if (!activeQuest) return <div>Quest not found.</div>;

  return (
    <div className="lab-container">
      <header className="lab-header">
        <Link href="/" className="back-link">← Back to Campus</Link>
        <div className="header-meta">
          <h1 className="gradient-text">Activity Lab</h1>
          <div className="grade-selector">
            <span>Viewing Class: </span>
            <select
              value={selectedGrade}
              onChange={(e) => {
                const g = parseInt(e.target.value);
                setSelectedGrade(g);
                setActiveQuest(gradeActivities.find(a => a.grade === g) || null);
                setStatus("pending");
                setSubmission("");
              }}
            >
              {[5, 6, 7, 8, 9, 10, 11, 12].map(g => (
                <option key={g} value={g}>Class {g}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <div className="lab-content">
        <section className="active-quest premium-glass">
          <div className="quest-header">
            <span className="badge">MANDATORY ACTIVITY</span>
            <h2>{activeQuest.title}</h2>
          </div>

          <div className="quest-description">
            <p><strong>Theory Link:</strong> {activeQuest.theoryLink}</p>
            <p><strong>Instructions:</strong> {activeQuest.instructions}</p>
          </div>

          <div className="quest-status">
            {status === "pending" && (
              <form onSubmit={handleSubmit} className="submission-form">
                <textarea
                  placeholder={activeQuest.placeholder}
                  value={submission}
                  onChange={(e) => setSubmission(e.target.value)}
                  required
                />
                <button type="submit" className="btn-primary">Submit for Principal Verification</button>
              </form>
            )}

            {status === "submitted" && (
              <div className="status-message info">
                <h3>🚀 Submission Received!</h3>
                <p>Waiting for your Parent (Principal) to verify the activity on their dashboard.</p>
                <p className="reward-hint">Earn ₹{activeQuest.rewards.rupees} towards your Final Exam fee on approval.</p>
              </div>
            )}

            {status === "verified" && (
              <div className="status-message success">
                <h3>✅ Activity Verified!</h3>
                <p>+{activeQuest.rewards.xp} XP earned. Chapter officially Complete.</p>
                <p>₹{activeQuest.rewards.rupees} added to your Virtual Wallet.</p>
              </div>
            )}
          </div>
        </section>

        <aside className="lab-sidebar">
          <div className="reward-preview premium-glass">
            <h3>Reward at Stake</h3>
            <div className="reward-item">
              <span className="icon">💎</span>
              <span className="val">+{activeQuest.rewards.xp} XP</span>
            </div>
            <div className="reward-item">
              <span className="icon">💰</span>
              <span className="val">₹{activeQuest.rewards.rupees} Virtual ₹</span>
            </div>
            {activeQuest.rewards.badge && (
              <div className="reward-item">
                <span className="icon">🎖️</span>
                <span className="val">{activeQuest.rewards.badge} Badge</span>
              </div>
            )}
          </div>
        </aside>
      </div>

      <style jsx>{`
        .lab-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .back-link {
          color: var(--primary);
          font-weight: 700;
          text-decoration: none;
          margin-bottom: 0.5rem;
          display: block;
        }
        h1 {
          font-size: 2.5rem;
          font-weight: 900;
        }
        .lab-content {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 2rem;
        }
        .active-quest {
          padding: 2.5rem;
          border-radius: 2.5rem;
        }
        .badge {
          background: #fef2f2;
          color: #ef4444;
          padding: 0.4rem 0.8rem;
          border-radius: 0.5rem;
          font-weight: 800;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
        }
        .quest-header h2 {
          font-size: 2rem;
          font-weight: 800;
          margin-top: 1rem;
          margin-bottom: 1.5rem;
        }
        .quest-description {
          padding: 1.5rem;
          background: #f8fafc;
          border-radius: 1.5rem;
          margin-bottom: 2rem;
          color: #475569;
        }
        .quest-description p {
          margin-bottom: 0.5rem;
        }
        .submission-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        textarea {
          min-height: 150px;
          padding: 1.5rem;
          border-radius: 1.5rem;
          border: 1px solid var(--border);
          font-family: inherit;
          font-size: 1rem;
          outline: none;
        }
        .status-message {
          padding: 2rem;
          border-radius: 1.5rem;
          text-align: center;
        }
        .status-message.info {
          background: #eff6ff;
          color: #1d4ed8;
          border: 1px solid #bfdbfe;
        }
        .status-message.success {
          background: #ecfdf5;
          color: #047857;
          border: 1px solid #a7f3d0;
        }
        .reward-preview {
          padding: 2rem;
          border-radius: 2rem;
        }
        .reward-preview h3 {
          font-size: 0.875rem;
          text-transform: uppercase;
          color: #64748b;
          margin-bottom: 1.5rem;
          font-weight: 800;
        }
        .reward-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          font-weight: 700;
          font-size: 1.1rem;
        }
        @media (max-width: 1024px) {
          .lab-content {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
