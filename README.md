<div align="center">

# 💻 Excebymn — Laptop Bekas Berkualitas

**Bukan sekadar katalog jual-beli — platform discovery & guidance untuk laptop bekas berkualitas.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Zustand](https://img.shields.io/badge/State-Zustand-orange)](https://zustand.docs.pmnd.rs)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com)

[Demo](#) · [Laporkan Bug](../../issues) · [Excebymn](https://instagram.com/excebymn)

</div>

---

> 🏷️ **Ini adalah proyek showcase/prototype** karya [Excebymn](https://instagram.com/excebymn) — dibuat untuk mendemonstrasikan seperti apa website toko laptop bekas yang proper: cepat, SEO-friendly, dan dirancang untuk konversi lewat WhatsApp. Tertarik desain & fiturnya jadi milikmu? Hubungi lewat popup di situsnya atau kontak di bawah.

## ✨ Fitur

| Fitur | Deskripsi |
|---|---|
| 🔍 **Smart Finder** | Multi-step form yang merekomendasikan laptop lewat rule-based scoring — user tidak perlu paham spesifikasi teknis |
| 📚 **Buying Guide** | Artikel edukasi (kebutuhan, hardware, buying guide) untuk bangun trust sebelum keputusan beli |
| ⚖️ **Compare** | Bandingkan 2 laptop berdampingan, baris yang beda nilai otomatis di-highlight |
| 🔗 **Product Sharing** | Simpan sebagai gambar, salin info produk, atau salin link — siap dibagikan ke WhatsApp |
| 💬 **Contact via WhatsApp** | Semua funnel (bukan checkout online) berakhir di deep link `wa.me` dengan pesan otomatis berisi konteks produk |
| 🔎 **SEO-first** | Metadata dinamis, Open Graph image per halaman, JSON-LD `Product` schema, sitemap & robots otomatis |

## 🖼️ Screenshot

<!-- TODO: ganti dengan screenshot asli setelah deploy -->
<div align="center">
  <em>Screenshot menyusul setelah deploy — lihat <a href="#-menjalankan-secara-lokal">Menjalankan secara lokal</a> untuk preview sendiri.</em>
</div>

## 🛠️ Tech Stack

- **[Next.js](https://nextjs.org)** (App Router) — routing file-based, SEO & Open Graph per halaman, image generation lewat `next/og`
- **[Zustand](https://zustand.docs.pmnd.rs)** — state store ringan per-domain (catalog, compare, finder)
- **[Tailwind CSS](https://tailwindcss.com)** — styling dengan token warna & font custom (lihat `src/app/globals.css`)
- **Repository pattern** — semua data (laptop, guide, info toko) diakses lewat satu lapisan abstraksi (`lib/data/repository.ts`), sekarang diimplementasikan dengan JSON lokal. Migrasi ke [Supabase](https://supabase.com) tidak perlu ubah komponen/store — cukup ganti implementasi repository. Panduan lengkap + skema SQL + kode siap pakai: [`SUPABASE.md`](./SUPABASE.md).
- **Satu store** — semua state client (katalog, compare, Smart Finder) ada di `useStore` (`src/store/index.ts`, dibagi jadi slice di `src/store/slices/`). Halaman server (home, detail, guide, sitemap, OG image) memanggil repository langsung karena Zustand hanya untuk client component.

> Detail lengkap keputusan arsitektur ada di [`perencanaan-toko-laptop-bekas.md`](./perencanaan-toko-laptop-bekas.md).

## 🚀 Menjalankan secara lokal

```bash
git clone <url-repo-ini>
cd excebymn-laptop-store
npm install
cp .env.example .env.local   # opsional, override URL & popup prototype
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## 📁 Struktur Proyek

```
src/
  app/                # Route (App Router) — tiap halaman + metadata/OG-nya
    laptops/[slug]/    # Product Detail
    finder/            # Smart Finder
    compare/           # Compare
    guide/[slug]/      # Guide Detail
  components/          # Komponen UI, satu folder per komponen
  lib/
    data/              # Repository pattern: types, interface, implementasi mock
      mock/            # Data dummy (laptops.json, guides.json, store-info.json)
    scoring/           # Logic scoring Smart Finder
  store/               # Zustand store (catalog, compare, finder)
```

## ⚙️ Environment Variables

| Variable | Default | Keterangan |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://excebymn.id` | Dipakai untuk `metadataBase`, canonical URL, sitemap, dan Open Graph. Wajib diganti ke domain final saat deploy. |
| `NEXT_PUBLIC_SHOW_PROTOTYPE_NOTICE` | `true` | Toggle popup "Ini masih prototype". Set `false` begitu situs resmi diserahkan ke klien. |

Lihat [`.env.example`](./.env.example).

## ☁️ Deploy

Repo ini siap deploy ke [Vercel](https://vercel.com) tanpa konfigurasi tambahan — lihat panduan lengkap di [`DEPLOY.md`](./DEPLOY.md) (termasuk daftar environment variables & checklist setelah deploy).

## 📌 Status Data

Data toko (nama, nomor WhatsApp, alamat, jam operasional) ada di `src/lib/data/mock/store-info.json` (dibaca lewat `storeInfoRepository`) — masih data contoh, ganti dengan data asli sebelum go-live untuk klien. Katalog laptop & artikel guide juga masih dummy (`src/lib/data/mock/laptops.json`, `guides.json`) sampai terhubung ke Supabase.

## 📄 Lisensi

Proyek ini adalah karya showcase milik **Excebymn**. Hubungi lewat [Instagram](https://instagram.com/excebymn) atau [TikTok](https://tiktok.com/@excebymn) kalau tertarik desain/fitur ini dijadikan website toko kamu sendiri.
