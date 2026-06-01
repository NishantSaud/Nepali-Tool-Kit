-- ============================================================
-- Nepal Toolkit — PostgreSQL Schema
-- Run once against your Supabase / PostgreSQL instance
-- ============================================================

-- ── Extensions ──────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── NRB Forex Rates ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS forex_rates (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  published_on DATE        NOT NULL,
  iso3         VARCHAR(3)  NOT NULL,  -- e.g. 'USD', 'EUR'
  currency_name VARCHAR(80) NOT NULL,
  unit         INTEGER     NOT NULL DEFAULT 1,
  buy          NUMERIC(12,4) NOT NULL,
  sell         NUMERIC(12,4) NOT NULL,
  mid          NUMERIC(12,4) GENERATED ALWAYS AS ((buy + sell) / 2) STORED,
  fetched_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (published_on, iso3)
);

CREATE INDEX idx_forex_rates_date     ON forex_rates (published_on DESC);
CREATE INDEX idx_forex_rates_currency ON forex_rates (iso3);

-- ── Gold & Silver Prices ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS gold_silver_rates (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rate_date       DATE        NOT NULL UNIQUE,
  hallmark_per_tola   NUMERIC(12,2),
  tajabi_per_tola     NUMERIC(12,2),
  hallmark_per_10g    NUMERIC(12,2),
  tajabi_per_10g      NUMERIC(12,2),
  silver_per_tola     NUMERIC(12,2),
  silver_per_10g      NUMERIC(12,2),
  source          VARCHAR(100) DEFAULT 'FNGOSDA',
  fetched_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_gold_silver_date ON gold_silver_rates (rate_date DESC);

-- ── QR Code Log (optional analytics) ────────────────────────
CREATE TABLE IF NOT EXISTS qr_logs (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content    TEXT        NOT NULL,
  size       INTEGER     NOT NULL DEFAULT 256,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Service Health Heartbeats ────────────────────────────────
-- Each service writes a row every cron cycle; dashboard reads latest
CREATE TABLE IF NOT EXISTS service_health (
  service    VARCHAR(40) PRIMARY KEY,   -- 'nrb', 'gold', 'qr', 'date'
  status     VARCHAR(10) NOT NULL DEFAULT 'ok',  -- 'ok' | 'error'
  last_ok    TIMESTAMPTZ,
  last_error TIMESTAMPTZ,
  message    TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO service_health (service, status) VALUES
  ('nrb',  'ok'),
  ('gold', 'ok'),
  ('qr',   'ok'),
  ('date', 'ok')
ON CONFLICT (service) DO NOTHING;

-- ── Helpful Views ────────────────────────────────────────────

-- Latest NRB rates (today or most recent published day)
CREATE OR REPLACE VIEW latest_forex_rates AS
  SELECT f.*
  FROM forex_rates f
  INNER JOIN (
    SELECT MAX(published_on) AS max_date FROM forex_rates
  ) latest ON f.published_on = latest.max_date
  ORDER BY f.iso3;

-- Latest gold/silver entry
CREATE OR REPLACE VIEW latest_gold_silver AS
  SELECT * FROM gold_silver_rates ORDER BY rate_date DESC LIMIT 1;

-- 30-day gold price history for charts
CREATE OR REPLACE VIEW gold_history_30d AS
  SELECT rate_date,
         hallmark_per_tola,
         tajabi_per_tola,
         silver_per_tola
  FROM gold_silver_rates
  WHERE rate_date >= CURRENT_DATE - INTERVAL '30 days'
  ORDER BY rate_date ASC;

-- ── Row-level policies (Supabase) ────────────────────────────
-- Allow anonymous read on everything (no personal data stored)
ALTER TABLE forex_rates        ENABLE ROW LEVEL SECURITY;
ALTER TABLE gold_silver_rates  ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_health     ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_logs            ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read forex"   ON forex_rates        FOR SELECT USING (true);
CREATE POLICY "public read gold"    ON gold_silver_rates  FOR SELECT USING (true);
CREATE POLICY "public read health"  ON service_health     FOR SELECT USING (true);
-- Only service role (server-side) can INSERT / UPDATE
CREATE POLICY "service write forex"  ON forex_rates        FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service write gold"   ON gold_silver_rates  FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service write health" ON service_health     FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service write qr"     ON qr_logs            FOR ALL USING (auth.role() = 'service_role');
