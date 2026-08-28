"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/laptops", label: "Laptops" },
  { href: "/finder", label: "Finder" },
  { href: "/compare", label: "Compare" },
  { href: "/guide", label: "Guide" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function StampMark() {
  return (
    <span
      aria-hidden="true"
      className="border-gold text-gold flex h-7 w-7 -rotate-6 items-center justify-center rounded-md border-2 border-dashed text-[10px] font-bold"
    >
      EX
    </span>
  );
}

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="border-surface bg-paper/95 sticky top-0 z-50 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
          <StampMark />
          <span className="font-display text-ink text-lg font-semibold tracking-tight">
            Excebymn
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Navigasi utama">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                isActive(pathname, link.href) ? "text-ink" : "text-slate hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/finder"
            className="bg-gold text-ink hover:bg-gold-dark inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition-transform hover:-rotate-1 hover:text-white"
          >
            ✨ Cari Laptop Saya
          </Link>
        </div>

        <button
          type="button"
          className="text-ink -mr-2 flex h-10 w-10 items-center justify-center md:hidden"
          aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isMenuOpen && (
        <nav
          className="border-surface bg-paper border-t px-4 py-4 md:hidden"
          aria-label="Navigasi mobile"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block rounded-md px-3 py-2 text-sm font-medium ${
                    isActive(pathname, link.href)
                      ? "bg-surface text-ink"
                      : "text-slate hover:bg-surface hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/finder"
            onClick={() => setIsMenuOpen(false)}
            className="bg-gold text-ink mt-3 flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold"
          >
            ✨ Cari Laptop Saya
          </Link>
        </nav>
      )}
    </header>
  );
}
