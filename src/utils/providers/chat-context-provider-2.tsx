"use client";

import React, { createContext, useCallback, useRef, useState } from "react";
import { SynklunaMessage, SynklunaMessageType } from "../types";
import { streamRaw } from "../streamRaw";

type Msg = { id: string; role: "user" | "assistant"; text: string };

type ChatContextProviderValue = {
  send: (prompt: string) => Promise<void>;
  messages: Msg[];
  setSpanRef: (id: string) => (el: HTMLSpanElement | null) => void;
};

const ChatContext = createContext<ChatContextProviderValue | null>(null);

const ChatContextProvider2 = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const spanRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const abortRef = useRef<AbortController | null>(null);

  const setSpanRef = useCallback(
    (id: string) => (el: HTMLSpanElement | null) => {
      spanRefs.current[id] = el; // ✅ assign, return void
    },
    []
  );

  const send = async (prompt: string) => {
    const user: Msg = { id: crypto.randomUUID(), role: "user", text: prompt };
    const asst: Msg = { id: user.id + "-asst", role: "assistant", text: "" };

    // ✅ single functional update; no stale state
    setMessages((m) => [...m, user, asst]);

    // let React paint the assistant row so its <span> exists
    await Promise.resolve();

    const target = spanRefs.current[asst.id];
    if (!target) return;

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    // start raw streaming (one SSE token = one onToken call)
    streamRaw({
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/stream`,
      body: { prompt },
      signal: abortRef.current.signal,
      onStart: () => {
        target.textContent = ""; // ensure empty
      },
      onToken: (t) => {
        // ✅ mutate DOM only; doesn't touch msgs[]
        target.textContent += t;
      },
      onDone: (final) => {
        // Optional: persist final text into state so history survives reloads
        setMessages((m) =>
          m.map((x) => (x.id === asst.id ? { ...x, text: final } : x))
        );
      },
      onError: () => {
        setMessages((m) =>
          m.map((x) =>
            x.id === asst.id
              ? { ...x, text: (target.textContent || "") + " [error]" }
              : x
          )
        );
      },
    });
  };

  return (
    <ChatContext.Provider value={{ send, messages, setSpanRef }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider2;

const ChatContextConsumer2 = ChatContext.Consumer;

export { ChatContextConsumer2 };
