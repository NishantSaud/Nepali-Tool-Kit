# NepalToolkit

**Free utility tools for Nepal** — NRB exchange rates, Bikram Sambat date converter, gold & silver prices, and QR code generator.

---

## Project structure

```
nepaltoolkit/
├── frontend/
│   ├── app/
│   │   ├── layout.jsx               ← Root layout, fonts, nav, footer
│   │   ├── globals.css              ← Design tokens, typography, utilities
│   │   ├── page.jsx                 ← Home page
│   │   ├── date-converter/page.jsx  ← BS ↔ AD converter (static)
│   │   ├── nrb-rates/page.jsx       ← NRB forex (ISR 30 min)
│   │   ├── gold-silver/page.jsx     ← Gold & silver (ISR 1 hr)
│   │   └── qr-generator/page.jsx   ← QR generator (static)
│   └── components/
│       ├── Nav.jsx                  ← Sticky nav with active state
│       ├── ForexGrid.jsx            ← Client: searchable currency grid
│       ├── GoldChartClient.jsx      ← Client: Recharts price chart
│       ├── DateConverterClient.jsx  ← Client: BS/AD converter UI
│       └── QRGeneratorClient.jsx   ← Client: qrcode.react wrapper
├── backend/
│   ├── services/
│   │   ├── nrbService.js            ← NRB API fetch + DB persist
│   │   └── goldService.js          ← Gold API fetch (primary + fallback)
│   ├── cron/
│   │   └── fetchAllRates.js        ← Daily job, independent per-service
│   └── api/
│       └── routes.js               ← Route handler stubs for all endpoints
├── database/
│   └── schema.sql                  ← PostgreSQL tables, views, RLS policies
├── next.config.js
├── next-sitemap.config.js
├── vercel.json                     ← Cron schedule (05:30 UTC = 11:15 NPT)
├── package.json
└── .env.example                    ← All required environment variables
```

---

## Quick start

### 1. Clone and install

```bash
git clone https://github.com/yourname/nepaltoolkit.git
cd nepaltoolkit
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
# Fill in all values — see .env.example for instructions
```

### 3. Set up database (Supabase)

1. Create a free project at [supabase.com](https://supabase.com)
2. Open the SQL editor and paste the contents of `database/schema.sql`
3. Run it — this creates all tables, views, and row-level security policies
4. Copy your project URL and API keys into `.env.local`

### 4. Run locally

```bash
npm run dev
# Open http://localhost:3000
```

### 5. Seed initial data (optional)

To populate the DB before the first cron run, call the cron endpoint manually:

```bash
curl -X POST http://localhost:3000/api/cron/fetch-rates \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

---

## Deployment (Vercel)

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourname/nepaltoolkit)

### Manual deploy

```bash
npm install -g vercel
vercel --prod
```

### Environment variables on Vercel

Go to **Project → Settings → Environment Variables** and add every variable from `.env.example`.

The `CRON_SECRET` must also be added to **Project → Settings → Cron Jobs** so Vercel injects it automatically into cron requests.

---

## API endpoints

| Method | Path | Description | Cache |
|--------|------|-------------|-------|
| GET | `/api/forex` | Latest NRB rates from DB | 30 min CDN |
| GET | `/api/forex?history=USD&days=90` | USD rate history | 1 hr CDN |
| GET | `/api/gold` | Latest gold/silver prices | 1 hr CDN |
| GET | `/api/gold?days=90` | Gold history for charts | 1 hr CDN |
| GET | `/api/health` | Per-service health status | 1 min CDN |
| POST | `/api/cron/fetch-rates` | Trigger data fetch (cron only) | — |

---

## How independent service isolation works

Each service failure is contained at three levels:

1. **Cron level** — `fetchAllRates.js` wraps NRB and gold fetches in separate `try/catch` blocks. If gold fails, NRB still saves. The other services (QR, date converter) are client-side only and have no server dependency at all.

2. **API route level** — Every route has a DB fallback. If Supabase is unavailable, the forex route falls back to a live NRB API call. The gold route falls back to RapidAPI, then to the ashesh.com.np scraper.

3. **Frontend level** — Each page renders independently using ISR. A stale-while-revalidate cache means users always get a response even if the upstream data source is temporarily down. An error banner is shown only when data is completely unavailable.

---

## SEO checklist

- [x] Per-page `metadata` with unique `title`, `description`, `canonical`, and `openGraph`
- [x] `next-sitemap` generates `/sitemap.xml` and `/robots.txt` at build time
- [x] ISR pages get `Cache-Control: s-maxage` headers for CDN caching
- [x] Security headers on all routes (X-Frame-Options, Referrer-Policy, etc.)
- [x] Semantic HTML: `<h1>` on home, `<h2>` on inner pages, structured content below each tool
- [x] SEO content blocks on every tool page (explains the tool, targets long-tail keywords)
- [x] `next/font` with `display: swap` for zero CLS from font loading
- [x] `next/image` for all images (if added later)
- [ ] Add JSON-LD structured data (`WebApplication` schema) per page — high impact
- [ ] Add Nepali-language (`ne`) hreflang alternate pages for `.com.np` traffic
- [ ] Submit sitemap to Google Search Console after first deploy

---

## Data sources

| Tool | Source | Update frequency |
|------|--------|-----------------|
| Forex rates | [NRB official API](https://www.nrb.org.np/forex/) | Daily ~11 AM NPT |
| Gold & silver | FNGOSDA via RapidAPI / ashesh.com.np fallback | Daily ~11 AM NPT |
| Date converter | [@remotemerge/nepali-date-converter](https://www.npmjs.com/package/@remotemerge/nepali-date-converter) — pre-computed | Static |
| QR generator | [qrcode.react](https://www.npmjs.com/package/qrcode.react) — client-side | Real-time |

---

## Monetisation setup

1. **Google AdSense** — Apply after 30 days of traffic. Add the AdSense script to `layout.jsx`. Place ad units in sidebars on forex and gold pages.

2. **Affiliate** — Sign up for MeroShare, Mero Lagani, or insurance affiliate programs (Nepal Life, Prabhu Life). Add CTA banners on the gold and forex pages where the audience is financially motivated.

3. **Domain** — Register `nepaltoolkit.com` (or `.com.np` for local trust). `.com.np` ranks better in Nepali search results.

---

## License

MIT — free to use, fork, and deploy.


##  Contributors

<a href="https://github.com/NishantSaud/Nepali-Tool-Kit/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=NishantSaud/Nepali-Tool-Kit" alt="Nepali-Tool-Kit Contributors Chart" />
</a>