import type { Metadata } from "next";
import { site } from "@/lib/site";

// Per-page metadata: title, description, self-referencing canonical and
// matching Open Graph / Twitter tags. Without this, pages inherit the
// root layout's homepage URL and copy. `title` gets the layout's
// "%s | RentalsByChuk" template, so don't append the brand here.
// A page-level openGraph replaces the root one wholesale, so the shared
// card from app/opengraph-image.tsx is listed explicitly.
const SHARE_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: "Chuk — rentals in West Palm Beach, Palm Beach Gardens & Jupiter" };

export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: site.name,
      locale: "en_US",
      type: "website",
      images: [SHARE_IMAGE],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [SHARE_IMAGE.url] },
  };
}
