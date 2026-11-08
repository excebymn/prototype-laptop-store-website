"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LaptopArt } from "@/components/laptop-art";
import { formatPrice } from "@/lib/format";
import { CONDITION_LABEL } from "@/lib/laptop-display";
import { PRODUCT_PHOTOS_READY } from "@/lib/site";
import { AddToCompareButton } from "./add-to-compare-button";
import type { Laptop } from "@/lib/data";

interface LaptopCardProps {
  laptop: Laptop;
}

/** Kartu produk — sengaja ringkas: foto, nama, satu baris spesifikasi, harga. */
export function LaptopCard({ laptop }: LaptopCardProps) {
  const { specs } = laptop;
  const photo = PRODUCT_PHOTOS_READY ? laptop.images[0] : undefined;
  const specLine = `${specs.cpu} · ${specs.ramGb}GB RAM · ${specs.storageGb}GB ${specs.storageType}`;

  return (
    <div className="group border-surface bg-card hover:shadow-ink/10 flex flex-col gap-4 rounded-3xl border p-3 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="bg-sky-soft relative flex h-48 items-center justify-center overflow-hidden rounded-2xl">
        {photo ? (
          <Image
            src={photo}
            alt={laptop.name}
            fill
            sizes="(min-width: 768px) 33vw, 80vw"
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <LaptopArt className="w-[68%] transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-1" />
        )}
        {!laptop.isAvailable && (
          <span className="bg-ink/70 absolute inset-0 flex items-center justify-center rounded-2xl text-sm font-bold tracking-widest text-white uppercase">
            Terjual
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 px-2">
        <p className="text-slate text-xs font-medium">
          {laptop.brand} · {CONDITION_LABEL[laptop.condition]}
        </p>
        <h3 className="font-display text-ink text-2xl leading-tight font-bold tracking-wide uppercase">
          {laptop.name}
        </h3>
        <p className="text-slate truncate text-xs">{specLine}</p>
      </div>

      <div className="flex items-center justify-between gap-2 px-2 pb-1">
        <p className="font-display text-brand-dark text-2xl font-bold tracking-wide">
          {formatPrice(laptop.price)}
        </p>
        <div className="flex items-center gap-2">
          <AddToCompareButton laptop={laptop} variant="icon" />
          <Link
            href={`/laptops/${laptop.slug}`}
            aria-label={`Lihat detail ${laptop.name}`}
            className="bg-ink hover:bg-brand flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors active:scale-95"
          >
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 hover:rotate-45" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
