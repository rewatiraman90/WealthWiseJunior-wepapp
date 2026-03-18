"use client";
import { useProfile } from '@/hooks/useProfile';
import Link from 'next/link';

interface SubscriberLockProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  featureName?: string;
}

export default function SubscriberLock({ 
  children, 
  title = "Subscriber Exclusive", 
  description = "This feature is reserved for Monthly Subscribers. Upgrade to get the blue tick, full syllabus access, and priority AI features.",
  featureName 
}: SubscriberLockProps) {
  const { profile, isLoading } = useProfile();

  if (isLoading) return <div className="lock-loading">Loading...</div>;

  // If they are a subscriber, just render the content normally
  if (profile?.isSubscriber) {
    return <>{children}</>;
  }

  // If they are NOT a subscriber, show the lock UI
  return (
    <div className="lock-container">
      <div className="lock-blur">
        <div className="lock-blur-inner" style={{ pointerEvents: 'none', userSelect: 'none', opacity: 0.2, filter: 'blur(8px)' }}>
          {children}
        </div>
      </div>
      
      <div className="lock-overlay">
        <div className="lock-card premium-glass">
          <div className="lock-icon">🔒</div>
          <h2 className="lock-title">{title}</h2>
          {featureName && <div className="lock-feature-badge">{featureName}</div>}
          <p className="lock-desc">{description}</p>
          
          <ul className="lock-benefits">
            <li>✅ <strong>Blue Tick ✓</strong> on your profile</li>
            <li>✅ Full access to all Videos & Classes</li>
            <li>✅ AI Teacher (Sir) unmetered access</li>
            <li>✅ Activity Lab & Freedom Roadmap</li>
          </ul>

          <Link href="/onboarding?upgrade=true" className="lock-btn">
            Upgrade to Subscriber (₹299/mo)
          </Link>
          <p className="lock-note">Join 50,000+ students building real wealth.</p>
        </div>
      </div>

      <style jsx>{`
        .lock-container {
          position: relative;
          min-height: 60vh;
          width: 100%;
          border-radius: 1.5rem;
          overflow: hidden;
        }
        .lock-blur {
          position: absolute;
          inset: 0;
          z-index: 1;
        }
        .lock-blur-inner {
          height: 100%;
          width: 100%;
          overflow: hidden;
        }
        .lock-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(5,8,22,0.4);
          padding: 1.5rem;
        }
        .lock-card {
          max-width: 440px;
          width: 100%;
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          border-radius: 2rem;
          background: rgba(14,22,56,0.95);
          border: 1px solid rgba(108,99,255,0.3);
          box-shadow: 0 20px 50px rgba(0,0,0,0.5), inset 0 0 40px rgba(108,99,255,0.1);
        }
        .lock-icon {
          font-size: 3rem;
          margin-bottom: 0.5rem;
          filter: drop-shadow(0 0 15px rgba(108,99,255,0.4));
        }
        .lock-title {
          font-size: 1.5rem;
          font-weight: 900;
          color: white;
          margin-bottom: 0.5rem;
        }
        .lock-feature-badge {
          background: rgba(255,209,102,0.15);
          color: #FFD166;
          padding: 0.3rem 0.8rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: 800;
          border: 1px solid rgba(255,209,102,0.3);
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .lock-desc {
          font-size: 0.9rem;
          color: var(--muted);
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }
        .lock-benefits {
          list-style: none;
          padding: 0;
          margin: 0 0 2rem 0;
          text-align: left;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          background: rgba(108,99,255,0.05);
          border: 1px solid rgba(108,99,255,0.15);
          padding: 1.25rem;
          border-radius: 1rem;
        }
        .lock-benefits li {
          font-size: 0.85rem;
          font-weight: 600;
          color: #e2e8f0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .lock-btn {
          background: linear-gradient(135deg, var(--primary), #8b5cf6);
          color: white;
          text-decoration: none;
          font-weight: 800;
          padding: 1rem 2rem;
          border-radius: 1.5rem;
          font-size: 1rem;
          width: 100%;
          transition: all 0.2s;
          box-shadow: 0 4px 20px rgba(108,99,255,0.4);
        }
        .lock-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(108,99,255,0.6);
        }
        .lock-note {
          font-size: 0.75rem;
          color: var(--muted);
          margin-top: 1rem;
          font-weight: 600;
        }
        .lock-loading {
          padding: 3rem;
          text-align: center;
          color: var(--muted);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
