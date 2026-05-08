"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const MAX_HEIGHT_PX = 140;

export default function ChatInput({
  onSend,
  disabled = false,
  placeholder = "Ask about bedrooms, pricing, amenities…",
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, MAX_HEIGHT_PX)}px`;
  }, [value]);

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="flex items-end gap-2 border-t border-stone-200 bg-white px-3 py-3 dark:border-surface-bright dark:bg-surface-low"
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        placeholder={placeholder}
        rows={1}
        disabled={disabled}
        className="flex-1 resize-none rounded-2xl border border-stone-200 bg-stone-100 px-4 py-2.5 text-sm leading-relaxed outline-none transition-colors placeholder:text-stone-500 focus:border-stone-400 focus:bg-white disabled:opacity-60 dark:border-surface-bright dark:bg-surface-container dark:text-on-surface dark:placeholder:text-on-surface-dim dark:focus:border-primary-bright dark:focus:bg-surface"
        aria-label="Message"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-950 text-cream transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 dark:bg-primary-bright dark:text-stone-950"
        aria-label="Send message"
      >
        <ArrowUp size={18} strokeWidth={2.4} />
      </button>
    </form>
  );
}
