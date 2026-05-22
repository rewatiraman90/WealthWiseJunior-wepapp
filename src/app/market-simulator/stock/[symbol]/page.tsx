"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

interface StockDetail {
  symbol: string; name: string; sector: string; description: string;
  currentPrice: number; previousClose: number; change: number; changePct: number;
  high52w: number; low52w: number; marketCapCr: number;
}
interface PricePoint { date: string; price: number; }

const fmt = (n: number) => `₹${Math.abs(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const fmtCr = (cr: number) => cr >= 100000 ? `₹${(cr / 100000).toFixed(1)}L Cr` : `₹${(cr / 1000).toFixed(0)}K Cr`;

export default function StockDetailPage() {
  const params  = useParams();
  const symbol  = (params?.symbol as string)?.toUpperCase();

  const [stock,     setStock]     = useState<StockDetail | null>(null);
  const [history,   setHistory]   = useState<PricePoint[]>([]);
  const [holding,   setHolding]   = useState<{ quantity: number; avgBuyPrice: number; pnl: number; pnlPct: number } | null>(null);
  const [cash,      setCash]      = useState(0);
  const [qty,       setQty]       = useState(1);
  const [loading,   setLoading]   = useState(true);
  const [trading,   setTrading]   = useState<"buy" | "sell" | null>(null);
  const [toast,     setToast]     = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok: boolean) => { setToast({ msg, ok }); setTimeout(() => setToast(null), 3500); };

  useEffect(() => {
    if (!symbol) return;
    async function load() {
      const { data: { session } } = await supabase.auth.getSession();
      const headers: Record<string, string> = {};
      if (session?.access_token) headers.Authorization = `Bearer ${session.access_token}`;

      // Stocks list (contains this stock + price history)
      const [stocksRes, portfolioRes] = await Promise.all([
        fetch("/api/market/stocks"),
        session ? fetch("/api/market/portfolio", { headers }) : Promise.resolve(null),
      ]);

      const stocksData = await stocksRes.json();
      const found = (stocksData.stocks || []).find((s: StockDetail) => s.symbol === symbol);
      if (found) setStock(found);

      // Compute 30-day history client-side (same deterministic algo)
      if (found) {
        const hist: PricePoint[] = [];
        for (let i = 29; i >= 0; i--) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          const ds = d.toISOString().split("T")[0];
          // Simple deterministic drift matching server algo
          const seed = Math.abs(hashCode(symbol + ds));
          const drift = ((seed % 401) - 200) / 10000;
          hist.push({ date: ds, price: Math.round(found.currentPrice / (1 + ((hashCode(symbol + new Date().toISOString().split("T")[0]) % 401) - 200) / 10000) * (1 + drift) * 100) / 100 });
        }
        setHistory(hist);
      }

      if (portfolioRes) {
        const pd = await portfolioRes.json();
        if (!pd.error) {
          setCash(pd.cash);
          const h = (pd.holdings || []).find((h: any) => h.symbol === symbol);
          if (h) setHolding(h);
        }
      }
      setLoading(false);
    }
    load();
  }, [symbol]);

  const executeTrade = async (action: "buy" | "sell") => {
    setTrading(action);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { showToast("Please sign in", false); setTrading(null); return; }
    const res = await fetch("/api/market/trade", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
      body: JSON.stringify({ symbol, action, quantity: qty }),
    });
    const data = await res.json();
    setTrading(null);
    if (data.error) { showToast(data.error, false); return; }
    showToast(`${action === "buy" ? "Bought" : "Sold"} ${qty} × ${symbol} @ ${fmt(data.price)}`, true);
    // Refresh
    const { data: { session: s2 } } = await supabase.auth.getSession();
    if (!s2) return;
    const pd = await (await fetch("/api/market/portfolio", { headers: { Authorization: `Bearer ${s2.access_token}` } })).json();
    if (!pd.error) {
      setCash(pd.cash);
      const h = (pd.holdings || []).find((h: any) => h.symbol === symbol);
      setHolding(h || null);
    }
  };

  if (loading) return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "50vh", color: "var(--muted)" }}>Loading…</div>;
  if (!stock)  return <div style={{ padding: "3rem", color: "var(--muted)" }}>Stock not found. <Link href="/market-simulator" style={{ color: "var(--primary)" }}>← Back</Link></div>;

  const totalBuyCost  = Math.round(stock.currentPrice * qty * 100) / 100;
  const canBuy        = cash >= totalBuyCost;
  const canSell       = !!holding && holding.quantity >= qty;

  // Chart: min/max for scaling
  const prices     = history.map((h) => h.price);
  const minP       = Math.min(...prices);
  const maxP       = Math.max(...prices);
  const chartH     = 80;
  const chartW     = 100;
  const points     = history.map((h, i) => {
    const x = (i / (history.length - 1)) * chartW;
    const y = chartH - ((h.price - minP) / (maxP - minP + 0.01)) * chartH;
    return `${x},${y}`;
  }).join(" ");
  const isUp = stock.changePct >= 0;

  return (
    <div className="sd-wrap">
      {toast && <div className={`ms-toast ${toast.ok ? "ok" : "err"}`}>{toast.msg}</div>}

      <Link href="/market-simulator" className="back-link">← Back to Market</Link>

      <div className="sd-layout">
        {/* LEFT */}
        <div className="sd-left">
          {/* Header */}
          <div className="sd-header premium-glass">
            <div className="sdh-top">
              <div>
                <h1 className="sdh-symbol gradient-text">{stock.symbol}</h1>
                <p className="sdh-name">{stock.name}</p>
                <span className="sdh-sector">{stock.sector}</span>
              </div>
              <div className="sdh-price-block">
                <span className="sdh-price">{fmt(stock.currentPrice)}</span>
                <span className={`sdh-change ${isUp ? "pos" : "neg"}`}>
                  {isUp ? "▲" : "▼"} {fmt(Math.abs(stock.change))} ({isUp ? "+" : ""}{stock.changePct.toFixed(2)}%)
                </span>
                <span className="sdh-close">Prev close: {fmt(stock.previousClose)}</span>
              </div>
            </div>
            <p className="sdh-desc">{stock.description}</p>
          </div>

          {/* 30-day price chart */}
          <div className="sd-chart premium-glass">
            <h3 className="sd-section-title">30-Day Price Chart</h3>
            <svg viewBox={`0 0 ${chartW} ${chartH}`} preserveAspectRatio="none" className="sd-svg">
              <polyline points={points} fill="none" stroke={isUp ? "#00E5A0" : "#FF4466"} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <line x1="0" y1={chartH} x2={chartW} y2={chartH} stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
            </svg>
            <div className="sd-chart-meta">
              <span>{history[0]?.date}</span>
              <span>Low: {fmt(minP)}</span>
              <span>High: {fmt(maxP)}</span>
              <span>{history[history.length - 1]?.date}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="sd-stats premium-glass">
            <h3 className="sd-section-title">Key Stats</h3>
            <div className="sd-stats-grid">
              {[
                { label: "52W High",    value: fmt(stock.high52w) },
                { label: "52W Low",     value: fmt(stock.low52w) },
                { label: "Market Cap",  value: fmtCr(stock.marketCapCr) },
                { label: "Sector",      value: stock.sector },
              ].map((s) => (
                <div key={s.label} className="sd-stat-item">
                  <span className="sd-stat-lbl">{s.label}</span>
                  <span className="sd-stat-val">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — Trade panel */}
        <div className="sd-right">
          <div className="sd-trade-panel premium-glass">
            <h3 className="sd-section-title">Execute Trade</h3>

            {holding && (
              <div className="sd-my-holding">
                <p className="sdmh-title">Your Position</p>
                <div className="sdmh-row"><span>Shares owned</span><span>{holding.quantity}</span></div>
                <div className="sdmh-row"><span>Avg buy price</span><span>{fmt(holding.avgBuyPrice)}</span></div>
                <div className="sdmh-row">
                  <span>Unrealised P&L</span>
                  <span className={holding.pnl >= 0 ? "pos" : "neg"}>
                    {holding.pnl >= 0 ? "+" : ""}{fmt(holding.pnl)} ({holding.pnlPct >= 0 ? "+" : ""}{(holding.pnlPct as number).toFixed(2)}%)
                  </span>
                </div>
              </div>
            )}

            <div className="sd-cash-line">
              <span>Available Cash</span><span className="sd-cash-val">{fmt(cash)}</span>
            </div>

            <div className="sd-qty-section">
              <label className="sd-qty-label">Quantity</label>
              <div className="sd-qty-ctrl">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                <input type="number" min={1} value={qty} onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))} />
                <button onClick={() => setQty((q) => q + 1)}>+</button>
              </div>
              <div className="sd-order-summary">
                <span>Order value</span>
                <span className="sd-order-val">{fmt(totalBuyCost)}</span>
              </div>
            </div>

            <div className="sd-trade-btns">
              <button className="sd-buy-btn" disabled={!canBuy || !!trading} onClick={() => executeTrade("buy")}>
                {trading === "buy" ? "Executing…" : `Buy ${qty} share${qty > 1 ? "s" : ""}`}
              </button>
              {canSell && (
                <button className="sd-sell-btn" disabled={!!trading} onClick={() => executeTrade("sell")}>
                  {trading === "sell" ? "Executing…" : `Sell ${qty} share${qty > 1 ? "s" : ""}`}
                </button>
              )}
            </div>
            {!canBuy && <p className="sd-warn">Insufficient cash for this order.</p>}
          </div>

          <div className="sd-edu-card premium-glass">
            <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--muted)", marginBottom: "0.75rem" }}>💡 Did You Know?</h4>
            <p style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.6 }}>
              <strong style={{ color: "var(--foreground)" }}>P&L = (CMP − Avg Cost) × Qty.</strong> A positive P&L means your investment has grown. A negative P&L is unrealised — it only becomes a real loss if you sell. Long-term investors stay calm through short-term swings.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ms-toast{position:fixed;top:1.5rem;right:1.5rem;z-index:9999;padding:0.85rem 1.5rem;border-radius:1rem;font-weight:700;font-size:0.9rem}
        .ms-toast.ok{background:rgba(0,229,160,.15);border:1px solid var(--neon-green);color:var(--neon-green)}
        .ms-toast.err{background:rgba(255,68,102,.15);border:1px solid var(--danger);color:var(--danger)}
        .sd-wrap{display:flex;flex-direction:column;gap:1.5rem;padding-bottom:3rem}
        .sd-layout{display:grid;grid-template-columns:1fr 340px;gap:1.5rem;align-items:start}
        @media(max-width:900px){.sd-layout{grid-template-columns:1fr}}
        .sd-left{display:flex;flex-direction:column;gap:1rem}
        .sd-right{display:flex;flex-direction:column;gap:1rem;position:sticky;top:1rem}
        .sd-header{padding:1.5rem;border-radius:1.5rem}
        .sdh-top{display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;margin-bottom:1rem;flex-wrap:wrap}
        .sdh-symbol{font-size:2rem;margin-bottom:0.2rem}
        .sdh-name{color:var(--muted);font-size:0.9rem}
        .sdh-sector{display:inline-block;font-size:0.72rem;font-weight:700;background:rgba(108,99,255,.15);color:var(--primary);padding:.2rem .6rem;border-radius:1rem;margin-top:.4rem}
        .sdh-price-block{text-align:right}
        .sdh-price{display:block;font-size:1.8rem;font-weight:900;color:var(--foreground)}
        .sdh-change{display:block;font-size:1rem;font-weight:700}
        .sdh-close{display:block;font-size:0.78rem;color:var(--muted);margin-top:.2rem}
        .sdh-desc{font-size:0.85rem;color:var(--muted);line-height:1.6}
        .sd-chart{padding:1.25rem;border-radius:1.25rem}
        .sd-svg{width:100%;height:100px;display:block;margin:0.75rem 0}
        .sd-chart-meta{display:flex;justify-content:space-between;font-size:0.7rem;color:var(--muted)}
        .sd-stats{padding:1.25rem;border-radius:1.25rem}
        .sd-stats-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;margin-top:0.75rem}
        .sd-stat-item{display:flex;flex-direction:column;gap:0.2rem;padding-bottom:.75rem;border-bottom:1px solid rgba(255,255,255,.06)}
        .sd-stat-lbl{font-size:0.7rem;font-weight:700;text-transform:uppercase;color:var(--muted);letter-spacing:.05em}
        .sd-stat-val{font-size:1rem;font-weight:700;color:var(--foreground)}
        .sd-section-title{font-size:0.85rem;font-weight:700;text-transform:uppercase;color:var(--muted);letter-spacing:.05em}
        .sd-trade-panel{padding:1.5rem;border-radius:1.5rem;display:flex;flex-direction:column;gap:1rem}
        .sd-my-holding{background:rgba(0,229,160,.05);border:1px solid rgba(0,229,160,.2);border-radius:1rem;padding:1rem}
        .sdmh-title{font-size:0.75rem;font-weight:700;text-transform:uppercase;color:var(--neon-green);letter-spacing:.05em;margin-bottom:.5rem}
        .sdmh-row{display:flex;justify-content:space-between;font-size:0.85rem;padding:.25rem 0;border-bottom:1px solid rgba(255,255,255,.04)}
        .sd-cash-line{display:flex;justify-content:space-between;align-items:center;padding:.5rem 0;border-bottom:1px solid rgba(255,255,255,.07)}
        .sd-cash-val{font-weight:900;color:var(--foreground)}
        .sd-qty-section{display:flex;flex-direction:column;gap:.5rem}
        .sd-qty-label{font-size:.78rem;font-weight:700;color:var(--muted);text-transform:uppercase}
        .sd-qty-ctrl{display:flex;align-items:center;gap:.75rem}
        .sd-qty-ctrl button{width:2rem;height:2rem;border-radius:.5rem;border:1px solid var(--border);background:rgba(255,255,255,.06);color:var(--foreground);font-size:1.1rem;cursor:pointer;font-family:inherit}
        .sd-qty-ctrl input{flex:1;padding:.5rem .75rem;background:rgba(255,255,255,.06);border:1px solid var(--border);border-radius:.75rem;color:var(--foreground);font-size:1rem;font-weight:700;text-align:center;width:4rem;font-family:inherit}
        .sd-order-summary{display:flex;justify-content:space-between;font-size:.85rem}
        .sd-order-val{font-weight:900;color:var(--foreground)}
        .sd-trade-btns{display:flex;flex-direction:column;gap:.6rem}
        .sd-buy-btn{padding:.85rem;background:var(--primary);border:none;border-radius:1rem;color:white;font-size:.95rem;font-weight:700;cursor:pointer;transition:opacity .2s;font-family:inherit}
        .sd-buy-btn:hover{opacity:.85}
        .sd-buy-btn:disabled{opacity:.35;cursor:not-allowed}
        .sd-sell-btn{padding:.85rem;background:rgba(255,68,102,.12);border:1px solid rgba(255,68,102,.4);border-radius:1rem;color:var(--danger);font-size:.95rem;font-weight:700;cursor:pointer;transition:all .2s;font-family:inherit}
        .sd-sell-btn:hover{background:rgba(255,68,102,.22)}
        .sd-sell-btn:disabled{opacity:.35;cursor:not-allowed}
        .sd-warn{font-size:.78rem;color:var(--danger);text-align:center}
        .sd-edu-card{padding:1.25rem;border-radius:1.25rem}
        .pos{color:var(--neon-green)}.neg{color:var(--danger)}
      `}</style>
    </div>
  );
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = Math.imul(31, hash) + str.charCodeAt(i) | 0;
  }
  return Math.abs(hash);
}
