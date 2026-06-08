// app/layout.jsx
// ─────────────────────────────────────────────────────────────
// Root layout — Geist font, dark mode, Nav + Footer
// ─────────────────────────────────────────────────────────────

import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ThemeProvider from '../components/ThemeProvider';
import './globals.css';

// ── Default metadata (overridden per-page) ───────────────────
export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.nepaltoolkit.com'),
  title: {
    default: 'NepalToolkit — Essential Tools for Nepal',
    template: '%s | NepalToolkit',
  },
  description:
    'Free tools for Nepal: live NRB exchange rates, Bikram Sambat date converter, gold & silver prices, QR code generator, financial calculators, and land unit converter.',
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
    'EMI calculator Nepal',
    'SIP calculator Nepal',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_NP',
    url: 'https://www.nepaltoolkit.com',
    siteName: 'NepalToolkit',
    title: 'NepalToolkit — Essential Tools for Nepal',
    description: 'Exchange rates, date converter, gold prices, calculators & more — all in one place.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'NepalToolkit' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NepalToolkit — Essential Tools for Nepal',
    description: 'Exchange rates, date converter, gold prices, calculators & more.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: 'https://www.nepaltoolkit.com',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
