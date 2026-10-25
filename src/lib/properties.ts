import { properties, SAMPLE_LISTINGS } from "@/data/properties";
import type { Property } from "@/lib/types";

/** True while the catalog is illustrative sample homes, not live listings. */
export { SAMPLE_LISTINGS };
export const SAMPLE_NOTE =
  "Sample homes — illustrative only, not current listings. Live homes and real availability come by text.";

export function getAllProperties(): Property[] {
  return properties.filter((p) => p.status !== "leased");
}

export function getPropertyById(id: string) {
  return properties.find((p) => p.id === id);
}

export function filterProperties(filters: {
  city?: string;
  q?: string;
  beds?: number;
  maxPrice?: number;
  petFriendly?: boolean;
  seasonal?: boolean;
}) {
  return getAllProperties().filter((p) => {
    if (filters.city && p.city !== filters.city) return false;
    if (filters.beds && p.beds < filters.beds) return false;
    if (filters.maxPrice && p.price > filters.maxPrice) return false;
    if (filters.petFriendly && !p.petFriendly) return false;
    if (filters.seasonal && !p.seasonal) return false;
    if (filters.q) {
      const q = filters.q.toLowerCase();
      // Street addresses are intentionally NOT searchable/displayed —
      // these are sample homes, not real listings (F4).
      const hay = `${p.title} ${p.neighborhood} ${p.city} ${p.description}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export function formatPrice(price: number) {
  return `$${price.toLocaleString()}/mo`;
}
