// Community guide (/communities). Blurbs are Chuk's working notes —
// no prices here on purpose. Add sourced sale figures only with a
// source and date.

export type CityName = "West Palm Beach" | "Palm Beach Gardens" | "Jupiter";

export type Community = {
  slug: string;
  name: string;
  city: CityName;
  blurb: string;
  homes: string;
};

export const cities: { name: CityName; slug: string; intro: string }[] = [
  { name: "West Palm Beach", slug: "west-palm-beach", intro: "City energy: downtown condos, historic bungalows and neighborhoods on the way up." },
  { name: "Palm Beach Gardens", slug: "palm-beach-gardens", intro: "Golf and country-club communities, top shopping, and an easy commute." },
  { name: "Jupiter", slug: "jupiter", intro: "Beach town pace: walkable Abacoa, Intracoastal waterfront and quiet family streets." },
];

export const communities: Community[] = [
  { slug: "downtown-clematis", name: "Downtown Clematis", city: "West Palm Beach", blurb: "Walkable, river, nightlife — Brightline at your door.", homes: "Condos & lofts" },
  { slug: "flamingo-park", name: "Flamingo Park", city: "West Palm Beach", blurb: "Historic bungalows, Norton Museum, tree-lined streets.", homes: "Historic single-family" },
  { slug: "northwood", name: "Northwood", city: "West Palm Beach", blurb: "Revitalization corridor — creative economy, upside.", homes: "Single-family & small multifamily" },
  { slug: "mirasol", name: "Mirasol", city: "Palm Beach Gardens", blurb: "Golf-front, country club, gated.", homes: "Club homes & estates" },
  { slug: "pga-national", name: "PGA National", city: "Palm Beach Gardens", blurb: "Resort living on the Champion course.", homes: "Single-family, villas & condos" },
  { slug: "ballenisles", name: "BallenIsles", city: "Palm Beach Gardens", blurb: "Private club, golf and tennis.", homes: "Club homes" },
  { slug: "old-palm", name: "Old Palm", city: "Palm Beach Gardens", blurb: "Ultra-private golf, large lots.", homes: "Estates" },
  { slug: "abacoa", name: "Abacoa", city: "Jupiter", blurb: "Most walkable — porches, green, farmers market.", homes: "Single-family & townhomes" },
  { slug: "intracoastal", name: "Intracoastal", city: "Jupiter", blurb: "Waterfront, docks, boating lifestyle.", homes: "Waterfront single-family" },
  { slug: "egret-landing", name: "Egret Landing", city: "Jupiter", blurb: "Gated, Intracoastal access, tennis and trails.", homes: "Single-family" },
  { slug: "the-bluffs", name: "The Bluffs", city: "Jupiter", blurb: "Quiet, Jupiter schools, easy to beach.", homes: "Single-family & condos" },
  { slug: "admirals-cove", name: "Admirals Cove", city: "Jupiter", blurb: "Estate + marina. Club membership process applies.", homes: "Estates & marina homes" },
];
