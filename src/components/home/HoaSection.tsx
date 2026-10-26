"use client";

import { useState } from "react";
import LeadForm from "@/components/LeadForm";
import { lookupHoa } from "@/data/hoa";

const EXAMPLES = ["Mirasol", "Abacoa", "Frenchman's Creek", "PGA National", "BallenIsles"];

/** HOA checker band — live lookup against the sourced rules in
 *  src/data/hoa.ts + rule-sheet lead form (v2 mockup). */
export default function HoaSection() {
  const [q, setQ] = useState("");
  const [result, setResult] = useState(() => lookupHoa("mirasol")!);

  function search(val: string) {
    setQ(val);
    const r = lookupHoa(val);
    if (r) setResult(r);
  }

  return (
    <section id="hoa" style={{ paddingTop: "6px" }}><div className="wrap">
      <div className="hoa-band">
        <div>
          <div className="kicker">My superpower</div>
          <h2>I read HOA rulebooks for fun. Somebody has to.</h2>
          <p>Minimum stays, rental caps, board approvals that take weeks — in the Gardens and Jupiter, the HOA decides if you can live somewhere, not the landlord. Type a community and I&apos;ll show you its rules from my files. Ten seconds, no surprises later.</p>
          <div className="hoa-search">
            <input type="text" value={q} onChange={(e) => search(e.target.value)} placeholder="Try Mirasol, Abacoa, PGA National…" aria-label="Community name" />
            <button className="btn btn-sun" type="button" style={{ padding: "11px 19px" }} onClick={() => search(q)}>Check →</button>
          </div>
          <div className="hoa-examples">
            {EXAMPLES.map((x) => <button key={x} type="button" onClick={() => search(x)}>{x}</button>)}
          </div>
          <p style={{ fontSize: "13px", color: "#9DBEA9", marginTop: "12px" }}>From association documents for Mirasol · Abacoa · Admirals Cove — PGA National, BallenIsles & Frenchman&apos;s Creek I confirm with the association before you apply. Ask me about any other.</p>
        </div>
        <div className="hoa-panel">
          <h3><span>{result.displayName}</span><span className="hoa-min">{result.minLease}</span></h3>
          <div className="hoa-rows">
            <div className="hrow"><span>Board approval?</span><b>{result.board}</b></div>
            <div className="hrow"><span>Rentals per year</span><b>{result.maxPerYear}</b></div>
            <div className="hrow"><span>Short stays (Airbnb)?</span><b style={{ color: "#FFC79A" }}>{result.str}</b></div>
            <div className="hrow"><span>Grandfathering</span><b>{result.grandfather}</b></div>
          </div>
          <div className="mini-form">
            <LeadForm dark compact intent="hoa-report" context={result.name} heading="Email me the full rule sheet" ctaLabel="Send it →" />
          </div>
        </div>
      </div>
    </div></section>
  );
}
