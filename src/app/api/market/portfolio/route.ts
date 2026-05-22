import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getAuthenticatedUser } from "@/lib/serverAuth";
import { simulatePrice, todayStr } from "@/lib/marketPrices";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const STARTING_CASH = 100000;

export async function GET(req: Request) {
  const user = await getAuthenticatedUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Auto-create portfolio if first visit
  const { data: existing } = await supabase
    .from("market_portfolio")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  let portfolio = existing;
  if (!portfolio) {
    const { data: created, error } = await supabase
      .from("market_portfolio")
      .insert({ user_id: user.id, virtual_cash: STARTING_CASH })
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    portfolio = created;
  }

  // Holdings with live prices
  const { data: holdings } = await supabase
    .from("market_holdings")
    .select("*, market_stocks(name, sector, base_price)")
    .eq("user_id", user.id)
    .gt("quantity", 0);

  const today = todayStr();
  const enrichedHoldings = (holdings || []).map((h: any) => {
    const currentPrice = simulatePrice(h.symbol, h.market_stocks.base_price, today);
    const invested     = h.avg_buy_price * h.quantity;
    const currentValue = currentPrice * h.quantity;
    const pnl          = currentValue - invested;
    const pnlPct       = (pnl / invested) * 100;
    return {
      symbol:       h.symbol,
      name:         h.market_stocks.name,
      sector:       h.market_stocks.sector,
      quantity:     h.quantity,
      avgBuyPrice:  h.avg_buy_price,
      currentPrice,
      invested:     Math.round(invested * 100) / 100,
      currentValue: Math.round(currentValue * 100) / 100,
      pnl:          Math.round(pnl * 100) / 100,
      pnlPct:       Math.round(pnlPct * 100) / 100,
    };
  });

  const investedTotal     = enrichedHoldings.reduce((s, h) => s + h.invested, 0);
  const holdingsValue     = enrichedHoldings.reduce((s, h) => s + h.currentValue, 0);
  const totalPortfolio    = portfolio.virtual_cash + holdingsValue;
  const totalPnl          = totalPortfolio - STARTING_CASH;
  const totalPnlPct       = (totalPnl / STARTING_CASH) * 100;

  // Recent trades
  const { data: trades } = await supabase
    .from("market_trades")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(20);

  return NextResponse.json({
    cash:           Math.round(portfolio.virtual_cash * 100) / 100,
    holdingsValue:  Math.round(holdingsValue * 100) / 100,
    investedTotal:  Math.round(investedTotal * 100) / 100,
    totalPortfolio: Math.round(totalPortfolio * 100) / 100,
    totalPnl:       Math.round(totalPnl * 100) / 100,
    totalPnlPct:    Math.round(totalPnlPct * 100) / 100,
    startingCash:   STARTING_CASH,
    holdings:       enrichedHoldings,
    recentTrades:   trades || [],
  });
}
