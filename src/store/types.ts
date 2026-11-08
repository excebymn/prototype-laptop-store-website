// Tipe untuk satu store gabungan. Dipisah dari slice supaya tidak ada
// circular import (setiap slice butuh tahu bentuk `StoreState` utuh).

import type { FinderAnswers, FinderResult, Laptop, LaptopFilters } from "@/lib/data";

// ── Catalog ────────────────────────────────────────────────────────────────
export interface CatalogSlice {
  laptops: Laptop[];
  isLoading: boolean;
  catalogError: string | null;
  filters: LaptopFilters;
  /** Daftar brand untuk filter & Smart Finder. Nilai awal = fallback. */
  brands: string[];
  fetchLaptops: () => Promise<void>;
  fetchBrands: () => Promise<void>;
  setFilters: (filters: Partial<LaptopFilters>) => void;
}

// ── Compare ────────────────────────────────────────────────────────────────
export type CompareSlots = [Laptop | null, Laptop | null];

export interface CompareSlice {
  slots: CompareSlots;
  addToCompare: (laptop: Laptop) => void;
  removeFromCompare: (laptopId: string) => void;
  clearCompare: () => void;
  isInCompare: (laptopId: string) => boolean;
  /** Ambil ulang laptop di slot dari repository (harga/stok bisa berubah). */
  refreshCompare: () => Promise<void>;
}

// ── Smart Finder ───────────────────────────────────────────────────────────
export interface FinderSlice {
  answers: FinderAnswers;
  results: FinderResult[];
  isCalculating: boolean;
  finderError: string | null;
  setAnswer: <K extends keyof FinderAnswers>(key: K, value: FinderAnswers[K]) => void;
  resetAnswers: () => void;
  /** Ambil laptop dari repository, hitung skor, simpan ke `results`. */
  runFinder: () => Promise<void>;
}

export type StoreState = CatalogSlice & CompareSlice & FinderSlice;
