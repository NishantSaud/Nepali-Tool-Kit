import { createClient } from '@supabase/supabase-js';
import { fetchGoldRates, getGoldHistory } from '../../../backend/services/goldService.js';

function anonClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export async function GET(request) {
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
    try {
      console.warn('[gold route] Catch fallback to live');
      const live = await fetchGoldRates();
      return Response.json({ ok: true, source: 'live', data: live });
    } catch (fallbackErr) {
      return Response.json({ ok: false, error: err.message }, { status: 502 });
    }
  }
}
