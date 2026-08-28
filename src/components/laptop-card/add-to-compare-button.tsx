"use client";

import { Scale } from "lucide-react";
import { useCompareStore } from "@/store/useCompareStore";
import type { Laptop } from "@/lib/data";

interface AddToCompareButtonProps {
  laptop: Laptop;
  /** "icon" — kotak ikon saja (dipakai di LaptopCard). "labeled" — dengan teks (dipakai di Product Detail). */
  variant?: "icon" | "labeled";
}

export function AddToCompareButton({ laptop, variant = "icon" }: AddToCompareButtonProps) {
  const isInCompare = useCompareStore((state) => state.isInCompare(laptop.id));
  const addToCompare = useCompareStore((state) => state.addToCompare);
  const removeFromCompare = useCompareStore((state) => state.removeFromCompare);

  const handleClick = () => (isInCompare ? removeFromCompare(laptop.id) : addToCompare(laptop));
  const label = isInCompare ? "Hapus dari Compare" : "Tambah ke Compare";

  if (variant === "labeled") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={isInCompare}
        className={`inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-colors ${
          isInCompare
            ? "border-gold bg-gold/10 text-gold-dark"
            : "border-ink text-ink hover:bg-ink hover:text-white"
        }`}
      >
        <Scale className="h-4 w-4" aria-hidden="true" />
        {label}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isInCompare}
      aria-label={label}
      className={`flex items-center justify-center rounded-md border px-3 transition-colors ${
        isInCompare
          ? "border-gold bg-gold/10 text-gold-dark"
          : "border-surface text-slate hover:border-ink hover:text-ink"
      }`}
    >
      <Scale className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
