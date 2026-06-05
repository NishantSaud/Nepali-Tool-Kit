// import Link from 'next/link';

// export const metadata = {
//   title: 'NepalToolkit — Free utility tools for Nepal',
//   description:
//     'Free tools for Nepal: NRB forex rates, Bikram Sambat date converter, gold & silver prices, and QR code generation.',
//   alternates: { canonical: 'https://www.nepaltoolkit.com' },
// };

// const TOOLS = [
//   { href: '/date-converter', title: 'Date Converter', description: 'Convert between Bikram Sambat (BS) and Gregorian (AD).', label: 'Tool 01' },
//   { href: '/nrb-rates', title: 'Forex Rates', description: 'Official NRB exchange rates for 30+ currencies.', label: 'Tool 02' },
//   { href: '/gold-silver', title: 'Gold & Silver', description: 'Live gold, silver and price history from FNGOSDA.', label: 'Tool 03' },
//   { href: '/qr-generator', title: 'QR Code Generator', description: 'Create QR codes for URLs, text, phone numbers, and email.', label: 'Tool 04' },
// ];

// export default function HomePage() {
//   return (
//     <div className="page" style={{ paddingTop: 0 }}>
//       <div className="page-header">
//         <div className="eyebrow">NepalToolkit</div>
//         <h1>Free tools for Nepal</h1>
//         <p>
//           One place for NRB exchange rates, Nepali date conversion, gold and silver prices,
//           and QR code generation.
//         </p>
//       </div>

//       <div style={{ display: 'grid', gap: 20, marginTop: 24 }}>
//         {TOOLS.map((tool) => (
//           <Link key={tool.href} href={tool.href} className="tool-card" style={{ padding: 24, border: '1px solid var(--border)', borderRadius: 'var(--r-md)', textDecoration: 'none', color: 'inherit' }}>
//             <div style={{ fontSize: '.82rem', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink4)', marginBottom: 8 }}>
//               {tool.label}
//             </div>
//             <h2 style={{ margin: '0 0 10px', fontSize: '1.2rem' }}>{tool.title}</h2>
//             <p style={{ margin: 0, color: 'var(--ink3)' }}>{tool.description}</p>
//           </Link>
//         ))}
//       </div>

//       <section style={{ marginTop: 48, maxWidth: 680 }}>
//         <h3 style={{ fontWeight: 500, marginBottom: 12 }}>Why NepalToolkit?</h3>
//         <p style={{ fontSize: '.9rem', marginBottom: 10 }}>
//           NepalToolkit brings essential local utilities into a single web app. Each tool is built
//           to work independently so the date converter and QR generator stay available even if
//           external data sources are unreachable.
//         </p>
//       </section>
//     </div>
//   );
// }


// frontend/app/page.jsx
import Link from 'next/link';

export const metadata = {
  title: 'NepalToolkit — Free utility tools for Nepal',
  description:
    'Free tools for Nepal: NRB forex rates, Bikram Sambat date converter, gold & silver prices, QR code generation, EMI calculator, SIP calculator, share calculator, and land unit converter.',
  alternates: { canonical: 'https://www.nepaltoolkit.com' },
};

const TOOLS = [
  { 
    href: '/date-converter', 
    title: 'Date Converter', 
    description: 'Convert between Bikram Sambat (BS) and Gregorian (AD).', 
    label: 'Tool 01',
    category: 'calendar'
  },
  { 
    href: '/nrb-rates', 
    title: 'Forex Rates', 
    description: 'Official NRB exchange rates for 30+ currencies.', 
    label: 'Tool 02',
    category: 'finance'
  },
  { 
    href: '/gold-silver', 
    title: 'Gold & Silver', 
    description: 'Live gold, silver and price history from FNGOSDA.', 
    label: 'Tool 03',
    category: 'finance'
  },
  { 
    href: '/qr-generator', 
    title: 'QR Code Generator', 
    description: 'Create QR codes for URLs, text, phone numbers, and email.', 
    label: 'Tool 04',
    category: 'utility'
  },
  { 
    href: '/emi-calculator', 
    title: 'EMI Calculator', 
    description: 'Calculate monthly loan installments for home, vehicle, or personal loans.', 
    label: 'Tool 05',
    category: 'finance'
  },
  { 
    href: '/sip-calculator', 
    title: 'SIP Calculator', 
    description: 'Calculate returns on systematic investment plans in mutual funds.', 
    label: 'Tool 06',
    category: 'finance'
  },
  { 
    href: '/share-calculator', 
    title: 'Share Calculator', 
    description: 'Calculate profit, brokerage fees, and capital gains tax on NEPSE trades.', 
    label: 'Tool 07',
    category: 'finance'
  },
  { 
    href: '/land-converter', 
    title: 'Land Unit Converter', 
    description: 'Convert Ropani, Aana, Paisa, Daam to square feet, meters, and hectares.', 
    label: 'Tool 08',
    category: 'utility'
  },
];

// Group tools by category for better organization
const categories = {
  calendar: { name: 'Calendar & Date', icon: '📅' },
  finance: { name: 'Finance & Investment', icon: '💰' },
  utility: { name: 'Utilities', icon: '🛠️' },
};

export default function HomePage() {
  return (
    <div className="page" style={{ paddingTop: 0 }}>
      <div className="page-header">
        <div className="eyebrow">NepalToolkit</div>
        <h1>Free tools for Nepal</h1>
        <p>
          One place for NRB exchange rates, Nepali date conversion, gold and silver prices,
          QR code generation, financial calculators, and land unit conversion.
        </p>
      </div>

      {/* Tools by Category */}
      {Object.entries(categories).map(([categoryKey, category]) => {
        const categoryTools = TOOLS.filter(tool => tool.category === categoryKey);
        if (categoryTools.length === 0) return null;
        
        return (
          <div key={categoryKey} style={{ marginTop: categoryKey === 'calendar' ? 0 : 40 }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8, 
              marginBottom: 16,
              paddingBottom: 8,
              borderBottom: '1px solid var(--border)'
            }}>
              <span style={{ fontSize: '1.5rem' }}>{category.icon}</span>
              <h3 style={{ fontWeight: 500, margin: 0, fontSize: '1.1rem' }}>
                {category.name}
              </h3>
            </div>
            
            <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
              {categoryTools.map((tool) => (
                <Link 
                  key={tool.href} 
                  href={tool.href} 
                  className="tool-card" 
                  style={{ 
                    padding: 20, 
                    border: '1px solid var(--border)', 
                    borderRadius: 'var(--r-md)', 
                    textDecoration: 'none', 
                    color: 'inherit',
                    transition: 'all 0.2s ease',
                    background: 'var(--surface)',
                  }}
                >
                  <div style={{ 
                    fontSize: '.75rem', 
                    letterSpacing: '.08em', 
                    textTransform: 'uppercase', 
                    color: 'var(--primary)',
                    marginBottom: 8,
                    fontWeight: 500,
                  }}>
                    {tool.label}
                  </div>
                  <h3 style={{ margin: '0 0 8px', fontSize: '1.1rem', fontWeight: 600 }}>
                    {tool.title}
                  </h3>
                  <p style={{ margin: 0, color: 'var(--ink3)', fontSize: '.85rem', lineHeight: 1.4 }}>
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        );
      })}

      {/* Popular Calculations Section */}
      <section style={{ marginTop: 48 }}>
        <div style={{ 
          background: 'var(--surf2)', 
          borderRadius: 'var(--r-lg)', 
          padding: 24,
        }}>
          <h3 style={{ fontWeight: 500, marginBottom: 16, fontSize: '1rem' }}>
            🔢 Quick Calculations
          </h3>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 12,
          }}>
            <QuickCalcBadge label="₹50L loan @10.5% for 20y → EMI ₹49,900" />
            <QuickCalcBadge label="₹10k SIP @12% for 10y → ₹23.2L" />
            <QuickCalcBadge label="100 shares bought @250 sold @300 → Profit ₹4,760" />
            <QuickCalcBadge label="1 Ropani = 5,476 sq ft = 508.74 m²" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section style={{ marginTop: 48, maxWidth: 680 }}>
        <h3 style={{ fontWeight: 500, marginBottom: 12 }}>Why NepalToolkit?</h3>
        <p style={{ fontSize: '.9rem', marginBottom: 10 }}>
          NepalToolkit brings essential local utilities into a single web app. Each tool is built
          to work independently — so the date converter and QR generator stay available even if
          external data sources are unreachable.
        </p>
        <p style={{ fontSize: '.9rem', marginBottom: 10 }}>
          Our financial calculators help you make informed decisions about loans, investments,
          and stock trading in Nepal's unique market context.
        </p>
        
        {/* Feature Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
          gap: 16, 
          marginTop: 32 
        }}>
          <FeatureItem 
            title="100% Client-Side" 
            description="All calculations happen in your browser — no data leaves your device."
          />
          <FeatureItem 
            title="No API Downtime" 
            description="Core tools work offline. Only live rates require internet."
          />
          <FeatureItem 
            title="ISR Ready" 
            description="Static pages with client-side interactivity for instant loading."
          />
          <FeatureItem 
            title="Nepal-Specific" 
            description="Built for Nepali calendars, land units, and financial regulations."
          />
        </div>
      </section>
    </div>
  );
}

// Helper component for quick calculation badges
function QuickCalcBadge({ label }) {
  return (
    <span style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--r-full)',
      padding: '6px 14px',
      fontSize: '.75rem',
      color: 'var(--ink2)',
      whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  );
}

// Helper component for feature items
function FeatureItem({ title, description }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--r-md)',
      padding: 14,
    }}>
      <div style={{ fontWeight: 500, fontSize: '.85rem', marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: '.75rem', color: 'var(--ink3)', lineHeight: 1.4 }}>{description}</div>
    </div>
  );
}