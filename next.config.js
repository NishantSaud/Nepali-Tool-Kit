// next.config.js
// ─────────────────────────────────────────────────────────────
// Next.js 14 — App Router configuration
// ─────────────────────────────────────────────────────────────

/** @type {import('next').NextConfig} */
const nextConfig = {

  // ── Strict mode ─────────────────────────────────────────────
  reactStrictMode: true,

  // ── Image optimisation ──────────────────────────────────────
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 3600,
  },

  // ── Security + SEO headers ──────────────────────────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options',   value: 'nosniff' },
          { key: 'X-Frame-Options',           value: 'DENY' },
          { key: 'X-XSS-Protection',          value: '1; mode=block' },
          { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      // Cache static API responses at CDN edge
      {
        source: '/api/forex',
        headers: [
          { key: 'Cache-Control', value: 's-maxage=1800, stale-while-revalidate=3600' },
        ],
      },
      {
        source: '/api/gold',
        headers: [
          { key: 'Cache-Control', value: 's-maxage=3600, stale-while-revalidate=7200' },
        ],
      },
      {
        source: '/api/health',
        headers: [
          { key: 'Cache-Control', value: 's-maxage=60, stale-while-revalidate=120' },
        ],
      },
    ];
  },

  // ── Redirects (SEO-friendly slugs) ──────────────────────────
  async redirects() {
    return [
      { source: '/forex',          destination: '/nrb-rates',      permanent: true },
      { source: '/exchange-rates', destination: '/nrb-rates',      permanent: true },
      { source: '/date',           destination: '/date-converter',  permanent: true },
      { source: '/bs-to-ad',       destination: '/date-converter',  permanent: true },
      { source: '/ad-to-bs',       destination: '/date-converter',  permanent: true },
      { source: '/gold',           destination: '/gold-silver',     permanent: true },
      { source: '/qr',             destination: '/qr-generator',    permanent: true },
    ];
  },

  // ── Experimental ────────────────────────────────────────────
  experimental: {
    // Partial Pre-Rendering: static shell + streaming dynamic content
    ppr: false,
  },
};

module.exports = nextConfig;
