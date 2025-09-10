"use client";

import { useChatContext } from "@/utils/providers/chat-context-provider";

import React, { useEffect, useRef } from "react";
import ChatMessageItem from "./chat-message-item";
import { useBaseLayoutContext } from "./layout/basic-chat-layout/base-layout-context";
import WelcomeBanner from "@/components/welcome-banner";

const ChatContainer = () => {
  const { messages } = useChatContext();
  const { setShowWelcomeMessage, showWelcomeMessage } = useBaseLayoutContext();

  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0)
      if (showWelcomeMessage) setShowWelcomeMessage(false);
    messageEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [messages]);

  // if (showWelcomeMessage) {
  //   return (
  //     <div className="flex sm:items-end items-center justify-center sm:min-h-[42svh] max-sm:grow">
  //       <WelcomeBanner />
  //     </div>
  //   );
  // }

  return (
    <div
      className="flex flex-col gap-0 items-stretch overflow-auto flex-1 h-full data-[show-welcome-message=true]:sm:max-h-[42svh] transition-all duration-300"
      data-show-welcome-message={showWelcomeMessage}
    >
      {showWelcomeMessage ? (
        <div className={`h-full flex sm:items-end items-center justify-center`}>
          <WelcomeBanner />
        </div>
      ) : (
        <ul className="w-full max-w-[var(--synkluna-query-chat-system-width)] mx-auto flex flex-col gap-4 items-stretch px-4 pb-20">
          {messages.map((message) => {
            return <ChatMessageItem key={message.id} message={message} />;
          })}
          <div ref={messageEndRef} />
        </ul>
      )}
    </div>
  );
};

export default ChatContainer;
