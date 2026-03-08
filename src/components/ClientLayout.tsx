"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

const navLinks = [
  { href: "/", icon: "🏠", label: "Home" },
  { href: "/campus", icon: "🏛️", label: "Campus" },
  { href: "/ai-teacher", icon: "🎓", label: "Sir (AI Teacher)" },
  { href: "/classes", icon: "📅", label: "Classes" },
  { href: "/lab", icon: "🧪", label: "Activity Lab" },
  { href: "/gps", icon: "🧭", label: "Freedom GPS" },
  { href: "/leaderboard", icon: "🏆", label: "Leaderboard" },
  { href: "/profile", icon: "🧑", label: "My Profile" },
  { href: "/parent/dashboard", icon: "👪", label: "Parent Dashboard" },
];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();

  // Define public routes that don't need authentication
  const publicRoutes = ["/", "/parent", "/onboarding", "/terms", "/privacy", "/refund", "/contact"];
  const isPublicRoute = publicRoutes.includes(path);
  const isLandingPage = path === "/parent" || path === "/" || path === "/onboarding";

  // Read student profile from localStorage
  const [profile, setProfile] = useState<{
    name: string; grade: string; city: string;
    rollNumber: string; isSubscriber: boolean; avatar?: string;
  } | null>(null);
  const [isLooingForAuth, setIsLookingForAuth] = useState(true);

  useEffect(() => {
    let storedProfile = null;
    try {
      const raw = localStorage.getItem('wwj_profile');
      if (raw) storedProfile = JSON.parse(raw);
    } catch {}

    setProfile(storedProfile);
    setIsLookingForAuth(false);

    // If on a private route and no profile, redirect to home
    if (!storedProfile && !publicRoutes.includes(window.location.pathname)) {
      router.push("/");
    }
  }, [path, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("wwj_profile");
    setProfile(null);
    router.push("/");
  };

  const firstName = profile?.name?.split(' ')[0] || 'Student';
  const avatarImage = profile?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(profile?.name || firstName)}`;

  // Prevent flash of private content during auth check
  if (isLooingForAuth && !isPublicRoute) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <div className={`main-layout ${isLandingPage ? "full-page" : ""}`}>
      {!isLandingPage && (
        <aside className="sidebar">
          <div className="logo">
            <span className="gradient-text" style={{ fontWeight: 900, fontSize: "1.4rem", letterSpacing: "-0.03em" }}>WealthWise</span>
            <span className="logo-jr">Jr.</span>
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
              <div className="xp-label"><span>XP</span><span className="xp-val">2,450 / 3,000</span></div>
              <div className="xp-track"><div className="xp-fill" style={{ width: "82%" }} /></div>
            </div>
            <div className="streak-badge" style={{ marginBottom: "0.5rem" }}>🔥 21 Day Streak</div>
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
                <span className="points-val">12,450 WP</span>
              </div>
              <div className="rank-badge">🥇 Rank #4</div>
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
