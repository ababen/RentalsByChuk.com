import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LeadForm from "@/components/LeadForm";
import { communities, cities, CITY_SOURCES, getCommunity, compareRow, hoaRules, plainFigure, type Community } from "@/data/communities";
import { getAllProperties, formatPrice } from "@/lib/properties";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return communities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCommunity(slug);
  if (!c) return {};
  const meta = pageMeta({
    title: `Renting in ${c.name}, ${c.city} — Rents & HOA Rules`,
    description: `Renting in ${c.name}, ${c.city}, FL: typical rents ${c.band}/mo, lease minimums and HOA approval rules, and ${c.city} market data (Oct 2026). Rentals-only help from Chuk with LoKation Real Estate.`,
    path: `/communities/${c.slug}`,
  });
  return c.indexed ? meta : { ...meta, robots: { index: false, follow: true } };
}

/** Q&A built only from the figures on the page, so the FAQ JSON-LD never says more than the page does. */
function faqsFor(c: Community) {
  const row = compareRow(c);
  const hoa = hoaRules(c);
  const city = cities[c.city];
  const faqs = [
    {
      q: `How much does it cost to rent in ${c.name}?`,
      a: `Chuk's working range for ${c.name} is ${c.band} a month.${row ? ` Published data: ${plainFigure(row.head)}.` : ""} For context, the ${c.city} median asking rent is ${city.median} (Realtor.com, through Sep 2026).`,
    },
  ];
  const minLease = hoa?.minLease ?? (row ? plainFigure(row.min) : undefined);
  faqs.push({
    q: `What is the minimum lease in ${c.name}?`,
    a: minLease
      ? `${minLease}.${hoa ? ` Approval: ${hoa.board}.` : ""} Rules can differ by village or building, so Chuk confirms them for the specific home before you apply.`
      : `It depends on the building or association. Chuk pulls the association documents and confirms the minimum before you apply.`,
  });
  return faqs;
}

export default async function CommunityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCommunity(slug);
  if (!c) return notFound();
  const row = compareRow(c);
  const hoa = hoaRules(c);
  const city = cities[c.city];
  const faqs = faqsFor(c);
  const homes = getAllProperties().filter((p) => p.neighborhood === c.name && p.city === c.city);
  const nearby = communities.filter((o) => o.city === c.city && o.slug !== c.slug);
  const smsHref = `sms:${site.phoneHref.replace("tel:", "")}?&body=${encodeURIComponent(`Hi Chuk — I'm looking to rent in ${c.name}, ${c.city}.`)}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Communities", item: `${site.url}/communities` },
        { "@type": "ListItem", position: 3, name: c.name, item: `${site.url}/communities/${c.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  const rentRows: [string, string][] = [["Chuk's typical range", `${c.band}/mo`]];
  if (row) {
    rentRows.push(["Market figure", plainFigure(row.head)]);
    rentRows.push(["1 bedroom", plainFigure(row.r1)], ["2 bedroom", plainFigure(row.r2)], ["3 bedroom", plainFigure(row.r3)]);
    rentRows.push(["Furnished / seasonal", plainFigure(row.furn)], ["Days on market", plainFigure(row.dom)]);
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="text-sm font-bold text-[#0CA89A]" aria-label="Breadcrumb">
        <Link href="/communities">Communities</Link> <span className="text-[#78716C]">/</span>{" "}
        <Link href={`/communities#${city.slug}`}>{c.city}</Link>
      </nav>
      <h1 className="text-3xl mt-3">Renting in {c.name}, {c.city}</h1>
      <p className="mt-2 text-[#44403C] max-w-[760px] leading-relaxed">
        {row ? `${plainFigure(row.vibe)}.` : c.blurb} Typical rents run <b>{c.band}/mo</b>.
      </p>
      {row && <p className="mt-2 text-[#44403C] max-w-[760px] leading-relaxed"><b>Chuk&apos;s take:</b> {row.take}</p>}

      <div className="mt-6 grid lg:grid-cols-[1.3fr_.7fr] gap-6">
        <div className="space-y-6">
          <section className="bg-white border border-[#E7E5E4] rounded-2xl p-5">
            <h2 className="text-xl">Rent in {c.name}</h2>
            <table className="mt-3 w-full text-sm">
              <tbody>
                {rentRows.map(([k, v]) => (
                  <tr key={k} className="border-t border-[#F0EDE8] first:border-0">
                    <th scope="row" className="text-left font-normal text-[#78716C] py-2 pr-4 align-top">{k}</th>
                    <td className="py-2 font-bold">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-2 text-xs text-[#78716C]">
              {row
                ? "Published figures: October 2026 snapshot — Realtor.com, RentCafe, BeachesMLS, RentalSource, Zumper, Homes.com and ApartmentList, as labeled on the Market Reports page. Estimates are marked."
                : `No published rent series for ${c.name} yet — the range above is Chuk's working range. Ask for current comps.`}
            </p>
          </section>

          <section className="bg-white border border-[#E7E5E4] rounded-2xl p-5">
            <h2 className="text-xl">Lease &amp; HOA rules in {c.name}</h2>
            {hoa ? (
              <table className="mt-3 w-full text-sm">
                <tbody>
                  {[["Minimum lease", hoa.minLease], ["Leases per year", hoa.maxPerYear], ["Approval", hoa.board], ["Short-term stays", hoa.str], ["Also note", hoa.grandfather]].map(([k, v]) => (
                    <tr key={k} className="border-t border-[#F0EDE8] first:border-0">
                      <th scope="row" className="text-left font-normal text-[#78716C] py-2 pr-4 align-top">{k}</th>
                      <td className="py-2 font-bold">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : row ? (
              <ul className="mt-3 text-sm grid gap-1.5 list-disc ml-5">
                <li><b>Lease terms:</b> {plainFigure(row.min)}</li>
                <li><b>Approval:</b> {plainFigure(row.strict)}</li>
              </ul>
            ) : (
              <p className="mt-2 text-sm text-[#44403C]">Rules vary by association and building. Chuk pulls the association documents and confirms the minimum lease, approval steps and timelines before you apply.</p>
            )}
            <p className="mt-3 text-sm"><Link href={`/hoa-checker?q=${encodeURIComponent(c.name)}`} className="font-bold text-[#0CA89A]">Check {c.name} in the HOA checker →</Link></p>
          </section>

          <section className="bg-white border border-[#E7E5E4] rounded-2xl p-5">
            <h2 className="text-xl">{c.city} rental market, October 2026</h2>
            <div className="mt-3 grid sm:grid-cols-3 gap-3 text-sm">
              <div><div className="text-[#78716C]">Median asking rent</div><div className="text-lg font-extrabold">{city.median}</div></div>
              <div><div className="text-[#78716C]">Average apartment</div><div className="text-lg font-extrabold">{city.aptAvg}</div></div>
              <div><div className="text-[#78716C]">Days on market</div><div className="text-lg font-extrabold">{city.dom}</div></div>
            </div>
            <p className="mt-2 text-xs text-[#78716C]">{CITY_SOURCES} <Link href="/reports" className="font-bold text-[#0CA89A]">Full market report →</Link></p>
          </section>

          {homes.length > 0 && (
            <section>
              <h2 className="text-xl">Sample homes in {c.name}</h2>
              <p className="text-xs text-[#7A5B00] font-bold mt-1">Illustrative only — not current listings. Live homes come by text.</p>
              <ul className="mt-2 grid gap-2">
                {homes.map((p) => (
                  <li key={p.id}><Link href={`/rentals/${p.id}`} className="font-bold text-[#0CA89A]">{p.title}</Link> <span className="text-sm text-[#57534E]">— typical {formatPrice(p.price)}</span></li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <h2 className="text-xl">Renting in {c.name}: common questions</h2>
            <div className="mt-3 grid gap-3">
              {faqs.map((f) => (
                <div key={f.q} className="bg-white border border-[#E7E5E4] rounded-2xl p-4">
                  <h3 className="font-extrabold">{f.q}</h3>
                  <p className="mt-1 text-sm text-[#44403C]">{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="bg-white border border-[#E7E5E4] rounded-2xl p-5">
            <LeadForm compact intent="renter-match" context={`${c.name}, ${c.city}`} heading={`Find me a rental in ${c.name}`} blurb="Tell me your budget and move date — I'll text you live homes and check the HOA before you apply." ctaLabel="Text me matches →" />
            <div className="mt-3 text-xs text-[#78716C] text-center">
              Prefer to talk? <a href={site.phoneHref} className="font-bold text-[#0CA89A]">Call</a> or <a href={smsHref} className="font-bold text-[#0CA89A]">text {site.phoneDisplay}</a>
            </div>
          </div>
          <div className="bg-[#0B1D3A] text-white rounded-2xl p-5">
            <div className="font-extrabold">More in {c.city}</div>
            <ul className="mt-2 text-sm grid gap-1.5">
              {nearby.map((o) => (
                <li key={o.slug}><Link href={`/communities/${o.slug}`} className="text-[#7FE3D8] font-bold">{o.name}</Link> <span className="text-[#CBD5E1]">· {o.band}</span></li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
