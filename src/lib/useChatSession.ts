"use client";

import { useState } from "react";
import type { ChatMessage } from "@/types/chat";

export interface UseChatSession {
  sessionId: string;
  messages: ChatMessage[];
  pendingAssistantText: string;
  isStreaming: boolean;
  errorMessage: string | null;
  sendMessage: (question: string) => void;
}

/**
 * STUB — wired up in Commit 4.
 * Returns empty state and a no-op sender so the UI renders correctly.
 */
export function useChatSession(): UseChatSession {
  const [messages] = useState<ChatMessage[]>([]);
  return {
    sessionId: "",
    messages,
    pendingAssistantText: "",
    isStreaming: false,
    errorMessage: null,
    sendMessage: () => {
      /* implemented in Commit 4 */
    },
  };
}
