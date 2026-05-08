"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ChatRole } from "@/types/chat";

interface MessageBubbleProps {
  role: ChatRole;
  content: string;
  pending?: boolean;
}

export default function MessageBubble({
  role,
  content,
  pending,
}: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <div
      className={[
        "flex w-full",
        isUser ? "justify-end" : "justify-start",
      ].join(" ")}
    >
      <div
        className={[
          "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          "shadow-sm transition-colors",
          isUser
            ? "bg-stone-950 text-cream dark:bg-primary-bright dark:text-stone-950"
            : "bg-stone-100 text-stone-950 dark:bg-surface-container dark:text-on-surface",
          pending ? "opacity-90" : "",
        ].join(" ")}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{content}</p>
        ) : (
          <div className="prose-chat">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: (props) => (
                  <a
                    {...props}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-gold underline-offset-2 hover:text-gold"
                  />
                ),
                code: ({ children, ...rest }) => (
                  <code
                    {...rest}
                    className="rounded bg-stone-200 px-1 py-0.5 font-mono text-[0.85em] dark:bg-surface-bright"
                  >
                    {children}
                  </code>
                ),
                ul: ({ children, ...rest }) => (
                  <ul {...rest} className="list-disc pl-5 my-1.5">
                    {children}
                  </ul>
                ),
                ol: ({ children, ...rest }) => (
                  <ol {...rest} className="list-decimal pl-5 my-1.5">
                    {children}
                  </ol>
                ),
                p: ({ children, ...rest }) => (
                  <p {...rest} className="my-1.5 first:mt-0 last:mb-0">
                    {children}
                  </p>
                ),
                strong: ({ children, ...rest }) => (
                  <strong {...rest} className="font-semibold">
                    {children}
                  </strong>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
            {pending && (
              <span
                aria-hidden
                className="ml-0.5 inline-block h-3.5 w-[2px] -mb-0.5 align-middle bg-current animate-pulse"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
