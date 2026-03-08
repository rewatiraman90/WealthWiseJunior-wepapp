"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function LeaderboardPage() {
    const [city, setCity] = useState('Bangalore');
    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .ilike('city', `%${city}%`);
                
            if (error) {
                console.error("Error fetching students:", error);
                setStudents([]);
            } else if (data) {
                // Map DB schema to UI schema, generating fake XP for demo since it's not tracked yet
                const mapped = data.map((p, i) => ({
                    ...p,
                    xp: 5000 - i * 100, // Fake XP for visual graph
                    earnings: 1200,
                    testGrade: 'A',
                })).sort((a, b) => b.xp - a.xp);
                setStudents(mapped);
            }
            setLoading(false);
        };

        fetchStudents();
    }, [city]);

    const maxXP = Math.max(...students.map(s => s.xp), 1);

    return (
        <div className="campus-container">
            <header className="campus-hero">
                <div className="campus-info">
                    <Link href="/" className="back-link">← Back to Campus</Link>
                    <h1 className="gradient-text">City Leaderboard</h1>
                    <p className="subtitle">Real-time rankings for students in {city}</p>
                </div>
                <div className="city-selector">
                    <select value={city} onChange={e => setCity(e.target.value)} className="premium-glass">
                        <option value="Bangalore">Bangalore</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Pune">Pune</option>
                    </select>
                </div>
            </header>

            <div className="leaderboard-grid">
                <section className="rankings-chart premium-glass">
                    <div className="chart-header">
                        <h3>Visual Ranking (XP Power)</h3>
                        <p>Top performers by experience points.</p>
                    </div>
                    <div className="vertical-graph">
                        {loading ? <p style={{textAlign: 'center', width: '100%', color: '#64748b'}}>Loading Live Data...</p> : students.length === 0 ? <p style={{textAlign: 'center', width: '100%', color: '#64748b'}}>No students found in {city} yet.</p> : students.slice(0, 5).map((s, idx) => (
                            <div key={idx} className="graph-bar-container">
                                <div className="bar-wrapper">
                                    <div
                                        className="graph-bar"
                                        style={{ height: `${(s.xp / maxXP) * 100}%` }}
                                    >
                                        <span className="bar-val">{s.xp}</span>
                                    </div>
                                </div>
                                <span className="bar-name">{s.name.split(' ')[0]}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="student-scroll premium-glass">
                    <div className="section-header">
                        <h3>Student Profiles</h3>
                        <p>Scroll to see performance details across {city}.</p>
                    </div>
                    <div className="profile-list">
                        {loading ? <p style={{textAlign: 'center', padding: '2rem', color: '#64748b'}}>Loading Live Data...</p> : students.length === 0 ? <p style={{textAlign: 'center', padding: '2rem', color: '#64748b'}}>Be the first to join from {city}!</p> : students.map((s, idx) => (
                            <div key={idx} className="student-card">
                                <div className="rank-badge">#{idx + 1}</div>
                                <div className="student-info">
                                    <div className="name-row">
                                        <h4>{s.name}</h4>
                                        <span className="grade-pill">Class {s.grade}</span>
                                    </div>
                                    <p className="school-text">{s.school}</p>
                                </div>
                                <div className="student-stats">
                                    <div className="mini-stat">
                                        <span className="label">Earning</span>
                                        <span className="val">₹{s.earnings}</span>
                                    </div>
                                    <div className="mini-stat">
                                        <span className="label">Grade</span>
                                        <span className="val">{s.testGrade}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <style jsx>{`
        .campus-container { display: flex; flex-direction: column; gap: 2rem; }
        .campus-hero { display: flex; justify-content: space-between; align-items: flex-end; }
        .back-link { color: var(--primary); text-decoration: none; font-weight: 700; margin-bottom: 0.5rem; display: block; }
        h1 { font-size: 2.5rem; font-weight: 900; }
        .subtitle { color: #64748b; font-weight: 600; }

        .city-selector select { 
          padding: 0.6rem 1.2rem; 
          border-radius: 1rem; 
          border: 1px solid var(--border); 
          font-weight: 700; 
          color: var(--primary);
          cursor: pointer;
        }

        .leaderboard-grid { display: grid; grid-template-columns: 1fr 400px; gap: 2rem; align-items: start; }
        
        .rankings-chart { padding: 2rem; border-radius: 2rem; background: white; border: 1px solid var(--border); height: 500px; display: flex; flex-direction: column; }
        .chart-header { margin-bottom: 3rem; }
        .chart-header h3 { font-size: 1.25rem; font-weight: 800; }
        
        .vertical-graph { flex-grow: 1; display: flex; justify-content: space-around; align-items: flex-end; padding-bottom: 2rem; }
        .graph-bar-container { display: flex; flex-direction: column; align-items: center; gap: 1rem; height: 100%; width: 60px; }
        .bar-wrapper { flex-grow: 1; width: 100%; display: flex; align-items: flex-end; position: relative; }
        .graph-bar { 
          width: 100%; 
          background: linear-gradient(0deg, var(--primary), var(--secondary)); 
          border-radius: 0.75rem 0.75rem 0 0;
          position: relative;
          transition: height 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
        }
        .graph-bar:hover { filter: brightness(1.1); }
        .bar-val { position: absolute; top: -1.5rem; left: 50%; transform: translateX(-50%); font-size: 0.75rem; font-weight: 800; color: var(--primary); }
        .bar-name { font-size: 0.85rem; font-weight: 700; color: #64748b; }

        .student-scroll { padding: 2rem; border-radius: 2rem; background: #f8fafc; border: 1px solid var(--border); max-height: 800px; display: flex; flex-direction: column; }
        .section-header { margin-bottom: 1.5rem; }
        .profile-list { overflow-y: auto; display: flex; flex-direction: column; gap: 1rem; padding-right: 0.5rem; }
        
        .student-card { 
          display: flex; 
          align-items: center; 
          gap: 1rem; 
          padding: 1.2rem; 
          background: white; 
          border-radius: 1.2rem; 
          border: 1px solid var(--border);
          transition: transform 0.2s;
        }
        .student-card:hover { transform: scale(1.02); border-color: var(--primary); }
        
        .rank-badge { 
          width: 40px; height: 40px; background: #eef2ff; color: var(--primary); 
          display: flex; align-items: center; justify-content: center; 
          border-radius: 50%; font-weight: 900; font-size: 0.85rem;
        }
        
        .student-info { flex-grow: 1; }
        .name-row { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.2rem; }
        h4 { font-weight: 800; font-size: 1rem; color: #1e293b; }
        .grade-pill { font-size: 0.65rem; font-weight: 900; background: #f1f5f9; padding: 0.1rem 0.4rem; border-radius: 0.4rem; color: #64748b; }
        .school-text { font-size: 0.75rem; color: #94a3b8; font-weight: 600; }
        
        .student-stats { display: flex; gap: 1rem; }
        .mini-stat { display: flex; flex-direction: column; align-items: flex-end; }
        .mini-stat .label { font-size: 0.6rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; }
        .mini-stat .val { font-size: 0.85rem; font-weight: 800; color: var(--primary); }

        @media (max-width: 1024px) { .leaderboard-grid { grid-template-columns: 1fr; } }
      `}</style>
        </div>
    );
}
