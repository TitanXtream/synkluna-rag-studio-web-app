"use client";

import { useChatContext } from "@/utils/providers/chat-context-provider";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/cjs/styles/prism/one-dark";

import React, { useEffect, useRef, useState } from "react";
import { visit } from "unist-util-visit";
import ChatMessageItem from "./chat-message-item";

const ChatContainer = () => {
  const remarkNormalizeLang = () => (tree: any) => {
    visit(tree, "code", (node: any) => {
      if (!node.lang) return;
      node.lang = node.lang.toLowerCase();
    });
  };

  const { messages } = useChatContext();

  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0)
      messageEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    console.log("messages : ", messages);
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
