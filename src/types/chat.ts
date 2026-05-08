export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
}

export interface ChatRequest {
  session_id: string | null;
  question: string;
}

export type ChatSseChunk =
  | { type: "session"; session_id: string }
  | { type: "chunk"; content: string }
  | { type: "done" }
  | { type: "error"; message: string };

export interface ChatHistoryResponse {
  session_id: string;
  messages: { role: ChatRole; content: string; created_at: string }[];
}