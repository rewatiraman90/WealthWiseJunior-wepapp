// Deterministic daily price simulation — no paid API, no DB writes per request.
// Prices are consistent within a calendar day and shift realistically day-to-day.

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = Math.imul(31, hash) + str.charCodeAt(i) | 0;
  }
  return Math.abs(hash);
}

// Returns a price for a given symbol anchored to basePrice for a given date string (YYYY-MM-DD).
// Daily drift is ±2%, seeded by symbol+date so it's consistent for everyone on the same day.
export function simulatePrice(symbol: string, basePrice: number, dateStr: string): number {
  const seed = hashCode(symbol + dateStr);
  const driftPct = ((seed % 401) - 200) / 10000; // -2% to +2%
  return Math.round(basePrice * (1 + driftPct) * 100) / 100;
}

export function simulatePreviousClose(symbol: string, basePrice: number, dateStr: string): number {
  const yesterday = new Date(dateStr);
  yesterday.setDate(yesterday.getDate() - 1);
  const yStr = yesterday.toISOString().split('T')[0];
  return simulatePrice(symbol, basePrice, yStr);
}

export function todayStr(): string {
  return new Date().toISOString().split('T')[0];
}

// Returns last N days of simulated closing prices (newest last)
export function simulatePriceHistory(symbol: string, basePrice: number, days = 30): { date: string; price: number }[] {
  const result = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const ds = d.toISOString().split('T')[0];
    result.push({ date: ds, price: simulatePrice(symbol, basePrice, ds) });
  }
  return result;
}
