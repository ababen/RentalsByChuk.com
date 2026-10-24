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
  mirasol: { name: "Mirasol", city: "Palm Beach Gardens", minLease: "6-mo min ✓", maxPerYear: "2× / year", board: "Yes — 10-15 days • $150/app", str: "Prohibited — $100/day fines", grandfather: "No — 6mo retroactive (§720.306)" },
  abacoa: { name: "Abacoa", city: "Jupiter", minLease: "6-mo min (village varies)", maxPerYear: "3× / year", board: "Yes — 5-10 days • $75/app", str: "30-day min only", grandfather: "Village-specific — we check" },
  frenchmanscreek: { name: "Frenchman's Creek", city: "Palm Beach Gardens", minLease: "12-mo min", maxPerYear: "1× / year", board: "Yes — 15-30 days + interview", str: "Prohibited", grandfather: "Pre-2021 may be grandfathered" },
  pganational: { name: "PGA National", city: "Palm Beach Gardens", minLease: "6-mo min ✓", maxPerYear: "2× / year", board: "Yes — 12 days • $100/app", str: "Prohibited", grandfather: "No — 6mo retroactive" },
  ballenisles: { name: "BallenIsles", city: "Palm Beach Gardens", minLease: "6-mo min ✓", maxPerYear: "2× / year", board: "Yes — 14 days • $150/app", str: "Prohibited", grandfather: "No — retroactive" },
  admiralscove: { name: "Admirals Cove", city: "Jupiter", minLease: "12-mo min", maxPerYear: "1× / year", board: "Board + club • 20 days", str: "Prohibited", grandfather: "Check estoppel" },
};
