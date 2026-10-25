import Link from "next/link";
import type { Property } from "@/lib/types";
import { formatPrice } from "@/lib/properties";

export default function PropertyCard({ p }: { p: Property }) {
  return (
    <div className="bg-white border border-[#EEE0C4] rounded-2xl overflow-hidden hover:shadow-lg transition">
      <div className="relative h-44 bg-[#EEE0C4] overflow-hidden">
        <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
        <span className="absolute top-2.5 left-2.5 bg-[#0E3B2A]/90 text-white px-2.5 py-1 rounded-full text-[11px] font-extrabold tracking-widest uppercase">{p.neighborhood}</span>
        {/* Sample labeling (F4) — these are illustrative homes, not listings. No status badges. */}
        <span className="absolute top-2.5 right-2.5 bg-[#FF8A3D] text-white px-2.5 py-1 rounded-full text-[11px] font-extrabold">SAMPLE — ILLUSTRATIVE ONLY</span>
        {p.seasonal && <span className="absolute bottom-2.5 left-2.5 bg-[#1E7A55] text-white px-2.5 py-1 rounded-full text-[11px] font-extrabold">SEASONAL</span>}
      </div>
      <div className="p-4">
        <div className="font-extrabold text-lg leading-none">Typical rent {formatPrice(p.price)} <span className="font-medium text-[#75816F] text-sm">• {p.city}</span></div>
        <div className="font-bold mt-1 text-sm">{p.title}</div>
        <div className="text-xs text-[#75816F]">{p.beds}bd • {p.baths}ba • {p.sqft.toLocaleString()} sqft • {p.type}</div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.petFriendly && <span className="text-xs bg-[#F6EDD9] border border-[#EEE0C4] px-2.5 py-1 rounded-full font-semibold">🐾 Pet-friendly</span>}
          {p.hoaTimelineDays ? <span className="text-xs bg-white border border-[#EEE0C4] px-2.5 py-1 rounded-full font-semibold">HOA: {p.hoaTimelineDays} days</span> : <span className="text-xs bg-[#ECFDF5] border border-[#6EE7B7] px-2.5 py-1 rounded-full font-semibold">No HOA</span>}
          <Link href={`/rentals/${p.id}`} className="ml-auto bg-[#0E3B2A] text-white px-3 py-1 rounded-full text-xs font-bold">View →</Link>
        </div>
      </div>
    </div>
  );
}
