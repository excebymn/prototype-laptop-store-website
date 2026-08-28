import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Briefcase,
  Code2,
  Coffee,
  Gamepad2,
  GraduationCap,
  Palette,
  Scale,
  Sparkles,
} from "lucide-react";
import { laptopRepository } from "@/lib/data";
import type { Category } from "@/lib/data";
import { LaptopCard } from "@/components/laptop-card";
import storeInfo from "@/lib/data/mock/store-info.json";
import type { StoreInfo } from "@/lib/data";

const info = storeInfo as StoreInfo;

export const metadata: Metadata = {
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

const NEED_CATEGORIES: { value: Category; label: string; icon: typeof Briefcase }[] = [
  { value: "business", label: "Kerja Kantoran", icon: Briefcase },
  { value: "gaming", label: "Gaming", icon: Gamepad2 },
  { value: "programming", label: "Ngoding", icon: Code2 },
  { value: "school", label: "Sekolah & Kuliah", icon: GraduationCap },
  { value: "creative", label: "Desain & Kreatif", icon: Palette },
  { value: "everyday", label: "Harian & Ringan", icon: Coffee },
];

export default async function HomePage() {
  const featuredLaptops = await laptopRepository.getFeatured();
  const waLink = `https://wa.me/${info.whatsapp}`;

  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-16 pb-14 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="border-gold text-gold-dark inline-block -rotate-2 rounded-md border-2 border-dashed px-3 py-1 text-xs font-bold">
              QC Tested ✓
            </span>
            <h1 className="font-display text-ink mt-4 text-4xl leading-tight font-semibold sm:text-5xl">
              Laptop bekas yang dipilihkan, bukan cuma dijual.
            </h1>
            <p className="text-slate mt-4 text-base leading-relaxed sm:text-lg">
              Excebymn bantu kamu nemuin laptop bekas berkualitas lewat Smart Finder — tinggal jawab
              kebutuhanmu, kami cocokin unitnya. Semua sudah dicek dan siap pakai.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/laptops"
                className="bg-ink inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Explore Laptops
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/finder"
                className="bg-gold text-ink inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:-rotate-1"
              >
                ✨ Smart Finder
              </Link>
            </div>
          </div>

          <div className="border-surface bg-surface/40 rounded-2xl border p-6">
            <p className="text-slate text-xs font-medium tracking-wide uppercase">
              Kondisi yang kami pakai
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-ink font-medium">Like New</span>
                <span className="text-slate">Nyaris tanpa tanda pemakaian</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-ink font-medium">QC Tested</span>
                <span className="text-slate">Sudah lolos pengecekan menyeluruh</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-ink font-medium">Ready to Use</span>
                <span className="text-slate">Siap pakai, harga paling bersahabat</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Featured Laptops */}
      <section className="border-surface border-t px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-ink text-2xl font-semibold">Laptop Pilihan</h2>
              <p className="text-slate mt-1 text-sm">Unit terbaik yang lagi kami rekomendasikan</p>
            </div>
            <Link
              href="/laptops"
              className="text-ink hidden items-center gap-1 text-sm font-medium sm:flex"
            >
              Lihat semua
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredLaptops.map((laptop) => (
              <LaptopCard key={laptop.id} laptop={laptop} />
            ))}
          </div>
        </div>
      </section>

      {/* Smart Finder teaser — Browse by Need */}
      <section className="border-surface bg-surface/40 border-t px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="font-display text-ink text-2xl font-semibold">
              Bingung Mulai dari Mana?
            </h2>
            <p className="text-slate mx-auto mt-1 max-w-xl text-sm">
              Pilih kebutuhanmu, biar Smart Finder yang carikan laptop paling cocok.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {NEED_CATEGORIES.map(({ value, label, icon: Icon }) => (
              <Link
                key={value}
                href={`/finder?purpose=${value}`}
                className="border-surface bg-paper hover:border-gold flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-colors"
              >
                <Icon className="text-ink h-6 w-6" aria-hidden="true" />
                <span className="text-ink text-xs font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Compare teaser */}
      <section className="border-surface border-t px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 text-center">
          <span className="border-slate text-slate flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed">
            <Scale className="h-5 w-5" aria-hidden="true" />
          </span>
          <h2 className="font-display text-ink text-2xl font-semibold">
            Masih Ragu Antara Dua Pilihan?
          </h2>
          <p className="text-slate max-w-xl text-sm">
            Bandingkan spesifikasi dan harga sampai 2 laptop sekaligus, biar keputusannya lebih
            mantap.
          </p>
          <Link
            href="/compare"
            className="border-ink text-ink hover:bg-ink inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors hover:text-white"
          >
            Coba Compare
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* CTA akhir */}
      <section className="bg-ink px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 text-center">
          <Sparkles className="text-gold h-6 w-6" aria-hidden="true" />
          <h2 className="font-display text-2xl font-semibold text-white">
            Siap Nemuin Laptop yang Pas?
          </h2>
          <p className="max-w-xl text-sm text-white/70">
            Jelajahi katalog lengkap kami, atau langsung ngobrol sama admin kalau butuh rekomendasi
            personal.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/laptops"
              className="bg-gold text-ink rounded-full px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
            >
              Explore Laptops
            </Link>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Contact Admin
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
