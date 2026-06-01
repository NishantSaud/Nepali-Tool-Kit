// backend/cron/fetchAllRates.js
// ─────────────────────────────────────────────────────────────
// Scheduled job: runs via Vercel Cron / node-cron / GitHub Actions
//
// Vercel cron.json schedule (add to project root):
//   { "crons": [{ "path": "/api/cron/fetch-rates", "schedule": "30 5 * * *" }] }
//   (05:30 UTC = 11:15 NPT, just after FNGOSDA publishes)
//
// Each service is wrapped in an independent try/catch so a failure
// in one source does NOT prevent the others from completing.
// ─────────────────────────────────────────────────────────────

import { createClient }     from '@supabase/supabase-js';
import { fetchLiveRates, persistRates } from '../services/nrbService.js';
import { fetchGoldRates, persistGoldRates } from '../services/goldService.js';

// Service-role client — bypasses RLS for write operations
function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase env vars missing');
  return createClient(url, key);
}

/**
 * Update the service_health table for a given service.
 * Isolated from the main logic so it never throws.
 */
async function updateHealth(supabase, service, status, message = '') {
  const now = new Date().toISOString();
  await supabase
    .from('service_health')
    .upsert({
      service,
      status,
      ...(status === 'ok'    ? { last_ok:    now } : {}),
      ...(status === 'error' ? { last_error: now } : {}),
      message,
      updated_at: now,
    }, { onConflict: 'service' })
    .catch(console.error);   // health update must never crash the job
}

/**
 * Main job entry — called by the Next.js API route handler.
 * Returns a summary object with per-service results.
 */
export async function runFetchJob() {
  const supabase = getServiceClient();
  const results  = {};

  // ── 1. NRB Exchange Rates ──────────────────────────────────
  try {
    console.log('[cron] Fetching NRB rates…');
    const rates = await fetchLiveRates();
    await persistRates(supabase, rates);
    await updateHealth(supabase, 'nrb', 'ok', `${rates.length} currencies saved`);
    results.nrb = { ok: true, count: rates.length };
    console.log(`[cron] NRB: ${rates.length} rates saved`);
  } catch (err) {
    console.error('[cron] NRB FAILED:', err.message);
    await updateHealth(supabase, 'nrb', 'error', err.message);
    results.nrb = { ok: false, error: err.message };
  }

  // ── 2. Gold & Silver Rates ─────────────────────────────────
  try {
    console.log('[cron] Fetching gold/silver rates…');
    const rate = await fetchGoldRates();
    await persistGoldRates(supabase, rate);
    await updateHealth(supabase, 'gold', 'ok', `Hallmark: ${rate.hallmark_per_tola}`);
    results.gold = { ok: true, rate };
    console.log('[cron] Gold rates saved');
  } catch (err) {
    console.error('[cron] Gold FAILED:', err.message);
    await updateHealth(supabase, 'gold', 'error', err.message);
    results.gold = { ok: false, error: err.message };
  }

  // ── 3. QR & Date Converter are client-side — mark healthy ──
  await updateHealth(supabase, 'qr',   'ok', 'Client-side service');
  await updateHealth(supabase, 'date', 'ok', 'Client-side service');
  results.qr   = { ok: true };
  results.date = { ok: true };

  return results;
}
