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

const TITLE = "CHUK — Homes in West Palm Beach, Palm Beach Gardens & Jupiter. Consider it handled.";
const DESCRIPTION =
  "I'm Chuk, a REALTOR® with LoKation Real Estate. I help people buy and sell homes in West Palm Beach, Palm Beach Gardens and Jupiter — pricing, negotiation, inspections, closing, and the move itself.";

// LocalBusiness structured data — helps Google show the business
// (phone, areas served, license) in local + map results.
const telE164 = site.phoneHref.replace("tel:", "");
const telPretty = telE164.replace(/^\+1(\d{3})(\d{3})(\d{4})$/, "+1-$1-$2-$3");

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: 'Alexander "Chuk" Babenchuk — HomesByChuk',
  alternateName: "Chuk",
  description:
    "Residential real estate agent for buyers and sellers in West Palm Beach, Palm Beach Gardens and Jupiter, Florida, with LoKation Real Estate.",
  url: site.url,
  image: `${site.url}/opengraph-image`,
  ...(site.sameAs.length > 0 && { sameAs: site.sameAs }),
  telephone: telPretty,
  email: site.email,
  worksFor: { "@type": "Organization", name: "LoKation Real Estate" },
  identifier: { "@type": "PropertyValue", name: "Florida Real Estate License", value: "SL3596634" },
  areaServed: site.areasServed.map((name) => ({ "@type": "City", name: `${name}, FL` })),
  knowsAbout: ["Home buying", "Home selling", "First-time buyers", "Relocation", "HOA rules", "Investment property"],
  address: { "@type": "PostalAddress", addressRegion: "FL", addressCountry: "US" },
  priceRange: "$$",
};

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], weight: ["700", "800", "900"] });
const nunito = Nunito({ variable: "--font-nunito", subsets: ["latin"], weight: ["400", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: { default: TITLE, template: "%s | HomesByChuk" },
  description: DESCRIPTION,
  metadataBase: new URL(site.url),
  openGraph: { title: TITLE, description: DESCRIPTION, url: site.url, siteName: site.name, locale: "en_US", type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  // Google Search Console: set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION to the
  // code from the "HTML tag" method. No canonical here — each page sets its own.
  ...(GSC_VERIFICATION && { verification: { google: GSC_VERIFICATION } }),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FFFBF1] text-[#0F2340]">
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
