"use client";
import React, { useState } from "react";

interface BaseLayoutContextType {
  isSideBarOpen: boolean;
  setIsSideBarOpen: (open: boolean) => void;
  showWelcomeMessage: boolean;
  setShowWelcomeMessage: (open: boolean) => void;
}

const baseLayoutContext = React.createContext<BaseLayoutContextType | null>(
  null
);

const BaseLayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSideBarOpen, setIsSideBarOpen] = React.useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  return (
    <baseLayoutContext.Provider
      value={{
        isSideBarOpen,
        setIsSideBarOpen,
        showWelcomeMessage,
        setShowWelcomeMessage,
      }}
    >
      {children}
    </baseLayoutContext.Provider>
  );
};

export default BaseLayoutProvider;

export const useBaseLayoutContext = () => {
  const context = React.useContext(baseLayoutContext);
  if (!context) {
    throw new Error(
      "useBaseLayoutContext must be used within a BaseLayoutProvider"
    );
  }
  return context;
};
