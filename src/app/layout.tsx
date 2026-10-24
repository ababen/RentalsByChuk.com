import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond, Sora, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["400","600","700"] });
const sora = Sora({ variable: "--font-sora", subsets: ["latin"], weight: ["600","700","800"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RentalsByChuk — WPB • Palm Beach Gardens • Jupiter Rentals",
  description: "Rentals-only Realtor for West Palm Beach, Palm Beach Gardens & Jupiter. HOA-checked, neighborhood-priced, 21-day lease guarantee.",
  openGraph: {
    title: "RentalsByChuk — Rentals Isn't Our Side Hustle",
    description: "The Northern Triangle's rentals-only Realtor. WPB • PBG • Jupiter.",
  }
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${sora.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FCFBF8] text-[#0B1D3A]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
