"use client";

import { useState } from "react";
import Link from "next/link";
import SubscriberLock from '@/components/SubscriberLock';

interface GradeBook {
  grade: number;
  title: string;
  focus: string;
  theme: string;
  unlocked: boolean;
  level: string;
}

export default function LibraryHome() {
  const [books] = useState<GradeBook[]>([
    { grade: 5, title: "The Explorer", focus: "Value of Things", theme: "playful", unlocked: true, level: "Foundation" },
    { grade: 6, title: "The Globalist", focus: "World Economies", theme: "explorer", unlocked: true, level: "Foundation" },
    { grade: 7, title: "The Digital Native", focus: "UPI & Banking", theme: "digital", unlocked: true, level: "Middle" },
    { grade: 8, title: "The Strategist", focus: "Math of Money", theme: "analytical", unlocked: true, level: "Middle" },
    { grade: 9, title: "The Market Expert", focus: "Stock Markets", theme: "market", unlocked: true, level: "Secondary" },
    { grade: 10, title: "The Auditor", focus: "GST & Tax Slabs", theme: "corporate", unlocked: false, level: "Secondary" },
    { grade: 11, title: "The Analyst", focus: "Asset Classes", theme: "analyst", unlocked: false, level: "Senior" },
    { grade: 12, title: "The Architect", focus: "FIRE & Systems", theme: "premium", unlocked: false, level: "Senior" },
  ]);

  return (
    <SubscriberLock title="Theory Library Access" featureName="Premium Story-based Learning">
      <div className="lib-root">
        {/* HERO */}
        <div className="lib-hero">
          <div>
            <p className="lib-eyebrow">📚 Theory Wing</p>
            <h1 className="gradient-text">The Money Library</h1>
            <p className="lib-sub">Master concepts through interactive stories before applying them in the Lab.</p>
          </div>
          <div className="lib-stats">
            <div className="l-stat premium-glass">
              <span className="ls-val">32</span>
              <span className="ls-lbl">Books Read</span>
            </div>
          </div>
        </div>

        {/* GRADE GRID */}
        <div className="books-grid">
          {books.map((book) => (
            <div key={book.grade} className={`book-wrapper ${book.unlocked ? 'unlocked' : 'locked'} theme-${book.theme}`}>
              <div className="book-container">
                <div className="book-3d">
                  <div className="book-front">
                    <span className="grade-label">Class {book.grade}</span>
                    <h3>{book.title}</h3>
                    <p className="book-focus">{book.focus}</p>
                  </div>
                  <div className="book-side"></div>
                </div>
              </div>

              <div className="book-info">
                <span className="level-badge">{book.level}</span>
                {book.unlocked ? (
                  <Link href={`/library/${book.grade}`} className="btn-primary">Open Book</Link>
                ) : (
                  <button className="btn-locked" disabled>Locked (Level 15 Req)</button>
                )}
              </div>
            </div>
          ))}
        </div>

        <style jsx>{`
          .lib-root {
            display: flex;
            flex-direction: column;
            gap: 3rem;
            padding-bottom: 4rem;
          }
          .lib-hero {
            text-align: center;
            display: flex;
            flex-direction: column;
            gap: 2rem;
            align-items: center;
          }
          .lib-eyebrow {
            font-size: 0.9rem;
            font-weight: 700;
            color: #64748b;
            margin-bottom: 0.5rem;
          }
          .lib-sub {
            font-size: 1.25rem;
            color: #64748b;
            margin-top: 0.5rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }
          .lib-stats {
            display: flex;
            gap: 1.5rem;
            margin-top: 1.5rem;
          }
          .l-stat {
            padding: 1rem 2rem;
            border-radius: 1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .ls-val {
            font-size: 2.5rem;
            font-weight: 900;
            color: var(--primary);
          }
          .ls-lbl {
            font-size: 0.8rem;
            font-weight: 600;
            color: #e2e8f0;
            text-transform: uppercase;
          }

          h1 { font-size: 3.5rem; font-weight: 900; }
          .subtitle { font-size: 1.25rem; color: #64748b; margin-top: 0.5rem; }

          .books-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 3rem;
            padding: 2rem;
          }

          .book-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
          }

          .book-container {
            perspective: 1000px;
            cursor: pointer;
          }

          .book-3d {
            width: 220px;
            height: 300px;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transform: rotateY(-20deg);
          }

          .book-wrapper:hover .book-3d {
            transform: rotateY(0deg) scale(1.05);
          }

          .book-front {
            position: absolute;
            width: 100%;
            height: 100%;
            background: white;
            border-radius: 4px 15px 15px 4px;
            padding: 2rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            box-shadow: 10px 10px 30px rgba(0,0,0,0.1);
            z-index: 2;
            backface-visibility: hidden;
            border-left: 12px solid rgba(0,0,0,0.1);
          }

          .book-side {
            position: absolute;
            width: 40px;
            height: 100%;
            background: #e2e8f0;
            left: -20px;
            top: 0;
            transform: rotateY(-90deg);
            box-shadow: inset 0 0 20px rgba(0,0,0,0.1);
          }

          .grade-label {
            font-weight: 900;
            font-size: 0.8rem;
            text-transform: uppercase;
            color: var(--primary);
            margin-bottom: 1rem;
          }

          h3 { font-size: 1.8rem; font-weight: 800; margin-bottom: 0.5rem; line-height: 1.2; }
          .book-focus { font-size: 0.9rem; color: #64748b; font-weight: 600; }

          /* Themes */
          .theme-playful .book-front {
            background: linear-gradient(135deg, #ffedd5, #fdba74);
            color: #9a3412;
          }
          .theme-explorer .book-front {
            background: linear-gradient(135deg, #f0fdf4, #86efac);
            color: #166534;
          }
          .theme-digital .book-front {
            background: linear-gradient(135deg, #f5f3ff, #a5b4fc);
            color: #3730a3;
          }
          .theme-analytical .book-front {
            background: linear-gradient(135deg, #e0f2fe, #7dd3fc);
            color: #0369a1;
          }
          .theme-market .book-front {
            background: linear-gradient(135deg, #fffbeb, #fbbf24);
            color: #92400e;
          }
          .theme-corporate .book-front {
            background: linear-gradient(135deg, #f1f5f9, #94a3b8);
            color: #1e293b;
          }
          .theme-analyst .book-front {
            background: linear-gradient(135deg, #f0fdfa, #5eead4);
            color: #115e59;
          }
          .theme-premium .book-front {
            background: linear-gradient(135deg, #1e1b4b, #312e81);
            color: white;
            border-left: 12px solid #fbbf24;
          }

          .level-badge {
            background: #f1f5f9;
            padding: 0.4rem 1rem;
            border-radius: 2rem;
            font-weight: 700;
            font-size: 0.75rem;
            color: #64748b;
            margin-bottom: 1rem;
            display: inline-block;
          }

          .locked { filter: grayscale(1) opacity(0.7); cursor: not-allowed; }
          .btn-locked { 
            background: #e2e8f0; 
            border: none; 
            padding: 0.75rem 1.5rem; 
            border-radius: 1rem; 
            color: #94a3b8; 
            font-weight: 700; 
          }

          .book-info { text-align: center; }
        `}</style>
      </div>
    </SubscriberLock>
  );
}
