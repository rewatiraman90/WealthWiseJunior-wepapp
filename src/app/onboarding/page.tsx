"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

// City abbreviations for roll number
const CITY_CODES: Record<string, string> = {
  bangalore: 'BLR', mumbai: 'MUM', delhi: 'DEL', pune: 'PUN',
  chennai: 'CHN', hyderabad: 'HYD', kolkata: 'KOL', ahmedabad: 'AHM',
  jaipur: 'JAI', surat: 'SUR', lucknow: 'LKO', indore: 'IDR',
};

function generateRollNumber(grade: string, city: string): string {
  const cityKey = city.toLowerCase().trim();
  const cityCode = CITY_CODES[cityKey] || city.slice(0, 3).toUpperCase();
  const year = new Date().getFullYear().toString().slice(-2);
  const random = Math.floor(1000 + Math.random() * 9000); // 4-digit
  return `WWJ-${grade}${cityCode}${year}-${random}`;
}

type Plan = 'free' | 'subscriber';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<'info' | 'plan'>('info');
  const [formData, setFormData] = useState({
    name: '', age: '', grade: '', school: '', city: ''
  });
  const [plan, setPlan] = useState<Plan>('subscriber');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('plan');
  };

  const handlePlanSubmit = async (selectedPlan: Plan) => {
    setIsSubmitting(true);
    setErrorMsg('');
    const rollNumber = generateRollNumber(formData.grade, formData.city);
    const isSubscriber = selectedPlan === 'subscriber';
    
    try {
      // 1. Create an anonymous user session in Supabase so they have an auth.uid()
      const { data: authData, error: authError } = await supabase.auth.signInAnonymously();
      
      if (authError || !authData.user) {
        throw new Error(authError?.message || 'Failed to create account session.');
      }

      // 2. Insert the profile data into our new profiles table
      const profile = {
        id: authData.user.id,
        name: formData.name,
        age: parseInt(formData.age),
        grade: formData.grade,
        school: formData.school,
        city: formData.city,
        roll_number: rollNumber,
        is_subscriber: isSubscriber,
      };

      const { error: insertError } = await supabase
        .from('profiles')
        .insert([profile]);

      if (insertError) {
        throw new Error(insertError.message || 'Failed to save profile data.');
      }

      // 3. Keep local storage for instantaneous UI rendering, but now it's backed by DB
      localStorage.setItem('wwj_profile', JSON.stringify({ ...profile, rollNumber }));
      
      router.push('/');
    } catch (err: any) {
      setErrorMsg(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ob-root">
      {step === 'info' ? (
        <div className="ob-card premium-glass">
          <div className="ob-logo">
            <span className="gradient-text" style={{ fontWeight: 900, fontSize: '1.5rem' }}>WealthWise</span>
            <span style={{ color: 'var(--neon-green)', fontWeight: 900, fontSize: '1.5rem' }}>Jr.</span>
          </div>
          <h1 className="gradient-text ob-title">Create Your Profile</h1>
          <p className="ob-sub">Join India's #1 financial literacy platform for students.</p>

          <form onSubmit={handleInfoSubmit} className="ob-form">
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text" required placeholder="e.g. Aarav Sharma"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Age</label>
                <input
                  type="number" required min="10" max="22" placeholder="Your age"
                  value={formData.age}
                  onChange={e => setFormData({ ...formData, age: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>Class / Grade</label>
                <select
                  required value={formData.grade}
                  onChange={e => setFormData({ ...formData, grade: e.target.value })}
                >
                  <option value="">Select</option>
                  {[5, 6, 7, 8, 9, 10, 11, 12].map(g => (
                    <option key={g} value={g}>Class {g}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="input-group">
              <label>School Name</label>
              <input
                type="text" required placeholder="e.g. DPS North"
                value={formData.school}
                onChange={e => setFormData({ ...formData, school: e.target.value })}
              />
            </div>

            <div className="input-group">
              <label>City</label>
              <input
                type="text" required placeholder="e.g. Bangalore"
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
              />
            </div>

            <button type="submit" className="ob-btn-primary">
              Continue →
            </button>
          </form>
        </div>
      ) : (
        <div className="ob-card premium-glass ob-wide">
          <button className="ob-back" onClick={() => setStep('info')}>← Back</button>
          <h2 className="gradient-text ob-title" style={{ marginBottom: '.25rem' }}>Choose Your Plan</h2>
          <p className="ob-sub" style={{ marginBottom: '2rem' }}>
            Hi <strong>{formData.name}</strong>! Select how you'd like to join WealthWise Jr.
          </p>

          <div className="plan-grid">
            {/* Subscriber Plan */}
            <div
              className={`plan-card plan-premium ${plan === 'subscriber' ? 'plan-selected' : ''}`}
              onClick={() => setPlan('subscriber')}
            >
              <div className="plan-badge">⭐ MOST POPULAR</div>
              <div className="plan-icon">🏆</div>
              <div className="plan-name">Monthly Subscriber</div>
              <div className="plan-price">
                <span className="price-num gradient-text">₹299</span>
                <span className="price-period">/ month</span>
              </div>
              <div className="plan-roll-preview">
                <span className="roll-label">Your Roll No.</span>
                <span className="roll-num subscriber-roll">
                  WWJ-{formData.grade}{formData.city.slice(0, 3).toUpperCase()}26-???? <span className="blue-tick-preview">✓</span>
                </span>
              </div>
              <ul className="plan-features">
                <li>✅ Everything in Free</li>
                <li>✅ <strong>Blue Tick ✓ verified</strong></li>
                <li>✅ Priority AI responses</li>
                <li>✅ Parent dashboard alerts</li>
                <li>✅ Certificate of completion</li>
                <li>✅ Exclusive subscriber badge</li>
              </ul>
              <div className={`plan-select-btn plan-select-premium ${plan === 'subscriber' ? 'selected' : ''}`}>
                {plan === 'subscriber' ? '✓ Selected' : 'Select Plan'}
              </div>
            </div>
          </div>

          <div className="plan-actions">
            {errorMsg && <div className="error-message" style={{ color: '#FF4466', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>{errorMsg}</div>}
            <button 
              className="ob-btn-primary pulse" 
              onClick={() => handlePlanSubmit(plan)}
              disabled={isSubmitting}
            >
               {isSubmitting ? 'Creating Profile...' : 'Proceed to Subscribe →'}
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .ob-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--background);
          padding: 2rem 1rem;
        }
        .ob-card {
          width: 100%;
          max-width: 480px;
          padding: 2.5rem;
          border-radius: 2rem;
        }
        .ob-wide { max-width: 820px; }
        .ob-logo { display: flex; align-items: center; gap: .25rem; margin-bottom: 1.25rem; }
        .ob-title { font-size: 1.8rem; font-weight: 900; margin-bottom: .35rem; }
        .ob-sub { color: var(--muted); font-weight: 600; font-size: .9rem; margin-bottom: 1.75rem; }
        .ob-back { background: none; border: none; color: var(--muted); font-weight: 700; cursor: pointer; font-size: .85rem; margin-bottom: 1.25rem; padding: 0; font-family: 'Space Grotesk',sans-serif; }
        .ob-back:hover { color: var(--foreground); }

        .ob-form { display: flex; flex-direction: column; gap: 1.25rem; }
        .input-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .input-group { display: flex; flex-direction: column; gap: .4rem; }
        label { font-size: .72rem; font-weight: 900; color: var(--foreground); text-transform: uppercase; letter-spacing: .06em; }
        input, select {
          padding: .75rem 1rem;
          border-radius: .85rem;
          border: 1.5px solid var(--border);
          background: rgba(108,99,255,.05);
          color: var(--foreground);
          font-family: 'Space Grotesk', sans-serif;
          font-size: .95rem;
          font-weight: 600;
          transition: all .2s;
        }
        input:focus, select:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(108,99,255,.15); }
        select option { background: #1a1a2e; color: white; }

        .ob-btn-primary {
          width: 100%;
          padding: .95rem;
          border-radius: 1.1rem;
          background: linear-gradient(135deg, var(--primary), #8b5cf6);
          color: white;
          font-weight: 900;
          font-size: 1rem;
          font-family: 'Space Grotesk', sans-serif;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(108,99,255,.4);
          transition: all .25s;
          margin-top: .5rem;
        }
        .ob-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(108,99,255,.5); }

        /* PLAN GRID */
        .plan-grid { display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 1.75rem; align-items: center; }
        .plan-card {
          width: 100%;
          max-width: 400px;
          position: relative;
          padding: 1.5rem;
          border-radius: 1.5rem;
          border: 2px solid var(--border);
          background: rgba(108,99,255,.04);
          cursor: pointer;
          transition: all .2s;
          display: flex;
          flex-direction: column;
          gap: .65rem;
        }
        .plan-card:hover { border-color: rgba(108,99,255,.4); transform: translateY(-2px); }
        .plan-selected { border-color: var(--primary) !important; background: rgba(108,99,255,.1) !important; }
        .plan-premium { border-color: rgba(255,209,102,.3); background: rgba(255,209,102,.04); }
        .plan-premium.plan-selected { border-color: #FFD166 !important; background: rgba(255,209,102,.1) !important; }

        .plan-badge {
          position: absolute;
          top: -1px;
          right: 1rem;
          background: linear-gradient(135deg, #FFD166, #FF8C5A);
          color: #1a1a2e;
          font-size: .62rem;
          font-weight: 900;
          padding: .2rem .65rem;
          border-radius: 0 0 .6rem .6rem;
          letter-spacing: .06em;
        }
        .plan-icon { font-size: 1.75rem; }
        .plan-name { font-size: 1rem; font-weight: 900; color: var(--foreground); }
        .plan-price { display: flex; align-items: baseline; gap: .35rem; }
        .price-num { font-size: 1.6rem; font-weight: 900; color: var(--foreground); }
        .price-period { font-size: .75rem; color: var(--muted); font-weight: 700; }

        .plan-roll-preview {
          display: flex;
          flex-direction: column;
          gap: .2rem;
          padding: .6rem .85rem;
          border-radius: .75rem;
          background: rgba(108,99,255,.08);
          border: 1px solid rgba(108,99,255,.15);
        }
        .roll-label { font-size: .6rem; font-weight: 900; color: var(--muted); text-transform: uppercase; letter-spacing: .08em; }
        .roll-num { font-size: .78rem; font-weight: 900; font-family: 'Space Mono', monospace; color: var(--foreground); }
        .free-roll { color: var(--muted); }
        .subscriber-roll { color: var(--primary-glow); }
        .blue-tick-preview {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #1DA1F2;
          color: white;
          font-size: .55rem;
          font-weight: 900;
          margin-left: .25rem;
          vertical-align: middle;
        }

        .plan-features { list-style: none; display: flex; flex-direction: column; gap: .35rem; font-size: .78rem; font-weight: 600; color: var(--foreground); }
        .plan-features .muted { color: var(--muted); text-decoration: line-through; opacity: .5; }

        .plan-select-btn {
          margin-top: auto;
          padding: .55rem 1rem;
          border-radius: .75rem;
          border: 1.5px solid rgba(108,99,255,.35);
          background: transparent;
          color: var(--primary-glow);
          font-size: .8rem;
          font-weight: 900;
          text-align: center;
          transition: all .15s;
        }
        .plan-select-btn.selected { background: var(--primary); color: white; border-color: var(--primary); }
        .plan-select-premium { border-color: rgba(255,209,102,.4); color: #FFD166; }
        .plan-select-premium.selected { background: linear-gradient(135deg, #FFD166, #FF8C5A); color: #1a1a2e; border-color: transparent; }

        .plan-cta { display: flex; flex-direction: column; align-items: center; gap: .6rem; }
        .plan-cta .ob-btn-primary { max-width: 420px; }
        .plan-cta-note { font-size: .72rem; color: var(--muted); font-weight: 600; }

        @media (max-width: 640px) {
          .plan-grid { grid-template-columns: 1fr; }
          .ob-wide { max-width: 480px; }
        }
      `}</style>
    </div>
  );
}
