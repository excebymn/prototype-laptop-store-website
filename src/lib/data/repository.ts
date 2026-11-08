// Abstract data-access contracts.
//
// INI SATU-SATUNYA BATAS ANTARA APLIKASI DAN SUMBER DATA. Tidak ada kode di
// luar `src/lib/data/` (store, komponen, halaman) yang boleh tahu apakah data
// datang dari JSON lokal atau dari database. Pindah ke Supabase = menulis
// class baru yang mengimplementasikan interface di bawah, lalu mengganti
// tiga baris di `index.ts`. Lihat SUPABASE.md untuk skema & contoh kodenya.

import type { GuideArticle, Laptop, LaptopFilters, StoreInfo } from "./types";

export interface LaptopRepository {
  getAll(filters?: LaptopFilters): Promise<Laptop[]>;
  getBySlug(slug: string): Promise<Laptop | null>;
  getFeatured(): Promise<Laptop[]>;
  /** Dipakai Compare untuk menyegarkan data (harga/stok) dari sumber asli. */
  getByIds(ids: string[]): Promise<Laptop[]>;
  /** Daftar brand unik yang ada di katalog — dipakai filter & Smart Finder. */
  getBrands(): Promise<string[]>;
}

export interface GuideRepository {
  getAll(): Promise<GuideArticle[]>;
  getBySlug(slug: string): Promise<GuideArticle | null>;
}

export interface StoreInfoRepository {
  get(): Promise<StoreInfo>;
}
