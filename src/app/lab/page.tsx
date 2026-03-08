"use client";
import SubscriberLock from "@/components/SubscriberLock";

import { useState } from "react";
import Link from 'next/link';
import { gradeActivities, Activity } from "@/data/activities";
import { useJarContext } from "@/components/JarContext";

export default function ActivityLab() {
  const [selectedGrade, setSelectedGrade] = useState(8); // Default for demo
  const [activeQuest, setActiveQuest] = useState<Activity | null>(gradeActivities.find(a => a.grade === 8) || null);
  const [submission, setSubmission] = useState("");
  const [status, setStatus] = useState("pending");

  const { weeklyEarning, parentMatch } = useJarContext();
  const giveWeekly = Math.round(weeklyEarning * 0.2);
  const spendWeekly = Math.round(weeklyEarning * 0.4);
  const investWeekly = Math.round(weeklyEarning * 0.4);
  const totalWeekly = giveWeekly + spendWeekly + investWeekly + parentMatch;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitted");
  };

  if (!activeQuest) return <div>Quest not found.</div>;

  return (
    <SubscriberLock title="Activity Lab Access" featureName="Activity Lab">
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
        <div className="lab-main-col">
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
          </div>
        </section>

        <section className="universal-quest premium-glass">
            <div className="quest-header">
              <span className="badge" style={{ background: 'var(--neon-green)', color: '#000' }}>UNIVERSAL HABIT</span>
              <h2>🧒 Activity: The 3-Jar Wealth System</h2>
            </div>
            <div className="quest-description">
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>🎯 Objective</h3>
                <p>Teach children the <strong>three important habits of money</strong>:</p>
                <ol style={{ margin: '0.5rem 0 1rem 1.5rem', lineHeight: '1.6' }}>
                  <li>Giving</li>
                  <li>Spending wisely</li>
                  <li>Investing for the future</li>
                </ol>
                <p>This activity helps kids understand that <strong>money has purpose, freedom, and growth</strong>.</p>
              </div>

              <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>🪙 Step 1: Give Your Child a Real Job</h3>
                <p>At the age of <strong>5 years</strong>, give your child a small weekly responsibility such as:</p>
                <ul style={{ margin: '0.5rem 0 1rem 1.5rem', lineHeight: '1.6' }}>
                  <li>Cleaning their room</li>
                  <li>Folding laundry</li>
                  <li>Watering plants</li>
                  <li>Taking out the rubbish</li>
                  <li>Arranging their toys</li>
                </ul>
                <p>These tasks help children understand that <strong>money is earned through effort</strong>.</p>
                <p style={{ marginTop: '1rem', fontSize: '1.1rem' }}><strong>Weekly Payment:</strong> ₹{weeklyEarning} per week (adjustable in Parent Dashboard).</p>
              </div>

              <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>🫙 Step 2: Use the Three Jar System</h3>
                <p>Prepare <strong>three jars or boxes</strong> and label them.</p>

                <div style={{ marginTop: '1.5rem' }}>
                  <h4 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>❤️ Jar 1: Giving Jar</h4>
                  <p>Put <strong>₹{giveWeekly}</strong> in this jar every week.</p>
                  <p>At the end of the month, the child gives this money to:</p>
                  <ul style={{ margin: '0.5rem 0 1rem 1.5rem', lineHeight: '1.6' }}>
                    <li>Someone in need</li>
                    <li>A temple donation box</li>
                    <li>A street animal charity</li>
                    <li>A poor child</li>
                  </ul>
                  <p>This teaches children that <strong>money can help others</strong>.</p>
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                  <h4 style={{ color: '#eab308', marginBottom: '0.5rem' }}>🛍 Jar 2: Spending Jar</h4>
                  <p>Put <strong>₹{spendWeekly}</strong> in this jar every week.</p>
                  <p>At the end of the month, the child can buy anything they want:</p>
                  <ul style={{ margin: '0.5rem 0 1rem 1.5rem', lineHeight: '1.6' }}>
                    <li>Toys</li>
                    <li>Chocolates</li>
                    <li>Comics</li>
                    <li>Art supplies</li>
                  </ul>
                  <p>Parents <strong>should not judge their choice</strong>. This teaches <strong>freedom and decision making</strong>.</p>
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                  <h4 style={{ color: '#22c55e', marginBottom: '0.5rem' }}>📈 Jar 3: Investing Jar</h4>
                  <p>Put <strong>₹{investWeekly}</strong> in this jar every week.</p>
                  <p>Now add a <strong>bonus from the parent</strong>.</p>
                  <div style={{ background: 'rgba(34, 197, 94, 0.1)', padding: '1rem', borderRadius: '0.5rem', margin: '1rem 0', border: '1px solid rgba(34,197,94,0.2)' }}>
                    Example:<br/>
                    Child adds ₹{investWeekly} → Parent adds ₹{parentMatch}<br/>
                    <strong>Total becomes ₹{investWeekly + parentMatch}</strong>
                  </div>
                  <p>Explain to the child:</p>
                  <blockquote style={{ borderLeft: '4px solid #22c55e', paddingLeft: '1rem', margin: '1rem 0', fontStyle: 'italic', color: 'var(--muted)' }}>
                    "This is how investing works. Money can grow when you invest it."
                  </blockquote>
                  <p>You can later use this money to:</p>
                  <ul style={{ margin: '0.5rem 0 1rem 1.5rem', lineHeight: '1.6' }}>
                    <li>Buy a children's savings bond</li>
                    <li>Invest in a piggy bank savings goal</li>
                    <li>Start a small investment account (when older)</li>
                  </ul>
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>📅 Step 3: Monthly Reflection</h3>
                <p>At the end of the month, ask your child:</p>
                <ul style={{ margin: '0.5rem 0 1rem 1.5rem', lineHeight: '1.6' }}>
                  <li>Who did you help this month?</li>
                  <li>What did you buy?</li>
                  <li>How much money grew in your investing jar?</li>
                </ul>
                <p>This builds <strong>financial awareness and confidence</strong>.</p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>🧠 What Children Learn</h3>
                <p>By age <strong>10</strong>, children understand:</p>
                <ul style={{ margin: '0.5rem 0 1rem 1.5rem', lineHeight: '1.6' }}>
                  <li>How money is earned</li>
                  <li>How to help others with money</li>
                  <li>How to spend responsibly</li>
                  <li>How money grows through investing</li>
                </ul>
                <p>Most adults learn this <strong>very late in life</strong>, but your child will already understand it.</p>
              </div>

              <div style={{ padding: '1.5rem', background: 'rgba(255, 140, 90, 0.1)', borderRadius: '1rem', border: '1px solid rgba(255,140,90,0.3)', marginBottom: '1rem' }}>
                <h4 style={{ color: 'var(--neon-orange)', marginBottom: '0.5rem' }}>👨‍👩‍👧 Parent Tip</h4>
                <p>Make the jars <strong>colorful and fun</strong>. Kids learn <strong>better with visuals and stories</strong>.</p>
                <ul style={{ margin: '0.5rem 0 0 1.5rem', lineHeight: '1.6' }}>
                  <li>❤️ Red Jar → Giving</li>
                  <li>💛 Yellow Jar → Spending</li>
                  <li>💚 Green Jar → Investing</li>
                </ul>
              </div>

              <div style={{ padding: '1.5rem', background: 'rgba(108, 99, 255, 0.1)', borderRadius: '1rem', border: '1px solid rgba(108,99,255,0.3)' }}>
                <h4 style={{ color: 'var(--primary-glow)', marginBottom: '0.5rem' }}>🗣 Optional Discussion Question for Kids</h4>
                <p>Ask your child:</p>
                <blockquote style={{ borderLeft: '4px solid var(--primary-glow)', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontStyle: 'italic', fontWeight: 700 }}>
                  “If your investing jar becomes ₹1000, what would you like to do with it?”
                </blockquote>
                <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--muted)' }}>This encourages <strong>long-term thinking</strong>.</p>
              </div>
            </div>
            
            <div className="quest-status">
                <button 
                  className="btn-neon pulse" 
                  onClick={() => alert(`Weekly Jars Logged! Your Parent has been notified to add the ₹${parentMatch} Investing Match.`)}
                  style={{ width: '100%', padding: '1rem' }}
                >
                  Log This Week's Jars (₹{weeklyEarning} Earned) 🏦
                </button>
            </div>
        </section>
      </div>

      <aside className="lab-sidebar">
          <div className="reward-preview premium-glass">
            <h3>Reward at Stake</h3>
            <div className="reward-item">
              <span className="icon">💎</span>
              <span className="val">+{activeQuest?.rewards.xp || 0} XP</span>
            </div>
            <div className="reward-item">
              <span className="icon">💰</span>
              <span className="val">₹{activeQuest?.rewards.rupees || 0} Virtual ₹</span>
            </div>
            {activeQuest?.rewards.badge && (
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
        .active-quest, .universal-quest {
          padding: 2.5rem;
          border-radius: 2.5rem;
        }
        .universal-quest {
          border: 2px solid var(--neon-green);
          box-shadow: 0 0 20px rgba(0,229,160,0.15);
        }
        .lab-main-col {
          display: flex;
          flex-direction: column;
          gap: 2rem;
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
    </SubscriberLock>
  );
}

