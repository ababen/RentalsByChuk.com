import LeadForm from "@/components/LeadForm";
import { site, smsFor } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Sell Your Home in West Palm Beach, Palm Beach Gardens & Jupiter",
  description:
    "Selling with Chuk: a free pricing opinion from recent nearby sales, prep and presentation, coordinated showings, and a net-sheet on every offer. LoKation Real Estate.",
  path: "/sell",
});

const STEPS = [
  { t: "Pricing opinion", d: "Recent nearby sales, live competition and your home's condition — one honest number." },
  { t: "Prep", d: "What to fix, what to skip, and the local crews to do it. You approve every quote." },
  { t: "Presentation", d: "Professional photos and video, and copy that sells the lifestyle, not just the square feet." },
  { t: "Launch", d: "Priced right from day one, when attention is highest." },
  { t: "Offers", d: "A net-sheet for every offer so you compare what you walk away with, not just the price." },
  { t: "Closing", d: "Inspections, appraisal, HOA estoppel and title chased to the finish." },
];

export default function SellPage() {
  return (
    <div className="simple">
      <section className="s-sec">
        <div className="wrap">
          <div className="s-kicker">Selling</div>
          <h1 className="s-h2">Top dollar, on your timeline.</h1>
          <p className="s-lede">
            The price you get is mostly decided before you list: the number you launch at, how the home is
            prepped, and how it&apos;s presented. I handle all three, then negotiate every offer like it&apos;s
            my own money.
          </p>

          <div className="s-steps">
            {STEPS.map((s, i) => (
              <div className="s-step" key={s.t}><div className="n">{String(i + 1).padStart(2, "0")}</div><h3>{s.t}</h3><p>{s.d}</p></div>
            ))}
          </div>

          <div className="s-cols" id="value" style={{ marginTop: "26px" }}>
            <div className="s-col">
              <h3>What&apos;s my home worth?</h3>
              <p className="s-lede" style={{ fontSize: "16px" }}>
                Send me the address and I&apos;ll prepare a free pricing opinion from recent sales and active
                listings near you. No listing agreement needed, no pressure.
              </p>
              <ul>
                <li><b>Own a rental?</b><span>I can price it as a sale or, through RentalsByChuk, as a lease — so you can compare.</span></li>
                <li><b>Buying next?</b><span>I&apos;ll coordinate both closings so you&apos;re not paying two mortgages or moving twice.</span></li>
              </ul>
            </div>
            <div className="s-col">
              <LeadForm compact intent="home-value" context="Sell page" heading="Request a pricing opinion" ctaLabel="Get my pricing opinion →" />
            </div>
          </div>

          <div className="s-cta-row" style={{ marginTop: "22px" }}>
            <a className="s-btn s-btn-sun" href={smsFor("Hi Chuk — I'm thinking about selling. Can you give me a pricing opinion?")}>Text Chuk →</a>
            <a className="s-btn s-btn-ghost" href={site.phoneHref}>Call {site.phoneDisplay}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
