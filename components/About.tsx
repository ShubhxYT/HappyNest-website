"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="bg-cream py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-16 items-center">
          {/* Text — takes 3 of 5 columns */}
          <motion.div
            className="md:col-span-3 order-2 md:order-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-satoshi text-sm uppercase tracking-[0.25em] text-gold mb-4">
              About HappyNest
            </p>
            <h2 className="font-outfit text-3xl md:text-5xl tracking-tighter leading-[1.1] text-stone-950 mb-6">
              More than a home — an opulent retreat
            </h2>
            <div className="space-y-4 text-base text-stone-500 leading-relaxed max-w-[65ch]">
              <p>
                Nestled in the serene embrace of Sohna, HappyNest — Blanc Belle
                — stands as a testament to luxury and elegance. Its name draws
                from its immaculate white interiors and a gleaming facade that
                shines like a pearl in the sun.
              </p>
              <p>
                A haven for weekend getaways, the property delights every visitor
                with its inviting pool, bubbling jacuzzi, sprawling lawns, and
                outdoor games. Close enough to urban centres, yet far enough to
                truly unwind.
              </p>
              <p>
                Furry companions are welcomed with open arms, making this the
                ultimate destination for unforgettable getaways.
              </p>
            </div>

            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {[
                "Private Pool & Jacuzzi",
                "Sprawling Lawns",
                "Pet Friendly",
                "Curated Experiences",
                "Senior Citizen Friendly",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 text-xs font-medium tracking-wide uppercase bg-stone-100 text-stone-500 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Image — takes 2 of 5 columns */}
          <motion.div
            className="md:col-span-2 order-1 md:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src="/images/garden/drone-2.jpg"
                alt="Aerial view of HappyNest Blanc Belle property"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
