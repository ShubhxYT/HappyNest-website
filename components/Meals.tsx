"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  CookingPot,
  Fire,
  MonitorPlay,
  TShirt,
  Flashlight,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

interface AddOnItem {
  icon: Icon;
  label: string;
  cost: string;
}

const ADD_ONS: AddOnItem[] = [
  { icon: Fire, label: "Bonfire", cost: "₹2,000 for 3 hrs · ₹1,000/extra hr" },
  { icon: CookingPot, label: "BBQ / Barbeque Grill", cost: "₹1,000" },
  { icon: MonitorPlay, label: "Projector", cost: "₹1,500" },
  { icon: TShirt, label: "Washing Machine & Iron", cost: "Complimentary" },
  { icon: Flashlight, label: "Torch & Clothes Dryer", cost: "Complimentary" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
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

const MEAL_NOTES = [
  "All rates are per person, per day",
  "Vegetarian and non-vegetarian available",
  "Breakfast charged separately if no package",
  "Inform meal preference at least 48 hours before check-in",
  "Meals served subject to availability",
  "All food & beverage costs subject to 18% GST",
  "Guests do not have access to the villa kitchen",
];

export default function Meals() {
  return (
    <section className="bg-stone-100 dark:bg-surface-low py-24 md:py-36 border-y border-stone-200 dark:border-transparent">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-satoshi text-sm uppercase tracking-[0.25em] text-gold mb-4">
            Dining & Add-Ons
          </p>
          <h2 className="font-outfit text-3xl md:text-5xl tracking-tighter leading-[1.1] text-stone-950 dark:text-on-surface">
            Savour Every Moment
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Meal Packages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-outfit text-lg text-stone-950 dark:text-on-surface tracking-tight mb-6">
              Meal Packages
            </h3>

            <div className="space-y-4 mb-8">
              {/* Half Board */}
              <div className="rounded-xl border border-stone-200 dark:border-transparent bg-cream dark:bg-surface-container p-6">
                <h4 className="font-outfit text-xl tracking-tight text-stone-950 dark:text-on-surface mb-2">
                  Half Board
                </h4>
                <p className="text-sm text-stone-500 dark:text-on-surface-dim leading-relaxed">
                  Breakfast + one major meal (lunch or dinner). Perfect for
                  guests who prefer to keep their dining flexible.
                </p>
                <p className="text-sm text-gold dark:text-primary-bright font-medium mt-3">
                  Contact us for pricing
                </p>
              </div>

              {/* Full Board */}
              <div className="rounded-xl border border-stone-200 dark:border-transparent bg-cream dark:bg-surface-container p-6">
                <h4 className="font-outfit text-xl tracking-tight text-stone-950 dark:text-on-surface mb-2">
                  Full Board
                </h4>
                <p className="text-sm text-stone-500 dark:text-on-surface-dim leading-relaxed">
                  All meals included — breakfast, lunch, and dinner. Ideal for a
                  completely carefree stay.
                </p>
                <p className="text-sm text-gold dark:text-primary-bright font-medium mt-3">
                  Contact us for pricing
                </p>
              </div>
            </div>

            {/* Meal Notes */}
            <ul className="space-y-2">
              {MEAL_NOTES.map((note) => (
                <li
                  key={note}
                  className="flex items-start gap-2 text-sm text-stone-400 dark:text-on-surface-dim/70"
                >
                  <span className="text-gold mt-1 text-xs">●</span>
                  {note}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Add-On Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-outfit text-lg text-stone-950 dark:text-on-surface tracking-tight mb-6">
              Add-On Services
            </h3>

            <motion.div
              className="space-y-0"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {ADD_ONS.map((item) => (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  className="flex items-center gap-4 py-4 border-t border-stone-200 dark:border-transparent"
                >
                  <item.icon
                    size={22}
                    weight="regular"
                    className="text-stone-500 dark:text-on-surface-dim flex-shrink-0"
                  />
                  <span className="text-base text-stone-950 dark:text-on-surface font-medium">
                    {item.label}
                  </span>
                  <span className="text-xs text-stone-400 dark:text-on-surface-dim/70 ml-auto text-right">
                    {item.cost}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <p className="text-xs text-stone-400 dark:text-on-surface-dim/70 mt-6 leading-relaxed">
              All add-on food &amp; event costs subject to 18% GST. Prices may
              vary during peak season.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
