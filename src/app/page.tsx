"use client";
import { useState, useMemo } from "react";

const demoListings = [
  { city: "Jupiter", title: "3BR Single-Family — Abacoa", price: "$4,850/mo", beds: "3bd • 2ba • 1,850 sqft", hood: "Abacoa • Gated", badge: "Abacoa", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop", tag: "Pet-Friendly", hoa: "HOA: 14 days" },
  { city: "Palm Beach Gardens", title: "4BR Golf Home — Mirasol", price: "$6,400/mo", beds: "4bd • 3ba • 2,600 sqft", hood: "Mirasol • Golf", badge: "Mirasol", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop", tag: "Golf Front", hoa: "HOA: 10 days" },
  { city: "West Palm Beach", title: "2BR Loft — Downtown Clematis", price: "$2,950/mo", beds: "2bd • 2ba • 1,100 sqft", hood: "Downtown • Walkable", badge: "Downtown", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop", tag: "New Listing", hoa: "No HOA" },
  { city: "Jupiter", title: "Intracoastal Furnished — Seasonal", price: "$12,500/mo", beds: "3bd • 2.5ba • Furnished", hood: "Intracoastal • Seasonal Dec-Apr", badge: "Seasonal", img: "https://images.unsplash.com/photo-1600566753190-17f63baa68a8?q=80&w=800&auto=format&fit=crop", tag: "Seasonal", hoa: "HOA: 7 days", badgeClass: "aqua" },
  { city: "West Palm Beach", title: "3BR Bungalow — Flamingo Park", price: "$3,350/mo", beds: "3bd • 2ba • 1,400 sqft", hood: "Flamingo Park • Historic", badge: "Flamingo Park", img: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=800&auto=format&fit=crop", tag: "Pet-Friendly", hoa: "No HOA" },
  { city: "Palm Beach Gardens", title: "3BR — PGA National", price: "$4,200/mo", beds: "3bd • 2ba • 1,950 sqft", hood: "PGA National • Resort", badge: "PGA National", img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=800&auto=format&fit=crop", tag: "Pool", hoa: "HOA: 12 days" },
];

const hoaDB: Record<string, any> = {
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
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [hoaQ, setHoaQ] = useState("");
  const [hoaResult, setHoaResult] = useState(() => lookupHoa("mirasol")!);
  const [quizOpen, setQuizOpen] = useState(false);
  const [annual, setAnnual] = useState(5200);
  const [premium, setPremium] = useState(210);
  const [vacancy, setVacancy] = useState(2);

  function showToast(m: string) { setToast(m); setTimeout(() => setToast(null), 2200); }
  function handleHoaSearch(val: string) {
    setHoaQ(val);
    const r = lookupHoa(val);
    if (r) { setHoaResult(r); showToast("HOA record found for " + r.name); }
  }

  const filtered = useMemo(() => {
    if (!filterCity) return demoListings;
    return demoListings.filter(x => x.city === filterCity);
  }, [filterCity]);

  const seasonalMonthly = Math.round(annual * (premium / 100));
  const annualNet = annual * 12;
  const seasonalNet = seasonalMonthly * 5 + annual * (7 - vacancy);
  const diff = seasonalNet - annualNet;

  return (
    <div>
      {/* HERO */}
      <section className="hero"><div className="container hero-grid">
        <div>
          <div className="k">Rentals-only Realtor • The Northern Triangle</div>
          <h1>Find your<br /><i>village,</i> not just<br />a rental.</h1>
          <p className="hero-sub">We do <b>only rentals</b> in <b>West Palm Beach, Palm Beach Gardens &amp; Jupiter</b>. No sales pitch. Just neighborhood-level pricing, HOA clearance, and video-first tours.</p>
          <div className="chips">
            <span className="pill">✓ HOA Approval Timeline Upfront</span>
            <span className="pill">✓ Seasonal vs. Annual Math</span>
            <span className="pill" style={{ background: "var(--navy)", color: "#fff", borderColor: "var(--navy)" }}>21-Day Lease Guarantee</span>
          </div>
          <div className="search-panel">
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by community, address, or ZIP (try 'Abacoa')" />
            <select value={city} onChange={e => setCity(e.target.value)}>
              <option value="">All 3 Cities</option>
              <option>West Palm Beach</option>
              <option>Palm Beach Gardens</option>
              <option>Jupiter</option>
            </select>
            <select defaultValue="">
              <option value="">Any beds</option>
              <option>1+ bed</option>
              <option>2+ beds</option>
              <option>3+ beds</option>
              <option>4+ beds</option>
            </select>
            <button className="btn btn-navy" onClick={() => { if (city) setFilterCity(city); showToast(`Searching: ${[q, city].filter(Boolean).join(" • ") || "All rentals"}`); document.getElementById("rentals")?.scrollIntoView({ behavior: "smooth" }); }}>Search →</button>
          </div>
          <div style={{ marginTop: "10px", display: "flex", gap: "8px", flexWrap: "wrap" as const }}>
            <button className="pill" onClick={() => { setQ("Pet-friendly"); showToast("Filtered: Pet-friendly"); document.getElementById("rentals")?.scrollIntoView({ behavior: "smooth" }); }}>🐾 Pet-friendly</button>
            <button className="pill" onClick={() => { setQ("Waterfront"); showToast("Filtered: Waterfront"); document.getElementById("rentals")?.scrollIntoView({ behavior: "smooth" }); }}>🌊 Waterfront</button>
            <button className="pill" onClick={() => { setQ("Furnished seasonal"); showToast("Filtered: Furnished seasonal"); document.getElementById("rentals")?.scrollIntoView({ behavior: "smooth" }); }}>☀️ Furnished Seasonal</button>
            <button className="pill" onClick={() => { setQ("Mirasol"); setFilterCity("Palm Beach Gardens"); showToast("Filtered: Mirasol"); document.getElementById("rentals")?.scrollIntoView({ behavior: "smooth" }); }}>⛳ Mirasol</button>
            <button className="pill" onClick={() => { setQ("Downtown Clematis"); setFilterCity("West Palm Beach"); showToast("Filtered: Downtown Clematis"); document.getElementById("rentals")?.scrollIntoView({ behavior: "smooth" }); }}>🌃 Downtown WPB</button>
          </div>
          <div className="stats">
            <div className="stat"><b>687</b><div>PBG rentals — tight</div><div style={{ color: "var(--aqua2)", fontSize: "12px" }}>↓ 20% YoY</div></div>
            <div className="stat"><b>~5%</b><div>Jupiter vacancy</div><div style={{ color: "var(--coral)", fontSize: "12px" }}>94-96% occupied</div></div>
            <div className="stat"><b>+2.2%</b><div>WPB rent growth YoY</div><div style={{ color: "var(--aqua2)", fontSize: "12px" }}>vs. FL declining</div></div>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-img"></div>
          <div className="hero-floating">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" alt="" />
            <div>
              <div style={{ fontWeight: 800, fontFamily: "Sora, sans-serif", fontSize: "13px" }}>Chuk • Rentals-Only</div>
              <div style={{ fontSize: "12px", color: "var(--muted)" }}>Avg. 21 days to lease • 561-555-0142</div>
              <div style={{ marginTop: "6px", display: "flex", gap: "6px" }}><span className="mono" style={{ background: "var(--navy)", color: "#fff", padding: "4px 8px", borderRadius: "999px" }}>Text Chuk</span><span className="mono" style={{ background: "#fff", border: "1px solid var(--line)", padding: "4px 8px", borderRadius: "999px" }}>WhatsApp</span></div>
            </div>
          </div>
          <div style={{ position: "absolute", top: "14px", right: "14px", background: "#fff", border: "1px solid var(--line)", borderRadius: "14px", padding: "10px 12px", boxShadow: "0 6px 18px rgba(0,0,0,.08)" }}>
            <div className="k">Live Market Pulse</div>
            <div style={{ marginTop: "6px", display: "grid", gap: "6px", fontSize: "12px" }}>
              <div><b>Jupiter 3BR SFH</b> $4,150 <span style={{ color: "var(--aqua2)" }}>↑ 2.8%</span></div>
              <div><b>WPB Central</b> asking +10% YoY</div>
              <div><b>PBG Median</b> $2,944 <span style={{ color: "var(--coral)" }}>• 18 DOM</span></div>
            </div>
          </div>
        </div>
      </div></section>

      {/* PULSE BAR */}
      <div className="pulse"><div className="pulse-inner">
        <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, letterSpacing: ".04em", fontSize: "12px" }}>LIVE PULSE — OCT 2026</div>
        <div className="pulse-items">
          <span className="pulse-pill"><b>WPB:</b> +2.2% YoY • 2,150 median 2BR</span>
          <span className="pulse-pill"><b>PBG:</b> $2,944 median • -20% inventory</span>
          <span className="pulse-pill"><b>JUP:</b> 5% vacancy • 14-28 days to lease</span>
          <a href="/reports" style={{ background: "#fff", color: "var(--navy)", padding: "8px 12px", borderRadius: "999px", fontWeight: 800, fontSize: "12px" }}>Full Report →</a>
        </div>
      </div></div>

      {/* FEATURED */}
      <section id="rentals" className="section"><div className="container">
        <div className="section-head">
          <div><div className="k">Featured Rentals — Updated Today</div><h2>Homes that lease in days, not months.</h2></div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <select value={filterCity} onChange={e => setFilterCity(e.target.value)} style={{ border: "1px solid var(--line)", borderRadius: "999px", padding: "8px 12px", background: "#fff" }}><option value="">All cities</option><option>West Palm Beach</option><option>Palm Beach Gardens</option><option>Jupiter</option></select>
            <a className="btn btn-ghost" href="/rentals">View All 1,847 →</a>
          </div>
        </div>
        <div className="grid3">
          {filtered.map(l => (
            <div key={l.title} className="card">
              <div className="listing-img"><img src={l.img} alt="" /><span className={`badge ${(l as any).badgeClass || ""}`}>{l.badge}</span><span className="heart">♡</span><span style={{ position: "absolute", bottom: "10px", left: "10px", background: "#fff", border: "1px solid var(--line)", padding: "6px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 800 }}>{l.hoa}</span></div>
              <div style={{ padding: "14px" }}>
                <div className="price">{l.price} <span style={{ fontWeight: 500, color: "var(--muted)", fontSize: "13px" }}>• {l.hood}</span></div>
                <div style={{ fontWeight: 700, marginTop: "2px" }}>{l.title}</div>
                <div className="muted">{l.beds}</div>
                <div style={{ marginTop: "10px", display: "flex", gap: "8px", flexWrap: "wrap" as const }}><span className="pill">{l.tag}</span><span className="pill">{l.city}</span><a className="btn btn-navy" style={{ marginLeft: "auto", padding: "8px 12px", fontSize: "13px" }} href="/rentals">Tour →</a></div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "14px", display: "flex", gap: "8px", flexWrap: "wrap" as const }}>
          <span className="pill" style={{ background: "var(--sand2)" }}>🏠 3BR under $4k in Jupiter</span>
          <span className="pill" style={{ background: "var(--sand2)" }}>⛳ Golf community SFH</span>
          <span className="pill" style={{ background: "var(--sand2)" }}>🌴 Furnished seasonal — Dec-Apr</span>
        </div>
      </div></section>

      {/* RESCUE */}
      <section className="section" style={{ paddingTop: 0 }}><div className="container">
        <div id="landlords" className="rescue">
          <div>
            <div className="k" style={{ color: "#9A3412" }}>For Landlords • Accidental Landlord Rescue</div>
            <h2 style={{ fontSize: "32px", marginTop: "6px" }}>Didn&apos;t sell? <span style={{ color: "var(--coral)" }}>Rent smart.</span></h2>
            <p style={{ color: "#7C2D12", fontSize: "14px", marginTop: "8px" }}>55.9% of WPB listings sat 60+ days. If you&apos;re holding a $750k+ home that won&apos;t move, renting beats a price cut — if you price by <i>neighborhood</i>, not ZIP.</p>
            <ul className="quiz">
              <li onClick={() => showToast("Great — we'll run rent comps by *your* street, not county avg.")}>Should I rent or sell my 2026 home? <span>→</span></li>
              <li onClick={() => showToast("48-hr Rental Analysis — free. We pull live comps in Abacoa, Mirasol, etc.")}>Get my 48-hr Rental Analysis <span>→</span></li>
              <li onClick={() => showToast("Calculator opened below ↓")}>Rent vs. Sell Math for my address <span>→</span></li>
            </ul>
            <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}><a className="btn btn-navy" href="/landlords">Get Free Estimate</a><a className="btn btn-ghost" href="/landlords">See 2-tier landlord guide</a></div>
          </div>
          <div className="card" style={{ padding: "16px" }}>
            <div className="k">What mispricing costs</div>
            <div style={{ marginTop: "8px", display: "grid", gap: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}><span>Overpriced 10% → 38-52 days vacant</span><b style={{ color: "var(--coral)" }}>-$2,450</b></div>
              <div style={{ height: "10px", background: "#E7E5E4", borderRadius: "999px", overflow: "hidden" }}><div style={{ width: "68%", height: "100%", background: "var(--coral)" }}></div></div>
              <div className="mono" style={{ color: "var(--muted)" }}>Atlis audit of failed self-listings • 600 doors</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "4px" }}>
                <div className="kpi"><div className="k">Correct price</div><b>14-21 days</b><div className="muted">to lease</div></div>
                <div className="kpi"><div className="k">Our avg</div><b>21 days</b><div className="muted">lease-up</div></div>
              </div>
            </div>
          </div>
        </div>
      </div></section>

      {/* MATCHMAKER */}
      <section className="section" style={{ background: "#fff", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}><div className="container grid2" style={{ alignItems: "center" as const }}>
        <div>
          <div className="k">Neighborhood Matchmaker</div>
          <h2>Find my village.</h2>
          <p style={{ color: "var(--stone)", fontSize: "14px", marginTop: "8px" }}>8 questions. 90-second video. 3 live matches with school + commute. Because Downtown Clematis ≠ Abacoa ≠ PGA National.</p>
          <div style={{ marginTop: "14px", display: "flex", gap: "8px", flexWrap: "wrap" as const }}>
            <button className="btn btn-navy" onClick={() => setQuizOpen(!quizOpen)}>Take 60-Sec Quiz →</button>
            <span className="pill">⛳ Golf</span><span className="pill">🌊 Intracoastal</span><span className="pill">🚲 Walkable</span><span className="pill">🎓 Schools</span>
          </div>
          {quizOpen && <div style={{ marginTop: "12px", background: "var(--sand2)", border: "1px solid #E7DDCC", borderRadius: "14px", padding: "12px", fontSize: "14px" }}><b>You&apos;re an Abacoa person.</b> Walkable, young, bikes to the green. 3BR $3,800-$5,200. <a href="/communities" style={{ color: "var(--aqua2)", fontWeight: 700 }}>See 7 live matches →</a></div>}
        </div>
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ height: "220px", background: "linear-gradient(135deg,#E8DDD0,#2EC4B6)", display: "grid", placeItems: "center", color: "var(--navy)", fontFamily: "Cormorant Garamond, serif", fontSize: "28px" }}>Abacoa Green — Jupiter</div>
          <div style={{ padding: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div><b>Abacoa</b> — bikes, porches, farmers market <div className="muted">3BR SFH $3,800-$5,200 • Most walkable in Jupiter</div></div>
            <a className="btn btn-ghost" href="/communities">Watch 60s →</a>
          </div>
        </div>
      </div></section>

      {/* HOA CHECKER */}
      <section id="hoa" className="section"><div className="container">
        <div className="hoa">
          <div>
            <div className="k" style={{ color: "var(--aqua)" }}>The Moat — HOA Rental Rights Checker</div>
            <h2 style={{ color: "#fff" }}>Check before you list. Or pay later.</h2>
            <p style={{ color: "#CBD5E1", fontSize: "14px", marginTop: "8px" }}>PBG &amp; Jupiter are HOA minefields. 6-mo minimums, 3x/year caps, board denials. Search any of 300+ communities — see if you&apos;re grandfathered.</p>
            <div className="hoa-input" style={{ marginTop: "14px" }}>
              <input value={hoaQ} onChange={e => handleHoaSearch(e.target.value)} placeholder="Try 'Mirasol' or 'Abacoa' or 'BallenIsles'" />
              <button className="btn btn-navy" onClick={() => handleHoaSearch(hoaQ)}>Check →</button>
            </div>
            <div style={{ marginTop: "10px", display: "flex", gap: "8px", flexWrap: "wrap" as const }}>
              <span className="pill" style={{ background: "rgba(255,255,255,.08)", borderColor: "rgba(255,255,255,.14)", color: "#fff", cursor: "pointer" }} onClick={() => handleHoaSearch("Mirasol")}>Mirasol</span>
              <span className="pill" style={{ background: "rgba(255,255,255,.08)", borderColor: "rgba(255,255,255,.14)", color: "#fff", cursor: "pointer" }} onClick={() => handleHoaSearch("Abacoa")}>Abacoa</span>
              <span className="pill" style={{ background: "rgba(255,255,255,.08)", borderColor: "rgba(255,255,255,.14)", color: "#fff", cursor: "pointer" }} onClick={() => handleHoaSearch("Frenchman")}>Frenchman&apos;s Creek</span>
              <span className="pill" style={{ background: "rgba(255,255,255,.08)", borderColor: "rgba(255,255,255,.14)", color: "#fff", cursor: "pointer" }} onClick={() => handleHoaSearch("PGA National")}>PGA National</span>
            </div>
            <div className="mono" style={{ color: "#94A3B8", marginTop: "10px" }}>Demo data • Full DB = 300+ • Attorney-reviewed $199</div>
          </div>
          <div className="hoa-results">
            <div className="hoa-row"><span><b>{hoaResult.name}</b> — {hoaResult.city}</span><span style={{ color: "#2EC4B6", fontWeight: 800 }}>{hoaResult.hoa}</span></div>
            <div className="hoa-row"><span>Board approval</span><b>{hoaResult.board}</b></div>
            <div className="hoa-row"><span>Max rentals / year</span><b>{hoaResult.max}</b></div>
            <div className="hoa-row"><span>Short-term (Airbnb)</span><b style={{ color: "var(--coral)" }}>{hoaResult.str}</b></div>
            <div className="hoa-row"><span>Grandfathered if bought before</span><b>{hoaResult.grand}</b></div>
            <a className="btn btn-coral" style={{ justifyContent: "center", marginTop: "4px" }} href="/hoa-checker">Get Attorney Review $199 →</a>
          </div>
        </div>
      </div></section>

      {/* CALCULATOR */}
      <section className="section" style={{ paddingTop: 0 }}><div className="container">
        <div className="calc">
          <div>
            <div className="k">Seasonal vs. Annual Engine</div>
            <h2>Two markets. One house. Do the math.</h2>
            <p style={{ color: "var(--stone)", fontSize: "14px", marginTop: "8px" }}>Jupiter runs annual + seasonal simultaneously. Furnished Dec-Apr can be 2-3× annual rent. Model both.</p>
            <div style={{ marginTop: "14px", display: "grid", gap: "12px" }}>
              <label style={{ fontSize: "13px", fontWeight: 700 }}>Annual rent (unfurnished)
                <input type="range" min={2500} max={9000} value={annual} onChange={e => setAnnual(parseInt(e.target.value))} className="range" /><div style={{ display: "flex", justifyContent: "space-between" }} className="mono"><span>$2,500</span><b>${annual.toLocaleString()}/mo</b><span>$9,000</span></div>
              </label>
              <label style={{ fontSize: "13px", fontWeight: 700 }}>Seasonal premium (Dec-Apr)
                <input type="range" min={120} max={300} value={premium} onChange={e => setPremium(parseInt(e.target.value))} className="range" /><div style={{ display: "flex", justifyContent: "space-between" }} className="mono"><span>1.2×</span><b>{(premium / 100).toFixed(1)}×</b><span>3.0×</span></div>
              </label>
              <label style={{ fontSize: "13px", fontWeight: 700 }}>Summer vacancy tolerance
                <input type="range" min={0} max={4} value={vacancy} onChange={e => setVacancy(parseInt(e.target.value))} className="range" /><div style={{ display: "flex", justifyContent: "space-between" }} className="mono"><span>0 mo</span><b>{vacancy} mo vacant</b><span>4 mo</span></div>
              </label>
            </div>
          </div>
          <div>
            <div style={{ display: "grid", gap: "10px" }}>
              <div className="kpi"><div className="k">Annual strategy</div><b>${annualNet.toLocaleString()} / yr</b><div className="muted">${annual.toLocaleString()} × 12 • 0 vacancy</div></div>
              <div className="kpi" style={{ background: "var(--navy)", color: "#fff", borderColor: "var(--navy)" }}><div className="k" style={{ color: "var(--aqua)" }}>Seasonal strategy</div><b>${seasonalNet.toLocaleString()} / yr</b><div style={{ color: "#CBD5E1", fontSize: "13px" }}>5 mo @ ${seasonalMonthly.toLocaleString()} + {7 - vacancy} mo @ ${annual.toLocaleString()} {vacancy ? `minus ${vacancy} mo vacant` : ""}</div></div>
              <div style={{ background: "#ECFDF5", border: "1px solid #6EE7B7", borderRadius: "14px", padding: "10px 12px", fontSize: "13px" }}><b style={{ color: "#065F46" }}>Winner: {diff > 0 ? `Seasonal by $${diff.toLocaleString()}` : `Annual by $${Math.abs(diff).toLocaleString()}`}</b> — but requires furnishing ($8k-$15k) + HOA allows it. <a href="/hoa-checker" style={{ color: "var(--aqua2)", fontWeight: 700 }}>See full playbook →</a></div>
            </div>
            <div style={{ marginTop: "10px", display: "flex", gap: "8px" }}><a className="btn btn-navy" href="/landlords">Model My Property</a><a className="btn btn-ghost" href="/hoa-checker">Watch: Jupiter Two-Market Playbook</a></div>
          </div>
        </div>
      </div></section>

      {/* COMMUNITIES */}
      <section id="communities" className="section" style={{ background: "#fff", borderTop: "1px solid var(--line)" }}><div className="container">
        <div className="section-head"><h2>12 Villages. Know them like a local.</h2><a className="btn btn-ghost" href="/communities">All Communities →</a></div>
        <div className="grid4">
          <a className="comm" href="/communities"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600&auto=format&fit=crop" alt="" /><div className="comm-label"><b>Downtown Clematis</b><div className="mono" style={{ color: "#E2E8F0" }}>WPB • $2,500-$4k • Walkable</div></div></a>
          <a className="comm" href="/communities"><img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop" alt="" /><div className="comm-label"><b>Flamingo Park</b><div className="mono" style={{ color: "#E2E8F0" }}>WPB • Historic • $2,200-$3,500</div></div></a>
          <a className="comm" href="/communities"><img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop" alt="" /><div className="comm-label"><b>Northwood</b><div className="mono" style={{ color: "#E2E8F0" }}>WPB • Revitalizing • $1,800-$2,800</div></div></a>
          <a className="comm" href="/communities"><img src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=600&auto=format&fit=crop" alt="" /><div className="comm-label"><b>Mirasol</b><div className="mono" style={{ color: "#E2E8F0" }}>PBG • Golf • $4k-$7k</div></div></a>
          <a className="comm" href="/communities"><img src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=600&auto=format&fit=crop" alt="" /><div className="comm-label"><b>PGA National</b><div className="mono" style={{ color: "#E2E8F0" }}>PBG • Resort • $3,500-$6k</div></div></a>
          <a className="comm" href="/communities"><img src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=600&auto=format&fit=crop" alt="" /><div className="comm-label"><b>Abacoa</b><div className="mono" style={{ color: "#E2E8F0" }}>Jupiter • Walkable • $3,800-$5,200</div></div></a>
          <a className="comm" href="/communities"><img src="https://images.unsplash.com/photo-1600566753190-17f63baa68a8?q=80&w=600&auto=format&fit=crop" alt="" /><div className="comm-label"><b>Intracoastal</b><div className="mono" style={{ color: "#E2E8F0" }}>Jupiter • Waterfront • $8k-$25k+</div></div></a>
          <a className="comm" href="/communities"><img src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=600&auto=format&fit=crop" alt="" /><div className="comm-label"><b>Egret Landing</b><div className="mono" style={{ color: "#E2E8F0" }}>Jupiter • Gated • $4,500-$7k</div></div></a>
        </div>
      </div></section>

      {/* RELOCATION */}
      <section className="section" style={{ background: "linear-gradient(180deg,#F4EDE2 0%, #FCFBF8 100%)" }}><div className="container grid2" style={{ alignItems: "center" as const }}>
        <div className="card" style={{ padding: 0, overflow: "hidden" }}><div style={{ height: "240px", background: "linear-gradient(135deg,#0B1D3A,#2EC4B6)", display: "grid", placeItems: "center", color: "#fff" }}><div style={{ textAlign: "center" as const }}><div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "28px" }}>Try-Before-You-Buy</div><div className="mono" style={{ color: "#E0F2F1" }}>6-mo rental + 3 home tours + schools</div><div style={{ marginTop: "10px" }}><span style={{ background: "#fff", color: "var(--navy)", padding: "8px 12px", borderRadius: "999px", fontWeight: 800, fontSize: "13px" }}>From NY/NJ? Start here →</span></div></div></div><div style={{ padding: "14px" }}><b>Rent smart. Buy smarter.</b><div className="muted" style={{ marginTop: "4px" }}>Relocating professionals rent 12-24 months while house-hunting. We make the landing soft — then feed HomesByChuk when you&apos;re ready.</div></div></div>
        <div>
          <div className="k">Relocation • Corporate</div>
          <h2>Moving a hospital team? A fund? A family?</h2>
          <p style={{ color: "var(--stone)", fontSize: "14px", marginTop: "8px" }}>We invoice the employer. Jupiter Medical, Good Samaritan, Scripps, PGA HQ, WPB finance — annual leases, pre-qualified, zero hassle.</p>
          <div style={{ marginTop: "14px", display: "grid", gap: "8px" }}>
            <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "14px", padding: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}><span><b>For Employers</b><div className="muted">Volume housing for incoming cohorts</div></span><a className="btn btn-navy" href="/landlords">Partner →</a></div>
            <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "14px", padding: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}><span><b>For Families</b><div className="muted">Schools, commute, village match</div></span><a className="btn btn-ghost" href="/communities">Start Relocation Quiz</a></div>
          </div>
        </div>
      </div></section>

      {/* TRUST */}
      <section className="section" style={{ background: "#fff", borderTop: "1px solid var(--line)" }}><div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "14px" }}>
          <div className="card" style={{ textAlign: "center", padding: "18px" }}><div style={{ fontSize: "28px" }}>⭐ 4.9</div><div style={{ fontWeight: 800, fontFamily: "Sora, sans-serif" }}>Google Reviews</div><div className="muted">From tenants &amp; landlords • WPB/PBG/Jupiter only</div></div>
          <div className="card" style={{ textAlign: "center", padding: "18px" }}><div style={{ fontSize: "28px" }}>21 days</div><div style={{ fontWeight: 800, fontFamily: "Sora, sans-serif" }}>Avg. to Lease</div><div className="muted">Guaranteed or 1 month free management</div></div>
          <div className="card" style={{ textAlign: "center", padding: "18px" }}><div style={{ fontSize: "28px" }}>300+</div><div style={{ fontWeight: 800, fontFamily: "Sora, sans-serif" }}>HOAs Checked</div><div className="muted">Don&apos;t list before you know the rules</div></div>
        </div>
      </div></section>

      {/* TOAST */}
      {toast && <div style={{ position: "fixed", bottom: "18px", left: "50%", transform: "translateX(-50%)", background: "var(--navy)", color: "#fff", padding: "12px 16px", borderRadius: "999px", fontSize: "13px", fontWeight: 700, boxShadow: "0 8px 24px rgba(0,0,0,.18)", zIndex: 99 }}>{toast}</div>}
    </div>
  );
}
