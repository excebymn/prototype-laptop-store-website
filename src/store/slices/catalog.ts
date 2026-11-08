// Catalog slice — daftar laptop, loading/error, filter aktif, dan brand.
//
// Komponen tidak pernah membaca JSON atau memanggil repository langsung;
// mereka memanggil `fetchLaptops()` / `setFilters()` dan membaca state dari sini.

import type { StateCreator } from "zustand";
import { laptopRepository } from "@/lib/data";
import { FALLBACK_BRANDS } from "@/lib/catalog-options";
import type { CatalogSlice, StoreState } from "../types";

// Penjaga race condition: kalau user mengganti filter cepat-cepat, respons
// lama (lebih lambat) tidak boleh menimpa hasil permintaan yang lebih baru.
// Tidak terasa dengan mock, tapi pasti terjadi dengan latency jaringan asli.
let latestRequestId = 0;

export const createCatalogSlice: StateCreator<StoreState, [], [], CatalogSlice> = (set, get) => ({
  laptops: [],
  // Mulai `true`: halaman katalog selalu fetch begitu mount, jadi default
  // `false` bikin 1 frame di mana `laptops` kosong tapi tidak loading, dan
  // empty-state ("Gak ada laptop yang cocok") sempat berkedip.
  isLoading: true,
  catalogError: null,
  filters: {},
  brands: FALLBACK_BRANDS,

  fetchLaptops: async () => {
    const requestId = ++latestRequestId;
    set({ isLoading: true, catalogError: null });

    try {
      const laptops = await laptopRepository.getAll(get().filters);
      if (requestId !== latestRequestId) return;
      set({ laptops, isLoading: false });
    } catch {
      if (requestId !== latestRequestId) return;
      set({ isLoading: false, catalogError: "Gagal memuat katalog. Coba lagi sebentar." });
    }
  },

  fetchBrands: async () => {
    try {
      const brands = await laptopRepository.getBrands();
      if (brands.length > 0) set({ brands });
    } catch {
      // Diam-diam pakai fallback — daftar brand bukan data kritis.
    }
  },

  setFilters: (partialFilters) => {
    set((state) => ({ filters: { ...state.filters, ...partialFilters } }));
    // Filter berubah -> ambil ulang dari repository dengan filter gabungan.
    void get().fetchLaptops();
  },
});
