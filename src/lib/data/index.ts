// Active repository instances.
//
// This is the single place that decides where data comes from. Store and
// components only ever import from here, never from `mock-repository.ts`
// or `mock/*.json` directly.
//
// Migrating to Supabase later: create `SupabaseLaptopRepository` /
// `SupabaseGuideRepository` implementing the interfaces in `repository.ts`,
// then swap the two lines below.

import { MockGuideRepository, MockLaptopRepository } from "./mock-repository";
import type { GuideRepository, LaptopRepository } from "./repository";

export const laptopRepository: LaptopRepository = new MockLaptopRepository();
export const guideRepository: GuideRepository = new MockGuideRepository();

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
  StoreInfo,
} from "./types";
