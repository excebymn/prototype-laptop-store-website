import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import storeInfo from "@/lib/data/mock/store-info.json";
import type { StoreInfo } from "@/lib/data";
import { INSTAGRAM_PROFILE_URL, instagramMessageLink } from "@/lib/site";

const info = storeInfo as StoreInfo;

const NAV_LINKS = [
  { href: "/laptops", label: "Laptops" },
  { href: "/finder", label: "Finder" },
  { href: "/compare", label: "Compare" },
  { href: "/guide", label: "Guide" },
];

export function Footer() {
  const igDmLink = instagramMessageLink(info.socialMedia.instagram ?? INSTAGRAM_PROFILE_URL);

  return (
    <footer className="bg-ink text-paper/80">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="font-display text-paper text-lg font-semibold">{info.storeName}</span>
            <p className="text-paper/60 mt-3 text-sm leading-relaxed">{info.tagline}</p>
          </div>

          <div>
            <h3 className="text-gold text-xs font-semibold tracking-wide uppercase">Jelajahi</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-paper transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-gold text-xs font-semibold tracking-wide uppercase">Kontak</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href={igDmLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-paper flex items-start gap-2 transition-colors"
                >
                  <InstagramIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Instagram: @excebymn</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${info.email}`}
                  className="hover:text-paper flex items-start gap-2 transition-colors"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{info.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{info.address}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-gold text-xs font-semibold tracking-wide uppercase">
              Jam Operasional
            </h3>
            <ul className="mt-3 space-y-1 text-sm">
              {info.operatingHours.map((entry) => (
                <li key={entry.days} className="flex justify-between gap-4">
                  <span>{entry.days}</span>
                  <span className="text-paper/70 font-mono">{entry.hours}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              {info.socialMedia.instagram && (
                <a
                  href={info.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-paper/20 hover:border-gold hover:text-gold rounded-full border px-3 py-1 text-xs transition-colors"
                >
                  Instagram
                </a>
              )}
              {info.socialMedia.tiktok && (
                <a
                  href={info.socialMedia.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-paper/20 hover:border-gold hover:text-gold rounded-full border px-3 py-1 text-xs transition-colors"
                >
                  TikTok
                </a>
              )}
              {info.socialMedia.facebook && (
                <a
                  href={info.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-paper/20 hover:border-gold hover:text-gold rounded-full border px-3 py-1 text-xs transition-colors"
                >
                  Facebook
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-paper/10 text-paper/50 mt-10 border-t pt-6 text-xs">
          © {new Date().getFullYear()} {info.storeName}. Semua hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
}
