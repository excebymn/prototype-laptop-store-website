"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { CONDITION_LABEL } from "@/lib/laptop-display";
import { productImageAt } from "@/lib/site";
import { AddToCompareButton } from "./add-to-compare-button";
import type { Laptop } from "@/lib/data";

interface LaptopCardProps {
  laptop: Laptop;
}

/** Status stok: titik + teks biasa (bukan lencana berbingkai). */
export function StockStatus({ available }: { available: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
        available ? "text-moss" : "text-slate"
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-2 w-2 rounded-full ${available ? "bg-moss" : "bg-slate/50"}`}
      />
      {available ? "Ready" : "Terjual"}
    </span>
  );
}

/**
 * Kartu produk gaya "papan katalog": foto, nama, tabel spesifikasi 4 baris,
 * harga. Kepadatan sedang — cukup untuk membandingkan sekilas tanpa membuka
 * halaman detail.
 */
export function LaptopCard({ laptop }: LaptopCardProps) {
  const { specs } = laptop;
  const specRows = [
    { label: "Prosesor", value: specs.cpu.replace(/^Intel Core |^AMD /, "") },
    { label: "RAM", value: `${specs.ramGb} GB` },
    { label: "Storage", value: `${specs.storageGb} GB ${specs.storageType}` },
    { label: "Layar", value: specs.display },
  ];

  return (
    <article className="group border-surface min-w-0 bg-card hover:border-ink hover:shadow-ink/10 flex h-full flex-col rounded-lg border transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <Link
        href={`/laptops/${laptop.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block aspect-[4/3] overflow-hidden"
      >
        <Image
          src={productImageAt(laptop.images)}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain p-5 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="border-surface flex flex-1 flex-col gap-3 border-t p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-slate truncate font-mono text-[11px] tracking-wide uppercase">
            {laptop.brand} · {CONDITION_LABEL[laptop.condition]}
          </p>
          <StockStatus available={laptop.isAvailable} />
        </div>

        <h3 className="font-display text-ink text-2xl leading-[1.05] font-bold tracking-wide uppercase">
          <Link href={`/laptops/${laptop.slug}`} className="hover:text-brand-dark transition-colors">
            {laptop.name}
          </Link>
        </h3>

        <dl className="divide-surface border-surface divide-y border-y text-xs">
          {specRows.map(({ label, value }) => (
            <div key={label} className="flex items-baseline justify-between gap-3 py-1.5">
              <dt className="text-slate shrink-0">{label}</dt>
              <dd className="text-ink truncate text-right font-medium">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-3 pt-1">
          <p className="font-display text-brand-dark text-[1.7rem] leading-none font-bold tracking-wide whitespace-nowrap">
            {formatPrice(laptop.price)}
          </p>
          <div className="flex shrink-0 items-center gap-2">
            <AddToCompareButton laptop={laptop} variant="icon" />
            <Link
              href={`/laptops/${laptop.slug}`}
              className="bg-ink hover:bg-brand rounded-md px-4 py-2.5 text-sm font-semibold text-white transition-colors active:scale-95"
            >
              Detail
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}