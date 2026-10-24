import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-[600px] mx-auto px-6 py-16 text-center">
      <div className="k">404 — Lost in the Triangle</div>
      <h1 className="text-4xl mt-2">That rental sailed.</h1>
      <p className="mt-3 text-[#57534E]">It may have just leased (we average 21 days) or moved. Try the search or browse communities.</p>
      <div className="mt-6 flex gap-2 justify-center flex-wrap">
        <Link className="btn btn-navy" href="/rentals">Browse Rentals →</Link>
        <Link className="btn btn-ghost" href="/communities">View Villages</Link>
        <Link className="btn btn-ghost" href="/">Home</Link>
      </div>
    </div>
  );
}
