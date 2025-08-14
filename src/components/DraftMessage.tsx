"use client";
import React from "react";
import { TokenBuffer } from "@/utils/tokenBuffer";

export function DraftMessage({
  initial,
  onCommit,
  connectBuffer,
}: {
  initial: string;
  onCommit: (chunk: string) => void;
  connectBuffer: (b: TokenBuffer) => void;
}) {
  const spanRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const buffer = new TokenBuffer();
    const off = buffer.onFlush((chunk) => {
      // 1) fast DOM update
      if (spanRef.current) spanRef.current.textContent += chunk;
      // 2) commit to React state so app state stays correct
      onCommit(chunk);
    });
    connectBuffer(buffer);
    return () => {
      off();
    };
  }, [connectBuffer, onCommit]);

  return (
    <span ref={spanRef} className="text-white">
      {initial}
    </span>
  );
}
