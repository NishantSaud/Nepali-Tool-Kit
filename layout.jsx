// frontend/app/layout.jsx
// ─────────────────────────────────────────────────────────────
// Root layout — wraps every page with Nav, fonts, SEO metadata
// ─────────────────────────────────────────────────────────────

import { DM_Sans, DM_Mono } from 'next/font/google';
import Nav from '../components/Nav';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  axes: ['opsz'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

// ── Default metadata (overridden per-page) ───────────────────
export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.nepaltoolkit.com'),
  title: {
    default: 'NepalToolkit — NRB Forex Rates, Date Converter, Gold Price & QR Generator',
    template: '%s | NepalToolkit',
  },
  description:
    'Free tools for Nepal: live NRB exchange rates, Bikram Sambat date converter, gold & silver prices from FNGOSDA, and QR code generator. Updated daily.',
  keywords: [
    'NRB exchange rate today',
    'Nepal forex rate',
    'Bikram Sambat date converter',
    'BS to AD converter',
    'nepali date converter',
    'gold price Nepal today',
    'suno ko bhaau nepal',
    'QR code generator Nepal',
    'dollar rate nepal today',
  ],
  openGraph: {
    type:        'website',
    locale:      'en_NP',
    url:         'https://www.nepaltoolkit.com',
    siteName:    'NepalToolkit',
    title:       'NepalToolkit — Free Tools for Nepal',
    description: 'NRB forex rates, date converter, gold prices & QR code — all in one place.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'NepalToolkit' }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'NepalToolkit — Free Tools for Nepal',
    description: 'NRB forex rates, BS/AD date converter, gold & silver prices, QR generator.',
    images:      ['/og-image.png'],
  },
  robots: {
    index:  true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: 'https://www.nepaltoolkit.com',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmMono.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
        <footer style={{
          borderTop: '1px solid var(--border)',
          background: 'var(--surface)',
          padding: '32px 24px',
          textAlign: 'center',
          fontSize: '.82rem',
          color: 'var(--ink4)',
        }}>
          <strong style={{ color: 'var(--ink2)', fontWeight: 500 }}>NepalToolkit</strong>
          &nbsp;·&nbsp; Data: NRB, FNGOSDA
          &nbsp;·&nbsp; Built with Next.js + Supabase
          &nbsp;·&nbsp; Free for everyone
        </footer>
      </body>
    </html>
  );
}
