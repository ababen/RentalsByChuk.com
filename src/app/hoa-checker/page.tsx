
import { hoaDB } from "@/data/hoa";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";

export const metadata = { title: "HOA Checker — Rental Rights | RentalsByChuk", description: "Check 300+ HOAs in WPB/PBG/Jupiter. Min lease, max/year, board timeline, STR rules, grandfather status." };
export default async function HOACheckerPage({ searchParams }: { searchParams: Promise<{ q?: string }> }){
  const { q } = await searchParams;
  const query = (q ?? "").toLowerCase().trim();
  let results = Object.values(hoaDB);
  if (query) results = results.filter(h => h.name.toLowerCase().includes(query) || h.city.toLowerCase().includes(query));

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <h1 className="text-3xl">HOA Rental Rights Checker</h1>
      <p className="text-sm text-[#40564C] mt-1">Search 300+ WPB/PBG/Jupiter communities. Check before you list — or pay later. (Demo: 6 entries, full DB in Airtable → JSON)</p>
      <form className="mt-4 flex gap-2 max-w-xl">
        <input name="q" defaultValue={q} placeholder="Try Mirasol, Abacoa, BallenIsles…" className="flex-1 border border-[#EEE0C4] rounded-full px-4 py-2.5 text-sm bg-white" />
        <button className="bg-[#0E3B2A] text-white px-6 py-2.5 rounded-full text-sm font-bold">Check →</button>
        <Link href="/hoa-checker" className="bg-white border border-[#EEE0C4] px-4 py-2.5 rounded-full text-sm font-bold">Clear</Link>
      </form>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        {results.map(h=>(
          <div key={h.name} className="bg-white border border-[#EEE0C4] rounded-2xl p-5">
            <div className="flex justify-between gap-2"><b>{h.name}</b><span className="text-xs bg-[#0E3B2A] text-white px-2.5 py-1 rounded-full">{h.city}</span></div>
            <div className="mt-3 grid gap-2 text-sm">
              <div className="flex justify-between"><span className="text-[#75816F]">Min lease</span><b>{h.minLease}</b></div>
              <div className="flex justify-between"><span className="text-[#75816F]">Max / year</span><b>{h.maxPerYear}</b></div>
              <div className="flex justify-between"><span className="text-[#75816F]">Board approval</span><b>{h.board}</b></div>
              <div className="flex justify-between"><span className="text-[#75816F]">Short-term</span><b className="text-[#E56F22]">{h.str}</b></div>
              <div className="flex justify-between"><span className="text-[#75816F]">Grandfather</span><b>{h.grandfather}</b></div>
            </div>
            <div className="mt-3 text-xs text-[#75816F]">Attorney review $199 • <a href="#hoa-lead" className="text-[#1E7A55] font-bold">Request check →</a></div>
          </div>
        ))}
      </div>
      <div id="hoa-lead" className="mt-8 bg-[#0E3B2A] text-white rounded-2xl p-6">
        <h2 className="text-2xl text-white">Get an attorney-reviewed HOA check</h2>
        <p className="text-sm text-[#CFE4D4] mt-1 mb-4 max-w-[640px]">Tell Chuk which community and where to send the result. $199, attorney-reviewed, and credited toward placement if you list with us. Not sure yet? Ask for the free summary instead — just say so in the message.</p>
        <div className="max-w-[640px]"><LeadForm dark intent="hoa-review" context={q || undefined} ctaLabel="Request My HOA Check →" /></div>
      </div>
    </div>
  );
}