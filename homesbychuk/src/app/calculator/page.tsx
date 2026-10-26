import MortgageCalculator from "@/components/MortgageCalculator";
import { site, smsFor } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Mortgage Payment Calculator — Palm Beach County",
  description:
    "Estimate a full monthly house payment in West Palm Beach, Palm Beach Gardens or Jupiter — principal, interest, property tax, insurance and HOA dues.",
  path: "/calculator",
});

export default function CalculatorPage() {
  return (
    <div className="simple">
      <section className="s-sec">
        <div className="wrap">
          <div className="s-kicker">Payment calculator</div>
          <h1 className="s-h2">What would it really cost per month?</h1>
          <p className="s-lede">
            The mortgage is only part of it. In Florida, insurance and HOA dues can swing a payment by
            hundreds a month. Plug in your numbers — then text me a home and I&apos;ll price out the real ones.
          </p>
          <MortgageCalculator />
          <div className="s-cta-row" style={{ marginTop: "22px" }}>
            <a className="s-btn s-btn-sun" href={smsFor("Hi Chuk — can you help me price out the real monthly cost of a home?")}>Text Chuk a home to price →</a>
            <a className="s-btn s-btn-ghost" href={site.phoneHref}>Call {site.phoneDisplay}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
