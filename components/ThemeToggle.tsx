"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "@phosphor-icons/react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    setIsDark(stored === "dark");
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="flex items-center justify-center w-9 h-9 rounded-full text-stone-500 hover:text-stone-950 dark:text-on-surface-dim dark:hover:text-on-surface transition-colors"
    >
      {isDark ? (
        <Sun size={20} weight="duotone" />
      ) : (
        <Moon size={20} weight="duotone" />
      )}
    </button>
  );
}
