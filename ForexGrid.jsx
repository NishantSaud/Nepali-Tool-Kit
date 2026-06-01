// frontend/components/ForexGrid.jsx
'use client';
import { useState, useMemo } from 'react';

const FLAGS = {
  USD:'🇺🇸',EUR:'🇪🇺',GBP:'🇬🇧',INR:'🇮🇳',AUD:'🇦🇺',CAD:'🇨🇦',
  CHF:'🇨🇭',JPY:'🇯🇵',CNY:'🇨🇳',SGD:'🇸🇬',QAR:'🇶🇦',SAR:'🇸🇦',
  AED:'🇦🇪',KWD:'🇰🇼',MYR:'🇲🇾',THB:'🇹🇭',HKD:'🇭🇰',SEK:'🇸🇪',
  NOK:'🇳🇴',DKK:'🇩🇰',PKR:'🇵🇰',BDT:'🇧🇩',LKR:'🇱🇰',KRW:'🇰🇷',
};

// Pinned currencies shown first regardless of search
const PINNED = ['USD','EUR','GBP','INR','AUD'];

export default function ForexGrid({ initialData }) {
  const [query, setQuery] = useState('');

  const sorted = useMemo(() => {
    const data = [...initialData];
    data.sort((a, b) => {
      const ai = PINNED.indexOf(a.iso3);
      const bi = PINNED.indexOf(b.iso3);
      if (ai !== -1 && bi !== -1) return ai - bi;
      if (ai !== -1) return -1;
      if (bi !== -1) return 1;
      return a.iso3.localeCompare(b.iso3);
    });
    return data;
  }, [initialData]);

  const filtered = useMemo(() => {
    if (!query.trim()) return sorted;
    const q = query.toLowerCase();
    return sorted.filter(
      (r) => r.iso3.toLowerCase().includes(q) || r.currency_name.toLowerCase().includes(q)
    );
  }, [sorted, query]);

  return (
    <>
      {/* SEARCH */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, maxWidth: 500 }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <span style={{
            position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
            color: 'var(--ink4)', fontSize: '1rem', pointerEvents: 'none',
          }}>⌕</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search currency…"
            style={{ paddingLeft: 36 }}
          />
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', padding: '0 14px',
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--r-sm)', fontSize: '.8rem', color: 'var(--ink3)',
          whiteSpace: 'nowrap',
        }}>
          {filtered.length} currencies
        </div>
      </div>

      {/* GRID */}
      {filtered.length === 0 ? (
        <div style={{ padding: '40px 0', color: 'var(--ink4)', fontSize: '.9rem' }}>
          No currencies found for "{query}".
        </div>
      ) : (
        <div className="fx-grid">
          {filtered.map((r) => (
            <div key={r.iso3} className="fx-card">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '1.4rem', marginRight: 10 }}>
                  {FLAGS[r.iso3] ?? '🏳'}
                </span>
                <div>
                  <div className="fx-currency">
                    {r.iso3}{r.unit > 1 ? ` ×${r.unit}` : ''}
                  </div>
                  <div className="fx-name">{r.currency_name}</div>
                </div>
              </div>
              <div className="fx-rates">
                <div className="fx-label">Buy / Sell</div>
                <div className="fx-buy">₨{Number(r.buy).toFixed(2)}</div>
                <div className="fx-sell">₨{Number(r.sell).toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
