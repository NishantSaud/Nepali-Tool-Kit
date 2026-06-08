'use client';

import Link from 'next/link';
import Container from './ui/Container';

const toolGroups = [
  {
    title: 'Finance',
    links: [
      { href: '/nrb-rates', label: 'Forex Rates' },
      { href: '/gold-silver', label: 'Gold & Silver' },
      { href: '/emi-calculator', label: 'EMI Calculator' },
      { href: '/sip-calculator', label: 'SIP Calculator' },
      { href: '/share-calculator', label: 'Share Calculator' },
    ],
  },
  {
    title: 'Utilities',
    links: [
      { href: '/date-converter', label: 'Date Converter' },
      { href: '/qr-generator', label: 'QR Generator' },
      { href: '/land-converter', label: 'Land Converter' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <Container>
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              Nepal<span className="footer-logo-accent">Toolkit</span>
            </Link>
            <p className="footer-tagline">
              Essential tools for Nepal — exchange rates, gold prices, calculators, and more. Free forever, no sign-up required.
            </p>
            <div className="footer-trust">
              <span className="footer-trust-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                Free Forever
              </span>
              <span className="footer-trust-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                Updated Daily
              </span>
              <span className="footer-trust-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                Built for Nepal
              </span>
            </div>
          </div>

          {/* Link groups */}
          {toolGroups.map((group) => (
            <div key={group.title} className="footer-group">
              <h4 className="footer-group-title">{group.title}</h4>
              <ul className="footer-links">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Data Sources */}
          <div className="footer-group">
            <h4 className="footer-group-title">Data Sources</h4>
            <ul className="footer-links">
              <li><span className="footer-link">NRB (Exchange Rates)</span></li>
              <li><span className="footer-link">FNGOSDA (Gold Prices)</span></li>
              <li><span className="footer-link">Stooq (Historical Data)</span></li>
              <li><span className="footer-link">SEBON (Trading Fees)</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} NepalToolkit. Built with Next.js + Supabase.
          </p>
          <div className="footer-bottom-links">
            <span className="footer-bottom-link">No ads. No tracking. Just tools.</span>
          </div>
        </div>
      </Container>

      <style jsx>{`
        .footer {
          border-top: 1px solid var(--border);
          background: var(--bg-secondary);
          margin-top: var(--space-20);
        }

        .footer :global(.ui-container) {
          padding-top: var(--space-16);
          padding-bottom: var(--space-8);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: var(--space-12);
          margin-bottom: var(--space-12);
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
        }

        .footer-logo {
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          display: inline-flex;
          margin-bottom: var(--space-4);
          text-decoration: none;
        }

        .footer-logo-accent {
          color: var(--color-primary);
        }

        .footer-tagline {
          font-size: var(--text-sm);
          color: var(--text-tertiary);
          line-height: 1.6;
          margin-bottom: var(--space-5);
          max-width: 320px;
        }

        .footer-trust {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .footer-trust-item {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-xs);
          font-weight: 500;
          color: var(--color-success);
        }

        .footer-group-title {
          font-size: var(--text-xs);
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-bottom: var(--space-4);
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          margin: 0;
          padding: 0;
        }

        .footer-link {
          font-size: var(--text-sm);
          color: var(--text-tertiary);
          transition: color var(--transition-base);
          text-decoration: none;
        }

        .footer-link:hover {
          color: var(--text-primary);
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: var(--space-8);
          border-top: 1px solid var(--border);
        }

        .footer-copyright {
          font-size: var(--text-xs);
          color: var(--text-muted);
          margin: 0;
        }

        .footer-bottom-links {
          display: flex;
          gap: var(--space-6);
        }

        .footer-bottom-link {
          font-size: var(--text-xs);
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: var(--space-8);
          }

          .footer-brand {
            grid-column: 1 / -1;
          }

          .footer-bottom {
            flex-direction: column;
            gap: var(--space-3);
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}
