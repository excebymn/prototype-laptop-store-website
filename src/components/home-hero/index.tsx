import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { LaptopArt } from "@/components/laptop-art";
import { ParallaxLayer } from "@/components/motion";
import type { StoreInfo } from "@/lib/data";
import { animDelay } from "@/lib/anim";
import { HERO_IMAGE_SRC } from "@/lib/site";

function HeroVisual() {
  if (HERO_IMAGE_SRC) {
    return (
      <ParallaxLayer>
        <Image
          src={HERO_IMAGE_SRC}
          alt="Suasana toko"
          fill
          priority
          sizes="(min-width: 1024px) 46vw, 100vw"
          className="object-cover"
        />
      </ParallaxLayer>
    );
  }

  // Ilustrasi sementara sampai foto hero tersedia.
  return (
    <div className="bg-sky-soft absolute inset-0 flex items-center justify-center">
      <LaptopArt className="anim-float w-[70%] max-w-md" />
    </div>
  );
}

export function HomeHero({ info }: { info: StoreInfo }) {
  const mainBranch = info.branches.find((branch) => branch.isMain) ?? info.branches[0];

  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-4 pt-8 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:px-8 lg:pt-12">
      <div className="flex flex-col justify-center lg:py-10">
        <p
          className="anim-rise text-slate font-mono text-xs font-semibold tracking-[0.2em] uppercase"
          style={animDelay(0.1)}
        >
          Laptop second · Dicek · Bergaransi
        </p>

        <h1 className="font-display mt-4 text-[3.6rem] leading-[0.9] font-extrabold tracking-tight uppercase sm:text-8xl lg:text-[6.5rem]">
          <span className="block overflow-hidden py-[0.04em]">
            <span className="anim-line text-ink block" style={animDelay(0.2)}>
              Laptop Bekas
            </span>
          </span>
          <span className="block overflow-hidden py-[0.04em]">
            <span className="anim-line text-brand block" style={animDelay(0.33)}>
              Siap Dipakai
            </span>
          </span>
        </h1>

        <p
          className="anim-rise text-slate mt-6 max-w-md text-base leading-relaxed"
          style={animDelay(0.5)}
        >
          Dicek satu per satu, bergaransi toko, dan dipilihkan sesuai kebutuhanmu lewat Smart
          Finder. Tinggal pakai.
        </p>

        <div className="anim-rise mt-8 flex flex-wrap items-center gap-3" style={animDelay(0.62)}>
          <Link
            href="/laptops"
            className="group bg-brand inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-brand/30 active:scale-95"
          >
            Lihat Katalog
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45"
              aria-hidden="true"
            />
          </Link>
          <Link
            href="/finder"
            className="border-ink text-ink hover:bg-ink inline-flex items-center rounded-md border px-6 py-3.5 text-sm font-semibold transition-all hover:text-white active:scale-95"
          >
            Smart Finder
          </Link>
        </div>
      </div>

      {/* Foto toko dalam bingkai + keterangan cabang utama */}
      <div className="anim-photo border-surface bg-card relative min-h-[320px] overflow-hidden rounded-lg border sm:min-h-[420px] lg:min-h-[540px]">
        <HeroVisual />
        {mainBranch && (
          <p className="bg-paper/95 text-ink absolute inset-x-0 bottom-0 flex items-center gap-2 px-4 py-3 text-xs font-medium backdrop-blur">
            <MapPin className="text-brand h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="truncate">
              Cabang utama · {mainBranch.address}
            </span>
          </p>
        )}
      </div>
    </section>
  );
}
