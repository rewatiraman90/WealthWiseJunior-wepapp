"use client";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="main-layout">
            <aside className="sidebar">
                <div className="logo">
                    <span className="gradient-text" style={{ fontWeight: 800, fontSize: '1.5rem' }}>WealthWise</span>
                    <span style={{ fontWeight: 600 }}> Jr.</span>
                </div>
                <nav>
                    <ul>
                        <li className="active">Home</li>
                        <li>Quests</li>
                        <li>My Portfolio</li>
                        <li>Challenges</li>
                    </ul>
                </nav>
            </aside>
            <main className="content">
                <header className="premium-glass">
                    <div className="search-bar">
                        <input type="text" placeholder="Search..." />
                    </div>
                    <div className="user-stats">
                        <div className="stat">
                            <span className="label">WealthPoints</span>
                            <span className="value">₹12,450</span>
                        </div>
                        <div className="avatar">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aaryan" alt="Aaryan" />
                        </div>
                    </div>
                </header>
                <div className="page-body">
                    {children}
                </div>
            </main>

            <style jsx global>{`
        .main-layout {
          display: flex;
          min-height: 100vh;
        }
        .sidebar {
          width: var(--sidebar-width);
          background: white;
          border-right: 1px solid var(--border);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          position: sticky;
          top: 0;
          height: 100vh;
        }
        .logo {
          margin-bottom: 2rem;
        }
        nav ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        nav li {
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          cursor: pointer;
          font-weight: 500;
          color: #64748b;
          transition: all 0.2s;
        }
        nav li:hover {
          background: #f1f5f9;
          color: var(--primary);
        }
        nav li.active {
          background: #eef2ff;
          color: var(--primary);
          font-weight: 600;
        }
        .content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        header {
          height: var(--header-height);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .search-bar input {
          padding: 0.6rem 1rem;
          border-radius: 2rem;
          border: 1px solid var(--border);
          width: 250px;
          outline: none;
          background: #f8fafc;
        }
        .user-stats {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .stat {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .stat .label {
          font-size: 0.75rem;
          color: #64748b;
          font-weight: 600;
          text-transform: uppercase;
        }
        .stat .value {
          font-weight: 700;
          font-size: 1.1rem;
        }
        .avatar img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #e2e8f0;
          border: 2px solid white;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .page-body {
          padding: 2rem;
          flex: 1;
        }
        @media (max-width: 1024px) {
          .sidebar {
            display: none;
          }
        }
      `}</style>
        </div>
    );
}
