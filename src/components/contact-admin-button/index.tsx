"use client";

import { useState } from "react";
import { Instagram } from "lucide-react";
import { buildLaptopShareText } from "@/lib/share-text";
import { instagramMessageLink } from "@/lib/site";
import type { Laptop } from "@/lib/data";

// Kontak admin untuk sementara diarahkan ke DM Instagram (bukan WhatsApp) —
// lihat catatan di `lib/site.ts`. Instagram tidak punya cara resmi untuk
// mengisi teks pesan otomatis lewat URL seperti `wa.me`, jadi sebagai
// gantinya kita salin info produk ke clipboard dulu (format sama seperti
// tombol "Salin Info" di `ProductShare`) baru buka jendela DM-nya — supaya
// pengunjung tinggal paste begitu chat-nya kebuka.

interface ContactAdminButtonProps {
  instagramUrl: string;
  laptop: Laptop;
  className?: string;
}

export function ContactAdminButton({ instagramUrl, laptop, className }: ContactAdminButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      const text = buildLaptopShareText(laptop, window.location.href);
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard bisa gagal (mis. browser lama) — DM tetap dibuka manual.
    }
    window.open(instagramMessageLink(instagramUrl), "_blank", "noopener,noreferrer");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={
        className ??
        "bg-ink inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      }
    >
      <Instagram className="h-4 w-4" aria-hidden="true" />
      {copied ? "Info disalin, buka DM..." : "Hubungi via Instagram"}
    </button>
  );
}
