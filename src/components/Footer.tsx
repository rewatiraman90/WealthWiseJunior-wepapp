"use client";
export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer-wrap">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="logo">
            <span className="gradient-text" style={{ fontWeight: 900, fontSize: "1.2rem", letterSpacing: "-0.03em" }}>WealthWise</span>
            <span className="logo-jr" style={{ fontWeight: 700, fontSize: "0.8rem", color: "var(--neon-green)", fontFamily: "'Space Mono', monospace" }}>Jr.</span>
          </div>
          <p className="footer-desc">
            Empowering the next generation of India with real-world financial literacy. Play, learn, and grow wealth.
          </p>
        </div>
        
        <div className="footer-links">
          <h4>Legal</h4>
          <ul>
            <li><a href="/terms">Terms & Conditions</a></li>
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
        <p>© {currentYear} WealthWise Junior. All rights reserved.</p>
      </div>

      <style jsx>{`
        .footer-wrap {
          background: #050816;
          border-top: 1px solid rgba(108,99,255,0.2);
          padding: 4rem 2rem 2rem;
          color: white;
          font-family: 'Space Grotesk', sans-serif;
        }
        .footer-content {
          max-width: 1200px;
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
          line-height: 1.6;
          font-size: 0.9rem;
          max-width: 300px;
        }
        .footer-links h4 {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
          color: white;
        }
        .footer-links ul {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        .footer-links a {
          color: var(--muted);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s;
        }
        .footer-links a:hover {
          color: var(--neon-green);
        }
        .footer-bottom {
          max-width: 1200px;
          margin: 0 auto;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          text-align: center;
          color: var(--muted);
          font-size: 0.8rem;
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
            margin: 0 auto;
          }
        }
      `}</style>
    </footer>
  );
}
