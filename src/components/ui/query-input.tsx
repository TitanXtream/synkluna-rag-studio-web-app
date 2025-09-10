"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import IconButton from "@/components/ui/icon-button";
import { useChatContext } from "@/utils/providers/chat-context-provider";

/**
 * ChatComposer – a ChatGPT‑style multiline input bar.
 *
 * Features
 * - Collapsed one‑line look that expands smoothly on focus/typing
 * - Auto‑resizing <textarea> up to maxRows (defaults to 8)
 * - Enter to send, Shift+Enter for newline
 * - Left utility (e.g., + attach), right actions (mic + send)
 * - Mobile friendly, accessible, and theme‑aware (dark/light)
 *
 * Tailwind: designed for a full‑width footer bar, but it’s container‑agnostic.
 */
export default function QueryInput({
  placeholder = "Ask me anything...",
  maxRows = 8,
  minRows = 1,
  onSubmit,
  disabled = false,
  autoFocus = false,
}: {
  placeholder?: string;
  maxRows?: number;
  minRows?: number;
  onSubmit?: (value: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
}) {
  const { send } = useChatContext();

  const onSubmitInternal = onSubmit ?? send;

  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto‑resize algorithm based on scrollHeight
  const resize = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "0px"; // reset to measure scrollHeight correctly
    const lineHeight = getComputedStyle(ta).lineHeight;
    const lh = lineHeight ? parseFloat(lineHeight) : 24;
    const maxHeight = lh * maxRows;
    const minHeight = lh * Math.max(1, minRows);
    const next = Math.min(Math.max(ta.scrollHeight, minHeight), maxHeight);
    ta.style.height = next + "px";
    ta.style.overflowY = ta.scrollHeight > maxHeight ? "auto" : "hidden";
  }, [maxRows, minRows]);

  useEffect(() => {
    resize();
  }, [value, resize]);

  useEffect(() => {
    if (autoFocus) textareaRef.current?.focus();
  }, [autoFocus]);

  const canSend = useMemo(
    () => value.trim().length > 0 && !disabled,
    [value, disabled]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (canSend) submit();
    }
  };

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;

    onSubmitInternal(trimmed);
    setValue("");
    // Allow a frame for value to clear before resize
    requestAnimationFrame(() => resize());
  };

  return (
    <div className="w-full h-[80px] relative">
      <div className="mx-auto max-w-[var(--synkluna-query-chat-system-width)] sm:px-4 px-0 absolute bottom-[1rem] w-full left-1/2 translate-x-[-50%]">
        <motion.div
          className={[
            "relative group",

            "border-2 border-transparent",
            "backdrop-blur",
            "rounded-[calc(var(--synkluna-query-input-border-radius)_+_var(--synkluna-query-input-border-width))]",
            // "supports-[backdrop-filter]:bg-background/60",
            "shadow-sm",
            "transition",
            disabled ? "opacity-60" : "",
          ].join(" ")}
          onClick={() => {
            textareaRef.current?.focus();
          }}
          data-focused={focused}
        >
          {/* Inner layout */}

          <motion.div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[calc(100%_+_2*var(--synkluna-query-input-border-width))] h-[calc(100%_+_2*var(--synkluna-query-input-border-width))] group-data-[focused=true]:bg-gradient-to-r from-primary1 to-primary2 z-1 rounded-[calc(var(--synkluna-query-input-border-radius)_+_var(--synkluna-query-input-border-width))]"></motion.div>
          <form
            id="query-input-form"
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget as HTMLFormElement);
              const q = String(f.get("q") || "").trim();
              if (q) onSubmitInternal?.(q);
              (e.currentTarget as HTMLFormElement).reset();
            }}
            className="flex items-end focus:ring-0 focus:outline-0 gap-2 p-3 sm:p-4 relative z-2 bg-neutral-875 rounded-[var(--synkluna-query-input-border-radius)]"
          >
            {/* Left utility (+) */}
            {/* <button
              type="button"
              className="shrink-0 grid h-9 w-9 place-items-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
              aria-label="Add attachment"
              disabled={disabled}
              >
              <PlusIcon className="h-5 w-5" />
              </button> */}

            {/* Textarea wrapper (allows it to grow) */}
            <div className="flex-1 min-w-0 h-auto">
              <textarea
                ref={textareaRef}
                rows={minRows}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={disabled}
                className={[
                  "block w-full resize-none outline-none",
                  "text-base leading-6 sm:text-[15px] sm:leading-6",
                  "placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
                  "text-white dark:text-neutral-100",
                ].join(" ")}
              />
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* <button
                type="button"
                className="grid h-9 w-9 place-items-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
                aria-label="Voice input"
                disabled={disabled}
                >
                <MicIcon className="h-5 w-5" />
                </button> */}

              <IconButton
                type="submit"
                form="query-input-form"
                onClick={submit}
                disabled={!canSend}
                size={"sm"}
                className={[
                  "grid h-9 w-9 place-items-center rounded-full",
                  "transition",
                ].join(" ")}
                aria-label="Send"
              >
                <SendIcon className="h-5 w-5" />
              </IconButton>
            </div>
          </form>
        </motion.div>

        {/* Helper text */}
        {/* <div className="mx-2 mt-2 text-xs text-neutral-500">
          Press <kbd className="rounded border px-1">Enter</kbd> to send ·{" "}
          <kbd className="rounded border px-1">Shift</kbd> +{" "}
          <kbd className="rounded border px-1">Enter</kbd> for a new line
        </div> */}
      </div>
    </div>
  );
}

// // --- Minimal icons (no external lib required) ---
// function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       {...props}
//     >
//       <path strokeLinecap="round" d="M12 5v14M5 12h14" />
//     </svg>
//   );
// }

// function MicIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       {...props}
//     >
//       <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 1 0 6 0V6a3 3 0 0 0-3-3z" />
//       <path strokeLinecap="round" d="M19 11a7 7 0 0 1-14 0M12 18v3" />
//     </svg>
//   );
// }

function SendIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M22 2l-7 20-4-9-9-4 20-7z"
      />
    </svg>
  );
}
