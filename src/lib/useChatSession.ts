"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { sendChatMessage } from "@/lib/chat-api";
import type { ChatMessage } from "@/types/chat";

export interface UseChatSession {
  sessionId: string;
  messages: ChatMessage[];
  pendingAssistantText: string;
  isStreaming: boolean;
  errorMessage: string | null;
  sendMessage: (question: string) => void;
}

function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/**
 * Owns the entire chat session for the lifetime of the mounted component.
 *
 * - Lives in `<ChatWidget />`, which is rendered from the root `layout.tsx`,
 *   so state survives Next.js client-side route transitions.
 * - On full reload / new tab, the component remounts → new sessionId,
 *   empty messages.
 * - Past conversations remain stored in Supabase.
 */
export function useChatSession(): UseChatSession {
  // The frontend tracks its own UUID for de-dup keys, but the *authoritative*
  // session_id comes from the first SSE `session` event so it always matches
  // what the backend persisted to Supabase.
  const [sessionId, setSessionId] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [pendingAssistantText, setPendingAssistantText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const sendMessage = useCallback(
    (raw: string) => {
      const question = raw.trim();
      if (!question || isStreaming) return;

      setErrorMessage(null);
      const userMsg: ChatMessage = {
        id: makeId(),
        role: "user",
        content: question,
        createdAt: Date.now(),
      };
      setMessages((prev) => [...prev, userMsg]);

      const controller = new AbortController();
      abortRef.current = controller;

      let assistantText = "";
      let activeSessionId = sessionId || null;
      let streamErrored = false;

      setIsStreaming(true);
      setPendingAssistantText("");

      (async () => {
        try {
          for await (const evt of sendChatMessage(
            { session_id: activeSessionId, question },
            controller.signal,
          )) {
            switch (evt.type) {
              case "session":
                activeSessionId = evt.session_id;
                if (!sessionId) setSessionId(evt.session_id);
                break;
              case "chunk":
                assistantText += evt.content;
                setPendingAssistantText(assistantText);
                break;
              case "error":
                streamErrored = true;
                setErrorMessage(evt.message || "Something went wrong.");
                break;
              case "done":
                break;
            }
          }
        } catch (err) {
          if ((err as Error).name === "AbortError") return;
          streamErrored = true;
          setErrorMessage(
            err instanceof Error ? err.message : "Network error",
          );
        } finally {
          if (assistantText && !streamErrored) {
            setMessages((prev) => [
              ...prev,
              {
                id: makeId(),
                role: "assistant",
                content: assistantText,
                createdAt: Date.now(),
              },
            ]);
          }
          setPendingAssistantText("");
          setIsStreaming(false);
          abortRef.current = null;
        }
      })();
    },
    [isStreaming, sessionId],
  );

  return {
    sessionId,
    messages,
    pendingAssistantText,
    isStreaming,
    errorMessage,
    sendMessage,
  };
}
