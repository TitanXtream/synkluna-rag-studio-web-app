// // useSSE.ts
// import { useState } from "react";

// export function useSSE() {
//   const [text, setText] = useState("");
//   const [status, setStatus] = useState<"idle" | "streaming" | "done" | "error">(
//     "idle"
//   );

//   const start = async (url: string, body?: any) => {
//     setText("");
//     setStatus("streaming");

//     const resp = await fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(body || {}),
//     });

//     if (!resp.ok || !resp.body) {
//       setStatus("error");
//       return;
//     }

//     const reader = resp.body.getReader();
//     const decoder = new TextDecoder();
//     let buffer = "";

//     while (true) {
//       const { value, done } = await reader.read();
//       if (done) break;

//       buffer += decoder.decode(value, { stream: true });

//       const parts = buffer.split("\n\n");
//       buffer = parts.pop() || "";

//       for (const frame of parts) {
//         const lines = frame.split("\n");
//         let event: string | null = null;
//         let data: string[] = [];
//         for (const line of lines) {
//           if (line.startsWith("event:")) event = line.slice(6).trim();
//           else if (line.startsWith("data:")) data.push(line.slice(5));
//         }
//         const payload = data.join("\n");
//         if (event === "token") setText((prev) => prev + payload);
//         if (event === "done") setStatus("done");
//         if (event === "error") setStatus("error");
//       }
//     }
//   };

//   return { text, status, start };
// }
