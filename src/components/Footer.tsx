import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer"><div className="wrap">
      <div className="cols">
        <div>
          <Link className="logo on-dark" href="/">
            <img src="/chuk-head.jpg" alt="Chuk" />
            <span><span className="nm">CHUK</span><br /><span className="sb">RENTALS • RENTALS BY CHUK</span></span>
          </Link>
          <p style={{ fontSize: "14.5px", maxWidth: "38ch", marginTop: "12px" }}>Rentals only, handled personally. West Palm Beach, Palm Beach Gardens &amp; Jupiter. HOA checked first, keys in about 21 days, my word is my bond.</p>
          <p style={{ marginTop: "12px", fontSize: "15px" }}>
            <a className="inline" href={site.phoneHref} style={{ color: "#fff" }}>{site.phoneDisplay}</a>
            {" • "}
            <a className="inline" href={site.smsHref}>Text</a>
            {" • "}
            <a className="inline" href={site.whatsappHref} target="_blank" rel="noreferrer">WhatsApp</a>
          </p>
        </div>
        <div><b>Homes</b>
          <Link href="/#homes">This week&apos;s list</Link>
          <Link href="/rentals">All rentals</Link>
          <Link href="/hoa-checker">HOA checker</Link>
          <Link href="/#get-matched">Text list</Link>
        </div>
        <div><b>Owners</b>
          <Link href="/#owners">The rent math</Link>
          <Link href="/#analysis">Free analysis</Link>
          <Link href="/landlords">For landlords</Link>
          <Link href="/#faq">My fees</Link>
        </div>
        <div><b>Cities</b>
          <Link href="/communities">West Palm Beach</Link>
          <Link href="/communities">Palm Beach Gardens</Link>
          <Link href="/communities">Jupiter</Link>
          <Link href="/reports">Market reports</Link>
        </div>
      </div>
      <div className="fine">
        <span>© 2026 RentalsByChuk.com — Alexander &quot;Chuk&quot; Babenchuk, Lokation. FL Lic. SL3596634.</span>
        <span>Dictum Meum Pactum — my word is my bond.</span>
      </div>
    </div></footer>
  );
}
