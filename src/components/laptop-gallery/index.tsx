"use client";

import { useState } from "react";
import Image from "next/image";
import { CONDITION_LABEL, CONDITION_STYLE } from "@/lib/laptop-display";
import { productImageAt } from "@/lib/site";
import type { Condition } from "@/lib/data";

// Selama foto asli belum siap (PRODUCT_PHOTOS_READY di lib/site.ts), semua slot
// memakai foto mockup. Jumlah & urutan slot mengikuti `laptop.images`.

interface LaptopGalleryProps {
  images: string[];
  condition: Condition;
}

export function LaptopGallery({ images, condition }: LaptopGalleryProps) {
  const slotCount = Math.max(images.length, 1);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      <div className="border-surface bg-card relative aspect-4/3 overflow-hidden rounded-lg border">
        <Image
          src={productImageAt(images, activeIndex)}
          alt={`Foto ${activeIndex + 1}`}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-contain p-6 mix-blend-multiply"
        />
        <span
          className={`absolute top-3 right-3 rounded-md px-3 py-1 text-xs font-semibold ${CONDITION_STYLE[condition]}`}
        >
          {CONDITION_LABEL[condition]}
        </span>
        {slotCount > 1 && (
          <span className="text-slate bg-paper absolute bottom-3 left-3 rounded-md px-2 py-0.5 text-[10px] font-medium">
            Foto {activeIndex + 1}/{slotCount}
          </span>
        )}
      </div>

      {slotCount > 1 && (
        <div className="flex gap-2">
          {Array.from({ length: slotCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Lihat foto ${index + 1}`}
              aria-pressed={activeIndex === index}
              className={`bg-card relative h-16 w-16 shrink-0 overflow-hidden rounded-md border ${
                activeIndex === index ? "border-ink" : "border-surface opacity-60"
              }`}
            >
              <Image
                src={productImageAt(images, index)}
                alt=""
                fill
                sizes="64px"
                className="object-contain p-1 mix-blend-multiply"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
