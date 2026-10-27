import type { Metadata } from "next";
import Script from "next/script";
import { Archivo, Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import { site } from "@/lib/site";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

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
    "Rentals-only service in West Palm Beach, Palm Beach Gardens and Jupiter, Florida, with LoKation Real Estate. Finds the home, checks the HOA, books tours, negotiates the lease. Goal: keys in about 21 days.",
  url: site.url,
  image: `${site.url}/opengraph-image`,
  ...(site.sameAs.length > 0 && { sameAs: site.sameAs }),
  telephone: telPretty,
  email: site.email,
  worksFor: { "@type": "Organization", name: "LoKation Real Estate" },
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
    "I'm Chuk, with LoKation Real Estate. I only do rentals in West Palm Beach, Palm Beach Gardens and Jupiter — I find the home, check the HOA, book the tour, negotiate the lease. My goal: keys in about 21 days.",
  metadataBase: new URL("https://rentalsbychuk.com"),
  openGraph: {
    title: "CHUK — Rentals in West Palm Beach, Palm Beach Gardens & Jupiter. Consider it handled.",
    description:
      "Rentals only, with LoKation Real Estate: I find the home, check the HOA, book the tour, negotiate the lease — my goal is keys in about 21 days. Plus renter comparison tools with Oct 2026 Palm Beach County market data.",
    url: "https://rentalsbychuk.com",
    siteName: "RentalsByChuk",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CHUK — Rentals in West Palm Beach, Palm Beach Gardens & Jupiter. Consider it handled.",
    description: "Rentals only for West Palm Beach, Palm Beach Gardens & Jupiter — with LoKation Real Estate. My goal is keys in about 21 days.",
  },
  // Google Search Console: set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION to the
  // code from the "HTML tag" method. No canonical here — each page sets its
  // own (a root canonical would point every page at the homepage).
  ...(GSC_VERIFICATION && { verification: { google: GSC_VERIFICATION } }),
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
