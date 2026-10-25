import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Mobile sticky action bar — Call / Text Chuk / HOA Check, with the
 * brokerage name (LoKation Real Estate) riding on the bar itself so
 * it stays adjacent to the contact actions on every page.
 * Most local rental traffic is mobile; this keeps the three
 * highest-converting actions one thumb-tap away on every page.
 * Hidden on ≥md screens (header already carries the CTAs).
 */
export default function StickyCTA() {
  return (
    <>
      {/* spacer so the fixed bar never covers footer content on mobile */}
      <div className="h-[78px] md:hidden" aria-hidden="true" />
      <nav
        className="fixed bottom-0 inset-x-0 z-50 md:hidden"
        style={{
          background: "rgba(14,59,42,.98)",
          borderTop: "1px solid rgba(255,255,255,.16)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
        aria-label="Quick contact"
      >
        <div
          className="text-center text-[10px] font-extrabold uppercase"
          style={{ color: "#BCD2C0", letterSpacing: ".14em", paddingTop: "5px" }}
        >
          {site.brokerage}
        </div>
        <div className="grid grid-cols-3 text-center text-[13px] font-bold text-white">
          <a href={site.phoneHref} className="py-2.5">📞 Call</a>
          <a href={site.smsHref} className="py-2.5" style={{ borderLeft: "1px solid rgba(255,255,255,.16)", borderRight: "1px solid rgba(255,255,255,.16)" }}>
            💬 Text Chuk
          </a>
          <Link href="/hoa-checker" className="py-2.5" style={{ color: "#FFC79A" }}>
            HOA Check →
          </Link>
        </div>
      </nav>
    </>
  );
}
