"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsappLogo } from "@phosphor-icons/react";

export default function WhatsAppFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#booking"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl active:scale-[0.95] transition-shadow duration-200"
          aria-label="Book via WhatsApp"
        >
          <WhatsappLogo size={28} weight="fill" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
