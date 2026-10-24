export type Property = {
  id: string;
  title: string;
  city: "West Palm Beach" | "Palm Beach Gardens" | "Jupiter";
  neighborhood: string;
  address: string;
  price: number; // monthly
  beds: number;
  baths: number;
  sqft: number;
  type: "Single-Family" | "Condo" | "Townhome" | "Villa" | "Waterfront";
  furnished: boolean;
  seasonal: boolean; // Dec-Apr seasonal available
  seasonalPrice?: number;
  petFriendly: boolean;
  pool?: boolean;
  waterfront?: boolean;
  golf?: boolean;
  availableFrom: string; // ISO date
  hoa: string; // e.g. "Mirasol — 10 days"
  hoaTimelineDays: number | null; // null = no HOA
  status: "available" | "pending" | "leased";
  description: string;
  images: string[];
  agentNotes?: string;
  createdAt: string;
  updatedAt: string;
};
