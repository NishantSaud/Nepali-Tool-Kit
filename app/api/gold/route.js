// app/api/gold/route.js
import { createClient } from '@supabase/supabase-js';
import { fetchGoldRates, getGoldHistory } from '../../../backend/services/goldService.js';

function anonClient() {
  // Return null if env vars are missing (don't crash)
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn('[gold route] Supabase env vars missing');
    return null;
  }
  
  try {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  } catch (error) {
    console.warn('[gold route] Supabase client creation failed:', error.message);
    return null;
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const days = parseInt(searchParams.get('days') ?? '0');
  const supabase = anonClient();

  try {
    // If requesting historical data for charts
    if (days > 0) {
      const historyData = await getGoldHistory(supabase, days);
      return Response.json({ ok: true, data: historyData, type: 'history' });
    }

    // Get latest rates - always fetch fresh from Stooq
    console.log('[gold route] Fetching latest gold rates...');
    const liveRates = await fetchGoldRates();
    
    // Try to update DB in background (don't await)
    if (supabase) {
      const { persistGoldRates } = await import('../../../backend/services/goldService.js');
      persistGoldRates(supabase, liveRates).catch(err => 
        console.warn('[gold route] Background DB update failed:', err.message)
      );
    }
    
    return Response.json({ 
      ok: true, 
      source: liveRates.source || 'live',
      data: liveRates,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('[gold route] Error:', err);
    
    // Last resort: return fallback data
    try {
      const fallbackData = await fetchGoldRates(); // This will return mock on failure
      return Response.json({ 
        ok: true, 
        source: 'fallback',
        data: fallbackData,
        warning: 'Using approximate rates'
      });
    } catch {
      return Response.json({ 
        ok: false, 
        error: err.message,
        message: 'Unable to fetch gold rates at this time'
      }, { status: 502 });
    }
  }
}