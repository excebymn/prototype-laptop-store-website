// Active repository instances.
//
// Ini satu-satunya tempat yang menentukan dari mana data datang. Store dan
// halaman hanya import dari sini — tidak pernah dari `mock-repository.ts`
// atau `mock/*.json` secara langsung.
//
// Pindah ke Supabase: buat `supabase-repository.ts` (lihat SUPABASE.md),
// lalu ganti tiga baris `new Mock...()` di bawah.

import {
  MockGuideRepository,
  MockLaptopRepository,
  MockStoreInfoRepository,
} from "./mock-repository";
import type { GuideRepository, LaptopRepository, StoreInfoRepository } from "./repository";

export const laptopRepository: LaptopRepository = new MockLaptopRepository();
export const guideRepository: GuideRepository = new MockGuideRepository();
export const storeInfoRepository: StoreInfoRepository = new MockStoreInfoRepository();

export type {
  Category,
  Condition,
  FinderAnswers,
  FinderResult,
  GuideArticle,
  GuideCategory,
  Laptop,
  LaptopFilters,
  LaptopSpecs,
  StoreBranch,
  StoreInfo,
} from "./types";
