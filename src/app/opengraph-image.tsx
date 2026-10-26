import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "CHUK — Rentals in West Palm Beach, Palm Beach Gardens & Jupiter. Consider it handled.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const head = await readFile(join(process.cwd(), "brand/chuk/chuk-head.png"));
  const headSrc = `data:image/png;base64,${head.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "60px 70px",
          background: "#FFFBF1",
          color: "#122E25",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 640 }}>
          <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: 4 }}>RENTALSBYCHUK.COM</div>
          <div style={{ fontSize: 88, fontWeight: 900, lineHeight: 1.05, marginTop: 24 }}>Consider it handled.</div>
          <div style={{ fontSize: 32, marginTop: 28 }}>
            Rentals in West Palm Beach, Palm Beach Gardens &amp; Jupiter.
          </div>
          <div style={{ fontSize: 28, marginTop: 20, opacity: 0.7 }}>Alexander &quot;Chuk&quot; Babenchuk · LoKation Real Estate</div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={headSrc} width={440} height={440} alt="" style={{ borderRadius: 220 }} />
      </div>
    ),
    size,
  );
}
