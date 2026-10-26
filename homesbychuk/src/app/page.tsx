import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";
import { FAQS } from "@/data/faqs";

export const metadata: Metadata = {
  title: { absolute: "CHUK — Homes in West Palm Beach, Palm Beach Gardens & Jupiter. Consider it handled." },
  description:
    "I'm Chuk, a REALTOR® with LoKation Real Estate. I help people buy and sell homes in West Palm Beach, Palm Beach Gardens and Jupiter — pricing, negotiation, inspections, closing, and the move itself.",
  alternates: { canonical: "/" },
};

// FAQ structured data — kept in sync with the FAQS rendered by HomePage.
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
