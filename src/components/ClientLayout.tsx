"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", icon: "🏛️", label: "Campus" },
  { href: "/classes", icon: "🎥", label: "Video Classes", badge: "MWF" },
  { href: "/library", icon: "📚", label: "Theory Wing" },
  { href: "/lab", icon: "🧪", label: "Activity Lab" },
  { href: "/gps", icon: "🧭", label: "Freedom GPS" },
  { href: "/leaderboard", icon: "🏆", label: "Leaderboard" },
  { href: "/parent", icon: "👪", label: "For Parents" },
];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  // Hide sidebar on parent landing page so it has full width
  const isParentPage = path === "/parent";

  return (
    <div className={`main-layout ${isParentPage ? "full-page" : ""}`}>
      {!isParentPage && (
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
            <div className="xp-bar">
              <div className="xp-label"><span>XP</span><span className="xp-val">2,450 / 3,000</span></div>
              <div className="xp-track"><div className="xp-fill" style={{ width: "82%" }} /></div>
            </div>
            <div className="streak-badge">🔥 21 Day Streak</div>
          </div>
        </aside>
      )}

      <main className="content">
        {!isParentPage && (
          <header className="top-bar">
            <div className="search-wrap">
              <span className="search-icon">🔍</span>
              <input type="text" placeholder="Search lessons, topics…" />
            </div>
            <div className="top-right">
              <div className="points-badge">
                <span className="points-icon">💎</span>
                <span className="points-val">12,450 WP</span>
              </div>
              <div className="rank-badge">🥇 Rank #4</div>
              <div className="avatar-wrap">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aaryan" alt="avatar" />
                <div className="avatar-glow" />
              </div>
            </div>
          </header>
        )}
        <div className="page-body">
          {children}
        </div>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

        .main-layout {
          display: flex;
          min-height: 100vh;
        }
        .main-layout.full-page .content { width: 100%; }

        /* ── SIDEBAR ── */
        .sidebar {
          width: 240px;
          flex-shrink: 0;
          background: rgba(10,15,44,0.95);
          border-right: 1px solid rgba(108,99,255,0.15);
          padding: 1.5rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
          backdrop-filter: blur(20px);
          box-shadow: 4px 0 30px rgba(0,0,0,0.4);
        }

        .logo {
          display: flex;
          align-items: baseline;
          gap: 0.3rem;
          padding: 0.5rem 0.75rem;
        }
        .logo-jr {
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--neon-green);
          font-family: 'Space Mono', monospace;
        }

        nav ul { list-style: none; display: flex; flex-direction: column; gap: 0.25rem; }
        nav li a {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.7rem 0.9rem;
          border-radius: 0.85rem;
          font-size: 0.88rem;
          font-weight: 600;
          color: #8B9CC8;
          text-decoration: none;
          transition: all 0.2s;
          letter-spacing: 0.01em;
        }
        nav li a:hover {
          background: rgba(108,99,255,0.10);
          color: var(--foreground);
        }
        nav li.active a {
          background: linear-gradient(135deg, rgba(108,99,255,0.20) 0%, rgba(0,229,160,0.10) 100%);
          color: white;
          border: 1px solid rgba(108,99,255,0.30);
          box-shadow: 0 0 20px rgba(108,99,255,0.15);
        }
        .nav-icon { font-size: 1.1rem; width: 1.5rem; text-align: center; }

        .sidebar-footer { margin-top: auto; display: flex; flex-direction: column; gap: 0.75rem; }
        .xp-label { display: flex; justify-content: space-between; font-size: 0.7rem; font-weight: 700; color: var(--muted); margin-bottom: 0.4rem; }
        .xp-val { color: var(--primary-glow); }
        .xp-track { height: 5px; background: rgba(108,99,255,0.15); border-radius: 3px; overflow: hidden; }
        .xp-fill { height: 100%; background: linear-gradient(90deg, var(--primary), var(--neon-green)); border-radius: 3px; box-shadow: 0 0 8px rgba(0,229,160,0.4); }
        .streak-badge { font-size: 0.78rem; font-weight: 800; padding: 0.5rem 0.9rem; border-radius: 0.75rem; background: rgba(255,107,53,0.12); color: var(--neon-orange); border: 1px solid rgba(255,107,53,0.25); text-align: center; }
        .nav-badge { font-size: 0.6rem; font-weight: 900; padding: 0.15rem 0.45rem; border-radius: 2rem; background: rgba(0,229,160,0.2); color: var(--neon-green); border: 1px solid rgba(0,229,160,0.35); margin-left: auto; letter-spacing: 0.05em; }

        /* ── TOP BAR ── */
        .content { flex: 1; display: flex; flex-direction: column; min-width: 0; }
        .top-bar {
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(5,8,22,0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(108,99,255,0.12);
          box-shadow: 0 4px 30px rgba(0,0,0,0.3);
          flex-shrink: 0;
        }
        .search-wrap {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(14,22,56,0.7);
          border: 1px solid rgba(108,99,255,0.2);
          border-radius: 2rem;
          padding: 0.5rem 1rem;
          width: 260px;
        }
        .search-icon { font-size: 0.85rem; opacity: 0.6; }
        .search-wrap input {
          background: none;
          border: none;
          outline: none;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.85rem;
          color: var(--foreground);
          width: 100%;
        }
        .search-wrap input::placeholder { color: var(--muted); }

        .top-right { display: flex; align-items: center; gap: 0.75rem; }
        .points-badge {
          display: flex; align-items: center; gap: 0.4rem;
          padding: 0.4rem 0.9rem; border-radius: 2rem;
          background: rgba(108,99,255,0.12); border: 1px solid rgba(108,99,255,0.25);
          font-size: 0.8rem; font-weight: 800; color: var(--primary-glow);
        }
        .rank-badge {
          padding: 0.4rem 0.9rem; border-radius: 2rem;
          background: rgba(255,209,102,0.12); border: 1px solid rgba(255,209,102,0.25);
          font-size: 0.8rem; font-weight: 800; color: var(--accent2);
        }
        .avatar-wrap {
          position: relative; width: 40px; height: 40px;
        }
        .avatar-wrap img {
          width: 40px; height: 40px; border-radius: 50%;
          border: 2px solid var(--primary); object-fit: cover;
        }
        .avatar-glow {
          position: absolute; inset: -3px; border-radius: 50%;
          background: conic-gradient(var(--primary), var(--neon-green), var(--primary));
          z-index: -1; animation: spin 4s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .page-body { padding: 2rem; flex: 1; position: relative; z-index: 1; }

        @media (max-width: 900px) {
          .sidebar { display: none; }
          .top-bar { padding: 0 1rem; }
          .search-wrap { width: 180px; }
          .page-body { padding: 1.25rem; }
        }
      `}</style>
    </div>
  );
}
