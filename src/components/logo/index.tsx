import Image from "next/image";
import { LOGO_SRC } from "@/lib/site";

interface LogoProps {
  name: string;
  /** "light" = untuk latar gelap (footer). */
  tone?: "dark" | "light";
  className?: string;
}

/**
 * Slot logo. Selama `LOGO_SRC` (lib/site.ts) masih `null`, tampil monogram +
 * nama toko sebagai pengganti. Kalau logo sudah ada, cukup isi `LOGO_SRC`
 * dengan path file di public/ — logo diasumsikan sudah memuat nama merek.
 */
export function Logo({ name, tone = "dark", className = "" }: LogoProps) {
  if (LOGO_SRC) {
    return (
      <Image
        src={LOGO_SRC}
        alt={name}
        width={180}
        height={48}
        priority
        className={`h-9 w-auto object-contain ${className}`}
      />
    );
  }

  const text = tone === "light" ? "text-white" : "text-ink";

  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <span
        aria-hidden="true"
        className={`relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl font-display text-base font-extrabold tracking-wide ${
          tone === "light" ? "bg-paper text-ink" : "bg-ink text-white"
        }`}
      >
        EX
        <span className="bg-brand absolute -right-2 -bottom-2 h-4 w-4 rotate-45" />
      </span>
      <span className={`font-display text-xl font-extrabold tracking-wide uppercase ${text}`}>
        {name}
      </span>
    </span>
  );
}
