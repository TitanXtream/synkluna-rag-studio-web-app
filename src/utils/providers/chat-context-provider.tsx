"use client";

import React, { createContext, useRef, useState } from "react";

import { streamRaw } from "../streamRaw";

import { SynklunaLLMMessage } from "../types";

type ChatContextProviderValue = {
  send: (prompt: string) => Promise<void>;
  messages: SynklunaLLMMessage[];
  isLoading: boolean;
};

const ChatContext = createContext<ChatContextProviderValue | null>(null);

const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<SynklunaLLMMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const send = async (prompt: string) => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    const userMessage: SynklunaLLMMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text: prompt,
    };
    const assistantMessage: SynklunaLLMMessage = {
      id: userMessage.id + "-asst",
      role: "assistant",
      text: "",
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setIsLoading(true);

    streamRaw({
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/chat/stream`,
      body: { prompt },
      signal: abortRef.current.signal,
      onStart: () => {
        // The assistant message is already created with empty text.
      },
      onToken: (token) => {
        setMessages((currentMessages) =>
          currentMessages.map((msg) =>
            msg.id === assistantMessage.id
              ? { ...msg, text: msg.text + token }
              : msg
          )
        );
      },
      onDone: () => {
        setMessages((currentMessages) =>
          currentMessages.map((msg) =>
            msg.id === assistantMessage.id ? { ...msg, isLoading: false } : msg
          )
        );
        setIsLoading(false);
      },
      onError: (error) => {
        setMessages((currentMessages) =>
          currentMessages.map((msg) =>
            msg.id === assistantMessage.id
              ? {
                  ...msg,
                  isLoading: false,
                  text:
                    msg.text +
                    `

[Error: ${error}]`,
                }
              : msg
          )
        );
        setIsLoading(false);
      },
    });
  };

  return (
    <ChatContext.Provider value={{ send, messages, isLoading }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;

const useChatContext = () => {
  const context = React.useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatContextProvider");
  }
  return context;
};

const ChatContextConsumer = ChatContext.Consumer;

export { ChatContextConsumer, useChatContext };
