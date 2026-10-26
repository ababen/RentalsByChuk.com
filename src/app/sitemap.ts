import type { MetadataRoute } from "next";
import { communities } from "@/data/communities";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://rentalsbychuk.com";
  const now = new Date();
  const staticRoutes = ["", "/rentals", "/communities", "/hoa-checker", "/landlords", "/reports"].map((p) => ({
    url: `${base}${p || "/"}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: p === "" ? 1 : 0.8,
  }));

  // Dynamic rental pages
  const rentals = ["abacoa-3br-001", "mirasol-4br-002", "clematis-2br-003", "intracoastal-seasonal-004", "flamingo-3br-005", "pga-3br-006"];
  const rentalRoutes = rentals.map((id) => ({
    url: `${base}/rentals/${id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const communityRoutes = communities.map((c) => ({
    url: `${base}/communities/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...communityRoutes, ...rentalRoutes];
}
