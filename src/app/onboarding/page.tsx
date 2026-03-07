"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        grade: '',
        school: '',
        city: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate saving profile
        localStorage.setItem('wwj_profile', JSON.stringify(formData));
        router.push('/');
    };

    return (
        <div className="onboarding-page">
            <div className="onboarding-card premium-glass">
                <div className="header">
                    <h1 className="gradient-text">Create Your Profile</h1>
                    <p>Join the future of Indian wealth creators.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="input-group">
                            <label>Full Name</label>
                            <input
                                type="text" required placeholder="Enter your name"
                                value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="input-row">
                            <div className="input-group">
                                <label>Age</label>
                                <input
                                    type="number" required min="10" max="22" placeholder="Your age"
                                    value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })}
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
                                value={formData.school} onChange={e => setFormData({ ...formData, school: e.target.value })}
                            />
                        </div>
                        <div className="input-group">
                            <label>City</label>
                            <input
                                type="text" required placeholder="e.g. Bangalore"
                                value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn-primary full-width">Start Your Journey</button>
                </form>
            </div>

            <style jsx>{`
        .onboarding-page {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
        }
        .onboarding-card {
          width: 100%;
          max-width: 500px;
          padding: 3rem;
          border-radius: 2.5rem;
          background: white;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.05);
        }
        .header { text-align: center; margin-bottom: 2.5rem; }
        h1 { font-size: 2.25rem; font-weight: 900; margin-bottom: 0.5rem; }
        p { color: #64748b; font-weight: 600; }
        .form-grid { display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 2.5rem; }
        .input-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .input-group { display: flex; flex-direction: column; gap: 0.5rem; }
        label { font-size: 0.85rem; font-weight: 800; color: #1e293b; text-transform: uppercase; letter-spacing: 0.05em; }
        input, select {
          padding: 0.8rem 1.2rem;
          border-radius: 1rem;
          border: 1.5px solid #e2e8f0;
          font-family: inherit;
          font-size: 1rem;
          font-weight: 600;
          transition: all 0.2s;
        }
        input:focus, select:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(129, 140, 248, 0.1);
        }
        .full-width { width: 100%; padding: 1rem; font-size: 1.1rem; }
      `}</style>
        </div>
    );
}
