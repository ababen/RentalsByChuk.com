import Link from "next/link";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { CHUK_HEAD } from "@/data/chukImages";

export const metadata = pageMeta({
  title: "About Chuk — Alexander Babenchuk, REALTOR®",
  description:
    "Meet Alexander \"Chuk\" Babenchuk, REALTOR® with LoKation Real Estate. A West Palm Beach local who only does rentals in West Palm Beach, Palm Beach Gardens and Jupiter.",
  path: "/about",
});

const CREED = [
  { t: "Rentals only", d: "No sales pitch hiding inside your tour. Ever." },
  { t: "HOA checked before you apply", d: "Every home's rental rules pulled from the association documents first." },
  { t: "The move, handled", d: "Movers, junk removal, furniture, utilities: I line up the local pros so you just show up." },
  { t: "Off the clock", d: "El Yunque trails, Havana classics, beach cookouts. Home in time for the Daddy/Daughter Dance." },
];

export default function AboutPage() {
  return (
    <div className="simple">
      <section className="s-sec s-about-sec">
        <div className="wrap s-about">
          <div className="s-about-ph">
            <img
              src="/about/alex-babenchuk.jpg"
              alt="Alexander “Chuk” Babenchuk in a white blazer outside in West Palm Beach"
              width={695}
              height={868}
            />
            <div className="s-about-badge">
              <img src={CHUK_HEAD} alt="" aria-hidden="true" />
              <span>Yes, the 3D guy is me.</span>
            </div>
          </div>

          <div>
            <div className="s-kicker">About Chuk</div>
            <h1>The guy behind the blazer.</h1>
            <p className="s-lede">
              I&apos;m Alexander &quot;Chuk&quot; Babenchuk, REALTOR®: a West Palm Beach local, licensed with{" "}
              {site.brokerage}, and a dad of two girls who got tired of watching good people get burned by
              surprise HOA rules and lose weekends to rental sites. So I built the practice I couldn&apos;t find: one
              guy, one specialty, total focus on getting you home.
            </p>

            <div className="s-col s-about-creed">
              <ul>
                {CREED.map((c) => (
                  <li key={c.t}><b>{c.t}</b><span>{c.d}</span></li>
                ))}
              </ul>
            </div>

            <div className="s-cta-row">
              <a className="s-btn s-btn-sun" href={site.smsHref}>Text Chuk →</a>
              <a className="s-btn s-btn-ghost" href={site.phoneHref}>Call {site.phoneDisplay}</a>
            </div>
            <p className="s-fine">
              {site.brokerage} · Serving {site.areasServed.join(", ")}. <Link className="s-link" href="/#top">What kind of renter are you?</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
