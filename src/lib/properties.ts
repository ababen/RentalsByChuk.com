import { properties } from "@/data/properties";
import type { Property } from "@/lib/types";

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
      const hay = `${p.title} ${p.neighborhood} ${p.address} ${p.city} ${p.description}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export function formatPrice(price: number) {
  return `$${price.toLocaleString()}/mo`;
}
