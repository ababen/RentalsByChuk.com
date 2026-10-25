import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Cormorant_Garamond, Sora, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import { site } from "@/lib/site";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// LocalBusiness structured data — helps Google show the business
// (phone, areas served, ratings surface) in local + map results.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: site.name,
  description:
    "Rentals-only Realtor for West Palm Beach, Palm Beach Gardens & Jupiter. HOA-checked, neighborhood-priced, 21-day lease guarantee.",
  url: site.url,
  telephone: site.phoneDisplay,
  email: site.email,
  areaServed: site.areasServed.map((name) => ({ "@type": "City", name })),
  address: { "@type": "PostalAddress", addressRegion: "FL", addressCountry: "US" },
  priceRange: "$$",
};

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["400", "600", "700"] });
const sora = Sora({ variable: "--font-sora", subsets: ["latin"], weight: ["600", "700", "800"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "RentalsByChuk — WPB • Palm Beach Gardens • Jupiter Rentals",
    template: "%s | RentalsByChuk",
  },
  description: "Rentals-only Realtor for West Palm Beach, Palm Beach Gardens & Jupiter. HOA-checked, neighborhood-priced, 21-day lease guarantee.",
  metadataBase: new URL("https://rentalsbychuk.com"),
  openGraph: {
    title: "RentalsByChuk — Rentals Isn't Our Side Hustle",
    description: "The Northern Triangle's rentals-only Realtor. WPB • PBG • Jupiter.",
    url: "https://rentalsbychuk.com",
    siteName: "RentalsByChuk",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RentalsByChuk — WPB • PBG • Jupiter Rentals",
    description: "Rentals-only Realtor for West Palm Beach, Palm Beach Gardens & Jupiter.",
  },
  // To verify Google Search Console: add your code here, e.g.
  // verification: { google: "your-code" },
  alternates: {
    canonical: "https://rentalsbychuk.com",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${sora.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FCFBF8] text-[#0B1D3A]">
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
