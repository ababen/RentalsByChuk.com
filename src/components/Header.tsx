import Link from "next/link";
import { site } from "@/lib/site";
import { CHUK_HEAD } from "@/data/chukImages";

export default function Header() {
  return (
    <>
      <div className="topstrip"><div className="wrap">
        <div className="ts-areas">Rentals only · West Palm Beach · Palm Beach Gardens · Jupiter</div>
        <div><b>{site.brokerage}</b> • Text me: <a href={site.smsHref}>{site.phoneDisplay}</a></div>
      </div></div>
      <header className="site-header"><div className="wrap">
        <Link className="logo" href="/" aria-label="Chuk — rentals with LoKation Real Estate">
          <img src={CHUK_HEAD} alt="Chuk" />
          <span className="logo-txt"><span className="nm">CHUK</span><span className="sb">Rentals · LoKation Real Estate</span></span>
        </Link>
        <nav className="main">
          <Link href="/#top">Renter types</Link>
          <Link href="/#handled">Done for you</Link>
          <Link href="/rentals">Rentals</Link>
          <Link href="/landlords">Landlords</Link>
          <Link href="/about">About</Link>
          <Link href="/#faq">FAQ</Link>
        </nav>
        <Link className="btn btn-coral" href={site.smsHref} style={{ padding: "11px 19px" }}>Text Chuk →</Link>
      </div></header>
    </>
  );
}
