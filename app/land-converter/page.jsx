// frontend/app/land-converter/page.jsx
// ─────────────────────────────────────────────────────────────
// Nepali Land Unit Converter
// Convert between Ropani, Aana, Paisa, Daam, and metric units
// ─────────────────────────────────────────────────────────────

import LandConverterClient from '../../components/LandConverterClient';
import PageHeader from '../../components/ui/PageHeader';
import Container from '../../components/ui/Container';
import Badge from '../../components/ui/Badge';

export const revalidate = false;

export const metadata = {
  title: 'Nepali Land Unit Converter | Ropani to Sq Ft | Bigha to Kattha',
  description:
    'Free land measurement converter for Nepal. Convert Ropani, Aana, Paisa, Daam to square feet, square meters, and hectares. Supports Bigha-Kattha system for Terai region.',
  alternates: { canonical: 'https://www.nepaltoolkit.com/land-converter' },
  openGraph: {
    title: 'Nepali Land Unit Converter | NepalToolkit',
    description: 'Convert traditional Nepali land units instantly',
    url: 'https://www.nepaltoolkit.com/land-converter',
  },
};

export default function LandConverterPage() {
  return (
    <Container>
      <PageHeader
        eyebrow={<Badge variant="primary">Tool 08</Badge>}
        title="Land Unit Converter"
        description="Convert between traditional Nepali land measurement units and metric units. Supports Ropani-Aana-Paisa-Daam system and Bigha-Kattha-Dhur system."
      />

      <LandConverterClient />

      <section style={{ marginTop: 48, maxWidth: 680 }}>
        <h3 style={{ fontWeight: 500, marginBottom: 12 }}>Conversion Reference</h3>
        
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: 24,
        }}>
          <table style={{ width: '100%', fontSize: '.85rem', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>Unit</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Square Feet</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Square Meters</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['1 Ropani', '5,476', '508.74'],
                ['1 Aana', '342.25', '31.80'],
                ['1 Paisa', '85.56', '7.95'],
                ['1 Daam', '21.39', '1.99'],
                ['1 Bigha', '72,900', '6,773'],
                ['1 Kattha', '3,645', '338.63'],
                ['1 Dhur', '182.25', '16.93'],
              ].map(([unit, sqft, sqm]) => (
                <tr key={unit} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 500 }}>{unit}</td>
                  <td style={{ padding: '8px 12px', textAlign: 'right' }}>{sqft}</td>
                  <td style={{ padding: '8px 12px', textAlign: 'right' }}>{sqm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 style={{ fontWeight: 500, margin: '24px 0 12px' }}>Traditional Relationships</h3>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginBottom: 24,
        }}>
          {[
            '1 Ropani = 16 Aana',
            '1 Aana = 4 Paisa',
            '1 Paisa = 4 Daam',
            '1 Bigha = 20 Kattha',
            '1 Kattha = 20 Dhur',
          ].map((relation) => (
            <div key={relation} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)', padding: '10px 12px', textAlign: 'center',
            }}>
              {relation}
            </div>
          ))}
        </div>

        <div style={{
          background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: 20,
        }}>
          <h3 style={{ fontWeight: 500, marginTop: 0, marginBottom: 8 }}>📋 Tips for Land Transactions</h3>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: '.9rem' }}>
            <li>Always verify measurements in official deed documents</li>
            <li>Use government-approved survey maps for verification</li>
            <li>Check land pooling zones (affects property value)</li>
            <li>Confirm road access and land classification before purchase</li>
          </ul>
        </div>
      </section>
    </Container>
  );
}