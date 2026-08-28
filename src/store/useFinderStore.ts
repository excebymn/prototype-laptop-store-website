// Smart Finder store — holds the user's (all-skippable) answers and the
// resulting recommendations.
//
// This store only holds state. The actual scoring logic lives in
// `lib/scoring/finder-score.ts` (Bagian 7) and gets wired up from the
// Smart Finder page — this store just exposes `setResults`/`setIsCalculating`
// for that page to call into.

import { create } from "zustand";
import type { FinderAnswers, FinderResult } from "@/lib/data";

interface FinderStoreState {
  answers: FinderAnswers;
  results: FinderResult[];
  isCalculating: boolean;
  setAnswer: <K extends keyof FinderAnswers>(key: K, value: FinderAnswers[K]) => void;
  resetAnswers: () => void;
  setResults: (results: FinderResult[]) => void;
  setIsCalculating: (isCalculating: boolean) => void;
}

export const useFinderStore = create<FinderStoreState>((set) => ({
  answers: {},
  results: [],
  isCalculating: false,

  setAnswer: (key, value) => {
    set((state) => ({ answers: { ...state.answers, [key]: value } }));
  },

  resetAnswers: () => set({ answers: {}, results: [] }),

  setResults: (results) => set({ results }),

  setIsCalculating: (isCalculating) => set({ isCalculating }),
}));
