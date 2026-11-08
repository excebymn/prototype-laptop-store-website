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
      className="anim-nav sticky top-0 z-50 px-3 pt-3 sm:px-6"
      animate={{ y: isHidden ? -120 : 0 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="border-surface bg-card/90 flex h-14 items-center justify-between rounded-full border pr-2 pl-4 shadow-sm backdrop-blur sm:pl-5">
          <Link href="/" onClick={close} aria-label={`${storeName} — beranda`}>
            <Logo name={storeName} />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
            {PRIMARY_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    active ? "text-white" : "text-slate hover:text-ink"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="bg-ink absolute inset-0 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <Link
              href="/finder"
              className="group bg-ink hidden items-center gap-2 rounded-full py-1.5 pr-1.5 pl-4 text-sm font-semibold text-white transition-all hover:shadow-lg active:scale-95 sm:inline-flex"
            >
              Cari Laptop Saya
              <span className="bg-brand flex h-8 w-8 items-center justify-center rounded-full">
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45"
                  aria-hidden="true"
                />
              </span>
            </Link>

            <button
              type="button"
              className="text-ink flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
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
              className="border-surface bg-card mt-2 origin-top rounded-3xl border p-3 shadow-lg lg:hidden"
              aria-label="Navigasi mobile"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              <motion.ul
                className="grid grid-cols-2 gap-1"
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.06 } } }}
              >
                {[...PRIMARY_LINKS, ...SECONDARY_LINKS].map((link) => (
                  <motion.li
                    key={link.href}
                    variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                  >
                    <Link
                      href={link.href}
                      onClick={close}
                      className={`block rounded-2xl px-4 py-3 text-sm font-semibold ${
                        isActive(pathname, link.href)
                          ? "bg-ink text-white"
                          : "text-ink hover:bg-surface"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
              <Link
                href="/finder"
                onClick={close}
                className="bg-brand mt-2 flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-white"
              >
                Cari Laptop Saya
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
