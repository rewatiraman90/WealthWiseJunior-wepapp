-- Market Simulator tables
-- Run in Supabase Studio → SQL Editor

-- Stocks reference table (seeded with 20 NSE blue-chips)
CREATE TABLE IF NOT EXISTS market_stocks (
  symbol          TEXT        PRIMARY KEY,
  name            TEXT        NOT NULL,
  sector          TEXT        NOT NULL,
  base_price      DECIMAL(10,2) NOT NULL,   -- price used as daily anchor
  high_52w        DECIMAL(10,2) NOT NULL,
  low_52w         DECIMAL(10,2) NOT NULL,
  market_cap_cr   BIGINT      NOT NULL,
  description     TEXT        NOT NULL
);

-- User portfolio (one row per user, tracks virtual cash)
CREATE TABLE IF NOT EXISTS market_portfolio (
  user_id         UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  virtual_cash    DECIMAL(12,2) NOT NULL DEFAULT 100000.00,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Holdings (aggregated position per user per stock)
CREATE TABLE IF NOT EXISTS market_holdings (
  id              UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id         UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  symbol          TEXT        NOT NULL REFERENCES market_stocks(symbol),
  quantity        INT         NOT NULL DEFAULT 0,
  avg_buy_price   DECIMAL(10,2) NOT NULL,
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, symbol)
);

-- Full trade history
CREATE TABLE IF NOT EXISTS market_trades (
  id              UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id         UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  symbol          TEXT        NOT NULL,
  stock_name      TEXT        NOT NULL,
  action          TEXT        NOT NULL CHECK (action IN ('buy', 'sell')),
  quantity        INT         NOT NULL,
  price           DECIMAL(10,2) NOT NULL,
  total_amount    DECIMAL(12,2) NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_market_holdings_user ON market_holdings(user_id);
CREATE INDEX IF NOT EXISTS idx_market_trades_user   ON market_trades(user_id);
CREATE INDEX IF NOT EXISTS idx_market_trades_symbol ON market_trades(symbol);

-- RLS
ALTER TABLE market_portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_holdings  ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_trades    ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own portfolio" ON market_portfolio FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own holdings"  ON market_holdings  FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own trades"    ON market_trades    FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Anyone reads stocks"        ON market_stocks    FOR SELECT USING (true);

-- Seed 20 NSE blue-chip stocks
INSERT INTO market_stocks (symbol, name, sector, base_price, high_52w, low_52w, market_cap_cr, description) VALUES
  ('RELIANCE',    'Reliance Industries',        'Conglomerate',  2850.00,  3217.00,  2220.00,  1930000, 'India''s largest company. Operates in energy, retail, telecom (Jio), and digital services.'),
  ('TCS',         'Tata Consultancy Services',  'IT',            4100.00,  4585.00,  3311.00,  1490000, 'India''s largest IT company. Provides software services to global enterprises.'),
  ('HDFCBANK',    'HDFC Bank',                  'Banking',       1680.00,  1880.00,  1363.00,  1270000, 'India''s largest private sector bank by assets. Known for consistent profitability.'),
  ('INFY',        'Infosys',                    'IT',            1850.00,  1975.00,  1355.00,   770000, 'Second-largest Indian IT company. Global digital transformation leader.'),
  ('ICICIBANK',   'ICICI Bank',                 'Banking',       1270.00,  1330.00,   900.00,   893000, 'India''s second-largest private bank. Rapidly growing retail and corporate banking.'),
  ('HINDUNILVR',  'Hindustan Unilever',         'FMCG',         2400.00,  2778.00,  2172.00,   564000, 'India''s largest FMCG company. Owns Surf, Dove, Lifebuoy, Horlicks brands.'),
  ('ITC',         'ITC Limited',                'FMCG',          470.00,   531.00,   393.00,   587000, 'Diversified conglomerate. Cigarettes, hotels, paperboards, FMCG (Aashirvaad, Sunfeast).'),
  ('SBIN',        'State Bank of India',        'PSU Banking',   820.00,   912.00,   600.00,   731000, 'India''s largest public sector bank. 500+ million customers and 22,000+ branches.'),
  ('BHARTIARTL',  'Bharti Airtel',              'Telecom',      1580.00,  1779.00,  1024.00,   938000, 'India''s second-largest telecom company. Operates in India and 14 African countries.'),
  ('BAJFINANCE',  'Bajaj Finance',              'NBFC',         6800.00,  7830.00,  6187.00,   420000, 'India''s most valuable NBFC. Retail lending, EMI cards, deposits across 85M+ customers.'),
  ('KOTAKBANK',   'Kotak Mahindra Bank',        'Banking',      1850.00,  1953.00,  1543.00,   368000, 'Private sector bank known for high NIM and conservative lending practices.'),
  ('LT',          'Larsen & Toubro',            'Infrastructure',3600.00, 3924.00,  2841.00,   505000, 'India''s largest engineering conglomerate. Infrastructure, defence, IT services.'),
  ('MARUTI',      'Maruti Suzuki India',        'Auto',        11200.00, 13680.00,  9668.00,   338000, 'India''s largest car manufacturer. 40%+ market share in passenger vehicles.'),
  ('ASIANPAINT',  'Asian Paints',               'Consumer',     2900.00,  3395.00,  2626.00,   278000, 'India''s largest paints company. Present in 60+ countries with 26 manufacturing plants.'),
  ('TITAN',       'Titan Company',              'Consumer',     3300.00,  3885.00,  2985.00,   293000, 'Tata group company. Watches (Tanishq), jewellery, eyewear, fragrances.'),
  ('WIPRO',       'Wipro Limited',              'IT',            570.00,   614.00,   430.00,   297000, 'Global IT, consulting and BPO services. Strong in banking and healthcare verticals.'),
  ('ADANIENT',    'Adani Enterprises',          'Conglomerate', 2400.00,  3743.00,  1992.00,   274000, 'Adani Group flagship. Airports, roads, data centres, green energy, mining.'),
  ('SUNPHARMA',   'Sun Pharmaceutical',         'Pharma',       1780.00,  1960.00,  1280.00,   427000, 'India''s largest pharma company. Specialty generics in US, India, and emerging markets.'),
  ('POWERGRID',   'Power Grid Corporation',     'Utilities',     330.00,   366.00,   213.00,   307000, 'Government-owned power transmission monopoly. Stable dividend-paying utility stock.'),
  ('DMART',       'Avenue Supermarts (DMart)',  'Retail',       4200.00,  5484.00,  3650.00,   272000, 'India''s most profitable retailer. EDLP (Every Day Low Price) model with zero debt.')
ON CONFLICT (symbol) DO NOTHING;
