import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { communities, getCommunity } from "@/data/communities";
import { hoaDB } from "@/data/hoa";
import { neighborhoods, faceOffRows } from "@/data/compare";
import { getAllProperties, SAMPLE_NOTE } from "@/lib/properties";
import PropertyCard from "@/components/PropertyCard";
import LeadForm from "@/components/LeadForm";
import { site } from "@/lib/site";

// Only the 12 known communities exist; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return communities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCommunity(slug);
  if (!c) return {};
  const title = `${c.name} Rentals, ${c.city} FL — Rents & HOA Rules`;
  const description = `Renting in ${c.name}, ${c.city}? Typical rents ${c.price}/mo, HOA lease rules, and a rentals-only local guide. ${c.blurb}`;
  return {
    title,
    description,
    alternates: { canonical: `${site.url}/communities/${c.slug}` },
    openGraph: { title, description, url: `${site.url}/communities/${c.slug}` },
  };
}

export default async function CommunityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCommunity(slug);
  if (!c) return notFound();

  const hoa = c.hoaKey ? hoaDB[c.hoaKey] : undefined;
  const market = c.compareKey ? neighborhoods.find((n) => n.key === c.compareKey) : undefined;
  const homes = c.neighborhood ? getAllProperties().filter((p) => p.neighborhood === c.neighborhood) : [];

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Communities", item: `${site.url}/communities` },
      { "@type": "ListItem", position: 2, name: c.name, item: `${site.url}/communities/${c.slug}` },
    ],
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <Link href="/communities" className="text-sm font-bold text-[#1E7A55]">← All communities</Link>

      <div className="mt-4">
        <div className="text-xs tracking-widest font-extrabold text-[#1E7A55] uppercase">{c.city}</div>
        <h1 className="text-3xl mt-1">Renting in {c.name}</h1>
        <p className="text-[#40564C] mt-2 max-w-[720px]">{c.blurb}</p>
        {/* The estimate range is only shown when there's no sourced snapshot — it can conflict with sourced rents. */}
        <div className="mt-3 inline-block bg-white border border-[#EEE0C4] px-4 py-2 rounded-full text-sm">
          {market ? <>Typical asking <b>{market.head}</b></> : <>Typical rent <b>{c.price}/mo</b> <span className="text-[#75816F]">(working estimate)</span></>}
        </div>
      </div>

      <div className="mt-8 grid lg:grid-cols-[1.3fr_.7fr] gap-6">
        <div className="space-y-6">
          {market && (
            <section className="bg-white border border-[#EEE0C4] rounded-2xl p-5">
              <h2 className="text-xl">Market snapshot</h2>
              <p className="text-xs text-[#75816F] mt-1">Oct 2026 market brief · ✅ sourced · 🔶 estimate</p>
              <div className="mt-3 grid gap-2 text-sm">
                {faceOffRows.map((r) => (
                  <div key={r.field} className="flex justify-between gap-4">
                    <span className="text-[#75816F] shrink-0">{r.label}</span>
                    <b className="text-right">{market[r.field]}</b>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="bg-white border border-[#EEE0C4] rounded-2xl p-5">
            <h2 className="text-xl">HOA rental rules</h2>
            {hoa ? (
              <div className="mt-3 grid gap-2 text-sm">
                <div className="flex justify-between gap-4"><span className="text-[#75816F]">Min lease</span><b className="text-right">{hoa.minLease}</b></div>
                <div className="flex justify-between gap-4"><span className="text-[#75816F]">Max / year</span><b className="text-right">{hoa.maxPerYear}</b></div>
                <div className="flex justify-between gap-4"><span className="text-[#75816F]">Board approval</span><b className="text-right">{hoa.board}</b></div>
                <div className="flex justify-between gap-4"><span className="text-[#75816F]">Short-term</span><b className="text-right text-[#E56F22]">{hoa.str}</b></div>
                <div className="flex justify-between gap-4"><span className="text-[#75816F]">Grandfather</span><b className="text-right">{hoa.grandfather}</b></div>
              </div>
            ) : (
              <p className="mt-2 text-sm text-[#40564C]">
                {c.name} isn&apos;t in my checked HOA file yet. Rules vary home to home here — I pull the association documents and confirm the minimum lease, approval timeline and short-term rules before you apply.
              </p>
            )}
            <Link href="/hoa-checker" className="mt-3 inline-block text-xs font-bold text-[#1E7A55]">Open the HOA checker →</Link>
          </section>

          {homes.length > 0 && (
            <section>
              <h2 className="text-xl">Sample homes in {c.name}</h2>
              <p className="text-xs text-[#75816F] mt-1">{SAMPLE_NOTE}</p>
              <div className="mt-3 grid sm:grid-cols-2 gap-4">
                {homes.map((p) => <PropertyCard key={p.id} p={p} />)}
              </div>
            </section>
          )}

          <section className="bg-[#FFF4DE] border border-[#EEE0C4] rounded-2xl p-5 text-sm text-[#40564C]">
            <b>Coming to this page:</b> neighborhood rent comps, schools, and a 60-second video tour of {c.name}.
          </section>
        </div>

        <aside className="space-y-4">
          <div className="bg-white border border-[#EEE0C4] rounded-2xl p-5">
            <LeadForm compact intent="renter-match" context={`${c.name}, ${c.city}`} heading={`Looking in ${c.name}?`} blurb="Tell me your budget and move date — I'll text you live homes and check the HOA first." ctaLabel="Get matched →" />
            <div className="mt-3 text-xs text-[#75816F] text-center">
              Prefer to talk? <a href={site.phoneHref} className="font-bold text-[#1E7A55]">Call</a> or <a href={site.smsHref} className="font-bold text-[#1E7A55]">text {site.phoneDisplay}</a>
            </div>
          </div>
          <div className="bg-[#0E3B2A] text-white rounded-2xl p-5">
            <div className="font-extrabold">More in {c.city}</div>
            <ul className="mt-2 text-sm grid gap-1">
              {communities.filter((o) => o.city === c.city && o.slug !== c.slug).map((o) => (
                <li key={o.slug}><Link href={`/communities/${o.slug}`} className="text-[#CFE4D4] hover:text-white">{o.name} →</Link></li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
