'use client';

// components/HomePageClient.jsx
// ─────────────────────────────────────────────────────────────
// Client component for homepage with styled-jsx
// ─────────────────────────────────────────────────────────────

import Link from 'next/link';
import Container from './ui/Container';
import Section from './ui/Section';
import Card from './ui/Card';
import Button from './ui/Button';
import Badge from './ui/Badge';

const TOOLS = [
  { href: '/date-converter', title: 'Date Converter', description: 'Convert between Bikram Sambat (BS) and Gregorian (AD) instantly.', icon: '📅', color: 'var(--color-primary)', bgColor: 'var(--color-primary-light)' },
  { href: '/nrb-rates', title: 'Forex Rates', description: 'Official NRB exchange rates for 30+ currencies, updated daily.', icon: '💱', color: 'var(--color-accent)', bgColor: 'var(--color-accent-light)' },
  { href: '/gold-silver', title: 'Gold & Silver', description: 'Live gold and silver prices with historical charts from FNGOSDA.', icon: '✨', color: '#B45309', bgColor: '#FEF3C7' },
  { href: '/qr-generator', title: 'QR Generator', description: 'Create QR codes for URLs, text, phone numbers, and email.', icon: '📱', color: 'var(--color-secondary)', bgColor: 'var(--color-secondary-light)' },
  { href: '/emi-calculator', title: 'EMI Calculator', description: 'Calculate monthly loan installments for home, vehicle, or personal loans.', icon: '🏦', color: '#059669', bgColor: '#DCFCE7' },
  { href: '/sip-calculator', title: 'SIP Calculator', description: 'Calculate returns on systematic investment plans in mutual funds.', icon: '📈', color: '#7C3AED', bgColor: '#EDE9FE' },
  { href: '/share-calculator', title: 'Share Calculator', description: 'Calculate profit, brokerage fees, and capital gains tax on NEPSE trades.', icon: '📊', color: '#DC2626', bgColor: '#FEE2E2' },
  { href: '/land-converter', title: 'Land Converter', description: 'Convert Ropani, Aana, Paisa, Daam to square feet, meters, and hectares.', icon: '🗺️', color: '#0891B2', bgColor: '#CFFAFE' },
];

const FEATURES = [
  { icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>), title: '100% Client-Side', description: 'All calculations happen in your browser — no data leaves your device.', color: 'var(--color-success)', bgColor: 'var(--color-success-light)' },
  { icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>), title: 'Updated Daily', description: 'Exchange rates and gold prices refresh automatically every morning.', color: 'var(--color-primary)', bgColor: 'var(--color-primary-light)' },
  { icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>), title: 'Built for Nepal', description: 'Nepali calendars, land units, NRB rates, and NEPSE-specific calculations.', color: 'var(--color-secondary)', bgColor: 'var(--color-secondary-light)' },
  { icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>), title: 'No Sign-Up Required', description: 'Every tool is free and works instantly — no account, no limits.', color: 'var(--color-accent)', bgColor: 'var(--color-accent-light)' },
];

export default function HomePageClient() {
  return (
    <>
      {/* ── Hero Section ──────────────────────────────────── */}
      <section className="hero">
        <div className="hero-glow" />
        <Container className="hero-content">
          <Badge variant="primary" dot>Nepal&apos;s Trusted Utility Platform</Badge>
          <h1 className="hero-title">
            Essential Tools<br />
            <span className="hero-title-accent">for Nepal</span>
          </h1>
          <p className="hero-subtitle">
            Everything from exchange rates and gold prices to Nepali calendars
            and financial calculators — in one place.
          </p>

          <div className="hero-actions">
            <Button href="#tools" variant="primary" size="xl">
              Explore Tools
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Button>
            <Button href="/nrb-rates" variant="secondary" size="xl">
              Latest Updates
            </Button>
          </div>

          <div className="hero-trust">
            {['Free Forever', 'Updated Daily', 'Built for Nepal', 'No Sign-Up'].map((label) => (
              <span key={label} className="hero-trust-item">
                <span className="hero-trust-check">✓</span>
                {label}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Features Section ──────────────────────────────── */}
      <Section variant="feature">
        <Container>
          <div className="section-header">
            <h2>Why NepalToolkit?</h2>
            <p className="section-subtitle">
              Built for speed, accuracy, and the specific needs of Nepali users.
            </p>
          </div>
          <div className="features-grid animate-stagger">
            {FEATURES.map((feature) => (
              <Card key={feature.title} variant="default" className="feature-card">
                <div className="feature-icon" style={{ background: feature.bgColor, color: feature.color }}>
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Tools Section ─────────────────────────────────── */}
      <Section id="tools">
        <Container>
          <div className="section-header">
            <h2>All Tools</h2>
            <p className="section-subtitle">
              Everything you need, from finance to everyday utilities.
            </p>
          </div>
          <div className="tools-grid animate-stagger">
            {TOOLS.map((tool) => (
              <Card key={tool.href} href={tool.href} variant="tool" className="tool-card-item">
                <div className="tool-card-icon" style={{ background: tool.bgColor, color: tool.color }}>
                  {tool.icon}
                </div>
                <h3 className="tool-card-title">{tool.title}</h3>
                <p className="tool-card-desc">{tool.description}</p>
                <span className="tool-card-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── CTA Section ───────────────────────────────────── */}
      <Section variant="cta">
        <Container>
          <div className="cta-card">
            <div className="cta-glow" />
            <h2 className="cta-title">Start using NepalToolkit today</h2>
            <p className="cta-subtitle">
              No sign-up, no fees, no ads. Just fast, reliable tools built for Nepal.
            </p>
            
            {/* Optimized Button Interface */}
            <Link href="#tools" className="cta-custom-button">
              Explore All Tools
              <svg className="cta-custom-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </Container>
      </Section>

      <style jsx>{`
        /* ── Hero ─────────────────────────────────────────── */
        .hero {
          position: relative;
          padding: var(--space-24) 0 var(--space-20);
          text-align: center;
          overflow: hidden;
          background: var(--gradient-hero);
        }

        .hero-glow {
          position: absolute;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 600px;
          background: radial-gradient(ellipse, rgba(225,29,72,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        :global([data-theme="dark"]) .hero-glow {
          background: radial-gradient(ellipse, rgba(225,29,72,0.12) 0%, transparent 70%);
        }

        .hero-content {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-title {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1.05;
          margin-top: var(--space-6);
          margin-bottom: var(--space-6);
          color: var(--text-primary);
        }

        .hero-title-accent {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: var(--text-tertiary);
          max-width: 600px;
          margin: 0 auto var(--space-10);
          line-height: 1.7;
        }

        .hero-actions {
          display: flex;
          gap: var(--space-4);
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: var(--space-10);
        }

        .hero-trust {
          display: flex;
          gap: var(--space-6);
          justify-content: center;
          flex-wrap: wrap;
        }

        .hero-trust-item {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--text-tertiary);
        }

        .hero-trust-check {
          color: var(--color-success);
          font-weight: 700;
        }

        /* ── Sections ─────────────────────────────────────── */
        .section-header {
          text-align: center;
          margin-bottom: var(--space-12);
        }

        .section-subtitle {
          font-size: var(--text-lg);
          color: var(--text-tertiary);
          max-width: 500px;
          margin: var(--space-3) auto 0;
        }

        /* ── Features ─────────────────────────────────────── */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-6);
        }

        :global(.feature-card) {
          padding: var(--space-6) !important;
        }

        .feature-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--space-4);
        }

        .feature-title {
          font-size: var(--text-base);
          font-weight: 600;
          margin-bottom: var(--space-2);
        }

        .feature-desc {
          font-size: var(--text-sm);
          color: var(--text-tertiary);
          line-height: 1.6;
          margin: 0;
        }

        /* ── Tools Grid ───────────────────────────────────── */
        .tools-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-5);
        }

        :global(.tool-card-item) {
          padding: var(--space-6) !important;
        }

        .tool-card-arrow {
          position: absolute;
          top: var(--space-6);
          right: var(--space-6);
          color: var(--text-muted);
          transition: all var(--transition-base);
        }

        .tool-card-item:hover .tool-card-arrow {
          color: var(--color-primary);
          transform: translateX(4px);
        }

        .tool-card-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin-bottom: var(--space-4);
          position: relative;
          z-index: 1;
        }

        .tool-card-title {
          font-size: var(--text-lg);
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: var(--space-2);
          letter-spacing: -0.01em;
          position: relative;
          z-index: 1;
        }

        .tool-card-desc {
          font-size: var(--text-sm);
          color: var(--text-tertiary);
          line-height: 1.5;
          margin: 0;
          position: relative;
          z-index: 1;
        }

        /* ── CTA ──────────────────────────────────────────── */
        .cta-card {
          position: relative;
          text-align: center;
          padding: var(--space-16) var(--space-8);
          background: var(--gradient-primary);
          border-radius: var(--radius-2xl);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .cta-glow {
          position: absolute;
          top: -100px;
          right: -100px;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .cta-title {
          color: #FFFFFF;
          font-size: clamp(1.5rem, 3vw, 2.25rem);
          margin-bottom: var(--space-4);
          position: relative;
          font-weight: 700;
        }

        .cta-subtitle {
          color: rgba(255,255,255,0.85);
          font-size: var(--text-lg);
          max-width: 500px;
          margin: 0 auto var(--space-8);
          position: relative;
          line-height: 1.6;
        }

        /* Fully Customized CTA Link Button Layout */
        .cta-custom-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
          background: #FFFFFF;
          color: var(--color-primary, #e11d48);
          font-size: var(--text-base);
          font-weight: 600;
          padding: 14px 28px;
          border-radius: 14px;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
          transition: all var(--transition-base, 0.25s ease);
          position: relative;
          z-index: 2;
        }

        /* Interactive Hover Layouts */
        .cta-custom-button:hover {
          background: #F8FAFC;
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.25);
        }

        .cta-custom-button:active {
          transform: translateY(0);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        /* SVG Micro-interaction */
        .cta-custom-arrow {
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .cta-custom-button:hover .cta-custom-arrow {
          transform: translateX(4px);
        }

        .cta-custom-button:focus-visible {
          outline: 3px solid rgba(255, 255, 255, 0.6);
          outline-offset: 3px;
        }

        /* ── Responsive ───────────────────────────────────── */
        @media (max-width: 1024px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .tools-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .hero {
            padding: var(--space-16) 0 var(--space-12);
          }

          .hero-trust {
            gap: var(--space-4);
          }
        }

        @media (max-width: 640px) {
          .features-grid {
            grid-template-columns: 1fr;
          }

          .tools-grid {
            grid-template-columns: 1fr;
          }

          .hero-actions {
            flex-direction: column;
            align-items: center;
          }

          .cta-custom-button {
            width: 100%;
            max-width: 290px;
          }
        }
      `}</style>
    </>
  );
}