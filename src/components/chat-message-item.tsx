import React, { useState } from "react";
import { Root, Code } from "mdast";
import { SynklunaLLMMessage } from "@/utils/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/cjs/styles/prism/xonokai";
import { Copy, Check } from "lucide-react";

const ChatMessageItem = React.memo(
  ({ message }: { message: SynklunaLLMMessage }) => {
    const remarkNormalizeLang = () => (tree: Root) => {
      visit(tree, "code", (node: Code) => {
        if (!node.lang) return;
        node.lang = node.lang.toLowerCase();
      });
    };

    const copyWholeMessageToClipBoard = (message: SynklunaLLMMessage) => {
      navigator.clipboard.writeText(message.text);
      setCopiedMessageId(message.id);
      setTimeout(() => setCopiedMessageId(null), 2000);
    };

    const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

    return (
      <li
        key={message.id}
        data-role={message.role}
        className="flex flex-col gap-4 data-[role=user]:items-end w-full"
      >
        {/* data-[role=user]:bg-neutral-850 */}
        {message.role === "user" ? (
          <div className="max-w-[70%] rounded-[var(--synkluna-chat-container-user-message-radius)] px-4 py-3 text-white bg-gradient-to-br from-primary1/20 to-primary2/20 whitespace-pre-wrap">
            {message.text}
          </div>
        ) : (
          <div
            className="data-[role=user]:max-w-[70%] max-w-full data-[role=user]:rounded-[var(--synkluna-chat-container-user-message-radius)] data-[role=user]:px-4 py-3  text-white dark:data-[role=assistant]:text-gray-200 data-[role=user]:bg-gradient-to-br data-[role=user]:from-primary1/20 data-[role=user]:to-primary2/20 data-[role=user]:whitespace-pre-wrap"
            data-role={message.role}
          >
            {message.text === "" ? (
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
                  code: ({ className, children, ...props }) => {
                    // const codeText = String(children).replace(/\n$/, "");

                    const match = /language-(\w+)/.exec(className || "");
                    if (match) {
                      const lang = match[1];
                      // const formattedCode = formatCode(codeText, lang);
                      return (
                        <CodeBlock lang={lang} match={!!match} props={props}>
                          {children}
                        </CodeBlock>
                      );
                    } else
                      return (
                        <code
                          className="bg-gray-700 dark:bg-gray-700 text-gray-200 dark:text-gray-200 px-1.5 py-[0.1rem] rounded text-sm font-mono mx-1"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                  },
                }}
              >
                {message.text}
              </ReactMarkdown>
            )}
            {message.role === "assistant" && !message.isLoading && (
              <div className="data-[role=user]:hidden mt-[0.25rem]">
                <button
                  onClick={() => {
                    copyWholeMessageToClipBoard(message);
                  }}
                  className="bg-gray-700 hover:bg-gray-600 text-white rounded text-xs z-10 cursor-pointer p-1 flex items-center justify-center"
                >
                  {/* {copiedMessageId === message.id ? "Copied!" : "Copy"} */}
                  {copiedMessageId === message.id ? (
                    <Check className="size-5" />
                  ) : (
                    <Copy className="size-5" />
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </li>
    );
  }
);

export default ChatMessageItem;

ChatMessageItem.displayName = "ChatMessageItem";

const CodeBlock = ({
  lang,
  children,
  match,
  props,
}: {
  lang: string;
  children: React.ReactNode;
  match: boolean;
  props: any;
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const onCopy = async () => {
    try {
      const code = String(children).replace(/\n$/, "");
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        // Fallback for older browsers
        const ta = document.createElement("textarea");
        ta.value = code;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  return (
    <div className="relative my-4 text-sm max-w-[var(--synkluna-query-chat-system-width)] w-full overflow-hidden [--stx-highlighter-margin-block:0.5rem]">
      <div className="absolute top-[var(--stx-highlighter-margin-block)] inset-x-0 w-full z-[5] border-b border-gray-400 h-[3rem] flex items-center px-4 justify-between gap-4">
        <p>{lang}</p>
        <button
          onClick={() => {
            onCopy();
          }}
          className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs z-10 cursor-pointer"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      {match ? (
        <SyntaxHighlighter
          style={oneDark}
          language={lang}
          PreTag="div"
          className="rounded-lg w-full flex overflow-auto min-w-0"
          customStyle={{
            paddingTop: "4rem",
            marginBlock: "var(--stx-highlighter-margin-block)",
          }}
          {...props}
        >
          {children}
        </SyntaxHighlighter>
      ) : (
        <code
          className="flex bg-gray-800 p-4 rounded-lg overflow-x-auto text-white"
          {...props}
        >
          {children}
        </code>
      )}
    </div>
  );
};
