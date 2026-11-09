import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { RevealItem, RevealStagger } from "@/components/motion";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { storeInfoRepository } from "@/lib/data";
import { INSTAGRAM_PROFILE_URL, instagramMessageLink } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const info = await storeInfoRepository.get();

  return {
  title: "Hubungi Kami",
  description: `Chat via Instagram atau email — ${info.storeName} siap bantu jawab pertanyaanmu.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Hubungi ${info.storeName}`,
    description: `Chat via Instagram atau email — ${info.storeName} siap bantu jawab pertanyaanmu.`,
    url: "/contact",
    type: "website",
  },
};
}

export default async function ContactPage() {
  const info = await storeInfoRepository.get();
  const igDmLink = instagramMessageLink(info.socialMedia.instagram ?? INSTAGRAM_PROFILE_URL);
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(info.address)}`;

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="anim-rise font-display text-ink text-3xl font-bold tracking-wide uppercase">
        Hubungi Kami
      </h1>
      <p
        className="anim-rise text-slate mt-1 text-sm"
        style={{ "--d": "0.1s" } as React.CSSProperties}
      >
        Ada pertanyaan soal unit, ketersediaan, atau cara pemesanan? Langsung chat aja.
      </p>

      <RevealStagger className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2" stagger={0.09}>
        <RevealItem className="sm:col-span-2">
        <a
          href={igDmLink}
          target="_blank"
          rel="noopener noreferrer"
          className="border-brand bg-brand/5 hover:bg-brand/10 flex flex-col gap-3 rounded-lg border p-6 transition-colors sm:col-span-2"
        >
          <span className="bg-ink flex h-11 w-11 items-center justify-center rounded-full text-white">
            <InstagramIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-ink font-display text-lg font-semibold">Chat via Instagram</p>
            <p className="text-slate mt-1 text-sm">
              Cara tercepat untuk tanya-tanya atau pesan unit — @excebymn
            </p>
          </div>
        </a>
        </RevealItem>

        <RevealItem className="sm:col-span-2">
        <a
          href={`mailto:${info.email}`}
          className="border-surface hover:border-brand flex items-start gap-3 rounded-lg border p-5 transition-colors sm:col-span-2"
        >
          <Mail className="text-ink mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <div>
            <p className="text-ink text-sm font-semibold">Email</p>
            <p className="text-slate mt-0.5 text-sm">{info.email}</p>
          </div>
        </a>
        </RevealItem>

        <RevealItem className="sm:col-span-2">
        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="border-surface hover:border-brand flex items-start gap-3 rounded-lg border p-5 transition-colors sm:col-span-2"
        >
          <MapPin className="text-ink mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <div>
            <p className="text-ink text-sm font-semibold">Alamat</p>
            <p className="text-slate mt-0.5 text-sm">{info.address}</p>
          </div>
        </a>
        </RevealItem>

        <RevealItem className="border-surface rounded-lg border p-5 sm:col-span-2">
          <p className="text-ink text-sm font-semibold">Jam Operasional</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {info.operatingHours.map((entry) => (
              <li key={entry.days} className="flex justify-between gap-4">
                <span className="text-slate">{entry.days}</span>
                <span className="text-ink font-mono">{entry.hours}</span>
              </li>
            ))}
          </ul>
        </RevealItem>

        {(info.socialMedia.instagram || info.socialMedia.tiktok || info.socialMedia.facebook) && (
          <RevealItem className="flex flex-wrap gap-2 sm:col-span-2">
            {info.socialMedia.instagram && (
              <a
                href={info.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="border-surface text-slate hover:border-brand hover:text-brand-dark rounded-md border px-4 py-2 text-xs font-medium transition-colors"
              >
                Instagram
              </a>
            )}
            {info.socialMedia.tiktok && (
              <a
                href={info.socialMedia.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="border-surface text-slate hover:border-brand hover:text-brand-dark rounded-md border px-4 py-2 text-xs font-medium transition-colors"
              >
                TikTok
              </a>
            )}
            {info.socialMedia.facebook && (
              <a
                href={info.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="border-surface text-slate hover:border-brand hover:text-brand-dark rounded-md border px-4 py-2 text-xs font-medium transition-colors"
              >
                Facebook
              </a>
            )}
          </RevealItem>
        )}
      </RevealStagger>
    </main>
  );
}
