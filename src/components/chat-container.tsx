"use client";

import { useChatContext } from "@/utils/providers/chat-context-provider";

import React, { useEffect, useRef } from "react";
import ChatMessageItem from "./chat-message-item";

const ChatContainer = () => {
  const { messages } = useChatContext();

  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0)
      messageEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
  }, [messages]);

  return (
    <ul className="w-full max-w-[var(--synkluna-query-chat-system-width)] mx-auto flex flex-col gap-4 items-stretch px-4 pb-20">
      {messages.map((message) => {
        return <ChatMessageItem key={message.id} message={message} />;
      })}
      <div ref={messageEndRef} />
    </ul>
  );
};

export default ChatContainer;
