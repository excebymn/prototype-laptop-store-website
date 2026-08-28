import type { Metadata } from "next";

// Sama alasannya dengan `app/laptops/layout.tsx` — `app/finder/page.tsx`
// adalah client component, jadi metadata ditaruh di layout segment ini.
export const metadata: Metadata = {
  title: "Smart Finder — Cari Laptop Sesuai Kebutuhan",
  description:
    "Jawab beberapa pertanyaan singkat, biar Smart Finder carikan laptop bekas paling cocok buat kamu.",
  alternates: { canonical: "/finder" },
  openGraph: {
    title: "Smart Finder — Cari Laptop Sesuai Kebutuhan",
    description:
      "Jawab beberapa pertanyaan singkat, biar Smart Finder carikan laptop bekas paling cocok buat kamu.",
    url: "/finder",
    type: "website",
  },
};

export default function FinderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
