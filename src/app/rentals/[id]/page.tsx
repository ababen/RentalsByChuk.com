
import { getPropertyById } from "@/lib/properties";
import { formatPrice } from "@/lib/properties";
import Link from "next/link";
import { notFound } from "next/navigation";
import LeadForm from "@/components/LeadForm";
import { site } from "@/lib/site";

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = getPropertyById(id);
  if (!p) return notFound();
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <Link href="/rentals" className="text-sm font-bold text-[#0CA89A]">← Back to rentals</Link>
      <div className="mt-4 grid lg:grid-cols-[1.3fr_.7fr] gap-6">
        <div>
          <div className="h-[420px] rounded-2xl overflow-hidden border border-[#E7E5E4] bg-[#E7E5E4]"><img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" /></div>
          <h1 className="text-3xl mt-4">{p.title}</h1>
          <div className="text-sm text-[#57534E]">{p.address} • {p.neighborhood} • {p.city}</div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="bg-white border border-[#E7E5E4] px-3 py-1.5 rounded-full font-bold">{p.beds}bd • {p.baths}ba • {p.sqft.toLocaleString()} sqft</span>
            <span className="bg-white border border-[#E7E5E4] px-3 py-1.5 rounded-full font-bold">{p.type}</span>
            {p.petFriendly && <span className="bg-[#F4EDE2] border border-[#E7DDCC] px-3 py-1.5 rounded-full font-bold">🐾 Pet-friendly</span>}
            {p.seasonal && <span className="bg-[#2EC4B6] text-[#0B1D3A] px-3 py-1.5 rounded-full font-bold">Seasonal ${p.seasonalPrice?.toLocaleString()}/mo</span>}
          </div>
          <p className="mt-4 text-[#44403C] leading-relaxed">{p.description}</p>
          <div className="mt-6 bg-white border border-[#E7E5E4] rounded-2xl p-4">
            <div className="font-extrabold">Details</div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <div>Available: <b>{p.availableFrom}</b></div>
              <div>HOA: <b>{p.hoa}</b></div>
              <div>Status: <b className={p.status==="available" ? "text-[#0CA89A]" : "text-[#FF6B4A]"}>{p.status}</b></div>
              <div>Type: <b>{p.type}</b></div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white border border-[#E7E5E4] rounded-2xl p-5">
            <div className="text-2xl font-extrabold">{formatPrice(p.price)}</div>
            <div className="text-xs text-[#78716C]">+ HOA timeline: {p.hoaTimelineDays ? `${p.hoaTimelineDays} days` : "No HOA"}</div>
            <div className="mt-4">
              <LeadForm compact intent="tour" context={p.title} heading="Book a video or in-person tour" blurb="Chuk confirms within the hour during business hours." ctaLabel="Request Tour →" />
            </div>
            <div className="mt-3 text-xs text-[#78716C] text-center">
              Prefer to talk? <a href={site.phoneHref} className="font-bold text-[#0CA89A]">Call</a> or <a href={site.smsHref} className="font-bold text-[#0CA89A]">text {site.phoneDisplay}</a>
              <br />Avg. 21 days to lease • HOA checked before you sign
            </div>
          </div>
          <div className="bg-[#0B1D3A] text-white rounded-2xl p-5">
            <div className="font-extrabold">Why RentalsByChuk?</div>
            <ul className="mt-2 text-sm text-[#CBD5E1] grid gap-1 list-disc ml-4">
              <li>Neighborhood comps, not ZIP averages</li>
              <li>HOA approval handled first</li>
              <li>Video tour + pet policy upfront</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
