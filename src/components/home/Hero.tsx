"use client";

import { useState } from "react";
import type { ListingFilter } from "./HomePage";
import { CHUK_WAVE } from "@/data/chukImages";
import CompDisclosure from "@/components/CompDisclosure";

type Props = {
  onSearch: (f: Partial<ListingFilter>) => void;
  activeTag: string;
};

/** Hero — Chuk stage, promise chips, and the search card (v2 mockup). */
export default function Hero({ onSearch, activeTag }: Props) {
  const [city, setCity] = useState("");
  const [beds, setBeds] = useState("0");
  const [max, setMax] = useState("999999");

  function chip(tag: string) {
    onSearch({ tag: activeTag === tag ? "" : tag });
    document.getElementById("homes")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="hero" id="top"><div className="wrap hero-grid">
      <div>
        <div className="kicker">Rentals only • West Palm Beach • Palm Beach Gardens • Jupiter</div>
        <h1>Rentals? <span className="hl">Consider it handled.</span></h1>
        <p className="lede">I&apos;m <b>Chuk</b> — and I only do rentals here. Tell me what home feels like, and I&apos;ll find it, check its HOA, book the tour, negotiate the lease. My goal: keys in your hand in about 21 days. You? You just pack.</p>
        <div className="promise">
          <span>🛡️ <b>HOA checked</b> before you apply</span>
          <span>💵 Renters pay <b>$0</b></span>
          <span>⚡ <b>Fast replies</b> — usually within the hour, business hours</span>
        </div>
        <CompDisclosure style={{ marginTop: "10px" }} />
        <div className="searchcard">
          <div className="hi">Let&apos;s find yours 👇</div>
          <div className="searchgrid">
            <div><label htmlFor="s-city">Where?</label>
              <select id="s-city" value={city} onChange={(e) => setCity(e.target.value)}><option value="">All three cities</option><option>West Palm Beach</option><option>Palm Beach Gardens</option><option>Jupiter</option></select></div>
            <div><label htmlFor="s-beds">Bedrooms</label>
              <select id="s-beds" value={beds} onChange={(e) => setBeds(e.target.value)}><option value="0">Any</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option></select></div>
            <div><label htmlFor="s-max">Budget</label>
              <select id="s-max" value={max} onChange={(e) => setMax(e.target.value)}><option value="999999">Any price</option><option value="3000">Up to $3,000</option><option value="4500">Up to $4,500</option><option value="6500">Up to $6,500</option></select></div>
            <button className="btn btn-sun" type="button" onClick={() => { onSearch({ city, beds: parseInt(beds, 10) || 0, max: parseInt(max, 10) || 999999 }); document.getElementById("homes")?.scrollIntoView({ behavior: "smooth" }); }}>Show me →</button>
          </div>
          <div className="quickchips"><span>My most-asked:</span>
            <button className={`pill${activeTag === "pet" ? " on" : ""}`} type="button" onClick={() => chip("pet")}>🐾 Dog-friendly</button>
            <button className={`pill${activeTag === "seasonal" ? " on" : ""}`} type="button" onClick={() => chip("seasonal")}>☀️ Furnished for winter</button>
            <button className={`pill${activeTag === "golf" ? " on" : ""}`} type="button" onClick={() => chip("golf")}>⛳ Golf community</button>
          </div>
        </div>
      </div>
      <div className="stage">
        <div className="frame"><img src={CHUK_WAVE} alt="Chuk, your rental guy, waving hello" /></div>
        <div className="bubble tl">👋 <b>Hi, I&apos;m Chuk.</b> Yes, the blazer is real. No, I don&apos;t own another outfit.</div>
        <div className="bubble br">📱 <b>Text me first</b> — I reply faster than the apps refresh.</div>
      </div>
    </div></div>
  );
}
