"use client";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="max-w-[600px] mx-auto px-6 py-16 text-center">
      <div className="k">Something went wrong</div>
      <h1 className="text-3xl mt-2">We&apos;re on it.</h1>
      <p className="mt-3 text-[#57534E] text-sm">{error.message || "Unexpected error. Try again."}</p>
      <div className="mt-6 flex gap-2 justify-center">
        <button className="btn btn-navy" onClick={() => reset()}>
          Try again
        </button>
        <Link className="btn btn-ghost" href="/">Home</Link>
      </div>
    </div>
  );
}
