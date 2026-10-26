
import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import { pageMeta } from "@/lib/seo";
export const metadata = pageMeta({ title: "For Landlords — Accidental Landlord Rescue", description: "Didn’t sell? Rent smart. Rent-vs-sell math, a 48-hr analysis, and my goal: a signed lease in about 21 days.", path: "/landlords" });
export default function LandlordsPage(){
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <h1 className="text-3xl">For Landlords — Accidental Landlord Rescue</h1>
      <p className="text-sm text-[#57534E] mt-2 max-w-[700px]">Tried to sell and didn&apos;t? Renting beats another price cut — if you do it right. I price by neighborhood, clear the HOA first, and my goal is a signed lease in about 21 days.</p>
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E7E5E4] rounded-2xl p-5"><div className="font-extrabold">48-Hr Rental Analysis</div><div className="text-sm text-[#57534E] mt-1">Current comps by YOUR street, not county avg.</div><a href="#analysis" className="mt-3 inline-block bg-[#FF6B4A] text-white px-4 py-2 rounded-full text-sm font-bold">Request Analysis →</a></div>
        <div className="bg-white border border-[#E7E5E4] rounded-2xl p-5"><div className="font-extrabold">HOA Rental Rights Check</div><div className="text-sm text-[#57534E] mt-1">Six key communities with rules on file. Know your rental rules before you list.</div><Link href="/hoa-checker" className="mt-3 inline-block bg-[#0B1D3A] text-white px-4 py-2 rounded-full text-sm font-bold">Check My HOA →</Link></div>
        <div className="bg-white border border-[#E7E5E4] rounded-2xl p-5"><div className="font-extrabold">Seasonal vs Annual</div><div className="text-sm text-[#57534E] mt-1">2-3× premium Dec–Apr. See which nets more after vacancy.</div><Link href="/hoa-checker" className="mt-3 inline-block bg-white border border-[#E7E5E4] px-4 py-2 rounded-full text-sm font-bold">Open Calculator</Link></div>
      </div>
      <div className="mt-8 bg-[#0B1D3A] text-white rounded-2xl p-6">
        <h2 className="text-2xl text-white">How I work</h2>
        <div className="mt-3 grid md:grid-cols-2 gap-3 text-sm">
          <div className="bg-white/10 border border-white/15 rounded-xl p-4"><b>My 21-Day Goal</b><div className="text-[#CBD5E1]">A signed lease in about 21 days on priced-right, show-ready homes — the target I work to on every listing.</div></div>
          <div className="bg-white/10 border border-white/15 rounded-xl p-4"><b>Rent-Protection Options</b><div className="text-[#CBD5E1]">Ask me about rent-protection options for your home.</div></div>
        </div>
      </div>
      <div id="analysis" className="mt-8 bg-white border border-[#E7E5E4] rounded-2xl p-6">
        <h2 className="text-2xl">Request your 48-hr Rental Analysis</h2>
        <p className="text-sm text-[#57534E] mt-1 mb-4 max-w-[640px]">Tell Chuk where to send it. You&apos;ll get current comps by your street, an HOA rental-rights check, and seasonal-vs-annual math for your exact home — I turn these around within two business days in the normal course.</p>
        <div className="max-w-[640px]"><LeadForm intent="landlord-analysis" ctaLabel="Run My Analysis →" /></div>
      </div>
      <div className="mt-6 bg-white border border-[#E7E5E4] rounded-2xl p-5 flex flex-wrap justify-between items-center gap-3">
        <div><b>Agent adds properties manually</b><div className="text-sm text-[#57534E]">No MLS/IDX — every live home is checked against its HOA rules before it&apos;s offered.</div></div>
        <Link href="/admin" className="bg-[#0B1D3A] text-white px-5 py-2.5 rounded-full text-sm font-bold">Agent Portal →</Link>
      </div>
    </div>
  );
}