// Display-only mappings for `Condition`. Kept separate from `types.ts`
// (data model) and `mock-repository.ts` (data access) — this is purely
// how a condition value should look in the UI.

import type { Condition } from "@/lib/data";

export const CONDITION_LABEL: Record<Condition, string> = {
  "like-new": "Like New",
  "qc-tested": "QC Tested",
  "ready-to-use": "Ready to Use",
};

export const CONDITION_STYLE: Record<Condition, string> = {
  "like-new": "bg-brand/10 text-brand-dark",
  "qc-tested": "bg-sky-soft text-ink",
  "ready-to-use": "bg-surface text-slate",
};
