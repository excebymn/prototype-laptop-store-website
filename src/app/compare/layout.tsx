import type { Metadata } from "next";

// Sama alasannya dengan `app/laptops/layout.tsx` — `app/compare/page.tsx`
// adalah client component, jadi metadata ditaruh di layout segment ini.
export const metadata: Metadata = {
  title: "Compare Laptop",
  description: "Bandingkan spesifikasi dan harga sampai 2 laptop bekas sekaligus.",
  alternates: { canonical: "/compare" },
  openGraph: {
    title: "Compare Laptop",
    description: "Bandingkan spesifikasi dan harga sampai 2 laptop bekas sekaligus.",
    url: "/compare",
    type: "website",
  },
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
