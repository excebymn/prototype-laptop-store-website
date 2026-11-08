import { Star } from "lucide-react";

/** Pita merah dengan teks berjalan — pemisah antar section ala poster. */
export function MarqueeBand({ items }: { items: string[] }) {
  // Isi diduplikasi supaya animasi translateX(-50%) menyambung mulus.
  const loop = [...items, ...items];

  return (
    <div className="bg-brand mt-6 overflow-hidden py-3 sm:mt-8" role="presentation">
      <div className="marquee-track flex w-max items-center gap-8">
        {loop.map((item, index) => (
          <span
            key={`${item}-${index}`}
            aria-hidden={index >= items.length ? "true" : undefined}
            className="font-display flex items-center gap-8 text-xl font-bold tracking-wider whitespace-nowrap text-white uppercase"
          >
            {item}
            <Star className="h-4 w-4 fill-white" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}
