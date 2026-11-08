// Base URL situs, dipakai untuk `metadataBase`, canonical URL, sitemap, dan
// robots.txt. Ambil dari env var supaya gampang diganti per environment
// (dev/staging/prod) tanpa ubah kode — tinggal set `NEXT_PUBLIC_SITE_URL`
// di `.env.local` / dashboard hosting.
//
// TODO: ganti fallback di bawah ini ke domain asli begitu sudah punya,
// atau (lebih baik) set NEXT_PUBLIC_SITE_URL di environment production.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://excebymn.id";

// Toggle untuk popup "Ini masih prototype" (lihat `components/prototype-notice`).
// Situs ini dipakai Excebymn sebagai showcase untuk calon klien — begitu
// sebuah build benar-benar diserahkan/dijual ke klien, set env var
// `NEXT_PUBLIC_SHOW_PROTOTYPE_NOTICE=false` di dashboard hosting (Vercel)
// supaya popup hilang tanpa perlu hapus komponennya dari kode.
export const SHOW_PROTOTYPE_NOTICE = process.env.NEXT_PUBLIC_SHOW_PROTOTYPE_NOTICE !== "false";

// Kontak utama situs ini untuk sementara cuma Instagram (belum WhatsApp) —
// supaya nomor WA tidak tersebar dulu. `INSTAGRAM_PROFILE_URL` dipakai
// sebagai fallback kalau `storeInfo.socialMedia.instagram` (field opsional)
// kosong. `instagramMessageLink` mengubah URL profil Instagram jadi link
// yang langsung buka jendela chat/DM di Instagram (`ig.me/m/<username>`),
// bukan cuma halaman profil.
export const INSTAGRAM_PROFILE_URL = "https://instagram.com/excebymn";

export function instagramMessageLink(profileUrl: string): string {
  const handle = profileUrl.replace(/\/+$/, "").split("/").pop() ?? "";
  return `https://ig.me/m/${handle}`;
}

// ---------------------------------------------------------------------------
// Slot aset visual — isi saat asetnya sudah ada, tanpa ubah komponen.
// Lihat public/images/README.md untuk ukuran & format yang disarankan.
// ---------------------------------------------------------------------------

/** Path logo, mis. "/images/logo.png" (taruh file di public/images/). `null` = pakai monogram sementara. */
export const LOGO_SRC: string | null = null;

/** Foto hero beranda, mis. "/images/hero.jpg". `null` = pakai ilustrasi laptop sementara. */
export const HERO_IMAGE_SRC: string | null = null;

/** Ubah ke `true` setelah foto produk (path di laptops.json `images`) benar-benar ada di public/. */
export const PRODUCT_PHOTOS_READY = false;

/** Teks garansi toko yang tampil di badge & strip keunggulan. */
export const WARRANTY_TEXT = "Garansi Toko 1 Bulan";

/**
 * Link chat WhatsApp. NOTE: nomor di store-info.json masih placeholder —
 * ganti dengan nomor asli sebelum situs dipublikasikan.
 */
export function whatsappLink(number: string, text?: string): string {
  const base = `https://wa.me/${number}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** Link pencarian Google Maps untuk sebuah alamat. */
export function mapsLink(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
