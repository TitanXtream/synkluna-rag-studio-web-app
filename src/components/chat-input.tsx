"use client";

import { useCallback, useRef, useState } from "react";
import { streamRaw } from "@/utils/streamRaw"; // your POST + SSE parser

type Msg = { id: string; role: "user" | "assistant"; text: string };

export default function Chat() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
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
    setMsgs((m) => [...m, user, asst]);

    // let React paint the assistant row so its <span> exists
    await Promise.resolve();

    const target = spanRefs.current[asst.id];
    if (!target) return;

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    // start raw streaming (one SSE token = one onToken call)
    streamRaw({
      url: "http://localhost:8000/stream",
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
        setMsgs((m) =>
          m.map((x) => (x.id === asst.id ? { ...x, text: final } : x))
        );
      },
      onError: () => {
        setMsgs((m) =>
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
    <div className="p-4 space-y-3">
      {msgs.map((m) => (
        <div
          key={m.id}
          className={m.role === "user" ? "text-right" : "text-left"}
        >
          <div
            className={`inline-block rounded-2xl px-4 py-2 ${
              m.role === "user"
                ? "bg-blue-600 text-white"
                : "bg-zinc-800 text-zinc-100"
            }`}
          >
            {m.role === "assistant" && m.text === "" ? (
              // ✅ unique ref per message id; no reuse
              <span ref={setSpanRef(m.id)} />
            ) : (
              m.text
            )}
          </div>
        </div>
      ))}

      <form
        className="flex gap-2 pt-2"
        onSubmit={(e) => {
          e.preventDefault();
          const f = new FormData(e.currentTarget as HTMLFormElement);
          const q = String(f.get("q") || "").trim();
          if (q) send(q);
          (e.currentTarget as HTMLFormElement).reset();
        }}
      >
        <input
          name="q"
          className="flex-1 px-3 py-2 rounded bg-zinc-900 text-white outline-none"
          placeholder="Ask…"
        />
        <button className="px-4 py-2 rounded bg-blue-600 text-white">
          Send
        </button>
      </form>
    </div>
  );
}
