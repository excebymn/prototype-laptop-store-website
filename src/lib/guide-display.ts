// Display-only mappings for `GuideCategory`. Kept separate from `types.ts`
// (data model) — sama pola dengan `laptop-display.ts` untuk `Condition`.

import type { GuideCategory } from "@/lib/data";

export const GUIDE_CATEGORY_LABEL: Record<GuideCategory, string> = {
  kebutuhan: "Kebutuhan",
  hardware: "Hardware",
  "buying-guide": "Buying Guide",
};

// Urutan tampil section di halaman index — mengikuti urutan yang dipakai di
// Perencanaan §5.7 (Kebutuhan / Hardware / Buying Guide).
export const GUIDE_CATEGORY_ORDER: GuideCategory[] = ["kebutuhan", "hardware", "buying-guide"];
