import type { ReactNode } from "react";

interface SectionLabelProps {
  children: ReactNode;
}

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-px bg-amber-500" />
      <span className="text-xs tracking-[0.3em] uppercase font-medium text-amber-600 dark:text-primary-bright">
        {children}
      </span>
    </div>
  );
}
