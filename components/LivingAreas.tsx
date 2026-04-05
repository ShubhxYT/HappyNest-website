"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface AreaBlock {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imageFirst: boolean;
}

const AREAS: AreaBlock[] = [
  {
    title: "Living Area",
    description:
      "An expansive living room that seamlessly extends to the outdoor pool area. Comfortably seats up to 15 people, furnished with sofas and equipped with AC, Wi-Fi, TV, a cosy fireplace, and a portable music system.",
    image: "/images/single/sofa-ground.jpg",
    imageAlt: "Ground floor living area with sofas and fireplace",
    imageFirst: true,
  },
  {
    title: "Dining",
    description:
      "Positioned adjacent to the living room, this cosy space seats up to 10 people. The perfect setting for long conversations over home-cooked meals, equipped with AC and TV.",
    image: "/images/single/main-dining.jpg",
    imageAlt: "Dining area with seating for ten guests",
    imageFirst: false,
  },
  {
    title: "Lounge & Game Room",
    description:
      "A first-floor lounge featuring a game centre with table tennis and carrom. Seats up to 15 people, equipped with AC, Wi-Fi, TV, a wired music system. The ideal spot for spirited game tournaments.",
    image: "/images/single/tt-table-sofa-up.jpg",
    imageAlt: "First floor lounge with table tennis and seating",
    imageFirst: true,
  },
];

export default function LivingAreas() {
  return (
    <section className="bg-cream py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <p className="font-satoshi text-sm uppercase tracking-[0.25em] text-gold mb-4">
            Common Areas
          </p>
          <h2 className="font-outfit text-3xl md:text-5xl tracking-tighter leading-[1.1] text-stone-950">
            Gather, dine, unwind
          </h2>
        </motion.div>

        <div className="space-y-20 md:space-y-32">
          {AREAS.map((area, i) => (
            <div
              key={area.title}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${
                !area.imageFirst ? "md:[direction:rtl]" : ""
              }`}
            >
              {/* Image */}
              <motion.div
                className="md:[direction:ltr]"
                initial={{ opacity: 0, x: area.imageFirst ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src={area.image}
                    alt={area.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </motion.div>

              {/* Text */}
              <motion.div
                className="md:[direction:ltr]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.1,
                }}
              >
                <h3 className="font-outfit text-2xl md:text-3xl tracking-tight text-stone-950 mb-4">
                  {area.title}
                </h3>
                <p className="text-base text-stone-500 leading-relaxed max-w-[65ch]">
                  {area.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
