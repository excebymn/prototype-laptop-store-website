import type { Metadata } from "next";
import { guideRepository } from "@/lib/data";
import { GUIDE_CATEGORY_LABEL, GUIDE_CATEGORY_ORDER } from "@/lib/guide-display";
import { GuideCard } from "@/components/guide-card";

export const metadata: Metadata = {
  title: "Guide & Buying Guide Laptop Bekas",
  description: "Panduan singkat sebelum kamu memutuskan beli laptop bekas.",
  alternates: { canonical: "/guide" },
  openGraph: {
    title: "Guide & Buying Guide Laptop Bekas",
    description: "Panduan singkat sebelum kamu memutuskan beli laptop bekas.",
    url: "/guide",
    type: "website",
  },
};

export default async function GuidePage() {
  const guides = await guideRepository.getAll();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-ink text-2xl font-semibold">Guide & Edukasi</h1>
      <p className="text-slate mt-1 text-sm">
        Panduan singkat sebelum kamu memutuskan beli laptop bekas.
      </p>

      <div className="mt-8 flex flex-col gap-12">
        {GUIDE_CATEGORY_ORDER.map((category) => {
          const guidesInCategory = guides.filter((guide) => guide.category === category);
          if (guidesInCategory.length === 0) return null;

          return (
            <section key={category}>
              <h2 className="font-display text-ink text-lg font-semibold">
                {GUIDE_CATEGORY_LABEL[category]}
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {guidesInCategory.map((guide) => (
                  <GuideCard key={guide.id} guide={guide} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
