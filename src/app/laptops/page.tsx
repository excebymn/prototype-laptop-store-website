"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, LayoutGrid, List, PackageX } from "lucide-react";
import { useStore } from "@/store";
import { LaptopCard } from "@/components/laptop-card";
import { LaptopFilters } from "@/components/laptop-filters";
import { LaptopRow, LaptopTableHead } from "@/components/laptop-row";
import { RevealItem, RevealStagger } from "@/components/motion";
import { animDelay } from "@/lib/anim";
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

  const laptops = useStore((s) => s.laptops);
  const isLoading = useStore((s) => s.isLoading);
  const catalogError = useStore((s) => s.catalogError);
  const filters = useStore((s) => s.filters);
  const setFilters = useStore((s) => s.setFilters);
  const fetchLaptops = useStore((s) => s.fetchLaptops);
  const fetchBrands = useStore((s) => s.fetchBrands);

  const [page, setPage] = useState(() => parseCatalogSearchParams(searchParams).page);
  // Tampilan katalog: kartu (visual) atau tabel (spesifikasi berkolom, mudah dibandingkan).
  const [view, setView] = useState<"grid" | "table">("grid");
  const hasHydrated = useRef(false);

  // Hydrate filter dari query string URL — sekali saat mount. Nilai `page`
  // awal sudah diambil langsung lewat lazy initializer di atas, jadi di sini
  // cukup sinkronkan filter (state eksternal/Zustand, bukan React state).
  useEffect(() => {
    const { filters: initialFilters } = parseCatalogSearchParams(searchParams);
    setFilters(initialFilters);
    void fetchBrands();
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
      <h1 className="anim-rise font-display text-ink text-4xl font-extrabold tracking-wide uppercase">
        Katalog Laptop
      </h1>
      <p className="anim-rise text-slate mt-1 text-sm" style={animDelay(0.1)}>
        {isLoading ? "Memuat..." : `${laptops.length} laptop ditemukan`}
      </p>

      <div className="mt-6 flex flex-col gap-6 md:flex-row">
        <LaptopFilters filters={filters} onChange={handleFilterChange} onReset={handleReset} />

        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div
              role="group"
              aria-label="Tampilan katalog"
              className="border-surface bg-card flex overflow-hidden rounded-md border"
            >
              {(
                [
                  { value: "grid", label: "Kartu", icon: LayoutGrid },
                  { value: "table", label: "Tabel", icon: List },
                ] as const
              ).map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setView(value)}
                  aria-pressed={view === value}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold transition-colors ${
                    view === value ? "bg-ink text-white" : "text-slate hover:text-ink"
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </button>
              ))}
            </div>
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
          ) : catalogError ? (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <PackageX className="text-slate h-10 w-10" aria-hidden="true" />
              <p className="text-ink font-medium">{catalogError}</p>
              <button
                type="button"
                onClick={() => void fetchLaptops()}
                className="border-ink text-ink rounded-md border px-4 py-2 text-sm font-semibold"
              >
                Coba Lagi
              </button>
            </div>
          ) : laptops.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <PackageX className="text-slate h-10 w-10" aria-hidden="true" />
              <p className="text-ink font-medium">Gak ada laptop yang cocok.</p>
              <p className="text-slate text-sm">Coba longgarkan filter kamu.</p>
            </div>
          ) : (
            <>
              {/* key berubah saat filter/halaman berganti → kartu muncul bergantian lagi */}
              {view === "grid" ? (
                <RevealStagger
                  key={`grid-${currentPage}-${paginatedLaptops.map((laptop) => laptop.id).join(",")}`}
                  className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
                  stagger={0.06}
                >
                  {paginatedLaptops.map((laptop) => (
                    <RevealItem key={laptop.id} className="h-full">
                      <LaptopCard laptop={laptop} />
                    </RevealItem>
                  ))}
                </RevealStagger>
              ) : (
                <div>
                  <LaptopTableHead />
                  <RevealStagger
                    key={`table-${currentPage}-${paginatedLaptops.map((laptop) => laptop.id).join(",")}`}
                    stagger={0.05}
                  >
                    {paginatedLaptops.map((laptop) => (
                      <RevealItem key={laptop.id}>
                        <LaptopRow laptop={laptop} />
                      </RevealItem>
                    ))}
                  </RevealStagger>
                </div>
              )}

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
