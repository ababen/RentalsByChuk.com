"use client";

import { useState } from "react";
import LeadForm from "@/components/LeadForm";
import { site } from "@/lib/site";
import type { Property } from "@/lib/types";
import Hero from "./Hero";
import Listings from "./Listings";
import CompareHub from "./CompareHub";
import HoaSection from "./HoaSection";
import OwnersSection from "./OwnersSection";
import { CHUK_HEAD, CHUK_THUMBS } from "@/data/chukImages";

export type ListingFilter = { city: string; beds: number; max: number; tag: string };

const FAQS = [
  { q: "Seriously, Chuk — $0 for renters?", a: "Seriously. The property side pays me when a lease signs. Search help, showings, negotiating, the lease read — all $0 to you. If that ever changes, it'll change on this page first, in this size type." },
  { q: "If the landlord pays you, whose side are you on?", a: "Yours — and here's why that's not just talk: I live on referrals and relocations. A renter who feels played doesn't send me their colleagues. Plus every term I win for you is in the lease you read before signing." },
  { q: "Why do you publish HOA rules for free?", a: "Because charging people to learn whether they're allowed to live somewhere is exactly the game I don't play. The certified attorney-reviewed version is $199; the rules themselves are free." },
  { q: "I'm relocating for work. Can you handle it remotely?", a: "That's half my practice. Video tours, remote paperwork, employer invoicing — tell me your start date and I'll work backwards from it. You'll land to a ready home." },
];

export default function HomePage({ properties }: { properties: Property[] }) {
  const [filter, setFilter] = useState<ListingFilter>({ city: "", beds: 0, max: 999999, tag: "" });
  const [tourTarget, setTourTarget] = useState<string | null>(null);

  const patch = (f: Partial<ListingFilter>) => setFilter((prev) => ({ ...prev, ...f }));

  return (
    <div className="chuk">
      <Hero onSearch={patch} activeTag={filter.tag} />

      {/* STEPS */}
      <section style={{ paddingTop: "36px" }}><div className="wrap">
        <div className="kicker">How working with me goes</div>
        <h2>Stupid simple. Three steps.</h2>
        <div className="steps">
          <div className="step"><div className="num">01</div><h3>Text me</h3><p>Budget, must-haves, move-in date. Two minutes, one text thread. No portals, no account, no &quot;tour deposit.&quot;</p></div>
          <div className="step"><div className="num">02</div><h3>Tour from your couch</h3><p>I send homes that fit — each with a real video tour and its HOA verdict up front. You visit only the finalists.</p></div>
          <div className="step"><div className="num">03</div><h3>I close it, you move in</h3><p>Showings booked, terms negotiated, lease read line by line. Keys in about 21 days — and if anything snags, it&apos;s my problem, not yours.</p></div>
        </div>
      </div></section>

      {/* MARKET SNAPSHOT */}
      <section className="snapshot" aria-label="Palm Beach County rental market snapshot, October 2026"><div className="wrap">
        <div className="snap-card">
          <div className="snap-head"><span className="kicker">Market snapshot</span><span className="snap-date">October 2026 · sources named, no vibes</span></div>
          <div className="snap-grid">
            <div><b>$2,762</b><p>Median asking rent in Palm Beach County (Realtor.com, Sep 2026)</p></div>
            <div><b>~95% occupied</b><p>County rentals — roughly 14 renters compete for every vacant unit (RentCafe)</p></div>
            <div><b>$1,600</b><p>Median 1-bedroom apartment rent, West Palm Beach (BeachesMLS snapshot, Oct 2026)</p></div>
            <div><b>2–3×</b><p>Typical winter seasonal premium over the annual rate (estimate — MJI Realty 2026 guide)</p></div>
          </div>
        </div>
      </div></section>

      {/* MEET CHUK */}
      <section style={{ paddingTop: "6px" }}><div className="wrap">
        <div className="meet" id="meet">
          <div className="ph"><img src={CHUK_HEAD} alt="Chuk — 3D portrait" /></div>
          <div>
            <div className="kicker">Meet Chuk</div>
            <h2>The guy behind the blazer.</h2>
            <p>I&apos;m Alexander &quot;Chuk&quot; Babenchuk — a West Palm Beach local, licensed with Lokation, and a dad of two girls who got tired of watching good people lose deposits to surprise HOA rules and lose weekends to rental sites. So I built the practice I couldn&apos;t find: one guy, one specialty, total focus on getting you home.</p>
            <div className="creed">
              <div>🛡️ <b>300+ HOAs</b> whose rental rules I keep on file — checked free, before you apply.</div>
              <div>🏡 <b>Rentals only.</b> No sales pitch hiding inside your tour. Ever.</div>
              <div>⏱️ <b>~15 hours back.</b> The average hunt eats 19 hours. My clients spend about 3.</div>
              <div>🌎 <b>Off the clock:</b> El Yunque trails, Havana classics, beach cookouts — home in time for the Daddy/Daughter Dance.</div>
            </div>
            <div className="motto">&quot;DICTUM MEUM PACTUM.&quot;<span>My word is my bond — if I say 48 hours, it&apos;s 48 hours.</span></div>
          </div>
        </div>
      </div></section>

      <Listings properties={properties} filter={filter} onCityTab={(city) => patch({ city })} onTour={setTourTarget} />

      <CompareHub />

      {/* WHY */}
      <section id="why" style={{ paddingTop: "8px" }}><div className="wrap">
        <div className="kicker">Why people text Chuk</div>
        <h2>The legwork is the job. It&apos;s my job.</h2>
        <div className="why-grid">
          <div className="handles">
            <div className="handle"><div className="ic">📅</div><h3>I book your showings</h3><p>One text and your whole tour day is set. No phone tag with ten listing agents, no &quot;sorry, it rented yesterday.&quot;</p></div>
            <div className="handle"><div className="ic">🤝</div><h3>I negotiate for you</h3><p>Rent, move-in date, the dog, lease length — negotiated with street-level numbers, not guesses.</p></div>
            <div className="handle"><div className="ic">📄</div><h3>I read your lease</h3><p>Every line, including the HOA addenda most people sign blind. Anything unfair, you hear about it from me first.</p></div>
            <div className="handle"><div className="ic">🛟</div><h3>Problems? Mine now</h3><p>Slow HOA, application snag, quiet landlord — during the deal, that&apos;s my problem to fix. You&apos;ll never chase me for an update.</p></div>
          </div>
          <div className="timecard">
            <div className="form-title">⏱️ Here&apos;s what I save you</div>
            <div className="trow"><span>Hunting &amp; weeding out stale listings</span><b>≈ 5 hrs</b></div>
            <div className="trow"><span>Chasing agents, booking showings</span><b>≈ 4 hrs</b></div>
            <div className="trow"><span>Driving &amp; touring</span><b>≈ 5 hrs</b></div>
            <div className="trow"><span>HOA rules, learned the hard way</span><b>≈ 2 hrs</b></div>
            <div className="trow"><span>Applications &amp; negotiating</span><b>≈ 3 hrs</b></div>
            <div className="trow"><span>On your own</span><b>≈ 19 hrs</b></div>
            <div className="trow" style={{ borderBottom: 0 }}><span>With me</span><b style={{ color: "var(--green)" }}>≈ 3 hrs</b></div>
            <div className="save"><div className="big">You get back about 15 hours.</div><p>Two Saturdays — plus the whole search shrinks from 4–6 weeks to about 3. And it costs you $0; I&apos;m paid by the property side.</p></div>
          </div>
        </div>
        <div className="extras-line">And when it&apos;s time to actually move: 🚚 <b>I coordinate the movers</b> • 🛋️ <b>junk removal arranged</b> • 🛡️ <b>renters insurance set up</b> (usually $15–$30/mo) • 📈 <b>credit help</b> — how landlords read your application, and how on-time rent builds your score.</div>
      </div></section>

      <HoaSection />

      <OwnersSection />

      {/* TRUST + FAQ */}
      <section id="faq"><div className="wrap">
        <div className="trust">
          <div className="t"><div className="big">⭐ 4.9 / 5</div><p>what my renters and owners say on Google</p></div>
          <div className="t"><div className="big">≈ 21 days</div><p>from listing to keys, my average</p></div>
          <div className="t"><div className="big">300+ HOAs</div><p>rules on file — I check before you apply</p></div>
        </div>
        <div className="faq">
          {FAQS.map((f) => (
            <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
          ))}
        </div>
      </div></section>

      {/* FINAL */}
      <section style={{ paddingTop: 0 }}><div className="wrap">
        <div className="final" id="get-matched">
          <div className="char"><img src={CHUK_THUMBS} alt="Chuk giving a thumbs up" /></div>
          <div>
            <div className="kicker">My text list</div>
            <h2>Text me. Seriously.</h2>
            <p>Join the list and new homes that fit come to your phone first — a text or two a week, only when something matches. No portal accounts, no midnight Zillow refreshing.</p>
            <div className="callrow">
              <a className="btn btn-white" href={site.phoneHref}>📞 Call {site.phoneDisplay}</a>
              <a className="btn btn-line" href={site.smsHref}>💬 Or just text</a>
            </div>
            <div style={{ marginTop: "22px" }}>
              <LeadForm
                dark
                intent="seasonal-alert"
                context={tourTarget ?? undefined}
                heading={tourTarget ? `Tour: ${tourTarget}` : undefined}
                blurb={tourTarget ? "Tell me where to send the video tour + showing times — it'll ride along with your details." : "What do you need? e.g. 3 bed, Jupiter, a dog, under $4,500 — drop it in the last box."}
                ctaLabel="Put me on the list →"
              />
              <p style={{ fontSize: "12px", color: "#BCD2C0", textAlign: "center", fontWeight: 700, marginTop: "8px" }}>Reply STOP anytime. Your number stays with me, period.</p>
            </div>
          </div>
        </div>
      </div></section>
    </div>
  );
}
