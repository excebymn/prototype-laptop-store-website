"use client";

import { useState } from "react";
import { Laptop as LaptopIcon } from "lucide-react";
import { CONDITION_LABEL, CONDITION_STYLE } from "@/lib/laptop-display";
import type { Condition } from "@/lib/data";

// Belum ada asset foto asli (lihat public/images/laptops/README.md), jadi
// setiap slot gambar ditampilkan sebagai placeholder bernomor. Begitu foto
// asli tersedia, tinggal ganti div placeholder ini dengan <Image src={...} />
// — jumlah & urutan slot sudah mengikuti `laptop.images`.

interface LaptopGalleryProps {
  images: string[];
  condition: Condition;
}

export function LaptopGallery({ images, condition }: LaptopGalleryProps) {
  const slotCount = Math.max(images.length, 1);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      <div className="from-ink to-ink/70 border-surface relative flex aspect-4/3 items-center justify-center rounded-xl border bg-gradient-to-br">
        <LaptopIcon className="h-16 w-16 text-white/30" aria-hidden="true" />
        <span
          className={`bg-paper absolute top-3 right-3 rounded-md border-2 border-dashed px-2 py-1 text-xs font-bold ${CONDITION_STYLE[condition]}`}
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
              className={`from-ink to-ink/70 flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border bg-gradient-to-br ${
                activeIndex === index ? "border-gold" : "border-surface opacity-60"
              }`}
            >
              <LaptopIcon className="h-5 w-5 text-white/30" aria-hidden="true" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
