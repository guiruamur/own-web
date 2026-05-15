"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/nav";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm border-b border-outline-variant/30">
      <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-4 flex justify-between items-center">
        <Link
          href="/"
          className="font-headline text-headline-md font-bold text-on-surface"
        >
          Guillermo
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`font-label text-label-md pb-1 transition-colors ${
                isActive(l.href)
                  ? "text-primary border-b-2 border-primary"
                  : "text-text-muted hover:text-primary"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contacto"
            className="bg-primary text-on-primary px-6 py-2 rounded-lg font-label text-label-md hover:bg-primary-container transition-all duration-300"
          >
            Contactar
          </Link>
        </div>

        <button
          className="md:hidden text-on-surface"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
          aria-expanded={open}
        >
          <span className="material-symbols-outlined">{open ? "close" : "menu"}</span>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-surface border-t border-outline-variant/30 px-margin-mobile py-5 flex flex-col gap-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`font-label text-label-md transition-colors ${
                isActive(l.href) ? "text-primary" : "text-text-muted hover:text-primary"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contacto"
            onClick={() => setOpen(false)}
            className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label text-label-md text-center"
          >
            Contactar
          </Link>
        </div>
      )}
    </nav>
  );
}
