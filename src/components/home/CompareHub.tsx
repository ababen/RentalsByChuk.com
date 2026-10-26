"use client";

import { useState } from "react";
import { segments, neighborhoods, faceOffRows } from "@/data/compare";

const money = (n: number) => "$" + Math.round(n).toLocaleString();

/** #compare hub — segment picker, neighborhood face-off,
 *  seasonal-vs-annual comparator (v2 mockup). */
export default function CompareHub() {
  const [segKey, setSegKey] = useState("snowbird");
  const seg = segments.find((s) => s.key === segKey) ?? segments[0];

  const [foKeys, setFoKeys] = useState<[string, string, string]>(["downtown", "abacoa", "mirasol"]);
  const foCols = foKeys.map((k) => neighborhoods.find((n) => n.key === k) ?? neighborhoods[0]);

  // Seasonal comparator state
  const [svRent, setSvRent] = useState(5000);
  const svAnnual = svRent * 12;
  const svSeasonMonthly = Math.round(svRent * 2.5);
  const svSeasonal = svSeasonMonthly * 4;

  return (
    <section id="compare" style={{ paddingTop: "6px" }}><div className="wrap">
      <div className="kicker">Renter comparison hub • Market data: Oct 2026</div>
      <h2>Which renter are you?</h2>
      <p className="lede" style={{ marginTop: "6px" }}>Seven kinds of renters land in the Palm Beaches, and they don&apos;t shop the same way. Tap your type — I&apos;ll show you your budget, your neighborhoods, your lease style, and the one gotcha that bites your kind most.</p>

      <div className="seg-grid">
        {segments.map((s) => (
          <button key={s.key} className={`seg-card${segKey === s.key ? " on" : ""}`} type="button" onClick={() => setSegKey(s.key)}>
            <div className="em">{s.emoji}</div><h3>{s.cardTitle}</h3><p>{s.cardBlurb}</p>
          </button>
        ))}
      </div>

      <div className="seg-panel" aria-live="polite">
        <div className="kicker" style={{ color: "#FFC79A" }}>Your renter type</div>
        <h3>{seg.title}</h3>
        <p className="blurb">{seg.blurb}</p>
        <div className="seg-rows">
          <div className="seg-row"><span>💵 Realistic budget</span><b>{seg.budget}</b></div>
          <div className="seg-row"><span>📍 Best-fit neighborhoods</span><b>{seg.fits}</b></div>
          <div className="seg-row"><span>📄 Best lease style</span><b>{seg.lease}</b></div>
          <div className="seg-row gotcha"><span>⚠️ The #1 gotcha</span><b>{seg.gotcha}</b></div>
        </div>
        <div className="seg-tip"><div>🧢 <b>Chuk&apos;s tip:</b> <span>{seg.tip}</span></div></div>
      </div>

      <h3 className="sub-h">Neighborhood face-off ⚔️</h3>
      <p className="lede" style={{ marginTop: "6px" }}>Any three neighborhoods, same questions: what&apos;s the rent, what&apos;s the lease, what&apos;s the catch? ✅ = sourced figure · 🔶 = my estimate — and I verify the live number on any specific home before you apply.</p>
      <div className="fo-controls">
        {foKeys.map((k, i) => (
          <select key={i} value={k} aria-label={`Neighborhood ${i + 1}`}
            onChange={(e) => { const next = [...foKeys] as [string, string, string]; next[i] = e.target.value; setFoKeys(next); }}>
            {neighborhoods.map((n) => <option key={n.key} value={n.key}>{n.name}</option>)}
          </select>
        ))}
      </div>
      <div className="fo-scroll"><table className="fo-table" aria-label="Neighborhood comparison table">
        <thead><tr><th></th>{foCols.map((n, i) => <th key={i}>{n.name}</th>)}</tr></thead>
        <tbody>
          {faceOffRows.map((r) => (
            <tr key={r.field}><th>{r.label}</th>{foCols.map((n, i) => <td key={i} className={r.field === "take" ? "take" : undefined}>{n[r.field]}</td>)}</tr>
          ))}
        </tbody>
      </table></div>

      <div className="calc2">
        <div className="sv-card">
          <div className="form-title">Snowbird math: seasonal vs annual 🌴</div>
          <p className="form-sub">What does a winter here actually cost, next to renting the same home all year?</p>
          <label>If this home rented annually at…
            <input type="range" min={2000} max={12000} step={100} value={svRent} onChange={(e) => setSvRent(parseInt(e.target.value, 10))} aria-label="Annual monthly rent" />
            <span className="val" style={{ display: "flex", justifyContent: "space-between", fontSize: "12.5px", color: "var(--muted)", fontWeight: 800 }}><span>$2,000</span><b style={{ color: "var(--ink)", fontSize: "13.5px" }}>{money(svRent)}/mo</b><span>$12,000</span></span>
          </label>
          <div className="sv-nums">
            <div className="kpi"><span>Annual — 12 months</span><b>{money(svAnnual)} total</b></div>
            <div className="kpi"><span>Seasonal — 4 months @ 2.5×</span><b>{money(svSeasonal)} total</b></div>
          </div>
          <p style={{ marginTop: "12px", fontSize: "15px" }}>Four winter months cost <b>{money(svSeasonal)}</b> — that&apos;s <b>{money(svSeasonMonthly)}/mo</b> while you&apos;re here — versus <b>{money(svAnnual)}</b> for the whole year. Seasonal is cheaper overall if winter is all you use; annual is cheaper per month in the home, every time.</p>
          <p className="sv-note">The 2.5× seasonal premium is a working estimate — for local houses the working rule is 2–3× the annual rate (MJI Realty 2026 guide; waterfront and luxury run higher, up to 4×+). Real-world check: a furnished PGA National 4BR steps from $13,500 to $16,000/mo Dec 15–Apr 15 (Zumper). Seasonal wins if you&apos;re truly here for the winter only; if you&apos;ll use the home 6+ months, annual usually wins.</p>
        </div>
      </div>

      <p className="src-note">Comparison data: October 2026. Sources: RentCafe (city data updated Sep 30, 2026) · RentalSource city trends · Realtor.com county market (through Sep 2026) · BeachesMLS snapshot (Oct 24, 2026) · Zumper listings &amp; rent research · Mirasol MCA leasing package · Village at Abacoa association documents · MJI Realty Seasonal Luxury Rentals 2026 Guide.</p>
    </div></section>
  );
}
