import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import { site, smsFor } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Buy a Home in West Palm Beach, Palm Beach Gardens & Jupiter",
  description:
    "Buying a home with Chuk: pre-approval, the real monthly cost, HOA rules checked first, comps-backed offers, and every deadline to closing handled. LoKation Real Estate.",
  path: "/buy",
});

const STEPS = [
  { t: "Pre-approval", d: "Know your number before you tour. I'll connect you with a local lender if you need one." },
  { t: "The short list", d: "Homes that fit — with the true monthly cost and the HOA's rules pulled up front." },
  { t: "Tours", d: "In person or by video. I point out what the listing photos don't." },
  { t: "Offer", d: "Priced from recent sales, with terms that win without overpaying." },
  { t: "Inspection & appraisal", d: "Wind mitigation and 4-point included where insurers need them. I negotiate the repairs." },
  { t: "Closing", d: "Lender, title and HOA approval chased to the finish. Then movers and utilities on your keys day." },
];

const CHECKS = [
  { t: "Flood zone & insurance quote", d: "Before you're under contract, not after." },
  { t: "HOA documents", d: "Dues, special assessments, pet, rental and parking rules." },
  { t: "Roof age & 4-point items", d: "The things that drive Florida insurability." },
  { t: "Commute & schools", d: "Drive times at rush hour and assigned schools, checked." },
];

export default function BuyPage() {
  return (
    <div className="simple">
      <section className="s-sec">
        <div className="wrap">
          <div className="s-kicker">Buying</div>
          <h1 className="s-h2">Buy the right home.<br />Skip the expensive surprises.</h1>
          <p className="s-lede">
            I help buyers in {site.areasServed.join(", ")} find the home, price the offer, and get to closing
            without the 11th-hour shocks — insurance quotes, HOA rules and inspection items handled before
            they cost you.
          </p>

          <div className="s-steps">
            {STEPS.map((s, i) => (
              <div className="s-step" key={s.t}><div className="n">{String(i + 1).padStart(2, "0")}</div><h3>{s.t}</h3><p>{s.d}</p></div>
            ))}
          </div>

          <div className="s-cols" style={{ marginTop: "26px" }}>
            <div className="s-col">
              <h3>What I check before you offer</h3>
              <ul>{CHECKS.map((c) => <li key={c.t}><b>{c.t}</b><span>{c.d}</span></li>)}</ul>
            </div>
            <div className="s-col">
              <h3>Tell me what you&apos;re looking for</h3>
              <LeadForm compact intent="buyer-match" context="Buy page" ctaLabel="Start my search →" />
            </div>
          </div>

          <div className="s-payoff">
            <p className="big">Not ready to buy yet?</p>
            <p>
              Rent first and learn the neighborhoods — <a className="s-link" href={site.rentalsUrl}>RentalsByChuk</a> handles
              that, and I&apos;ll be there when you&apos;re ready to buy. Or run the numbers with the{" "}
              <Link className="s-link" href="/calculator">payment calculator</Link>.
            </p>
          </div>

          <div className="s-cta-row">
            <a className="s-btn s-btn-sun" href={smsFor("Hi Chuk — I'm looking to buy a home in WPB / PBG / Jupiter.")}>Text Chuk →</a>
            <a className="s-btn s-btn-ghost" href={site.phoneHref}>Call {site.phoneDisplay}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
