"use client";

import { motion } from "framer-motion";
import {
  SwimmingPool,
  Bathtub,
  Fire,
  CookingPot,
  WifiHigh,
  Television,
  Snowflake,
  MonitorPlay,
  SpeakerHigh,
  GameController,
  TShirt,
  Flashlight,
  SecurityCamera,
  Wheelchair,
  Flame,
  Warehouse,
  Coffee,
  Lockers,
  Thermometer,
  Cube,
  Drop,
  Towel,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import type { Variants } from "framer-motion";

interface AmenityItem {
  icon: Icon;
  label: string;
  note?: string;
}

interface AmenityGroup {
  title: string;
  items: AmenityItem[];
}

const AMENITY_GROUPS: AmenityGroup[] = [
  {
    title: "Outdoor",
    items: [
      { icon: SwimmingPool, label: "Private Swimming Pool" },
      { icon: Bathtub, label: "Outdoor Jacuzzi" },
      { icon: Warehouse, label: "Lawn & Gazebo" },
      { icon: Fire, label: "Bonfire", note: "₹2,000 / 3 hrs" },
      { icon: CookingPot, label: "BBQ / Barbeque", note: "₹1,000" },
    ],
  },
  {
    title: "Indoor",
    items: [
      { icon: Snowflake, label: "AC in all rooms" },
      { icon: WifiHigh, label: "Wi-Fi throughout" },
      { icon: Television, label: "TV in all rooms" },
      { icon: Flame, label: "Fireplace" },
      { icon: Thermometer, label: "Heater" },
      { icon: Cube, label: "Refrigerator" },
      { icon: MonitorPlay, label: "Projector", note: "₹1,500" },
      { icon: SpeakerHigh, label: "Music System" },
      { icon: GameController, label: "Indoor & Outdoor Games" },
    ],
  },
  {
    title: "Convenience",
    items: [
      { icon: Lockers, label: "Wardrobe in all rooms" },
      { icon: Coffee, label: "Electric Kettle" },
      { icon: Drop, label: "Geyser in all bathrooms" },
      { icon: Towel, label: "Towels & Basic Toiletries" },
      { icon: TShirt, label: "Washing Machine, Iron & Clothes Dryer", note: "Complimentary" },
      { icon: Flashlight, label: "Torch", note: "Complimentary" },
      { icon: SecurityCamera, label: "CCTV Security" },
      { icon: Wheelchair, label: "Wheelchair Friendly" },
    ],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Amenities() {
  return (
    <section id="amenities" className="bg-cream py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-satoshi text-sm uppercase tracking-[0.25em] text-gold mb-4">
            Amenities
          </p>
          <h2 className="font-outfit text-3xl md:text-5xl tracking-tighter leading-[1.1] text-stone-950">
            Everything you need,
            <br />
            nothing you don&apos;t
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12 md:gap-20">
          {/* Left column — first two groups */}
          <div className="space-y-12">
            {AMENITY_GROUPS.slice(0, 2).map((group) => (
              <div key={group.title}>
                <h3 className="font-outfit text-lg text-stone-950 tracking-tight mb-6">
                  {group.title}
                </h3>
                <motion.div
                  className="space-y-0"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {group.items.map((item) => (
                    <motion.div
                      key={item.label}
                      variants={itemVariants}
                      className="flex items-center gap-4 py-4 border-t border-stone-200"
                    >
                      <item.icon
                        size={22}
                        weight="regular"
                        className="text-stone-500 flex-shrink-0"
                      />
                      <span className="text-base text-stone-950 font-medium">
                        {item.label}
                      </span>
                      {item.note && (
                        <span className="text-xs text-stone-400 ml-auto">
                          {item.note}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>

          {/* Right column — third group */}
          <div>
            {AMENITY_GROUPS.slice(2).map((group) => (
              <div key={group.title}>
                <h3 className="font-outfit text-lg text-stone-950 tracking-tight mb-6">
                  {group.title}
                </h3>
                <motion.div
                  className="space-y-0"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {group.items.map((item) => (
                    <motion.div
                      key={item.label}
                      variants={itemVariants}
                      className="flex items-center gap-4 py-4 border-t border-stone-200"
                    >
                      <item.icon
                        size={22}
                        weight="regular"
                        className="text-stone-500 flex-shrink-0"
                      />
                      <span className="text-base text-stone-950 font-medium">
                        {item.label}
                      </span>
                      {item.note && (
                        <span className="text-xs text-stone-400 ml-auto">
                          {item.note}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs text-stone-400 mt-10"
        >
          All add-on costs subject to 18% GST.
        </motion.p>
      </div>
    </section>
  );
}
