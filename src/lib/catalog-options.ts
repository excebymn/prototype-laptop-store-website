// Opsi pilihan yang dipakai di lebih dari satu tempat: filter katalog
// (`laptop-filters`), Smart Finder, dan parser URL. Disatukan di sini supaya
// daftar kategori/RAM/storage tidak bisa beda antara fitur-fitur itu.
//
// Brand TIDAK lagi hardcode di sini: daftar aslinya datang dari
// `laptopRepository.getBrands()` lewat store (`brands`). `FALLBACK_BRANDS`
// hanya dipakai sebagai nilai awal sebelum data selesai dimuat.

import type { Category, LaptopFilters } from "@/lib/data";

export const FALLBACK_BRANDS = ["Acer", "Apple", "Asus", "Dell", "HP", "Lenovo", "MSI"];

export const CATEGORY_OPTIONS: { value: Category; label: string }[] = [
  { value: "business", label: "Kerja Kantoran" },
  { value: "gaming", label: "Gaming" },
  { value: "programming", label: "Ngoding" },
  { value: "school", label: "Sekolah & Kuliah" },
  { value: "creative", label: "Desain & Kreatif" },
  { value: "everyday", label: "Harian & Ringan" },
];

export const CATEGORY_VALUES: Category[] = CATEGORY_OPTIONS.map((option) => option.value);

export function isCategory(value: string | null | undefined): value is Category {
  return CATEGORY_VALUES.includes(value as Category);
}

export const SORT_VALUES: NonNullable<LaptopFilters["sortBy"]>[] = [
  "recommended",
  "price-asc",
  "price-desc",
  "newest",
];

export function isSortValue(value: string | null | undefined): value is NonNullable<LaptopFilters["sortBy"]> {
  return SORT_VALUES.includes(value as NonNullable<LaptopFilters["sortBy"]>);
}

export const RAM_OPTIONS = [4, 8, 16, 32];
export const STORAGE_OPTIONS = [128, 256, 512, 1024];

export function storageLabel(gb: number): string {
  return gb >= 1024 ? "1TB+" : `${gb}GB+`;
}
