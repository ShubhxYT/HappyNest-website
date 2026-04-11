"use client";

import { motion } from "framer-motion";
import {
  Fire,
  CookingPot,
  GameController,
  Star,
  Sun,
  Champagne,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

interface Experience {
  icon: Icon;
  title: string;
  description: string;
}

const EXPERIENCES: Experience[] = [
  {
    icon: Fire,
    title: "Bonfire Nights",
    description:
      "Gather around a crackling bonfire under a canopy of stars. Available as an add-on for intimate evenings.",
  },
  {
    icon: CookingPot,
    title: "BBQ Evenings",
    description:
      "Sizzling barbeque by the lawn — the perfect way to wrap up a day of relaxation.",
  },
  {
    icon: Star,
    title: "Stargazing",
    description:
      "The private terrace offers breathtaking views of the night sky, far from city light pollution.",
  },
  {
    icon: GameController,
    title: "Game Tournaments",
    description:
      "Table tennis, carrom, board games — challenge your friends and family in spirited indoor tournaments.",
  },
  {
    icon: Sun,
    title: "Al Fresco Breakfast",
    description:
      "Start your morning in the gazebo with a home-cooked breakfast surrounded by the garden's serenity.",
  },
  {
    icon: Champagne,
    title: "Private Celebrations",
    description:
      "Host birthday parties, anniversaries, or intimate gatherings in a stunning private setting.",
  },
];

export default function Experiences() {
  return (
    <section className="bg-stone-100 dark:bg-surface-low py-24 md:py-36 border-y border-stone-200 dark:border-transparent">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-satoshi text-sm uppercase tracking-[0.25em] text-gold mb-4">
            Experiences
          </p>
          <h2 className="font-outfit text-3xl md:text-5xl tracking-tighter leading-[1.1] text-stone-950 dark:text-on-surface">
            Curated for every mood
          </h2>
        </motion.div>

        <div className="space-y-0">
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={exp.title}
              className="flex items-start gap-6 py-8 border-t border-stone-300 dark:border-outline-faint/30 last:border-b last:dark:border-outline-faint/30"
              initial={{
                opacity: 0,
                x: i % 2 === 0 ? -30 : 30,
              }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.05,
              }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cream dark:bg-surface-container flex items-center justify-center mt-1">
                <exp.icon size={20} weight="regular" className="text-gold" />
              </div>
              <div>
                <h3 className="font-outfit text-lg md:text-xl text-stone-950 dark:text-on-surface tracking-tight mb-1">
                  {exp.title}
                </h3>
                <p className="text-base text-stone-500 dark:text-on-surface-dim leading-relaxed max-w-[55ch]">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
