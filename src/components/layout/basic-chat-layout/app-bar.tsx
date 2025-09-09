"use client";

import { Typography } from "@/components";
import { MoreHorizontalIcon } from "lucide-react";
import React from "react";
import { useBaseLayoutContext } from "./base-layout-context";
import IconButton from "@/components/ui/icon-button";

const AppBar = () => {
  const { isSideBarOpen } = useBaseLayoutContext();
  return (
    <header
      className={`w-full h-[var(--synkluna-rag-top-bar-height)] relative shrink-0 flex items-center justify-between px-4 ${
        !isSideBarOpen ? "pl-18" : ""
      }`}
    >
      <Typography variant="body2" className="text-white">
        Gpt-4o
      </Typography>
      <IconButton
        variant="text"
        size="md"
        className="w-6 h-6 text-white"
        disabled
      >
        <MoreHorizontalIcon className="h-6 w-6" />
      </IconButton>
    </header>
  );
};

export default AppBar;
