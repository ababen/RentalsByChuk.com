
import Link from "next/link";
import { communities as comms } from "@/data/communities";

export const metadata = { title: "Communities — 12 Villages | RentalsByChuk", description: "Explore 12 villages across WPB, PBG & Jupiter — rents, schools, vibe, HOA rules." };

export default function CommunitiesPage(){
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <h1 className="text-3xl">Communities — The Northern Triangle</h1>
      <p className="text-sm text-[#57534E] mt-1">12 villages • Each has its own page with typical rents and HOA rules — rent comps, schools & video tours coming next.</p>
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        {comms.map(c=>(
          <div key={c.slug} className="bg-white border border-[#E7E5E4] rounded-2xl p-5">
            <div className="text-xs tracking-widest font-extrabold text-[#0CA89A] uppercase">{c.city}</div>
            <Link href={`/communities/${c.slug}`} className="font-extrabold mt-1 block hover:underline">{c.name}</Link>
            <div className="text-sm font-bold text-[#0B1D3A]">{c.price}</div>
            <div className="text-sm text-[#57534E] mt-2">{c.blurb}</div>
            <div className="mt-3 flex gap-2">
              <Link href={`/communities/${c.slug}`} className="inline-block bg-[#0B1D3A] text-white px-3.5 py-1.5 rounded-full text-xs font-bold">Community guide →</Link>
              <Link href={`/rentals?q=${encodeURIComponent(c.name)}`} className="inline-block bg-white border border-[#E7E5E4] px-3.5 py-1.5 rounded-full text-xs font-bold">View rentals</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}