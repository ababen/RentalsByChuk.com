import { cities, communities } from "@/data/communities";
import { smsFor } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Communities — West Palm Beach, Palm Beach Gardens & Jupiter",
  description:
    "A buyer's guide to 12 neighborhoods and communities across West Palm Beach, Palm Beach Gardens and Jupiter — what they're like and what kinds of homes you'll find.",
  path: "/communities",
});

export default function CommunitiesPage() {
  return (
    <div className="simple">
      <section className="s-sec">
        <div className="wrap">
          <div className="s-kicker">Communities</div>
          <h1 className="s-h2">Three cities. Twelve places I&apos;d send a friend.</h1>
          <p className="s-lede">
            Every community here comes with its own rules, dues and personality. Tell me how you live and
            I&apos;ll tell you where it fits — and pull the HOA documents before you fall for a house.
          </p>

          {cities.map((c) => (
            <div key={c.slug} id={c.slug} style={{ marginTop: "30px", scrollMarginTop: "90px" }}>
              <h2 className="s-h2" style={{ fontSize: "28px" }}>{c.name}</h2>
              <p className="s-lede" style={{ fontSize: "16px" }}>{c.intro}</p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {communities.filter((x) => x.city === c.name).map((x) => (
                  <div className="s-col" key={x.slug} id={x.slug}>
                    <h3>{x.name}</h3>
                    <p className="text-sm">{x.blurb}</p>
                    <p className="text-xs font-extrabold uppercase tracking-widest mt-2 text-[#1F4E8C]">{x.homes}</p>
                    <a className="s-link text-sm" href={smsFor(`Hi Chuk — what's on the market in ${x.name} (${x.city})?`)}>What&apos;s for sale here? →</a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
