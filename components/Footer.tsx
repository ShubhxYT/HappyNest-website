"use client";

import { MapPin, Phone, Mail, Share2, Share } from "lucide-react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Bedrooms", href: "#bedrooms" },
  { label: "Pool & Garden", href: "#pool" },
  { label: "Amenities", href: "#amenities" },
  { label: "Experiences", href: "#experiences" },
  { label: "Location", href: "#location" },
  { label: "House Rules", href: "#rules" },
];

export default function Footer() {
  return (
    <footer className="bg-stone-900 dark:bg-surface-container text-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 lg:py-20">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16 mb-12">
          {/* Brand + Social */}
          <div>
            <div className="mb-6">
              <div className="font-outfit text-xl font-bold tracking-widest uppercase text-white">
                HappyNest
              </div>
              <div className="font-satoshi text-xs tracking-[0.3em] uppercase text-amber-400 mt-1">
                Blanc Belle
              </div>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed font-light">
              A Luxury Farm Stay in Sohna, Haryana. Close enough to the city,
              far enough to unwind.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                aria-label="Social"
                className="w-9 h-9 bg-stone-800 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <Share2 size={15} />
              </a>
              <a
                href="#"
                aria-label="Social"
                className="w-9 h-9 bg-stone-800 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <Share size={15} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs tracking-[0.3em] uppercase text-stone-400 font-medium mb-6">
              Quick Links
            </h3>
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-stone-400 hover:text-amber-400 text-sm transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs tracking-[0.3em] uppercase text-stone-400 font-medium mb-6">
              Contact
            </h3>
            <div className="flex flex-col gap-4">
              <a
                href="https://maps.google.com/maps?q=28.234944,77.165250"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-stone-400 hover:text-amber-400 transition-colors"
              >
                <MapPin size={15} className="mt-0.5 flex-shrink-0" />
                <span className="text-sm font-light">
                  Sohna, Haryana
                  <br />
                  Near New Delhi, India
                </span>
              </a>
              <a
                href="tel:+919971800880"
                className="flex items-center gap-3 text-stone-400 hover:text-amber-400 transition-colors"
              >
                <Phone size={15} className="flex-shrink-0" />
                <span className="text-sm font-light">+91 99718 00880</span>
              </a>
              <a
                href="mailto:stay@happynestfarm.in"
                className="flex items-center gap-3 text-stone-400 hover:text-amber-400 transition-colors"
              >
                <Mail size={15} className="flex-shrink-0" />
                <span className="text-sm font-light">
                  stay@happynestfarm.in
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-stone-500 text-xs">
            &copy; {new Date().getFullYear()} HappyNest — Blanc Belle. All
            rights reserved.
          </p>
          <p className="text-stone-600 text-xs">
            Sohna, Haryana · A Luxury Farm Stay
          </p>
        </div>
      </div>
    </footer>
  );
}

