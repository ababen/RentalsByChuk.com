"use client";
import { useState, useMemo } from "react";
import { getAllProperties, formatPrice } from "@/lib/properties";

// Demo fallback data matching mockup exactly
const demoListings = [
  { id: "d1", city: "Jupiter", title: "3BR Single-Family — Abacoa", price: "$4,850/mo", beds: "3bd • 2ba • 1,850 sqft", hood: "Abacoa • Gated", badge: "Abacoa", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop", tag: "Pet-Friendly", hoa: "HOA: 14 days", badgeClass: "" },
  { id: "d2", city: "Palm Beach Gardens", title: "4BR Golf Home — Mirasol", price: "$6,400/mo", beds: "4bd • 3ba • 2,600 sqft", hood: "Mirasol • Golf", badge: "Mirasol", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop", tag: "Golf Front", hoa: "HOA: 10 days", badgeClass: "" },
  { id: "d3", city: "West Palm Beach", title: "2BR Loft — Downtown Clematis", price: "$2,950/mo", beds: "2bd • 2ba • 1,100 sqft", hood: "Downtown • Walkable", badge: "Downtown", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop", tag: "New Listing", hoa: "No HOA", badgeClass: "" },
  { id: "d4", city: "Jupiter", title: "Intracoastal Furnished — Seasonal", price: "$12,500/mo", beds: "3bd • 2.5ba • Furnished", hood: "Intracoastal • Seasonal Dec-Apr", badge: "Seasonal", img: "https://images.unsplash.com/photo-1600566753190-17f63baa68a8?q=80&w=800&auto=format&fit=crop", tag: "Seasonal", hoa: "HOA: 7 days", badgeClass: "bg-[#2EC4B6] !text-[#0B1D3A]" },
  { id: "d5", city: "West Palm Beach", title: "3BR Bungalow — Flamingo Park", price: "$3,350/mo", beds: "3bd • 2ba • 1,400 sqft", hood: "Flamingo Park • Historic", badge: "Flamingo Park", img: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=800&auto=format&fit=crop", tag: "Pet-Friendly", hoa: "No HOA", badgeClass: "" },
  { id: "d6", city: "Palm Beach Gardens", title: "3BR — PGA National", price: "$4,200/mo", beds: "3bd • 2ba • 1,950 sqft", hood: "PGA National • Resort", badge: "PGA National", img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=800&auto=format&fit=crop", tag: "Pool", hoa: "HOA: 12 days", badgeClass: "" },
];

const hoaDB: Record<string, { name: string; city: string; hoa: string; board: string; max: string; str: string; grand: string }> = {
  mirasol: { name: "Mirasol", city: "PBG", hoa: "6-mo min ✓", board: "Yes — 10-15 days • $150/app", max: "2× / year", str: "Prohibited — $100/day fines", grand: "No — 6mo retroactive" },
  abacoa: { name: "Abacoa", city: "Jupiter", hoa: "6-mo min (varies by village)", board: "Yes — 5-10 days • $75/app", max: "3× / year", str: "30-day min only", grand: "Village-specific — we check" },
  frenchman: { name: "Frenchman's Creek", city: "PBG", hoa: "12-mo min", board: "Yes — 15-30 days • interview", max: "1× / year", str: "Prohibited", grand: "Pre-2021 may be grandfathered" },
  "pga national": { name: "PGA National", city: "PBG", hoa: "6-mo min ✓", board: "Yes — 12 days • $100/app", max: "2× / year", str: "Prohibited", grand: "No — 6mo retroactive" },
  ballenisles: { name: "BallenIsles", city: "PBG", hoa: "6-mo min ✓", board: "Yes — 14 days • $150/app", max: "2× / year", str: "Prohibited", grand: "No — retroactive" },
  "admirals cove": { name: "Admirals Cove", city: "Jupiter", hoa: "12-mo min", board: "Board + club approval • 20 days", max: "1× / year", str: "Prohibited", grand: "Check estoppel" },
};

function lookupHoa(q: string) {
  if (!q.trim()) return null;
  const k = q.toLowerCase();
  for (const key in hoaDB) if (k.includes(key) || key.includes(k)) return hoaDB[key];
  return { name: q, city: "PBG/Jupiter", hoa: "Check governing docs", board: "Varies — we verify", max: "Varies", str: "Varies — many prohibit", grand: "We check §720.306 for you" };
}

export default function Home() {
  // Build real listings mapped to card shape, fallback to demo
  const realProps = getAllProperties();
  const listings = useMemo(() => {
    if (realProps.length >= 6) {
      return realProps.slice(0, 6).map((p) => ({
        id: p.id, city: p.city, title: p.title,
        price: formatPrice(p.price),
        beds: `${p.beds}bd • ${p.baths}ba • ${p.sqft.toLocaleString()} sqft`,
        hood: `${p.neighborhood} • ${p.type}`,
        badge: p.neighborhood,
        img: p.images[0],
        tag: p.petFriendly ? "Pet-Friendly" : p.seasonal ? "Seasonal" : p.golf ? "Golf Front" : "New Listing",
        hoa: p.hoa,
        badgeClass: p.seasonal ? "bg-[#2EC4B6] !text-[#0B1D3A]" : "",
      }));
    }
    return demoListings;
  }, [realProps]);

  // State
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [beds, setBeds] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [hoaQ, setHoaQ] = useState("");
  const [hoaResult, setHoaResult] = useState(() => lookupHoa("mirasol")!);
  const [quizOpen, setQuizOpen] = useState(false);
  const [annual, setAnnual] = useState(5200);
  const [premium, setPremium] = useState(210);
  const [vacancy, setVacancy] = useState(2);

  function showToast(m: string) { setToast(m); setTimeout(() => setToast(null), 2200); }

  function doSearch() {
    if (city) setFilterCity(city);
    showToast(`Searching: ${[q, city, beds].filter(Boolean).join(" • ") || "All rentals"}`);
    document.getElementById("rentals")?.scrollIntoView({ behavior: "smooth" });
  }
  function fillQ(t: string) { setQ(t); if (city) setFilterCity(city); showToast(`Searching: ${t}${city ? " • " + city : ""}`); document.getElementById("rentals")?.scrollIntoView({ behavior: "smooth" }); }
  function handleHoaSearch(val: string) {
    setHoaQ(val);
    const r = lookupHoa(val);
    if (r) { setHoaResult(r); showToast("HOA record found for " + r.name); }
  }

  // filter listings
  const filtered = useMemo(() => {
    let list = listings;
    if (filterCity) list = list.filter((x) => x.city === filterCity);
    if (q.trim() && filterCity) {
      // when search was explicitly triggered, also filter by q text
      const qq = q.toLowerCase();
      list = list.filter((x) => `${x.title} ${x.hood} ${x.badge} ${x.city} ${x.tag}`.toLowerCase().includes(qq));
    } else if (q.trim() && !filterCity) {
      // allow q filtering even without city when user typed
      // only filter if doSearch was used - but we track via q; simple: if q set, filter
      // Actually keep all unless user clicked Search - so no auto-filter on type
    }
    // beds filter (demo: parse beds string not needed, just keep city filter behavior from mockup)
    return list;
  }, [listings, filterCity, q]);

  // calculator
  const seasonalMonthly = Math.round(annual * (premium / 100));
  const annualNet = annual * 12;
  const seasonalNet = seasonalMonthly * 5 + annual * (7 - vacancy);
  const diff = seasonalNet - annualNet;

  const filteredForDisplay = (() => {
    // Apply q filter when search triggered (city synced to filterCity)
    // For direct pill clicks: q is set but we already show toast + scroll
    // To match mockup JS: filterListings only filters by city, doSearch also filters by city
    // So we filter by filterCity only, plus optional q substring if q non-empty and search was triggered
    // Simpler: if q non-empty, also substring filter
    if (!filterCity && !q.trim()) return listings;
    let r = listings;
    if (filterCity) r = r.filter((x) => x.city === filterCity);
    if (q.trim()) {
      const qq = q.toLowerCase();
      const sub = r.filter((x) => `${x.title} ${x.hood} ${x.badge} ${x.tag} ${x.city}`.toLowerCase().includes(qq));
      // If substring yields results, use it; otherwise keep city filter only (so "Pet-friendly" still works via toast)
      if (sub.length > 0) r = sub;
    }
    return r;
  })();

  return (
    <div>
      {/* HERO */}
      <section className="bg-gradient-to-b from-[#F4EDE2] to-[#FCFBF8] py-9">
        <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-[1.15fr_.85fr] gap-7 items-center">
          <div>
            <div className="text-[11px] tracking-[0.14em] font-extrabold text-[#0CA89A] uppercase">Rentals-only Realtor • The Northern Triangle</div>
            <h1 className="text-[40px] lg:text-[54px] leading-[0.95] tracking-[-0.02em] mt-1" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}>
              Find your<br /><i className="font-normal text-[#FF6B4A]">village,</i> not just<br />a rental.
            </h1>
            <p className="mt-3.5 text-[#57534E] text-[16px] max-w-[560px]">
              We do <b className="text-[#0B1D3A]">only rentals</b> in <b className="text-[#0B1D3A]">West Palm Beach, Palm Beach Gardens &amp; Jupiter</b>. No sales pitch. Just neighborhood-level pricing, HOA clearance, and video-first tours.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="bg-white border border-[#E7E5E4] px-3 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5">✓ HOA Approval Timeline Upfront</span>
              <span className="bg-white border border-[#E7E5E4] px-3 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5">✓ Seasonal vs. Annual Math</span>
              <span className="bg-[#0B1D3A] text-white border border-[#0B1D3A] px-3 py-1.5 rounded-full text-xs font-bold">21-Day Lease Guarantee</span>
            </div>

            {/* Search panel */}
            <div className="mt-[18px] bg-white border border-[#E7E5E4] rounded-[20px] p-3.5 flex flex-wrap gap-2.5 items-center shadow-[0_6px_20px_rgba(0,0,0,0.05)]">
              <input id="q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by community, address, or ZIP (try 'Abacoa')" className="flex-1 min-w-[180px] border border-[#E7E5E4] rounded-full px-3.5 py-2.5 text-sm outline-none bg-white" />
              <select value={city} onChange={(e) => setCity(e.target.value)} className="border border-[#E7E5E4] rounded-full px-3.5 py-2.5 text-sm bg-white outline-none">
                <option value="">All 3 Cities</option>
                <option>West Palm Beach</option>
                <option>Palm Beach Gardens</option>
                <option>Jupiter</option>
              </select>
              <select value={beds} onChange={(e) => setBeds(e.target.value)} className="border border-[#E7E5E4] rounded-full px-3.5 py-2.5 text-sm bg-white outline-none">
                <option value="">Any beds</option>
                <option>1+ bed</option>
                <option>2+ beds</option>
                <option>3+ beds</option>
                <option>4+ beds</option>
              </select>
              <button onClick={doSearch} className="bg-[#0B1D3A] text-white px-[18px] py-[11px] rounded-full text-sm font-bold inline-flex items-center gap-2 hover:bg-[#13294B]" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>Search →</button>
            </div>

            <div className="mt-2.5 flex flex-wrap gap-2">
              {[
                ["🐾 Pet-friendly", "Pet-friendly"],
                ["🌊 Waterfront", "Waterfront"],
                ["☀️ Furnished seasonal", "Furnished seasonal"],
                ["⛳ Mirasol", "Mirasol"],
                ["🌃 Downtown Clematis", "Downtown Clematis"],
              ].map(([label, val]) => (
                <button key={label} onClick={() => fillQ(val)} className="bg-white border border-[#E7E5E4] px-3 py-1.5 rounded-full text-xs font-bold hover:border-[#0B1D3A]">{label}</button>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2.5">
              <div className="bg-white border border-[#E7E5E4] rounded-2xl p-3">
                <div className="font-extrabold text-lg" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>687</div>
                <div className="text-[11px] font-extrabold tracking-[0.06em] uppercase text-[#78716C]">PBG rentals — tight</div>
                <div className="text-xs text-[#0CA89A] font-semibold">↓ 20% YoY</div>
              </div>
              <div className="bg-white border border-[#E7E5E4] rounded-2xl p-3">
                <div className="font-extrabold text-lg" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>~5%</div>
                <div className="text-[11px] font-extrabold tracking-[0.06em] uppercase text-[#78716C]">Jupiter vacancy</div>
                <div className="text-xs text-[#FF6B4A] font-semibold">94-96% occupied</div>
              </div>
              <div className="bg-white border border-[#E7E5E4] rounded-2xl p-3">
                <div className="font-extrabold text-lg" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>+2.2%</div>
                <div className="text-[11px] font-extrabold tracking-[0.06em] uppercase text-[#78716C]">WPB rent growth YoY</div>
                <div className="text-xs text-[#0CA89A] font-semibold">vs. FL declining</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="h-[320px] lg:h-[420px] rounded-3xl overflow-hidden border border-[#E7E5E4] bg-cover bg-center" style={{ backgroundImage: "linear-gradient(180deg,rgba(11,29,58,.08),rgba(11,29,58,.35)), url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop)" }} />
            <div className="absolute -left-3 bottom-4 bg-white border border-[#E7E5E4] rounded-2xl p-3 flex gap-3 items-center shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" alt="" className="w-11 h-11 rounded-full object-cover" />
              <div>
                <div className="font-extrabold text-[13px]" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>Chuk • Rentals-Only</div>
                <div className="text-xs text-[#78716C]">Avg. 21 days to lease • 561-555-0142</div>
                <div className="mt-1.5 flex gap-1.5"><span className="bg-[#0B1D3A] text-white px-2 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase">Text Chuk</span><span className="bg-white border border-[#E7E5E4] px-2 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase">WhatsApp</span></div>
              </div>
            </div>
            <div className="absolute top-3.5 right-3.5 bg-white border border-[#E7E5E4] rounded-2xl p-3 shadow-[0_6px_18px_rgba(0,0,0,0.08)]">
              <div className="text-[11px] tracking-[0.14em] font-extrabold text-[#0CA89A] uppercase">Live Market Pulse</div>
              <div className="mt-1.5 grid gap-1 text-xs">
                <div><b>Jupiter 3BR SFH</b> $4,150 <span className="text-[#0CA89A]">↑ 2.8%</span></div>
                <div><b>WPB Central</b> asking +10% YoY</div>
                <div><b>PBG Median</b> $2,944 <span className="text-[#FF6B4A]">• 18 DOM</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PULSE BAR */}
      <div className="bg-[#0B1D3A] text-white py-3.5">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-wrap gap-3.5 items-center justify-between">
          <div className="font-extrabold tracking-[0.04em] text-xs" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>LIVE PULSE — OCT 2026</div>
          <div className="flex flex-wrap gap-2.5 items-center">
            <span className="bg-white/10 border border-white/15 px-3 py-2 rounded-full text-xs font-bold inline-flex gap-2"><b className="text-[#2EC4B6]">WPB:</b> +2.2% YoY • 2,150 median 2BR</span>
            <span className="bg-white/10 border border-white/15 px-3 py-2 rounded-full text-xs font-bold inline-flex gap-2"><b className="text-[#2EC4B6]">PBG:</b> $2,944 median • -20% inventory</span>
            <span className="bg-white/10 border border-white/15 px-3 py-2 rounded-full text-xs font-bold inline-flex gap-2"><b className="text-[#2EC4B6]">JUP:</b> 5% vacancy • 14-28 days to lease</span>
            <a href="#reports" className="bg-white text-[#0B1D3A] px-3 py-2 rounded-full font-extrabold text-xs">Full Report →</a>
          </div>
        </div>
      </div>

      {/* FEATURED */}
      <section id="rentals" className="py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-[18px]">
            <div><div className="text-[11px] tracking-[0.14em] font-extrabold text-[#0CA89A] uppercase">Featured Rentals — Updated Today</div><h2 className="text-[34px] leading-tight" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}>Homes that lease in days, not months.</h2></div>
            <div className="flex gap-2 items-center">
              <select value={filterCity} onChange={(e) => setFilterCity(e.target.value)} className="border border-[#E7E5E4] rounded-full px-3 py-2 bg-white text-sm">
                <option value="">All cities</option><option>West Palm Beach</option><option>Palm Beach Gardens</option><option>Jupiter</option>
              </select>
              <a href="#" className="bg-white border border-[#E7E5E4] px-4 py-2 rounded-full text-sm font-bold">View All 1,847 →</a>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {filteredForDisplay.map((l) => (
              <div key={l.id} className="bg-white border border-[#E7E5E4] rounded-[20px] overflow-hidden">
                <div className="h-[170px] bg-[#E7E5E4] relative overflow-hidden">
                  <img src={l.img} alt="" className="w-full h-full object-cover" />
                  <span className={`absolute top-2.5 left-2.5 px-2.5 py-1.5 rounded-full text-[11px] font-extrabold tracking-[0.06em] uppercase bg-[rgba(11,29,58,0.92)] text-white ${l.badgeClass}`}>{l.badge}</span>
                  <span className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 grid place-items-center border border-[#E7E5E4] cursor-pointer">♡</span>
                  <span className="absolute bottom-2.5 left-2.5 bg-white border border-[#E7E5E4] px-2.5 py-1.5 rounded-full text-[11px] font-extrabold">{l.hoa}</span>
                </div>
                <div className="p-3.5">
                  <div className="font-extrabold text-[18px]" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>{l.price} <span className="font-medium text-[#78716C] text-[13px]">• {l.hood}</span></div>
                  <div className="font-bold mt-0.5">{l.title}</div>
                  <div className="text-[#78716C] text-[13px]">{l.beds}</div>
                  <div className="mt-2.5 flex gap-2 flex-wrap items-center">
                    <span className="bg-white border border-[#E7E5E4] px-3 py-1.5 rounded-full text-xs font-bold">{l.tag}</span>
                    <span className="bg-white border border-[#E7E5E4] px-3 py-1.5 rounded-full text-xs font-bold">{l.city}</span>
                    <a href="#" className="ml-auto bg-[#0B1D3A] text-white px-3 py-2 rounded-full text-[13px] font-bold inline-flex items-center gap-1" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>Tour →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3.5 flex gap-2 flex-wrap">
            <span className="bg-[#F4EDE2] border border-[#E7E5E4] px-3 py-1.5 rounded-full text-xs font-bold">🏠 3BR under $4k in Jupiter</span>
            <span className="bg-[#F4EDE2] border border-[#E7E5E4] px-3 py-1.5 rounded-full text-xs font-bold">⛳ Golf community SFH</span>
            <span className="bg-[#F4EDE2] border border-[#E7E5E4] px-3 py-1.5 rounded-full text-xs font-bold">🌴 Furnished seasonal — Dec-Apr</span>
          </div>
        </div>
      </section>

      {/* RESCUE */}
      <section className="pb-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <div id="landlords" className="bg-gradient-to-br from-[#FFF1E6] via-[#FFE4D6] to-[#FFD1B8] border border-[#FDBA74] rounded-3xl p-[22px] grid lg:grid-cols-[1.1fr_.9fr] gap-[18px] items-center relative overflow-hidden">
            <div>
              <div className="text-[11px] tracking-[0.14em] font-extrabold text-[#9A3412] uppercase">For Landlords • Accidental Landlord Rescue</div>
              <h2 className="text-[32px] mt-1.5" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}>Didn&apos;t sell? <span className="text-[#FF6B4A]">Rent smart.</span></h2>
              <p className="text-[#7C2D12] text-sm mt-2">55.9% of WPB listings sat 60+ days. If you&apos;re holding a $750k+ home that won&apos;t move, renting beats a price cut — if you price by <i>neighborhood</i>, not ZIP.</p>
              <ul className="mt-3 grid gap-2">
                {[
                  "Should I rent or sell my 2026 home?",
                  "Get my 48-hr Rental Analysis",
                  "Rent vs. Sell Math for my address",
                ].map((t, i) => (
                  <li key={t} onClick={() => showToast(i === 0 ? "Great — we'll run rent comps by *your* street, not county avg." : i === 1 ? "48-hr Rental Analysis — free. We pull live comps in Abacoa, Mirasol, etc." : "Calculator opened below ↓")} className="bg-white border border-[#E7E5E4] rounded-[14px] px-3 py-2.5 flex justify-between items-center text-[13px] font-semibold cursor-pointer hover:border-[#0B1D3A]">{t} <span>→</span></li>
                ))}
              </ul>
              <div className="mt-3 flex gap-2"><a href="#estimate" className="bg-[#0B1D3A] text-white px-[18px] py-[11px] rounded-full text-sm font-bold">Get Free Estimate</a><a href="#" className="bg-white border border-[#E7E5E4] px-[18px] py-[11px] rounded-full text-sm font-bold">See 2-tier landlord guide</a></div>
            </div>
            <div className="bg-white border border-[#E7E5E4] rounded-[20px] p-4">
              <div className="text-[11px] tracking-[0.14em] font-extrabold text-[#0CA89A] uppercase">What mispricing costs</div>
              <div className="mt-2 flex justify-between text-[13px]"><span>Overpriced 10% → 38-52 days vacant</span><b className="text-[#FF6B4A]">-$2,450</b></div>
              <div className="mt-2 h-2.5 bg-[#E7E5E4] rounded-full overflow-hidden"><div className="h-full bg-[#FF6B4A] w-[68%]" /></div>
              <div className="text-[10px] tracking-[0.06em] uppercase text-[#78716C] mt-1">Atlis audit of failed self-listings • 600 doors</div>
              <div className="mt-2 grid grid-cols-2 gap-2.5">
                <div className="bg-[#F4EDE2] border border-[#E7DDCC] rounded-2xl p-3.5"><div className="text-[11px] tracking-[0.14em] font-extrabold text-[#0CA89A] uppercase">Correct price</div><b className="text-[22px]" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>14-21 days</b><div className="text-[#78716C] text-[13px]">to lease</div></div>
                <div className="bg-[#F4EDE2] border border-[#E7DDCC] rounded-2xl p-3.5"><div className="text-[11px] tracking-[0.14em] font-extrabold text-[#0CA89A] uppercase">Our avg</div><b className="text-[22px]" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>21 days</b><div className="text-[#78716C] text-[13px]">lease-up</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MATCHMAKER */}
      <section className="bg-white border-y border-[#E7E5E4] py-12">
        <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-4 items-center">
          <div>
            <div className="text-[11px] tracking-[0.14em] font-extrabold text-[#0CA89A] uppercase">Neighborhood Matchmaker</div>
            <h2 className="text-[34px]" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}>Find my village.</h2>
            <p className="text-[#57534E] text-sm mt-2">8 questions. 90-second video. 3 live matches with school + commute. Because Downtown Clematis ≠ Abacoa ≠ PGA National.</p>
            <div className="mt-3.5 flex flex-wrap gap-2 items-center">
              <button onClick={() => { setQuizOpen(true); showToast("Match: Abacoa • Jupiter"); }} className="bg-[#0B1D3A] text-white px-[18px] py-[11px] rounded-full text-sm font-bold">Take 60-Sec Quiz →</button>
              <span className="bg-white border border-[#E7E5E4] px-3 py-1.5 rounded-full text-xs font-bold">⛳ Golf</span><span className="bg-white border border-[#E7E5E4] px-3 py-1.5 rounded-full text-xs font-bold">🌊 Intracoastal</span><span className="bg-white border border-[#E7E5E4] px-3 py-1.5 rounded-full text-xs font-bold">🚲 Walkable</span><span className="bg-white border border-[#E7E5E4] px-3 py-1.5 rounded-full text-xs font-bold">🎓 Schools</span>
            </div>
            {quizOpen && <div className="mt-3 bg-[#F4EDE2] border border-[#E7DDCC] rounded-[14px] p-3 text-sm"><b>You&apos;re an Abacoa person.</b> Walkable, young, bikes to the green. 3BR $3,800-$5,200. <a href="#" className="text-[#0CA89A] font-bold">See 7 live matches →</a></div>}
          </div>
          <div className="bg-white border border-[#E7E5E4] rounded-[20px] overflow-hidden">
            <div className="h-[220px] flex items-center justify-center text-[#0B1D3A] text-[28px]" style={{ background: "linear-gradient(135deg,#E8DDD0,#2EC4B6)", fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}>Abacoa Green — Jupiter</div>
            <div className="p-3.5 flex justify-between items-center">
              <div><b>Abacoa</b> — bikes, porches, farmers market <div className="text-[#78716C] text-[13px]">3BR SFH $3,800-$5,200 • Most walkable in Jupiter</div></div>
              <a href="#" className="bg-white border border-[#E7E5E4] px-3.5 py-2 rounded-full text-sm font-bold shrink-0 ml-2">Watch 60s →</a>
            </div>
          </div>
        </div>
      </section>

      {/* HOA CHECKER */}
      <section id="hoa" className="py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="bg-[#0B1D3A] text-white rounded-3xl p-[22px] grid lg:grid-cols-[1.05fr_.95fr] gap-[18px] overflow-hidden">
            <div>
              <div className="text-[11px] tracking-[0.14em] font-extrabold text-[#2EC4B6] uppercase">The Moat — HOA Rental Rights Checker</div>
              <h2 className="text-white text-[30px] lg:text-[34px]" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}>Check before you list. Or pay later.</h2>
              <p className="text-[#CBD5E1] text-sm mt-2">PBG &amp; Jupiter are HOA minefields. 6-mo minimums, 3x/year caps, board denials. Search any of 300+ communities — see if you&apos;re grandfathered.</p>
              <div className="mt-3.5 flex gap-2 bg-white rounded-full p-1.5 border border-[#E7E5E4]">
                <input value={hoaQ} onChange={(e) => handleHoaSearch(e.target.value)} placeholder="Try 'Mirasol' or 'Abacoa' or 'BallenIsles'" className="flex-1 border-0 outline-none px-3 py-2 text-sm rounded-full text-[#0B1D3A]" />
                <button onClick={() => handleHoaSearch(hoaQ)} className="bg-[#0B1D3A] text-white px-4 py-2 rounded-full text-sm font-bold">Check →</button>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {["Mirasol", "Abacoa", "Frenchman", "PGA National"].map((n) => (
                  <button key={n} onClick={() => { setHoaQ(n); const r = lookupHoa(n); if (r) setHoaResult(r); showToast("HOA record found for " + (r?.name || n)); }} className="bg-white/10 border border-white/15 text-white px-3 py-1.5 rounded-full text-xs font-bold">{n}</button>
                ))}
              </div>
              <div className="text-[11px] tracking-[0.06em] uppercase text-[#94A3B8] mt-2.5">Demo data • Full DB = 300+ • Attorney-reviewed $199</div>
            </div>
            <div className="bg-[#0E2246] border border-[#1E3A5F] rounded-2xl p-3.5 grid gap-2.5 content-start">
              <div className="flex justify-between gap-3 px-3 py-2.5 bg-white/10 rounded-xl text-[13px]"><span><b>{hoaResult.name}</b> — {hoaResult.city}</span><span className="text-[#2EC4B6] font-extrabold">{hoaResult.hoa}</span></div>
              <div className="flex justify-between gap-3 px-3 py-2.5 bg-white/10 rounded-xl text-[13px]"><span>Board approval</span><b>{hoaResult.board}</b></div>
              <div className="flex justify-between gap-3 px-3 py-2.5 bg-white/10 rounded-xl text-[13px]"><span>Max rentals / year</span><b>{hoaResult.max}</b></div>
              <div className="flex justify-between gap-3 px-3 py-2.5 bg-white/10 rounded-xl text-[13px]"><span>Short-term (Airbnb)</span><b className="text-[#FF6B4A]">{hoaResult.str}</b></div>
              <div className="flex justify-between gap-3 px-3 py-2.5 bg-white/10 rounded-xl text-[13px]"><span>Grandfathered if bought before</span><b>{hoaResult.grand}</b></div>
              <a href="#" className="bg-[#FF6B4A] text-white px-4 py-2.5 rounded-full text-sm font-bold text-center mt-1">Get Attorney Review $199 →</a>
            </div>
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="pb-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="bg-white border border-[#E7E5E4] rounded-3xl p-[22px] grid lg:grid-cols-2 gap-[18px]">
            <div>
              <div className="text-[11px] tracking-[0.14em] font-extrabold text-[#0CA89A] uppercase">Seasonal vs. Annual Engine</div>
              <h2 className="text-[28px] lg:text-[34px]" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}>Two markets. One house. Do the math.</h2>
              <p className="text-[#57534E] text-sm mt-2">Jupiter runs annual + seasonal simultaneously. Furnished Dec-Apr can be 2-3× annual rent. Model both.</p>
              <div className="mt-3.5 grid gap-3">
                <label className="text-[13px] font-bold">Annual rent (unfurnished)
                  <input type="range" min={2500} max={9000} value={annual} onChange={(e) => setAnnual(parseInt(e.target.value))} className="w-full accent-[#FF6B4A] mt-1" />
                  <div className="flex justify-between text-[11px] tracking-[0.06em] uppercase"><span>$2,500</span><b>${annual.toLocaleString()}/mo</b><span>$9,000</span></div>
                </label>
                <label className="text-[13px] font-bold">Seasonal premium (Dec-Apr)
                  <input type="range" min={120} max={300} value={premium} onChange={(e) => setPremium(parseInt(e.target.value))} className="w-full accent-[#FF6B4A] mt-1" />
                  <div className="flex justify-between text-[11px] tracking-[0.06em] uppercase"><span>1.2×</span><b>{(premium / 100).toFixed(1)}×</b><span>3.0×</span></div>
                </label>
                <label className="text-[13px] font-bold">Summer vacancy tolerance
                  <input type="range" min={0} max={4} value={vacancy} onChange={(e) => setVacancy(parseInt(e.target.value))} className="w-full accent-[#FF6B4A] mt-1" />
                  <div className="flex justify-between text-[11px] tracking-[0.06em] uppercase"><span>0 mo</span><b>{vacancy} mo vacant</b><span>4 mo</span></div>
                </label>
              </div>
            </div>
            <div>
              <div className="grid gap-2.5">
                <div className="bg-[#F4EDE2] border border-[#E7DDCC] rounded-2xl p-3.5"><div className="text-[11px] tracking-[0.14em] font-extrabold text-[#0CA89A] uppercase">Annual strategy</div><b className="text-[22px]" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>${annualNet.toLocaleString()} / yr</b><div className="text-[#78716C] text-[13px]">${annual.toLocaleString()} × 12 • 0 vacancy</div></div>
                <div className="bg-[#0B1D3A] text-white border border-[#0B1D3A] rounded-2xl p-3.5"><div className="text-[11px] tracking-[0.14em] font-extrabold text-[#2EC4B6] uppercase">Seasonal strategy</div><b className="text-[22px]" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>${seasonalNet.toLocaleString()} / yr</b><div className="text-[#CBD5E1] text-[13px]">5 mo @ ${seasonalMonthly.toLocaleString()} + {7 - vacancy} mo @ ${annual.toLocaleString()}{vacancy ? ` minus ${vacancy} mo vacant` : ""}</div></div>
                <div className="bg-[#ECFDF5] border border-[#6EE7B7] rounded-[14px] px-3 py-2.5 text-[13px]"><b className="text-[#065F46]">Winner: {diff >= 0 ? `Seasonal by $${diff.toLocaleString()}` : `Annual by $${Math.abs(diff).toLocaleString()}`}</b> — but requires furnishing ($8k-$15k) + HOA allows it. <a href="#" className="text-[#0CA89A] font-bold">See full playbook →</a></div>
              </div>
              <div className="mt-2.5 flex gap-2"><a href="#" className="bg-[#0B1D3A] text-white px-4 py-2.5 rounded-full text-sm font-bold">Model My Property</a><a href="#" className="bg-white border border-[#E7E5E4] px-4 py-2.5 rounded-full text-sm font-bold">Watch: Jupiter Two-Market Playbook</a></div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITIES */}
      <section id="communities" className="py-12 bg-white border-y border-[#E7E5E4]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex justify-between items-center mb-[18px] flex-wrap gap-3"><h2 className="text-[28px] lg:text-[34px]" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}>12 Villages. Know them like a local.</h2><a href="#" className="bg-white border border-[#E7E5E4] px-4 py-2 rounded-full text-sm font-bold">All Communities →</a></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            {[
              { n: "Downtown Clematis", c: "WPB • $2,500-$4k • Walkable", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600&auto=format&fit=crop" },
              { n: "Flamingo Park", c: "WPB • Historic • $2,200-$3,500", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop" },
              { n: "Northwood", c: "WPB • Revitalizing • $1,800-$2,800", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop" },
              { n: "Mirasol", c: "PBG • Golf • $4k-$7k", img: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=600&auto=format&fit=crop" },
              { n: "PGA National", c: "PBG • Resort • $3,500-$6k", img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=600&auto=format&fit=crop" },
              { n: "Abacoa", c: "Jupiter • Walkable • $3,800-$5,200", img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=600&auto=format&fit=crop" },
              { n: "Intracoastal", c: "Jupiter • Waterfront • $8k-$25k+", img: "https://images.unsplash.com/photo-1600566753190-17f63baa68a8?q=80&w=600&auto=format&fit=crop" },
              { n: "Egret Landing", c: "Jupiter • Gated • $4,500-$7k", img: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=600&auto=format&fit=crop" },
            ].map((x) => (
              <a key={x.n} href="#" className="relative h-[180px] rounded-[20px] overflow-hidden border border-[#E7E5E4] group">
                <img src={x.img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 35%, rgba(11,29,58,.75) 100%)" }} />
                <div className="absolute bottom-3 left-3.5 text-white"><div className="font-extrabold text-sm" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>{x.n}</div><div className="text-[11px] tracking-[0.06em] uppercase text-[#E2E8F0]">{x.c}</div></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* RELOCATION */}
      <section className="py-12" style={{ background: "linear-gradient(180deg,#F4EDE2 0%, #FCFBF8 100%)" }}>
        <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-4 items-center">
          <div className="bg-white border border-[#E7E5E4] rounded-[20px] overflow-hidden">
            <div className="h-60 flex items-center justify-center" style={{ background: "linear-gradient(135deg,#0B1D3A,#2EC4B6)" }}>
              <div className="text-center text-white"><div className="text-[28px]" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}>Try-Before-You-Buy</div><div className="text-[11px] tracking-[0.06em] uppercase text-[#E0F2F1]">6-mo rental + 3 home tours + schools</div><div className="mt-2.5"><span className="bg-white text-[#0B1D3A] px-3 py-2 rounded-full font-extrabold text-[13px]">From NY/NJ? Start here →</span></div></div>
            </div>
            <div className="p-3.5"><b>Rent smart. Buy smarter.</b><div className="text-[#78716C] text-[13px] mt-1">Relocating professionals rent 12-24 months while house-hunting. We make the landing soft — then feed HomesByChuk when you&apos;re ready.</div></div>
          </div>
          <div>
            <div className="text-[11px] tracking-[0.14em] font-extrabold text-[#0CA89A] uppercase">Relocation • Corporate</div>
            <h2 className="text-[28px] lg:text-[34px]" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}>Moving a hospital team? A fund? A family?</h2>
            <p className="text-[#57534E] text-sm mt-2">We invoice the employer. Jupiter Medical, Good Samaritan, Scripps, PGA HQ, WPB finance — annual leases, pre-qualified, zero hassle.</p>
            <div className="mt-3.5 grid gap-2">
              <div className="bg-white border border-[#E7E5E4] rounded-[14px] p-3 flex justify-between items-center"><span><b>For Employers</b><div className="text-[#78716C] text-[13px]">Volume housing for incoming cohorts</div></span><a href="#" className="bg-[#0B1D3A] text-white px-4 py-2 rounded-full text-sm font-bold">Partner →</a></div>
              <div className="bg-white border border-[#E7E5E4] rounded-[14px] p-3 flex justify-between items-center"><span><b>For Families</b><div className="text-[#78716C] text-[13px]">Schools, commute, village match</div></span><a href="#" className="bg-white border border-[#E7E5E4] px-4 py-2 rounded-full text-sm font-bold">Start Relocation Quiz</a></div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="py-12 bg-white border-t border-[#E7E5E4]">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-3 gap-3.5">
          <div className="bg-white border border-[#E7E5E4] rounded-[20px] text-center p-[18px]"><div className="text-[28px]">⭐ 4.9</div><div className="font-extrabold" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>Google Reviews</div><div className="text-[#78716C] text-[13px]">From tenants &amp; landlords • WPB/PBG/Jupiter only</div></div>
          <div className="bg-white border border-[#E7E5E4] rounded-[20px] text-center p-[18px]"><div className="text-[28px]">21 days</div><div className="font-extrabold" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>Avg. to Lease</div><div className="text-[#78716C] text-[13px]">Guaranteed or 1 month free management</div></div>
          <div className="bg-white border border-[#E7E5E4] rounded-[20px] text-center p-[18px]"><div className="text-[28px]">300+</div><div className="font-extrabold" style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}>HOAs Checked</div><div className="text-[#78716C] text-[13px]">Don&apos;t list before you know the rules</div></div>
        </div>
      </section>

      {/* TOAST */}
      {toast && <div className="fixed bottom-[18px] left-1/2 -translate-x-1/2 bg-[#0B1D3A] text-white px-4 py-3 rounded-full text-[13px] font-bold shadow-[0_8px_24px_rgba(0,0,0,0.18)] z-[99]">{toast}</div>}
    </div>
  );
}
