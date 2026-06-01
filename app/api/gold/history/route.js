// app/api/gold/history/route.js
// ─────────────────────────────────────────────────────────────
// Stooq API - Historical Gold & Silver Data with Nepal Market Factors
// Converts international prices to Nepal market rates (+ duties, taxes)
// ─────────────────────────────────────────────────────────────

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const metal = searchParams.get('metal') || 'gold'; // 'gold' or 'silver'
  const days = parseInt(searchParams.get('days') || '90');

  try {
    const symbol = metal === 'gold' ? 'XAUUSD' : 'XAGUSD';
    
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}${month}${day}`;
    };
    
    const url = `https://stooq.com/q/d/l/?s=${symbol}&d1=${formatDate(startDate)}&d2=${formatDate(endDate)}&i=d`;
    
    console.log(`[History API] Fetching ${metal} data...`);
    
    const response = await fetch(url, {
      signal: AbortSignal.timeout(10000)
    });
    
    if (!response.ok) {
      throw new Error(`Stooq API error: ${response.status}`);
    }
    
    const csvText = await response.text();
    
    // Get USD to NPR exchange rate
    const usdToNpr = await getUSDtoNPR();
    
    // Parse CSV and convert to Nepal market prices
    const historicalData = parseStooqCSVToNepalRates(csvText, metal, usdToNpr);
    
    if (historicalData.length === 0) {
      throw new Error('No historical data parsed');
    }
    
    return Response.json({ 
      ok: true, 
      data: historicalData, 
      source: 'stooq',
      metal: metal,
      days: days
    });
    
  } catch (error) {
    console.error(`[History API] Error for ${metal}:`, error.message);
    
    // Return realistic mock data for Nepal market
    const mockData = generateRealisticNepalMockData(metal, days);
    
    return Response.json({ 
      ok: true, 
      data: mockData, 
      source: 'mock',
      metal: metal,
      warning: 'Using estimated Nepal market data'
    });
  }
}

async function getUSDtoNPR() {
  try {
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
    console.warn('[History API] Exchange rate fallback:', error.message);
    return 133.50;
  }
}

function parseStooqCSVToNepalRates(csvText, metal, usdToNpr) {
  const lines = csvText.trim().split('\n');
  const historicalData = [];
  
  const GRAMS_PER_OUNCE = 31.1035;
  const GRAMS_PER_TOLA = 11.6638;
  
  // Nepal market factors (import duty, taxes, dealer margins)
  // Gold in Nepal is typically 2-2.5x international price
  const NEPAL_MARKET_MULTIPLIER = metal === 'gold' ? 2.35 : 2.15;
  
  for (let i = 1; i < lines.length; i++) {
    const columns = lines[i].split(',');
    
    if (columns.length >= 5) {
      const date = columns[0];
      const usdPerOunce = parseFloat(columns[4]); // Close price
      
      if (!isNaN(usdPerOunce) && usdPerOunce > 0) {
        // Step 1: Convert USD/ounce to NPR/ounce
        const nprPerOunce = usdPerOunce * usdToNpr;
        
        // Step 2: Convert to NPR per gram
        const nprPerGram = nprPerOunce / GRAMS_PER_OUNCE;
        
        // Step 3: Convert to NPR per tola (11.66 grams)
        const internationalNprPerTola = nprPerGram * GRAMS_PER_TOLA;
        
        // Step 4: Apply Nepal market factors (duty, taxes, margins)
        // Hallmark Gold (99.9%) - Full market price
        const hallmarkPerTola = Math.round(internationalNprPerTola * NEPAL_MARKET_MULTIPLIER);
        
        // Tajabi Gold (99.5%) - 0.5% less than Hallmark
        const tajabiPerTola = Math.round(hallmarkPerTola * 0.995);
        
        historicalData.push({
          date: date,
          hallmark_price: hallmarkPerTola,
          tajabi_price: tajabiPerTola,
          international_usd: Math.round(usdPerOunce),
          exchange_rate: Math.round(usdToNpr * 100) / 100,
          metal: metal
        });
      }
    }
  }
  
  return historicalData;
}

function generateRealisticNepalMockData(metal, days) {
  const mockData = [];
  
  // Realistic Nepal market ranges (October 2024 - present)
  // Gold in Nepal typically ranges from Rs. 110,000 to Rs. 150,000 per tola
  // But can go higher based on international prices
  let baseInternationalGold = 2650; // USD/oz
  let baseUsdToNpr = 133.50;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Simulate realistic price variations
    const dailyVariation = (Math.random() - 0.5) * 20; // USD variation
    baseInternationalGold += dailyVariation;
    baseInternationalGold = Math.max(2500, Math.min(2800, baseInternationalGold));
    
    // Calculate Nepal price
    const nprPerOunce = baseInternationalGold * baseUsdToNpr;
    const nprPerGram = nprPerOunce / 31.1035;
    const internationalNprPerTola = nprPerGram * 11.6638;
    
    // Apply Nepal market markup (duty + taxes + margins)
    const markup = metal === 'gold' ? 2.35 : 2.15;
    const hallmarkPerTola = Math.round(internationalNprPerTola * markup);
    const tajabiPerTola = Math.round(hallmarkPerTola * 0.995);
    
    mockData.push({
      date: dateStr,
      hallmark_price: hallmarkPerTola,
      tajabi_price: tajabiPerTola,
      international_usd: Math.round(baseInternationalGold),
      exchange_rate: baseUsdToNpr,
      metal: metal
    });
  }
  
  return mockData;
}