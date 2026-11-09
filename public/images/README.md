# Slot aset visual

Taruh file di folder `public/images/`, lalu ubah konstanta di `src/lib/site.ts`.

| Aset | Konstanta | Saran |
| --- | --- | --- |
| Foto hero | `HERO_IMAGE_SRC = "/images/hero.jpg"` | Landscape ≥1600×1000. Subjek di sisi **kanan**; sisi kiri dipudarkan putih untuk teks. Contoh: laptop di meja kerja, atau foto toko. |
| Foto produk | `PRODUCT_PHOTOS_READY = true` | Satu foto bersih per laptop di `public/images/laptops/<slug>-1.jpg` (lihat `laptops/README.md`). Tanpa teks/watermark di gambar — spesifikasi & garansi sudah dirender oleh situs. |

Selama konstanta masih `null`/`false`, situs memakai monogram dan ilustrasi laptop sementara.

Logo sudah terpasang sebagai komponen (`src/components/logo/mark.tsx`); file aslinya ada di `public/images/logo.svg`. Ganti path-nya di `mark.tsx` kalau logo berubah.
