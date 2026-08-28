import type { Metadata } from "next";

// `app/laptops/page.tsx` adalah client component ("use client", pakai
// useSearchParams/Zustand), jadi tidak bisa export `metadata` langsung dari
// situ. Layout segment ini (Server Component) yang menaruh metadata-nya —
// hanya berlaku untuk /laptops sendiri; /laptops/[slug] override lewat
// `generateMetadata`-nya sendiri.
//
// Canonical sengaja fixed ke "/laptops" tanpa query string, supaya semua
// variasi filter/sort (?brand=...&sort=...) tidak dianggap Google sebagai
// halaman duplikat (Perencanaan §5.9, §12).
export const metadata: Metadata = {
  title: "Katalog Laptop Bekas",
  description: "Jelajahi katalog laptop bekas berkualitas, bisa difilter sesuai kebutuhanmu.",
  alternates: { canonical: "/laptops" },
  openGraph: {
    title: "Katalog Laptop Bekas",
    description: "Jelajahi katalog laptop bekas berkualitas, bisa difilter sesuai kebutuhanmu.",
    url: "/laptops",
    type: "website",
  },
};

export default function LaptopsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
