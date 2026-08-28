"use client";

import Link from "next/link";
import { Cpu, HardDrive, Laptop as LaptopIcon, MemoryStick } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { CONDITION_LABEL, CONDITION_STYLE } from "@/lib/laptop-display";
import { AddToCompareButton } from "./add-to-compare-button";
import type { Laptop } from "@/lib/data";

interface LaptopCardProps {
  laptop: Laptop;
}

export function LaptopCard({ laptop }: LaptopCardProps) {
  return (
    <div className="border-surface bg-paper flex flex-col overflow-hidden rounded-xl border">
      {/* Placeholder foto — belum ada asset foto asli, lihat catatan di public/images/laptops */}
      <div className="from-ink to-ink/70 relative flex h-40 items-center justify-center bg-gradient-to-br">
        <LaptopIcon className="h-10 w-10 text-white/30" aria-hidden="true" />
        <span
          className={`bg-paper absolute top-3 right-3 rounded-md border-2 border-dashed px-2 py-1 text-[10px] font-bold ${CONDITION_STYLE[laptop.condition]}`}
        >
          {CONDITION_LABEL[laptop.condition]}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="text-slate text-xs font-medium">{laptop.brand}</p>
          <h3 className="font-display text-ink text-base font-semibold">{laptop.name}</h3>
        </div>

        <dl className="text-slate grid grid-cols-1 gap-1 font-mono text-xs">
          <div className="flex items-center gap-1.5">
            <Cpu className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <dt className="sr-only">Prosesor</dt>
            <dd className="truncate">{laptop.specs.cpu}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <MemoryStick className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <dt className="sr-only">RAM</dt>
            <dd>{laptop.specs.ramGb}GB RAM</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <HardDrive className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <dt className="sr-only">Penyimpanan</dt>
            <dd>
              {laptop.specs.storageGb}GB {laptop.specs.storageType}
            </dd>
          </div>
        </dl>

        <p className="text-ink font-mono text-lg font-semibold">{formatPrice(laptop.price)}</p>

        <div className="mt-auto flex gap-2 pt-1">
          <Link
            href={`/laptops/${laptop.slug}`}
            className="bg-ink flex-1 rounded-md py-2 text-center text-xs font-semibold text-white transition-opacity hover:opacity-90"
          >
            Lihat Detail
          </Link>
          <AddToCompareButton laptop={laptop} variant="icon" />
        </div>
      </div>
    </div>
  );
}
