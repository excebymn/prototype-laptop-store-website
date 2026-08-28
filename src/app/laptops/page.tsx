"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, PackageX } from "lucide-react";
import { useLaptopStore } from "@/store/useLaptopStore";
import { LaptopCard } from "@/components/laptop-card";
import { LaptopFilters } from "@/components/laptop-filters";
import { buildCatalogQueryString, parseCatalogSearchParams } from "@/lib/catalog-query";
import type { LaptopFilters as LaptopFiltersType } from "@/lib/data";

const PAGE_SIZE = 8;

const SORT_OPTIONS: { value: NonNullable<LaptopFiltersType["sortBy"]>; label: string }[] = [
  { value: "recommended", label: "Rekomendasi" },
  { value: "price-asc", label: "Harga Termurah" },
  { value: "price-desc", label: "Harga Tertinggi" },
  { value: "newest", label: "Terbaru" },
];

function LaptopsPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const laptops = useLaptopStore((s) => s.laptops);
  const isLoading = useLaptopStore((s) => s.isLoading);
  const filters = useLaptopStore((s) => s.filters);
  const setFilters = useLaptopStore((s) => s.setFilters);

  const [page, setPage] = useState(() => parseCatalogSearchParams(searchParams).page);
  const hasHydrated = useRef(false);

  // Hydrate filter dari query string URL — sekali saat mount. Nilai `page`
  // awal sudah diambil langsung lewat lazy initializer di atas, jadi di sini
  // cukup sinkronkan filter (state eksternal/Zustand, bukan React state).
  useEffect(() => {
    const { filters: initialFilters } = parseCatalogSearchParams(searchParams);
    setFilters(initialFilters);
    hasHydrated.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalPages = Math.max(1, Math.ceil(laptops.length / PAGE_SIZE));
  // Derive, jangan clamp via effect: kalau filter baru bikin `page` yang
  // tersimpan jadi lebih besar dari totalPages, currentPage otomatis turun
  // tanpa perlu setState tambahan di dalam effect.
  const currentPage = Math.min(page, totalPages);

  // Sinkronkan filter, sort, & currentPage balik ke query string setiap
  // berubah, supaya link bisa dibagikan dan browser back/forward tetap benar.
  useEffect(() => {
    if (!hasHydrated.current) return;
    const query = buildCatalogQueryString(filters, currentPage);
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, currentPage]);

  const paginatedLaptops = laptops.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleFilterChange = (partial: Partial<LaptopFiltersType>) => {
    setFilters(partial);
    setPage(1);
  };

  const handleReset = () => {
    setFilters({
      brand: undefined,
      priceMin: undefined,
      priceMax: undefined,
      category: undefined,
      ramMin: undefined,
      storageMin: undefined,
      availableOnly: undefined,
      sortBy: undefined,
    });
    setPage(1);
  };

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-ink text-2xl font-semibold">Katalog Laptop</h1>
      <p className="text-slate mt-1 text-sm">
        {isLoading ? "Memuat..." : `${laptops.length} laptop ditemukan`}
      </p>

      <div className="mt-6 flex flex-col gap-6 md:flex-row">
        <LaptopFilters filters={filters} onChange={handleFilterChange} onReset={handleReset} />

        <div className="flex-1">
          <div className="mb-4 flex justify-end">
            <select
              value={filters.sortBy ?? "recommended"}
              onChange={(e) =>
                handleFilterChange({ sortBy: e.target.value as LaptopFiltersType["sortBy"] })
              }
              className="border-surface text-ink rounded-md border px-3 py-2 text-sm"
              aria-label="Urutkan"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {isLoading ? (
            <div className="text-slate py-20 text-center text-sm">Memuat laptop...</div>
          ) : laptops.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <PackageX className="text-slate h-10 w-10" aria-hidden="true" />
              <p className="text-ink font-medium">Gak ada laptop yang cocok.</p>
              <p className="text-slate text-sm">Coba longgarkan filter kamu.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {paginatedLaptops.map((laptop) => (
                  <LaptopCard key={laptop.id} laptop={laptop} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setPage(currentPage - 1)}
                    className="border-surface text-ink flex h-9 w-9 items-center justify-center rounded-md border disabled:opacity-40"
                    aria-label="Halaman sebelumnya"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="text-slate font-mono text-sm">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setPage(currentPage + 1)}
                    className="border-surface text-ink flex h-9 w-9 items-center justify-center rounded-md border disabled:opacity-40"
                    aria-label="Halaman berikutnya"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default function LaptopsPage() {
  return (
    <Suspense fallback={null}>
      <LaptopsPageContent />
    </Suspense>
  );
}
