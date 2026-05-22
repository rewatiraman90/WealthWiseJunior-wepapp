"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { syllabusData } from "@/data/curriculum";
import { videoSchedule } from "@/data/videoClasses";

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
  const [activeTab, setActiveTab] = useState<"users" | "feedback" | "agents" | "scholarships" | "curriculum">("users");
  const [expandedLevel, setExpandedLevel] = useState<number | null>(null);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  // ── SCHOLARSHIP STATE ──
  const [schTab, setSchTab] = useState<"applications" | "grants">("applications");
  const [applications, setApplications] = useState<any[]>([]);
  const [grants, setGrants] = useState<any[]>([]);
  const [schLoading, setSchLoading] = useState(false);
  const [grantSearch, setGrantSearch] = useState("");
  const [grantSearchResults, setGrantSearchResults] = useState<UserProfile[]>([]);
  const [grantNote, setGrantNote] = useState("");
  const [rejectNotes, setRejectNotes] = useState<Record<string, string>>({});

  // ── AGENTS STATE ──
  const [agentLogs, setAgentLogs] = useState<any[]>([]);
  const [agentLoading, setAgentLoading] = useState(false);
  const [runningAgent, setRunningAgent] = useState<string | null>(null);
  const [agentError, setAgentError] = useState<string | null>(null);

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

  const fetchScholarships = async () => {
    setSchLoading(true);
    const [{ data: apps }, { data: grs }] = await Promise.all([
      supabase.from("scholarship_applications").select("*").order("submitted_at", { ascending: false }),
      supabase.from("scholarship_access").select("*, profiles(name, grade, city, roll_number)").is("revoked_at", null).order("granted_at", { ascending: false }),
    ]);
    setApplications(apps || []);
    setGrants(grs || []);
    setSchLoading(false);
  };

  const approveApplication = async (app: any) => {
    await supabase.from("scholarship_applications").update({ status: "approved", reviewed_at: new Date().toISOString() }).eq("id", app.id);
    await supabase.from("scholarship_access").upsert({ user_id: app.user_id, granted_at: new Date().toISOString(), revoked_at: null, notes: `Approved application: ${app.application_type}` }, { onConflict: "user_id" });
    setApplications(prev => prev.map(a => a.id === app.id ? { ...a, status: "approved" } : a));
    fetchScholarships();
  };

  const rejectApplication = async (app: any) => {
    const note = rejectNotes[app.id] || "";
    await supabase.from("scholarship_applications").update({ status: "rejected", admin_notes: note, reviewed_at: new Date().toISOString() }).eq("id", app.id);
    setApplications(prev => prev.map(a => a.id === app.id ? { ...a, status: "rejected", admin_notes: note } : a));
  };

  const grantDirectAccess = async (user: UserProfile) => {
    await supabase.from("scholarship_access").upsert({ user_id: user.id, granted_at: new Date().toISOString(), revoked_at: null, notes: grantNote || "Direct admin grant" }, { onConflict: "user_id" });
    setGrantNote("");
    setGrantSearch("");
    setGrantSearchResults([]);
    fetchScholarships();
  };

  const revokeAccess = async (grant: any) => {
    if (!confirm(`Revoke scholarship access?`)) return;
    await supabase.from("scholarship_access").update({ revoked_at: new Date().toISOString() }).eq("id", grant.id);
    setGrants(prev => prev.filter(g => g.id !== grant.id));
  };

  const searchGrantUsers = async (q: string) => {
    setGrantSearch(q);
    if (q.length < 2) { setGrantSearchResults([]); return; }
    const { data } = await supabase.from("profiles").select("*").or(`name.ilike.%${q}%,roll_number.ilike.%${q}%`).limit(5);
    setGrantSearchResults(data || []);
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

  // ── AGENT FUNCTIONS ──
  const fetchAgentLogs = async () => {
    setAgentLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch("/api/agents/logs", { headers: { Authorization: `Bearer ${session?.access_token}` } });
    if (res.ok) { const json = await res.json(); setAgentLogs(json.logs || []); }
    setAgentLoading(false);
  };

  const runAgent = async (agent: string) => {
    setRunningAgent(agent);
    setAgentError(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch("/api/agents/run", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token}` },
        body: JSON.stringify({ agent }),
      });
      if (!res.ok) {
        const text = await res.text();
        let errMsg = res.statusText;
        try { errMsg = JSON.parse(text).error || errMsg; } catch {}
        setAgentError(`Agent failed (${res.status}): ${errMsg}`);
      }
      await fetchAgentLogs();
    } catch (e: any) {
      setAgentError(`Network error: ${e.message}`);
    }
    setRunningAgent(null);
  };

  const updateLogStatus = async (id: string, status: "approved" | "rejected") => {
    const { data: { session } } = await supabase.auth.getSession();
    await fetch("/api/agents/logs", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token}` },
      body: JSON.stringify({ id, status }),
    });
    setAgentLogs(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

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
            <div className="akpi premium-glass">
              <span className="akpi-val" style={{ color: "#FFD166" }}>
                {grants.length}
              </span>
              <span className="akpi-lbl">Scholars</span>
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
          <button
            className={`admin-tab ${activeTab === "agents" ? "active" : ""}`}
            onClick={() => { setActiveTab("agents"); fetchAgentLogs(); }}
          >
            🤖 AI Agents (CEO Panel)
            {agentLogs.filter(l => l.status === "pending").length > 0 && (
              <span className="unread-dot">{agentLogs.filter(l => l.status === "pending").length}</span>
            )}
          </button>
          <button
            className={`admin-tab ${activeTab === "scholarships" ? "active" : ""}`}
            onClick={() => { setActiveTab("scholarships"); fetchScholarships(); }}
          >
            🎓 Scholarships
            {applications.filter(a => a.status === "pending").length > 0 && (
              <span className="unread-dot">{applications.filter(a => a.status === "pending").length}</span>
            )}
          </button>
          <button
            className={`admin-tab ${activeTab === "curriculum" ? "active" : ""}`}
            onClick={() => setActiveTab("curriculum")}
          >
            📚 Curriculum
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

      {/* === AGENTS TAB === */}
      {activeTab === "agents" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Run Agents Row */}
          <div className="premium-glass" style={{ padding: "1.5rem", borderRadius: "1.5rem" }}>
            <h3 style={{ fontWeight: 900, marginBottom: "0.5rem" }}>🤖 AI Agent Company — CEO Control Panel</h3>
            <p style={{ color: "var(--muted)", fontSize: "0.82rem", marginBottom: "1.25rem" }}>
              Run any agent to get a briefing. Review findings and approve or reject proposed actions.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem" }}>
              {[
                { key: "engineer", label: "⚙️ Engineer", desc: "Code health & fixes" },
                { key: "support", label: "💬 Support", desc: "Customer queries" },
                { key: "accounting", label: "💰 Accounting", desc: "Revenue & MRR" },
                { key: "marketing", label: "📣 Marketing", desc: "Content & growth" },
              ].map(a => (
                <button
                  key={a.key}
                  onClick={() => runAgent(a.key)}
                  disabled={!!runningAgent}
                  style={{
                    padding: "1rem", borderRadius: "1rem", border: "1px solid var(--border)",
                    background: runningAgent === a.key ? "rgba(108,99,255,0.2)" : "rgba(108,99,255,0.06)",
                    cursor: runningAgent ? "not-allowed" : "pointer", textAlign: "center",
                    color: "var(--foreground)", fontFamily: "inherit",
                  }}
                >
                  <div style={{ fontSize: "1.3rem" }}>{a.label.split(" ")[0]}</div>
                  <div style={{ fontWeight: 800, fontSize: "0.85rem", marginTop: "0.3rem" }}>{a.label.split(" ")[1]}</div>
                  <div style={{ color: "var(--muted)", fontSize: "0.72rem" }}>
                    {runningAgent === a.key ? "Running…" : a.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Agent Logs */}
          {agentError && (
            <div style={{ padding: "1rem 1.25rem", borderRadius: "1rem", background: "rgba(255,68,102,0.08)", border: "1px solid rgba(255,68,102,0.3)", color: "#FF4466", fontSize: "0.85rem", fontWeight: 700 }}>
              ⚠️ {agentError}
            </div>
          )}

          {agentLoading ? (
            <p style={{ color: "var(--muted)", textAlign: "center" }}>Loading agent logs…</p>
          ) : agentLogs.length === 0 ? (
            <div className="premium-glass" style={{ padding: "2rem", borderRadius: "1.5rem", textAlign: "center", color: "var(--muted)" }}>
              No agent runs yet. Click an agent above to run it.
            </div>
          ) : agentLogs.map(log => (
            <div key={log.id} className="premium-glass" style={{ padding: "1.5rem", borderRadius: "1.5rem", border: log.status === "pending" ? "1px solid rgba(108,99,255,0.4)" : "1px solid var(--border)" }}>
              {/* Log Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                  <span style={{ fontSize: "0.7rem", fontWeight: 900, textTransform: "uppercase", color: "var(--muted)", letterSpacing: "0.1em" }}>
                    {log.agent} agent
                  </span>
                  <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "2px" }}>
                    {new Date(log.created_at).toLocaleString("en-IN")}
                  </p>
                </div>
                <span style={{
                  fontSize: "0.72rem", fontWeight: 900, padding: "0.25rem 0.75rem", borderRadius: "2rem",
                  background: log.status === "pending" ? "rgba(244,165,53,0.15)" : log.status === "approved" ? "rgba(0,229,160,0.15)" : "rgba(255,68,102,0.12)",
                  color: log.status === "pending" ? "#F4A535" : log.status === "approved" ? "var(--neon-green)" : "#FF4466",
                }}>
                  {log.status === "pending" ? "⏳ Awaiting CEO Approval" : log.status === "approved" ? "✅ Approved" : "❌ Rejected"}
                </span>
              </div>

              {/* Summary */}
              <p style={{ fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "1rem" }}>{log.summary}</p>

              {/* Findings */}
              {log.findings?.length > 0 && (
                <div style={{ marginBottom: "1rem" }}>
                  <p style={{ fontSize: "0.72rem", fontWeight: 900, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>Findings</p>
                  <ul style={{ paddingLeft: "1.2rem", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                    {log.findings.map((f: string, i: number) => (
                      <li key={i} style={{ fontSize: "0.82rem", color: "var(--foreground)" }}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Proposed Actions */}
              {log.proposed_actions?.length > 0 && (
                <div style={{ marginBottom: "1rem" }}>
                  <p style={{ fontSize: "0.72rem", fontWeight: 900, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>Proposed Actions</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {log.proposed_actions.map((a: any) => (
                      <div key={a.id} style={{
                        padding: "0.85rem 1rem", borderRadius: "0.85rem", border: "1px solid var(--border)",
                        background: a.priority === "high" ? "rgba(255,68,102,0.05)" : a.priority === "medium" ? "rgba(244,165,53,0.05)" : "rgba(0,229,160,0.04)",
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span style={{ fontWeight: 800, fontSize: "0.85rem" }}>
                              {a.payload?.platform === "instagram" ? "📸 " : a.payload?.platform === "linkedin" ? "💼 " : a.payload?.platform === "whatsapp" ? "💬 " : ""}
                              {a.title}
                            </span>
                          </div>
                          <span style={{
                            fontSize: "0.65rem", fontWeight: 900, padding: "0.15rem 0.5rem", borderRadius: "1rem",
                            background: a.priority === "high" ? "rgba(255,68,102,0.15)" : a.priority === "medium" ? "rgba(244,165,53,0.15)" : "rgba(0,229,160,0.12)",
                            color: a.priority === "high" ? "#FF4466" : a.priority === "medium" ? "#F4A535" : "var(--neon-green)",
                          }}>{a.priority}</span>
                        </div>
                        <p style={{ fontSize: "0.78rem", color: "var(--muted)", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{a.description}</p>

                        {/* Copy & Post button for marketing content */}
                        {a.payload?.content && (
                          <div style={{ marginTop: "0.75rem", background: "rgba(0,0,0,0.2)", borderRadius: "0.75rem", padding: "0.85rem 1rem" }}>
                            <p style={{ fontSize: "0.75rem", color: "var(--muted)", fontWeight: 700, marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                              Ready-to-post content
                            </p>
                            <p style={{ fontSize: "0.82rem", lineHeight: 1.7, whiteSpace: "pre-wrap", color: "var(--foreground)", marginBottom: "0.75rem" }}>
                              {a.payload.content}
                            </p>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(a.payload.content);
                                const btn = document.getElementById(`copy-${log.id}-${a.id}`);
                                if (btn) { btn.textContent = "✅ Copied!"; setTimeout(() => { btn.textContent = `📋 Copy for ${a.payload.platform}`; }, 2000); }
                              }}
                              id={`copy-${log.id}-${a.id}`}
                              style={{ padding: "0.5rem 1.1rem", borderRadius: "2rem", border: "1px solid rgba(108,99,255,0.4)", background: "rgba(108,99,255,0.1)", color: "var(--primary-glow)", fontWeight: 800, cursor: "pointer", fontSize: "0.75rem", fontFamily: "inherit" }}
                            >
                              📋 Copy for {a.payload.platform}
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CEO Approve/Reject */}
              {log.status === "pending" && (
                <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                  <button
                    onClick={() => updateLogStatus(log.id, "approved")}
                    style={{ padding: "0.6rem 1.5rem", borderRadius: "2rem", border: "none", background: "var(--neon-green)", color: "#0E1638", fontWeight: 900, cursor: "pointer", fontSize: "0.82rem", fontFamily: "inherit" }}
                  >
                    ✅ Approve
                  </button>
                  <button
                    onClick={() => updateLogStatus(log.id, "rejected")}
                    style={{ padding: "0.6rem 1.5rem", borderRadius: "2rem", border: "1px solid rgba(255,68,102,0.4)", background: "transparent", color: "#FF4466", fontWeight: 900, cursor: "pointer", fontSize: "0.82rem", fontFamily: "inherit" }}
                  >
                    ❌ Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* === SCHOLARSHIPS TAB === */}
      {activeTab === "scholarships" && (
        <div className="admin-section">
          <div className="section-toolbar">
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                className={`admin-tab ${schTab === "applications" ? "active" : ""}`}
                onClick={() => setSchTab("applications")}
                style={{ fontSize: "0.78rem" }}
              >
                📋 Applications
                {applications.filter(a => a.status === "pending").length > 0 && (
                  <span className="unread-dot">{applications.filter(a => a.status === "pending").length}</span>
                )}
              </button>
              <button
                className={`admin-tab ${schTab === "grants" ? "active" : ""}`}
                onClick={() => setSchTab("grants")}
                style={{ fontSize: "0.78rem" }}
              >
                🎁 Direct Grants ({grants.length} active)
              </button>
            </div>
            <button className="btn-outline refresh-btn" onClick={fetchScholarships}>↻ Refresh</button>
          </div>

          {schLoading ? (
            <div className="loading-msg">Loading scholarship data...</div>
          ) : schTab === "applications" ? (
            <div className="feedback-list">
              {applications.length === 0 ? (
                <div className="empty-feedback premium-glass">
                  <span style={{ fontSize: "3rem" }}>🎓</span>
                  <p>No scholarship applications yet. Share the <strong>/apply</strong> page link with students.</p>
                </div>
              ) : applications.map(app => (
                <div key={app.id} className={`feedback-card premium-glass ${app.status === "pending" ? "unread" : ""}`}>
                  <div className="fb-header">
                    <div className="fb-meta">
                      <span className={`fb-type-badge ${app.status === "approved" ? "feedback" : app.status === "rejected" ? "complaint" : "general"}`}>
                        {app.status === "pending" ? "⏳ Pending" : app.status === "approved" ? "✅ Approved" : "❌ Rejected"}
                      </span>
                      <span className="fb-type-badge general">{app.application_type === "essay" ? "✍️ Essay" : "📄 Income Proof"}</span>
                      <span className="fb-name">{app.name || "Unknown"}</span>
                      <span className="fb-email">Class {app.grade} · {app.city}</span>
                    </div>
                    <span className="fb-date">{new Date(app.submitted_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span>
                  </div>
                  <h3 className="fb-subject">{app.school}</h3>
                  {app.essay_text && (
                    <p className="fb-message" style={{ fontStyle: "italic" }}>
                      &ldquo;{app.essay_text.slice(0, 300)}{app.essay_text.length > 300 ? "…" : ""}&rdquo;
                    </p>
                  )}
                  {app.proof_description && (
                    <p className="fb-message">📄 Proof: {app.proof_description}</p>
                  )}
                  {app.proof_url && (
                    <a href={app.proof_url} target="_blank" rel="noreferrer" style={{ color: "var(--primary-glow)", fontSize: "0.8rem", fontWeight: 700 }}>
                      View uploaded document →
                    </a>
                  )}
                  {app.admin_notes && (
                    <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.5rem" }}>Admin note: {app.admin_notes}</p>
                  )}
                  {app.status === "pending" && (
                    <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                      <input
                        type="text"
                        placeholder="Optional note for rejection..."
                        value={rejectNotes[app.id] || ""}
                        onChange={e => setRejectNotes(prev => ({ ...prev, [app.id]: e.target.value }))}
                        style={{ flex: 1, minWidth: "200px", background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", color: "white", padding: "0.5rem 0.9rem", borderRadius: "0.6rem", fontSize: "0.82rem", fontFamily: "inherit", outline: "none" }}
                      />
                      <button
                        onClick={() => approveApplication(app)}
                        style={{ padding: "0.5rem 1.4rem", borderRadius: "2rem", border: "none", background: "var(--neon-green)", color: "#0E1638", fontWeight: 900, cursor: "pointer", fontSize: "0.82rem", fontFamily: "inherit" }}
                      >
                        ✅ Approve & Grant Access
                      </button>
                      <button
                        onClick={() => rejectApplication(app)}
                        style={{ padding: "0.5rem 1.2rem", borderRadius: "2rem", border: "1px solid rgba(255,68,102,0.4)", background: "transparent", color: "#FF4466", fontWeight: 900, cursor: "pointer", fontSize: "0.82rem", fontFamily: "inherit" }}
                      >
                        ❌ Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Direct grant search */}
              <div className="premium-glass" style={{ padding: "1.5rem", borderRadius: "1.25rem" }}>
                <h3 style={{ fontWeight: 900, marginBottom: "0.75rem", color: "var(--foreground)" }}>
                  🎁 Grant Scholarship Access Directly
                </h3>
                <p style={{ color: "var(--muted)", fontSize: "0.82rem", marginBottom: "1rem" }}>
                  Search a student by name or roll number and grant them full access without a subscription.
                </p>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <div className="search-box" style={{ flex: 1, maxWidth: "320px" }}>
                    <span>🔍</span>
                    <input
                      type="text"
                      placeholder="Search by name or roll number..."
                      value={grantSearch}
                      onChange={e => searchGrantUsers(e.target.value)}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Reason for grant (optional)..."
                    value={grantNote}
                    onChange={e => setGrantNote(e.target.value)}
                    style={{ flex: 1, minWidth: "200px", background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", color: "white", padding: "0.6rem 1rem", borderRadius: "0.75rem", fontSize: "0.9rem", fontFamily: "inherit", outline: "none" }}
                  />
                </div>
                {grantSearchResults.length > 0 && (
                  <div style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {grantSearchResults.map(u => (
                      <div key={u.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem", borderRadius: "0.75rem", background: "rgba(108,99,255,0.08)", border: "1px solid rgba(108,99,255,0.2)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <div className="user-avatar-mini">{u.name?.[0]?.toUpperCase() || "?"}</div>
                          <div>
                            <p style={{ fontWeight: 800, fontSize: "0.88rem", color: "var(--foreground)" }}>{u.name}</p>
                            <p style={{ fontSize: "0.72rem", color: "var(--muted)" }}>Class {u.grade} · {u.city} · {u.roll_number}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => grantDirectAccess(u)}
                          style={{ padding: "0.45rem 1.1rem", borderRadius: "2rem", border: "1px solid rgba(0,229,160,0.35)", background: "rgba(0,229,160,0.15)", color: "var(--neon-green)", fontWeight: 900, cursor: "pointer", fontSize: "0.78rem", fontFamily: "inherit" }}
                        >
                          🎓 Grant Access
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Active scholars list */}
              <div className="table-wrap premium-glass">
                <div style={{ padding: "1rem 1.5rem 0.5rem", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  <h3 style={{ fontWeight: 900, color: "var(--foreground)", fontSize: "0.95rem" }}>
                    🌟 Active Scholars — {grants.length} student{grants.length !== 1 ? "s" : ""} on scholarship
                  </h3>
                </div>
                {grants.length === 0 ? (
                  <div className="loading-msg">No active scholars yet.</div>
                ) : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>Grade</th>
                        <th>City</th>
                        <th>Roll No.</th>
                        <th>Granted</th>
                        <th>Notes</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grants.map(g => (
                        <tr key={g.id}>
                          <td>
                            <div className="user-cell">
                              <div className="user-avatar-mini" style={{ background: "linear-gradient(135deg,#FFD166,#FF6B6B)" }}>
                                {(g.profiles as any)?.name?.[0]?.toUpperCase() || "?"}
                              </div>
                              <span className="user-name">{(g.profiles as any)?.name || "Unknown"}</span>
                            </div>
                          </td>
                          <td><span className="grade-badge">Class {(g.profiles as any)?.grade}</span></td>
                          <td>{(g.profiles as any)?.city || "—"}</td>
                          <td className="roll-cell">{(g.profiles as any)?.roll_number || "—"}</td>
                          <td className="date-cell">{new Date(g.granted_at).toLocaleDateString("en-IN")}</td>
                          <td style={{ fontSize: "0.75rem", color: "var(--muted)", maxWidth: "180px" }}>{g.notes || "—"}</td>
                          <td>
                            <button className="btn-delete" onClick={() => revokeAccess(g)}>Revoke</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* === CURRICULUM TAB === */}
      {activeTab === "curriculum" && (
        <div className="admin-section">
          <div className="section-toolbar">
            <div>
              <h2 style={{ fontWeight: 900, fontSize: '1.1rem', color: 'var(--foreground)' }}>All Levels &amp; Modules</h2>
              <p style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.2rem' }}>Click a level to expand modules. Click a module to see all video classes.</p>
            </div>
          </div>

          {[5,6,7,8,9,10,11,12].map(grade => {
            const LEVEL_NAMES: Record<number,string> = { 5:'Explorer', 6:'Saver', 7:'Planner', 8:'Strategist', 9:'Analyst', 10:'Investor', 11:'Architect', 12:'Master' };
            const levelName = LEVEL_NAMES[grade];
            const syllabus = syllabusData[grade];
            const classes = videoSchedule[grade] || [];
            const isLevelOpen = expandedLevel === grade;

            return (
              <div key={grade} className="premium-glass" style={{ borderRadius: '1.25rem', overflow: 'hidden' }}>
                <button
                  onClick={() => setExpandedLevel(isLevelOpen ? null : grade)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem', background: 'transparent', border: 'none', color: 'var(--foreground)', cursor: 'pointer', fontFamily: 'inherit', gap: '1rem' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ background: 'linear-gradient(135deg,var(--primary),var(--neon-green))', color: '#050816', fontWeight: 900, fontSize: '0.75rem', padding: '0.3rem 0.75rem', borderRadius: '2rem', whiteSpace: 'nowrap' }}>
                      Level {grade - 4} · Class {grade}
                    </span>
                    <span style={{ fontWeight: 900, fontSize: '1rem' }}>{levelName}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600 }}>
                      {syllabus?.modules.length ?? 0} modules · {classes.length} classes
                    </span>
                  </div>
                  <span style={{ color: 'var(--muted)', fontSize: '1.2rem' }}>{isLevelOpen ? '▲' : '▼'}</span>
                </button>

                {isLevelOpen && syllabus && (
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {syllabus.modules.map((mod, modIdx) => {
                      const modNum = modIdx + 1;
                      const modKey = `${grade}-${modNum}`;
                      const isModOpen = expandedModule === modKey;
                      const modClasses = classes.filter(c => c.month === modNum);

                      return (
                        <div key={modKey} style={{ borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <button
                            onClick={() => setExpandedModule(isModOpen ? null : modKey)}
                            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1.2rem', background: 'rgba(255,255,255,0.03)', border: 'none', color: 'var(--foreground)', cursor: 'pointer', fontFamily: 'inherit', gap: '1rem', textAlign: 'left' }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              <span style={{ fontSize: '0.68rem', fontWeight: 900, color: 'var(--primary-glow)', background: 'rgba(108,99,255,0.12)', border: '1px solid rgba(108,99,255,0.25)', padding: '0.15rem 0.5rem', borderRadius: '0.5rem' }}>
                                M{modNum} · {mod.month}
                              </span>
                              <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{mod.topic}</span>
                              <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{modClasses.length} classes</span>
                            </div>
                            <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{isModOpen ? '▲' : '▼'}</span>
                          </button>

                          {isModOpen && (
                            <div style={{ padding: '0.5rem 1.2rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                              {modClasses.map(cls => (
                                <a
                                  key={cls.id}
                                  href={`/classes/${cls.id}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', background: 'rgba(0,0,0,0.2)', color: 'var(--foreground)', textDecoration: 'none', fontSize: '0.83rem', transition: 'background 0.15s' }}
                                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(108,99,255,0.1)')}
                                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.2)')}
                                >
                                  <span style={{ fontSize: '0.68rem', color: 'var(--muted)', fontWeight: 700, whiteSpace: 'nowrap', minWidth: '80px' }}>
                                    W{cls.week} · {cls.day}
                                  </span>
                                  <span style={{ fontWeight: 600 }}>{cls.topic}</span>
                                  <span style={{ marginLeft: 'auto', fontSize: '0.68rem', color: 'var(--primary-glow)' }}>Open →</span>
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
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
