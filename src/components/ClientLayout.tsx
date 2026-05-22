"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useProfile } from "@/hooks/useProfile";

const navLinks = [
  { href: "/campus", icon: "🏛️", label: "Campus" },
  { href: "/ai-teacher", icon: "🎓", label: "Sir (AI Teacher)" },
  { href: "/classes", icon: "📅", label: "Classes" },
  { href: "/lab", icon: "🧪", label: "Activity Lab" },
  { href: "/gps", icon: "🧭", label: "Freedom GPS" },
  { href: "/leaderboard", icon: "🏆", label: "Leaderboard" },
  { href: "/profile", icon: "🧑", label: "My Profile" },
  { href: "/parent", icon: "👪", label: "Parent Dashboard" },
];

const publicRoutes = ["/", "/apply", "/onboarding", "/terms", "/privacy", "/refund", "/contact"];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const { profile, isLoading } = useProfile();

  const isPublicRoute = publicRoutes.includes(path);
  const isLandingPage = path === "/" || path === "/onboarding";
  const isAdmin = profile?.isAdmin ?? false;

  useEffect(() => {
    if (!isLoading && !profile && !isPublicRoute) {
      router.push("/onboarding");
    }
  }, [isLoading, profile, isPublicRoute, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("wwj_profile");
    router.push("/onboarding");
  };

  const firstName = profile?.name?.split(' ')[0] || 'Student';
  const avatarImage = profile?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(profile?.name || firstName)}`;

  const xp = profile?.xp_total ?? 0;
  const xpMax = 3000;
  const xpPct = Math.min(100, Math.round((xp / xpMax) * 100));
  const streak = profile?.current_streak ?? 0;

  if (isLoading && !isPublicRoute) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <div className={`main-layout ${isLandingPage ? "full-page" : ""}`}>
      {!isLandingPage && (
        <aside className="sidebar">
          <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/logo.png" alt="WealthWise Jr." style={{ height: '60px', width: 'auto' }} />
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
              <span className="gradient-text" style={{ fontWeight: 900, fontSize: "1.4rem", letterSpacing: "-0.03em" }}>WealthWise</span>
              <span className="logo-jr">Jr.</span>
            </div>
          </div>

          <nav>
            <ul>
              {navLinks.map(l => (
                <li key={l.href} className={path === l.href ? "active" : ""}>
                  <Link href={l.href}>
                    <span className="nav-icon">{l.icon}</span>
                    <span>{l.label}</span>
                    {(l as any).badge && <span className="nav-badge">{(l as any).badge}</span>}
                  </Link>
                </li>
              ))}
              {isAdmin && (
                <li className={path === '/admin' ? 'active' : ''} style={{ marginTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '0.5rem' }}>
                  <Link href="/admin">
                    <span className="nav-icon">🛡️</span>
                    <span>Admin Panel</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          <div className="sidebar-footer">
            {profile && (
              <div className="sb-profile">
                <div className="sb-name">
                  {firstName}
                  {profile.isSubscriber && (
                    <span className="blue-tick" title="Monthly Subscriber">✓</span>
                  )}
                </div>
                <div className="sb-roll">{profile.rollNumber}</div>
              </div>
            )}
            <div className="xp-bar">
              <div className="xp-label">
                <span>XP</span>
                <span className="xp-val">{xp.toLocaleString('en-IN')} / {xpMax.toLocaleString('en-IN')}</span>
              </div>
              <div className="xp-track"><div className="xp-fill" style={{ width: `${xpPct}%` }} /></div>
            </div>
            <div className="streak-badge" style={{ marginBottom: "0.5rem" }}>🔥 {streak} Day Streak</div>
            <button className="btn-logout" onClick={handleLogout}>
              <span className="nav-icon">🚪</span> Logout
            </button>
          </div>
        </aside>
      )}

      <main className="content">
        {!isLandingPage && (
          <header className="top-bar">
            <div className="search-wrap">
              <span className="search-icon">🔍</span>
              <input type="text" placeholder="Search lessons, topics…" />
            </div>
            <div className="top-right">
              {profile && (
                <div className="roll-chip">
                  <span className="roll-chip-num">{profile.rollNumber}</span>
                  {profile.isSubscriber && (
                    <span className="blue-tick" title="Monthly Subscriber">✓</span>
                  )}
                </div>
              )}
              <div className="points-badge">
                <span className="points-icon">💎</span>
                <span className="points-val">{xp.toLocaleString('en-IN')} WP</span>
              </div>
              <Link href="/leaderboard" className="rank-badge">🏆 Leaderboard</Link>
              <Link href="/profile" className="avatar-wrap">
                <img src={avatarImage} alt="avatar" />
                <div className="avatar-glow" />
                {profile?.isSubscriber && <span className="avatar-tick">✓</span>}
              </Link>
            </div>
          </header>
        )}
        <div className="page-body">
          {children}
        </div>
      </main>
    </div>
  );
}
