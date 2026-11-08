// Open Graph image default — dipakai sebagai fallback untuk semua halaman
// yang tidak punya `opengraph-image.tsx` sendiri (Home, About, Contact,
// Guide index, Finder, Compare, Catalog). Product Detail & Guide Detail
// override ini lewat file serupa di folder masing-masing.
//
// Pakai `next/og` bawaan Next.js (bukan library eksternal) — tidak perlu
// tambah dependency. Font pakai default Satori (tidak fetch font custom)
// biar tetap ringan dan tidak bergantung koneksi saat build/request.

import { ImageResponse } from "next/og";
import { storeInfoRepository } from "@/lib/data";

export const alt = "Excebymn — Laptop Bekas Berkualitas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const info = await storeInfoRepository.get();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#003049",
          color: "#FBF2DF",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              backgroundColor: "#C1121F",
              color: "#FBF2DF",
              fontSize: "22px",
              fontWeight: 700,
            }}
          >
            EX
          </div>
          <div style={{ fontSize: "36px", fontWeight: 700 }}>{info.storeName}</div>
        </div>

        <div style={{ display: "flex", fontSize: "52px", fontWeight: 700, marginTop: "48px" }}>
          Laptop bekas yang dipilihkan, bukan cuma dijual.
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "28px",
            color: "#FBF2DFcc",
            marginTop: "24px",
            maxWidth: "900px",
          }}
        >
          {info.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
