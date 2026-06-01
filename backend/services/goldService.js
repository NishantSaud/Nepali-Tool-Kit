// backend/services/goldService.js
// ─────────────────────────────────────────────────────────────
// Fetches Nepal gold & silver prices using Stooq API (Free)
// Works offline/without Supabase by using in-memory cache
// ─────────────────────────────────────────────────────────────

// In-memory cache for when database is unavailable
let memoryCache = {
  rates: null,
  history: [],
  timestamp: null
};

/**
 * Get current USD to NPR exchange rate (Free, no API key)
 */
async function getUSDtoNPR() {
  try {
    // ExchangeRate-API - Free tier, no key required
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD', {
      signal: AbortSignal.timeout(5000)
    });
    
    if (!response.ok) throw new Error('Exchange rate API failed');
    const data = await response.json();
    
    if (data.rates && data.rates.NPR) {
      return parseFloat(data.rates.NPR);
    }
    throw new Error('NPR rate not found');
  } catch (error) {
    console.warn('[goldService] Exchange rate API failed, using fallback:', error.message);
    return 133.50;
  }
}

/**
 * Fetch current gold and silver prices from Stooq (Free, no API key)
 */
async function fetchFromStooq() {
  try {
    console.log('[goldService] Fetching from Stooq...');
    
    // Fetch both gold and silver simultaneously
    const [goldResponse, silverResponse] = await Promise.all([
      fetch('https://stooq.com/q/l/?s=xauusd&f=sd2t2ohlcv&h&e=csv', {
        signal: AbortSignal.timeout(10000)
      }),
      fetch('https://stooq.com/q/l/?s=xagusd&f=sd2t2ohlcv&h&e=csv', {
        signal: AbortSignal.timeout(10000)
      })
    ]);

    if (!goldResponse.ok || !silverResponse.ok) {
      throw new Error(`Stooq API error: Gold=${goldResponse.status}, Silver=${silverResponse.status}`);
    }

    const goldCSV = await goldResponse.text();
    const silverCSV = await silverResponse.text();

    // Parse CSV responses
    const goldLines = goldCSV.trim().split('\n');
    const silverLines = silverCSV.trim().split('\n');
    
    if (goldLines.length < 2 || silverLines.length < 2) {
      throw new Error('Incomplete data from Stooq');
    }

    // Stooq format: Symbol,Date,Time,Open,High,Low,Close,Volume
    const goldColumns = goldLines[1].split(',');
    const silverColumns = silverLines[1].split(',');
    
    const goldUSDPerOunce = parseFloat(goldColumns[4]);
    const silverUSDPerOunce = parseFloat(silverColumns[4]);

    if (isNaN(goldUSDPerOunce) || isNaN(silverUSDPerOunce)) {
      throw new Error('Invalid price data from Stooq');
    }

    // Get current exchange rate
    const usdToNpr = await getUSDtoNPR();
    
    // Conversion constants
    const GRAMS_PER_OUNCE = 31.1035;
    const GRAMS_PER_TOLA = 11.6638;
    
    // Calculate NPR prices per ounce
    const goldNPRPerOunce = goldUSDPerOunce * usdToNpr;
    const silverNPRPerOunce = silverUSDPerOunce * usdToNpr;
    
    // Calculate per gram prices
    const goldNPRPerGram = goldNPRPerOunce / GRAMS_PER_OUNCE;
    const silverNPRPerGram = silverNPRPerOunce / GRAMS_PER_OUNCE;
    
    // Hallmark Gold (99.9% purity) - Use full international price
    // Tajabi Gold (99.5% purity) - Typically 0.5% less than Hallmark
    const hallmark_per_tola = Math.round(goldNPRPerGram * GRAMS_PER_TOLA);
    const hallmark_per_10g = Math.round(goldNPRPerGram * 10);
    const tajabi_per_tola = Math.round(hallmark_per_tola * 0.995);
    const tajabi_per_10g = Math.round(hallmark_per_10g * 0.995);
    
    // Silver per tola and 10g
    const silver_per_tola = Math.round(silverNPRPerGram * GRAMS_PER_TOLA);
    const silver_per_10g = Math.round(silverNPRPerGram * 10);
    
    const result = {
      rate_date: new Date().toISOString().split('T')[0],
      hallmark_per_tola,
      tajabi_per_tola,
      hallmark_per_10g,
      tajabi_per_10g,
      silver_per_tola,
      silver_per_10g,
      source: 'Stooq (Live Market)',
      usd_exchange_rate: usdToNpr,
      gold_usd_per_ounce: Math.round(goldUSDPerOunce),
      silver_usd_per_ounce: Math.round(silverUSDPerOunce)
    };
    
    console.log('[goldService] Success:', {
      goldUSD: goldUSDPerOunce,
      hallmark_tola: hallmark_per_tola,
      silver_tola: silver_per_tola
    });
    
    // Update memory cache
    memoryCache.rates = result;
    memoryCache.timestamp = Date.now();
    
    return result;
  } catch (error) {
    console.error('[goldService] Stooq fetch error:', error.message);
    throw error;
  }
}

/**
 * Generate mock historical data for charts (when DB unavailable)
 */
function generateMockHistory(days = 90) {
  const history = [];
  let baseGoldPrice = 125000;
  let baseSilverPrice = 1450;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Add some realistic variation
    const variation = (Math.random() - 0.5) * 2000;
    const goldPrice = Math.max(110000, Math.min(140000, baseGoldPrice + variation));
    const silverPrice = Math.max(1200, Math.min(1700, baseSilverPrice + (variation / 80)));
    
    history.push({
      rate_date: dateStr,
      hallmark_per_tola: Math.round(goldPrice),
      tajabi_per_tola: Math.round(goldPrice * 0.995),
      silver_per_tola: Math.round(silverPrice)
    });
    
    baseGoldPrice = goldPrice;
    baseSilverPrice = silverPrice;
  }
  
  return history;
}

/**
 * Main fetch function with fallback
 */
export async function fetchGoldRates() {
  // Return cached rates if less than 5 minutes old
  if (memoryCache.rates && memoryCache.timestamp && (Date.now() - memoryCache.timestamp) < 5 * 60 * 1000) {
    console.log('[goldService] Returning cached rates');
    return memoryCache.rates;
  }
  
  try {
    return await fetchFromStooq();
  } catch (error) {
    console.warn('[goldService] Stooq failed, returning cached or mock data');
    
    if (memoryCache.rates) {
      return { ...memoryCache.rates, source: 'Cached (Stooq unavailable)' };
    }
    
    // Return mock data as last resort
    return {
      rate_date: new Date().toISOString().split('T')[0],
      hallmark_per_tola: 125000,
      tajabi_per_tola: 124375,
      hallmark_per_10g: 107143,
      tajabi_per_10g: 106607,
      silver_per_tola: 1450,
      silver_per_10g: 1243,
      source: 'Mock Data (using approximate rates)',
      usd_exchange_rate: 133.50,
      gold_usd_per_ounce: 2500,
      silver_usd_per_ounce: 29
    };
  }
}

/**
 * Get gold history - works without database by generating mock data
 */
export async function getGoldHistory(supabase, days = 90) {
  // If supabase is not available or fails, use mock data
  if (!supabase) {
    console.log('[goldService] No Supabase client, using mock history');
    return generateMockHistory(days);
  }
  
  try {
    const since = new Date();
    since.setDate(since.getDate() - days);
    const sinceStr = since.toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('gold_silver_rates')
      .select('rate_date, hallmark_per_tola, tajabi_per_tola, silver_per_tola')
      .gte('rate_date', sinceStr)
      .order('rate_date', { ascending: true });

    if (error) {
      console.warn('[goldService] DB history error, using mock:', error.message);
      return generateMockHistory(days);
    }
    
    if (!data || data.length === 0) {
      console.log('[goldService] No history in DB, generating mock');
      return generateMockHistory(days);
    }
    
    return data;
  } catch (error) {
    console.warn('[goldService] History fetch error, using mock:', error.message);
    return generateMockHistory(days);
  }
}

/**
 * Upsert gold/silver rate (gracefully handles DB errors)
 */
export async function persistGoldRates(supabase, rate) {
  if (!supabase) {
    console.log('[goldService] No Supabase client, skipping persistence');
    return;
  }
  
  try {
    const { error } = await supabase
      .from('gold_silver_rates')
      .upsert(rate, { onConflict: 'rate_date' });
    
    if (error) {
      console.warn('[goldService] DB upsert failed:', error.message);
      return;
    }
    
    // Update latest table
    await supabase
      .from('latest_gold_silver')
      .delete()
      .neq('id', 0);
    
    await supabase
      .from('latest_gold_silver')
      .insert([rate]);
    
    console.log('[goldService] Rates persisted to database');
  } catch (error) {
    console.warn('[goldService] Persistence error:', error.message);
  }
}