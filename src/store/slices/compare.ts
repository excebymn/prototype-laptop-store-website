// Compare slice — maksimal 2 laptop untuk dibandingkan berdampingan.
// Bisa diisi dari kartu laptop, halaman detail, atau navbar.

import type { StateCreator } from "zustand";
import { laptopRepository } from "@/lib/data";
import type { CompareSlice, CompareSlots, StoreState } from "../types";

export const createCompareSlice: StateCreator<StoreState, [], [], CompareSlice> = (set, get) => ({
  slots: [null, null],

  addToCompare: (laptop) => {
    const { slots } = get();

    if (slots.some((slot) => slot?.id === laptop.id)) return;

    const emptyIndex = slots.findIndex((slot) => slot === null);
    const nextSlots: CompareSlots = [...slots];

    if (emptyIndex === -1) {
      // Dua slot penuh: ganti yang pertama.
      nextSlots[0] = laptop;
    } else {
      nextSlots[emptyIndex] = laptop;
    }

    set({ slots: nextSlots });
  },

  removeFromCompare: (laptopId) => {
    set((state) => ({
      slots: state.slots.map((slot) => (slot?.id === laptopId ? null : slot)) as CompareSlots,
    }));
  },

  clearCompare: () => set({ slots: [null, null] }),

  isInCompare: (laptopId) => get().slots.some((slot) => slot?.id === laptopId),

  refreshCompare: async () => {
    const ids = get()
      .slots.filter((slot) => slot !== null)
      .map((slot) => slot.id);
    if (ids.length === 0) return;

    try {
      const fresh = await laptopRepository.getByIds(ids);
      const byId = new Map(fresh.map((laptop) => [laptop.id, laptop]));

      set((state) => ({
        // Laptop yang sudah dihapus dari database otomatis keluar dari slot.
        slots: state.slots.map((slot) => (slot ? (byId.get(slot.id) ?? null) : null)) as CompareSlots,
      }));
    } catch {
      // Gagal refresh: tetap tampilkan data yang sudah ada di slot.
    }
  },
});
