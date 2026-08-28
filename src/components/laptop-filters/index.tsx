"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import {
  AVAILABLE_BRANDS,
  CATEGORY_OPTIONS,
  RAM_OPTIONS,
  STORAGE_OPTIONS,
  storageLabel,
} from "@/lib/catalog-options";
import type { Category, LaptopFilters as LaptopFiltersType } from "@/lib/data";

interface LaptopFiltersProps {
  filters: LaptopFiltersType;
  onChange: (partial: Partial<LaptopFiltersType>) => void;
  onReset: () => void;
}

function FilterFields({ filters, onChange }: Omit<LaptopFiltersProps, "onReset">) {
  const [priceMin, setPriceMin] = useState(filters.priceMin?.toString() ?? "");
  const [priceMax, setPriceMax] = useState(filters.priceMax?.toString() ?? "");

  const toggleBrand = (brand: string) => {
    const current = filters.brand ?? [];
    const next = current.includes(brand) ? current.filter((b) => b !== brand) : [...current, brand];
    onChange({ brand: next.length > 0 ? next : undefined });
  };

  const toggleCategory = (category: Category) => {
    const current = filters.category ?? [];
    const next = current.includes(category)
      ? current.filter((c) => c !== category)
      : [...current, category];
    onChange({ category: next.length > 0 ? next : undefined });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-ink text-sm font-semibold">Brand</h3>
        <div className="mt-2 flex flex-col gap-1.5">
          {AVAILABLE_BRANDS.map((brand) => (
            <label key={brand} className="text-slate flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.brand?.includes(brand) ?? false}
                onChange={() => toggleBrand(brand)}
                className="accent-ink h-4 w-4"
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-ink text-sm font-semibold">Harga</h3>
        <div className="mt-2 flex items-center gap-2">
          <input
            type="number"
            inputMode="numeric"
            placeholder="Min"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            onBlur={() => onChange({ priceMin: priceMin ? Number(priceMin) : undefined })}
            className="border-surface text-ink w-full rounded-md border px-2 py-1.5 text-sm"
          />
          <span className="text-slate text-sm">–</span>
          <input
            type="number"
            inputMode="numeric"
            placeholder="Max"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            onBlur={() => onChange({ priceMax: priceMax ? Number(priceMax) : undefined })}
            className="border-surface text-ink w-full rounded-md border px-2 py-1.5 text-sm"
          />
        </div>
      </div>

      <div>
        <h3 className="text-ink text-sm font-semibold">Kategori</h3>
        <div className="mt-2 flex flex-col gap-1.5">
          {CATEGORY_OPTIONS.map((option) => (
            <label key={option.value} className="text-slate flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.category?.includes(option.value) ?? false}
                onChange={() => toggleCategory(option.value)}
                className="accent-ink h-4 w-4"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-ink text-sm font-semibold">RAM Minimal</h3>
        <select
          value={filters.ramMin ?? ""}
          onChange={(e) =>
            onChange({ ramMin: e.target.value ? Number(e.target.value) : undefined })
          }
          className="border-surface text-ink mt-2 w-full rounded-md border px-2 py-1.5 text-sm"
        >
          <option value="">Semua</option>
          {RAM_OPTIONS.map((ram) => (
            <option key={ram} value={ram}>
              {ram}GB+
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="text-ink text-sm font-semibold">Penyimpanan Minimal</h3>
        <select
          value={filters.storageMin ?? ""}
          onChange={(e) =>
            onChange({ storageMin: e.target.value ? Number(e.target.value) : undefined })
          }
          className="border-surface text-ink mt-2 w-full rounded-md border px-2 py-1.5 text-sm"
        >
          <option value="">Semua</option>
          {STORAGE_OPTIONS.map((storage) => (
            <option key={storage} value={storage}>
              {storageLabel(storage)}
            </option>
          ))}
        </select>
      </div>

      <label className="text-slate flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={filters.availableOnly ?? false}
          onChange={(e) => onChange({ availableOnly: e.target.checked || undefined })}
          className="accent-ink h-4 w-4"
        />
        Hanya yang tersedia
      </label>
    </div>
  );
}

export function LaptopFilters({ filters, onChange, onReset }: LaptopFiltersProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      {/* Trigger drawer — mobile only */}
      <button
        type="button"
        onClick={() => setIsDrawerOpen(true)}
        className="border-surface text-ink mb-4 flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium md:hidden"
      >
        <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
        Filter
      </button>

      {/* Sidebar — desktop */}
      <aside className="hidden md:block md:w-64 md:shrink-0">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-ink text-lg font-semibold">Filter</h2>
          <button type="button" onClick={onReset} className="text-slate text-xs hover:underline">
            Reset
          </button>
        </div>
        <div className="mt-4">
          <FilterFields filters={filters} onChange={onChange} />
        </div>
      </aside>

      {/* Drawer — mobile */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsDrawerOpen(false)}
            aria-hidden="true"
          />
          <div className="bg-paper absolute inset-y-0 left-0 w-80 max-w-[85vw] overflow-y-auto p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-ink text-lg font-semibold">Filter</h2>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                aria-label="Tutup filter"
              >
                <X className="text-ink h-5 w-5" />
              </button>
            </div>
            <div className="mt-4">
              <FilterFields filters={filters} onChange={onChange} />
            </div>
            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={onReset}
                className="border-surface text-ink flex-1 rounded-md border py-2 text-sm font-medium"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="bg-ink flex-1 rounded-md py-2 text-sm font-semibold text-white"
              >
                Terapkan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
