// Lucide (versi yang dipakai proyek ini) sudah tidak menyertakan ikon brand
// seperti Instagram (icon pack brand di-drop dari lucide-react beberapa
// versi lalu). Jadi dibikin sendiri di sini, dalam gaya garis yang sama
// (stroke-based, `currentColor`) supaya nyambung visualnya dengan ikon
// lucide lain di sekitarnya.

import type { SVGProps } from "react";

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
