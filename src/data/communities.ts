import { neighborhoods, type Neighborhood } from "@/data/compare";
import { hoaDB, type HOAEntry } from "@/data/hoa";

// ─────────────────────────────────────────────────────────────
// Community pages (/communities/[slug]). Rent bands and blurbs are
// Chuk's working ranges from the original Communities grid. Sourced
// figures are NOT duplicated here — they're pulled by key from
// compare.ts (neighborhood face-off) and hoa.ts (HOA rules), so a
// correction there updates every page.
//
// `indexed: false` = no sourced neighborhood data yet, only Chuk's band
// and blurb. Those pages render (they're linked from the grid) but are
// noindex and left out of the sitemap until real data is added — a thin
// page hurts more than a missing one.
// ─────────────────────────────────────────────────────────────

export type CityName = "West Palm Beach" | "Palm Beach Gardens" | "Jupiter";

export type Community = {
  slug: string;
  name: string;
  city: CityName;
  band: string;
  blurb: string;
  /** key into neighborhoods (compare.ts) */
  compareKey?: string;
  /** key into hoaDB (hoa.ts) */
  hoaKey?: string;
  indexed: boolean;
};

export const communities: Community[] = [
  { slug: "downtown-clematis", name: "Downtown Clematis", city: "West Palm Beach", band: "$2,500–$4,000", blurb: "Walkable, river, nightlife — Brightline at your door.", compareKey: "downtown", indexed: true },
  { slug: "flamingo-park", name: "Flamingo Park", city: "West Palm Beach", band: "$2,200–$3,500", blurb: "Historic bungalows, Norton Museum, tree-lined streets.", compareKey: "flamingo", indexed: true },
  { slug: "northwood", name: "Northwood", city: "West Palm Beach", band: "$1,800–$2,800", blurb: "Revitalization corridor — creative economy, upside.", indexed: false },
  { slug: "mirasol", name: "Mirasol", city: "Palm Beach Gardens", band: "$4,000–$7,000", blurb: "Golf-front, country club, gated.", compareKey: "mirasol", hoaKey: "mirasol", indexed: true },
  { slug: "pga-national", name: "PGA National", city: "Palm Beach Gardens", band: "$3,500–$6,000", blurb: "Resort living on the Champion course.", compareKey: "pga", hoaKey: "pganational", indexed: true },
  { slug: "ballenisles", name: "BallenIsles", city: "Palm Beach Gardens", band: "$3,800–$6,500", blurb: "Private club, family-friendly, schools.", compareKey: "ballenisles", hoaKey: "ballenisles", indexed: true },
  { slug: "old-palm", name: "Old Palm", city: "Palm Beach Gardens", band: "$6,000–$12,000", blurb: "Ultra-private golf, large lots.", indexed: false },
  { slug: "abacoa", name: "Abacoa", city: "Jupiter", band: "$3,800–$5,200", blurb: "Most walkable — porches, green, farmers market.", compareKey: "abacoa", hoaKey: "abacoa", indexed: true },
  { slug: "jupiter-intracoastal", name: "Intracoastal", city: "Jupiter", band: "$8,000–$25,000+", blurb: "Waterfront, docks, seasonal premium 2–3×.", indexed: false },
  { slug: "egret-landing", name: "Egret Landing", city: "Jupiter", band: "$4,500–$7,000", blurb: "Gated, Intracoastal access, tennis and trails.", indexed: false },
  { slug: "the-bluffs", name: "The Bluffs", city: "Jupiter", band: "$4,000–$6,000", blurb: "Quiet, Jupiter schools, easy to beach.", indexed: false },
  { slug: "admirals-cove", name: "Admirals Cove", city: "Jupiter", band: "$9,000–$20,000+", blurb: "Estate + marina. Board interview required.", hoaKey: "admiralscove", indexed: true },
];

// City-level snapshot, October 2026 — same figures and sources as /reports.
export const cities: Record<CityName, { slug: string; median: string; aptAvg: string; dom: string }> = {
  "West Palm Beach": { slug: "west-palm-beach", median: "$2,300", aptAvg: "$2,490", dom: "40 days" },
  "Palm Beach Gardens": { slug: "palm-beach-gardens", median: "$3,186", aptAvg: "$2,660", dom: "34 days" },
  Jupiter: { slug: "jupiter", median: "$3,700", aptAvg: "$2,610", dom: "34 days" },
};
export const CITY_SOURCES =
  "Median asking rent: Realtor.com, through Sep 2026 · Apartment average: RentCafe, updated Sep 30, 2026 · Days on market: RentalSource, Oct 2026.";

export function getCommunity(slug: string) {
  return communities.find((c) => c.slug === slug);
}

export function compareRow(c: Community): Neighborhood | undefined {
  return c.compareKey ? neighborhoods.find((n) => n.key === c.compareKey) : undefined;
}

export function hoaRules(c: Community): HOAEntry | undefined {
  return c.hoaKey ? hoaDB[c.hoaKey] : undefined;
}

/** compare.ts marks figures with ✅ (sourced) / 🔶 (estimate) / ⚠️ (no series); spell them out on the page. */
export function plainFigure(s: string) {
  return s.replace(/ ?✅/g, "").replace(/ ?🔶( estimate)?/g, " (estimate)").replace(/ ?⚠️/g, "").trim();
}
