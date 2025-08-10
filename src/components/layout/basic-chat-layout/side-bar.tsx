import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PanelLeftIcon } from "lucide-react";
import React from "react";

const SideBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="flex flex-col w-[300px] h-auto items-start overflow-auto relative"
      style={{ background: "var(--color-gradient)" }}
    >
      {/* Header with logo and toggle */}
      <div className="sticky top-0 inset-x-0 flex h-[40px] items-center justify-between px-4 py-2 w-full z-5">
        <div className="relative w-11 h-11">
          <div className="relative h-11">{/* Logo */}</div>
        </div>

        <div className="flex w-11 h-11 items-center justify-center py-2.5 text-white">
          <PanelLeftIcon className="w-6 h-6" />
        </div>
      </div>
      <div className="z-2 flex-1 w-full">{children}</div>
      <div className="flex h-[60px] items-center gap-2.5 px-4 py-2 w-full bg-[#1e1e1e] sticky bottom-0 z-5">
        <Avatar className="">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="relative h-full flex flex-col justify-center">
          <div className="font-normal text-[#d9d9d9] text-base whitespace-nowrap">
            John Dao
          </div>
          <div className="font-normal text-[#b3b3b3] text-xs">Beta</div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
