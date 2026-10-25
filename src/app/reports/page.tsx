export const metadata = {
  title: "Market Reports — Oct 2026 Snapshot | RentalsByChuk",
  description:
    "Palm Beach County rental market snapshot, October 2026: median asking rents, apartment averages, occupancy and days on market — sourced from Realtor.com, RentCafe, BeachesMLS and RentalSource, each figure labeled with source and date.",
};

export default function ReportsPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <h1 className="text-3xl">Market Reports — October 2026 Snapshot</h1>
      <p className="text-sm text-[#57534E] mt-1 max-w-[760px]">
        A dated snapshot — not a live feed. Every figure below carries its source and date, pulled from
        Realtor.com, RentCafe, BeachesMLS and RentalSource in October 2026. Submarket-level, not county mush.
      </p>
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E7E5E4] rounded-2xl p-5">
          <div className="text-xs tracking-widest font-extrabold text-[#0CA89A] uppercase">Asking rents • County $2,762</div>
          <div className="font-extrabold mt-1">Median asking rent, Palm Beach County</div>
          <div className="text-sm text-[#57534E] mt-1">
            County median $2,762. By city: West Palm Beach $2,300 • Palm Beach Gardens $3,186 • Jupiter $3,700 • Wellington $4,386.
            <br /><span className="text-xs">Source: Realtor.com monthly rental data, through Sep 2026.</span>
          </div>
        </div>
        <div className="bg-white border border-[#E7E5E4] rounded-2xl p-5">
          <div className="text-xs tracking-widest font-extrabold text-[#0CA89A] uppercase">Apartment averages</div>
          <div className="font-extrabold mt-1">Average apartment rent by city</div>
          <div className="text-sm text-[#57534E] mt-1">
            West Palm Beach $2,490 • Palm Beach Gardens $2,660 • Jupiter $2,610 • North Palm Beach $2,959 • Downtown WPB $4,100.
            West Palm Beach 1-bedroom median: $1,600.
            <br /><span className="text-xs">Sources: RentCafe city data (updated Sep 30, 2026); BeachesMLS snapshot, Oct 24, 2026.</span>
          </div>
        </div>
        <div className="bg-white border border-[#E7E5E4] rounded-2xl p-5">
          <div className="text-xs tracking-widest font-extrabold text-[#0CA89A] uppercase">Occupancy &amp; pace</div>
          <div className="font-extrabold mt-1">~94.9% occupied • ~14 renters per unit</div>
          <div className="text-sm text-[#57534E] mt-1">
            Median days on market: Jupiter 34 • Palm Beach Gardens 34 • North Palm Beach 36 • West Palm Beach 40.
            Seasonal (winter) rents typically run 2–3× annual rents.
            <br /><span className="text-xs">Sources: RentCafe peak-season 2026; RentalSource, Oct 2026; MJI local broker guides.</span>
          </div>
        </div>
      </div>
      <div className="mt-6 bg-[#F4EDE2] border border-[#E7DDCC] rounded-2xl p-5">
        <b>Full Q4 2026 Deep Dive</b>
        <div className="text-sm text-[#57534E]">Accidental landlord surge, seasonal playbook, HOA enforcement trends. Coming Nov 15.</div>
      </div>
    </div>
  );
}
