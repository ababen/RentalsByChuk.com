import Link from "next/link";
import { site } from "@/lib/site";
import { CHUK_HEAD } from "@/data/chukImages";

export default function Footer() {
  return (
    <footer className="site-footer"><div className="wrap">
      <div className="cols">
        <div>
          <Link className="logo on-dark" href="/">
            <img src={CHUK_HEAD} alt="Chuk" />
            <span className="logo-txt"><span className="nm">CHUK</span><span className="sb">Rentals · LoKation Real Estate</span></span>
          </Link>
          <p style={{ fontSize: "14.5px", maxWidth: "38ch", marginTop: "12px" }}>Rentals only, handled personally. I find the home and coordinate the move, so you can enjoy West Palm Beach, Palm Beach Gardens &amp; Jupiter.</p>
          <p style={{ fontWeight: 900, color: "#fff", fontSize: "15px", marginTop: "14px" }}>{site.brokerage}</p>
          <p style={{ marginTop: "2px", fontSize: "15px" }}>
            <a className="inline" href={site.phoneHref} style={{ color: "#fff" }}>{site.phoneDisplay}</a>
            {" • "}
            <a className="inline" href={site.smsHref}>Text</a>
            {" • "}
            <a className="inline" href={site.whatsappHref} target="_blank" rel="noreferrer">WhatsApp</a>
          </p>
        </div>
        <div><b>Homes</b>
          <Link href="/#top">Renter types</Link>
          <Link href="/#handled">Done for you</Link>
          <Link href="/rentals">All rentals</Link>
          <Link href="/hoa-checker">HOA checker</Link>
          <Link href="/#get-matched">Text list</Link>
        </div>
        <div><b>Owners</b>
          <Link href="/landlords">For landlords</Link>
          <Link href="/#faq">FAQ</Link>
        </div>
        <div><b>Cities</b>
          <Link href="/communities">West Palm Beach</Link>
          <Link href="/communities">Palm Beach Gardens</Link>
          <Link href="/communities">Jupiter</Link>
          <Link href="/reports">Market reports</Link>
        </div>
      </div>
      <div className="fine">
        <span>© 2026 RentalsByChuk.com — Alexander &quot;Chuk&quot; Babenchuk, LoKation Real Estate. FL Lic. SL3596634.</span>
      </div>
    </div></footer>
  );
}
