// Web app manifest — file convention Next.js, otomatis di-serve di
// `/manifest.webmanifest`. Melengkapi metadata untuk "Add to Home Screen" &
// beberapa sinyal SEO tambahan. Tidak bentrok dengan `favicon.ico` yang
// sudah ada (favicon tetap dipakai untuk classic `<link rel="icon">`).

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Excebymn — Laptop Bekas Berkualitas",
    short_name: "Excebymn",
    description: "Discovery & guidance laptop bekas berkualitas — bukan sekadar jual-beli.",
    start_url: "/",
    display: "standalone",
    background_color: "#FBF2DF",
    theme_color: "#003049",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
