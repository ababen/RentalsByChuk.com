"use client";

import { useState } from "react";
import LeadForm from "@/components/LeadForm";
import { site } from "@/lib/site";
import { segments } from "@/data/compare";
import { FAQS } from "@/data/faqs";
import { CHUK_WAVE, CHUK_THUMBS } from "@/data/chukImages";

const smsFor = (body: string) =>
  `${site.smsHref.split("?")[0]}?&body=${encodeURIComponent(body)}`;

const RENTAL_JOBS = [
  { t: "The search", d: "I send homes that fit your list, with video tours on request." },
  { t: "HOA rules, checked first", d: "Before you apply, not after." },
  { t: "Lease negotiated & read", d: "Rent, move-in date, the dog, every line of the addenda." },
  { t: "Approval, chased", d: "Application packet built and followed up until it's a yes." },
];

const MOVE_JOBS = [
  { t: "Movers", d: "Quoted, booked and scheduled around your keys." },
  { t: "Junk removal", d: "What doesn't make the trip, gone before moving day." },
  { t: "Furniture delivery & assembly", d: "Delivered and built, not boxed in the hallway." },
  { t: "Move-in cleaning", d: "The place is clean before your stuff walks in." },
  { t: "Utilities & internet", d: "Power, water and Wi-Fi on the day you arrive." },
  { t: "Handyman & TV mounting", d: "Shelves up, TV on the wall, blinds that work." },
];

const STEPS = [
  { n: "01", t: "Text me", d: "Budget, must-haves, move-in date. Two minutes, one thread." },
  { n: "02", t: "Pick your home", d: "Tour the short list in person or by video. HOA verdicts up front." },
  { n: "03", t: "Show up", d: "Lease signed, crew booked, lights on. My goal: keys in about 21 days." },
];

export default function HomePage() {
  const [segKey, setSegKey] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const seg = segments.find((s) => s.key === segKey) ?? null;

  return (
    <div className="simple">
      {/* ── HERO: Chuk says hi and asks one question ── */}
      <section className="s-hero" id="top">
        <div className="wrap s-hero-grid">
          <div className="s-hero-copy">
            <h1>Moving here? <span>Consider it handled.</span></h1>

            <div className="s-bubble" aria-live="polite">
              <p className="s-hi">
                <b>Hi, I&apos;m Chuk.</b> Quick question so I can point you the right way:
              </p>
              <h2 className="s-q">What kind of renter are you?</h2>

              <div className="s-types" role="group" aria-label="Choose your renter type">
                {segments.map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    className={`s-type${segKey === s.key ? " on" : ""}`}
                    aria-pressed={segKey === s.key}
                    onClick={() => { setSegKey(segKey === s.key ? null : s.key); setShowForm(false); }}
                  >
                    <span className="em" aria-hidden="true">{s.emoji}</span>
                    {s.cardTitle}
                  </button>
                ))}
              </div>

              {!seg && (
                <p className="s-hint">Tap one. I&apos;ll tell you where to look, what it really costs, and the one thing that trips your kind of renter up.</p>
              )}

              {seg && (
                <div className="s-result">
                  <p className="s-blurb">{seg.blurb}</p>
                  <dl>
                    <div><dt>Where I&apos;d look</dt><dd>{seg.fits}</dd></div>
                    <div><dt>Lease style</dt><dd>{seg.lease}</dd></div>
                    <div><dt>Budget</dt><dd>{seg.budget}</dd></div>
                    <div className="warn"><dt>Heads up</dt><dd>{seg.gotcha}</dd></div>
                  </dl>
                  <div className="s-cta-row">
                    <a className="s-btn s-btn-sun" href={smsFor(`Hi Chuk — I'm a ${seg.cardTitle.toLowerCase()} renter looking in WPB / PBG / Jupiter.`)}>
                      Text Chuk about this →
                    </a>
                    <button type="button" className="s-btn s-btn-ghost" onClick={() => setShowForm((v) => !v)}>
                      {showForm ? "Hide form" : "Or have me text you"}
                    </button>
                  </div>
                  {showForm && (
                    <div className="s-form">
                      <LeadForm compact intent="renter-match" context={seg.cardTitle} ctaLabel="Text me back →" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="s-chuk" aria-hidden="false">
            <img src={CHUK_WAVE} alt="Chuk, your rental guy, waving hello" />
          </div>
        </div>
      </section>

      {/* ── THE PITCH: done-for-you ── */}
      <section className="s-sec" id="handled">
        <div className="wrap">
          <div className="s-kicker">Done for you</div>
          <h2 className="s-h2">You pick the home.<br />I handle everything else.</h2>
          <p className="s-lede">
            Finding the rental is half of it. The other half is the move: crews, deliveries,
            utilities, the couch that won&apos;t fit. I take all of it off your plate. One text thread,
            one guy, and a bench of local pros I already trust, lined up and scheduled for you.
          </p>

          <div className="s-cols">
            <div className="s-col">
              <h3>Getting the home</h3>
              <ul>{RENTAL_JOBS.map((j) => <li key={j.t}><b>{j.t}</b><span>{j.d}</span></li>)}</ul>
            </div>
            <div className="s-col">
              <h3>Getting you moved in</h3>
              <ul className="two">{MOVE_JOBS.map((j) => <li key={j.t}><b>{j.t}</b><span>{j.d}</span></li>)}</ul>
            </div>
          </div>
          <p className="s-fine">
            Moving and home services are performed by independent local companies. You see every quote,
            and approve every booking.
          </p>

          <div className="s-payoff">
            <p className="big">Spend your first weekend at Juno Beach, not in a pile of boxes.</p>
            <p>That&apos;s the whole point. You get the North Palm Beach County life. I get the logistics.</p>
          </div>
        </div>
      </section>

      {/* ── HOW IT GOES ── */}
      <section className="s-sec s-sec-tight" id="how">
        <div className="wrap">
          <div className="s-kicker">How it goes</div>
          <h2 className="s-h2">Three steps. You only do the first one.</h2>
          <div className="s-steps">
            {STEPS.map((s) => (
              <div className="s-step" key={s.n}><div className="n">{s.n}</div><h3>{s.t}</h3><p>{s.d}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="s-sec s-sec-tight" id="faq">
        <div className="wrap s-faq-wrap">
          <div>
            <div className="s-kicker">Straight answers</div>
            <h2 className="s-h2">Fair questions.</h2>
            <p className="s-lede" style={{ fontSize: "16px" }}>
              Own a rental instead? <a href="/landlords" className="s-link">Here&apos;s how I help landlords →</a>
            </p>
          </div>
          <div className="s-faq">
            {FAQS.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="s-final" id="get-matched">
        <div className="wrap s-final-grid">
          <div className="s-final-chuk"><img src={CHUK_THUMBS} alt="Chuk giving a thumbs up" /></div>
          <div className="s-final-copy">
            <h2 className="s-h2">Ready when you are.</h2>
            <p className="s-lede">Text me what you&apos;re after and when you need to be in. I&apos;ll take it from there.</p>
            <div className="s-cta-row">
              <a className="s-btn s-btn-sun" href={site.smsHref}>Text Chuk · {site.phoneDisplay}</a>
              <a className="s-btn s-btn-ghost" href={site.phoneHref}>Call instead</a>
            </div>
            <p className="s-brok">{site.brokerage}</p>
            <div className="s-final-form">
              <LeadForm
                intent="general"
                heading="Rather I reach out?"
                blurb="Leave your number and what you need. I'll text you back, usually within the hour during business hours."
                ctaLabel="Text me back →"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
