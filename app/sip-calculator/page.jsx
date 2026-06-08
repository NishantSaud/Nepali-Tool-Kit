// frontend/app/sip-calculator/page.jsx
// ─────────────────────────────────────────────────────────────
// SIP Calculator for Nepal Mutual Funds
// Calculate returns on systematic investment plans
// ─────────────────────────────────────────────────────────────

import SIPCalculatorClient from '../../components/SIPCalculatorClient';
import PageHeader from '../../components/ui/PageHeader';
import Container from '../../components/ui/Container';
import Badge from '../../components/ui/Badge';

export const revalidate = false;

export const metadata = {
  title: 'SIP Calculator Nepal | Mutual Fund Returns Calculator',
  description:
    'Calculate returns on monthly SIP investments in Nepali mutual funds like NIBL Sambala, NMB 50, Siddhartha Equity Fund, and more.',
  alternates: { canonical: 'https://www.nepaltoolkit.com/sip-calculator' },
  openGraph: {
    title: 'SIP Calculator Nepal | NepalToolkit',
    description: 'Calculate your mutual fund investment returns',
    url: 'https://www.nepaltoolkit.com/sip-calculator',
  },
};

export default function SIPCalculatorPage() {
  return (
    <Container>
      <PageHeader
        eyebrow={<Badge variant="primary">Tool 06</Badge>}
        title="SIP Calculator"
        description="Calculate returns on your systematic investment plans in mutual funds. See how compounding grows your wealth over time."
      />

      <SIPCalculatorClient />

      <section style={{ marginTop: 48, maxWidth: 680 }}>
        <h3 style={{ fontWeight: 500, marginBottom: 12 }}>Systematic Investment Plans in Nepal</h3>
        <p style={{ fontSize: '.9rem', marginBottom: 10 }}>
          SIP allows you to invest a fixed amount regularly in mutual funds. Nepal's mutual fund
          market has grown significantly with several options for investors.
        </p>

        <h3 style={{ fontWeight: 500, margin: '32px 0 12px' }}>Popular Mutual Funds in Nepal</h3>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12,
        }}>
          {[
            { name: 'NIBL Sambala Fund', returns: '10-15%', risk: 'Moderate' },
            { name: 'NMB 50 Fund', returns: '12-16%', risk: 'Moderate-High' },
            { name: 'Siddhartha Equity Fund', returns: '11-14%', risk: 'High' },
            { name: 'Sanima Equity Fund', returns: '9-13%', risk: 'Moderate' },
            { name: 'NIC Asia Growth Fund', returns: '10-14%', risk: 'Moderate' },
            { name: 'Prabhu Select Fund', returns: '11-15%', risk: 'Moderate-High' },
          ].map((item) => (
            <div key={item.name} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)', padding: '12px',
            }}>
              <div style={{ fontWeight: 500 }}>{item.name}</div>
              <div style={{ fontSize: '.8rem', color: 'var(--text-tertiary)', marginTop: 4 }}>
                Returns: {item.returns} • Risk: {item.risk}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: 20, marginTop: 32,
        }}>
          <h3 style={{ fontWeight: 500, marginTop: 0, marginBottom: 8 }}>📈 Power of Compounding</h3>
          <p style={{ fontSize: '.9rem', margin: 0 }}>
            Starting early makes a huge difference. A ₹10,000 monthly SIP for 20 years at 12%
            returns ~₹1 crore, while waiting 5 years reduces to ~₹50 lakhs.
          </p>
        </div>
      </section>
    </Container>
  );
}