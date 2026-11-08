import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Briefcase,
  Code2,
  Coffee,
  Gamepad2,
  GraduationCap,
  MapPin,
  MessageCircle,
  Palette,
  Search,
  ShieldCheck,
} from "lucide-react";
import { laptopRepository, storeInfoRepository } from "@/lib/data";
import type { Category } from "@/lib/data";
import { HomeHero } from "@/components/home-hero";
import { LaptopCard } from "@/components/laptop-card";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion";
import { ScrollRow } from "@/components/scroll-row";
import { WARRANTY_TEXT, whatsappLink } from "@/lib/site";

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

const NEED_CATEGORIES: {
  value: Category;
  label: string;
  note: string;
  icon: typeof Briefcase;
}[] = [
  { value: "business", label: "Kerja Kantoran", note: "Ringan, tahan lama, keyboard nyaman", icon: Briefcase },
  { value: "gaming", label: "Gaming", note: "GPU dedicated & layar mulus", icon: Gamepad2 },
  { value: "programming", label: "Ngoding", note: "RAM lega, SSD kencang", icon: Code2 },
  { value: "school", label: "Sekolah & Kuliah", note: "Terjangkau & baterai awet", icon: GraduationCap },
  { value: "creative", label: "Desain & Kreatif", note: "Layar akurat, tenaga besar", icon: Palette },
  { value: "everyday", label: "Harian & Ringan", note: "Browsing, nonton, dokumen", icon: Coffee },
];

// Judul section dibuat seragam supaya ritme halaman rapi.
const SECTION_TITLE =
  "font-display text-ink text-3xl font-bold tracking-wide uppercase sm:text-4xl";

export default async function HomePage() {
  const [featuredLaptops, info] = await Promise.all([
    laptopRepository.getFeatured(),
    storeInfoRepository.get(),
  ]);
  const waLink = whatsappLink(info.whatsapp, `Halo ${info.storeName}, saya mau tanya stok laptop.`);

  const valueProps = [
    { icon: ShieldCheck, title: WARRANTY_TEXT, note: "Ada kendala di awal pemakaian? Kami bantu tangani." },
    { icon: Search, title: "Cek Stok Ready", note: "Tanya stok terbaru lewat WhatsApp atau Instagram." },
    { icon: MapPin, title: `${info.branches.length} Cabang`, note: "Datang langsung dan coba unitnya sebelum dibeli." },
  ];

  return (
    <main className="flex flex-1 flex-col">
      <HomeHero info={info} />

      {/* Laptop Pilihan: 3 kartu. Geser di HP, grid di layar ≥md. */}
      <section className="px-4 pt-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal className="flex items-end justify-between gap-4">
            <div>
              <h2 className={SECTION_TITLE}>Laptop Pilihan</h2>
              <p className="text-slate mt-1 text-sm">Unit terbaik yang lagi kami rekomendasikan</p>
            </div>
            <Link
              href="/laptops"
              className="bg-ink inline-flex shrink-0 items-center rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Lihat Semua
            </Link>
          </Reveal>

          <RevealStagger className="no-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-1 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
            {featuredLaptops.slice(0, 3).map((laptop) => (
              <RevealItem key={laptop.id} className="w-[80%] shrink-0 snap-start md:w-auto">
                <LaptopCard laptop={laptop} />
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Cari sesuai kebutuhan */}
      <section className="px-4 pt-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
          <ScrollRow
            title="Cari Sesuai Kebutuhan"
            subtitle="Pilih kebutuhanmu, Smart Finder yang carikan laptop paling cocok."
          >
            {NEED_CATEGORIES.map(({ value, label, note, icon: Icon }) => (
              <Link
                key={value}
                href={`/finder?purpose=${value}`}
                className="group bg-card border-surface hover:border-ink flex w-60 shrink-0 snap-start flex-col gap-4 rounded-3xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-ink/10"
              >
                <span className="bg-sky-soft text-ink flex h-12 w-12 items-center justify-center rounded-2xl">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-ink text-xl font-bold tracking-wide uppercase">
                    {label}
                  </h3>
                  <p className="text-slate mt-1 text-xs leading-relaxed">{note}</p>
                </div>
                <span className="text-brand-dark mt-auto inline-flex items-center gap-1 text-xs font-semibold">
                  Lihat laptop
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </ScrollRow>
          </Reveal>
        </div>
      </section>

      {/* Keunggulan + ajakan — satu panel merah tua */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="bg-deep mx-auto max-w-6xl rounded-[2rem] px-6 py-12 sm:px-10">
          <h2 className="font-display text-paper text-center text-3xl font-bold tracking-wide uppercase sm:text-4xl">
            Beli Tenang di {info.storeName}
          </h2>

          <RevealStagger as="ul" className="mt-10 grid gap-8 sm:grid-cols-3" stagger={0.15}>
            {valueProps.map(({ icon: Icon, title, note }) => (
              <RevealItem as="li" key={title} className="flex flex-col items-center gap-2 text-center">
                <span className="bg-paper/10 text-paper flex h-12 w-12 items-center justify-center rounded-full">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="font-display text-paper text-xl font-bold tracking-wide uppercase">
                  {title}
                </h3>
                <p className="text-paper/75 max-w-xs text-sm">{note}</p>
              </RevealItem>
            ))}
          </RevealStagger>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-paper text-ink flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Tanya via WhatsApp
            </a>
            <Link
              href="/locations"
              className="border-paper/50 text-paper hover:bg-paper hover:text-ink flex items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-sm font-semibold transition-colors"
            >
              Lihat {info.branches.length} Cabang
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
