"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

type AppType = "essay" | "income_proof";
type Step = "choose" | "form" | "done";

interface ExistingApp {
  status: "pending" | "approved" | "rejected";
  application_type: string;
  submitted_at: string;
  admin_notes?: string;
}

export default function ApplyPage() {
  const [step, setStep] = useState<Step>("choose");
  const [appType, setAppType] = useState<AppType>("essay");
  const [essay, setEssay] = useState("");
  const [proofDesc, setProofDesc] = useState("");
  const [income, setIncome] = useState("");
  const [members, setMembers] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [existingApp, setExistingApp] = useState<ExistingApp | null>(null);
  const [hasScholarship, setHasScholarship] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [checking, setChecking] = useState(true);
  const fileRef = useRef<HTMLInputElement>(null);

  const wordCount = essay.trim().split(/\s+/).filter(Boolean).length;
  const canSubmitEssay = wordCount >= 100;
  const canSubmitProof = proofDesc.trim().length >= 30;

  useEffect(() => {
    async function init() {
      const { data: { session: s } } = await supabase.auth.getSession();
      setSession(s);
      if (!s?.user) { setChecking(false); return; }

      const raw = localStorage.getItem("wwj_profile");
      if (raw) setProfile(JSON.parse(raw));

      const [{ data: schApp }, { data: schAccess }] = await Promise.all([
        supabase.from("scholarship_applications").select("*").eq("user_id", s.user.id).order("submitted_at", { ascending: false }).limit(1).maybeSingle(),
        supabase.from("scholarship_access").select("id").eq("user_id", s.user.id).is("revoked_at", null).maybeSingle(),
      ]);
      if (schAccess) setHasScholarship(true);
      if (schApp) setExistingApp(schApp);
      setChecking(false);
    }
    init();
  }, []);

  async function submit() {
    if (!session?.user) return;
    setUploading(true);
    setError("");

    try {
      let proofUrl: string | null = null;

      if (appType === "income_proof" && file) {
        const ext = file.name.split(".").pop();
        const path = `${session.user.id}/${Date.now()}.${ext}`;
        const { error: uploadErr } = await supabase.storage
          .from("scholarship-proofs")
          .upload(path, file, { upsert: true });
        if (uploadErr) {
          setError("File upload failed. You can still submit without the file — describe your situation in the text field.");
        } else {
          const { data: urlData } = supabase.storage.from("scholarship-proofs").getPublicUrl(path);
          proofUrl = urlData.publicUrl;
        }
      }

      const { error: insertErr } = await supabase.from("scholarship_applications").insert({
        user_id: session.user.id,
        name: profile?.name || null,
        email: session.user.email,
        grade: profile?.grade || null,
        school: profile?.school || null,
        city: profile?.city || null,
        application_type: appType,
        essay_text: appType === "essay" ? essay : null,
        proof_description: appType === "income_proof" ? `Income: ₹${income}/month · ${members} family members. ${proofDesc}` : null,
        proof_url: proofUrl,
        status: "pending",
      });

      if (insertErr) throw insertErr;
      setStep("done");
    } catch (e: any) {
      setError(e.message || "Something went wrong. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  if (checking) return (
    <div style={{ textAlign: "center", padding: "4rem", color: "var(--muted)" }}>
      Checking your status...
    </div>
  );

  if (!session) return (
    <div className="ap-root">
      <div className="ap-card premium-glass">
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔐</div>
        <h1 className="gradient-text" style={{ fontSize: "1.6rem", marginBottom: "0.75rem" }}>Login Required</h1>
        <p style={{ color: "var(--muted)", marginBottom: "1.5rem", lineHeight: 1.6 }}>
          You need a WealthWise Junior account to apply for a scholarship. Create your free account first.
        </p>
        <Link href="/onboarding" className="ap-btn-primary">Create Free Account →</Link>
      </div>
    </div>
  );

  if (hasScholarship) return (
    <div className="ap-root">
      <div className="ap-card premium-glass" style={{ borderColor: "rgba(0,229,160,0.4)" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🌟</div>
        <h1 className="gradient-text" style={{ fontSize: "1.6rem", marginBottom: "0.75rem" }}>You Have Scholarship Access!</h1>
        <p style={{ color: "var(--muted)", marginBottom: "1.5rem", lineHeight: 1.6 }}>
          Your scholarship is active. You have full access to all 10 modules — completely free.
          Make the most of it and let this change your future.
        </p>
        <Link href="/classes" className="ap-btn-primary">Start Learning →</Link>
      </div>
    </div>
  );

  if (existingApp && existingApp.status === "pending") return (
    <div className="ap-root">
      <div className="ap-card premium-glass" style={{ borderColor: "rgba(244,165,53,0.4)" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⏳</div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 900, color: "var(--foreground)", marginBottom: "0.75rem" }}>Application Under Review</h1>
        <p style={{ color: "var(--muted)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
          We received your {existingApp.application_type === "essay" ? "story" : "income proof"} on{" "}
          <strong>{new Date(existingApp.submitted_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</strong>.
        </p>
        <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>
          Our team reviews applications within 2–3 working days. You will receive a decision by email.
          Thank you for your patience.
        </p>
      </div>
    </div>
  );

  if (existingApp && existingApp.status === "approved") return (
    <div className="ap-root">
      <div className="ap-card premium-glass" style={{ borderColor: "rgba(0,229,160,0.4)" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
        <h1 className="gradient-text" style={{ fontSize: "1.6rem", marginBottom: "0.75rem" }}>Application Approved!</h1>
        <p style={{ color: "var(--muted)", marginBottom: "1.5rem", lineHeight: 1.6 }}>
          Congratulations! Your scholarship has been approved. Please log out and log back in to activate full access.
        </p>
        <Link href="/classes" className="ap-btn-primary">Go to My Classes →</Link>
      </div>
    </div>
  );

  if (step === "done") return (
    <div className="ap-root">
      <div className="ap-card premium-glass" style={{ borderColor: "rgba(0,229,160,0.4)" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
        <h1 className="gradient-text" style={{ fontSize: "1.6rem", marginBottom: "0.75rem" }}>Application Submitted!</h1>
        <p style={{ color: "var(--muted)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
          Thank you for applying! We will review your application within 2–3 working days and send you an email with our decision.
        </p>
        <p style={{ color: "var(--muted)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
          While you wait, Module 1 is free — start exploring financial education now.
        </p>
        <Link href="/classes" className="ap-btn-primary">Explore Module 1 Free →</Link>
      </div>
    </div>
  );

  return (
    <div className="ap-root">
      {/* Hero */}
      <div className="ap-hero">
        <div className="ap-badge">🎓 WealthWise Scholarship Program</div>
        <h1 className="gradient-text ap-h1">Every Child Deserves<br />Financial Education</h1>
        <p className="ap-tagline">
          We believe money should never be a barrier to learning about money.
          We offer free full access to students who need it most.
        </p>
        <div className="ap-stats-row">
          <div className="ap-stat">
            <span className="ap-stat-num">100%</span>
            <span className="ap-stat-lbl">Full Access — All 10 Modules</span>
          </div>
          <div className="ap-stat">
            <span className="ap-stat-num">Free</span>
            <span className="ap-stat-lbl">No subscription, no credit card</span>
          </div>
          <div className="ap-stat">
            <span className="ap-stat-num">2-3 days</span>
            <span className="ap-stat-lbl">Review time</span>
          </div>
        </div>
      </div>

      {step === "choose" && (
        <div className="ap-choose">
          <h2 className="ap-section-title">How would you like to apply?</h2>
          <div className="ap-options">
            <button
              className={`ap-option ${appType === "essay" ? "selected" : ""}`}
              onClick={() => setAppType("essay")}
            >
              <div className="ap-opt-icon">✍️</div>
              <h3>Write Your Story</h3>
              <p>Tell us in 100+ words why you need free access and how financial education will change your life.</p>
              <div className="ap-opt-tag">Most applications</div>
            </button>
            <button
              className={`ap-option ${appType === "income_proof" ? "selected" : ""}`}
              onClick={() => setAppType("income_proof")}
            >
              <div className="ap-opt-icon">📄</div>
              <h3>Submit Income Proof</h3>
              <p>Upload a BPL card, income certificate, school fee waiver, or any document showing family income.</p>
              <div className="ap-opt-tag">Faster approval</div>
            </button>
          </div>
          <button className="ap-btn-primary" style={{ marginTop: "1.5rem" }} onClick={() => setStep("form")}>
            Continue with {appType === "essay" ? "My Story" : "Income Proof"} →
          </button>
        </div>
      )}

      {step === "form" && (
        <div className="ap-form-wrap premium-glass">
          <button className="ap-back" onClick={() => setStep("choose")}>← Back</button>
          <h2 style={{ fontWeight: 900, marginBottom: "0.5rem", color: "var(--foreground)" }}>
            {appType === "essay" ? "✍️ Tell Us Your Story" : "📄 Income Proof Application"}
          </h2>

          {appType === "essay" ? (
            <>
              <p style={{ color: "var(--muted)", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                Write honestly about your situation. Tell us: Who are you? What is your family&apos;s financial situation?
                Why do you want to learn about money management? How will this change your future?
                <strong style={{ color: "var(--primary-glow)" }}> Minimum 100 words.</strong>
              </p>
              <div style={{ position: "relative" }}>
                <textarea
                  className="ap-textarea"
                  rows={10}
                  placeholder="My name is... I study in Class... My family... I want to learn about finance because..."
                  value={essay}
                  onChange={e => setEssay(e.target.value)}
                />
                <div className={`ap-wordcount ${wordCount >= 100 ? "good" : wordCount >= 70 ? "warn" : ""}`}>
                  {wordCount} / 100 words {wordCount >= 100 ? "✅" : ""}
                </div>
              </div>
            </>
          ) : (
            <>
              <p style={{ color: "var(--muted)", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                Please describe your family income situation and upload any supporting document
                (BPL card, income certificate, fee waiver, Aadhar-linked ration card, etc.).
              </p>
              <div className="ap-field-group">
                <label className="ap-label">Monthly Family Income (₹)</label>
                <input
                  className="ap-input"
                  type="number"
                  placeholder="e.g. 8000"
                  value={income}
                  onChange={e => setIncome(e.target.value)}
                />
              </div>
              <div className="ap-field-group">
                <label className="ap-label">Number of family members</label>
                <input
                  className="ap-input"
                  type="number"
                  placeholder="e.g. 5"
                  value={members}
                  onChange={e => setMembers(e.target.value)}
                />
              </div>
              <div className="ap-field-group">
                <label className="ap-label">Describe your situation <span style={{ color: "var(--primary-glow)" }}>*</span></label>
                <textarea
                  className="ap-textarea"
                  rows={5}
                  placeholder="My father works as... We live in... I am unable to afford the subscription because..."
                  value={proofDesc}
                  onChange={e => setProofDesc(e.target.value)}
                />
                <span style={{ fontSize: "0.7rem", color: "var(--muted)" }}>{proofDesc.length}/30 min characters</span>
              </div>
              <div className="ap-field-group">
                <label className="ap-label">Upload Document (optional — image or PDF, max 5MB)</label>
                <div
                  className="ap-upload-zone"
                  onClick={() => fileRef.current?.click()}
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) setFile(f); }}
                >
                  {file ? (
                    <p style={{ color: "var(--neon-green)", fontWeight: 700 }}>✅ {file.name} ({(file.size / 1024).toFixed(0)} KB)</p>
                  ) : (
                    <>
                      <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📎</div>
                      <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>Click to browse or drag and drop your document here</p>
                    </>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*,.pdf" style={{ display: "none" }} onChange={e => setFile(e.target.files?.[0] || null)} />
              </div>
            </>
          )}

          {error && (
            <div style={{ padding: "0.85rem 1rem", borderRadius: "0.75rem", background: "rgba(255,68,102,0.08)", border: "1px solid rgba(255,68,102,0.3)", color: "#FF4466", fontSize: "0.82rem", fontWeight: 700, marginTop: "1rem" }}>
              ⚠️ {error}
            </div>
          )}

          <button
            className="ap-btn-primary"
            style={{ marginTop: "1.5rem", opacity: (appType === "essay" ? canSubmitEssay : canSubmitProof) ? 1 : 0.5, cursor: (appType === "essay" ? canSubmitEssay : canSubmitProof) ? "pointer" : "not-allowed" }}
            onClick={submit}
            disabled={uploading || (appType === "essay" ? !canSubmitEssay : !canSubmitProof)}
          >
            {uploading ? "Submitting…" : "Submit Application →"}
          </button>
          {appType === "essay" && !canSubmitEssay && (
            <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.5rem" }}>
              Write at least {100 - wordCount} more word{100 - wordCount !== 1 ? "s" : ""} to submit.
            </p>
          )}
        </div>
      )}

      {/* Why we do this */}
      <div className="premium-glass ap-why">
        <h2 style={{ fontWeight: 900, marginBottom: "1rem", color: "var(--foreground)" }}>Why We Have This Program</h2>
        <div className="ap-why-grid">
          {[
            { icon: "📚", title: "Education Inequality", body: "Students in government schools rarely learn about budgeting, saving, or investing — skills that determine their financial future." },
            { icon: "🌱", title: "Early Habits Matter", body: "Research shows financial habits formed between ages 10-18 persist throughout adult life. The earlier the learning, the greater the impact." },
            { icon: "💪", title: "Breaking the Cycle", body: "Children who understand money grow up to make better financial decisions — for themselves and their families." },
            { icon: "🤝", title: "Our Commitment", body: "We reserve 20% of seats for scholarship students. Their success stories inspire our paid students and make our community richer." },
          ].map(w => (
            <div key={w.title} className="ap-why-card">
              <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>{w.icon}</div>
              <h3 style={{ fontWeight: 800, fontSize: "0.95rem", marginBottom: "0.4rem", color: "var(--foreground)" }}>{w.title}</h3>
              <p style={{ color: "var(--muted)", fontSize: "0.8rem", lineHeight: 1.6 }}>{w.body}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .ap-root { display:flex; flex-direction:column; gap:2rem; max-width:800px; margin:0 auto; padding-bottom:4rem; }

        .ap-hero { text-align:center; padding:2.5rem 1rem 1rem; }
        .ap-badge { display:inline-block; font-size:.7rem; font-weight:900; color:var(--neon-green); background:rgba(0,229,160,.1); border:1px solid rgba(0,229,160,.3); border-radius:2rem; padding:.3rem 1rem; letter-spacing:.08em; margin-bottom:1.25rem; }
        .ap-h1 { font-size:clamp(1.8rem,4vw,2.8rem); font-weight:900; line-height:1.1; margin-bottom:1rem; }
        .ap-tagline { color:var(--muted); font-size:1rem; line-height:1.65; max-width:560px; margin:0 auto 2rem; }
        .ap-stats-row { display:flex; justify-content:center; gap:2.5rem; flex-wrap:wrap; }
        .ap-stat { display:flex; flex-direction:column; align-items:center; gap:.2rem; }
        .ap-stat-num { font-size:1.6rem; font-weight:900; color:var(--foreground); }
        .ap-stat-lbl { font-size:.7rem; font-weight:700; color:var(--muted); text-transform:uppercase; letter-spacing:.05em; }

        .ap-section-title { font-size:1.2rem; font-weight:900; color:var(--foreground); margin-bottom:1.25rem; }
        .ap-options { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
        .ap-option { background:rgba(14,22,56,.6); border:1px solid var(--border); border-radius:1.25rem; padding:1.5rem; text-align:left; cursor:pointer; transition:all .2s; color:var(--foreground); font-family:inherit; }
        .ap-option:hover { border-color:rgba(108,99,255,.5); background:rgba(108,99,255,.07); }
        .ap-option.selected { border-color:rgba(108,99,255,.6); background:rgba(108,99,255,.12); box-shadow:0 0 24px rgba(108,99,255,.15); }
        .ap-opt-icon { font-size:2rem; margin-bottom:.75rem; }
        .ap-option h3 { font-size:1.05rem; font-weight:900; margin-bottom:.5rem; }
        .ap-option p { font-size:.82rem; color:var(--muted); line-height:1.6; margin-bottom:.75rem; }
        .ap-opt-tag { font-size:.65rem; font-weight:900; color:var(--primary-glow); background:rgba(108,99,255,.12); border:1px solid rgba(108,99,255,.25); border-radius:2rem; display:inline-block; padding:.2rem .65rem; text-transform:uppercase; letter-spacing:.05em; }

        .ap-card { padding:2.5rem; border-radius:1.5rem; text-align:center; max-width:500px; margin:4rem auto; }
        .ap-btn-primary { display:inline-block; background:linear-gradient(135deg,var(--primary),#8b5cf6); color:white; padding:.75rem 2rem; border-radius:2rem; font-size:.95rem; font-weight:800; text-decoration:none; border:none; cursor:pointer; font-family:inherit; transition:all .2s; letter-spacing:-.01em; }
        .ap-btn-primary:hover { transform:translateY(-2px); box-shadow:0 6px 24px rgba(108,99,255,.4); }

        .ap-form-wrap { padding:2rem; border-radius:1.5rem; display:flex; flex-direction:column; gap:1.25rem; }
        .ap-back { background:none; border:none; color:var(--muted); cursor:pointer; font-size:.85rem; font-weight:700; font-family:inherit; text-align:left; padding:0; margin-bottom:.5rem; }
        .ap-back:hover { color:var(--foreground); }
        .ap-label { font-size:.72rem; font-weight:900; color:var(--muted); text-transform:uppercase; letter-spacing:.06em; display:block; margin-bottom:.4rem; }
        .ap-field-group { display:flex; flex-direction:column; gap:.3rem; }
        .ap-input { background:rgba(0,0,0,.3); border:1px solid var(--border); color:white; padding:.75rem 1rem; border-radius:.75rem; font-size:.95rem; font-family:inherit; outline:none; transition:border-color .2s; }
        .ap-input:focus { border-color:var(--primary); }
        .ap-textarea { width:100%; background:rgba(0,0,0,.3); border:1px solid var(--border); color:white; padding:.85rem 1rem; border-radius:.75rem; font-size:.9rem; font-family:inherit; outline:none; resize:vertical; line-height:1.65; transition:border-color .2s; box-sizing:border-box; }
        .ap-textarea:focus { border-color:var(--primary); }
        .ap-wordcount { margin-top:.4rem; font-size:.75rem; font-weight:800; color:var(--muted); text-align:right; }
        .ap-wordcount.warn { color:#F4A535; }
        .ap-wordcount.good { color:var(--neon-green); }
        .ap-upload-zone { border:2px dashed var(--border); border-radius:1rem; padding:2rem; text-align:center; cursor:pointer; transition:all .2s; }
        .ap-upload-zone:hover { border-color:rgba(108,99,255,.5); background:rgba(108,99,255,.04); }

        .ap-why { padding:2rem; border-radius:1.5rem; }
        .ap-why-grid { display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; }
        .ap-why-card { padding:1.25rem; background:rgba(0,0,0,.2); border-radius:1rem; border:1px solid rgba(255,255,255,.05); }

        @media(max-width:640px) {
          .ap-options { grid-template-columns:1fr; }
          .ap-why-grid { grid-template-columns:1fr; }
          .ap-stats-row { gap:1.5rem; }
        }
      `}</style>
    </div>
  );
}
