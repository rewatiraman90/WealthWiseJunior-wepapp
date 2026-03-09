"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const ADMIN_EMAIL = "rayraman90@gmail.com";

interface UserProfile {
  id: string;
  name: string;
  grade: string;
  city: string;
  school: string;
  roll_number: string;
  is_subscriber: boolean;
  is_active: boolean;
  created_at: string;
}

interface Feedback {
  id: string;
  name: string;
  email: string;
  subject: string;
  type: string;
  message: string;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"users" | "feedback">("users");

  const [users, setUsers] = useState<UserProfile[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || user.email !== ADMIN_EMAIL) {
        router.push("/");
        return;
      }
      setIsAuthorized(true);
      setIsLoading(false);
      fetchUsers();
      fetchFeedback();
    };
    checkAdmin();
  }, [router]);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    setUsers(data || []);
    setLoadingUsers(false);
  };

  const fetchFeedback = async () => {
    setLoadingFeedback(true);
    const { data } = await supabase.from("feedback").select("*").order("created_at", { ascending: false });
    setFeedback(data || []);
    setLoadingFeedback(false);
  };

  const toggleSubscriber = async (user: UserProfile) => {
    const newVal = !user.is_subscriber;
    await supabase.from("profiles").update({ is_subscriber: newVal }).eq("id", user.id);
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, is_subscriber: newVal } : u));
  };

  const toggleActive = async (user: UserProfile) => {
    const newVal = !user.is_active;
    await supabase.from("profiles").update({ is_active: newVal }).eq("id", user.id);
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, is_active: newVal } : u));
  };

  const deleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
    await supabase.from("profiles").delete().eq("id", userId);
    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  const markFeedbackRead = async (id: string) => {
    await supabase.from("feedback").update({ status: "read" }).eq("id", id);
    setFeedback(prev => prev.map(f => f.id === id ? { ...f, status: "read" } : f));
  };

  const saveUserEdit = async () => {
    if (!selectedUser) return;
    await supabase.from("profiles").update({
      name: selectedUser.name,
      grade: selectedUser.grade,
      city: selectedUser.city,
      school: selectedUser.school,
    }).eq("id", selectedUser.id);
    setUsers(prev => prev.map(u => u.id === selectedUser.id ? selectedUser : u));
    setEditModal(false);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter(u =>
    u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.roll_number?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadCount = feedback.filter(f => f.status === "unread").length;

  if (isLoading) return <div className="admin-loading">🔐 Verifying admin access...</div>;
  if (!isAuthorized) return null;

  return (
    <div className="admin-wrap">
      {/* === HEADER === */}
      <div className="admin-header premium-glass">
        <div className="admin-title-row">
          <div>
            <span className="admin-badge">🛡️ ADMIN PANEL</span>
            <h1 className="gradient-text admin-h1">WealthWise Jr. Command Center</h1>
            <p className="admin-sub">Logged in as {ADMIN_EMAIL}</p>
          </div>
          <div className="admin-kpis">
            <div className="akpi premium-glass">
              <span className="akpi-val">{users.length}</span>
              <span className="akpi-lbl">Total Students</span>
            </div>
            <div className="akpi premium-glass">
              <span className="akpi-val" style={{ color: "var(--neon-green)" }}>
                {users.filter(u => u.is_subscriber).length}
              </span>
              <span className="akpi-lbl">Subscribers</span>
            </div>
            <div className="akpi premium-glass">
              <span className="akpi-val" style={{ color: unreadCount > 0 ? "#FF6680" : "var(--muted)" }}>
                {unreadCount}
              </span>
              <span className="akpi-lbl">Unread Msgs</span>
            </div>
          </div>
        </div>

        <div className="admin-tabs">
          <button
            className={`admin-tab ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            👥 User Management
          </button>
          <button
            className={`admin-tab ${activeTab === "feedback" ? "active" : ""}`}
            onClick={() => setActiveTab("feedback")}
          >
            📬 Feedback & Complaints
            {unreadCount > 0 && <span className="unread-dot">{unreadCount}</span>}
          </button>
        </div>
      </div>

      {/* === USERS TAB === */}
      {activeTab === "users" && (
        <div className="admin-section">
          <div className="section-toolbar">
            <div className="search-box">
              <span>🔍</span>
              <input
                type="text"
                placeholder="Search by name, city, roll no..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="btn-outline refresh-btn" onClick={fetchUsers}>↻ Refresh</button>
          </div>

          {loadingUsers ? (
            <div className="loading-msg">Loading users...</div>
          ) : (
            <div className="table-wrap premium-glass">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Grade</th>
                    <th>City</th>
                    <th>Roll Number</th>
                    <th>Joined</th>
                    <th>Subscriber</th>
                    <th>Access</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id} className={!user.is_active ? "row-inactive" : ""}>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar-mini">
                            {user.name?.[0]?.toUpperCase() || "?"}
                          </div>
                          <span className="user-name">{user.name || "—"}</span>
                        </div>
                      </td>
                      <td><span className="grade-badge">Class {user.grade}</span></td>
                      <td>{user.city || "—"}</td>
                      <td className="roll-cell">{user.roll_number || "—"}</td>
                      <td className="date-cell">
                        {user.created_at ? new Date(user.created_at).toLocaleDateString("en-IN") : "—"}
                      </td>
                      <td>
                        <button
                          className={`toggle-btn ${user.is_subscriber ? "on" : "off"}`}
                          onClick={() => toggleSubscriber(user)}
                          title="Toggle Premium Access"
                        >
                          {user.is_subscriber ? "✅ Premium" : "❌ Free"}
                        </button>
                      </td>
                      <td>
                        <button
                          className={`toggle-btn ${user.is_active !== false ? "on" : "off"}`}
                          onClick={() => toggleActive(user)}
                          title="Enable/Disable portal access"
                        >
                          {user.is_active !== false ? "🟢 Active" : "🔴 Blocked"}
                        </button>
                      </td>
                      <td>
                        <div className="action-btns">
                          <button
                            className="btn-edit"
                            onClick={() => { setSelectedUser({ ...user }); setEditModal(true); }}
                          >
                            ✏️ Edit
                          </button>
                          <button className="btn-delete" onClick={() => deleteUser(user.id)}>
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr><td colSpan={8} className="empty-row">No users found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* === FEEDBACK TAB === */}
      {activeTab === "feedback" && (
        <div className="admin-section">
          <div className="section-toolbar">
            <h2 style={{ color: "var(--foreground)", fontSize: "1.1rem", fontWeight: 800 }}>
              📬 Inbox — {feedback.length} total, {unreadCount} unread
            </h2>
            <button className="btn-outline refresh-btn" onClick={fetchFeedback}>↻ Refresh</button>
          </div>

          {loadingFeedback ? (
            <div className="loading-msg">Loading messages...</div>
          ) : (
            <div className="feedback-list">
              {feedback.map(f => (
                <div key={f.id} className={`feedback-card premium-glass ${f.status === "unread" ? "unread" : ""}`}>
                  <div className="fb-header">
                    <div className="fb-meta">
                      <span className={`fb-type-badge ${f.type}`}>{f.type}</span>
                      <span className="fb-name">{f.name || "Anonymous"}</span>
                      <span className="fb-email">{f.email}</span>
                    </div>
                    <div className="fb-right">
                      <span className="fb-date">
                        {new Date(f.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                      </span>
                      {f.status === "unread" && (
                        <button className="btn-mark-read" onClick={() => markFeedbackRead(f.id)}>
                          ✓ Mark Read
                        </button>
                      )}
                      {f.status === "read" && <span className="read-badge">✓ Read</span>}
                    </div>
                  </div>
                  {f.subject && <h3 className="fb-subject">{f.subject}</h3>}
                  <p className="fb-message">{f.message}</p>
                </div>
              ))}
              {feedback.length === 0 && (
                <div className="empty-feedback premium-glass">
                  <span style={{ fontSize: "3rem" }}>📭</span>
                  <p>No messages yet. Feedback from students will appear here.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* === EDIT MODAL === */}
      {editModal && selectedUser && (
        <div className="modal-overlay" onClick={() => setEditModal(false)}>
          <div className="modal-box premium-glass" onClick={e => e.stopPropagation()}>
            <h2 className="gradient-text" style={{ marginBottom: "1.5rem" }}>
              ✏️ Edit Student
            </h2>
            <div className="modal-form">
              <label>Full Name</label>
              <input value={selectedUser.name} onChange={e => setSelectedUser({ ...selectedUser, name: e.target.value })} />
              <label>Grade</label>
              <select value={selectedUser.grade} onChange={e => setSelectedUser({ ...selectedUser, grade: e.target.value })}>
                {[5,6,7,8,9,10,11,12].map(g => <option key={g} value={g}>Class {g}</option>)}
              </select>
              <label>City</label>
              <input value={selectedUser.city} onChange={e => setSelectedUser({ ...selectedUser, city: e.target.value })} />
              <label>School</label>
              <input value={selectedUser.school} onChange={e => setSelectedUser({ ...selectedUser, school: e.target.value })} />
            </div>
            <div className="modal-actions">
              <button className="btn-outline" onClick={() => setEditModal(false)}>Cancel</button>
              <button className="btn-neon" onClick={saveUserEdit}>💾 Save Changes</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .admin-wrap { display: flex; flex-direction: column; gap: 1.5rem; padding-bottom: 3rem; }

        .admin-header { padding: 2rem; border-radius: 1.5rem; }
        .admin-title-row { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1.5rem; margin-bottom: 1.5rem; }
        .admin-badge { font-size: 0.65rem; font-weight: 900; color: var(--neon-green); background: rgba(0,229,160,0.1); border: 1px solid rgba(0,229,160,0.3); border-radius: 2rem; padding: 0.2rem 0.75rem; letter-spacing: 0.1em; }
        .admin-h1 { font-size: clamp(1.5rem, 3vw, 2.2rem); font-weight: 900; margin: 0.5rem 0 0.3rem; }
        .admin-sub { font-size: 0.8rem; color: var(--muted); font-weight: 600; }

        .admin-kpis { display: flex; gap: 1rem; }
        .akpi { display: flex; flex-direction: column; align-items: center; padding: 1rem 1.5rem; border-radius: 1rem; min-width: 80px; }
        .akpi-val { font-size: 1.6rem; font-weight: 900; color: var(--foreground); }
        .akpi-lbl { font-size: 0.65rem; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 0.07em; }

        .admin-tabs { display: flex; gap: 0.5rem; }
        .admin-tab { padding: 0.65rem 1.5rem; border-radius: 2rem; border: 1px solid var(--border); background: transparent; color: var(--muted); font-size: 0.85rem; font-weight: 700; cursor: pointer; transition: all 0.2s; position: relative; font-family: inherit; }
        .admin-tab.active { background: rgba(108,99,255,0.15); color: var(--primary-glow); border-color: rgba(108,99,255,0.4); }
        .unread-dot { background: #FF4466; color: white; font-size: 0.65rem; font-weight: 900; border-radius: 50%; width: 18px; height: 18px; display: inline-flex; align-items: center; justify-content: center; margin-left: 0.5rem; }

        .admin-section { display: flex; flex-direction: column; gap: 1rem; }
        .section-toolbar { display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; }
        .search-box { display: flex; align-items: center; gap: 0.5rem; background: rgba(0,0,0,0.3); border: 1px solid var(--border); border-radius: 0.75rem; padding: 0.6rem 1rem; flex: 1; max-width: 400px; }
        .search-box input { border: none; background: transparent; color: white; font-size: 0.9rem; width: 100%; outline: none; font-family: inherit; }
        .refresh-btn { padding: 0.6rem 1.2rem; font-size: 0.85rem; white-space: nowrap; }

        .table-wrap { overflow-x: auto; border-radius: 1.25rem; }
        .admin-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
        .admin-table thead tr { border-bottom: 1px solid rgba(255,255,255,0.07); }
        .admin-table th { padding: 1rem 1.2rem; text-align: left; font-size: 0.7rem; font-weight: 900; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; white-space: nowrap; }
        .admin-table td { padding: 0.9rem 1.2rem; border-bottom: 1px solid rgba(255,255,255,0.04); color: var(--foreground); vertical-align: middle; }
        .admin-table tr:last-child td { border-bottom: none; }
        .admin-table tr:hover td { background: rgba(108,99,255,0.04); }
        .row-inactive td { opacity: 0.5; }

        .user-cell { display: flex; align-items: center; gap: 0.75rem; }
        .user-avatar-mini { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--neon-green)); display: flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight: 900; color: white; flex-shrink: 0; }
        .user-name { font-weight: 700; }
        .grade-badge { background: rgba(108,99,255,0.12); color: var(--primary-glow); font-size: 0.72rem; font-weight: 800; padding: 0.2rem 0.6rem; border-radius: 1rem; border: 1px solid rgba(108,99,255,0.25); }
        .roll-cell { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: var(--primary-glow); }
        .date-cell { color: var(--muted); font-size: 0.78rem; }

        .toggle-btn { padding: 0.35rem 0.9rem; border-radius: 2rem; border: none; font-size: 0.75rem; font-weight: 800; cursor: pointer; transition: all 0.2s; white-space: nowrap; font-family: inherit; }
        .toggle-btn.on { background: rgba(0,229,160,0.1); color: var(--neon-green); border: 1px solid rgba(0,229,160,0.3); }
        .toggle-btn.off { background: rgba(255,100,100,0.1); color: #FF8888; border: 1px solid rgba(255,100,100,0.3); }
        .toggle-btn:hover { transform: scale(1.05); }

        .action-btns { display: flex; gap: 0.4rem; }
        .btn-edit { padding: 0.35rem 0.75rem; border-radius: 0.5rem; border: 1px solid rgba(108,99,255,0.3); background: rgba(108,99,255,0.1); color: var(--primary-glow); font-size: 0.75rem; font-weight: 700; cursor: pointer; font-family: inherit; transition: all 0.2s; }
        .btn-delete { padding: 0.35rem 0.6rem; border-radius: 0.5rem; border: 1px solid rgba(255,68,68,0.3); background: rgba(255,68,68,0.08); color: #FF6680; font-size: 0.75rem; cursor: pointer; transition: all 0.2s; }
        .btn-edit:hover, .btn-delete:hover { transform: scale(1.05); }
        .empty-row { text-align: center; color: var(--muted); padding: 3rem; }

        .feedback-list { display: flex; flex-direction: column; gap: 1rem; }
        .feedback-card { padding: 1.5rem; border-radius: 1.25rem; transition: all 0.2s; }
        .feedback-card.unread { border-color: rgba(255,107,53,0.4) !important; box-shadow: 0 0 20px rgba(255,107,53,0.1); }
        .fb-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; margin-bottom: 0.75rem; flex-wrap: wrap; }
        .fb-meta { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
        .fb-type-badge { font-size: 0.68rem; font-weight: 900; padding: 0.2rem 0.6rem; border-radius: 2rem; text-transform: capitalize; }
        .fb-type-badge.complaint { background: rgba(255,68,68,0.12); color: #FF6680; border: 1px solid rgba(255,68,68,0.25); }
        .fb-type-badge.feedback { background: rgba(0,229,160,0.12); color: var(--neon-green); border: 1px solid rgba(0,229,160,0.25); }
        .fb-type-badge.general, .fb-type-badge.technical, .fb-type-badge.billing { background: rgba(108,99,255,0.12); color: var(--primary-glow); border: 1px solid rgba(108,99,255,0.25); }
        .fb-name { font-size: 0.9rem; font-weight: 800; color: var(--foreground); }
        .fb-email { font-size: 0.78rem; color: var(--muted); font-weight: 600; }
        .fb-right { display: flex; align-items: center; gap: 0.75rem; }
        .fb-date { font-size: 0.75rem; color: var(--muted); }
        .btn-mark-read { padding: 0.3rem 0.8rem; border-radius: 2rem; border: 1px solid rgba(0,229,160,0.3); background: rgba(0,229,160,0.1); color: var(--neon-green); font-size: 0.72rem; font-weight: 800; cursor: pointer; font-family: inherit; }
        .read-badge { font-size: 0.72rem; color: var(--muted); font-weight: 700; }
        .fb-subject { font-size: 1rem; font-weight: 800; color: var(--foreground); margin-bottom: 0.5rem; }
        .fb-message { font-size: 0.88rem; color: var(--muted); line-height: 1.6; white-space: pre-wrap; }
        .empty-feedback { display: flex; flex-direction: column; align-items: center; gap: 1rem; padding: 4rem; text-align: center; border-radius: 1.5rem; color: var(--muted); }

        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 1000; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px); }
        .modal-box { padding: 2.5rem; border-radius: 1.5rem; min-width: 420px; max-width: 95vw; }
        .modal-form { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem; }
        .modal-form label { font-size: 0.75rem; font-weight: 800; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: -0.5rem; }
        .modal-form input, .modal-form select { background: rgba(0,0,0,0.3); border: 1px solid var(--border); color: white; padding: 0.75rem 1rem; border-radius: 0.75rem; font-size: 0.95rem; font-family: inherit; outline: none; transition: border-color 0.2s; }
        .modal-form input:focus, .modal-form select:focus { border-color: var(--primary); }
        .modal-actions { display: flex; gap: 0.75rem; justify-content: flex-end; }

        .admin-loading { display: flex; align-items: center; justify-content: center; min-height: 60vh; font-size: 1.2rem; color: var(--muted); font-weight: 700; }
        .loading-msg { text-align: center; padding: 3rem; color: var(--muted); }
      `}</style>
    </div>
  );
}
