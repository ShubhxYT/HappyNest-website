"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Clock,
  PawPrint,
  Users,
  CookingPot,
  Warning,
  ArrowsClockwise,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

interface Rule {
  icon: Icon;
  title: string;
  detail: string;
}

const RULES: Rule[] = [
  {
    icon: Clock,
    title: "Check-in & Check-out",
    detail: "Check-in: 2:00 PM | Check-out: 12:00 PM",
  },
  {
    icon: ArrowsClockwise,
    title: "Early / Late Flexibility",
    detail:
      "Early check-in and late check-out subject to availability (additional fee may apply)",
  },
  {
    icon: PawPrint,
    title: "Pets Welcome",
    detail: "Pets are welcome at the property",
  },
  {
    icon: Users,
    title: "Visitor Charges",
    detail:
      "Non-staying guests: ₹1,000 + taxes per person per day (up to 4 hours) – meals excluded",
  },
  {
    icon: CookingPot,
    title: "Kitchen Access",
    detail: "Guests do not have access to the villa kitchen",
  },
  {
    icon: Warning,
    title: "Policies",
    detail:
      "Please read all Home Truths, House Rules, and Policies thoroughly before your stay",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
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

export default function HouseRules() {
  return (
    <section className="bg-cream dark:bg-surface py-24 md:py-36">
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
            House Rules & Policies
          </p>
          <h2 className="font-outfit text-3xl md:text-5xl tracking-tighter leading-[1.1] text-stone-950 dark:text-on-surface">
            Before You Arrive
          </h2>
        </motion.div>

        {/* Rules grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {RULES.map((rule) => (
            <motion.div
              key={rule.title}
              variants={itemVariants}
              className="flex items-start gap-4 p-6 rounded-xl border border-stone-200 dark:border-transparent bg-stone-100/50 dark:bg-surface-container"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cream dark:bg-surface-bright flex items-center justify-center">
                <rule.icon size={20} weight="regular" className="text-gold" />
              </div>
              <div>
                <h3 className="font-outfit text-base tracking-tight text-stone-950 dark:text-on-surface mb-1">
                  {rule.title}
                </h3>
                <p className="text-sm text-stone-500 dark:text-on-surface-dim leading-relaxed">
                  {rule.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
