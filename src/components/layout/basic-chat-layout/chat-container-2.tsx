"use client";
import React from "react";
import { messagesReducer, Message } from "@/utils/messages";
import { DraftMessage } from "@/components/DraftMessage";
import { RichMessage } from "@/components/rich-message";
import { streamCompletion } from "@/components/stream-client";
import { TokenBuffer } from "@/utils/tokenBuffer";

export default function ChatContainer2() {
  const [messages, dispatch] = React.useReducer(
    messagesReducer as any,
    [] as Message[]
  );
  const [input, setInput] = React.useState("");
  const bottomRef = React.useRef<HTMLDivElement>(null);
  const streamingBufferRef = React.useRef<TokenBuffer | null>(null);
  const streamingIdRef = React.useRef<string | null>(null);

  // Auto-scroll when near bottom
  const scrollToBottom = () =>
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });

  async function onSend() {
    const text = input.trim();
    if (!text) return;
    setInput("");

    // 1) add user
    dispatch({ type: "ADD_USER", text });

    // 2) start assistant
    dispatch({ type: "START_ASSIST" });

    // Gather minimal history for server (optional)
    const history = messages.map((m) => ({
      role: m.role,
      content: m.content,
    })) as any;

    // 3) stream
    await streamCompletion(
      text,
      {
        onToken: (t) => {
          streamingBufferRef.current?.append(t);
        },
        onDone: () => {
          if (streamingIdRef.current) {
            dispatch({ type: "END", id: streamingIdRef.current });
            streamingIdRef.current = null;
          }
        },
        onError: (msg) => console.warn("stream error:", msg),
      },
      history
    );

    // scroll bottom (best-effort)
    requestAnimationFrame(scrollToBottom);
  }

  return (
    <div className="max-w-3xl mx-auto p-4 flex flex-col h-[50svh]">
      <div className="flex-1 overflow-auto space-y-4">
        {messages.map((m, idx) => {
          const isLast = idx === messages.length - 1;
          if (m.role === "assistant" && m.streaming) {
            // capture last id for reducer commits
            streamingIdRef.current = m.id;
            return (
              <div key={m.id} className="rounded-lg  p-3">
                <DraftMessage
                  initial={m.content}
                  connectBuffer={(b) => {
                    streamingBufferRef.current = b;
                  }}
                  onCommit={(chunk) => {
                    if (streamingIdRef.current) {
                      dispatch({
                        type: "COMMIT_APPEND",
                        id: streamingIdRef.current,
                        chunk,
                      });
                    }
                  }}
                />
              </div>
            );
          }
          return (
            <div key={m.id} className={m.role === "user" ? "text-right" : ""}>
              <div
                className={
                  m.role === "user"
                    ? "inline-block rounded-lg bg-blue-600 text-white p-3"
                    : "inline-block rounded-lg bg-slate-100 p-3"
                }
              >
                <RichMessage md={m.content} />
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          onSend();
        }}
      >
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="Ask anything…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="px-4 py-2 rounded bg-black text-white" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
