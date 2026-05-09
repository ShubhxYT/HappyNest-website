"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import type { ChatMessage } from "@/types/chat";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import ChatInput from "./ChatInput";

const SUGGESTED_QUESTIONS = [
  "How many bedrooms are there?",
  "Is the property pet friendly?",
  "What are the check-in timings?",
] as const;

interface ChatWindowProps {
  messages: ChatMessage[];
  pendingAssistantText: string;
  isStreaming: boolean;
  errorMessage: string | null;
  onClose: () => void;
  onSend: (text: string) => void;
}

export default function ChatWindow({
  messages,
  pendingAssistantText,
  isStreaming,
  errorMessage,
  onClose,
  onSend,
}: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const windowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        windowRef.current &&
        !windowRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, pendingAssistantText, isStreaming]);

  const isEmpty = messages.length === 0 && !isStreaming && !pendingAssistantText;

  return (
    <motion.div
      ref={windowRef}
      role="dialog"
      aria-label="HappyNest chat assistant"
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="
        fixed inset-x-0 bottom-0 top-0 z-[60] flex flex-col bg-white shadow-2xl
        sm:inset-auto sm:bottom-24 sm:right-6 sm:top-auto sm:h-[min(620px,80vh)] sm:w-[400px]
        sm:rounded-3xl sm:border sm:border-stone-200
        dark:bg-surface dark:sm:border-surface-bright
      "
    >
      <header className="flex items-center justify-between border-b border-stone-200 px-5 py-4 dark:border-surface-bright">
        <div className="flex flex-col">
          <span className="font-outfit text-xs uppercase tracking-[0.18em] text-stone-500 dark:text-on-surface-dim">
            HappyNest
          </span>
          <span className="font-satoshi text-base font-semibold text-stone-950 dark:text-on-surface">
            Blanc Belle Concierge
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="flex h-9 w-9 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-950 dark:text-on-surface-dim dark:hover:bg-surface-container dark:hover:text-on-surface"
        >
          <X size={18} />
        </button>
      </header>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-cream dark:bg-surface-low"
      >
        {isEmpty ? (
          <div className="flex h-full flex-col items-start justify-end gap-4">
            <div className="rounded-2xl bg-stone-100 px-4 py-3 text-sm text-stone-800 dark:bg-surface-container dark:text-on-surface">
              <p className="font-medium">
                Welcome to HappyNest Blanc Belle.
              </p>
              <p className="text-stone-600 dark:text-on-surface-dim">
                How can I help you plan your stay?
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => onSend(q)}
                  className="rounded-full border border-stone-300 bg-white px-3 py-1.5 text-xs text-stone-800 transition-colors hover:border-stone-950 hover:bg-stone-950 hover:text-cream dark:border-surface-bright dark:bg-surface-container dark:text-on-surface dark:hover:border-primary-bright dark:hover:bg-primary-bright dark:hover:text-stone-950"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((m) => (
              <MessageBubble key={m.id} role={m.role} content={m.content} />
            ))}
            {pendingAssistantText && (
              <MessageBubble
                role="assistant"
                content={pendingAssistantText}
                pending
              />
            )}
            {isStreaming && !pendingAssistantText && <TypingIndicator />}
            {errorMessage && (
              <div className="rounded-2xl border border-red-300 bg-red-50 px-4 py-2.5 text-sm text-red-800 dark:border-red-800/50 dark:bg-red-950/40 dark:text-red-200">
                {errorMessage}
              </div>
            )}
          </>
        )}
      </div>

      <ChatInput onSend={onSend} disabled={isStreaming} />
    </motion.div>
  );
}
