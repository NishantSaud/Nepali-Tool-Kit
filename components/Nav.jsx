// frontend/components/Nav.jsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/',               label: 'Home' },
  { href: '/date-converter', label: 'Date Converter' },
  { href: '/nrb-rates',     label: 'Forex Rates' },
  { href: '/gold-silver',   label: 'Gold & Silver' },
  { href: '/qr-generator',  label: 'QR Code' },
  // New tools
  { href: '/emi-calculator', label: 'EMI' },
  { href: '/sip-calculator', label: 'SIP' },
  { href: '/share-calculator', label: 'Share' },
  { href: '/land-converter', label: 'Land' },
];

export default function Nav() {
  const pathname = usePathname();
  
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          Nepal<span>Toolkit</span>
        </Link>
        <ul className="nav-links">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={pathname === href ? 'active' : ''}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}