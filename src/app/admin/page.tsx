import { properties } from "@/data/properties";
import Link from "next/link";

export const metadata = { title: "Agent Portal", description: "Agent portal — manage listings, HOA data, market reports." };
// Simple password gate via env — MVP: PIN in .env.local
// For now, no auth; just a form. Wire to NextAuth / Supabase later.

export default function AdminPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <div className="flex flex-wrap justify-between gap-3 items-center">
        <div>
          <h1 className="text-3xl">Agent Portal</h1>
          <p className="text-sm text-[#57534E] mt-1">Manually curated listings — no MLS/IDX. Add, edit, mark pending/leased. Changes update the live site on next deploy (or instantly if you add a DB).</p>
        </div>
        <div className="bg-[#FEF2F2] border border-[#FECACA] text-[#9A3412] px-4 py-2 rounded-full text-xs font-bold">MVP: file-based — edit <code>src/data/properties.ts</code> • Next step: Supabase/Airtable</div>
      </div>

      <div className="mt-6 bg-white border border-[#E7E5E4] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 flex justify-between items-center border-b border-[#E7E5E4]">
          <b>Current Listings ({properties.length})</b>
          <span className="text-xs bg-[#0B1D3A] text-white px-3 py-1.5 rounded-full font-bold">Edit src/data/properties.ts to add</span>
        </div>
        <div className="divide-y divide-[#E7E5E4]">
          {properties.map(p => (
            <div key={p.id} className="px-5 py-4 flex gap-4 items-center">
              <img src={p.images[0]} alt="" className="w-20 h-16 rounded-xl object-cover border border-[#E7E5E4]" />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm truncate">{p.title} • {p.city}</div>
                <div className="text-xs text-[#78716C]">{p.address} • ${p.price.toLocaleString()}/mo • {p.beds}bd/{p.baths}ba • {p.status}</div>
              </div>
              <Link href={`/rentals/${p.id}`} className="text-xs bg-white border border-[#E7E5E4] px-3 py-1.5 rounded-full font-bold">View</Link>
              <span className={`text-xs px-3 py-1.5 rounded-full font-bold ${p.status==="available" ? "bg-[#ECFDF5] text-[#065F46] border border-[#6EE7B7]" : "bg-[#FFF7ED] text-[#9A3412] border border-[#FDBA74]"}`}>{p.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="bg-white border border-[#E7E5E4] rounded-2xl p-5">
          <div className="font-extrabold">How to add a property (agent workflow)</div>
          <ol className="mt-2 text-sm text-[#44403C] list-decimal ml-4 grid gap-1">
            <li>Agent finds property, collects photos, HOA docs, rent comps</li>
            <li>Open <code className="bg-[#F4EDE2] px-1.5 py-0.5 rounded">src/data/properties.ts</code> → duplicate an entry</li>
            <li>Fill: title, city, neighborhood, price, beds/baths, HOA timeline, pet/seasonal flags, images (upload to <code>public/listings/</code> or use hosted URLs)</li>
            <li><code>git add && commit && push</code> — Vercel auto-deploys in ~60s</li>
            <li><b>Next upgrade:</b> Replace file with Supabase + <code>/admin/new</code> form (no code needed to add)</li>
          </ol>
        </div>
        <div className="bg-[#0B1D3A] text-white rounded-2xl p-5">
          <div className="font-extrabold">Upgrade path (when ready)</div>
          <ul className="mt-2 text-sm text-[#CBD5E1] list-disc ml-4 grid gap-1">
            <li><b>Supabase</b> (postgres + storage for photos) — free tier is enough for &lt;1k listings</li>
            <li>Or <b>Airtable</b> — agent already knows it, sync via API</li>
            <li>Add <code>/admin/new</code> + <code>/admin/edit/[id]</code> forms + image upload</li>
            <li>Add auth: NextAuth with single agent login (env PIN for MVP)</li>
            <li>Keep file fallback: if DB down, site still renders from last JSON</li>
          </ul>
          <div className="mt-4 text-xs text-[#94A3B8]">Ask me to scaffold Supabase + Admin CRUD and I&apos;ll wire it in one commit.</div>
        </div>
      </div>
    </div>
  );
}