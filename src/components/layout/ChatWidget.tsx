"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChatCircleDots } from "@phosphor-icons/react";
import ChatWindow from "@/components/chat/ChatWindow";
import { useChatSession } from "@/lib/useChatSession";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    messages,
    pendingAssistantText,
    isStreaming,
    errorMessage,
    sendMessage,
  } = useChatSession();

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => {
    setIsOpen((v) => {
      const next = !v;
      if (typeof window !== "undefined" && next) {
        window.dispatchEvent(new CustomEvent("chat_widget_opened"));
      }
      return next;
    });
  }, []);

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            type="button"
            onClick={toggle}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-stone-950 text-cream shadow-lg transition-shadow duration-200 hover:shadow-xl active:scale-95 dark:bg-primary-bright dark:text-stone-950"
            aria-label="Open chat assistant"
          >
            <ChatCircleDots size={26} weight="fill" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            messages={messages}
            pendingAssistantText={pendingAssistantText}
            isStreaming={isStreaming}
            errorMessage={errorMessage}
            onClose={close}
            onSend={sendMessage}
          />
        )}
      </AnimatePresence>
    </>
  );
}
