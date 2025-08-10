import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon } from "lucide-react";
import React from "react";

const QueryInput = () => {
  return (
    <div className="relative w-full max-w-[800px]">
      <Input
        className="bg-[#424451] rounded-[50px] px-6 h-[40px] text-gray-300 text-base"
        placeholder="Ask anything Synkluna is here to help"
      />
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
      >
        <SendIcon className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default QueryInput;
