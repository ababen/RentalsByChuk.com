import type { MetadataRoute } from "next";
import { communities } from "@/data/communities";
import { getAllProperties, SAMPLE_LISTINGS } from "@/lib/properties";
import { site } from "@/lib/site";

// lastModified is the real date content last changed (site.contentUpdated),
// not "now" — a sitemap that claims every page changed today gets ignored.
// changeFrequency/priority are left out: Google ignores both.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(site.contentUpdated);
  const paths = ["/", "/rentals", "/communities", "/hoa-checker", "/landlords", "/about", "/reports"];

  // Community pages without sourced data are noindex — keep them out.
  paths.push(...communities.filter((c) => c.indexed).map((c) => `/communities/${c.slug}`));

  // Sample homes are illustrative and noindex; real listings get listed
  // automatically once SAMPLE_LISTINGS is turned off.
  if (!SAMPLE_LISTINGS) paths.push(...getAllProperties().map((p) => `/rentals/${p.id}`));

  return paths.map((p) => ({ url: `${site.url}${p === "/" ? "/" : p}`, lastModified }));
}
