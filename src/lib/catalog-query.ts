// Konversi LaptopFilters + halaman <-> query string URL.
// Dipisah dari app/laptops/page.tsx (yang "use client") supaya fungsi murni
// ini gampang diuji dan dipakai ulang tanpa ikut boundary client component.

import type { LaptopFilters } from "@/lib/data";
import { isCategory, isSortValue } from "@/lib/catalog-options";

export function parseCatalogSearchParams(params: URLSearchParams): {
  filters: LaptopFilters;
  page: number;
} {
  const filters: LaptopFilters = {};

  const brand = params.get("brand");
  if (brand) filters.brand = brand.split(",");

  const category = params.get("category");
  if (category) {
    const valid = category.split(",").filter(isCategory);
    if (valid.length > 0) filters.category = valid;
  }

  const priceMin = params.get("priceMin");
  if (priceMin && Number.isFinite(Number(priceMin))) filters.priceMin = Number(priceMin);

  const priceMax = params.get("priceMax");
  if (priceMax && Number.isFinite(Number(priceMax))) filters.priceMax = Number(priceMax);

  const ramMin = params.get("ramMin");
  if (ramMin && Number.isFinite(Number(ramMin))) filters.ramMin = Number(ramMin);

  const storageMin = params.get("storageMin");
  if (storageMin && Number.isFinite(Number(storageMin))) filters.storageMin = Number(storageMin);

  if (params.get("available") === "1") filters.availableOnly = true;

  const sort = params.get("sort");
  if (isSortValue(sort)) filters.sortBy = sort;

  const page = Number(params.get("page") ?? "1") || 1;

  return { filters, page };
}

export function buildCatalogQueryString(filters: LaptopFilters, page: number): string {
  const params = new URLSearchParams();

  if (filters.brand?.length) params.set("brand", filters.brand.join(","));
  if (filters.category?.length) params.set("category", filters.category.join(","));
  if (filters.priceMin !== undefined) params.set("priceMin", String(filters.priceMin));
  if (filters.priceMax !== undefined) params.set("priceMax", String(filters.priceMax));
  if (filters.ramMin !== undefined) params.set("ramMin", String(filters.ramMin));
  if (filters.storageMin !== undefined) params.set("storageMin", String(filters.storageMin));
  if (filters.availableOnly) params.set("available", "1");
  if (filters.sortBy && filters.sortBy !== "recommended") params.set("sort", filters.sortBy);
  if (page > 1) params.set("page", String(page));

  return params.toString();
}
