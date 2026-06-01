// backend/services/nrbService.js
// ─────────────────────────────────────────────────────────────
// Fetches exchange rates from Nepal Rastra Bank's official API
// Docs: https://www.nrb.org.np/forex/  (FOREX API V1)
// ─────────────────────────────────────────────────────────────

const NRB_BASE = 'https://www.nrb.org.np/api/forex/v1';

/**
 * Fetch today's live exchange rates from NRB.
 * Returns an array of rate objects normalised for our DB schema.
 */
export async function fetchLiveRates() {
  const res = await fetch(`${NRB_BASE}/rates`, {
    next: { revalidate: 0 },   // always fresh in server components
    headers: { 'Accept': 'application/json' },
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) throw new Error(`NRB API error: ${res.status}`);

  const data = await res.json();
  // NRB wraps data in data.payload[0].rates
  const payload = data?.data?.payload?.[0];
  if (!payload) throw new Error('Unexpected NRB response shape');

  const publishedOn = payload.date;   // "YYYY-MM-DD"
  return payload.rates.map((r) => ({
    published_on:  publishedOn,
    iso3:          r.currency.iso3,
    currency_name: r.currency.name,
    unit:          r.currency.unit ?? 1,
    buy:           parseFloat(r.buy),
    sell:          parseFloat(r.sell),
  }));
}

/**
 * Fetch historical rates for a date range.
 * @param {string} from  "YYYY-MM-DD"
 * @param {string} to    "YYYY-MM-DD"
 * @param {string} iso3  currency code, default "USD"
 */
export async function fetchRateHistory(from, to, iso3 = 'USD') {
  const url = new URL(`${NRB_BASE}/rates`);
  url.searchParams.set('from',    from);
  url.searchParams.set('to',      to);
  url.searchParams.set('per_page', '365');

  const res = await fetch(url.toString(), {
    signal: AbortSignal.timeout(12000),
  });
  if (!res.ok) throw new Error(`NRB API history error: ${res.status}`);

  const data = await res.json();
  const payloads = data?.data?.payload ?? [];

  // Flatten to [{date, buy, sell}] for the requested currency
  return payloads.flatMap((p) => {
    const rate = p.rates.find((r) => r.currency.iso3 === iso3);
    if (!rate) return [];
    return [{
      date: p.date,
      buy:  parseFloat(rate.buy),
      sell: parseFloat(rate.sell),
    }];
  });
}

/**
 * Upsert rates array into PostgreSQL via Supabase client.
 * Call this from the cron job.
 */
export async function persistRates(supabase, rates) {
  const { error } = await supabase
    .from('forex_rates')
    .upsert(rates, { onConflict: 'published_on,iso3' });
  if (error) throw new Error(`DB upsert failed: ${error.message}`);
}
