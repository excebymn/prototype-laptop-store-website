// Compare store — holds up to 2 laptops the user wants to compare side by
// side. Can be filled from the laptop card, product detail page, or navbar.

import { create } from "zustand";
import type { Laptop } from "@/lib/data";

export type CompareSlots = [Laptop | null, Laptop | null];

interface CompareStoreState {
  slots: CompareSlots;
  addToCompare: (laptop: Laptop) => void;
  removeFromCompare: (laptopId: string) => void;
  clearCompare: () => void;
  isInCompare: (laptopId: string) => boolean;
}

export const useCompareStore = create<CompareStoreState>((set, get) => ({
  slots: [null, null],

  addToCompare: (laptop) => {
    const { slots } = get();

    if (slots.some((slot) => slot?.id === laptop.id)) return;

    const emptyIndex = slots.findIndex((slot) => slot === null);
    const nextSlots: CompareSlots = [...slots];

    if (emptyIndex === -1) {
      // Both slots full: replace the first one.
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
}));
