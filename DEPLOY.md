# Deploy ke Vercel

Proyek ini adalah Next.js standar (App Router) — Vercel mendeteksi semuanya
otomatis, tidak perlu konfigurasi build khusus.

## 1. Push ke Git

```bash
git init                 # kalau belum
git add .
git commit -m "Prototype Excebymn — siap deploy"
git branch -M main
git remote add origin <url-repo-kamu>
git push -u origin main
```

## 2. Import project di Vercel

1. Buka [vercel.com/new](https://vercel.com/new), pilih repo ini.
2. Framework Preset: **Next.js** (otomatis terdeteksi).
3. Build Command & Output Directory: biarkan default.

## 3. Set Environment Variables

Di **Project Settings → Environment Variables**, tambahkan:

| Key | Value | Keterangan |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://<domain-final-kamu>` | Wajib diisi domain asli (custom domain atau `*.vercel.app`), dipakai untuk sitemap, canonical URL, dan preview link Open Graph saat di-share ke WhatsApp. |
| `NEXT_PUBLIC_SHOW_PROTOTYPE_NOTICE` | `true` (demo) / `false` (situs sudah milik klien) | Kontrol popup "Ini masih prototype". Lihat bagian di bawah. |

Setelah set env var, klik **Deploy**. Kalau env var diubah setelah deploy pertama, perlu **Redeploy** manual (env var tidak otomatis re-apply ke build lama).

## 4. Custom domain (opsional)

Di **Project Settings → Domains**, tambahkan domain kamu (mis. `excebymn.id`), lalu update `NEXT_PUBLIC_SITE_URL` supaya cocok, dan redeploy.

## 5. Setelah deploy: cek checklist ini

- [ ] Buka `/sitemap.xml` dan `/robots.txt` — pastikan URL di dalamnya pakai domain final, bukan `localhost`.
- [ ] Cek preview link WhatsApp/medsos dengan paste URL situs ke chat — gambar & judul harus muncul (ini butuh domain yang bisa diakses publik, tidak bisa dites di `localhost`).
- [ ] Test tombol "Hubungi Admin" di halaman produk & popup prototype — pastikan nomor WhatsApp di `src/lib/data/mock/store-info.json` sudah nomor asli, bukan contoh.

## Soal popup "Ini masih prototype"

Popup ini (`src/components/prototype-notice`) dipasang supaya kalau link situs ini disebar sebagai portofolio/demo, orang yang buka tahu ini contoh kerjaan Excebymn dan bisa diarahkan untuk menghubungi kalau tertarik desain ini dijadikan situs mereka.

Begitu ada klien nyata yang pakai/beli build ini:
- Set `NEXT_PUBLIC_SHOW_PROTOTYPE_NOTICE=false` di environment variable Vercel project itu, lalu redeploy.
- Tidak perlu hapus komponen atau ubah kode apa pun — flag ini yang menyembunyikannya.
