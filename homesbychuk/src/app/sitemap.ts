import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// lastModified is the real date content last changed (site.contentUpdated),
// not "now" — a sitemap that claims every page changed today gets ignored.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(site.contentUpdated);
  const paths = ["/", "/buy", "/sell", "/calculator", "/communities", "/about"];
  return paths.map((p) => ({ url: `${site.url}${p}`, lastModified }));
}
