// frontend/app/nrb-rates/page.jsx
// ─────────────────────────────────────────────────────────────
// NRB Exchange Rates — Server Component with ISR (30 min)
// ─────────────────────────────────────────────────────────────
import ForexGrid from '../../components/ForexGrid';

// ISR: rebuild this page every 30 minutes
export const revalidate = 1800;

export const metadata = {
  title: 'NRB Exchange Rates Today',
  description:
    'Live buying and selling rates published by Nepal Rastra Bank (NRB). USD, EUR, GBP, INR, AUD and 30+ currencies. Updated daily.',
  alternates: { canonical: 'https://www.nepaltoolkit.com/nrb-rates' },
  openGraph: {
    title:       'NRB Exchange Rates Today | NepalToolkit',
    description: 'Official NRB forex rates updated daily.',
    url:         'https://www.nepaltoolkit.com/nrb-rates',
  },
};

// Fetch on the server at build/revalidation time
async function getRates() {
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
    const res  = await fetch(`${base}/api/forex`, { next: { revalidate: 1800 } });
    if (!res.ok) throw new Error('API error');
    return res.json();
  } catch {
    return { ok: false, data: [] };
  }
}

export default async function NrbRatesPage() {
  const { data: rates, ok } = await getRates();
  const publishedDate = rates?.[0]?.published_on ?? null;

  return (
    <div className="page" style={{ paddingTop: 0 }}>
      {/* PAGE HEADER */}
      <div className="page-header">
        <div className="eyebrow">Tool 02</div>
        <h2>NRB Exchange Rates</h2>
        <p>
          Official buying and selling rates from Nepal Rastra Bank, updated daily at 11 AM NPT.
          {publishedDate && (
            <span style={{ color: 'var(--ink4)', marginLeft: 8 }}>
              Published: {new Date(publishedDate).toLocaleDateString('en-NP', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          )}
        </p>
      </div>

      {/* SERVICE DOWN BANNER — shown only if fetch failed */}
      {!ok && (
        <div style={{
          background: 'var(--red-l)', border: '1px solid var(--red)',
          borderRadius: 'var(--r-md)', padding: '14px 20px',
          color: 'var(--red)', fontSize: '.875rem', marginBottom: 24,
        }}>
          ⚠ Could not load live rates right now. Showing cached data or retry shortly.
        </div>
      )}

      {/* FOREX GRID — client component handles search + filter */}
      <ForexGrid initialData={rates ?? []} />

      {/* DISCLAIMER */}
      <div style={{
        marginTop: 28, padding: '16px 20px',
        background: 'var(--surf2)', borderRadius: 'var(--r-sm)',
        borderLeft: '3px solid var(--gold)', fontSize: '.82rem', color: 'var(--ink3)',
      }}>
        <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>Source:</strong>{' '}
        Nepal Rastra Bank (NRB) official FOREX API —{' '}
        <code style={{ fontFamily: 'var(--font-mono)', fontSize: '.8rem' }}>nrb.org.np/forex</code>.
        Rates are indicative and for NRB internal use. Commercial bank rates may vary.
      </div>

      {/* SEO CONTENT BLOCK */}
      <section style={{ marginTop: 48, maxWidth: 680 }}>
        <h3 style={{ fontWeight: 500, marginBottom: 12 }}>About NRB Exchange Rates</h3>
        <p style={{ fontSize: '.9rem', marginBottom: 10 }}>
          Nepal Rastra Bank (NRB) is the central bank of Nepal and the sole authority for publishing
          official foreign exchange rates. Rates are published every business day and cover over 30
          currencies used by Nepali banks, remittance companies, and importers.
        </p>
        <p style={{ fontSize: '.9rem' }}>
          The <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>buying rate</strong> is the
          price NRB pays to buy foreign currency from banks; the{' '}
          <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>selling rate</strong> is what banks
          pay NRB to purchase foreign currency. The mid-rate is the average of both.
        </p>
      </section>
    </div>
  );
}
