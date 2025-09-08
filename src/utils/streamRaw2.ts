// streamRaw.ts - POST + parse SSE frames
export async function streamRaw2({
  url,
  body,
  onToken,
  onStart,
  onDone,
  onError,
  signal,
}: {
  url: string;
  body: FormData;
  onToken: (t: string) => void;
  onStart?: () => void;
  onDone?: (final: string) => void;
  onError?: (code: string) => void;
  signal?: AbortSignal;
}) {
  const res = await fetch(url, {
    method: "POST",
    body,
    signal,
  });
  if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let buf = "",
    finalText = "";

  const push = (event: string, data: string) => {
    if (event === "start") onStart?.();
    else if (event === "token") {
      onToken(data);
      finalText += data;
    } else if (event === "done") onDone?.(finalText);
    else if (event === "error") onError?.(data || "StreamingError");
  };

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });

    // parse SSE frames (event: ... \n data: ... \n\n)
    while (true) {
      const sep = buf.indexOf("\n\n");
      if (sep === -1) break;
      const frame = buf.slice(0, sep);
      buf = buf.slice(sep + 2);

      let event = "message",
        data = "";
      console.log("frame", frame);
      for (const ln of frame.split("\n")) {
        console.log("ln", ln);

        if (ln.startsWith("event:")) {
          event = ln.slice(6).trim(); // event name can be trimmed
        } else if (ln.startsWith("data:")) {
          // remove at most one leading space after "data:" per SSE spec
          let val = ln.slice(5);
          if (val.startsWith(" ")) val = val.slice(1);
          data += (data ? "\n" : "") + val; // DO NOT trim here
        }
      }
      // server sends plain token strings for token events
      try {
        if (event !== "token") data = JSON.parse(data);
      } catch {}
      push(event, data as any);
    }
  }
}
