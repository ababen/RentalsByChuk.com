import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0B1D3A] text-[#E2E8F0] pt-10 pb-6">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-[1.2fr_.8fr_.8fr_.8fr] gap-8">
          <div>
            <div className="flex gap-2.5 items-center">
              <div className="w-9 h-9 rounded-xl bg-white text-[#0B1D3A] grid place-items-center font-extrabold">R</div>
              <div className="leading-none">
                <div className="font-extrabold text-white">RENTALS<span className="text-[#FF6B4A]">BY</span>CHUK</div>
                <div className="text-[10px] tracking-widest font-bold text-[#2EC4B6]">SISTER TO HOMESBYCHUK</div>
              </div>
            </div>
            <p className="mt-3 text-sm text-[#94A3B8] max-w-[360px]">Rentals-only Realtor for WPB • PBG • Jupiter. Neighborhood-priced, HOA-cleared, 21-day lease guarantee.</p>
          </div>
          <div><div className="font-bold text-white">Find a Rental</div><div className="mt-2 grid gap-1.5 text-sm text-[#CBD5E1]"><Link href="/rentals">All Rentals</Link><Link href="/rentals?pet=1">Pet-Friendly</Link><Link href="/rentals?seasonal=1">Seasonal</Link><Link href="/communities">Communities</Link></div></div>
          <div><div className="font-bold text-white">For Landlords</div><div className="mt-2 grid gap-1.5 text-sm text-[#CBD5E1]"><Link href="/landlords">Rent vs Sell</Link><Link href="/hoa-checker">HOA Checker</Link><Link href="/admin">Agent Portal</Link><Link href="/landlords">Guarantees</Link></div></div>
          <div><div className="font-bold text-white">The Triangle</div><div className="mt-2 grid gap-1.5 text-sm text-[#CBD5E1]"><Link href="/communities">West Palm Beach</Link><Link href="/communities">Palm Beach Gardens</Link><Link href="/communities">Jupiter</Link><Link href="/reports">Market Reports</Link></div></div>
        </div>
        <div className="mt-8 border-t border-[#1E3A5F] pt-4 flex flex-wrap justify-between gap-3 text-xs text-[#64748B]">
          <span>© 2026 RentalsByChuk.com • WPB • PBG • Jupiter • Rentals-only Realtor + management partners.</span>
          <span><Link href="/admin" className="text-[#2EC4B6]">Agent Admin →</Link> • <Link href="/RentalsByChuk_BrandGuide.html">Brand Guide</Link></span>
        </div>
      </div>
    </footer>
  );
}
