"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  scrolled: boolean;
}

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Spaces", href: "#bedrooms" },
  { label: "Pool & Garden", href: "#pool" },
  { label: "Amenities", href: "#amenities" },
  { label: "Experiences", href: "#experiences" },
  { label: "Location", href: "#location" },
];

const WHATSAPP_URL =
  "https://wa.me/919971800880?text=Hi%2C%20I%27d%20like%20to%20book%20HappyNest%20Blanc%20Belle";

export default function Navbar({ scrolled }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 dark:bg-surface/70 backdrop-blur-md dark:backdrop-blur-xl shadow-sm dark:shadow-none"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-20">
        {/* Logo */}
        <a href="#" className="flex flex-col leading-none">
          <span
            className={`font-outfit text-xl font-bold tracking-widest uppercase transition-colors duration-300 ${
              scrolled ? "text-stone-800 dark:text-on-surface" : "text-white"
            }`}
          >
            HappyNest
          </span>
          <span
            className={`font-satoshi text-xs tracking-[0.3em] uppercase transition-colors duration-300 ${
              scrolled
                ? "text-amber-600 dark:text-primary-bright"
                : "text-amber-300"
            }`}
          >
            Blanc Belle
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-xs tracking-[0.15em] uppercase font-medium transition-colors duration-300 hover:text-amber-500 ${
                scrolled
                  ? "text-stone-600 dark:text-on-surface-dim dark:hover:text-on-surface"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 dark:bg-primary-bright dark:text-surface dark:hover:opacity-90 text-white text-xs tracking-[0.15em] uppercase font-semibold rounded transition-colors duration-200"
          >
            Book Now
          </a>
        </nav>

        {/* Mobile controls */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className={`transition-colors duration-300 ${
              scrolled ? "text-stone-800 dark:text-on-surface" : "text-white"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white dark:bg-surface-bright border-t border-stone-100 dark:border-outline-faint/30 shadow-lg">
          <div className="px-6 py-6 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm tracking-[0.1em] uppercase font-medium text-stone-600 dark:text-on-surface-dim hover:text-amber-600 dark:hover:text-primary-bright transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 px-5 py-3 bg-amber-600 hover:bg-amber-700 text-white text-sm tracking-widest uppercase font-semibold rounded text-center transition-colors"
            >
              Book Now
            </a>
            <a
              href="tel:+919971800880"
              className="inline-flex items-center justify-center text-sm text-stone-500 dark:text-on-surface-dim"
            >
              +91 99718 00880
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
