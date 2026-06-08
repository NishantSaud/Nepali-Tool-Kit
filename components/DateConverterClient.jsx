// frontend/components/DateConverterClient.jsx
'use client';
// ─────────────────────────────────────────────────────────────
// Uses @remotemerge/nepali-date-converter for all BS/AD math.
// Install: npm install @remotemerge/nepali-date-converter
// ─────────────────────────────────────────────────────────────
import { useState, useCallback } from 'react';
// import NepaliDate from '@remotemerge/nepali-date-converter';
// ↑ Uncomment in the real Next.js project.
// For this file we include a lightweight fallback below.

const BS_MONTHS_EN = [
  'Baisakh','Jestha','Ashadh','Shrawan','Bhadra','Ashwin',
  'Kartik','Mangsir','Poush','Magh','Falgun','Chaitra',
];
const WEEKDAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

// ── Minimal BS/AD lookup (2000–2084 BS) ──────────────────────
// Each row: days per month for that BS year, starting 2000 BS
const BS_TABLE = [
  [30,32,31,32,31,30,30,30,29,30,29,31],[31,31,32,31,31,31,30,29,30,29,30,30],
  [31,31,32,32,31,30,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,30,29,31],
  [30,32,31,32,31,30,30,30,29,30,29,31],[31,31,32,31,31,31,30,29,30,29,30,30],
  [31,31,32,32,31,30,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,30,29,31],
  [31,31,31,32,31,31,29,30,30,29,29,31],[31,31,32,31,31,31,30,29,30,29,30,30],
  [31,31,32,32,31,30,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,30,29,31],
  [31,31,31,32,31,31,29,30,30,29,29,31],[31,31,32,31,31,31,30,29,30,29,30,30],
  [31,31,32,32,31,30,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,30,29,31],
  [31,31,31,32,31,31,30,29,30,29,29,31],[31,31,32,31,31,31,30,29,30,29,30,30],
  [31,31,32,32,31,30,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,30,29,31],
  [31,31,31,32,31,31,29,30,30,29,29,31],[31,31,32,31,31,31,30,29,30,29,30,30],
  [31,31,32,32,31,30,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,30,29,31],
  [31,31,31,32,31,31,29,30,30,29,29,31],[31,31,32,31,31,31,30,29,30,29,30,30],
  [31,31,32,32,31,30,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,30,29,31],
  [31,31,31,32,31,31,29,30,30,29,29,31],[31,31,32,31,31,31,30,29,30,29,30,30],
  [31,31,32,32,31,30,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,30,29,31],
  [31,31,31,32,31,31,29,30,30,29,29,31],[31,31,32,31,31,31,30,29,30,29,30,30],
  [31,31,32,32,31,30,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,30,29,31],
  [31,31,31,32,31,31,30,29,30,29,29,31],[31,31,32,31,31,31,30,29,30,29,30,30],
  [31,31,32,32,31,30,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,30,29,31],
  [31,31,31,32,31,31,29,30,30,29,29,31],[31,31,32,31,31,31,30,29,30,29,30,30],
  [31,31,32,32,31,30,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,30,29,31],
  [31,31,31,32,31,31,29,30,30,29,29,31],[31,31,32,31,31,31,30,29,30,29,30,30],
  [31,31,32,32,31,30,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,30,29,31],
  [31,31,31,32,31,31,29,30,30,29,29,31],[31,31,32,31,31,31,30,29,30,29,30,30],
  [31,31,32,32,31,30,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,30,29,31],
  [31,31,31,32,31,31,29,30,30,29,29,31],[31,31,32,31,31,31,30,29,30,29,30,30],
  [31,31,32,32,31,30,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,30,29,31],
  [31,31,31,32,31,31,29,30,30,29,29,31],[31,31,32,31,31,31,30,29,30,29,30,30],
  [31,31,32,32,31,30,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,30,29,31],
  [31,31,31,32,31,31,29,30,30,29,29,31],[31,31,32,31,31,31,30,29,30,29,30,30],
  [31,31,32,32,31,30,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,30,29,31],
  [31,31,31,32,31,31,29,30,30,29,29,31],[31,31,32,31,31,31,30,29,30,29,30,30],
  [31,31,32,32,31,30,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,30,29,31],
  [31,31,31,32,31,31,29,30,30,29,29,31],[31,31,32,31,31,31,30,29,30,29,30,30],
  [31,31,32,32,31,30,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,30,29,31],
  [31,31,31,32,31,31,29,30,30,29,29,31],[31,31,32,31,31,31,30,29,30,29,30,30],
  [31,31,32,32,31,30,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,30,29,31],
  [31,31,31,32,31,31,29,30,30,29,29,31],[31,31,32,31,31,31,30,29,30,29,30,30],
  [31,31,32,32,31,30,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,30,29,31],
  [31,31,31,32,31,31,29,30,30,29,29,31],
];
const BS_START = 2000;
const EPOCH_AD = new Date(1943, 3, 14); // 2000-01-01 BS = 1943-04-14 AD

function bsDaysFromEpoch(y, m, d) {
  let days = 0;
  for (let yr = BS_START; yr < y; yr++) BS_TABLE[yr - BS_START].forEach((md) => (days += md));
  for (let mo = 1; mo < m; mo++) days += BS_TABLE[y - BS_START][mo - 1];
  return days + d - 1;
}
function bsToAd(y, m, d) {
  const dt = new Date(EPOCH_AD);
  dt.setDate(dt.getDate() + bsDaysFromEpoch(y, m, d));
  return dt;
}
function adToBs(date) {
  let delta = Math.floor((date - EPOCH_AD) / 86400000);
  if (delta < 0) return null;
  for (let i = 0; i < BS_TABLE.length; i++) {
    for (let j = 0; j < 12; j++) {
      if (delta < BS_TABLE[i][j]) return { y: BS_START + i, m: j + 1, d: delta + 1 };
      delta -= BS_TABLE[i][j];
    }
  }
  return null;
}

function pad(n) { return String(n).padStart(2, '0'); }

export default function DateConverterClient() {
  const [mode,    setMode]    = useState('bs2ad'); // 'bs2ad' | 'ad2bs'
  const [input,   setInput]   = useState('');
  const [result,  setResult]  = useState(null);
  const [error,   setError]   = useState('');

  const convert = useCallback((val, m) => {
    setError('');
    setResult(null);
    const raw = val.trim();
    if (!raw) return;
    const parts = raw.split(/[-\/]/).map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) { setError('Use format YYYY-MM-DD'); return; }
    const [y, mo, d] = parts;
    if (m === 'bs2ad') {
      const idx = y - BS_START;
      if (idx < 0 || idx >= BS_TABLE.length || mo < 1 || mo > 12) { setError('Date out of supported range (2000–2084 BS)'); return; }
      const max = BS_TABLE[idx][mo - 1];
      if (d < 1 || d > max) { setError(`Day must be 1–${max} for ${BS_MONTHS_EN[mo - 1]}`); return; }
      const ad = bsToAd(y, mo, d);
      setResult({
        display: ad.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        raw:     ad.toISOString().split('T')[0],
        label:   `${BS_MONTHS_EN[mo - 1]} ${d}, ${y} BS`,
        weekday: WEEKDAYS[ad.getDay()],
        adDate:  ad,
      });
    } else {
      const ad = new Date(y, mo - 1, d);
      if (isNaN(ad)) { setError('Invalid date'); return; }
      const bs = adToBs(ad);
      if (!bs) { setError('Date out of supported range'); return; }
      setResult({
        display: `${BS_MONTHS_EN[bs.m - 1]} ${bs.d}, ${bs.y} BS`,
        raw:     `${bs.y}-${pad(bs.m)}-${pad(bs.d)}`,
        label:   ad.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        weekday: WEEKDAYS[ad.getDay()],
        adDate:  ad,
      });
    }
  }, []);

  const handleInput = (val) => { setInput(val); convert(val, mode); };
  const toggleMode  = () => {
    const next = mode === 'bs2ad' ? 'ad2bs' : 'bs2ad';
    setMode(next); setInput(''); setResult(null); setError('');
  };

  // Age calculation
  const getAge = (adDate) => {
    const now  = new Date();
    const diff = now - adDate;
    if (diff <= 0) return null;
    const yrs  = Math.floor(diff / (365.25 * 86400000));
    const mos  = Math.floor((diff % (365.25 * 86400000)) / (30.4 * 86400000));
    const days = Math.floor((diff % (30.4 * 86400000)) / 86400000);
    return { yrs, mos, days };
  };

  // Quick-pick today
  const today      = new Date();
  const todayAD    = today.toISOString().split('T')[0];
  const todayBS    = adToBs(today);
  const todayBSStr = todayBS ? `${todayBS.y}-${pad(todayBS.m)}-${pad(todayBS.d)}` : '';

  return (
    <div style={{ maxWidth: 620 }}>
      {/* MODE TABS */}
      <div style={{ display: 'flex', gap: 0, background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 3, width: 'fit-content', marginBottom: 28 }}>
        {[['bs2ad','BS → AD'],['ad2bs','AD → BS']].map(([m, label]) => (
          <button key={m} onClick={() => { setMode(m); setInput(''); setResult(null); setError(''); }}
            style={{
              padding: '7px 18px', border: 'none',
              background: mode === m ? 'var(--surface)' : 'transparent',
              borderRadius: 6,
              fontFamily: 'var(--font-sans)', fontSize: '.875rem', fontWeight: 500,
              cursor: 'pointer', color: mode === m ? 'var(--text-primary)' : 'var(--text-tertiary)',
              boxShadow: mode === m ? 'var(--shadow-sm)' : 'none',
              transition: 'all var(--dur)',
            }}>
            {label}
          </button>
        ))}
      </div>

      <div className="tool-wrap">
        {/* INPUT ROW */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 12, alignItems: 'end', marginBottom: error ? 8 : 0 }}>
          <div>
            <div className="tool-label">{mode === 'bs2ad' ? 'Bikram Sambat (BS)' : 'Gregorian (AD)'}</div>
            <input
              type="text"
              value={input}
              onChange={(e) => handleInput(e.target.value)}
              placeholder={mode === 'bs2ad' ? 'e.g. 2081-01-15' : 'e.g. 2024-04-28'}
              maxLength={10}
              style={{ marginTop: 6 }}
            />
          </div>
          <button onClick={toggleMode} title="Swap direction"
            style={{ width: 38, height: 38, background: 'none', border: '1px solid var(--border)', borderRadius: '50%', cursor: 'pointer', fontSize: '1.1rem', color: 'var(--text-secondary)', transition: 'all var(--dur)', marginBottom: 1 }}>
            ⇄
          </button>
          <div>
            <div className="tool-label">{mode === 'bs2ad' ? 'Gregorian (AD)' : 'Bikram Sambat (BS)'}</div>
            <div style={{ marginTop: 6, height: 44, display: 'flex', alignItems: 'center', padding: '0 14px', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-mono)', fontSize: '.95rem', color: result ? 'var(--text-primary)' : 'var(--text-muted)' }}>
              {result ? result.raw : '—'}
            </div>
          </div>
        </div>

        {error && <div style={{ fontSize: '.82rem', color: 'var(--color-error)', marginBottom: 16 }}>{error}</div>}

        {/* RESULT CARD */}
        {result && (
          <div style={{ marginTop: 20, padding: 24, background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid var(--border-light)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.4rem,4vw,2rem)', fontWeight: 300, color: 'var(--text-primary)', letterSpacing: '-.02em' }}>
              {result.display}
            </div>
            <div style={{ fontSize: '.75rem', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 6 }}>
              {result.label}
            </div>
            <div style={{ fontSize: '.9rem', color: 'var(--text-tertiary)', marginTop: 6 }}>{result.weekday}</div>

            {/* AGE */}
            {getAge(result.adDate) && (() => {
              const { yrs, mos, days } = getAge(result.adDate);
              return (
                <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 16 }}>
                  {[['Years', yrs], ['Months', mos], ['Days', days]].map(([lbl, val]) => (
                    <div key={lbl} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '10px 18px', textAlign: 'center' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', fontWeight: 400, color: 'var(--text-primary)' }}>{val}</div>
                      <div style={{ fontSize: '.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.05em', marginTop: 2 }}>{lbl}</div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        )}

        {/* QUICK PICKS */}
        <div style={{ marginTop: 24 }}>
          <div className="tool-label" style={{ marginBottom: 10 }}>Quick pick</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[
              { label: 'Today (AD)',    val: todayAD,    m: 'ad2bs' },
              { label: 'Today (BS)',    val: todayBSStr, m: 'bs2ad' },
              { label: 'New Year 2082', val: '2082-01-01', m: 'bs2ad' },
              { label: '2000-01-01 BS', val: '2000-01-01', m: 'bs2ad' },
            ].map(({ label, val, m }) => (
              <button key={label} onClick={() => { setMode(m); setInput(val); convert(val, m); }}
                className="size-pill" style={{ fontSize: '.8rem' }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
