"use client";
export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer-wrap">
      <div className="footer-glow" />
      <div className="footer-content">
        <div className="footer-brand">
          <div className="logo">
            <span className="gradient-text" style={{ fontWeight: 900, fontSize: "1.3rem", letterSpacing: "-0.03em" }}>WealthWise</span>
            <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--neon-green)", fontFamily: "'Space Mono', monospace" }}>Jr.</span>
          </div>
          <p className="footer-desc">
            Empowering the next generation of India with real-world financial literacy. Play, learn, and grow wealth.
          </p>
          <div className="footer-badge">🇮🇳 Made for Indian students</div>
        </div>
        
        <div className="footer-links">
          <h4>Legal</h4>
          <ul>
            <li><a href="/terms">Terms &amp; Conditions</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/refund">Refund Policy</a></li>
          </ul>
        </div>
        
        <div className="footer-links">
          <h4>Support</h4>
          <ul>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="mailto:support@wealthwisejunior.in">support@wealthwisejunior.in</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© {currentYear} WealthWise Junior. All rights reserved. | Payments secured by <span style={{ color: "var(--primary-glow)" }}>Razorpay</span></p>
      </div>

      <style jsx>{`
        .footer-wrap {
          position: relative;
          background: rgba(10, 10, 30, 0.95);
          border-top: 1px solid rgba(108,99,255,0.25);
          padding: 4rem 2rem 2rem;
          color: white;
          font-family: 'Space Grotesk', sans-serif;
          overflow: hidden;
          backdrop-filter: blur(20px);
        }
        .footer-glow {
          position: absolute;
          top: -80px;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 200px;
          background: radial-gradient(ellipse, rgba(108,99,255,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .footer-content {
          position: relative;
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }
        .logo {
          display: flex;
          align-items: baseline;
          gap: 0.3rem;
          margin-bottom: 1rem;
        }
        .footer-desc {
          color: var(--muted);
          line-height: 1.7;
          font-size: 0.88rem;
          max-width: 280px;
          margin-bottom: 1.25rem;
        }
        .footer-badge {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--neon-green);
          background: rgba(0,229,160,0.08);
          border: 1px solid rgba(0,229,160,0.2);
          border-radius: 2rem;
          padding: 0.3rem 0.9rem;
          letter-spacing: 0.04em;
        }
        .footer-links h4 {
          font-size: 0.78rem;
          font-weight: 900;
          margin-bottom: 1.25rem;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .footer-links ul {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .footer-links a {
          color: var(--muted);
          text-decoration: none;
          font-size: 0.88rem;
          font-weight: 500;
          transition: color 0.2s;
        }
        .footer-links a:hover {
          color: var(--primary-glow);
        }
        .footer-bottom {
          position: relative;
          max-width: 1100px;
          margin: 0 auto;
          padding-top: 1.75rem;
          border-top: 1px solid rgba(255,255,255,0.06);
          text-align: center;
          color: var(--muted);
          font-size: 0.78rem;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 2rem;
          }
          .logo {
            justify-content: center;
          }
          .footer-desc {
            margin: 0 auto 1.25rem auto;
          }
        }
      `}</style>
    </footer>
  );
}
