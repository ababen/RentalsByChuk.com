"use client";

import { useState } from "react";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import { site, smsFor } from "@/lib/site";
import { moverTypes } from "@/data/buyerTypes";
import { FAQS } from "@/data/faqs";
import { CHUK_WAVE, CHUK_THUMBS } from "@/data/chukImages";

const BUY_JOBS = [
  { t: "The search", d: "Homes that fit your list, with video tours on request — including ones not yet on the portals." },
  { t: "The real monthly cost", d: "Mortgage, taxes, insurance and HOA priced out before you fall for a house." },
  { t: "Offer & negotiation", d: "Comps-backed price, smart terms, and a firm hand through inspection credits." },
  { t: "Inspection to closing", d: "Inspections, appraisal, title and lender deadlines tracked so nothing slips." },
];

const SELL_JOBS = [
  { t: "Pricing opinion", d: "Recent nearby sales and live competition, not a guess." },
  { t: "Prep & presentation", d: "Repairs, staging advice, professional photos and video." },
  { t: "Launch & showings", d: "Coordinated showings and feedback after every one." },
  { t: "Offers & close", d: "Net-sheet on every offer, then I chase it to the closing table." },
];

const MOVE_JOBS = [
  { t: "Movers", d: "Quoted, booked and scheduled around closing." },
  { t: "Cleaning", d: "Move-out for the old place, move-in for the new." },
  { t: "Contractors & handyman", d: "Pre-listing fixes and post-closing projects." },
  { t: "Utilities & internet", d: "Power, water and Wi-Fi on the day you get keys." },
];

const STEPS = [
  { n: "01", t: "Text me", d: "Buying, selling or both — budget, timing, must-haves. Two minutes, one thread." },
  { n: "02", t: "Make a plan", d: "Pricing, payment math and a timeline you can actually see." },
  { n: "03", t: "Close", d: "I run the deadlines and the people. You sign and get keys." },
];

export default function HomePage() {
  const [typeKey, setTypeKey] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const t = moverTypes.find((m) => m.key === typeKey) ?? null;

  return (
    <div className="simple">
      {/* ── HERO: Chuk says hi and asks one question ── */}
      <section className="s-hero" id="top">
        <div className="wrap s-hero-grid">
          <div className="s-hero-copy">
            <h1>Buying or selling? <span>Consider it handled.</span></h1>

            <div className="s-bubble" aria-live="polite">
              <p className="s-hi">
                <b>Hi, I&apos;m Chuk.</b> Quick question so I can point you the right way:
              </p>
              <h2 className="s-q">Where are you in the move?</h2>

              <div className="s-types" role="group" aria-label="Choose what describes you">
                {moverTypes.map((m) => (
                  <button
                    key={m.key}
                    type="button"
                    className={`s-type${typeKey === m.key ? " on" : ""}`}
                    aria-pressed={typeKey === m.key}
                    onClick={() => { setTypeKey(typeKey === m.key ? null : m.key); setShowForm(false); }}
                  >
                    <span className="em" aria-hidden="true">{m.emoji}</span>
                    {m.cardTitle}
                  </button>
                ))}
              </div>

              {!t && (
                <p className="s-hint">Tap one. I&apos;ll tell you where to start, how it usually goes, and the one thing that trips people like you up.</p>
              )}

              {t && (
                <div className="s-result">
                  <p className="s-blurb">{t.blurb}</p>
                  <dl>
                    <div><dt>Where I&apos;d look</dt><dd>{t.fits}</dd></div>
                    <div><dt>How it goes</dt><dd>{t.plan}</dd></div>
                    <div><dt>Step one</dt><dd>{t.first}</dd></div>
                    <div className="warn"><dt>Heads up</dt><dd>{t.gotcha}</dd></div>
                  </dl>
                  <div className="s-cta-row">
                    <a className="s-btn s-btn-sun" href={smsFor(t.sms)}>Text Chuk about this →</a>
                    <button type="button" className="s-btn s-btn-ghost" onClick={() => setShowForm((v) => !v)}>
                      {showForm ? "Hide form" : "Or have me text you"}
                    </button>
                  </div>
                  {showForm && (
                    <div className="s-form">
                      <LeadForm
                        compact
                        intent={t.key === "seller" ? "home-value" : t.key === "relocating" ? "relocation" : "buyer-match"}
                        context={t.cardTitle}
                        ctaLabel="Text me back →"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="s-chuk" aria-hidden="false">
            <img src={CHUK_WAVE} alt="Chuk, your home guy, waving hello" />
          </div>
        </div>
      </section>

      {/* ── THE PITCH ── */}
      <section className="s-sec" id="handled">
        <div className="wrap">
          <div className="s-kicker">Done for you</div>
          <h2 className="s-h2">You make the big calls.<br />I handle everything else.</h2>
          <p className="s-lede">
            A home sale is a hundred small deadlines with a lot of money riding on each one. I run all of
            them: the pricing, the negotiation, the inspections, the lender, title, and the move itself.
            One text thread, one guy, and a bench of local pros I already trust.
          </p>

          <div className="s-cols">
            <div className="s-col">
              <h3>Buying</h3>
              <ul>{BUY_JOBS.map((j) => <li key={j.t}><b>{j.t}</b><span>{j.d}</span></li>)}</ul>
              <p className="s-fine"><Link className="s-link" href="/buy">How buying with me works →</Link></p>
            </div>
            <div className="s-col">
              <h3>Selling</h3>
              <ul>{SELL_JOBS.map((j) => <li key={j.t}><b>{j.t}</b><span>{j.d}</span></li>)}</ul>
              <p className="s-fine"><Link className="s-link" href="/sell">How selling with me works →</Link></p>
            </div>
          </div>

          <div className="s-cols" style={{ marginTop: "18px" }}>
            <div className="s-col" style={{ gridColumn: "1 / -1" }}>
              <h3>Getting you moved</h3>
              <ul className="two">{MOVE_JOBS.map((j) => <li key={j.t}><b>{j.t}</b><span>{j.d}</span></li>)}</ul>
            </div>
          </div>
          <p className="s-fine">
            Moving and home services are performed by independent local companies. You see every quote,
            and approve every booking.
          </p>

          <div className="s-payoff">
            <p className="big">Spend closing weekend at Juno Beach, not on hold with your lender.</p>
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
          <p className="s-fine">
            Wondering what a payment looks like? <Link className="s-link" href="/calculator">Try the payment calculator →</Link>
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="s-sec s-sec-tight" id="faq">
        <div className="wrap s-faq-wrap">
          <div>
            <div className="s-kicker">Straight answers</div>
            <h2 className="s-h2">Fair questions.</h2>
            <p className="s-lede" style={{ fontSize: "16px" }}>
              Looking to rent instead? <a href={site.rentalsUrl} className="s-link">That&apos;s RentalsByChuk →</a>
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
      <section className="s-final" id="get-started">
        <div className="wrap s-final-grid">
          <div className="s-final-chuk"><img src={CHUK_THUMBS} alt="Chuk giving a thumbs up" /></div>
          <div className="s-final-copy">
            <h2 className="s-h2">Ready when you are.</h2>
            <p className="s-lede">Text me what you&apos;re after and your timeline. I&apos;ll take it from there.</p>
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
