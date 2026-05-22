"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useProfile } from "@/hooks/useProfile";

interface Stock {
  symbol: string; name: string; sector: string;
  currentPrice: number; change: number; changePct: number;
  marketCapCr: number; description: string;
}
interface Holding {
  symbol: string; name: string; quantity: number;
  avgBuyPrice: number; currentPrice: number;
  currentValue: number; pnl: number; pnlPct: number;
}
interface Trade {
  id: string; symbol: string; stock_name: string; action: string;
  quantity: number; price: number; total_amount: number; created_at: string;
}
interface Portfolio {
  cash: number; holdingsValue: number; totalPortfolio: number;
  totalPnl: number; totalPnlPct: number; startingCash: number;
  holdings: Holding[]; recentTrades: Trade[];
}
interface LeaderEntry {
  rank: number; name: string; grade: string; totalValue: number; returnPct: number; userId: string;
}

const fmt = (n: number) => `₹${Math.abs(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const fmtCr = (cr: number) => cr >= 100000 ? `₹${(cr / 100000).toFixed(1)}L Cr` : `₹${(cr / 1000).toFixed(0)}K Cr`;

export default function MarketSimulator() {
  const { profile } = useProfile();
  const [stocks, setStocks]         = useState<Stock[]>([]);
  const [portfolio, setPortfolio]   = useState<Portfolio | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderEntry[]>([]);
  const [loading, setLoading]       = useState(true);
  const [tradeLoading, setTradeLoading] = useState<string | null>(null);
  const [tradeQty, setTradeQty]     = useState<Record<string, number>>({});
  const [toast, setToast]           = useState<{ msg: string; ok: boolean } | null>(null);
  const [activeTab, setActiveTab]   = useState<"market" | "portfolio" | "trades" | "leaderboard">("market");
  const [sectorFilter, setSectorFilter] = useState("All");

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const loadData = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    const [stocksRes, portfolioRes, lbRes] = await Promise.all([
      fetch("/api/market/stocks"),
      token ? fetch("/api/market/portfolio", { headers: { Authorization: `Bearer ${token}` } }) : Promise.resolve(null),
      fetch("/api/market/leaderboard"),
    ]);

    const stocksData = await stocksRes.json();
    setStocks(stocksData.stocks || []);

    if (portfolioRes) {
      const pd = await portfolioRes.json();
      if (!pd.error) setPortfolio(pd);
    }

    const lbData = await lbRes.json();
    setLeaderboard(lbData.leaderboard || []);
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const executeTrade = async (symbol: string, action: "buy" | "sell") => {
    const qty = tradeQty[symbol] || 1;
    setTradeLoading(symbol + action);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { showToast("Please sign in to trade", false); setTradeLoading(null); return; }

    const res = await fetch("/api/market/trade", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
      body: JSON.stringify({ symbol, action, quantity: qty }),
    });
    const data = await res.json();
    setTradeLoading(null);

    if (data.error) { showToast(data.error, false); return; }
    showToast(`${action === "buy" ? "Bought" : "Sold"} ${qty} × ${symbol} @ ${fmt(data.price)}`, true);
    loadData();
  };

  const grade = parseInt(profile?.grade ?? "5", 10);
  const isSubscriber = profile?.isSubscriber ?? false;
  const isAdmin = profile?.isAdmin ?? false;

  if (!isAdmin && (!isSubscriber || grade < 9)) {
    return (
      <div className="ms-wrap">
        <div className="ms-locked premium-glass">
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📈</div>
          <h1 className="gradient-text">Market Simulator</h1>
          <p style={{ color: "var(--muted)", marginBottom: "1.5rem", maxWidth: 420, textAlign: "center" }}>
            {!isSubscriber
              ? "The Market Simulator is available for Premium subscribers in Class 9 and above."
              : "The Market Simulator is unlocked from Class 9. You're building up to it!"}
          </p>
          {!isSubscriber && (
            <Link href="/onboarding?upgrade=true" className="btn-primary">Upgrade to Premium →</Link>
          )}
        </div>
        <style jsx>{`.ms-wrap{display:flex;align-items:center;justify-content:center;min-height:60vh}.ms-locked{display:flex;flex-direction:column;align-items:center;padding:3rem;border-radius:2rem;text-align:center}`}</style>
      </div>
    );
  }

  if (loading) return <div className="ms-loading"><p>Loading market data…</p></div>;

  const sectors = ["All", ...Array.from(new Set(stocks.map((s) => s.sector)))];
  const filteredStocks = sectorFilter === "All" ? stocks : stocks.filter((s) => s.sector === sectorFilter);

  return (
    <div className="ms-wrap">
      {/* Toast */}
      {toast && (
        <div className={`ms-toast ${toast.ok ? "ok" : "err"}`}>{toast.msg}</div>
      )}

      {/* Hero */}
      <div className="ms-hero">
        <div>
          <p className="ms-eyebrow">📈 NSE Virtual Exchange</p>
          <h1 className="gradient-text ms-h1">Market Simulator</h1>
          <p className="ms-sub">Practice trading with 20 blue-chip NSE stocks. Start with virtual ₹1,00,000.</p>
        </div>
        {portfolio && (
          <div className="ms-portfolio-card premium-glass">
            <div className="mpc-row">
              <span className="mpc-label">Portfolio Value</span>
              <span className="mpc-val gradient-text">{fmt(portfolio.totalPortfolio)}</span>
            </div>
            <div className="mpc-row">
              <span className="mpc-label">Total Return</span>
              <span className={`mpc-val ${portfolio.totalPnl >= 0 ? "pos" : "neg"}`}>
                {portfolio.totalPnl >= 0 ? "+" : ""}{fmt(portfolio.totalPnl)} ({portfolio.totalPnlPct >= 0 ? "+" : ""}{portfolio.totalPnlPct.toFixed(2)}%)
              </span>
            </div>
            <div className="mpc-divider" />
            <div className="mpc-row">
              <span className="mpc-label">💰 Cash Available</span>
              <span className="mpc-cash">{fmt(portfolio.cash)}</span>
            </div>
            <div className="mpc-row">
              <span className="mpc-label">📊 Invested</span>
              <span className="mpc-cash">{fmt(portfolio.holdingsValue)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="ms-tabs">
        {(["market", "portfolio", "trades", "leaderboard"] as const).map((t) => (
          <button key={t} className={`ms-tab ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>
            {t === "market" ? "🏪 Market" : t === "portfolio" ? "💼 My Portfolio" : t === "trades" ? "📋 Trade History" : "🏆 Leaderboard"}
          </button>
        ))}
      </div>

      {/* ── MARKET TAB ── */}
      {activeTab === "market" && (
        <div>
          {/* Sector filter */}
          <div className="ms-filters">
            {sectors.map((s) => (
              <button key={s} className={`ms-chip ${sectorFilter === s ? "active" : ""}`} onClick={() => setSectorFilter(s)}>{s}</button>
            ))}
          </div>
          <div className="ms-stocks-grid">
            {filteredStocks.map((stock) => {
              const myHolding = portfolio?.holdings.find((h) => h.symbol === stock.symbol);
              const qty = tradeQty[stock.symbol] || 1;
              const buyTotal = Math.round(stock.currentPrice * qty * 100) / 100;
              const canBuy = portfolio ? portfolio.cash >= buyTotal : false;
              return (
                <div key={stock.symbol} className="ms-stock-card premium-glass">
                  <div className="msc-top">
                    <div>
                      <Link href={`/market-simulator/stock/${stock.symbol}`} className="msc-symbol">{stock.symbol}</Link>
                      <p className="msc-name">{stock.name}</p>
                      <span className="msc-sector-tag">{stock.sector}</span>
                    </div>
                    <div className="msc-price-block">
                      <span className="msc-price">{fmt(stock.currentPrice)}</span>
                      <span className={`msc-change ${stock.changePct >= 0 ? "pos" : "neg"}`}>
                        {stock.changePct >= 0 ? "▲" : "▼"} {Math.abs(stock.changePct).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  {myHolding && (
                    <div className="msc-holding-badge">
                      Holding: {myHolding.quantity} shares · {myHolding.pnl >= 0 ? "+" : ""}{fmt(myHolding.pnl)} ({myHolding.pnlPct >= 0 ? "+" : ""}{myHolding.pnlPct.toFixed(1)}%)
                    </div>
                  )}
                  <div className="msc-trade-row">
                    <div className="msc-qty-wrap">
                      <button className="msc-qty-btn" onClick={() => setTradeQty((p) => ({ ...p, [stock.symbol]: Math.max(1, (p[stock.symbol] || 1) - 1) }))}>−</button>
                      <span className="msc-qty-val">{qty}</span>
                      <button className="msc-qty-btn" onClick={() => setTradeQty((p) => ({ ...p, [stock.symbol]: (p[stock.symbol] || 1) + 1 }))}>+</button>
                    </div>
                    <span className="msc-total">= {fmt(buyTotal)}</span>
                    <button
                      className="btn-primary msc-buy-btn"
                      disabled={!canBuy || tradeLoading === stock.symbol + "buy"}
                      onClick={() => executeTrade(stock.symbol, "buy")}
                    >
                      {tradeLoading === stock.symbol + "buy" ? "…" : "Buy"}
                    </button>
                    {myHolding && myHolding.quantity >= qty && (
                      <button
                        className="msc-sell-btn"
                        disabled={tradeLoading === stock.symbol + "sell"}
                        onClick={() => executeTrade(stock.symbol, "sell")}
                      >
                        {tradeLoading === stock.symbol + "sell" ? "…" : "Sell"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── PORTFOLIO TAB ── */}
      {activeTab === "portfolio" && (
        <div>
          {!portfolio?.holdings.length ? (
            <div className="ms-empty premium-glass">
              <p style={{ fontSize: "3rem" }}>📊</p>
              <p style={{ color: "var(--muted)" }}>You don't own any stocks yet. Go to the Market tab to buy your first share!</p>
            </div>
          ) : (
            <div className="ms-holdings-list">
              {portfolio.holdings.map((h) => (
                <div key={h.symbol} className="msh-row premium-glass">
                  <div className="msh-info">
                    <Link href={`/market-simulator/stock/${h.symbol}`} className="msh-symbol">{h.symbol}</Link>
                    <span className="msh-name">{h.name}</span>
                  </div>
                  <div className="msh-nums">
                    <div className="msh-stat"><span className="msh-lbl">Qty</span><span>{h.quantity}</span></div>
                    <div className="msh-stat"><span className="msh-lbl">Avg Cost</span><span>{fmt(h.avgBuyPrice)}</span></div>
                    <div className="msh-stat"><span className="msh-lbl">CMP</span><span>{fmt(h.currentPrice)}</span></div>
                    <div className="msh-stat"><span className="msh-lbl">Value</span><span>{fmt(h.currentValue)}</span></div>
                    <div className="msh-stat">
                      <span className="msh-lbl">P&L</span>
                      <span className={h.pnl >= 0 ? "pos" : "neg"}>
                        {h.pnl >= 0 ? "+" : ""}{fmt(h.pnl)}<br />
                        <small>({h.pnlPct >= 0 ? "+" : ""}{h.pnlPct.toFixed(1)}%)</small>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── TRADES TAB ── */}
      {activeTab === "trades" && (
        <div>
          {!portfolio?.recentTrades.length ? (
            <div className="ms-empty premium-glass">
              <p style={{ fontSize: "3rem" }}>📋</p>
              <p style={{ color: "var(--muted)" }}>No trades yet. Execute your first buy from the Market tab.</p>
            </div>
          ) : (
            <div className="ms-trades-table premium-glass">
              <div className="mst-header">
                <span>Stock</span><span>Action</span><span>Qty</span><span>Price</span><span>Total</span><span>Date</span>
              </div>
              {portfolio.recentTrades.map((t) => (
                <div key={t.id} className="mst-row">
                  <span className="mst-symbol">{t.symbol}</span>
                  <span className={`mst-action ${t.action}`}>{t.action.toUpperCase()}</span>
                  <span>{t.quantity}</span>
                  <span>{fmt(t.price)}</span>
                  <span>{fmt(t.total_amount)}</span>
                  <span className="mst-date">{new Date(t.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── LEADERBOARD TAB ── */}
      {activeTab === "leaderboard" && (
        <div className="ms-lb premium-glass">
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--muted)", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>🏆 Top Portfolios</h2>
          {leaderboard.length === 0 ? (
            <p style={{ color: "var(--muted)" }}>No traders yet. Be the first!</p>
          ) : leaderboard.map((e) => (
            <div key={e.userId} className={`ms-lb-row ${e.userId === profile?.id ? "lb-me" : ""}`}>
              <span className={`lb-rank ${e.rank <= 3 ? "top" : ""}`}>#{e.rank}</span>
              <div className="lb-info">
                <span className="lb-name">{e.userId === profile?.id ? "You ✨" : e.name}</span>
                <span className="lb-sub">Class {e.grade}</span>
              </div>
              <div className="lb-right">
                <span className="lb-val">{fmt(e.totalValue)}</span>
                <span className={e.returnPct >= 0 ? "pos" : "neg"}>{e.returnPct >= 0 ? "+" : ""}{e.returnPct.toFixed(2)}%</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .ms-wrap { display: flex; flex-direction: column; gap: 1.5rem; padding-bottom: 3rem; }
        .ms-loading { display: flex; align-items: center; justify-content: center; min-height: 50vh; color: var(--muted); }

        .ms-toast { position: fixed; top: 1.5rem; right: 1.5rem; z-index: 9999; padding: 0.85rem 1.5rem; border-radius: 1rem; font-weight: 700; font-size: 0.9rem; animation: fadeIn 0.2s; }
        .ms-toast.ok  { background: rgba(0,229,160,0.15); border: 1px solid var(--neon-green); color: var(--neon-green); }
        .ms-toast.err { background: rgba(255,68,102,0.15); border: 1px solid var(--danger); color: var(--danger); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }

        .ms-hero { display: flex; justify-content: space-between; align-items: flex-start; gap: 2rem; flex-wrap: wrap; }
        .ms-eyebrow { font-size: 0.85rem; font-weight: 700; color: var(--muted); margin-bottom: 0.4rem; }
        .ms-h1 { font-size: clamp(1.8rem, 4vw, 2.5rem); margin-bottom: 0.4rem; }
        .ms-sub { font-size: 0.9rem; color: var(--muted); }

        .ms-portfolio-card { padding: 1.25rem 1.5rem; border-radius: 1.5rem; min-width: 280px; display: flex; flex-direction: column; gap: 0.5rem; }
        .mpc-row { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; }
        .mpc-label { font-size: 0.75rem; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; }
        .mpc-val { font-size: 1.2rem; font-weight: 900; }
        .mpc-cash { font-size: 1rem; font-weight: 700; color: var(--foreground); }
        .mpc-divider { height: 1px; background: rgba(255,255,255,0.07); margin: 0.25rem 0; }
        .pos { color: var(--neon-green); }
        .neg { color: var(--danger); }

        .ms-tabs { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .ms-tab { padding: 0.6rem 1.2rem; border-radius: 2rem; border: 1px solid var(--border); background: transparent; color: var(--muted); cursor: pointer; font-size: 0.85rem; font-weight: 700; transition: all 0.2s; font-family: inherit; }
        .ms-tab.active { background: var(--primary); border-color: var(--primary); color: white; }

        .ms-filters { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem; }
        .ms-chip { padding: 0.4rem 0.9rem; border-radius: 2rem; border: 1px solid var(--border); background: transparent; color: var(--muted); cursor: pointer; font-size: 0.78rem; font-weight: 700; transition: all 0.2s; font-family: inherit; }
        .ms-chip.active { background: rgba(108,99,255,0.2); border-color: var(--primary); color: var(--foreground); }

        .ms-stocks-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1rem; }
        .ms-stock-card { padding: 1.25rem; border-radius: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem; }
        .msc-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; }
        .msc-symbol { font-size: 1rem; font-weight: 900; color: var(--primary); text-decoration: none; }
        .msc-symbol:hover { color: var(--neon-green); }
        .msc-name { font-size: 0.8rem; color: var(--muted); margin-top: 0.2rem; }
        .msc-sector-tag { display: inline-block; font-size: 0.68rem; font-weight: 700; background: rgba(108,99,255,0.15); color: var(--primary); padding: 0.2rem 0.6rem; border-radius: 1rem; margin-top: 0.35rem; }
        .msc-price-block { text-align: right; }
        .msc-price { display: block; font-size: 1.05rem; font-weight: 900; color: var(--foreground); }
        .msc-change { font-size: 0.8rem; font-weight: 700; }
        .msc-holding-badge { font-size: 0.75rem; font-weight: 700; background: rgba(0,229,160,0.1); color: var(--neon-green); padding: 0.35rem 0.75rem; border-radius: 0.75rem; }
        .msc-trade-row { display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; }
        .msc-qty-wrap { display: flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.05); border-radius: 0.75rem; padding: 0.3rem 0.6rem; }
        .msc-qty-btn { background: none; border: none; color: var(--foreground); font-size: 1rem; cursor: pointer; padding: 0 0.3rem; font-family: inherit; }
        .msc-qty-val { font-weight: 900; font-size: 0.9rem; min-width: 1.5rem; text-align: center; }
        .msc-total { font-size: 0.8rem; font-weight: 700; color: var(--muted); flex: 1; }
        .msc-buy-btn { padding: 0.4rem 1rem !important; font-size: 0.8rem !important; }
        .msc-buy-btn:disabled { opacity: 0.35; cursor: not-allowed; }
        .msc-sell-btn { padding: 0.4rem 0.9rem; background: rgba(255,68,102,0.15); border: 1px solid rgba(255,68,102,0.4); color: var(--danger); border-radius: 0.75rem; cursor: pointer; font-size: 0.8rem; font-weight: 700; font-family: inherit; transition: all 0.2s; }
        .msc-sell-btn:hover { background: rgba(255,68,102,0.25); }
        .msc-sell-btn:disabled { opacity: 0.35; cursor: not-allowed; }

        .ms-holdings-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .msh-row { padding: 1.25rem; border-radius: 1.25rem; display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
        .msh-info { min-width: 120px; }
        .msh-symbol { font-size: 1rem; font-weight: 900; color: var(--primary); text-decoration: none; display: block; }
        .msh-name { font-size: 0.78rem; color: var(--muted); }
        .msh-nums { display: flex; gap: 1.5rem; flex-wrap: wrap; flex: 1; }
        .msh-stat { display: flex; flex-direction: column; gap: 0.15rem; }
        .msh-lbl { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; color: var(--muted); letter-spacing: 0.05em; }

        .ms-trades-table { padding: 1.25rem; border-radius: 1.25rem; }
        .mst-header { display: grid; grid-template-columns: 1fr 80px 60px 1fr 1fr 80px; gap: 0.75rem; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--muted); letter-spacing: 0.05em; padding-bottom: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.07); }
        .mst-row { display: grid; grid-template-columns: 1fr 80px 60px 1fr 1fr 80px; gap: 0.75rem; font-size: 0.85rem; padding: 0.6rem 0; border-bottom: 1px solid rgba(255,255,255,0.04); align-items: center; }
        .mst-symbol { font-weight: 900; color: var(--primary); }
        .mst-action.buy  { color: var(--neon-green); font-weight: 700; }
        .mst-action.sell { color: var(--danger); font-weight: 700; }
        .mst-date { font-size: 0.78rem; color: var(--muted); }

        .ms-lb { padding: 1.5rem; border-radius: 1.5rem; }
        .ms-lb-row { display: flex; align-items: center; gap: 1rem; padding: 0.7rem 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.05); border-radius: 0.5rem; }
        .ms-lb-row.lb-me { background: rgba(0,229,160,0.05); }
        .lb-rank { font-weight: 900; min-width: 2.5rem; }
        .lb-rank.top { color: var(--neon-green); }
        .lb-info { flex: 1; }
        .lb-name { font-weight: 700; display: block; }
        .lb-sub { font-size: 0.75rem; color: var(--muted); }
        .lb-right { text-align: right; }
        .lb-val { font-weight: 900; display: block; }

        .ms-empty { display: flex; flex-direction: column; align-items: center; gap: 1rem; padding: 3rem; border-radius: 1.5rem; text-align: center; }
      `}</style>
    </div>
  );
}
