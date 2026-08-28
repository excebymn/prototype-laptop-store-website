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
