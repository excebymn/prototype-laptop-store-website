import type { Metadata } from "next";
import { Clock, ExternalLink, MapPin, MessageCircle } from "lucide-react";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion";
import { storeInfoRepository } from "@/lib/data";
import {
  INSTAGRAM_PROFILE_URL,
  instagramMessageLink,
  mapsLink,
  whatsappLink,
} from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const info = await storeInfoRepository.get();
  const description = `${info.branches.length} cabang ${info.storeName} — alamat, jam buka, dan cara cek stok ready.`;

  return {
    title: "Lokasi Cabang",
    description,
    alternates: { canonical: "/locations" },
    openGraph: { title: `Lokasi ${info.storeName}`, description, url: "/locations", type: "website" },
  };
}

export default async function LocationsPage() {
  const info = await storeInfoRepository.get();
  const igDmLink = instagramMessageLink(info.socialMedia.instagram ?? INSTAGRAM_PROFILE_URL);
  const waLink = whatsappLink(info.whatsapp, `Halo ${info.storeName}, saya mau tanya stok laptop.`);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-ink text-4xl font-extrabold tracking-wide uppercase sm:text-5xl">
        Lokasi Toko
      </h1>
      <p className="text-slate mt-2 max-w-xl text-sm">
        {info.branches.length} cabang di Jawa Timur dan Yogyakarta. Buka {info.operatingHours[0]?.days.toLowerCase()},{" "}
        {info.operatingHours[0]?.hours}.
      </p>

      <RevealStagger as="ul" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
        {info.branches.map((branch) => (
          <RevealItem
            as="li"
            key={branch.id}
            className={`flex flex-col gap-3 rounded-3xl border p-5 ${
              branch.isMain ? "border-ink bg-card ring-ink ring-1" : "border-surface bg-card"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="bg-brand flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <div>
              <h2 className="font-display text-ink text-2xl font-bold tracking-wide uppercase">
                {branch.city}
              </h2>
              {branch.isMain && (
                <p className="text-brand-dark text-xs font-semibold">Cabang utama</p>
              )}
              <p className="text-slate text-sm">{branch.address}</p>
            </div>
            <p className="text-ink flex items-center gap-2 text-xs font-medium">
              <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {branch.hours}
            </p>
            <a
              href={mapsLink(branch.address)}
              target="_blank"
              rel="noopener noreferrer"
              className="border-ink text-ink hover:bg-ink mt-auto inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors hover:text-white"
            >
              Buka di Maps
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </RevealItem>
        ))}
      </RevealStagger>

      <Reveal className="bg-deep mt-12 rounded-[2rem] px-6 py-10 sm:px-10">
        <h2 className="font-display text-3xl font-bold tracking-wide text-white uppercase sm:text-4xl">
          Cara Melihat Stok Ready
        </h2>
        <p className="mt-2 max-w-xl text-sm text-white/70">
          Stok tiap cabang bisa berubah cepat. Tanyakan dulu ketersediaan unit yang kamu mau
          sebelum datang.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-[#128c4a] px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Tanya via WhatsApp
          </a>
          <a
            href={igDmLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink flex items-center justify-center gap-2 rounded-full bg-paper px-6 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90"
          >
            <InstagramIcon className="h-4 w-4" aria-hidden="true" />
            DM Instagram
          </a>
        </div>
      </Reveal>
    </main>
  );
}
