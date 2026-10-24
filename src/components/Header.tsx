import Link from "next/link";

export default function Header() {
  return (
    <>
      <div className="bg-[#0B1D3A] text-white text-[13px]">
        <div className="max-w-[1200px] mx-auto px-6 py-2.5 flex flex-wrap items-center justify-between gap-2">
          <span>🌴 <b className="text-[#FF8A6B]">Goldilocks Alert</b> — Seasonal conversions start in ~6 weeks. May/June = best deals.</span>
          <Link href="/#alert" className="bg-[#FF6B4A] text-white px-3 py-1 rounded-full font-bold text-xs">Get Notified →</Link>
        </div>
      </div>
      <header className="sticky top-0 z-40 bg-[#FCFBF8]/90 backdrop-blur border-b border-[#E7E5E4]">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0B1D3A] grid place-items-center text-white font-extrabold">R</div>
            <div className="leading-none">
              <div className="font-extrabold tracking-tight text-[15px]">RENTALS<span className="text-[#FF6B4A]">BY</span>CHUK</div>
              <div className="text-[9px] tracking-[0.16em] font-bold text-[#0CA89A]">WPB • PBG • JUPITER</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-sm font-semibold text-[#44403C]">
            <Link href="/rentals" className="hover:text-[#0B1D3A]">Find a Rental</Link>
            <Link href="/landlords" className="hover:text-[#0B1D3A]">For Landlords</Link>
            <Link href="/communities" className="hover:text-[#0B1D3A]">Communities</Link>
            <Link href="/reports" className="hover:text-[#0B1D3A]">Market Reports</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/hoa-checker" className="hidden sm:inline-flex bg-white border border-[#E7E5E4] px-3.5 py-2 rounded-full text-sm font-bold">HOA Check</Link>
            <Link href="/admin" className="bg-[#0B1D3A] text-white px-4 py-2 rounded-full text-sm font-bold">Agent Login</Link>
          </div>
        </div>
      </header>
    </>
  );
}
