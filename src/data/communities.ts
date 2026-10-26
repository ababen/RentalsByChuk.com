// The 12 community SEO pillar pages (/communities/[slug]).
// Names, rent ranges and blurbs are the ones already shown on the
// /communities index. Sourced detail is NOT duplicated here — each
// entry points at the sourced files instead:
//   hoaKey     → src/data/hoa.ts (HOA rental rules)
//   compareKey → src/data/compare.ts `neighborhoods` (Oct 2026 market brief)
// Communities without a key show an honest "I verify it" fallback.

export type Community = {
  slug: string;
  name: string;
  city: "West Palm Beach" | "Palm Beach Gardens" | "Jupiter";
  /** Typical monthly rent range (working estimate, from the index page). */
  price: string;
  blurb: string;
  /** Matches Property.neighborhood for the sample-homes section. */
  neighborhood?: string;
  hoaKey?: string;
  compareKey?: string;
};

export const communities: Community[] = [
  { slug: "downtown-clematis", name: "Downtown Clematis", city: "West Palm Beach", price: "$2,500-$4k", blurb: "Walkable, river, nightlife — Brightline at your door.", neighborhood: "Downtown Clematis", compareKey: "downtown" },
  { slug: "flamingo-park", name: "Flamingo Park", city: "West Palm Beach", price: "$2,200-$3,500", blurb: "Historic bungalows, Norton Museum, tree-lined streets.", neighborhood: "Flamingo Park", compareKey: "flamingo" },
  { slug: "northwood", name: "Northwood", city: "West Palm Beach", price: "$1,800-$2,800", blurb: "Revitalization corridor — creative economy, upside." },
  { slug: "mirasol", name: "Mirasol", city: "Palm Beach Gardens", price: "$4k-$7k", blurb: "Golf-front, country club, gated. 4-month min (sourced rule).", neighborhood: "Mirasol", hoaKey: "mirasol", compareKey: "mirasol" },
  { slug: "pga-national", name: "PGA National", city: "Palm Beach Gardens", price: "$3,500-$6k", blurb: "Resort living on the Champion course.", neighborhood: "PGA National", hoaKey: "pganational", compareKey: "pga" },
  { slug: "ballenisles", name: "BallenIsles", city: "Palm Beach Gardens", price: "$3,800-$6,500", blurb: "Private club, golf and tennis.", hoaKey: "ballenisles", compareKey: "ballenisles" },
  { slug: "old-palm", name: "Old Palm", city: "Palm Beach Gardens", price: "$6k-$12k", blurb: "Ultra-private golf, large lots." },
  { slug: "abacoa", name: "Abacoa", city: "Jupiter", price: "$3,800-$5,200", blurb: "Most walkable — porches, green, farmers market.", neighborhood: "Abacoa", hoaKey: "abacoa", compareKey: "abacoa" },
  { slug: "jupiter-intracoastal", name: "Intracoastal", city: "Jupiter", price: "$8k-$25k+", blurb: "Waterfront, docks, seasonal premium 2-3×.", neighborhood: "Intracoastal" },
  { slug: "egret-landing", name: "Egret Landing", city: "Jupiter", price: "$4,500-$7k", blurb: "Gated, Intracoastal access, tennis and trails." },
  { slug: "the-bluffs", name: "The Bluffs", city: "Jupiter", price: "$4k-$6k", blurb: "Quiet, Jupiter schools, easy to beach." },
  { slug: "admirals-cove", name: "Admirals Cove", city: "Jupiter", price: "$9k-$20k+", blurb: "Estate + marina. Board interview required.", hoaKey: "admiralscove" },
];

export function getCommunity(slug: string) {
  return communities.find((c) => c.slug === slug);
}
