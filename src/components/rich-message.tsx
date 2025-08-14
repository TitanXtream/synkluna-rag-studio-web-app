// RichMessage.tsx
import React from "react";
// use your MD renderer; sanitize HTML if needed
export function RichMessage({ md }: { md: string }) {
  // expensive stuff like code highlighting should run only once here
  return (
    <div className="prose">
      {/* render md */}
      {md}
    </div>
  );
}
