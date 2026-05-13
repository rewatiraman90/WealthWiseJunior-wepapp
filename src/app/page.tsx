"use client";
import Link from "next/link";

export default function GatewayPage() {
  return (
    <div className="gw-root">

      {/* ── Top Heading ── */}
      <div className="gw-header">
        <h1 className="gw-h1">This is your chance to master money.</h1>
      </div>

      {/* ── Two Doors ── */}
      <div className="gw-doors">

        {/* Student Door */}
        <Link href="/students" className="gw-door gw-student">
          <h2 className="gw-door-h">I&apos;m a Student</h2>
          <div className="gw-btn gw-btn-purple">Begin Journey →</div>
        </Link>

        {/* Parent Door */}
        <Link href="/parent" className="gw-door gw-parent">
          <h2 className="gw-door-h">I&apos;m a Parent</h2>
          <div className="gw-btn gw-btn-gold">Learn More →</div>
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
        /* position:fixed breaks out of the layout's page-body padding */
        .gw-root {
          position: fixed;
          inset: 0;
          font-family: 'Georgia', serif;
          background-color: #0a0a0c;
          color: white;
          overflow: hidden;
          z-index: 9999;
        }

        /* HEADER */
        .gw-header {
          position: absolute;
          top: 5%;
          width: 100%;
          text-align: center;
          z-index: 10;
          pointer-events: none;
        }
        .gw-h1 {
          font-size: clamp(1.4rem, 3vw, 3rem);
          font-weight: 300;
          letter-spacing: 1px;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
          margin: 0;
          color: white;
        }

        /* DOOR CONTAINER */
        .gw-doors {
          display: flex;
          height: 100%;
          width: 100%;
          align-items: stretch;
        }

        /* DOOR BASE */
        .gw-door {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          transition: flex 0.6s cubic-bezier(0.25, 1, 0.5, 1);
          cursor: pointer;
          text-decoration: none;
          gap: 2rem;
        }

        /* STUDENT DOOR */
        .gw-student {
          background: linear-gradient(to bottom, #1a0b2e, #000000);
          border-right: 1px solid rgba(255,255,255,0.1);
        }
        .gw-student:hover {
          flex: 1.5;
          box-shadow: inset -20px 0 50px -20px rgba(138,43,226,0.8);
          border-right: 3px solid rgba(138,43,226,0.8);
        }

        /* PARENT DOOR */
        .gw-parent {
          background: linear-gradient(to bottom, #0b142e, #000000);
          border-left: 1px solid rgba(255,255,255,0.1);
        }
        .gw-parent:hover {
          flex: 1.5;
          box-shadow: inset 20px 0 50px -20px rgba(255,215,0,0.6);
          border-left: 3px solid rgba(255,215,0,0.6);
        }

        /* DOOR HEADING */
        .gw-door-h {
          font-size: clamp(1.8rem, 3.5vw, 3.5rem);
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 4px;
          color: #f0f0f0;
          font-weight: 400;
          text-align: center;
        }

        /* BUTTONS */
        .gw-btn {
          padding: 15px 40px;
          font-size: 1.1rem;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.4s ease;
          color: white;
          font-family: 'Georgia', serif;
          font-weight: 400;
          letter-spacing: 0.5px;
        }
        .gw-btn-purple {
          background: #6a1b9a;
          transform: translateX(0);
        }
        .gw-student:hover .gw-btn-purple {
          transform: translateX(20px);
          background: #8e24aa;
          box-shadow: 0 0 20px rgba(138,43,226,0.8);
        }
        .gw-btn-gold {
          background: #b8860b;
        }
        .gw-parent:hover .gw-btn-gold {
          background: #daa520;
          box-shadow: 0 0 20px rgba(255,215,0,0.6);
        }

        /* DOORMAT */
        .gw-doormat-area {
          position: absolute;
          bottom: 5%;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          z-index: 20;
        }
        .gw-doormat {
          background: rgba(40,40,40,0.8);
          padding: 15px 60px;
          border-radius: 100px / 50px;
          border: 2px solid rgba(255,255,255,0.1);
          color: #ccc;
          cursor: pointer;
          transition: all 0.5s ease;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
        }
        .gw-doormat:hover {
          box-shadow: 0 0 30px rgba(138,43,226,0.8);
          border-color: rgba(138,43,226,0.8);
          color: white;
          transform: scale(1.05);
        }
        .gw-doormat-title {
          display: block;
          font-weight: bold;
          font-size: 1.1rem;
          font-family: 'Georgia', serif;
        }
        .gw-doormat-sub {
          font-size: 0.85rem;
          color: #888;
          font-family: 'Georgia', serif;
        }
        .gw-doormat:hover .gw-doormat-sub {
          color: #ccc;
        }

        /* FOOTER LINKS */
        .gw-flinks {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 14px;
        }
        .gw-flink {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          font-family: 'Georgia', serif;
          transition: color 0.3s ease;
        }
        .gw-flink:hover {
          color: rgba(255,255,255,0.85);
        }
        .gw-fdot {
          color: rgba(255,255,255,0.2);
          font-size: 0.8rem;
        }

        /* MOBILE */
        @media(max-width: 640px) {
          .gw-header { top: 3%; }
          .gw-doors { flex-direction: column; }
          .gw-door { flex: 1 !important; border-right: none !important; border-left: none !important; border-bottom: 1px solid rgba(255,255,255,0.1); }
          .gw-student:hover { box-shadow: inset 0 -20px 50px -20px rgba(138,43,226,0.8); }
          .gw-parent:hover { box-shadow: inset 0 20px 50px -20px rgba(255,215,0,0.6); }
          .gw-door-h { font-size: clamp(1.4rem, 6vw, 2rem); letter-spacing: 2px; }
          .gw-btn { padding: 12px 28px; font-size: 0.95rem; }
          .gw-doormat { padding: 12px 40px; }
          .gw-student:hover .gw-btn-purple { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
