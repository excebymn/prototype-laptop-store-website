import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import storeInfo from "@/lib/data/mock/store-info.json";
import type { StoreInfo } from "@/lib/data";

const info = storeInfo as StoreInfo;

export const metadata: Metadata = {
  title: "Hubungi Kami",
  description: `Chat via WhatsApp, telepon, atau email — ${info.storeName} siap bantu jawab pertanyaanmu.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Hubungi ${info.storeName}`,
    description: `Chat via WhatsApp, telepon, atau email — ${info.storeName} siap bantu jawab pertanyaanmu.`,
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  const waLink = `https://wa.me/${info.whatsapp}`;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(info.address)}`;

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-ink text-2xl font-semibold">Hubungi Kami</h1>
      <p className="text-slate mt-1 text-sm">
        Ada pertanyaan soal unit, ketersediaan, atau cara pemesanan? Langsung chat aja.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="border-gold bg-gold/5 hover:bg-gold/10 flex flex-col gap-3 rounded-xl border-2 border-dashed p-6 transition-colors sm:col-span-2"
        >
          <span className="bg-ink flex h-11 w-11 items-center justify-center rounded-full text-white">
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-ink font-display text-lg font-semibold">Chat via WhatsApp</p>
            <p className="text-slate mt-1 text-sm">
              Cara tercepat untuk tanya-tanya atau pesan unit — {info.phone}
            </p>
          </div>
        </a>

        <a
          href={`mailto:${info.email}`}
          className="border-surface hover:border-gold flex items-start gap-3 rounded-xl border p-5 transition-colors"
        >
          <Mail className="text-ink mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <div>
            <p className="text-ink text-sm font-semibold">Email</p>
            <p className="text-slate mt-0.5 text-sm">{info.email}</p>
          </div>
        </a>

        <a
          href={`tel:${info.phone}`}
          className="border-surface hover:border-gold flex items-start gap-3 rounded-xl border p-5 transition-colors"
        >
          <Phone className="text-ink mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <div>
            <p className="text-ink text-sm font-semibold">Telepon</p>
            <p className="text-slate mt-0.5 text-sm">{info.phone}</p>
          </div>
        </a>

        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="border-surface hover:border-gold flex items-start gap-3 rounded-xl border p-5 transition-colors sm:col-span-2"
        >
          <MapPin className="text-ink mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <div>
            <p className="text-ink text-sm font-semibold">Alamat</p>
            <p className="text-slate mt-0.5 text-sm">{info.address}</p>
          </div>
        </a>

        <div className="border-surface rounded-xl border p-5 sm:col-span-2">
          <p className="text-ink text-sm font-semibold">Jam Operasional</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {info.operatingHours.map((entry) => (
              <li key={entry.days} className="flex justify-between gap-4">
                <span className="text-slate">{entry.days}</span>
                <span className="text-ink font-mono">{entry.hours}</span>
              </li>
            ))}
          </ul>
        </div>

        {(info.socialMedia.instagram || info.socialMedia.tiktok || info.socialMedia.facebook) && (
          <div className="flex flex-wrap gap-2 sm:col-span-2">
            {info.socialMedia.instagram && (
              <a
                href={info.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="border-surface text-slate hover:border-gold hover:text-gold-dark rounded-full border px-4 py-2 text-xs font-medium transition-colors"
              >
                Instagram
              </a>
            )}
            {info.socialMedia.tiktok && (
              <a
                href={info.socialMedia.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="border-surface text-slate hover:border-gold hover:text-gold-dark rounded-full border px-4 py-2 text-xs font-medium transition-colors"
              >
                TikTok
              </a>
            )}
            {info.socialMedia.facebook && (
              <a
                href={info.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="border-surface text-slate hover:border-gold hover:text-gold-dark rounded-full border px-4 py-2 text-xs font-medium transition-colors"
              >
                Facebook
              </a>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
