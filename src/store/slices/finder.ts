// Smart Finder slice — jawaban user (semua boleh di-skip) dan hasil rekomendasi.
// Logika scoring ada di `lib/scoring/finder-score.ts`; slice ini hanya
// mengambil data dari repository, memanggil `rankLaptops`, dan menyimpan hasilnya.

import type { StateCreator } from "zustand";
import { laptopRepository } from "@/lib/data";
import { rankLaptops } from "@/lib/scoring/finder-score";
import type { FinderSlice, StoreState } from "../types";

export const createFinderSlice: StateCreator<StoreState, [], [], FinderSlice> = (set, get) => ({
  answers: {},
  results: [],
  isCalculating: false,
  finderError: null,

  setAnswer: (key, value) => {
    set((state) => ({ answers: { ...state.answers, [key]: value } }));
  },

  resetAnswers: () => set({ answers: {}, results: [], finderError: null }),

  runFinder: async () => {
    set({ isCalculating: true, finderError: null });

    try {
      const laptops = await laptopRepository.getAll();
      set({ results: rankLaptops(laptops, get().answers), isCalculating: false });
    } catch {
      set({
        results: [],
        isCalculating: false,
        finderError: "Gagal mengambil data laptop. Coba lagi sebentar.",
      });
    }
  },
});
