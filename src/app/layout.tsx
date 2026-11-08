import type { Metadata } from "next";
import { Barlow_Condensed, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PrototypeNotice } from "@/components/prototype-notice";
import { MobileContactBar } from "@/components/mobile-contact-bar";
import { MotionProvider } from "@/components/motion";
import { storeInfoRepository } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

// Font heading: condensed tebal ala poster toko. Dipakai lewat `font-display`.
const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const DEFAULT_TITLE = "Excebymn — Laptop Bekas Berkualitas";
const DEFAULT_DESCRIPTION =
  "Temukan laptop bekas berkualitas, sudah dicek dan siap pakai. Smart Finder bantu kamu pilih tanpa pusing spesifikasi.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Excebymn",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "laptop bekas",
    "laptop second berkualitas",
    "laptop like new",
    "jual laptop bekas",
    "beli laptop bekas",
  ],
  authors: [{ name: "Excebymn" }],
  creator: "Excebymn",
  publisher: "Excebymn",
  alternates: {
    canonical: "/",
  },
  // Gambar OG diambil otomatis dari `opengraph-image.tsx` (file convention
  // Next.js) — tidak perlu didaftarkan manual di sini. Lihat Perencanaan §5.9.
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Excebymn",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const info = await storeInfoRepository.get();

  return (
    <html
      lang="id"
      className={`${barlow.variable} ${inter.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col pb-20 md:pb-0">
        <MotionProvider>
          <Navbar storeName={info.storeName} />
          <div className="flex flex-1 flex-col">{children}</div>
          <Footer info={info} />
          <MobileContactBar info={info} />
          <PrototypeNotice info={info} />
        </MotionProvider>
      </body>
    </html>
  );
}
