"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Room {
  name: string;
  color: string;
  floor: string;
  features: string[];
  image1: string;
  image2: string;
}

const ROOMS: Room[] = [
  {
    name: "The Blue Room",
    color: "blue",
    floor: "Ground Floor",
    features: ["King-size bed", "Ensuite bathroom", "AC, TV, Wi-Fi"],
    image1: "/images/bedrooms/blue1.jpg",
    image2: "/images/bedrooms/blue2.jpg",
  },
  {
    name: "The Green Room",
    color: "green",
    floor: "Ground Floor",
    features: ["King-size bed", "Ensuite with jacuzzi", "AC, TV, Wi-Fi"],
    image1: "/images/bedrooms/green1.jpg",
    image2: "/images/bedrooms/green2.jpg",
  },
  {
    name: "The Grey Room",
    color: "grey",
    floor: "First Floor",
    features: ["King-size bed", "Balcony", "Ensuite with jacuzzi"],
    image1: "/images/bedrooms/grey1.jpg",
    image2: "/images/bedrooms/grey2.jpg",
  },
  {
    name: "The Brown Room",
    color: "brown",
    floor: "First Floor",
    features: ["King-size bed", "Balcony", "Ensuite bathroom"],
    image1: "/images/bedrooms/brown1.jpg",
    image2: "/images/bedrooms/brown2.jpg",
  },
  {
    name: "The Lime Room",
    color: "lime",
    floor: "First Floor",
    features: ["King-size bed", "Balcony", "Ensuite bathroom"],
    image1: "/images/bedrooms/lime1.jpg",
    image2: "/images/bedrooms/lime2.jpg",
  },
  {
    name: "The Pearl Room",
    color: "pearl",
    floor: "First Floor",
    features: ["King-size bed", "Balcony", "Ensuite bathroom"],
    image1: "/images/bedrooms/grey3.jpg",
    image2: "/images/bedrooms/grey4.jpg",
  },
];

export default function Spaces() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="spaces" className="bg-cream dark:bg-surface py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <p className="font-satoshi text-sm uppercase tracking-[0.25em] text-gold mb-4">
            Spaces
          </p>
          <h2 className="font-outfit text-3xl md:text-5xl tracking-tighter leading-[1.1] text-stone-950 dark:text-on-surface">
            Six lavish bedrooms,
            <br />
            each with its own character
          </h2>
        </motion.div>

        {/* Desktop: Accordion strips */}
        <div className="hidden md:flex gap-2 h-[70vh] min-h-[500px]">
          {ROOMS.map((room, i) => {
            const isActive = activeIndex === i;
            return (
              <motion.div
                key={room.color}
                className="relative cursor-pointer overflow-hidden rounded-xl"
                animate={{
                  flex: isActive ? 4 : 1,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <Image
                  src={isActive ? room.image2 : room.image1}
                  alt={room.name}
                  fill
                  sizes={isActive ? "60vw" : "15vw"}
                  className="object-cover transition-all duration-700"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

                {/* Collapsed label */}
                <AnimatePresence>
                  {!isActive && (
                    <motion.div
                      className="absolute bottom-6 left-0 right-0 flex flex-col items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span
                        className="font-outfit text-sm text-cream/90 tracking-wider uppercase"
                        style={{ writingMode: "vertical-lr" }}
                      >
                        {room.name}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Expanded details */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-gold-light mb-2">
                        {room.floor}
                      </p>
                      <h3 className="font-outfit text-2xl text-cream tracking-tight mb-3">
                        {room.name}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {room.features.map((f) => (
                          <span
                            key={f}
                            className="text-xs text-cream/70 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: Vertical stack */}
        <div className="flex flex-col gap-4 md:hidden">
          {ROOMS.map((room, i) => (
            <motion.div
              key={room.color}
              className="relative rounded-xl overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() =>
                setActiveIndex(activeIndex === i ? null : i)
              }
            >
              <div
                className={`relative transition-all duration-500 ${
                  activeIndex === i ? "aspect-[4/3]" : "aspect-[16/7]"
                }`}
              >
                <Image
                  src={activeIndex === i ? room.image2 : room.image1}
                  alt={room.name}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gold-light mb-1">
                  {room.floor}
                </p>
                <h3 className="font-outfit text-xl text-cream tracking-tight">
                  {room.name}
                </h3>
                <AnimatePresence>
                  {activeIndex === i && (
                    <motion.div
                      className="flex flex-wrap gap-2 mt-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {room.features.map((f) => (
                        <span
                          key={f}
                          className="text-xs text-cream/70 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full"
                        >
                          {f}
                        </span>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
