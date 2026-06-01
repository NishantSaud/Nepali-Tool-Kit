// backend/services/goldService.js
// ─────────────────────────────────────────────────────────────
// Fetches Nepal gold & silver prices.
// Primary source: RapidAPI "Nepali Gold Silver Rate Live"
// Fallback:       ashesh.com.np/gold widget JSON (unofficial)
// Data origin:    FNGOSDA (Federation of Nepal Gold & Silver Dealers)
// Updated daily ~11:00 AM NPT
// ─────────────────────────────────────────────────────────────

const RAPIDAPI_HOST = 'nepali-gold-silver-rate-live.p.rapidapi.com';
const RAPIDAPI_URL  = `https://${RAPIDAPI_HOST}/`;

/**
 * Fetch today's gold & silver prices from RapidAPI.
 * Requires RAPIDAPI_KEY env variable.
 */
export async function fetchGoldRatesFromRapidAPI() {
  const key = process.env.RAPIDAPI_KEY;
  if (!key) throw new Error('RAPIDAPI_KEY not set');

  const res = await fetch(RAPIDAPI_URL, {
    headers: {
      'X-RapidAPI-Key':  key,
      'X-RapidAPI-Host': RAPIDAPI_HOST,
    },
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) throw new Error(`RapidAPI gold error: ${res.status}`);
  const data = await res.json();

  // Normalise to our schema — adjust field names to actual API response
  return {
    rate_date:           new Date().toISOString().split('T')[0],
    hallmark_per_tola:   parseFloat(data?.hallmark?.tola   ?? data?.fine_tola   ?? 0),
    tajabi_per_tola:     parseFloat(data?.tajabi?.tola     ?? data?.tejabi_tola ?? 0),
    hallmark_per_10g:    parseFloat(data?.hallmark?.gram10 ?? data?.fine_10g    ?? 0),
    tajabi_per_10g:      parseFloat(data?.tajabi?.gram10   ?? data?.tejabi_10g  ?? 0),
    silver_per_tola:     parseFloat(data?.silver?.tola     ?? data?.silver_tola ?? 0),
    silver_per_10g:      parseFloat(data?.silver?.gram10   ?? data?.silver_10g  ?? 0),
    source: 'FNGOSDA/RapidAPI',
  };
}

/**
 * Fallback: scrape ashesh.com.np gold widget JSON endpoint.
 * This is unofficial — use only if RapidAPI fails.
 */
export async function fetchGoldRatesFallback() {
  // ashesh.com.np exposes a widget JSON that many Nepal finance sites consume
  const res = await fetch(
    'https://www.ashesh.com.np/gold/widget.php?api=622227j343&json=1',
    { signal: AbortSignal.timeout(8000) }
  );
  if (!res.ok) throw new Error(`Fallback gold fetch error: ${res.status}`);
  const data = await res.json();

  return {
    rate_date:         new Date().toISOString().split('T')[0],
    hallmark_per_tola: parseFloat(data?.gold_hallmark_tola ?? 0),
    tajabi_per_tola:   parseFloat(data?.gold_tajabi_tola   ?? 0),
    hallmark_per_10g:  parseFloat(data?.gold_hallmark_10g  ?? 0),
    tajabi_per_10g:    parseFloat(data?.gold_tajabi_10g    ?? 0),
    silver_per_tola:   parseFloat(data?.silver_tola        ?? 0),
    silver_per_10g:    parseFloat(data?.silver_10g         ?? 0),
    source: 'FNGOSDA/ashesh.com.np',
  };
}

/**
 * Fetch with automatic fallback.
 * Returns normalised rate object.
 */
export async function fetchGoldRates() {
  try {
    return await fetchGoldRatesFromRapidAPI();
  } catch (primaryErr) {
    console.warn('[goldService] Primary failed, trying fallback:', primaryErr.message);
    return await fetchGoldRatesFallback();
  }
}

/**
 * Upsert gold/silver rate into PostgreSQL.
 */
export async function persistGoldRates(supabase, rate) {
  const { error } = await supabase
    .from('gold_silver_rates')
    .upsert(rate, { onConflict: 'rate_date' });
  if (error) throw new Error(`DB gold upsert failed: ${error.message}`);
}

/**
 * Read last N days of gold history for chart rendering.
 */
export async function getGoldHistory(supabase, days = 90) {
  const since = new Date();
  since.setDate(since.getDate() - days);

  const { data, error } = await supabase
    .from('gold_silver_rates')
    .select('rate_date, hallmark_per_tola, tajabi_per_tola, silver_per_tola')
    .gte('rate_date', since.toISOString().split('T')[0])
    .order('rate_date', { ascending: true });

  if (error) throw new Error(`DB gold history error: ${error.message}`);
  return data ?? [];
}
