import type { Metadata } from "next";
import Script from "next/script";
import { Archivo, Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import { site } from "@/lib/site";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// LocalBusiness structured data — helps Google show the business
// (phone, areas served, license) in local + map results.
// Ported from the approved Chuk v2 design.
const telE164 = site.phoneHref.replace("tel:", "");
const telPretty = telE164.replace(/^\+1(\d{3})(\d{3})(\d{4})$/, "+1-$1-$2-$3");

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: 'Alexander "Chuk" Babenchuk — RentalsByChuk',
  alternateName: "Chuk",
  description:
    "Rentals-only Realtor in West Palm Beach, Palm Beach Gardens and Jupiter, Florida. Finds the home, checks the HOA, books tours, negotiates the lease. Renters pay $0; average listing to keys about 21 days.",
  url: site.url,
  telephone: telPretty,
  email: site.email,
  slogan: "Dictum Meum Pactum — my word is my bond.",
  worksFor: { "@type": "Organization", name: "Lokation" },
  identifier: { "@type": "PropertyValue", name: "Florida Real Estate License", value: "SL3596634" },
  areaServed: site.areasServed.map((name) => ({ "@type": "City", name: `${name}, FL` })),
  knowsAbout: ["Residential rentals", "Seasonal rentals", "HOA rental rules", "Corporate relocation rentals", "Equestrian seasonal rentals"],
  address: { "@type": "PostalAddress", addressRegion: "FL", addressCountry: "US" },
  priceRange: "$$",
};

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], weight: ["700", "800", "900"] });
const nunito = Nunito({ variable: "--font-nunito", subsets: ["latin"], weight: ["400", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: {
    default: "CHUK — Rentals in West Palm Beach, Palm Beach Gardens & Jupiter. Consider it handled.",
    template: "%s | RentalsByChuk",
  },
  description:
    "I'm Chuk. I only do rentals in West Palm Beach, Palm Beach Gardens and Jupiter — I find the home, check the HOA, book the tour, negotiate the lease, and hand you the keys in about 21 days.",
  metadataBase: new URL("https://rentalsbychuk.com"),
  openGraph: {
    title: "CHUK — Rentals in West Palm Beach, Palm Beach Gardens & Jupiter. Consider it handled.",
    description:
      "Rentals-only local expert: I find the home, check the HOA, book the tour, negotiate the lease — keys in about 21 days, $0 to renters. Plus renter comparison tools with Oct 2026 Palm Beach County market data.",
    url: "https://rentalsbychuk.com",
    siteName: "RentalsByChuk",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "CHUK — Rentals in West Palm Beach, Palm Beach Gardens & Jupiter. Consider it handled.",
    description: "Rentals-only Realtor for West Palm Beach, Palm Beach Gardens & Jupiter. $0 to renters, keys in about 21 days.",
  },
  // To verify Google Search Console: add your code here, e.g.
  // verification: { google: "your-code" },
  alternates: {
    canonical: "https://rentalsbychuk.com",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FFFBF1] text-[#122E25]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}');`}
            </Script>
          </>
        )}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyCTA />
      </body>
    </html>
  );
}
