import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import type { GuideArticle } from "@/lib/data";
import { formatDate } from "@/lib/format";

interface GuideCardProps {
  guide: GuideArticle;
}

export function GuideCard({ guide }: GuideCardProps) {
  return (
    <Link
      href={`/guide/${guide.slug}`}
      className="border-surface bg-paper hover:border-brand flex flex-col gap-3 rounded-xl border p-5 transition-colors"
    >
      <BookOpen className="text-brand h-5 w-5" aria-hidden="true" />
      <h3 className="font-display text-ink text-base font-semibold">{guide.title}</h3>
      <p className="text-slate line-clamp-2 text-sm leading-relaxed">{guide.excerpt}</p>
      <div className="text-slate mt-auto flex items-center justify-between pt-1 text-xs">
        <span className="font-mono">{formatDate(guide.publishedAt)}</span>
        <span className="text-ink inline-flex items-center gap-1 font-medium">
          Baca
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
