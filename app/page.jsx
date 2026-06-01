import Link from 'next/link';

export const metadata = {
  title: 'NepalToolkit — Free utility tools for Nepal',
  description:
    'Free tools for Nepal: NRB forex rates, Bikram Sambat date converter, gold & silver prices, and QR code generation.',
  alternates: { canonical: 'https://www.nepaltoolkit.com' },
};

const TOOLS = [
  { href: '/date-converter', title: 'Date Converter', description: 'Convert between Bikram Sambat (BS) and Gregorian (AD).', label: 'Tool 01' },
  { href: '/nrb-rates', title: 'Forex Rates', description: 'Official NRB exchange rates for 30+ currencies.', label: 'Tool 02' },
  { href: '/gold-silver', title: 'Gold & Silver', description: 'Live gold, silver and price history from FNGOSDA.', label: 'Tool 03' },
  { href: '/qr-generator', title: 'QR Code Generator', description: 'Create QR codes for URLs, text, phone numbers, and email.', label: 'Tool 04' },
];

export default function HomePage() {
  return (
    <div className="page" style={{ paddingTop: 0 }}>
      <div className="page-header">
        <div className="eyebrow">NepalToolkit</div>
        <h1>Free tools for Nepal</h1>
        <p>
          One place for NRB exchange rates, Nepali date conversion, gold and silver prices,
          and QR code generation.
        </p>
      </div>

      <div style={{ display: 'grid', gap: 20, marginTop: 24 }}>
        {TOOLS.map((tool) => (
          <Link key={tool.href} href={tool.href} className="tool-card" style={{ padding: 24, border: '1px solid var(--border)', borderRadius: 'var(--r-md)', textDecoration: 'none', color: 'inherit' }}>
            <div style={{ fontSize: '.82rem', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink4)', marginBottom: 8 }}>
              {tool.label}
            </div>
            <h2 style={{ margin: '0 0 10px', fontSize: '1.2rem' }}>{tool.title}</h2>
            <p style={{ margin: 0, color: 'var(--ink3)' }}>{tool.description}</p>
          </Link>
        ))}
      </div>

      <section style={{ marginTop: 48, maxWidth: 680 }}>
        <h3 style={{ fontWeight: 500, marginBottom: 12 }}>Why NepalToolkit?</h3>
        <p style={{ fontSize: '.9rem', marginBottom: 10 }}>
          NepalToolkit brings essential local utilities into a single web app. Each tool is built
          to work independently so the date converter and QR generator stay available even if
          external data sources are unreachable.
        </p>
      </section>
    </div>
  );
}
