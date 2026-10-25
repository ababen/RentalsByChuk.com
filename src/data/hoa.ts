// HOA rental rules — corrected with sourced data, Oct 2026.
// Sources: Mirasol MCA leasing package, Village at Abacoa association
// documents, PGA National POA, live listings (Zumper). See
// ~/workspace/real-estate/palm-beaches-rental-market-brief-2026-10.md.
// Older demo values (e.g. "Mirasol 6-month minimum") were wrong and
// have been replaced — Mirasol's real minimum is 4 months.

export type HOAEntry = {
  name: string;
  city: "West Palm Beach" | "Palm Beach Gardens" | "Jupiter";
  minLease: string;
  maxPerYear: string;
  board: string;
  str: string;
  grandfather: string;
};

export const hoaDB: Record<string, HOAEntry> = {
  mirasol: {
    name: "Mirasol",
    city: "Palm Beach Gardens",
    minLease: "4-month minimum (12 in Quantera/Paradisio/Olivera)",
    maxPerYear: "Up to 2 leases per year",
    board: "Board approval + tenant screening — start ~4 weeks ahead",
    str: "Stays under 4 months: not allowed",
    grandfather: "Tenants capped at 24 consecutive months (MCA leasing package)",
  },
  abacoa: {
    name: "Abacoa",
    city: "Jupiter",
    minLease: "60-day min in Village condos (varies by village)",
    maxPerYear: "Up to 2 leases per year (Village condos)",
    board: "Association application — $100 fee (Village condos)",
    str: "Under 60 days: not allowed in Village condos",
    grandfather: "Magnolia Bay: 4-month min + own 2 yrs before leasing",
  },
  frenchmanscreek: {
    name: "Frenchman's Creek",
    city: "Palm Beach Gardens",
    // Not yet sourced from the association (Oct 2026 research did not
    // cover this community) — stated honestly, BallenIsles pattern (F6).
    minLease: "Minimum not published — I confirm from the association before you apply",
    maxPerYear: "Not published — confirmed per home",
    board: "Association approval required — timeline confirmed per home",
    str: "Not published — confirmed before you apply",
    grandfather: "Unverified — I check the association documents",
  },
  pganational: {
    name: "PGA National",
    city: "Palm Beach Gardens",
    minLease: "Varies by village — verified before you apply",
    maxPerYear: "Set by each village association",
    board: "POA approval + full lease docs required before leasing",
    str: "Furnished seasonal common — 30-day min seen on live listings",
    grandfather: "POA rules govern; docs on file",
  },
  ballenisles: {
    name: "BallenIsles",
    city: "Palm Beach Gardens",
    minLease: "Formal minimum unpublished — live listings show 3-month seasonal min",
    maxPerYear: "Not published — verified per home",
    board: "Association approval required — confirmed per listing",
    str: "Seasonal 3-month terms on live listings ($25,000/mo 3BR)",
    grandfather: "Unpublished — checked before you apply",
  },
  admiralscove: {
    name: "Admirals Cove",
    city: "Jupiter",
    // Not yet sourced from the association (Oct 2026 research did not
    // cover this community) — stated honestly, BallenIsles pattern (F6).
    minLease: "Minimum not published — I confirm from the association before you apply",
    maxPerYear: "Not published — confirmed per home",
    board: "Board + club approval required — timeline confirmed per home",
    str: "Not published — confirmed before you apply",
    grandfather: "Unverified — confirmed against the association documents before you apply",
  },
};

/** Fallback entry for communities not yet in the sourced file. */
export function hoaFallback(raw: string): HOAEntry & { displayName: string } {
  return {
    displayName: `${raw || "That community"} — I'll verify it`,
    name: raw || "That community",
    city: "Palm Beach Gardens",
    minLease: "Not in my checked file yet — I pull the association documents and confirm before you apply",
    maxPerYear: "Varies by community",
    board: "Varies — I confirm before you apply",
    str: "Many communities say no — I check",
    grandfather: "I verify against the actual HOA docs",
  };
}

/** Fuzzy lookup used by the homepage HOA checker (matches the v2 mockup's behavior). */
export function lookupHoa(raw: string): (HOAEntry & { displayName: string }) | null {
  const q = (raw || "").toLowerCase().trim();
  if (!q) return null;
  for (const key of Object.keys(hoaDB)) {
    if (q.includes(key) || key.includes(q.replace(/[^a-z]/g, "")) || hoaDB[key].name.toLowerCase().includes(q)) {
      return { ...hoaDB[key], displayName: `${hoaDB[key].name} — ${hoaDB[key].city}` };
    }
  }
  return hoaFallback(raw);
}
