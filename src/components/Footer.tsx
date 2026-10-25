import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer"><div className="container">
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr .8fr .8fr .8fr", gap: "20px" }}>
        <div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}><div className="logo-mark">R</div><div><b>RENTALS<span style={{ color: "var(--coral)" }}>BY</span>CHUK</b><div className="mono" style={{ color: "#94A3B8" }}>Sister to HomesByChuk</div></div></div>
          <p style={{ marginTop: "10px", color: "#94A3B8", fontSize: "13px", maxWidth: "360px" }}>Rentals-only Realtor for West Palm Beach • Palm Beach Gardens • Jupiter. We price by neighborhood, clear your HOA, and lease in 21 days.</p>
          <div style={{ marginTop: "12px", display: "flex", gap: "8px", flexWrap: "wrap" as const }}><a href={site.phoneHref} className="pill" style={{ background: "#13294B", borderColor: "#334155", color: "#E2E8F0" }}>{site.phoneDisplay}</a><a href={site.smsHref} className="pill" style={{ background: "#13294B", borderColor: "#334155", color: "#E2E8F0" }}>Text Chuk</a><a href={site.whatsappHref} target="_blank" rel="noreferrer" className="pill" style={{ background: "#13294B", borderColor: "#334155", color: "#E2E8F0" }}>WhatsApp</a></div>
        </div>
        <div><b>Find a Rental</b><div style={{ marginTop: "8px", display: "grid", gap: "6px", fontSize: "14px" }}><Link href="/rentals">Map Search</Link><Link href="/rentals?pet=1">Pet-Friendly</Link><Link href="/rentals?seasonal=1">Waterfront</Link><Link href="/rentals?seasonal=1">Furnished Seasonal</Link><Link href="/rentals">Tenant Vault</Link></div></div>
        <div><b>For Landlords</b><div style={{ marginTop: "8px", display: "grid", gap: "6px", fontSize: "14px" }}><Link href="/landlords">Rent vs Sell Quiz</Link><Link href="/hoa-checker">HOA Checker</Link><Link href="/landlords">Seasonal Calculator</Link><Link href="/landlords">Guarantees</Link><Link href="/admin">Owner Login</Link></div></div>
        <div><b>The Triangle</b><div style={{ marginTop: "8px", display: "grid", gap: "6px", fontSize: "14px" }}><Link href="/communities">West Palm Beach</Link><Link href="/communities">Palm Beach Gardens</Link><Link href="/communities">Jupiter</Link><Link href="/reports">Market Reports</Link><Link href="/communities">About Chuk</Link></div></div>
      </div>
      <div style={{ marginTop: "18px", borderTop: "1px solid #1E3A5F", paddingTop: "14px", display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" as const }} className="mono">
        <span style={{ color: "#64748B" }}>© 2026 RentalsByChuk.com • All rights reserved • WPB • PBG • Jupiter • Not a property manager — a rentals-only Realtor + management partner network.</span>
        <span><Link href="/RentalsByChuk_BrandGuide.html" style={{ color: "#2EC4B6" }}>Brand Guide →</Link> • <Link href="/RentalsByChuk_Strategy.md" style={{ color: "#94A3B8" }}>Strategy Doc</Link></span>
      </div>
    </div></footer>
  );
}
