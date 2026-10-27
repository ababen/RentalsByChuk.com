
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { communities, cities, CITY_SOURCES, type CityName } from "@/data/communities";

export const metadata = pageMeta({ title: "Communities — Renting in West Palm Beach, Palm Beach Gardens & Jupiter", description: "12 rental communities across West Palm Beach, Palm Beach Gardens & Jupiter — typical rents, lease minimums, HOA approval rules and October 2026 market data for each.", path: "/communities" });

const CITY_ORDER: CityName[] = ["West Palm Beach", "Palm Beach Gardens", "Jupiter"];

export default function CommunitiesPage(){
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <h1 className="text-3xl">Communities — The Northern Triangle</h1>
      <p className="text-sm text-[#57534E] mt-1">12 communities across three cities. Each page has typical rents, lease and HOA rules, and October 2026 market data.</p>
      {CITY_ORDER.map((cityName) => {
        const city = cities[cityName];
        return (
          <section key={cityName} id={city.slug} className="mt-8 scroll-mt-24">
            <h2 className="text-2xl">Renting in {cityName}</h2>
            <p className="text-sm text-[#57534E] mt-1">Median asking rent {city.median} · average apartment {city.aptAvg} · {city.dom} on market.</p>
            <div className="mt-4 grid md:grid-cols-3 gap-4">
              {communities.filter((c) => c.city === cityName).map((c) => (
                <Link key={c.slug} href={`/communities/${c.slug}`} className="block bg-white border border-[#E7E5E4] rounded-2xl p-5 hover:border-[#0CA89A]">
                  <div className="text-xs tracking-widest font-extrabold text-[#0CA89A] uppercase">{c.city}</div>
                  <h3 className="font-extrabold mt-1">{c.name}</h3>
                  <div className="text-sm font-bold text-[#0B1D3A]">{c.band}/mo</div>
                  <div className="text-sm text-[#57534E] mt-2">{c.blurb}</div>
                  <div className="mt-3 text-xs font-bold text-[#0CA89A]">Rents &amp; HOA rules →</div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
      <p className="mt-8 text-xs text-[#78716C]">{CITY_SOURCES}</p>
    </div>
  );
}
