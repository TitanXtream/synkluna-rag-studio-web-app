import { TokenBuffer } from "@/utils/tokenBuffer";

export type StreamHandlers = {
  onToken: (token: string) => void;
  onDone: () => void;
  onError?: (message: string) => void;
};

export async function streamCompletion(
  prompt: string,
  handlers: StreamHandlers,
  history: Array<{
    role: "user" | "assistant" | "system";
    content: string;
  }> = []
) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, messages: history }),
  });

  if (!res.ok || !res.body) {
    handlers.onError?.(`HTTP ${res.status}`);
    handlers.onDone();
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    // split SSE events by double newline
    const events = buffer.split("\n\n");
    buffer = events.pop() ?? ""; // keep last partial

    for (const evt of events) {
      // skip comments/heartbeats (lines starting with ':')
      if (evt.startsWith(":")) continue;

      const lines = evt.split("\n");
      for (const line of lines) {
        if (!line.startsWith("data:")) continue;
        const json = line.slice(5).trim();
        if (!json) continue;
        try {
          const msg = JSON.parse(json);
          if (msg.type === "delta" && msg.token) handlers.onToken(msg.token);
          else if (msg.type === "done") handlers.onDone();
          else if (msg.type === "error")
            handlers.onError?.(msg.message ?? "error");
        } catch {}
      }
    }
  }
}
