import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";
import { getAllProperties } from "@/lib/properties";

export const metadata: Metadata = {
  title: { absolute: "CHUK — Rentals in West Palm Beach, Palm Beach Gardens & Jupiter. Consider it handled." },
  description:
    "I'm Chuk, with LoKation Real Estate. I only do rentals in West Palm Beach, Palm Beach Gardens and Jupiter — I find the home, check the HOA, book the tour, negotiate the lease. My goal: keys in about 21 days.",
};

// FAQ structured data — kept in sync with the FAQS rendered by HomePage.
// NOTE: no ItemList/Offer JSON-LD — the homes shown on the site are
// sample/illustrative properties, not live listings with offers.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Seriously, Chuk — $0 for renters?", acceptedAnswer: { "@type": "Answer", text: "Seriously. The property side (the owner or landlord) pays me when a lease signs — the amount is set in that property's listing agreement and varies by property. Search help, showings, negotiating, the lease read — all $0 to you, and you owe me nothing for that help whether you sign or not. If that ever changes, it'll change on this page first, in this size type." } },
    { "@type": "Question", name: "If the landlord pays you, whose side are you on?", acceptedAnswer: { "@type": "Answer", text: "Yours — and here's why that's not just talk: I live on referrals and relocations. A renter who feels played doesn't send me their colleagues. Plus every term I win for you is in the lease you read before signing." } },
    { "@type": "Question", name: "Why do you publish HOA rules for free?", acceptedAnswer: { "@type": "Answer", text: "Because charging people to learn whether they're allowed to live somewhere is exactly the game I don't play. Need the full association documents pulled and reviewed for a specific home? That's my full HOA document review — $199. The headline rules themselves stay free." } },
    { "@type": "Question", name: "I'm relocating for work. Can you handle it remotely?", acceptedAnswer: { "@type": "Answer", text: "That's half my practice. Video tours, remote paperwork, employer invoicing — tell me your start date and I'll work backwards from it. You'll land to a ready home." } },
  ],
};

export default function Home() {
  const properties = getAllProperties();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <HomePage properties={properties} />
    </>
  );
}
