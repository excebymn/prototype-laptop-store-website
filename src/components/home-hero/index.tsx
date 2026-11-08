import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, MapPin, ShieldCheck } from "lucide-react";
import { LaptopArt } from "@/components/laptop-art";
import { ParallaxLayer } from "@/components/motion";
import type { StoreInfo } from "@/lib/data";
import { HERO_IMAGE_SRC } from "@/lib/site";

// Variabel CSS `--d` = jeda animasi masuk (lihat .anim-* di globals.css).
const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as React.CSSProperties;

function HeroVisual() {
  if (HERO_IMAGE_SRC) {
    return (
      <ParallaxLayer>
        <Image
          src={HERO_IMAGE_SRC}
          alt="Suasana toko"
          fill
          priority
          sizes="(min-width: 1024px) 62vw, 100vw"
          className="object-cover"
        />
      </ParallaxLayer>
    );
  }

  // Ilustrasi sementara sampai foto hero tersedia.
  return (
    <div className="from-sky-soft to-sky/40 absolute inset-0 flex items-center justify-center bg-gradient-to-br">
      <LaptopArt className="anim-float w-[78%] max-w-md drop-shadow-xl lg:w-[62%] lg:translate-x-6" />
    </div>
  );
}

export function HomeHero({ info }: { info: StoreInfo }) {
  const trust = [
    { icon: ShieldCheck, title: "Garansi Toko", note: "1 bulan" },
    { icon: BadgeCheck, title: "QC Tested", note: "Dicek menyeluruh" },
    { icon: MapPin, title: `${info.branches.length} Cabang`, note: "Jatim & Yogyakarta" },
  ];

  return (
    <section className="px-3 pt-3 sm:px-6">
      <div className="bg-sky-soft relative mx-auto flex max-w-6xl flex-col overflow-hidden rounded-[2rem] lg:min-h-[620px]">
        {/* Visual: di bawah teks pada HP, di sisi kanan pada desktop */}
        <div className="anim-photo relative order-2 h-72 overflow-hidden sm:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[62%]">
          <HeroVisual />
          <div
            aria-hidden="true"
            className="from-sky-soft absolute inset-x-0 top-0 h-16 bg-gradient-to-b to-transparent lg:inset-y-0 lg:right-auto lg:h-auto lg:w-1/3 lg:bg-gradient-to-r"
          />
        </div>

        <div className="relative z-10 order-1 p-6 pb-2 sm:p-10 sm:pb-2 lg:flex lg:max-w-[640px] lg:flex-col lg:justify-center lg:p-14">
          <p
            className="anim-rise text-slate flex items-center gap-3 text-xs font-semibold tracking-[0.2em] uppercase"
            style={delay(0.15)}
          >
            Laptop Second Berkualitas
            <span aria-hidden="true" className="bg-slate/40 hidden h-px w-16 sm:block" />
          </p>

          <h1 className="font-display mt-4 text-[3.4rem] leading-[0.92] font-extrabold tracking-tight uppercase sm:text-7xl lg:text-8xl">
            <span className="block overflow-hidden py-[0.04em]">
              <span className="anim-line text-ink block" style={delay(0.25)}>
                Laptop Bekas
              </span>
            </span>
            <span className="block overflow-hidden py-[0.04em]">
              <span className="anim-line text-brand block" style={delay(0.38)}>
                Siap Dipakai
              </span>
            </span>
          </h1>

          <p
            className="anim-rise text-slate mt-5 max-w-md text-base leading-relaxed"
            style={delay(0.55)}
          >
            Dicek satu per satu, bergaransi toko, dan dipilihkan sesuai kebutuhanmu lewat Smart
            Finder. Tinggal pakai.
          </p>

          <div className="anim-rise mt-7 flex flex-wrap items-center gap-3" style={delay(0.68)}>
            <Link
              href="/laptops"
              className="group bg-brand inline-flex items-center gap-3 rounded-full py-2 pr-2 pl-6 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-brand/30 active:scale-95"
            >
              Explore Laptops
              <span className="bg-card text-ink flex h-9 w-9 items-center justify-center rounded-full">
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45"
                  aria-hidden="true"
                />
              </span>
            </Link>
            <Link
              href="/finder"
              className="border-ink text-ink hover:bg-ink inline-flex items-center rounded-full border px-6 py-3.5 text-sm font-semibold transition-all hover:text-white active:scale-95"
            >
              Smart Finder
            </Link>
          </div>

          <ul className="mt-8 grid grid-cols-3 gap-3 sm:max-w-md">
            {trust.map(({ icon: Icon, title, note }, index) => (
              <li
                key={title}
                className="anim-rise flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-2"
                style={delay(0.85 + index * 0.1)}
              >
                <Icon className="text-brand h-5 w-5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-ink text-xs font-bold">{title}</p>
                  <p className="text-slate text-[11px] leading-tight">{note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
