"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

interface DashboardData {
  profile: {
    name: string;
    grade: string;
    school: string;
    city: string;
    xp: number;
    streak: number;
    attendedCount: number;
    isSubscriber: boolean;
    joinedAt: string;
  };
  ranks: {
    cityRank: number | null;
    cityTotal: number;
    overallRank: number | null;
  };
  cityTopStudents: Array<{
    rank: number;
    name: string;
    school: string;
    xp: number;
    isMe: boolean;
  }>;
  recentAttendance: Array<{
    class_id: string;
    grade: number;
    module: number;
    week: number;
    day: string;
    xp_earned: number;
    created_at: string;
  }>;
}

export default function ParentPortal() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setError("Please sign in to view the parent dashboard."); setLoading(false); return; }

      const res = await fetch("/api/parent/dashboard", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (!res.ok) { setError("Could not load dashboard data."); setLoading(false); return; }
      setData(await res.json());
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return (
    <div className="legal-page" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
      <p style={{ color: "var(--muted)" }}>Loading student report…</p>
    </div>
  );

  if (error || !data) return (
    <div className="legal-page">
      <header className="legal-header">
        <Link href="/campus" className="back-link">← Back to Campus</Link>
        <h1 className="gradient-text">Parent Portal</h1>
      </header>
      <main className="legal-content premium-glass">
        <p style={{ color: "var(--muted)" }}>{error || "No data available."}</p>
      </main>
    </div>
  );

  const { profile, ranks, cityTopStudents, recentAttendance } = data;
  const joinedYear = new Date(profile.joinedAt).getFullYear();

  return (
    <div className="legal-page">
      <header className="legal-header">
        <Link href="/campus" className="back-link">← Back to Campus</Link>
        <h1 className="gradient-text">Parent Portal</h1>
        <p>Progress report for <strong>{profile.name}</strong> · Class {profile.grade} · {profile.school}</p>
      </header>

      <main className="legal-content" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

        {/* KPIs */}
        <div className="premium-glass" style={{ padding: "1.5rem 2rem", borderRadius: "1.5rem" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--muted)", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>At a Glance</h2>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {[
              { icon: "💎", value: profile.xp.toLocaleString(), label: "WealthPoints" },
              { icon: "🔥", value: profile.streak, label: "Day Streak" },
              { icon: "📚", value: profile.attendedCount, label: "Classes Done" },
              { icon: "🏙️", value: ranks.cityRank ? `#${ranks.cityRank} of ${ranks.cityTotal}` : "—", label: "City Rank" },
              { icon: "🌏", value: ranks.overallRank ? `#${ranks.overallRank}` : "—", label: "Overall Rank" },
            ].map(k => (
              <div key={k.label} className="premium-glass" style={{ padding: "0.75rem 1.25rem", borderRadius: "1rem", minWidth: "120px", textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem" }}>{k.icon}</div>
                <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "var(--foreground)" }}>{k.value}</div>
                <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{k.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Student details */}
        <div className="premium-glass" style={{ padding: "1.5rem 2rem", borderRadius: "1.5rem" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--muted)", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Student Details</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.75rem" }}>
            {[
              { label: "Name", value: profile.name },
              { label: "Grade", value: `Class ${profile.grade}` },
              { label: "School", value: profile.school || "—" },
              { label: "City", value: profile.city || "—" },
              { label: "Subscription", value: profile.isSubscriber ? "✅ Active" : "Free Explorer" },
              { label: "Member Since", value: joinedYear.toString() },
            ].map(d => (
              <div key={d.label} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "0.5rem" }}>
                <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{d.label}</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--foreground)", marginTop: "0.2rem" }}>{d.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* City Leaderboard */}
        <div className="premium-glass" style={{ padding: "1.5rem 2rem", borderRadius: "1.5rem" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--muted)", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>🏆 City Rankings — {profile.city}</h2>
          {cityTopStudents.length === 0
            ? <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>No ranking data available yet.</p>
            : cityTopStudents.map(s => (
              <div key={s.rank} style={{
                display: "flex", alignItems: "center", gap: "1rem", padding: "0.6rem 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                background: s.isMe ? "rgba(0,229,160,0.05)" : "transparent",
                borderRadius: s.isMe ? "0.5rem" : undefined,
                paddingLeft: s.isMe ? "0.5rem" : undefined,
              }}>
                <span style={{ fontWeight: 900, color: s.rank <= 3 ? "var(--neon-green)" : "var(--muted)", minWidth: "2rem" }}>#{s.rank}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: s.isMe ? "var(--neon-green)" : "var(--foreground)" }}>{s.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{s.school}</div>
                </div>
                <span style={{ fontWeight: 700, color: "var(--foreground)" }}>{s.xp.toLocaleString()} pts</span>
              </div>
            ))
          }
        </div>

        {/* Recent Attendance */}
        <div className="premium-glass" style={{ padding: "1.5rem 2rem", borderRadius: "1.5rem" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--muted)", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>📅 Recent Classes Attended</h2>
          {recentAttendance.length === 0
            ? <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>No classes attended yet.</p>
            : recentAttendance.map((a, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "1rem",
                padding: "0.6rem 0", borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}>
                <span style={{ fontSize: "1.25rem" }}>✅</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: "var(--foreground)", fontSize: "0.9rem" }}>
                    Module {a.module} · Week {a.week} · {a.day}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                    {new Date(a.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </div>
                </div>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--neon-green)" }}>+{a.xp_earned} XP</span>
              </div>
            ))
          }
        </div>

      </main>
    </div>
  );
}
