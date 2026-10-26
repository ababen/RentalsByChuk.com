
import Link from "next/link";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Communities — 12 Villages", description: "Explore 12 villages across WPB, PBG & Jupiter — rents, schools, vibe, HOA rules.", path: "/communities" });

const comms = [
  { n:"Downtown Clematis", city:"West Palm Beach", price:"$2,500-$4k", blurb:"Walkable, river, nightlife — Brightline at your door." },
  { n:"Flamingo Park", city:"West Palm Beach", price:"$2,200-$3,500", blurb:"Historic bungalows, Norton Museum, tree-lined streets." },
  { n:"Northwood", city:"West Palm Beach", price:"$1,800-$2,800", blurb:"Revitalization corridor — creative economy, upside." },
  { n:"Mirasol", city:"Palm Beach Gardens", price:"$4k-$7k", blurb:"Golf-front, country club, gated. 4-month min (sourced rule)." },
  { n:"PGA National", city:"Palm Beach Gardens", price:"$3,500-$6k", blurb:"Resort living on the Champion course." },
  { n:"BallenIsles", city:"Palm Beach Gardens", price:"$3,800-$6,500", blurb:"Private club, family-friendly, schools." },
  { n:"Abacoa", city:"Jupiter", price:"$3,800-$5,200", blurb:"Most walkable — porches, green, farmers market." },
  { n:"Intracoastal", city:"Jupiter", price:"$8k-$25k+", blurb:"Waterfront, docks, seasonal premium 2-3×." },
  { n:"Egret Landing", city:"Jupiter", price:"$4,500-$7k", blurb:"Gated, Intracoastal access, tennis and trails." },
  { n:"The Bluffs", city:"Jupiter", price:"$4k-$6k", blurb:"Quiet, Jupiter schools, easy to beach." },
  { n:"Admirals Cove", city:"Jupiter", price:"$9k-$20k+", blurb:"Estate + marina. Board interview required." },
  { n:"Old Palm", city:"Palm Beach Gardens", price:"$6k-$12k", blurb:"Ultra-private golf, large lots." },
];
export default function CommunitiesPage(){
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <h1 className="text-3xl">Communities — The Northern Triangle</h1>
      <p className="text-sm text-[#57534E] mt-1">12 villages • Hyperlocal pages coming soon. Each gets rent comps, HOA rules, schools & video tour.</p>
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        {comms.map(c=>(
          <div key={c.n} className="bg-white border border-[#E7E5E4] rounded-2xl p-5">
            <div className="text-xs tracking-widest font-extrabold text-[#0CA89A] uppercase">{c.city}</div>
            <div className="font-extrabold mt-1">{c.n}</div>
            <div className="text-sm font-bold text-[#0B1D3A]">{c.price}</div>
            <div className="text-sm text-[#57534E] mt-2">{c.blurb}</div>
            <Link href={`/rentals?q=${encodeURIComponent(c.n)}`} className="mt-3 inline-block bg-[#0B1D3A] text-white px-3.5 py-1.5 rounded-full text-xs font-bold">View rentals →</Link>
          </div>
        ))}
      </div>
    </div>
  );
}