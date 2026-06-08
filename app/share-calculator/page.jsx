// frontend/app/share-calculator/page.jsx
// ─────────────────────────────────────────────────────────────
// Share Calculator for NEPSE Trades
// Calculate profit, brokerage fees, and capital gains tax
// ─────────────────────────────────────────────────────────────

import ShareCalculatorClient from '../../components/ShareCalculatorClient';
import PageHeader from '../../components/ui/PageHeader';
import Container from '../../components/ui/Container';
import Badge from '../../components/ui/Badge';

export const revalidate = false;

export const metadata = {
  title: 'Share Calculator Nepal | Stock Profit & Tax Calculator',
  description:
    'Calculate stock trading profit, brokerage fees, and capital gains tax for NEPSE trades. Supports all brokerage firms in Nepal with tiered commission rates.',
  alternates: { canonical: 'https://www.nepaltoolkit.com/share-calculator' },
  openGraph: {
    title: 'Share Calculator Nepal | NepalToolkit',
    description: 'Calculate your stock trading profits and taxes',
    url: 'https://www.nepaltoolkit.com/share-calculator',
  },
};

export default function ShareCalculatorPage() {
  return (
    <Container>
      <PageHeader
        eyebrow={<Badge variant="primary">Tool 07</Badge>}
        title="Share Calculator"
        description="Calculate profit or loss on your stock trades including brokerage fees, SEBON fee, CDS fee, DP fee, and capital gains tax."
      />

      <ShareCalculatorClient />

      <section style={{ marginTop: 48, maxWidth: 680 }}>
        <h3 style={{ fontWeight: 500, marginBottom: 12 }}>Share Trading Costs in Nepal</h3>
        
        <h3 style={{ fontWeight: 500, margin: '24px 0 12px' }}>Brokerage Commission Rates (as per SEBON)</h3>
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: 24,
        }}>
          <table style={{ width: '100%', fontSize: '.85rem', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>Transaction Value</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Rate</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['First ₹50,000', '0.40%'],
                ['Next ₹2,50,000', '0.37%'],
                ['Next ₹7,00,000', '0.34%'],
                ['Next ₹20,00,000', '0.30%'],
                ['Above ₹30,00,000', '0.27%'],
              ].map(([range, rate]) => (
                <tr key={range} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '8px 12px' }}>{range}</td>
                  <td style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 500 }}>{rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 style={{ fontWeight: 500, margin: '24px 0 12px' }}>Capital Gains Tax (Budget 2026)</h3>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginBottom: 24,
        }}>
          {[
            { investor: 'Individual', rate: '7.5%' },
            { investor: 'Institutional', rate: '10%' },
            { investor: 'Foreign Investors', rate: '15%' },
          ].map((item) => (
            <div key={item.investor} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)', padding: '12px',
            }}>
              <div style={{ fontWeight: 500 }}>{item.investor}</div>
              <div style={{ fontSize: '.9rem', color: 'var(--color-primary)', marginTop: 4 }}>{item.rate}</div>
            </div>
          ))}
        </div>

        <div style={{
          background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: 20,
        }}>
          <h3 style={{ fontWeight: 500, marginTop: 0, marginBottom: 8 }}>💰 Additional Fees</h3>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: '.9rem' }}>
            <li>SEBON Fee: 0.015% of transaction value</li>
            <li>CDS & Clearing Fee: 0.02% of transaction value</li>
            <li>DP Fee: ₹25 per transaction (varies by broker)</li>
          </ul>
        </div>
      </section>
    </Container>
  );
}