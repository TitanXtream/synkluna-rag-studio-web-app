"use client";

import { useChatContext } from "@/utils/providers/chat-context-provider";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/cjs/styles/prism/one-dark";

import React, { useEffect, useRef, useState } from "react";
import { visit } from "unist-util-visit";

const ChatContainer = () => {
  const remarkNormalizeLang = () => (tree: any) => {
    const map: Record<string, string> = {
      jsximprot: "jsx",
      jsimport: "jsx",
      tsimport: "ts",
      pythonimport: "py",
      sql: "sql",
      js: "js",
      json: "json",
      bash: "bash",
      sh: "sh",
      text: "text",
    };
    const known = new Set([
      "js",
      "javascript",
      "ts",
      "tsx",
      "jsx",
      "bash",
      "sh",
      "json",
      "css",
      "html",
      "sql",
      "python",
      "text",
    ]);
    visit(tree, "code", (node: any) => {
      if (!node.lang) return;
      const lang = node.lang.toLowerCase();
      node.lang = map[lang] ?? (known.has(lang) ? lang : "text");
    });
  };

  const { messages } = useChatContext();

  const messageEndRef = useRef<HTMLDivElement>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const copyToClipboard = (text: string, messageIndex: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(messageIndex);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const formatCode = (code: string, language: string | undefined): string => {
    let formattedCode = code;

    // General rule for C-style languages: add newline after semicolons and braces if not present
    if (
      language &&
      [
        "javascript",
        "js",
        "typescript",
        "ts",
        "jsx",
        "tsx",
        "java",
        "c",
        "cpp",
        "csharp",
        "css",
      ].includes(language)
    ) {
      formattedCode = formattedCode.replace(/([;{}])(?!["\s}])/g, "$1\n");
    }

    // Python specific formatting
    if (language === "python") {
      // Add newlines before def/class that are not at the start of a line
      formattedCode = formattedCode.replace(
        /([a-zA-Z0-9_)"'])\\s*(def |class )/g,
        "$1\n\n$2"
      );
    }

    if (language === "sql") {
      formattedCode = formattedCode.replace(/;(?!["\s])/g, ";\n");
    }

    return formattedCode;
  };

  return (
    <ul className="p-4 w-full max-w-[var(--synkluna-query-chat-system-width)] mx-auto flex flex-col gap-4">
      {messages.map((message) => (
        <li
          key={message.id}
          data-role={message.role}
          className="flex items-start gap-4 data-[role=user]:justify-end"
        >
          {/* {message.role === "assistant" && (
            <img
              src="/zed.svg"
              alt="Assistant"
              width={40}
              height={40}
              className="rounded-full bg-black shadow-lg"
            />
          )} */}
          <div
            className="data-[role=user]:max-w-[50%] data-[role=user]:rounded-[var(--synkluna-chat-container-user-message-radius)] px-4 py-3 shadow-sm data-[role=user]:bg-neutral-900 text-white dark:data-[role=assistant]:text-gray-200"
            data-role={message.role}
          >
            {message.role === "assistant" && message.text === "" ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-500"></div>
                <span>Generating...</span>
              </div>
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkNormalizeLang]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-2xl font-bold mb-4">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl font-bold mb-3">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg font-bold mb-2">{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="leading-relaxed">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc ml-6 mb-2 space-y-1">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal ml-6 mb-2 space-y-1">
                      {children}
                    </ol>
                  ),
                  code: ({
                    node,
                    inline,
                    className,
                    children,
                    ...props
                  }: any) => {
                    const codeText = String(children).replace(/\n$/, "");

                    // Heuristic to treat short, single-line code blocks as inline
                    const isLikelyInline =
                      inline ||
                      (codeText.length < 25 && !codeText.includes("\n"));

                    if (isLikelyInline) {
                      return (
                        <code
                          className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-1.5 py-1 rounded text-sm font-mono mx-1"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    }

                    // The rest is for actual code blocks
                    const match = /language-(\w+)/.exec(className || "");
                    const lang = match ? match[1] : undefined;
                    const formattedCode = formatCode(codeText, lang);

                    return (
                      <div className="relative my-4 text-sm">
                        <button
                          onClick={() =>
                            copyToClipboard(formattedCode, message.id)
                          }
                          className="absolute right-2 top-2 bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs z-10"
                        >
                          {copiedMessageId === message.id ? "Copied!" : "Copy"}
                        </button>
                        {match ? (
                          <SyntaxHighlighter
                            style={oneDark}
                            language={lang}
                            PreTag="div"
                            className="rounded-lg"
                            {...props}
                          >
                            {formattedCode}
                          </SyntaxHighlighter>
                        ) : (
                          <code
                            className="block bg-gray-800 p-4 rounded-lg overflow-x-auto text-white"
                            {...props}
                          >
                            {children}
                          </code>
                        )}
                      </div>
                    );
                  },
                }}
              >
                {message.text}
              </ReactMarkdown>
            )}
          </div>
          {/* {message.role === "user" && (
            <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center font-semibold text-white shadow-lg">
              U
            </div>
          )} */}
        </li>
      ))}
      <div ref={messageEndRef} />
    </ul>
  );
};

export default ChatContainer;
