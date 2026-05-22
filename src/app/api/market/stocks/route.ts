import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { simulatePrice, simulatePreviousClose, todayStr } from "@/lib/marketPrices";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const { data, error } = await supabase
    .from("market_stocks")
    .select("*")
    .order("market_cap_cr", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const today = todayStr();
  const stocks = (data || []).map((s) => {
    const currentPrice = simulatePrice(s.symbol, s.base_price, today);
    const prevClose    = simulatePreviousClose(s.symbol, s.base_price, today);
    const change       = currentPrice - prevClose;
    const changePct    = (change / prevClose) * 100;
    return {
      symbol:       s.symbol,
      name:         s.name,
      sector:       s.sector,
      description:  s.description,
      currentPrice,
      previousClose: prevClose,
      change:        Math.round(change * 100) / 100,
      changePct:     Math.round(changePct * 100) / 100,
      high52w:       s.high_52w,
      low52w:        s.low_52w,
      marketCapCr:   s.market_cap_cr,
    };
  });

  return NextResponse.json({ stocks });
}
