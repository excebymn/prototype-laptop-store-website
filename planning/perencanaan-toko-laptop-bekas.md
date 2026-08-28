# 💻 Perencanaan Website Toko Laptop Bekas (Like New)

> **Status: FINAL** — siap dipakai sebagai acuan pengerjaan. Lihat file terpisah `langkah-pengerjaan-toko-laptop-bekas.md` untuk urutan eksekusinya.

## 1. Ringkasan & Filosofi Produk

Website ini bukan sekadar katalog jual-beli, tapi **platform discovery & guidance** untuk laptop bekas berkualitas. Tiga pilar utama:

- **Discovery** — Smart Finder membantu user menemukan laptop tanpa harus paham spesifikasi teknis
- **Education** — Guide/Buying Guide membangun trust dan mengedukasi sebelum keputusan beli
- **Conversion tanpa checkout** — semua funnel berakhir di kontak admin (WhatsApp), bukan transaksi online

Prinsip desain data: **semua sumber data (laptop, guide, dsb) diakses lewat satu lapisan abstraksi (repository), bukan langsung dari komponen.** Ini supaya saat backend/API asli tersedia, kita cukup ganti implementasi repository — komponen dan store tidak perlu diubah sama sekali.

---

## 2. Rekomendasi Tech Stack

Berdasarkan pengalamanmu di React, Vue, Vite, dan Next.js, berikut rekomendasi dengan alasannya:

| Aspek | Rekomendasi | Alasan |
|---|---|---|
| Framework | **Next.js (App Router)** | Halaman produk (`/laptops/[slug]`) butuh SEO & shareable link yang baik (fitur Product Sharing = orang lain buka link dari WhatsApp). Next.js juga punya routing file-based yang cocok dengan struktur halaman yang sudah kamu rancang. |
| State/store | **Zustand** | Ringan, tidak perlu boilerplate seperti Redux, cocok untuk store per-domain (catalog, compare, finder). Mudah dipisah dari data-fetching, sehingga swap ke API nanti gampang. |
| Data layer sekarang | **Dummy JSON lokal**, diakses lewat repository interface | Struktur kode sudah siap untuk pindah ke **Supabase** nanti — tinggal buat `SupabaseLaptopRepository` yang implement interface yang sama |
| Styling | **Tailwind** (+ shadcn/ui kalau membantu) | Standar untuk stack React |
| Gambar produk | Folder `public/` lokal dulu | Cukup untuk tahap prototype/awal klien |
| Manajemen data ke depan | **Supabase**, ditambahkan setelah dapat klien nyata, menyesuaikan kebutuhan klien | Tidak perlu dashboard admin custom untuk sekarang — cukup rencanakan struktur data supaya kompatibel dengan tabel Supabase nanti |

> Kalau kamu maunya tetap Vite biasa (bukan Next.js) karena tidak butuh SEO/SSR, seluruh arsitektur di bawah ini tetap valid — hanya bagian routing (`app/`) yang diganti React Router. Tinggal bilang kalau mau versi itu.

---

## 3. Arsitektur Data & Store (Repository Pattern)

Ini jawaban langsung untuk kebutuhan "biar nanti gampang pakai API".

```
src/
  lib/
    data/
      types.ts                 // semua interface/type data
      repository.ts            // interface abstrak (kontrak)
      mock-repository.ts        // implementasi pakai JSON lokal
      api-repository.ts         // (nanti) implementasi pakai fetch/API
      index.ts                  // export instance repository yang aktif
      mock/
        laptops.json
        guides.json
    scoring/
      finder-score.ts           // logic rule-based scoring Smart Finder
  store/
    useLaptopStore.ts           // state katalog: list, filter, sort
    useCompareStore.ts          // state 2 laptop yang dibandingkan
    useFinderStore.ts           // state jawaban Smart Finder + hasil
  components/
    laptop-card/
      index.tsx
    smart-finder/
      index.tsx
    compare-table/
      index.tsx
    ...
  app/
    page.tsx                    // Home
    laptops/page.tsx            // Catalog
    laptops/[slug]/page.tsx     // Product Detail
    finder/page.tsx
    compare/page.tsx
    guide/page.tsx
    guide/[slug]/page.tsx
    about/page.tsx
    contact/page.tsx
```

**Konsep kuncinya (`repository.ts`):**

```typescript
// lib/data/repository.ts
export interface LaptopRepository {
  getAll(filters?: LaptopFilters): Promise<Laptop[]>;
  getBySlug(slug: string): Promise<Laptop | null>;
  getFeatured(): Promise<Laptop[]>;
}

// lib/data/mock-repository.ts
export class MockLaptopRepository implements LaptopRepository {
  async getAll(filters?: LaptopFilters) {
    // baca dari mock/laptops.json, filter di memory
  }
  // ...
}

// lib/data/index.ts
export const laptopRepository: LaptopRepository = new MockLaptopRepository();
// nanti tinggal ganti jadi: new ApiLaptopRepository(baseUrl)
```

Store (Zustand) **tidak pernah tahu** dari mana data berasal — store hanya memanggil `laptopRepository`, jadi ganti sumber data = ganti satu baris di `index.ts`.

```typescript
// store/useLaptopStore.ts
import { laptopRepository } from '@/lib/data';

interface LaptopStore {
  laptops: Laptop[];
  isLoading: boolean;
  filters: LaptopFilters;
  fetchLaptops: () => Promise<void>;
  setFilters: (filters: Partial<LaptopFilters>) => void;
}
```

Pola yang sama dipakai untuk `GuideRepository` (artikel Guide/Buying Guide).

---

## 4. Skema Data Model

```typescript
// lib/data/types.ts

export type Condition = 'like-new' | 'qc-tested' | 'ready-to-use';
export type Category = 'business' | 'gaming' | 'programming' | 'school' | 'creative' | 'everyday';

export interface LaptopSpecs {
  cpu: string;
  gpu: string;
  ramGb: number;
  storageGb: number;
  storageType: 'SSD' | 'HDD';
  display: string;
  battery: string;
  connectivity: string[];
  os: string;
  weightKg: number;
}

export interface Laptop {
  id: string;
  slug: string;              // /laptops/lenovo-thinkpad-t14-gen-2
  name: string;
  brand: string;
  price: number;
  condition: Condition;
  categories: Category[];
  specs: LaptopSpecs;
  images: string[];
  description: string;
  whatsIncluded: string[];
  isAvailable: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export interface LaptopFilters {
  brand?: string[];
  priceMin?: number;
  priceMax?: number;
  category?: Category[];
  ramMin?: number;
  storageMin?: number;
  availableOnly?: boolean;
  sortBy?: 'recommended' | 'price-asc' | 'price-desc' | 'newest';
}

export interface GuideArticle {
  id: string;
  slug: string;
  title: string;
  category: 'kebutuhan' | 'hardware' | 'buying-guide';
  excerpt: string;
  content: string;
  publishedAt: string;
}
```

---

## 5. Detail Halaman (Dikembangkan)

### 5.1 Home (`/`)
- Hero: headline, deskripsi singkat, CTA "Explore Laptops" + "Smart Finder"
- Featured Laptops: ambil dari `laptopRepository.getFeatured()`
- Smart Finder teaser: shortcut "Browse by Need" (6 kategori)
- Compare teaser
- CTA akhir

### 5.2 Laptop Catalog (`/laptops`)
- Filter di sidebar/drawer (mobile), state disimpan di `useLaptopStore`
- Filter & sort **sinkron dengan query string** (`?brand=asus&sort=price-asc`) supaya link bisa dibagikan dan browser back/forward tetap benar
- Pagination atau infinite scroll (perlu diputuskan — lihat bagian 8)

### 5.3 Smart Finder (`/finder`)
- Multi-step form (semua step **skippable**), state di `useFinderStore`
- Setelah submit → hitung skor via `lib/scoring/finder-score.ts` → tampilkan hasil dengan match percentage & alasan cocok
- Detail algoritma di bagian 6

### 5.4 Product Detail (`/laptops/[slug]`)
- Ambil data via `laptopRepository.getBySlug(slug)`
- Section: gallery, key specs, full specs, description, what's included
- Action: "Hubungi Admin" → generate link WhatsApp otomatis (`wa.me/...`) berisi nama produk + link, biar admin langsung tahu konteks chat
- Product Sharing (lihat 5.6)

### 5.5 Compare (`/compare`)
- State 2 slot laptop di `useCompareStore` (bisa diisi dari Product Card, Product Detail, atau Navbar)
- Tabel highlight otomatis baris yang beda nilainya

### 5.6 Product Sharing (bagian dari Product Detail)
- **Save as Image**: generate kartu produk (bisa pakai `html-to-image` atau render ke `<canvas>`)
- **Copy Information**: generate teks siap kirim dari data `Laptop` (template string)
- **Copy Link**: `navigator.clipboard.writeText(slugUrl)`

### 5.7 Guide (`/guide`, `/guide/[slug]`)
- List artikel dikelompokkan per kategori (Kebutuhan / Hardware / Buying Guide)
- Diambil lewat `GuideRepository`, pola sama seperti laptop

### 5.8 About (`/about`) & Contact (`/contact`)
- Konten statis dulu (belum butuh repository), tapi tetap taruh di `lib/data/mock/store-info.json` supaya konsisten kalau nanti mau dibuat dinamis dari CMS

---

## 5.9 SEO & Metadata

Supaya website ini bisa ditemukan lewat Google (bukan cuma diakses lewat link WhatsApp), setiap halaman butuh metadata yang benar. Next.js App Router punya API bawaan untuk ini (`generateMetadata` per route), jadi tidak perlu library tambahan.

**Yang perlu disiapkan per halaman:**
- `title` & `description` unik per halaman (khusus Product Detail & Guide: generate dinamis dari data, misal `"${laptop.name} - Rp${laptop.price} | Toko Laptop Bekas"`)
- **Open Graph tags** (`og:title`, `og:description`, `og:image`) — penting karena fitur Product Sharing (§5.6) akan sering di-share link-nya ke WhatsApp, dan WhatsApp/medsos pakai OG tags untuk preview link
- **Canonical URL** — terutama untuk Catalog yang punya banyak variasi query string filter, supaya Google tidak anggap itu halaman duplikat
- **Structured data (JSON-LD)** — schema `Product` untuk Product Detail (harga, kondisi, ketersediaan) supaya bisa muncul sebagai rich result di Google
- `sitemap.xml` — generate otomatis dari semua slug laptop & guide yang tersedia (`app/sitemap.ts`)
- `robots.txt` — allow semua halaman publik, disallow kalau nanti ada rute admin

---

## 6. Smart Finder — Algoritma Scoring

```typescript
// lib/scoring/finder-score.ts
function scoreLaptop(laptop: Laptop, answers: FinderAnswers): number {
  let score = 0;
  if (answers.budget && isWithinBudget(laptop.price, answers.budget)) score += 30;
  if (answers.ramMin && laptop.specs.ramGb >= answers.ramMin) score += 20;
  if (answers.storageMin && laptop.specs.storageGb >= answers.storageMin) score += 15;
  if (answers.purpose && laptop.categories.includes(answers.purpose)) score += 20;
  if (answers.brand && laptop.brand === answers.brand) score += 10;
  // preferensi tambahan (performa/mobilitas/layar) +5, bisa dikembangkan
  return score;
}
```

Hasil diurutkan berdasarkan skor, ditampilkan sebagai `matchPercentage = score / maxPossibleScore * 100`. Setiap kriteria yang cocok dicatat sebagai "alasan cocok" untuk ditampilkan ke user (misal: "✓ Sesuai budget", "✓ RAM 16GB").

---

## 7. Navigasi & Struktur URL

```
/                      Home
/laptops               Catalog
/laptops/[slug]        Product Detail
/finder                Smart Finder
/compare               Compare
/guide                 Guide index
/guide/[slug]          Guide detail
/about                 About
/contact               Contact
```

Navbar: Home · Laptops · Finder · Compare · Guide · About · Contact — dengan CTA menonjol "✨ Cari Laptop Saya" mengarah ke `/finder`.

---

## 8. Keputusan Final

| Keputusan | Hasil |
|---|---|
| Framework | Next.js (App Router) — bisa diganti Vite+React Router kalau SEO tidak jadi prioritas |
| Store | Zustand |
| Data sekarang | Dummy JSON lokal via repository pattern |
| Data masa depan | Supabase (ditambahkan setelah dapat klien nyata, menyesuaikan kebutuhan klien — struktur data di repository sudah dirancang supaya kompatibel) |
| Styling | Tailwind (+ shadcn/ui opsional) |
| Gambar produk | Folder `public/` lokal |
| Admin dashboard | Tidak dibuat di fase ini |
| Bahasa | UI penuh Bahasa Indonesia, kode (variabel/komponen/comment) Bahasa Inggris |

### Item minor yang masih boleh diputuskan sambil jalan (tidak menghambat mulai coding)
1. **Pagination vs infinite scroll** di Catalog — default: pagination sederhana dulu, gampang di-upgrade
2. **Multi-cabang**: taruh di Contact + Footer dulu (sesuai draft awal), baru bikin `/locations` kalau cabang bertambah

---

## 9. Ringkasan Perubahan dari Draft Awal

- Menambahkan lapisan **repository pattern** untuk data (permintaan utama kamu)
- Menambahkan **skema data model** konkret (TypeScript types)
- Menambahkan **struktur folder** mengikuti konvensi kamu (`@/` alias, folder modular dengan `index.tsx`)
- Menjabarkan **algoritma scoring** Smart Finder secara konkret
- Menambahkan detail teknis kecil per halaman (query string sync, WhatsApp deep link, dsb)
- Semua UI tetap direncanakan penuh Bahasa Indonesia
