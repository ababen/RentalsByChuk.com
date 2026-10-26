import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-[600px] mx-auto px-6 py-16 text-center">
      <div className="k">404 — Not on the market</div>
      <h1 className="text-4xl mt-2">That page already closed.</h1>
      <p className="mt-3 text-[#3E4C63]">It may have moved. Try one of these instead.</p>
      <div className="mt-6 flex gap-2 justify-center flex-wrap">
        <Link className="btn btn-navy" href="/buy">Buying →</Link>
        <Link className="btn btn-ghost" href="/sell">Selling</Link>
        <Link className="btn btn-ghost" href="/">Home</Link>
      </div>
    </div>
  );
}
