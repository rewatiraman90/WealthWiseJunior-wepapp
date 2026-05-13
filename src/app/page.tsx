"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const STUDENT_EMOJIS = ["🔭", "🪙", "📋", "🎯", "📊", "📈", "🏗️", "🏆"];

export default function GatewayPage() {
  const [hasProfile, setHasProfile] = useState(false);
  const [hovered, setHovered] = useState<"student" | "parent" | null>(null);

  useEffect(() => {
    setHasProfile(!!localStorage.getItem("wwj_profile"));
  }, []);

  return (
    <div className="gw-root">

      {/* ── animated grid bg ── */}
      <div className="gw-bg" />
      <div className="gw-radial" />

      {/* ── floating level emojis (depth layer) ── */}
      <div className="gw-floats" aria-hidden>
        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={i}
            className="gw-fe"
            style={{
              "--dx": `${Math.random() * 90 + 5}%`,
              "--dy": `${Math.random() * 80 + 10}%`,
              "--d":  `${(i * 0.7).toFixed(1)}s`,
              "--s":  `${(Math.random() * 0.8 + 0.6).toFixed(2)}`,
            } as any}
          >
            {STUDENT_EMOJIS[i % 8]}
          </span>
        ))}
      </div>

      {/* ── logo ── */}
      <div className="gw-logo-row">
        <img src="/logo.png" alt="WealthWise Jr." className="gw-logo-img" />
        <div className="gw-logotext">
          <span className="gw-lw">WealthWise</span><span className="gw-ljr"> Jr.</span>
        </div>
      </div>

      {/* ── headline ── */}
      <div className="gw-headline-wrap">
        <div className="gw-eyebrow">India&apos;s First Financial Education System for School Students</div>
        <h1 className="gw-h1">
          This is your chance<br />
          to <span className="gw-money-word">master money.</span>
        </h1>
        <p className="gw-sub">8 levels. Class 5 to 12. Explorer to Master.<br />Choose your path below.</p>
      </div>

      {/* ── TWO DOORS ── */}
      <div className="gw-doors">

        {/* STUDENT DOOR */}
        <Link
          href={hasProfile ? "/campus" : "/onboarding"}
          className={`gw-door gw-sdoor ${hovered === "student" ? "gw-expand" : hovered === "parent" ? "gw-shrink" : ""}`}
          onMouseEnter={() => setHovered("student")}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="gw-door-noise" />
          <div className="gw-sdoor-glow" />

          {/* floating emojis inside student door */}
          <div className="gw-door-floats" aria-hidden>
            {STUDENT_EMOJIS.map((e, i) => (
              <span
                key={i}
                className="gw-dfe"
                style={{ "--di": i, "--dx": `${8 + i * 11}%`, "--dd": `${i * 0.6}s` } as any}
              >{e}</span>
            ))}
          </div>

          <div className="gw-door-body">
            <div className="gw-door-who">For Students</div>
            <div className="gw-door-icon">🎓</div>
            <h2 className="gw-door-h">I&apos;m a Student</h2>
            <p className="gw-door-desc">
              Class 5 to 12 · 8 progressive levels<br />
              Explorer → Saver → Analyst → Master
            </p>
            <div className="gw-level-strip">
              {STUDENT_EMOJIS.map((e, i) => (
                <div key={i} className="gw-lvl-dot" title={e}>{e}</div>
              ))}
            </div>
            <div className="gw-door-btn gw-sbtn">
              {hasProfile ? "Continue Journey" : "Begin Journey"} →
            </div>
          </div>

          {/* edge glow line */}
          <div className="gw-sedge" />
        </Link>

        {/* CENTER DIVIDER */}
        <div className="gw-divider">
          <div className="gw-div-v" />
          <div className="gw-div-or">OR</div>
          <div className="gw-div-v" />
        </div>

        {/* PARENT DOOR */}
        <Link
          href="/parent"
          className={`gw-door gw-pdoor ${hovered === "parent" ? "gw-expand" : hovered === "student" ? "gw-shrink" : ""}`}
          onMouseEnter={() => setHovered("parent")}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="gw-door-noise" />
          <div className="gw-pdoor-glow" />

          <div className="gw-door-body">
            <div className="gw-door-who">For Parents</div>
            <div className="gw-door-icon">👨‍👩‍👧</div>
            <h2 className="gw-door-h">I&apos;m a Parent</h2>
            <p className="gw-door-desc">
              See exactly what your child learns<br />
              Track progress · Parent dashboard included
            </p>
            <div className="gw-parent-facts">
              <div className="gw-pfact"><span className="gw-pfact-icon">📊</span> Real-time progress dashboard</div>
              <div className="gw-pfact"><span className="gw-pfact-icon">🔒</span> Safe, moderated platform</div>
              <div className="gw-pfact"><span className="gw-pfact-icon">🎓</span> Free scholarship seats available</div>
            </div>
            <div className="gw-door-btn gw-pbtn">Learn More →</div>
          </div>

          {/* edge glow line */}
          <div className="gw-pedge" />
        </Link>

      </div>

      {/* ── bottom links ── */}
      <div className="gw-footer">
        {hasProfile
          ? <Link href="/campus" className="gw-flink">→ Go to Campus</Link>
          : <Link href="/onboarding" className="gw-flink">→ Already have an account? Login</Link>
        }
        <span className="gw-fdot">·</span>
        <Link href="/apply" className="gw-flink">🎓 Apply for Free Scholarship</Link>
        <span className="gw-fdot">·</span>
        <Link href="/contact" className="gw-flink">Contact</Link>
      </div>

      <style jsx>{`
        /* ── ROOT ── */
        .gw-root {
          min-height: 100vh;
          background: #040812;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2.5rem 1.5rem;
          gap: 2rem;
          position: relative;
          overflow: hidden;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        /* ── BACKGROUND ── */
        .gw-bg {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(108,99,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(108,99,255,0.035) 1px, transparent 1px);
          background-size: 52px 52px;
          pointer-events: none;
          z-index: 0;
        }
        .gw-radial {
          position: fixed;
          inset: 0;
          background: radial-gradient(ellipse 90% 60% at 50% 50%, rgba(108,99,255,0.07), transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── FLOATING EMOJIS (global bg layer) ── */
        .gw-floats { position: fixed; inset: 0; pointer-events: none; z-index: 1; }
        .gw-fe {
          position: absolute;
          font-size: 1.6rem;
          left: var(--dx);
          top: var(--dy);
          opacity: 0;
          animation: gfe 14s ease-in-out infinite;
          animation-delay: var(--d);
          transform: scale(var(--s));
          filter: blur(0.5px);
        }
        @keyframes gfe {
          0%   { opacity: 0; transform: translateY(0) scale(var(--s)); }
          15%  { opacity: 0.04; }
          85%  { opacity: 0.04; }
          100% { opacity: 0; transform: translateY(-30px) scale(var(--s)); }
        }

        /* ── LOGO ── */
        .gw-logo-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          position: relative;
          z-index: 10;
        }
        .gw-logo-img { height: 44px; width: auto; }
        .gw-logotext { font-size: 1.3rem; font-weight: 900; letter-spacing: -0.03em; }
        .gw-lw { color: white; }
        .gw-ljr { color: #6C63FF; }

        /* ── HEADLINE ── */
        .gw-headline-wrap {
          text-align: center;
          position: relative;
          z-index: 10;
          max-width: 720px;
        }
        .gw-eyebrow {
          font-size: 0.7rem;
          font-weight: 700;
          color: rgba(255,255,255,0.3);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 1.1rem;
        }
        .gw-h1 {
          font-size: clamp(2.6rem, 6vw, 5rem);
          font-weight: 900;
          color: white;
          line-height: 1.06;
          letter-spacing: -0.03em;
          margin-bottom: 1rem;
        }
        .gw-money-word {
          background: linear-gradient(135deg, #F4A535 0%, #FF6B35 40%, #6C63FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .gw-sub {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.38);
          font-weight: 500;
          line-height: 1.7;
        }

        /* ── DOORS CONTAINER ── */
        .gw-doors {
          display: flex;
          align-items: stretch;
          width: 100%;
          max-width: 960px;
          min-height: 360px;
          border-radius: 2rem;
          overflow: hidden;
          position: relative;
          z-index: 10;
          box-shadow: 0 50px 140px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05);
        }

        /* ── INDIVIDUAL DOOR ── */
        .gw-door {
          flex: 1;
          position: relative;
          overflow: hidden;
          padding: 2.5rem 2.5rem 2.8rem;
          text-decoration: none;
          display: flex;
          align-items: flex-end;
          transition: flex 0.5s cubic-bezier(0.4,0,0.2,1);
          cursor: pointer;
          min-width: 0;
        }
        .gw-door.gw-expand { flex: 1.45; }
        .gw-door.gw-shrink { flex: 0.65; }

        /* Student door bg */
        .gw-sdoor {
          background: linear-gradient(145deg, #0C0828 0%, #130C3A 50%, #0A1530 100%);
        }
        .gw-sdoor:hover {
          background: linear-gradient(145deg, #100C35 0%, #1C1050 50%, #0D1A3A 100%);
        }
        .gw-sdoor-glow {
          position: absolute;
          top: -60px; left: -60px;
          width: 300px; height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(108,99,255,0.18), transparent 70%);
          pointer-events: none;
          transition: opacity 0.4s;
          opacity: 0;
        }
        .gw-sdoor:hover .gw-sdoor-glow { opacity: 1; }
        .gw-sedge {
          position: absolute;
          top: 0; bottom: 0; left: 0;
          width: 3px;
          background: linear-gradient(to bottom, #6C63FF, #8B5CF6, transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .gw-sdoor:hover .gw-sedge { opacity: 1; }

        /* Parent door bg */
        .gw-pdoor {
          background: linear-gradient(145deg, #0D1130 0%, #150D00 50%, #0B1437 100%);
        }
        .gw-pdoor:hover {
          background: linear-gradient(145deg, #101535 0%, #1E1200 50%, #0E1840 100%);
        }
        .gw-pdoor-glow {
          position: absolute;
          top: -60px; right: -60px;
          width: 300px; height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(244,165,53,0.15), transparent 70%);
          pointer-events: none;
          transition: opacity 0.4s;
          opacity: 0;
        }
        .gw-pdoor:hover .gw-pdoor-glow { opacity: 1; }
        .gw-pedge {
          position: absolute;
          top: 0; bottom: 0; right: 0;
          width: 3px;
          background: linear-gradient(to bottom, #F4A535, #E8961E, transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .gw-pdoor:hover .gw-pedge { opacity: 1; }

        /* Noise texture on both doors */
        .gw-door-noise {
          position: absolute;
          inset: 0;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        /* Floating emojis inside student door */
        .gw-door-floats { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
        .gw-dfe {
          position: absolute;
          font-size: 1.4rem;
          left: var(--dx);
          bottom: -10px;
          opacity: 0;
          animation: dfe 8s ease-in-out infinite;
          animation-delay: var(--dd);
        }
        @keyframes dfe {
          0%   { opacity: 0; transform: translateY(0); }
          20%  { opacity: 0.12; }
          80%  { opacity: 0.08; }
          100% { opacity: 0; transform: translateY(-280px) rotate(15deg); }
        }
        .gw-sdoor:hover .gw-dfe { opacity: 0; animation-play-state: paused; }

        /* ── DOOR CONTENT ── */
        .gw-door-body {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          width: 100%;
        }
        .gw-door-who {
          font-size: 0.6rem;
          font-weight: 900;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }
        .gw-door-icon {
          font-size: 2.2rem;
          line-height: 1;
          margin-bottom: 0.1rem;
        }
        .gw-door-h {
          font-size: clamp(1.5rem, 2.8vw, 2.1rem);
          font-weight: 900;
          color: white;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }
        .gw-door-desc {
          font-size: 0.83rem;
          color: rgba(255,255,255,0.45);
          font-weight: 500;
          line-height: 1.55;
        }

        /* Level emoji strip */
        .gw-level-strip {
          display: flex;
          gap: 0.35rem;
          flex-wrap: wrap;
          margin-top: 0.1rem;
        }
        .gw-lvl-dot {
          font-size: 1.1rem;
          opacity: 0.45;
          transition: opacity 0.2s, transform 0.2s;
        }
        .gw-sdoor:hover .gw-lvl-dot { opacity: 0.9; }
        .gw-sdoor:hover .gw-lvl-dot:nth-child(1) { transition-delay: 0.00s; }
        .gw-sdoor:hover .gw-lvl-dot:nth-child(2) { transition-delay: 0.04s; }
        .gw-sdoor:hover .gw-lvl-dot:nth-child(3) { transition-delay: 0.08s; }
        .gw-sdoor:hover .gw-lvl-dot:nth-child(4) { transition-delay: 0.12s; }
        .gw-sdoor:hover .gw-lvl-dot:nth-child(5) { transition-delay: 0.16s; }
        .gw-sdoor:hover .gw-lvl-dot:nth-child(6) { transition-delay: 0.20s; }
        .gw-sdoor:hover .gw-lvl-dot:nth-child(7) { transition-delay: 0.24s; }
        .gw-sdoor:hover .gw-lvl-dot:nth-child(8) { transition-delay: 0.28s; }

        /* Parent facts */
        .gw-parent-facts { display: flex; flex-direction: column; gap: 0.4rem; margin-top: 0.1rem; }
        .gw-pfact {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.42);
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .gw-pfact-icon { font-size: 0.9rem; }

        /* CTA buttons */
        .gw-door-btn {
          display: inline-flex;
          align-items: center;
          padding: 0.65rem 1.5rem;
          border-radius: 2rem;
          font-size: 0.88rem;
          font-weight: 800;
          margin-top: 0.4rem;
          width: fit-content;
          transition: transform 0.25s, box-shadow 0.25s;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .gw-sbtn {
          background: linear-gradient(135deg, #6C63FF, #8B5CF6);
          color: white;
          box-shadow: 0 4px 20px rgba(108,99,255,0.35);
        }
        .gw-pbtn {
          background: linear-gradient(135deg, #F4A535, #E8961E);
          color: #0B1437;
          box-shadow: 0 4px 20px rgba(244,165,53,0.35);
        }
        .gw-door:hover .gw-door-btn {
          transform: translateX(6px);
          box-shadow: 0 6px 28px rgba(108,99,255,0.5);
        }
        .gw-pdoor:hover .gw-door-btn {
          box-shadow: 0 6px 28px rgba(244,165,53,0.5);
        }

        /* ── CENTER DIVIDER ── */
        .gw-divider {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 1px;
          background: rgba(255,255,255,0.07);
          position: relative;
          z-index: 20;
          flex-shrink: 0;
        }
        .gw-div-v { flex: 1; }
        .gw-div-or {
          background: #040812;
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.2);
          font-size: 0.55rem;
          font-weight: 900;
          padding: 0.4rem 0.3rem;
          border-radius: 0.4rem;
          letter-spacing: 0.06em;
          writing-mode: vertical-rl;
          flex-shrink: 0;
        }

        /* ── FOOTER ── */
        .gw-footer {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          position: relative;
          z-index: 10;
          flex-wrap: wrap;
          justify-content: center;
        }
        .gw-flink {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.25);
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .gw-flink:hover { color: rgba(255,255,255,0.65); }
        .gw-fdot { color: rgba(255,255,255,0.12); font-size: 0.7rem; }

        /* ── MOBILE ── */
        @media(max-width: 700px) {
          .gw-root { padding: 1.5rem 1rem; gap: 1.5rem; }
          .gw-h1 { font-size: clamp(2rem, 9vw, 3rem); }
          .gw-doors {
            flex-direction: column;
            min-height: auto;
            max-width: 440px;
            border-radius: 1.5rem;
          }
          .gw-door { padding: 2rem 1.75rem 2.2rem; flex: 1 !important; min-height: 260px; }
          .gw-divider { width: 100%; height: 1px; flex-direction: row; }
          .gw-div-v { height: 1px; flex: 1; }
          .gw-div-or { writing-mode: horizontal-tb; padding: 0.3rem 0.5rem; }
          .gw-sedge { display: none; }
          .gw-pedge { display: none; }
          .gw-footer { gap: 0.75rem; }
        }
      `}</style>
    </div>
  );
}
