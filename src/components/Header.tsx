import Link from "next/link";
import { site } from "@/lib/site";
import { CHUK_HEAD } from "@/data/chukImages";

export default function Header() {
  return (
    <>
      <div className="topstrip"><div className="wrap">
        <div>⚡ <b>New homes</b> hit my list every week — my people hear first</div>
        <div><b>{site.brokerage}</b> • Text me: <a href={site.smsHref}>{site.phoneDisplay}</a></div>
      </div></div>
      <header className="site-header"><div className="wrap">
        <Link className="logo" href="/" aria-label="Chuk — rentals with LoKation Real Estate">
          <img src={CHUK_HEAD} alt="Chuk" />
          <span><span className="nm">CHUK</span><br /><span className="sb">LOKATION REAL ESTATE</span><br /><span className="sb2">RENTALS • WPB • PBG • JUPITER</span></span>
        </Link>
        <nav className="main">
          <Link href="/#homes">Homes</Link>
          <Link href="/#compare">Compare</Link>
          <Link href="/#meet">Meet Chuk</Link>
          <Link href="/hoa-checker">HOA checker</Link>
          <Link href="/#owners">Owners</Link>
          <Link href="/#faq">FAQ</Link>
          <Link href="/rentals">All Rentals</Link>
          <Link href="/landlords">Landlords</Link>
          <Link href="/communities">Communities</Link>
        </nav>
        <Link className="btn btn-coral" href="/#get-matched" style={{ padding: "11px 19px" }}>Text Chuk →</Link>
      </div></header>
    </>
  );
}
