"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";

const PRIMARY_LINKS = [
  { href: "/", label: "Home" },
  { href: "/laptops", label: "Laptops" },
  { href: "/finder", label: "Finder" },
  { href: "/compare", label: "Compare" },
  { href: "/guide", label: "Guide" },
  { href: "/locations", label: "Lokasi" },
];

// Tampil di menu HP saja (di desktop sudah ada di footer).
const SECONDARY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const EASE: [number, number, number, number] = [0.2, 0.7, 0.2, 1];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar({ storeName }: { storeName: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const close = () => setIsMenuOpen(false);

  // Sembunyi saat scroll ke bawah, muncul lagi saat scroll ke atas.
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 160 && !isMenuOpen) setIsHidden(true);
    else if (latest < previous) setIsHidden(false);
  });

  return (
    <motion.header
      className="anim-nav border-surface bg-paper/90 sticky top-0 z-50 border-b backdrop-blur"
      animate={{ y: isHidden ? -90 : 0 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" onClick={close} aria-label={`${storeName} — beranda`}>
          <Logo name={storeName} />
        </Link>

        <nav className="hidden h-full items-stretch gap-1 lg:flex" aria-label="Navigasi utama">
          {PRIMARY_LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative flex items-center px-3.5 text-sm font-semibold transition-colors ${
                  active ? "text-ink" : "text-slate hover:text-ink"
                }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="bg-brand absolute inset-x-3.5 -bottom-px h-0.5"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/finder"
            className="group bg-brand hidden items-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-md active:scale-95 sm:inline-flex"
          >
            Cari Laptop
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45"
              aria-hidden="true"
            />
          </Link>

          <button
            type="button"
            className="text-ink flex h-10 w-10 items-center justify-center rounded-md lg:hidden"
            aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isMenuOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            key="mobile-menu"
            className="border-surface bg-paper origin-top border-t lg:hidden"
            aria-label="Navigasi mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <motion.ul
              className="mx-auto max-w-6xl px-4 py-2 sm:px-6"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } }}
            >
              {[...PRIMARY_LINKS, ...SECONDARY_LINKS].map((link) => (
                <motion.li
                  key={link.href}
                  className="border-surface border-b last:border-b-0"
                  variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }}
                >
                  <Link
                    href={link.href}
                    onClick={close}
                    className={`flex items-center justify-between py-3.5 text-base font-semibold ${
                      isActive(pathname, link.href) ? "text-brand-dark" : "text-ink"
                    }`}
                  >
                    {link.label}
                    <ArrowUpRight className="h-4 w-4 opacity-50" aria-hidden="true" />
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
