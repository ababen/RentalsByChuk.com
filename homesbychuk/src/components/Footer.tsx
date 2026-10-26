import Link from "next/link";
import { site } from "@/lib/site";
import { CHUK_HEAD } from "@/data/chukImages";
import { cities } from "@/data/communities";

export default function Footer() {
  return (
    <footer className="site-footer"><div className="wrap">
      <div className="cols">
        <div>
          <Link className="logo on-dark" href="/">
            <img src={CHUK_HEAD} alt="Chuk" />
            <span className="logo-txt"><span className="nm">CHUK</span><span className="sb">Homes · LoKation Real Estate</span></span>
          </Link>
          <p style={{ fontSize: "14.5px", maxWidth: "38ch", marginTop: "12px" }}>Buying or selling, handled personally. I run the deal and coordinate the move, so you can enjoy West Palm Beach, Palm Beach Gardens &amp; Jupiter.</p>
          <p style={{ fontWeight: 900, color: "#fff", fontSize: "15px", marginTop: "14px" }}>{site.brokerage}</p>
          <p style={{ marginTop: "2px", fontSize: "15px" }}>
            <a className="inline" href={site.phoneHref} style={{ color: "#fff" }}>{site.phoneDisplay}</a>
            {" • "}
            <a className="inline" href={site.smsHref}>Text</a>
            {" • "}
            <a className="inline" href={site.whatsappHref} target="_blank" rel="noreferrer">WhatsApp</a>
          </p>
        </div>
        <div><b>Buyers</b>
          <Link href="/buy">Buying with Chuk</Link>
          <Link href="/calculator">Payment calculator</Link>
          <Link href="/#top">Mover types</Link>
          <a href={site.rentalsUrl}>Rent first ↗</a>
        </div>
        <div><b>Sellers</b>
          <Link href="/sell">Selling with Chuk</Link>
          <Link href="/sell#value">Free pricing opinion</Link>
          <Link href="/about">About Chuk</Link>
          <Link href="/#faq">FAQ</Link>
        </div>
        <div><b>Cities</b>
          {cities.map((c) => <Link key={c.slug} href={`/communities#${c.slug}`}>{c.name}</Link>)}
        </div>
      </div>
      <div className="fine">
        <span>© 2026 HomesByChuk.com — Alexander &quot;Chuk&quot; Babenchuk, LoKation Real Estate. FL Lic. SL3596634.</span>
        <span>Sister site: <a className="inline" href={site.rentalsUrl}>RentalsByChuk.com</a> · Equal Housing Opportunity</span>
      </div>
    </div></footer>
  );
}
