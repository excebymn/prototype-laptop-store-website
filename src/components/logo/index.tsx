import { LogoMark } from "./mark";

interface LogoProps {
  name: string;
  /** "light" = untuk latar gelap (footer). */
  tone?: "dark" | "light";
  className?: string;
}

/** Logo situs: lambang + nama toko. Warna mengikuti `tone`. */
export function Logo({ name, tone = "dark", className = "" }: LogoProps) {
  const color = tone === "light" ? "text-paper" : "text-ink";

  return (
    <span className={`flex items-center gap-2.5 ${color} ${className}`}>
      <LogoMark className="h-8 w-auto shrink-0" />
      <span className="font-display text-xl font-extrabold tracking-wide uppercase">{name}</span>
    </span>
  );
}
