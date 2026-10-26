# Idea: Client Portal (v2)

**Status:** Idea — recorded 2026-10-26, not scheduled, not implemented.

## What

A simple, logged-in portal where a renter can:

1. **See their side-by-side comparison** — the homes/communities Chuk has shortlisted for them, compared in one view (rent, beds/baths, HOA rules, pet policy, lease terms, commute, etc.). Builds on the public `#compare` hub (`src/components/home/CompareHub.tsx`, `src/data/compare.ts`), but personalized per client.
2. **Schedule showings** — pick available time slots for any home on their list; Chuk gets notified and confirms.

## Why

- Keeps renters engaged with Chuk instead of browsing Zillow alone.
- Replaces back-and-forth texts for "which ones did you like / when can you see it."
- Ties into the existing lead pipeline (`/api/lead`) and the planned v0.4 showing scheduler.

## Open questions (decide before building)

- **Login method:** magic link / email OTP (simplest) vs. password.
- **Who builds the shortlist:** Chuk only (via `/admin`), or can renters add homes too?
- **Scheduling:** in-house slots vs. Calendly / Google Calendar integration.
- **Data source for listings:** manual entry vs. MLS/IDX feed.
- **Storage:** need a database for users, shortlists, and showings (none today).
