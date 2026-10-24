# RentalsByChuk.com

> **Rentals Isn't Our Side Hustle. It's Our Only Hustle.**
> Rentals-only Realtor for **West Palm Beach • Palm Beach Gardens • Jupiter**

Sister brand to [HomesByChuk](https://homesbychuk.com) — same trust, sharper edge. Hyperlocal rentals, neighborhood-level pricing, HOA clearance, and video-first tours.

🔗 **Live Preview:** [Open the Mockup →](RentalsByChuk_Mockup.html) | [Brand Guide →](RentalsByChuk_BrandGuide.html)

---

## What This Repo Will Become

A production **Next.js 14 + Tailwind** site:

```
app/
├── (marketing)/          # home, about, contact
├── rentals/              # map search + collections
├── landlords/            # rescue hub, HOA checker, calculators
├── communities/[slug]/   # 12 SEO pillar pages
├── reports/              # monthly pulse + annual deep dive
└── relocation/           # try-before-you-buy + corporate
components/               # search-panel, hoa-checker, seasonal-calc
lib/
├── mls.ts                # BeachesMLS via Spark/IDX Broker
├── hoa-db.ts             # 300+ communities (Airtable → static JSON)
└── calculations.ts       # seasonal vs annual, rent-vs-sell
public/
docs/STRATEGY.md          # full research + differentiation doc
```

**Current status:** `v0.1` — strategy, brand, and interactive mockup. Next step is scaffolding the Next.js app and MLS integration.

---

## Quick Start (Design Preview)

No build needed — open the static files:

- **`RentalsByChuk_Mockup.html`** — Full homepage mockup (search, HOA checker, seasonal calculator, communities, listings). Just open in a browser.
- **`RentalsByChuk_BrandGuide.html`** — Logo system, palette, type, components, applications.
- **`RentalsByChuk_Strategy.md`** / `docs/STRATEGY.md` — 10 moats, market data, personas, site architecture, 90-day GTM.

```bash
# Preview locally
open RentalsByChuk_Mockup.html
open RentalsByChuk_BrandGuide.html
```

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
- [ ] v0.2 — Next.js scaffold + Tailwind + design tokens
- [ ] v0.2 — 12 community pages (SEO pillars)
- [ ] v0.3 — MLS/IDX integration (BeachesMLS)
- [ ] v0.3 — HOA database (Airtable) + checker
- [ ] v0.3 — Seasonal + Rent-vs-Sell calculators
- [ ] v0.4 — Tenant Vault + showing scheduler
- [ ] v0.4 — Market Pulse CMS
- [ ] v1.0 — Launch + Goldilocks Alert campaign

---

## Contributing

This is a private client project. For questions, open an issue or text Chuk.

## License

© 2026 RentalsByChuk. All rights reserved.

---

*Next: `npx create-next-app` → Tailwind → port `RentalsByChuk_Mockup.html` to `app/page.tsx` → wire up MLS.*
