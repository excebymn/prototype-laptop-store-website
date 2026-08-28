// OG image dinamis untuk tiap laptop — override `app/opengraph-image.tsx`
// khusus untuk route ini. Ini yang bikin preview link "Copy Link"/Product
// Sharing (§5.6) rapi saat di-forward ke WhatsApp: nama, harga, dan kondisi
// unit langsung kelihatan tanpa perlu buka link dulu.

import { ImageResponse } from "next/og";
import { laptopRepository } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { CONDITION_LABEL } from "@/lib/laptop-display";

export const alt = "Detail laptop bekas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface OgImageProps {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: OgImageProps) {
  const { slug } = await params;
  const laptop = await laptopRepository.getBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#16233a",
          color: "#f6f4ee",
          fontFamily: "sans-serif",
        }}
      >
        {laptop ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ display: "flex", fontSize: "26px", color: "#f6f4eeaa" }}>
                {laptop.brand}
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  border: "3px dashed #d1953a",
                  color: "#d1953a",
                  fontSize: "24px",
                  fontWeight: 700,
                }}
              >
                {CONDITION_LABEL[laptop.condition]}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "flex", fontSize: "56px", fontWeight: 700, maxWidth: "1000px" }}>
                {laptop.name}
              </div>
              <div style={{ display: "flex", fontSize: "44px", fontWeight: 700, color: "#d1953a" }}>
                {formatPrice(laptop.price)}
              </div>
              <div style={{ display: "flex", fontSize: "26px", color: "#f6f4eecc" }}>
                {laptop.specs.cpu} • {laptop.specs.ramGb}GB RAM •{" "}
                {laptop.specs.storageGb}GB {laptop.specs.storageType}
              </div>
            </div>
          </>
        ) : (
          <div style={{ display: "flex", fontSize: "44px", fontWeight: 700 }}>
            Unit Tidak Ditemukan
          </div>
        )}
      </div>
    ),
    { ...size },
  );
}
