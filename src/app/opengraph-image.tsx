import { ImageResponse } from "next/og";

export const alt = "CHUK — Rentals in West Palm Beach, Palm Beach Gardens & Jupiter. Consider it handled.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#FFFBF1",
          color: "#122E25",
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: 4 }}>RENTALSBYCHUK.COM</div>
        <div style={{ fontSize: 108, fontWeight: 900, lineHeight: 1.05, marginTop: 24 }}>Consider it handled.</div>
        <div style={{ fontSize: 40, marginTop: 32 }}>
          Rentals in West Palm Beach, Palm Beach Gardens &amp; Jupiter — $0 to renters.
        </div>
        <div style={{ fontSize: 32, marginTop: 24, opacity: 0.7 }}>Chuk · LoKation Real Estate</div>
      </div>
    ),
    size,
  );
}
