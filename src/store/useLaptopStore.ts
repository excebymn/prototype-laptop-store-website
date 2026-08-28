// Catalog store — list of laptops, loading state, and active filters.
//
// Components never read `laptops.json` or call the repository directly;
// they call `fetchLaptops()` / `setFilters()` and read state from here.

import { create } from "zustand";
import { laptopRepository } from "@/lib/data";
import type { Laptop, LaptopFilters } from "@/lib/data";

interface LaptopStoreState {
  laptops: Laptop[];
  isLoading: boolean;
  filters: LaptopFilters;
  fetchLaptops: () => Promise<void>;
  setFilters: (filters: Partial<LaptopFilters>) => void;
}

export const useLaptopStore = create<LaptopStoreState>((set, get) => ({
  laptops: [],
  // Mulai `true`, bukan `false` — halaman katalog selalu memanggil
  // `setFilters()`/`fetchLaptops()` begitu mount, jadi kalau default-nya
  // `false`, ada 1 frame render awal di mana `laptops` masih kosong TAPI
  // `isLoading` juga false, yang membuat empty-state ("Gak ada laptop yang
  // cocok") kelihatan sekilas sebelum data betulan datang. Efeknya nyaris
  // tak terasa sekarang (mock data resolve instan), tapi begitu pindah ke
  // Supabase (Bagian 14) dengan latency jaringan asli, flicker ini akan
  // jadi jelas terlihat.
  isLoading: true,
  filters: {},

  fetchLaptops: async () => {
    set({ isLoading: true });
    const laptops = await laptopRepository.getAll(get().filters);
    set({ laptops, isLoading: false });
  },

  setFilters: (partialFilters) => {
    set((state) => ({ filters: { ...state.filters, ...partialFilters } }));
    // Filters changed -> refetch against the repository with the merged filters.
    void get().fetchLaptops();
  },
}));
