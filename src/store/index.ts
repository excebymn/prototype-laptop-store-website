// SATU store untuk seluruh state client-side: katalog, compare, dan finder.
//
//   import { useStore } from "@/store";
//   const laptops = useStore((s) => s.laptops);
//
// Aturan:
// - Hanya dipakai di client component. Server component (home, detail,
//   guide, sitemap, OG image) mengambil data langsung dari repository di
//   `@/lib/data` — Zustand tidak bisa dipakai di server.
// - Semua akses ke sumber data terjadi di slice (`./slices/*`) lewat
//   repository. Ganti database = ganti isi `lib/data`, bukan folder ini.

import { create } from "zustand";
import { createCatalogSlice } from "./slices/catalog";
import { createCompareSlice } from "./slices/compare";
import { createFinderSlice } from "./slices/finder";
import type { StoreState } from "./types";

export const useStore = create<StoreState>()((...args) => ({
  ...createCatalogSlice(...args),
  ...createCompareSlice(...args),
  ...createFinderSlice(...args),
}));

export type { CompareSlots, StoreState } from "./types";
