import Link from "next/link";
import { getAllProperties } from "@/lib/properties";
import PropertyCard from "@/components/PropertyCard";

export default function Home() {
  const featured = getAllProperties().slice(0, 6);

  return (
    <div>
      {/* HERO */}
      <section className="bg-gradient-to-b from-[#F4EDE2] to-[#FCFBF8] py-10">
        <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-[1.15fr_.85fr] gap-8 items-center">
          <div>
            <div className="text-xs tracking-[0.14em] font-extrabold text-[#0CA89A] uppercase">Rentals-only Realtor • The Northern Triangle</div>
            <h1 className="mt-2 text-5xl lg:text-[54px] leading-[0.95] tracking-tight">Find your<br /><i className="font-normal text-[#FF6B4A]">village,</i> not just<br />a rental.</h1>
            <p className="mt-4 text-[#57534E] max-w-[560px]">We do <b className="text-[#0B1D3A]">only rentals</b> in <b className="text-[#0B1D3A]">West Palm Beach, Palm Beach Gardens & Jupiter</b>. No sales pitch. Neighborhood-priced, HOA-cleared, video-first.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="bg-white border border-[#E7E5E4] px-3 py-1.5 rounded-full text-xs font-bold">✓ HOA Timeline Upfront</span>
              <span className="bg-white border border-[#E7E5E4] px-3 py-1.5 rounded-full text-xs font-bold">✓ Seasonal Math</span>
              <span className="bg-[#0B1D3A] text-white px-3 py-1.5 rounded-full text-xs font-bold">21-Day Lease Guarantee</span>
            </div>
            <form action="/rentals" className="mt-5 bg-white border border-[#E7E5E4] rounded-2xl p-3 flex flex-wrap gap-2 shadow-sm">
              <input name="q" placeholder="Search Abacoa, Mirasol, 33458..." className="flex-1 min-w-[180px] border border-[#E7E5E4] rounded-full px-4 py-2.5 text-sm outline-none" />
              <select name="city" className="border border-[#E7E5E4] rounded-full px-4 py-2.5 text-sm bg-white"><option value="">All 3 Cities</option><option>West Palm Beach</option><option>Palm Beach Gardens</option><option>Jupiter</option></select>
              <button className="bg-[#0B1D3A] text-white px-6 py-2.5 rounded-full text-sm font-bold">Search →</button>
            </form>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link href="/rentals?pet=1" className="text-xs bg-white border border-[#E7E5E4] px-3 py-1.5 rounded-full font-semibold">🐾 Pet-friendly</Link>
              <Link href="/rentals?seasonal=1" className="text-xs bg-white border border-[#E7E5E4] px-3 py-1.5 rounded-full font-semibold">🌊 Waterfront</Link>
              <Link href="/rentals?q=Mirasol" className="text-xs bg-white border border-[#E7E5E4] px-3 py-1.5 rounded-full font-semibold">⛳ Mirasol</Link>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2.5">
              <div className="bg-white border border-[#E7E5E4] rounded-2xl p-3"><div className="font-extrabold">687</div><div className="text-[11px] font-bold tracking-widest uppercase text-[#78716C]">PBG rentals</div><div className="text-xs text-[#0CA89A]">↓ 20% YoY</div></div>
              <div className="bg-white border border-[#E7E5E4] rounded-2xl p-3"><div className="font-extrabold">~5%</div><div className="text-[11px] font-bold tracking-widest uppercase text-[#78716C]">Jupiter vacancy</div><div className="text-xs text-[#FF6B4A]">94-96% occupied</div></div>
              <div className="bg-white border border-[#E7E5E4] rounded-2xl p-3"><div className="font-extrabold">+2.2%</div><div className="text-[11px] font-bold tracking-widest uppercase text-[#78716C]">WPB YoY</div><div className="text-xs text-[#0CA89A]">vs FL declining</div></div>
            </div>
          </div>
          <div className="relative">
            <div className="h-[420px] rounded-3xl overflow-hidden border border-[#E7E5E4] bg-cover bg-center" style={{backgroundImage: "linear-gradient(180deg,rgba(11,29,58,.08),rgba(11,29,58,.35)), url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop)"}} />
            <div className="absolute -left-2 bottom-4 bg-white border border-[#E7E5E4] rounded-2xl p-3 flex gap-3 items-center shadow-lg">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" className="w-11 h-11 rounded-full object-cover" alt="" />
              <div><div className="font-extrabold text-sm">Chuk • Rentals-Only</div><div className="text-xs text-[#78716C]">Avg. 21 days to lease • 561-555-0142</div></div>
            </div>
            <div className="absolute top-3.5 right-3.5 bg-white border border-[#E7E5E4] rounded-2xl p-3 shadow">
              <div className="text-[11px] tracking-widest font-extrabold text-[#0CA89A] uppercase">Live Pulse — Oct 2026</div>
              <div className="mt-1.5 grid gap-1 text-xs"><div><b>Jupiter 3BR</b> $4,150 <span className="text-[#0CA89A]">↑ 2.8%</span></div><div><b>WPB Central</b> +10% YoY</div><div><b>PBG Median</b> $2,944 • 18 DOM</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* PULSE BAR */}
      <div className="bg-[#0B1D3A] text-white py-3">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-extrabold tracking-widest">LIVE PULSE — OCT 2026</span>
          <div className="flex flex-wrap gap-2">
            <span className="bg-white/10 border border-white/15 px-3 py-1.5 rounded-full text-xs font-bold"><b className="text-[#2EC4B6]">WPB:</b> +2.2% YoY</span>
            <span className="bg-white/10 border border-white/15 px-3 py-1.5 rounded-full text-xs font-bold"><b className="text-[#2EC4B6]">PBG:</b> $2,944 median</span>
            <span className="bg-white/10 border border-white/15 px-3 py-1.5 rounded-full text-xs font-bold"><b className="text-[#2EC4B6]">JUP:</b> 5% vacancy</span>
            <Link href="/reports" className="bg-white text-[#0B1D3A] px-3 py-1.5 rounded-full text-xs font-extrabold">Full Report →</Link>
          </div>
        </div>
      </div>

      {/* FEATURED */}
      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div><div className="text-xs tracking-widest font-extrabold text-[#0CA89A] uppercase">Featured — Updated Today</div><h2 className="text-3xl mt-1">Homes that lease in days, not months.</h2></div>
            <Link href="/rentals" className="bg-white border border-[#E7E5E4] px-4 py-2 rounded-full text-sm font-bold">View All →</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {featured.map(p => <PropertyCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      {/* RESCUE */}
      <section className="pb-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="bg-gradient-to-br from-[#FFF1E6] to-[#FFD1B8] border border-[#FDBA74] rounded-3xl p-6 grid lg:grid-cols-[1.1fr_.9fr] gap-6 items-center">
            <div>
              <div className="text-xs tracking-widest font-extrabold text-[#9A3412] uppercase">For Landlords • Accidental Landlord Rescue</div>
              <h2 className="text-3xl mt-2">Didn't sell? <span className="text-[#FF6B4A]">Rent smart.</span></h2>
              <p className="text-sm text-[#7C2D12] mt-2">55.9% of WPB listings sat 60+ days. If you're holding a $750k+ home, renting beats a price cut — if you price by neighborhood.</p>
              <div className="mt-4 grid gap-2">
                <Link href="/landlords" className="bg-white border border-[#E7E5E4] rounded-xl px-3.5 py-3 flex justify-between items-center text-sm font-semibold">Should I rent or sell my 2026 home? <span>→</span></Link>
                <Link href="/landlords" className="bg-white border border-[#E7E5E4] rounded-xl px-3.5 py-3 flex justify-between items-center text-sm font-semibold">Get my 48-hr Rental Analysis <span>→</span></Link>
              </div>
            </div>
            <div className="bg-white border border-[#E7E5E4] rounded-2xl p-4">
              <div className="text-xs tracking-widest font-extrabold text-[#78716C] uppercase">What mispricing costs</div>
              <div className="mt-2 flex justify-between text-sm"><span>Overpriced 10% → 38-52 days vacant</span><b className="text-[#FF6B4A]">-$2,450</b></div>
              <div className="mt-2 h-2.5 bg-[#E7E5E4] rounded-full overflow-hidden"><div className="h-full bg-[#FF6B4A] w-[68%]" /></div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="bg-[#F4EDE2] border border-[#E7DDCC] rounded-xl p-3"><div className="text-xs font-bold text-[#78716C] uppercase">Correct price</div><div className="font-extrabold text-lg">14-21 days</div><div className="text-xs text-[#78716C]">to lease</div></div>
                <div className="bg-[#F4EDE2] border border-[#E7DDCC] rounded-xl p-3"><div className="text-xs font-bold text-[#78716C] uppercase">Our avg</div><div className="font-extrabold text-lg">21 days</div><div className="text-xs text-[#78716C]">lease-up</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITIES */}
      <section className="py-12 bg-white border-y border-[#E7E5E4]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex justify-between items-center mb-6"><h2 className="text-3xl">12 Villages. Know them like a local.</h2><Link href="/communities" className="bg-white border border-[#E7E5E4] px-4 py-2 rounded-full text-sm font-bold">All Communities →</Link></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            {[
              {n:"Downtown Clematis",c:"WPB • $2,500-$4k",img:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600&auto=format&fit=crop"},
              {n:"Flamingo Park",c:"WPB • Historic",img:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop"},
              {n:"Northwood",c:"WPB • $1,800-$2,800",img:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop"},
              {n:"Mirasol",c:"PBG • Golf • $4k-$7k",img:"https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=600&auto=format&fit=crop"},
              {n:"PGA National",c:"PBG • Resort",img:"https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=600&auto=format&fit=crop"},
              {n:"Abacoa",c:"Jupiter • Walkable",img:"https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=600&auto=format&fit=crop"},
              {n:"Intracoastal",c:"Jupiter • $8k-$25k+",img:"https://images.unsplash.com/photo-1600566753190-17f63baa68a8?q=80&w=600&auto=format&fit=crop"},
              {n:"Egret Landing",c:"Jupiter • Gated",img:"https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=600&auto=format&fit=crop"},
            ].map(x=>(
              <Link key={x.n} href="/communities" className="relative h-44 rounded-2xl overflow-hidden border border-[#E7E5E4] group">
                <img src={x.img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D3A]/80 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white"><div className="font-extrabold text-sm">{x.n}</div><div className="text-xs opacity-80">{x.c}</div></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
