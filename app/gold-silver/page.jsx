// frontend/app/gold-silver/page.jsx
// ─────────────────────────────────────────────────────────────
// Gold & Silver Rates — Server Component + ISR (1 hr)
// ─────────────────────────────────────────────────────────────
import GoldChartClient from '../../components/GoldChartClient';

export const revalidate = 3600; // 1 hour

export const metadata = {
  title: 'Gold & Silver Price Nepal Today',
  description:
    'Live Hallmark and Tajabi gold prices plus silver rates in Nepal from FNGOSDA. Per tola and per 10 grams with price history charts.',
  alternates: { canonical: 'https://www.nepaltoolkit.com/gold-silver' },
  openGraph: {
    title:       'Gold & Silver Price Nepal Today | NepalToolkit',
    description: 'Live gold and silver prices from FNGOSDA Nepal.',
    url:         'https://www.nepaltoolkit.com/gold-silver',
  },
};

async function getGoldData() {
  try {
    const base   = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
    const [todayRes, histRes] = await Promise.all([
      fetch(`${base}/api/gold`,          { next: { revalidate: 3600 } }),
      fetch(`${base}/api/gold?days=90`,  { next: { revalidate: 3600 } }),
    ]);
    const today   = todayRes.ok  ? await todayRes.json()  : { ok: false, data: null };
    const history = histRes.ok   ? await histRes.json()   : { ok: false, data: [] };
    return { today: today.data, history: history.data ?? [], ok: today.ok };
  } catch {
    return { today: null, history: [], ok: false };
  }
}

const PRICE_CARDS = (g) => [
  { label: 'Hallmark Gold',  unit: 'per tola',  price: g.hallmark_per_tola, sub: '99.9% purity',  accent: '#c8932a' },
  { label: 'Tajabi Gold',    unit: 'per tola',  price: g.tajabi_per_tola,   sub: '99.5% purity',  accent: '#8a6118' },
  { label: 'Hallmark Gold',  unit: 'per 10g',   price: g.hallmark_per_10g,  sub: 'per 10 grams',  accent: '#1e5fa8' },
  { label: 'Silver',         unit: 'per tola',  price: g.silver_per_tola,   sub: 'pure silver',   accent: '#717171' },
];

export default async function GoldSilverPage() {
  const { today, history, ok } = await getGoldData();

  return (
    <div className="page" style={{ paddingTop: 0 }}>
      <div className="page-header">
        <div className="eyebrow">Tool 03</div>
        <h2>Gold & Silver Rates</h2>
        <p>
          Live prices published by FNGOSDA (Federation of Nepal Gold & Silver Dealers), updated daily at 11 AM NPT.
        </p>
      </div>

      {!ok && (
        <div style={{
          background: 'var(--red-l)', border: '1px solid var(--red)',
          borderRadius: 'var(--r-md)', padding: '14px 20px',
          color: 'var(--red)', fontSize: '.875rem', marginBottom: 24,
        }}>
          ⚠ Could not load live rates right now. Please try again shortly.
        </div>
      )}

      {/* PRICE CARDS */}
      {today ? (
        <div className="gold-row">
          {PRICE_CARDS(today).map((c) => (
            <div key={c.label + c.unit} className="gold-card" style={{ borderLeft: `3px solid ${c.accent}` }}>
              <div className="gold-type">{c.label}</div>
              <div className="gold-price">₨{Number(c.price).toLocaleString('en-IN')}</div>
              <div className="gold-unit">{c.unit} · {c.sub}</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ color: 'var(--ink4)', fontSize: '.9rem' }}>Loading prices…</div>
      )}

      {/* RECHARTS CHART — client component */}
      <div style={{ marginTop: 36 }}>
        <h3 style={{ fontWeight: 500, marginBottom: 16 }}>Price history</h3>
        <div className="tool-wrap" style={{ padding: 24 }}>
          <GoldChartClient initialHistory={history} />
        </div>
      </div>

      {/* INFO */}
      <div style={{
        marginTop: 20, padding: '16px 20px',
        background: 'var(--surf2)', borderRadius: 'var(--r-sm)',
        borderLeft: '3px solid var(--gold)', fontSize: '.82rem', color: 'var(--ink3)',
      }}>
        <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>Note:</strong>{' '}
        1 tola = 11.66 grams = 100 lal. Prices in Nepalese Rupees (NPR). Source: FNGOSDA.
      </div>

      {/* SEO CONTENT */}
      <section style={{ marginTop: 48, maxWidth: 680 }}>
        <h3 style={{ fontWeight: 500, marginBottom: 12 }}>About Gold Prices in Nepal</h3>
        <p style={{ fontSize: '.9rem', marginBottom: 10 }}>
          <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>Hallmark gold</strong> (99.9% pure) and{' '}
          <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>Tajabi gold</strong> (99.5% pure) are
          the two standard grades traded in Nepal. Prices are set daily by FNGOSDA and are the reference
          for all authorised gold dealers across the country.
        </p>
        <p style={{ fontSize: '.9rem' }}>
          Gold is measured in <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>tola</strong>{' '}
          (11.66g) in Nepal, a traditional South Asian unit. International markets use troy ounce (31.1g).
          Nepal's gold price tracks global XAU/USD rates adjusted for INR cross-rate, import duty, and
          FNGOSDA margins.
        </p>
      </section>
    </div>
  );
}
