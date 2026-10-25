/**
 * SOP 12-1 compensation disclosure — sits adjacent to every
 * "$0 / free to renters" claim on the site. States who pays,
 * when, how the amount is set, and that renters owe nothing
 * for search, touring, and lease help.
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
      How Chuk gets paid: the property side (owner/landlord) pays when a lease signs, at the
      rate set in that property&apos;s listing agreement — it varies by property. Renters owe
      $0 for search, touring, and lease help, whether they sign or not.
    </p>
  );
}
