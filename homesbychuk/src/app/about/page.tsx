import Link from "next/link";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { CHUK_HEAD } from "@/data/chukImages";

export const metadata = pageMeta({
  title: "About Chuk — Alexander Babenchuk, REALTOR®",
  description:
    "Meet Alexander \"Chuk\" Babenchuk, REALTOR® with LoKation Real Estate. A West Palm Beach local helping buyers and sellers in West Palm Beach, Palm Beach Gardens and Jupiter.",
  path: "/about",
});

const CREED = [
  { t: "Straight numbers", d: "The real monthly cost and the real net proceeds, before you decide." },
  { t: "HOA checked first", d: "Dues, assessments and rules pulled from the association documents early." },
  { t: "The move, handled", d: "Movers, cleaners, contractors, utilities: I line up the local pros." },
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
              {site.brokerage}, and a dad of two girls. I help people buy and sell homes here the way I&apos;d
              want my own family helped — straight numbers, no surprises, and every deadline handled. Renting
              first? That&apos;s my sister practice, <a className="s-link" href={site.rentalsUrl}>RentalsByChuk</a>.
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
              {site.brokerage} · Serving {site.areasServed.join(", ")}. <Link className="s-link" href="/#top">Where are you in the move?</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
