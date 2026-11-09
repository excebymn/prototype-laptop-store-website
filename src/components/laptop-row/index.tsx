"use client";

import Image from "next/image";
import Link from "next/link";
import { AddToCompareButton } from "@/components/laptop-card/add-to-compare-button";
import { StockStatus } from "@/components/laptop-card";
import { formatPrice } from "@/lib/format";
import { CONDITION_LABEL } from "@/lib/laptop-display";
import { productImageAt } from "@/lib/site";
import type { Laptop } from "@/lib/data";

// Satu definisi kolom dipakai header & baris supaya selalu sejajar (desktop).
export const ROW_COLUMNS =
  "md:grid-cols-[72px_minmax(0,1.7fr)_minmax(0,1.1fr)_70px_110px_minmax(0,1fr)_150px_auto]";

/** Kepala kolom tabel — hanya tampil di layar ≥md. */
export function LaptopTableHead() {
  return (
    <div
      className={`border-ink text-slate hidden items-center gap-4 border-b-2 px-3 pb-2 font-mono text-[11px] tracking-wide uppercase md:grid ${ROW_COLUMNS}`}
    >
      <span className="sr-only">Foto</span>
      <span>Unit</span>
      <span>Prosesor</span>
      <span>RAM</span>
      <span>Storage</span>
      <span>Layar</span>
      <span className="text-right">Harga</span>
      <span className="sr-only">Aksi</span>
    </div>
  );
}

/**
 * Baris produk. Desktop: tabel dengan kolom spesifikasi (mudah dibandingkan
 * dan dipindai). HP: daftar ringkas — foto kiri, spesifikasi satu baris.
 */
export function LaptopRow({ laptop }: { laptop: Laptop }) {
  const { specs } = laptop;
  const href = `/laptops/${laptop.slug}`;

  return (
    <div
      className={`group border-surface hover:bg-card relative grid grid-cols-[72px_1fr] items-center gap-x-4 gap-y-1 border-b px-3 py-3 transition-colors md:gap-y-0 ${ROW_COLUMNS}`}
    >
      <Link href={href} tabIndex={-1} aria-hidden="true" className="relative row-span-3 h-16 w-[72px] md:row-span-1">
        <Image
          src={productImageAt(laptop.images)}
          alt=""
          fill
          sizes="72px"
          className="object-contain mix-blend-multiply"
        />
      </Link>

      <div className="min-w-0">
        <p className="text-slate font-mono text-[11px] tracking-wide uppercase">
          {laptop.brand} · {CONDITION_LABEL[laptop.condition]}
        </p>
        <h3 className="font-display text-ink text-xl leading-tight font-bold tracking-wide uppercase">
          <Link href={href} className="group-hover:text-brand-dark transition-colors">
            {laptop.name}
          </Link>
        </h3>
        <div className="mt-0.5">
          <StockStatus available={laptop.isAvailable} />
        </div>
      </div>

      {/* HP: ringkasan satu baris */}
      <p className="text-slate col-start-2 truncate text-xs md:hidden">
        {specs.cpu} · {specs.ramGb}GB · {specs.storageGb}GB {specs.storageType} · {specs.display}
      </p>

      {/* Desktop: kolom spesifikasi */}
      <span className="text-ink hidden truncate text-sm md:block">{specs.cpu}</span>
      <span className="text-ink hidden text-sm md:block">{specs.ramGb} GB</span>
      <span className="text-ink hidden text-sm md:block">
        {specs.storageGb} GB {specs.storageType}
      </span>
      <span className="text-ink hidden truncate text-sm md:block">{specs.display}</span>

      <p className="font-display text-brand-dark col-start-2 text-2xl leading-none font-bold tracking-wide md:col-start-auto md:text-right">
        {formatPrice(laptop.price)}
      </p>

      <div className="hidden items-center gap-2 md:flex">
        <AddToCompareButton laptop={laptop} variant="icon" />
        <Link
          href={href}
          className="bg-ink hover:bg-brand rounded-md px-4 py-2.5 text-sm font-semibold text-white transition-colors active:scale-95"
        >
          Detail
        </Link>
      </div>
    </div>
  );
}
