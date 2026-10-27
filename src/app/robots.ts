import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    // /admin is not disallowed on purpose: it carries noindex, and Google can
    // only see that tag on pages it is allowed to crawl.
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://rentalsbychuk.com/sitemap.xml",
    host: "https://rentalsbychuk.com",
  };
}
