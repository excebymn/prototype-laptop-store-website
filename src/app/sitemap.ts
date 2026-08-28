// Sitemap otomatis — generate dari semua slug laptop & guide yang ada di
// repository, ditambah rute statis. Karena lewat repository (bukan baca
// JSON langsung), begitu data pindah ke Supabase (Bagian 14) file ini tidak
// perlu diubah sama sekali.

import type { MetadataRoute } from "next";
import { guideRepository, laptopRepository } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "daily" },
  { path: "/laptops", priority: 0.9, changeFrequency: "daily" },
  { path: "/finder", priority: 0.7, changeFrequency: "monthly" },
  { path: "/compare", priority: 0.5, changeFrequency: "monthly" },
  { path: "/guide", priority: 0.6, changeFrequency: "weekly" },
  { path: "/about", priority: 0.4, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.4, changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [laptops, guides] = await Promise.all([laptopRepository.getAll(), guideRepository.getAll()]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const laptopEntries: MetadataRoute.Sitemap = laptops.map((laptop) => ({
    url: `${SITE_URL}/laptops/${laptop.slug}`,
    lastModified: laptop.createdAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const guideEntries: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${SITE_URL}/guide/${guide.slug}`,
    lastModified: guide.publishedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...laptopEntries, ...guideEntries];
}
