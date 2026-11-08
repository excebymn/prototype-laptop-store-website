// Shared data model types for the laptop store.
// These types are the contract between the repository layer and everything
// that consumes it (store, components, pages). Keep this file framework-agnostic
// so it stays valid when the data source moves from mock JSON to a real API.

export type Condition = "like-new" | "qc-tested" | "ready-to-use";

export type Category = "business" | "gaming" | "programming" | "school" | "creative" | "everyday";

export interface LaptopSpecs {
  cpu: string;
  gpu: string;
  ramGb: number;
  storageGb: number;
  storageType: "SSD" | "HDD";
  display: string;
  battery: string;
  connectivity: string[];
  os: string;
  weightKg: number;
}

export interface Laptop {
  id: string;
  slug: string;
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
  sortBy?: "recommended" | "price-asc" | "price-desc" | "newest";
}

export type GuideCategory = "kebutuhan" | "hardware" | "buying-guide";

export interface GuideArticle {
  id: string;
  slug: string;
  title: string;
  category: GuideCategory;
  excerpt: string;
  content: string;
  publishedAt: string;
}

// Smart Finder — jawaban user & hasil rekomendasi.
// Semua field opsional karena setiap step di form Smart Finder bisa di-skip.
// Bentuk skor/scoring-nya sendiri baru diimplementasikan di Bagian 7
// (lib/scoring/finder-score.ts).

export interface FinderAnswers {
  budget?: number;
  ramMin?: number;
  storageMin?: number;
  purpose?: Category;
  brand?: string;
}

export interface FinderResult {
  laptop: Laptop;
  score: number;
  matchPercentage: number;
  reasons: string[];
}

// Data toko — dibaca lewat `storeInfoRepository` (satu baris/dokumen di
// database nanti), bukan import JSON langsung.

export interface StoreOperatingHours {
  days: string;
  hours: string;
}

export interface StoreBranch {
  id: string;
  /** Nama singkat area/jalan, mis. "Kutai". */
  name: string;
  city: string;
  address: string;
  /** Jam kerja dalam satu teks, mis. "Senin – Minggu, 11.00 – 19.00". */
  hours: string;
  /** Cabang pusat/utama — ditampilkan lebih menonjol. */
  isMain?: boolean;
}

export interface StoreInfo {
  storeName: string;
  tagline: string;
  whatsapp: string;
  phone: string;
  email: string;
  address: string;
  operatingHours: StoreOperatingHours[];
  branches: StoreBranch[];
  socialMedia: {
    instagram?: string;
    tiktok?: string;
    facebook?: string;
  };
}
