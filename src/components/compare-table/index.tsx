"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useStore } from "@/store";
import { formatPrice } from "@/lib/format";
import { CONDITION_LABEL } from "@/lib/laptop-display";
import { CATEGORY_OPTIONS } from "@/lib/catalog-options";
import type { CompareSlots } from "@/store";
import type { Laptop } from "@/lib/data";

function categoryLabels(laptop: Laptop): string {
  return laptop.categories
    .map((category) => CATEGORY_OPTIONS.find((option) => option.value === category)?.label)
    .filter((label): label is string => Boolean(label))
    .join(", ");
}

// Baris perbandingan — urutan & cara ambil nilainya ditentukan di sini,
// bukan hardcode berulang di JSX.
const ROWS: { label: string; getValue: (laptop: Laptop) => string }[] = [
  { label: "Harga", getValue: (l) => formatPrice(l.price) },
  { label: "Kondisi", getValue: (l) => CONDITION_LABEL[l.condition] },
  { label: "Kategori", getValue: categoryLabels },
  { label: "Prosesor", getValue: (l) => l.specs.cpu },
  { label: "Grafis", getValue: (l) => l.specs.gpu },
  { label: "RAM", getValue: (l) => `${l.specs.ramGb}GB` },
  { label: "Penyimpanan", getValue: (l) => `${l.specs.storageGb}GB ${l.specs.storageType}` },
  { label: "Layar", getValue: (l) => l.specs.display },
  { label: "Baterai", getValue: (l) => l.specs.battery },
  { label: "Konektivitas", getValue: (l) => l.specs.connectivity.join(", ") },
  { label: "Sistem Operasi", getValue: (l) => l.specs.os },
  { label: "Berat", getValue: (l) => `${l.specs.weightKg} kg` },
  { label: "Ketersediaan", getValue: (l) => (l.isAvailable ? "Tersedia" : "Tidak tersedia") },
];

interface CompareTableProps {
  slots: CompareSlots;
}

export function CompareTable({ slots }: CompareTableProps) {
  const removeFromCompare = useStore((state) => state.removeFromCompare);
  const [a, b] = slots;

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <thead>
          <tr>
            <th className="w-32" scope="col" />
            {slots.map((laptop, index) => (
              <th key={index} scope="col" className="border-surface border-b p-4 text-left align-top">
                {laptop ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-slate text-xs font-medium">{laptop.brand}</p>
                        <p className="font-display text-ink font-semibold">{laptop.name}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCompare(laptop.id)}
                        aria-label={`Hapus ${laptop.name} dari compare`}
                        className="text-slate hover:text-ink shrink-0"
                      >
                        <X className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                    <Link
                      href={`/laptops/${laptop.slug}`}
                      className="text-brand-dark text-xs font-medium hover:underline"
                    >
                      Lihat Detail
                    </Link>
                  </div>
                ) : (
                  <div className="text-slate flex flex-col items-start gap-2 text-sm font-normal">
                    <span>Belum dipilih</span>
                    <Link
                      href="/laptops"
                      className="text-brand-dark text-xs font-medium hover:underline"
                    >
                      Pilih dari Katalog
                    </Link>
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => {
            const valueA = a ? row.getValue(a) : null;
            const valueB = b ? row.getValue(b) : null;
            const isDifferent = valueA !== null && valueB !== null && valueA !== valueB;

            return (
              <tr key={row.label} className={isDifferent ? "bg-brand/10" : undefined}>
                <th
                  scope="row"
                  className="border-surface text-slate border-b p-3 text-left text-xs font-medium"
                >
                  {row.label}
                </th>
                <td className="border-surface text-ink border-b p-3">{valueA ?? "–"}</td>
                <td className="border-surface text-ink border-b p-3">{valueB ?? "–"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
