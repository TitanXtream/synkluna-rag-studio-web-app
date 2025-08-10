import { Button } from "@/components";
import { MoreHorizontalIcon } from "lucide-react";
import React from "react";

const AppBar = () => {
  return (
    <header className="w-full h-[40px] relative flex items-center justify-between px-4">
      <div className="font-semibold text-[#d9d9d9] text-lg">gpt-40</div>
      <Button variant="text" size="md" className="w-6 h-6 text-white">
        <MoreHorizontalIcon className="h-6 w-6" />
      </Button>
    </header>
  );
};

export default AppBar;
