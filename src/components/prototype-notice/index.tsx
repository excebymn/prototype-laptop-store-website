"use client";

import { useEffect, useState } from "react";
import { Instagram, X } from "lucide-react";
import storeInfo from "@/lib/data/mock/store-info.json";
import type { StoreInfo } from "@/lib/data";
import { SHOW_PROTOTYPE_NOTICE, INSTAGRAM_PROFILE_URL, instagramMessageLink } from "@/lib/site";

// Popup global, muncul setiap kali situs di-refresh (bukan cuma sekali per
// sesi), yang memberi tahu pengunjung bahwa situs ini adalah prototype/
// showcase karya Excebymn — bukan toko yang betulan beroperasi. Tujuannya
// konversi: pengunjung (calon klien) diarahkan menghubungi Excebymn lewat
// Instagram kalau tertarik desain & fitur ini dijadikan situs mereka
// sendiri.
//
// Dipasang sekali di `app/layout.tsx` supaya tampil di semua halaman, bukan
// per-halaman. Sengaja tidak disimpan ke sessionStorage/localStorage —
// komponen ini remount setiap full page load, jadi popup akan muncul lagi
// tiap kali pengunjung refresh, meskipun sebelumnya sudah ditutup. Kalau
// situs ini nanti benar-benar diserahkan/dijual ke klien, tinggal set
// `NEXT_PUBLIC_SHOW_PROTOTYPE_NOTICE=false` di environment — tidak perlu
// hapus komponen ini (lihat `lib/site.ts`).

const SHOW_DELAY_MS = 1200;

const info = storeInfo as StoreInfo;

export function PrototypeNotice() {
  const [isOpen, setIsOpen] = useState(false);

  // Tampilkan setelah delay kecil (biar tidak "menyerbu" begitu halaman
  // dibuka) — setiap kali komponen ini mount, yaitu setiap full page
  // load/refresh.
  useEffect(() => {
    if (!SHOW_PROTOTYPE_NOTICE) return;

    const timer = window.setTimeout(() => setIsOpen(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") dismiss();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  function dismiss() {
    setIsOpen(false);
  }

  function handleContact() {
    const link = instagramMessageLink(info.socialMedia.instagram ?? INSTAGRAM_PROFILE_URL);
    window.open(link, "_blank", "noopener,noreferrer");
    dismiss();
  }

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="prototype-notice-title"
      className="fixed inset-0 z-100 flex items-end justify-center bg-ink/50 p-4 backdrop-blur-sm sm:items-center"
      onClick={dismiss}
    >
      <div
        className="border-surface bg-paper relative w-full max-w-md rounded-2xl border-2 p-6 shadow-xl sm:p-7"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={dismiss}
          aria-label="Tutup"
          className="text-slate hover:text-ink absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full transition-colors"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <span className="border-gold text-gold inline-flex -rotate-2 items-center rounded-md border-2 border-dashed px-2 py-1 text-[11px] font-bold tracking-wide uppercase">
          Prototype
        </span>

        <h2 id="prototype-notice-title" className="font-display text-ink mt-3 text-xl font-semibold">
          Ini masih prototype
        </h2>

        <p className="text-slate mt-2 text-sm leading-relaxed">
          Website ini dibuat oleh <span className="text-ink font-semibold">Excebymn</span> sebagai
          contoh desain toko laptop bekas — belum toko yang betulan beroperasi. Suka dengan
          tampilan atau fiturnya? Website seperti ini bisa jadi milikmu.
        </p>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={handleContact}
            className="bg-ink inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <Instagram className="h-4 w-4" aria-hidden="true" />
            Hubungi via Instagram
          </button>
          <button
            type="button"
            onClick={dismiss}
            className="text-slate hover:text-ink border-surface inline-flex items-center justify-center rounded-full border px-4 py-2.5 text-sm font-medium transition-colors"
          >
            Lanjut Lihat-Lihat
          </button>
        </div>
      </div>
    </div>
  );
}
