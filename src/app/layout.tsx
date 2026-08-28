import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PrototypeNotice } from "@/components/prototype-notice";
import { SITE_URL } from "@/lib/site";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
        <PrototypeNotice />
      </body>
    </html>
  );
}
