// Renter-comparison data for the homepage #compare hub.
// Extracted from the approved chuk-website-v2 mockup; figures are the
// Oct 2026 market brief's sourced numbers (✅) and flagged estimates (🔶).
// Sources: RentCafe · RentalSource · Realtor.com · BeachesMLS snapshot
// (Oct 24, 2026) · Zumper · ApartmentList · Homes.com · Mirasol MCA
// leasing package · Village at Abacoa association documents.

export type Segment = {
  key: string;
  emoji: string;
  cardTitle: string;
  cardBlurb: string;
  title: string;
  blurb: string;
  budget: string;
  fits: string;
  lease: string;
  gotcha: string;
  tip: string;
};

export const segments: Segment[] = [
  {
    key: "snowbird",
    emoji: "🌴",
    cardTitle: "Snowbird",
    cardBlurb: "Seasonal, furnished, winter months — gone before the humidity.",
    title: "🌴 The Snowbird",
    blurb: "You chase 75° winters and leave before the humidity clocks in. Furnished, 3–6 months, mid-November to Easter — that's the season, and the whole county knows it.",
    budget: "Furnished seasonal homes run 2–3× the annual rate (working estimate). Live points: Wellington seasonal from $8,750/mo; a furnished BallenIsles 3BR is asking $25,000/mo this season (Zumper).",
    fits: "PGA National · BallenIsles · North Palm Beach",
    lease: "3–6 month furnished seasonal term, mid-Nov → April",
    gotcha: "HOA minimums and caps: Mirasol requires 4 consecutive months (12 in some villages) and caps any tenant at 24 months total. The best seasonal stock is spoken for by fall — late shoppers rent what's left.",
    tip: "Text me in the summer. Seriously — while everyone else books in November panic, my snowbirds pick from the top of the pile in August.",
  },
  {
    key: "family",
    emoji: "🧳",
    cardTitle: "Relocating family",
    cardBlurb: "Schools first, annual lease, landing for a job or a fresh start.",
    title: "🧳 The Relocating Family",
    blurb: "New job, new schools, one landing to stick. You need the right school zone, a real yard, and a home that's ready the week you arrive.",
    budget: "3BR+ houses $3,500–$5,600+/mo. Wellington median asking rent is $4,386 (Realtor.com); Jupiter all-types average $3,446 (RentalSource).",
    fits: "Wellington · Abacoa (Jupiter) · Palm Beach Gardens",
    lease: "12-month annual, unfurnished — stability through the school year",
    gotcha: "Approval timelines, not rent, are your risk: HOA screening takes days to weeks (Mirasol starts ~4 weeks out; Abacoa villages charge a $100 application). Start 6–8 weeks before the first day of school.",
    tip: "Tell me the school, not just the city. I'll work backwards from the first day of class — video tours, remote signing, keys waiting when you land.",
  },
  {
    key: "pro",
    emoji: "💼",
    cardTitle: "Wall Street South pro",
    cardBlurb: "Finance/tech move to downtown WPB — rent first, buy later.",
    title: "💼 The Wall Street South Professional",
    blurb: "Your firm moved you to the Rosemary Square orbit — Goldman, Point72, Citadel country. Smart move is renting a year downtown while you learn the city.",
    budget: "Downtown WPB luxury apartments average $4,100/mo (RentCafe, +9.9% YoY): 1BR $3,406 · 2BR $4,768. Or a house while you house-hunt.",
    fits: "Downtown WPB / Clematis · Flamingo Park · Palm Beach Gardens",
    lease: "12–14 month tower lease — longer terms unlock free months",
    gotcha: "Downtown's new towers are a concession zone: one month free is common, and two months free shows up on 2BRs with 14-month leases. If you're not asking, you're overpaying.",
    tip: "Rent first, buy later — that's what half my Rosemary Square clients do. One year downtown teaches you which neighborhood is actually yours.",
  },
  {
    key: "golf",
    emoji: "⛳",
    cardTitle: "Golf & country club",
    cardBlurb: "Inside the gates: Mirasol, PGA National, BallenIsles.",
    title: "⛳ The Golf & Country Club Renter",
    blurb: "You want the cart path outside your door and the clubhouse down the street. Inside the gates, though, the lease is only half the paperwork.",
    budget: "PGA National houses average $6,500/mo and BallenIsles $8,000/mo (Zumper). Seasonal furnished runs hot: a PGA National 4BR asks $13,500/mo, stepping to $16,000 in peak season.",
    fits: "PGA National · BallenIsles · Mirasol",
    lease: "Seasonal 3–6 months furnished, or annual inside the gates",
    gotcha: "Club and POA approvals: PGA National requires POA approval plus full lease documents before leasing; Mirasol's board screens tenants — build ~4 weeks of runway or lose the home.",
    tip: "Inside the gates, I build your approval packet like a membership application — because it is one. Clean packet, fast yes.",
  },
  {
    key: "equestrian",
    emoji: "🐎",
    cardTitle: "Equestrian season",
    cardBlurb: "Wellington for WEF — house, stalls, and groom quarters.",
    title: "🐎 The Equestrian Seasonal",
    blurb: "Thirteen weeks of WEF (Jan 6–Apr 4, 2027), and you need beds, stalls, and a short hack to the show grounds. Wellington in season is its own market.",
    budget: "Furnished Wellington seasonal $8,750–$25,000/mo (live listings, Zumper/KW). Farms: $20,000/mo plus stalls at $12,000/season, on top.",
    fits: "Wellington · Wellington Isles · Palm Beach Point (farms)",
    lease: "WEF season term (Jan–Apr), furnished; stalls negotiated separately",
    gotcha: "Stalls and groom quarters are a separate deal from the house lease — and with $536M of festival impact in the county, the best-located homes lock months early.",
    tip: "Send me beds AND stalls in the first text. House, barn, and turnout packaged together is one negotiation — split it up and you'll lose one of the three.",
  },
  {
    key: "waterfront",
    emoji: "🚤",
    cardTitle: "Waterfront & boating",
    cardBlurb: "Dock, lift, inlet access — the boat is non-negotiable.",
    title: "🚤 The Waterfront & Boating Renter",
    blurb: "The boat isn't cargo, it's family. Dock, lift, and no fixed bridges between you and the inlet — everything else is negotiable.",
    budget: "North Palm Beach all-types average $3,763/mo (RentalSource); apartments average $2,959 (RentCafe). Dock-and-lift homes command the top seasonal premiums (estimate).",
    fits: "North Palm Beach · Jupiter Inlet · Singer Island",
    lease: "Annual for true dock homes; seasonal furnished for winter boating",
    gotcha: "Half the 'waterfront' listings can't float your boat: dock depth, bridge clearance, and lift capacity decide it — and inlet-community HOAs cap seasonal terms. Measurements first, tours second.",
    tip: "Text me your boat's length and draft before we tour anything. I weed out the impossible docks from my desk, not from the seawall.",
  },
  {
    key: "budget",
    emoji: "🔑",
    cardTitle: "First rental / budget-smart",
    cardBlurb: "Value, no surprises, and every fee on the table before you apply.",
    title: "🔑 The First-Rental / Budget-Smart Renter",
    blurb: "First place, tight budget, zero appetite for surprises. Your enemy isn't the rent — it's the fees nobody mentioned and the deposit math nobody showed you.",
    budget: "West Palm Beach apartments: 1BR median $1,600/mo, 2BR median $2,200 (BeachesMLS snapshot, Oct 2026) — with 987 active lease listings to hunt in WPB alone.",
    fits: "West Palm Beach · North Palm Beach · Abacoa villages (Jupiter)",
    lease: "12-month annual — where a renter's leverage actually lives",
    gotcha: "Fee stacking: HOA application fees ($100 in Abacoa's Village condos), admin fees, and deposits of 1–2 months can add thousands before you get a key. Compare true cost below, never the headline rent.",
    tip: "About 14 renters chase every vacant unit in this county (RentCafe). Being application-ready — documents, deposit, renters insurance — beats being first. I'll get your packet ready before we tour.",
  },
];

export type Neighborhood = {
  key: string;
  name: string;
  head: string;
  r1: string;
  r2: string;
  r3: string;
  min: string;
  strict: string;
  furn: string;
  dom: string;
  vibe: string;
  take: string;
};

export const neighborhoods: Neighborhood[] = [
  { key: "downtown", name: "Downtown WPB / Clematis", head: "Avg apartment $4,100 ✅", r1: "$3,406 (apartment) ✅", r2: "$4,768 (apartment) ✅", r3: "Apartments — luxury towers", min: "12–14 mo tower leases; free months common on new buildings", strict: "Easy — building rules, no HOA gauntlet", furn: "Some — corporate units in new towers", dom: "WPB overall: 40 days (RentalSource)", vibe: "Walkable, Brightline, rooftops, nightlife", take: "The concession zone. If a new tower isn't offering you a free month, I ask for you." },
  { key: "flamingo", name: "Flamingo Park (WPB)", head: "3BR houses ~$3,150–$3,400 🔶", r1: "Mostly houses — no 1BR series ⚠️", r2: "Mostly houses — no 2BR series ⚠️", r3: "~$3,150–$3,400 🔶 estimate", min: "Typically 12 months; no HOA on most streets 🔶", strict: "Easy — generally no HOA 🔶", furn: "Rare — annual homes", dom: "WPB overall: 40 days (RentalSource)", vibe: "Historic 1920s bungalows, quiet streets, minutes to downtown", take: "No published rent series exists here — I price it off the WPB 3BR median ($3,150, BeachesMLS) and the street itself." },
  { key: "npb", name: "North Palm Beach", head: "All-types avg $3,763 ✅", r1: "Apartments avg $2,959 (RentCafe) ✅", r2: "— (thin series)", r3: "— (thin series)", min: "Varies by community — I verify per home", strict: "Moderate — varies by village", furn: "Yes — marina/inlet seasonal stock", dom: "36 days (RentalSource)", vibe: "Village feel, marinas, MacArthur Beach next door", take: "The quiet overachiever of the coast: village calm, inlet minutes away." },
  { key: "abacoa", name: "Abacoa (Jupiter)", head: "Jupiter all-types avg $3,446 ✅", r1: "$2,450 (Jupiter) ✅", r2: "$3,205 (Jupiter) ✅", r3: "$4,399 (Jupiter) ✅ · townhouses ~$3,400", min: "Village condos: 60-day min lease · Magnolia Bay: 4-month min", strict: "Strict-ish — $100 application, max 2 leases/yr (Village condos)", furn: "Limited", dom: "Jupiter: 34 days (RentalSource)", vibe: "New-urbanist porches, Town Center, Roger Dean Stadium, FAU Jupiter", take: "Every village writes its own lease rules here — I check the village, not just the town." },
  { key: "mirasol", name: "Mirasol (PBG)", head: "Rentals $6,850–$24,750/mo ✅ (Homes.com)", r1: "— (gated club community)", r2: "— (gated club community)", r3: "From $6,850/mo ✅", min: "4 consecutive months (12 in Quantera/Paradisio/Olivera villages)", strict: "Strictest — board approval + screening, 24-month tenant cap", furn: "Yes — golf seasonal stock", dom: "PBG: 34 days (RentalSource)", vibe: "Two championship courses inside the gates, club polish", take: "The strictest lease book in the Gardens. Start your approval about 4 weeks early and it's painless." },
  { key: "pga", name: "PGA National (PBG)", head: "Median $5,800 (seasonal-skewed) ✅", r1: "Apartments avg $2,673 ✅", r2: "— (village mix)", r3: "Houses avg $6,500 ✅", min: "Varies by village; POA approval comes first", strict: "Strict — POA approval + full lease docs required", furn: "Yes — furnished 4BR $13,500/mo, $16,000 in peak season (Zumper)", dom: "PBG: 34 days (RentalSource)", vibe: "Resort golf villages around the Champion course", take: "The POA reads your lease before you sign it. I pre-build the whole packet." },
  { key: "ballenisles", name: "BallenIsles (PBG)", head: "Median $4,600 ✅", r1: "— (gated club community)", r2: "— (gated club community)", r3: "$6,650 · 4BR $9,250 · houses avg $8,000 ✅", min: "Formal minimum unpublished — live seasonal listing shows 3-month min", strict: "Strict — gated club community approval (per listing)", furn: "Yes — 3BR furnished $25,000/mo, 3-mo min (live listing)", dom: "PBG: 34 days (RentalSource)", vibe: "Serene, retiree-skewed, two courses, serious tennis", take: "Seasonal gold — one furnished 3BR is asking $25k a month right now. The unpublished minimum is exactly why you call me first." },
  { key: "wellington", name: "Wellington", head: "Median $4,386 ✅ (Realtor.com)", r1: "$2,483+ (ApartmentList) ✅", r2: "$3,266+ (ApartmentList) ✅", r3: "Seasonal furnished $8,750–$20,000+/mo ✅", min: "Seasonal terms for WEF (Jan–Apr); annual leases available", strict: "Moderate — HOA/farm rules vary by enclave", furn: "Yes — the WEF furnished market", dom: "— (not in RentalSource series)", vibe: "Equestrian capital + A-rated schools; suburban calm off-season", take: "A two-speed town: sane annual rents, championship prices Jan–Apr. First question I ask: which speed are you?" },
];

export const faceOffRows: Array<{ label: string; field: keyof Neighborhood }> = [
  { label: "Typical asking", field: "head" },
  { label: "1-bedroom", field: "r1" },
  { label: "2-bedroom", field: "r2" },
  { label: "3BR / house", field: "r3" },
  { label: "Minimum lease", field: "min" },
  { label: "HOA strictness", field: "strict" },
  { label: "Furnished seasonal?", field: "furn" },
  { label: "Days on market", field: "dom" },
  { label: "The vibe", field: "vibe" },
  { label: "Chuk's take", field: "take" },
];

export type Vibe = { key: string; label: string; html: string };

export const vibes: Vibe[] = [
  { key: "golf", label: "⛳ Golf & quiet", html: "<b>You're PGA National or Mirasol.</b> Fairways out the window, quiet streets, resort pools. $3,500–$7,000/mo — I'll line up the golf homes first." },
  { key: "walk", label: "🚲 Walkable", html: "<b>You're Abacoa.</b> Porches, bikes, a Saturday farmers market. $3,800–$5,200/mo — my families love it there." },
  { key: "night", label: "🌃 Nightlife", html: "<b>You're Downtown Clematis.</b> Dinner, live music, the waterfront — plus the Brightline when Miami calls. $2,500–$4,000/mo." },
  { key: "family", label: "🎓 Schools", html: "<b>You're Abacoa or Egret Landing.</b> Jupiter schools, front porches, kids on bikes till dinner. $3,800–$7,000/mo." },
];

/** "HOA: checked" framing shown on homepage listing cards, keyed by property id. */
export const listingHoaFraming: Record<string, string> = {
  "abacoa-3br-001": "HOA: I checked — ≈ 2 wks",
  "mirasol-4br-002": "HOA: I checked — ≈ 10 days",
  "clematis-2br-003": "No HOA — fastest move-in",
  "intracoastal-seasonal-004": "HOA: I checked — ≈ 1 wk",
  "flamingo-3br-005": "No HOA — fastest move-in",
  "pga-3br-006": "HOA: I checked — ≈ 12 days",
};

/** Tags shown on homepage listing cards, keyed by property id (from the v2 mockup). */
export const listingTags: Record<string, string[]> = {
  "abacoa-3br-001": ["Dog-friendly", "Porch + fenced yard"],
  "mirasol-4br-002": ["Golf front", "Pool"],
  "clematis-2br-003": ["Walk to Brightline"],
  "intracoastal-seasonal-004": ["Furnished Dec–Apr", "Dock + lift"],
  "flamingo-3br-005": ["Dog-friendly", "Historic 1940s"],
  "pga-3br-006": ["Pool", "Champion course"],
};

/** Quick-chip filter keys used by the hero search card. */
export const listingTagKeys: Record<string, string[]> = {
  "abacoa-3br-001": ["pet"],
  "mirasol-4br-002": ["golf"],
  "clematis-2br-003": ["pet"],
  "intracoastal-seasonal-004": ["seasonal"],
  "flamingo-3br-005": ["pet"],
  "pga-3br-006": ["golf", "seasonal"],
};
