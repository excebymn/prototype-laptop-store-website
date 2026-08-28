// Allow semua halaman publik, tidak ada rute admin sejauh ini (Keputusan
// §8: "Admin dashboard tidak dibuat di fase ini") — jadi belum ada yang
// perlu di-disallow. Update di sini kalau nanti ada rute admin ditambahkan.

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
