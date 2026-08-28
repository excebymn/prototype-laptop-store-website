// OG image dinamis untuk tiap artikel Guide — sama alasannya dengan
// `app/laptops/[slug]/opengraph-image.tsx`, supaya link artikel yang
// di-share juga punya preview yang jelas.

import { ImageResponse } from "next/og";
import { guideRepository } from "@/lib/data";
import { GUIDE_CATEGORY_LABEL } from "@/lib/guide-display";

export const alt = "Artikel Guide laptop bekas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface OgImageProps {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: OgImageProps) {
  const { slug } = await params;
  const guide = await guideRepository.getBySlug(slug);

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
          backgroundColor: "#f6f4ee",
          color: "#16233a",
          fontFamily: "sans-serif",
        }}
      >
        {guide ? (
          <>
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                padding: "10px 20px",
                borderRadius: "10px",
                border: "3px dashed #d1953a",
                color: "#a9722a",
                fontSize: "24px",
                fontWeight: 700,
              }}
            >
              {GUIDE_CATEGORY_LABEL[guide.category]}
            </div>
            <div style={{ display: "flex", fontSize: "52px", fontWeight: 700, marginTop: "40px", maxWidth: "1000px" }}>
              {guide.title}
            </div>
            <div style={{ display: "flex", fontSize: "26px", color: "#5b6472", marginTop: "24px", maxWidth: "900px" }}>
              {guide.excerpt}
            </div>
          </>
        ) : (
          <div style={{ display: "flex", fontSize: "44px", fontWeight: 700 }}>
            Artikel Tidak Ditemukan
          </div>
        )}
      </div>
    ),
    { ...size },
  );
}
