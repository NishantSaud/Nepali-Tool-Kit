// frontend/app/emi-calculator/page.jsx
// ─────────────────────────────────────────────────────────────
// EMI Calculator for Nepal
// Calculate monthly loan installments for home, vehicle, personal loans
// ─────────────────────────────────────────────────────────────

import EMICalculatorClient from '../../components/EMICalculatorClient';
import PageHeader from '../../components/ui/PageHeader';
import Container from '../../components/ui/Container';
import Badge from '../../components/ui/Badge';

export const revalidate = false;

export const metadata = {
  title: 'EMI Calculator Nepal | Home, Vehicle & Personal Loan EMI',
  description:
    'Calculate monthly loan installments for home loans, car loans, and personal loans. Compare interest rates across Nabil, Global IME, Kumari, and other Nepali banks.',
  alternates: { canonical: 'https://www.nepaltoolkit.com/emi-calculator' },
  openGraph: {
    title: 'EMI Calculator Nepal | NepalToolkit',
    description: 'Calculate your monthly loan installments easily',
    url: 'https://www.nepaltoolkit.com/emi-calculator',
  },
};

export default function EMICalculatorPage() {
  return (
    <Container>
      <PageHeader
        eyebrow={<Badge variant="primary">Tool 05</Badge>}
        title="EMI Calculator"
        description="Calculate your monthly loan installments for home loans, vehicle loans, or personal loans. Get a complete breakdown of principal and interest."
      />

      <EMICalculatorClient />

      <section style={{ marginTop: 48, maxWidth: 680 }}>
        <h3 style={{ fontWeight: 500, marginBottom: 12 }}>Understanding EMI in Nepal</h3>
        <p style={{ fontSize: '.9rem', marginBottom: 10 }}>
          Equated Monthly Installment (EMI) is the fixed amount you pay to financial institutions
          each month until your loan is fully repaid. In Nepal, banks and finance companies use
          the <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>reducing balance method</strong> to calculate EMI.
        </p>
        <p style={{ fontSize: '.9rem', marginBottom: 10 }}>
          <strong>EMI Formula:</strong> EMI = P × r × (1 + r)<sup>n</sup> / ((1 + r)<sup>n</sup> - 1)
          <br />
          Where: P = Principal loan amount, r = Monthly interest rate, n = Loan tenure in months
        </p>

        <h3 style={{ fontWeight: 500, margin: '32px 0 12px' }}>Typical Loan Rates in Nepal</h3>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12,
        }}>
          {[
            { type: 'Home Loan', rate: '8-12%', tenure: 'Up to 30 years' },
            { type: 'Vehicle Loan', rate: '9-14%', tenure: 'Up to 7 years' },
            { type: 'Personal Loan', rate: '12-18%', tenure: 'Up to 5 years' },
            { type: 'Education Loan', rate: '8-11%', tenure: 'Up to 10 years' },
          ].map((item) => (
            <div key={item.type} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)', padding: '12px',
            }}>
              <div style={{ fontWeight: 500 }}>{item.type}</div>
              <div style={{ fontSize: '.8rem', color: 'var(--text-tertiary)', marginTop: 4 }}>
                {item.rate} • {item.tenure}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: 20, marginTop: 32,
        }}>
          <h3 style={{ fontWeight: 500, marginTop: 0, marginBottom: 8 }}>💡 Tips for Lower EMI</h3>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: '.9rem' }}>
            <li>Increase down payment to reduce loan amount</li>
            <li>Choose longer tenure (but you'll pay more total interest)</li>
            <li>Compare interest rates across banks (Nabil, Global IME, Kumari, etc.)</li>
            <li>Consider prepayment options to reduce principal</li>
          </ul>
        </div>
      </section>
    </Container>
  );
}