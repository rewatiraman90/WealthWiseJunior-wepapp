import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { simulatePrice, todayStr } from "@/lib/marketPrices";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const STARTING_CASH = 100000;

export async function GET() {
  // Get all portfolios
  const { data: portfolios } = await supabase
    .from("market_portfolio")
    .select("user_id, virtual_cash");

  if (!portfolios?.length) return NextResponse.json({ leaderboard: [] });

  // Get all holdings with stock base prices
  const { data: allHoldings } = await supabase
    .from("market_holdings")
    .select("user_id, symbol, quantity, market_stocks(base_price)")
    .gt("quantity", 0);

  // Get user names from profiles
  const userIds = portfolios.map((p) => p.user_id);
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, name, grade")
    .in("id", userIds);

  const profileMap = Object.fromEntries((profiles || []).map((p) => [p.id, p]));
  const today = todayStr();

  const ranked = portfolios.map((p) => {
    const userHoldings = (allHoldings || []).filter((h) => h.user_id === p.user_id);
    const holdingsValue = userHoldings.reduce((sum, h: any) => {
      const price = simulatePrice(h.symbol, h.market_stocks.base_price, today);
      return sum + price * h.quantity;
    }, 0);
    const totalValue = p.virtual_cash + holdingsValue;
    const returnPct  = ((totalValue - STARTING_CASH) / STARTING_CASH) * 100;
    const profile    = profileMap[p.user_id];
    return {
      userId:     p.user_id,
      name:       profile?.name || "Trader",
      grade:      profile?.grade || "—",
      totalValue: Math.round(totalValue * 100) / 100,
      returnPct:  Math.round(returnPct * 100) / 100,
    };
  })
    .sort((a, b) => b.totalValue - a.totalValue)
    .slice(0, 10)
    .map((e, i) => ({ ...e, rank: i + 1 }));

  return NextResponse.json({ leaderboard: ranked });
}
