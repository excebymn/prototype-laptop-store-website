import type { Metadata } from "next";
import { guideRepository } from "@/lib/data";
import { GUIDE_CATEGORY_LABEL, GUIDE_CATEGORY_ORDER } from "@/lib/guide-display";
import { GuideCard } from "@/components/guide-card";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion";
import { animDelay } from "@/lib/anim";

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
      <h1 className="anim-rise font-display text-ink text-3xl font-bold tracking-wide uppercase">
        Guide & Edukasi
      </h1>
      <p className="anim-rise text-slate mt-1 text-sm" style={animDelay(0.1)}>
        Panduan singkat sebelum kamu memutuskan beli laptop bekas.
      </p>

      <div className="mt-8 flex flex-col gap-12">
        {GUIDE_CATEGORY_ORDER.map((category) => {
          const guidesInCategory = guides.filter((guide) => guide.category === category);
          if (guidesInCategory.length === 0) return null;

          return (
            <section key={category}>
              <Reveal>
                <h2 className="font-display text-ink text-xl font-bold tracking-wide uppercase">
                  {GUIDE_CATEGORY_LABEL[category]}
                </h2>
              </Reveal>
              <RevealStagger
                className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
                stagger={0.08}
              >
                {guidesInCategory.map((guide) => (
                  <RevealItem key={guide.id} className="h-full">
                    <GuideCard guide={guide} />
                  </RevealItem>
                ))}
              </RevealStagger>
            </section>
          );
        })}
      </div>
    </main>
  );
}
