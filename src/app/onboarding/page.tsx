"use client";
import { useState, useEffect } from 'react';
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
type BillingCycle = 'monthly' | 'annual';

const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<'loading' | 'signin' | 'info' | 'plan'>('loading');
  const [formData, setFormData] = useState({
    name: '', age: '', grade: '', school: '', city: ''
  });
  
  // Auth state
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const [plan, setPlan] = useState<Plan>('subscriber');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [sessionUid, setSessionUid] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setStep('signin');
        return;
      }

      setSessionUid(session.user.id);

      // Check if user already has a profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (profile) {
        // Logged in and profile exists. Save to local storage for instant UI sync and redirect.
        localStorage.setItem('wwj_profile', JSON.stringify({ ...profile, rollNumber: profile.roll_number, avatar: profile.avatar_url }));
        router.push('/campus');
      } else {
        // Logged in but no profile. Let's pre-fill name if available.
        if (session.user.user_metadata?.full_name) {
          setFormData(prev => ({ ...prev, name: session.user.user_metadata.full_name }));
        }
        setStep('info');
      }
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        checkSession();
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/onboarding'
      }
    });
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthLoading(true);
    setAuthError('');

    try {
      if (authMode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        // The auth listener will detect the login and advance the step
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        // The auth listener will detect the login and advance the step
      }
    } catch (err: any) {
      setAuthError(err.message || "Failed to authenticate.");
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('plan');
  };

  const handlePlanSubmit = async (selectedPlan: Plan) => {
    if (!sessionUid) return;
    setIsSubmitting(true);
    setErrorMsg('');
    const rollNumber = generateRollNumber(formData.grade, formData.city);
    const isSubscriber = selectedPlan === 'subscriber';
    
    try {
      if (isSubscriber) {
        const res = await initializeRazorpay();
        if (!res) {
          throw new Error("Razorpay SDK failed to load. Are you online?");
        }

        const data = await fetch("/api/razorpay/create-subscription", {
          method: "POST",
          body: JSON.stringify({ planType: billingCycle })
        }).then(t => t.json());

        if (!data.success) {
          throw new Error(data.error || "Failed to create subscription. Please try again.");
        }

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          name: "WealthWise Jr.",
          description: billingCycle === 'annual' ? "Annual Subscriber Upgrade" : "Monthly Subscriber Upgrade",
          subscription_id: data.subscription_id,
          handler: async function (response: any) {
            try {
              const verifyData = await fetch("/api/razorpay/verify", {
                method: "POST",
                body: JSON.stringify({
                  razorpay_subscription_id: response.razorpay_subscription_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  userId: sessionUid,
                })
              }).then(t => t.json());

              if (verifyData.success) {
                const profileInfo = {
                  id: sessionUid,
                  name: formData.name,
                  age: parseInt(formData.age),
                  grade: formData.grade,
                  school: formData.school,
                  city: formData.city,
                  roll_number: rollNumber,
                  is_subscriber: true,
                };
                
                const { error: insertError } = await supabase.from('profiles').insert([profileInfo]);
                if (insertError) {
                  console.error("Profile insert error post payment:", insertError);
                }
                
                localStorage.setItem('wwj_profile', JSON.stringify({ ...profileInfo, rollNumber }));
                window.location.href = '/campus';
              } else {
                setErrorMsg("Payment verification failed. Please contact support.");
                setIsSubmitting(false);
              }
            } catch (err) {
              setErrorMsg("An error occurred during verification.");
              setIsSubmitting(false);
            }
          },
          prefill: {
            name: formData.name,
          },
          theme: {
            color: "#6c63ff"
          }
        };

        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.on('payment.failed', function (response: any) {
          setErrorMsg(response.error.description || "Payment failed");
          setIsSubmitting(false);
        });
        paymentObject.open();

      } else {
        const profileInfo = {
          id: sessionUid,
          name: formData.name,
          age: parseInt(formData.age),
          grade: formData.grade,
          school: formData.school,
          city: formData.city,
          roll_number: rollNumber,
          is_subscriber: false,
        };

        const { error: insertError } = await supabase.from('profiles').insert([profileInfo]);
        if (insertError) throw new Error(insertError.message || 'Failed to save profile data.');

        localStorage.setItem('wwj_profile', JSON.stringify({ ...profileInfo, rollNumber }));
        
        // Use window.location instead of router push to ensure state fully refreshes down the line
        window.location.href = '/campus';
      }

    } catch (err: any) {
      setErrorMsg(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ob-root">
      {step === 'loading' && (
        <div className="ob-card premium-glass" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div className="ob-logo" style={{ justifyContent: 'center' }}>
            <span className="gradient-text" style={{ fontWeight: 900, fontSize: '1.5rem' }}>WealthWise</span>
            <span style={{ color: 'var(--neon-green)', fontWeight: 900, fontSize: '1.5rem' }}>Jr.</span>
          </div>
          <p className="ob-sub" style={{ margin: 0, color: 'var(--primary-glow)' }}>Verifying credentials...</p>
        </div>
      )}

      {step === 'signin' && (
        <div className="ob-card premium-glass" style={{ textAlign: 'center' }}>
          <div className="ob-logo" style={{ justifyContent: 'center' }}>
            <span className="gradient-text" style={{ fontWeight: 900, fontSize: '1.5rem' }}>WealthWise</span>
            <span style={{ color: 'var(--neon-green)', fontWeight: 900, fontSize: '1.5rem' }}>Jr.</span>
          </div>
          <h1 className="gradient-text ob-title" style={{ marginTop: '1rem' }}>Welcome to Campus</h1>
          <p className="ob-sub">Sign in to start your wealth building journey.</p>
          
          <form onSubmit={handleEmailAuth} className="ob-form" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email" required placeholder="name@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password" required placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            {authError && <div style={{ color: '#FF4466', fontSize: '0.8rem', marginTop: '-0.5rem' }}>{authError}</div>}
            
            <button type="submit" className="ob-btn-primary" disabled={isAuthLoading}>
              {isAuthLoading ? 'Please wait...' : (authMode === 'signup' ? 'Create Account' : 'Sign In')}
            </button>
            
            <p style={{ fontSize: '0.8rem', textAlign: 'center', color: 'var(--muted)', marginTop: '0.5rem' }}>
              {authMode === 'signup' ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setAuthMode(authMode === 'signup' ? 'signin' : 'signup')}
                style={{ background: 'none', border: 'none', color: 'var(--primary-glow)', cursor: 'pointer', fontWeight: 'bold' }}
              >
                {authMode === 'signup' ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1rem 0', color: 'var(--muted)', fontSize: '0.8rem', fontWeight: 600 }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
            OR
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
          </div>

          <button 
            className="ob-btn-google pulse" 
            onClick={handleGoogleSignIn}
            style={{ marginTop: '1rem' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span style={{ fontWeight: 800 }}>Continue with Google</span>
          </button>
        </div>
      )}

      {step === 'info' && (
        <div className="ob-card premium-glass">
          <div className="ob-logo">
            <span className="gradient-text" style={{ fontWeight: 900, fontSize: '1.5rem' }}>WealthWise</span>
            <span style={{ color: 'var(--neon-green)', fontWeight: 900, fontSize: '1.5rem' }}>Jr.</span>
          </div>
          <h1 className="gradient-text ob-title">Create Your Profile</h1>
          <p className="ob-sub">Almost there! Complete your student profile.</p>

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
      )}
      
      {step === 'plan' && (
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
              <div className="plan-name">Premium Subscriber</div>
              
              <div className="billing-toggle">
                 <button 
                   className={billingCycle === 'monthly' ? 'active' : ''} 
                   onClick={(e) => { e.stopPropagation(); setBillingCycle('monthly'); }}
                 >
                   Monthly
                 </button>
                 <button 
                   className={billingCycle === 'annual' ? 'active' : ''} 
                   onClick={(e) => { e.stopPropagation(); setBillingCycle('annual'); }}
                 >
                   Annually <span className="discount-badge">20% OFF</span>
                 </button>
              </div>

              <div className="plan-price">
                <span className="price-num gradient-text">
                  {billingCycle === 'annual' ? '₹2868' : '₹299'}
                </span>
                <span className="price-period">
                  {billingCycle === 'annual' ? '/ year' : '/ month'}
                </span>
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

        .ob-btn-google {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-top: 2rem;
          padding: 0.95rem;
          border-radius: 1.1rem;
          background: #ffffff;
          color: #000000;
          font-family: 'Space Grotesk', sans-serif;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(255,255,255,0.1);
          transition: all 0.25s ease;
        }
        .ob-btn-google:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255,255,255,0.2);
        }

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

        .billing-toggle {
           display: flex;
           background: rgba(108,99,255,0.1);
           border-radius: 1rem;
           padding: 0.25rem;
           margin: 0.5rem 0 0.5rem 0;
           align-self: flex-start;
        }
        .billing-toggle button {
           background: transparent;
           border: none;
           color: var(--muted);
           padding: 0.4rem 0.8rem;
           font-size: 0.75rem;
           font-weight: 800;
           border-radius: 0.8rem;
           cursor: pointer;
           transition: all 0.2s;
           font-family: inherit;
        }
        .billing-toggle button.active {
           background: var(--primary);
           color: white;
           box-shadow: 0 2px 10px rgba(108,99,255,0.3);
        }
        .discount-badge {
           background: #FFD166;
           color: #1a1a2e;
           font-size: 0.6rem;
           padding: 0.15rem 0.4rem;
           border-radius: 1rem;
           margin-left: 0.3rem;
           font-weight: 900;
        }

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
