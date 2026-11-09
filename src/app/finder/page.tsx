"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SmartFinder } from "@/components/smart-finder";
import { isCategory } from "@/lib/catalog-options";
import { animDelay } from "@/lib/anim";

function FinderPageContent() {
  const searchParams = useSearchParams();
  const purposeParam = searchParams.get("purpose");
  const initialPurpose = isCategory(purposeParam) ? purposeParam : undefined;

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="anim-rise font-display text-ink text-3xl font-bold tracking-wide sm:text-4xl">
          Ceritain kebutuhanmu, biar kami carikan laptopnya.
        </h1>
        <p className="anim-rise text-slate mx-auto mt-2 max-w-lg text-sm" style={animDelay(0.12)}>
          Semua pertanyaan boleh dilewati — makin lengkap dijawab, makin akurat rekomendasinya.
        </p>
      </div>

      <div className="anim-rise mt-8" style={animDelay(0.25)}>
        <SmartFinder initialPurpose={initialPurpose} />
      </div>
    </main>
  );
}

export default function FinderPage() {
  return (
    <Suspense fallback={null}>
      <FinderPageContent />
    </Suspense>
  );
}
