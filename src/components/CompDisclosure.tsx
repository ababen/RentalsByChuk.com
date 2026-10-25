/**
 * Compact compensation one-liner — sits next to the "$0" promise
 * in the Hero only. The full SOP 12-1 disclosure lives in the FAQ
 * answer (HomePage FAQS + its JSON-LD twin in app/page.tsx).
 */
export default function CompDisclosure({
  dark = false,
  style,
}: {
  dark?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <p className={`comp-disc ${dark ? "on-dark" : "light"}`} style={style}>
      The property side pays me when a lease signs — always $0 to you.
    </p>
  );
}
