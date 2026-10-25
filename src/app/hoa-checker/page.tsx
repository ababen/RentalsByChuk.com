
import { hoaDB } from "@/data/hoa";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import CompDisclosure from "@/components/CompDisclosure";

export const metadata = { title: "HOA Checker — Rental Rights | RentalsByChuk", description: "Check the rental rules for Mirasol, Abacoa, Frenchman's Creek, PGA National, BallenIsles and Admirals Cove — min lease, max/year, board timeline, STR rules, grandfather status. Any other community: ask Chuk, he pulls the association documents." };
export default async function HOACheckerPage({ searchParams }: { searchParams: Promise<{ q?: string }> }){
  const { q } = await searchParams;
  const query = (q ?? "").toLowerCase().trim();
  let results = Object.values(hoaDB);
  if (query) results = results.filter(h => h.name.toLowerCase().includes(query) || h.city.toLowerCase().includes(query));

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <h1 className="text-3xl">HOA Rental Rights Checker</h1>
      <p className="text-sm text-[#40564C] mt-1">Rental rules on file for Mirasol, Abacoa, Frenchman&apos;s Creek, PGA National, BallenIsles, and Admirals Cove — check before you list, or pay later. Don&apos;t see your community? Ask me about any other — I pull the association documents and confirm before you apply.</p>
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
            <div className="mt-3 text-xs text-[#75816F]">Full document review $199 • <a href="#hoa-lead" className="text-[#1E7A55] font-bold">Request check →</a></div>
          </div>
        ))}
      </div>
      <div id="hoa-lead" className="mt-8 bg-[#0E3B2A] text-white rounded-2xl p-6">
        <h2 className="text-2xl text-white">Get a full HOA document review</h2>
        <p className="text-sm text-[#CFE4D4] mt-1 mb-4 max-w-[640px]">Tell Chuk which community and where to send the result. $199 for the full review — the association documents pulled and checked line by line. Not sure yet? Ask for the free summary instead — just say so in the message.</p>
        <div className="max-w-[640px]"><LeadForm dark intent="hoa-review" context={q || undefined} ctaLabel="Request My HOA Check →" /><CompDisclosure dark style={{ marginTop: "10px" }} /></div>
      </div>
    </div>
  );
}