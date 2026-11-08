"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ScrollRowProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

/** Baris horizontal yang bisa digeser (swipe di HP) + tombol panah di desktop. */
export function ScrollRow({ title, subtitle, children }: ScrollRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    const row = rowRef.current;
    if (!row) return;
    row.scrollBy({ left: direction * row.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-ink text-3xl font-bold tracking-wide uppercase sm:text-4xl">
            {title}
          </h2>
          {subtitle && <p className="text-slate mt-1 text-sm">{subtitle}</p>}
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Geser ke kiri"
            className="border-ink text-ink hover:bg-ink flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Geser ke kanan"
            className="border-ink text-ink hover:bg-ink flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:text-white"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={rowRef}
        className="no-scrollbar -mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
      >
        {children}
      </div>
    </div>
  );
}
