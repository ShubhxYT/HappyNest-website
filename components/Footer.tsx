"use client";

import { WhatsappLogo, Phone, MapPin } from "@phosphor-icons/react";

const WHATSAPP_URL =
  "https://wa.me/919999999999?text=Hi%2C%20I%27d%20like%20to%20book%20HappyNest%20Blanc%20Belle";

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-cream py-16 md:py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-outfit text-2xl tracking-tight mb-3">HappyNest</h3>
            <p className="text-sm text-stone-400 leading-relaxed max-w-[35ch]">
              Blanc Belle - A Luxury Farm Stay in Sohna, Haryana. Close enough
              to the city, far enough to unwind.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-outfit text-sm uppercase tracking-[0.2em] text-stone-400 mb-4">
              Contact
            </h4>
            <div className="space-y-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-stone-300 hover:text-cream transition-colors"
              >
                <WhatsappLogo size={18} weight="fill" />
                WhatsApp - Book Now
              </a>
              <a
                href="tel:+919999999999"
                className="flex items-center gap-3 text-sm text-stone-300 hover:text-cream transition-colors"
              >
                <Phone size={18} />
                +91 99999 99999
              </a>
              <p className="flex items-start gap-3 text-sm text-stone-300">
                <MapPin size={18} className="flex-shrink-0 mt-0.5" />
                Sohna, Haryana (Near New Delhi)
              </p>
            </div>
          </div>

          {/* House Rules */}
          <div>
            <h4 className="font-outfit text-sm uppercase tracking-[0.2em] text-stone-400 mb-4">
              House Rules
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>Check-in: 2:00 PM</li>
              <li>Check-out: 2:00 PM</li>
              <li>Pets welcome</li>
              <li>No access to villa kitchen</li>
              <li>Visitor charges apply</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-stone-800">
          <p className="text-xs text-stone-500 text-center">
            HappyNest - Blanc Belle. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
