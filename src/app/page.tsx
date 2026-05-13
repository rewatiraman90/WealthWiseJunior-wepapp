"use client";
import Link from "next/link";

export default function GatewayPage() {
  return (
    <div className="gw-root">

      {/* ── Title ── */}
      <div className="gw-header">
        <h1 className="gw-h1">This is your chance to master money.</h1>
      </div>

      {/* ── Student door overlay (left door in image) ── */}
      <Link href="/students" className="gw-overlay gw-overlay-student">
        <h2 className="gw-door-h">I&apos;m a<br />Student</h2>
        <div className="gw-btn gw-btn-purple">Begin Journey →</div>
      </Link>

      {/* ── Parent door overlay (right door in image) ── */}
      <Link href="/parent" className="gw-overlay gw-overlay-parent">
        <h2 className="gw-door-h">I&apos;m a<br />Parent</h2>
        <div className="gw-btn gw-btn-gold">Learn More →</div>
      </Link>

      {/* ── Doormat ── */}
      <div className="gw-doormat-area">
        <Link href="/campus" className="gw-doormat">
          <span className="gw-doormat-title">Welcome to the Campus</span>
          <small className="gw-doormat-sub">Click to login to campus</small>
        </Link>
        <div className="gw-flinks">
          <Link href="/apply" className="gw-flink">🎓 Apply for Free Scholarship</Link>
          <span className="gw-fdot">·</span>
          <a href="mailto:hello@wealthwisejunior.in.net" className="gw-flink">Contact</a>
        </div>
      </div>

      <style jsx>{`
        .gw-root {
          position: fixed;
          inset: 0;
          font-family: 'Georgia', serif;
          color: white;
          overflow: hidden;
          z-index: 9999;
          background-image: url('/gateway-bg.png');
          background-size: cover;
          background-position: center top;
        }

        /* ── TITLE ── */
        .gw-header {
          position: absolute;
          top: 5%;
          width: 100%;
          text-align: center;
          z-index: 10;
          pointer-events: none;
        }
        .gw-h1 {
          font-size: clamp(1.2rem, 2.5vw, 2.6rem);
          font-weight: 300;
          letter-spacing: 2px;
          margin: 0;
          color: white;
          text-shadow: 0 2px 16px rgba(0,0,0,0.9), 0 0 60px rgba(0,0,0,0.8);
        }

        /* ── DOOR OVERLAYS ── */
        /* Transparent clickable zones sized and positioned to sit over each door in the image */
        .gw-overlay {
          position: absolute;
          top: 16%;
          bottom: 23%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 1.75rem;
          text-decoration: none;
          cursor: pointer;
          z-index: 10;
        }
        /* Left door: spans the left ~45% of the image */
        .gw-overlay-student {
          left: 4%;
          right: 56%;
        }
        /* Right door: spans the right ~45% of the image */
        .gw-overlay-parent {
          left: 56%;
          right: 4%;
        }

        /* ── DOOR TEXT ── */
        .gw-door-h {
          font-size: clamp(1.5rem, 2.6vw, 2.6rem);
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 5px;
          color: #ffffff;
          font-weight: 400;
          text-align: center;
          line-height: 1.3;
          text-shadow: 0 2px 24px rgba(0,0,0,1), 0 0 50px rgba(0,0,0,0.9);
          transition: text-shadow 0.3s ease;
        }
        .gw-overlay:hover .gw-door-h {
          text-shadow: 0 2px 24px rgba(0,0,0,1), 0 0 50px rgba(255,255,255,0.15);
        }

        /* ── BUTTONS ── */
        .gw-btn {
          padding: 11px 30px;
          font-size: 0.88rem;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: white;
          font-family: 'Georgia', serif;
          font-weight: 400;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }
        .gw-btn-purple {
          background: rgba(100, 20, 160, 0.88);
          border: 1px solid rgba(138,43,226,0.55);
          box-shadow: 0 2px 12px rgba(0,0,0,0.5);
        }
        .gw-overlay-student:hover .gw-btn-purple {
          background: rgba(138, 43, 226, 0.95);
          box-shadow: 0 0 24px rgba(138,43,226,0.85), 0 2px 12px rgba(0,0,0,0.5);
          border-color: rgba(138,43,226,0.9);
        }
        .gw-btn-gold {
          background: rgba(140, 95, 0, 0.88);
          border: 1px solid rgba(218,165,32,0.5);
          box-shadow: 0 2px 12px rgba(0,0,0,0.5);
        }
        .gw-overlay-parent:hover .gw-btn-gold {
          background: rgba(184, 134, 11, 0.95);
          box-shadow: 0 0 24px rgba(218,165,32,0.8), 0 2px 12px rgba(0,0,0,0.5);
          border-color: rgba(218,165,32,0.85);
        }

        /* ── DOORMAT ── */
        .gw-doormat-area {
          position: absolute;
          bottom: 4%;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          white-space: nowrap;
        }
        .gw-doormat {
          background: rgba(15, 10, 30, 0.75);
          padding: 12px 52px;
          border-radius: 100px / 50px;
          border: 1px solid rgba(255,255,255,0.18);
          color: #ccc;
          cursor: pointer;
          transition: all 0.4s ease;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          backdrop-filter: blur(10px);
        }
        .gw-doormat:hover {
          box-shadow: 0 0 32px rgba(138,43,226,0.7);
          border-color: rgba(138,43,226,0.7);
          color: white;
          transform: scale(1.04);
        }
        .gw-doormat-title {
          display: block;
          font-weight: bold;
          font-size: 0.95rem;
          font-family: 'Georgia', serif;
        }
        .gw-doormat-sub {
          font-size: 0.75rem;
          color: #999;
          font-family: 'Georgia', serif;
        }
        .gw-doormat:hover .gw-doormat-sub { color: #bbb; }

        /* ── FOOTER LINKS ── */
        .gw-flinks {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .gw-flink {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.42);
          text-decoration: none;
          font-family: 'Georgia', serif;
          transition: color 0.3s ease;
        }
        .gw-flink:hover { color: rgba(255,255,255,0.88); }
        .gw-fdot { color: rgba(255,255,255,0.2); font-size: 0.78rem; }

        /* ── MOBILE ── */
        @media (max-width: 640px) {
          .gw-root { background-position: 35% top; }
          .gw-h1 { font-size: 1.1rem; letter-spacing: 1px; }
          .gw-overlay { top: 18%; bottom: 26%; gap: 1rem; }
          .gw-overlay-student { left: 2%; right: 55%; }
          .gw-overlay-parent { left: 55%; right: 2%; }
          .gw-door-h { font-size: 1.2rem; letter-spacing: 3px; }
          .gw-btn { padding: 9px 18px; font-size: 0.78rem; }
          .gw-doormat { padding: 10px 32px; }
          .gw-doormat-title { font-size: 0.85rem; }
        }
      `}</style>
    </div>
  );
}
