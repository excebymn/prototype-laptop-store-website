import { Reveal } from "@/components/motion";

interface SectionHeadProps {
  /** Nomor section, mis. "01". */
  index: string;
  title: string;
  subtitle?: string;
  /** Tautan/tombol di sisi kanan (opsional). */
  action?: React.ReactNode;
}

/** Kepala section gaya papan katalog: garis tebal, nomor mono, judul condensed. */
export function SectionHead({ index, title, subtitle, action }: SectionHeadProps) {
  return (
    <Reveal className="border-ink flex items-end justify-between gap-4 border-t-2 pt-4">
      <div>
        <p className="text-brand-dark font-mono text-xs font-semibold tracking-widest">{index}</p>
        <h2 className="font-display text-ink mt-1 text-3xl font-bold tracking-wide uppercase sm:text-4xl">
          {title}
        </h2>
        {subtitle && <p className="text-slate mt-1 text-sm">{subtitle}</p>}
      </div>
      {action}
    </Reveal>
  );
}
