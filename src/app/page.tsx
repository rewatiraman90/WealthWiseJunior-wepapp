"use client";

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function CampusDashboard() {
  return (
    <div className="campus-container">
      <header className="campus-hero">
        <div className="campus-info">
          <h1 className="gradient-text">MoneyMind Campus</h1>
          <p className="subtitle">Class 8 • Semester 2</p>
        </div>
        <div className="campus-stats">
          <div className="stat-pill premium-glass">
            <span className="icon">🔥</span>
            <span className="value">21 DAY STREAK</span>
          </div>
          <div className="stat-pill premium-glass">
            <span className="icon">🏆</span>
            <span className="value">RANK 4 (CLASS)</span>
          </div>
        </div>
      </header>

      <section className="campus-map">
        <div className="wing theory-wing premium-glass">
          <div className="wing-icon">📚</div>
          <div className="wing-content">
            <h2>Theory Wing</h2>
            <p>Master the curriculum via interactive lessons.</p>
            <div className="module-badge">Next: Magic of Compounding</div>
          </div>
          <button className="btn-primary">Enter Wing</button>
        </div>

        <div className="wing lab-wing premium-glass active-wing">
          <div className="wing-icon">🧪</div>
          <div className="wing-content">
            <h2>Activity Lab</h2>
            <p>Complete mandatory Home Activities for XP.</p>
            <div className="module-badge status-urgent">1 Pending: Price-Point Hunt</div>
          </div>
          <Link href="/lab" className="btn-primary">Go to Lab</Link>
        </div>

        <div className="wing market-wing premium-glass locked">
          <div className="wing-icon">📈</div>
          <div className="wing-content">
            <h2>Market Simulator</h2>
            <p>Practice trading with real NSE/BSE data.</p>
            <div className="module-badge locked-badge">Unlocks at Level 15</div>
          </div>
          <button className="btn-secondary" disabled>Locked</button>
        </div>

        <div className="wing gps-wing premium-glass">
          <div className="wing-icon">🧭</div>
          <div className="wing-content">
            <h2>Freedom Roadmap</h2>
            <p>Your GPS for Life. Build skills, not just degrees.</p>
            <div className="module-badge">New: Level 18 Checklist</div>
          </div>
          <Link href="/gps" className="btn-primary">View My GPS</Link>
        </div>

        <div className="wing leaderboard-wing premium-glass">
          <div className="wing-icon">🏆</div>
          <div className="wing-content">
            <h2>City Leaderboard</h2>
            <p>See how you rank against other students in your city.</p>
            <div className="module-badge">New: Bangalore Rankings</div>
          </div>
          <Link href="/leaderboard" className="btn-primary">View Rankings</Link>
        </div>
      </section>

      <div className="campus-footer">
        <div className="progress-card premium-glass">
          <div className="progress-header">
            <h3>Syllabus Progress</h3>
            <span className="percentage">64%</span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: '64%' }}></div>
          </div>
        </div>

        <div className="goal-reminder premium-glass">
          <div className="goal-info">
            <span className="label">Current Goal</span>
            <span className="target">New Bicycle</span>
          </div>
          <div className="goal-visual">
            <div className="jar-fill" style={{ height: '75%' }}></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .campus-container {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          padding-bottom: 2rem;
        }
        .campus-hero {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        h1 {
          font-size: 3rem;
          font-weight: 900;
          letter-spacing: -0.02em;
        }
        .subtitle {
          font-weight: 600;
          color: #64748b;
          font-size: 1.1rem;
        }
        .campus-stats {
          display: flex;
          gap: 1rem;
        }
        .stat-pill {
          padding: 0.6rem 1.2rem;
          border-radius: 2rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-weight: 700;
          font-size: 0.875rem;
        }
        .campus-map {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
        .wing {
          padding: 2.5rem;
          border-radius: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 2px solid transparent;
        }
        .wing:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.1);
        }
        .active-wing {
          border-color: var(--primary-glow);
          box-shadow: 0 0 0 4px rgba(129, 140, 248, 0.1);
        }
        .wing-icon {
          font-size: 3rem;
          background: #f1f5f9;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 1.5rem;
        }
        .wing h2 {
          font-size: 1.75rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }
        .wing p {
          color: #64748b;
          line-height: 1.5;
          margin-bottom: 1rem;
        }
        .module-badge {
          display: inline-block;
          background: #eef2ff;
          color: var(--primary);
          padding: 0.4rem 0.8rem;
          border-radius: 0.75rem;
          font-size: 0.8rem;
          font-weight: 700;
        }
        .status-urgent {
          background: #fee2e2;
          color: #ef4444;
        }
        .locked {
          opacity: 0.8;
          filter: grayscale(0.5);
          cursor: not-allowed;
        }
        .locked-badge {
          background: #f1f5f9;
          color: #94a3b8;
        }
        .campus-footer {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 2rem;
        }
        .progress-card, .goal-reminder {
          padding: 2rem;
          border-radius: 2rem;
        }
        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 1rem;
        }
        .progress-header h3 {
          font-weight: 800;
          color: #1e293b;
        }
        .progress-header .percentage {
          font-weight: 900;
          color: var(--primary);
          font-size: 1.5rem;
        }
        .progress-bar-container {
          height: 12px;
          background: #e2e8f0;
          border-radius: 1rem;
          overflow: hidden;
        }
        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          border-radius: 1rem;
        }
        .goal-reminder {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .goal-info {
          display: flex;
          flex-direction: column;
        }
        .goal-info .label {
          font-size: 0.75rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
        }
        .goal-info .target {
          font-weight: 800;
          font-size: 1.25rem;
        }
        .goal-visual {
          width: 50px;
          height: 60px;
          border: 2px solid var(--border);
          border-radius: 8px 8px 15px 15px;
          position: relative;
          background: #f8fafc;
          overflow: hidden;
        }
        .jar-fill {
          position: absolute;
          bottom: 0;
          width: 100%;
          background: var(--secondary);
          transition: height 0.5s ease;
        }
        @media (max-width: 1024px) {
          .campus-footer {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
