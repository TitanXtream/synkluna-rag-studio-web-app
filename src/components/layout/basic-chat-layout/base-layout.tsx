import React from "react";
import AppBar from "./app-bar";
import QueryInput from "./query-input";
import SideBar from "./side-bar";

const BaseLayout = ({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) => {
  return (
    <div className="w-full flex gap-0 [background:radial-gradient(50%_50%_at_31%_27%,rgba(24,39,57,1)_0%,rgba(23,9,9,1)_100%)] h-screen max-h-screen overflow-hidden items-stretch">
      <SideBar>{sidebar}</SideBar>
      <div className="flex flex-col gap-0 max-h-screen items-stretch flex-1">
        <AppBar />
        <main className="flex-1">{children}</main>
        <footer className="flex items-center justify-center h-[60px] px-4">
          <QueryInput />
        </footer>
      </div>
    </div>
  );
};

export default BaseLayout;
