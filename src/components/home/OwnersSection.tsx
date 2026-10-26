"use client";

import Link from "next/link";
import { useState } from "react";
import LeadForm from "@/components/LeadForm";
import { CHUK_HEAD } from "@/data/chukImages";

const money = (n: number) => "$" + Math.round(n).toLocaleString();

/** Owners band — seasonal-vs-annual owner calculator +
 *  48-hour analysis lead form (v2 mockup). */
export default function OwnersSection() {
  const [annual, setAnnual] = useState(5200);
  const [prem, setPrem] = useState(210);
  const [vac, setVac] = useState(2);

  const yearly = annual * 12;
  const seasonal = Math.round(annual * (prem / 100)) * 5 + annual * (7 - vac);
  const diff = seasonal - yearly;

  return (
    <section id="owners" className="owners"><div className="wrap">
      <div className="kicker" style={{ color: "var(--sun-dark)" }}>Own a home?</div>
      <h2>Owners: my goal is 21 days.</h2>
      <p className="lede" style={{ marginTop: "8px" }}>Before another price cut, run the rent math — a furnished home here can pull 2–3× in season (the Palm Beach County seasonal premium, per local broker guides). Slide it yourself:</p>
      <div className="owner-grid" style={{ marginTop: "24px" }}>
        <div className="calc-card">
          <div className="form-title">Season vs. all year — your numbers</div>
          <label>Year-round rent (per month)
            <input type="range" min={2500} max={9000} step={100} value={annual} onChange={(e) => setAnnual(parseInt(e.target.value, 10))} />
            <span className="val"><span>$2,500</span><b>{money(annual)}/mo</b><span>$9,000</span></span></label>
          <label>Winter premium
            <input type="range" min={120} max={300} step={10} value={prem} onChange={(e) => setPrem(parseInt(e.target.value, 10))} />
            <span className="val"><span>1.2×</span><b>{(prem / 100).toFixed(1)}× in season</b><span>3.0×</span></span></label>
          <label>Empty summer months you can live with
            <input type="range" min={0} max={4} step={1} value={vac} onChange={(e) => setVac(parseInt(e.target.value, 10))} />
            <span className="val"><span>0</span><b>{vac} {vac === 1 ? "month empty" : "months empty"}</b><span>4</span></span></label>
          <div className="kpis">
            <div className="kpi"><span>All year</span><b>{money(yearly)}/yr</b></div>
            <div className="kpi"><span>Season + part-year</span><b>{money(seasonal)}/yr</b></div>
          </div>
          {diff > 0 ? (
            <div className="verdict seasonal"><b>Seasonal wins by ≈ {money(diff)} a year</b> — if your HOA allows it and you furnish it (≈ $8k–$15k once). <Link href="/#hoa" style={{ color: "var(--green)", fontWeight: 900 }}>Let me check your HOA →</Link></div>
          ) : (
            <div className="verdict annual"><b>All-year wins by ≈ {money(Math.abs(diff))} a year</b> at these settings. My 48-hour analysis swaps estimates for your street&apos;s real numbers.</div>
          )}
          <p style={{ fontSize: "12.5px", color: "var(--muted)", marginTop: "10px", fontWeight: 700 }}>Ballpark math, labeled as such. My 48-hour analysis uses current rents on your street — and first confirms your HOA allows seasonal renting.</p>
        </div>
        <div className="formcard" id="analysis">
          <LeadForm
            intent="landlord-analysis"
            heading="My 48-hour rental analysis"
            blurb="Real rents from your street, your HOA's rental rules, the season-vs-year math. I turn these around within two business days in the normal course. No listing pitch attached."
            ctaLabel="Run my numbers →"
          />
          <p style={{ fontSize: "12px", color: "var(--muted)", textAlign: "center", fontWeight: 700, marginTop: "10px" }}>One analysis, one follow-up. Then I stop emailing you.</p>
          <div style={{ marginTop: "16px", borderTop: "1px solid var(--line)", paddingTop: "13px", display: "grid", gap: "7px", fontSize: "14.5px", color: "var(--ink-soft)" }}>
            <div>🛡️ <b style={{ color: "var(--ink)" }}>My 21-day goal:</b> a signed lease in about 21 days on priced-right, show-ready homes — the target I work to, not a promise I can make for every home.</div>
            <div>🏢 <b style={{ color: "var(--ink)" }}>Relocating a team?</b> I handle every landing. <Link href="/#get-matched" style={{ color: "var(--green)", fontWeight: 900 }}>Ask me →</Link></div>
          </div>
          <div className="say"><img src={CHUK_HEAD} alt="Chuk" /><div><b>Chuk says:</b> &quot;If the math doesn&apos;t beat your price cut, I&apos;ll tell you to cut the price. Seriously.&quot;</div></div>
        </div>
      </div>
    </div></section>
  );
}
