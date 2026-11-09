"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Scale, Trash2 } from "lucide-react";
import { useStore } from "@/store";
import { CompareTable } from "@/components/compare-table";
import { Reveal } from "@/components/motion";

export default function ComparePage() {
  const slots = useStore((state) => state.slots);
  const clearCompare = useStore((state) => state.clearCompare);
  const refreshCompare = useStore((state) => state.refreshCompare);

  // Segarkan harga/stok laptop di slot dari repository setiap halaman dibuka.
  useEffect(() => {
    void refreshCompare();
  }, [refreshCompare]);

  const hasAnyLaptop = slots.some((slot) => slot !== null);

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <div className="anim-rise flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-ink text-3xl font-bold tracking-wide uppercase">
            Compare Laptop
          </h1>
          <p className="text-slate mt-1 text-sm">
            Bandingkan spesifikasi sampai 2 laptop sekaligus.
          </p>
        </div>
        {hasAnyLaptop && (
          <button
            type="button"
            onClick={clearCompare}
            className="text-slate hover:text-ink flex shrink-0 items-center gap-1.5 text-sm font-medium"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Reset
          </button>
        )}
      </div>

      <div className="mt-6">
        {hasAnyLaptop ? (
          <Reveal>
            <CompareTable slots={slots} />
          </Reveal>
        ) : (
          <Reveal className="border-surface flex flex-col items-center gap-3 rounded-lg border py-16 text-center">
            <Scale className="text-slate h-10 w-10" aria-hidden="true" />
            <p className="text-ink font-medium">Belum ada laptop yang dibandingkan.</p>
            <p className="text-slate max-w-sm text-sm">
              Tambahkan laptop ke Compare lewat ikon timbangan di katalog, atau tombol &ldquo;Tambah
              ke Compare&rdquo; di halaman detail produk.
            </p>
            <Link
              href="/laptops"
              className="bg-ink mt-2 rounded-md px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Jelajahi Katalog
            </Link>
          </Reveal>
        )}
      </div>
    </main>
  );
}
