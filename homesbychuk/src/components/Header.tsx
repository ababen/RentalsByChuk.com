import Link from "next/link";
import { site } from "@/lib/site";
import { CHUK_HEAD } from "@/data/chukImages";

export default function Header() {
  return (
    <>
      <div className="topstrip"><div className="wrap">
        <div className="ts-areas">Buy · Sell · West Palm Beach · Palm Beach Gardens · Jupiter</div>
        <div><b>{site.brokerage}</b> • Text me: <a href={site.smsHref}>{site.phoneDisplay}</a></div>
      </div></div>
      <header className="site-header"><div className="wrap">
        <Link className="logo" href="/" aria-label="Chuk — homes with LoKation Real Estate">
          <img src={CHUK_HEAD} alt="Chuk" />
          <span className="logo-txt"><span className="nm">CHUK</span><span className="sb">Homes · LoKation Real Estate</span></span>
        </Link>
        <nav className="main">
          <Link href="/buy">Buy</Link>
          <Link href="/sell">Sell</Link>
          <Link href="/calculator">Payment calculator</Link>
          <Link href="/communities">Communities</Link>
          <Link href="/about">About</Link>
          <a href={site.rentalsUrl}>Rentals ↗</a>
        </nav>
        <Link className="btn btn-coral" href={site.smsHref} style={{ padding: "11px 19px" }}>Text Chuk →</Link>
      </div></header>
    </>
  );
}
