// frontend/app/qr-generator/page.jsx
// ─────────────────────────────────────────────────────────────
// QR Code Generator — pure client-side, zero API dependency
// ─────────────────────────────────────────────────────────────
import QRGeneratorClient from '../../components/QRGeneratorClient';
import PageHeader from '../../components/ui/PageHeader';
import Container from '../../components/ui/Container';
import Badge from '../../components/ui/Badge';

export const revalidate = false; // static — no server data needed

export const metadata = {
  title: 'QR Code Generator — Free, Instant, No Login',
  description:
    'Generate QR codes for URLs, text, phone numbers, and emails instantly. Download as PNG. Free, no account required.',
  alternates: { canonical: 'https://www.nepaltoolkit.com/qr-generator' },
  openGraph: {
    title:       'Free QR Code Generator | NepalToolkit',
    description: 'Generate and download QR codes instantly. No account, no limits.',
    url:         'https://www.nepaltoolkit.com/qr-generator',
  },
};

export default function QRGeneratorPage() {
  return (
    <Container>
      <PageHeader
        eyebrow={<Badge variant="primary">Tool 04</Badge>}
        title="QR Code Generator"
        description="Generate QR codes for any URL, text, phone, or email — instantly, with no account required. All processing happens in your browser."
      />

      <QRGeneratorClient />

      {/* STEP GUIDE */}
      <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {[
          { step: '01', title: 'Enter content', desc: 'Type or paste a URL, plain text, phone number, or email address.' },
          { step: '02', title: 'Customise',     desc: 'Choose the output size (128–1024px), error correction level, and color.' },
          { step: '03', title: 'Download',      desc: 'Click Download PNG to save a high-resolution QR code ready to print or share.' },
        ].map(({ step, title, desc }) => (
          <div key={step} style={{ padding: '20px 22px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', letterSpacing: '.08em', color: 'var(--text-muted)', marginBottom: 8 }}>STEP {step}</div>
            <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: 6 }}>{title}</h3>
            <p style={{ fontSize: '.85rem' }}>{desc}</p>
          </div>
        ))}
      </div>

      {/* SEO */}
      <section style={{ marginTop: 48, maxWidth: 680 }}>
        <h3 style={{ fontWeight: 500, marginBottom: 12 }}>About QR Code Error Correction</h3>
        <p style={{ fontSize: '.9rem', marginBottom: 10 }}>
          QR codes support four levels of error correction, allowing them to remain readable even if
          part of the code is damaged or obscured.{' '}
          <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Low (7%)</strong> fits more data;{' '}
          <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>High (30%)</strong> makes the code
          more robust. For printed materials or codes with a logo overlay, use Quartile or High.
        </p>
      </section>
    </Container>
  );
}
