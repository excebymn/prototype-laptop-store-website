import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, MapPin, MessageCircle } from "lucide-react";
import { laptopRepository, storeInfoRepository } from "@/lib/data";
import type { Category } from "@/lib/data";
import { HomeHero } from "@/components/home-hero";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { LaptopCard } from "@/components/laptop-card";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion";
import { SectionHead } from "@/components/section-head";
import {
  INSTAGRAM_PROFILE_URL,
  WARRANTY_TEXT,
  instagramMessageLink,
  whatsappLink,
} from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const info = await storeInfoRepository.get();

  return {
    title: "Laptop Bekas Berkualitas, Dicek & Siap Pakai",
    description: info.tagline,
    alternates: { canonical: "/" },
    openGraph: {
      title: `${info.storeName} — Laptop Bekas Berkualitas`,
      description: info.tagline,
      url: "/",
      type: "website",
    },
  };
}

const NEED_CATEGORIES: { value: Category; label: string; note: string }[] = [
  { value: "business", label: "Kerja Kantoran", note: "Ringan, tahan lama, keyboard nyaman" },
  { value: "gaming", label: "Gaming", note: "GPU dedicated & layar mulus" },
  { value: "programming", label: "Ngoding", note: "RAM lega, SSD kencang" },
  { value: "school", label: "Sekolah & Kuliah", note: "Terjangkau & baterai awet" },
  { value: "creative", label: "Desain & Kreatif", note: "Layar akurat, tenaga besar" },
  { value: "everyday", label: "Harian & Ringan", note: "Browsing, nonton, dokumen" },
];

const STEPS = [
  "Pilih laptop yang kamu suka di katalog.",
  "Tanya stoknya lewat WhatsApp atau DM Instagram.",
  "Datang ke cabang terdekat dan coba unitnya langsung.",
];

export default async function HomePage() {
  const [featuredLaptops, info] = await Promise.all([
    laptopRepository.getFeatured(),
    storeInfoRepository.get(),
  ]);
  const waLink = whatsappLink(info.whatsapp, `Halo ${info.storeName}, saya mau tanya stok laptop.`);
  const igDmLink = instagramMessageLink(info.socialMedia.instagram ?? INSTAGRAM_PROFILE_URL);
  const hours = info.operatingHours[0];

  const facts = [
    { label: "Garansi", value: WARRANTY_TEXT.replace("Garansi ", "") },
    { label: "Pemeriksaan", value: "Dicek satu-satu" },
    { label: "Cabang", value: `${info.branches.length} lokasi` },
    { label: "Buka", value: hours ? hours.hours.replace(" WIB", "") : "Setiap hari" },
  ];

  return (
    <main className="flex flex-1 flex-col">
      <HomeHero info={info} />

      {/* Strip fakta toko — navy penuh selebar layar */}
      <section className="bg-ink mt-12 sm:mt-16" aria-label="Fakta toko">
        <RevealStagger
          as="ul"
          className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-4"
          stagger={0.08}
        >
          {facts.map(({ label, value }) => (
            <RevealItem
              as="li"
              key={label}
              className="border-paper/15 border-l px-5 py-6 first:border-l-0 max-lg:odd:border-l-0 max-lg:[&:nth-child(n+3)]:border-t sm:px-6"
            >
              <p className="text-sky font-mono text-[11px] tracking-widest uppercase">{label}</p>
              <p className="font-display text-paper mt-1 text-2xl font-bold tracking-wide uppercase sm:text-3xl">
                {value}
              </p>
            </RevealItem>
          ))}
        </RevealStagger>
      </section>

      {/* 01 — Laptop Pilihan */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-20 sm:px-6 lg:px-8">
        <SectionHead
          index="01"
          title="Laptop Pilihan"
          subtitle="Unit yang lagi kami rekomendasikan"
          action={
            <Link
              href="/laptops"
              className="text-ink hover:text-brand-dark group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold transition-colors"
            >
              Lihat semua
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          }
        />

        <RevealStagger
          className="no-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4"
          stagger={0.08}
        >
          {featuredLaptops.slice(0, 4).map((laptop) => (
            <RevealItem key={laptop.id} className="w-[78%] shrink-0 snap-start sm:w-auto">
              <LaptopCard laptop={laptop} />
            </RevealItem>
          ))}
        </RevealStagger>
      </section>

      {/* 02 — Cari sesuai kebutuhan */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-20 sm:px-6 lg:px-8">
        <SectionHead
          index="02"
          title="Cari Sesuai Kebutuhan"
          subtitle="Pilih kebutuhanmu, Smart Finder yang carikan laptop paling cocok."
        />

        <RevealStagger
          className="border-surface bg-surface mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-lg border sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.07}
        >
          {NEED_CATEGORIES.map(({ value, label, note }, index) => (
            <RevealItem key={value} className="bg-card">
              <Link
                href={`/finder?purpose=${value}`}
                className="group hover:bg-ink flex h-full items-start justify-between gap-4 p-5 transition-colors duration-300"
              >
                <div>
                  <p className="text-brand-dark group-hover:text-sky font-mono text-xs font-semibold tracking-widest transition-colors">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display text-ink group-hover:text-paper mt-1 text-2xl font-bold tracking-wide uppercase transition-colors">
                    {label}
                  </h3>
                  <p className="text-slate group-hover:text-paper/70 mt-1 text-sm transition-colors">
                    {note}
                  </p>
                </div>
                <ArrowUpRight
                  className="text-ink group-hover:text-paper h-5 w-5 shrink-0 transition-all duration-300 group-hover:rotate-45"
                  aria-hidden="true"
                />
              </Link>
            </RevealItem>
          ))}
        </RevealStagger>
      </section>

      {/* 03 — Cara cek stok */}
      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHead
          index="03"
          title="Cara Melihat Stok Ready"
          subtitle="Stok tiap cabang bisa berubah cepat, jadi tanyakan dulu sebelum datang."
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <RevealStagger as="ol" className="border-surface divide-surface divide-y border-y" stagger={0.1}>
            {STEPS.map((step, index) => (
              <RevealItem as="li" key={step} className="flex items-start gap-4 py-5">
                <span className="font-display text-brand-dark text-3xl leading-none font-bold">
                  {index + 1}
                </span>
                <p className="text-ink pt-1 text-base">{step}</p>
              </RevealItem>
            ))}
          </RevealStagger>

          <Reveal className="flex flex-col gap-6">
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand flex flex-1 items-center justify-center gap-2 rounded-md px-6 py-3.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-brand/30 active:scale-95"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Tanya via WhatsApp
              </a>
              <a
                href={igDmLink}
                target="_blank"
                rel="noopener noreferrer"
                className="border-ink text-ink hover:bg-ink flex flex-1 items-center justify-center gap-2 rounded-md border px-6 py-3.5 text-sm font-semibold transition-all hover:text-white active:scale-95"
              >
                <InstagramIcon className="h-4 w-4" aria-hidden="true" />
                DM Instagram
              </a>
            </div>

            <div>
              <p className="text-slate font-mono text-[11px] tracking-widest uppercase">
                Cabang kami
              </p>
              <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {info.branches.slice(0, 6).map((branch) => (
                  <li key={branch.id} className="text-ink flex items-center gap-2">
                    <MapPin className="text-brand h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    {branch.city}
                    {branch.isMain && <span className="text-slate text-xs">· utama</span>}
                  </li>
                ))}
              </ul>
              <Link
                href="/locations"
                className="text-ink hover:text-brand-dark group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
              >
                Lihat semua {info.branches.length} cabang
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
