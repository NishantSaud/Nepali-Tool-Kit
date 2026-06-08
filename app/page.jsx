// app/page.jsx
// ─────────────────────────────────────────────────────────────
// Homepage — Server component that imports client-side content
// ─────────────────────────────────────────────────────────────

import HomePageClient from '../components/HomePageClient';

export const metadata = {
  title: 'NepalToolkit — Essential Tools for Nepal',
  description:
    'Free tools for Nepal: NRB forex rates, Bikram Sambat date converter, gold & silver prices, QR code generation, EMI calculator, SIP calculator, share calculator, and land unit converter.',
  alternates: { canonical: 'https://www.nepaltoolkit.com' },
};

export default function HomePage() {
  return <HomePageClient />;
}
