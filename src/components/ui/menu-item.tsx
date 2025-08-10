import { cn } from "@/utils/tw-utils";
import React from "react";

const MenuItem = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "w-full hover:bg-gray-800/50 transition-colors text-white px-4 min-h-10 flex items-center cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
MenuItem.displayName = "MenuItem";

export { MenuItem };
