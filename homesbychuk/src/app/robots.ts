import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://homesbychuk.com/sitemap.xml",
    host: "https://homesbychuk.com",
  };
}
