import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Battery,
  Cpu,
  HardDrive,
  MemoryStick,
  Monitor,
  Package,
  ScanLine,
  Weight,
  Wifi,
} from "lucide-react";
import { laptopRepository } from "@/lib/data";
import type { StoreInfo } from "@/lib/data";
import storeInfo from "@/lib/data/mock/store-info.json";
import { formatPrice } from "@/lib/format";
import { CONDITION_LABEL, CONDITION_STYLE } from "@/lib/laptop-display";
import { SITE_URL, INSTAGRAM_PROFILE_URL } from "@/lib/site";
import { LaptopGallery } from "@/components/laptop-gallery";
import { AddToCompareButton } from "@/components/laptop-card/add-to-compare-button";
import { ContactAdminButton } from "@/components/contact-admin-button";
import { ProductShare } from "@/components/product-share";

const info = storeInfo as StoreInfo;

// Baris untuk tabel full specs — urutan & label ditentukan di sini, bukan
// hardcode di JSX, supaya gampang ditambah/diubah.
function buildSpecRows(specs: Awaited<ReturnType<typeof laptopRepository.getBySlug>>) {
  if (!specs) return [];
  const s = specs.specs;
  return [
    { icon: Cpu, label: "Prosesor", value: s.cpu },
    { icon: ScanLine, label: "Grafis", value: s.gpu },
    { icon: MemoryStick, label: "RAM", value: `${s.ramGb}GB` },
    { icon: HardDrive, label: "Penyimpanan", value: `${s.storageGb}GB ${s.storageType}` },
    { icon: Monitor, label: "Layar", value: s.display },
    { icon: Battery, label: "Baterai", value: s.battery },
    { icon: Wifi, label: "Konektivitas", value: s.connectivity.join(", ") },
    { icon: Package, label: "Sistem Operasi", value: s.os },
    { icon: Weight, label: "Berat", value: `${s.weightKg} kg` },
  ];
}

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const laptop = await laptopRepository.getBySlug(slug);

  if (!laptop) {
    return { title: "Laptop Tidak Ditemukan" };
  }

  const title = `${laptop.name} - ${formatPrice(laptop.price)}`;
  const description = laptop.description;

  return {
    title,
    description,
    alternates: { canonical: `/laptops/${laptop.slug}` },
    openGraph: {
      title,
      description,
      url: `/laptops/${laptop.slug}`,
      type: "website",
    },
  };
}

// Schema.org Product — biar Product Detail bisa muncul sebagai rich result
// di Google (harga, kondisi, ketersediaan). Lihat Perencanaan §5.9.
function buildProductJsonLd(laptop: NonNullable<Awaited<ReturnType<typeof laptopRepository.getBySlug>>>) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: laptop.name,
    brand: { "@type": "Brand", name: laptop.brand },
    description: laptop.description,
    sku: laptop.id,
    itemCondition: "https://schema.org/UsedCondition",
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/laptops/${laptop.slug}`,
      priceCurrency: "IDR",
      price: laptop.price,
      availability: laptop.isAvailable
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const laptop = await laptopRepository.getBySlug(slug);

  if (!laptop) {
    notFound();
  }

  const specRows = buildSpecRows(laptop);
  const productJsonLd = buildProductJsonLd(laptop);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      {/* JSON-LD Product schema — lihat buildProductJsonLd() di atas & Perencanaan §5.9 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <Link
        href="/laptops"
        className="text-slate hover:text-ink inline-flex items-center gap-1.5 text-sm font-medium"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Kembali ke Katalog
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <LaptopGallery images={laptop.images} condition={laptop.condition} />

        <div className="flex flex-col gap-5">
          <div>
            <p className="text-slate text-sm font-medium">{laptop.brand}</p>
            <h1 className="font-display text-ink mt-1 text-2xl font-semibold sm:text-3xl">
              {laptop.name}
            </h1>
            <span
              className={`mt-2 inline-block rounded-md border-2 border-dashed px-2 py-1 text-xs font-bold ${CONDITION_STYLE[laptop.condition]}`}
            >
              {CONDITION_LABEL[laptop.condition]}
            </span>
          </div>

          <p className="text-ink font-mono text-3xl font-semibold">{formatPrice(laptop.price)}</p>

          {!laptop.isAvailable && (
            <p className="text-slate border-surface bg-surface/40 rounded-md border px-3 py-2 text-sm">
              Unit ini sedang tidak tersedia. Hubungi admin untuk cek unit serupa.
            </p>
          )}

          {/* Key specs — highlight cepat, detail lengkap ada di tabel full specs */}
          <div className="border-surface grid grid-cols-2 gap-3 rounded-xl border p-4 sm:grid-cols-4">
            <div className="flex flex-col items-center gap-1 text-center">
              <Cpu className="text-ink h-5 w-5" aria-hidden="true" />
              <span className="text-slate text-xs">{laptop.specs.cpu}</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <MemoryStick className="text-ink h-5 w-5" aria-hidden="true" />
              <span className="text-slate text-xs">{laptop.specs.ramGb}GB RAM</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <HardDrive className="text-ink h-5 w-5" aria-hidden="true" />
              <span className="text-slate text-xs">
                {laptop.specs.storageGb}GB {laptop.specs.storageType}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <Monitor className="text-ink h-5 w-5" aria-hidden="true" />
              <span className="text-slate text-xs">{laptop.specs.display}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <ContactAdminButton
              instagramUrl={info.socialMedia.instagram ?? INSTAGRAM_PROFILE_URL}
              laptop={laptop}
            />
            <AddToCompareButton laptop={laptop} />
          </div>

          <ProductShare laptop={laptop} storeName={info.storeName} />

          <div>
            <h2 className="font-display text-ink text-lg font-semibold">Deskripsi</h2>
            <p className="text-slate mt-2 text-sm leading-relaxed">{laptop.description}</p>
          </div>

          <div>
            <h2 className="font-display text-ink text-lg font-semibold">Yang Didapat</h2>
            <ul className="text-slate mt-2 space-y-1.5 text-sm">
              {laptop.whatsIncluded.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="bg-gold h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Full specs */}
      <div className="mt-12">
        <h2 className="font-display text-ink text-xl font-semibold">Spesifikasi Lengkap</h2>
        <dl className="border-surface mt-4 divide-y rounded-xl border">
          {specRows.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 px-4 py-3">
              <Icon className="text-slate h-4 w-4 shrink-0" aria-hidden="true" />
              <dt className="text-slate w-36 shrink-0 text-sm">{label}</dt>
              <dd className="text-ink text-sm font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </main>
  );
}
