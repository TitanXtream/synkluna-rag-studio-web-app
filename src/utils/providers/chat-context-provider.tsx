import { useSSE } from "@/hooks/useSSE";
import React, { createContext, useEffect } from "react";
import { SynklunaMessage, SynklunaMessageType } from "../types";

type ChatContextProviderValue = {
  messages: any[];
  addMessage: (message: SynklunaMessageType) => void;
  removeMessage: (messageId: string) => void;
  status: string;
  runQuery: (prompt: string) => void;
  text: string;
};

const ChatContext = createContext<ChatContextProviderValue | null>(null);

const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = React.useState<any[]>([]);

  const addMessage = (message: SynklunaMessageType) => {
    setMessages((prev) => [...prev, message]);
  };

  const removeMessage = (messageId: string) => {
    setMessages((prev) => prev.filter((message) => message.id !== messageId));
  };

  const { text, status, start } = useSSE();

  const runQuery = (prompt: string) => {
    addMessage(new SynklunaMessage("user", prompt));
    if (!prompt.trim()) return;
    start(`${process.env.NEXT_PUBLIC_API_URL}/stream`, { prompt });
  };

  //   useEffect(() => {
  //     if (text) {
  //       addMessage({
  //         id: Date.now().toString(),
  //         text,
  //         type: "output",
  //       });
  //     }
  //   }, [text]);

  useEffect(() => {
    if (status === "done") {
      addMessage(new SynklunaMessage("assistant", text));
    }
  }, [status]);

  return (
    <ChatContext.Provider
      value={{ messages, addMessage, removeMessage, status, runQuery, text }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;

const ChatContextConsumer = ChatContext.Consumer;

export { ChatContextConsumer };
