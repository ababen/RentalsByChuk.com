import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";
import { FAQS } from "@/data/faqs";

export const metadata: Metadata = {
  title: { absolute: "CHUK — Rentals in West Palm Beach, Palm Beach Gardens & Jupiter. Consider it handled." },
  description:
    "I'm Chuk, with LoKation Real Estate. I only do rentals in West Palm Beach, Palm Beach Gardens and Jupiter — I find the home, and I coordinate the move: movers, junk removal, furniture, utilities. You just enjoy North Palm Beach County.",
};

// FAQ structured data — kept in sync with the FAQS rendered by HomePage.
// NOTE: no ItemList/Offer JSON-LD — the homes shown on the site are
// sample/illustrative properties, not live listings with offers.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <HomePage />
    </>
  );
}
