import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getAuthenticatedUser } from "@/lib/serverAuth";
import { simulatePrice, todayStr } from "@/lib/marketPrices";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const user = await getAuthenticatedUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { symbol, action, quantity } = await req.json();
  if (!symbol || !action || !quantity || quantity < 1) {
    return NextResponse.json({ error: "Invalid trade parameters" }, { status: 400 });
  }
  if (!["buy", "sell"].includes(action)) {
    return NextResponse.json({ error: "Action must be buy or sell" }, { status: 400 });
  }

  // Fetch stock info
  const { data: stock } = await supabase
    .from("market_stocks")
    .select("*")
    .eq("symbol", symbol)
    .single();
  if (!stock) return NextResponse.json({ error: "Unknown stock symbol" }, { status: 404 });

  const price       = simulatePrice(symbol, stock.base_price, todayStr());
  const totalAmount = Math.round(price * quantity * 100) / 100;

  // Fetch portfolio
  const { data: portfolio } = await supabase
    .from("market_portfolio")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();
  if (!portfolio) return NextResponse.json({ error: "Portfolio not initialised" }, { status: 404 });

  if (action === "buy") {
    if (portfolio.virtual_cash < totalAmount) {
      return NextResponse.json({ error: `Insufficient cash. Need ₹${totalAmount.toLocaleString("en-IN")} but have ₹${Math.round(portfolio.virtual_cash).toLocaleString("en-IN")}` }, { status: 400 });
    }

    // Upsert holding with updated avg buy price
    const { data: holding } = await supabase
      .from("market_holdings")
      .select("*")
      .eq("user_id", user.id)
      .eq("symbol", symbol)
      .maybeSingle();

    const newQty = (holding?.quantity ?? 0) + quantity;
    const newAvg = holding
      ? Math.round(((holding.avg_buy_price * holding.quantity) + (price * quantity)) / newQty * 100) / 100
      : price;

    await supabase.from("market_holdings").upsert({
      user_id: user.id, symbol, quantity: newQty, avg_buy_price: newAvg, updated_at: new Date().toISOString(),
    }, { onConflict: "user_id,symbol" });

    await supabase.from("market_portfolio")
      .update({ virtual_cash: Math.round((portfolio.virtual_cash - totalAmount) * 100) / 100, updated_at: new Date().toISOString() })
      .eq("user_id", user.id);

  } else {
    const { data: holding } = await supabase
      .from("market_holdings")
      .select("*")
      .eq("user_id", user.id)
      .eq("symbol", symbol)
      .maybeSingle();

    if (!holding || holding.quantity < quantity) {
      return NextResponse.json({ error: `Insufficient shares. You own ${holding?.quantity ?? 0} but tried to sell ${quantity}` }, { status: 400 });
    }

    const newQty = holding.quantity - quantity;
    await supabase.from("market_holdings").upsert({
      user_id: user.id, symbol, quantity: newQty, avg_buy_price: holding.avg_buy_price, updated_at: new Date().toISOString(),
    }, { onConflict: "user_id,symbol" });

    await supabase.from("market_portfolio")
      .update({ virtual_cash: Math.round((portfolio.virtual_cash + totalAmount) * 100) / 100, updated_at: new Date().toISOString() })
      .eq("user_id", user.id);
  }

  // Record trade
  await supabase.from("market_trades").insert({
    user_id: user.id, symbol, stock_name: stock.name, action, quantity, price, total_amount: totalAmount,
  });

  return NextResponse.json({ ok: true, symbol, action, quantity, price, totalAmount });
}
