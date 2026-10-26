import { ImageResponse } from "next/og";
import { CHUK_WAVE } from "@/data/chukImages";
import { site } from "@/lib/site";

// Default social / link-preview image for every page (texts, Facebook,
// LinkedIn, X, AI answer cards). Rendered at build time from the Chuk
// wave image so no binary has to live in public/.
export const alt = "Chuk — rentals in West Palm Beach, Palm Beach Gardens & Jupiter";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", background: "#FFFBF1", color: "#122E25", padding: "0 0 0 72px" }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 32 }}>
          <div style={{ fontSize: 30, fontWeight: 800, color: "#0CA89A", letterSpacing: 2 }}>RENTALSBYCHUK</div>
          <div style={{ fontSize: 68, fontWeight: 900, lineHeight: 1.05, marginTop: 18 }}>Moving here? Consider it handled.</div>
          <div style={{ fontSize: 32, marginTop: 24, color: "#44403C" }}>Rentals only — West Palm Beach, Palm Beach Gardens &amp; Jupiter. $0 to renters.</div>
          <div style={{ fontSize: 30, fontWeight: 800, marginTop: 32 }}>{`Text Chuk · ${site.phoneDisplay}`}</div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={CHUK_WAVE} alt="" width={460} height={630} style={{ objectFit: "cover", objectPosition: "center top", height: "100%" }} />
      </div>
    ),
    size,
  );
}
