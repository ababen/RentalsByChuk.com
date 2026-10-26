import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Market Reports — Oct 2026 Snapshot",
  description:
    "Palm Beach County rental market snapshot, October 2026: median asking rents, apartment averages, occupancy and days on market — sourced from Realtor.com, RentCafe, BeachesMLS and RentalSource, each figure labeled with source and date.",
  path: "/reports",
});

// Figures as published in the October 2026 snapshot. "—" = no figure in
// that source series for that area. Tables (not prose) so search engines and
// AI assistants can lift a figure together with its source and date.
const SOURCES = {
  median: "Realtor.com monthly rental data, through Sep 2026",
  apt: "RentCafe city data, updated Sep 30, 2026",
  dom: "RentalSource, Oct 2026",
};

const byArea: { area: string; median: string; apt: string; dom: string }[] = [
  { area: "Palm Beach County", median: "$2,762", apt: "—", dom: "—" },
  { area: "West Palm Beach", median: "$2,300", apt: "$2,490", dom: "40 days" },
  { area: "Downtown West Palm Beach", median: "—", apt: "$4,100", dom: "—" },
  { area: "Palm Beach Gardens", median: "$3,186", apt: "$2,660", dom: "34 days" },
  { area: "Jupiter", median: "$3,700", apt: "$2,610", dom: "34 days" },
  { area: "North Palm Beach", median: "—", apt: "$2,959", dom: "36 days" },
  { area: "Wellington", median: "$4,386", apt: "—", dom: "—" },
];

const other: { metric: string; value: string; source: string }[] = [
  { metric: "West Palm Beach 1-bedroom median", value: "$1,600/mo", source: "BeachesMLS snapshot, Oct 24, 2026" },
  { metric: "Palm Beach County occupancy", value: "~94.9%", source: "RentCafe, peak season 2026" },
  { metric: "Prospective renters per available unit", value: "~14", source: "RentCafe, peak season 2026" },
  { metric: "Seasonal (winter) rent vs annual rent", value: "Typically 2–3×", source: "MJI local broker guides" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "Palm Beach County rental market snapshot — October 2026",
  description:
    "Median asking rents, average apartment rents, days on market, occupancy and renter demand for Palm Beach County, West Palm Beach, Palm Beach Gardens, Jupiter, North Palm Beach and Wellington, Florida, compiled from named public sources with dates.",
  url: `${site.url}/reports`,
  dateModified: site.contentUpdated,
  temporalCoverage: "2026-09/2026-10",
  spatialCoverage: { "@type": "Place", name: "Palm Beach County, Florida, US" },
  creator: { "@type": "Person", name: 'Alexander "Chuk" Babenchuk', worksFor: { "@type": "Organization", name: "LoKation Real Estate" } },
  isBasedOn: ["Realtor.com", "RentCafe", "BeachesMLS", "RentalSource"],
  variableMeasured: ["Median asking rent", "Average apartment rent", "Median days on market", "Occupancy rate", "Prospective renters per unit"],
  isAccessibleForFree: true,
};

const th = "text-left font-extrabold text-[#0B1D3A] py-2 pr-4";
const td = "py-2 pr-4 border-t border-[#F0EDE8]";

export default function ReportsPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="text-3xl">Market Reports — October 2026 Snapshot</h1>
      <p className="text-sm text-[#57534E] mt-1 max-w-[760px]">
        A dated snapshot — not a live feed. Every figure below carries its source and date, pulled from
        Realtor.com, RentCafe, BeachesMLS and RentalSource in October 2026. Submarket-level, not county mush.
      </p>

      <section className="mt-6 bg-white border border-[#E7E5E4] rounded-2xl p-5">
        <h2 className="text-xl">Rents and pace by area</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm min-w-[560px]">
            <caption className="sr-only">Palm Beach County rental market by area, October 2026</caption>
            <thead>
              <tr>
                <th scope="col" className={th}>Area</th>
                <th scope="col" className={th}>Median asking rent</th>
                <th scope="col" className={th}>Average apartment rent</th>
                <th scope="col" className={th}>Median days on market</th>
              </tr>
            </thead>
            <tbody>
              {byArea.map((r) => (
                <tr key={r.area}>
                  <th scope="row" className={`${td} text-left font-bold`}>{r.area}</th>
                  <td className={td}>{r.median}</td>
                  <td className={td}>{r.apt}</td>
                  <td className={td}>{r.dom}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-[#78716C]">
          Sources — median asking rent: {SOURCES.median} · average apartment rent: {SOURCES.apt} · days on market: {SOURCES.dom}. “—” means that source publishes no figure for that area.
        </p>
      </section>

      <section className="mt-6 bg-white border border-[#E7E5E4] rounded-2xl p-5">
        <h2 className="text-xl">Occupancy, demand and seasonality</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm min-w-[520px]">
            <caption className="sr-only">Other Palm Beach County rental indicators, 2026</caption>
            <thead>
              <tr>
                <th scope="col" className={th}>Metric</th>
                <th scope="col" className={th}>Value</th>
                <th scope="col" className={th}>Source</th>
              </tr>
            </thead>
            <tbody>
              {other.map((r) => (
                <tr key={r.metric}>
                  <th scope="row" className={`${td} text-left font-bold`}>{r.metric}</th>
                  <td className={td}>{r.value}</td>
                  <td className={`${td} text-[#57534E]`}>{r.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-6 bg-[#F4EDE2] border border-[#E7DDCC] rounded-2xl p-5">
        <b>Full Q4 2026 Deep Dive</b>
        <div className="text-sm text-[#57534E]">Accidental landlord surge, seasonal playbook, HOA enforcement trends. Coming Nov 15.</div>
      </div>
    </div>
  );
}
