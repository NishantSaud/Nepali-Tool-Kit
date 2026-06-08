// frontend/app/date-converter/page.jsx
// ─────────────────────────────────────────────────────────────
// Bikram Sambat ↔ Gregorian Date Converter
// 100% client-side — no API, no downtime risk
// ─────────────────────────────────────────────────────────────

import DateConverterClient from '../../components/DateConverterClient';
import PageHeader from '../../components/ui/PageHeader';
import Container from '../../components/ui/Container';
import Badge from '../../components/ui/Badge';

// Static page — no revalidation needed (pure client logic)
export const revalidate = false;

export const metadata = {
  title: 'Nepali Date Converter — BS to AD & AD to BS',
  description:
    'Convert between Bikram Sambat (BS) and Gregorian (AD) calendar dates instantly. Calculate your age in both systems. Supports 1975 BS to 2099 BS.',
  alternates: { canonical: 'https://www.nepaltoolkit.com/date-converter' },
  openGraph: {
    title:       'Nepali Date Converter BS to AD | NepalToolkit',
    description: 'Free Bikram Sambat to Gregorian date converter with age calculation.',
    url:         'https://www.nepaltoolkit.com/date-converter',
  },
};

export default function DateConverterPage() {
  return (
    <Container>
      <PageHeader
        eyebrow={<Badge variant="primary">Tool 01</Badge>}
        title="Date Converter"
        description="Convert between Bikram Sambat (BS) and Gregorian (AD) instantly. No server required — all conversions run locally in your browser."
      />

      {/* CLIENT COMPONENT — handles all interactive state */}
      <DateConverterClient />

      {/* SEO CONTENT */}
      <section style={{ marginTop: 48, maxWidth: 680 }}>
        <h3 style={{ fontWeight: 500, marginBottom: 12 }}>About the Bikram Sambat Calendar</h3>
        <p style={{ fontSize: '.9rem', marginBottom: 10 }}>
          Bikram Sambat (BS), also known as the Vikram Samvat, is Nepal's official national calendar.
          It runs <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>approximately 56 years and 8.5
          months ahead</strong> of the Gregorian calendar. The new year (1 Baisakh) typically falls in
          mid-April AD.
        </p>
        <p style={{ fontSize: '.9rem', marginBottom: 10 }}>
          The BS year has 12 months, but unlike the Gregorian calendar, the number of days in each month
          is not fixed — it varies between 29 and 32 days and is determined by astronomical calculations
          each year. This converter uses a pre-computed lookup table covering{' '}
          <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>2000 BS to 2084 BS</strong>.
        </p>
        <p style={{ fontSize: '.9rem' }}>
          The npm package used internally is{' '}
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', background: 'var(--bg-tertiary)', padding: '2px 6px', borderRadius: 4 }}>
            @remotemerge/nepali-date-converter
          </code>.
        </p>

        {/* QUICK REFERENCE TABLE */}
        <h3 style={{ fontWeight: 500, margin: '32px 0 12px' }}>BS Month Names</h3>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8,
        }}>
          {[
            ['1','Baisakh (बैशाख)'],['2','Jestha (जेठ)'],['3','Ashadh (असार)'],
            ['4','Shrawan (साउन)'],['5','Bhadra (भदौ)'],['6','Ashwin (असोज)'],
            ['7','Kartik (कार्तिक)'],['8','Mangsir (मंसिर)'],['9','Poush (पुष)'],
            ['10','Magh (माघ)'],['11','Falgun (फागुन)'],['12','Chaitra (चैत)'],
          ].map(([n, name]) => (
            <div key={n} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)', padding: '8px 12px',
              fontSize: '.82rem',
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginRight: 6 }}>{n}.</span>
              {name}
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
