"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function CampusLoginFloat() {
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    setHasProfile(!!localStorage.getItem("wwj_profile"));
  }, []);

  return (
    <>
      <Link href={hasProfile ? "/campus" : "/onboarding"} className="clf-btn">
        <span className="clf-icon">🏫</span>
        <span className="clf-text">{hasProfile ? "My Campus" : "Campus Login"}</span>
      </Link>
      <style jsx>{`
        .clf-btn {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #6C63FF, #4f46e5);
          color: white;
          text-decoration: none;
          padding: 0.75rem 1.4rem;
          border-radius: 3rem;
          font-weight: 800;
          font-size: 0.9rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
          box-shadow: 0 8px 32px rgba(108, 99, 255, 0.45), 0 2px 8px rgba(0,0,0,0.2);
          transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          border: 1px solid rgba(255,255,255,0.15);
          white-space: nowrap;
        }
        .clf-btn:hover {
          transform: translateY(-4px) scale(1.04);
          box-shadow: 0 16px 48px rgba(108, 99, 255, 0.55), 0 4px 16px rgba(0,0,0,0.25);
          background: linear-gradient(135deg, #7c74ff, #6C63FF);
        }
        .clf-icon {
          font-size: 1.1rem;
          line-height: 1;
        }
        .clf-text {
          letter-spacing: -0.01em;
        }
        @media (max-width: 480px) {
          .clf-btn {
            bottom: 1.25rem;
            right: 1.25rem;
            padding: 0.65rem 1.1rem;
            font-size: 0.82rem;
          }
        }
      `}</style>
    </>
  );
}
