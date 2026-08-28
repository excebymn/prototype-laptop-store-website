// Opsi pilihan yang dipakai di lebih dari satu tempat: filter katalog
// (`laptop-filters`) dan Smart Finder (`smart-finder`). Disatukan di sini
// supaya daftar brand/kategori/RAM/storage tidak bisa beda antara dua fitur.
//
// Diturunkan dari katalog mock saat ini. Kalau sumber data pindah ke
// API/Supabase, sebaiknya ini dihitung dinamis dari data asli, bukan
// hardcode seperti sekarang.

import type { Category } from "@/lib/data";

export const AVAILABLE_BRANDS = ["Acer", "Apple", "Asus", "Dell", "HP", "Lenovo", "MSI"];

export const CATEGORY_OPTIONS: { value: Category; label: string }[] = [
  { value: "business", label: "Kerja Kantoran" },
  { value: "gaming", label: "Gaming" },
  { value: "programming", label: "Ngoding" },
  { value: "school", label: "Sekolah & Kuliah" },
  { value: "creative", label: "Desain & Kreatif" },
  { value: "everyday", label: "Harian & Ringan" },
];

export const RAM_OPTIONS = [4, 8, 16, 32];
export const STORAGE_OPTIONS = [128, 256, 512, 1024];

export function storageLabel(gb: number): string {
  return gb >= 1024 ? "1TB+" : `${gb}GB+`;
}
