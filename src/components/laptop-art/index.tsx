// Ilustrasi laptop sederhana — placeholder sebelum foto asli tersedia
// (hero & kartu produk). Murni SVG, tidak ada aset eksternal.

export function LaptopArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 200"
      role="img"
      aria-label="Ilustrasi laptop"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="la-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#669BBC" />
          <stop offset="1" stopColor="#003049" />
        </linearGradient>
      </defs>
      <ellipse cx="160" cy="176" rx="130" ry="9" fill="#003049" opacity="0.14" />
      {/* layar */}
      <rect x="58" y="14" width="204" height="128" rx="9" fill="#00202f" />
      <rect x="66" y="22" width="188" height="112" rx="4" fill="url(#la-screen)" />
      <rect x="78" y="34" width="70" height="44" rx="4" fill="#C1121F" opacity="0.9" />
      <rect x="156" y="34" width="86" height="20" rx="4" fill="#FDF0D5" opacity="0.9" />
      <rect x="156" y="60" width="52" height="34" rx="4" fill="#FDF0D5" opacity="0.3" />
      <rect x="78" y="86" width="60" height="36" rx="4" fill="#FDF0D5" opacity="0.2" />
      <rect x="146" y="102" width="96" height="20" rx="4" fill="#669BBC" opacity="0.6" />
      {/* base */}
      <path d="M30 144 H290 L277 165 Q275 169 269 169 H51 Q45 169 43 165 Z" fill="#0b3a54" />
      <rect x="132" y="144" width="56" height="6" rx="3" fill="#2a6a8c" />
    </svg>
  );
}
