import { createClient } from '@supabase/supabase-js';
import { fetchLiveRates } from '../../../backend/services/nrbService.js';

function anonClient() {
  // 1. Check if keys exist BEFORE initializing
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn('[Supabase] Missing credentials. Supabase client will not be initialized.');
    return null; 
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const historyCurrency  = searchParams.get('history');   // e.g. "USD"
  const days             = parseInt(searchParams.get('days') ?? '90');

  const supabase = anonClient();

  try {
    // 2. If Supabase client failed to initialize, bypass it and jump straight to NRB fallback
    if (!supabase) {
      if (historyCurrency) {
        throw new Error("Historical data requires Supabase connection.");
      }
      console.log('[forex route] Supabase not configured. Route falling back to live NRB API.');
      const live = await fetchLiveRates();
      return Response.json({ ok: true, source: 'live', data: live });
    }

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

    if (error || !data || data.length === 0) {
      // DB unavailable — fall back to live NRB API
      console.warn('[forex route] DB fallback to live NRB');
      const live = await fetchLiveRates();
      return Response.json({ ok: true, source: 'live', data: live });
    }

    return Response.json({ ok: true, source: 'db', data });
  } catch (err) {
    // If both failed, try to fallback to live as well to be safe
    try {
      console.warn('[forex route] Catch fallback to live NRB');
      const live = await fetchLiveRates();
      return Response.json({ ok: true, source: 'live', data: live });
    } catch (fallbackErr) {
      return Response.json({ ok: false, error: err.message }, { status: 502 });
    }
  }
}