// Abstract data-access contracts.
//
// Nothing outside this file (store, components, pages) should know whether
// data comes from local JSON or a real API. Swapping the data source later
// just means writing a new class that implements these interfaces and
// pointing `index.ts` at it — no other code changes.

import type { GuideArticle, Laptop, LaptopFilters } from "./types";

export interface LaptopRepository {
  getAll(filters?: LaptopFilters): Promise<Laptop[]>;
  getBySlug(slug: string): Promise<Laptop | null>;
  getFeatured(): Promise<Laptop[]>;
}

export interface GuideRepository {
  getAll(): Promise<GuideArticle[]>;
  getBySlug(slug: string): Promise<GuideArticle | null>;
}
