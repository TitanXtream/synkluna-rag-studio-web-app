import {
  CopyIcon,
  MoreHorizontalIcon,
  RefreshCcwIcon,
  SendIcon,
} from "lucide-react";
import React from "react";
import { Button, Card, CardContent, Input } from "@/components";

export const CoverageSection = () => {
  // User question data
  const userQuestion = "What is the companies current market capitalization?";

  // Response content data
  const summaryContent =
    "\"Market capitalization (or 'market cap') refers to the total value of a publicly traded company's outstanding shares. It's calculated by multiplying the current share price by the number of outstanding shares. For example, if Company X has 100 million shares outstanding and each share trades at ₹500, its market cap would be ₹50 billion (₹500 × 100 million). This metric gives investors a quick sense of the company's overall size in the market.\"";

  // What I covered bullet points
  const coveredPoints = [
    "Definition: Market cap equals share price × shares outstanding.",
    "Example: Used specific numbers for clarity.",
    "Purpose: Highlighted how it shows company size at a glance.",
    "Let me know if you'd like to test with a real company or convert it to another explanation style!",
  ];

  return (
    <div className="flex flex-col w-full h-full items-start gap-2.5">
      <header className="w-full h-20 relative">
        <div className="absolute top-7 left-5 font-semibold text-[#d9d9d9] text-lg">
          gpt-40
        </div>
        <Button className="absolute w-6 h-6 top-7 right-14">
          <MoreHorizontalIcon className="h-6 w-6" />
        </Button>
      </header>

      <main className="flex flex-col items-start gap-6 p-6 w-full flex-1">
        {/* User question */}
        <div className="flex items-start justify-end gap-2.5 w-full">
          <Card className="ml-auto bg-[#424451] rounded-[50px] border-none">
            <CardContent className="px-6 py-[18px]">
              <p className="font-normal text-white text-base whitespace-nowrap">
                {userQuestion}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Summary section */}
        <div className="w-full">
          <h2 className="font-semibold text-white text-xl mb-6">Summary</h2>
          <p className="text-white text-base font-normal">{summaryContent}</p>
        </div>

        {/* What I covered section */}
        <div className="w-full">
          <h2 className="font-semibold text-white text-xl mb-6">
            What I covered:
          </h2>
          <ul className="text-white text-base font-normal list-disc pl-5">
            {coveredPoints.map((point, index) => (
              <li key={index} className="mb-1">
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2.5">
          <Button className="p-0">
            <CopyIcon className="w-6 h-6" />
          </Button>
          <Button className="p-0">
            <RefreshCcwIcon className="w-6 h-6" />
          </Button>
        </div>
      </main>

      {/* Input section */}
      <footer className="w-full py-5 px-0">
        <div className="relative w-full mx-auto max-w-[1095px]">
          <Input
            className="bg-[#424451] rounded-[50px] px-6 py-[18px] h-[60px] text-[#b3b3b3] text-base"
            placeholder="Ask anything Synkluna is here to help"
          />
          <Button className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <SendIcon className="w-6 h-6" />
          </Button>
        </div>
      </footer>
    </div>
  );
};
