import React from "react";
import AppBar from "./app-bar";
import SideBar from "./side-bar";
import BaseLayoutProvider from "./base-layout-context";

const BaseLayout = ({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) => {
  return (
    <BaseLayoutProvider>
      <div className="w-full flex gap-0 h-screen max-h-screen overflow-hidden items-stretch bg-[url(/rag-bg.jpg)] object bg-cover sm:[--chat-system-padding-x:2rem] [--chat-system-padding-x:1rem]">
        <SideBar>{sidebar}</SideBar>
        <div className="flex flex-col gap-0 max-h-screen items-stretch flex-1">
          <AppBar />
          {children}
        </div>
      </div>
    </BaseLayoutProvider>
  );
};

export default BaseLayout;
// [background:radial-gradient(50%_50%_at_31%_27%,rgba(24,39,57,1)_0%,rgba(23,9,9,1)_100%)]
