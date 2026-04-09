"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Airplane,
  Train,
  Mountains,
  Drop,
  Tree,
  Church,
} from "@phosphor-icons/react";

const NEARBY = [
  { icon: Drop, label: "Sohna Hot Springs" },
  { icon: Mountains, label: "Aravalli Hills Trekking" },
  { icon: Tree, label: "Damdama Lake" },
  { icon: Church, label: "Ancient Shiva Temple" },
  { icon: Mountains, label: "Badkhal Lake" },
  { icon: Church, label: "Thakur Raghunath Temple & Rani Mahal" },
];

export default function Location() {
  return (
    <section
      id="location"
      className="bg-stone-100 py-24 md:py-36 border-t border-stone-200"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <p className="font-satoshi text-sm uppercase tracking-[0.25em] text-gold mb-4">
            Location
          </p>
          <h2 className="font-outfit text-3xl md:text-5xl tracking-tighter leading-[1.1] text-stone-950">
            Getting here
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Left - info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-base text-stone-500 leading-relaxed max-w-[55ch] mb-8">
              Nestled amidst the verdant embrace of the Aravalli Hills in Sohna
              - a charming town known for its rejuvenating hot springs, scenic
              landscapes, and mystical legends.
            </p>

            {/* Distance markers */}
            <div className="flex flex-col gap-4 mb-10">
              <div className="flex items-center gap-4 py-3 border-t border-stone-300">
                <Airplane
                  size={20}
                  weight="regular"
                  className="text-stone-500 flex-shrink-0"
                />
                <span className="text-base text-stone-950 font-medium">
                  IGI Airport
                </span>
                <span className="text-sm text-stone-400 ml-auto">55 km</span>
              </div>
              <div className="flex items-center gap-4 py-3 border-t border-stone-300">
                <Train
                  size={20}
                  weight="regular"
                  className="text-stone-500 flex-shrink-0"
                />
                <span className="text-base text-stone-950 font-medium">
                  New Delhi Railway Station
                </span>
                <span className="text-sm text-stone-400 ml-auto">60 km</span>
              </div>
            </div>

            {/* Nearby attractions */}
            <h3 className="font-outfit text-lg text-stone-950 tracking-tight mb-4">
              Nearby Attractions
            </h3>
            <div className="space-y-0">
              {NEARBY.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 py-3 border-t border-stone-200"
                >
                  <item.icon
                    size={18}
                    weight="regular"
                    className="text-stone-400 flex-shrink-0"
                  />
                  <span className="text-sm text-stone-500">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-stone-200">
              <iframe
                src="https://maps.google.com/maps?q=28.234944,77.165250&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="HappyNest Blanc Belle location"
                className="absolute inset-0"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
