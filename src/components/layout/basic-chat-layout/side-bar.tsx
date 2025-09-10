"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import IconButton from "@/components/ui/icon-button";

import { PanelLeftIcon } from "lucide-react";
import React from "react";
import { useBaseLayoutContext } from "./base-layout-context";
import Image from "next/image";

const SideBar = ({ children }: { children: React.ReactNode }) => {
  const { isSideBarOpen, setIsSideBarOpen } = useBaseLayoutContext();

  return (
    <>
      <div className="fixed top-0 left-0 z-1 px-4 h-[var(--synkluna-rag-top-bar-height)] flex items-center shrink-0">
        <div className="relative group flex">
          <Image
            src={"/rag_studio_logo.png"}
            width={100}
            height={100}
            alt="Rag Studio logo"
            className="w-full h-full group-hover:hidden absolute inset-0 z-5"
          />
          <IconButton
            variant="text"
            color="secondary"
            size="sm"
            disabled
            className="rounded-[0.5rem] "
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          >
            <PanelLeftIcon className="size-5 opacity-0 group-hover:opacity-100" />
          </IconButton>
        </div>
      </div>
      <Dialog
        defaultOpen={true}
        open={isSideBarOpen}
        onOpenChange={setIsSideBarOpen}
      >
        <div
          className="flex flex-col w-[300px] h-auto items-start overflow-auto relative z-[4] bg-[#090909]"
          // style={{ background: "var(--color-gradient)" }}
        >
          {/* Header with logo and toggle */}
          <div className="sticky top-0 inset-x-0 flex h-[var(--synkluna-rag-top-bar-height)] items-center justify-between px-[var(--synkluna-rag-padding-x)] py-2 w-full z-5">
            <div className="relative w-11 h-11">
              <div className="relative h-11">{/* Logo */}</div>
            </div>
            {/* 
        <div className="flex w-11 h-11 items-center justify-center py-2.5 text-white">
        <PanelLeftIcon className="w-6 h-6" />
        </div> */}
            <DialogTrigger asChild>
              <IconButton
                variant="text"
                color="secondary"
                size="sm"
                className="rounded-[0.5rem]"
              >
                <PanelLeftIcon className="size-5" />
              </IconButton>
            </DialogTrigger>
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
      </Dialog>
    </>
  );
};

export default SideBar;
