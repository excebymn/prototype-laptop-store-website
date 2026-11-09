import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Compass, GraduationCap, MessageCircle } from "lucide-react";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion";
import { storeInfoRepository } from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const info = await storeInfoRepository.get();

  return {
  title: "Tentang Kami",
  description: info.tagline,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `Tentang ${info.storeName}`,
    description: info.tagline,
    url: "/about",
    type: "website",
  },
};
}

// Tiga pilar produk dari Perencanaan §1 — dijadikan konten utama About,
// supaya konsisten dengan filosofi yang sudah dirancang, bukan sekadar
// halaman "tentang kami" generik.
const PILLARS = [
  {
    icon: Compass,
    title: "Discovery",
    description:
      "Smart Finder bantu kamu nemuin laptop yang cocok, tanpa harus paham istilah teknis dulu.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description:
      "Guide & Buying Guide kami tulis supaya kamu ngerti apa yang kamu beli, bukan cuma percaya omongan penjual.",
  },
  {
    icon: MessageCircle,
    title: "Ngobrol Dulu, Baru Deal",
    description:
      "Semua transaksi lewat ngobrol langsung sama admin — biar kamu bisa tanya sepuasnya sebelum mutusin beli.",
  },
];

export default async function AboutPage() {
  const info = await storeInfoRepository.get();

  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-3xl px-4 pt-14 pb-4 text-center sm:px-6 lg:px-8">
        <h1 className="anim-rise font-display text-ink text-4xl font-extrabold tracking-wide uppercase sm:text-5xl">
          Tentang {info.storeName}
        </h1>
        <p
          className="anim-rise text-slate mt-4 text-base leading-relaxed"
          style={{ "--d": "0.12s" } as React.CSSProperties}
        >
          {info.tagline}
        </p>
      </section>

      <section className="border-surface border-t px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <h2 className="font-display text-ink text-center text-3xl font-bold tracking-wide uppercase">
              Kenapa Kami Ada
            </h2>
          </Reveal>
          <RevealStagger className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3" stagger={0.12}>
            {PILLARS.map(({ icon: Icon, title, description }) => (
              <RevealItem key={title} className="border-surface bg-card rounded-lg border p-6 text-center">
                <span className="bg-sky-soft text-ink mx-auto flex h-12 w-12 items-center justify-center rounded-full">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-ink mt-4 text-base font-semibold">{title}</h3>
                <p className="text-slate mt-2 text-sm leading-relaxed">{description}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="bg-ink px-4 py-16 sm:px-6 lg:px-8">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <h2 className="font-display text-2xl font-semibold text-white">
            Penasaran Laptop Mana yang Cocok?
          </h2>
          <p className="max-w-xl text-sm text-white/70">
            Coba Smart Finder, atau langsung tanya-tanya dulu sama admin kami.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/finder"
              className="bg-brand text-white rounded-md px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
            >
              Smart Finder
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Hubungi Kami
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
