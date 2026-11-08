# Sambung ke Supabase

Seluruh aplikasi hanya bicara ke data lewat **`src/lib/data/repository.ts`**.
Pindah ke Supabase = 3 langkah, tanpa menyentuh komponen, halaman, atau store.

```
Komponen client ──► useStore (src/store) ──┐
                                           ├──► repository (src/lib/data) ──► Supabase
Halaman server  ───────────────────────────┘
```

## 1. Install & env

```bash
npm i @supabase/supabase-js
```

`.env.local` (dan Environment Variables di Vercel):

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

## 2. Skema tabel (SQL Editor Supabase)

```sql
create table laptops (
  id            text primary key,
  slug          text unique not null,
  name          text not null,
  brand         text not null,
  price         bigint not null,
  condition     text not null check (condition in ('like-new','qc-tested','ready-to-use')),
  categories    text[] not null default '{}',
  cpu           text not null,
  gpu           text not null,
  ram_gb        int  not null,
  storage_gb    int  not null,
  storage_type  text not null check (storage_type in ('SSD','HDD')),
  display       text not null,
  battery       text not null,
  connectivity  text[] not null default '{}',
  os            text not null,
  weight_kg     numeric not null,
  images        text[] not null default '{}',
  description   text not null default '',
  whats_included text[] not null default '{}',
  is_available  boolean not null default true,
  is_featured   boolean not null default false,
  created_at    timestamptz not null default now()
);

create table guides (
  id           text primary key,
  slug         text unique not null,
  title        text not null,
  category     text not null check (category in ('kebutuhan','hardware','buying-guide')),
  excerpt      text not null,
  content      text not null,
  published_at timestamptz not null default now()
);

-- Satu baris saja (id selalu 1).
create table store_info (
  id              int primary key default 1 check (id = 1),
  store_name      text not null,
  tagline         text not null,
  whatsapp        text not null,
  phone           text not null,
  email           text not null,
  address         text not null,
  operating_hours jsonb not null default '[]',   -- [{ "days": "...", "hours": "..." }]
  social_media    jsonb not null default '{}'    -- { "instagram": "...", ... }
);

-- Publik hanya boleh BACA. Tulis lewat dashboard Supabase / service role.
alter table laptops    enable row level security;
alter table guides     enable row level security;
alter table store_info enable row level security;
create policy "public read" on laptops    for select using (true);
create policy "public read" on guides     for select using (true);
create policy "public read" on store_info for select using (true);
```

Data awal: import `src/lib/data/mock/*.json` lewat Table Editor, atau buat
script seed sekali jalan (ubah camelCase → snake_case seperti di mapper bawah).

## 3. `src/lib/data/supabase-repository.ts`

```ts
import { createClient } from "@supabase/supabase-js";
import type { GuideRepository, LaptopRepository, StoreInfoRepository } from "./repository";
import type { GuideArticle, Laptop, LaptopFilters, StoreInfo } from "./types";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

// ── Mapper: baris snake_case (DB) → tipe camelCase (aplikasi) ──────────────
/* eslint-disable @typescript-eslint/no-explicit-any */
const toLaptop = (r: any): Laptop => ({
  id: r.id,
  slug: r.slug,
  name: r.name,
  brand: r.brand,
  price: Number(r.price),
  condition: r.condition,
  categories: r.categories,
  specs: {
    cpu: r.cpu,
    gpu: r.gpu,
    ramGb: r.ram_gb,
    storageGb: r.storage_gb,
    storageType: r.storage_type,
    display: r.display,
    battery: r.battery,
    connectivity: r.connectivity,
    os: r.os,
    weightKg: Number(r.weight_kg),
  },
  images: r.images,
  description: r.description,
  whatsIncluded: r.whats_included,
  isAvailable: r.is_available,
  isFeatured: r.is_featured,
  createdAt: r.created_at,
});

const toGuide = (r: any): GuideArticle => ({
  id: r.id,
  slug: r.slug,
  title: r.title,
  category: r.category,
  excerpt: r.excerpt,
  content: r.content,
  publishedAt: r.published_at,
});

const toStoreInfo = (r: any): StoreInfo => ({
  storeName: r.store_name,
  tagline: r.tagline,
  whatsapp: r.whatsapp,
  phone: r.phone,
  email: r.email,
  address: r.address,
  operatingHours: r.operating_hours,
  socialMedia: r.social_media,
});
/* eslint-enable @typescript-eslint/no-explicit-any */

export class SupabaseLaptopRepository implements LaptopRepository {
  async getAll(filters?: LaptopFilters): Promise<Laptop[]> {
    let query = supabase.from("laptops").select("*");

    if (filters?.brand?.length) query = query.in("brand", filters.brand);
    if (filters?.category?.length) query = query.overlaps("categories", filters.category);
    if (filters?.priceMin !== undefined) query = query.gte("price", filters.priceMin);
    if (filters?.priceMax !== undefined) query = query.lte("price", filters.priceMax);
    if (filters?.ramMin !== undefined) query = query.gte("ram_gb", filters.ramMin);
    if (filters?.storageMin !== undefined) query = query.gte("storage_gb", filters.storageMin);
    if (filters?.availableOnly) query = query.eq("is_available", true);

    switch (filters?.sortBy) {
      case "price-asc":
        query = query.order("price", { ascending: true });
        break;
      case "price-desc":
        query = query.order("price", { ascending: false });
        break;
      case "newest":
        query = query.order("created_at", { ascending: false });
        break;
      default: // "recommended": featured dulu, lalu terbaru
        query = query
          .order("is_featured", { ascending: false })
          .order("created_at", { ascending: false });
    }

    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []).map(toLaptop);
  }

  async getBySlug(slug: string): Promise<Laptop | null> {
    const { data, error } = await supabase.from("laptops").select("*").eq("slug", slug).maybeSingle();
    if (error) throw error;
    return data ? toLaptop(data) : null;
  }

  async getFeatured(): Promise<Laptop[]> {
    const { data, error } = await supabase.from("laptops").select("*").eq("is_featured", true);
    if (error) throw error;
    return (data ?? []).map(toLaptop);
  }

  async getByIds(ids: string[]): Promise<Laptop[]> {
    if (ids.length === 0) return [];
    const { data, error } = await supabase.from("laptops").select("*").in("id", ids);
    if (error) throw error;
    return (data ?? []).map(toLaptop);
  }

  async getBrands(): Promise<string[]> {
    const { data, error } = await supabase.from("laptops").select("brand");
    if (error) throw error;
    return [...new Set((data ?? []).map((r) => r.brand as string))].sort();
  }
}

export class SupabaseGuideRepository implements GuideRepository {
  async getAll(): Promise<GuideArticle[]> {
    const { data, error } = await supabase
      .from("guides")
      .select("*")
      .order("published_at", { ascending: false });
    if (error) throw error;
    return (data ?? []).map(toGuide);
  }

  async getBySlug(slug: string): Promise<GuideArticle | null> {
    const { data, error } = await supabase.from("guides").select("*").eq("slug", slug).maybeSingle();
    if (error) throw error;
    return data ? toGuide(data) : null;
  }
}

export class SupabaseStoreInfoRepository implements StoreInfoRepository {
  async get(): Promise<StoreInfo> {
    const { data, error } = await supabase.from("store_info").select("*").eq("id", 1).single();
    if (error) throw error;
    return toStoreInfo(data);
  }
}
```

## 4. Ganti tiga baris di `src/lib/data/index.ts`

```ts
import {
  SupabaseGuideRepository,
  SupabaseLaptopRepository,
  SupabaseStoreInfoRepository,
} from "./supabase-repository";

export const laptopRepository: LaptopRepository = new SupabaseLaptopRepository();
export const guideRepository: GuideRepository = new SupabaseGuideRepository();
export const storeInfoRepository: StoreInfoRepository = new SupabaseStoreInfoRepository();
```

Selesai. Hal yang perlu diperhatikan setelah pindah:

- **Gambar**: `images` di mock berupa path lokal (`/images/laptops/...`). Kalau dipindah ke
  Supabase Storage, simpan URL penuhnya dan daftarkan host-nya di `images.remotePatterns`
  pada `next.config.ts` jika memakai `next/image`.
- **Sitemap / halaman server** sekarang menembak database saat build. Pastikan env var
  Supabase sudah ada di Vercel sebelum deploy.
- Store sudah punya state `catalogError` / `finderError`, jadi kegagalan jaringan tampil
  sebagai pesan + tombol "Coba Lagi" di UI.
