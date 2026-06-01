// backend/api/routes.js
// ─────────────────────────────────────────────────────────────
// Next.js App Router route handler stubs.
// Place each file at the path shown in the comment above the export.
//
// Redis caching uses Upstash (@upstash/redis).
// If UPSTASH_REDIS_REST_URL is not set, caching is skipped gracefully.
// ─────────────────────────────────────────────────────────────

// ════════════════════════════════════════════════════════════
// FILE: app/api/forex/route.js
// GET  /api/forex          → latest rates
// GET  /api/forex?history=USD&days=90  → history array
// ════════════════════════════════════════════════════════════
import { createClient } from '@supabase/supabase-js';
import { fetchLiveRates } from '../services/nrbService.js';

function anonClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

// ── GET /api/forex ───────────────────────────────────────────
export async function GET_forex(request) {
  const { searchParams } = new URL(request.url);
  const historyCurrency  = searchParams.get('history');   // e.g. "USD"
  const days             = parseInt(searchParams.get('days') ?? '90');

  const supabase = anonClient();

  try {
    if (historyCurrency) {
      // Return chart history for one currency
      const since = new Date();
      since.setDate(since.getDate() - days);

      const { data, error } = await supabase
        .from('forex_rates')
        .select('published_on, buy, sell, mid')
        .eq('iso3', historyCurrency)
        .gte('published_on', since.toISOString().split('T')[0])
        .order('published_on', { ascending: true });

      if (error) throw error;
      return Response.json({ ok: true, currency: historyCurrency, data });
    }

    // Default: latest rates table
    const { data, error } = await supabase
      .from('latest_forex_rates')
      .select('*');

    if (error) {
      // DB unavailable — fall back to live NRB API
      console.warn('[forex route] DB fallback to live NRB');
      const live = await fetchLiveRates();
      return Response.json({ ok: true, source: 'live', data: live });
    }

    return Response.json({ ok: true, source: 'db', data });
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 502 });
  }
}

// ════════════════════════════════════════════════════════════
// FILE: app/api/gold/route.js
// GET  /api/gold          → latest gold/silver rates
// GET  /api/gold?days=30  → history array for charts
// ════════════════════════════════════════════════════════════
import { fetchGoldRates, getGoldHistory } from '../services/goldService.js';

export async function GET_gold(request) {
  const { searchParams } = new URL(request.url);
  const days  = parseInt(searchParams.get('days') ?? '0');
  const supabase = anonClient();

  try {
    if (days > 0) {
      const history = await getGoldHistory(supabase, days);
      return Response.json({ ok: true, data: history });
    }

    const { data, error } = await supabase
      .from('latest_gold_silver')
      .select('*');

    if (error || !data?.length) {
      // Fallback: fetch live
      console.warn('[gold route] DB fallback to live');
      const live = await fetchGoldRates();
      return Response.json({ ok: true, source: 'live', data: live });
    }

    return Response.json({ ok: true, source: 'db', data: data[0] });
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 502 });
  }
}

// ════════════════════════════════════════════════════════════
// FILE: app/api/health/route.js
// GET  /api/health   → per-service status for status bar
// ════════════════════════════════════════════════════════════
export async function GET_health() {
  const supabase = anonClient();
  try {
    const { data, error } = await supabase
      .from('service_health')
      .select('service, status, last_ok, last_error, message, updated_at');

    if (error) throw error;
    const map = Object.fromEntries(data.map((r) => [r.service, r]));
    return Response.json({ ok: true, services: map });
  } catch (err) {
    // Even health check failing: return defaults so UI doesn't break
    return Response.json({
      ok: false,
      services: {
        nrb:  { status: 'unknown' },
        gold: { status: 'unknown' },
        qr:   { status: 'ok' },
        date: { status: 'ok' },
      },
    });
  }
}

// ════════════════════════════════════════════════════════════
// FILE: app/api/cron/fetch-rates/route.js
// POST /api/cron/fetch-rates  (called by Vercel Cron)
// ════════════════════════════════════════════════════════════
import { runFetchJob } from '../cron/fetchAllRates.js';

export async function POST_cronFetchRates(request) {
  // Protect with a shared secret so only Vercel Cron can call it
  const auth = request.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Unauthorised' }, { status: 401 });
  }
  try {
    const results = await runFetchJob();
    return Response.json({ ok: true, results });
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
