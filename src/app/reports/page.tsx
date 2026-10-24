
export default function ReportsPage(){
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <h1 className="text-3xl">Market Reports — Monthly Pulse</h1>
      <p className="text-sm text-[#57534E] mt-1">Live pulse from BeachesMLS + Yardi + our 21-day lease data. Submarket-level, not county mush.</p>
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E7E5E4] rounded-2xl p-5"><div className="text-xs tracking-widest font-extrabold text-[#0CA89A] uppercase">Oct 2026 • WPB</div><div className="font-extrabold mt-1">+2.2% YoY • Central +8.3%</div><div className="text-sm text-[#57534E]">Median 2BR $2,150. Downtown concessions first time in years.</div></div>
        <div className="bg-white border border-[#E7E5E4] rounded-2xl p-5"><div className="text-xs tracking-widest font-extrabold text-[#0CA89A] uppercase">Oct 2026 • PBG</div><div className="font-extrabold mt-1">$2,944 median • -20% inventory</div><div className="text-sm text-[#57534E]">Only 687 rentals citywide. Golf SFH competition fierce.</div></div>
        <div className="bg-white border border-[#E7E5E4] rounded-2xl p-5"><div className="text-xs tracking-widest font-extrabold text-[#0CA89A] uppercase">Oct 2026 • Jupiter</div><div className="font-extrabold mt-1">~5% vacancy • 14-28 DOM</div><div className="text-sm text-[#57534E]">Tightest in PBC. Seasonal 2-3× premiums holding.</div></div>
      </div>
      <div className="mt-6 bg-[#F4EDE2] border border-[#E7DDCC] rounded-2xl p-5"><b>Full Q4 2026 Deep Dive</b><div className="text-sm text-[#57534E]">Accidental landlord surge, seasonal playbook, HOA enforcement trends. Coming Nov 15.</div></div>
    </div>
  );
}
