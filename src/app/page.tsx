import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";
import { getAllProperties } from "@/lib/properties";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "CHUK — Rentals in West Palm Beach, Palm Beach Gardens & Jupiter. Consider it handled." },
  description:
    "I'm Chuk. I only do rentals in West Palm Beach, Palm Beach Gardens and Jupiter — I find the home, check the HOA, book the tour, negotiate the lease, and hand you the keys in about 21 days.",
};

// FAQ + listings structured data, ported from the approved Chuk v2 design.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Seriously, Chuk — $0 for renters?", acceptedAnswer: { "@type": "Answer", text: "Seriously. The property side pays me when a lease signs. Search help, showings, negotiating, the lease read — all $0 to you." } },
    { "@type": "Question", name: "If the landlord pays you, whose side are you on?", acceptedAnswer: { "@type": "Answer", text: "Yours — I live on referrals and relocations. A renter who feels played doesn't send me their colleagues. Plus every term I win for you is in the lease you read before signing." } },
    { "@type": "Question", name: "Why do you publish HOA rules for free?", acceptedAnswer: { "@type": "Answer", text: "Because charging people to learn whether they're allowed to live somewhere is exactly the game I don't play. The certified attorney-reviewed version is $199; the rules themselves are free." } },
    { "@type": "Question", name: "I'm relocating for work. Can you handle it remotely?", acceptedAnswer: { "@type": "Answer", text: "That's half my practice. Video tours, remote paperwork, employer invoicing — tell me your start date and I'll work backwards from it. You'll land to a ready home." } },
  ],
};

export default function Home() {
  const properties = getAllProperties();
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "This week's rentals — West Palm Beach, Palm Beach Gardens, Jupiter",
    itemListElement: properties.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Offer",
        name: `${p.title}, ${p.city}`,
        price: p.price,
        priceCurrency: "USD",
        description: `${p.beds} bd • ${p.baths} ba • ${p.sqft.toLocaleString()} sqft. ${p.description}`,
        url: `${site.url}/rentals/${p.id}`,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <HomePage properties={properties} />
    </>
  );
}
