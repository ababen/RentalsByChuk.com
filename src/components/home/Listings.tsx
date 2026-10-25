"use client";

import Link from "next/link";
import { useState } from "react";
import type { Property } from "@/lib/types";
import { formatPrice } from "@/lib/properties";
import { listingHoaFraming, listingTags, listingTagKeys, vibes } from "@/data/compare";
import type { ListingFilter } from "./HomePage";

const CITIES = ["", "West Palm Beach", "Palm Beach Gardens", "Jupiter"] as const;

type Props = {
  properties: Property[];
  filter: ListingFilter;
  onCityTab: (city: string) => void;
  onTour: (title: string) => void;
};

/** This week's homes — city tabs, filtered cards, vibe quiz (v2 mockup). */
export default function Listings({ properties, filter, onCityTab, onTour }: Props) {
  const [vibe, setVibe] = useState<string | null>(null);

  const list = properties.filter((p) =>
    (!filter.city || p.city === filter.city) &&
    p.beds >= filter.beds &&
    p.price <= filter.max &&
    (!filter.tag || (listingTagKeys[p.id] || []).includes(filter.tag))
  );
  const activeVibe = vibes.find((v) => v.key === vibe);

  return (
    <section id="homes" style={{ paddingTop: "6px" }}><div className="wrap">
      <div className="head-row">
        <div><div className="kicker">This week&apos;s homes</div><h2>Every one checked by me</h2>
        <p className="lede" style={{ marginTop: "6px" }}>No stale listings, no bait pricing. If it&apos;s here, it&apos;s real — and its HOA already cleared it.</p></div>
        <div className="tabs">
          {CITIES.map((c) => (
            <button key={c || "all"} className={`pill${filter.city === c ? " on" : ""}`} type="button" onClick={() => onCityTab(c)}>{c || "All cities"}</button>
          ))}
        </div>
      </div>
      <div className="cards">
        {list.map((p) => (
          <article className="prop" key={p.id}>
            <div className="imgwrap"><img src={p.images[0]} alt={p.title} loading="lazy" />
              <span className="area-tag">{p.neighborhood}</span>
              <span className="hoa-tag">🛡️ {listingHoaFraming[p.id] || p.hoa}</span></div>
            <div className="body">
              <div className="price">{formatPrice(p.price)} <span>• {p.city}</span></div>
              <div className="ttl">{p.title}</div>
              <div className="spec">{p.beds} bd • {p.baths} ba • {p.sqft.toLocaleString()} sqft</div>
              <div className="tags">{(listingTags[p.id] || []).map((t) => <span key={t}>{t}</span>)}</div>
              <div className="foot">
                <span style={{ fontSize: "13px", color: "var(--muted)", fontWeight: 700 }}>Video tour — I filmed it</span>
                <Link className="tour" href="/#get-matched" onClick={() => onTour(p.title)}>Tour it →</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
      {list.length === 0 && (
        <div className="empty-note">That combo just rented — or hasn&apos;t landed yet. <Link href="/#get-matched" style={{ color: "var(--green)", fontWeight: 900 }}>Join my text list</Link> and it&apos;ll hit your phone the second it does.</div>
      )}
      <div className="quizbar">
        <div><div className="q">Tell me your vibe — I&apos;ll name your neighborhood.</div><div style={{ color: "var(--muted)", fontSize: "14.5px", fontWeight: 700 }}>Twelve neighborhoods. I know them street by street.</div></div>
        <div className="vibes">
          {vibes.map((v) => (
            <button key={v.key} className={`pill${vibe === v.key ? " on" : ""}`} type="button" onClick={() => setVibe(v.key)}>{v.label}</button>
          ))}
        </div>
        {activeVibe && (
          <div className="quiz-result">
            <span dangerouslySetInnerHTML={{ __html: activeVibe.html }} />{" "}
            <a href="#homes" style={{ color: "var(--green)", fontWeight: 900 }}>See them →</a>
          </div>
        )}
      </div>
    </div></section>
  );
}
