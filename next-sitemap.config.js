// next-sitemap.config.js
// ─────────────────────────────────────────────────────────────
// Generates /sitemap.xml and /robots.txt at build time.
// Install: npm install next-sitemap
// Add to package.json scripts:
//   "postbuild": "next-sitemap"
// ─────────────────────────────────────────────────────────────

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:          process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.nepaltoolkit.com',
  generateRobotsTxt: true,
  changefreq:       'daily',
  priority:         0.7,

  // Override per-page priorities
  additionalPaths: async (config) => [
    {
      loc:        '/',
      changefreq: 'daily',
      priority:   1.0,
      lastmod:    new Date().toISOString(),
    },
    {
      loc:        '/nrb-rates',
      changefreq: 'daily',
      priority:   0.9,
      lastmod:    new Date().toISOString(),
    },
    {
      loc:        '/gold-silver',
      changefreq: 'daily',
      priority:   0.9,
      lastmod:    new Date().toISOString(),
    },
    {
      loc:        '/date-converter',
      changefreq: 'monthly',
      priority:   0.8,
      lastmod:    new Date().toISOString(),
    },
    {
      loc:        '/qr-generator',
      changefreq: 'monthly',
      priority:   0.7,
      lastmod:    new Date().toISOString(),
    },
  ],

  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/api/', '/api/cron/'] },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.nepaltoolkit.com'}/sitemap.xml`,
    ],
  },
};
