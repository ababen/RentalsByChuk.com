
import { filterProperties } from "@/lib/properties";
import PropertyCard from "@/components/PropertyCard";
import Link from "next/link";

export const metadata = { title: "Sample Homes — West Palm Beach, Palm Beach Gardens & Jupiter | RentalsByChuk", description: "Sample homes showing the kinds of rentals Chuk hunts in West Palm Beach, Palm Beach Gardens & Jupiter — illustrative only, not current listings. Live homes and real availability come by text." };
export default async function RentalsPage({ searchParams }: { searchParams: Promise<{ q?: string; city?: string; pet?: string; seasonal?: string }> }) {
  const sp = await searchParams;
  const filtered = filterProperties({
    q: sp.q,
    city: sp.city,
    petFriendly: sp.pet === "1",
    seasonal: sp.seasonal === "1",
  });

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <div className="flex flex-wrap gap-3 items-end justify-between">
        <div>
          <h1 className="text-3xl">Sample Homes</h1>
          <p className="text-sm text-[#57534E] mt-1">{filtered.length} sample homes • WPB • PBG • Jupiter • Illustrative only — not current listings</p>
        </div>
        <form action="/rentals" className="flex flex-wrap gap-2">
          <input name="q" defaultValue={sp.q} placeholder="Search…" className="border border-[#E7E5E4] rounded-full px-4 py-2 text-sm bg-white" />
          <select name="city" defaultValue={sp.city ?? ""} className="border border-[#E7E5E4] rounded-full px-4 py-2 text-sm bg-white">
            <option value="">All cities</option><option>West Palm Beach</option><option>Palm Beach Gardens</option><option>Jupiter</option>
          </select>
          <label className="flex items-center gap-1.5 text-sm bg-white border border-[#E7E5E4] px-3 py-2 rounded-full"><input type="checkbox" name="pet" value="1" defaultChecked={sp.pet==="1"} /> Pet-friendly</label>
          <label className="flex items-center gap-1.5 text-sm bg-white border border-[#E7E5E4] px-3 py-2 rounded-full"><input type="checkbox" name="seasonal" value="1" defaultChecked={sp.seasonal==="1"} /> Seasonal</label>
          <button className="bg-[#0B1D3A] text-white px-5 py-2 rounded-full text-sm font-bold">Filter</button>
          <Link href="/rentals" className="bg-white border border-[#E7E5E4] px-4 py-2 rounded-full text-sm font-bold">Clear</Link>
        </form>
      </div>
      <div className="mt-4 rounded-2xl border border-[#F2C14E] bg-[#FEF6DC] px-4 py-3 text-sm font-bold text-[#7A5B00]">
        ⚠️ These are sample homes for illustration — not current listings, and prices are typical neighborhood rents. Live homes and real availability go to my text list first. <Link href="/#get-matched" className="underline">Join the text list →</Link>
      </div>
      {sp.q || sp.city ? <div className="mt-4 text-sm">Showing samples for <b>{[sp.q, sp.city].filter(Boolean).join(" • ")}</b></div> : null}
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        {filtered.length ? filtered.map(p => <PropertyCard key={p.id} p={p} />) : <div className="col-span-3 bg-white border border-[#E7E5E4] rounded-2xl p-8 text-center text-[#78716C]">No matches. Try clearing filters.</div>}
      </div>
    </div>
  );
}