import { Check } from "lucide-react";
import { LaptopCard } from "@/components/laptop-card";
import type { FinderResult } from "@/lib/data";

interface FinderResultCardProps {
  result: FinderResult;
  rank: number;
}

export function FinderResultCard({ result, rank }: FinderResultCardProps) {
  const { laptop, matchPercentage, reasons } = result;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-slate text-xs font-medium">Rekomendasi #{rank}</span>
        <span className="bg-brand/10 text-brand-dark rounded-md px-3 py-1 text-xs font-bold">
          {matchPercentage}% cocok
        </span>
      </div>

      <LaptopCard laptop={laptop} />

      {reasons.length > 0 && (
        <ul className="text-slate flex flex-col gap-1 text-xs">
          {reasons.map((reason) => (
            <li key={reason} className="flex items-center gap-1.5">
              <Check className="text-moss h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {reason}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
