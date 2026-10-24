
import { hoaDB } from "@/data/hoa";
import Link from "next/link";

export default async function HOACheckerPage({ searchParams }: { searchParams: Promise<{ q?: string }> }){
  const { q } = await searchParams;
  const query = (q ?? "").toLowerCase().trim();
  let results = Object.values(hoaDB);
  if (query) results = results.filter(h => h.name.toLowerCase().includes(query) || h.city.toLowerCase().includes(query));

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <h1 className="text-3xl">HOA Rental Rights Checker</h1>
      <p className="text-sm text-[#57534E] mt-1">Search 300+ WPB/PBG/Jupiter communities. Check before you list — or pay later. (Demo: 6 entries, full DB in Airtable → JSON)</p>
      <form className="mt-4 flex gap-2 max-w-xl">
        <input name="q" defaultValue={q} placeholder="Try Mirasol, Abacoa, BallenIsles…" className="flex-1 border border-[#E7E5E4] rounded-full px-4 py-2.5 text-sm bg-white" />
        <button className="bg-[#0B1D3A] text-white px-6 py-2.5 rounded-full text-sm font-bold">Check →</button>
        <Link href="/hoa-checker" className="bg-white border border-[#E7E5E4] px-4 py-2.5 rounded-full text-sm font-bold">Clear</Link>
      </form>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        {results.map(h=>(
          <div key={h.name} className="bg-white border border-[#E7E5E4] rounded-2xl p-5">
            <div className="flex justify-between gap-2"><b>{h.name}</b><span className="text-xs bg-[#0B1D3A] text-white px-2.5 py-1 rounded-full">{h.city}</span></div>
            <div className="mt-3 grid gap-2 text-sm">
              <div className="flex justify-between"><span className="text-[#78716C]">Min lease</span><b>{h.minLease}</b></div>
              <div className="flex justify-between"><span className="text-[#78716C]">Max / year</span><b>{h.maxPerYear}</b></div>
              <div className="flex justify-between"><span className="text-[#78716C]">Board approval</span><b>{h.board}</b></div>
              <div className="flex justify-between"><span className="text-[#78716C]">Short-term</span><b className="text-[#FF6B4A]">{h.str}</b></div>
              <div className="flex justify-between"><span className="text-[#78716C]">Grandfather</span><b>{h.grandfather}</b></div>
            </div>
            <div className="mt-3 text-xs text-[#78716C]">Attorney review $199 • <a href="mailto:chuk@rentalsbychuk.com" className="text-[#0CA89A] font-bold">Request check →</a></div>
          </div>
        ))}
      </div>
    </div>
  );
}
