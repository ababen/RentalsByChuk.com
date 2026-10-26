# HomesByChuk.com

> **Buying or selling? Consider it handled.**
> Home buying & selling for **West Palm Beach • Palm Beach Gardens • Jupiter** — Alexander "Chuk" Babenchuk, LoKation Real Estate.

Sister brand to [RentalsByChuk](https://rentalsbychuk.com) and built from the same codebase/design system (re-themed navy + gold). This folder is a standalone Next.js app; it shares no code at runtime with the RentalsByChuk app in the repo root.

## Stack

Next.js 16 + Tailwind v4 + TypeScript (app router). No MLS/IDX.

```
src/app/
├── page.tsx           # hero + mover-type picker + done-for-you + steps + FAQ + lead form
├── buy/               # buyer process + pre-offer checks + lead form
├── sell/              # seller process + pricing-opinion request (#value)
├── calculator/        # monthly payment calculator (P&I + tax + insurance + HOA)
├── communities/       # 12 communities across 3 cities
├── about/
├── api/lead/          # lead endpoint (webhook / Cloudflare Email / Resend) — see .env.example
├── sitemap.ts / robots.ts / opengraph-image.tsx
src/data/   buyerTypes.ts · communities.ts · faqs.ts · chukImages.ts
src/lib/    site.ts (contact details — edit here) · seo.ts
```

## Quick start

```bash
cd homesbychuk
npm install
npm run dev      # localhost:3000
npm run build
```

## Deploy (Vercel)

Create a **new** Vercel project from this repo with **Root Directory = `homesbychuk`**, add the env vars from `.env.example`, then attach the `homesbychuk.com` domain. Leads are tagged `source: "homesbychuk.com"`.

## Content rules

- No market statistics or prices are hard-coded. Add sourced figures only with a source and date.
- Contact details live only in `src/lib/site.ts`.
