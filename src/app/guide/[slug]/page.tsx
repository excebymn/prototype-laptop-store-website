import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { guideRepository } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { GUIDE_CATEGORY_LABEL } from "@/lib/guide-display";

interface GuideDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: GuideDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = await guideRepository.getBySlug(slug);

  if (!guide) {
    return { title: "Artikel Tidak Ditemukan" };
  }

  return {
    title: guide.title,
    description: guide.excerpt,
    alternates: { canonical: `/guide/${guide.slug}` },
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      url: `/guide/${guide.slug}`,
      type: "article",
      publishedTime: guide.publishedAt,
    },
  };
}

export default async function GuideDetailPage({ params }: GuideDetailPageProps) {
  const { slug } = await params;
  const guide = await guideRepository.getBySlug(slug);

  if (!guide) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/guide"
        className="text-slate hover:text-ink inline-flex items-center gap-1.5 text-sm font-medium"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Kembali ke Guide
      </Link>

      <div className="mt-6">
        <span className="border-gold text-gold-dark inline-block rounded-md border-2 border-dashed px-2 py-1 text-xs font-bold">
          {GUIDE_CATEGORY_LABEL[guide.category]}
        </span>
        <h1 className="font-display text-ink mt-3 text-2xl font-semibold sm:text-3xl">
          {guide.title}
        </h1>
        <p className="text-slate mt-2 font-mono text-xs">{formatDate(guide.publishedAt)}</p>
      </div>

      <div className="text-ink mt-8 text-base leading-relaxed whitespace-pre-line">
        {guide.content}
      </div>
    </main>
  );
}
