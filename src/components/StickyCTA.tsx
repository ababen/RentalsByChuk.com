import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Mobile sticky action bar — Call / Text / Free Analysis.
 * Most local rental traffic is mobile; this keeps the three
 * highest-converting actions one thumb-tap away on every page.
 * Hidden on ≥md screens (header already carries the CTAs).
 */
export default function StickyCTA() {
  return (
    <>
      {/* spacer so the fixed bar never covers footer content on mobile */}
      <div className="h-[60px] md:hidden" aria-hidden="true" />
      <nav
        className="fixed bottom-0 inset-x-0 z-50 md:hidden"
        style={{
          background: "rgba(11,29,58,.97)",
          borderTop: "1px solid #1E3A5F",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
        aria-label="Quick contact"
      >
        <div className="grid grid-cols-3 text-center text-[13px] font-bold text-white">
          <a href={site.phoneHref} className="py-3.5">📞 Call</a>
          <a href={site.smsHref} className="py-3.5" style={{ borderLeft: "1px solid #1E3A5F", borderRight: "1px solid #1E3A5F" }}>
            💬 Text Chuk
          </a>
          <Link href="/#analysis" className="py-3.5" style={{ color: "#2EC4B6" }}>
            Free Analysis →
          </Link>
        </div>
      </nav>
    </>
  );
}
