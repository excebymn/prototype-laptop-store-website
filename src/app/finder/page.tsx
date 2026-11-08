"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SmartFinder } from "@/components/smart-finder";
import { isCategory } from "@/lib/catalog-options";

function FinderPageContent() {
  const searchParams = useSearchParams();
  const purposeParam = searchParams.get("purpose");
  const initialPurpose = isCategory(purposeParam) ? purposeParam : undefined;

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="font-display text-ink text-2xl font-semibold sm:text-3xl">
          Ceritain kebutuhanmu, biar kami carikan laptopnya.
        </h1>
        <p className="text-slate mx-auto mt-2 max-w-lg text-sm">
          Semua pertanyaan boleh dilewati — makin lengkap dijawab, makin akurat rekomendasinya.
        </p>
      </div>

      <div className="mt-8">
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
