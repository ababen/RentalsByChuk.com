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
    board: "Association application required (Village condos)",
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
    // Sourced: Admirals Cove MPOA Rules & Regulations (approved
    // Oct 30, 2020), rule 54 — master rules; sub-associations vary.
    minLease: "3 consecutive months (MPOA master rule)",
    maxPerYear: "Once per year (MPOA) — exception if the tenant is an existing Admirals Cove owner",
    board: "Board + club approval required — timeline confirmed per home",
    str: "Under 3 months: not allowed (MPOA master rule)",
    grandfather: "Sub-association rules can be stricter — verified per home",
  },
  frenchmansreserve: {
    name: "Frenchman's Reserve",
    city: "Palm Beach Gardens",
    // Sourced Oct 26, 2026: Frenchman's Reserve Country Club, Tenant Member
    // Information (club rules for tenant privileges; POA lease rules are
    // separate and not published online):
    // https://www.frenchmansreservecc.com/public/real-estate/tenant-member-information
    minLease: "90-day minimum for a tenant to get club privileges",
    maxPerYear: "Up to 2 designated tenants per membership year (club rule)",
    board: "POA lease approval first, then club application 30+ days before move-in ($500 fee + $5,000 refundable deposit)",
    str: "Under 90 days: no club privileges for the tenant",
    grandfather: "Same tenant capped at 2 years or 2 leases of club privileges",
  },
  jupiterharbour: {
    name: "Jupiter Harbour",
    city: "Jupiter",
    // Sourced Oct 26, 2026: Jupiter Harbour Condominium Association, Use and
    // Occupancy Restrictions & Rules, items 7–8 (PDF dated Jan 2015):
    // https://www.jupiterharbour.com/file/document-page/3243099340/TlSRgytpUKuZLb8T.pdf
    minLease: "3-month minimum lease",
    maxPerYear: "Not published — I confirm before you apply",
    board: "Association approval required — each renewal is a new application",
    str: "Under 3 months: not allowed",
    grandfather: "1-year maximum lease term (renewals re-approved)",
  },
  jupiterplantation: {
    name: "Jupiter Plantation",
    city: "Jupiter",
    // Sourced Oct 26, 2026: Jupiter Plantation HOA, Realtor Fact and Info
    // Sheet (Jan 2025): https://www.jupiterplantation.org/FILES/FORMS/2025%20TRITON/FACT%20AND%20INFO%20SHEET%20FOR%20REALTORS%20JAN%202025-Copy%20(3).pdf
    minLease: "30-day minimum lease",
    maxPerYear: "No more than 6 leases per calendar year",
    board: "Lease application + $50 fee to management before move-in",
    str: "Under 30 days: not allowed",
    grandfather: "Not published — I check the association documents",
  },
  jupiterkey: {
    name: "Jupiter Key",
    city: "Jupiter",
    // Sourced Oct 26, 2026: Jupiter Key HOA, Sale/Lease Application package
    // (Mar 2021): https://jupiterkey.org/resources/jupiter-keys/resources/3-5-2021%20JK%20Sales%20and%20Lease%20Application.pdf
    // The per-year count on the form header doesn't extract cleanly — left unstated.
    minLease: "6-month minimum lease",
    maxPerYear: "Capped per calendar year — exact count confirmed before you apply",
    board: "Board written approval required — apply 30+ days ahead ($150 fee)",
    str: "Under 6 months: not allowed",
    grandfather: "Not published — I check the association documents",
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
  // A bare city name ("jupiter") must not match a community named after it.
  if (["west palm beach", "palm beach gardens", "jupiter"].some((c) => c.startsWith(q))) return hoaFallback(raw);
  for (const key of Object.keys(hoaDB)) {
    if (q.includes(key) || key.includes(q.replace(/[^a-z]/g, "")) || hoaDB[key].name.toLowerCase().includes(q)) {
      return { ...hoaDB[key], displayName: `${hoaDB[key].name} — ${hoaDB[key].city}` };
    }
  }
  return hoaFallback(raw);
}
