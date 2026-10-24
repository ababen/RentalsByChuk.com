import Link from "next/link";

export default function Header() {
  return (
    <>
      <div className="alert"><div className="alert-inner">
        <div>🌴 <b>Goldilocks Alert</b> — Seasonal conversions start in <b>~6 weeks</b>. Get notified when Jupiter & PBG inventory spikes. <span style={{ opacity: .8 }}>May/June = best deals.</span></div>
        <Link href="/#alert">Get Notified →</Link>
      </div></div>
      <header className="header"><div className="header-inner">
        <Link className="logo" href="/">
          <div className="logo-mark">R</div>
          <div>
            <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, letterSpacing: "-.02em", lineHeight: 1 }}>RENTALS<span style={{ color: "var(--coral)" }}>BY</span>CHUK</div>
            <div className="mono" style={{ color: "var(--aqua2)", fontSize: "10px" }}>WPB • PBG • JUPITER</div>
          </div>
        </Link>
        <nav className="nav">
          <Link href="/rentals">Find a Rental</Link>
          <Link href="/landlords">For Landlords</Link>
          <Link href="/communities">Communities</Link>
          <Link href="/reports">Market Reports</Link>
        </nav>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Link className="btn btn-ghost" href="/hoa-checker" style={{ padding: "9px 14px" }}>HOA Check</Link>
          <Link className="btn btn-navy" href="/admin">Agent Login</Link>
        </div>
      </div></header>
    </>
  );
}
