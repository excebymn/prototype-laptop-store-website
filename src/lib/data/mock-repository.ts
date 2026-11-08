// Mock implementations of the repository contracts, backed by local JSON.
//
// Filtering, sorting, and lookups all happen in memory here. When a real
// backend is ready, replace this file with e.g. `supabase-repository.ts`
// implementing the same interfaces — store and components stay untouched.

import type { GuideRepository, LaptopRepository, StoreInfoRepository } from "./repository";
import type { GuideArticle, Laptop, LaptopFilters, StoreInfo } from "./types";
import laptopsData from "./mock/laptops.json";
import guidesData from "./mock/guides.json";
import storeInfoData from "./mock/store-info.json";

const laptops = laptopsData as Laptop[];
const guides = guidesData as GuideArticle[];
const storeInfo = storeInfoData as StoreInfo;

function matchesFilters(laptop: Laptop, filters?: LaptopFilters): boolean {
  if (!filters) return true;

  if (filters.brand && filters.brand.length > 0 && !filters.brand.includes(laptop.brand)) {
    return false;
  }

  if (filters.priceMin !== undefined && laptop.price < filters.priceMin) {
    return false;
  }

  if (filters.priceMax !== undefined && laptop.price > filters.priceMax) {
    return false;
  }

  if (
    filters.category &&
    filters.category.length > 0 &&
    !filters.category.some((category) => laptop.categories.includes(category))
  ) {
    return false;
  }

  if (filters.ramMin !== undefined && laptop.specs.ramGb < filters.ramMin) {
    return false;
  }

  if (filters.storageMin !== undefined && laptop.specs.storageGb < filters.storageMin) {
    return false;
  }

  if (filters.availableOnly && !laptop.isAvailable) {
    return false;
  }

  return true;
}

function sortLaptops(items: Laptop[], sortBy?: LaptopFilters["sortBy"]): Laptop[] {
  const sorted = [...items];

  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "newest":
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    case "recommended":
    default:
      // Featured first, then newest.
      return sorted.sort((a, b) => {
        if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }
}

export class MockLaptopRepository implements LaptopRepository {
  async getAll(filters?: LaptopFilters): Promise<Laptop[]> {
    const filtered = laptops.filter((laptop) => matchesFilters(laptop, filters));
    return sortLaptops(filtered, filters?.sortBy);
  }

  async getBySlug(slug: string): Promise<Laptop | null> {
    return laptops.find((laptop) => laptop.slug === slug) ?? null;
  }

  async getFeatured(): Promise<Laptop[]> {
    return laptops.filter((laptop) => laptop.isFeatured);
  }

  async getByIds(ids: string[]): Promise<Laptop[]> {
    return laptops.filter((laptop) => ids.includes(laptop.id));
  }

  async getBrands(): Promise<string[]> {
    return [...new Set(laptops.map((laptop) => laptop.brand))].sort();
  }
}

export class MockGuideRepository implements GuideRepository {
  async getAll(): Promise<GuideArticle[]> {
    return [...guides].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  }

  async getBySlug(slug: string): Promise<GuideArticle | null> {
    return guides.find((guide) => guide.slug === slug) ?? null;
  }
}

export class MockStoreInfoRepository implements StoreInfoRepository {
  async get(): Promise<StoreInfo> {
    return storeInfo;
  }
}
