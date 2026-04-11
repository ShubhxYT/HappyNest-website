"use client";

import { useState, useEffect } from "react";
import { WhatsappLogo, Phone, List, X } from "@phosphor-icons/react";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Spaces", href: "#spaces" },
  { label: "Amenities", href: "#amenities" },
  { label: "Location", href: "#location" },
];

const WHATSAPP_URL =
  "https://wa.me/919971800880?text=Hi%2C%20I%27d%20like%20to%20book%20HappyNest%20Blanc%20Belle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-cream/80 dark:bg-surface-bright/80 backdrop-blur-xl border-b border-stone-200/50 dark:border-outline-faint/30 shadow-[0_1px_3px_rgba(28,25,23,0.04)] dark:shadow-none"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a
          href="#"
          className="font-outfit font-semibold text-lg md:text-xl tracking-tight text-stone-950 dark:text-on-surface"
        >
          HappyNest
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-stone-500 hover:text-stone-950 dark:text-on-surface-dim dark:hover:text-on-surface transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-950 text-cream dark:bg-primary-bright dark:text-surface text-sm font-medium rounded-full hover:bg-stone-800 dark:hover:opacity-90 active:scale-[0.98] transition-all duration-200"
          >
            <WhatsappLogo size={18} weight="fill" />
            Book Now
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-stone-950 dark:text-on-surface"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-cream/95 dark:bg-surface-bright/95 backdrop-blur-xl border-t border-stone-200/50 dark:border-outline-faint/30 px-6 pb-6 pt-4">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-stone-500 hover:text-stone-950 dark:text-on-surface-dim dark:hover:text-on-surface transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-stone-950 text-cream dark:bg-primary-bright dark:text-surface text-sm font-medium rounded-full"
            >
              <WhatsappLogo size={18} weight="fill" />
              Book Now
            </a>
            <a
              href="tel:+919971800880"
              className="inline-flex items-center justify-center gap-2 text-sm text-stone-500 dark:text-on-surface-dim"
            >
              <Phone size={16} />
              +91 99999 99999
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
