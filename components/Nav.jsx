'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import ThemeToggle from './ui/ThemeToggle';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/#tools', label: 'Tools' },
  { href: '/blog', label: 'Blog' },
];

function MobileDrawer({ isOpen, onClose, pathname }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href.replace('/#', '/'));
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`drawer-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Panel */}
      <div
        className={`drawer-panel ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="drawer-header">
          <Link href="/" className="drawer-logo" onClick={onClose}>
            Nepal<span className="drawer-logo-accent">Toolkit</span>
          </Link>
          <button
            onClick={onClose}
            className="drawer-close"
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="drawer-nav" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`drawer-nav-link ${isActive(href) ? 'active' : ''}`}
              onClick={onClose}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <style jsx>{`
        .drawer-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: calc(var(--z-overlay) - 1);
          opacity: 0;
          pointer-events: none;
          transition: opacity var(--transition-slow);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }

        .drawer-backdrop.open {
          opacity: 1;
          pointer-events: auto;
        }

        .drawer-panel {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 300px;
          max-width: 85vw;
          background: var(--surface);
          border-left: 1px solid var(--border);
          z-index: var(--z-overlay);
          transform: translateX(100%);
          transition: transform var(--transition-slow);
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-xl);
        }

        .drawer-panel.open {
          transform: translateX(0);
        }

        .drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-4) var(--space-5);
          border-bottom: 1px solid var(--border);
          min-height: var(--nav-height);
        }

        .drawer-logo {
          font-size: 1.125rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          text-decoration: none;
        }

        .drawer-logo-accent {
          color: var(--color-primary);
        }

        .drawer-close {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text-secondary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-base);
        }

        .drawer-close:hover {
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }

        .drawer-close:focus-visible {
          outline: 2px solid var(--border-focus);
          outline-offset: 2px;
        }

        .drawer-nav {
          display: flex;
          flex-direction: column;
          padding: var(--space-4);
          gap: var(--space-1);
          overflow-y: auto;
        }

        .drawer-nav-link {
          display: flex;
          align-items: center;
          padding: var(--space-3) var(--space-4);
          border-radius: var(--radius-md);
          font-size: var(--text-base);
          font-weight: 500;
          color: var(--text-secondary);
          transition: all var(--transition-base);
          text-decoration: none;
        }

        .drawer-nav-link:hover {
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }

        .drawer-nav-link.active {
          background: var(--color-primary-light);
          color: var(--color-primary);
        }

        .drawer-nav-link:focus-visible {
          outline: 2px solid var(--border-focus);
          outline-offset: -2px;
        }
      `}</style>
    </>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    if (href === '/#tools') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="navbar-inner">
          {/* Logo - Aligned to Left */}
          <Link href="/" className="navbar-logo" aria-label="NepalToolkit Home">
            Nepal<span className="navbar-logo-accent">Toolkit</span>
          </Link>

          {/* Right Layout Container: Aligns links and theme toggle to the top right corner */}
          <div className="navbar-right">
            {/* Desktop Links with precise spacing */}
            <ul className="navbar-links" role="menubar">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href} role="none">
                  <Link
                    href={href}
                    className={`navbar-link ${isActive(href) ? 'navbar-link--active' : ''}`}
                    role="menuitem"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Actions Container */}
            <div className="navbar-actions">
              <ThemeToggle />
              <button
                className="navbar-hamburger"
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={mobileOpen}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={mobileOpen}
        onClose={closeMobile}
        pathname={pathname}
      />

      <style jsx>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: var(--z-sticky);
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid transparent;
          transition: all var(--transition-base);
        }

        :global([data-theme="dark"]) .navbar {
          background: rgba(2, 6, 23, 0.85);
        }

        .navbar--scrolled {
          border-bottom-color: var(--border);
          box-shadow: var(--shadow-sm);
        }

        .navbar-inner {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 var(--container-padding);
          height: var(--nav-height);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar-logo {
          font-size: 1.125rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          flex-shrink: 0;
          text-decoration: none;
        }

        .navbar-logo:focus-visible {
          outline: 2px solid var(--border-focus);
          outline-offset: 4px;
          border-radius: var(--radius-sm);
        }

        .navbar-logo-accent {
          color: var(--color-primary);
        }

        /* Combined right-side alignment container */
        .navbar-right {
          display: flex;
          align-items: center;
          gap: 24px; /* Space between the 'Blog' item and the 'Theme Toggle' box */
        }

        /* Desktop navigation menu block */
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 12px; /* Perfect uniform padding gap between each link button */
          list-style: none;
          margin: 0;
          padding: 0;
        }

        /* Nav link configuration matched to your screenshot reference */
        .navbar-link {
          font-size: 15px;
          font-weight: 500;
          color: var(--text-secondary, #4a5568);
          padding: 10px 20px; /* Expands interaction box into a nice pill shape */
          border-radius: 12px; /* Rounded pill styling */
          transition: all var(--transition-base, 0.2s ease);
          text-decoration: none;
          white-space: nowrap;
          display: inline-block;
          background: transparent;
        }

        .navbar-link:hover {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }

        .navbar-link--active {
          color: var(--color-primary);
          background: var(--color-primary-light);
        }

        .navbar-link:focus-visible {
          outline: 2px solid var(--border-focus);
          outline-offset: -2px;
        }

        /* Actions layout styling */
        .navbar-actions {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          flex-shrink: 0;
        }

        .navbar-hamburger {
          display: none;
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text-secondary);
          cursor: pointer;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-base);
        }

        .navbar-hamburger:hover {
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }

        .navbar-hamburger:focus-visible {
          outline: 2px solid var(--border-focus);
          outline-offset: 2px;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1023px) {
          .navbar-links {
            display: none;
          }

          .navbar-hamburger {
            display: flex;
          }
        }

        @media (max-width: 480px) {
          .navbar-inner {
            padding: 0 12px;
          }
        }
      `}</style>
    </>
  );
}