# RentalsByChuk.com

> **Rentals Isn't Our Side Hustle. It's Our Only Hustle.**
> Rentals-only Realtor for **West Palm Beach • Palm Beach Gardens • Jupiter**

Sister brand to [HomesByChuk](https://homesbychuk.com) — same trust, sharper edge. Hyperlocal rentals, neighborhood-level pricing, HOA clearance, and video-first tours.

🔗 **Live:** [rentalsbychuk.com](https://rentalsbychuk.com) · [rentalsbychukcom.vercel.app](https://rentalsbychukcom.vercel.app) · [Mockup](RentalsByChuk_Mockup.html) · [Brand Guide](RentalsByChuk_BrandGuide.html) · [Strategy](docs/STRATEGY.md)

---

## Stack — File-Based, No MLS (2026)

Next.js 16 + Tailwind v4 + TypeScript (app router). No MLS/IDX — agent curates via `src/data/properties.ts`.

```
app/
├── page.tsx              # hero + pulse + featured + rescue + matchmaker + HOA checker + calculator + villages
├── rentals/              # search + filters (q/city/pet/seasonal) + [id] detail
├── communities/          # 12 villages
├── hoa-checker/          # 6 demo HOAs → 300+ via Airtable→JSON
├── landlords/            # rescue hub + guarantees
├── reports/              # monthly pulse
├── admin/                # agent portal (file-edit workflow)
├── sitemap.ts / robots.ts / opengraph-image.tsx
├── loading.tsx / error.tsx / not-found.tsx
components/ Header, Footer, PropertyCard
lib/     types.ts + properties.ts (getAll/getById/filter/formatPrice)
data/    properties.ts (6 seeds) + hoa.ts (6 demo)
public/  listings/ for agent-uploaded photos
```

## Quick Start

```bash
npm install
npm run dev      # localhost:3000
npm run build    # verify ○/ƒ routes
```

## How Agent Adds a Property

1. Collect photos → `public/listings/` or hosted URL
2. Duplicate an entry in `src/data/properties.ts` (see `src/lib/types.ts` schema)
3. `git add -A && git commit -m "add: 123 Main St" && git push` → Vercel auto-deploys

AI agents: same workflow — read `src/lib/types.ts` for schema, edit `src/data/properties.ts`, commit+push.

## Deploy

Vercel linked to `ababen/RentalsByChuk.com` (team Marketing Bull 2). Every `main` push auto-deploys. Custom domain: add in Vercel → Domains → `RentalsByChuk.com`.

---

## Market Context (Oct 2026)

| City | Pop | Median Rent (2BR) | Vacancy | Signal |
|------|-----|-------------------|---------|--------|
| **West Palm Beach** | 126,944 | $2,150–$3,295 | ~5.8% | +2.2% YoY (outperforming FL) |
| **Palm Beach Gardens** | 64,547 (+9%) | $2,944 median | tight (-20% YoY inventory) | Fastest grower in PBC |
| **Jupiter** | ~61,200 | $3,000–$7,000 SFH | ~5% | 39% above national avg |

**Biggest opportunity:** *Accidental Landlords* — 55.9% of for-sale listings sit 60+ days (Redfin, Feb 2026), converting to rentals. Two rental economies (annual + seasonal Dec–Apr at 2–3× premium). See `docs/STRATEGY.md` for full research.

---

## 10 Differentiation Moats

1. **Accidental Landlord Rescue Hub** — rent-vs-sell quiz → 48-hr rental analysis
2. **HOA Rental Rights Checker** — 300+ communities, §720.306 grandfather logic
3. **Seasonal vs Annual Engine** — side-by-side yield math
4. **Goldilocks Alert** — May/June inventory spike notifications
5. **Neighborhood Matchmaker** — 8-question village quiz + video
6. **Try-Before-You-Buy Relocation** — 6-mo rental → HomesByChuk funnel
7. **Tenant Vault + Video-First** — one app, Reels-style tours, HOA badge
8. **Live Market Pulse** — monthly, submarket-level (not annual PDF)
9. **21-Day Lease Guarantee** — or 1 month free management
10. **Corporate/Hospital Channel** — Jupiter Medical, PGA HQ, WPB finance

---

## Brand

| Token | Value | Usage |
|-------|-------|-------|
| Deep Navy | `#0B1D3A` | Primary, headers, buttons |
| Warm Sand | `#E8DDD0` | Hero, cards |
| Coral Pop | `#FF6B4A` | CTAs, "BY" in wordmark |
| Aqua | `#2EC4B6` | Links, underlines, data |
| Display | Cormorant Garamond 600/700 | Headlines |
| Sans | Sora 700/800 + Inter 400-700 | UI, body |

Full spec: [`RentalsByChuk_BrandGuide.html`](RentalsByChuk_BrandGuide.html)

Logo: **R** monogram = key + palm frond. Wordmark: `RENTALS BY CHUK` with Coral `BY` and Navy + Aqua. Tagline always `WEST PALM BEACH • PALM BEACH GARDENS • JUPITER`.

---

## Roadmap

- [x] v0.1 — Market research + strategy doc
- [x] v0.1 — Brand guide + logo system
- [x] v0.1 — Interactive homepage mockup
- [x] v0.2 — Next.js 16 + Tailwind + real homepage (faithful mockup port)
- [x] v0.2 — sitemap/robots/OG image, loading/error/not-found, metadata on all routes
- [ ] v0.3 — 12 community [slug] pages (SEO pillars)
- [ ] v0.3 — Expand HOA DB to 300+ (Airtable→JSON)
- [ ] v0.3 — Lead capture (Resend) + /admin auth
- [ ] v0.4 — Tenant Vault + showing scheduler
- [ ] v1.0 — Launch + Goldilocks Alert campaign + analytics

---

## Contributing

This is a private client project. For questions, open an issue or text Chuk.

## License

© 2026 RentalsByChuk. All rights reserved.

---

## Lead Capture (added Oct 2026)

Every CTA on the site now feeds one lead pipeline instead of `mailto:` links and dead-end buttons:

- **Forms** — `src/components/LeadForm.tsx` (tour requests, 48-hr landlord analysis, HOA report/review, seasonal-alert list). All POST to **`/api/lead`** (`src/app/api/lead/route.ts`) with validation + a honeypot spam trap.
- **Delivery** — configure in Vercel → Settings → Environment Variables (see `.env.example`):
  - `LEAD_WEBHOOK_URL` → sends each lead as JSON to Zapier / Make / your CRM, **or**
  - `RESEND_API_KEY` + `LEAD_NOTIFY_EMAIL` → emails each lead to Chuk.
  - Until one is set, leads are written to the Vercel function logs (`[lead] …`) so nothing is lost.
- **Mobile sticky bar** — Call / Text / Free Analysis fixed to the bottom on phones (`src/components/StickyCTA.tsx`).
- **Contact details live in one file** — `src/lib/site.ts`. Business number: (561) 220-9399 (confirmed by Alex 2026-10-24). Change `PHONE_DISPLAY` / `PHONE_E164` there and every call/text/WhatsApp link site-wide updates.
- **SEO** — RealEstateAgent JSON-LD ships in the layout. Add `NEXT_PUBLIC_GA_ID` to enable GA4 (lead forms fire a `generate_lead` event). For Search Console, add the code where noted in `src/app/layout.tsx`.
