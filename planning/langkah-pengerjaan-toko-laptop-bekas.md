# 🛠️ Langkah Pengerjaan — Toko Laptop Bekas

> Acuan: `perencanaan-toko-laptop-bekas.md` (status: FINAL). Setiap bagian di bawah merujuk ke nomor bagian di file itu.
> Cara pakai: kirim kedua file ini ke AI, lalu prompt seperti *"aku mau ngerjain bagian 3: Store & Repository"*.

---

## Bagian 0 — Setup Project
Ref: Perencanaan §2, §3

- [ ] Init project Next.js (App Router) + TypeScript + Tailwind
- [ ] Setup alias `@/` di `tsconfig.json`
- [ ] Install dependency inti: `zustand`
- [ ] (Opsional) Install `shadcn/ui` kalau mau dipakai
- [ ] Buat struktur folder dasar sesuai §3: `lib/data`, `lib/scoring`, `store`, `components`, `app`
- [ ] Setup ESLint/Prettier dasar

**Output:** project kosong yang bisa `npm run dev`, struktur folder sudah sesuai rencana.

---

## Bagian 1 — Data Layer & Repository Pattern
Ref: Perencanaan §3, §4

- [ ] Buat `lib/data/types.ts` — semua interface (`Laptop`, `LaptopSpecs`, `LaptopFilters`, `GuideArticle`, dst)
- [ ] Buat dummy data `lib/data/mock/laptops.json` (minimal 8–10 laptop dengan variasi brand/kategori/harga supaya filter & finder bisa dites)
- [ ] Buat dummy data `lib/data/mock/guides.json` (beberapa artikel contoh)
- [ ] Buat `lib/data/repository.ts` — interface `LaptopRepository` & `GuideRepository`
- [ ] Buat `lib/data/mock-repository.ts` — implementasi pakai JSON di atas
- [ ] Buat `lib/data/index.ts` — export instance repository aktif
- [ ] Test manual: import repository, panggil `getAll()`/`getBySlug()`, pastikan hasil sesuai

**Output:** lapisan data yang independen dari UI, siap dipanggil dari store.

---

## Bagian 2 — Store (Zustand)
Ref: Perencanaan §3

- [ ] `store/useLaptopStore.ts` — state katalog: `laptops`, `isLoading`, `filters`, `fetchLaptops()`, `setFilters()`
- [ ] `store/useCompareStore.ts` — state 2 slot laptop yang dibandingkan
- [ ] `store/useFinderStore.ts` — state jawaban Smart Finder + hasil rekomendasi
- [ ] Pastikan semua store memanggil lewat `laptopRepository`/`guideRepository`, tidak pernah import JSON langsung

**Output:** store siap dipakai komponen, tidak ada komponen yang akses data mentah.

---

## Bagian 3 — Layout & Navigasi
Ref: Perencanaan §7

- [ ] `app/layout.tsx` — root layout, font, metadata dasar
- [ ] Komponen `components/navbar/index.tsx` — menu: Home · Laptops · Finder · Compare · Guide · About · Contact + CTA "✨ Cari Laptop Saya"
- [ ] Komponen `components/footer/index.tsx` — kontak, social media, jam operasional
- [ ] Responsive: navbar jadi hamburger menu di mobile

**Output:** kerangka layout terpasang di semua halaman.

---

## Bagian 4 — Home
Ref: Perencanaan §5.1

- [ ] Section Hero (headline, deskripsi, 2 CTA)
- [ ] Section Featured Laptops (ambil dari `getFeatured()`, render `LaptopCard`)
- [ ] Section Smart Finder teaser ("Browse by Need" 6 kategori)
- [ ] Section Compare teaser
- [ ] CTA akhir (Explore Laptops / Contact Admin)

**Output:** halaman `/` selesai dan fungsional (kecuali komponen yang belum dibuat, pakai placeholder).

---

## Bagian 5 — Komponen `LaptopCard` & Laptop Catalog
Ref: Perencanaan §5.2

- [ ] `components/laptop-card/index.tsx` — foto, brand, nama, processor, RAM, storage, harga, badge kondisi, tombol detail, opsi compare
- [ ] `app/laptops/page.tsx` — grid katalog
- [ ] Filter sidebar/drawer: brand, harga, kategori, RAM, storage, availability
- [ ] Sort: recommended / harga termurah / harga tertinggi / terbaru
- [ ] Sinkronkan filter & sort ke query string URL
- [ ] Pagination sederhana

**Output:** halaman `/laptops` dengan filter & sort berfungsi penuh dari `useLaptopStore`.

---

## Bagian 6 — Product Detail
Ref: Perencanaan §5.4

- [ ] `app/laptops/[slug]/page.tsx`
- [ ] Ambil data via `getBySlug(slug)`, handle kondisi 404 kalau slug tidak ada
- [ ] Section: gallery, badge kondisi, key specs, full specs, description, what's included
- [ ] Tombol "Hubungi Admin" → generate link `wa.me/...` otomatis berisi nama produk + link halaman

**Output:** halaman detail per laptop lengkap dan bisa diakses via slug.

---

## Bagian 7 — Smart Finder
Ref: Perencanaan §5.3, §6

- [ ] `lib/scoring/finder-score.ts` — fungsi `scoreLaptop()` sesuai algoritma di §6
- [ ] `components/smart-finder/index.tsx` — multi-step form (semua step skippable)
- [ ] `app/finder/page.tsx` — hubungkan form ke `useFinderStore`, hitung skor, tampilkan hasil dengan match percentage & alasan cocok

**Output:** fitur pembeda utama website berfungsi end-to-end.

---

## Bagian 8 — Compare
Ref: Perencanaan §5.5

- [ ] `components/compare-table/index.tsx` — tabel highlight otomatis baris yang beda
- [ ] `app/compare/page.tsx`
- [ ] Tombol "tambah ke compare" terpasang di `LaptopCard` dan Product Detail, terhubung ke `useCompareStore`

**Output:** user bisa pilih 2 laptop dari mana saja lalu bandingkan.

---

## Bagian 9 — Product Sharing
Ref: Perencanaan §5.6

- [ ] Save as Image — generate kartu produk (`html-to-image` atau canvas)
- [ ] Copy Information — template string siap kirim dari data `Laptop`
- [ ] Copy Link — `navigator.clipboard.writeText()`
- [ ] Pasang ketiga aksi ini di Product Detail

**Output:** user bisa share laptop ke orang lain tanpa harus ketik manual.

---

## Bagian 10 — Guide / Buying Guide
Ref: Perencanaan §5.7

- [ ] `app/guide/page.tsx` — list artikel dikelompokkan per kategori (Kebutuhan / Hardware / Buying Guide)
- [ ] `app/guide/[slug]/page.tsx` — detail artikel
- [ ] Isi minimal 3–5 artikel dummy per kategori sesuai daftar topik di draft awal

**Output:** bagian edukasi selesai, siap diisi konten asli nanti.

---

## Bagian 11 — About & Contact
Ref: Perencanaan §5.8

- [ ] `app/about/page.tsx` — konten dari `lib/data/mock/store-info.json`
- [ ] `app/contact/page.tsx` — WhatsApp, telepon, email, social media, jam operasional, alamat
- [ ] Jika hanya 1 cabang: cukup di Contact + Footer (sesuai keputusan §8)

**Output:** dua halaman trust-building selesai.

---

## Bagian 12 — SEO & Metadata
Ref: Perencanaan §5.9

- [ ] Setup `generateMetadata` dasar di `app/layout.tsx` (title template, default description)
- [ ] `generateMetadata` per halaman statis: Home, Catalog, Finder, Compare, Guide index, About, Contact
- [ ] `generateMetadata` dinamis di `app/laptops/[slug]/page.tsx` — title & description dari data laptop
- [ ] `generateMetadata` dinamis di `app/guide/[slug]/page.tsx` — title & description dari data artikel
- [ ] Pasang Open Graph tags (`og:title`, `og:description`, `og:image`) di semua halaman, terutama Product Detail (dipakai saat link di-share via WhatsApp)
- [ ] Tambahkan canonical URL, khusus untuk Catalog dengan query string filter
- [ ] Tambahkan JSON-LD schema `Product` di Product Detail
- [ ] Buat `app/sitemap.ts` — generate otomatis dari semua slug laptop & guide
- [ ] Buat `app/robots.ts` / `public/robots.txt`
- [ ] Cek hasil pakai Google Rich Results Test & Facebook Sharing Debugger (untuk validasi OG image)

**Output:** website siap di-index Google dengan benar, dan preview link rapi saat di-share ke WhatsApp/medsos.

---

## Bagian 13 — Polish & QA
- [ ] Cek responsive semua halaman (mobile-first, karena banyak user akan share via WhatsApp di HP)
- [ ] Cek semua teks UI sudah Bahasa Indonesia
- [ ] Cek loading state & empty state (misal: hasil Smart Finder kosong, hasil filter kosong)
- [ ] Cek aksesibilitas dasar (alt text gambar, kontras warna)
- [ ] Review ulang seluruh flow di Perencanaan §7 (User Journey) — pastikan tidak ada dead-end

---

## Bagian 14 — (Nanti) Migrasi ke Supabase
Ref: Perencanaan §2, §8 — dikerjakan setelah dapat klien nyata

- [ ] Desain skema tabel Supabase mengikuti `types.ts` yang sudah ada
- [ ] Buat `lib/data/supabase-repository.ts` implement interface `LaptopRepository`/`GuideRepository` yang sama
- [ ] Ganti satu baris di `lib/data/index.ts` untuk switch dari mock ke Supabase
- [ ] (Kalau klien butuh) baru pertimbangkan dashboard admin CRUD

**Output:** pindah dari dummy data ke data real tanpa mengubah store atau komponen sama sekali.
