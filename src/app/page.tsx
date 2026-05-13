"use client";
import Link from "next/link";

export default function GatewayPage() {
  return (
    <div className="gw-root">

      {/* ── Background layers ── */}
      <div className="gw-bg" />
      <div className="gw-bg-purple" />
      <div className="gw-bg-gold" />

      {/* ── Top Heading ── */}
      <div className="gw-header">
        <h1 className="gw-h1">This is your chance to master money.</h1>
      </div>

      {/* ── Two Doors ── */}
      <div className="gw-doors">

        {/* Student Door */}
        <Link href="/students" className="gw-door gw-student">
          <div className="gw-door-frame">
            <div className="gw-door-panel gw-door-panel-top" />
            <div className="gw-door-panel gw-door-panel-bottom" />
            <div className="gw-door-content">
              <h2 className="gw-door-h">I&apos;m a<br />Student</h2>
              <div className="gw-btn gw-btn-purple">Begin Journey →</div>
            </div>
            <div className="gw-handle gw-handle-right" />
          </div>
        </Link>

        {/* Parent Door */}
        <Link href="/parent" className="gw-door gw-parent">
          <div className="gw-door-frame">
            <div className="gw-door-panel gw-door-panel-top" />
            <div className="gw-door-panel gw-door-panel-bottom" />
            <div className="gw-door-content">
              <h2 className="gw-door-h">I&apos;m a<br />Parent</h2>
              <div className="gw-btn gw-btn-gold">Learn More →</div>
            </div>
            <div className="gw-handle gw-handle-left" />
          </div>
        </Link>

      </div>

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
        /* ── ROOT: breaks out of page-body padding ── */
        .gw-root {
          position: fixed;
          inset: 0;
          font-family: 'Georgia', serif;
          color: white;
          overflow: hidden;
          z-index: 9999;
        }

        /* ── BACKGROUND ── */
        .gw-bg {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, #0a061a 0%, #050210 50%, #000000 100%);
          z-index: 0;
        }
        /* Subtle architectural floor/ceiling lines */
        .gw-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            repeating-linear-gradient(
              180deg,
              transparent 0px,
              transparent 80px,
              rgba(255,255,255,0.015) 80px,
              rgba(255,255,255,0.015) 81px
            );
          mask-image: radial-gradient(ellipse at center, black 20%, transparent 80%);
        }
        .gw-bg-purple {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 55%;
          height: 60%;
          background: radial-gradient(ellipse at bottom left, rgba(120,30,200,0.35) 0%, transparent 65%);
          z-index: 1;
          pointer-events: none;
        }
        .gw-bg-gold {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 55%;
          height: 60%;
          background: radial-gradient(ellipse at bottom right, rgba(180,120,0,0.3) 0%, transparent 65%);
          z-index: 1;
          pointer-events: none;
        }

        /* ── HEADER ── */
        .gw-header {
          position: absolute;
          top: 6%;
          width: 100%;
          text-align: center;
          z-index: 10;
          pointer-events: none;
        }
        .gw-h1 {
          font-size: clamp(1.3rem, 2.8vw, 2.8rem);
          font-weight: 300;
          letter-spacing: 2px;
          text-shadow: 0 2px 20px rgba(0,0,0,0.8);
          margin: 0;
          color: rgba(255,255,255,0.92);
        }

        /* ── DOOR CONTAINER ── */
        .gw-doors {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          z-index: 5;
        }

        /* ── DOOR BASE ── */
        .gw-door {
          width: 300px;
          height: 520px;
          position: relative;
          text-decoration: none;
          transition: transform 0.5s cubic-bezier(0.25,1,0.5,1), box-shadow 0.5s ease;
          margin: 0 -1px;
        }

        /* ── DOOR FRAME ── */
        .gw-door-frame {
          width: 100%;
          height: 100%;
          position: relative;
          border-radius: 4px 4px 2px 2px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        /* Student door colors */
        .gw-student .gw-door-frame {
          background: linear-gradient(160deg, #1c0d35 0%, #120824 40%, #0a0418 100%);
          border: 2px solid rgba(138,43,226,0.4);
          box-shadow:
            0 0 60px rgba(120,30,200,0.4),
            inset 0 1px 0 rgba(255,255,255,0.08),
            inset 0 -1px 0 rgba(0,0,0,0.5);
        }
        .gw-student:hover {
          transform: scale(1.04) translateY(-6px);
        }
        .gw-student:hover .gw-door-frame {
          border-color: rgba(138,43,226,0.9);
          box-shadow:
            0 0 100px rgba(120,30,200,0.8),
            0 20px 60px rgba(0,0,0,0.6),
            inset 0 1px 0 rgba(255,255,255,0.1);
        }

        /* Parent door colors */
        .gw-parent .gw-door-frame {
          background: linear-gradient(160deg, #1a1205 0%, #12100a 40%, #080600 100%);
          border: 2px solid rgba(180,120,0,0.4);
          box-shadow:
            0 0 60px rgba(160,100,0,0.35),
            inset 0 1px 0 rgba(255,255,255,0.06),
            inset 0 -1px 0 rgba(0,0,0,0.5);
        }
        .gw-parent:hover {
          transform: scale(1.04) translateY(-6px);
        }
        .gw-parent:hover .gw-door-frame {
          border-color: rgba(218,165,32,0.9);
          box-shadow:
            0 0 100px rgba(180,120,0,0.7),
            0 20px 60px rgba(0,0,0,0.6),
            inset 0 1px 0 rgba(255,255,255,0.08);
        }

        /* ── DOOR PANELS (decorative inset rectangles) ── */
        .gw-door-panel {
          position: absolute;
          left: 14px;
          right: 14px;
          border-radius: 3px;
        }
        .gw-student .gw-door-panel {
          border: 1px solid rgba(138,43,226,0.25);
          background: rgba(138,43,226,0.04);
        }
        .gw-parent .gw-door-panel {
          border: 1px solid rgba(218,165,32,0.2);
          background: rgba(180,120,0,0.04);
        }
        .gw-door-panel-top {
          top: 14px;
          height: 110px;
        }
        .gw-door-panel-bottom {
          bottom: 14px;
          height: 80px;
        }

        /* ── DOOR CONTENT ── */
        .gw-door-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          z-index: 2;
          position: relative;
        }

        /* ── DOOR HANDLE ── */
        .gw-handle {
          position: absolute;
          bottom: 110px;
          width: 10px;
          height: 34px;
          border-radius: 5px;
        }
        .gw-handle-right { right: 22px; }
        .gw-handle-left { left: 22px; }
        .gw-student .gw-handle {
          background: linear-gradient(180deg, rgba(180,130,255,0.6), rgba(100,50,200,0.5));
          box-shadow: 0 0 8px rgba(138,43,226,0.5);
        }
        .gw-parent .gw-handle {
          background: linear-gradient(180deg, rgba(255,215,0,0.7), rgba(180,120,0,0.5));
          box-shadow: 0 0 8px rgba(218,165,32,0.5);
        }

        /* ── DOOR HEADING ── */
        .gw-door-h {
          font-size: clamp(1.6rem, 2.5vw, 2.5rem);
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 5px;
          color: #f0f0f0;
          font-weight: 400;
          text-align: center;
          line-height: 1.3;
          text-shadow: 0 2px 20px rgba(0,0,0,0.8);
        }

        /* ── BUTTONS ── */
        .gw-btn {
          padding: 12px 32px;
          font-size: 0.95rem;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.4s ease;
          color: white;
          font-family: 'Georgia', serif;
          font-weight: 400;
          letter-spacing: 1px;
          white-space: nowrap;
        }
        .gw-btn-purple {
          background: rgba(106,27,154,0.85);
          border: 1px solid rgba(138,43,226,0.5);
        }
        .gw-student:hover .gw-btn-purple {
          background: rgba(142,36,170,0.95);
          box-shadow: 0 0 24px rgba(138,43,226,0.8);
          border-color: rgba(138,43,226,0.9);
        }
        .gw-btn-gold {
          background: rgba(140,100,0,0.85);
          border: 1px solid rgba(218,165,32,0.4);
        }
        .gw-parent:hover .gw-btn-gold {
          background: rgba(184,134,11,0.95);
          box-shadow: 0 0 24px rgba(218,165,32,0.7);
          border-color: rgba(218,165,32,0.8);
        }

        /* ── DOORMAT ── */
        .gw-doormat-area {
          position: absolute;
          bottom: 5%;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .gw-doormat {
          background: rgba(30,25,50,0.85);
          padding: 14px 56px;
          border-radius: 100px / 50px;
          border: 1px solid rgba(255,255,255,0.15);
          color: #ccc;
          cursor: pointer;
          transition: all 0.5s ease;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          white-space: nowrap;
          backdrop-filter: blur(12px);
        }
        .gw-doormat:hover {
          box-shadow: 0 0 30px rgba(138,43,226,0.7);
          border-color: rgba(138,43,226,0.7);
          color: white;
          transform: scale(1.05);
        }
        .gw-doormat-title {
          display: block;
          font-weight: bold;
          font-size: 1rem;
          font-family: 'Georgia', serif;
        }
        .gw-doormat-sub {
          font-size: 0.78rem;
          color: #888;
          font-family: 'Georgia', serif;
        }
        .gw-doormat:hover .gw-doormat-sub {
          color: #bbb;
        }

        /* ── FOOTER LINKS ── */
        .gw-flinks {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .gw-flink {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.35);
          text-decoration: none;
          font-family: 'Georgia', serif;
          transition: color 0.3s ease;
        }
        .gw-flink:hover { color: rgba(255,255,255,0.8); }
        .gw-fdot { color: rgba(255,255,255,0.2); font-size: 0.78rem; }

        /* ── MOBILE ── */
        @media (max-width: 640px) {
          .gw-h1 { font-size: clamp(1.1rem, 5vw, 1.6rem); }
          .gw-doors { flex-direction: column; align-items: center; justify-content: center; gap: 20px; }
          .gw-door { width: 260px; height: 200px; margin: 0; }
          .gw-door-panel-top { height: 50px; }
          .gw-door-panel-bottom { height: 40px; }
          .gw-door-content { gap: 1rem; }
          .gw-door-h { font-size: 1.3rem; letter-spacing: 3px; }
          .gw-handle { display: none; }
          .gw-btn { padding: 10px 24px; font-size: 0.85rem; }
          .gw-doormat { padding: 12px 36px; }
        }
      `}</style>
    </div>
  );
}
